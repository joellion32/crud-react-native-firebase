import {createContext} from 'react';

const reloadContext = createContext({
    reload: false,
    changeReload: () => {}
})


export default reloadContext