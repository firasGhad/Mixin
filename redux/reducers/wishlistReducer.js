import {LOAD_MIXES} from '../actions/types';

const initialState = {
    mixes: []
};

const wishlistReducer = (state = initialState, action) => {
    switch (action.type){
        case LOAD_MIXES: 
        let mixes;
         (async () => {
            let url = 'https://www.mixesdb.com/db/api.php?action=query&format=json&list=recentchanges&rcnamespace=0&rcstart=&rcprop=user%7Ctimestamp%7Ctitle&rclimit=75&rctype=new&redirects=';
            try{
                let res = await fetch(url);
                let response = await res.json();
               // console.log(response);
                 mixes =response.query.recentchanges;
                //console.log(mixes);
            }catch(e){
                console.log(e);
            }
        })();
        
         return {...state, 
            mixes
            };
        default:
            return state;    
    }
}

export default wishlistReducer;