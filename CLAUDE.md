# Panduan AI Agent - React Boilerplate

> **WAJIB DIBACA** sebelum melakukan perubahan apapun pada project ini.

---

## Tech Stack

| Teknologi | Versi | Kegunaan |
|---|---|---|
| React | 19 | UI Framework |
| TypeScript | 6 | Type Safety |
| Vite | 8 | Build Tool |
| Tailwind CSS | 4 | Styling |
| Shadcn UI | Latest | Component Library (New York style) |
| React Hook Form | 7 | Form Management |
| Zod | 3 | Schema Validation |
| Zustand | 5 | State Management |
| React Router | 7 | Routing |
| React Toastify | 10 | Notifications |
| Axios | Latest | HTTP Client |
| TanStack Query | 5 | Server State & Caching |
| TanStack Table | 8 | Table Management |
| openapi-typescript | 7 | Type Generation dari Backend API |

---

## Aturan Wajib

### 1. Type Safety — ZERO ANY
- **Tidak boleh ada satu pun `any` dalam kode**
- Gunakan `import type` atau `import { type X }` untuk type-only imports (karena `verbatimModuleSyntax: true`)
- Jangan gunakan `enum` (karena `erasableSyntaxOnly: true`), gunakan `const` object dengan `as const`:
  ```ts
  const STATUS = { ACTIVE: 'active', INACTIVE: 'inactive' } as const
  type Status = typeof STATUS[keyof typeof STATUS]
  ```
- Selalu jalankan `npx tsc --noEmit` setelah selesai coding. Perbaiki semua error sebelum selesai.

### 2. Satu File, Satu Function
- **Setiap file hanya boleh berisi satu functional component atau satu function**
- Ini berlaku untuk komponen React maupun function biasa
- Tujuan: keterbacaan, maintainability, dan mudah di-import
- **Pengecualian:** `index.ts` (barrel exports), type definitions, dan konstanta yang terkait erat

### 3. Konvensi Penamaan File — kebab-case
- **Semua file menggunakan kebab-case** (nama-file.tsx, bukan NamaFile.tsx)
- Berlaku untuk `.tsx`, `.ts`, dan semua jenis file lainnya
- Contoh yang benar: `sign-in-form.tsx`, `use-auth.ts`, `auth-layout.tsx`, `data-table.tsx`
- Contoh yang salah: `SignInForm.tsx`, `useAuth.ts`, `AuthLayout.tsx`
- **Pengecualian:** File yang sudah ada (shadcn UI di `src/components/ui/`) - jangan ubah
- Export name tetap menggunakan PascalCase untuk komponen dan camelCase untuk fungsi:
  ```ts
  // File: sign-in-form.tsx
  export function SignInForm() { ... }
  
  // File: use-auth.ts
  export function useAuth() { ... }
  ```

### 4. Struktur Folder — Bulletproof React (Feature-Based)
- **`src/features/<nama-fitur>/`** — kode yang hanya digunakan oleh 1 fitur
  - Setiap feature boleh punya subfolder: `components/`, `hooks/`, `schemas/`, `types/`
  - Contoh: `src/features/auth/components/sign-in-form.tsx` hanya dipakai di fitur auth
  - Contoh: `src/features/admin/hooks/use-admin-users.ts` hanya dipakai di fitur admin
- **Folder global** (digunakan >1 fitur): simpan di root `src/`
  - `src/components/` — shared reusable components (atoms, molecules)
  - `src/hooks/` — shared hooks (`use-auth.ts`, `use-permission.ts`)
  - `src/store/` — global Zustand stores
  - `src/types/` — shared TypeScript types
  - `src/lib/` — core utilities (axios, utils)
- **Aturan promosi:** Kalau kode di feature mulai dipakai oleh feature lain → pindahkan ke folder global yang sesuai

### 5. CRUD — Wajib Gunakan TanStack Query/Mutation
- **Setiap operasi CRUD wajib menggunakan TanStack Query**
- Gunakan `useQuery` untuk fetch data (GET)
- Gunakan `useMutation` untuk mutasi data (POST, PUT, PATCH, DELETE)
- Setelah mutasi berhasil, **wajib invalidate** query terkait agar UI langsung update:
  ```ts
  const queryClient = useQueryClient()
  onSuccess: () => {
    void queryClient.invalidateQueries({ queryKey: ['users'] })
  }
  ```
- Setiap DataTable memiliki `queryKey` yang bisa digunakan untuk invalidate dari luar

### 6. Semua Elemen Clickable — cursor-pointer
- Semua elemen yang bisa diklik **wajib** menggunakan `cursor-pointer`
- Sudah dikonfigurasi secara global di `src/index.css` untuk `button`, `[role="button"]`, `a`, `label[for]`
- Untuk elemen custom clickable, tambahkan `className="cursor-pointer"`

---

## Struktur Project

Menggunakan pendekatan **Bulletproof React** (feature-based) + **Atomic Design** untuk shared components.

```
src/
├── components/                   # HANYA komponen yang benar-benar reusable/shared
│   ├── atoms/                    # Elemen terkecil (spinner.tsx, typography.tsx)
│   ├── molecules/                # Kombinasi atoms yang reusable lintas fitur
│   │   ├── form/                 # Semua form inputs (RHF + Zod terintegrasi)
│   │   ├── modal.tsx             # Stackable modal (useModalStore)
│   │   ├── dropdown.tsx          # Dropdown dengan ellipsis trigger
│   │   └── data-table.tsx        # Server-side table (TanStack Query + Table)
│   └── ui/                       # Shadcn UI (auto-generated — JANGAN edit manual)
│
├── features/                     # Modul fitur yang self-contained
│   ├── auth/
│   │   ├── components/           # sign-in-form.tsx, sign-up-form.tsx, dll.
│   │   ├── hooks/                # Hooks lokal auth (use-sign-in.ts, dll.)
│   │   ├── schemas/              # auth.schema.ts (Zod schemas)
│   │   └── types/                # Auth-specific types
│   ├── dashboard/
│   │   ├── components/           # sidebar.tsx, header.tsx, stats-cards.tsx
│   │   └── hooks/                # Hooks lokal dashboard
│   └── admin/
│       ├── components/           # Komponen khusus admin
│       ├── hooks/                # Hooks lokal admin
│       └── types/                # Admin-specific types
│
├── pages/                        # Thin pages — hanya compose feature components
│   ├── auth/                     # sign-in-page.tsx, sign-up-page.tsx, dll.
│   ├── dashboard/
│   │   └── admin/
│   └── not-found-page.tsx
│
├── layouts/                      # auth-layout.tsx, dashboard-layout.tsx
├── router/                       # index.tsx, protected-route.tsx
│
├── store/                        # Global Zustand stores (app-wide)
│   ├── use-auth-store.ts
│   └── use-modal-store.ts
├── hooks/                        # Global hooks (dipakai >1 feature)
│   ├── use-auth.ts
│   └── use-permission.ts
├── lib/                          # Core libraries
│   ├── axios.ts                  # Axios instance + interceptors
│   └── utils.ts                  # cn() helper
└── types/                        # Global shared types
    ├── api.d.ts                  # Auto-generated dari openapi-typescript
    └── index.ts                  # Shared types (User, PaginatedResponse, dll.)
```

### Kapan Kode Naik dari Feature ke Global?
- Komponen/hook di `features/auth/` mulai dipakai oleh `features/admin/` → pindah ke `src/components/` atau `src/hooks/`
- Schema Zod dipakai di lebih dari 1 feature → pindah ke `src/schemas/` (buat jika diperlukan)
- Type dipakai lintas feature → pindah ke `src/types/`

---

## Komponen Reusable

### Form Components (src/components/molecules/form/)
Semua form input sudah terintegrasi dengan React Hook Form + Zod.
Import dari barrel: `import { FormInput, FormSelect } from '@/components/molecules/form'`

| Komponen | Props Penting |
|---|---|
| `FormInput` | `name`, `control`, `label`, `inputType` (mendukung `password` dengan toggle show/hide) |
| `FormSelect` | `name`, `control`, `options: SelectOption[]` |
| `FormCombobox` | `name`, `control`, `options?`, `searchAction?` (async server-side search), `multiple?` |
| `FormRadio` | `name`, `control`, `options: SelectOption[]`, `orientation?` |
| `FormSwitch` | `name`, `control`, `label`, `inline?` |
| `FormCheckbox` | `name`, `control`, `label` |
| `FormTextarea` | `name`, `control`, `rows?` |
| `FormDatePicker` | `name`, `control`, `disabledDates?`, `fromDate?`, `toDate?` |

### Modal (src/components/molecules/modal.tsx)
Stackable modal terintegrasi dengan `useModalStore`. Wajib render `<ModalProvider />` di App.tsx.

```ts
const { openModal, closeModal } = useModalStore()

// Buka modal
const id = openModal({
  title: 'Judul Modal',
  subTitle: 'Sub judul opsional',
  content: <div>Konten modal</div>,
  size: 'md', // 'sm' | 'md' | 'lg' | 'xl' | 'full'
})

// Tutup modal
closeModal(id)
```

### Dropdown (src/components/molecules/Dropdown.tsx)
```tsx
<Dropdown
  items={[
    { label: 'Edit', icon: <Edit />, onClick: handleEdit },
    { label: 'Hapus', icon: <Trash />, onClick: handleDelete, variant: 'destructive', separator: true },
  ]}
/>
```

### DataTable (src/components/molecules/DataTable.tsx)
Server-side table dengan TanStack Query + TanStack Table.

```tsx
<DataTable
  columns={columns}          // ColumnDef<TData>[]
  apiEndpoint="/api/users"   // Backend endpoint (GET dengan params: page, limit, search)
  queryKey={['users']}       // Untuk invalidation: queryClient.invalidateQueries({ queryKey: ['users'] })
  createButton={<Button>Tambah</Button>}  // Opsional
  searchPlaceholder="Cari..."
  defaultPageSize={10}
/>
```

Backend harus mengembalikan format `PaginatedResponse<T>`:
```ts
{ data: T[], total: number, page: number, limit: number, totalPages: number }
```

---

## State Management

### Auth Store (src/store/useAuthStore.ts)
```ts
const { user, isAuthenticated, setAuth, logout, hasRole, hasAnyRole } = useAuthStore()
// atau gunakan hook shorthand:
const { user, isAuthenticated } = useAuth()
```

### Modal Store (src/store/useModalStore.ts)
```ts
const { openModal, closeModal, closeAllModals } = useModalStore()
```

---

## API Client

### Axios (src/lib/axios.ts)
- Base URL dari `VITE_API_BASE_URL`
- Auto-inject `Authorization: Bearer <token>` dari localStorage
- Auto-redirect ke `/sign-in` jika 401
- Auto-toast error jika 403 atau 5xx

### Generate Types dari Backend
```bash
npm run generate:types
# Equivalent: openapi-typescript http://localhost:3000/docs-json -o src/types/api.d.ts
```

---

## Routing & RBAC

### Route Protection
```tsx
// Hanya user yang login
<ProtectedRoute />

// Hanya admin
<ProtectedRoute requiredRoles={['admin']} />
```

### Environment Variables
Semua URL dan config yang bisa berubah harus di `.env`:
- `VITE_API_BASE_URL` — Base URL backend API
- `VITE_GOOGLE_OAUTH_URL` — URL OAuth Google (`http://localhost:3000/auth/google`)
- `VITE_APP_NAME` — Nama aplikasi

---

## Checklist Sebelum Selesai Coding
1. [ ] Jalankan `npx tsc --noEmit` — tidak boleh ada error
2. [ ] Tidak ada `any` dalam kode baru
3. [ ] Setiap file hanya berisi 1 function/component
4. [ ] CRUD menggunakan TanStack Query + invalidateQueries
5. [ ] Elemen clickable menggunakan `cursor-pointer`
6. [ ] Import type-only menggunakan `import type` atau `import { type X }`
7. [ ] Environment variable disimpan di `.env` dan `.env.example`
