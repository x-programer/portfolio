"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { Mail, Trash2, CheckCircle, Loader2, RefreshCw, Lock, LogOut } from "lucide-react";

// 🔒 SECURITY CONFIGURATION
const ADMIN_EMAIL = "ringtoneboy1530@gmail.com";

export default function AdminMessagesPage() {
    const [user, authLoading] = useAuthState(auth);
    const [messages, setMessages] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const router = useRouter();

    // 1. Data Fetching (Only runs if authorized)
    useEffect(() => {
        if (user?.email === ADMIN_EMAIL) {
            const q = query(
                collection(db, "portfolio_messages"),
                orderBy("timestamp", "desc")
            );

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const msgs = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setMessages(msgs);
                setIsFetching(false);
            });

            return () => unsubscribe();
        } else {
            setIsFetching(false);
        }
    }, [user]);

    // 2. Actions
    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Login failed", error);
            if (error.code === 'auth/operation-not-allowed') {
                alert("Login Error: Google Sign-In is not enabled. \n\nPlease go to Firebase Console -> Authentication -> Sign-in method and enable 'Google'.");
            } else if (error.code === 'auth/popup-closed-by-user') {
                console.log("Login canceled by user");
            } else {
                alert(`Login failed: ${error.message}`);
            }
        }
    };

    const toggleReadStatus = async (id, currentStatus) => {
        try {
            const messageRef = doc(db, "portfolio_messages", id);
            await updateDoc(messageRef, { read: !currentStatus });
        } catch (error) {
            console.error("Error updating message:", error);
        }
    };

    const deleteMessage = async (id) => {
        if (window.confirm("Are you sure you want to delete this message?")) {
            try {
                await deleteDoc(doc(db, "portfolio_messages", id));
            } catch (error) {
                console.error("Error deleting message:", error);
            }
        }
    };

    // 3. Date Formatter Helper (Handles both Strings and Firestore Timestamps)
    const formatDate = (timestamp) => {
        if (!timestamp) return "Unknown Date"
        // If it's a Firestore Timestamp (has .toDate)
        if (timestamp.toDate) return timestamp.toDate().toLocaleString();
        // If it's an ISO String (from Contact.jsx)
        return new Date(timestamp).toLocaleString();
    };

    // --- RENDER STATES ---

    // A. Loading
    if (authLoading || (user?.email === ADMIN_EMAIL && isFetching)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    // B. Not Logged In (Show Login Button instead of redirecting)
    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-zinc-950 p-4 pointer-events-auto relative z-20">
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-800 text-center max-w-md w-full">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Restricted Access</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">This page is for the administrator only.</p>
                    <button
                        onClick={handleLogin}
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                    >
                        <Mail size={20} />
                        Sign in with Google
                    </button>
                </div>
            </div>
        );
    }

    // C. Logged In but WRONG Email
    if (user.email !== ADMIN_EMAIL) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 dark:bg-red-950/20 p-4 text-center">
                <h1 className="text-3xl font-bold text-red-600 mb-2">Access Denied</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-6">You are signed in as <strong>{user.email}</strong>, but you are not the admin.</p>
                <button
                    onClick={() => signOut(auth)}
                    className="px-6 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                    Sign Out
                </button>
            </div>
        );
    }

    // D. Authorized Admin Dashboard
    const unreadCount = messages.filter((m) => !m.read).length;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-6 md:p-12 font-sans pointer-events-auto relative z-20">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                            Inbox
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            {unreadCount} unread message{unreadCount !== 1 && "s"}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="px-4 py-2 bg-white dark:bg-zinc-900 rounded-full border border-gray-200 dark:border-zinc-800 text-xs font-mono text-gray-500">
                            {user.email}
                        </div>
                        <button
                            onClick={() => signOut(auth)}
                            className="p-3 bg-white dark:bg-zinc-900 rounded-full shadow-sm border border-gray-100 dark:border-zinc-800 text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Sign Out"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Messages List */}
                <div className="space-y-4">
                    {messages.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-2xl border border-dashed border-gray-200 dark:border-zinc-800">
                            <div className="w-16 h-16 bg-gray-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                No messages yet
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">
                                New contact form submissions will appear here.
                            </p>
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`group relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${!msg.read
                                    ? "bg-white dark:bg-zinc-900 border-blue-500/30 shadow-md transform scale-[1.01]"
                                    : "bg-gray-50/50 dark:bg-zinc-900/50 border-gray-200 dark:border-zinc-800 opacity-75 hover:opacity-100"
                                    }`}
                            >
                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                    {/* Content */}
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <h3
                                                className={`text-lg ${!msg.read
                                                    ? "font-bold text-gray-900 dark:text-white"
                                                    : "font-medium text-gray-700 dark:text-gray-300"
                                                    }`}
                                            >
                                                {msg.name}
                                            </h3>
                                            {!msg.read && (
                                                <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
                                                    New
                                                </span>
                                            )}
                                            <span className="text-sm text-gray-400 flex items-center gap-1">
                                                {formatDate(msg.timestamp)}
                                            </span>
                                        </div>
                                        <a href={`mailto:${msg.email}`} className="block text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline w-fit">
                                            {msg.email}
                                        </a>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap pt-2">
                                            {msg.message}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex md:flex-col gap-2 justify-end md:justify-start shrink-0">
                                        <button
                                            onClick={() => toggleReadStatus(msg.id, msg.read)}
                                            className={`p-2 rounded-lg border transition-colors ${msg.read
                                                ? "border-gray-200 dark:border-zinc-700 text-gray-400 hover:text-blue-500 hover:border-blue-500"
                                                : "border-blue-200 dark:border-blue-800 text-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                                }`}
                                            title={msg.read ? "Mark as unread" : "Mark as read"}
                                        >
                                            {msg.read ? (
                                                <RefreshCw className="w-5 h-5" />
                                            ) : (
                                                <CheckCircle className="w-5 h-5" />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => deleteMessage(msg.id)}
                                            className="p-2 rounded-lg border border-red-200 dark:border-red-900/30 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                                            title="Delete message"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}