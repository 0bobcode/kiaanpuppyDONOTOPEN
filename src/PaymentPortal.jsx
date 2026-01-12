import React, { useState, useEffect } from 'react';
import {
    ShieldCheck, CreditCard, ChevronLeft, Lock,
    HelpCircle, CheckCircle2, AlertCircle, RefreshCcw
} from 'lucide-react';
import './app.css'

const PaymentPortal = ({ amount, onPaymentSuccess, onCancel, user }) => {
    const [payStatus, setPayStatus] = useState('idle'); // idle | processing | success | failed
    const [errorMsg, setErrorMsg] = useState('');

    // 1. Load Razorpay Script Dynamically
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);

    const handleRazorpayPayment = async () => {
        setPayStatus('processing');

        // Configuration for the Razorpay Checkout Modal
        const options = {
            key: "rzp_test_YOUR_KEY_HERE", // Replace with your Test Key from Razorpay Dashboard
            amount: amount * 100, // Razorpay works in Paise (100 Paise = 1 INR)
            currency: "INR",
            name: "Regarde Bucks",
            description: "Wallet Top-up for Ivy School Account",
            image: "https://your-ivy-school-logo.com/logo.png", // Replace with your logo
            handler: function (response) {
                // This executes on SUCCESS
                verifyPayment(response);
            },
            prefill: {
                name: user?.name || "Ivy Student",
                email: user?.email || "student@ivyschool.edu",
                contact: user?.phone || "9999999999"
            },
            notes: {
                school_id: user?.id,
                family_id: "FAM-K882"
            },
            theme: {
                color: "#1b4332" // Ivy Green
            },
            modal: {
                ondismiss: function () {
                    setPayStatus('idle');
                }
            }
        };

        const rzp1 = new window.Razorpay(options);

        rzp1.on('payment.failed', function (response) {
            setPayStatus('failed');
            setErrorMsg(response.error.description);
        });

        rzp1.open();
    };

    const verifyPayment = (response) => {
        // In production, you send 'response' to your backend to verify the signature
        console.log("Verification Data:", response);

        setTimeout(() => {
            setPayStatus('success');
            setTimeout(() => onPaymentSuccess(amount), 2000);
        }, 1500);
    };

    return (
        <div className="payment-overlay animate-fade-in">
            <div className="payment-sheet">
                {/* Header */}
                <div className="payment-header">
                    <button className="back-circle" onClick={onCancel}>
                        <ChevronLeft size={20} />
                    </button>
                    <div className="security-badge">
                        <Lock size={12} /> Secure Checkout
                    </div>
                </div>

                {payStatus === 'idle' || payStatus === 'processing' ? (
                    <div className="payment-body">
                        <div className="amount-display">
                            <span className="currency-label">Top-up Amount</span>
                            <h2 className="payment-amount-big">₹{amount.toFixed(2)}</h2>
                        </div>

                        <div className="payment-methods-stack">
                            <div className="method-pill active">
                                <div className="flex items-center gap-3">
                                    <CreditCard className="text-ivy-green" />
                                    <div>
                                        <p className="font-bold">Cards, UPI & Netbanking</p>
                                        <p className="text-xs text-slate-500">Processed via Razorpay</p>
                                    </div>
                                </div>
                                <CheckCircle2 size={18} className="text-ivy-green" />
                            </div>
                        </div>

                        <div className="trust-factors mt-8">
                            <div className="trust-item">
                                <ShieldCheck size={16} />
                                <span>PCI-DSS Compliant</span>
                            </div>
                            <div className="trust-item">
                                <HelpCircle size={16} />
                                <span>24/7 Support</span>
                            </div>
                        </div>

                        <button
                            className={`pay-now-btn ${payStatus === 'processing' ? 'loading' : ''}`}
                            onClick={handleRazorpayPayment}
                            disabled={payStatus === 'processing'}
                        >
                            {payStatus === 'processing' ? (
                                <RefreshCcw className="spinning mr-2" />
                            ) : (
                                `Pay ₹${amount.toFixed(2)}`
                            )}
                        </button>
                    </div>
                ) : payStatus === 'success' ? (
                    <div className="payment-result success text-center py-10">
                        <div className="success-lottie-container">
                            <CheckCircle2 size={80} className="text-green-500 mx-auto" />
                        </div>
                        <h3 className="mt-6 text-2xl font-black">PAYMENT SUCCESSFUL</h3>
                        <p className="text-slate-500">Updating your Bucks Balance...</p>
                    </div>
                ) : (
                    <div className="payment-result failed text-center py-10">
                        <AlertCircle size={80} className="text-red-500 mx-auto" />
                        <h3 className="mt-6 text-2xl font-black">PAYMENT FAILED</h3>
                        <p className="text-slate-500">{errorMsg || "Transaction was declined."}</p>
                        <button className="retry-btn mt-6" onClick={() => setPayStatus('idle')}>
                            Try Again
                        </button>
                    </div>
                )}

                <div className="payment-footer">
                    <p className="text-center text-slate-400 text-xs">
                        By continuing, you agree to the Regarde Bucks Terms of Service.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentPortal;