import {extractIssueKeys, getTitleValid, getMajorTypeOfCommit} from '../src/utils'

const data = [
  {
    id: '16077',
    key: 'ACP',
    name: 'ACP',
    description: 'MIGRACIÓN2024',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '16085',
    key: 'ACYAR',
    name: 'Aseguramiento de la Calidad y Asuntos Regulatorios',
    description: '',
    projectCategoryName: 'HOP ',
    projectCategoryDescription: 'Categoria estandar HOP CIA'
  },
  {
    id: '16094',
    key: 'AECOM',
    name: 'Almacén eCommerce',
    description: 'INTEGRADO_GITHUB',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16224',
    key: 'AO',
    name: 'App Operaciones',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16079',
    key: 'APIODE',
    name: 'API Alta Orden de Envío',
    description: 'Proyecto Arquitectura',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '16225',
    key: 'APP',
    name: 'App Distribución',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16233',
    key: 'AS',
    name: 'Assessment Microsoft',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '16221',
    key: 'AVA2',
    name: 'Asistente Virtual - Andi 2',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '16069',
    key: 'AW',
    name: 'Integraciones WH ',
    description: 'MIGRACIÓN2024',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16237',
    key: 'CAR',
    name: 'Carta Documento',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16176',
    key: 'CE1',
    name: 'Constancia Electronica 1',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16173',
    key: 'CIBER',
    name: 'Ciberseguridad',
    description: 'MIGRACION2024',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '16246',
    key: 'CM',
    name: 'CPCO MESI',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '15952',
    key: 'CON',
    name: 'Squad 2 - A.com FO',
    description: 'INTEGRADO_GITHUB',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16196',
    key: 'COREDMSN',
    name: 'CORE DMS - Nuevo',
    description: 'MIGRACION2024',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '15815',
    key: 'CRM',
    name: 'CRM 📊',
    description: 'MIGRACION2024',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '16234',
    key: 'DATA',
    name: 'Data Driven',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '16202',
    key: 'DCN',
    name: 'DMS - Cont/Almacenamiento/Expedición Nuevo',
    description: 'MIGRACION2024',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16208',
    key: 'DD',
    name: 'DMS - Distribución',
    description: 'MIGRACION2024',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16181',
    key: 'DG',
    name: 'Data Governance',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '16197',
    key: 'DMSAEN',
    name: 'DMS - Alta de Envíos - Nuevo',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '16134',
    key: 'DMSAR',
    name: 'DMS - Admision/Recepcion',
    description: 'No iniciado',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16198',
    key: 'DMSDMN',
    name: 'DMS - Datos Maestros - Nuevo',
    description: 'MIGRACION2024',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16128',
    key: 'DMSEDV',
    name: 'DMS - Planificacion',
    description: 'INTEGRADO_GITHUB',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16195',
    key: 'DMSLTN',
    name: 'DMS - Liquidación Transportistas - Nuevo',
    description: 'INTEGRADO_GITHUB',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16146',
    key: 'DMSRL',
    name: 'DMS - Rutas Logísticas',
    description: 'INTEGRADO_GITHUB',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16203',
    key: 'DMSSN',
    name: 'DMS - SPP',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '16135',
    key: 'DMUOBT',
    name: 'DMS - Bolsas de trabajo',
    description: 'MIGRACION2024',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16186',
    key: 'DRP2',
    name: 'DMS Retiros Parte 2',
    description: 'INTEGRADO_GITHUB',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16215',
    key: 'DTDC',
    name: 'DMS - Seguros',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '16247',
    key: 'DTR',
    name: 'IA Auditoría',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16184',
    key: 'DTSQ1',
    name: 'Data Analysis - Squad 1',
    description: 'MIGRACION2024',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '16185',
    key: 'DTSQ2',
    name: 'Data Analysis - Squad 2',
    description: 'MIGRACION2024',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '16200',
    key: 'DUOV2',
    name: 'DMS Unidades Operativas Versión 2',
    description: 'INTEGRADO_GITHUB',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16157',
    key: 'DYMDPHP',
    name: 'Desarrollo y mejoras de practicas y herramientas - Of. Proyectos',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '16227',
    key: 'EAM2',
    name: 'EAM2',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '16093',
    key: 'EBPL',
    name: 'EBUYPLACE',
    description: 'MIGRACIÓN 2024 ',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '15992',
    key: 'ENP',
    name: 'Equipo Custom ',
    description: 'INTEGRADO_GITHUB',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16213',
    key: 'ESA2',
    name: ' Equipo ST&D Actuales 2',
    description: 'Integrado_GITHUB',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16211',
    key: 'ESAP',
    name: 'ERP SAP',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '15813',
    key: 'ESAS',
    name: 'Estabilización SAS',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '16068',
    key: 'ESCE',
    name: 'Estandares SCE',
    description: 'MIGRACIÓN2024',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16110',
    key: 'FS',
    name: 'FISA B2B',
    description: 'MIGRACION2024',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16199',
    key: 'GDDTN',
    name: 'GDT',
    description: 'MIGRACION2024',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16218',
    key: 'GLOB',
    name: 'Globall Pack',
    description: '',
    projectCategoryName: 'Optimus',
    projectCategoryDescription:
      'Corresponde a la adquisición por parte de Andreani de una empresa llamada Optimus y la rebautizó como Global Pack'
  },
  {
    id: '16242',
    key: 'GTMS',
    name: 'Ir a muestra de comercialización',
    description: ''
  },
  {
    id: '16244',
    key: 'GTMS1',
    name: 'Ir a muestra de comercialización 1',
    description: ''
  },
  {
    id: '16248',
    key: 'GTMS2',
    name: 'Ir a muestra de comercialización 2',
    description: ''
  },
  {
    id: '16209',
    key: 'H2',
    name: 'Hackathon 2024',
    description: '',
    projectCategoryName: 'HOP ',
    projectCategoryDescription: 'Categoria estandar HOP CIA'
  },
  {
    id: '16240',
    key: 'HE',
    name: 'HOP Ensayo',
    description: '',
    projectCategoryName: 'HOP ',
    projectCategoryDescription: 'Categoria estandar HOP CIA'
  },
  {
    id: '16054',
    key: 'HOP',
    name: 'HOP',
    description: '',
    projectCategoryName: 'HOP ',
    projectCategoryDescription: 'Categoria estandar HOP CIA'
  },
  {
    id: '16058',
    key: 'HS',
    name: 'HOP SOPORTE',
    description: 'Esquema incidencias HOP',
    projectCategoryName: 'HOP ',
    projectCategoryDescription: 'Categoria estandar HOP CIA'
  },
  {
    id: '16226',
    key: 'IAT',
    name: 'IA Testing',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16222',
    key: 'IDB',
    name: 'Inmutabilidad de backups',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '16210',
    key: 'IDG',
    name: 'Informe de gobierno',
    description: ''
  },
  {
    id: '16180',
    key: 'IGDI',
    name: 'GRC - Gestión de Identidades',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '16182',
    key: 'INTGRS',
    name: 'Integraciones',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '15839',
    key: 'IOC',
    name: 'Capacitaciones TI',
    description: 'PRUEBA',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '16021',
    key: 'IPPC',
    name: "API's Almacenes",
    description: 'INTEGRADO_GITHUB',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16103',
    key: 'JMS',
    name: 'Job Management System',
    description: '',
    projectCategoryName: 'WitWot',
    projectCategoryDescription: 'Conjunto de proyectos WitWot'
  },
  {
    id: '15998',
    key: 'LCCNS',
    name: 'Elecciones Mobile',
    description: 'MIGRACION2024',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16228',
    key: 'MDAI',
    name: 'Mesa de Ayuda IA',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '16140',
    key: 'ME1',
    name: 'Squad 4 A.com Jus - ME1',
    description: 'INTEGRADO_GITHUB',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16239',
    key: 'MF',
    name: 'Meli Flex A.com',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16223',
    key: 'MIC',
    name: 'Microsegmentacion',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '12100',
    key: 'MOB',
    name: 'Andreani Mobile',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '15898',
    key: 'NDD',
    name: 'Advanced Analytics Dashboard',
    description: 'MIGRACION2024',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16183',
    key: 'NFRM',
    name: 'Informe para gobierno',
    description: ''
  },
  {
    id: '16174',
    key: 'NTN',
    name: 'Nuevo tienda nube',
    description: 'INTEGRADO_GITHUB',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16074',
    key: 'NTRAC',
    name: 'NuevoTracking',
    description: 'INTEGRADO_GITHUB',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16111',
    key: 'NUM',
    name: 'DMS - Numbering',
    description: 'MIGRACION2024',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '16243',
    key: 'ODGPSYG',
    name: 'Proyectos y actividades internas | Gestión de proyectos',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '16188',
    key: 'OG',
    name: 'On Going',
    description: 'MIGRACION2024',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '15300',
    key: 'OMNICANAL',
    name: 'Omnicanalidad 🕊',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16232',
    key: 'OPENINT',
    name: 'Opendev Integraciones',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '16161',
    key: 'P50',
    name: 'Pruebas 5.0',
    description: 'PRUEBA',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '15994',
    key: 'PDII',
    name: 'IoT',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '15928',
    key: 'PDT',
    name: 'SISTEMAS SUCURSALES',
    description: 'INTEGRADO_GITHUB',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16179',
    key: 'PE20',
    name: 'Pruebas Estandar 2.0  (github)',
    description: 'PRUEBA',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16230',
    key: 'PRC',
    name: 'Proyecto Prueba',
    description: ''
  },
  {
    id: '15946',
    key: 'PYB',
    name: 'Pybot',
    description: 'MIGRACIÓN2024',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '15848',
    key: 'QA',
    name: 'Quality Assurance Team',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '15736',
    key: 'RAC',
    name: "API's Clientes",
    description: '',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '16187',
    key: 'RN',
    name: 'DMS Rendiciones Parte 2',
    description: 'INTEGRADO_GITHUB',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '15962',
    key: 'RQTCTR',
    name: 'Arquitectura TI',
    description: 'INTEGRADO_GITHUB',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '16189',
    key: 'S1CC',
    name: 'Squad 1 - A.com CZ',
    description: 'INTEGRADO_GITHUB',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16191',
    key: 'S3CJ',
    name: ' Squad 3 A.com JS',
    description: 'INTEGRADO_GITHUB',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16061',
    key: 'SD',
    name: 'Estandarización WH (WMS/TSM)',
    description: 'MIGRACION2024',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '16102',
    key: 'SDA',
    name: 'Soporte de Aplicaciones',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '16168',
    key: 'SE',
    name: 'Squad 4 - A.com Jus',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16112',
    key: 'SGDMS',
    name: 'Seguridad DMS',
    description: 'MIGRACION2024',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '16014',
    key: 'SOLCO',
    name: 'Soluciones-Corporativas',
    description: 'MIGRACIÓN2024',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '16231',
    key: 'UOA',
    name: 'Unidades Operativas - Adviters',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '15997',
    key: 'UXTEAM',
    name: 'Team UX',
    description: 'MIGRACIÓN2024',
    projectCategoryName: 'Estandar Jira 2.0',
    projectCategoryDescription: 'Modelo Jira estandarizado'
  },
  {
    id: '16204',
    key: 'WOSSQ1',
    name: 'WOS - Squad 1',
    description: 'INTEGRADO_GITHUB',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16205',
    key: 'WOSSQ2',
    name: 'WOS - Squad 2',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16206',
    key: 'AE',
    name: 'Andi Externo',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  },
  {
    id: '16207',
    key: 'DE',
    name: 'DMS estabilizacion',
    description: '',
    projectCategoryName: 'Estandar Jira 2.0 + Github',
    projectCategoryDescription: 'Proyecto en estandar itegrado con GITHUB'
  }
]

let possibleKeys = data.map(item => item.key)

describe('extractIssueKeys()', () => {
  test('extracts unique issue keys from commit messages', () => {
    const messages = [
      'Fixes ABC-123 and resolves XYZ-456',
      'Related to ABC-123',
      'No issue here',
      'Another commit for XYZ-456',
      'feat(RQTCTR-123): add new feature',
      'fix(RQTCTR-456,RQTCTR-423): fix bug',
      'fix(PE20-1547): update value'
    ]
    const result = extractIssueKeys(messages)
    expect(result).toEqual(new Set(['ABC-123', 'XYZ-456', 'RQTCTR-123', 'RQTCTR-456', 'RQTCTR-423', 'PE20-1547']))
  })

  test.each(possibleKeys)('extracts issue key %s from commit messages', key => {
    const issueKey = `${key}-123`
    const messages = [`This commit references issue`, 'No issue here', `feat(${issueKey}): add new feature`]
    const result = extractIssueKeys(messages)

    expect(result.has(issueKey)).toBeTruthy()
  })
})

describe('getTitleValid()', () => {
  test('returns empty set when no issue keys are present', () => {
    const messages = ['No issues mentioned here', 'Just some random commit message', 'update README']
    const result = getTitleValid(messages, 'Handle some changes', null)
    expect(result).toBe('chore: Handle some changes')
  })
  test('returns a valid title when issue keys are present and have patch', () => {
    const messages = ['No issues mentioned here', 'Just some random commit message', 'fix: update README']
    const result = getTitleValid(messages, '[RQTCTR-123] Handle some changes', 'patch')
    expect(result).toBe('fix(RQTCTR-123): Handle some changes')
  })
  test('returns a valid title when issue keys are present and have minor', () => {
    const messages = ['No issues mentioned here', 'Just some random commit message', 'fix: update README']
    const result = getTitleValid(messages, '[RQTCTR-123] Handle some changes', 'minor')
    expect(result).toBe('feat(RQTCTR-123): Handle some changes')
  })
  test('returns a valid title when many issue keys are present', () => {
    const messages = [
      'No issues mentioned here',
      'fix(RQTCTR-124): Just some random commit message',
      'fix: update README',
      'RQTCTR-125-test-coso'
    ]
    const result = getTitleValid(messages, '[RQTCTR-123] Handle some changes', 'minor')
    expect(result).toBe('feat(RQTCTR-124,RQTCTR-125,RQTCTR-123): Handle some changes')
  })
  test('returns a valid title when many issue keys are present even in the same commit', () => {
    const messages = [
      'No issues mentioned here',
      'fix(RQTCTR-122,RQTCTR-124): Just some random commit message',
      'fix: update README',
      'RQTCTR-125-test-coso'
    ]
    const result = getTitleValid(messages, '[RQTCTR-123] Handle some changes', 'minor')
    expect(result).toBe('feat(RQTCTR-122,RQTCTR-124,RQTCTR-125,RQTCTR-123): Handle some changes')
  })

  test('returns a valid title when only one message (branch name) have the key', () => {
    const messages = [
      'No issues mentioned here',
      'Just some random commit message',
      'fix: update README',
      'RQTCTR-125-test-coso'
    ]
    const result = getTitleValid(messages, 'Handle some changes', 'minor')
    expect(result).toBe('feat(RQTCTR-125): Handle some changes')
  })
})

describe('getMajorTypeOfCommit()', () => {
  test('returns "fix" for patch release', () => {
    const result = getMajorTypeOfCommit('patch')
    expect(result).toBe('fix')
  })

  test('returns "feat" for minor release', () => {
    const result = getMajorTypeOfCommit('minor')
    expect(result).toBe('feat')
  })

  test('returns "feat" for major release', () => {
    const result = getMajorTypeOfCommit('major')
    expect(result).toBe('feat')
  })

  test('returns "chore" for invalid messages', () => {
    const result = getMajorTypeOfCommit(null)
    expect(result).toBe('chore')
  })
})
