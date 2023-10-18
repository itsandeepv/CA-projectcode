import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { Auth_Reducer } from "../Redux/Auth/Auth.Reducer";
import { Signin_Reducer } from "../Redux/Singin/Signin.Reducer";
import { Profile_Reducer } from "../Redux/Profile/Profile.Reducer";
import { Firm_Reducer } from "../Redux/Firm/Firm.Reducer";
import { Vendor_Reducer } from "../Redux/Vender/Vendor.Reducer";
import { partiesReducer } from "../Redux/Parties/parties.reducer";
import { stockReducer } from "../Redux/Stocks/stock.reducer";
import { categoryReducer } from "../Redux/Category/category.reducer";
import { invoiceReducer } from "../Redux/Invoice/invoice.reducer";
import { purchaseReducer } from "../Redux/Purchase/purchase.reducer";
import { purchaseOutReducer } from "../Redux/Purchaseout/purchaseout.reducer";

const rootReducer = combineReducers({
    Auth: Auth_Reducer,
    Signin: Signin_Reducer,
    Profile: Profile_Reducer,
    FirmRegistration: Firm_Reducer,
    Vendor: Vendor_Reducer,
    partiesReducer: partiesReducer,
    stockReducer: stockReducer,
    categoryReducer:categoryReducer,
    invoiceReducer:invoiceReducer,
    purchaseReducer:purchaseReducer,
    purchaseoutReducer:purchaseOutReducer

})
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
