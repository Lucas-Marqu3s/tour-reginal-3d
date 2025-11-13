import { GLView } from 'expo-gl';
import { Renderer, loadAsync } from 'expo-three';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import * as THREE from 'three';

// Mapa de modelos disponíveis - todos os requires devem ser estáticos
const MODEL_MAP: Record<string, any> = {
  'arara.glb': require('../assets/images/models/base_basic_pbr.glb'),
  // 'base_basic_pbr.glb': require('../assets/images/models/base_basic_pbr.glb'),
  // 'siri.glb': require('../assets/images/models/base_basic_pbr.glb'),
  // 'mandacaru.glb': require('../assets/images/models/base_basic_pbr.glb'),
  // 'coqueiro.glb': require('../assets/images/models/base_basic_pbr.glb'),
  // 'fogueira.glb': require('../assets/images/models/base_basic_pbr.glb'),
  // 'acaraje.glb': require('../assets/images/models/base_basic_pbr.glb'),
  // 'mico.glb': require('../assets/images/models/base_basic_pbr.glb'),
  // 'pau-brasil.glb': require('../assets/images/models/base_basic_pbr.glb'),
  // 'mascara.glb': require('../assets/images/models/base_basic_pbr.glb'),
  // 'feijoada.glb': require('../assets/images/models/base_basic_pbr.glb'),
};

interface ThreeViewerProps {
  itemColor?: string;
  modelPath?: string;
}

const ThreeViewer: React.FC<ThreeViewerProps> = ({
  itemColor = '#4CAF50',
  modelPath
}) => {
  const [loading, setLoading] = useState(true);
  const requestIdRef = useRef<number | null>(null);

  const onContextCreate = async (gl: any) => {
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    renderer.setClearColor(0xf0f0f0);

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

    // Carregar modelo GLB se fornecido e existir no mapa
    if (modelPath && MODEL_MAP[modelPath]) {
      try {
        // Usar loadAsync do expo-three que é otimizado para React Native
        const loadedModel = await loadAsync(MODEL_MAP[modelPath]);

        // loadAsync pode retornar o modelo diretamente ou ter uma propriedade scene
        model = loadedModel.scene || loadedModel;

        // Garantir que temos um objeto válido
        if (!model || typeof model.traverse !== 'function') {
          throw new Error('Modelo carregado não é um objeto THREE válido');
        }

        // Calcular o tamanho do modelo manualmente
        let minX = Infinity, minY = Infinity, minZ = Infinity;
        let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

        model.traverse((child: any) => {
          if (child.isMesh && child.geometry) {
            child.geometry.computeBoundingBox();
            const bbox = child.geometry.boundingBox;
            if (bbox) {
              // Aplicar transformações do objeto
              const worldPosition = new THREE.Vector3();
              child.getWorldPosition(worldPosition);

              minX = Math.min(minX, bbox.min.x + worldPosition.x);
              minY = Math.min(minY, bbox.min.y + worldPosition.y);
              minZ = Math.min(minZ, bbox.min.z + worldPosition.z);
              maxX = Math.max(maxX, bbox.max.x + worldPosition.x);
              maxY = Math.max(maxY, bbox.max.y + worldPosition.y);
              maxZ = Math.max(maxZ, bbox.max.z + worldPosition.z);
            }
          }
        });

        // Calcular centro e escala
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;
        const centerZ = (minZ + maxZ) / 2;

        const sizeX = maxX - minX;
        const sizeY = maxY - minY;
        const sizeZ = maxZ - minZ;

        const maxDim = Math.max(sizeX, sizeY, sizeZ);
        const scale = maxDim > 0 ? 2 / maxDim : 1;

        model.scale.set(scale, scale, scale);
        model.position.set(-centerX * scale, -centerY * scale, -centerZ * scale);

        scene.add(model);
      } catch (error) {
        console.error('Erro ao carregar modelo GLB:', error);
        // Fallback para cubo se o modelo não carregar
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial({
          color: itemColor,
          shininess: 100
        });
        model = new THREE.Mesh(geometry, material);
        scene.add(model);
      }
    } else {
      // Criar cubo padrão se nenhum modelo foi fornecido ou não existe no mapa
      const geometry = new THREE.BoxGeometry(2, 2, 2);
      const material = new THREE.MeshPhongMaterial({
        color: itemColor,
        shininess: 100
      });
      model = new THREE.Mesh(geometry, material);
      scene.add(model);
    }

    const platformGeometry = new THREE.CylinderGeometry(3, 3, 0.2, 32);
    const platformMaterial = new THREE.MeshPhongMaterial({
      color: 0x888888,
      shininess: 50
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.y = -2;
    scene.add(platform);

    setLoading(false);

    const animate = () => {
      requestIdRef.current = requestAnimationFrame(animate);

      if (model) {
        model.rotation.y += 0.01;
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