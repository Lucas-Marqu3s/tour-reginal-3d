import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import * as THREE from 'three';

interface ThreeViewerProps {
  itemColor?: string;
  modelPath?: string;
  transparent?: boolean; // Para suportar AR com fundo transparente
}

const ThreeViewer: React.FC<ThreeViewerProps> = ({
  itemColor = '#4CAF50',
  modelPath,
  transparent = false
}) => {
  const [loading, setLoading] = useState(true);
  const requestIdRef = useRef<number | null>(null);

  const onContextCreate = async (gl: any) => {
    const renderer = new Renderer({
      gl,
      alpha: transparent // Habilita canal alpha para transparência
    });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    if (transparent) {
      renderer.setClearColor(0x000000, 0); // Fundo transparente para AR
    } else {
      renderer.setClearColor(0xf0f0f0); // Fundo cinza padrão
    }

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    let model: THREE.Object3D;

    // Criar geometrias procedurais elaboradas para cada tipo de modelo
    if (modelPath) {
      try {
        console.log('Criando modelo procedural para:', modelPath);

        // Criar representação procedural elaborada baseada no tipo de modelo
        const modelGroup = new THREE.Group();

        switch (modelPath) {
          case 'arara.glb':
          case 'mico.glb':
            // Criar modelo de pássaro/animal
            // Corpo
            const bodyGeo = new THREE.SphereGeometry(0.5, 32, 32);
            bodyGeo.scale(1, 1.2, 0.8);
            const bodyMat = new THREE.MeshPhongMaterial({ color: itemColor, shininess: 100 });
            const body = new THREE.Mesh(bodyGeo, bodyMat);
            body.position.y = 0.3;
            modelGroup.add(body);

            // Cabeça
            const headGeo = new THREE.SphereGeometry(0.25, 32, 32);
            const head = new THREE.Mesh(headGeo, bodyMat);
            head.position.y = 0.9;
            modelGroup.add(head);

            // Bico/focinho
            const beakGeo = new THREE.ConeGeometry(0.08, 0.2, 8);
            beakGeo.rotateX(Math.PI / 2);
            const beakMat = new THREE.MeshPhongMaterial({ color: 0xffaa00, shininess: 100 });
            const beak = new THREE.Mesh(beakGeo, beakMat);
            beak.position.set(0, 0.9, 0.25);
            modelGroup.add(beak);

            // Asas/membros
            const wingGeo = new THREE.SphereGeometry(0.4, 16, 16);
            wingGeo.scale(0.3, 0.8, 1.5);

            const leftWing = new THREE.Mesh(wingGeo, bodyMat);
            leftWing.position.set(-0.5, 0.3, 0);
            leftWing.rotation.z = Math.PI / 6;
            modelGroup.add(leftWing);

            const rightWing = new THREE.Mesh(wingGeo, bodyMat);
            rightWing.position.set(0.5, 0.3, 0);
            rightWing.rotation.z = -Math.PI / 6;
            modelGroup.add(rightWing);

            // Cauda
            const tailGeo = new THREE.ConeGeometry(0.3, 0.6, 8);
            tailGeo.rotateX(Math.PI / 2);
            tailGeo.scale(1, 1, 0.3);
            const tail = new THREE.Mesh(tailGeo, bodyMat);
            tail.position.set(0, 0.3, -0.6);
            modelGroup.add(tail);
            break;

          default:
            // Modelo simples padrão
            const defaultGeo = new THREE.SphereGeometry(1, 32, 32);
            const defaultMat = new THREE.MeshPhongMaterial({ color: itemColor, shininess: 100 });
            const defaultMesh = new THREE.Mesh(defaultGeo, defaultMat);
            modelGroup.add(defaultMesh);
        }

        model = modelGroup;
        scene.add(model);
        console.log('Modelo procedural criado e adicionado à cena');

      } catch (error) {
        console.error('Erro ao carregar modelo GLB:', error);
        console.error('Detalhes:', error instanceof Error ? error.message : String(error));

        // Fallback para geometria simples
        console.log('Usando geometria de fallback');
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshPhongMaterial({
          color: itemColor,
          shininess: 100,
        });
        model = new THREE.Mesh(geometry, material);
        scene.add(model);
      }
    } else {
      console.log('Nenhum modelo especificado, usando geometria padrão');
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: itemColor,
        shininess: 100,
      });
      model = new THREE.Mesh(geometry, material);
      scene.add(model);
    }

    // Adicionar plataforma apenas se não estiver em modo AR
    if (!transparent) {
      const platformGeometry = new THREE.CylinderGeometry(3, 3, 0.2, 32);
      const platformMaterial = new THREE.MeshPhongMaterial({
        color: 0x888888,
        shininess: 50
      });
      const platform = new THREE.Mesh(platformGeometry, platformMaterial);
      platform.position.y = -2;
      scene.add(platform);
    }

    setLoading(false);

    let time = 0;
    const animate = () => {
      requestIdRef.current = requestAnimationFrame(animate);
      time += 0.01;

      if (model) {
        // Rotação principal
        model.rotation.y += 0.01;

        // Adicionar movimento de flutuação suave
        model.position.y = Math.sin(time) * 0.2;

        // Leve inclinação para dar dinamismo
        model.rotation.x = Math.sin(time * 0.5) * 0.1;
      }

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    animate();
  };

  useEffect(() => {
    return () => {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={itemColor} />
        </View>
      )}
      <GLView
        style={styles.glView}
        onContextCreate={onContextCreate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  glView: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    zIndex: 1,
  },
});

export default ThreeViewer;