# GoSonGim-FE Cursor Rules

Speech training app with **domain-driven architecture** using React 19, TypeScript 5.9, Vite 7.

## Tech Stack

- **Framework**: React 19 + TypeScript 5.9 + Vite 7
- **State**: Zustand 5 (persist) | React Query 5
- **HTTP**: axios 1.13
- **Style**: Tailwind CSS 4
- **Audio**: meyda 5.6, pitchy 4.1
- **Animation**: framer-motion 12, lottie-react 2.4

## Domains

**auth** • **search** (situation, lipsound) • **talkingkit** (kit, loudSound, breathing, shortSound, vowelPitch, steadySound) • **freetalk** • **review** • **profile** • **studytalk** • **home** • **common**

## Folder Structure

```
src/
├── apis/          # Backend communication
├── assets/        # SVGs, fonts
├── components/    # React components
├── hooks/         # Custom hooks
├── mock/          # Mock data
├── pages/         # Route components
├── providers/     # Context providers
├── stores/        # Zustand stores
├── types/         # TypeScript definitions
└── utils/         # Utility functions
```

### Domain Pattern

```
domain/
├── apis/domain/
│   ├── index.ts              # Export domainAPI object
│   ├── mutations/            # POST/PUT/DELETE
│   └── queries/              # GET
├── types/domain/
│   ├── index.ts              # Barrel export
│   ├── models.ts             # Core entities
│   ├── mutations/*.types.ts
│   └── queries/*.types.ts
├── hooks/domain/
│   ├── useDomainLogic.ts     # Business logic
│   ├── mutations/useOperationMutation.ts
│   └── queries/useOperationQuery.ts
├── components/domain/
│   ├── common/               # Domain-shared
│   └── feature/
├── pages/domain/
├── utils/domain/
└── assets/svgs/domain/
```

### Nested Domains (talkingkit, search)

```
talkingkit/
├── apis/talkingkit/
│   ├── index.ts              # Re-export subdomain APIs
│   ├── mutations/evaluation.ts
│   └── kit/                  # Subdomain
│       ├── index.ts
│       ├── mutations/
│       └── queries/
└── types/talkingkit/
    ├── models.ts             # Top-level models
    └── kit/                  # Subdomain types
        ├── models.ts
        ├── mutations/
        └── queries/
```

## Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Components | `PascalCase.tsx` | `SignupBottomSheet.tsx` |
| Pages | `PascalCase.tsx` | `Login.tsx` |
| Hooks | `usePascalCase.ts` | `useLoginMutation.ts` |
| Types | `operation.types.ts`, `models.ts` | `login.types.ts` |
| APIs | `camelCase.ts` | `login.ts` |
| Utils | `descriptiveUtils.ts` | `validationUtils.ts` |
| Stores | `useDomainStore.ts` | `useAuthStore.ts` |
| Assets | `camelCase.svg` | `emailIcon.svg` |

### Code Naming

```typescript
// API Functions: camelCase verb + noun
export const emailLogin = async (data: LoginRequest): Promise<LoginResponse> => {}

// Types/Interfaces: PascalCase
export interface User {}
export interface LoginRequest {}

// API Object: domain + "API"
export const authAPI = { emailLogin, googleLogin, emailSignup };

// Hooks: use + PascalCase
export const useLogin = () => {}
export const useLoginMutation = () => {}  // React Query
```

## Code Organization

### 1. APIs (`src/apis/{domain}/`)

```typescript
// apis/auth/mutations/login.ts
import { apiClient } from '@/apis/client';
import type { LoginRequest, LoginResponse } from '@/types/auth';

export const emailLogin = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/api/v1/auth/email/login', data);
  return response.data;
};

// apis/auth/index.ts
import { emailLogin, googleLogin } from './mutations/login';
import { emailSignup } from './mutations/signup';
import { validateEmail } from './queries/validateEmail';

export const authAPI = { emailLogin, googleLogin, emailSignup, validateEmail };
```

**Rules**: Separate mutations/queries • Use apiClient • Return response.data • Export API object from index • No error handling in API layer

### 2. Types (`src/types/{domain}/`)

```typescript
// types/auth/models.ts - Core entities
export interface User {
  id: number;
  email: string;
  nickname: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// types/auth/mutations/login.types.ts - Operation types
import type { User, AuthTokens } from '../models';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  result: {
    tokens: AuthTokens;
    user: User;
  };
}

// types/auth/index.ts - Barrel export
export * from './models';
export * from './mutations/login.types';
export * from './queries/validateEmail.types';
```

**Rules**: Separate models from operation types • Mirror API structure (mutations/queries) • Barrel exports via index.ts

### 3. Hooks (`src/hooks/{domain}/`)

```typescript
// hooks/auth/mutations/useLoginMutation.ts - React Query
import { useMutation } from '@tanstack/react-query';
import { authAPI } from '@/apis/auth';
import { useAuthStore } from '@/stores/useAuthStore';

export const useLoginMutation = () => {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: authAPI.emailLogin,
    onSuccess: ({ result }) => login(result.user, result.tokens.accessToken, result.tokens.refreshToken),
    onError: (error) => console.error('Login failed:', error),
  });
};

// hooks/auth/useLoginForm.ts - Business logic
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from './mutations/useLoginMutation';

export const useLoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginMutation = useLoginMutation();

  const handleSubmit = async () => {
    await loginMutation.mutateAsync({ email, password });
    navigate('/home');
  };

  return { email, setEmail, password, setPassword, handleSubmit, isLoading: loginMutation.isPending };
};
```

**Rules**: Separate React Query hooks (mutations/queries) from business logic • All API calls via React Query • Handle side effects in onSuccess/onError

### 4. Components (`src/components/{domain}/`)

```typescript
// components/auth/login/SignupBottomSheet.tsx
import { BottomSheet } from '@/components/auth/common/BottomSheet';
import { Button } from '@/components/auth/common/Button';
import EmailIcon from '@/assets/svgs/auth/login/emailIcon.svg';

interface SignupBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onEmailSignup: () => void;
}

export const SignupBottomSheet = ({ isOpen, onClose, onEmailSignup }: SignupBottomSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold">회원가입</h2>
      <Button onClick={onEmailSignup}>
        <EmailIcon className="h-5 w-5" />
        <span>이메일로 계속하기</span>
      </Button>
    </BottomSheet>
  );
};
```

**Rules**: Props interface above component • Named exports • SVG as React components • Tailwind CSS • Domain structure with common/ folder • No data fetching in components

### 5. Pages (`src/pages/{domain}/`)

```typescript
// pages/auth/loginForm/LoginForm.tsx
import { useLoginForm } from '@/hooks/auth/useLoginForm';
import { Input } from '@/components/auth/common/Input';
import BackIcon from '@/assets/svgs/auth/login/back.svg';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const navigate = useNavigate();
  const { email, setEmail, password, setPassword, handleSubmit, isLoading } = useLoginForm();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="p-4">
        <button onClick={() => navigate(-1)}>
          <BackIcon className="h-6 w-6" />
        </button>
      </header>
      <main className="flex-1 p-6">
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleSubmit} disabled={isLoading}>로그인</button>
      </main>
    </div>
  );
};
```

**Rules**: Route-level components • Use hooks for logic • Import domain components • No complex logic in pages

### 6. Stores (`src/stores/`)

```typescript
// stores/useAuthStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/auth';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      login: (user, accessToken, refreshToken) => set({ user, accessToken, isAuthenticated: true }),
      logout: () => set({ user: null, accessToken: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
);
```

**Rules**: Separate state/actions interfaces • Use persist for persistence • Name as useDomainStore

## Import Guidelines

### Path Alias (@/)

```typescript
// ✅ Correct
import { authAPI } from '@/apis/auth';
import { User } from '@/types/auth';
import { useAuthStore } from '@/stores/useAuthStore';
import EmailIcon from '@/assets/svgs/auth/login/emailIcon.svg';

// ❌ Incorrect
import { authAPI } from '../../../apis/auth';
```

### Import Order

```typescript
// 1. External libraries
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

// 2. APIs
import { authAPI } from '@/apis/auth';

// 3. Types
import type { LoginRequest } from '@/types/auth';

// 4. Stores
import { useAuthStore } from '@/stores/useAuthStore';

// 5. Hooks
import { useLoginForm } from '@/hooks/auth/useLoginForm';

// 6. Components
import { Input } from '@/components/auth/common/Input';

// 7. Utils
import { isValidEmail } from '@/utils/auth/validationUtils';

// 8. Assets
import EmailIcon from '@/assets/svgs/auth/login/emailIcon.svg';
```

### Barrel Exports

```typescript
// ✅ Use barrel exports
import { LoginRequest, User, AuthTokens } from '@/types/auth';

// ❌ Don't import individual files when barrel exists
import { User } from '@/types/auth/models';
import { LoginRequest } from '@/types/auth/mutations/login.types';
```

## TypeScript

```typescript
// ✅ Interface for object shapes
interface User { id: number; email: string; }

// ✅ Type for unions, intersections
type UserRole = 'admin' | 'user';
type UserWithRole = User & { role: UserRole };

// ✅ Props interface
interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

// ✅ Generic API response
interface ApiResponse<T> {
  success: boolean;
  result: T;
}
```

## Styling (Tailwind CSS)

```tsx
// Basic usage
<div className="flex min-h-screen flex-col bg-white">
  <button className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
    Click
  </button>
</div>

// Conditional classes with clsx
import clsx from 'clsx';

<button className={clsx(
  'rounded-lg px-4 py-2',
  variant === 'primary' && 'bg-blue-500',
  disabled && 'opacity-50 cursor-not-allowed'
)}>
  {children}
</button>

// Responsive (mobile-first)
<div className="text-sm md:text-base lg:text-lg">Text</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">Items</div>
```

## React Query

```typescript
// Query keys: array-based
['kitDetail', kitId]
['kitsByCategory', category]

// Mutation
export const useLoginMutation = () => {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: authAPI.emailLogin,
    onSuccess: ({ result }) => login(result.user, result.tokens.accessToken),
    onError: (error) => console.error(error),
  });
};

// Query with conditional fetch
export const useKitDetail = (kitId: number) => {
  return useQuery({
    queryKey: ['kitDetail', kitId],
    queryFn: () => kitAPI.getKitDetail(kitId),
    enabled: kitId > 0,
  });
};
```

## Best Practices

**General**
- ✅ Functional components with hooks
- ✅ Composition over inheritance
- ✅ Small, focused components
- ✅ Extract logic to hooks
- ✅ No `any` types
- ❌ No class components
- ❌ No logic in UI components

**Performance**
- ✅ `React.memo` for expensive components
- ✅ `useMemo`/`useCallback` when needed
- ✅ Lazy load routes with `React.lazy`

**Accessibility**
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Color contrast

**Code Quality**
- ✅ ESLint + Prettier
- ✅ Descriptive names
- ✅ Files under 300 lines
- ❌ No console.logs in production

## Common Patterns

```typescript
// Protected Routes
{
  element: <RequireAuth />,
  children: [
    { path: '/home', element: <Home /> },
  ],
}

// SVG Import
import EmailIcon from '@/assets/svgs/auth/login/emailIcon.svg';
<EmailIcon className="h-5 w-5" />

// Form Hook
export const useLoginForm = () => {
  const [email, setEmail] = useState('');
  const loginMutation = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginMutation.mutateAsync({ email });
  };

  return { email, setEmail, handleSubmit };
};

// Audio Recording
import { useAudioRecorder } from '@/hooks/common/useAudioRecorder';
const { startRecording, stopRecording, audioBlob } = useAudioRecorder();
```

## Project-Specific

**Audio**: `meyda` (feature extraction), `pitchy` (pitch detection) • Hooks: `usePitchDetection`, `useDecibelDetection` • Utils: `volumeEvaluation.ts`, `pitchEvaluation.ts`

**AI Avatar**: Heygen integration in `freetalk` • Hook: `useHeygenAvatar` • API: `apis/freetalk/heygen.ts`

**Animation**: `framer-motion` (complex), `lottie-react` (Lottie), Tailwind transitions (SVG)

**Charts**: `recharts` (progress), `react-calendar` (review tracking)

## Quick Reference: New Feature

1. **Types** (`types/{domain}/`) → Add models to `models.ts` → Create `mutations/operation.types.ts` → Export from `index.ts`
2. **API** (`apis/{domain}/`) → Add function in `mutations/operation.ts` → Export from `index.ts` in API object
3. **React Query Hooks** (`hooks/{domain}/`) → Create `mutations/useOperationMutation.ts` or `queries/useOperationQuery.ts`
4. **Business Logic Hook** (`hooks/{domain}/`) → Create `useFeature.ts` (if needed)
5. **Components** (`components/{domain}/`) → Add to feature folder or `common/`
6. **Page** (`pages/{domain}/`) → Use hooks, import components
7. **Route** (`router.tsx`) → Add route
8. **Assets** (`assets/svgs/{domain}/`) → Add SVGs

## Core Principles

**Domain-driven** → Organize by feature, not file type
**Mutations/Queries** → Separate read/write operations
**Barrel exports** → Clean imports via index files
**Type safety** → Strict TypeScript
**React Query** → All API calls through hooks
**Zustand** → Minimal global state
**Tailwind** → Utility-first styling
**Clean code** → Self-documenting, small functions
