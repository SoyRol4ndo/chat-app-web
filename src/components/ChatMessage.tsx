'use client';

import { useAuthStore } from '@/store/useAuthStore';

interface ChatMessageProps {
    message: string;
    photoURL: string;
    timestamp: string;
    userId: string;
}

export const ChatMessage = ({ message, photoURL, timestamp, userId }: ChatMessageProps) => {
    const currentUser = useAuthStore((state) => state.user);
    const isOwn = currentUser?.uid === userId;

    return (
        <div className={`flex items-start gap-2.5 ${isOwn ? 'flex-row-reverse' : ''}`}>
            <img
                className="w-8 h-8 rounded-full"
                src={photoURL || '/default-avatar.png'}
                alt="user avatar"
            />
            <div className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 rounded-lg
        ${isOwn ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                <p className="text-sm font-normal">{message}</p>
                <span className={`text-xs ${isOwn ? 'text-blue-100' : 'text-gray-500'} mt-1`}>
                    {timestamp}
                </span>
            </div>
        </div>
    );
};