import React,{createContext,useContext,useEffect,useRef,useState} from 'react';
import { getSession,loadFarm,saveFarm,logout as endSession,updateProfile } from '../services/storage';
const Context=createContext(null);
export const useFarm=()=>useContext(Context);
export function FarmProvider({children}){
 const [user,setUser]=useState(null),[data,setData]=useState(null),[loading,setLoading]=useState(true),[error,setError]=useState(''),[saving,setSaving]=useState(false);const current=useRef(null),busy=useRef(false);
 async function restore(){setLoading(true);setError('');try{const u=await getSession();if(u){const farm=await loadFarm(u.id);current.current=farm;setData(farm);setUser(u)}}catch{setError('Não foi possível ler os dados do aparelho. Tente novamente.')}finally{setLoading(false)}}
 useEffect(()=>{restore()},[]);
 async function signIn(u){const farm=await loadFarm(u.id);current.current=farm;setData(farm);setUser(u)}
 async function mutate(fn){if(busy.current)throw Error('Aguarde o salvamento atual.');busy.current=true;setSaving(true);try{const next=fn(current.current);await saveFarm(user.id,next);current.current=next;setData(next)}finally{busy.current=false;setSaving(false)}}
 async function signOut(){await endSession();setUser(null);setData(null);current.current=null}
 async function profile(values){const u=await updateProfile(user,values);setUser(u)}
 return <Context.Provider value={{user,data,loading,error,restore,signIn,signOut,mutate,saving,profile}}>{children}</Context.Provider>
}
