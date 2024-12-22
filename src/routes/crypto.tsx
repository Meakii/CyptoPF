import { createFileRoute } from '@tanstack/react-router';
import { CryptoPage } from '@/pages/crypto/index';

export const Route = createFileRoute('/crypto')({
  component: CryptoPage,
});