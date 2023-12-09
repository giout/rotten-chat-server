import 'dotenv/config'
import srv from './config/server'

srv.listen(process.env.PORT)