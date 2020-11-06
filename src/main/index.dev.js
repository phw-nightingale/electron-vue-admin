/**
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `vue-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */

// Set environment for development
import { BrowserWindow, app } from 'electron'

process.env.NODE_ENV = 'development'

// Install `electron-debug` with `devtron`
require('electron-debug')({ showDevTools: true })

app.on('ready', function() {
  BrowserWindow.addDevToolsExtension('C:\\Workspaces\\WebstormProjects\\electron-vue-admin\\plugins\\chrome_vuejs_dev_tool')
})

// Require `main` process to boot app
require('./index')
