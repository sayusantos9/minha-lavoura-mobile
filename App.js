import React,{useState,useEffect} from 'react';
import {View,Text,Pressable,ActivityIndicator,BackHandler,StyleSheet} from 'react-native';
import {SafeAreaProvider,useSafeAreaInsets} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import {FarmProvider,useFarm} from './src/context/FarmContext';
import {Icon,Button} from './src/components/UI';
import Editor from './src/components/Editor';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import MonitoringScreen from './src/screens/MonitoringScreen';
import StockScreen from './src/screens/StockScreen';
import MachinesScreen from './src/screens/MachinesScreen';
import {colors as c} from './src/theme';
const navigation=[['Início','home'],['Lavoura','leaf'],['Estoque','package-variant-closed'],['Máquinas','tractor'],['Relatórios','file-document']];
function Main(){
 const {user,data,loading,error,restore}=useFarm(),insets=useSafeAreaInsets();const [tab,setTab]=useState('Início'),[editor,setEditor]=useState(null),[selected,setSelected]=useState('p1');
 function open(type,record=null){setEditor({type,record})}function navigate(name,plotId){if(plotId)setSelected(plotId);setTab(name)}
 useEffect(()=>{const sub=BackHandler.addEventListener('hardwareBackPress',()=>{if(editor){setEditor(null);return true}if(tab!=='Início'){setTab('Início');return true}return false});return()=>sub.remove()},[editor,tab]);
 useEffect(()=>{if(!user){setTab('Início');setEditor(null)}},[user?.id]);
 if(loading)return <View style={styles.center}><ActivityIndicator size="large" color={c.green}/><Text style={styles.caption}>Preparando sua lavoura…</Text></View>;
 if(error)return <View style={styles.center}><Text style={styles.caption}>{error}</Text><Button title="Tentar novamente" onPress={restore}/></View>;
 if(!user||!data)return <AuthScreen/>;
 return <View style={[styles.app,{paddingTop:insets.top}]}><View style={styles.page}>{tab==='Início'?<HomeScreen navigate={navigate} open={open}/>:tab==='Lavoura'?<MonitoringScreen selected={selected} setSelected={setSelected} open={open}/>:tab==='Estoque'?<StockScreen open={open}/>:<MachinesScreen key={tab} open={open} navigate={navigate} reportOnly={tab==='Relatórios'}/>}</View><View style={[styles.nav,{paddingBottom:Math.max(insets.bottom,6)}]}>{navigation.map(([name,icon])=><Pressable key={name} accessibilityRole="tab" accessibilityState={{selected:tab===name}} accessibilityLabel={name} onPress={()=>setTab(name)} style={styles.navItem}><Icon name={icon} size={24} color={tab===name?c.green:c.gray}/><Text style={[styles.navLabel,{color:tab===name?c.green:c.muted,fontWeight:tab===name?'600':'400'}]}>{name}</Text></Pressable>)}</View><Editor type={editor?.type} record={editor?.record} onClose={()=>setEditor(null)} open={open} selected={data.plots.find(p=>p.id===selected)?.id||data.plots[0]?.id}/></View>
}
export default function App(){return <SafeAreaProvider><FarmProvider><StatusBar style="dark"/><Main/></FarmProvider></SafeAreaProvider>}
const styles=StyleSheet.create({app:{flex:1,backgroundColor:c.bg,alignSelf:'center',width:'100%',maxWidth:760},page:{flex:1},nav:{flexDirection:'row',backgroundColor:c.bg,borderTopWidth:1,borderTopColor:c.border,paddingTop:10,paddingHorizontal:5},navItem:{flex:1,minHeight:44,alignItems:'center',justifyContent:'center',gap:3},navLabel:{fontSize:10},center:{flex:1,backgroundColor:c.bg,alignItems:'center',justifyContent:'center',padding:30,gap:20},caption:{fontSize:16,color:c.green,textAlign:'center'}});
