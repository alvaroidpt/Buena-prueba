import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import express from 'express'
import Connect from 'connect-pg-simple'
import session from 'express-session'
import argon2 from 'argon2';
import { ComponentLoader } from 'adminjs'
import passwordsFeature from '@adminjs/passwords';
import importExportFeature from '@adminjs/import-export';

// Importamos desde otras ubicaciones
import { authenticate } from './BBDD/conexion.js';

import { createSequelizeConnection } from './BBDD/conexion_seq.js'
import * as AdminJSSequelize from '@adminjs/sequelize';


const PORT = 3000

AdminJS.registerAdapter({
  Database: AdminJSSequelize.Database,
  Resource: AdminJSSequelize.Resource,
})

const componentLoader = new ComponentLoader();

const start = async () => {
  const app = express();
  const db_seq = await createSequelizeConnection();

  //Añadimos los recursos que aparecen en adminJS

  const admin = new AdminJS({
    componentLoader,
    resources: [

      /// TABLA USUARIOS
      {
        resource: db_seq.models.User,
        options: {
          sort: {
            sortBy: 'id',
            direction: 'asc',
          },
          properties: {
            id: { isVisible: false },
            name: { isRequired: true },
            newPassword: { isRequired: true },
            password: { isVisible: false, isRequired: false },
            role: {
              availableValues: [
                { label: 'admin', value: 'admin' },
                { label: 'usuario', value: 'usuario' },
                { label: 'invitado', value: 'invitado' },
              ],
            },
          },
          parent: {
            name: 'Usuarios',
            icon: 'User',
          },
        },
        features: [
          passwordsFeature({
            componentLoader,
            properties: { password: 'newPassword', encryptedPassword: 'password' },
            hash: argon2.hash,
          }),
          importExportFeature({
            componentLoader,
          }),
        ],
      },
      /// TABLA JSON
      {
        resource: db_seq.models.Json,
        options: {
          parent: {
            name: 'JSON',
            icon: 'Database',
          },
        },
        features: [
          importExportFeature({
            componentLoader,
          }),
        ],
      },
      /// TABLA TIPOS_EQUIPOS
      {
        resource: db_seq.models.Equipos,
        options: {
          properties: {
            field_config: {
              type: 'textarea',
            },
          },
          parent: {
            name: 'Tablas Maestras',
            icon: 'Folder',
          },
        },
        features: [
          importExportFeature({
            componentLoader,
          }),
        ],
      },
    ],
  });


  const ConnectSession = Connect(session)
  const sessionStore = new ConnectSession({
    conObject: {
      connectionString: 'postgres://alvaro:Alvaro123@10.2.21.115:5432/pruba_alvaro',
      ssl: process.env.NODE_ENV === 'production',
    },
    tableName: 'session',
    createTableIfMissing: true,
  })

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: 'sessionsecret',
    },
    null,
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: 'sessionsecret',
      cookie: {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
      },
      name: 'adminjs',
    }
  )

  // Cargamos el frontend, después de cargar los datos
  admin.watch()

  // const adminRouter = AdminJSExpress.buildRouter(admin)
  app.use(admin.options.rootPath, adminRouter)

  app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
  })
}

start()