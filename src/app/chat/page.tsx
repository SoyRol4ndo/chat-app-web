'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { db, auth } from '@/lib/firebase';
import { useAuthStore } from '@/store/useAuthStore';
import { ChatMessage } from '@/components/ChatMessage';

interface Message {
    id: string;
    text: string;
    userId: string;
    photoURL: string;
    timestamp: string;
}

export default function Chat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [error, setError] = useState<string | null>(null);
    const user = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }

        const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));

        try {
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const messagesData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...(doc.data() as Omit<Message, 'id'>)
                }));
                setMessages(messagesData);
                setError(null);
            }, (error) => {
                console.error("Error fetching messages:", error);
                setError(error.message);
            });

            return () => unsubscribe();
        } catch (error) {
            console.error("Error setting up messages listener:", error);
            setError(error instanceof Error ? error.message : 'Error desconocido');
        }
    }, [user, router]);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || !user) return;

        try {
            await addDoc(collection(db, 'messages'), {
                text: message,
                userId: user.uid,
                photoURL: user.photoURL,
                timestamp: serverTimestamp(),
            });
            setMessage('');
            setError(null);
        } catch (error) {
            console.error('Error sending message:', error);
            setError('Error al enviar el mensaje. Por favor, intenta de nuevo.');
        }
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            document.cookie = 'firebase-session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            setUser(null);
            router.push('/login');
        } catch (error) {
            console.error('Error logging out:', error);
            setError('Error al cerrar sesión. Por favor, intenta de nuevo.');
        }
    };


    if (!user) return null;

    const formatTimestamp = (timestamp: any) => {
        if (!timestamp) return '';
        if (timestamp.toDate && typeof timestamp.toDate === 'function') {
            try {
                return timestamp.toDate().toLocaleTimeString();
            } catch (error) {
                console.error('Error converting timestamp:', error);
                return '';
            }
        }
        if (timestamp instanceof Date) {
            return timestamp.toLocaleTimeString();
        }
        if (typeof timestamp === 'number') {
            return new Date(timestamp).toLocaleTimeString();
        }
        return '';
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <header className="bg-white shadow p-4">
                <div className="flex justify-between items-center max-w-4xl mx-auto">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold">Chat App</h1>
                        <div className="flex items-center gap-2">
                            <img
                                src={user.photoURL || '/default-avatar.png'}
                                alt="Profile"
                                className="w-8 h-8 rounded-full"
                            />
                            <span className="text-sm text-gray-600">{user.displayName}</span>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4">
                <div className="max-w-4xl mx-auto space-y-4">
                    {messages.map((msg) => (
                        <ChatMessage
                            key={msg.id}
                            message={msg.text}
                            photoURL={msg.photoURL}
                            timestamp={formatTimestamp(msg.timestamp)}
                            userId={msg.userId}
                        />
                    ))}
                </div>
            </main>

            <footer className="bg-white p-4">
                <form onSubmit={sendMessage} className="max-w-4xl mx-auto flex gap-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        Enviar
                    </button>
                </form>
            </footer>
        </div>
    );
}