import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Holistic } from '@mediapipe/holistic';
import { Camera } from '@mediapipe/camera_utils';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import api from '../api';

const ARTryOn = ({ productId }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const modelRef = useRef(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product details
    api.get(`/products/${productId}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error('Product fetch error:', err));
  }, [productId]);

  useEffect(() => {
    if (!product || !product.modelUrl) return;

    // THREE.js setup
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0.1);
    camera.position.z = 1;

    // Light
    const light = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(light);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    sceneRef.current = scene;

    // Load 3D model
    const loader = new GLTFLoader();
    loader.load(product.modelUrl, (gltf) => {
      const model = gltf.scene;
      model.scale.set(0.8, 0.8, 0.8);
      model.position.y = -0.3;
      scene.add(model);
      modelRef.current = model;
      setLoading(false);
    });

    // MediaPipe Holistic setup
    const holistic = new Holistic({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.5.1675468629/${file}`,
    });

    holistic.setOptions({
      staticImageMode: false,
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    holistic.onResults((results) => {
      if (modelRef.current && results.poseLandmarks) {
        // Position model based on pose landmarks
        const shoulderLeft = results.poseLandmarks[11];
        const shoulderRight = results.poseLandmarks[12];

        // Convert 2D video coords to 3D scene coords
        const shoulderMidX = (shoulderLeft.x + shoulderRight.x) / 2;
        const shoulderMidY = (shoulderLeft.y + shoulderRight.y) / 2;

        // Apply rotation/position based on pose
        if (results.poseWorldLandmarks) {
          const neck = results.poseWorldLandmarks[0];
          modelRef.current.position.x = (shoulderMidX - 0.5) * 2;
          modelRef.current.position.y = (1 - shoulderMidY) * 2;

          // Simple rotation for demo
          modelRef.current.rotation.y += 0.01;
        }
      }

      // Draw segmentation for reference
      drawFrame(results, canvas);
    });

    // Camera setup
    const videoElement = videoRef.current;
    const camera_obj = new Camera(videoElement, {
      onFrame: async () => {
        await holistic.send({ image: videoElement });
      },
      width: window.innerWidth,
      height: window.innerHeight,
    });

    camera_obj.start();

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      holistic.close();
      camera_obj.stop();
    };
  }, [product]);

  const drawFrame = (results, canvas) => {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Draw pose skeleton if needed (optional)
    if (results.poseLandmarks) {
      drawPose(ctx, results.poseLandmarks);
    }
  };

  const drawPose = (ctx, landmarks) => {
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;

    // Draw skeleton connections
    const connections = [
      [11, 12], [12, 24], [24, 26], [26, 28],
      [11, 13], [13, 15], [15, 21], [15, 19],
    ];

    connections.forEach(([start, end]) => {
      const startPos = landmarks[start];
      const endPos = landmarks[end];
      ctx.beginPath();
      ctx.moveTo(startPos.x * window.innerWidth, startPos.y * window.innerHeight);
      ctx.lineTo(endPos.x * window.innerWidth, endPos.y * window.innerHeight);
      ctx.stroke();
    });
  };

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <video ref={videoRef} style={{ display: 'none' }} />
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
      
      {loading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '24px',
          backgroundColor: 'rgba(0,0,0,0.7)',
          padding: '20px',
          borderRadius: '10px',
        }}>
          Loading {product?.name}...
        </div>
      )}

      {product && (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.7)',
          padding: '15px',
          borderRadius: '8px',
        }}>
          <h2>{product.name}</h2>
          <p>${product.price}</p>
        </div>
      )}

      <button
        onClick={() => window.history.back()}
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#ff6b9d',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Back
      </button>
    </div>
  );
};

export default ARTryOn;