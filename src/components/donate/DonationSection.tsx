import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Heart, Shield, Lock, CheckCircle2 } from 'lucide-react';

const presetAmounts = [100, 500, 1000, 5000];

interface DonationSectionProps {
  campaignId?: string;
  campaignTitle?: string;
  goalAmount?: number;
  raisedAmount?: number;
  onDonate?: (amount: number) => void;
}

export function DonationSection({
  campaignId,
  campaignTitle = 'General Donation',
  goalAmount = 1000000,
  raisedAmount = 650000,
  onDonate,
}: DonationSectionProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const progressPercent = (raisedAmount / goalAmount) * 100;
  const currentAmount = customAmount ? parseInt(customAmount) : selectedAmount || 0;

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setCustomAmount(numericValue);
    setSelectedAmount(null);
  };

  const handleDonate = async () => {
    if (currentAmount < 10) return;

    setIsProcessing(true);
    
    // TODO: Integrate Razorpay payment gateway
    // const razorpay = new Razorpay({
    //   key: process.env.RAZORPAY_KEY_ID,
    //   amount: currentAmount * 100,
    //   currency: 'INR',
    //   name: 'HopeConnect',
    //   description: campaignTitle,
    //   handler: (response) => handlePaymentSuccess(response),
    // });
    // razorpay.open();

    // Mock success for demo
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowSuccess(true);
    onDonate?.(currentAmount);

    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (showSuccess) {
    return (
      <div className="card-elevated p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4 animate-scale-in">
          <CheckCircle2 className="w-8 h-8 text-success" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
        <p className="text-muted-foreground mb-4">
          Your donation of ₹{currentAmount.toLocaleString()} has been received.
        </p>
        <p className="text-sm text-muted-foreground">
          A receipt has been sent to your email.
        </p>
      </div>
    );
  }

  return (
    <div className="card-elevated p-6 sm:p-8">
      <h3 className="text-xl font-semibold mb-2">Support This Campaign</h3>
      <p className="text-sm text-muted-foreground mb-6">{campaignTitle}</p>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-semibold text-primary">
            ₹{raisedAmount.toLocaleString()}
          </span>
          <span className="text-muted-foreground">
            of ₹{goalAmount.toLocaleString()}
          </span>
        </div>
        <Progress value={progressPercent} className="h-3" />
        <p className="text-xs text-muted-foreground mt-2">
          {progressPercent.toFixed(0)}% of goal reached
        </p>
      </div>

      {/* Amount Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3">Select Amount</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {presetAmounts.map((amount) => (
            <Button
              key={amount}
              variant={selectedAmount === amount ? 'amount-selected' : 'amount'}
              onClick={() => handleAmountSelect(amount)}
              className="h-12"
            >
              ₹{amount.toLocaleString()}
            </Button>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
            ₹
          </span>
          <Input
            type="text"
            inputMode="numeric"
            placeholder="Enter custom amount"
            value={customAmount}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
            className="pl-8 h-12 text-lg"
          />
        </div>
      </div>

      {/* Donate Button */}
      <Button
        variant="hero"
        size="xl"
        className="w-full mb-4"
        disabled={currentAmount < 10 || isProcessing}
        onClick={handleDonate}
      >
        {isProcessing ? (
          <span className="flex items-center gap-2">
            <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Processing...
          </span>
        ) : (
          <>
            <Heart className="w-5 h-5" />
            Donate ₹{currentAmount.toLocaleString()}
          </>
        )}
      </Button>

      {/* Trust Badges */}
      <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Shield className="w-4 h-4" />
          <span>Verified NGO</span>
        </div>
        <div className="flex items-center gap-1">
          <Lock className="w-4 h-4" />
          <span>Secure Payment</span>
        </div>
      </div>

      {/* TODO Comment */}
      {/* TODO: Integrate Razorpay payment gateway for actual transactions */}
    </div>
  );
}
