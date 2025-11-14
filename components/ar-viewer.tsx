import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import ThreeViewer from './three-viewer';

interface ARViewerProps {
  itemColor?: string;
  modelPath?: string;
}

const ARViewer: React.FC<ARViewerProps> = ({ itemColor, modelPath }) => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Permissões ainda estão sendo carregadas
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    // Permissões não foram concedidas
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.message}>
            Precisamos da sua permissão para usar a câmera
          </Text>
          <Button onPress={requestPermission} title="Permitir Câmera" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Câmera como fundo */}
      <CameraView style={styles.camera} facing={facing} />

      {/* Visualizador 3D transparente sobreposto à câmera usando posição absoluta */}
      <View style={styles.overlayContainer} pointerEvents="box-none">
        <ThreeViewer
          itemColor={itemColor}
          modelPath={modelPath}
          transparent={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 20,
    color: '#fff',
    fontSize: 16,
  },
  camera: {
    flex: 1,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
});

export default ARViewer;
