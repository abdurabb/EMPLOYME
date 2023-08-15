import { configureStore } from '@reduxjs/toolkit'
// import UserAuth from './UserAuth'
// import CompanyAuth from './CompanyAuth'
// import AdminAuth from './AdminAuth'
import rootReducer from './RootReducer'

// const Store = configureStore(
//     {
//         reducer:{ user: UserAuth.reducer },
//         reducer:{company:CompanyAuth.reducer},
//         reducer:{admin:AdminAuth.reducer}

//     }
// )
const Store = configureStore(
   {reducer:rootReducer}
)


export default Store