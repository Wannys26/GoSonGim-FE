# GoSonGim-FE Cursor Rules

## Project Overview

GoSonGim-FE is a speech training application built with React, TypeScript, and Vite. The project follows a **domain-driven architecture** with clear separation of concerns across APIs, components, hooks, types, and utilities.

---

## Core Technologies

- **Framework**: React 19.1.1 + TypeScript 5.9.3
- **Build Tool**: Vite 7.1.7
- **Routing**: react-router-dom 7.9.4
- **State Management**: Zustand 5.0.8 (with persist middleware)
- **Data Fetching**: @tanstack/react-query 5.90.5
- **HTTP Client**: axios 1.13.0
- **Styling**: Tailwind CSS 4.1.16
- **Animation**: framer-motion 12.23.24, lottie-react 2.4.1
- **Audio Processing**: meyda 5.6.3, pitchy 4.1.0
- **AI Avatar**: @heygen/streaming-avatar 2.1.0

---

## Domain Structure

The project is organized into the following domains:

- **auth** - Authentication & authorization
- **search** - Search functionality with subdomains (situation, lipsound)
- **talkingkit** - Core training kits with subdomains (kit, loudSound, breathing, shortSound, vowelPitch, steadySound)
- **freetalk** - Free conversation practice
- **review** - Review and practice sessions
- **profile** - User profile management
- **studytalk** - Study session functionality
- **home** - Home page
- **common** - Shared/reusable code

---

## Folder Structure

```
src/
├── apis/          # API layer (backend communication)
├── assets/        # Static assets (SVGs, fonts)
├── components/    # React components
├── hooks/         # Custom React hooks
├── mock/          # Mock data for development
├── pages/         # Page-level components (routes)
├── providers/     # React context providers
├── stores/        # State management (Zustand)
├── styles/        # Global styles
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

### Domain Organization Pattern

Each domain follows this structure across different directories:

```
domain/
├── apis/domain/
│   ├── index.ts              # Exports domainAPI object
│   ├── mutations/            # Write operations (POST, PUT, DELETE)
│   │   ├── operation.ts
│   │   └── ...
│   └── queries/              # Read operations (GET)
│       ├── operation.ts
│       └── ...
│
├── types/domain/
│   ├── index.ts              # Barrel export
│   ├── models.ts             # Core domain entities
│   ├── mutations/
│   │   └── operation.types.ts
│   └── queries/
│       └── operation.types.ts
│
├── hooks/domain/
│   ├── useDomainLogic.ts     # Business logic hooks
│   ├── mutations/
│   │   └── useOperationMutation.ts
│   └── queries/
│       └── useOperationQuery.ts
│
├── components/domain/
│   ├── common/               # Domain-shared components
│   ├── feature1/
│   └── feature2/
│
├── pages/domain/
│   ├── DomainPage.tsx
│   ├── feature1/
│   └── feature2/
│
├── utils/domain/
│   └── domainUtils.ts
│
└── assets/svgs/domain/
    ├── common/
    └── feature/
```

### Nested Domain Pattern

For complex domains with subdomains (e.g., talkingkit, search):

```
talkingkit/
├── apis/talkingkit/
│   ├── index.ts              # Re-exports subdomain APIs
│   ├── mutations/            # Top-level mutations
│   │   └── evaluation.ts
│   └── kit/                  # Subdomain
│       ├── index.ts          # Exports kitAPI object
│       ├── mutations/
│       └── queries/
│
└── types/talkingkit/
    ├── index.ts
    ├── models.ts             # Top-level models
    ├── pitch.ts              # Feature-specific types
    └── kit/                  # Subdomain types
        ├── index.ts
        ├── models.ts
        ├── mutations/
        └── queries/
```

---

## Naming Conventions

### File Naming

| Type | Pattern | Example |
|------|---------|---------|
| **Components** | `PascalCase.tsx` | `SignupBottomSheet.tsx`, `Modal.tsx` |
| **Pages** | `PascalCase.tsx` | `Login.tsx`, `KitDetail.tsx` |
| **Hooks** | `usePascalCase.ts` | `useLogin.ts`, `useLoginMutation.ts` |
| **Types** | `operation.types.ts` or `models.ts` | `login.types.ts`, `models.ts` |
| **API Functions** | `camelCase.ts` | `login.ts`, `validateEmail.ts` |
| **Utilities** | `descriptiveUtils.ts` | `validationUtils.ts`, `audioUtils.ts` |
| **Stores** | `useDomainStore.ts` | `useAuthStore.ts`, `studyTalkStore.ts` |
| **Assets** | `camelCase.svg` | `emailIcon.svg`, `googleLogo.svg` |

### Code Naming

```typescript
// API Functions: camelCase verb + noun
export const emailLogin = async (data: LoginRequest): Promise<LoginResponse> => {}
export const getKitDetail = async (kitId: number): Promise<KitDetailResponse> => {}

// Type/Interface: PascalCase
export interface User {}
export interface LoginRequest {}
export interface AuthTokens {}

// API Object Exports: domain + "API"
export const authAPI = { emailLogin, googleLogin, emailSignup };
export const kitAPI = { getCategories, getKitDetail };

// Custom Hooks: use + PascalCase
export const useLogin = () => {}
export const useLoginForm = () => {}

// React Query Hooks: use + Operation + "Mutation" or "Query"
export const useLoginMutation = () => {}
export const useKitDetail = (kitId: number) => {}
```

---

## Code Organization Guidelines

### 1. API Layer

**Location**: `src/apis/{domain}/`

#### Structure:
```typescript
// src/apis/auth/mutations/login.ts
import { apiClient } from '@/apis/client';
import type { LoginRequest, LoginResponse } from '@/types/auth';

export const emailLogin = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/api/v1/auth/email/login', data);
  return response.data;
};

export const googleLogin = async (data: GoogleLoginRequest): Promise<GoogleLoginResponse> => {
  const response = await apiClient.post<GoogleLoginResponse>('/api/v1/auth/google/login', data);
  return response.data;
};
```

#### Index File:
```typescript
// src/apis/auth/index.ts
import { emailLogin, googleLogin } from './mutations/login';
import { emailSignup } from './mutations/signup';
import { logout } from './mutations/logout';
import { validateEmail } from './queries/validateEmail';
import { refreshToken } from './queries/refreshToken';

export const authAPI = {
  emailLogin,
  googleLogin,
  emailSignup,
  logout,
  validateEmail,
  refreshToken,
};
```

**Rules**:
- ✅ One API function per file (can group related operations like login methods)
- ✅ Separate mutations (POST/PUT/DELETE) from queries (GET)
- ✅ Use `apiClient` from `@/apis/client.ts`
- ✅ Return `response.data` directly
- ✅ Export aggregated API object from index.ts
- ❌ Don't include error handling in API functions (handle in hooks)

### 2. Type Definitions

**Location**: `src/types/{domain}/`

#### Models File:
```typescript
// src/types/auth/models.ts
// Core domain entities only
export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImage: string | null;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  refreshExpiresIn: number;
}
```

#### Operation Types:
```typescript
// src/types/auth/mutations/login.types.ts
import type { User, AuthTokens } from '../models';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  status: number;
  message: string;
  timestamp: string;
  result: {
    tokens: AuthTokens;
    user: User;
  };
}

export interface GoogleLoginRequest {
  code: string;
}

export interface GoogleLoginResponse {
  // Same structure as LoginResponse
  success: boolean;
  status: number;
  message: string;
  timestamp: string;
  result: {
    tokens: AuthTokens;
    user: User;
  };
}
```

#### Index File:
```typescript
// src/types/auth/index.ts
export * from './models';
export * from './mutations/login.types';
export * from './mutations/signup.types';
export * from './mutations/logout.types';
export * from './queries/validateEmail.types';
export * from './queries/refreshToken.types';
```

**Rules**:
- ✅ Separate core models from operation-specific types
- ✅ Use `models.ts` for domain entities
- ✅ Use `operation.types.ts` for request/response pairs
- ✅ Mirror the API structure (mutations/ and queries/)
- ✅ Export all types via index.ts for clean imports
- ✅ Reuse models in operation types via imports

### 3. React Hooks

**Location**: `src/hooks/{domain}/`

#### React Query Mutation:
```typescript
// src/hooks/auth/mutations/useLoginMutation.ts
import { useMutation } from '@tanstack/react-query';
import { authAPI } from '@/apis/auth';
import { useAuthStore } from '@/stores/useAuthStore';
import type { LoginRequest } from '@/types/auth';

export const useLoginMutation = () => {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (data: LoginRequest) => authAPI.emailLogin(data),
    onSuccess: (response) => {
      const { user, tokens } = response.result;
      login(user, tokens.accessToken, tokens.refreshToken);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
};
```

#### React Query Query:
```typescript
// src/hooks/talkingkit/queries/useKitDetail.ts
import { useQuery } from '@tanstack/react-query';
import { kitAPI } from '@/apis/talkingkit';

export const useKitDetail = (kitId: number) => {
  return useQuery({
    queryKey: ['kitDetail', kitId],
    queryFn: () => kitAPI.getKitDetail(kitId),
    enabled: kitId > 0,
  });
};
```

#### Business Logic Hook:
```typescript
// src/hooks/auth/useLoginForm.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from './mutations/useLoginMutation';

export const useLoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLoginMutation();

  const handleSubmit = async () => {
    try {
      await loginMutation.mutateAsync({ email, password });
      navigate('/home');
    } catch (error) {
      // Error handling
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    handleSubmit,
    isLoading: loginMutation.isPending,
  };
};
```

**Rules**:
- ✅ Separate React Query hooks (`mutations/`, `queries/`) from business logic hooks
- ✅ Use React Query for all API calls
- ✅ Handle side effects (store updates, navigation) in `onSuccess`/`onError`
- ✅ Business logic hooks can compose multiple query/mutation hooks
- ✅ Return clear, typed values from hooks
- ❌ Don't call APIs directly in components

### 4. Components

**Location**: `src/components/{domain}/`

#### Component Structure:
```typescript
// src/components/auth/login/SignupBottomSheet.tsx
import { BottomSheet } from '@/components/auth/common/BottomSheet';
import { Button } from '@/components/auth/common/Button';
import EmailIcon from '@/assets/svgs/auth/login/emailIcon.svg';
import GoogleLogo from '@/assets/svgs/auth/login/googleLogo.svg';

interface SignupBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onGoogleSignup: () => void;
  onEmailSignup: () => void;
}

export const SignupBottomSheet = ({
  isOpen,
  onClose,
  onGoogleSignup,
  onEmailSignup,
}: SignupBottomSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4 p-6">
        <h2 className="text-xl font-bold">회원가입</h2>

        <Button onClick={onGoogleSignup} variant="outline">
          <GoogleLogo className="h-5 w-5" />
          <span>Google로 계속하기</span>
        </Button>

        <Button onClick={onEmailSignup} variant="primary">
          <EmailIcon className="h-5 w-5" />
          <span>이메일로 계속하기</span>
        </Button>
      </div>
    </BottomSheet>
  );
};
```

**Rules**:
- ✅ Define props interface above component
- ✅ Export component as named export
- ✅ Import SVGs as React components
- ✅ Use Tailwind CSS for styling
- ✅ Destructure props in function parameters
- ✅ Organize components by domain with `common/` folder for shared components
- ❌ Don't fetch data directly in components (use hooks)

### 5. Pages

**Location**: `src/pages/{domain}/`

#### Page Structure:
```typescript
// src/pages/auth/loginForm/LoginForm.tsx
import { useLoginForm } from '@/hooks/auth/useLoginForm';
import { Input } from '@/components/auth/common/Input';
import { LoginButton } from '@/components/auth/loginForm/LoginButton';
import BackIcon from '@/assets/svgs/auth/login/back.svg';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const navigate = useNavigate();
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    handleSubmit,
    isLoading,
  } = useLoginForm();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center p-4">
        <button onClick={() => navigate(-1)}>
          <BackIcon className="h-6 w-6" />
        </button>
      </header>

      <main className="flex flex-1 flex-col gap-6 p-6">
        <h1 className="text-2xl font-bold">로그인</h1>

        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />

        <LoginButton
          onClick={handleSubmit}
          disabled={isLoading}
        >
          로그인
        </LoginButton>
      </main>
    </div>
  );
};
```

**Rules**:
- ✅ Pages are route-level components
- ✅ Use custom hooks for logic and state
- ✅ Import domain-specific components
- ✅ Handle navigation with `useNavigate`
- ✅ One page per file
- ❌ Don't put complex logic in pages (extract to hooks)

### 6. Utilities

**Location**: `src/utils/{domain}/`

```typescript
// src/utils/auth/validationUtils.ts
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 8;
};

export const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
  if (password.length < 8) return 'weak';
  if (password.length < 12) return 'medium';
  return 'strong';
};
```

**Rules**:
- ✅ Pure functions only
- ✅ Domain-specific utilities in domain folders
- ✅ Common utilities in `utils/common/`
- ✅ Export individual functions
- ✅ Add JSDoc comments for complex logic

### 7. State Management (Zustand)

**Location**: `src/stores/`

```typescript
// src/stores/useAuthStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/auth';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  updateUser: (user: User) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // State
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      // Actions
      login: (user, accessToken, refreshToken) =>
        set({ user, accessToken, refreshToken, isAuthenticated: true }),

      logout: () =>
        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false }),

      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),

      updateUser: (user) =>
        set({ user }),
    }),
    { name: 'auth-storage' }
  )
);
```

**Rules**:
- ✅ Separate state interface from actions interface
- ✅ Use `persist` middleware for persistence
- ✅ Name stores as `useDomainStore`
- ✅ Define clear action names
- ✅ Type all state and actions

---

## Import Guidelines

### Path Alias

Use `@/` alias for all imports:

```typescript
// ✅ Correct
import { authAPI } from '@/apis/auth';
import { User } from '@/types/auth';
import { useAuthStore } from '@/stores/useAuthStore';
import { Input } from '@/components/auth/common/Input';
import EmailIcon from '@/assets/svgs/auth/login/emailIcon.svg';

// ❌ Incorrect
import { authAPI } from '../../../apis/auth';
import { User } from '../../types/auth';
```

### Import Order

```typescript
// 1. External libraries
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

// 2. APIs
import { authAPI } from '@/apis/auth';

// 3. Types
import type { LoginRequest, User } from '@/types/auth';

// 4. Stores
import { useAuthStore } from '@/stores/useAuthStore';

// 5. Hooks
import { useLoginForm } from '@/hooks/auth/useLoginForm';

// 6. Components
import { Input } from '@/components/auth/common/Input';
import { Button } from '@/components/auth/common/Button';

// 7. Utils
import { isValidEmail } from '@/utils/auth/validationUtils';

// 8. Assets
import EmailIcon from '@/assets/svgs/auth/login/emailIcon.svg';
```

### Barrel Exports

Use index files for clean imports:

```typescript
// ✅ Use barrel exports
import { LoginRequest, LoginResponse, User, AuthTokens } from '@/types/auth';

// ❌ Don't import from individual files when barrel exists
import { LoginRequest, LoginResponse } from '@/types/auth/mutations/login.types';
import { User, AuthTokens } from '@/types/auth/models';
```

---

## TypeScript Guidelines

### Type vs Interface

```typescript
// ✅ Use interface for object shapes
interface User {
  id: number;
  email: string;
}

// ✅ Use type for unions, intersections, utilities
type UserRole = 'admin' | 'user' | 'guest';
type UserWithRole = User & { role: UserRole };

// ✅ Use type for function signatures
type LoginFunction = (data: LoginRequest) => Promise<LoginResponse>;
```

### Typing Components

```typescript
// ✅ Props interface
interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
}

export const Button = ({ onClick, disabled, children, variant = 'primary' }: ButtonProps) => {
  // ...
};
```

### Typing Hooks

```typescript
// ✅ Explicit return type
export const useLogin = (): {
  isLoading: boolean;
  handleEmailLogin: () => void;
  handleGoogleLogin: () => void;
} => {
  // ...
};
```

### API Response Types

```typescript
// ✅ Generic response wrapper
interface ApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  timestamp: string;
  result: T;
}

// ✅ Specific response
interface LoginResult {
  user: User;
  tokens: AuthTokens;
}

type LoginResponse = ApiResponse<LoginResult>;
```

---

## Styling Guidelines

### Tailwind CSS

```tsx
// ✅ Use Tailwind utility classes
<div className="flex min-h-screen flex-col bg-white">
  <button className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
    Click me
  </button>
</div>

// ✅ Conditional classes with clsx
import clsx from 'clsx';

<button
  className={clsx(
    'rounded-lg px-4 py-2 text-white',
    variant === 'primary' && 'bg-blue-500 hover:bg-blue-600',
    variant === 'outline' && 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50',
    disabled && 'cursor-not-allowed opacity-50'
  )}
>
  {children}
</button>
```

### Responsive Design

```tsx
// ✅ Mobile-first approach
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>

<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  {/* Grid items */}
</div>
```

---

## React Query Guidelines

### Query Keys

```typescript
// ✅ Array-based query keys with domain prefix
['kitDetail', kitId]
['kitsByCategory', category]
['situations', category]
['userProfile']

// ✅ More specific keys for related data
['kit', 'detail', kitId]
['kit', 'list', { category }]
```

### Mutations

```typescript
// ✅ Handle success/error in mutation hooks
export const useLoginMutation = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (data: LoginRequest) => authAPI.emailLogin(data),
    onSuccess: (response) => {
      const { user, tokens } = response.result;
      login(user, tokens.accessToken, tokens.refreshToken);
      navigate('/home');
    },
    onError: (error) => {
      console.error('Login failed:', error);
      // Show error toast/message
    },
  });
};
```

### Queries

```typescript
// ✅ Use enabled option for conditional queries
export const useKitDetail = (kitId: number) => {
  return useQuery({
    queryKey: ['kitDetail', kitId],
    queryFn: () => kitAPI.getKitDetail(kitId),
    enabled: kitId > 0, // Only fetch when kitId is valid
  });
};
```

---

## Error Handling

### API Client

The API client (`src/apis/client.ts`) handles:
- Automatic token refresh on 401 errors
- Request queuing during token refresh
- Authorization header injection

### In Hooks

```typescript
// ✅ Handle errors in mutation hooks
export const useSignupMutation = () => {
  return useMutation({
    mutationFn: (data: SignupRequest) => authAPI.emailSignup(data),
    onError: (error: AxiosError<ErrorResponse>) => {
      const message = error.response?.data?.message || '회원가입에 실패했습니다.';
      console.error('Signup failed:', message);
      // Show error to user (toast, alert, etc.)
    },
  });
};
```

---

## Best Practices

### General

- ✅ Use functional components with hooks
- ✅ Prefer composition over inheritance
- ✅ Keep components small and focused
- ✅ Extract complex logic to custom hooks
- ✅ Use TypeScript strictly (no `any`)
- ✅ Write self-documenting code with clear names
- ❌ Don't use class components
- ❌ Don't mix business logic with UI components

### Performance

- ✅ Use `React.memo` for expensive components
- ✅ Use `useMemo` and `useCallback` appropriately
- ✅ Lazy load routes with `React.lazy`
- ✅ Optimize images and assets
- ❌ Don't premature optimize

### Accessibility

- ✅ Use semantic HTML elements
- ✅ Add proper ARIA labels
- ✅ Ensure keyboard navigation
- ✅ Maintain color contrast ratios
- ✅ Support screen readers

### Code Quality

- ✅ Follow ESLint and Prettier rules
- ✅ Write descriptive commit messages
- ✅ Comment complex logic
- ✅ Keep files under 300 lines
- ✅ Remove commented-out code
- ❌ Don't leave console.logs in production

---

## Common Patterns

### Protected Routes

```typescript
// src/router.tsx
import { RequireAuth } from '@/components/router/RequireAuth';

{
  element: <RequireAuth />,
  children: [
    {
      element: <Layout />,
      children: [
        { path: '/home', element: <Home /> },
        { path: '/profile', element: <Profile /> },
      ],
    },
  ],
}
```

### SVG Imports

```typescript
// ✅ Import as React component
import EmailIcon from '@/assets/svgs/auth/login/emailIcon.svg';

<EmailIcon className="h-5 w-5 text-blue-500" />
```

### Form Handling

```typescript
// ✅ Extract form logic to custom hook
export const useLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginMutation = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginMutation.mutateAsync({ email, password });
  };

  return { email, setEmail, password, setPassword, handleSubmit };
};
```

### Audio Recording

```typescript
// Use custom hook from hooks/common/useAudioRecorder.ts
import { useAudioRecorder } from '@/hooks/common/useAudioRecorder';

const { startRecording, stopRecording, audioBlob } = useAudioRecorder();
```

---

## Project-Specific Notes

### Audio Processing

- Use `meyda` for audio feature extraction
- Use `pitchy` for pitch detection
- Hooks: `usePitchDetection`, `useDecibelDetection`, `useVoiceDetection`
- Utils: `volumeEvaluation.ts`, `pitchEvaluation.ts`

### AI Avatar (Heygen)

- Integration in `freetalk` domain
- Hook: `useHeygenAvatar`
- API: `apis/freetalk/heygen.ts`

### Animation

- Use `framer-motion` for complex animations
- Use `lottie-react` for Lottie animations
- SVG animations via Tailwind transitions

### Charts & Visualization

- Use `recharts` for progress charts
- Use `react-calendar` for review tracking

---

## Quick Reference

### Creating a New Feature

1. **Define types** in `types/{domain}/`
   - Add models to `models.ts`
   - Create operation types in `mutations/` or `queries/`
   - Export from `index.ts`

2. **Create API functions** in `apis/{domain}/`
   - Add function in `mutations/` or `queries/`
   - Export from `index.ts` in domain API object

3. **Create React Query hooks** in `hooks/{domain}/`
   - Mutation: `mutations/useOperationMutation.ts`
   - Query: `queries/useOperationQuery.ts`

4. **Create business logic hook** (if needed)
   - In `hooks/{domain}/useFeature.ts`

5. **Create components** in `components/{domain}/`
   - Add to appropriate feature folder
   - Create `common/` components if shared

6. **Create page** in `pages/{domain}/`
   - Use hooks for logic
   - Import domain components

7. **Add route** in `router.tsx`

8. **Add assets** in `assets/svgs/{domain}/`

### File Templates

See above sections for detailed templates for:
- API functions
- Type definitions
- React Query hooks
- Custom hooks
- Components
- Pages
- Utilities
- Stores

---

## Remember

- **Domain-driven**: Organize by feature/domain, not by file type
- **Mutations/Queries**: Separate read from write operations
- **Barrel exports**: Use index files for clean imports
- **Type safety**: Leverage TypeScript fully
- **React Query**: All API calls through React Query hooks
- **Zustand**: Minimal global state, prefer local state
- **Tailwind**: Utility-first styling
- **Clean code**: Self-documenting, small functions/components

---

This document should serve as the primary reference for code style and architecture decisions in the GoSonGim-FE project.
