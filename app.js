import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import express from 'express'
import Connect from 'connect-pg-simple'
import session from 'express-session'
import { Adapter, Resource, Database } from '@adminjs/sql'
import argon2 from 'argon2';
import { ComponentLoader } from 'adminjs'
import passwordsFeature from '@adminjs/passwords';
import importExportFeature from '@adminjs/import-export';

// Importamos desde otras ubicaciones
import {authenticate} from './BBDD/autenticador.js'
import createDatabaseConnection from './BBDD/conexion.js';


const PORT = 3000

AdminJS.registerAdapter({
  Database,
  Resource,
})

const componentLoader = new ComponentLoader();

const start = async () => {
  const app = express()
  const db = await createDatabaseConnection()

  //Añadimos los recursos que aparecen en adminJS

  const admin = new AdminJS({
    componentLoader,
    resources: [
      {
        // TABLA USUARIOS
        resource: db.table('users'),
        options: {
          sort: {
            sortBy: 'id',
            direction: 'asc',
          },
          properties: {
            id: { isVisible: false },
            name: { isRequired: true },
            newPassword: { isRequired: true },
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
      /// TABLA SESION
      {
        resource: db.table('session'),
        options: {
          properties: {
            sess: { isVisible: false },
          },
          sort: {
            sortBy: 'sid',
            direction: 'asc',
          },
          parent: {
            name: 'Sesión',
            icon: 'Table',
          },
        },
        features: [
          importExportFeature({
            componentLoader,
          }),
        ],
      },
      /// TABLA EQUIPO
      {
        resource: db.table('equipo'),
        options: {
          properties: {
            id: {
              isVisible: { list: true, show: true, edit: true },
            },
          },
          parent: {
            name: 'Juego',
            icon: 'Folder',
          },
        },
        features: [
          importExportFeature({
            componentLoader,
          }),
        ],
      },
      /// TABLA JUGADORES
      {
        resource: db.table('jugadores'),
        options: {
          sort: {
            sortBy: 'equipo',
            direction: 'asc',
          },
          properties: {
            nombre: {
              position: 1,
            },
            id: { isVisible: false },
            equipo: {
              isVisible: true,
              isRequired: true,
              availableValues: async () => {
                const equipos = await db.table('equipo').find()
                return equipos.map((equipo) => ({
                  value: equipo.id,
                  label: equipo.nombre,
                }))
              },
            },
          },
          parent: {
            name: 'Juego',
          },
          populate: {
            path: 'equipo',
            populate: {
              path: 'equipo',
              select: 'nombre',
            },
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