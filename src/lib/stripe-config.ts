import Stripe from "stripe";

// Validação das variáveis de ambiente do Stripe
export const validateStripeConfig = () => {
  const requiredEnvVars = [
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    'NEXT_PUBLIC_APP_URL'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required Stripe environment variables: ${missingVars.join(', ')}`);
  }

  // Validar formato das chaves
  if (!process.env.STRIPE_SECRET_KEY?.startsWith('sk_')) {
    throw new Error('Invalid STRIPE_SECRET_KEY format. Should start with sk_test_ or sk_live_');
  }

  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.startsWith('pk_')) {
    throw new Error('Invalid NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY format. Should start with pk_test_ or pk_live_');
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET?.startsWith('whsec_')) {
    throw new Error('Invalid STRIPE_WEBHOOK_SECRET format. Should start with whsec_');
  }

  return true;
};

// Instância do Stripe com validação
export const getStripeInstance = (): Stripe => {
  validateStripeConfig();
  
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }

  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16', // Use a versão mais recente da API
  });
};

// Configurações do webhook
export const getWebhookConfig = () => {
  validateStripeConfig();
  
  return {
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
    appUrl: process.env.NEXT_PUBLIC_APP_URL!,
  };
};

// Configurações do checkout
export const getCheckoutConfig = () => {
  validateStripeConfig();
  
  return {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
    appUrl: process.env.NEXT_PUBLIC_APP_URL!,
  };
};

// Verificar se estamos em modo de teste ou produção
export const isStripeTestMode = (): boolean => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  return secretKey?.startsWith('sk_test_') ?? false;
};

// Log de configuração para debug
export const logStripeConfig = () => {
  console.log('=== Stripe Configuration ===');
  console.log('Mode:', isStripeTestMode() ? 'TEST' : 'LIVE');
  console.log('App URL:', process.env.NEXT_PUBLIC_APP_URL);
  console.log('Webhook Secret configured:', !!process.env.STRIPE_WEBHOOK_SECRET);
  console.log('Publishable Key configured:', !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  console.log('===========================');
};
