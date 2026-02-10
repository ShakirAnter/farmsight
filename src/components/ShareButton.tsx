import { useState } from 'react';
import { Share2, Copy, Check, Facebook, Twitter, MessageCircle, Mail } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { toast } from 'sonner@2.0.3';

interface ShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function ShareButton({ 
  title = 'FarmSight - Agricultural Management System',
  text = 'Check out FarmSight - A comprehensive farming management system for Ugandan farmers with offline support!',
  url = typeof window !== 'undefined' ? window.location.href : '',
  variant = 'outline',
  size = 'default'
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  // Native share (mobile devices)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        toast.success('Shared successfully!');
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          console.error('Error sharing:', error);
          toast.error('Failed to share');
        }
      }
    }
  };

  // Copy to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying:', error);
      toast.error('Failed to copy link');
    }
  };

  // Share to WhatsApp
  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${text}\n\n${url}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Share to Facebook
  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  // Share to Twitter
  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  // Share via Email
  const handleEmailShare = () => {
    const emailUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`;
    window.location.href = emailUrl;
  };

  // Check if native share is available
  const hasNativeShare = typeof navigator !== 'undefined' && navigator.share;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size}>
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {hasNativeShare && (
          <>
            <DropdownMenuItem onClick={handleNativeShare} className="cursor-pointer">
              <Share2 className="w-4 h-4 mr-2" />
              Share via...
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        
        <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2 text-green-600" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Link
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleWhatsAppShare} className="cursor-pointer">
          <MessageCircle className="w-4 h-4 mr-2 text-green-600" />
          Share on WhatsApp
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleFacebookShare} className="cursor-pointer">
          <Facebook className="w-4 h-4 mr-2 text-blue-600" />
          Share on Facebook
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleTwitterShare} className="cursor-pointer">
          <Twitter className="w-4 h-4 mr-2 text-sky-500" />
          Share on Twitter
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleEmailShare} className="cursor-pointer">
          <Mail className="w-4 h-4 mr-2 text-gray-600" />
          Share via Email
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
