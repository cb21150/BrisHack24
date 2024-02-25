import {BrowserRouter, Route, Routes} from "react-router-dom";
import NurseInput from "./page/NurseInput";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<NurseInput />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;