import{j as e}from"./jsx-runtime.7faW4zRM.js";import{r as a}from"./index.DhYZZe0J.js";import{L as h}from"./Line.ILTlRyRi.js";function E(){const[r,p]=a.useState([]),[n,d]=a.useState([]),[m,l]=a.useState(!0),[u,x]=a.useState(null),[o,f]=a.useState(5),[c,j]=a.useState(5);return a.useEffect(()=>{(async()=>{try{const N=(await(await fetch("https://api.github.com/users/xamey/repos?sort=updated&per_page=100")).json()).filter(t=>!t.fork&&t.description).sort((t,i)=>i.stargazers_count-t.stargazers_count);p(N);const y=(await(await fetch("https://api.github.com/search/issues?q=type:pr+author:xamey&per_page=100")).json()).items.filter(t=>!t.repository_url.includes("/xamey/")).map(t=>{const i=t.repository_url.split("/"),v=`${i[4]}/${i[5]}`;return{url:t.html_url,repo_name:v,title:t.title,state:t.state}});d(y),l(!1)}catch{x("Failed to fetch GitHub data"),l(!1)}})()},[]),m?e.jsxs("section",{className:"space-y-8",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Open Source"}),e.jsx("div",{className:"animate-pulse space-y-4",children:[1,2,3].map(s=>e.jsx("div",{className:"h-24 bg-white/5 rounded-lg"},s))})]}):u?e.jsxs("section",{className:"space-y-8",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Open Source"}),e.jsx("p",{className:"text-red-400",children:u})]}):e.jsxs("section",{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-1",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Open Source"}),e.jsx("p",{className:"text-gray-400",children:"My contributions to the community"})]}),e.jsxs("div",{className:"space-y-8",children:[r.length>0&&e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-sm font-medium text-violet-400 uppercase tracking-wider",children:"Repositories"}),e.jsx("div",{className:"grid gap-4",children:r.slice(0,o).map(s=>e.jsx(h,{href:s.html_url,title:s.name,subtitle:`★ ${s.stargazers_count}`,description:s.description},s.full_name))}),o<r.length&&e.jsx("button",{onClick:()=>f(o+5),className:"text-violet-400 hover:underline",children:"View More"})]}),n.length>0&&e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-sm font-medium text-violet-400 uppercase tracking-wider",children:"External Contributions"}),e.jsx("div",{className:"grid gap-4",children:n.slice(0,c).map(s=>e.jsx(h,{href:s.url,title:s.repo_name,subtitle:s.state,description:s.title},s.url))}),c<n.length&&e.jsx("button",{onClick:()=>j(c+5),className:"text-violet-400 hover:underline",children:"View More"})]}),n.length===0&&e.jsx("p",{className:"text-gray-400 text-sm",children:"No external contributions found in recent activity."})]})]})}export{E as default};