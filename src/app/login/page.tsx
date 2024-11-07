'use client';

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const setUser = useAuthStore((state) => state.setUser);

    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            const idToken = await result.user.getIdToken();
            document.cookie = `firebase-session-token=${idToken}; path=/`;

            setUser(result.user);
            router.push('/chat');
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Bienvenido al Chat</h1>
                <button
                    onClick={signInWithGoogle}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    Iniciar sesión con Google
                </button>
            </div>
        </div>
    );
}
