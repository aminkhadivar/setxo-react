import { resolve } from 'node:path'
import macrosPlugin from 'vite-plugin-babel-macros'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import * as packageJson from './package.json'
// https://vitejs.dev/config/

export default defineConfig(() => ({
  plugins: [
    react(),
    libInjectCss(),
    macrosPlugin(),
  ],

  build: {
    lib: {
      entry: [
        resolve(__dirname, 'src/index.js'),
        resolve('src/components', 'Accordion/Accordion.jsx'),
        resolve('src/components', 'Alert/Alert.jsx'),
        resolve('src/components', 'Avatar/Avatar.jsx'),
        resolve('src/components', 'Badge/Badge.jsx'),
        resolve('src/components', 'Breadcrumb/Breadcrumb.jsx'),
        resolve('src/components', 'Button/Button.jsx'),
        resolve('src/components', 'ButtonGroup/ButtonGroup.jsx'),
        resolve('src/components', 'Carousel/Carousel.jsx'),
        resolve('src/components', 'CloseButton/CloseButton.jsx'),
        resolve('src/components', 'Collapse/Collapse.jsx'),
        resolve('src/components', 'Drawer/Drawer.jsx'),
        resolve('src/components', 'Dropdown/Dropdown.jsx'),
        resolve('src/components', 'Modal/Modal.jsx'),
        resolve('src/components', 'Nav/Nav.jsx'),
        resolve('src/components', 'Navbar/Navbar.jsx'),
        resolve('src/components', 'Pagination/Pagination.jsx'),
        resolve('src/components', 'Popover/Popover.jsx'),
        resolve('src/components', 'Progress/Progress.jsx'),
        resolve('src/components', 'Tab/Tab.jsx'),
        resolve('src/components', 'Spinner/Spinner.jsx'),
        resolve('src/components', 'Tooltip/Tooltip.jsx'),
        resolve('src/contents', 'Image/Image.jsx'),
        resolve('src/contents', 'Links/Links.jsx'),
        resolve('src/contents', 'List/List.jsx'),
        resolve('src/contents', 'Table/Table.jsx'),
        resolve('src/contents', 'Typography/Typography.jsx'),
        resolve('src/contents', 'Divider/Divider.jsx'),
        resolve('src/forms', 'Form/Form.jsx'),
        resolve('src/forms', 'Checkbox/Checkbox.jsx'),
        resolve('src/forms', 'FormControl/Input.jsx'),
        resolve('src/forms', 'FormControl/FileInput.jsx'),
        resolve('src/forms', 'FormControl/InputError.jsx'),
        resolve('src/forms', 'FormControl/InputHelp.jsx'),
        resolve('src/forms', 'FormControl/ColorInput'),
        resolve('src/forms', 'FormControl/Label.jsx'),
        resolve('src/forms', 'FormControl/Textarea.jsx'),
        resolve('src/forms', 'Radio/Radio.jsx'),
        resolve('src/forms', 'Select/Select.jsx'),
        resolve('src/forms', 'Switch/Switch.jsx'),
        resolve('src/forms', 'Range/Range.jsx'),
        resolve('src/layouts', 'Setxo/Setxo.jsx'),
        resolve('src/layouts', 'Setxo/ThemeContext.jsx'),
        resolve('src/layouts', 'DarkModeToggle/DarkModeToggle.jsx'),
      ],
      name: 'setxo-react',
      formats: ['es'],
      fileName: (format) => `[name].${format}.js`,
    },
    manifest: true,
    rollupOptions: {
      external: ['react', 'react-dom', ...Object.keys(packageJson.peerDependencies)],
      output: {
        preserveModules: false,
        exports: 'named',
      },
    }
  }
}))