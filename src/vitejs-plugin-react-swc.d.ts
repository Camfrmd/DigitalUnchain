// Override the problematic export from @vitejs/plugin-react-swc
declare module '@vitejs/plugin-react-swc' {
  import { Plugin } from 'vite';
  const react: (options?: any) => Plugin;
  export default react;
}
