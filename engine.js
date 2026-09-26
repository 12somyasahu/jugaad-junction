export const BALANCE={startingMoney:120,startingRep:100,baseTime:42,minTime:23,timeDecay:.8,failurePenalty:22,timeoutPenalty:26,levels:[0,220,600,1150,1900],levelNames:['Roadside rookie','Proper workbench','Scrap workshop','Jugaad laboratory','JUGAAD EMPIRE']};
const item=(id,name,icon,tags,cost,danger,absurdity=30)=>({id,name,icon,tags:tags.split(' '),cost,danger,absurdity});
export const ITEMS=[
item('tape','Duct tape','tape','binding seal',8,0),item('wire','Copper wire','wire','conductive flexible',9,12),item('bottle','Plastic bottle','bottle','container cooling',3,4,75),item('phone','Old phone','phone','power conductive',18,20,75),item('chain','Bicycle chain','chain','rotation binding',12,12),item('rubber','Rubber band','ring','flexible binding seal',4,2,60),item('blade','Fan blade','fan','rotation cooling',13,15),item('pipe','PVC pipe','pipe','flow structural',10,3),item('motor','Motor','motor','rotation conductive',22,22),item('battery','Battery','battery','power',18,18),item('brick','Brick','brick','structural',2,0,95),item('rope','Rope','rope','binding flexible',5,3),item('magnet','Magnet','magnet','conductive structural',9,8,65),item('spring','Spring','spring','flexible rotation',8,6),item('charger','Old charger','charger','power conductive',12,28),item('rod','Metal rod','rod','structural conductive',9,12),item('wood','Wooden plank','wood','structural binding',6,0),item('bucket','Bucket','bucket','container flow',7,0,65),item('usb','USB cable','wire','conductive binding',8,10,70),item('cap','Bottle cap','cap','seal structural',2,0,90),item('cloth','Wet cloth','cloth','cooling seal',3,8,60),item('fuse','Fuse','fuse','conductive safety',12,0),item('tyre','Old tyre','ring','rotation structural',15,5),item('torch','Torch','torch','power cooling',14,8,65),item('switch','Switch','switch','conductive safety',9,0),item('spoon','Spoon','spoon','flow conductive',2,5,100)];
export const PROBLEMS=[
{name:'The ceiling fan',fault:'Three speeds. All of them zero.',needs:['power','rotation','structural'],machine:'fan'},
{name:'The leaking tank',fault:'The whole lane is getting a free shower.',needs:['flow','container','seal'],machine:'tank'},
{name:'The dead scooter',fault:'It only starts in motivational speeches.',needs:['power','rotation','conductive'],machine:'scooter'},
{name:'The silent radio',fault:'Even the cricket commentary gave up.',needs:['power','conductive','structural'],machine:'radio'},
{name:'The hot computer',fault:'Currently better at making toast.',needs:['cooling','rotation','structural'],machine:'computer'},
{name:'The thirsty cooler',fault:'Blowing hot air and false promises.',needs:['cooling','flow','container'],machine:'cooler'},
{name:'The wonky bicycle',fault:'Two wheels. Three different directions.',needs:['rotation','binding','structural'],machine:'bicycle'},
{name:'The auto-rickshaw',fault:'Meter is running. Nothing else is.',needs:['power','rotation','binding'],machine:'auto'},
{name:'The tea-powered server',fault:'Needs cooling, power, and questionable confidence.',needs:['power','cooling','conductive','structural'],machine:'computer',unlock:3},
{name:'The rooftop rain rover',fault:'Must survive water AND the landlord.',needs:['rotation','seal','structural','binding'],machine:'scooter',unlock:4}];
export const PEOPLE=[['Angry Uncle','It worked perfectly in 1998.'],['College Student','My budget is mostly emotional.'],['Auto Driver','Just get it moving, boss.'],['Shopkeeper','Fix it before the next customer!'],['Hostel Student','Can it also make Maggi?'],['Delivery Rider','My five-star rating is in your hands.'],['Neighbour Aunty','Sharma ji would have fixed it by now.'],['Farmer','Simple, strong. That is all I need.'],['Engineer','I promise not to ask for the circuit diagram.']];
export const EVENTS=[
{id:'normal',name:'Business as unusual',desc:'A quiet lane. Make something questionable.'},
{id:'monsoon',name:'Monsoon incoming',desc:'Exposed power or wire adds 22 danger.'},
{id:'powercut',name:'Power cut',desc:'Old chargers are offline. Portable power still works.'},
{id:'inspection',name:'Police inspection',desc:'Danger above 45 costs ₹25 and 8 reputation.'},
{id:'crash',name:'Scrap price crash',desc:'All materials cost half price this round.'},
{id:'hurry',name:'Customer in a hurry',desc:'8 seconds less patience. Successful repair pays ₹20 extra.'},
{id:'viral',name:'Viral reel',desc:'A camera is rolling. Successful repairs earn double reputation.'},
{id:'theft',name:'Missing toolbox',desc:'The neighbour borrowed your kit. Only 8 scrap choices.'},
{id:'truck',name:'Free scrap truck',desc:'12 choices. Materials are free this round!'},
{id:'heat',name:'Heatwave',desc:'Every repair also needs cooling.'},
{id:'uncle',name:'Uncle has advice',desc:'“Use a brick!” Include one in a working repair for ₹25 extra.'}];
export function evaluate(problem,items,event={id:'normal'},known=false){
 const tags=new Set(items.flatMap(i=>i.tags));const covered=problem.needs.filter(t=>tags.has(t));
 const functionality=Math.round(100*covered.length/problem.needs.length);const works=functionality===100;
 const electrical=tags.has('power')||tags.has('conductive');
 const danger=Math.min(100,Math.max(0,items.reduce((n,i)=>n+i.danger,0)+(event.id==='monsoon'&&electrical?22:0)-(tags.has('safety')?30:0)-(tags.has('binding')?5:0)));
 const cost=items.reduce((n,i)=>n+Math.round(i.cost*(event.id==='truck'?0:event.id==='crash'?.5:1)),0);
 const absurdity=Math.round(items.reduce((n,i)=>n+i.absurdity,0)/items.length);
 const creativity=Math.min(100,40+tags.size*5+(known?0:15));
 const economy=Math.max(0,100-cost);const safety=100-danger;
 const score=Math.round(functionality*.5+creativity*.17+economy*.12+safety*.09+absurdity*.12);
 const fine=event.id==='inspection'&&danger>45?25:0;
 const money=(works?65+Math.round(score*.65)+(event.id==='hurry'?20:0)+(event.id==='uncle'&&items.some(i=>i.id==='brick')?25:0):0)-cost-fine;
 const rep=(works?Math.round(5+score/15)*(event.id==='viral'?2:1):-BALANCE.failurePenalty)-(fine?8:0);
 return{works,covered,functionality,danger,cost,absurdity,creativity,economy,safety,score,money,rep,fine,explosion:!works&&danger>45};
}
export function levelFor(earned){return BALANCE.levels.reduce((l,n,i)=>earned>=n?i:l,0);}
export function comboKey(items){return items.map(i=>i.id).sort().join('+');}
export function solutions(problem,pool){const found=[];for(let a=0;a<pool.length;a++)for(let b=a+1;b<pool.length;b++){if(evaluate(problem,[pool[a],pool[b]]).works)found.push([pool[a],pool[b]]);for(let c=b+1;c<pool.length;c++)if(evaluate(problem,[pool[a],pool[b],pool[c]]).works)found.push([pool[a],pool[b],pool[c]]);}return found;}
export function makeRound(round,rng=Math.random){
 const event=round===1?EVENTS[0]:EVENTS[1+Math.floor(rng()*(EVENTS.length-1))];
 const eligible=PROBLEMS.filter(p=>(p.unlock||1)<=round);const base=round===1?PROBLEMS[0]:eligible[Math.floor(rng()*eligible.length)];
 const problem={...base,needs:[...base.needs]};if(event.id==='heat'&&!problem.needs.includes('cooling'))problem.needs.push('cooling');
 const pool=ITEMS.filter((i,n)=>(round>2||n<21)&&!(event.id==='powercut'&&i.id==='charger'));
 const valid=solutions(problem,pool);const guaranteed=valid[Math.floor(rng()*valid.length)];
 const inventory=[...guaranteed];const rest=pool.filter(i=>!inventory.includes(i));while(inventory.length<(event.id==='truck'?12:event.id==='theft'?8:10)&&rest.length)inventory.push(rest.splice(Math.floor(rng()*rest.length),1)[0]);
 for(let i=inventory.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[inventory[i],inventory[j]]=[inventory[j],inventory[i]];}
 return{problem,event,inventory,time:Math.max(BALANCE.minTime,BALANCE.baseTime-round*BALANCE.timeDecay-(event.id==='hurry'?8:0)),person:PEOPLE[Math.floor(rng()*PEOPLE.length)]};
}
