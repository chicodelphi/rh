import React, { useState, useRef, useEffect } from 'react';
import { Fingerprint, Clock, MapPin, AlertCircle, Camera } from 'lucide-react';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

const Compliance: React.FC = () => {
  const [isClockModalOpen, setIsClockModalOpen] = useState(false);
  const [clockStep, setClockStep] = useState<'camera' | 'success'>('camera');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleOpenClock = () => {
    setClockStep('camera');
    setIsClockModalOpen(true);
    startCamera();
  };

  const handleCloseClock = () => {
    stopCamera();
    setIsClockModalOpen(false);
  };

  const handleClockIn = () => {
    // Simulate biometric validation
    stopCamera();
    setClockStep('success');
  };

  return (
    <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Action: Time Clock */}
            <Card className="bg-gradient-to-r from-primary to-blue-800 text-white">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Registro de Ponto</h2>
                        <p className="text-blue-100 mb-6">Utilize reconhecimento facial para registrar sua entrada ou saída com segurança.</p>
                        <button 
                            onClick={handleOpenClock}
                            className="bg-white text-primary px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-50 transition-colors flex items-center"
                        >
                            <Fingerprint className="mr-2" />
                            Bater Ponto Agora
                        </button>
                    </div>
                    <div className="text-right">
                        <div className="text-4xl font-mono font-bold opacity-90">14:32</div>
                        <div className="text-sm text-blue-200">Terça, 14 de Maio</div>
                    </div>
                </div>
            </Card>

            {/* Status Card */}
            <Card title="Status de Compliance">
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-red-50 text-red-700 rounded-lg">
                        <div className="flex items-center">
                            <AlertCircle className="w-5 h-5 mr-3" />
                            <span className="font-medium">3 Férias vencendo em 30 dias</span>
                        </div>
                        <button className="text-sm underline">Ver detalhes</button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 text-yellow-700 rounded-lg">
                         <div className="flex items-center">
                            <Clock className="w-5 h-5 mr-3" />
                            <span className="font-medium">5 Bancos de horas &gt; 20h</span>
                        </div>
                         <button className="text-sm underline">Ver detalhes</button>
                    </div>
                </div>
            </Card>
        </div>

        {/* History Table */}
        <Card title="Histórico de Pontos Recentes">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Funcionário</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data/Hora</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Localização</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Validação</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Ana Silva</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">14/05/2024 09:00</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Entrada</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                                <MapPin className="w-4 h-4 mr-1 text-gray-400" /> Escritório SP
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Facial OK
                                </span>
                            </td>
                        </tr>
                         <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Carlos Oliveira</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">14/05/2024 09:15</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Entrada</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                                <MapPin className="w-4 h-4 mr-1 text-gray-400" /> Remoto (IP)
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Digital OK
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>

        {/* Modal for Camera/Clock In */}
        <Modal
            isOpen={isClockModalOpen}
            onClose={handleCloseClock}
            title="Registro de Ponto Biométrico"
            footer={
                clockStep === 'camera' ? (
                     <button onClick={handleClockIn} className="w-full bg-secondary text-white py-3 rounded-lg font-bold hover:bg-green-600 transition">
                        Confirmar Identidade
                     </button>
                ) : (
                    <button onClick={handleCloseClock} className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-300 transition">
                        Fechar
                     </button>
                )
            }
        >
            {clockStep === 'camera' ? (
                <div className="flex flex-col items-center">
                    <div className="w-full h-64 bg-black rounded-lg overflow-hidden relative mb-4">
                        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
                        <div className="absolute inset-0 border-4 border-dashed border-white/50 m-8 rounded-lg pointer-events-none flex items-center justify-center">
                            <Camera className="text-white/30 w-12 h-12" />
                        </div>
                        <div className="absolute bottom-2 left-0 right-0 text-center text-white text-xs bg-black/50 py-1">
                            Posicione seu rosto no centro
                        </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        Localização aproximada: São Paulo, SP
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center py-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <Fingerprint className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Ponto Registrado!</h3>
                    <p className="text-gray-500 mt-2">14 de Maio, 14:35:12</p>
                </div>
            )}
        </Modal>
    </div>
  );
};

export default Compliance;
