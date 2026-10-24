var q=Math.PI/180,ys=180/Math.PI,ws=1e-6,Re=(n,e,t)=>n<e?e:n>t?t:n,zr=n=>Re(n,0,1),Gr=(n,e,t)=>n+(e-n)*t,Ms=(n,e,t)=>{let r=zr((t-n)/(e-n));return r*r*(3-2*r)},K=(n,e,t,r)=>t<=0?e:Gr(e,n,Math.pow(2,-r/t)),m={create(n=0,e=0,t=0){let r=new Float32Array(3);return r[0]=n,r[1]=e,r[2]=t,r},clone(n){return m.create(n[0],n[1],n[2])},set(n,e,t,r){return n[0]=e,n[1]=t,n[2]=r,n},copy(n,e){return n[0]=e[0],n[1]=e[1],n[2]=e[2],n},add(n,e,t){return n[0]=e[0]+t[0],n[1]=e[1]+t[1],n[2]=e[2]+t[2],n},sub(n,e,t){return n[0]=e[0]-t[0],n[1]=e[1]-t[1],n[2]=e[2]-t[2],n},mul(n,e,t){return n[0]=e[0]*t[0],n[1]=e[1]*t[1],n[2]=e[2]*t[2],n},scale(n,e,t){return n[0]=e[0]*t,n[1]=e[1]*t,n[2]=e[2]*t,n},scaleAndAdd(n,e,t,r){return n[0]=e[0]+t[0]*r,n[1]=e[1]+t[1]*r,n[2]=e[2]+t[2]*r,n},dot(n,e){return n[0]*e[0]+n[1]*e[1]+n[2]*e[2]},cross(n,e,t){let r=e[0],s=e[1],i=e[2],a=t[0],o=t[1],l=t[2];return n[0]=s*l-i*o,n[1]=i*a-r*l,n[2]=r*o-s*a,n},length(n){return Math.hypot(n[0],n[1],n[2])},lengthSq(n){return n[0]*n[0]+n[1]*n[1]+n[2]*n[2]},distance(n,e){return Math.hypot(n[0]-e[0],n[1]-e[1],n[2]-e[2])},normalize(n,e){let t=Math.hypot(e[0],e[1],e[2]),r=t>0?1/t:0;return n[0]=e[0]*r,n[1]=e[1]*r,n[2]=e[2]*r,n},negate(n,e){return n[0]=-e[0],n[1]=-e[1],n[2]=-e[2],n},lerp(n,e,t,r){return n[0]=e[0]+(t[0]-e[0])*r,n[1]=e[1]+(t[1]-e[1])*r,n[2]=e[2]+(t[2]-e[2])*r,n},min(n,e,t){return n[0]=Math.min(e[0],t[0]),n[1]=Math.min(e[1],t[1]),n[2]=Math.min(e[2],t[2]),n},max(n,e,t){return n[0]=Math.max(e[0],t[0]),n[1]=Math.max(e[1],t[1]),n[2]=Math.max(e[2],t[2]),n},transformMat4(n,e,t){let r=e[0],s=e[1],i=e[2],a=t[3]*r+t[7]*s+t[11]*i+t[15];return a=a||1,n[0]=(t[0]*r+t[4]*s+t[8]*i+t[12])/a,n[1]=(t[1]*r+t[5]*s+t[9]*i+t[13])/a,n[2]=(t[2]*r+t[6]*s+t[10]*i+t[14])/a,n},transformDirMat4(n,e,t){let r=e[0],s=e[1],i=e[2];return n[0]=t[0]*r+t[4]*s+t[8]*i,n[1]=t[1]*r+t[5]*s+t[9]*i,n[2]=t[2]*r+t[6]*s+t[10]*i,n},transformQuat(n,e,t){let r=t[0],s=t[1],i=t[2],a=t[3],o=e[0],l=e[1],c=e[2],u=s*c-i*l,h=i*o-r*c,p=r*l-s*o,d=s*p-i*h,f=i*u-r*p,b=r*h-s*u,v=a*2;return u*=v,h*=v,p*=v,d*=2,f*=2,b*=2,n[0]=o+u+d,n[1]=l+h+f,n[2]=c+p+b,n}},Ps={create(n=0,e=0,t=0,r=0){let s=new Float32Array(4);return s[0]=n,s[1]=e,s[2]=t,s[3]=r,s},transformMat4(n,e,t){let r=e[0],s=e[1],i=e[2],a=e[3];return n[0]=t[0]*r+t[4]*s+t[8]*i+t[12]*a,n[1]=t[1]*r+t[5]*s+t[9]*i+t[13]*a,n[2]=t[2]*r+t[6]*s+t[10]*i+t[14]*a,n[3]=t[3]*r+t[7]*s+t[11]*i+t[15]*a,n}},L={create(){let n=new Float32Array(4);return n[3]=1,n},fromValues(n,e,t,r){let s=new Float32Array(4);return s[0]=n,s[1]=e,s[2]=t,s[3]=r,s},identity(n){return n[0]=0,n[1]=0,n[2]=0,n[3]=1,n},copy(n,e){return n[0]=e[0],n[1]=e[1],n[2]=e[2],n[3]=e[3],n},setAxisAngle(n,e,t){let r=t*.5,s=Math.sin(r);return n[0]=s*e[0],n[1]=s*e[1],n[2]=s*e[2],n[3]=Math.cos(r),n},multiply(n,e,t){let r=e[0],s=e[1],i=e[2],a=e[3],o=t[0],l=t[1],c=t[2],u=t[3];return n[0]=r*u+a*o+s*c-i*l,n[1]=s*u+a*l+i*o-r*c,n[2]=i*u+a*c+r*l-s*o,n[3]=a*u-r*o-s*l-i*c,n},rotateX(n,e,t){let r=t*.5,s=Math.sin(r),i=Math.cos(r),a=e[0],o=e[1],l=e[2],c=e[3];return n[0]=a*i+c*s,n[1]=o*i+l*s,n[2]=l*i-o*s,n[3]=c*i-a*s,n},rotateY(n,e,t){let r=t*.5,s=Math.sin(r),i=Math.cos(r),a=e[0],o=e[1],l=e[2],c=e[3];return n[0]=a*i-l*s,n[1]=o*i+c*s,n[2]=l*i+a*s,n[3]=c*i-o*s,n},rotateZ(n,e,t){let r=t*.5,s=Math.sin(r),i=Math.cos(r),a=e[0],o=e[1],l=e[2],c=e[3];return n[0]=a*i+o*s,n[1]=o*i-a*s,n[2]=l*i+c*s,n[3]=c*i-l*s,n},fromEuler(n,e,t,r){return L.identity(n),L.rotateY(n,n,t),L.rotateX(n,n,e),L.rotateZ(n,n,r),n},normalize(n,e){let t=Math.hypot(e[0],e[1],e[2],e[3]),r=t>0?1/t:0;return n[0]=e[0]*r,n[1]=e[1]*r,n[2]=e[2]*r,n[3]=e[3]*r,n},conjugate(n,e){return n[0]=-e[0],n[1]=-e[1],n[2]=-e[2],n[3]=e[3],n},invert(n,e){let t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2]+e[3]*e[3],r=t?1/t:0;return n[0]=-e[0]*r,n[1]=-e[1]*r,n[2]=-e[2]*r,n[3]=e[3]*r,n},dot(n,e){return n[0]*e[0]+n[1]*e[1]+n[2]*e[2]+n[3]*e[3]},slerp(n,e,t,r){let s=e[0],i=e[1],a=e[2],o=e[3],l=t[0],c=t[1],u=t[2],h=t[3],p=s*l+i*c+a*u+o*h;p<0&&(p=-p,l=-l,c=-c,u=-u,h=-h);let d,f;if(1-p>1e-6){let b=Math.acos(p),v=Math.sin(b);d=Math.sin((1-r)*b)/v,f=Math.sin(r*b)/v}else d=1-r,f=r;return n[0]=d*s+f*l,n[1]=d*i+f*c,n[2]=d*a+f*u,n[3]=d*o+f*h,n},rotationTo(n,e,t){let r=m.dot(e,t);if(r<-.999999){let i=m.create();return m.cross(i,m.create(1,0,0),e),m.length(i)<1e-6&&m.cross(i,m.create(0,1,0),e),m.normalize(i,i),L.setAxisAngle(n,i,Math.PI)}if(r>.999999)return L.identity(n);let s=m.cross(m.create(),e,t);return n[0]=s[0],n[1]=s[1],n[2]=s[2],n[3]=1+r,L.normalize(n,n)},lookRotation(n,e,t){let r=M.create(),s=m.normalize(m.create(),m.negate(m.create(),e)),i=m.normalize(m.create(),m.cross(m.create(),t,s)),a=m.cross(m.create(),s,i);return r[0]=i[0],r[1]=i[1],r[2]=i[2],r[4]=a[0],r[5]=a[1],r[6]=a[2],r[8]=s[0],r[9]=s[1],r[10]=s[2],M.getRotation(n,r)}},M={create(){let n=new Float32Array(16);return n[0]=n[5]=n[10]=n[15]=1,n},clone(n){return new Float32Array(n)},copy(n,e){for(let t=0;t<16;t++)n[t]=e[t];return n},identity(n){return n.fill(0),n[0]=n[5]=n[10]=n[15]=1,n},multiply(n,e,t){let r=e[0],s=e[1],i=e[2],a=e[3],o=e[4],l=e[5],c=e[6],u=e[7],h=e[8],p=e[9],d=e[10],f=e[11],b=e[12],v=e[13],g=e[14],y=e[15];for(let w=0;w<4;w++){let P=t[w*4],k=t[w*4+1],A=t[w*4+2],T=t[w*4+3];n[w*4]=P*r+k*o+A*h+T*b,n[w*4+1]=P*s+k*l+A*p+T*v,n[w*4+2]=P*i+k*c+A*d+T*g,n[w*4+3]=P*a+k*u+A*f+T*y}return n},invert(n,e){let t=e[0],r=e[1],s=e[2],i=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],p=e[10],d=e[11],f=e[12],b=e[13],v=e[14],g=e[15],y=t*o-r*a,w=t*l-s*a,P=t*c-i*a,k=r*l-s*o,A=r*c-i*o,T=s*c-i*l,z=u*b-h*f,B=u*v-p*f,C=u*g-d*f,U=h*v-p*b,V=h*g-d*b,E=p*g-d*v,G=y*E-w*V+P*U+k*C-A*B+T*z;return G?(G=1/G,n[0]=(o*E-l*V+c*U)*G,n[1]=(s*V-r*E-i*U)*G,n[2]=(b*T-v*A+g*k)*G,n[3]=(p*A-h*T-d*k)*G,n[4]=(l*C-a*E-c*B)*G,n[5]=(t*E-s*C+i*B)*G,n[6]=(v*P-f*T-g*w)*G,n[7]=(u*T-p*P+d*w)*G,n[8]=(a*V-o*C+c*z)*G,n[9]=(r*C-t*V-i*z)*G,n[10]=(f*A-b*P+g*y)*G,n[11]=(h*P-u*A-d*y)*G,n[12]=(o*B-a*U-l*z)*G,n[13]=(t*U-r*B+s*z)*G,n[14]=(b*w-f*k-v*y)*G,n[15]=(u*k-h*w+p*y)*G,n):null},transpose(n,e){if(n===e){let t=e[1],r=e[2],s=e[3],i=e[6],a=e[7],o=e[11];return n[1]=e[4],n[2]=e[8],n[3]=e[12],n[4]=t,n[6]=e[9],n[7]=e[13],n[8]=r,n[9]=i,n[11]=e[14],n[12]=s,n[13]=a,n[14]=o,n}for(let t=0;t<4;t++)for(let r=0;r<4;r++)n[r*4+t]=e[t*4+r];return n},fromRotationTranslationScale(n,e,t,r){let s=e[0],i=e[1],a=e[2],o=e[3],l=s+s,c=i+i,u=a+a,h=s*l,p=s*c,d=s*u,f=i*c,b=i*u,v=a*u,g=o*l,y=o*c,w=o*u,P=r[0],k=r[1],A=r[2];return n[0]=(1-(f+v))*P,n[1]=(p+w)*P,n[2]=(d-y)*P,n[3]=0,n[4]=(p-w)*k,n[5]=(1-(h+v))*k,n[6]=(b+g)*k,n[7]=0,n[8]=(d+y)*A,n[9]=(b-g)*A,n[10]=(1-(h+f))*A,n[11]=0,n[12]=t[0],n[13]=t[1],n[14]=t[2],n[15]=1,n},fromRotationTranslation(n,e,t){return M.fromRotationTranslationScale(n,e,t,Dt)},translate(n,e,t){let r=t[0],s=t[1],i=t[2];if(n!==e)for(let a=0;a<12;a++)n[a]=e[a];return n[12]=e[0]*r+e[4]*s+e[8]*i+e[12],n[13]=e[1]*r+e[5]*s+e[9]*i+e[13],n[14]=e[2]*r+e[6]*s+e[10]*i+e[14],n[15]=e[3]*r+e[7]*s+e[11]*i+e[15],n},fromTranslation(n,e){return M.identity(n),n[12]=e[0],n[13]=e[1],n[14]=e[2],n},fromScaling(n,e){return M.identity(n),n[0]=e[0],n[5]=e[1],n[10]=e[2],n},fromQuat(n,e){return M.fromRotationTranslationScale(n,e,Lr,Dt)},getTranslation(n,e){return n[0]=e[12],n[1]=e[13],n[2]=e[14],n},getScaling(n,e){return n[0]=Math.hypot(e[0],e[1],e[2]),n[1]=Math.hypot(e[4],e[5],e[6]),n[2]=Math.hypot(e[8],e[9],e[10]),n},getRotation(n,e){let t=Math.hypot(e[0],e[1],e[2])||1,r=Math.hypot(e[4],e[5],e[6])||1,s=Math.hypot(e[8],e[9],e[10])||1,i=e[0]/t,a=e[1]/t,o=e[2]/t,l=e[4]/r,c=e[5]/r,u=e[6]/r,h=e[8]/s,p=e[9]/s,d=e[10]/s,f=i+c+d;if(f>0){let b=Math.sqrt(f+1)*2;n[3]=.25*b,n[0]=(u-p)/b,n[1]=(h-o)/b,n[2]=(a-l)/b}else if(i>c&&i>d){let b=Math.sqrt(1+i-c-d)*2;n[3]=(u-p)/b,n[0]=.25*b,n[1]=(a+l)/b,n[2]=(h+o)/b}else if(c>d){let b=Math.sqrt(1+c-i-d)*2;n[3]=(h-o)/b,n[0]=(a+l)/b,n[1]=.25*b,n[2]=(u+p)/b}else{let b=Math.sqrt(1+d-i-c)*2;n[3]=(a-l)/b,n[0]=(h+o)/b,n[1]=(u+p)/b,n[2]=.25*b}return n},lookAt(n,e,t,r){let s=e[0]-t[0],i=e[1]-t[1],a=e[2]-t[2],o=Math.hypot(s,i,a)||1;s/=o,i/=o,a/=o;let l=r[1]*a-r[2]*i,c=r[2]*s-r[0]*a,u=r[0]*i-r[1]*s;o=Math.hypot(l,c,u)||1,l/=o,c/=o,u/=o;let h=i*u-a*c,p=a*l-s*u,d=s*c-i*l;return n[0]=l,n[1]=h,n[2]=s,n[3]=0,n[4]=c,n[5]=p,n[6]=i,n[7]=0,n[8]=u,n[9]=d,n[10]=a,n[11]=0,n[12]=-(l*e[0]+c*e[1]+u*e[2]),n[13]=-(h*e[0]+p*e[1]+d*e[2]),n[14]=-(s*e[0]+i*e[1]+a*e[2]),n[15]=1,n},perspectiveReversedInfinite(n,e,t,r,s=0,i=0){let a=1/Math.tan(e/2);return n.fill(0),n[0]=a/t,n[5]=a,n[8]=-s,n[9]=-i,n[11]=-1,n[14]=r,n},perspectiveZO(n,e,t,r,s){let i=1/Math.tan(e/2);n.fill(0),n[0]=i/t,n[5]=i,n[11]=-1;let a=1/(r-s);return n[10]=s*a,n[14]=s*r*a,n},orthoZO(n,e,t,r,s,i,a){let o=1/(e-t),l=1/(r-s),c=1/(i-a);return n.fill(0),n[0]=-2*o,n[5]=-2*l,n[10]=c,n[15]=1,n[12]=(e+t)*o,n[13]=(s+r)*l,n[14]=i*c,n},normalMatrix12(n,e,t=0){let r=e[0],s=e[1],i=e[2],a=e[4],o=e[5],l=e[6],c=e[8],u=e[9],h=e[10],p=h*o-l*u,d=-h*a+l*c,f=u*a-o*c,b=r*p+s*d+i*f;b=b?1/b:0;let v=p*b,g=(-h*s+i*u)*b,y=(l*s-i*o)*b,w=d*b,P=(h*r-i*c)*b,k=(-l*r+i*a)*b,A=f*b,T=(-u*r+s*c)*b,z=(o*r-s*a)*b;return n[t+0]=v,n[t+1]=w,n[t+2]=A,n[t+3]=0,n[t+4]=g,n[t+5]=P,n[t+6]=T,n[t+7]=0,n[t+8]=y,n[t+9]=k,n[t+10]=z,n[t+11]=0,n}},Dt=new Float32Array([1,1,1]),Lr=new Float32Array([0,0,0]),$={create(){return{min:m.create(1/0,1/0,1/0),max:m.create(-1/0,-1/0,-1/0)}},fromPositions(n){let e=$.create();for(let t=0;t<n.length;t+=3){let r=n[t],s=n[t+1],i=n[t+2];r<e.min[0]&&(e.min[0]=r),s<e.min[1]&&(e.min[1]=s),i<e.min[2]&&(e.min[2]=i),r>e.max[0]&&(e.max[0]=r),s>e.max[1]&&(e.max[1]=s),i>e.max[2]&&(e.max[2]=i)}return e},transform(n,e,t){for(let r=0;r<3;r++){let s=t[12+r],i=t[12+r];for(let a=0;a<3;a++){let o=t[a*4+r],l=o*e.min[a],c=o*e.max[a];l<c?(s+=l,i+=c):(s+=c,i+=l)}n.min[r]=s,n.max[r]=i}return n}};function mt(n,e=new Float32Array(20)){let t=l=>[n[l],n[4+l],n[8+l],n[12+l]],r=t(0),s=t(1),i=t(2),a=t(3),o=[[a[0]+r[0],a[1]+r[1],a[2]+r[2],a[3]+r[3]],[a[0]-r[0],a[1]-r[1],a[2]-r[2],a[3]-r[3]],[a[0]+s[0],a[1]+s[1],a[2]+s[2],a[3]+s[3]],[a[0]-s[0],a[1]-s[1],a[2]-s[2],a[3]-s[3]],[a[0]-i[0],a[1]-i[1],a[2]-i[2],a[3]-i[3]]];for(let l=0;l<5;l++){let c=Math.hypot(o[l][0],o[l][1],o[l][2])||1;for(let u=0;u<4;u++)e[l*4+u]=o[l][u]/c}return e}function dt(n,e){for(let t=0;t<5;t++){let r=n[t*4],s=n[t*4+1],i=n[t*4+2],a=n[t*4+3],o=r>=0?e.max[0]:e.min[0],l=s>=0?e.max[1]:e.min[1],c=i>=0?e.max[2]:e.min[2];if(r*o+s*l+i*c+a<0)return!1}return!0}function ie(n=2654435769){let e=n>>>0,t=()=>{e=e+1831565813>>>0;let r=e;return r=Math.imul(r^r>>>15,r|1),r^=r+Math.imul(r^r>>>7,r|61),((r^r>>>14)>>>0)/4294967296};return{next:t,range:(r,s)=>r+(s-r)*t(),gauss:()=>{let r=Math.max(t(),1e-12),s=t();return Math.sqrt(-2*Math.log(r))*Math.cos(2*Math.PI*s)},sign:()=>t()<.5?-1:1}}function ht(n,e){let t=1,r=0,s=n;for(;s>0;)t/=e,r+=t*(s%e),s=Math.floor(s/e);return r}var _e=class n{adapter;device;context;canvas;presentationFormat;features;onError=e=>console.error("[fondaineGL]",e);offscreen;constructor(e,t,r,s){this.adapter=e,this.device=t,this.canvas=r,this.offscreen=s,this.presentationFormat=s?"rgba8unorm":navigator.gpu.getPreferredCanvasFormat();let i=s?null:r.getContext("webgpu");if(!s&&!i)throw new Error("fondaineGL: could not get a WebGPU canvas context");this.context=i,s||this.context.configure({device:t,format:this.presentationFormat,alphaMode:"opaque"}),this.features=new Set([...t.features]),t.addEventListener("uncapturederror",a=>this.onError(a.error.message)),t.lost.then(a=>this.onError(`device lost (${a.reason}): ${a.message}`))}static async create(e){if(!("gpu"in navigator))throw new Error("fondaineGL requires WebGPU (Chrome/Edge 113+, Safari 26+, Firefox 141+).");let t=await navigator.gpu.requestAdapter({powerPreference:e.powerPreference??"high-performance"});if(!t)throw new Error("fondaineGL: no WebGPU adapter available");let s=["float32-filterable","rg11b10ufloat-renderable","texture-compression-bc","texture-compression-astc","texture-compression-etc2",...e.optionalFeatures??[]].filter(o=>t.features.has(o)),i=t.limits,a=await t.requestDevice({requiredFeatures:s,requiredLimits:{maxTextureDimension2D:i.maxTextureDimension2D,maxTextureArrayLayers:i.maxTextureArrayLayers,maxStorageBufferBindingSize:i.maxStorageBufferBindingSize,maxBufferSize:i.maxBufferSize,maxComputeWorkgroupStorageSize:i.maxComputeWorkgroupStorageSize,maxComputeInvocationsPerWorkgroup:i.maxComputeInvocationsPerWorkgroup,maxStorageTexturesPerShaderStage:i.maxStorageTexturesPerShaderStage,maxSampledTexturesPerShaderStage:i.maxSampledTexturesPerShaderStage,maxColorAttachmentBytesPerSample:i.maxColorAttachmentBytesPerSample}});return new n(t,a,e.canvas,!!e.offscreen)}get floatFilterable(){return this.features.has("float32-filterable")}createBuffer(e,t,r,s){let i=Math.max(16,Math.ceil(e/16)*16),a=this.device.createBuffer({size:i,usage:t|GPUBufferUsage.COPY_DST,label:r});return s&&this.device.queue.writeBuffer(a,0,s.buffer,s.byteOffset,s.byteLength),a}createTexture(e){return this.device.createTexture(e)}shader(e,t){let r=this.device.createShaderModule({code:e,label:t});return r.getCompilationInfo?.().then(s=>{for(let i of s.messages){if(i.type!=="error")continue;let o=e.split(`
`).slice(Math.max(0,i.lineNum-3),i.lineNum+1).join(`
`);this.onError(`WGSL error in ${t??"shader"} @${i.lineNum}:${i.linePos}: ${i.message}
${o}`)}}),r}},Ve=class{f32;u32;buffer;constructor(e){this.buffer=new ArrayBuffer(Math.ceil(e/16)*16),this.f32=new Float32Array(this.buffer),this.u32=new Uint32Array(this.buffer)}mat4(e,t){this.f32.set(t,e/4)}vec4(e,t,r=0,s=0,i=0){let a=e/4;this.f32[a]=t,this.f32[a+1]=r,this.f32[a+2]=s,this.f32[a+3]=i}uvec4(e,t,r=0,s=0,i=0){let a=e/4;this.u32[a]=t,this.u32[a+1]=r,this.u32[a+2]=s,this.u32[a+3]=i}f(e,t){this.f32[e/4]=t}},Ss=20,Ts=12;function Q(n,e=n){return Math.floor(Math.log2(Math.max(n,e)))+1}function pt(n){return n<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4)}function zs(n){return n<=.0031308?n*12.92:1.055*Math.pow(n,1/2.4)-.055}function Gs(n){let e=n.replace("#",""),t=parseInt(e.slice(0,2),16)/255,r=parseInt(e.slice(2,4),16)/255,s=parseInt(e.slice(4,6),16)/255;return[pt(t),pt(r),pt(s)]}function ft(n){let e=Math.min(25e3,Math.max(1667,n)),t;e<=4e3?t=-266123900/e**3-234358.9/e**2+877.6956/e+.17991:t=-3025846900/e**3+21070379e-1/e**2+222.6347/e+.24039;let r;e<=2222?r=-1.1063814*t**3-1.3481102*t**2+2.18555832*t-.20219683:e<=4e3?r=-.9549476*t**3-1.37418593*t**2+2.09137015*t-.16748867:r=3.081758*t**3-5.8733867*t**2+3.75112997*t-.37001483;let s=1,i=t/r*s,a=(1-t-r)/r*s,o=3.2404542*i-1.5371385*s-.4985314*a,l=-.969266*i+1.8760108*s+.041556*a,c=.0556434*i-.2040259*s+1.0572252*a;o=Math.max(o,0),l=Math.max(l,0),c=Math.max(c,0);let u=Math.max(o,l,c)||1;return[o/u,l/u,c/u]}function Ot(n){let e=ft(n),t=.2126*e[0]+.7152*e[1]+.0722*e[2];return[e[0]/t,e[1]/t,e[2]/t]}function Ft(n,e,t){return Math.log2(n*n/e*(100/t))}function Ls(n){return 1/(1.2*Math.pow(2,n))}function It(n){return n/(4*Math.PI)}var gt=class n{positions;normals;uvs;tangents=null;indices;joints=null;weights=null;constructor(e,t,r,s){this.positions=Float32Array.from(e),this.normals=Float32Array.from(t),this.uvs=Float32Array.from(r),this.indices=Uint32Array.from(s)}get vertexCount(){return this.positions.length/3}get triangleCount(){return this.indices.length/3}clone(){let e=new n(this.positions,this.normals,this.uvs,this.indices);return this.tangents&&(e.tangents=Float32Array.from(this.tangents)),this.joints&&(e.joints=Uint16Array.from(this.joints)),this.weights&&(e.weights=Float32Array.from(this.weights)),e}bounds(){return $.fromPositions(this.positions)}transform(e){let t=m.create(),r=m.create(),s=M.invert(M.create(),e);M.transpose(s,s);for(let a=0;a<this.positions.length;a+=3)m.transformMat4(t,this.positions.subarray(a,a+3),e),this.positions.set(t,a),m.transformDirMat4(r,this.normals.subarray(a,a+3),s),m.normalize(r,r),this.normals.set(r,a);if(this.tangents){let a=m.create();for(let o=0;o<this.tangents.length;o+=4)m.transformDirMat4(a,this.tangents.subarray(o,o+3),e),m.normalize(a,a),this.tangents.set(a,o)}return e[0]*(e[5]*e[10]-e[6]*e[9])-e[4]*(e[1]*e[10]-e[2]*e[9])+e[8]*(e[1]*e[6]-e[2]*e[5])<0&&this.flipWinding(),this}translate(e,t,r){return this.transform(M.fromTranslation(M.create(),[e,t,r]))}rotateX(e){let t=M.create();return t[5]=Math.cos(e),t[6]=Math.sin(e),t[9]=-Math.sin(e),t[10]=Math.cos(e),this.transform(t)}rotateY(e){let t=M.create();return t[0]=Math.cos(e),t[2]=-Math.sin(e),t[8]=Math.sin(e),t[10]=Math.cos(e),this.transform(t)}rotateZ(e){let t=M.create();return t[0]=Math.cos(e),t[1]=Math.sin(e),t[4]=-Math.sin(e),t[5]=Math.cos(e),this.transform(t)}scale(e,t=e,r=e){return this.transform(M.fromScaling(M.create(),[e,t,r]))}flipWinding(){let e=this.indices;for(let t=0;t<e.length;t+=3){let r=e[t+1];e[t+1]=e[t+2],e[t+2]=r}return this}scaleUVs(e,t=e){for(let r=0;r<this.uvs.length;r+=2)this.uvs[r]*=e,this.uvs[r+1]*=t;return this}displace(e){for(let t=0;t<this.positions.length;t+=3){let r=e([this.positions[t],this.positions[t+1],this.positions[t+2]]);this.positions[t]=r[0],this.positions[t+1]=r[1],this.positions[t+2]=r[2]}return this.computeNormals()}computeNormals(){let e=new Float32Array(this.positions.length),t=this.positions,r=this.indices;for(let s=0;s<r.length;s+=3){let i=r[s]*3,a=r[s+1]*3,o=r[s+2]*3,l=t[a]-t[i],c=t[a+1]-t[i+1],u=t[a+2]-t[i+2],h=t[o]-t[i],p=t[o+1]-t[i+1],d=t[o+2]-t[i+2],f=c*d-u*p,b=u*h-l*d,v=l*p-c*h;for(let g of[i,a,o])e[g]+=f,e[g+1]+=b,e[g+2]+=v}for(let s=0;s<e.length;s+=3){let i=Math.hypot(e[s],e[s+1],e[s+2])||1;e[s]/=i,e[s+1]/=i,e[s+2]/=i}return this.normals=e,this}computeTangents(){return this.tangents=vt(this.positions,this.normals,this.uvs,this.indices),this}toFlat(){let e=this.indices,t=new Float32Array(e.length*3),r=new Float32Array(e.length*2);for(let i=0;i<e.length;i++)t.set(this.positions.subarray(e[i]*3,e[i]*3+3),i*3),r.set(this.uvs.subarray(e[i]*2,e[i]*2+2),i*2);return new n(t,new Float32Array(t.length),r,Array.from({length:e.length},(i,a)=>a)).computeNormals()}static merge(e){let t=0,r=0;for(let d of e)t+=d.vertexCount,r+=d.indices.length;let s=new Float32Array(t*3),i=new Float32Array(t*3),a=new Float32Array(t*2),o=new Uint32Array(r),c=e.some(d=>d.tangents)?new Float32Array(t*4):null,u=0,h=0;for(let d of e){s.set(d.positions,u*3),i.set(d.normals,u*3),a.set(d.uvs,u*2),c&&d.tangents&&c.set(d.tangents,u*4);for(let f=0;f<d.indices.length;f++)o[h+f]=d.indices[f]+u;u+=d.vertexCount,h+=d.indices.length}let p=new n(s,i,a,o);return p.tangents=c,p}};function vt(n,e,t,r){let s=n.length/3,i=new Float32Array(s*3),a=new Float32Array(s*3);for(let l=0;l<r.length;l+=3){let c=r[l],u=r[l+1],h=r[l+2],p=n[u*3]-n[c*3],d=n[u*3+1]-n[c*3+1],f=n[u*3+2]-n[c*3+2],b=n[h*3]-n[c*3],v=n[h*3+1]-n[c*3+1],g=n[h*3+2]-n[c*3+2],y=t[u*2]-t[c*2],w=t[u*2+1]-t[c*2+1],P=t[h*2]-t[c*2],k=t[h*2+1]-t[c*2+1],A=y*k-P*w;if(Math.abs(A)<1e-12)continue;let T=1/A,z=(k*p-w*b)*T,B=(k*d-w*v)*T,C=(k*f-w*g)*T,U=(y*b-P*p)*T,V=(y*v-P*d)*T,E=(y*g-P*f)*T;for(let G of[c,u,h])i[G*3]+=z,i[G*3+1]+=B,i[G*3+2]+=C,a[G*3]+=U,a[G*3+1]+=V,a[G*3+2]+=E}let o=new Float32Array(s*4);for(let l=0;l<s;l++){let c=e[l*3],u=e[l*3+1],h=e[l*3+2],p=i[l*3],d=i[l*3+1],f=i[l*3+2],b=c*p+u*d+h*f;p-=c*b,d-=u*b,f-=h*b;let v=Math.hypot(p,d,f);if(v<1e-8){let k=Math.abs(c)<.9?1:0,A=k?0:1;p=A*h-0*u,d=0*c-k*h,f=k*u-A*c,v=Math.hypot(p,d,f)||1}p/=v,d/=v,f/=v;let g=u*f-h*d,y=h*p-c*f,w=c*d-u*p,P=g*a[l*3]+y*a[l*3+1]+w*a[l*3+2]<0?-1:1;o[l*4]=p,o[l*4+1]=d,o[l*4+2]=f,o[l*4+3]=P}return o}var J=class{pos=[];nrm=[];uv=[];ix=[];v(e,t,r,s,i,a,o,l){return this.pos.push(e,t,r),this.nrm.push(s,i,a),this.uv.push(o,l),this.pos.length/3-1}tri(e,t,r){this.ix.push(e,t,r)}quad(e,t,r,s){this.ix.push(e,t,r,e,r,s)}build(){return new gt(this.pos,this.nrm,this.uv,this.ix)}};function Ur(n,e,t,r=1){let s=new J,i=n/2,a=e/2,o=t/2,l=[[[1,0,0],[0,0,-1],[0,1,0],t,e],[[-1,0,0],[0,0,1],[0,1,0],t,e],[[0,1,0],[1,0,0],[0,0,-1],n,t],[[0,-1,0],[1,0,0],[0,0,1],n,t],[[0,0,1],[1,0,0],[0,1,0],n,e],[[0,0,-1],[-1,0,0],[0,1,0],n,e]],c=[i,a,o];for(let[u,h,p,d,f]of l){let b=s.pos.length/3;for(let v=0;v<=r;v++)for(let g=0;g<=r;g++){let y=(g/r-.5)*d,w=(v/r-.5)*f,P=u[0]*c[0]+h[0]*y+p[0]*w,k=u[1]*c[1]+h[1]*y+p[1]*w,A=u[2]*c[2]+h[2]*y+p[2]*w;s.v(P,k,A,u[0],u[1],u[2],y+d/2,w+f/2)}for(let v=0;v<r;v++)for(let g=0;g<r;g++){let y=b+v*(r+1)+g;s.quad(y,y+1,y+r+2,y+r+1)}}return s.build()}function Vs(n,e,t,r,s=3){let i=Math.min(r,n/2,e/2,t/2)*.999,a=Ur(n,e,t,1),o=[n/2-i,e/2-i,t/2-i],l=new J,c=[[[1,0,0],[0,0,-1],[0,1,0]],[[-1,0,0],[0,0,1],[0,1,0]],[[0,1,0],[1,0,0],[0,0,-1]],[[0,-1,0],[1,0,0],[0,0,1]],[[0,0,1],[1,0,0],[0,1,0]],[[0,0,-1],[-1,0,0],[0,1,0]]],u=[n/2,e/2,t/2],h=p=>p[0]!==0?0:p[1]!==0?1:2;for(let[p,d,f]of c){let b=h(d),v=h(f),g=h(p),y=T=>{let z=[],B=u[T],C=o[T];for(let U=0;U<=s;U++)z.push(-B+U/s*(B-C));C>1e-6&&z.push(C);for(let U=1;U<=s;U++)z.push(C+U/s*(B-C));return z},w=y(b),P=y(v),k=l.pos.length/3;for(let T=0;T<P.length;T++)for(let z=0;z<w.length;z++){let B=[0,0,0];B[g]=p[g]*u[g],B[b]=w[z]*Math.sign(d[b]),B[v]=P[T]*Math.sign(f[v]);let C=[Math.max(-o[0],Math.min(o[0],B[0])),Math.max(-o[1],Math.min(o[1],B[1])),Math.max(-o[2],Math.min(o[2],B[2]))],U=B[0]-C[0],V=B[1]-C[1],E=B[2]-C[2],G=Math.hypot(U,V,E)||1;U/=G,V/=G,E/=G;let I=[C[0]+U*i,C[1]+V*i,C[2]+E*i];l.v(I[0],I[1],I[2],U,V,E,w[z]+u[b],P[T]+u[v])}let A=w.length;for(let T=0;T<P.length-1;T++)for(let z=0;z<A-1;z++){let B=k+T*A+z;l.quad(B,B+1,B+A+1,B+A)}}return l.build()}function Cs(n,e,t,r=24,s={}){let i=new J,a=s.heightSegments??1,o=s.thetaStart??0,l=s.thetaLength??Math.PI*2,c=(e-n)/t,u=Math.max(n,e);for(let p=0;p<=a;p++){let d=p/a,f=e+(n-e)*d,b=-t/2+d*t;for(let v=0;v<=r;v++){let g=o+v/r*l,y=Math.sin(g),w=Math.cos(g),P=Math.hypot(1,c);i.v(f*y,b,f*w,y/P,c/P,w/P,v/r*l*u,b+t/2)}}for(let p=0;p<a;p++)for(let d=0;d<r;d++){let f=p*(r+1)+d;i.quad(f,f+1,f+r+2,f+r+1)}let h=p=>{let d=p?n:e;if(d<=0)return;let f=p?t/2:-t/2,b=p?1:-1,v=i.v(0,f,0,0,b,0,0,0),g=i.pos.length/3;for(let y=0;y<=r;y++){let w=o+y/r*l;i.v(d*Math.sin(w),f,d*Math.cos(w),0,b,0,d*Math.sin(w),d*Math.cos(w))}for(let y=0;y<r;y++)p?i.tri(v,g+y,g+y+1):i.tri(v,g+y+1,g+y)};return s.capTop!==!1&&h(!0),s.capBottom!==!1&&h(!1),i.build()}function Br(n,e=32,t=35){let r=new J,s=[],i=0;for(let l=0;l<n.length;l++){let[c,u]=n[l];l>0&&(i+=Math.hypot(c-n[l-1][0],u-n[l-1][1]));let h=n[Math.max(0,l-1)],p=n[Math.min(n.length-1,l+1)],d=l>0?[c-h[0],u-h[1]]:null,f=l<n.length-1?[p[0]-c,p[1]-u]:null,b=v=>{let g=Math.hypot(v[0],v[1])||1;return[v[1]/g,-v[0]/g]};if(d&&f){let v=Math.atan2(d[1],d[0]),g=Math.atan2(f[1],f[0]),y=Math.abs(v-g);if(y>Math.PI&&(y=2*Math.PI-y),y>t*Math.PI/180){let k=b(d),A=b(f);s.push({r:c,y:u,nr:k[0],ny:k[1],s:i}),s.push({r:c,y:u,nr:A[0],ny:A[1],s:i});continue}let w=[d[0]/(Math.hypot(d[0],d[1])||1)+f[0]/(Math.hypot(f[0],f[1])||1),d[1]/(Math.hypot(d[0],d[1])||1)+f[1]/(Math.hypot(f[0],f[1])||1)],P=b(w);s.push({r:c,y:u,nr:P[0],ny:P[1],s:i})}else{let v=b(d??f);s.push({r:c,y:u,nr:v[0],ny:v[1],s:i})}}let a=Math.max(...n.map(l=>l[0]),1e-4),o=e+1;for(let l of s)for(let c=0;c<=e;c++){let u=c/e*Math.PI*2,h=Math.sin(u),p=Math.cos(u);r.v(l.r*h,l.y,l.r*p,l.nr*h,l.ny,l.nr*p,c/e*Math.PI*2*a,l.s)}for(let l=0;l<s.length-1;l++)if(!(s[l].r===s[l+1].r&&s[l].y===s[l+1].y))for(let c=0;c<e;c++){let u=l*o+c;r.quad(u,u+1,u+o+1,u+o)}return r.build()}function Es(n,e=24,t=16){let r=new J;for(let s=0;s<=t;s++){let i=s/t,a=i*Math.PI;for(let o=0;o<=e;o++){let l=o/e,c=l*Math.PI*2,u=-Math.cos(c)*Math.sin(a),h=Math.cos(a),p=Math.sin(c)*Math.sin(a);r.v(u*n,h*n,p*n,u,h,p,l*Math.PI*2*n,i*Math.PI*n)}}for(let s=0;s<t;s++)for(let i=0;i<e;i++){let a=s*(e+1)+i;s!==0&&r.tri(a,a+e+1,a+1),s!==t-1&&r.tri(a+1,a+e+1,a+e+2)}return r.build()}function Ds(n,e,t=1,r=1){let s=new J;for(let i=0;i<=r;i++)for(let a=0;a<=t;a++){let o=(a/t-.5)*n,l=(i/r-.5)*e;s.v(o,0,l,0,1,0,o+n/2,l+e/2)}for(let i=0;i<r;i++)for(let a=0;a<t;a++){let o=i*(t+1)+a;s.quad(o,o+t+1,o+t+2,o+1)}return s.build()}function Os(n,e,t=16,r=24){let s=new J;for(let i=0;i<=t;i++)for(let a=0;a<=r;a++){let o=a/r*Math.PI*2,l=i/t*Math.PI*2,c=n*Math.cos(o),u=n*Math.sin(o),h=(n+e*Math.cos(l))*Math.cos(o),p=(n+e*Math.cos(l))*Math.sin(o),d=e*Math.sin(l),f=h-c,b=p-u,v=d,g=Math.hypot(f,b,v)||1;s.v(h,p,d,f/g,b/g,v/g,o*n,l*e)}for(let i=1;i<=t;i++)for(let a=1;a<=r;a++){let o=(r+1)*i+a-1,l=(r+1)*(i-1)+a-1,c=(r+1)*(i-1)+a,u=(r+1)*i+a;s.tri(o,l,u),s.tri(l,c,u)}return s.build()}function Fs(n,e,t=16,r=6){let s=[],i=Math.max(e/2-n,0);for(let a=0;a<=r;a++){let o=-Math.PI/2+a/r*(Math.PI/2);s.push([Math.cos(o)*n,-i+Math.sin(o)*n])}for(let a=0;a<=r;a++){let o=a/r*(Math.PI/2);s.push([Math.cos(o)*n,i+Math.sin(o)*n])}return s[0][0]=0,s[s.length-1][0]=0,Br(s,t,80)}function Is(n,e,t=8){let r=new J,s=n.length,i=[0,1,0],a=0;for(let o=0;o<s;o++){let l=n[o],c=n[Math.min(s-1,o+1)],u=n[Math.max(0,o-1)],h=[c[0]-u[0],c[1]-u[1],c[2]-u[2]],p=Math.hypot(h[0],h[1],h[2])||1;h=h.map(g=>g/p);let d=i[0]*h[0]+i[1]*h[1]+i[2]*h[2],f=[i[0]-h[0]*d,i[1]-h[1]*d,i[2]-h[2]*d],b=Math.hypot(f[0],f[1],f[2]);b<1e-5&&(f=Math.abs(h[0])<.9?[1,0,0]:[0,0,1],b=1),f=f.map(g=>g/b);let v=[h[1]*f[2]-h[2]*f[1],h[2]*f[0]-h[0]*f[2],h[0]*f[1]-h[1]*f[0]];i=f,o>0&&(a+=Math.hypot(l[0]-n[o-1][0],l[1]-n[o-1][1],l[2]-n[o-1][2]));for(let g=0;g<=t;g++){let y=g/t*Math.PI*2,w=Math.cos(y),P=Math.sin(y),k=f[0]*w+v[0]*P,A=f[1]*w+v[1]*P,T=f[2]*w+v[2]*P;r.v(l[0]+k*e,l[1]+A*e,l[2]+T*e,k,A,T,g/t*Math.PI*2*e,a)}}for(let o=0;o<s-1;o++)for(let l=0;l<t;l++){let c=o*(t+1)+l;r.quad(c,c+1,c+t+2,c+t+1)}return r.build()}function he(n){let e=0;for(let t=0,r=n.length-1;t<n.length;r=t++)e+=(n[r][0]-n[t][0])*(n[r][1]+n[t][1]);return e/2}function Rr(n){let e=n.length;if(e<3)return[];let t=Array.from({length:e},(o,l)=>l);he(n)<0&&t.reverse();let r=[],s=(o,l,c)=>(l[0]-o[0])*(c[1]-o[1])-(l[1]-o[1])*(c[0]-o[0]),i=(o,l,c,u)=>s(l,c,o)>=0&&s(c,u,o)>=0&&s(u,l,o)>=0,a=0;for(;t.length>3&&a++<1e4;){let o=!1;for(let l=0;l<t.length;l++){let c=t[(l+t.length-1)%t.length],u=t[l],h=t[(l+1)%t.length],p=n[c],d=n[u],f=n[h];if(s(p,d,f)<=1e-12)continue;let b=!0;for(let v of t){if(v===c||v===u||v===h)continue;let g=n[v];if(!(g[0]===p[0]&&g[1]===p[1]||g[0]===d[0]&&g[1]===d[1]||g[0]===f[0]&&g[1]===f[1])&&i(g,p,d,f)){b=!1;break}}if(b){r.push(c,u,h),t.splice(l,1),o=!0;break}}if(!o){for(let l=1;l<t.length-1;l++)r.push(t[0],t[l],t[l+1]);return r}}return t.length===3&&r.push(t[0],t[1],t[2]),r}function _r(n,e){let t=he(n)<0?[...n].reverse():[...n],r=e.map(s=>he(s)>0?[...s].reverse():[...s]).sort((s,i)=>Math.max(...i.map(a=>a[0]))-Math.max(...s.map(a=>a[0])));for(let s of r){let i=0;for(let u=1;u<s.length;u++)s[u][0]>s[i][0]&&(i=u);let a=s[i],o=-1,l=1/0;for(let u=0;u<t.length;u++){let h=t[u];if(h[0]<a[0])continue;let p=Math.hypot(h[0]-a[0],h[1]-a[1]);p<l&&(l=p,o=u)}o<0&&(o=0);let c=[...s.slice(i),...s.slice(0,i+1)];t=[...t.slice(0,o+1),...c,t[o],...t.slice(o+1)]}return t}function bt(n,e){let r=he(n)>0?1:-1;return n.map((s,i)=>{let a=n[(i+n.length-1)%n.length],o=n[(i+1)%n.length],l=[s[0]-a[0],s[1]-a[1]],c=[o[0]-s[0],o[1]-s[1]],u=Math.hypot(l[0],l[1])||1,h=Math.hypot(c[0],c[1])||1,p=[-l[1]/u*r,l[0]/u*r],d=[-c[1]/h*r,c[0]/h*r],f=p[0]+d[0],b=p[1]+d[1],v=Math.hypot(f,b)||1;f/=v,b/=v;let g=Math.max(.35,f*p[0]+b*p[1]);return[s[0]+f*e/g,s[1]+b*e/g]})}function js(n,e,t={}){let r=new J,s=Math.min(t.bevel??0,e*.45),i=s>0?Math.max(1,t.bevelSegments??2):0,a=he(n)>0?n:[...n].reverse(),o=(t.holes??[]).map(b=>he(b)<0?b:[...b].reverse()),l=[a,...o],c=[],u=e/2;if(i>0){for(let b=0;b<=i;b++){let v=b/i*(Math.PI/2);c.push({off:s*(1-Math.sin(v)),z:-u+s*(1-Math.cos(v)),nz:-Math.cos(v),nxy:Math.sin(v)})}for(let b=0;b<=i;b++){let v=b/i*(Math.PI/2);c.push({off:s*(1-Math.cos(v)),z:u-s+s*Math.sin(v),nz:Math.sin(v),nxy:Math.cos(v)})}}else c.push({off:0,z:-u,nz:0,nxy:1},{off:0,z:u,nz:0,nxy:1});for(let b of l){let v=b!==a,g=c.map(w=>w.off>0?bt(b,v?-w.off:w.off):b),y=0;for(let w=0;w<b.length;w++){let P=b[w],k=b[(w+1)%b.length],A=Math.hypot(k[0]-P[0],k[1]-P[1]),T=k[0]-P[0],z=k[1]-P[1],B=Math.hypot(T,z)||1;T/=B,z/=B;let C=z,U=-T,V=r.pos.length/3;for(let E=0;E<c.length;E++){let G=c[E],I=g[E],W=I[w],Y=I[(w+1)%I.length],N=[C*G.nxy,U*G.nxy,G.nz];r.v(W[0],W[1],G.z,N[0],N[1],N[2],y,G.z+u),r.v(Y[0],Y[1],G.z,N[0],N[1],N[2],y+A,G.z+u)}for(let E=0;E<c.length-1;E++){let G=V+E*2;r.quad(G,G+1,G+3,G+2)}y+=A}}let h=i>0?bt(a,s):a,p=o.map(b=>i>0?bt(b,-s):b),d=p.length?_r(h,p):h,f=Rr(d);for(let[b,v]of[[-u,-1],[u,1]]){let g=r.pos.length/3;for(let y of d)r.v(y[0],y[1],b,0,0,v,y[0],y[1]);for(let y=0;y<f.length;y+=3)v>0?r.tri(g+f[y],g+f[y+1],g+f[y+2]):r.tri(g+f[y],g+f[y+2],g+f[y+1])}return r.build()}function Ns(n,e,t,r=24){return Array.from({length:r},(s,i)=>[n+Math.cos(i/r*Math.PI*2)*t,e+Math.sin(i/r*Math.PI*2)*t])}function Hs(n,e,t,r,s,i=4){let a=[],o=[[t-s,e+s,-Math.PI/2],[t-s,r-s,0],[n+s,r-s,Math.PI/2],[n+s,e+s,Math.PI]];for(let[l,c,u]of o)for(let h=0;h<=i;h++){let p=u+h/i*(Math.PI/2);a.push([l+Math.cos(p)*s,c+Math.sin(p)*s])}return a}var jt=48,Ce=24,xt={arrayStride:jt,attributes:[{shaderLocation:0,offset:0,format:"float32x3"},{shaderLocation:1,offset:12,format:"float32x3"},{shaderLocation:2,offset:24,format:"float32x4"},{shaderLocation:3,offset:40,format:"float32x2"}]},Nt={arrayStride:Ce,attributes:[{shaderLocation:4,offset:0,format:"uint16x4"},{shaderLocation:5,offset:8,format:"float32x4"}]},we=class{vertexBuffer;indexBuffer;skinBuffer;indexCount;vertexCount;bounds;skinned;source;label;constructor(e,t,r={}){let s=t,i=s.positions.length/3,a=s.uvs??new Float32Array(i*2),o=s.tangents??vt(s.positions,s.normals,a,s.indices),l=new Float32Array(i*(jt/4));for(let c=0;c<i;c++){let u=c*12;l[u]=s.positions[c*3],l[u+1]=s.positions[c*3+1],l[u+2]=s.positions[c*3+2],l[u+3]=s.normals[c*3],l[u+4]=s.normals[c*3+1],l[u+5]=s.normals[c*3+2],l[u+6]=o[c*4],l[u+7]=o[c*4+1],l[u+8]=o[c*4+2],l[u+9]=o[c*4+3],l[u+10]=a[c*2],l[u+11]=a[c*2+1]}if(this.label=r.label??"mesh",this.vertexBuffer=e.createBuffer(l.byteLength,GPUBufferUsage.VERTEX,`${this.label}.vb`,l),this.indexBuffer=e.createBuffer(s.indices.byteLength,GPUBufferUsage.INDEX,`${this.label}.ib`,s.indices),this.indexCount=s.indices.length,this.vertexCount=i,this.bounds=$.fromPositions(s.positions),this.skinned=!!(s.joints&&s.weights),this.skinned){let c=new ArrayBuffer(i*Ce),u=new Uint16Array(c),h=new Float32Array(c);for(let p=0;p<i;p++){for(let d=0;d<4;d++)u[p*Ce/2+d]=s.joints[p*4+d];for(let d=0;d<4;d++)h[(p*Ce+8)/4+d]=s.weights[p*4+d]}this.skinBuffer=e.createBuffer(c.byteLength,GPUBufferUsage.VERTEX,`${this.label}.skin`,new Uint8Array(c))}else this.skinBuffer=null;this.source=r.keepSource?s:null}destroy(){this.vertexBuffer.destroy(),this.indexBuffer.destroy(),this.skinBuffer?.destroy()}};function Ys(){return $.create()}var Vr=`
@group(0) @binding(0) var src: texture_2d<f32>;
@group(0) @binding(1) var samp: sampler;
struct VO { @builtin(position) pos: vec4f, @location(0) uv: vec2f };
@vertex fn vs(@builtin(vertex_index) i: u32) -> VO {
  let p = vec2f(f32((i << 1u) & 2u), f32(i & 2u));
  var o: VO;
  o.pos = vec4f(p * 2.0 - 1.0, 0.0, 1.0);
  o.uv = vec2f(p.x, 1.0 - p.y);
  return o;
}
@fragment fn fs(i: VO) -> @location(0) vec4f { return textureSampleLevel(src, samp, i.uv, 0.0); }
// normal maps: renormalise the averaged vector so mips keep unit length (and lose detail correctly)
@fragment fn fsNormal(i: VO) -> @location(0) vec4f {
  let c = textureSampleLevel(src, samp, i.uv, 0.0);
  let n = c.xyz * 2.0 - 1.0;
  let l = length(n);
  return vec4f(normalize(n) * 0.5 + 0.5, c.a);
}
`,yt=class{constructor(e){this.dev=e;this.sampler=e.device.createSampler({minFilter:"linear",magFilter:"linear"}),this.module=e.shader(Vr,"mipgen")}pipelines=new Map;sampler;module;pipeline(e,t){let r=`${e}:${t}`,s=this.pipelines.get(r);return s||(s=this.dev.device.createRenderPipeline({layout:"auto",vertex:{module:this.module,entryPoint:"vs"},fragment:{module:this.module,entryPoint:t==="normal"?"fsNormal":"fs",targets:[{format:e}]},primitive:{topology:"triangle-list"}}),this.pipelines.set(r,s)),s}generate(e,t="color",r){let s=r??this.dev.device.createCommandEncoder({label:"mipgen"}),i=this.pipeline(e.format,t),a=e.depthOrArrayLayers;for(let o=0;o<a;o++)for(let l=1;l<e.mipLevelCount;l++){let c=this.dev.device.createBindGroup({layout:i.getBindGroupLayout(0),entries:[{binding:0,resource:e.createView({dimension:"2d",baseMipLevel:l-1,mipLevelCount:1,baseArrayLayer:o,arrayLayerCount:1})},{binding:1,resource:this.sampler}]}),u=s.beginRenderPass({colorAttachments:[{view:e.createView({dimension:"2d",baseMipLevel:l,mipLevelCount:1,baseArrayLayer:o,arrayLayerCount:1}),loadOp:"clear",storeOp:"store",clearValue:[0,0,0,0]}]});u.setPipeline(i),u.setBindGroup(0,c),u.draw(3),u.end()}r||this.dev.device.queue.submit([s.finish()])}},Ee=class{constructor(e){this.dev=e;this.mipgen=new yt(e),this.white=this.solid([255,255,255,255],"rgba8unorm-srgb","white"),this.black=this.solid([0,0,0,255],"rgba8unorm-srgb","black"),this.flatNormal=this.solid([128,128,255,255],"rgba8unorm","flatNormal"),this.defaultOrm=this.solid([255,255,255,255],"rgba8unorm","orm"),this.white3d=e.device.createTexture({size:[1,1,1],dimension:"3d",format:"r16float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),e.device.queue.writeTexture({texture:this.white3d},new Uint16Array([15360]),{bytesPerRow:2},[1,1,1])}mipgen;white;black;flatNormal;defaultOrm;white3d;samplers=new Map;solid(e,t,r){let s=this.dev.device.createTexture({size:[1,1],format:t,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:r});return this.dev.device.queue.writeTexture({texture:s},new Uint8Array(e),{bytesPerRow:4},[1,1]),s}fromImage(e,t={}){let r=t.srgb?"rgba8unorm-srgb":"rgba8unorm",s=t.mips!==!1?Q(e.width,e.height):1,i=this.dev.device.createTexture({size:[e.width,e.height],format:r,mipLevelCount:s,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT,label:t.label});return this.dev.device.queue.copyExternalImageToTexture({source:e},{texture:i},[e.width,e.height]),s>1&&this.mipgen.generate(i,t.normalMap?"normal":"color"),i}fromRGBA8(e,t,r,s={}){let i=s.srgb?"rgba8unorm-srgb":"rgba8unorm",a=s.mips!==!1?Q(t,r):1,o=this.dev.device.createTexture({size:[t,r],format:i,mipLevelCount:a,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT,label:s.label});return this.dev.device.queue.writeTexture({texture:o},e,{bytesPerRow:t*4},[t,r]),a>1&&this.mipgen.generate(o,s.normalMap?"normal":"color"),o}async fromURL(e,t={}){let r=await(await fetch(e)).blob(),s=await createImageBitmap(r,{colorSpaceConversion:"none",premultiplyAlpha:"none"});return this.fromImage(s,{label:e,...t})}sampler(e={}){let t=e.address??"repeat",r=e.addressV??t,s=e.filter??"linear",i=e.anisotropy??16,a=`${t}|${r}|${s}|${i}`,o=this.samplers.get(a);return o||(o=this.dev.device.createSampler({addressModeU:t,addressModeV:r,addressModeW:t,magFilter:s,minFilter:s,mipmapFilter:s,maxAnisotropy:s==="linear"?i:1}),this.samplers.set(a,o)),o}};var Ht=96,Me={ALPHA_MASK:1,UNLIT:2,WORLD_UV:4,FOLIAGE:8,WIND:16},Cr=0,De=class{id=++Cr;name;baseColor;emissive;emissiveLuminance;metallic;roughness;normalScale;occlusionStrength;specular;edgeWear;edgeWearRadius;uvScale;uvOffset;uvRotation;alphaMode;alphaCutoff;doubleSided;unlit;worldUV;foliage;wind;baseColorMap;normalMap;ormMap;emissiveMap;sampler;buffer=null;bindGroup=null;dirtyUniform=!0;dirtyBinding=!0;constructor(e={}){this.name=e.name??`material${this.id}`,this.baseColor=e.baseColor??[.8,.8,.8,1],this.emissive=e.emissive??[0,0,0],this.emissiveLuminance=e.emissiveLuminance??0,this.metallic=e.metallic??0,this.roughness=e.roughness??.6,this.normalScale=e.normalScale??1,this.occlusionStrength=e.occlusionStrength??1,this.specular=e.specular??.5,this.edgeWear=e.edgeWear??0,this.edgeWearRadius=e.edgeWearRadius??.003,this.uvScale=e.uvScale??[1,1],this.uvOffset=e.uvOffset??[0,0],this.uvRotation=e.uvRotation??0,this.alphaMode=e.alphaMode??"opaque",this.alphaCutoff=e.alphaCutoff??.5,this.doubleSided=e.doubleSided??!1,this.unlit=e.unlit??!1,this.worldUV=e.worldUV??!1,this.foliage=e.foliage??!1,this.wind=e.wind??!1,this.baseColorMap=e.baseColorMap??null,this.normalMap=e.normalMap??null,this.ormMap=e.ormMap??null,this.emissiveMap=e.emissiveMap??null,this.sampler=e.sampler??null}markDirty(){this.dirtyUniform=!0}markBindingsDirty(){this.dirtyBinding=!0,this.dirtyUniform=!0}get flags(){let e=0;return this.alphaMode==="mask"&&(e|=Me.ALPHA_MASK),this.unlit&&(e|=Me.UNLIT),this.worldUV&&(e|=Me.WORLD_UV),this.foliage&&(e|=Me.FOLIAGE),this.wind&&(e|=Me.WIND),e}get variantKey(){return`${this.alphaMode}|${this.doubleSided?2:1}`}getBindGroup(e,t,r){if(this.buffer||(this.buffer=e.createBuffer(Ht,GPUBufferUsage.UNIFORM,`${this.name}.ub`)),this.dirtyUniform){let s=new Float32Array(Ht/4);s.set(this.baseColor,0),s.set(this.emissive,4),s[7]=this.emissiveLuminance,s[8]=this.metallic,s[9]=this.roughness,s[10]=this.normalScale,s[11]=this.occlusionStrength,s[12]=this.uvScale[0],s[13]=this.uvScale[1],s[14]=this.uvOffset[0],s[15]=this.uvOffset[1],s[16]=this.alphaCutoff,s[17]=this.specular,s[18]=this.uvRotation,s[19]=this.flags,s[20]=this.edgeWear,s[21]=this.edgeWearRadius,e.device.queue.writeBuffer(this.buffer,0,s),this.dirtyUniform=!1}return(this.dirtyBinding||!this.bindGroup)&&(this.bindGroup=e.device.createBindGroup({layout:r,label:this.name,entries:[{binding:0,resource:{buffer:this.buffer}},{binding:1,resource:this.sampler??t.sampler()},{binding:2,resource:(this.baseColorMap??t.white).createView()},{binding:3,resource:(this.normalMap??t.flatNormal).createView()},{binding:4,resource:(this.ormMap??t.defaultOrm).createView()},{binding:5,resource:(this.emissiveMap??t.white).createView()}]}),this.dirtyBinding=!1),this.bindGroup}},wt=`
struct MaterialU {
  baseColor: vec4f,
  emissive: vec4f,      // rgb, w = luminance (cd/m^2)
  pbr: vec4f,           // metallic, roughness, normal scale, occlusion strength
  uvTransform: vec4f,   // scale.xy, offset.xy
  params: vec4f,        // alpha cutoff, specular, uv rotation, flags (bits)
  wear: vec4f,          // edge wear amount, full-wear edge radius (m), unused, unused
};
@group(2) @binding(0) var<uniform> material: MaterialU;
@group(2) @binding(1) var matSampler: sampler;
@group(2) @binding(2) var baseColorTex: texture_2d<f32>;
@group(2) @binding(3) var normalTex: texture_2d<f32>;
@group(2) @binding(4) var ormTex: texture_2d<f32>;
@group(2) @binding(5) var emissiveTex: texture_2d<f32>;

fn materialFlags() -> u32 { return u32(material.params.w + 0.5); }
fn materialUV(uv: vec2f, worldPos: vec3f) -> vec2f {
  var base = uv;
  if ((materialFlags() & 4u) != 0u) { base = vec2f(worldPos.x, -worldPos.z); }
  let r = material.params.z;
  let c = cos(r);
  let s = sin(r);
  let ruv = vec2f(base.x * c - base.y * s, base.x * s + base.y * c);
  return ruv * material.uvTransform.xy + material.uvTransform.zw;
}
`;var Er={concrete:0,wood:1,anodized:2,parkerized:3,polymer:4,paintedSteel:5,ground:6,gravel:7,brass:8,paperTarget:9,rubber:10,webbing:11,cardboard:12,bareSteel:13,grass:14,nitride:15,machined:16,skin:17,glove:18},Dr=`
struct Params {
  kind: u32, seed: u32, size: u32, pad0: u32,
  color: vec4f,     // rgb, w = wear
  color2: vec4f,    // rgb, w = dirt
  misc: vec4f,      // tileMeters, roughness override, bumpMm, extra
};
@group(0) @binding(0) var<uniform> P: Params;
@group(0) @binding(1) var outAlbedo: texture_storage_2d<rgba8unorm, write>;
@group(0) @binding(2) var outNormal: texture_storage_2d<rgba8unorm, write>;
@group(0) @binding(3) var outOrm: texture_storage_2d<rgba8unorm, write>;

fn pcg(v: u32) -> u32 {
  let s = v * 747796405u + 2891336453u;
  let w = ((s >> ((s >> 28u) + 4u)) ^ s) * 277803737u;
  return (w >> 22u) ^ w;
}
fn wrapi(i: vec2i, period: vec2i) -> vec2u { return vec2u(((i % period) + period) % period); }
fn h2(i: vec2i, period: vec2i, seed: u32) -> f32 {
  let w = wrapi(i, period);
  return f32(pcg(w.x + pcg(w.y + pcg(seed)))) / 4294967295.0;
}
fn grad(i: vec2i, period: vec2i, seed: u32) -> vec2f {
  let a = h2(i, period, seed) * 6.2831853;
  return vec2f(cos(a), sin(a));
}
/// Tileable gradient noise in ~[-1, 1]. p in lattice units, period = lattice cells per tile.
fn gnoise(p: vec2f, period: vec2i, seed: u32) -> f32 {
  let i = vec2i(floor(p));
  let f = fract(p);
  let u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  let a = dot(grad(i, period, seed), f);
  let b = dot(grad(i + vec2i(1, 0), period, seed), f - vec2f(1.0, 0.0));
  let c = dot(grad(i + vec2i(0, 1), period, seed), f - vec2f(0.0, 1.0));
  let d = dot(grad(i + vec2i(1, 1), period, seed), f - vec2f(1.0, 1.0));
  return 1.41 * mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
fn fbm(uv: vec2f, freq: i32, octaves: i32, seed: u32) -> f32 {
  var sum = 0.0; var amp = 0.5; var f = freq; var norm = 0.0;
  for (var o = 0; o < octaves; o++) {
    sum += amp * gnoise(uv * f32(f), vec2i(f), seed + u32(o) * 101u);
    norm += amp; amp *= 0.5; f *= 2;
  }
  return sum / norm;
}
fn ridged(uv: vec2f, freq: i32, octaves: i32, seed: u32) -> f32 {
  var sum = 0.0; var amp = 0.5; var f = freq; var norm = 0.0;
  for (var o = 0; o < octaves; o++) {
    let n = 1.0 - abs(gnoise(uv * f32(f), vec2i(f), seed + u32(o) * 131u));
    sum += amp * n * n; norm += amp; amp *= 0.5; f *= 2;
  }
  return sum / norm;
}
/// Tileable Worley: returns (F1, F2, cell hash, unused).
fn worley(uv: vec2f, freq: i32, seed: u32) -> vec4f {
  let p = uv * f32(freq);
  let i = vec2i(floor(p));
  let f = fract(p);
  var f1 = 9.0; var f2 = 9.0; var id = 0.0;
  for (var y = -1; y <= 1; y++) {
    for (var x = -1; x <= 1; x++) {
      let c = i + vec2i(x, y);
      let jitter = vec2f(h2(c, vec2i(freq), seed), h2(c, vec2i(freq), seed + 7u));
      let d = length(vec2f(f32(x), f32(y)) + jitter - f);
      if (d < f1) { f2 = f1; f1 = d; id = h2(c, vec2i(freq), seed + 13u); } else if (d < f2) { f2 = d; }
    }
  }
  return vec4f(f1, f2, id, 0.0);
}
fn lin(c: vec3f) -> vec3f { return c; }
fn srgbEncode(c: vec3f) -> vec3f {
  let lo = c * 12.92;
  let hi = 1.055 * pow(max(c, vec3f(0.0)), vec3f(1.0 / 2.4)) - 0.055;
  return select(hi, lo, c <= vec3f(0.0031308));
}

struct S { albedo: vec3f, height: f32, rough: f32, metal: f32, ao: f32 };

fn scratches(uv: vec2f, seed: u32, density: f32) -> f32 {
  // thin anisotropic scratches: stretched noise ridges at a few orientations
  var s = 0.0;
  for (var k = 0u; k < 3u; k++) {
    let a = h2(vec2i(i32(k), 3), vec2i(97), seed) * 3.14159;
    let dir = vec2f(cos(a), sin(a));
    let q = vec2f(dot(uv, dir), dot(uv, vec2f(-dir.y, dir.x)));
    let n = gnoise(vec2f(q.x * 2.0, q.y * 220.0), vec2i(512), seed + k * 17u);
    let mask = smoothstep(0.55, 0.9, gnoise(uv * 6.0, vec2i(6), seed + 99u + k) * 0.5 + 0.5);
    s = max(s, smoothstep(0.88, 0.98, 1.0 - abs(n)) * mask);
  }
  return s * density;
}

fn recipe(uv: vec2f) -> S {
  var s: S;
  s.ao = 1.0; s.metal = 0.0; s.height = 0.5;
  let seed = P.seed;
  let wear = P.color.w;
  let dirt = P.color2.w;
  let extra = P.misc.w;
  switch (P.kind) {
    case 0u: { // concrete (broom-finished slab with aggregate, pores, stains)
      let mott = fbm(uv, 4, 6, seed);
      let fine = fbm(uv, 64, 3, seed + 5u);
      let agg = worley(uv, 48, seed + 11u);
      let pores = smoothstep(0.08, 0.02, worley(uv, 160, seed + 23u).x);
      let broom = gnoise(vec2f(uv.x * 900.0, uv.y * 6.0), vec2i(900, 6), seed + 31u);
      let stain = smoothstep(0.1, 0.6, fbm(uv, 3, 5, seed + 41u)) * dirt;
      var c = P.color.rgb * (0.88 + 0.18 * mott + 0.06 * fine);
      c = mix(c, c * vec3f(0.95, 0.93, 0.9) * (0.75 + 0.5 * agg.z), smoothstep(0.35, 0.1, agg.x) * 0.5);
      c *= 1.0 - 0.35 * pores;
      c = mix(c, c * vec3f(0.62, 0.6, 0.57), stain);
      s.albedo = c;
      s.height = 0.5 + 0.18 * fine + 0.12 * broom * (1.0 - extra) - 0.5 * pores + 0.1 * smoothstep(0.3, 0.0, agg.x);
      s.rough = 0.82 + 0.1 * fine - 0.12 * stain;
      s.ao = 1.0 - 0.5 * pores;
    }
    case 1u: { // wood (sawn lumber / plywood, grain along U)
      let warp = fbm(uv, 3, 4, seed) * 0.35;
      let rings = fract((uv.y + warp + 0.04 * gnoise(vec2f(uv.x * 8.0, uv.y * 2.0), vec2i(8, 2), seed + 3u)) * 38.0);
      let ring = smoothstep(0.0, 0.18, rings) * smoothstep(1.0, 0.55, rings);
      let fibre = gnoise(vec2f(uv.x * 14.0, uv.y * 700.0), vec2i(14, 700), seed + 7u);
      let knotW = worley(uv, 3, seed + 13u);
      let knot = smoothstep(0.12, 0.0, knotW.x) * step(0.65, knotW.z);
      let weather = smoothstep(0.2, 0.8, fbm(uv, 5, 5, seed + 19u) * 0.5 + 0.5) * wear;
      var c = mix(P.color2.rgb, P.color.rgb, ring * 0.7 + 0.15 * fibre + 0.15);
      c = mix(c, P.color2.rgb * 0.45, knot);
      c = mix(c, vec3f(0.36, 0.35, 0.33) * (0.8 + 0.3 * fibre), weather);
      s.albedo = c;
      s.height = 0.5 + 0.25 * ring + 0.2 * fibre * (0.4 + weather) - 0.3 * knot;
      s.rough = 0.62 + 0.15 * fibre + 0.15 * weather;
    }
    case 2u: { // black anodised aluminium (receiver): dielectric dye layer, scratches reveal bright metal
      let fine = fbm(uv, 128, 3, seed);
      let blotch = fbm(uv, 6, 4, seed + 3u);
      let sc = scratches(uv, seed + 9u, wear * 1.6);
      let edgeWear = smoothstep(0.55, 0.75, fbm(uv, 12, 5, seed + 21u) * 0.5 + 0.5) * wear * 0.6;
      let bare = saturate(max(sc, edgeWear));
      s.albedo = mix(P.color.rgb * (0.9 + 0.12 * blotch + 0.05 * fine), vec3f(0.91, 0.92, 0.92), bare);
      s.metal = bare;
      s.rough = mix(select(P.misc.y, 0.42, P.misc.y < 0.0) + 0.05 * fine + 0.04 * blotch, 0.28, bare);
      s.height = 0.5 + 0.08 * fine - 0.25 * sc;
    }
    case 3u: { // parkerized steel (manganese phosphate): crystalline dark grey, polished wear spots
      let cryst = worley(uv, 220, seed);
      let fine = fbm(uv, 64, 4, seed + 4u);
      let wearN = smoothstep(0.6, 0.8, fbm(uv, 8, 5, seed + 8u) * 0.5 + 0.5) * wear;
      let sc = scratches(uv, seed + 12u, wear);
      let bare = saturate(wearN + sc);
      s.albedo = mix(P.color.rgb * (0.85 + 0.25 * cryst.z + 0.1 * fine), vec3f(0.56, 0.57, 0.58), bare);
      s.metal = mix(0.25, 1.0, bare);
      s.rough = mix(0.68 + 0.12 * cryst.z, 0.3, bare);
      s.height = 0.5 + 0.2 * (1.0 - cryst.x) + 0.05 * fine - 0.15 * sc;
    }
    case 4u: { // polymer (grip / stock / magazine) with optional stipple (extra = stipple amount)
      let fine = fbm(uv, 96, 3, seed);
      let stip = worley(uv, 180, seed + 5u);
      let stipple = smoothstep(0.55, 0.15, stip.x) * extra;
      let molded = fbm(uv, 16, 4, seed + 9u);
      let grime = smoothstep(0.3, 0.8, fbm(uv, 6, 5, seed + 15u) * 0.5 + 0.5) * dirt;
      s.albedo = mix(P.color.rgb * (0.95 + 0.06 * molded + 0.04 * fine), P.color.rgb * 0.7 + vec3f(0.02, 0.018, 0.012), grime);
      s.rough = select(P.misc.y, 0.6, P.misc.y < 0.0) + 0.08 * fine + 0.15 * stipple - 0.1 * (1.0 - extra) * molded;
      s.height = 0.5 + 0.06 * fine + 0.35 * stipple;
    }
    case 5u: { // painted steel (AR500 targets, frames): paint over dark steel, chips + rust
      let fine = fbm(uv, 64, 3, seed);
      let orange = fbm(uv, 24, 4, seed + 2u);
      let chips = smoothstep(0.62, 0.7, fbm(uv, 10, 6, seed + 6u) * 0.5 + 0.5) * wear;
      let rustN = fbm(uv, 20, 5, seed + 10u);
      let rust = saturate(chips * smoothstep(0.0, 0.6, rustN + 0.3));
      let steel = vec3f(0.08, 0.085, 0.09) * (0.8 + 0.4 * fine);
      let rustC = mix(vec3f(0.18, 0.06, 0.02), vec3f(0.35, 0.13, 0.04), rustN * 0.5 + 0.5);
      var c = P.color.rgb * (0.94 + 0.05 * orange + 0.03 * fine);
      c = mix(c, mix(steel, rustC, rust), chips);
      s.albedo = c;
      s.metal = chips * (1.0 - rust) * 0.9;
      s.rough = mix(0.45 + 0.08 * orange, mix(0.45, 0.85, rust), chips);
      s.height = 0.5 + 0.04 * orange + 0.03 * fine - 0.25 * chips;
    }
    case 6u: { // ground: packed dirt with pebbles and dry grass patches
      let base = fbm(uv, 4, 6, seed);
      let fine = fbm(uv, 48, 4, seed + 3u);
      let peb = worley(uv, 90, seed + 7u);
      let pebble = smoothstep(0.35, 0.18, peb.x) * step(0.55, peb.z);
      let grassMask = smoothstep(-0.05, 0.35, fbm(uv, 6, 5, seed + 11u) + extra);
      let blades = smoothstep(0.55, 0.95, abs(gnoise(vec2f(uv.x * 400.0, uv.y * 60.0), vec2i(400, 60), seed + 13u)));
      var dirtC = P.color.rgb * (0.82 + 0.25 * base + 0.12 * fine);
      dirtC = mix(dirtC, vec3f(0.25, 0.23, 0.2) * (0.7 + 0.6 * peb.z), pebble);
      let grassC = P.color2.rgb * (0.7 + 0.5 * blades + 0.2 * base);
      s.albedo = mix(dirtC, grassC, grassMask * (0.55 + 0.45 * blades));
      s.height = 0.5 + 0.15 * fine + 0.3 * pebble + 0.15 * grassMask * blades;
      s.rough = 0.9 - 0.15 * pebble;
      s.ao = 1.0 - 0.35 * grassMask * (1.0 - blades);
    }
    case 7u: { // gravel
      let w = worley(uv, 36, seed);
      let w2 = worley(uv, 90, seed + 3u);
      let edge = smoothstep(0.0, 0.12, w.y - w.x);
      let stone = mix(P.color.rgb, P.color2.rgb, w.z) * (0.75 + 0.5 * w2.z);
      let gap = 1.0 - edge;
      s.albedo = mix(stone * (0.9 + 0.2 * fbm(uv, 64, 3, seed + 5u)), vec3f(0.12, 0.1, 0.08), gap * 0.8);
      s.height = 0.5 + 0.45 * (1.0 - w.x) * edge - 0.3 * gap;
      s.rough = 0.8 - 0.15 * w2.z;
      s.ao = 1.0 - 0.6 * gap;
    }
    case 8u: { // brass (cartridge cases): yellow metal, tarnish
      let fine = fbm(uv, 48, 4, seed);
      let tarn = smoothstep(0.2, 0.8, fbm(uv, 6, 5, seed + 3u) * 0.5 + 0.5) * wear;
      s.albedo = mix(vec3f(0.95, 0.73, 0.38), vec3f(0.6, 0.45, 0.25), tarn) * (0.95 + 0.05 * fine);
      s.metal = 1.0;
      s.rough = 0.22 + 0.25 * tarn + 0.04 * fine;
      s.height = 0.5 + 0.03 * fine;
    }
    case 9u: { // paper target face: printed bullseye on paper (uv centred), fibres
      let fib = fbm(uv, 128, 3, seed);
      let d = length(uv - 0.5) * 2.0;           // 0 centre .. 1 edge
      let rings = fract(d * 5.0);
      let ringLine = smoothstep(0.035, 0.0, abs(rings - 0.0)) + smoothstep(0.035, 0.0, abs(rings - 1.0));
      let black = step(d, 0.6);
      let bull = step(d, 0.1);
      var c = vec3f(0.86, 0.85, 0.8) * (0.97 + 0.04 * fib);
      c = mix(c, vec3f(0.035, 0.035, 0.04), black);
      c = mix(c, select(vec3f(0.035), vec3f(0.86, 0.85, 0.8), black > 0.5), saturate(ringLine) * step(d, 0.95));
      c = mix(c, P.color.rgb, bull);
      s.albedo = c;
      s.rough = 0.88 - 0.25 * black;
      s.height = 0.5 + 0.08 * fib;
    }
    case 10u: { // rubber (buttpad)
      let fine = fbm(uv, 96, 3, seed);
      let ribs = 0.5 + 0.5 * sin(uv.y * 6.2831853 * 60.0);
      s.albedo = P.color.rgb * (0.9 + 0.1 * fine);
      s.rough = 0.78 + 0.08 * fine;
      s.height = 0.5 + 0.35 * smoothstep(0.3, 0.7, ribs) * extra + 0.05 * fine;
    }
    case 11u: { // nylon webbing (sling): basket weave
      let warp = 0.5 + 0.5 * sin(uv.x * 6.2831853 * 240.0);
      let weft = 0.5 + 0.5 * sin(uv.y * 6.2831853 * 120.0);
      let over = step(0.5, fract(floor(uv.x * 240.0) * 0.5 + floor(uv.y * 120.0) * 0.5));
      let thread = mix(warp, weft, over);
      let fuzz = fbm(uv, 64, 3, seed);
      s.albedo = P.color.rgb * (0.75 + 0.35 * thread + 0.05 * fuzz);
      s.rough = 0.72 + 0.1 * fuzz;
      s.height = 0.3 + 0.6 * thread;
      s.ao = 0.75 + 0.25 * thread;
    }
    case 12u: { // cardboard (target backers)
      let fib = fbm(uv, 96, 4, seed);
      let flute = 0.5 + 0.5 * sin(uv.x * 6.2831853 * 120.0);
      let stain = smoothstep(0.3, 0.8, fbm(uv, 4, 5, seed + 3u) * 0.5 + 0.5) * dirt;
      s.albedo = mix(P.color.rgb * (0.9 + 0.12 * fib), P.color.rgb * 0.6, stain);
      s.rough = 0.92;
      s.height = 0.5 + 0.06 * flute + 0.05 * fib;
    }
    case 13u: { // bare / mill-scale steel with rust bloom (target stands, chains)
      let fine = fbm(uv, 64, 4, seed);
      let scale = fbm(uv, 12, 5, seed + 3u);
      let rust = smoothstep(0.45, 0.75, fbm(uv, 8, 6, seed + 9u) * 0.5 + 0.5 + wear * 0.3);
      let mill = vec3f(0.12, 0.125, 0.135) * (0.85 + 0.3 * scale);
      let rustC = mix(vec3f(0.2, 0.07, 0.025), vec3f(0.42, 0.18, 0.06), fine * 0.5 + 0.5);
      s.albedo = mix(mill, rustC, rust);
      s.metal = mix(0.85, 0.05, rust);
      s.rough = mix(0.5 + 0.1 * scale, 0.9, rust);
      s.height = 0.5 + 0.06 * fine + 0.2 * rust * fine;
    }
    case 15u: { // black nitride (QPQ) steel: smooth semi-gloss black, holster swirl, micro-scratches to bright steel
      let fine = fbm(uv, 160, 3, seed);
      let blotch = fbm(uv, 5, 4, seed + 3u);
      let swirl = abs(gnoise(vec2f(uv.x * 9.0, uv.y * 420.0), vec2i(9, 420), seed + 7u));
      let sc = scratches(uv, seed + 11u, wear * 1.4);
      let haze = smoothstep(0.5, 0.8, fbm(uv, 10, 4, seed + 19u) * 0.5 + 0.5) * wear * 0.35;
      let bare = saturate(sc * 0.9);
      s.albedo = mix(P.color.rgb * (0.9 + 0.2 * blotch + 0.06 * fine) + vec3f(0.012) * haze, vec3f(0.6, 0.6, 0.62), bare);
      s.metal = mix(0.85, 1.0, bare);
      s.rough = mix(select(P.misc.y, 0.34, P.misc.y < 0.0) + 0.06 * fine + 0.05 * blotch + 0.08 * swirl * haze + 0.1 * haze, 0.3, bare);
      s.height = 0.5 + 0.05 * fine - 0.3 * sc;
    }
    case 16u: { // machined stainless / bright steel: turning marks (along U), fine grain, light tarnish
      let turn = abs(gnoise(vec2f(uv.x * 4.0, uv.y * 900.0), vec2i(4, 900), seed));
      let turn2 = 0.5 + 0.5 * sin(uv.y * 6.2831853 * 420.0 + 2.0 * gnoise(uv * 3.0, vec2i(3), seed + 2u));
      let fine = fbm(uv, 128, 3, seed + 5u);
      let tarn = smoothstep(0.45, 0.85, fbm(uv, 6, 5, seed + 9u) * 0.5 + 0.5) * wear;
      let sc = scratches(uv, seed + 13u, 0.6);
      s.albedo = mix(P.color.rgb * (0.92 + 0.1 * fine + 0.05 * turn), P.color.rgb * vec3f(0.78, 0.76, 0.72), tarn);
      s.metal = 1.0;
      s.rough = select(P.misc.y, 0.32, P.misc.y < 0.0) + 0.18 * turn * extra + 0.05 * fine + 0.2 * tarn - 0.08 * sc;
      s.height = 0.5 + 0.12 * turn2 * extra + 0.04 * fine - 0.2 * sc;
    }
    case 18u: { // tactical glove: stretch knit (extra 0) or synthetic suede palm / leather trim (extra 1), worn
      let fuzz = fbm(uv, 48, 3, seed);
      if (extra < 0.5) {
        // knit: fine diagonal rib (\u22480.6 mm courses), slight sheen on the ridges, dust in the valleys
        let course = 0.5 + 0.5 * sin((uv.x * 0.7 + uv.y) * 6.2831853 * 42.0);
        let wale = 0.5 + 0.5 * sin((uv.x - uv.y * 0.3) * 6.2831853 * 110.0);
        let knit = course * (0.6 + 0.4 * wale);
        let wearN = smoothstep(0.55, 0.9, fbm(uv, 5, 4, seed + 7u) * 0.5 + 0.5) * wear;
        s.albedo = mix(P.color.rgb * (0.78 + 0.3 * knit + 0.06 * fuzz), P.color.rgb * 1.6 + vec3f(0.03), wearN * 0.6);
        s.rough = 0.78 - 0.1 * knit + 0.08 * fuzz;
        s.height = 0.35 + 0.5 * knit;
        s.ao = 0.8 + 0.2 * knit;
      } else {
        // synthetic suede / leather: pebbled grain, darker creases, polished where it rubs the gun
        let grain = worley(uv, 140, seed + 3u);
        let crease = smoothstep(0.75, 0.95, fbm(uv, 10, 4, seed + 11u) * 0.5 + 0.5);
        let polish = smoothstep(0.5, 0.85, fbm(uv, 4, 4, seed + 19u) * 0.5 + 0.5) * wear;
        var c = P.color.rgb * (0.85 + 0.25 * grain.x + 0.05 * fuzz);
        c = mix(c, c * 0.6, crease);
        s.albedo = mix(c, c * 1.25, polish);
        s.rough = mix(0.68 + 0.15 * grain.x, 0.42, polish);
        s.height = 0.5 + 0.25 * (1.0 - grain.x) - 0.2 * crease;
        s.ao = 1.0 - 0.3 * crease;
      }
    }
    case 17u: { // human skin (bare hands / forearm); extra = 1 \u2192 fingernail plate
      let tone = P.color.rgb;
      if (extra > 0.5) {
        // nail: keratin plate over the pink nail bed, fine longitudinal ridges, semi-gloss
        let ridges = gnoise(vec2f(uv.x * 140.0, uv.y * 5.0), vec2i(140, 5), seed + 3u);
        let fine = fbm(uv, 40, 3, seed + 7u);
        let bed = fbm(uv, 3, 3, seed + 11u);
        s.albedo = mix(tone * vec3f(1.08, 0.88, 0.86), vec3f(0.78, 0.62, 0.58), 0.35 + 0.15 * bed) * (0.96 + 0.06 * fine);
        s.rough = 0.26 + 0.05 * fine + 0.03 * abs(ridges);
        s.height = 0.5 + 0.04 * ridges + 0.01 * fine;
      } else {
        // pigment / blood mottling at three scales (blotches, mid-scale warm/cool patches, fine)
        let blotch = fbm(uv, 3, 4, seed);
        let mott = fbm(uv, 9, 3, seed + 11u);
        let fine = fbm(uv, 90, 3, seed + 29u);
        // micro-relief: polygonal skin cells separated by furrows (Worley ridges at two scales), pores
        let cw = worley(uv, 70, seed + 5u);
        let cw2 = worley(uv, 180, seed + 37u);
        let cells = smoothstep(0.0, 0.16, cw.y - cw.x);
        let cells2 = smoothstep(0.0, 0.2, cw2.y - cw2.x);
        // a few faint primary lines crossing the cell network (irregular, not a grid)
        let crease = 1.0 - abs(gnoise(vec2f(uv.x * 9.0 + 0.3 * mott, uv.y * 120.0), vec2i(9, 120), seed + 17u));
        let furrows = smoothstep(0.9, 0.99, crease) * 0.35;
        let pores = smoothstep(0.08, 0.0, worley(uv, 260, seed + 23u).x);
        // colour: redder where blood is close to the surface, yellower / greyer elsewhere, darker in furrows
        var alb = tone * (1.0 + 0.12 * blotch) + vec3f(0.08, -0.01, -0.03) * blotch + vec3f(0.035, 0.02, -0.02) * mott;
        alb *= 1.0 - 0.06 * (1.0 - cells) - 0.04 * (1.0 - cells2) - 0.08 * furrows - 0.2 * pores + 0.04 * fine;
        // sparse small freckles
        let spots = smoothstep(0.7, 0.76, fbm(uv, 60, 2, seed + 31u) * 0.5 + 0.5);
        alb = mix(alb, tone * 0.7, spots * 0.35);
        s.albedo = alb;
        s.rough = 0.5 + 0.1 * (1.0 - cells) + 0.12 * pores + 0.05 * fine - 0.06 * blotch;
        s.height = 0.5 + 0.09 * cells + 0.05 * cells2 - 0.16 * pores - 0.08 * furrows + 0.03 * fine;
        s.ao = 1.0 - 0.25 * pores - 0.1 * (1.0 - cells);
      }
    }
    default: { // 14 grass (top-down meadow)
      let clump = fbm(uv, 8, 5, seed);
      let blades = abs(gnoise(vec2f(uv.x * 500.0, uv.y * 80.0), vec2i(500, 80), seed + 3u));
      let blades2 = abs(gnoise(vec2f(uv.x * 90.0, uv.y * 520.0), vec2i(90, 520), seed + 5u));
      let b = max(smoothstep(0.6, 1.0, blades), smoothstep(0.6, 1.0, blades2));
      let dry = smoothstep(0.0, 0.6, fbm(uv, 4, 5, seed + 9u) + extra);
      let col = mix(P.color.rgb, P.color2.rgb, dry) * (0.55 + 0.6 * b + 0.15 * clump);
      s.albedo = col;
      s.height = 0.35 + 0.6 * b;
      s.rough = 0.82 - 0.1 * b;
      s.ao = 0.55 + 0.45 * b;
    }
  }
  s.albedo = clamp(s.albedo, vec3f(0.01), vec3f(0.95));
  if (P.misc.y >= 0.0 && P.kind != 2u && P.kind != 4u) { s.rough = mix(s.rough, P.misc.y, 0.75); }
  s.rough = clamp(s.rough, 0.04, 1.0);
  return s;
}

fn saturate(x: f32) -> f32 { return clamp(x, 0.0, 1.0); }

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let size = P.size;
  if (id.x >= size || id.y >= size) { return; }
  let texel = 1.0 / f32(size);
  let uv = (vec2f(id.xy) + 0.5) * texel;
  let s = recipe(uv);
  let sx = recipe(fract(uv + vec2f(texel, 0.0)));
  let sy = recipe(fract(uv + vec2f(0.0, texel)));
  // height units: 1.0 of 'height' == bumpMm millimetres; texel spacing in metres
  let hScale = P.misc.z * 0.001;
  let dx = (sx.height - s.height) * hScale / (texel * P.misc.x);
  let dy = (sy.height - s.height) * hScale / (texel * P.misc.x);
  // +V in texture space points down the image; glTF normal maps are +Y up (OpenGL convention)
  let n = normalize(vec3f(-dx, dy, 1.0));
  textureStore(outAlbedo, vec2i(id.xy), vec4f(srgbEncode(s.albedo), 1.0));
  textureStore(outNormal, vec2i(id.xy), vec4f(n * 0.5 + 0.5, 1.0));
  textureStore(outOrm, vec2i(id.xy), vec4f(s.ao, s.rough, s.metal, 1.0));
}
`,Or={concrete:{tileMeters:2,color:[.42,.41,.39],color2:[0,0,0],wear:.3,dirt:.5,roughness:-1,bumpMm:1.2,extra:0},wood:{tileMeters:1,color:[.52,.34,.18],color2:[.32,.19,.09],wear:.4,dirt:.2,roughness:-1,bumpMm:.6,extra:0},anodized:{tileMeters:.25,color:[.035,.036,.038],color2:[0,0,0],wear:.25,dirt:0,roughness:.42,bumpMm:.02,extra:0},parkerized:{tileMeters:.25,color:[.055,.058,.056],color2:[0,0,0],wear:.2,dirt:0,roughness:-1,bumpMm:.03,extra:0},polymer:{tileMeters:.2,color:[.03,.03,.032],color2:[0,0,0],wear:0,dirt:.2,roughness:.62,bumpMm:.15,extra:0},paintedSteel:{tileMeters:.5,color:[.8,.8,.78],color2:[0,0,0],wear:.35,dirt:0,roughness:-1,bumpMm:.3,extra:0},ground:{tileMeters:4,color:[.24,.18,.12],color2:[.09,.11,.04],wear:0,dirt:0,roughness:-1,bumpMm:8,extra:0},gravel:{tileMeters:1.5,color:[.5,.48,.45],color2:[.32,.3,.28],wear:0,dirt:0,roughness:-1,bumpMm:12,extra:0},brass:{tileMeters:.05,color:[.95,.73,.38],color2:[0,0,0],wear:.2,dirt:0,roughness:-1,bumpMm:.01,extra:0},paperTarget:{tileMeters:.45,color:[.75,.05,.03],color2:[0,0,0],wear:0,dirt:0,roughness:-1,bumpMm:.05,extra:0},rubber:{tileMeters:.1,color:[.025,.025,.025],color2:[0,0,0],wear:0,dirt:0,roughness:-1,bumpMm:.4,extra:1},webbing:{tileMeters:.05,color:[.12,.13,.1],color2:[0,0,0],wear:0,dirt:0,roughness:-1,bumpMm:.25,extra:0},cardboard:{tileMeters:.6,color:[.55,.4,.25],color2:[0,0,0],wear:0,dirt:.3,roughness:-1,bumpMm:.2,extra:0},bareSteel:{tileMeters:.5,color:[0,0,0],color2:[0,0,0],wear:.3,dirt:0,roughness:-1,bumpMm:.2,extra:0},grass:{tileMeters:1.5,color:[.055,.085,.022],color2:[.2,.17,.085],wear:0,dirt:0,roughness:-1,bumpMm:10,extra:0},nitride:{tileMeters:.12,color:[.028,.029,.032],color2:[0,0,0],wear:.2,dirt:0,roughness:-1,bumpMm:.015,extra:0},machined:{tileMeters:.06,color:[.62,.62,.63],color2:[0,0,0],wear:.15,dirt:0,roughness:-1,bumpMm:.01,extra:1},skin:{tileMeters:.05,color:[.56,.33,.24],color2:[0,0,0],wear:0,dirt:0,roughness:-1,bumpMm:.12,extra:0},glove:{tileMeters:.04,color:[.045,.043,.04],color2:[0,0,0],wear:.35,dirt:.1,roughness:-1,bumpMm:.12,extra:0}},Oe=class{constructor(e,t){this.dev=e;this.tex=t;this.pipeline=e.device.createComputePipeline({layout:"auto",compute:{module:e.shader(Dr,"material-synth"),entryPoint:"main"}})}pipeline;cache=new Map;generate(e,t={}){let s={...Or[e],...t,size:t.size??1024,seed:t.seed??1},i=JSON.stringify([e,s]),a=this.cache.get(i);if(a)return a;let o=this.dev.device,l=s.size,c=C=>o.createTexture({size:[l,l],format:"rgba8unorm",usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.COPY_SRC,label:C}),u=c(`${e}.albedo.tmp`),h=c(`${e}.normal.tmp`),p=c(`${e}.orm.tmp`),d=new ArrayBuffer(64),f=new Uint32Array(d),b=new Float32Array(d);f[0]=Er[e],f[1]=s.seed>>>0,f[2]=l,b.set([...s.color,s.wear],4),b.set([...s.color2,s.dirt],8),b.set([s.tileMeters,s.roughness,s.bumpMm,s.extra],12);let v=this.dev.createBuffer(64,GPUBufferUsage.UNIFORM,"synth.params",new Uint8Array(d)),g=o.createBindGroup({layout:this.pipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:v}},{binding:1,resource:u.createView()},{binding:2,resource:h.createView()},{binding:3,resource:p.createView()}]}),y=Q(l),w=(C,U)=>o.createTexture({size:[l,l],format:U,mipLevelCount:y,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT,label:C}),P=w(`${e}.albedo`,"rgba8unorm-srgb"),k=w(`${e}.normal`,"rgba8unorm"),A=w(`${e}.orm`,"rgba8unorm"),T=o.createCommandEncoder({label:`synth ${e}`}),z=T.beginComputePass();z.setPipeline(this.pipeline),z.setBindGroup(0,g),z.dispatchWorkgroups(Math.ceil(l/8),Math.ceil(l/8)),z.end(),T.copyTextureToTexture({texture:u},{texture:P},[l,l]),T.copyTextureToTexture({texture:h},{texture:k},[l,l]),T.copyTextureToTexture({texture:p},{texture:A},[l,l]),this.tex.mipgen.generate(P,"color",T),this.tex.mipgen.generate(k,"normal",T),this.tex.mipgen.generate(A,"color",T),o.queue.submit([T.finish()]),o.queue.onSubmittedWorkDone().then(()=>{u.destroy(),h.destroy(),p.destroy(),v.destroy()});let B={albedo:P,normal:k,orm:A,tileMeters:s.tileMeters};return this.cache.set(i,B),B}material(e,t={},r={}){let s=this.generate(e,t),i=1/s.tileMeters;return new De({name:r.name??e,baseColorMap:s.albedo,normalMap:s.normal,ormMap:s.orm,baseColor:[1,1,1,1],roughness:1,metallic:1,uvScale:[i,i],...r})}};var Fr={sunElevation:38,sunAzimuth:130,sunIlluminance:128e3,sunAngularDiameter:.53,turbidity:1,rayleigh:1,ozone:1,mieG:.8,groundAlbedo:.18,altitude:100,multiScatter:1.25},Fe=636e4,Ir=646e4,jr=[5802e-9,13558e-9,331e-7];var Nr=44e-7,Hr=[65e-8,1881e-9,85e-9],Wr=8e3,qr=1200;function Wt(n){let e=n.sunElevation*Math.PI/180,t=n.sunAzimuth*Math.PI/180;return[Math.cos(e)*Math.sin(t),Math.sin(e),-Math.cos(e)*Math.cos(t)]}function Kr(n,e,t,r){let s=n*e,i=n*n-r*r,a=s*s-i;return a<0?-1:-s+Math.sqrt(a)}function $r(n){let e=Wt(n),t=Fe+n.altitude;if((()=>{let u=t*e[1],h=t*t-Fe*Fe,p=u*u-h;if(p<0)return-1;let d=-u-Math.sqrt(p);return d>0?d:-1})()>0)return[0,0,0];let s=Kr(t,e[1],0,Ir),i=64,a=s/i,o=0,l=0,c=0;for(let u=0;u<i;u++){let h=(u+.5)*a,p=e[0]*h,d=t+e[1]*h,f=e[2]*h,b=Math.hypot(p,d,f)-Fe;o+=Math.exp(-b/Wr)*a,l+=Math.exp(-b/qr)*a,c+=Math.max(0,1-Math.abs(b-25e3)/15e3)*a}return[0,1,2].map(u=>Math.exp(-(jr[u]*n.rayleigh*o+Nr*n.turbidity*l+Hr[u]*n.ozone*c)))}var Xr=`
struct SkyU {
  sunDir: vec4f,       // xyz, w = sun illuminance (lux)
  coeffs: vec4f,       // rayleigh mult, mie mult, ozone mult, mie g
  ground: vec4f,       // albedo, altitude, multi scatter, size
  sunGround: vec4f,    // rgb = ground illuminance (lux, sun+sky approx)
};
@group(0) @binding(0) var<uniform> U: SkyU;
@group(0) @binding(1) var outCube: texture_storage_2d_array<rgba16float, write>;

const PI: f32 = 3.14159265359;
const RG: f32 = 6360e3;
const RT: f32 = 6460e3;
const BR: vec3f = vec3f(5.802e-6, 13.558e-6, 33.1e-6);
const BMS: f32 = 3.996e-6;
const BME: f32 = 4.4e-6;
const BO: vec3f = vec3f(0.65e-6, 1.881e-6, 0.085e-6);

fn faceDir(face: u32, uv: vec2f) -> vec3f {
  let a = uv * 2.0 - 1.0;
  switch (face) {
    case 0u: { return normalize(vec3f(1.0, -a.y, -a.x)); }
    case 1u: { return normalize(vec3f(-1.0, -a.y, a.x)); }
    case 2u: { return normalize(vec3f(a.x, 1.0, a.y)); }
    case 3u: { return normalize(vec3f(a.x, -1.0, -a.y)); }
    case 4u: { return normalize(vec3f(a.x, -a.y, 1.0)); }
    default: { return normalize(vec3f(-a.x, -a.y, -1.0)); }
  }
}
fn sphereExit(o: vec3f, d: vec3f, r: f32) -> f32 {
  let b = dot(o, d);
  let c = dot(o, o) - r * r;
  let disc = b * b - c;
  if (disc < 0.0) { return -1.0; }
  return -b + sqrt(disc);
}
fn sphereEnter(o: vec3f, d: vec3f, r: f32) -> f32 {
  let b = dot(o, d);
  let c = dot(o, o) - r * r;
  let disc = b * b - c;
  if (disc < 0.0) { return -1.0; }
  return -b - sqrt(disc);
}
fn densities(p: vec3f) -> vec3f {
  let h = max(length(p) - RG, 0.0);
  return vec3f(exp(-h / 8000.0), exp(-h / 1200.0), max(0.0, 1.0 - abs(h - 25000.0) / 15000.0));
}
fn extinction(d: vec3f) -> vec3f {
  return BR * U.coeffs.x * d.x + vec3f(BME * U.coeffs.y * d.y) + BO * U.coeffs.z * d.z;
}
fn transmittanceToSun(p: vec3f, s: vec3f) -> vec3f {
  if (sphereEnter(p, s, RG) > 0.0) { return vec3f(0.0); }
  let tMax = sphereExit(p, s, RT);
  let n = 12;
  let dt = tMax / f32(n);
  var od = vec3f(0.0);
  for (var i = 0; i < n; i++) {
    od += extinction(densities(p + s * ((f32(i) + 0.5) * dt))) * dt;
  }
  return exp(-od);
}
fn phaseR(c: f32) -> f32 { return 3.0 / (16.0 * PI) * (1.0 + c * c); }
fn phaseM(c: f32, g: f32) -> f32 {
  // Cornette-Shanks
  let g2 = g * g;
  return 3.0 / (8.0 * PI) * ((1.0 - g2) * (1.0 + c * c)) / ((2.0 + g2) * pow(max(1.0 + g2 - 2.0 * g * c, 1e-4), 1.5));
}

fn skyRadiance(dir: vec3f) -> vec3f {
  let o = vec3f(0.0, RG + U.ground.y, 0.0);
  let s = U.sunDir.xyz;
  let tGround = sphereEnter(o, dir, RG);
  let hitGround = tGround > 0.0;
  let tMax = select(sphereExit(o, dir, RT), tGround, hitGround);
  let n = 32;
  let dt = tMax / f32(n);
  var od = vec3f(0.0);
  var inR = vec3f(0.0);
  var inM = vec3f(0.0);
  for (var i = 0; i < n; i++) {
    let p = o + dir * ((f32(i) + 0.5) * dt);
    let d = densities(p);
    let ext = extinction(d) * dt;
    let tv = exp(-(od + ext * 0.5));
    let ts = transmittanceToSun(p, s);
    inR += tv * ts * d.x * dt;
    inM += tv * ts * d.y * dt;
    od += ext;
  }
  let c = dot(dir, s);
  let E = U.sunDir.w;
  var L = E * (inR * BR * U.coeffs.x * phaseR(c) + inM * BMS * U.coeffs.y * phaseM(c, U.coeffs.w));
  L *= U.ground.z; // multiple-scattering approximation
  if (hitGround) {
    // Lambertian ground lit by (transmitted) sun + sky, attenuated back to the observer
    let groundL = U.ground.x / PI * U.sunGround.rgb;
    L += groundL * exp(-od);
  }
  return L;
}

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let size = u32(U.ground.w);
  if (id.x >= size || id.y >= size) { return; }
  let uv = (vec2f(id.xy) + 0.5) / f32(size);
  let dir = faceDir(id.z, uv);
  let L = skyRadiance(dir);
  textureStore(outCube, vec2i(id.xy), i32(id.z), vec4f(min(L, vec3f(6.0e4)), 1.0));
}
`,Ie=class{constructor(e,t,r=128){this.dev=e;this.tex=t;this.size=r,this.pipeline=e.device.createComputePipeline({layout:"auto",compute:{module:e.shader(Xr,"sky"),entryPoint:"main"}}),this.ubuf=e.createBuffer(64,GPUBufferUsage.UNIFORM,"sky.u"),this.cube=e.device.createTexture({size:[r,r,6],format:"rgba16float",mipLevelCount:Q(r),usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.RENDER_ATTACHMENT,label:"sky.cube"}),this.bg=e.device.createBindGroup({layout:this.pipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.ubuf}},{binding:1,resource:this.cube.createView({dimension:"2d-array",baseMipLevel:0,mipLevelCount:1})}]})}settings={...Fr};cube;size;pipeline;ubuf;bg;version=0;lastKey="";get sunDir(){return Wt(this.settings)}sunIlluminanceRGB(){let e=$r(this.settings),t=this.settings.sunIlluminance;return[e[0]*t,e[1]*t,e[2]*t]}update(e){let t=JSON.stringify(this.settings);if(t===this.lastKey)return!1;this.lastKey=t;let r=this.settings,s=this.sunDir,i=this.sunIlluminanceRGB(),a=Math.max(0,s[1]),o=.12*r.sunIlluminance*Math.max(.02,Math.sin(Math.max(s[1],.02)))*(.8+.2*r.turbidity),l=[i[0]*a+o*.85,i[1]*a+o*.95,i[2]*a+o*1.15],c=new Float32Array([s[0],s[1],s[2],r.sunIlluminance,r.rayleigh,r.turbidity,r.ozone,r.mieG,r.groundAlbedo,r.altitude,r.multiScatter,this.size,l[0],l[1],l[2],0]);this.dev.device.queue.writeBuffer(this.ubuf,0,c);let u=e??this.dev.device.createCommandEncoder({label:"sky"}),h=u.beginComputePass({label:"sky bake"});return h.setPipeline(this.pipeline),h.setBindGroup(0,this.bg),h.dispatchWorkgroups(Math.ceil(this.size/8),Math.ceil(this.size/8),6),h.end(),this.tex.mipgen.generate(this.cube,"color",u),e||this.dev.device.queue.submit([u.finish()]),this.version++,!0}};var Mt=`
const PI: f32 = 3.14159265359;
fn faceDir(face: u32, uv: vec2f) -> vec3f {
  let a = uv * 2.0 - 1.0;
  switch (face) {
    case 0u: { return normalize(vec3f(1.0, -a.y, -a.x)); }
    case 1u: { return normalize(vec3f(-1.0, -a.y, a.x)); }
    case 2u: { return normalize(vec3f(a.x, 1.0, a.y)); }
    case 3u: { return normalize(vec3f(a.x, -1.0, -a.y)); }
    case 4u: { return normalize(vec3f(a.x, -a.y, 1.0)); }
    default: { return normalize(vec3f(-a.x, -a.y, -1.0)); }
  }
}
fn hammersley(i: u32, n: u32) -> vec2f {
  var b = i;
  b = (b << 16u) | (b >> 16u);
  b = ((b & 0x55555555u) << 1u) | ((b & 0xAAAAAAAAu) >> 1u);
  b = ((b & 0x33333333u) << 2u) | ((b & 0xCCCCCCCCu) >> 2u);
  b = ((b & 0x0F0F0F0Fu) << 4u) | ((b & 0xF0F0F0F0u) >> 4u);
  b = ((b & 0x00FF00FFu) << 8u) | ((b & 0xFF00FF00u) >> 8u);
  return vec2f(f32(i) / f32(n), f32(b) * 2.3283064365386963e-10);
}
fn importanceGGX(xi: vec2f, N: vec3f, a: f32) -> vec3f {
  let phi = 2.0 * PI * xi.x;
  let cosT = sqrt((1.0 - xi.y) / (1.0 + (a * a - 1.0) * xi.y));
  let sinT = sqrt(1.0 - cosT * cosT);
  let H = vec3f(cos(phi) * sinT, sin(phi) * sinT, cosT);
  let up = select(vec3f(1.0, 0.0, 0.0), vec3f(0.0, 0.0, 1.0), abs(N.z) < 0.999);
  let T = normalize(cross(up, N));
  let B = cross(N, T);
  return normalize(T * H.x + B * H.y + N * H.z);
}
fn D_GGX(NoH: f32, a: f32) -> f32 {
  let a2 = a * a;
  let f = (NoH * a2 - NoH) * NoH + 1.0;
  return a2 / (PI * f * f);
}
`,Yr=Mt+`
struct PU { roughness: f32, outSize: f32, srcSize: f32, samples: f32 };
@group(0) @binding(0) var<uniform> U: PU;
@group(0) @binding(1) var src: texture_cube<f32>;
@group(0) @binding(2) var samp: sampler;
@group(0) @binding(3) var dst: texture_storage_2d_array<rgba16float, write>;
@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let size = u32(U.outSize);
  if (id.x >= size || id.y >= size) { return; }
  let N = faceDir(id.z, (vec2f(id.xy) + 0.5) / U.outSize);
  let a = max(U.roughness * U.roughness, 1e-4);
  if (U.roughness < 1e-3) {
    textureStore(dst, vec2i(id.xy), i32(id.z), textureSampleLevel(src, samp, N, 0.0));
    return;
  }
  let n = u32(U.samples);
  var acc = vec3f(0.0);
  var w = 0.0;
  let texelSA = 4.0 * PI / (6.0 * U.srcSize * U.srcSize);
  for (var i = 0u; i < n; i++) {
    let H = importanceGGX(hammersley(i, n), N, a);
    let L = normalize(2.0 * dot(N, H) * H - N);
    let NoL = dot(N, L);
    if (NoL > 0.0) {
      let NoH = saturate(dot(N, H));
      let pdf = D_GGX(NoH, a) * 0.25; // V = N: pdf = D*NoH/(4 VoH) = D/4
      let sampleSA = 1.0 / (f32(n) * pdf + 1e-4);
      let lod = max(0.5 * log2(sampleSA / texelSA) + 1.0, 0.0);
      acc += textureSampleLevel(src, samp, L, lod).rgb * NoL;
      w += NoL;
    }
  }
  textureStore(dst, vec2i(id.xy), i32(id.z), vec4f(acc / max(w, 1e-4), 1.0));
}
fn saturate(x: f32) -> f32 { return clamp(x, 0.0, 1.0); }
`,Qr=Mt+`
@group(0) @binding(0) var src: texture_cube<f32>;
@group(0) @binding(1) var samp: sampler;
@group(0) @binding(2) var<storage, read_write> outSH: array<vec4f, 9>;
const N: u32 = 64u;           // threads
const RES: u32 = 32u;         // sample grid per face
var<workgroup> acc: array<array<vec3f, 9>, 64>;
@compute @workgroup_size(64)
fn main(@builtin(local_invocation_index) li: u32) {
  var c: array<vec3f, 9>;
  for (var k = 0u; k < 9u; k++) { c[k] = vec3f(0.0); }
  let total = 6u * RES * RES;
  for (var idx = li; idx < total; idx += N) {
    let face = idx / (RES * RES);
    let rem = idx % (RES * RES);
    let px = rem % RES;
    let py = rem / RES;
    let uv = (vec2f(f32(px), f32(py)) + 0.5) / f32(RES);
    let a = uv * 2.0 - 1.0;
    // texel solid angle on a unit cube face
    let tmp = 1.0 + a.x * a.x + a.y * a.y;
    let dA = 4.0 / f32(RES * RES);
    let sa = dA / (tmp * sqrt(tmp));
    let d = faceDir(face, uv);
    let L = textureSampleLevel(src, samp, d, 2.0).rgb * sa;
    c[0] += L * 0.282095;
    c[1] += L * 0.488603 * d.y;
    c[2] += L * 0.488603 * d.z;
    c[3] += L * 0.488603 * d.x;
    c[4] += L * 1.092548 * d.x * d.y;
    c[5] += L * 1.092548 * d.y * d.z;
    c[6] += L * 0.315392 * (3.0 * d.z * d.z - 1.0);
    c[7] += L * 1.092548 * d.x * d.z;
    c[8] += L * 0.546274 * (d.x * d.x - d.y * d.y);
  }
  for (var k = 0u; k < 9u; k++) { acc[li][k] = c[k]; }
  workgroupBarrier();
  if (li == 0u) {
    var s: array<vec3f, 9>;
    for (var k = 0u; k < 9u; k++) { s[k] = vec3f(0.0); }
    for (var t = 0u; t < N; t++) { for (var k = 0u; k < 9u; k++) { s[k] += acc[t][k]; } }
    // convolve with clamped cosine (A0 = pi, A1 = 2pi/3, A2 = pi/4), fold basis constants, divide by pi
    var A = array<f32, 9>(PI, 2.0 * PI / 3.0, 2.0 * PI / 3.0, 2.0 * PI / 3.0, PI / 4.0, PI / 4.0, PI / 4.0, PI / 4.0, PI / 4.0);
    var Y = array<f32, 9>(0.282095, 0.488603, 0.488603, 0.488603, 1.092548, 1.092548, 0.315392, 1.092548, 0.546274);
    for (var k = 0u; k < 9u; k++) { outSH[k] = vec4f(s[k] * A[k] * Y[k] / PI, 0.0); }
  }
}
`,Jr=Mt+`
@group(0) @binding(0) var dst: texture_storage_2d<rgba16float, write>;
fn V_SmithGGXCorrelated(NoV: f32, NoL: f32, a: f32) -> f32 {
  let a2 = a * a;
  let gv = NoL * sqrt(NoV * NoV * (1.0 - a2) + a2);
  let gl = NoV * sqrt(NoL * NoL * (1.0 - a2) + a2);
  return 0.5 / (gv + gl);
}
@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let size = textureDimensions(dst);
  if (id.x >= size.x || id.y >= size.y) { return; }
  let NoV = max((f32(id.x) + 0.5) / f32(size.x), 1e-3);
  let rough = (f32(id.y) + 0.5) / f32(size.y);
  let a = rough * rough;
  let V = vec3f(sqrt(1.0 - NoV * NoV), 0.0, NoV);
  let N = vec3f(0.0, 0.0, 1.0);
  var A = 0.0;
  var B = 0.0;
  let n = 512u;
  for (var i = 0u; i < n; i++) {
    let H = importanceGGX(hammersley(i, n), N, a);
    let L = normalize(2.0 * dot(V, H) * H - V);
    let NoL = clamp(L.z, 0.0, 1.0);
    let NoH = clamp(H.z, 0.0, 1.0);
    let VoH = clamp(dot(V, H), 0.0, 1.0);
    if (NoL > 0.0) {
      let Gv = V_SmithGGXCorrelated(NoV, NoL, a) * 4.0 * NoL * VoH / NoH;
      let Fc = pow(1.0 - VoH, 5.0);
      A += (1.0 - Fc) * Gv;
      B += Fc * Gv;
    }
  }
  textureStore(dst, vec2i(id.xy), vec4f(A / f32(n), B / f32(n), 0.0, 1.0));
}
`,je=class{constructor(e,t=128,r=96){this.dev=e;this.size=t;let s=e.device;this.mips=Math.min(Q(t),6),this.specular=s.createTexture({size:[t,t,6],format:"rgba16float",mipLevelCount:this.mips,usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING,label:"ibl.specular"}),this.sh=e.createBuffer(144,GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC,"ibl.sh"),this.brdfLut=s.createTexture({size:[128,128],format:"rgba16float",usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING,label:"brdf.lut"}),this.sampler=s.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"linear"}),this.prefilter=s.createComputePipeline({layout:"auto",compute:{module:e.shader(Yr,"ibl-prefilter"),entryPoint:"main"}}),this.shPipe=s.createComputePipeline({layout:"auto",compute:{module:e.shader(Qr,"ibl-sh"),entryPoint:"main"}});for(let l=0;l<this.mips;l++){let c=l/(this.mips-1),u=Math.max(1,t>>l);this.uniforms.push(e.createBuffer(16,GPUBufferUsage.UNIFORM,`ibl.u${l}`,new Float32Array([c,u,t,l===0?1:r])))}let i=s.createComputePipeline({layout:"auto",compute:{module:e.shader(Jr,"dfg"),entryPoint:"main"}}),a=s.createCommandEncoder({label:"dfg"}),o=a.beginComputePass();o.setPipeline(i),o.setBindGroup(0,s.createBindGroup({layout:i.getBindGroupLayout(0),entries:[{binding:0,resource:this.brdfLut.createView()}]})),o.dispatchWorkgroups(16,16),o.end(),s.queue.submit([a.finish()])}specular;sh;brdfLut;mips;prefilter;shPipe;sampler;uniforms=[];update(e,t){let r=this.dev.device,s=e.createView({dimension:"cube"}),i=t.beginComputePass({label:"ibl"});i.setPipeline(this.prefilter);for(let a=0;a<this.mips;a++){let o=Math.max(1,this.size>>a);i.setBindGroup(0,r.createBindGroup({layout:this.prefilter.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniforms[a]}},{binding:1,resource:s},{binding:2,resource:this.sampler},{binding:3,resource:this.specular.createView({dimension:"2d-array",baseMipLevel:a,mipLevelCount:1})}]})),i.dispatchWorkgroups(Math.ceil(o/8),Math.ceil(o/8),6)}i.setPipeline(this.shPipe),i.setBindGroup(0,r.createBindGroup({layout:this.shPipe.getBindGroupLayout(0),entries:[{binding:0,resource:s},{binding:1,resource:this.sampler},{binding:2,resource:{buffer:this.sh}}]})),i.dispatchWorkgroups(1),i.end()}};var qt={enabled:!0,cascades:4,resolution:2048,distance:160,splitLambda:.82,casterExtent:120,constantBias:8e-5,slopeBias:1.6,normalBias:1.4,maxPenumbraTexels:14,blockerSamples:12,pcfSamples:20,blendFraction:.12},Pe=m.create();function Kt(n,e,t,r){let s=Math.max(1,Math.min(4,r.cascades)),i=Math.max(n.near,.05),a=r.distance,o=[];for(let g=1;g<=s;g++){let y=g/s,w=i*Math.pow(a/i,y),P=i+(a-i)*y;o.push(r.splitLambda*w+(1-r.splitLambda)*P)}let l=Math.tan(n.fovY/2),c=l*e,u={viewProj:[],splits:o,texelWorld:[],depthRange:[]},h=n.forward(),p=n.up(),d=n.right(),f=m.normalize(m.create(),t),b=Math.abs(f[1])>.99?m.create(0,0,1):m.create(0,1,0),v=i;for(let g=0;g<s;g++){let y=v,w=o[g];v=w;let P=c*c+l*l,k=.5*(y+w)*(1+P);k=Math.min(k,w);let A=Math.hypot(k-y,y*Math.sqrt(P)),T=Math.hypot(w-k,w*Math.sqrt(P)),z=Math.max(A,T)*1.02,B=m.scaleAndAdd(m.create(),n.position,h,k),C=r.resolution,U=2*z/C,V=M.lookAt(M.create(),f,[0,0,0],b);m.transformMat4(Pe,B,V);let E=Math.round(Pe[0]/U)*U,G=Math.round(Pe[1]/U)*U,I=-Pe[2]-z-r.casterExtent,W=-Pe[2]+z,Y=W-I,N=M.orthoZO(M.create(),E-z,E+z,G-z,G+z,I,W),O=M.multiply(M.create(),N,V);u.viewProj.push(O),u.texelWorld.push(U),u.depthRange.push(Y)}return u}var Zr=0,le=class{id=++Zr;mesh;material;transform=M.create();prevTransform=M.create();visible=!0;castShadow=!0;viewmodel=!1;joints=null;_skin=null;instances=null;instanceCount=0;instancesDirty=!1;_inst=null;instBounds=null;worldBounds=$.create();first=!0;userData=null;constructor(e,t,r){this.mesh=e,this.material=t,r&&(M.copy(this.transform,r),M.copy(this.prevTransform,r))}setTransform(e){M.copy(this.transform,e)}setInstances(e,t=e.length/16){this.instances=e,this.instanceCount=t,this.instancesDirty=!0;let r=$.create(),s=$.create();for(let i=0;i<t;i++){$.transform(s,this.mesh.bounds,e.subarray(i*16,i*16+16));for(let a=0;a<3;a++)r.min[a]=Math.min(r.min[a],s.min[a]),r.max[a]=Math.max(r.max[a],s.max[a])}this.instBounds=r}_endFrame(){M.copy(this.prevTransform,this.transform),this.first=!1}_beginFrame(){this.first&&M.copy(this.prevTransform,this.transform),$.transform(this.worldBounds,this.instances&&this.instBounds?this.instBounds:this.mesh.bounds,this.transform)}resetHistory(){this.first=!0}},Ne=class n{position=m.create();color=[1,1,1];intensity=100;range=20;radius=.02;spotOuter=0;spotInner=0;direction=m.create(0,-1,0);enabled=!0;static fromLumens(e,t=6500){let r=new n;return r.intensity=It(e),r.color=Ot(t),r}},He=class{position=m.create(0,1.7,0);rotation=L.create();fovY=70*q;viewmodelFovY=55*q;near=.04;aperture=8;shutter=1/250;iso=100;view=M.create();world=M.create();updateMatrices(){M.fromRotationTranslation(this.world,this.rotation,this.position),M.invert(this.view,this.world)}forward(e=m.create()){return m.transformQuat(e,[0,0,-1],this.rotation)}up(e=m.create()){return m.transformQuat(e,[0,1,0],this.rotation)}right(e=m.create()){return m.transformQuat(e,[1,0,0],this.rotation)}setFocalLength(e,t=24){this.fovY=2*Math.atan(t/(2*e))}},We=class{objects=new Set;lights=new Set;add(e){return this.objects.add(e),e}remove(e){this.objects.delete(e)}addLight(e){return this.lights.add(e),e}removeLight(e){this.lights.delete(e)}};var ce=`
const PI: f32 = 3.14159265359;
const INV_PI: f32 = 0.31830988618;
const HALF_MAX: f32 = 60000.0;
`,ue=`
struct Frame {
  viewProj: mat4x4f,              // 0   jittered
  viewProjNoJitter: mat4x4f,      // 64
  prevViewProjNoJitter: mat4x4f,  // 128
  vmViewProj: mat4x4f,            // 192 viewmodel, jittered
  vmViewProjNoJitter: mat4x4f,    // 256
  vmPrevViewProjNoJitter: mat4x4f,// 320
  view: mat4x4f,                  // 384
  invView: mat4x4f,               // 448
  invProj: mat4x4f,               // 512 (jittered)
  invViewProj: mat4x4f,           // 576 (jittered)
  proj: mat4x4f,                  // 640
  camPos: vec4f,                  // 704 xyz, w = near plane
  sunDir: vec4f,                  // 720 xyz towards sun, w = cos(sun angular radius)
  sunColor: vec4f,                // 736 rgb = illuminance (lux, colour-weighted), w = sun disk luminance scale
  viewport: vec4f,                // 752 w, h, 1/w, 1/h
  jitter: vec4f,                  // 768 current xy (ndc), previous zw
  fog: vec4f,                     // 784 density (1/m), height falloff (1/m), base height (m), start distance (m)
  fogColor: vec4f,                // 800 rgb ambient inscatter luminance, w = mie g
  time: vec4f,                    // 816 seconds, dt, frame index, ibl intensity
  shadow: vec4f,                  // 832 cascade count, max pcf radius (texels), sun tan(angular radius), blend fraction
  cascadeSplits: vec4f,           // 848 view-space far distance per cascade
  cascadeMats: array<mat4x4f, 4>, // 864
  cascadeTexel: vec4f,            // 1120 world-units per shadow texel per cascade
  skyVisMin: vec4f,               // 1136 xyz volume min, w = cell size (m)
  skyVisSize: vec4f,              // 1152 nx, ny, nz, enabled
  misc: vec4f,                    // 1168 light count, specular occlusion, ao strength, shadow normal bias (texels)
  envParams: vec4f,               // 1184 env max mip, sky luminance scale, ground albedo, debug view
  vmParams: vec4f,                // 1200 viewmodel depth squeeze, unused...
  cascadeDepthRange: vec4f,       // 1216 light-space depth range (m) per cascade
  shadowBias: vec4f,              // 1232 constant bias, slope bias, pcss blocker samples, pcf samples
  extra: vec4f,                   // 1248
  extra2: vec4f,                  // 1264
  probeMin: vec4f,                // 1280 GI probe volume min (first probe centre \u2212 cell/2), w = cell size (m)
  probeSize: vec4f,               // 1296 nx, ny, nz, intensity (0 = disabled)
  cloud: vec4f,                   // 1312 coverage (0..1), optical density, layer altitude (m), feature scale (m)
  cloud2: vec4f,                  // 1328 drift x, drift z (m, accumulated wind), shadow strength, enabled
};

struct Light {
  posRange: vec4f,   // position, range (m)
  color: vec4f,      // rgb * luminous intensity (cd), w = unused
  dirCos: vec4f,     // spot direction, cos(outer)
  params: vec4f,     // cos(inner), source radius (m), type (0 point, 1 spot), unused
};

struct Exposure {
  current: f32,      // linear pre-exposure multiplier used this frame
  ev100: f32,
  targetEv100: f32,
  previous: f32,     // previous frame's multiplier (TAA history rescale)
};

@group(0) @binding(0) var<uniform> frame: Frame;
@group(0) @binding(1) var<storage, read> lights: array<Light>;
@group(0) @binding(2) var<storage, read> sh: array<vec4f, 9>;
@group(0) @binding(3) var<storage, read> exposure: Exposure;
@group(0) @binding(4) var envSpecular: texture_cube<f32>;
@group(0) @binding(5) var brdfLut: texture_2d<f32>;
@group(0) @binding(6) var shadowMap: texture_depth_2d_array;
@group(0) @binding(7) var shadowSampler: sampler_comparison;
@group(0) @binding(8) var linearClamp: sampler;
@group(0) @binding(9) var aoTex: texture_2d<f32>;
@group(0) @binding(10) var skyVis: texture_3d<f32>;
@group(0) @binding(11) var skyCube: texture_cube<f32>;
@group(0) @binding(12) var probeR: texture_3d<f32>;
@group(0) @binding(13) var probeG: texture_3d<f32>;
@group(0) @binding(14) var probeB: texture_3d<f32>;
`,ne=`
fn luminance(c: vec3f) -> f32 { return dot(c, vec3f(0.2126, 0.7152, 0.0722)); }
fn saturate(x: f32) -> f32 { return clamp(x, 0.0, 1.0); }
fn saturate3(x: vec3f) -> vec3f { return clamp(x, vec3f(0.0), vec3f(1.0)); }
fn pow5(x: f32) -> f32 { let x2 = x * x; return x2 * x2 * x; }
/// Interleaved gradient noise (Jimenez) \u2014 per-pixel, per-frame dither.
fn ign(p: vec2f, frameIdx: f32) -> f32 {
  let q = p + 5.588238 * (frameIdx % 64.0);
  return fract(52.9829189 * fract(0.06711056 * q.x + 0.00583715 * q.y));
}
fn hash12(p: vec2f) -> f32 {
  var p3 = fract(vec3f(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
fn octEncode(n: vec3f) -> vec2f {
  let p = n.xy / (abs(n.x) + abs(n.y) + abs(n.z));
  if (n.z < 0.0) { return (1.0 - abs(p.yx)) * select(vec2f(-1.0), vec2f(1.0), p >= vec2f(0.0)); }
  return p;
}
fn octDecode(e: vec2f) -> vec3f {
  var n = vec3f(e.xy, 1.0 - abs(e.x) - abs(e.y));
  let t = max(-n.z, 0.0);
  n.x += select(t, -t, n.x >= 0.0);
  n.y += select(t, -t, n.y >= 0.0);
  return normalize(n);
}
`,ke=`
fn D_GGX(NoH: f32, a: f32) -> f32 {
  let a2 = a * a;
  let f = (NoH * a2 - NoH) * NoH + 1.0;
  return a2 / (PI * f * f + 1e-7);
}
fn V_SmithGGXCorrelated(NoV: f32, NoL: f32, a: f32) -> f32 {
  let a2 = a * a;
  let gv = NoL * sqrt(NoV * NoV * (1.0 - a2) + a2);
  let gl = NoV * sqrt(NoL * NoL * (1.0 - a2) + a2);
  return 0.5 / (gv + gl + 1e-7);
}
fn F_Schlick3(f0: vec3f, f90: f32, VoH: f32) -> vec3f { return f0 + (vec3f(f90) - f0) * pow5(1.0 - VoH); }
fn F_Schlick1(f0: f32, f90: f32, VoH: f32) -> f32 { return f0 + (f90 - f0) * pow5(1.0 - VoH); }
fn Fd_Burley(NoV: f32, NoL: f32, LoH: f32, rough: f32) -> f32 {
  let f90 = 0.5 + 2.0 * rough * LoH * LoH;
  return F_Schlick1(1.0, f90, NoL) * F_Schlick1(1.0, f90, NoV) * INV_PI;
}
/// Sphere-light roughness widening (Karis) for small area sources (sun disk, bulbs).
fn areaRoughness(a: f32, radiusOverDist: f32) -> f32 { return saturate(a + 0.5 * radiusOverDist); }

struct Surface {
  pos: vec3f,
  N: vec3f,
  V: vec3f,
  albedo: vec3f,
  f0: vec3f,
  perceptualRoughness: f32,
  a: f32,
  metallic: f32,
  ao: f32,
  specOcc: f32,
  NoV: f32,
  energyComp: vec3f,
};

/// Returns radiance contribution for unit illuminance arriving from direction L.
fn shadeLight(s: Surface, L: vec3f, aOverride: f32) -> vec3f {
  let H = normalize(s.V + L);
  let NoL = saturate(dot(s.N, L));
  if (NoL <= 0.0) { return vec3f(0.0); }
  let NoH = saturate(dot(s.N, H));
  let LoH = saturate(dot(L, H));
  let a = aOverride;
  let D = D_GGX(NoH, a);
  let Vis = V_SmithGGXCorrelated(s.NoV, NoL, a);
  let F = F_Schlick3(s.f0, 1.0, LoH);
  let spec = D * Vis * F * s.energyComp;
  let diff = s.albedo * Fd_Burley(s.NoV, NoL, LoH, s.perceptualRoughness);
  return (diff + spec) * NoL;
}

fn shIrradiance(n: vec3f) -> vec3f {
  // L2 spherical harmonics, coefficients already convolved with the cosine lobe (irradiance / PI)
  var r = sh[0].rgb;
  r += sh[1].rgb * n.y + sh[2].rgb * n.z + sh[3].rgb * n.x;
  r += sh[4].rgb * (n.x * n.y) + sh[5].rgb * (n.y * n.z) + sh[6].rgb * (3.0 * n.z * n.z - 1.0);
  r += sh[7].rgb * (n.x * n.z) + sh[8].rgb * (n.x * n.x - n.y * n.y);
  return max(r, vec3f(0.0));
}

/// Lagarde specular occlusion from ambient occlusion.
fn specularOcclusion(NoV: f32, ao: f32, rough: f32) -> f32 {
  return saturate(pow(NoV + ao, exp2(-16.0 * rough - 1.0)) - 1.0 + ao);
}
/// Jimenez multi-bounce AO approximation.
fn multiBounceAO(ao: f32, albedo: vec3f) -> vec3f {
  let a = 2.0404 * albedo - 0.3324;
  let b = -4.7951 * albedo + 0.6417;
  let c = 2.7552 * albedo + 0.6903;
  return max(vec3f(ao), ((ao * a + b) * ao + c) * ao);
}
`,qe=`
var<private> POISSON32: array<vec2f, 32> = array<vec2f, 32>(
  vec2f(-0.975402, -0.0711386), vec2f(-0.920347, -0.41142), vec2f(-0.883908, 0.217872), vec2f(-0.884518, 0.568041),
  vec2f(-0.811945, 0.90521), vec2f(-0.792474, -0.779962), vec2f(-0.614856, 0.386578), vec2f(-0.580859, -0.208777),
  vec2f(-0.53795, 0.716666), vec2f(-0.515427, 0.0899991), vec2f(-0.454634, -0.707938), vec2f(-0.420942, 0.991272),
  vec2f(-0.261147, 0.588488), vec2f(-0.211219, 0.114841), vec2f(-0.146336, -0.259194), vec2f(-0.139439, -0.888668),
  vec2f(0.0116886, 0.326395), vec2f(0.0380566, 0.625477), vec2f(0.0625935, -0.50853), vec2f(0.125584, 0.0469069),
  vec2f(0.169469, -0.997253), vec2f(0.320597, 0.291055), vec2f(0.359172, -0.633717), vec2f(0.435713, -0.250832),
  vec2f(0.507797, -0.916562), vec2f(0.545763, 0.730216), vec2f(0.56859, 0.11655), vec2f(0.743156, -0.505173),
  vec2f(0.736442, -0.189734), vec2f(0.843562, 0.357036), vec2f(0.865413, 0.763726), vec2f(0.872005, -0.927)
);

fn rot2(v: vec2f, c: f32, s: f32) -> vec2f { return vec2f(v.x * c - v.y * s, v.x * s + v.y * c); }

/// PCSS-filtered sun shadow for one cascade. Returns visibility 0..1.
fn cascadeShadow(ci: i32, worldPos: vec3f, nrm: vec3f, noise: f32) -> f32 {
  let texel = frame.cascadeTexel[ci];
  let sunDir = frame.sunDir.xyz;
  let NoL = saturate(dot(nrm, sunDir));
  // normal-offset bias, larger at grazing angles
  let offs = nrm * texel * frame.misc.w * (1.0 + 1.5 * (1.0 - NoL));
  let lp = frame.cascadeMats[ci] * vec4f(worldPos + offs, 1.0);
  let uv = vec2f(lp.x * 0.5 + 0.5, 0.5 - lp.y * 0.5);
  let z = lp.z - frame.shadowBias.x;
  if (any(uv < vec2f(0.0)) || any(uv > vec2f(1.0)) || z > 1.0) { return 1.0; }
  let dims = vec2f(textureDimensions(shadowMap));
  let ang = noise * 6.2831853;
  let cs = cos(ang);
  let sn = sin(ang);
  let depthRange = frame.cascadeDepthRange[ci];
  // ---- blocker search (in world units -> texels)
  let tanSun = frame.shadow.z;
  let searchTexels = clamp(3.0 * tanSun * depthRange * 0.15 / texel, 2.0, frame.shadow.y);
  var blockerSum = 0.0;
  var blockers = 0.0;
  let nb = i32(frame.shadowBias.z);
  for (var i = 0; i < nb; i++) {
    let o = rot2(POISSON32[i * 2], cs, sn) * searchTexels / dims;
    let tc = vec2i(clamp((uv + o) * dims, vec2f(0.0), dims - 1.0));
    let d = textureLoad(shadowMap, tc, ci, 0);
    if (d < z) { blockerSum += d; blockers += 1.0; }
  }
  if (blockers < 0.5) { return 1.0; }
  let avgBlocker = blockerSum / blockers;
  // penumbra width (world) = receiver-blocker distance * 2 tan(sun radius)
  let distWorld = max(z - avgBlocker, 0.0) * depthRange;
  let penumbraTexels = clamp(2.0 * distWorld * tanSun / texel, 1.0, frame.shadow.y);
  // ---- PCF
  var vis = 0.0;
  let np = i32(frame.shadowBias.w);
  for (var i = 0; i < np; i++) {
    let o = rot2(POISSON32[i], cs, sn) * penumbraTexels / dims;
    vis += textureSampleCompareLevel(shadowMap, shadowSampler, uv + o, ci, z);
  }
  return vis / f32(np);
}

fn sunShadow(worldPos: vec3f, nrm: vec3f, viewDepth: f32, noise: f32) -> f32 {
  let count = i32(frame.shadow.x);
  if (count == 0) { return 1.0; }
  var ci = count;
  for (var i = 0; i < count; i++) {
    if (viewDepth < frame.cascadeSplits[i]) { ci = i; break; }
  }
  if (ci >= count) { return 1.0; }
  var vis = cascadeShadow(ci, worldPos, nrm, noise);
  // blend into the next cascade near the far edge
  let far = frame.cascadeSplits[ci];
  let near = select(0.0, frame.cascadeSplits[max(ci - 1, 0)], ci > 0);
  let band = (far - near) * frame.shadow.w;
  let t = (viewDepth - (far - band)) / max(band, 1e-3);
  if (t > 0.0 && ci + 1 < count) {
    vis = mix(vis, cascadeShadow(ci + 1, worldPos, nrm, noise), saturate(t));
  } else if (t > 0.0) {
    vis = mix(vis, 1.0, saturate(t));
  }
  return vis;
}
`,Se=`
fn phaseHG(cosTheta: f32, g: f32) -> f32 {
  let g2 = g * g;
  return (1.0 - g2) / (4.0 * PI * pow(max(1.0 + g2 - 2.0 * g * cosTheta, 1e-4), 1.5));
}
/// Exponential height fog. Returns (inscattered luminance, transmittance).
fn heightFog(camPos: vec3f, worldPos: vec3f) -> vec4f {
  let density = frame.fog.x;
  if (density <= 0.0) { return vec4f(0.0, 0.0, 0.0, 1.0); }
  let k = max(frame.fog.y, 1e-5);
  let ray = worldPos - camPos;
  let dist = length(ray);
  let d = max(dist - frame.fog.w, 0.0);
  let dirY = ray.y / max(dist, 1e-4);
  let startY = camPos.y + dirY * min(dist, frame.fog.w);
  let rho0 = density * exp(-k * (startY - frame.fog.z));
  let kd = k * dirY * d;
  var tau: f32;
  if (abs(kd) > 1e-3) { tau = rho0 * (1.0 - exp(-kd)) / (k * dirY); } else { tau = rho0 * d; }
  let T = exp(-tau);
  let V = ray / max(dist, 1e-4);
  let sunPhase = phaseHG(dot(V, frame.sunDir.xyz), frame.fogColor.w);
  let inscatter = frame.fogColor.rgb + frame.sunColor.rgb * sunPhase * 0.25;
  return vec4f(inscatter * (1.0 - T), T);
}
`,Ke=`
fn cHash(p: vec2f) -> f32 { return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453); }
fn cNoise(p: vec2f) -> f32 {
  let i = floor(p);
  let f = fract(p);
  let u = f * f * (3.0 - 2.0 * f);
  return mix(mix(cHash(i), cHash(i + vec2f(1.0, 0.0)), u.x), mix(cHash(i + vec2f(0.0, 1.0)), cHash(i + vec2f(1.0, 1.0)), u.x), u.y);
}
/// Cloud density (0..1) at layer coordinates (metres in the layer plane). octaves trades detail for cost.
fn cloudDensity(xz: vec2f, octaves: i32) -> f32 {
  let s = frame.cloud.w;
  var p = (xz + frame.cloud2.xy) / s;
  var a = 0.5;
  var v = 0.0;
  var norm = 0.0;
  for (var o = 0; o < 6; o++) {
    if (o >= octaves) { break; }
    v += a * cNoise(p);
    norm += a;
    p = mat2x2f(1.6, 1.2, -1.2, 1.6) * p + vec2f(7.3, -3.1);
    a *= 0.5;
  }
  v /= norm;
  let cov = frame.cloud.x;
  return saturate((v - (1.0 - cov)) / max(cov * 0.6, 1e-3));
}
/// Fraction of direct sunlight reaching a surface point through the cloud deck.
fn cloudShadow(worldPos: vec3f) -> f32 {
  if (frame.cloud2.w < 0.5 || frame.sunDir.y <= 0.01) { return 1.0; }
  let t = (frame.cloud.z - worldPos.y) / frame.sunDir.y;
  let p = worldPos.xz + frame.sunDir.xz * t;
  let d = cloudDensity(p, 4);
  return 1.0 - frame.cloud2.z * (1.0 - exp(-d * frame.cloud.y * 3.0));
}
`,$t=`
/// Baked GI probes: irradiance/\u03C0 for normal n at p (rgb) and blend weight (a: 0 outside the volume, fading
/// over the outermost cell). Offsets the lookup along the geometric normal and towards the viewer to avoid
/// self-occlusion and light leaking through thin walls.
fn sampleProbes(p: vec3f, ng: vec3f, n: vec3f, v: vec3f) -> vec4f {
  if (frame.probeSize.w <= 0.0) { return vec4f(0.0); }
  let cell = frame.probeMin.w;
  let q = p + ng * (0.35 * cell) + v * (0.15 * cell);
  let dims = frame.probeSize.xyz;
  let g = (q - frame.probeMin.xyz) / cell;
  if (any(g < vec3f(0.0)) || any(g > dims)) { return vec4f(0.0); }
  let edge = min(min(g, dims - g), vec3f(1e3));
  let w = saturate(min(edge.x, min(edge.y, edge.z)) / 1.0);
  let uvw = g / dims;
  let b = vec4f(1.0, n.y, n.z, n.x);
  let e = vec3f(
    dot(textureSampleLevel(probeR, linearClamp, uvw, 0.0), b),
    dot(textureSampleLevel(probeG, linearClamp, uvw, 0.0), b),
    dot(textureSampleLevel(probeB, linearClamp, uvw, 0.0), b));
  return vec4f(max(e, vec3f(0.0)) * frame.probeSize.w, w);
}

fn sampleSkyVisibility(p: vec3f) -> f32 {
  if (frame.skyVisSize.w < 0.5) { return 1.0; }
  let uvw = (p - frame.skyVisMin.xyz) / (frame.skyVisMin.w * frame.skyVisSize.xyz);
  if (any(uvw < vec3f(0.0)) || any(uvw > vec3f(1.0))) { return 1.0; }
  return textureSampleLevel(skyVis, linearClamp, uvw, 0.0).r;
}
`;var Pt=(s=>(s[s.Smoke=0]="Smoke",s[s.Flash=1]="Flash",s[s.Spark=2]="Spark",s[s.Dust=3]="Dust",s))(Pt||{}),es=ce+ue+ne+ke+Se+`
struct Inst {
  @location(0) posSize: vec4f,
  @location(1) color: vec4f,      // rgb, alpha
  @location(2) params: vec4f,     // rotation, kind, luminance, stretch
  @location(3) vel: vec4f,        // velocity xyz, layer
};
struct VO {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,
  @location(1) color: vec4f,
  @location(2) params: vec4f,
  @location(3) world: vec3f,
  @location(4) layer: f32,
  @location(5) viewZ: f32,
};
@group(1) @binding(0) var atlas: texture_2d_array<f32>;
@group(1) @binding(1) var samp: sampler;
@group(1) @binding(2) var sceneDepth: texture_depth_2d;

@vertex fn vs(@builtin(vertex_index) vi: u32, inst: Inst) -> VO {
  let corner = vec2f(f32(vi & 1u), f32((vi >> 1u) & 1u)) * 2.0 - 1.0;
  let camRight = vec3f(frame.view[0][0], frame.view[1][0], frame.view[2][0]);
  let camUp = vec3f(frame.view[0][1], frame.view[1][1], frame.view[2][1]);
  let rot = inst.params.x;
  var right = camRight * cos(rot) + camUp * sin(rot);
  var up = -camRight * sin(rot) + camUp * cos(rot);
  var half = vec2f(inst.posSize.w);
  let stretch = inst.params.w;
  if (stretch > 0.0) {
    // velocity-aligned streak (sparks / tracers)
    let toCam = normalize(frame.camPos.xyz - inst.posSize.xyz);
    let v = inst.vel.xyz;
    let vl = length(v);
    if (vl > 1e-3) {
      let d = v / vl;
      right = d;
      up = normalize(cross(d, toCam));
      half = vec2f(inst.posSize.w + vl * stretch, inst.posSize.w);
    }
  }
  let world = inst.posSize.xyz + right * corner.x * half.x + up * corner.y * half.y;
  var o: VO;
  o.pos = frame.viewProj * vec4f(world, 1.0);
  o.uv = corner * 0.5 + 0.5;
  o.color = inst.color;
  o.params = inst.params;
  o.world = world;
  o.layer = inst.vel.w;
  o.viewZ = -(frame.view * vec4f(world, 1.0)).z;
  return o;
}

fn linearDepth(d: f32) -> f32 { return frame.camPos.w / max(d, 1e-7); }

@fragment fn fs(i: VO) -> @location(0) vec4f {
  let tex = textureSample(atlas, samp, i.uv, i32(i.layer + 0.5));
  // soft particles: fade where the sprite intersects opaque geometry
  let sd = textureLoad(sceneDepth, vec2i(i.pos.xy), 0);
  let sceneZ = select(1e6, linearDepth(sd), sd > 0.0);
  let soft = saturate((sceneZ - i.viewZ) / max(0.15 * i.params.x * 0.0 + 0.25, 0.01));
  let kind = u32(i.params.y + 0.5);
  var rgb = vec3f(0.0);
  var a = tex.a * i.color.a * soft;
  if (kind == 1u || kind == 2u) {
    // emissive (flash core / hot sparks): additive via premultiplied alpha = 0. The sprite's alpha is the
    // shape (petal star / streak); without it the whole quad glows and a flash reads as a square.
    rgb = i.color.rgb * tex.rgb * tex.a * i.params.z * i.color.a * soft;
    a = 0.0;
  } else {
    // lit participating medium: sun with HG forward scattering + sky ambient
    let V = normalize(frame.camPos.xyz - i.world);
    let phase = phaseHG(dot(-V, frame.sunDir.xyz), 0.55) * 4.0 * PI;
    let ambient = shIrradiance(vec3f(0.0, 1.0, 0.0)) * 0.6 + shIrradiance(-V) * 0.4;
    let lit = i.color.rgb * (frame.sunColor.rgb * INV_PI * mix(0.35, phase, 0.6) * 0.8 + ambient);
    let fog = heightFog(frame.camPos.xyz, i.world);
    rgb = (lit * fog.a + fog.rgb) * tex.rgb * a;
  }
  return vec4f(min(rgb * exposure.current, vec3f(HALF_MAX)), a);
}
`;function ts(n){let t=new Uint8Array(n*n*4*4),r=ie(1234),s=new Float32Array(4096).map(()=>r.next()),i=(o,l)=>{let c=Math.floor(o),u=Math.floor(l),h=o-c,p=l-u,d=(v,g)=>s[(g&63)*64+(v&63)],f=h*h*(3-2*h),b=p*p*(3-2*p);return(d(c,u)*(1-f)+d(c+1,u)*f)*(1-b)+(d(c,u+1)*(1-f)+d(c+1,u+1)*f)*b},a=(o,l)=>{let c=0,u=.5,h=1;for(let p=0;p<5;p++)c+=u*i(o*h,l*h),u*=.5,h*=2;return c};for(let o=0;o<4;o++)for(let l=0;l<n;l++)for(let c=0;c<n;c++){let u=(c+.5)/n*2-1,h=(l+.5)/n*2-1,p=Math.hypot(u,h),d=0,f=255;if(o===0){let v=a(u*2.2+5,h*2.2+3);d=Math.max(0,Math.min(1,(1-p*p)*1.2))*Math.max(0,Math.min(1,v*1.8-.25)),f=Math.round(200+55*v)}else if(o===1){let v=Math.atan2(h,u),g=Math.pow(Math.abs(Math.cos(v*2.5)),6)*.6+Math.pow(Math.abs(Math.cos(v*4+.6)),10)*.4,y=a(u*4+11,h*4+7),w=.25+.75*g*(.6+.6*y);d=Math.max(0,1-p/w)**1.5+Math.max(0,1-p/.25)**2,d=Math.min(1,d),f=255}else if(o===2)d=Math.exp(-(h*h)*40)*Math.max(0,1-Math.abs(u)),f=255;else{let v=a(u*5+21,h*5+13);d=Math.max(0,1-p)**1.4*Math.max(0,v*1.6-.35),f=Math.round(180+75*v)}let b=((o*n+l)*n+c)*4;t[b]=f,t[b+1]=f,t[b+2]=f,t[b+3]=Math.round(Math.max(0,Math.min(1,d))*255)}return t}var $e=class{constructor(e){this.dev=e;this.instanceBuffer=e.createBuffer(this.capacity*64,GPUBufferUsage.VERTEX,"particles.inst");let t=128;this.atlas=e.device.createTexture({size:[t,t,4],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:"particle.atlas"}),e.device.queue.writeTexture({texture:this.atlas},ts(t),{bytesPerRow:t*4,rowsPerImage:t},[t,t,4]),this.sampler=e.device.createSampler({magFilter:"linear",minFilter:"linear"})}particles=[];maxParticles=4096;wind=m.create(1.5,0,.5);instanceBuffer;capacity=1024;data=new Float32Array(1024*16);atlas;sampler;pipeline=null;bg=null;bgDepth=null;random=ie(77);count=0;get random01(){return this.random.next()}spawn(e){this.particles.length>=this.maxParticles&&this.particles.shift(),this.particles.push({kind:e.kind,pos:Float32Array.from(e.position),vel:Float32Array.from(e.velocity??[0,0,0]),life:e.life,size0:e.size0,size1:e.size1,color:e.color??[1,1,1],alpha0:e.alpha0??1,alpha1:e.alpha1??0,luminance:e.luminance??0,rotation:e.rotation??this.random.next()*Math.PI*2,spin:e.spin??0,drag:e.drag??0,gravity:e.gravity??0,buoyancy:e.buoyancy??0,stretch:e.stretch??0,layer:e.layer??(e.kind===2?2:e.kind),fadeIn:e.fadeIn??.05,age:0,fresh:!0})}update(e){let t=this.particles,r=0;for(let s=0;s<t.length;s++){let i=t[s];if(i.fresh){i.fresh=!1,t[r++]=i;continue}if(i.age+=e,i.age>=i.life)continue;let a=i.kind===0||i.kind===3?1:0;for(let o=0;o<3;o++){let l=i.vel[o]-this.wind[o]*a;i.vel[o]-=l*Math.min(1,i.drag*e)}i.vel[1]+=(i.buoyancy-i.gravity)*e,i.pos[0]+=i.vel[0]*e,i.pos[1]+=i.vel[1]*e,i.pos[2]+=i.vel[2]*e,i.rotation+=i.spin*e,t[r++]=i}t.length=r}upload(e){let t=this.particles,r=t.length;r>this.capacity&&(this.capacity=Math.ceil(r*1.5),this.instanceBuffer.destroy(),this.instanceBuffer=this.dev.createBuffer(this.capacity*64,GPUBufferUsage.VERTEX,"particles.inst"),this.data=new Float32Array(this.capacity*16));let s=a=>(a.pos[0]-e[0])**2+(a.pos[1]-e[1])**2+(a.pos[2]-e[2])**2;t.sort((a,o)=>s(o)-s(a));let i=this.data;for(let a=0;a<r;a++){let o=t[a],l=a*16,c=o.age/o.life,u=Math.min(1,c/Math.max(o.fadeIn,.001)),h=o.size0+(o.size1-o.size0)*Math.sqrt(c),p=(o.alpha0+(o.alpha1-o.alpha0)*c)*u;i[l]=o.pos[0],i[l+1]=o.pos[1],i[l+2]=o.pos[2],i[l+3]=h,i[l+4]=o.color[0],i[l+5]=o.color[1],i[l+6]=o.color[2],i[l+7]=p,i[l+8]=o.rotation,i[l+9]=o.kind,i[l+10]=o.luminance*(1-c)*(1-c),i[l+11]=o.stretch,i[l+12]=o.vel[0],i[l+13]=o.vel[1],i[l+14]=o.vel[2],i[l+15]=o.layer}return r&&this.dev.device.queue.writeBuffer(this.instanceBuffer,0,i,0,r*16),this.count=r,r}createPipeline(e,t){let r=this.dev.device,s=this.dev.shader(es,"particles"),i=r.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d-array"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"depth"}}]});return this.pipeline=r.createRenderPipeline({label:"particles",layout:r.createPipelineLayout({bindGroupLayouts:[e,i]}),vertex:{module:s,entryPoint:"vs",buffers:[{arrayStride:64,stepMode:"instance",attributes:[{shaderLocation:0,offset:0,format:"float32x4"},{shaderLocation:1,offset:16,format:"float32x4"},{shaderLocation:2,offset:32,format:"float32x4"},{shaderLocation:3,offset:48,format:"float32x4"}]}]},fragment:{module:s,entryPoint:"fs",targets:[{format:t,blend:{color:{srcFactor:"one",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"triangle-strip"},depthStencil:{format:"depth32float",depthWriteEnabled:!1,depthCompare:"greater-equal"}}),this.bg=null,i}draw(e,t){!this.pipeline||this.count===0||((!this.bg||this.bgDepth!==t)&&(this.bg=this.dev.device.createBindGroup({layout:this.pipeline.getBindGroupLayout(1),entries:[{binding:0,resource:this.atlas.createView({dimension:"2d-array"})},{binding:1,resource:this.sampler},{binding:2,resource:t.createView()}]}),this.bgDepth=t),e.setPipeline(this.pipeline),e.setBindGroup(1,this.bg),e.setVertexBuffer(0,this.instanceBuffer),e.draw(4,this.count))}},kt=(a=>(a[a.MetalHit=0]="MetalHit",a[a.WoodHole=1]="WoodHole",a[a.ConcreteChip=2]="ConcreteChip",a[a.PaperHole=3]="PaperHole",a[a.LeadSplash=4]="LeadSplash",a[a.DirtMark=5]="DirtMark",a))(kt||{}),rs=ce+ue+ne+ke+qe+Se+`
struct Inst {
  @location(0) m0: vec4f, @location(1) m1: vec4f, @location(2) m2: vec4f, @location(3) m3: vec4f,
  @location(4) params: vec4f, // layer, tint rgb packed? -> x layer, yzw tint
};
struct VO {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,
  @location(1) world: vec3f,
  @location(2) n: vec3f,
  @location(3) t: vec3f,
  @location(4) params: vec4f,
  @location(5) viewDepth: f32,
};
@group(1) @binding(0) var albedoArr: texture_2d_array<f32>;
@group(1) @binding(1) var normalArr: texture_2d_array<f32>;
@group(1) @binding(2) var samp: sampler;
@vertex fn vs(@builtin(vertex_index) vi: u32, inst: Inst) -> VO {
  let c = vec2f(f32(vi & 1u), f32((vi >> 1u) & 1u)) - 0.5;
  let m = mat4x4f(inst.m0, inst.m1, inst.m2, inst.m3);
  let wp = m * vec4f(c.x, c.y, 0.0, 1.0);
  var o: VO;
  o.pos = frame.viewProj * wp;
  o.uv = c + 0.5;
  o.world = wp.xyz;
  o.n = normalize((m * vec4f(0.0, 0.0, 1.0, 0.0)).xyz);
  o.t = normalize((m * vec4f(1.0, 0.0, 0.0, 0.0)).xyz);
  o.params = inst.params;
  o.viewDepth = -(frame.view * wp).z;
  return o;
}
@fragment fn fs(i: VO) -> @location(0) vec4f {
  let layer = i32(i.params.x + 0.5);
  let alb = textureSample(albedoArr, samp, i.uv, layer);
  let nm = textureSample(normalArr, samp, i.uv, layer);
  let a = alb.a;
  if (a < 0.01) { discard; }
  let T = normalize(i.t - i.n * dot(i.t, i.n));
  let B = cross(i.n, T);
  let nt = nm.xyz * 2.0 - 1.0;
  var s: Surface;
  s.N = normalize(T * nt.x + B * nt.y + i.n * nt.z);
  s.pos = i.world;
  s.V = normalize(frame.camPos.xyz - i.world);
  s.NoV = max(dot(s.N, s.V), 1e-4);
  let rough = nm.a;
  s.perceptualRoughness = max(rough, 0.05);
  s.a = s.perceptualRoughness * s.perceptualRoughness;
  // decal albedo alpha channel encodes metalness in the upper half of values: bright metal ring on painted steel
  let metal = select(0.0, 1.0, layer == 0 || layer == 4) * smoothstep(0.55, 0.85, alb.r) ;
  let base = alb.rgb * i.params.yzw;
  s.metallic = metal;
  s.f0 = mix(vec3f(0.04), base, metal);
  s.albedo = base * (1.0 - metal);
  s.energyComp = vec3f(1.0);
  s.ao = 1.0;
  let noise = ign(i.pos.xy, frame.time.z);
  let vis = sunShadow(i.world, i.n, i.viewDepth, noise);
  var c = shadeLight(s, frame.sunDir.xyz, areaRoughness(s.a, frame.shadow.z)) * frame.sunColor.rgb * vis;
  c += shIrradiance(s.N) * s.albedo * frame.time.w;
  let R = reflect(-s.V, s.N);
  c += textureSampleLevel(envSpecular, linearClamp, R, s.perceptualRoughness * frame.envParams.x).rgb * s.f0 * frame.time.w * 0.8;
  let fog = heightFog(frame.camPos.xyz, i.world);
  c = c * fog.a + fog.rgb;
  return vec4f(min(c * exposure.current, vec3f(HALF_MAX)) * a, a);
}
`;function ss(n){let t=new Uint8Array(n*n*4*6),r=new Uint8Array(n*n*4*6),s=ie(99),i=Array.from({length:64},()=>s.next());for(let a=0;a<6;a++){let o=new Float32Array(n*n);for(let c=0;c<n;c++)for(let u=0;u<n;u++){let h=(u+.5)/n*2-1,p=(c+.5)/n*2-1,d=Math.hypot(h,p),f=Math.atan2(p,h),b=1+.18*(i[Math.floor((f+Math.PI)/(2*Math.PI)*63)]-.5)*2,v=[0,0,0],g=0,y=0,w=.6;switch(a){case 0:{let k=d<.14*b,A=d<.32*b,T=d<.62*b;k?(v=[.16,.16,.17],g=1,y=-.6,w=.55):A?(v=[.78,.79,.8],g=1,y=-.15+.15*Math.cos(d*30),w=.22):T&&(v=[.22,.21,.2],g=Math.min(1,(.62*b-d)*12),y=-.05,w=.5);break}case 1:{let k=d<.12*b,A=Math.abs(Math.sin(f*7+i[3]*6))>.6&&d<.45*b;k?(v=[.02,.015,.01],g=1,y=-1,w=.95):A?(v=[.75,.6,.42],g=Math.min(1,(.45*b-d)*6),y=.2,w=.75):d<.25*b&&(v=[.3,.2,.12],g=.8,y=-.2,w=.8);break}case 2:{d<.3*b?(v=[.62,.61,.58],g=1,y=-.8*(1-d/(.3*b)),w=.95):d<.75&&(v=[.58,.57,.54],g=Math.max(0,.6*(1-(d-.3)/.45)),y=0,w=.95);break}case 3:{d<.2?(v=[.01,.01,.01],g=1,y=-1,w=1):d<.27&&(v=[.25,.25,.26],g=.85,y=0,w=.8);break}case 4:{let k=Math.pow(Math.abs(Math.cos(f*9+i[7]*5)),4);d<.18?(v=[.55,.55,.57],g=1,y=.2,w=.35):d<(.3+.6*k)*b&&(v=[.5,.5,.52],g=Math.max(0,1-d)*.9,y=.05,w=.4);break}default:d<.7*b&&(v=[.12,.09,.06],g=Math.max(0,1-d/(.7*b))*.9,y=-.3*(1-d),w=1)}o[c*n+u]=y;let P=((a*n+c)*n+u)*4;t[P]=Math.round(Math.pow(v[0],1/2.2)*255),t[P+1]=Math.round(Math.pow(v[1],1/2.2)*255),t[P+2]=Math.round(Math.pow(v[2],1/2.2)*255),t[P+3]=Math.round(Math.max(0,Math.min(1,g))*255),r[P+3]=Math.round(w*255)}let l=6;for(let c=0;c<n;c++)for(let u=0;u<n;u++){let h=o[c*n+Math.min(n-1,u+1)]-o[c*n+Math.max(0,u-1)],p=o[Math.min(n-1,c+1)*n+u]-o[Math.max(0,c-1)*n+u],d=-h*l,f=p*l,b=1,v=Math.hypot(d,f,b);d/=v,f/=v,b/=v;let g=((a*n+c)*n+u)*4;r[g]=Math.round((d*.5+.5)*255),r[g+1]=Math.round((f*.5+.5)*255),r[g+2]=Math.round((b*.5+.5)*255)}}return{albedo:t,normal:r,layers:6}}var Xe=class{constructor(e){this.dev=e;this.buffer=e.createBuffer(this.capacity*80,GPUBufferUsage.VERTEX,"decals.inst");let t=128,r=ss(t),s=(i,a,o)=>{let l=e.device.createTexture({size:[t,t,r.layers],format:i,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:o});return e.device.queue.writeTexture({texture:l},a,{bytesPerRow:t*4,rowsPerImage:t},[t,t,r.layers]),l};this.albedo=s("rgba8unorm-srgb",r.albedo,"decal.albedo"),this.normal=s("rgba8unorm",r.normal,"decal.normal"),this.sampler=e.device.createSampler({magFilter:"linear",minFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"})}decals=[];maxDecals=512;buffer;capacity=512;data=new Float32Array(512*20);albedo;normal;sampler;pipeline=null;bg=null;count=0;tmp=M.create();add(e,t,r,s,i=null,a=[1,1,1],o=Math.random()*Math.PI*2){let l=m.normalize(m.create(),m.clone(r)),c=Math.abs(l[1])>.95?m.create(1,0,0):m.create(0,1,0),u=m.normalize(m.create(),m.cross(m.create(),c,l)),h=m.cross(m.create(),l,u),p=Math.cos(o),d=Math.sin(o),f=m.create(u[0]*p+h[0]*d,u[1]*p+h[1]*d,u[2]*p+h[2]*d),b=m.cross(m.create(),l,f),v=.0015,g=M.create();g[0]=f[0]*s,g[1]=f[1]*s,g[2]=f[2]*s,g[4]=b[0]*s,g[5]=b[1]*s,g[6]=b[2]*s,g[8]=l[0],g[9]=l[1],g[10]=l[2],g[12]=t[0]+l[0]*v,g[13]=t[1]+l[1]*v,g[14]=t[2]+l[2]*v;let y=g;if(i){let w=M.invert(M.create(),i.transform);y=M.multiply(M.create(),w,g)}this.decals.length>=this.maxDecals&&this.decals.shift(),this.decals.push({local:y,parent:i,kind:e,tint:a,age:0})}clear(){this.decals.length=0}upload(){let e=this.decals.length;e>this.capacity&&(this.capacity=Math.ceil(e*1.5),this.buffer.destroy(),this.buffer=this.dev.createBuffer(this.capacity*80,GPUBufferUsage.VERTEX,"decals.inst"),this.data=new Float32Array(this.capacity*20));for(let t=0;t<e;t++){let r=this.decals[t],s=r.parent?M.multiply(this.tmp,r.parent.transform,r.local):r.local;this.data.set(s,t*20),this.data[t*20+16]=r.kind,this.data[t*20+17]=r.tint[0],this.data[t*20+18]=r.tint[1],this.data[t*20+19]=r.tint[2]}return e&&this.dev.device.queue.writeBuffer(this.buffer,0,this.data,0,e*20),this.count=e,e}createPipeline(e,t){let r=this.dev.device,s=this.dev.shader(rs,"decals"),i=r.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d-array"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d-array"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,sampler:{}}]});this.pipeline=r.createRenderPipeline({label:"decals",layout:r.createPipelineLayout({bindGroupLayouts:[e,i]}),vertex:{module:s,entryPoint:"vs",buffers:[{arrayStride:80,stepMode:"instance",attributes:[0,1,2,3,4].map(a=>({shaderLocation:a,offset:a*16,format:"float32x4"}))}]},fragment:{module:s,entryPoint:"fs",targets:[{format:t,blend:{color:{srcFactor:"one",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"triangle-strip"},depthStencil:{format:"depth32float",depthWriteEnabled:!1,depthCompare:"greater-equal",depthBias:2,depthBiasSlopeScale:2}}),this.bg=r.createBindGroup({layout:i,entries:[{binding:0,resource:this.albedo.createView({dimension:"2d-array"})},{binding:1,resource:this.normal.createView({dimension:"2d-array"})},{binding:2,resource:this.sampler}]})}draw(e){!this.pipeline||!this.bg||this.count===0||(e.setPipeline(this.pipeline),e.setBindGroup(1,this.bg),e.setVertexBuffer(0,this.buffer),e.draw(4,this.count))}};var ae=256,Xt=`
struct Object {
  model: mat4x4f,
  prevModel: mat4x4f,
  normalMat: mat3x3f,
  params: vec4f,     // x: flags (1 = viewmodel), y: object id, z: dither fade, w: unused
};
@group(1) @binding(0) var<uniform> obj: Object;
@group(1) @binding(1) var<storage, read> joints: array<mat4x4f>;
@group(1) @binding(2) var<storage, read> prevJoints: array<mat4x4f>;
fn isViewmodel() -> bool { return (u32(obj.params.x + 0.5) & 1u) != 0u; }
fn isInstanced() -> bool { return (u32(obj.params.x + 0.5) & 4u) != 0u; }
/// Instanced meshes read their per-instance matrix from the (otherwise joint) storage buffer.
fn instanceMatrix(ii: u32) -> mat4x4f { return joints[ii]; }
`,is=`
struct VIn {
  @location(0) pos: vec3f,
  @location(1) nrm: vec3f,
  @location(2) tan: vec4f,
  @location(3) uv: vec2f,
};
struct VInSkin {
  @location(0) pos: vec3f,
  @location(1) nrm: vec3f,
  @location(2) tan: vec4f,
  @location(3) uv: vec2f,
  @location(4) joints: vec4u,
  @location(5) weights: vec4f,
};
struct VOut {
  @builtin(position) @invariant pos: vec4f,
  @location(0) worldPos: vec3f,
  @location(1) nrm: vec3f,
  @location(2) tan: vec4f,
  @location(3) uv: vec2f,
  @location(4) clipCur: vec4f,
  @location(5) clipPrev: vec4f,
  @location(6) viewDepth: f32,
};

fn finishVertex(localPos: vec3f, prevLocalPos: vec3f, n: vec3f, t: vec4f, uv: vec2f) -> VOut {
  var o: VOut;
  let wp = obj.model * vec4f(localPos, 1.0);
  let pwp = obj.prevModel * vec4f(prevLocalPos, 1.0);
  o.worldPos = wp.xyz;
  o.nrm = normalize(obj.normalMat * n);
  o.tan = vec4f(normalize((obj.model * vec4f(t.xyz, 0.0)).xyz), t.w);
  o.uv = uv;
  o.viewDepth = -(frame.view * wp).z;
  if (isViewmodel()) {
    var p = frame.vmViewProj * wp;
    // squeeze viewmodel depth into the nearest slice of reversed-Z so it never clips into the world
    p.z = p.w * frame.vmParams.x + p.z * (1.0 - frame.vmParams.x);
    o.pos = p;
    o.clipCur = frame.vmViewProjNoJitter * wp;
    o.clipPrev = frame.vmPrevViewProjNoJitter * pwp;
  } else {
    o.pos = frame.viewProj * wp;
    o.clipCur = frame.viewProjNoJitter * wp;
    o.clipPrev = frame.prevViewProjNoJitter * pwp;
  }
  return o;
}
`,Yt=ce+ue+ne+ke+qe+Se+$t+Ke+Xt+wt+is+`
// Vegetation wind: travelling gust waves along the wind direction + per-blade flutter, bending \u221D height\xB2.
// frame.extra2 = (wind x, wind z, bend per m/s at the tip, turbulence).
fn windOffset(wp: vec3f, h: f32, t: f32) -> vec3f {
  let wv = frame.extra2.xy;
  let speed = length(wv);
  if (speed < 1e-3 || h <= 0.0) { return vec3f(0.0); }
  let dir = wv / speed;
  let along = dot(wp.xz, dir);
  let gust = 0.55 + 0.45 * sin(along * 0.21 - t * speed * 0.21 + sin(dot(wp.xz, vec2f(0.031, 0.047)) * 6.0));
  let flutter = sin(t * (6.0 + speed) + wp.x * 3.7 + wp.z * 2.9) * frame.extra2.w;
  let side = sin(t * 2.3 + wp.x * 1.3 - wp.z * 1.7) * 0.35;
  let bend = h * h * speed * frame.extra2.z * (gust + flutter);
  let perp = vec2f(-dir.y, dir.x);
  let xz = dir * bend + perp * bend * side;
  return vec3f(xz.x, -0.5 * dot(xz, xz) / max(h, 0.05), xz.y);
}

@vertex fn vsStatic(v: VIn, @builtin(instance_index) ii: u32) -> VOut {
  var pos = v.pos;
  var nrm = v.nrm;
  var tan = v.tan;
  if (isInstanced()) {
    let m = instanceMatrix(ii);
    pos = (m * vec4f(v.pos, 1.0)).xyz;
    let m3 = mat3x3f(m[0].xyz, m[1].xyz, m[2].xyz);
    nrm = normalize(m3 * v.nrm);
    tan = vec4f(normalize(m3 * v.tan.xyz), v.tan.w);
  }
  if ((materialFlags() & 16u) != 0u) {
    // wind meshes: offset in world space (model assumed rigid)
    let wp = (obj.model * vec4f(pos, 1.0)).xyz;
    let h = v.uv.y;
    let o0 = windOffset(wp, h, frame.time.x);
    let o1 = windOffset(wp, h, frame.time.x - frame.time.y);
    return finishVertex(pos + o0, pos + o1, nrm, tan, v.uv);
  }
  return finishVertex(pos, pos, nrm, tan, v.uv);
}

@vertex fn vsSkinned(v: VInSkin) -> VOut {
  let w = v.weights;
  let m = joints[v.joints.x] * w.x + joints[v.joints.y] * w.y + joints[v.joints.z] * w.z + joints[v.joints.w] * w.w;
  let pm = prevJoints[v.joints.x] * w.x + prevJoints[v.joints.y] * w.y + prevJoints[v.joints.z] * w.z + prevJoints[v.joints.w] * w.w;
  let p = (m * vec4f(v.pos, 1.0)).xyz;
  let pp = (pm * vec4f(v.pos, 1.0)).xyz;
  let n = (m * vec4f(v.nrm, 0.0)).xyz;
  let t = vec4f((m * vec4f(v.tan.xyz, 0.0)).xyz, v.tan.w);
  return finishVertex(p, pp, n, t, v.uv);
}

struct PrepassOut {
  @location(0) normal: vec4f,    // world normal (xyz), roughness (w)
  @location(1) velocity: vec2f,  // uv-space motion (current - previous)
};

fn alphaTest(uv: vec2f) {
  if ((materialFlags() & 1u) != 0u) {
    let a = textureSample(baseColorTex, matSampler, uv).a * material.baseColor.a;
    if (a < material.params.x) { discard; }
  }
}

@fragment fn fsPrepass(i: VOut, @builtin(front_facing) ff: bool) -> PrepassOut {
  let uv = materialUV(i.uv, i.worldPos);
  alphaTest(uv);
  var o: PrepassOut;
  let ng = select(-normalize(i.nrm), normalize(i.nrm), ff);
  let rough = material.pbr.y * textureSample(ormTex, matSampler, uv).g;
  o.normal = vec4f(ng, rough);
  let a = i.clipCur.xy / i.clipCur.w;
  let b = i.clipPrev.xy / i.clipPrev.w;
  o.velocity = (a - b) * vec2f(0.5, -0.5);
  return o;
}

struct ShadeIn {
  worldPos: vec3f,
  N: vec3f,
  Ng: vec3f,
  base: vec4f,
  metallic: f32,
  rough: f32,
  ao: f32,
  emissive: vec3f,
  viewDepth: f32,
  fragCoord: vec2f,
};

fn surfaceFromInputs(i: VOut, ff: bool) -> ShadeIn {
  let uv = materialUV(i.uv, i.worldPos);
  var s: ShadeIn;
  s.worldPos = i.worldPos;
  s.base = textureSample(baseColorTex, matSampler, uv) * material.baseColor;
  if ((materialFlags() & 4u) != 0u) {
    // large surfaces: blend a second, rotated & scaled sample and a macro brightness variation to hide tiling
    let uv2 = vec2f(uv.x * 0.31 - uv.y * 0.17, uv.x * 0.17 + uv.y * 0.31) + vec2f(0.37, 0.71);
    let b2 = textureSample(baseColorTex, matSampler, uv2) * material.baseColor;
    let macroV = textureSample(baseColorTex, matSampler, uv * 0.043 + vec2f(0.11, 0.29)).g;
    s.base = vec4f(mix(s.base.rgb, b2.rgb, 0.45) * mix(0.8, 1.2, saturate(macroV * 2.5)), s.base.a);
  }
  let orm = textureSample(ormTex, matSampler, uv);
  s.metallic = saturate(material.pbr.x * orm.b);
  s.rough = saturate(material.pbr.y * orm.g);
  s.ao = mix(1.0, orm.r, material.pbr.w);
  var ng = normalize(i.nrm);
  if (!ff) { ng = -ng; }
  s.Ng = ng;
  var nt = textureSample(normalTex, matSampler, uv).xyz * 2.0 - 1.0;
  nt = vec3f(nt.xy * material.pbr.z, nt.z);
  let T0 = i.tan.xyz - ng * dot(ng, i.tan.xyz);
  if (dot(T0, T0) > 1e-8) {
    let T = normalize(T0);
    let B = cross(ng, T) * select(-1.0, 1.0, i.tan.w >= 0.0) * select(-1.0, 1.0, ff);
    s.N = normalize(T * nt.x + B * nt.y + ng * max(nt.z, 1e-3));
  } else {
    s.N = ng;
  }
  // Specular anti-aliasing (Tokuyasu/Kaplanyan): widen roughness by screen-space normal variance
  let dn = fwidth(s.N);
  let variance = 0.25 * dot(dn, dn);
  let kernelRough = min(2.0 * variance, 0.18);
  let a = s.rough * s.rough;
  s.rough = sqrt(sqrt(saturate(a * a + kernelRough)));
  // curvature-driven edge wear: convex, tightly-rounded edges lose their finish (handling wear)
  if (material.wear.x > 0.0) {
    let n0 = normalize(i.nrm);
    let dnx = dpdx(n0); let dny = dpdy(n0);
    let dpx = dpdx(i.worldPos); let dpy = dpdy(i.worldPos);
    let curv = (length(dnx) + length(dny)) / max(length(dpx) + length(dpy), 1e-7);  // \u2248 1 / radius (1/m)
    let convex = dot(dnx, dpx) + dot(dny, dpy);
    let grain = fract(sin(dot(floor(i.worldPos * 900.0), vec3f(12.9898, 78.233, 37.719))) * 43758.5453);
    let m = saturate(curv * material.wear.y - 0.35) * select(0.0, 1.0, convex > 0.0) * material.wear.x * (0.35 + 0.9 * grain);
    if (s.metallic > 0.5) {
      s.base = vec4f(mix(s.base.rgb, vec3f(0.56, 0.56, 0.58), m), s.base.a);
      s.metallic = mix(s.metallic, 1.0, m);
      s.rough = mix(s.rough, 0.3, m);
    } else {
      s.base = vec4f(s.base.rgb * (1.0 + 1.1 * m) + vec3f(0.02 * m), s.base.a);
      s.rough = mix(s.rough, 0.8, m);
    }
  }
  s.emissive = textureSample(emissiveTex, matSampler, uv).rgb * material.emissive.rgb * material.emissive.w;
  s.viewDepth = i.viewDepth;
  s.fragCoord = i.pos.xy;
  return s;
}

fn shade(si: ShadeIn) -> vec3f {
  if ((materialFlags() & 2u) != 0u) {
    // unlit: base colour as luminance (emissive luminance scales it if set)
    let L = select(1.0, material.emissive.w, material.emissive.w > 0.0);
    return si.base.rgb * L;
  }
  var s: Surface;
  s.pos = si.worldPos;
  s.N = si.N;
  s.V = normalize(frame.camPos.xyz - si.worldPos);
  if (isViewmodel()) { s.V = normalize(frame.camPos.xyz - si.worldPos); }
  s.NoV = max(dot(s.N, s.V), 1e-4);
  s.perceptualRoughness = max(si.rough, 0.045);
  s.a = s.perceptualRoughness * s.perceptualRoughness;
  s.metallic = si.metallic;
  let dielectricF0 = 0.16 * material.params.y * material.params.y;
  s.f0 = mix(vec3f(dielectricF0), si.base.rgb, si.metallic);
  s.albedo = si.base.rgb * (1.0 - si.metallic);
  let dfg = textureSampleLevel(brdfLut, linearClamp, vec2f(s.NoV, s.perceptualRoughness), 0.0).rg;
  s.energyComp = 1.0 + s.f0 * (1.0 / max(dfg.x + dfg.y, 1e-3) - 1.0);

  let noise = ign(si.fragCoord, frame.time.z);
  var color = vec3f(0.0);

  // ---- sun (sphere-light roughness widening by the solar disk)
  let L = frame.sunDir.xyz;
  let foliage = (materialFlags() & 8u) != 0u;
  if (frame.sunColor.r + frame.sunColor.g + frame.sunColor.b > 0.0) {
    let vis = sunShadow(si.worldPos, si.Ng, si.viewDepth, noise) * cloudShadow(si.worldPos);
    let sunA = areaRoughness(s.a, frame.shadow.z);
    color += shadeLight(s, L, sunA) * frame.sunColor.rgb * vis;
    if (foliage) {
      // thin leaf/blade: light transmitted through from behind (diffuse transmission + forward scatter)
      let back = saturate(-dot(si.Ng, L));
      let fwd = pow(saturate(dot(-s.V, L)), 6.0);
      let trans = s.albedo * vec3f(1.15, 1.25, 0.6) * (0.35 * back + 0.5 * fwd) * INV_PI;
      color += trans * frame.sunColor.rgb * vis;
    }
  }

  // ---- punctual lights (photometric: candela, inverse-square, smooth range window)
  let lc = u32(frame.misc.x);
  for (var li = 0u; li < lc; li++) {
    let lt = lights[li];
    let toL = lt.posRange.xyz - si.worldPos;
    let d2 = max(dot(toL, toL), 1e-4);
    let d = sqrt(d2);
    let Ld = toL / d;
    let f = d / lt.posRange.w;
    let win = saturate(1.0 - f * f * f * f);
    var E = lt.color.rgb * win * win / d2;
    if (lt.params.z > 0.5) {
      let cd = dot(-Ld, lt.dirCos.xyz);
      E *= smoothstep(lt.dirCos.w, lt.params.x, cd);
    }
    color += shadeLight(s, Ld, areaRoughness(s.a, lt.params.y / d)) * E;
  }

  // ---- ambient: sky irradiance (SH) + prefiltered specular, occluded by sky visibility + AO
  let px = vec2i(si.fragCoord);
  let screenAO = mix(1.0, textureLoad(aoTex, px, 0).r, frame.misc.z);
  let ao = min(si.ao, screenAO);
  let skyV = sampleSkyVisibility(si.worldPos + si.Ng * 0.15);
  let up = saturate(0.5 + 0.5 * s.N.y);
  // occluded sky directions still see lit surfaces (bounce): keep a fraction of the ambient there
  let skyVb = skyV + (1.0 - skyV) * frame.extra.x;
  let diffOcc = mix(1.0, skyVb, up);
  let R = reflect(-s.V, s.N);
  let specOccSky = mix(1.0, skyVb, saturate(0.5 + 0.5 * R.y));
  let ibl = frame.time.w;
  // where the sky is blocked (roofs, overhangs) the blocked directions mostly see sunlit ground and the
  // ground-lit underside of the blocker: approximate that one-bounce radiance from the sun illuminance
  let groundL = frame.sunColor.rgb * saturate(frame.sunDir.y) * frame.envParams.z * (1.0 / PI);
  let bounce = groundL * (1.0 - skyV) * frame.extra.y;
  // baked GI probes (path-traced sky occlusion + multi-bounce) replace the analytic fill inside their volume
  var ambE = shIrradiance(s.N) * diffOcc + bounce;
  let probe = sampleProbes(si.worldPos, si.Ng, s.N, s.V);
  ambE = mix(ambE, probe.rgb, probe.a);
  // first-person gear: a fill on the ambient term only (direct light and shadows stay physical)
  if (isViewmodel()) { ambE *= frame.extra.z; }
  let diffuse = ambE * s.albedo * multiBounceAO(ao, s.albedo);
  let lod = s.perceptualRoughness * frame.envParams.x;
  let pre = textureSampleLevel(envSpecular, linearClamp, R, lod).rgb;
  // horizon occlusion: reflections that dip below the geometric surface are blocked
  let horizon = saturate(1.0 + 1.2 * dot(R, si.Ng));
  let so = mix(1.0, specularOcclusion(s.NoV, ao, s.a), frame.misc.y) * horizon * horizon;
  let spec = pre * (s.f0 * dfg.x + dfg.y) * s.energyComp * so * specOccSky;
  color += (diffuse + spec) * ibl;
  color += si.emissive;
  // debug views that need shading internals (7 sky visibility, 8 ambient diffuse, 9 direct+emissive only)
  let dbg = u32(frame.envParams.w + 0.5);
  if (dbg == 7u) { return vec3f(skyV) / max(exposure.current, 1e-20); }
  if (dbg == 8u) { return diffuse * ibl; }
  if (dbg == 9u) { return color - (diffuse + spec) * ibl; }

  // ---- aerial perspective (height fog)
  let fog = heightFog(frame.camPos.xyz, si.worldPos);
  color = color * fog.a + fog.rgb;
  return color;
}

@fragment fn fsMain(i: VOut, @builtin(front_facing) ff: bool) -> @location(0) vec4f {
  let si = surfaceFromInputs(i, ff);
  let c = shade(si) * exposure.current;
  return vec4f(min(c, vec3f(HALF_MAX)), 1.0);
}

@fragment fn fsTransparent(i: VOut, @builtin(front_facing) ff: bool) -> @location(0) vec4f {
  let si = surfaceFromInputs(i, ff);
  let c = shade(si) * exposure.current;
  let a = si.base.a;
  return vec4f(min(c, vec3f(HALF_MAX)) * a, a); // premultiplied
}
`,Qt=Xt+wt+`
struct Cascade { viewProj: mat4x4f };
@group(0) @binding(0) var<uniform> cascade: Cascade;
struct SOut { @builtin(position) pos: vec4f, @location(0) uv: vec2f, @location(1) wp: vec3f };
@vertex fn vsShadow(@location(0) pos: vec3f, @location(3) uv: vec2f, @builtin(instance_index) ii: u32) -> SOut {
  var o: SOut;
  var lp = vec4f(pos, 1.0);
  if (isInstanced()) { lp = instanceMatrix(ii) * lp; }
  let wp = obj.model * lp;
  o.pos = cascade.viewProj * wp;
  o.uv = uv;
  o.wp = wp.xyz;
  return o;
}
@vertex fn vsShadowSkinned(@location(0) pos: vec3f, @location(3) uv: vec2f, @location(4) j: vec4u, @location(5) w: vec4f) -> SOut {
  var o: SOut;
  let m = joints[j.x] * w.x + joints[j.y] * w.y + joints[j.z] * w.z + joints[j.w] * w.w;
  let wp = obj.model * (m * vec4f(pos, 1.0));
  o.pos = cascade.viewProj * wp;
  o.uv = uv;
  o.wp = wp.xyz;
  return o;
}
@fragment fn fsShadowMask(i: SOut) {
  let uv = materialUV(i.uv, i.wp);
  let a = textureSample(baseColorTex, matSampler, uv).a * material.baseColor.a;
  if (a < material.params.x) { discard; }
}
`;var Jt=`
struct FOut { @builtin(position) pos: vec4f, @location(0) uv: vec2f };
@vertex fn vsFull(@builtin(vertex_index) i: u32) -> FOut {
  let p = vec2f(f32((i << 1u) & 2u), f32(i & 2u));
  var o: FOut;
  o.pos = vec4f(p * 2.0 - 1.0, 0.0, 1.0);
  o.uv = vec2f(p.x, 1.0 - p.y);
  return o;
}
`,Zt=ce+ue+ne+Ke+Jt+`
@fragment fn fsSky(i: FOut) -> @location(0) vec4f {
  let ndc = vec2f(i.uv.x * 2.0 - 1.0, 1.0 - i.uv.y * 2.0);
  let vp = frame.invProj * vec4f(ndc, 1.0, 1.0);
  let vdir = normalize(vp.xyz / vp.w);
  let dir = normalize((frame.invView * vec4f(vdir, 0.0)).xyz);
  var L = textureSampleLevel(skyCube, linearClamp, dir, 0.0).rgb * frame.envParams.y;
  // solar disk with limb darkening (Neckel & Labs-ish quadratic law)
  let cosA = dot(dir, frame.sunDir.xyz);
  let cosR = frame.sunDir.w;
  let angR = acos(clamp(cosR, -1.0, 1.0));
  let ang = acos(clamp(cosA, -1.0, 1.0));
  if (ang < angR * 1.15) {
    let x = saturate(ang / angR);
    let mu = sqrt(max(1.0 - x * x, 0.0));
    let limb = 1.0 - 0.6 * (1.0 - mu) - 0.2 * (1.0 - mu) * (1.0 - mu);
    let solidAngle = PI * angR * angR;
    let edge = 1.0 - smoothstep(angR * 0.97, angR * 1.15, ang);
    L += frame.sunColor.rgb / solidAngle * limb / 0.8 * edge * frame.sunColor.w;
  }
  // ---- cloud deck: single-scattering-ish lighting (forward silver lining + powder darkening + sky ambient)
  if (frame.cloud2.w > 0.5 && dir.y > 0.0) {
    let t = (frame.cloud.z - frame.camPos.y) / dir.y;
    let p = frame.camPos.xz + dir.xz * t;
    let d = cloudDensity(p, 6);
    if (d > 0.001) {
      let tau = d * frame.cloud.y * (1.0 + 2.0 / max(dir.y, 0.08));   // slant path through the deck
      let alpha = 1.0 - exp(-tau);
      // light reaching this part of the cloud: march towards the sun through the deck
      let sp = p + frame.sunDir.xz / max(frame.sunDir.y, 0.15) * frame.cloud.w * 0.35;
      let ds = cloudDensity(sp, 4);
      let selfShadow = exp(-ds * frame.cloud.y * 2.5);
      let powder = 1.0 - exp(-tau * 2.0);
      let g = 0.65;
      let ph = (1.0 - g * g) / pow(1.0 + g * g - 2.0 * g * cosA, 1.5) * (0.25 * INV_PI);
      let sunL = frame.sunColor.rgb * (INV_PI * 0.55 * powder * (0.35 + 0.65 * selfShadow) + ph * 0.8 * selfShadow);
      let amb = textureSampleLevel(skyCube, linearClamp, vec3f(0.0, 1.0, 0.0), 3.0).rgb * frame.envParams.y * 0.9;
      var cl = sunL + amb * (0.6 + 0.4 * (1.0 - d));
      // aerial perspective: distant clouds fade into the sky
      let fade = exp(-t / 45000.0);
      L = mix(L, cl, alpha * fade);
    }
  }
  return vec4f(min(L * exposure.current, vec3f(HALF_MAX)), 1.0);
}
`,er=`
struct P {
  invProj: mat4x4f,
  view: mat4x4f,
  size: vec4f,       // w, h, 1/w, 1/h
  params: vec4f,     // radius (m), falloff (0..1), power, frame index
  proj: vec4f,       // proj[0][0], proj[1][1], steps, slices
};
@group(0) @binding(0) var<uniform> U: P;
@group(0) @binding(1) var depthTex: texture_depth_2d;
@group(0) @binding(2) var normalTex: texture_2d<f32>;
@group(0) @binding(3) var outAO: texture_storage_2d<r32float, write>;
const PI: f32 = 3.14159265359;

fn viewPos(px: vec2i) -> vec3f {
  let d = textureLoad(depthTex, px, 0);
  let uv = (vec2f(px) + 0.5) * U.size.zw;
  let ndc = vec2f(uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0);
  let v = U.invProj * vec4f(ndc, max(d, 1e-7), 1.0);
  return v.xyz / v.w;
}
fn ign(p: vec2f, f: f32) -> f32 {
  let q = p + 5.588238 * (f % 64.0);
  return fract(52.9829189 * fract(0.06711056 * q.x + 0.00583715 * q.y));
}

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let sz = vec2i(U.size.xy);
  let px = vec2i(id.xy);
  if (px.x >= sz.x || px.y >= sz.y) { return; }
  let d0 = textureLoad(depthTex, px, 0);
  if (d0 <= 0.0) { textureStore(outAO, px, vec4f(1.0)); return; }
  let P = viewPos(px);
  let V = normalize(-P);
  let Nw = textureLoad(normalTex, px, 0).xyz;
  let N = normalize((U.view * vec4f(Nw, 0.0)).xyz);
  let radius = U.params.x;
  let radiusPx = radius * U.proj.y * 0.5 * U.size.y / max(-P.z, 1e-3);
  if (radiusPx < 1.0) { textureStore(outAO, px, vec4f(1.0)); return; }
  let steps = i32(U.proj.z);
  let slices = i32(U.proj.w);
  let noise = ign(vec2f(px), U.params.w);
  let noise2 = fract(noise * 7.13 + 0.37);
  var vis = 0.0;
  let stepPx = min(radiusPx, 96.0) / f32(steps);
  for (var s = 0; s < slices; s++) {
    let phi = (f32(s) + noise) * PI / f32(slices);
    let dir = vec2f(cos(phi), sin(phi));
    let dirV = vec3f(dir.x, -dir.y, 0.0); // screen y down -> view y up
    let ortho = dirV - V * dot(dirV, V);
    let axis = normalize(cross(ortho, V));
    let projN = N - axis * dot(N, axis);
    let projLen = length(projN);
    let cosN = clamp(dot(projN / max(projLen, 1e-4), V), -1.0, 1.0);
    let n = sign(dot(projN, ortho) + 1e-6) * acos(cosN);
    var h = vec2f(-1.0, -1.0);
    for (var side = 0; side < 2; side++) {
      let sdir = select(-dir, dir, side == 0);
      var best = -1.0;
      for (var k = 0; k < steps; k++) {
        let t = (f32(k) + noise2) * stepPx + 1.0;
        let sp = vec2i(vec2f(px) + sdir * t);
        if (sp.x < 0 || sp.y < 0 || sp.x >= sz.x || sp.y >= sz.y) { break; }
        let S = viewPos(sp);
        let H = S - P;
        let dist = length(H);
        let c = dot(H / max(dist, 1e-5), V);
        let w = saturate((radius - dist) / (radius * max(U.params.y, 0.05)));
        best = max(best, mix(-1.0, c, w));
      }
      if (side == 0) { h.x = best; } else { h.y = best; }
    }
    let h0 = -acos(clamp(h.y, -1.0, 1.0));
    let h1 = acos(clamp(h.x, -1.0, 1.0));
    let hh0 = n + max(h0 - n, -PI * 0.5);
    let hh1 = n + min(h1 - n, PI * 0.5);
    let sinN = sin(n);
    let a0 = 0.25 * (-cos(2.0 * hh0 - n) + cosN + 2.0 * hh0 * sinN);
    let a1 = 0.25 * (-cos(2.0 * hh1 - n) + cosN + 2.0 * hh1 * sinN);
    vis += projLen * (a0 + a1);
  }
  vis = saturate(vis / f32(slices));
  textureStore(outAO, px, vec4f(pow(vis, U.params.z)));
}
fn saturate(x: f32) -> f32 { return clamp(x, 0.0, 1.0); }
`,tr=`
@group(0) @binding(0) var src: texture_2d<f32>;
@group(0) @binding(1) var depthTex: texture_depth_2d;
@group(0) @binding(2) var dst: texture_storage_2d<r32float, write>;
@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let sz = vec2i(textureDimensions(src));
  let px = vec2i(id.xy);
  if (px.x >= sz.x || px.y >= sz.y) { return; }
  let d0 = textureLoad(depthTex, px, 0);
  var sum = 0.0;
  var w = 0.0;
  for (var y = -2; y <= 2; y++) {
    for (var x = -2; x <= 2; x++) {
      let q = clamp(px + vec2i(x, y), vec2i(0), sz - 1);
      let d = textureLoad(depthTex, q, 0);
      let wd = exp(-abs(d - d0) / max(d0 * 0.05, 1e-6));
      let ws = exp(-f32(x * x + y * y) / 8.0);
      sum += textureLoad(src, q, 0).r * wd * ws;
      w += wd * ws;
    }
  }
  textureStore(dst, px, vec4f(sum / max(w, 1e-4)));
}
`,rr=`
struct P {
  invViewProj: mat4x4f,       // unjittered
  prevViewProj: mat4x4f,      // unjittered
  size: vec4f,                // w, h, 1/w, 1/h
  params: vec4f,              // feedback min, feedback max, velocity weight, reset (1 = no history)
  jitter: vec4f,              // current jitter uv
};
struct Exposure { current: f32, ev100: f32, targetEv100: f32, previous: f32 };
@group(0) @binding(0) var<uniform> U: P;
@group(0) @binding(1) var colorTex: texture_2d<f32>;
@group(0) @binding(2) var historyTex: texture_2d<f32>;
@group(0) @binding(3) var velocityTex: texture_2d<f32>;
@group(0) @binding(4) var depthTex: texture_depth_2d;
@group(0) @binding(5) var samp: sampler;
@group(0) @binding(6) var outTex: texture_storage_2d<rgba16float, write>;
@group(0) @binding(7) var<storage, read> exposure: Exposure;

fn rgb2ycocg(c: vec3f) -> vec3f { return vec3f(0.25 * c.r + 0.5 * c.g + 0.25 * c.b, 0.5 * c.r - 0.5 * c.b, -0.25 * c.r + 0.5 * c.g - 0.25 * c.b); }
fn ycocg2rgb(c: vec3f) -> vec3f { return vec3f(c.x + c.y - c.z, c.x + c.z, c.x - c.y - c.z); }
fn tmap(c: vec3f) -> vec3f { return c / (1.0 + max(c.r, max(c.g, c.b))); }
fn itmap(c: vec3f) -> vec3f { return c / max(1.0 - max(c.r, max(c.g, c.b)), 1e-4); }

/// 5-tap Catmull-Rom history sample (sharp, reduces TAA blur).
fn sampleCatmullRom(uv: vec2f) -> vec3f {
  let sz = U.size.xy;
  let pos = uv * sz;
  let c = floor(pos - 0.5) + 0.5;
  let f = pos - c;
  let w0 = f * (-0.5 + f * (1.0 - 0.5 * f));
  let w1 = 1.0 + f * f * (-2.5 + 1.5 * f);
  let w2 = f * (0.5 + f * (2.0 - 1.5 * f));
  let w3 = f * f * (-0.5 + 0.5 * f);
  let w12 = w1 + w2;
  let o12 = w2 / w12;
  let t0 = (c - 1.0) * U.size.zw;
  let t3 = (c + 2.0) * U.size.zw;
  let t12 = (c + o12) * U.size.zw;
  var r = vec3f(0.0);
  r += textureSampleLevel(historyTex, samp, vec2f(t12.x, t0.y), 0.0).rgb * w12.x * w0.y;
  r += textureSampleLevel(historyTex, samp, vec2f(t0.x, t12.y), 0.0).rgb * w0.x * w12.y;
  r += textureSampleLevel(historyTex, samp, vec2f(t12.x, t12.y), 0.0).rgb * w12.x * w12.y;
  r += textureSampleLevel(historyTex, samp, vec2f(t3.x, t12.y), 0.0).rgb * w3.x * w12.y;
  r += textureSampleLevel(historyTex, samp, vec2f(t12.x, t3.y), 0.0).rgb * w12.x * w3.y;
  let ws = w12.x * w0.y + w0.x * w12.y + w12.x * w12.y + w3.x * w12.y + w12.x * w3.y;
  return max(r / ws, vec3f(0.0));
}

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let sz = vec2i(U.size.xy);
  let px = vec2i(id.xy);
  if (px.x >= sz.x || px.y >= sz.y) { return; }
  let uv = (vec2f(px) + 0.5) * U.size.zw;
  let cur = textureLoad(colorTex, px, 0).rgb;
  // neighbourhood statistics (YCoCg, tonemapped) + closest depth for velocity dilation
  var m1 = vec3f(0.0);
  var m2 = vec3f(0.0);
  var closest = -1.0;
  var cpx = px;
  var cmin = vec3f(1e9);
  var cmax = vec3f(-1e9);
  for (var y = -1; y <= 1; y++) {
    for (var x = -1; x <= 1; x++) {
      let q = clamp(px + vec2i(x, y), vec2i(0), sz - 1);
      let c = rgb2ycocg(tmap(textureLoad(colorTex, q, 0).rgb));
      m1 += c; m2 += c * c;
      cmin = min(cmin, c); cmax = max(cmax, c);
      let d = textureLoad(depthTex, q, 0);
      if (d > closest) { closest = d; cpx = q; }
    }
  }
  var vel = textureLoad(velocityTex, cpx, 0).xy;
  if (closest <= 0.0) {
    // background: reproject a point at (near) infinity
    let ndc = vec2f(uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0);
    let wp = U.invViewProj * vec4f(ndc, 1e-5, 1.0);
    let pc = U.prevViewProj * vec4f(wp.xyz / wp.w, 1.0);
    let prevUV = vec2f(pc.x / pc.w * 0.5 + 0.5, 0.5 - pc.y / pc.w * 0.5);
    vel = uv - prevUV;
  }
  let prevUV = uv - vel;
  let mean = m1 / 9.0;
  let sigma = sqrt(max(m2 / 9.0 - mean * mean, vec3f(0.0)));
  let gamma = 1.0;
  let bmin = max(mean - gamma * sigma, cmin);
  let bmax = min(mean + gamma * sigma, cmax);
  let curT = rgb2ycocg(tmap(cur));
  let offscreen = any(prevUV < vec2f(0.0)) || any(prevUV > vec2f(1.0));
  if (offscreen || U.params.w > 0.5) {
    textureStore(outTex, px, vec4f(cur, 1.0));
    return;
  }
  var hist = sampleCatmullRom(prevUV) * (exposure.current / max(exposure.previous, 1e-20));
  var histT = rgb2ycocg(tmap(hist));
  // clip towards the mean (AABB clip)
  let center = 0.5 * (bmax + bmin);
  let ext = 0.5 * (bmax - bmin) + 1e-4;
  let v = histT - center;
  let units = abs(v / ext);
  let mx = max(units.x, max(units.y, units.z));
  if (mx > 1.0) { histT = center + v / mx; }
  let speed = length(vel * U.size.xy);
  let fb = mix(U.params.y, U.params.x, saturate(speed * U.params.z));
  // luminance-weighted blend (anti-flicker)
  let wc = (1.0 - fb) / (1.0 + curT.x);
  let wh = fb / (1.0 + histT.x);
  let outT = (curT * wc + histT * wh) / (wc + wh);
  let outC = itmap(ycocg2rgb(outT));
  textureStore(outTex, px, vec4f(max(outC, vec3f(0.0)), 1.0));
}
fn saturate(x: f32) -> f32 { return clamp(x, 0.0, 1.0); }
`,sr=`
struct P { size: vec4f, params: vec4f /* scale, max px, samples, enabled */ };
@group(0) @binding(0) var<uniform> U: P;
@group(0) @binding(1) var src: texture_2d<f32>;
@group(0) @binding(2) var velocityTex: texture_2d<f32>;
@group(0) @binding(3) var depthTex: texture_depth_2d;
@group(0) @binding(4) var samp: sampler;
@group(0) @binding(5) var dst: texture_storage_2d<rgba16float, write>;
@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let sz = vec2i(U.size.xy);
  let px = vec2i(id.xy);
  if (px.x >= sz.x || px.y >= sz.y) { return; }
  let c0 = textureLoad(src, px, 0);
  if (U.params.w < 0.5) { textureStore(dst, px, c0); return; }
  let uv = (vec2f(px) + 0.5) * U.size.zw;
  var v = textureLoad(velocityTex, px, 0).xy * U.params.x;
  let vpx = v * U.size.xy;
  let len = length(vpx);
  if (len < 0.5) { textureStore(dst, px, c0); return; }
  if (len > U.params.y) { v *= U.params.y / len; }
  let n = i32(U.params.z);
  let d0 = textureLoad(depthTex, px, 0);
  var acc = c0.rgb;
  var w = 1.0;
  let jitter = fract(52.9829189 * fract(0.06711056 * f32(px.x) + 0.00583715 * f32(px.y))) - 0.5;
  for (var i = 0; i < n; i++) {
    let t = ((f32(i) + 0.5 + jitter) / f32(n) - 0.5);
    let suv = uv + v * t;
    let sp = vec2i(clamp(suv * U.size.xy, vec2f(0.0), U.size.xy - 1.0));
    let ds = textureLoad(depthTex, sp, 0);
    // don't smear background over foreground (reversed-Z: larger = closer)
    let wgt = select(1.0, 0.25, ds < d0 * 0.9);
    acc += textureSampleLevel(src, samp, suv, 0.0).rgb * wgt;
    w += wgt;
  }
  textureStore(dst, px, vec4f(acc / w, 1.0));
}
`,ir=`
struct P { srcTexel: vec4f, params: vec4f /* first pass (karis), clamp */ };
@group(0) @binding(0) var<uniform> U: P;
@group(0) @binding(1) var src: texture_2d<f32>;
@group(0) @binding(2) var samp: sampler;
@group(0) @binding(3) var dst: texture_storage_2d<rgba16float, write>;
fn karis(c: vec3f) -> f32 { return 1.0 / (1.0 + dot(c, vec3f(0.2126, 0.7152, 0.0722)) * 0.25); }
@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let sz = textureDimensions(dst);
  if (id.x >= sz.x || id.y >= sz.y) { return; }
  let uv = (vec2f(id.xy) + 0.5) / vec2f(sz);
  let t = U.srcTexel.xy;
  let a = textureSampleLevel(src, samp, uv + t * vec2f(-2.0, -2.0), 0.0).rgb;
  let b = textureSampleLevel(src, samp, uv + t * vec2f(0.0, -2.0), 0.0).rgb;
  let c = textureSampleLevel(src, samp, uv + t * vec2f(2.0, -2.0), 0.0).rgb;
  let d = textureSampleLevel(src, samp, uv + t * vec2f(-2.0, 0.0), 0.0).rgb;
  let e = textureSampleLevel(src, samp, uv, 0.0).rgb;
  let f = textureSampleLevel(src, samp, uv + t * vec2f(2.0, 0.0), 0.0).rgb;
  let g = textureSampleLevel(src, samp, uv + t * vec2f(-2.0, 2.0), 0.0).rgb;
  let h = textureSampleLevel(src, samp, uv + t * vec2f(0.0, 2.0), 0.0).rgb;
  let i = textureSampleLevel(src, samp, uv + t * vec2f(2.0, 2.0), 0.0).rgb;
  let j = textureSampleLevel(src, samp, uv + t * vec2f(-1.0, -1.0), 0.0).rgb;
  let k = textureSampleLevel(src, samp, uv + t * vec2f(1.0, -1.0), 0.0).rgb;
  let l = textureSampleLevel(src, samp, uv + t * vec2f(-1.0, 1.0), 0.0).rgb;
  let m = textureSampleLevel(src, samp, uv + t * vec2f(1.0, 1.0), 0.0).rgb;
  var o: vec3f;
  if (U.params.x > 0.5) {
    // Karis average on the first downsample kills fireflies (sun glints)
    let g0 = (a + b + d + e) * 0.25; let g1 = (b + c + e + f) * 0.25;
    let g2 = (d + e + g + h) * 0.25; let g3 = (e + f + h + i) * 0.25; let g4 = (j + k + l + m) * 0.25;
    let w0 = karis(g0); let w1 = karis(g1); let w2 = karis(g2); let w3 = karis(g3); let w4 = karis(g4);
    o = (g0 * w0 * 0.125 + g1 * w1 * 0.125 + g2 * w2 * 0.125 + g3 * w3 * 0.125 + g4 * w4 * 0.5) / (w0 * 0.125 + w1 * 0.125 + w2 * 0.125 + w3 * 0.125 + w4 * 0.5);
  } else {
    o = e * 0.125 + (a + c + g + i) * 0.03125 + (b + d + f + h) * 0.0625 + (j + k + l + m) * 0.125;
  }
  textureStore(dst, vec2i(id.xy), vec4f(min(o, vec3f(U.params.y)), 1.0));
}
`,nr=`
struct P { srcTexel: vec4f, params: vec4f /* radius, unused */ };
@group(0) @binding(0) var<uniform> U: P;
@group(0) @binding(1) var low: texture_2d<f32>;   // upsampled chain (smaller)
@group(0) @binding(2) var cur: texture_2d<f32>;   // downsample chain at this level
@group(0) @binding(3) var samp: sampler;
@group(0) @binding(4) var dst: texture_storage_2d<rgba16float, write>;
@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let sz = textureDimensions(dst);
  if (id.x >= sz.x || id.y >= sz.y) { return; }
  let uv = (vec2f(id.xy) + 0.5) / vec2f(sz);
  let t = U.srcTexel.xy * U.params.x;
  var s = textureSampleLevel(low, samp, uv, 0.0).rgb * 4.0;
  s += (textureSampleLevel(low, samp, uv + vec2f(-t.x, 0.0), 0.0).rgb + textureSampleLevel(low, samp, uv + vec2f(t.x, 0.0), 0.0).rgb +
        textureSampleLevel(low, samp, uv + vec2f(0.0, -t.y), 0.0).rgb + textureSampleLevel(low, samp, uv + vec2f(0.0, t.y), 0.0).rgb) * 2.0;
  s += textureSampleLevel(low, samp, uv - t, 0.0).rgb + textureSampleLevel(low, samp, uv + t, 0.0).rgb +
       textureSampleLevel(low, samp, uv + vec2f(t.x, -t.y), 0.0).rgb + textureSampleLevel(low, samp, uv + vec2f(-t.x, t.y), 0.0).rgb;
  let c = textureLoad(cur, vec2i(id.xy), 0).rgb;
  textureStore(dst, vec2i(id.xy), vec4f(c + s / 16.0, 1.0));
}
`,ar=`
struct P { size: vec4f, params: vec4f /* logMin, logRange, centre weight, unused */ };
struct Exposure { current: f32, ev100: f32, targetEv100: f32, previous: f32 };
@group(0) @binding(0) var<uniform> U: P;
@group(0) @binding(1) var src: texture_2d<f32>;
@group(0) @binding(2) var<storage, read_write> bins: array<atomic<u32>, 256>;
@group(0) @binding(3) var<storage, read> exposure: Exposure;
var<workgroup> local: array<atomic<u32>, 256>;
@compute @workgroup_size(16, 16)
fn main(@builtin(global_invocation_id) gid: vec3u, @builtin(local_invocation_index) li: u32) {
  atomicStore(&local[li], 0u);
  workgroupBarrier();
  // sample every 2nd pixel
  let px = vec2i(gid.xy) * 2;
  let sz = vec2i(U.size.xy);
  if (px.x < sz.x && px.y < sz.y) {
    let c = textureLoad(src, px, 0).rgb / max(exposure.current, 1e-20);
    let lum = dot(c, vec3f(0.2126, 0.7152, 0.0722));
    if (lum > 1e-6) {
      let t = clamp((log2(lum) - U.params.x) / U.params.y, 0.0, 1.0);
      let bin = u32(t * 254.0) + 1u;
      // centre-weighted metering
      let uv = (vec2f(px) + 0.5) / U.size.xy - 0.5;
      let wgt = u32(mix(1.0, 4.0, exp(-dot(uv, uv) * 12.0) * U.params.z) + 0.5);
      atomicAdd(&local[bin], wgt);
    } else {
      atomicAdd(&local[0], 1u);
    }
  }
  workgroupBarrier();
  atomicAdd(&bins[li], atomicLoad(&local[li]));
}
`,or=`
struct P {
  a: vec4f,   // mode (0 auto, 1 manual), manual ev100, compensation (EV), dt
  b: vec4f,   // min ev100, max ev100, speed up (EV/s), speed down (EV/s)
  c: vec4f,   // low percentile, high percentile, logMin, logRange
};
struct Exposure { current: f32, ev100: f32, targetEv100: f32, previous: f32 };
@group(0) @binding(0) var<uniform> U: P;
@group(0) @binding(1) var<storage, read_write> bins: array<u32, 256>;
@group(0) @binding(2) var<storage, read_write> exposure: Exposure;
var<workgroup> h: array<u32, 256>;
@compute @workgroup_size(256)
fn main(@builtin(local_invocation_index) li: u32) {
  h[li] = select(bins[li], 0u, li == 0u);
  bins[li] = 0u;
  workgroupBarrier();
  if (li != 0u) { return; }
  var total = 0u;
  for (var i = 0u; i < 256u; i++) { total += h[i]; }
  let lo = f32(total) * U.c.x;
  let hi = f32(total) * U.c.y;
  var acc = 0.0;
  var sum = 0.0;
  var cnt = 0.0;
  for (var i = 1u; i < 256u; i++) {
    let n = f32(h[i]);
    // portion of this bin inside [lo, hi]
    let a = max(lo - acc, 0.0);
    let take = clamp(n - a, 0.0, max(hi - acc - a, 0.0));
    let logL = U.c.z + (f32(i) - 0.5) / 254.0 * U.c.w;
    sum += take * logL;
    cnt += take;
    acc += n;
  }
  var tgt = U.a.y;
  if (U.a.x < 0.5 && cnt > 0.0) {
    let avgLog = sum / cnt;
    // EV100 = log2(L * S / K), S = 100, K = 12.5
    tgt = avgLog + log2(100.0 / 12.5) - U.a.z;
    tgt = clamp(tgt, U.b.x, U.b.y);
  } else if (U.a.x > 0.5) {
    tgt = U.a.y - U.a.z;
  }
  var ev = exposure.ev100;
  if (exposure.current <= 0.0 || U.a.x > 0.5) {
    ev = tgt;
  } else {
    let speed = select(U.b.w, U.b.z, tgt > ev);
    let diff = tgt - ev;
    let stepEv = sign(diff) * min(abs(diff), max(speed * U.a.w * max(abs(diff), 0.35), 0.0));
    ev += stepEv;
  }
  exposure.previous = select(exposure.current, 1.0 / (1.2 * exp2(ev)), exposure.current <= 0.0);
  exposure.ev100 = ev;
  exposure.targetEv100 = tgt;
  exposure.current = 1.0 / (1.2 * exp2(ev));
}
`,lr=ne+Jt+`
struct P {
  size: vec4f,       // w, h, 1/w, 1/h
  lens: vec4f,       // distortion k1, k2, chromatic aberration, fill zoom
  vignette: vec4f,   // natural (cos^4) amount, artistic amount, artistic roundness, fov y
  bloom: vec4f,      // intensity, dirt, unused, unused
  grain: vec4f,      // read noise, shot noise, iso factor, frame
  grade: vec4f,      // contrast, saturation, temperature shift (mired-ish), tint
  grade2: vec4f,     // lift, gamma, gain, tonemapper (0 AgX, 1 ACES, 2 Khronos neutral, 3 linear clamp)
  misc: vec4f,       // sharpen, dither, debug view, exposure bias (EV)
};
@group(0) @binding(0) var<uniform> U: P;
@group(0) @binding(1) var hdr: texture_2d<f32>;
@group(0) @binding(2) var bloomTex: texture_2d<f32>;
@group(0) @binding(3) var samp: sampler;
@group(0) @binding(5) var debugTex: texture_2d<f32>;

// ---- AgX (Troy Sobotka), polynomial fit by Benjamin Wrensch
fn agxContrast(x: vec3f) -> vec3f {
  let x2 = x * x; let x4 = x2 * x2;
  return 15.5 * x4 * x2 - 40.14 * x4 * x + 31.96 * x4 - 6.868 * x2 * x + 0.4298 * x2 + 0.1191 * x - 0.00232;
}
fn agx(c: vec3f) -> vec3f {
  let inset = mat3x3f(vec3f(0.842479062253094, 0.0423282422610123, 0.0423756549057051),
                      vec3f(0.0784335999999992, 0.878468636469772, 0.0784336),
                      vec3f(0.0792237451477643, 0.0791661274605434, 0.879142973793104));
  let outset = mat3x3f(vec3f(1.19687900512017, -0.0528968517574562, -0.0529716355144438),
                       vec3f(-0.0980208811401368, 1.15190312990417, -0.0980434501171241),
                       vec3f(-0.0990297440797205, -0.0989611768448433, 1.15107367264116));
  let minEv = -12.47393;
  let maxEv = 4.026069;
  var v = inset * max(c, vec3f(1e-10));
  v = clamp(log2(v), vec3f(minEv), vec3f(maxEv));
  v = (v - minEv) / (maxEv - minEv);
  v = agxContrast(v);
  v = outset * v;
  // AgX output is display-encoded; linearise for later sRGB encode
  return pow(max(v, vec3f(0.0)), vec3f(2.2));
}
fn acesFitted(c: vec3f) -> vec3f {
  let a = mat3x3f(vec3f(0.59719, 0.07600, 0.02840), vec3f(0.35458, 0.90834, 0.13383), vec3f(0.04823, 0.01566, 0.83777));
  let b = mat3x3f(vec3f(1.60475, -0.10208, -0.00327), vec3f(-0.53108, 1.10813, -0.07276), vec3f(-0.07367, -0.00605, 1.07602));
  var v = a * c;
  let r = (v * (v + 0.0245786) - 0.000090537) / (v * (0.983729 * v + 0.4329510) + 0.238081);
  return clamp(b * r, vec3f(0.0), vec3f(1.0));
}
fn khronosNeutral(c0: vec3f) -> vec3f {
  let startC = 0.8 - 0.04;
  let desat = 0.15;
  let x = min(c0.r, min(c0.g, c0.b));
  let off = select(0.04, x - 6.25 * x * x, x < 0.08);
  var c = c0 - off;
  let peak = max(c.r, max(c.g, c.b));
  if (peak < startC) { return c; }
  let d = 1.0 - startC;
  let newPeak = 1.0 - d * d / (peak + d - startC);
  c *= newPeak / peak;
  let g = 1.0 - 1.0 / (desat * (peak - newPeak) + 1.0);
  return mix(c, vec3f(newPeak), g);
}
fn srgbOetf(c: vec3f) -> vec3f {
  let lo = c * 12.92;
  let hi = 1.055 * pow(max(c, vec3f(0.0)), vec3f(1.0 / 2.4)) - 0.055;
  return select(hi, lo, c <= vec3f(0.0031308));
}
fn whiteBalance(c: vec3f, temp: f32, tint: f32) -> vec3f {
  // simple von Kries in LMS
  let t1 = temp * 10.0 / 6.0;
  let t2 = tint * 10.0 / 6.0;
  let x = 0.31271 - t1 * select(0.05, 0.1, t1 < 0.0);
  let y = 2.87 * x - 3.0 * x * x - 0.27509507 + t2 * 0.05;
  let X = x / y; let Z = (1.0 - x - y) / y;
  let L = 0.7328 * X + 0.4296 - 0.1624 * Z;
  let M = -0.7036 * X + 1.6975 + 0.0061 * Z;
  let S = 0.0030 * X + 0.0136 + 0.9834 * Z;
  let balance = vec3f(0.949237, 1.03542, 1.08728) / vec3f(L, M, S);
  let toLMS = mat3x3f(vec3f(0.390405, 0.0708416, 0.0231082), vec3f(0.549941, 0.963172, 0.128021), vec3f(0.00892632, 0.00135775, 0.936245));
  let fromLMS = mat3x3f(vec3f(2.85847, -0.210182, -0.0418120), vec3f(-1.62879, 1.15820, -0.118169), vec3f(-0.0248910, 0.000324281, 1.06867));
  return fromLMS * ((toLMS * c) * balance);
}

fn distortUV(uv: vec2f, k1: f32, k2: f32, zoom: f32) -> vec2f {
  let aspect = U.size.x / U.size.y;
  var p = (uv - 0.5) * vec2f(aspect, 1.0);
  let r2 = dot(p, p);
  p *= (1.0 + k1 * r2 + k2 * r2 * r2) / zoom;
  return p / vec2f(aspect, 1.0) + 0.5;
}

@fragment fn fsComposite(i: FOut) -> @location(0) vec4f {
  let dbg = u32(U.misc.z + 0.5);
  if (dbg > 0u) {
    let d = textureSampleLevel(debugTex, samp, i.uv, 0.0);
    return vec4f(srgbOetf(saturate3(d.rgb)), 1.0);
  }
  let uv = distortUV(i.uv, U.lens.x, U.lens.y, U.lens.w);
  let ca = U.lens.z * 0.004;
  let dir = uv - 0.5;
  var c: vec3f;
  c.r = textureSampleLevel(hdr, samp, 0.5 + dir * (1.0 + ca), 0.0).r;
  c.g = textureSampleLevel(hdr, samp, uv, 0.0).g;
  c.b = textureSampleLevel(hdr, samp, 0.5 + dir * (1.0 - ca), 0.0).b;
  // contrast-adaptive sharpening (luma-only, cross pattern)
  if (U.misc.x > 0.0) {
    let t = U.size.zw;
    let n = textureSampleLevel(hdr, samp, uv + vec2f(0.0, -t.y), 0.0).rgb;
    let s = textureSampleLevel(hdr, samp, uv + vec2f(0.0, t.y), 0.0).rgb;
    let e = textureSampleLevel(hdr, samp, uv + vec2f(t.x, 0.0), 0.0).rgb;
    let w = textureSampleLevel(hdr, samp, uv + vec2f(-t.x, 0.0), 0.0).rgb;
    let lc = luminance(c);
    let mn = min(lc, min(min(luminance(n), luminance(s)), min(luminance(e), luminance(w))));
    let mx = max(lc, max(max(luminance(n), luminance(s)), max(luminance(e), luminance(w))));
    let amp = sqrt(saturate(min(mn, 1.0 - min(mx, 1.0)) / max(mx, 1e-4)));
    let wgt = -amp * mix(0.125, 0.2, saturate(U.misc.x));
    c = max((c + (n + s + e + w) * wgt) / (1.0 + 4.0 * wgt), vec3f(0.0));
  }
  // bloom (energy-conserving mix)
  let b = textureSampleLevel(bloomTex, samp, uv, 0.0).rgb;
  c = mix(c, b, U.bloom.x);
  // exposure bias (EV) \u2014 scene is already pre-exposed
  c *= exp2(U.misc.w);
  // natural vignetting (cos^4 law for the pixel's field angle) + artistic vignette
  let ndc = (i.uv - 0.5) * 2.0;
  let tanHalf = tan(U.vignette.w * 0.5);
  let aspect = U.size.x / U.size.y;
  let ray = vec2f(ndc.x * tanHalf * aspect, ndc.y * tanHalf);
  let cosT = 1.0 / sqrt(1.0 + dot(ray, ray));
  c *= mix(1.0, pow(cosT, 4.0), U.vignette.x);
  let vr = length(ndc * vec2f(mix(1.0, aspect, U.vignette.z), 1.0)) * 0.7071;
  c *= 1.0 - U.vignette.y * smoothstep(0.3, 1.1, vr);
  // sensor noise: shot noise \u221D sqrt(signal), read noise floor, scaled with ISO gain
  if (U.grain.z > 0.0) {
    let lum = luminance(c);
    let n1 = hash12(i.pos.xy + U.grain.w * 17.13) - 0.5;
    let n2 = hash12(i.pos.yx * 1.37 + U.grain.w * 3.71) - 0.5;
    let n3 = hash12(i.pos.xy * 0.73 + U.grain.w * 9.31) - 0.5;
    let sigma = sqrt(U.grain.x * U.grain.x + U.grain.y * max(lum, 0.0)) * U.grain.z;
    c = max(c + (vec3f(n1, n1, n1) * 0.7 + vec3f(n2, n3, n1) * 0.3) * sigma * 1.7, vec3f(0.0));
  }
  c = whiteBalance(c, U.grade.z, U.grade.w);
  let tm = u32(U.grade2.w + 0.5);
  var o: vec3f;
  switch (tm) {
    case 1u: { o = acesFitted(c * 0.6); }
    case 2u: { o = khronosNeutral(c); }
    case 3u: { o = saturate3(c); }
    default: { o = agx(c); }
  }
  // grading in display-linear space
  let lum = luminance(o);
  o = mix(vec3f(lum), o, U.grade.y);
  o = saturate3(mix(vec3f(0.18), o, U.grade.x));
  o = pow(max(o * U.grade2.z + U.grade2.x * (1.0 - o), vec3f(0.0)), vec3f(1.0 / max(U.grade2.y, 0.01)));
  var s = srgbOetf(saturate3(o));
  // triangular dither to kill banding in skies
  let dth = (hash12(i.pos.xy + fract(U.grain.w * 0.618)) + hash12(i.pos.yx + 0.5) - 1.0) / 255.0 * U.misc.y;
  s += vec3f(dth);
  return vec4f(s, 1.0);
}
`;var cr=`
struct P { mode: f32, near: f32, w: f32, h: f32 };
struct Exposure { current: f32, ev100: f32, targetEv100: f32, previous: f32 };
@group(0) @binding(0) var<uniform> U: P;
@group(0) @binding(1) var normalTex: texture_2d<f32>;
@group(0) @binding(2) var aoTex: texture_2d<f32>;
@group(0) @binding(3) var velTex: texture_2d<f32>;
@group(0) @binding(4) var depthTex: texture_depth_2d;
@group(0) @binding(5) var hdrTex: texture_2d<f32>;
@group(0) @binding(6) var<storage, read> exposure: Exposure;
@group(0) @binding(7) var outTex: texture_storage_2d<rgba16float, write>;

fn heat(t: f32) -> vec3f {
  // perceptual-ish ramp: black \u2192 blue \u2192 cyan \u2192 green \u2192 yellow \u2192 red \u2192 white
  let c = clamp(t, 0.0, 1.0) * 6.0;
  let i = floor(c);
  let f = c - i;
  var stops = array<vec3f, 7>(vec3f(0.0), vec3f(0.0, 0.1, 0.8), vec3f(0.0, 0.8, 0.9), vec3f(0.1, 0.8, 0.1), vec3f(0.95, 0.9, 0.1), vec3f(0.95, 0.1, 0.05), vec3f(1.0));
  let a = stops[u32(min(i, 6.0))];
  let b = stops[u32(min(i + 1.0, 6.0))];
  return mix(a, b, f);
}

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let px = vec2i(id.xy);
  if (f32(px.x) >= U.w || f32(px.y) >= U.h) { return; }
  let mode = u32(U.mode + 0.5);
  var c = vec3f(0.0);
  switch (mode) {
    case 1u: { c = textureLoad(normalTex, px, 0).xyz * 0.5 + 0.5; }
    case 2u: { c = vec3f(textureLoad(aoTex, px, 0).r); }
    case 3u: { let v = textureLoad(velTex, px, 0).xy * vec2f(U.w, U.h) * 0.05; c = vec3f(0.5 + v.x, 0.5 + v.y, 0.5); }
    case 4u: { let d = textureLoad(depthTex, px, 0); let z = select(1e5, U.near / max(d, 1e-9), d > 0.0); c = vec3f(fract(log2(z) * 0.5)); }
    case 5u: {
      // absolute luminance (cd/m\xB2) on a log scale: 1e-2 .. 1e6
      let L = dot(textureLoad(hdrTex, px, 0).rgb / max(exposure.current, 1e-20), vec3f(0.2126, 0.7152, 0.0722));
      c = heat((log2(max(L, 1e-3)) + 6.64) / 26.6);
    }
    default: { c = textureLoad(hdrTex, px, 0).rgb; }
  }
  textureStore(outTex, px, vec4f(c, 1.0));
}
`;var ur=`
struct U {
  size: vec4f,       // w, h, 1/w, 1/h
  lens: vec4f,       // aperture (m), px/rad world, px/rad viewmodel, max blur (px)
  cam: vec4f,        // near (world), near (viewmodel), viewmodel squeeze, enabled
  focus: vec4f,      // manual focus (m), autofocus (0/1), override distance (m), override weight
  timing: vec4f,     // dt, accommodation speed (1/s), min focus (m), spiral step (px)
};
@group(0) @binding(0) var<uniform> u: U;

/// Linear view distance from reversed-Z depth; viewmodel pixels (squeezed into [squeeze, 1]) decode with
/// the viewmodel near plane. Returns (distance, isViewmodel).
fn linearDepth(d: f32) -> vec2f {
  let sq = u.cam.z;
  if (d > sq && sq > 0.0) {
    let z = u.cam.y * (1.0 - sq) / max(d - sq, 1e-7);
    return vec2f(z, 1.0);
  }
  return vec2f(u.cam.x / max(d, 1e-9), 0.0);
}
`,mr=ur+`
@group(0) @binding(1) var depthTex: texture_depth_2d;
@group(0) @binding(2) var<storage, read_write> state: array<f32, 4>; // current focus (m), target, unused

@compute @workgroup_size(1)
fn main() {
  let c = vec2i(i32(u.size.x * 0.5), i32(u.size.y * 0.5));
  // centre-weighted: median-ish of a small cross pattern (eye fixation \u2248 1\u20132\xB0 of the fovea)
  let r = i32(max(2.0, u.size.y * 0.012));
  var acc = 0.0;
  var wsum = 0.0;
  for (var j = -2; j <= 2; j++) {
    for (var i = -2; i <= 2; i++) {
      let p = clamp(c + vec2i(i * r, j * r), vec2i(0), vec2i(i32(u.size.x) - 1, i32(u.size.y) - 1));
      let z = linearDepth(textureLoad(depthTex, p, 0)).x;
      let w = 1.0 / (1.0 + f32(i * i + j * j));
      acc += log(clamp(z, 0.05, 5000.0)) * w;
      wsum += w;
    }
  }
  var tgt = select(u.focus.x, exp(acc / wsum), u.focus.y > 0.5);
  tgt = mix(tgt, u.focus.z, saturate(u.focus.w));
  tgt = max(tgt, u.timing.z);
  var cur = state[0];
  if (!(cur > 0.0) || cur > 1e6) { cur = tgt; }
  // accommodate in diopters (the eye refocuses linearly in optical power, not distance)
  let k = 1.0 - exp(-u.timing.x * u.timing.y);
  let dCur = 1.0 / cur;
  let dTgt = 1.0 / tgt;
  state[0] = 1.0 / mix(dCur, dTgt, k);
  state[1] = tgt;
}
`,dr=ur+`
@group(0) @binding(1) var srcTex: texture_2d<f32>;
@group(0) @binding(2) var depthTex: texture_depth_2d;
@group(0) @binding(3) var<storage, read> state: array<f32, 4>;
@group(0) @binding(4) var dstTex: texture_storage_2d<rgba16float, write>;

const GOLDEN: f32 = 2.39996323;

fn cocAt(p: vec2i, focus: f32) -> vec2f {
  let ld = linearDepth(textureLoad(depthTex, p, 0));
  let pxPerRad = select(u.lens.y, u.lens.z, ld.y > 0.5);
  let c = u.lens.x * abs(1.0 / focus - 1.0 / max(ld.x, 1e-3)) * pxPerRad * 0.5; // radius in px
  return vec2f(min(c, u.lens.w), ld.x);
}

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let px = vec2i(id.xy);
  if (f32(px.x) >= u.size.x || f32(px.y) >= u.size.y) { return; }
  let center = textureLoad(srcTex, px, 0);
  if (u.cam.w < 0.5) { textureStore(dstTex, px, center); return; }
  let focus = max(state[0], 0.05);
  let cc = cocAt(px, focus);
  let maxR = u.lens.w;
  var color = center.rgb;
  var tot = 1.0;
  var radius = u.timing.w;
  var ang = 0.0;
  let wh = vec2i(i32(u.size.x) - 1, i32(u.size.y) - 1);
  for (var it = 0; it < 96; it++) {
    if (radius >= maxR) { break; }
    let off = vec2f(cos(ang), sin(ang)) * radius;
    let q = clamp(px + vec2i(round(off)), vec2i(0), wh);
    let sc = cocAt(q, focus);
    var size = sc.x;
    // a farther (background) sample can't spill over a sharper, nearer pixel
    if (sc.y > cc.y) { size = min(size, cc.x * 2.0); }
    let m = smoothstep(radius - 0.5, radius + 0.5, size);
    let s = textureLoad(srcTex, q, 0).rgb;
    color += mix(color / tot, s, m);
    tot += 1.0;
    radius += u.timing.w / max(radius, 1.0);
    ang += GOLDEN;
  }
  textureStore(dstTex, px, vec4f(color / tot, center.a));
}
`;function as(){return{renderScale:1,maxDevicePixelRatio:2,taa:{enabled:!0,feedbackMin:.82,feedbackMax:.94,velocityWeight:.06,jitterSamples:16},exposure:{mode:"auto",ev100:14,compensation:0,minEv100:-2,maxEv100:17,speedUp:2.2,speedDown:1.4,lowPercent:.45,highPercent:.96,centerWeight:.6},bloom:{enabled:!0,intensity:.035,radius:1,clamp:6e4},gtao:{enabled:!0,radius:.9,falloff:.4,power:1.25,strength:1,slices:2,steps:6,blur:!0},motionBlur:{enabled:!0,shutterAngle:180,maxPixels:48,samples:10},dof:{enabled:!0,apertureMm:3.2,autoFocus:!0,focusDistance:10,focusSpeed:6,maxBlurPx:14,overrideDistance:.6,overrideWeight:0,minFocus:.12,quality:1},lens:{distortion:0,distortion2:0,chromaticAberration:.15,naturalVignette:.6,vignette:.12,vignetteRoundness:.6,sharpen:.25,fillZoom:1},sensor:{enabled:!0,readNoise:.0025,shotNoise:.0018,isoCoupled:!0,gain:1},grade:{tonemapper:"agx",contrast:1.04,saturation:1.02,temperature:0,tint:0,lift:0,gamma:1,gain:1,exposureBias:0,dither:1},fog:{density:35e-5,heightFalloff:.045,baseHeight:0,startDistance:15,inscatter:1,mieG:.72},ibl:{intensity:1,specularOcclusion:1,occludedAmbient:.15,groundBounce:.6,viewmodelFill:1.7},gi:{enabled:!0,intensity:1},wind:{direction:[.94,.35],speed:1.7,bend:.045,turbulence:.25},clouds:{enabled:!0,coverage:.42,density:1.6,altitude:1800,scale:2600,windSpeed:9,windDirDeg:25,shadowStrength:.88},shadows:{...qt},viewmodelDepthSqueeze:.5,debugView:0}}var os={agx:0,aces:1,neutral:2,none:3};function pr(n){let e=new Float32Array(1),t=new Uint32Array(e.buffer);e[0]=n;let r=t[0],s=r>>>16&32768,i=(r>>>23&255)-127+15,a=r&8388607;return i<=0?i<-10?s:(a=(a|8388608)>>1-i,s|a>>13):i>=31?s|31744:s|i<<10|a>>13}var Ye=class n{dev;device;settings;textures;synth;sky;ibl;particles;decals;stats={drawCalls:0,triangles:0,objects:0,culled:0,frameMs:0,gpuInfo:""};frameLayout;objectLayout;materialLayout;shadowLayout;frameBuf;lightBuf;exposureBuf;histBuf;objBuf;objCapacity=0;objData=new Float32Array(0);cascadeBuf;dummyJoints;staticObjectBG;frameBG=null;frameBGKey="";shadowMap;shadowRes=0;shadowCount=0;skyVis;skyVisParams={min:[0,0,0],cell:1,size:[1,1,1],enabled:!1};probes=[];cloudDrift=[0,0];probeParams={min:[0,0,0],cell:1,size:[1,1,1],enabled:!1};targets=null;linearClamp;shadowSampler;meshModule;shadowModule;pipelines=new Map;skyPipe;gtaoPipe;aoBlurPipe;taaPipe;mbPipe;dofFocusPipe;dofGatherPipe;dofState;bloomDownPipe;bloomUpPipe;histPipe;exposurePipe;compositePipe;debugPipe;postUniforms=new Map;frameIndex=0;prevViewProj=M.create();prevVmViewProj=M.create();historyValid=!1;time=0;lastSkyVersion=-1;fw=new Ve(1344);constructor(e){this.dev=e,this.device=e.device;let t=this.device;this.settings=as(),this.textures=new Ee(e),this.synth=new Oe(e,this.textures),this.sky=new Ie(e,this.textures,128),this.ibl=new je(e,128),this.particles=new $e(e),this.decals=new Xe(e);let r=GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT;this.frameLayout=t.createBindGroupLayout({label:"frame",entries:[{binding:0,visibility:r,buffer:{type:"uniform"}},{binding:1,visibility:r,buffer:{type:"read-only-storage"}},{binding:2,visibility:r,buffer:{type:"read-only-storage"}},{binding:3,visibility:r,buffer:{type:"read-only-storage"}},{binding:4,visibility:r,texture:{viewDimension:"cube"}},{binding:5,visibility:r,texture:{}},{binding:6,visibility:r,texture:{sampleType:"depth",viewDimension:"2d-array"}},{binding:7,visibility:r,sampler:{type:"comparison"}},{binding:8,visibility:r,sampler:{}},{binding:9,visibility:r,texture:{sampleType:"unfilterable-float"}},{binding:10,visibility:r,texture:{viewDimension:"3d"}},{binding:11,visibility:r,texture:{viewDimension:"cube"}},{binding:12,visibility:r,texture:{viewDimension:"3d"}},{binding:13,visibility:r,texture:{viewDimension:"3d"}},{binding:14,visibility:r,texture:{viewDimension:"3d"}}]}),this.objectLayout=t.createBindGroupLayout({label:"object",entries:[{binding:0,visibility:r,buffer:{type:"uniform",hasDynamicOffset:!0,minBindingSize:ae}},{binding:1,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}},{binding:2,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}}]}),this.materialLayout=t.createBindGroupLayout({label:"material",entries:[{binding:0,visibility:r,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:3,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:4,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:5,visibility:GPUShaderStage.FRAGMENT,texture:{}}]}),this.shadowLayout=t.createBindGroupLayout({label:"shadow",entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform",hasDynamicOffset:!0,minBindingSize:64}}]}),this.frameBuf=e.createBuffer(1344,GPUBufferUsage.UNIFORM,"frame"),this.lightBuf=e.createBuffer(4096,GPUBufferUsage.STORAGE,"lights"),this.exposureBuf=e.createBuffer(16,GPUBufferUsage.STORAGE,"exposure",new Float32Array([1/(1.2*2**14),14,14,1/(1.2*2**14)])),this.histBuf=e.createBuffer(256*4,GPUBufferUsage.STORAGE,"histogram"),this.cascadeBuf=e.createBuffer(256*4,GPUBufferUsage.UNIFORM,"cascades"),this.dummyJoints=e.createBuffer(64,GPUBufferUsage.STORAGE,"dummyJoints",M.create()),this.objBuf=this.ensureObjectCapacity(256),this.linearClamp=t.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",addressModeW:"clamp-to-edge"}),this.shadowSampler=t.createSampler({compare:"less",magFilter:"linear",minFilter:"linear"}),this.skyVis=this.textures.white3d,this.probes=[this.textures.white3d,this.textures.white3d,this.textures.white3d],this.createShadowMap(),this.meshModule=e.shader(Yt,"mesh"),this.shadowModule=e.shader(Qt,"shadow");let s="rgba16float",i=e.shader(Zt,"skypass");this.skyPipe=t.createRenderPipeline({label:"sky",layout:t.createPipelineLayout({bindGroupLayouts:[this.frameLayout]}),vertex:{module:i,entryPoint:"vsFull"},fragment:{module:i,entryPoint:"fsSky",targets:[{format:s}]},depthStencil:{format:"depth32float",depthWriteEnabled:!1,depthCompare:"greater-equal"}});let a=(l,c)=>t.createComputePipeline({label:c,layout:"auto",compute:{module:e.shader(l,c),entryPoint:"main"}});this.gtaoPipe=a(er,"gtao"),this.aoBlurPipe=a(tr,"aoblur"),this.taaPipe=a(rr,"taa"),this.mbPipe=a(sr,"motionblur"),this.dofFocusPipe=a(mr,"dof-focus"),this.dofGatherPipe=a(dr,"dof-gather"),this.dofState=e.createBuffer(16,GPUBufferUsage.STORAGE,"dof.state",new Float32Array([0,0,0,0])),this.bloomDownPipe=a(ir,"bloomdown"),this.bloomUpPipe=a(nr,"bloomup"),this.histPipe=a(ar,"histogram"),this.exposurePipe=a(or,"exposure"),this.debugPipe=a(cr,"debug");let o=e.shader(lr,"composite");this.compositePipe=t.createRenderPipeline({label:"composite",layout:"auto",vertex:{module:o,entryPoint:"vsFull"},fragment:{module:o,entryPoint:"fsComposite",targets:[{format:e.presentationFormat}]}}),this.particles.createPipeline(this.frameLayout,s),this.decals.createPipeline(this.frameLayout,s),this.staticObjectBG=this.makeObjectBG(this.dummyJoints,this.dummyJoints)}static async create(e,t={}){let r=await _e.create({canvas:e,powerPreference:t.powerPreference,offscreen:t.offscreen});return new n(r)}get materialBindGroupLayout(){return this.materialLayout}ensureObjectCapacity(e){if(e<=this.objCapacity)return this.objBuf;let t=Math.max(e,Math.ceil(this.objCapacity*1.5),256);this.objBuf?.destroy?.(),this.objBuf=this.dev.createBuffer(t*ae,GPUBufferUsage.UNIFORM,"objects"),this.objData=new Float32Array(t*ae/4),this.objCapacity=t,this.dummyJoints&&(this.staticObjectBG=this.makeObjectBG(this.dummyJoints,this.dummyJoints));for(let r of this.skinnedObjects)r._skin&&(r._skin.bg=null);return this.objBuf}skinnedObjects=new Set;makeObjectBG(e,t){return this.device.createBindGroup({layout:this.objectLayout,entries:[{binding:0,resource:{buffer:this.objBuf,size:ae}},{binding:1,resource:{buffer:e}},{binding:2,resource:{buffer:t}}]})}createShadowMap(){let e=this.settings.shadows,t=Math.max(256,Math.min(8192,e.resolution|0)),r=Math.max(1,Math.min(4,e.cascades|0));this.shadowMap&&t===this.shadowRes&&r===this.shadowCount||(this.shadowMap?.destroy(),this.shadowMap=this.device.createTexture({size:[t,t,4],format:"depth32float",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING,label:"shadowmap"}),this.shadowRes=t,this.shadowCount=r,this.frameBG=null)}setSkyVisibility(e,t,r,s,i,a){let o=new Uint16Array(e.length);for(let c=0;c<e.length;c++)o[c]=pr(e[c]);let l=this.device.createTexture({size:[t,r,s],dimension:"3d",format:"r16float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:"skyvis"});this.device.queue.writeTexture({texture:l},o,{bytesPerRow:t*2,rowsPerImage:r},[t,r,s]),this.skyVis!==this.textures.white3d&&this.skyVis.destroy(),this.skyVis=l,this.skyVisParams={min:[...i],cell:a,size:[t,r,s],enabled:!0},this.frameBG=null}setProbeVolume(e,t,r,s,i,a){let o=t*r*s;for(let l=0;l<3;l++){let c=new Uint16Array(o*4);for(let h=0;h<o;h++)for(let p=0;p<4;p++)c[h*4+p]=pr(e[h*12+l*4+p]);let u=this.device.createTexture({size:[t,r,s],dimension:"3d",format:"rgba16float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:`gi.probes.${"rgb"[l]}`});this.device.queue.writeTexture({texture:u},c,{bytesPerRow:t*8,rowsPerImage:r},[t,r,s]),this.probes[l]!==this.textures.white3d&&this.probes[l].destroy(),this.probes[l]=u}this.probeParams={min:[i[0],i[1],i[2]],cell:a,size:[t,r,s],enabled:!0},this.frameBG=null}async readSkySH(){let e=this.device,t=e.createCommandEncoder({label:"sky-sh-readback"});this.sky.update(t),this.sky.version!==this.lastSkyVersion&&(this.ibl.update(this.sky.cube,t),this.lastSkyVersion=this.sky.version);let r=e.createBuffer({size:144,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST,label:"sh-readback"});t.copyBufferToBuffer(this.ibl.sh,0,r,0,144),e.queue.submit([t.finish()]),await r.mapAsync(GPUMapMode.READ);let s=new Float32Array(r.getMappedRange().slice(0));r.unmap(),r.destroy();let i=new Float32Array(27);for(let a=0;a<9;a++)for(let o=0;o<3;o++)i[a*3+o]=s[a*4+o];return i}makeTargets(e,t){let r=this.device,s=(u,h,p,d=[e,t])=>r.createTexture({label:u,size:d,format:h,usage:p}),i=GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING,a=GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING,o=[],l=[],c=Math.min(6,Q(e,t)-2);for(let u=0;u<c;u++){let h=Math.max(1,e>>u+1),p=Math.max(1,t>>u+1);o.push(s(`bloom.down${u}`,"rgba16float",a,[h,p])),l.push(s(`bloom.up${u}`,"rgba16float",a,[h,p]))}return{w:e,h:t,depth:s("depth","depth32float",i),normal:s("normal","rgba16float",i),velocity:s("velocity","rg16float",i),hdr:s("hdr","rgba16float",i),aoRaw:s("ao.raw","r32float",a),ao:s("ao","r32float",a),history:[s("taa.a","rgba16float",a),s("taa.b","rgba16float",a)],mb:s("motionblur","rgba16float",a),dof:s("dof","rgba16float",a),debug:s("debug","rgba16float",a),bloomDown:o,bloomUp:l}}destroyTargets(e){for(let t of[e.depth,e.normal,e.velocity,e.hdr,e.aoRaw,e.ao,e.history[0],e.history[1],e.mb,e.dof,e.debug,...e.bloomDown,...e.bloomUp])t.destroy()}uniform(e,t){let r=this.postUniforms.get(e);return r||(r=this.dev.createBuffer(Math.max(16,t.byteLength),GPUBufferUsage.UNIFORM,e),this.postUniforms.set(e,r)),this.device.queue.writeBuffer(r,0,t.buffer,t.byteOffset,t.byteLength),r}getFrameBG(e){let t=`${e.w}x${e.h}`;return this.frameBG&&this.frameBGKey===t?this.frameBG:(this.frameBG=this.device.createBindGroup({layout:this.frameLayout,label:"frame",entries:[{binding:0,resource:{buffer:this.frameBuf}},{binding:1,resource:{buffer:this.lightBuf}},{binding:2,resource:{buffer:this.ibl.sh}},{binding:3,resource:{buffer:this.exposureBuf}},{binding:4,resource:this.ibl.specular.createView({dimension:"cube"})},{binding:5,resource:this.ibl.brdfLut.createView()},{binding:6,resource:this.shadowMap.createView({dimension:"2d-array"})},{binding:7,resource:this.shadowSampler},{binding:8,resource:this.linearClamp},{binding:9,resource:e.ao.createView()},{binding:10,resource:this.skyVis.createView()},{binding:11,resource:this.sky.cube.createView({dimension:"cube"})},{binding:12,resource:this.probes[0].createView()},{binding:13,resource:this.probes[1].createView()},{binding:14,resource:this.probes[2].createView()}]}),this.frameBGKey=t,this.frameBG)}getPipelines(e,t){let r=`${e?1:0}|${t.variantKey}`,s=this.pipelines.get(r);if(s)return s;let i=this.device,a=i.createPipelineLayout({bindGroupLayouts:[this.frameLayout,this.objectLayout,this.materialLayout]}),o=e?[xt,Nt]:[xt],l={module:this.meshModule,entryPoint:e?"vsSkinned":"vsStatic",buffers:o},c=t.doubleSided?"none":"back",u=i.createRenderPipeline({label:`prepass ${r}`,layout:a,vertex:l,fragment:{module:this.meshModule,entryPoint:"fsPrepass",targets:[{format:"rgba16float"},{format:"rg16float"}]},primitive:{topology:"triangle-list",cullMode:c},depthStencil:{format:"depth32float",depthWriteEnabled:!0,depthCompare:"greater"}}),h=i.createRenderPipeline({label:`main ${r}`,layout:a,vertex:l,fragment:{module:this.meshModule,entryPoint:"fsMain",targets:[{format:"rgba16float"}]},primitive:{topology:"triangle-list",cullMode:c},depthStencil:{format:"depth32float",depthWriteEnabled:!1,depthCompare:"equal"}}),p=i.createRenderPipeline({label:`transparent ${r}`,layout:a,vertex:l,fragment:{module:this.meshModule,entryPoint:"fsTransparent",targets:[{format:"rgba16float",blend:{color:{srcFactor:"one",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"triangle-list",cullMode:c},depthStencil:{format:"depth32float",depthWriteEnabled:!1,depthCompare:"greater"}}),d=this.settings.shadows,f=i.createRenderPipeline({label:`shadow ${r}`,layout:i.createPipelineLayout({bindGroupLayouts:[this.shadowLayout,this.objectLayout,this.materialLayout]}),vertex:{module:this.shadowModule,entryPoint:e?"vsShadowSkinned":"vsShadow",buffers:o},fragment:t.alphaMode==="mask"?{module:this.shadowModule,entryPoint:"fsShadowMask",targets:[]}:void 0,primitive:{topology:"triangle-list",cullMode:"none"},depthStencil:{format:"depth32float",depthWriteEnabled:!0,depthCompare:"less",depthBias:1,depthBiasSlopeScale:d.slopeBias,depthBiasClamp:.01}});return s={prepass:u,main:h,transparent:p,shadow:f},this.pipelines.set(r,s),s}render(e,t,r){let s=performance.now(),i=this.settings,a=this.device,o=this.dev.canvas,l=Math.min(globalThis.devicePixelRatio??1,i.maxDevicePixelRatio),c=Math.max(1,Math.floor((o.clientWidth||o.width)*l)),u=Math.max(1,Math.floor((o.clientHeight||o.height)*l));(o.width!==c||o.height!==u)&&(o.width=c,o.height=u);let h=Math.max(16,Math.round(c*i.renderScale)),p=Math.max(16,Math.round(u*i.renderScale));(!this.targets||this.targets.w!==h||this.targets.h!==p)&&(this.targets&&this.destroyTargets(this.targets),this.targets=this.makeTargets(h,p),this.frameBG=null,this.historyValid=!1);let d=this.targets;this.createShadowMap(),this.time+=r;let f=a.createCommandEncoder({label:"frame"});this.sky.update(f),this.sky.version!==this.lastSkyVersion&&(this.ibl.update(this.sky.cube,f),this.lastSkyVersion=this.sky.version),t.updateMatrices();let b=h/p,v=i.taa.enabled?Math.max(1,i.taa.jitterSamples):1,g=this.frameIndex%v+1,y=i.taa.enabled?(ht(g,2)-.5)*2/h:0,w=i.taa.enabled?(ht(g,3)-.5)*2/p:0,P=M.perspectiveReversedInfinite(M.create(),t.fovY,b,t.near,y,w),k=M.perspectiveReversedInfinite(M.create(),t.fovY,b,t.near),A=M.perspectiveReversedInfinite(M.create(),t.viewmodelFovY,b,t.near*.25,y,w),T=M.perspectiveReversedInfinite(M.create(),t.viewmodelFovY,b,t.near*.25),z=M.multiply(M.create(),P,t.view),B=M.multiply(M.create(),k,t.view),C=M.multiply(M.create(),A,t.view),U=M.multiply(M.create(),T,t.view);this.historyValid||(M.copy(this.prevViewProj,B),M.copy(this.prevVmViewProj,U));let V=M.invert(M.create(),P),E=M.invert(M.create(),z),G=M.invert(M.create(),B),I=this.sky.sunDir,W=this.sky.sunIlluminanceRGB(),Y=this.sky.settings.sunAngularDiameter*Math.PI/360,N=i.shadows,O=N.enabled?Kt(t,b,m.clone(I),N):null,_=this.fw;_.mat4(0,z),_.mat4(64,B),_.mat4(128,this.prevViewProj),_.mat4(192,C),_.mat4(256,U),_.mat4(320,this.prevVmViewProj),_.mat4(384,t.view),_.mat4(448,t.world),_.mat4(512,V),_.mat4(576,E),_.mat4(640,P),_.vec4(704,t.position[0],t.position[1],t.position[2],t.near),_.vec4(720,I[0],I[1],I[2],Math.cos(Y)),_.vec4(736,W[0],W[1],W[2],1),_.vec4(752,h,p,1/h,1/p),_.vec4(768,y,w,0,0);let at=.06*this.sky.settings.sunIlluminance/Math.PI*Math.max(.05,Math.sin(Math.max(.03,I[1])))*i.fog.inscatter;if(_.vec4(784,i.fog.density,i.fog.heightFalloff,i.fog.baseHeight,i.fog.startDistance),_.vec4(800,at*.62,at*.75,at,i.fog.mieG),_.vec4(816,this.time,r,this.frameIndex,i.ibl.intensity),_.vec4(832,O?O.viewProj.length:0,N.maxPenumbraTexels,Math.tan(Y),N.blendFraction),O){_.vec4(848,O.splits[0]??1e9,O.splits[1]??1e9,O.splits[2]??1e9,O.splits[3]??1e9);for(let x=0;x<4;x++)_.mat4(864+x*64,O.viewProj[x]??M.create());_.vec4(1120,O.texelWorld[0]??1,O.texelWorld[1]??1,O.texelWorld[2]??1,O.texelWorld[3]??1),_.vec4(1216,O.depthRange[0]??1,O.depthRange[1]??1,O.depthRange[2]??1,O.depthRange[3]??1)}let re=this.skyVisParams;_.vec4(1136,re.min[0],re.min[1],re.min[2],re.cell),_.vec4(1152,re.size[0],re.size[1],re.size[2],re.enabled?1:0);let ge=new Float32Array(1024),ve=0;for(let x of e.lights){if(!x.enabled||ve>=64||x.intensity<=0)continue;let S=ve*16;ge.set([x.position[0],x.position[1],x.position[2],x.range],S),ge.set([x.color[0]*x.intensity,x.color[1]*x.intensity,x.color[2]*x.intensity,0],S+4);let R=x.spotOuter>0,D=m.normalize(m.create(),x.direction);ge.set([D[0],D[1],D[2],Math.cos(x.spotOuter*Math.PI/180)],S+8),ge.set([Math.cos(Math.min(x.spotInner,x.spotOuter)*Math.PI/180),x.radius,R?1:0,0],S+12),ve++}a.queue.writeBuffer(this.lightBuf,0,ge,0,Math.max(16,ve*16)),_.vec4(1168,ve,i.ibl.specularOcclusion,i.gtao.enabled?i.gtao.strength:0,N.normalBias),_.vec4(1184,this.ibl.mips-1,1,this.sky.settings.groundAlbedo,i.debugView),_.vec4(1200,i.viewmodelDepthSqueeze,0,0,0),_.vec4(1232,N.constantBias,N.slopeBias,Math.min(16,N.blockerSamples),Math.min(32,N.pcfSamples)),_.vec4(1248,i.ibl.occludedAmbient,i.ibl.groundBounce,i.ibl.viewmodelFill,0),_.vec4(1264,i.wind.direction[0]*i.wind.speed,i.wind.direction[1]*i.wind.speed,i.wind.bend,i.wind.turbulence);let Z=i.clouds;this.cloudDrift[0]+=Math.cos(Z.windDirDeg*Math.PI/180)*Z.windSpeed*r,this.cloudDrift[1]+=Math.sin(Z.windDirDeg*Math.PI/180)*Z.windSpeed*r,_.vec4(1312,Z.coverage,Z.density,Z.altitude,Z.scale),_.vec4(1328,this.cloudDrift[0]%1e6,this.cloudDrift[1]%1e6,Z.shadowStrength,Z.enabled?1:0);let se=this.probeParams;_.vec4(1280,se.min[0],se.min[1],se.min[2],se.cell),_.vec4(1296,se.size[0],se.size[1],se.size[2],se.enabled&&i.gi.enabled?i.gi.intensity:0),a.queue.writeBuffer(this.frameBuf,0,_.buffer);let Sr=mt(z),Ge=[],Lt=[],Ut=0,ot=[...e.objects];this.ensureObjectCapacity(ot.length+1);let me=this.objData,lt=new Map,xe=0,Bt=new Float32Array(12);for(let x of ot){if(!x.visible)continue;x._beginFrame();let S=xe*ae/4;if(me.set(x.transform,S),me.set(x.prevTransform,S+16),M.normalMatrix12(Bt,x.transform),me.set(Bt,S+32),me[S+44]=(x.viewmodel?1:0)+(x.instances?4:0),me[S+45]=x.id,lt.set(x,xe++),x.joints&&x.mesh.skinned&&this.updateSkin(x),x.instances&&(this.updateInstances(x),x.instanceCount===0)){xe--,lt.delete(x);continue}x.castShadow&&!x.viewmodel&&Lt.push(x),x.viewmodel||dt(Sr,x.worldBounds)?Ge.push(x):Ut++}xe&&a.queue.writeBuffer(this.objBuf,0,me,0,xe*ae/4),this.stats.objects=Ge.length,this.stats.culled=Ut;let Rt=0,_t=0,Tr=x=>x._skin?this.skinBG(x):x._inst?this.instBG(x):this.staticObjectBG,Le=(x,S)=>{x.setBindGroup(1,Tr(S),[lt.get(S)*ae]),x.setBindGroup(2,S.material.getBindGroup(this.dev,this.textures,this.materialLayout)),x.setVertexBuffer(0,S.mesh.vertexBuffer),S.mesh.skinBuffer&&S._skin&&x.setVertexBuffer(1,S.mesh.skinBuffer),x.setIndexBuffer(S.mesh.indexBuffer,"uint32");let R=S.instances?S.instanceCount:1;x.drawIndexed(S.mesh.indexCount,R),Rt++,_t+=S.mesh.indexCount/3*R};if(O){let x=new Float32Array(256);for(let R=0;R<O.viewProj.length;R++)x.set(O.viewProj[R],R*64);a.queue.writeBuffer(this.cascadeBuf,0,x);let S=a.createBindGroup({layout:this.shadowLayout,entries:[{binding:0,resource:{buffer:this.cascadeBuf,size:64}}]});for(let R=0;R<O.viewProj.length;R++){let D=f.beginRenderPass({label:`shadow ${R}`,colorAttachments:[],depthStencilAttachment:{view:this.shadowMap.createView({dimension:"2d",baseArrayLayer:R,arrayLayerCount:1}),depthLoadOp:"clear",depthStoreOp:"store",depthClearValue:1}});D.setBindGroup(0,S,[R*256]);let F=mt(O.viewProj[R]);for(let j of Lt)j.material.alphaMode!=="blend"&&dt(F,j.worldBounds)&&(D.setPipeline(this.getPipelines(!!j._skin,j.material).shadow),Le(D,j));D.end()}}let ct=this.getFrameBG(d),ut=Ge.filter(x=>x.material.alphaMode!=="blend"),Vt=Ge.filter(x=>x.material.alphaMode==="blend");ut.sort((x,S)=>Number(S.viewmodel)-Number(x.viewmodel)||x.material.id-S.material.id);let Ct=t.position;Vt.sort((x,S)=>m.distance(M.getTranslation(m.create(),S.transform),Ct)-m.distance(M.getTranslation(m.create(),x.transform),Ct));{let x=f.beginRenderPass({label:"prepass",colorAttachments:[{view:d.normal.createView(),loadOp:"clear",storeOp:"store",clearValue:[0,1,0,1]},{view:d.velocity.createView(),loadOp:"clear",storeOp:"store",clearValue:[0,0,0,0]}],depthStencilAttachment:{view:d.depth.createView(),depthLoadOp:"clear",depthStoreOp:"store",depthClearValue:0}});x.setBindGroup(0,ct);for(let S of ut)x.setPipeline(this.getPipelines(!!S._skin,S.material).prepass),Le(x,S);x.end()}if(i.gtao.enabled){let x=i.gtao,S=new Float32Array(44);S.set(V,0),S.set(t.view,16),S.set([h,p,1/h,1/p],32),S.set([x.radius,x.falloff,x.power,this.frameIndex],36),S.set([k[0],k[5],x.steps,x.slices],40);let R=f.beginComputePass({label:"gtao"});R.setPipeline(this.gtaoPipe),R.setBindGroup(0,a.createBindGroup({layout:this.gtaoPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("gtao",S)}},{binding:1,resource:d.depth.createView()},{binding:2,resource:d.normal.createView()},{binding:3,resource:(x.blur?d.aoRaw:d.ao).createView()}]})),R.dispatchWorkgroups(Math.ceil(h/8),Math.ceil(p/8)),x.blur&&(R.setPipeline(this.aoBlurPipe),R.setBindGroup(0,a.createBindGroup({layout:this.aoBlurPipe.getBindGroupLayout(0),entries:[{binding:0,resource:d.aoRaw.createView()},{binding:1,resource:d.depth.createView()},{binding:2,resource:d.ao.createView()}]})),R.dispatchWorkgroups(Math.ceil(h/8),Math.ceil(p/8))),R.end()}this.decals.upload(),this.particles.update(r),this.particles.upload(t.position);{let x=f.beginRenderPass({label:"main",colorAttachments:[{view:d.hdr.createView(),loadOp:"clear",storeOp:"store",clearValue:[0,0,0,1]}],depthStencilAttachment:{view:d.depth.createView(),depthReadOnly:!0}});x.setBindGroup(0,ct);for(let S of ut)x.setPipeline(this.getPipelines(!!S._skin,S.material).main),Le(x,S);x.setPipeline(this.skyPipe),x.draw(3),this.decals.draw(x),x.setBindGroup(0,ct);for(let S of Vt)x.setPipeline(this.getPipelines(!!S._skin,S.material).transparent),Le(x,S);this.particles.draw(x,d.depth),x.end()}let Ar=d.history[this.frameIndex&1],Et=d.history[this.frameIndex+1&1],Ue=d.hdr;if(i.taa.enabled){let x=new Float32Array(44);x.set(G,0),x.set(this.prevViewProj,16),x.set([h,p,1/h,1/p],32),x.set([i.taa.feedbackMin,i.taa.feedbackMax,i.taa.velocityWeight,this.historyValid?0:1],36),x.set([y*.5,-w*.5,0,0],40);let S=f.beginComputePass({label:"taa"});S.setPipeline(this.taaPipe),S.setBindGroup(0,a.createBindGroup({layout:this.taaPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("taa",x)}},{binding:1,resource:d.hdr.createView()},{binding:2,resource:Ar.createView()},{binding:3,resource:d.velocity.createView()},{binding:4,resource:d.depth.createView()},{binding:5,resource:this.linearClamp},{binding:6,resource:Et.createView()},{binding:7,resource:{buffer:this.exposureBuf}}]})),S.dispatchWorkgroups(Math.ceil(h/8),Math.ceil(p/8)),S.end(),Ue=Et}if(i.dof.enabled&&i.debugView===0){let x=i.dof,S=p/(2*Math.tan(t.fovY/2)),R=p/(2*Math.tan(t.viewmodelFovY/2)),D=new Float32Array([h,p,1/h,1/p,x.apertureMm/1e3,S,R,x.maxBlurPx*(p/1080),t.near,t.near*.25,i.viewmodelDepthSqueeze,1,x.focusDistance,x.autoFocus?1:0,x.overrideDistance,x.overrideWeight,Math.min(r,.1),x.focusSpeed,x.minFocus,1.6/Math.max(.25,x.quality)]),F=this.uniform("dof",D),j=f.beginComputePass({label:"dof"});j.setPipeline(this.dofFocusPipe),j.setBindGroup(0,a.createBindGroup({layout:this.dofFocusPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:F}},{binding:1,resource:d.depth.createView()},{binding:2,resource:{buffer:this.dofState}}]})),j.dispatchWorkgroups(1),j.setPipeline(this.dofGatherPipe),j.setBindGroup(0,a.createBindGroup({layout:this.dofGatherPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:F}},{binding:1,resource:Ue.createView()},{binding:2,resource:d.depth.createView()},{binding:3,resource:{buffer:this.dofState}},{binding:4,resource:d.dof.createView()}]})),j.dispatchWorkgroups(Math.ceil(h/8),Math.ceil(p/8)),j.end(),Ue=d.dof}{let x=i.motionBlur,S=x.shutterAngle/360,R=new Float32Array([h,p,1/h,1/p,S,x.maxPixels,x.samples,x.enabled?1:0]),D=f.beginComputePass({label:"motionblur"});D.setPipeline(this.mbPipe),D.setBindGroup(0,a.createBindGroup({layout:this.mbPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("mb",R)}},{binding:1,resource:Ue.createView()},{binding:2,resource:d.velocity.createView()},{binding:3,resource:d.depth.createView()},{binding:4,resource:this.linearClamp},{binding:5,resource:d.mb.createView()}]})),D.dispatchWorkgroups(Math.ceil(h/8),Math.ceil(p/8)),D.end()}let ye=d.mb;{let x=i.exposure,S=-10,R=40,D=x.ev100;x.mode==="camera"&&(D=Ft(t.aperture,t.shutter,t.iso));let F=f.beginComputePass({label:"exposure"});F.setPipeline(this.histPipe),F.setBindGroup(0,a.createBindGroup({layout:this.histPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("hist",new Float32Array([h,p,1/h,1/p,S,R,x.centerWeight,0]))}},{binding:1,resource:ye.createView()},{binding:2,resource:{buffer:this.histBuf}},{binding:3,resource:{buffer:this.exposureBuf}}]})),F.dispatchWorkgroups(Math.ceil(h/32),Math.ceil(p/32)),F.setPipeline(this.exposurePipe),F.setBindGroup(0,a.createBindGroup({layout:this.exposurePipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("expo",new Float32Array([x.mode==="auto"?0:1,D,x.compensation,Math.min(r,.1),x.minEv100,x.maxEv100,x.speedUp,x.speedDown,x.lowPercent,x.highPercent,S,R]))}},{binding:1,resource:{buffer:this.histBuf}},{binding:2,resource:{buffer:this.exposureBuf}}]})),F.dispatchWorkgroups(1),F.end()}let de=i.bloom;if(de.enabled&&d.bloomDown.length>1){let x=f.beginComputePass({label:"bloom"});x.setPipeline(this.bloomDownPipe);let S=ye;for(let D=0;D<d.bloomDown.length;D++){let F=d.bloomDown[D];x.setBindGroup(0,a.createBindGroup({layout:this.bloomDownPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform(`bd${D}`,new Float32Array([1/S.width,1/S.height,0,0,D===0?1:0,de.clamp,0,0]))}},{binding:1,resource:S.createView()},{binding:2,resource:this.linearClamp},{binding:3,resource:F.createView()}]})),x.dispatchWorkgroups(Math.ceil(F.width/8),Math.ceil(F.height/8)),S=F}x.setPipeline(this.bloomUpPipe);let R=d.bloomDown.length;for(let D=R-2;D>=0;D--){let F=D===R-2?d.bloomDown[R-1]:d.bloomUp[D+1],j=d.bloomUp[D];x.setBindGroup(0,a.createBindGroup({layout:this.bloomUpPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform(`bu${D}`,new Float32Array([1/F.width,1/F.height,0,0,de.radius,0,0,0]))}},{binding:1,resource:F.createView()},{binding:2,resource:d.bloomDown[D].createView()},{binding:3,resource:this.linearClamp},{binding:4,resource:j.createView()}]})),x.dispatchWorkgroups(Math.ceil(j.width/8),Math.ceil(j.height/8))}x.end()}if(i.debugView>0){let x=f.beginComputePass({label:"debug"});x.setPipeline(this.debugPipe),x.setBindGroup(0,a.createBindGroup({layout:this.debugPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("dbg",new Float32Array([i.debugView,t.near,h,p]))}},{binding:1,resource:d.normal.createView()},{binding:2,resource:d.ao.createView()},{binding:3,resource:d.velocity.createView()},{binding:4,resource:d.depth.createView()},{binding:5,resource:ye.createView()},{binding:6,resource:{buffer:this.exposureBuf}},{binding:7,resource:d.debug.createView()}]})),x.dispatchWorkgroups(Math.ceil(h/8),Math.ceil(p/8)),x.end()}{let x=i.lens,S=i.grade,R=i.sensor,D=R.isoCoupled?Math.pow(Math.max(t.iso,50)/100,.25):1,F=new Float32Array([c,u,1/c,1/u,x.distortion,x.distortion2,x.chromaticAberration,x.fillZoom,x.naturalVignette,x.vignette,x.vignetteRoundness,t.fovY,de.enabled?de.intensity:0,0,0,0,R.readNoise,R.shotNoise,R.enabled?D*R.gain:0,this.frameIndex%1024,S.contrast,S.saturation,S.temperature,S.tint,S.lift,S.gamma,S.gain,os[S.tonemapper],x.sharpen,S.dither,i.debugView,S.exposureBias]),j=de.enabled&&d.bloomUp.length>1?d.bloomUp[0]:ye,Be=f.beginRenderPass({label:"composite",colorAttachments:[{view:this.outputView(c,u),loadOp:"clear",storeOp:"store",clearValue:[0,0,0,1]}]});Be.setPipeline(this.compositePipe),Be.setBindGroup(0,a.createBindGroup({layout:this.compositePipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("composite",F)}},{binding:1,resource:ye.createView()},{binding:2,resource:j.createView()},{binding:3,resource:this.linearClamp},{binding:5,resource:d.debug.createView()}]})),Be.draw(3),Be.end()}a.queue.submit([f.finish()]),M.copy(this.prevViewProj,B),M.copy(this.prevVmViewProj,U);for(let x of ot)x.visible&&x._endFrame();for(let x of this.skinnedObjects)this.rotateSkin(x);this.historyValid=!0,this.frameIndex++,this.stats.drawCalls=Rt,this.stats.triangles=_t,this.stats.frameMs=performance.now()-s}offscreenOut=null;outputView(e,t){return this.dev.offscreen?((!this.offscreenOut||this.offscreenOut.width!==e||this.offscreenOut.height!==t)&&(this.offscreenOut?.destroy(),this.offscreenOut=this.device.createTexture({size:[e,t],format:"rgba8unorm",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC,label:"offscreen.out"})),this.offscreenOut.createView()):this.dev.context.getCurrentTexture().createView()}async readback(){let e=this.offscreenOut;if(!e)throw new Error("readback requires Renderer.create(canvas, { offscreen: true })");let t=Math.ceil(e.width*4/256)*256,r=this.device.createBuffer({size:t*e.height,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),s=this.device.createCommandEncoder();s.copyTextureToBuffer({texture:e},{buffer:r,bytesPerRow:t},[e.width,e.height]),this.device.queue.submit([s.finish()]),await r.mapAsync(GPUMapMode.READ);let i=new Uint8Array(r.getMappedRange()),a=new Uint8Array(e.width*e.height*4);for(let o=0;o<e.height;o++)a.set(i.subarray(o*t,o*t+e.width*4),o*e.width*4);return r.unmap(),r.destroy(),{width:e.width,height:e.height,data:a}}resetHistory(){this.historyValid=!1}updateSkin(e){let t=e.joints,r=t.length/16;if(!e._skin||e._skin.count!==r){let s=Math.max(64,t.byteLength);e._skin?.cur.destroy(),e._skin?.prev.destroy();let i=this.dev.createBuffer(s,GPUBufferUsage.STORAGE,"joints"),a=this.dev.createBuffer(s,GPUBufferUsage.STORAGE,"joints.prev",t);e._skin={cur:i,prev:a,bg:null,count:r},this.skinnedObjects.add(e)}this.device.queue.writeBuffer(e._skin.cur,0,t)}updateInstances(e){let t=e.instances,r=Math.max(64,e.instanceCount*64);if(!e._inst||e._inst.cap<r){e._inst?.buf.destroy();let s=Math.max(r,(e._inst?.cap??0)*2);e._inst={buf:this.dev.createBuffer(s,GPUBufferUsage.STORAGE,"instances"),bg:null,cap:s},e.instancesDirty=!0}e.instancesDirty&&e.instanceCount>0&&(this.device.queue.writeBuffer(e._inst.buf,0,t,0,e.instanceCount*16),e.instancesDirty=!1)}instBG(e){let t=e._inst;return t.bg||(t.bg=this.makeObjectBG(t.buf,t.buf)),t.bg}skinBG(e){let t=e._skin;return t.bg||(t.bg=this.makeObjectBG(t.cur,t.prev)),t.bg}rotateSkin(e){!e._skin||!e.joints||this.device.queue.writeBuffer(e._skin.prev,0,e.joints)}};var ls=1;function pe(n){return{id:ls++,name:n}}var Qe=class{nextEntity=1;alive=new Set;stores=new Map;names=new Map;onDespawn=[];onRemove=new Map;spawn(e){let t=this.nextEntity++;return this.alive.add(t),e&&this.names.set(t,e),t}despawn(e){if(this.alive.has(e)){for(let t of this.onDespawn)t(e);for(let[t,r]of this.stores)if(r.has(e)){let s=r.get(e);r.delete(e);for(let i of this.onRemove.get(t)??[])i(e,s)}this.alive.delete(e),this.names.delete(e)}}isAlive(e){return this.alive.has(e)}nameOf(e){return this.names.get(e)??`entity#${e}`}get entityCount(){return this.alive.size}add(e,t,r){let s=this.stores.get(t.id);return s||(s=new Map,this.stores.set(t.id,s)),s.set(e,r),r}get(e,t){return this.stores.get(t.id)?.get(e)}require(e,t){let r=this.get(e,t);if(r===void 0)throw new Error(`${this.nameOf(e)} has no ${t.name}`);return r}has(e,t){return this.stores.get(t.id)?.has(e)??!1}remove(e,t){let r=this.stores.get(t.id);if(!r?.has(e))return;let s=r.get(e);r.delete(e);for(let i of this.onRemove.get(t.id)??[])i(e,s)}onRemoved(e,t){let r=this.onRemove.get(e.id)??[];r.push(t),this.onRemove.set(e.id,r)}*query(...e){let t=e.map(s=>this.stores.get(s.id));if(t.some(s=>!s))return;let r=0;for(let s=1;s<t.length;s++)t[s].size<t[r].size&&(r=s);for(let s of[...t[r].keys()]){let i=[s],a=!0;for(let o of t){if(!o.has(s)){a=!1;break}i.push(o.get(s))}a&&(yield i)}}entities(){return this.alive.values()}};var Je=class{position=m.create();rotation=L.create();scale=m.create(1,1,1);parent=null;local=M.create();world=M.create();version=0;worldVersion=-1;parentVersion=-1;constructor(e,t,r){e&&m.copy(this.position,e),t&&L.copy(this.rotation,t),r&&m.copy(this.scale,r)}touch(){this.version++}setPosition(e,t,r){return m.set(this.position,e,t,r),this.version++,this}setRotation(e){return L.copy(this.rotation,e),this.version++,this}setEuler(e,t,r=0){return L.fromEuler(this.rotation,e,t,r),this.version++,this}get stamp(){return this.version+(this.parent?this.parent.stamp*31:0)}getWorld(){let e=this.parent?this.parent.stamp:0;return(this.worldVersion!==this.version||this.parentVersion!==e)&&(M.fromRotationTranslationScale(this.local,this.rotation,this.position,this.scale),this.parent?M.multiply(this.world,this.parent.getWorld(),this.local):M.copy(this.world,this.local),this.worldVersion=this.version,this.parentVersion=e),this.world}worldPosition(e=m.create()){return M.getTranslation(e,this.getWorld())}worldRotation(e=L.create()){return M.getRotation(e,this.getWorld())}forward(e=m.create()){let t=this.getWorld();return m.normalize(e,m.set(e,-t[8],-t[9],-t[10]))}right(e=m.create()){let t=this.getWorld();return m.normalize(e,m.set(e,t[0],t[1],t[2]))}up(e=m.create()){let t=this.getWorld();return m.normalize(e,m.set(e,t[4],t[5],t[6]))}transformPoint(e,t=m.create()){return m.transformMat4(t,e,this.getWorld())}},fe=pe("Transform");var be=class{engine;entity;enabled=!0;_started=!1;get transform(){return this.engine.world.require(this.entity,fe)}get time(){return this.engine.time}get input(){return this.engine.input}get physics(){return this.engine.physics}get audio(){return this.engine.audio}get renderer(){return this.engine.renderer}getComponent(e){return this.engine.world.get(this.entity,e)}addComponent(e,t){return this.engine.world.add(this.entity,e,t)}tune(e,t){this.engine.tuning.number(t.group??this.constructor.name,this,e,t)}},Te=pe("Scripts");var Ze=class{down=new Set;pressed=new Set;released=new Set;mouseDown=new Set;mousePressed=new Set;mouseReleased=new Set;padPrev=[];mouseDX=0;mouseDY=0;wheel=0;sensitivity=.075;invertY=!1;bindings=new Map;locked=!1;gamepad=null;padLookSpeed=160;deadzone=.12;target;constructor(e){this.target=e,addEventListener("keydown",t=>{t.repeat||(this.down.add(t.code),this.pressed.add(t.code),this.locked&&["Tab","Space","KeyF","Backquote"].includes(t.code)&&t.preventDefault())}),addEventListener("keyup",t=>{this.down.delete(t.code),this.released.add(t.code)}),addEventListener("blur",()=>{this.down.clear(),this.mouseDown.clear()}),e.addEventListener("mousedown",t=>{this.mouseDown.add(t.button),this.mousePressed.add(t.button)}),addEventListener("mouseup",t=>{this.mouseDown.delete(t.button),this.mouseReleased.add(t.button)}),addEventListener("mousemove",t=>{this.locked&&(this.mouseDX+=t.movementX,this.mouseDY+=t.movementY)}),addEventListener("wheel",t=>{this.wheel+=Math.sign(t.deltaY)},{passive:!0}),e.addEventListener("contextmenu",t=>t.preventDefault()),document.addEventListener("pointerlockchange",()=>{this.locked=document.pointerLockElement===this.target}),this.defaultBindings()}async lock(){try{await this.target.requestPointerLock.call(this.target,{unadjustedMovement:!0})}catch{try{await this.target.requestPointerLock()}catch{}}}unlock(){document.exitPointerLock()}defaultBindings(){let e=(t,r)=>this.bindings.set(t,r);e("forward",{keys:["KeyW"]}),e("back",{keys:["KeyS"]}),e("left",{keys:["KeyA"]}),e("right",{keys:["KeyD"]}),e("sprint",{keys:["ShiftLeft"],gamepadButtons:[10]}),e("crouch",{keys:["KeyC","ControlLeft"],gamepadButtons:[1]}),e("jump",{keys:["Space"],gamepadButtons:[0]}),e("fire",{mouse:[0],gamepadButtons:[7]}),e("aim",{mouse:[2],gamepadButtons:[6]}),e("reload",{keys:["KeyR"],gamepadButtons:[2]}),e("fireMode",{keys:["KeyX"],gamepadButtons:[12]}),e("leanLeft",{keys:["KeyQ"],gamepadButtons:[4]}),e("leanRight",{keys:["KeyE"],gamepadButtons:[5]}),e("earpro",{keys:["KeyV"]}),e("camera",{keys:["KeyH"]}),e("tuning",{keys:["F1","Backquote"]}),e("holdBreath",{keys:["AltLeft"],gamepadButtons:[11]})}padButton(e){return!!this.gamepad?.buttons[e]?.pressed}action(e){let t=this.bindings.get(e);return t?(t.keys?.some(r=>this.down.has(r))??!1)||(t.mouse?.some(r=>this.mouseDown.has(r))??!1)||(t.gamepadButtons?.some(r=>this.padButton(r))??!1):!1}actionPressed(e){let t=this.bindings.get(e);return t?(t.keys?.some(r=>this.pressed.has(r))??!1)||(t.mouse?.some(r=>this.mousePressed.has(r))??!1)||(t.gamepadButtons?.some(r=>this.padButton(r)&&!this.padPrev[r])??!1):!1}actionReleased(e){let t=this.bindings.get(e);return t?(t.keys?.some(r=>this.released.has(r))??!1)||(t.mouse?.some(r=>this.mouseReleased.has(r))??!1):!1}key(e){return this.down.has(e)}keyPressed(e){return this.pressed.has(e)}moveAxis(){let e=(this.action("right")?1:0)-(this.action("left")?1:0),t=(this.action("forward")?1:0)-(this.action("back")?1:0);if(this.gamepad){let s=this.gamepad.axes[0]??0,i=this.gamepad.axes[1]??0;Math.hypot(s,i)>this.deadzone&&(e+=s,t-=i)}let r=Math.hypot(e,t);return r>1&&(e/=r,t/=r),{x:e,y:t}}lookDelta(e){let t=this.sensitivity*Math.PI/180,r=-this.mouseDX*t,s=-this.mouseDY*t*(this.invertY?-1:1);if(this.gamepad){let i=this.gamepad.axes[2]??0,a=this.gamepad.axes[3]??0,o=this.padLookSpeed*Math.PI/180*e;Math.abs(i)>this.deadzone&&(r-=Math.sign(i)*(Math.abs(i)-this.deadzone)/(1-this.deadzone)*o),Math.abs(a)>this.deadzone&&(s-=Math.sign(a)*(Math.abs(a)-this.deadzone)/(1-this.deadzone)*o)}return{yaw:r,pitch:s}}rumble(e,t,r){this.gamepad?.vibrationActuator?.playEffect?.("dual-rumble",{duration:r,strongMagnitude:Math.min(1,e),weakMagnitude:Math.min(1,t)})}poll(){let e=navigator.getGamepads?.()??[];this.gamepad=e.find(t=>t&&t.connected)??null}endFrame(){this.pressed.clear(),this.released.clear(),this.mousePressed.clear(),this.mouseReleased.clear(),this.mouseDX=0,this.mouseDY=0,this.wheel=0,this.gamepad&&(this.padPrev=this.gamepad.buttons.map(e=>e.pressed))}};var te={gl:"fondaineGL",vorp:"vorp",oaxis:"oAxis"},et=class n{hub;storageKey;module;constructor(e="fondaine.tuning",t=te.gl,r){this.storageKey=e,this.module=t,this.hub=r??{params:[],listeners:[]}}get params(){return this.hub.params}scope(e){return new n(this.storageKey,e,this.hub)}get modules(){return[...new Set(this.hub.params.map(e=>e.module))]}k(e,t){return`${this.module}:${e}.${t}`}number(e,t,r,s){return this.hub.params.push({module:this.module,group:e,key:this.k(e,r),label:s.label??r,kind:"number",min:s.min,max:s.max,step:s.step??(s.max-s.min)/200,unit:s.unit,help:s.help,get:()=>t[r],set:i=>{t[r]=Number(i),s.onChange?.(Number(i)),this.emit()}}),this}bool(e,t,r,s={}){return this.hub.params.push({module:this.module,group:e,key:this.k(e,r),label:s.label??r,kind:"bool",help:s.help,get:()=>t[r],set:i=>{t[r]=!!i,s.onChange?.(!!i),this.emit()}}),this}choice(e,t,r,s,i={}){return this.hub.params.push({module:this.module,group:e,key:this.k(e,r),label:i.label??r,kind:"enum",options:s,help:i.help,get:()=>t[r],set:a=>{t[r]=String(a),i.onChange?.(String(a)),this.emit()}}),this}arrayValue(e,t,r,s){return this.hub.params.push({module:this.module,group:e,key:this.k(e,s.key),label:s.label,kind:"number",min:s.min,max:s.max,step:s.step??(s.max-s.min)/200,unit:s.unit,help:s.help,get:()=>t[r],set:i=>{t[r]=Number(i),s.onChange?.(),this.emit()}}),this}groups(e=this.module){return[...new Set(this.hub.params.filter(t=>t.module===e).map(t=>t.group))]}unregister(e,t=this.module){for(let r=this.hub.params.length-1;r>=0;r--)this.hub.params[r].module===t&&this.hub.params[r].group===e&&this.hub.params.splice(r,1)}onChange(e){this.hub.listeners.push(e)}emit(){for(let e of this.hub.listeners)e()}snapshot(e=this.module){let t={};for(let r of this.hub.params)(e==="*"||r.module===e)&&(t[r.key]=r.get());return t}apply(e){for(let t of this.hub.params)t.key in e&&t.set(e[t.key])}save(e="default",t=this.module){try{localStorage.setItem(`${this.storageKey}.${t}.${e}`,JSON.stringify(this.snapshot(t)))}catch{}}load(e="default",t=this.module){try{let r=localStorage.getItem(`${this.storageKey}.${t}.${e}`);return r?(this.apply(JSON.parse(r)),!0):!1}catch{return!1}}exportJSON(e=this.module){return JSON.stringify(this.snapshot(e),null,2)}};var cs=`
.fdui{position:fixed;top:0;right:0;bottom:0;width:380px;background:rgba(14,15,17,.94);color:#d8dade;font:12px/1.35 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;z-index:50;display:flex;flex-direction:column;border-left:1px solid #2a2d33;backdrop-filter:blur(6px)}
.fdui header{display:flex;align-items:center;gap:8px;padding:10px 12px;border-bottom:1px solid #2a2d33}
.fdui header b{font-size:13px;letter-spacing:.04em}
.fdui header .logo{font-weight:700;color:#f3b23a}
.fdui .stats{padding:6px 12px;color:#8e939c;border-bottom:1px solid #2a2d33;white-space:pre}
.fdui .mods{display:flex;gap:0;border-bottom:1px solid #2a2d33}
.fdui .mods button{flex:1;background:none;color:#8e939c;border:0;border-bottom:2px solid transparent;padding:8px 4px;cursor:pointer;font:inherit;font-weight:700;letter-spacing:.03em}
.fdui .mods button.on{color:#f3b23a;border-bottom-color:#f3b23a}
.fdui .tabs{display:flex;flex-wrap:wrap;gap:4px;padding:8px 12px;border-bottom:1px solid #2a2d33}
.fdui .tabs button{background:#1d2025;color:#b9bcc3;border:1px solid #30343b;border-radius:4px;padding:3px 7px;cursor:pointer;font:inherit}
.fdui .tabs button.on{background:#f3b23a;color:#111;border-color:#f3b23a}
.fdui .body{overflow:auto;flex:1;padding:6px 12px 20px}
.fdui .row{display:grid;grid-template-columns:150px 1fr 64px;align-items:center;gap:8px;padding:3px 0}
.fdui .row label{color:#aeb2ba;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.fdui .row input[type=range]{width:100%;accent-color:#f3b23a}
.fdui .row input[type=number]{width:64px;background:#121417;color:#e6e7ea;border:1px solid #30343b;border-radius:3px;font:inherit;padding:1px 3px}
.fdui .row select{background:#121417;color:#e6e7ea;border:1px solid #30343b;font:inherit}
.fdui .row .unit{color:#6f747d;font-size:10px}
.fdui footer{display:flex;gap:6px;padding:8px 12px;border-top:1px solid #2a2d33;flex-wrap:wrap}
.fdui footer button{background:#1d2025;color:#d8dade;border:1px solid #30343b;border-radius:4px;padding:4px 8px;cursor:pointer;font:inherit}
.fdui .help{grid-column:1/-1;color:#6f747d;font-size:10.5px;margin:-2px 0 4px}
`,tt=class{constructor(e,t="fondaine"){this.tuning=e;if(!document.getElementById("fdui-css")){let i=document.createElement("style");i.id="fdui-css",i.textContent=cs,document.head.appendChild(i)}this.root=document.createElement("div"),this.root.className="fdui",this.root.style.display="none",this.root.innerHTML=`<header><span class="logo">/f</span><b>${t}</b><span style="margin-left:auto;color:#6f747d">F1 to close</span></header>`,this.statsEl=document.createElement("div"),this.statsEl.className="stats",this.mods=document.createElement("div"),this.mods.className="mods",this.tabs=document.createElement("div"),this.tabs.className="tabs",this.body=document.createElement("div"),this.body.className="body";let r=document.createElement("footer"),s=(i,a)=>{let o=document.createElement("button");o.textContent=i,o.onclick=a,r.appendChild(o)};s("Save",()=>e.save("default",this.module)),s("Load",()=>{e.load("default",this.module),this.refresh()}),s("Export JSON",()=>{let i=new Blob([e.exportJSON(this.module)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(i),a.download=`${this.module}-tuning.json`,a.click()}),s("Import JSON",()=>{let i=document.createElement("input");i.type="file",i.accept=".json",i.onchange=async()=>{let a=i.files?.[0];a&&(e.apply(JSON.parse(await a.text())),this.refresh())},i.click()}),this.root.append(this.statsEl,this.mods,this.tabs,this.body,r),document.body.appendChild(this.root);for(let i of["keydown","mousedown","wheel"])this.root.addEventListener(i,a=>a.stopPropagation())}root;body;statsEl;tabs;mods;module="";group="";inputs=new Map;visible=!1;statsText=()=>"";toggle(e=!this.visible){this.visible=e,this.root.style.display=e?"flex":"none",e&&this.rebuild()}rebuild(){let e=this.tuning.modules;(!this.module||!e.includes(this.module))&&(this.module=e[0]??""),this.mods.innerHTML="";for(let r of e){let s=document.createElement("button");s.textContent=r,r===this.module&&(s.className="on"),s.onclick=()=>{this.module=r,this.group="",this.rebuild()},this.mods.appendChild(s)}let t=this.tuning.groups(this.module);(!this.group||!t.includes(this.group))&&(this.group=t[0]??""),this.tabs.innerHTML="";for(let r of t){let s=document.createElement("button");s.textContent=r,r===this.group&&(s.className="on"),s.onclick=()=>{this.group=r,this.rebuild()},this.tabs.appendChild(s)}this.body.innerHTML="",this.inputs.clear();for(let r of this.tuning.params.filter(s=>s.module===this.module&&s.group===this.group))this.body.appendChild(this.row(r))}row(e){let t=document.createElement("div");t.className="row";let r=document.createElement("label");if(r.textContent=e.unit?`${e.label} (${e.unit})`:e.label,r.title=e.help??e.key,t.appendChild(r),e.kind==="number"){let s=document.createElement("input");s.type="range",s.min=String(e.min),s.max=String(e.max),s.step=String(e.step??.01);let i=document.createElement("input");i.type="number",i.step=String(e.step??.01);let a=()=>{let o=Number(e.get());s.value=String(o),i.value=String(+o.toPrecision(5))};s.oninput=()=>{e.set(Number(s.value)),i.value=String(+Number(s.value).toPrecision(5))},i.onchange=()=>{e.set(Number(i.value)),s.value=i.value},a(),this.inputs.set(e.key,a),t.append(s,i)}else if(e.kind==="bool"){let s=document.createElement("input");s.type="checkbox",s.checked=!!e.get(),s.onchange=()=>e.set(s.checked),this.inputs.set(e.key,()=>{s.checked=!!e.get()}),t.append(s,document.createElement("span"))}else{let s=document.createElement("select");for(let i of e.options??[]){let a=document.createElement("option");a.value=i,a.textContent=i,s.appendChild(a)}s.value=String(e.get()),s.onchange=()=>e.set(s.value),this.inputs.set(e.key,()=>{s.value=String(e.get())}),t.append(s,document.createElement("span"))}if(e.help){let s=document.createElement("div");s.className="help",s.textContent=e.help,t.appendChild(s)}return t}refresh(){for(let e of this.inputs.values())e()}update(){this.visible&&(this.statsEl.textContent=this.statsText())}};var zt=(r=>(r[r.Sphere=0]="Sphere",r[r.Box=1]="Box",r[r.Capsule=2]="Capsule",r))(zt||{}),Tt=class{constructor(e,t,r,s){this.p=e;this.id=t;this.radius=r;this.height=s}setPosition(e,t,r){this.p.ex.fp_character_set_position(this.id,e,t,r)}move(e,t,r){let s=this.p.ex.fp_character_move(this.id,e,t,r),i=this.p.result(8);return{position:m.create(i[0],i[1],i[2]),grounded:(s&1)!==0,ceiling:(s&2)!==0,wall:(s&4)!==0,groundNormal:m.create(i[3],i[4],i[5]),groundMaterial:i[6]}}setHeight(e){let t=this.p.ex.fp_character_set_height(this.id,e)===1;return t&&(this.height=e),t}remove(){this.p.ex.fp_character_remove(this.id)}},At=class{constructor(e,t){this.p=e;this.id=t}setTransform(e,t=[0,0,0,1]){this.p.ex.fp_body_set_transform(this.id,e[0],e[1],e[2],t[0],t[1],t[2],t[3])}setVelocity(e,t=[0,0,0]){this.p.ex.fp_body_set_velocity(this.id,e[0],e[1],e[2],t[0],t[1],t[2])}applyImpulse(e,t){this.p.ex.fp_body_apply_impulse(this.id,e[0],e[1],e[2],t[0],t[1],t[2])}remove(){this.p.ex.fp_body_remove(this.id)}state(){return this.p.bodyState(this.id)}get alive(){return this.state()[0]>.5}},rt=class n{ex;stride=15;onProjectileHit=[];onContact=[];constructor(e){this.ex=e,this.stride=e.fp_body_stride?.()??15}static async load(e){let t=await(await fetch(e)).arrayBuffer();return n.fromBytes(t)}static async fromBytes(e){let t=await WebAssembly.compile(e),r={};for(let i of WebAssembly.Module.imports(t))r[i.module]??={},r[i.module][i.name]=i.kind==="function"?()=>0:void 0;let s=await WebAssembly.instantiate(t,r);return new n(s.exports)}f32(e,t){return new Float32Array(this.ex.memory.buffer,e,t)}result(e){return this.f32(this.ex.fp_result_ptr(),e)}withF32(e,t){let r=e.length*4,s=this.ex.fp_alloc(r);this.f32(s,e.length).set(e);try{return t(s)}finally{this.ex.fp_free(s,r)}}setMaterial(e,t){this.ex.fp_set_material(e,t.friction??.6,t.restitution??.2,t.ricochetAngleDeg??0,t.ricochetEnergyKeep??.3)}reset(){this.ex.fp_world_reset()}staticMeshes=[];addStaticMesh(e,t,r){this.staticMeshes.push({positions:Float32Array.from(e),indices:Uint32Array.from(t),material:r});let s=e.length/3,i=t.length,a=s*12,o=i*4,l=this.ex.fp_alloc(a),c=this.ex.fp_alloc(o);this.f32(l,e.length).set(e),new Uint32Array(this.ex.memory.buffer,c,i).set(t);let u=this.ex.fp_add_static_mesh(l,s,c,i,r);return this.ex.fp_free(l,a),this.ex.fp_free(c,o),u}addGeometry(e,t,r){let s=e.positions,i=new Float32Array(s.length),a=m.create();for(let o=0;o<s.length;o+=3)m.transformMat4(a,s.subarray(o,o+3),t),i.set(a,o);return this.addStaticMesh(i,e.indices,r)}build(){this.ex.fp_build()}raycast(e,t,r,s=!0){if(!this.ex.fp_raycast(e[0],e[1],e[2],t[0],t[1],t[2],r,s?1:0))return null;let a=this.result(10);return{t:a[0],point:m.create(a[1],a[2],a[3]),normal:m.create(a[4],a[5],a[6]),material:a[7],triangle:a[8],body:a[9]}}raycastBatch(e,t){let r=e.length/6,s=this.ex.fp_alloc(r*4),i=this.withF32(e,a=>(this.ex.fp_raycast_batch(a,r,t,s),this.f32(s,r).slice()));return this.ex.fp_free(s,r*4),i}bakeSkyVisibility(e,t,r,s,i,a=48,o=60){let l=r*s*i,c=this.ex.fp_alloc(l*4);this.ex.fp_bake_sky_visibility(e[0],e[1],e[2],t,r,s,i,a,o,c);let u=this.f32(c,l).slice();return this.ex.fp_free(c,l*4),u}bakeGI(e){let t=e.nx*e.ny*e.nz,r=t*12*4,s=108,i=Math.max(4,e.albedo.length*4),a=this.ex.fp_alloc(r),o=this.ex.fp_alloc(s),l=this.ex.fp_alloc(i);this.f32(o,27).set(Array.from(e.skySH).slice(0,27)),this.f32(l,e.albedo.length).set(e.albedo);let c=this.ex.fp_bake_gi(e.min[0],e.min[1],e.min[2],e.cell,e.nx,e.ny,e.nz,e.rays??192,e.passes??3,e.sunDir[0],e.sunDir[1],e.sunDir[2],e.sunRGB[0],e.sunRGB[1],e.sunRGB[2],o,l,Math.floor(e.albedo.length/3),e.maxDist??400,a),u=this.f32(a,t*12).slice();return this.ex.fp_free(a,r),this.ex.fp_free(o,s),this.ex.fp_free(l,i),{data:u,filled:c}}giPositions(e,t,r,s,i){let a=e.nx*e.ny*e.nz,o=this.ex.fp_alloc(a*12),l=this.ex.fp_alloc(Math.max(4,a));this.ex.fp_gi_positions(e.min[0],e.min[1],e.min[2],e.cell,e.nx,e.ny,e.nz,e.rays,t,r,o,l);let c=t*e.nx*e.ny,u=Math.min(e.nz,r)*e.nx*e.ny;s.set(this.f32(o+c*12,(u-c)*3),c*3),i.set(new Uint8Array(this.ex.memory.buffer,l+c,u-c),c),this.ex.fp_free(o,a*12),this.ex.fp_free(l,Math.max(4,a))}giPass(e,t,r,s,i,a,o,l){let c=e.nx*e.ny*e.nz,u={pos:c*12,valid:Math.max(4,c),prev:c*48,out:c*48,sh:108,al:Math.max(4,e.albedo.length*4)},h=this.ex.fp_alloc(u.pos),p=this.ex.fp_alloc(u.valid),d=this.ex.fp_alloc(u.out),f=this.ex.fp_alloc(u.sh),b=this.ex.fp_alloc(u.al),v=i?this.ex.fp_alloc(u.prev):0;this.f32(h,c*3).set(r),new Uint8Array(this.ex.memory.buffer,p,c).set(s),i&&this.f32(v,c*12).set(i),this.f32(f,27).set(Array.from(e.skySH).slice(0,27)),this.f32(b,e.albedo.length).set(e.albedo),this.ex.fp_gi_pass(e.min[0],e.min[1],e.min[2],e.cell,e.nx,e.ny,e.nz,e.rays,t,e.sunDir[0],e.sunDir[1],e.sunDir[2],e.sunRGB[0],e.sunRGB[1],e.sunRGB[2],f,b,Math.floor(e.albedo.length/3),e.maxDist??400,h,p,v,a,o,d);let g=a*e.nx*e.ny,y=Math.min(e.nz,o)*e.nx*e.ny;l.set(this.f32(d+g*48,(y-g)*12),g*12),this.ex.fp_free(h,u.pos),this.ex.fp_free(p,u.valid),this.ex.fp_free(d,u.out),this.ex.fp_free(f,u.sh),this.ex.fp_free(b,u.al),i&&this.ex.fp_free(v,u.prev)}createCharacter(e,t,r=.35,s=50){return new Tt(this,this.ex.fp_character_create(e,t,r,s),e,t)}createBody(e,t,r,s){return new At(this,this.ex.fp_body_create(e,t[0],t[1],t[2],r,s))}bodyState(e){let t=this.ex.fp_bodies_ptr();return this.f32(t+e*this.stride*4,this.stride)}setGravity(e,t,r){this.ex.fp_set_gravity(e,t,r)}setAtmosphere(e,t,r,s){this.ex.fp_set_atmosphere(e,t,r,s[0],s[1],s[2])}spawnProjectile(e,t,r){return this.ex.fp_projectile_spawn(e[0],e[1],e[2],t[0],t[1],t[2],r.bcG7,r.massKg,r.diameterM,r.maxTime??6,r.userId??0)}projectiles(){let e=this.ex.fp_projectile_count();if(!e)return[];let t=this.f32(this.ex.fp_projectiles_ptr(),e*8),r=[];for(let s=0;s<e;s++){let i=s*8;r.push({id:t[i],userId:t[i+1],position:m.create(t[i+2],t[i+3],t[i+4]),velocity:m.create(t[i+5],t[i+6],t[i+7])})}return r}step(e){this.ex.fp_step(e);let t=this.ex.fp_projectile_hit_count();if(t&&this.onProjectileHit.length){let s=this.f32(this.ex.fp_projectile_hits_ptr(),t*16).slice();for(let i=0;i<t;i++){let a=i*16,o={userId:s[a],point:m.create(s[a+1],s[a+2],s[a+3]),normal:m.create(s[a+4],s[a+5],s[a+6]),velocity:m.create(s[a+7],s[a+8],s[a+9]),material:s[a+10],distance:s[a+11],timeOfFlight:s[a+12],body:s[a+13],ricochet:s[a+14]>.5,projectileId:s[a+15]};for(let l of this.onProjectileHit)l(o)}}let r=this.ex.fp_contact_count();if(r&&this.onContact.length){let s=this.f32(this.ex.fp_contacts_ptr(),r*10).slice();for(let i=0;i<r;i++){let a=i*10,o={body:s[a],point:m.create(s[a+1],s[a+2],s[a+3]),normal:m.create(s[a+4],s[a+5],s[a+6]),impulse:s[a+7],speed:s[a+8],otherMaterial:s[a+9]};for(let l of this.onContact)l(o)}}}};import{Vorp as us,whithamNWave as ms,speedOfSound as ds,IMPACTS as fr,BUS as Gt}from"./vorp.js";var st=class{constructor(e,t){this.physics=e;this.urls=t}vorp=null;settings={reflections:!0,probeRays:14,probeDistance:45,occlusion:!0,occlusionDb:-14,occlusionLowpassHz:1100,cracks:!0};surfaces=new Map;listener={position:m.create(),forward:m.create(0,0,-1),up:m.create(0,1,0)};zone=null;zoneOrigin=m.create();pending=[];creating=null;crackDone=new Set;prevProj=new Map;tempC=18;async start(){if(this.vorp)return await this.vorp.resume(),this.vorp;this.creating||(this.creating=us.create({wasmUrl:this.urls.wasm,workletUrl:this.urls.worklet}).then(t=>{this.vorp=t,this.zone&&t.setZone(this.zone),t.setAtmosphere(this.tempC,.55);for(let r of this.pending)r();return this.pending=[],t}));let e=await this.creating;return await e.resume(),e}whenReady(e){this.vorp?e():this.pending.push(e)}setZone(e){this.zone=e,this.vorp?.setZone(e)}surface(e){return this.surfaces.get(e)??{reflection:.8,lowpassHz:6e3}}update(e){e.forward(this.listener.forward),e.up(this.listener.up),m.copy(this.listener.position,e.position);let t=this.vorp;t&&(t.setListener(this.listener.position,this.listener.forward,this.listener.up),this.settings.cracks&&this.physics&&this.trackCracks(t),t.flush())}computeTaps(e,t,r=0){let s=this.physics,i=this.listener.position,a=[],o=m.clone(e),l=t?m.normalize(m.create(),m.clone(t)):null,c=h=>{if(!l||r<=0)return 1;let p=m.dot(l,h);return Math.pow(10,-r*(1-p)*.5/20)},u=(h,p,d,f)=>{let b=m.sub(m.create(),i,h),v=m.length(b);if(v<.2)return;let g=m.dot(b,d);if(Math.abs(g)<1e-5)return;let y=m.dot(m.sub(m.create(),p,h),d)/g;if(y<=0||y>=1)return;let w=m.scaleAndAdd(m.create(),h,b,y),P=m.normalize(m.create(),m.sub(m.create(),w,o)),k=m.normalize(m.create(),m.sub(m.create(),w,i)),A=this.surface(f),T=A.reflection*c(P)/v;a.push({path:v,gain:T,lowpassHz:A.lowpassHz,dir:k,energy:T*T})};if(s&&this.settings.reflections){let h=s.raycast(o,[0,-1,0],50,!1);h&&u(m.scaleAndAdd(m.create(),o,h.normal,-2*m.dot(m.sub(m.create(),o,h.point),h.normal)),h.point,h.normal,h.material);let p=this.settings.probeRays;for(let d=0;d<p;d++){let f=2.399963*d,b=d===p-1?1:d/(p-1)*.9-.25,v=Math.sqrt(Math.max(0,1-b*b)),g=m.create(Math.cos(f)*v,b,Math.sin(f)*v),y=s.raycast(i,g,this.settings.probeDistance,!1);if(!y||y.t<.3)continue;let w=y.normal,P=m.dot(m.sub(m.create(),o,y.point),w);if(P<=0)continue;let k=m.scaleAndAdd(m.create(),o,w,-2*P);u(k,y.point,w,y.material)}}for(let h of this.zone?.farReflectors??[]){let p=h.azimuth*Math.PI/180,d=m.create(this.zoneOrigin[0]+Math.sin(p)*h.distance,o[1],this.zoneOrigin[2]-Math.cos(p)*h.distance),f=m.distance(o,d)+m.distance(d,i),b=m.normalize(m.create(),m.sub(m.create(),d,o)),v=m.normalize(m.create(),m.sub(m.create(),d,i)),g=h.reflectivity*c(b)/f;a.push({path:f,gain:g,lowpassHz:h.lowpassHz,dir:v,energy:g*g})}return a.sort((h,p)=>p.energy-h.energy),a.slice(0,10)}occlusionOf(e){if(!this.physics||!this.settings.occlusion)return null;let t=m.sub(m.create(),this.listener.position,m.clone(e)),r=m.length(t);if(r<.3)return null;m.scale(t,t,1/r);let s=m.scaleAndAdd(m.create(),m.clone(e),t,.05);return this.physics.raycast(s,t,r-.15,!1)?{db:this.settings.occlusionDb,lowpass:this.settings.occlusionLowpassHz}:null}finish(e,t,r,s){e.setTaps(this.computeTaps(t,r,s));let i=this.occlusionOf(t);i&&e.setOcclusion(i.db,i.lowpass)}gunshot(e,t,r,s,i={}){let a=this.vorp;if(!a)return null;let o=a.gunshot(e,t,r,s,i);return this.finish(o.blast,t,r,e.params.directivityDb??9),o.action&&s&&o.action.setTaps(this.computeTaps(s,null,0).slice(0,4)),o}impact(e,t,r=0){let s=this.vorp;if(!s)return null;let i={...fr[e]??fr.dirt};i.levelSpl=(i.levelSpl??110)+r;let a=s.noise(i,t,{bus:Gt.IMPACTS});return this.finish(a,t,null,0),a}modal(e,t,r,s=1,i={}){let a=this.vorp;if(!a)return null;let o=a.modal(e,t,r,s,i);return this.finish(o,r,null,0),o}footstep(e,t){let r=this.vorp;return r?r.noise(e,t,{bus:Gt.ENV,reverbSendDb:r.zoneSendDb}):null}projectileInfo=new Map;trackCracks(e){let t=this.physics,r=this.listener.position,s=ds(this.tempC),i=t.projectiles(),a=new Set;for(let o of i){a.add(o.id);let l=this.prevProj.get(o.id);if(this.prevProj.set(o.id,m.clone(o.position)),!l||this.crackDone.has(o.id))continue;let c=m.length(o.velocity);if(c<=s*1.01)continue;let u=m.sub(m.create(),o.position,l),h=m.lengthSq(u);if(h<1e-8)continue;let p=m.dot(m.sub(m.create(),r,l),u)/h;if(p<0||p>1)continue;let d=m.scaleAndAdd(m.create(),l,u,p),f=m.distance(d,r);if(f>60||f<.02)continue;let b=m.distance(d,l),v=this.projectileInfo.get(o.userId)??{diameter:.0057,length:.023},g=ms({mach:c/s,diameter:v.diameter,length:v.length,missDistance:f,c:s}),y=m.normalize(m.create(),u),w=s/c,P=m.scaleAndAdd(m.create(),d,y,-f*Math.sqrt(1-w*w)/Math.max(w,.001));e.crack(g.peakPa,g.duration,P,{bus:Gt.WEAPONS}).setTaps(this.computeTaps(P,null,0)),this.crackDone.add(o.id)}for(let o of[...this.prevProj.keys()])a.has(o)||(this.prevProj.delete(o),this.crackDone.delete(o))}};import{AMBIENCE_PARAMS as hs,HEARING_PARAMS as ps,MASTER_PARAMS as fs,REVERB_PARAMS as bs,OP as it}from"./vorp.js";function br(n,e){let t=n.scope(te.gl),r=e.settings,s=e.sky.settings;t.number("Sky",s,"sunElevation",{label:"Sun elevation",min:-10,max:90,step:.1,unit:"\xB0"}).number("Sky",s,"sunAzimuth",{label:"Sun azimuth",min:0,max:360,step:.5,unit:"\xB0"}).number("Sky",s,"sunIlluminance",{label:"Solar illuminance (TOA)",min:1e3,max:14e4,step:100,unit:"lux",help:"Extraterrestrial sun illuminance \u2248 128 000 lux. Everything else is derived from this."}).number("Sky",s,"sunAngularDiameter",{label:"Sun angular diameter",min:.1,max:5,step:.01,unit:"\xB0",help:"Real sun: 0.53\xB0. Sets penumbra width of all sun shadows (PCSS) and sun specular size."}).number("Sky",s,"turbidity",{label:"Aerosol (haze)",min:0,max:10,step:.05,help:"Mie density. Hazy/humid days \u2248 2\u20134."}).number("Sky",s,"rayleigh",{label:"Rayleigh density",min:0,max:4,step:.01}).number("Sky",s,"ozone",{label:"Ozone",min:0,max:4,step:.01}).number("Sky",s,"mieG",{label:"Mie anisotropy",min:0,max:.99,step:.01}).number("Sky",s,"groundAlbedo",{label:"Ground albedo (env)",min:0,max:1,step:.01}).number("Sky",s,"multiScatter",{label:"Multiple scattering",min:.5,max:2.5,step:.01}).number("Sky",r.ibl,"intensity",{label:"IBL intensity",min:0,max:3,step:.01,help:"Keep at 1 for physical correctness."}).number("Sky",r.ibl,"specularOcclusion",{label:"Specular occlusion",min:0,max:1,step:.01}).number("Sky",r.ibl,"occludedAmbient",{label:"Bounce fill (occluded sky)",min:0,max:1,step:.01,help:"Fraction of sky ambient still arriving from occluded sky directions. \u22480.1\u20130.2."}).number("Sky",r.ibl,"viewmodelFill",{label:"Viewmodel ambient fill",min:.5,max:3,step:.05,help:"Ambient multiplier on the first-person weapon and hands only (1 = physical). Dark gear in roof shadow needs \u22481.5\u20132 to read like it does to an adapted eye."}).number("Sky",r.ibl,"groundBounce",{label:"Sun ground bounce",min:0,max:2,step:.01,help:"One-bounce sunlight (sun lux \xD7 ground albedo / \u03C0) received where the sky is blocked \u2014 lights pavilion/porch interiors. No real-time GI: \u22480.4\u20130.8 on sunny days."}),t.bool("Global illumination",r.gi,"enabled",{label:"Baked GI probes",help:"Path-traced at load: sky occlusion + multi-bounce sun/sky light. Replaces the analytic fill inside the probe volume."}).number("Global illumination",r.gi,"intensity",{label:"GI intensity",min:0,max:3,step:.01,help:"Keep at 1 for physical correctness."}),t.number("Atmosphere",r.wind,"speed",{label:"Wind speed",min:0,max:20,step:.1,unit:"m/s",help:"Drives foliage sway (and should match the physics/particle wind)."}).number("Atmosphere",r.wind,"bend",{label:"Foliage bend",min:0,max:.2,step:.001,unit:"m per m/s",help:"Tip displacement of a 1 m blade per m/s of wind."}).number("Atmosphere",r.wind,"turbulence",{label:"Foliage flutter",min:0,max:1,step:.01}),t.bool("Clouds",r.clouds,"enabled",{label:"Cloud deck"}).number("Clouds",r.clouds,"coverage",{label:"Coverage",min:0,max:1,step:.01,help:"Fraction of sky covered (scattered \u2248 0.3\u20130.5, broken \u2248 0.6\u20130.85, overcast 1). For overcast also lower the sun illuminance."}).number("Clouds",r.clouds,"density",{label:"Optical density",min:0,max:6,step:.01}).number("Clouds",r.clouds,"altitude",{label:"Altitude",min:300,max:9e3,step:10,unit:"m",help:"Cumulus base \u2248 1\u20132 km."}).number("Clouds",r.clouds,"scale",{label:"Feature size",min:200,max:12e3,step:10,unit:"m"}).number("Clouds",r.clouds,"windSpeed",{label:"Wind aloft",min:0,max:60,step:.1,unit:"m/s"}).number("Clouds",r.clouds,"windDirDeg",{label:"Wind direction",min:0,max:360,step:1,unit:"\xB0"}).number("Clouds",r.clouds,"shadowStrength",{label:"Cloud shadows",min:0,max:1,step:.01,help:"How much a thick cloud dims direct sunlight on the ground."}),t.choice("Exposure",r.exposure,"mode",["auto","manual","camera"],{label:"Mode",help:"auto = eye/camera metering; manual = EV100; camera = aperture/shutter/ISO of the Camera."}).number("Exposure",r.exposure,"ev100",{label:"Manual EV100",min:-6,max:20,step:.1,help:"Sunny 16 \u2248 15, overcast \u2248 12, indoor \u2248 7, night \u2248 0."}).number("Exposure",r.exposure,"compensation",{label:"Compensation",min:-5,max:5,step:.05,unit:"EV"}).number("Exposure",r.exposure,"minEv100",{label:"Min EV100",min:-10,max:20,step:.1}).number("Exposure",r.exposure,"maxEv100",{label:"Max EV100",min:-10,max:22,step:.1}).number("Exposure",r.exposure,"speedUp",{label:"Adapt to bright",min:.05,max:20,step:.05,unit:"EV/s"}).number("Exposure",r.exposure,"speedDown",{label:"Adapt to dark",min:.05,max:20,step:.05,unit:"EV/s"}).number("Exposure",r.exposure,"lowPercent",{label:"Metering low %",min:0,max:.99,step:.01}).number("Exposure",r.exposure,"highPercent",{label:"Metering high %",min:.01,max:1,step:.01}).number("Exposure",r.exposure,"centerWeight",{label:"Centre weighting",min:0,max:1,step:.01}),t.choice("Tone & colour",r.grade,"tonemapper",["agx","aces","neutral","none"],{label:"Tonemapper"}).number("Tone & colour",r.grade,"exposureBias",{label:"Exposure bias",min:-4,max:4,step:.05,unit:"EV"}).number("Tone & colour",r.grade,"contrast",{label:"Contrast",min:.5,max:1.6,step:.01}).number("Tone & colour",r.grade,"saturation",{label:"Saturation",min:0,max:2,step:.01}).number("Tone & colour",r.grade,"temperature",{label:"White balance temp",min:-1,max:1,step:.01}).number("Tone & colour",r.grade,"tint",{label:"White balance tint",min:-1,max:1,step:.01}).number("Tone & colour",r.grade,"lift",{label:"Lift",min:-.2,max:.2,step:.001}).number("Tone & colour",r.grade,"gamma",{label:"Gamma",min:.5,max:2,step:.01}).number("Tone & colour",r.grade,"gain",{label:"Gain",min:.5,max:2,step:.01}).number("Tone & colour",r.grade,"dither",{label:"Dither",min:0,max:2,step:.01}),t.number("Lens & sensor",r.lens,"distortion",{label:"Barrel distortion k1",min:-.6,max:.6,step:.005,help:"Negative = barrel (wide/bodycam lenses), positive = pincushion."}).number("Lens & sensor",r.lens,"distortion2",{label:"Distortion k2",min:-.5,max:.5,step:.005}).number("Lens & sensor",r.lens,"fillZoom",{label:"Distortion fill zoom",min:.5,max:2,step:.005}).number("Lens & sensor",r.lens,"chromaticAberration",{label:"Chromatic aberration",min:0,max:3,step:.01}).number("Lens & sensor",r.lens,"naturalVignette",{label:"Natural vignetting (cos\u2074)",min:0,max:1,step:.01}).number("Lens & sensor",r.lens,"vignette",{label:"Artistic vignette",min:0,max:1,step:.01}).number("Lens & sensor",r.lens,"vignetteRoundness",{label:"Vignette roundness",min:0,max:1,step:.01}).number("Lens & sensor",r.lens,"sharpen",{label:"Sharpening",min:0,max:1,step:.01}).bool("Lens & sensor",r.sensor,"enabled",{label:"Sensor noise"}).number("Lens & sensor",r.sensor,"readNoise",{label:"Read noise",min:0,max:.05,step:1e-4}).number("Lens & sensor",r.sensor,"shotNoise",{label:"Photon shot noise",min:0,max:.05,step:1e-4}).number("Lens & sensor",r.sensor,"gain",{label:"Sensor gain",min:0,max:8,step:.01}).bool("Lens & sensor",r.sensor,"isoCoupled",{label:"Noise follows camera ISO"}).bool("Lens & sensor",r.motionBlur,"enabled",{label:"Motion blur"}).number("Lens & sensor",r.motionBlur,"shutterAngle",{label:"Shutter angle",min:0,max:360,step:1,unit:"\xB0",help:"180\xB0 = film look; bodycams shoot ~ 90\u2013180\xB0."}).number("Lens & sensor",r.motionBlur,"maxPixels",{label:"Max blur",min:4,max:128,step:1,unit:"px"}).number("Lens & sensor",r.motionBlur,"samples",{label:"Blur samples",min:4,max:32,step:1}).bool("Lens & sensor",r.dof,"enabled",{label:"Depth of field"}).number("Lens & sensor",r.dof,"apertureMm",{label:"Aperture / pupil",min:0,max:30,step:.1,unit:"mm",help:"Human pupil \u2248 3 mm in daylight (iron sights: target goes soft), 6\u20137 mm at night. Camera: focal length \xF7 f-number. Bodycams \u2248 1 mm (everything sharp)."}).bool("Lens & sensor",r.dof,"autoFocus",{label:"Auto focus (accommodation)"}).number("Lens & sensor",r.dof,"focusDistance",{label:"Manual focus",min:.1,max:500,step:.1,unit:"m"}).number("Lens & sensor",r.dof,"focusSpeed",{label:"Refocus speed",min:.5,max:30,step:.1,unit:"1/s",help:"Eye accommodation \u2248 4\u20138/s."}).number("Lens & sensor",r.dof,"maxBlurPx",{label:"Max blur radius",min:2,max:40,step:1,unit:"px@1080p"}).number("Lens & sensor",r.dof,"quality",{label:"DOF quality",min:.25,max:3,step:.05}).bool("Lens & sensor",r.bloom,"enabled",{label:"Bloom (lens scatter)"}).number("Lens & sensor",r.bloom,"intensity",{label:"Bloom amount",min:0,max:.3,step:.001,help:"Fraction of light scattered by the lens (physical \u2248 0.02\u20130.05)."}).number("Lens & sensor",r.bloom,"radius",{label:"Bloom radius",min:.5,max:3,step:.01});let i=r.shadows;t.bool("Shadows",i,"enabled",{label:"Sun shadows"}).number("Shadows",i,"cascades",{label:"Cascades",min:1,max:4,step:1}).number("Shadows",i,"resolution",{label:"Resolution",min:512,max:8192,step:512,unit:"px"}).number("Shadows",i,"distance",{label:"Distance",min:10,max:600,step:1,unit:"m"}).number("Shadows",i,"splitLambda",{label:"Split lambda",min:0,max:1,step:.01}).number("Shadows",i,"constantBias",{label:"Depth bias",min:0,max:.002,step:1e-5}).number("Shadows",i,"slopeBias",{label:"Slope bias",min:0,max:8,step:.05}).number("Shadows",i,"normalBias",{label:"Normal bias",min:0,max:6,step:.05,unit:"texels"}).number("Shadows",i,"maxPenumbraTexels",{label:"Max penumbra",min:1,max:48,step:1,unit:"texels"}).number("Shadows",i,"blockerSamples",{label:"PCSS blocker taps",min:1,max:16,step:1}).number("Shadows",i,"pcfSamples",{label:"PCF taps",min:1,max:32,step:1}).number("Shadows",i,"blendFraction",{label:"Cascade blend",min:0,max:.5,step:.01}),t.bool("AO & AA",r.gtao,"enabled",{label:"GTAO"}).number("AO & AA",r.gtao,"radius",{label:"AO radius",min:.05,max:4,step:.01,unit:"m"}).number("AO & AA",r.gtao,"falloff",{label:"AO falloff",min:.05,max:1,step:.01}).number("AO & AA",r.gtao,"power",{label:"AO power",min:.5,max:4,step:.01}).number("AO & AA",r.gtao,"strength",{label:"AO strength",min:0,max:1,step:.01}).number("AO & AA",r.gtao,"slices",{label:"AO slices",min:1,max:8,step:1}).number("AO & AA",r.gtao,"steps",{label:"AO steps",min:2,max:16,step:1}).bool("AO & AA",r.taa,"enabled",{label:"TAA"}).number("AO & AA",r.taa,"feedbackMin",{label:"TAA feedback (moving)",min:0,max:.99,step:.005}).number("AO & AA",r.taa,"feedbackMax",{label:"TAA feedback (still)",min:0,max:.99,step:.005}).number("AO & AA",r,"renderScale",{label:"Render scale",min:.25,max:1.5,step:.05}).number("AO & AA",r,"debugView",{label:"Debug view",min:0,max:9,step:1,help:"1 normals, 2 AO, 3 velocity, 4 depth, 5 luminance (cd/m\xB2 false colour), 6 HDR, 7 sky visibility, 8 ambient diffuse, 9 direct only"}),t.number("Atmosphere",r.fog,"density",{label:"Fog density",min:0,max:.02,step:1e-5,unit:"1/m"}).number("Atmosphere",r.fog,"heightFalloff",{label:"Height falloff",min:.001,max:1,step:.001,unit:"1/m"}).number("Atmosphere",r.fog,"baseHeight",{label:"Base height",min:-50,max:200,step:.5,unit:"m"}).number("Atmosphere",r.fog,"startDistance",{label:"Start distance",min:0,max:200,step:.5,unit:"m"}).number("Atmosphere",r.fog,"inscatter",{label:"Inscatter",min:0,max:4,step:.01}).number("Atmosphere",r.fog,"mieG",{label:"Sun glow anisotropy",min:0,max:.99,step:.01})}function gr(n,e){let t=n.scope(te.vorp),r=(s,i,a,o)=>{i.forEach((l,c)=>t.arrayValue(s,a,c,{key:l.key,label:l.label,min:l.min,max:l.max,step:l.step,unit:l.unit,help:l.help,onChange:()=>e.cmd(o,a)}))};r("Hearing",ps,e.params.hearing,it.HEARING),r("Master",fs,e.params.master,it.MASTER),r("Reverb",bs,e.params.reverb,it.REVERB),r("Ambience",hs,e.params.ambience,it.AMBIENCE)}var Ae=class n{constructor(e,t,r,s){this.physics=e;this.workerUrl=t;this.wasmUrl=r;let i=typeof navigator<"u"&&navigator.hardwareConcurrency||4;this.threads=Math.max(1,Math.min(s??i-1,12))}workers=[];ready=null;job=0;pending=new Map;threads;meshCount=-1;busy=!1;static supported(){return typeof Worker<"u"}init(){let e=this.physics.staticMeshes;return this.ready&&this.meshCount===e.length?this.ready:(this.dispose(),this.meshCount=e.length,this.ready=Promise.all(Array.from({length:this.threads},()=>new Promise((t,r)=>{let s=new Worker(this.workerUrl,{type:"module",name:"fondaine-gi"});s.onmessage=i=>{let a=i.data;if(a.type==="ready"){t();return}if(a.type==="error"){r(new Error(a.message));for(let l of this.pending.values())l.reject(new Error(a.message));this.pending.clear();return}let o=this.pending.get(a.job);o&&(this.pending.delete(a.job),o.resolve(a))},s.onerror=i=>{r(i),this.failAll(new Error("GI worker crashed: "+(i.message??i)))},s.postMessage({type:"init",wasm:this.wasmUrl,meshes:e}),this.workers.push(s),setTimeout(()=>r(new Error("GI worker did not start within 30 s")),3e4)}))).then(()=>{}).catch(t=>{throw this.dispose(),this.ready=null,t}),this.ready)}call(e,t,r=[]){let s=++this.job;return new Promise((i,a)=>{let o=setTimeout(()=>{this.pending.delete(s)&&a(new Error(`GI worker job timed out after ${n.jobTimeoutMs/1e3} s`))},n.jobTimeoutMs);this.pending.set(s,{resolve:l=>{clearTimeout(o),i(l)},reject:l=>{clearTimeout(o),a(l)}}),e.postMessage({...t,job:s},r)})}static jobTimeoutMs=18e4;failAll(e){for(let t of this.pending.values())t.reject(e);this.pending.clear()}async runSlabs(e,t,r,s){let i=Math.max(1,Math.ceil(e/(this.threads*4))),a=[];for(let c=0;c<e;c+=i)a.push([c,Math.min(e,c+i)]);let o=a.length,l=0;await Promise.all(this.workers.map(async c=>{for(;a.length;){let[u,h]=a.shift();r(await this.call(c,t(u,h))),s?.(++l/o)}}))}async bake(e,t,r){let s=performance.now();this.busy=!0;try{await this.init();let{nx:i,ny:a,nz:o}=e,l=i*a*o,c=i*a,u=new Float32Array(l*3),h=new Uint8Array(l);await this.runSlabs(o,(f,b)=>({type:"pos",grid:e,z0:f,z1:b}),f=>{u.set(f.pos,f.z0*c*3),h.set(f.valid,f.z0*c)},f=>r?.(f*.05,"placing probes"));for(let f of this.workers)f.postMessage({type:"probes",pos:u,valid:h});let p=null;for(let f=0;f<t;f++){let b=new Float32Array(l*12),v=p;await this.runSlabs(o,(g,y)=>({type:"pass",grid:e,pass:f,prev:v,z0:g,z1:y}),g=>b.set(g.data,g.z0*c*12),g=>r?.(.05+.95*((f+g)/t),`bounce ${f+1} of ${t}`)),gs(b,h,i,a,o),p=b}let d=0;for(let f=0;f<l;f++)h[f]||d++;return{data:p,filled:d,ms:performance.now()-s,threads:this.threads}}finally{this.busy=!1}}dispose(){for(let e of this.workers)e.terminate();this.workers=[],this.ready=null,this.pending.clear()}};function gs(n,e,t,r,s){let i=Uint8Array.from(e);for(let a=0;a<4;a++){let o=!1,l=Uint8Array.from(i),c=n.slice();for(let u=0;u<s;u++)for(let h=0;h<r;h++)for(let p=0;p<t;p++){let d=(u*r+h)*t+p;if(l[d])continue;let f=new Float32Array(12),b=0;for(let v=-1;v<=1;v++)for(let g=-1;g<=1;g++)for(let y=-1;y<=1;y++){let w=p+y,P=h+g,k=u+v;if(w<0||P<0||k<0||w>=t||P>=r||k>=s)continue;let A=(k*r+P)*t+w;if(l[A]){for(let T=0;T<12;T++)f[T]+=c[A*12+T];b++}}if(b){for(let v=0;v<12;v++)n[d*12+v]=f[v]/b;i[d]=1,o=!0}}if(!o)break}}var nt=pe("MeshRenderer"),vr=class n{renderer;scene=new We;camera=new He;world=new Qe;physics;audio;input;tuning=new et;devui;canvas;time=0;fixedDt;maxFrameTime=.1;timeScale=1;paused=!1;frame=0;fps=0;acc=0;last=0;running=!1;fpsAcc=0;fpsFrames=0;onUpdate=[];onFixed=[];onLate=[];giBaker;autoRebakeGI=!0;giLast=null;giChangeT=0;constructor(e,t,r){this.canvas=e.canvas,this.renderer=t,this.physics=r,this.fixedDt=1/(e.fixedHz??120);let s=e.baseUrl??"/";this.audio=new st(r,{wasm:e.vorpWasm??`${s}wasm/vorp_dsp.wasm`,worklet:e.vorpWorklet??`${s}vorp/vorp-worklet.js`}),this.input=new Ze(e.canvas);let i=a=>new URL(a,typeof location<"u"?location.href:"http://localhost/").href;this.giBaker=Ae.supported()&&e.giThreads!==0?new Ae(r,i(e.giWorker??`${s}fondaine/gi-worker.js`),i(e.physicsWasm??`${s}wasm/fondaine_physics.wasm`),e.giThreads):null,this.devui=new tt(this.tuning,e.title??"fondaine"),this.world.onRemoved(nt,(a,o)=>this.scene.remove(o.object)),this.world.onRemoved(Te,(a,o)=>{for(let l of o)l.onDestroy?.()}),br(this.tuning,this.renderer),this.devui.statsText=()=>{let a=this.renderer.stats,o=this.audio.vorp?.meters;return`${this.fps.toFixed(0)} fps  ${a.frameMs.toFixed(2)} ms cpu  ${a.drawCalls} draws  ${(a.triangles/1e3).toFixed(0)}k tris
`+(o?`audio: ${o.voices} voices  eardrum ${o.earSpl.toFixed(0)} dB SPL  TTS ${o.tts.toFixed(1)} dB  dsp ${(o.cpu*100).toFixed(1)}%`:"audio: click to start")}}static async create(e){let t=e.baseUrl??"/",[r,s]=await Promise.all([Ye.create(e.canvas,{offscreen:e.offscreen}),rt.load(e.physicsWasm??`${t}wasm/fondaine_physics.wasm`)]);return new n(e,r,s)}async startAudio(){let e=await this.audio.start();return this.tuning.params.some(t=>t.module===te.vorp)||gr(this.tuning,e),e}async bakeGlobalIllumination(e){let t=e.cell??.5,r=Math.max(1,Math.ceil((e.max[0]-e.min[0])/t)),s=Math.max(1,Math.ceil((e.max[1]-e.min[1])/t)),i=Math.max(1,Math.ceil((e.max[2]-e.min[2])/t)),a=e.rays??256,o=e.passes??3,l=r*s*i,c=await this.giGrid({min:[e.min[0],e.min[1],e.min[2]],cell:t,nx:r,ny:s,nz:i,rays:a,albedo:Array.from(e.albedo)});e.onStatus?.(`Path tracing global illumination \xB7 ${l.toLocaleString()} probes`);let u=await this.runGIBake(c,o,(h,p)=>e.onStatus?.(`Path tracing global illumination \xB7 ${p} \xB7 ${Math.round(h*100)}%`));return console.info(`[fondaineGL] GI bake: ${r}\xD7${s}\xD7${i} probes, ${a} rays, ${o} passes, ${u.filled} filled, ${(u.ms/1e3).toFixed(1)} s on ${u.threads} thread(s)`),{probes:l,ms:u.ms,filled:u.filled}}async giGrid(e){let t=Array.from(await this.renderer.readSkySH());return{...e,sunDir:[...this.renderer.sky.sunDir],sunRGB:[...this.renderer.sky.sunIlluminanceRGB()],skySH:t}}skyKey(){let e=this.renderer.sky.settings;return[e.sunElevation,e.sunAzimuth,e.sunIlluminance,e.turbidity,e.rayleigh,e.ozone,e.groundAlbedo].map(t=>Number(t).toFixed(2)).join("|")}async runGIBake(e,t,r){let s;if(this.giBaker)try{s=await this.giBaker.bake(e,t,r)}catch(i){console.warn("[fondaineGL] worker GI bake failed, using the main thread",i),s=this.bakeGISync(e,t)}else s=this.bakeGISync(e,t);return this.renderer.setProbeVolume(s.data,e.nx,e.ny,e.nz,e.min,e.cell),this.giLast={grid:e,passes:t,key:this.skyKey()},s}bakeGISync(e,t){let r=performance.now(),{data:s,filled:i}=this.physics.bakeGI({...e,passes:t});return{data:s,filled:i,ms:performance.now()-r,threads:1}}watchGI(e){if(!this.autoRebakeGI||!this.giLast||!this.giBaker||this.giBaker.busy)return;if(this.skyKey()===this.giLast.key){this.giChangeT=0;return}if(this.giChangeT+=e,this.giChangeT<.6)return;this.giChangeT=0;let t=this.giLast;this.giLast={...t,key:this.skyKey()},this.giGrid({min:t.grid.min,cell:t.grid.cell,nx:t.grid.nx,ny:t.grid.ny,nz:t.grid.nz,rays:Math.min(t.grid.rays,128),albedo:t.grid.albedo}).then(r=>this.runGIBake(r,t.passes)).then(r=>console.info(`[fondaineGL] GI re-baked for the new sun in ${(r.ms/1e3).toFixed(1)} s`)).catch(r=>console.warn("[fondaineGL] GI re-bake failed",r))}createEntity(e,t,r){let s=this.world.spawn(e);return this.world.add(s,fe,new Je(t,r)),s}transform(e){return this.world.require(e,fe)}addMesh(e,t,r,s={}){let i=t instanceof we?t:new we(this.renderer.dev,t),a=new le(i,r);return a.castShadow=s.castShadow??!0,a.viewmodel=s.viewmodel??!1,a.userData=e,this.scene.add(a),this.world.add(e,nt,{object:a,offset:s.offset??null}),this.syncObject(e),a.resetHistory(),a}addScript(e,t){return t.engine=this,t.entity=e,(this.world.get(e,Te)??this.world.add(e,Te,[])).push(t),t}destroy(e){this.world.despawn(e)}tmp=M.create();syncObject(e){let t=this.world.get(e,nt),r=this.world.get(e,fe);!t||!r||(t.offset?t.object.setTransform(M.multiply(this.tmp,r.getWorld(),t.offset)):t.object.setTransform(r.getWorld()))}start(){if(this.running)return;this.running=!0,this.last=performance.now();let e=t=>{if(!this.running)return;let r=Math.max(0,Math.min((t-this.last)/1e3,this.maxFrameTime));this.last=t,this.step(r),requestAnimationFrame(e)};requestAnimationFrame(e)}stop(){this.running=!1}step(e){e=Math.max(0,e);let t=this.paused?0:e*this.timeScale;this.input.poll(),this.input.actionPressed("tuning")&&(this.devui.toggle(),this.devui.visible&&this.input.unlock());let r=[...this.world.query(Te)];for(let[,i]of r)for(let a of i)a.enabled&&!a._started&&(a._started=!0,a.onStart?.());this.acc+=t;let s=0;for(;this.acc>=this.fixedDt&&s<12;){for(let[,i]of r)for(let a of i)a.enabled&&a.onFixedUpdate?.(this.fixedDt);for(let i of this.onFixed)i(this.fixedDt);this.physics.step(this.fixedDt),this.acc-=this.fixedDt,this.time+=this.fixedDt,s++}s>=12&&(this.acc=0);for(let[,i]of r)for(let a of i)a.enabled&&a.onUpdate?.(t);for(let i of this.onUpdate)i(t);for(let[,i]of r)for(let a of i)a.enabled&&a.onLateUpdate?.(t);for(let i of this.onLate)i(t);for(let[i]of this.world.query(nt))this.syncObject(i);this.watchGI(e),this.audio.update(this.camera),this.renderer.render(this.scene,this.camera,Math.max(e,1e-4)),this.devui.update(),this.input.endFrame(),this.frame++,this.fpsAcc+=e,this.fpsFrames++,this.fpsAcc>.5&&(this.fps=this.fpsFrames/this.fpsAcc,this.fpsAcc=0,this.fpsFrames=0)}};var H={DEFAULT:0,CONCRETE:1,DIRT:2,GRAVEL:3,WOOD:4,STEEL:5,STEEL_TARGET:6,PAPER:7,CARDBOARD:8,GRASS:9,BRASS:10,POLYMER:11},X=(n,e,t)=>({id:n,name:e,friction:.6,restitution:.2,ricochetAngleDeg:0,ricochetEnergyKeep:.3,reflection:.8,reflectionLowpassHz:6e3,impactSound:"dirt",footstepSound:"dirt",decal:null,decalSize:.03,debris:"dust",debrisColor:[.4,.35,.28],hard:!1,albedo:[.25,.25,.25],...t}),ze=[X(H.DEFAULT,"default",{}),X(H.CONCRETE,"concrete",{friction:.75,restitution:.35,ricochetAngleDeg:12,ricochetEnergyKeep:.25,reflection:.97,reflectionLowpassHz:9e3,impactSound:"concrete",footstepSound:"concrete",decal:2,decalSize:.05,debris:"dust",debrisColor:[.62,.61,.58],hard:!0,albedo:[.36,.35,.33]}),X(H.DIRT,"dirt",{friction:.8,restitution:.1,reflection:.65,reflectionLowpassHz:2500,impactSound:"dirt",footstepSound:"dirt",decal:5,decalSize:.12,debris:"dust",debrisColor:[.35,.28,.2],albedo:[.2,.15,.1]}),X(H.GRAVEL,"gravel",{friction:.85,restitution:.15,ricochetAngleDeg:8,reflection:.75,reflectionLowpassHz:4e3,impactSound:"gravel",footstepSound:"gravel",decal:null,debris:"dust",debrisColor:[.5,.48,.45],hard:!0,albedo:[.3,.29,.27]}),X(H.WOOD,"wood",{friction:.55,restitution:.3,reflection:.85,reflectionLowpassHz:5e3,impactSound:"wood",footstepSound:"wood",decal:1,decalSize:.035,debris:"splinters",debrisColor:[.6,.48,.32],hard:!0,albedo:[.42,.3,.17]}),X(H.STEEL,"steel",{friction:.45,restitution:.4,ricochetAngleDeg:25,ricochetEnergyKeep:.4,reflection:.98,reflectionLowpassHz:12e3,impactSound:"concrete",footstepSound:"concrete",decal:0,decalSize:.04,debris:"sparks",debrisColor:[1,.7,.35],hard:!0,albedo:[.3,.3,.3]}),X(H.STEEL_TARGET,"steel target",{friction:.45,restitution:.4,ricochetAngleDeg:0,reflection:.98,reflectionLowpassHz:12e3,impactSound:"concrete",decal:4,decalSize:.07,debris:"sparks",debrisColor:[1,.7,.35],hard:!0,albedo:[.55,.45,.38]}),X(H.PAPER,"paper",{reflection:.3,reflectionLowpassHz:2e3,impactSound:"paper",decal:3,decalSize:.012,debris:"none",albedo:[.7,.68,.62]}),X(H.CARDBOARD,"cardboard",{reflection:.4,reflectionLowpassHz:2500,impactSound:"cardboard",decal:3,decalSize:.014,debris:"none",albedo:[.45,.33,.2]}),X(H.GRASS,"grass",{friction:.7,reflection:.5,reflectionLowpassHz:1800,impactSound:"dirt",footstepSound:"grass",decal:5,decalSize:.1,debris:"dust",debrisColor:[.3,.3,.18],albedo:[.07,.11,.035]}),X(H.BRASS,"brass",{friction:.35,restitution:.45,hard:!0,impactSound:"concrete",debris:"none",albedo:[.5,.38,.2]}),X(H.POLYMER,"polymer",{friction:.6,restitution:.3,hard:!0,impactSound:"wood",debris:"none",albedo:[.04,.04,.04]})];function ba(){let n=Math.max(...ze.map(t=>t.id))+1,e=new Float32Array(Math.max(n,16)*3).fill(.25);for(let t of ze)e.set(t.albedo,t.id*3);return e}function oe(n){return ze[Math.round(n)]??ze[0]}function ga(n,e){for(let t of ze)n.setMaterial(t.id,{friction:t.friction,restitution:t.restitution,ricochetAngleDeg:t.ricochetAngleDeg,ricochetEnergyKeep:t.ricochetEnergyKeep}),e.surfaces.set(t.id,{reflection:t.reflection,lowpassHz:t.reflectionLowpassHz})}import{FOOTSTEPS as Pa}from"./vorp.js";var xr=class extends be{radius=.28;standHeight=1.78;crouchHeight=1.15;eyeFromTop=.11;walkSpeed=1.55;sprintSpeed=5.2;crouchSpeed=.85;adsSpeedFactor=.65;groundAccel=9;airAccel=1.2;brake=11;jumpSpeed=3;gravity=9.81;stride=.72;bobVertical=.022;bobLateral=.012;bobRoll=.6;landingDip=.05;leanAngle=13;leanOffset=.32;leanSpeed=7;pitchLimit=87;rig="eyes";bodycamOffset=m.create(.08,-.34,.12);bodycamTilt=-6;bodycamSway=1;yaw=0;pitch=0;velocity=m.create();feet=m.create();grounded=!1;crouched=!1;sprinting=!1;sprintBlend=0;aiming=!1;moving=0;lean=0;crouchBlend=0;height=1.78;bobPhase=0;lastStepSign=1;landT=0;fallSpeed=0;character;groundMaterial=0;bodySway=m.create();extraPitch=0;extraYaw=0;viewPunch={p:0,y:0,r:0,vp:0,vy:0,vr:0};punchOmega=32;punchDamping=.55;punch(e,t=0,r=0){this.viewPunch.vp+=e,this.viewPunch.vy+=t,this.viewPunch.vr+=r}eyePos=m.create();eyeRot=L.create();onFootstep=null;onStart(){this.character=this.physics.createCharacter(this.radius,this.standHeight,.4,48);let e=this.transform.position;m.copy(this.feet,e),this.character.setPosition(e[0],e[1],e[2]),this.height=this.standHeight,this.tune("walkSpeed",{group:"Player",min:.5,max:3,unit:"m/s",help:"Brisk walk with a rifle \u2248 1.4\u20131.7 m/s."}),this.tune("sprintSpeed",{group:"Player",min:2,max:9,unit:"m/s"}),this.tune("crouchSpeed",{group:"Player",min:.3,max:2,unit:"m/s"}),this.tune("groundAccel",{group:"Player",min:1,max:40,unit:"m/s\xB2"}),this.tune("jumpSpeed",{group:"Player",min:0,max:6,unit:"m/s"}),this.tune("stride",{group:"Player",min:.4,max:1.2,unit:"m"}),this.tune("bobVertical",{group:"Player",min:0,max:.08,unit:"m"}),this.tune("bobLateral",{group:"Player",min:0,max:.05,unit:"m"}),this.tune("bobRoll",{group:"Player",min:0,max:3,unit:"\xB0"}),this.tune("leanAngle",{group:"Player",min:0,max:30,unit:"\xB0"}),this.tune("bodycamTilt",{group:"Player",min:-30,max:10,unit:"\xB0"}),this.tune("bodycamSway",{group:"Player",min:0,max:3})}teleport(e,t,r,s=this.yaw){m.set(this.feet,e,t,r),this.character.setPosition(e,t,r),m.set(this.velocity,0,0,0),this.yaw=s}onUpdate(e){let t=this.input;if(t.locked||t.gamepad){let s=t.lookDelta(e);this.yaw+=s.yaw,this.pitch=Re(this.pitch+s.pitch,-this.pitchLimit*q,this.pitchLimit*q),this.bodySway[0]=K(this.bodySway[0],s.yaw/Math.max(e,.001)*.02,.08,e)}this.yaw+=this.extraYaw,this.pitch=Re(this.pitch+this.extraPitch,-this.pitchLimit*q,this.pitchLimit*q),this.extraYaw=0,this.extraPitch=0,t.actionPressed("camera")&&(this.rig=this.rig==="eyes"?"bodycam":"eyes");let r=(t.action("leanRight")?1:0)-(t.action("leanLeft")?1:0);this.lean=K(this.lean,r,1/this.leanSpeed,e),this.updateCamera(e)}onFixedUpdate(e){let t=this.input,r=t.moveAxis();t.actionPressed("crouch")&&(this.crouched?this.character.setHeight(this.standHeight)&&(this.crouched=!1):(this.character.setHeight(this.crouchHeight),this.crouched=!0)),this.sprinting=t.action("sprint")&&r.y>.3&&!this.crouched&&!this.aiming,this.sprintBlend=K(this.sprintBlend,this.sprinting?1:0,.09,e);let s=this.crouched?this.crouchSpeed:this.sprinting?this.sprintSpeed:this.walkSpeed;this.aiming&&(s*=this.adsSpeedFactor);let i=Math.sin(this.yaw),a=Math.cos(this.yaw),o=(r.x*a-r.y*i)*s,l=(-r.x*i-r.y*a)*s,c=this.grounded?this.groundAccel:this.airAccel,u=this.velocity,h=o-u[0],p=l-u[2],d=Math.hypot(h,p),f=(r.x||r.y?c:this.grounded?this.brake*Math.max(.5,Math.hypot(u[0],u[2])):0)*e;if(d>1e-6){let P=Math.min(1,f/d);u[0]+=h*P,u[2]+=p*P}this.grounded&&t.actionPressed("jump")&&!this.crouched&&(u[1]=this.jumpSpeed,this.grounded=!1),u[1]-=this.gravity*e;let b=this.character.move(u[0]*e,u[1]*e,u[2]*e),v=this.grounded,g=(b.position[0]-this.feet[0])/e,y=(b.position[2]-this.feet[2])/e;u[0]=g,u[2]=y,b.grounded&&u[1]<0&&(this.fallSpeed=-u[1],u[1]=0),b.ceiling&&u[1]>0&&(u[1]=0),this.grounded=b.grounded,!v&&this.grounded&&(this.landT=Math.min(1,this.fallSpeed/6),this.onFootstep?.(oe(b.groundMaterial).footstepSound,b.position,1+this.landT*2)),m.copy(this.feet,b.position),this.groundMaterial=b.groundMaterial,this.transform.setPosition(b.position[0],b.position[1],b.position[2]);let w=Math.hypot(u[0],u[2]);if(this.moving=K(this.moving,Math.min(1,w/this.walkSpeed),.15,e),this.grounded&&w>.2){let P=this.stride*(1+.35*Math.max(0,w-this.walkSpeed)/this.walkSpeed);this.bobPhase+=w/P*Math.PI*e;let k=Math.sign(Math.sin(this.bobPhase));if(k!==this.lastStepSign){this.lastStepSign=k;let A=this.crouched?.5:1+.6*this.sprintBlend;this.onFootstep?.(oe(this.groundMaterial).footstepSound,this.feet,A)}}}updateCamera(e){let t=this.engine.camera;this.crouchBlend=K(this.crouchBlend,this.crouched?1:0,.09,e),this.height=this.standHeight+(this.crouchHeight-this.standHeight)*this.crouchBlend,this.landT=K(this.landT,0,.12,e);let r=this.bobPhase,s=this.moving*(1+.8*this.sprintBlend)*(this.aiming?.35:1),i=-Math.abs(Math.sin(r))*this.bobVertical*s-this.landT*this.landingDip,a=Math.cos(r)*this.bobLateral*s,o=Math.cos(r)*this.bobRoll*q*s-this.lean*this.leanAngle*q;{let d=this.viewPunch,f=this.punchOmega*this.punchOmega,b=2*this.punchDamping*this.punchOmega,v=Math.max(1,Math.ceil(e/.002)),g=e/v;for(let y=0;y<v;y++)d.vp+=(-f*d.p-b*d.vp)*g,d.p+=d.vp*g,d.vy+=(-f*d.y-b*d.vy)*g,d.y+=d.vy*g,d.vr+=(-f*d.r-b*d.vr)*g,d.r+=d.vr*g}L.fromEuler(this.eyeRot,this.pitch+this.viewPunch.p,this.yaw+this.viewPunch.y,o+this.viewPunch.r);let l=m.transformQuat(m.create(),[1,0,0],this.eyeRot),c=m.create(0,1,0),u=this.height-this.eyeFromTop;m.set(this.eyePos,this.feet[0],this.feet[1]+u+i,this.feet[2]);let h=this.lean*this.leanOffset,p=m.normalize(m.create(),m.set(m.create(),Math.cos(this.yaw),0,-Math.sin(this.yaw)));if(m.scaleAndAdd(this.eyePos,this.eyePos,p,h+a),this.eyePos[1]-=Math.abs(this.lean)*.05,this.rig==="bodycam"){let d=this.pitch*.25+this.bodycamTilt*q,f=L.fromEuler(L.create(),d,this.yaw-this.bodySway[0]*this.bodycamSway,o*1.5),b=m.transformQuat(m.create(),this.bodycamOffset,L.fromEuler(L.create(),0,this.yaw,0));m.add(t.position,this.eyePos,b),L.copy(t.rotation,f)}else m.copy(t.position,this.eyePos),L.copy(t.rotation,this.eyeRot)}get speed(){return Math.hypot(this.velocity[0],this.velocity[2])}};import{casingModes as vs,receiverModes as ee,IMPACTS as yr}from"./vorp.js";var Ia={"5.56x45 M855":{name:"5.56\xD745mm M855 62gr",bulletMassKg:.004018,diameterM:.0057,lengthM:.0233,bcG7:.151,muzzleVelocity:948,referenceBarrelM:.508,velocityPerBarrelM:380,powderMassKg:.00168,gasVelocityFactor:1.7,casing:{lengthM:.0448,diameterM:.0095,massKg:.0063}},"5.56x45 Mk262":{name:"5.56\xD745mm Mk262 77gr",bulletMassKg:.00499,diameterM:.0057,lengthM:.0254,bcG7:.186,muzzleVelocity:850,referenceBarrelM:.457,velocityPerBarrelM:340,powderMassKg:.00162,gasVelocityFactor:1.7,casing:{lengthM:.0448,diameterM:.0095,massKg:.0063}},"7.62x51 M118LR":{name:"7.62\xD751mm M118LR 175gr",bulletMassKg:.01134,diameterM:.00782,lengthM:.0315,bcG7:.243,muzzleVelocity:790,referenceBarrelM:.559,velocityPerBarrelM:230,powderMassKg:.00272,gasVelocityFactor:1.6,casing:{lengthM:.0512,diameterM:.0119,massKg:.0123}},"9x19 124gr":{name:"9\xD719mm 124gr FMJ",bulletMassKg:.00803,diameterM:.00901,lengthM:.0155,bcG7:.072,muzzleVelocity:360,referenceBarrelM:.102,velocityPerBarrelM:300,powderMassKg:36e-5,gasVelocityFactor:1.3,casing:{lengthM:.019,diameterM:.0099,massKg:.0037}}},wr=class extends be{constructor(t,r,s){super();this.spec=t;this.model=r;this.controller=s;this.rounds=t.magazineCapacity,this.mode=t.fireModes.find(a=>a!=="safe")??t.fireModes[0],this.selectorAngle=r.selector?.angles[this.mode]??0,this.flashLight=new Ne,this.flashLight.enabled=!1;let i=t.caliber;this.muzzleVelocity=i.muzzleVelocity+(t.barrelLengthM-i.referenceBarrelM)*i.velocityPerBarrelM}rounds;chambered=!0;mode;ads=0;rootWorld=M.create();shotsFired=0;maxCasings=80;effectsEnabled=!0;onShot=null;triggerOverride=null;adsOverride=null;holstered=!1;maxDroppedMags=8;anim={slide:0,magOffset:0,magVisible:!0,trigger:0,lockedOpen:!1,equip:1,charge:0};reloadPhase=null;phaseT=0;magAnim={ejectSpeed:1.2,insertDistance:.14,seatFraction:.7};rot={x:0,y:0,vx:0,vy:0};kick={z:0,vz:0,rx:0,vrx:0,rz:0,vrz:0};heat=0;wander=0;selectorAngle=0;switchT=1;back={z:0,v:0};cooldown=0;triggerHeld=!1;reloadT=-1;sway={x:0,y:0,vx:0,vy:0};breathPhase=Math.random()*10;holdBreathT=0;lastShotTime=-10;flashLight;flashLife=0;casings=[];casingByBody=new Map;rand=ie(4242);zeroAngle=0;muzzleVelocity;slideT=1e9;releaseT=-1;releaseFrom=0;rackPull=-1;rackRelease=!1;reloadNeedsCharge=!1;rackT=-1;rackSoundDone=0;sprintBlend=0;equipT=1e9;droppedMags=[];magByBody=new Map;magDropped=!1;get recoilImpulse(){let t=this.spec.caliber;return t.bulletMassKg*this.muzzleVelocity+t.powderMassKg*this.muzzleVelocity*t.gasVelocityFactor}get freeRecoilEnergy(){let t=this.recoilImpulse/this.spec.massKg;return .5*this.spec.massKg*t*t}get velocity(){return this.muzzleVelocity}onStart(){this.engine.scene.addLight(this.flashLight);for(let c of this.model.parts)c.object.viewmodel=!0,c.object.castShadow=!1,this.engine.scene.add(c.object);this.computeZero(),this.physics.onContact.push(c=>this.onCasingContact(c.body,c.speed,c.otherMaterial,c.point));let t=`Weapon: ${this.spec.name}`,r=this.spec.recoil,s=this.engine.tuning.scope(te.gl);s.number(t,this.spec,"massKg",{label:"Weapon mass",min:.5,max:12,step:.01,unit:"kg"}),s.number(t,this.spec,"barrelLengthM",{label:"Barrel length",min:.08,max:.8,step:.001,unit:"m",onChange:()=>{let c=this.spec.caliber;this.muzzleVelocity=c.muzzleVelocity+(this.spec.barrelLengthM-c.referenceBarrelM)*c.velocityPerBarrelM,this.computeZero()}}),s.number(t,this.spec,"rpm",{label:"Rate of fire",min:60,max:1200,step:1,unit:"rpm"}),s.number(t,this.spec,"zeroM",{label:"Zero distance",min:10,max:500,step:1,unit:"m",onChange:()=>this.computeZero()}),s.number(t,this.spec,"accuracyMoa",{label:"Mechanical accuracy",min:0,max:8,step:.05,unit:"MOA"}),s.number(t,r,"boreAboveShoulderM",{label:"Bore over shoulder",min:0,max:.12,step:.001,unit:"m"}),s.number(t,r,"inertia",{label:"Gun+arms inertia",min:.05,max:1,step:.005,unit:"kg\xB7m\xB2"}),s.number(t,r,"shoulderMassKg",{label:"Shoulder coupled mass",min:1,max:40,step:.5,unit:"kg"}),s.number(t,r,"holdOmega",{label:"Hold stiffness \u03C9",min:2,max:40,step:.1,unit:"rad/s"}),s.number(t,r,"holdDamping",{label:"Hold damping \u03B6",min:.1,max:2,step:.01}),s.number(t,r,"horizontalRatio",{label:"Horizontal recoil",min:0,max:1,step:.01}),s.number(t,r,"viewCouplingAds",{label:"View coupling (ADS)",min:0,max:1,step:.01}),s.number(t,r,"viewCouplingHip",{label:"View coupling (hip)",min:0,max:1,step:.01}),s.number(t,r,"residualRise",{label:"Unrecovered rise",min:0,max:1,step:.01}),r.kick===void 0&&(r.kick=1),r.cameraPunch===void 0&&(r.cameraPunch=1),r.autoClimb===void 0&&(r.autoClimb=1),s.number(t,r,"kick",{label:"In-hands kick",min:0,max:3,step:.01,help:"Visual snap of the weapon per shot (scaled by free-recoil energy)."}),s.number(t,r,"cameraPunch",{label:"Camera punch",min:0,max:3,step:.01,help:"View shake per shot that springs back."}),s.number(t,r,"autoClimb",{label:"Sustained-fire climb",min:0,max:3,step:.01,help:"How fast control degrades in long full-auto strings."}),s.number(t,this.spec.flash,"luminance",{label:"Flash luminance",min:0,max:5e6,step:1e3,unit:"cd/m\xB2"}),s.number(t,this.spec.flash,"lightCandela",{label:"Flash light",min:0,max:2e5,step:100,unit:"cd"}),s.number(t,this.spec.flash,"kelvin",{label:"Flash temperature",min:1200,max:4e3,step:10,unit:"K"}),s.number(t,this.spec.flash,"smoke",{label:"Smoke",min:0,max:3,step:.01});let i=this.engine.tuning.scope(te.oaxis),a=`Viewmodel: ${this.spec.name}`;if(i.number(a,this.spec,"eyeRelief",{label:"Eye relief (ADS)",min:.03,max:.8,step:.001,unit:"m",help:"Rifle cheek weld \u2248 0.07\u20130.09 m; pistol at arms length \u2248 0.5\u20130.65 m."}).number(a,this.spec,"adsTime",{label:"ADS time",min:.05,max:1,step:.01,unit:"s"}).number(a,this.spec.hipOffset,"0",{label:"Hip offset x",min:-.3,max:.3,step:.001,unit:"m"}).number(a,this.spec.hipOffset,"1",{label:"Hip offset y",min:-.4,max:.1,step:.001,unit:"m"}).number(a,this.spec.hipOffset,"2",{label:"Hip offset z",min:-.8,max:-.1,step:.001,unit:"m"}),this.spec.drawTime!==void 0&&i.number(a,this.spec,"drawTime",{label:"Draw time",min:.1,max:2,step:.01,unit:"s"}),this.spec.action){let c=this.spec.action;i.number(a,c,"travelM",{label:"Slide/bolt travel",min:0,max:.12,step:5e-4,unit:"m"}).number(a,c,"backMs",{label:"Recoil stroke",min:1,max:40,step:.5,unit:"ms",help:"Real pistols \u2248 4\u20137 ms rearward, 7\u201310 ms return."}).number(a,c,"returnMs",{label:"Return stroke",min:1,max:60,step:.5,unit:"ms"}).bool(a,c,"lockOpenOnEmpty",{label:"Lock open on empty"})}let o=this.spec.reload;o.charge===void 0&&(o.charge=.6),this.spec.reloadPose??=this.spec.action&&this.spec.eyeRelief>.3?{lift:.07,back:.09,pitch:.42,yaw:.28,roll:.62,chargeRoll:.35}:{lift:.035,back:.05,pitch:.16,yaw:.32,roll:.42,chargeRoll:.2};let l=this.spec.reloadPose;i.number(a,l,"lift",{label:"Reload pose: lift",min:-.1,max:.2,step:.001,unit:"m"}).number(a,l,"back",{label:"Reload pose: pull back",min:0,max:.25,step:.001,unit:"m"}).number(a,l,"pitch",{label:"Reload pose: muzzle up",min:-.5,max:1,step:.01,unit:"rad"}).number(a,l,"yaw",{label:"Reload pose: yaw",min:-1,max:1,step:.01,unit:"rad"}).number(a,l,"roll",{label:"Reload pose: roll",min:-1.2,max:1.2,step:.01,unit:"rad"}).number(a,l,"chargeRoll",{label:"Rack: extra roll",min:-1,max:1,step:.01,unit:"rad"}),i.number(a,o,"magOut",{label:"Reload: mag out",min:.05,max:3,step:.01,unit:"s"}).number(a,o,"magIn",{label:"Reload: mag in",min:.05,max:3,step:.01,unit:"s"}).number(a,o,"boltRelease",{label:"Reload: release",min:.05,max:2,step:.01,unit:"s"}).number(a,o,"charge",{label:"Reload: rack",min:.2,max:2,step:.01,unit:"s",help:"Racking the slide / charging handle after an empty reload."}).number(a,this.magAnim,"ejectSpeed",{label:"Mag eject speed",min:0,max:5,step:.05,unit:"m/s"})}get reloadTime(){return this.reloadT}get racking(){return this.reloadPhase==="charge"||this.rackT>=0}get rackProgress(){return this.reloadPhase==="charge"?this.phaseT:this.rackT>=0?Math.min(1,this.rackT/(this.spec.reload.charge??.6)):-1}get rackDisplacement(){return this.model.charge?this.anim.charge:this.anim.slide}get chargeGrip(){if(this.model.charge)return this.model.charge.grip;let t=this.model.rearSight;return m.create(t[0],t[1]-.005,t[2]-.014)}get chargeTravel(){return this.model.charge?.travelM??this.spec.action?.travelM??0}get chargePullDir(){return this.model.charge?.pullDir??m.create(0,0,1)}reload(){return this.holstered||this.reloadT>=0||this.anim.equip<1||this.rounds>=this.spec.magazineCapacity?!1:(this.startReload(),!0)}rack(){return this.holstered||this.reloadT>=0||this.rackT>=0||!this.spec.action?!1:(this.rackT=0,this.rackSoundDone=0,!0)}scrubReload(t){this.reloadT>=0&&(this.reloadT=Math.max(0,t))}reloadPlan(){let t=this.spec.reload,r=[],s=0,i=(a,o)=>{r.push({phase:a,start:s,end:s+o}),s+=o};return i("magOut",t.magOut),i("magIn",t.magIn),this.reloadNeedsCharge?this.anim.lockedOpen&&(this.model.charge?.release??"slingshot")==="boltRelease"||!this.spec.action?i("release",t.boltRelease):i("charge",t.charge??.6):i("settle",t.boltRelease),r}reloadTotal(){let t=this.reloadPlan();return t[t.length-1].end}holster(){this.holstered=!0,this.renderer.settings.dof.overrideWeight=0,this.reloadT=-1,this.reloadPhase=null,this.rackT=-1,this.rackPull=-1,this.ads=0,this.flashLight.enabled=!1;for(let t of this.model.parts)t.object.visible=!1}draw(t=!1){this.holstered=!1,this.equipT=t?1e9:0,this.anim.equip=t?1:0;for(let s of this.model.parts)s.object.visible=!0;if(t)return;let r=this.local(this.model.ejectionPort);this.audio.whenReady(()=>this.audio.vorp?.noise({levelSpl:58,attackMs:30,decayMs:220,hpHz:300,lpHz:3500,thumpDb:-30},r))}computeZero(){let t=this.spec,r=this.muzzleVelocity,s=9.81,i=9e-4*r/Math.max(t.caliber.bcG7,.05)*.12,a=Math.max(r-i*t.zeroM*.5,r*.6),o=t.zeroM/a,l=.5*s*o*o;this.zeroAngle=Math.atan((t.sightHeightM+l)/t.zeroM)}local(t,r=m.create()){return m.transformMat4(r,t,this.rootWorld)}onUpdate(t){if(this.updateDroppedMags(),this.holstered){this.updateCasings();return}let r=this.spec,s=this.input,i=this.controller;this.equipT+=t;let a=r.drawTime??.5;this.anim.equip=Math.min(1,this.equipT/a);let o=this.reloadT<0&&this.rackT<0&&this.anim.equip>=1;this.flashLife>0&&(this.flashLife-=t,this.flashLife<=0&&(this.flashLight.enabled=!1));let l=this.adsOverride!==null?this.adsOverride>.5:s.action("aim")&&!i.sprinting;this.ads=K(this.ads,l?1:0,r.adsTime/4,t),this.sprintBlend=K(this.sprintBlend,i.sprinting&&this.reloadT<0&&this.rackT<0?1:0,i.sprinting?.09:.07,t),i.aiming=this.ads>.5;let c=this.renderer.settings.dof;c.overrideDistance=r.eyeRelief+m.distance(this.model.frontSight,this.model.rearSight),c.overrideWeight=this.ads*this.ads*(3-2*this.ads),s.actionPressed("fireMode")&&r.fireModes.length>1&&o&&this.cycleMode(),this.switchT=Math.min(1,this.switchT+t/.28);let u=this.model.selector?.angles[this.mode]??0;this.selectorAngle=K(this.selectorAngle,u,.035,t),s.actionPressed("reload")&&o&&this.rounds<r.magazineCapacity&&this.startReload(),this.reloadT>=0&&this.updateReload(t),this.rackT>=0&&this.updateRack(t),this.cooldown-=t;let h=this.triggerOverride!==null?this.triggerOverride:s.action("fire")&&(s.locked||!!s.gamepad),p=h&&!this.triggerHeld;if(this.triggerHeld=h,this.anim.trigger=K(this.anim.trigger,h&&o?1:0,.012,t),o&&h&&(this.mode==="auto"||p))for(;this.cooldown<=0&&(this.mode==="auto"||p);){if(this.mode==="safe"){p&&this.safeClick();break}if(this.chambered?this.fire():p&&!this.anim.lockedOpen&&this.dryFire(),this.cooldown+=60/r.rpm,this.mode!=="auto"||!this.chambered)break}this.cooldown<0&&(this.cooldown=0);let d=r.recoil,f=d.holdOmega*d.holdOmega,b=2*d.holdDamping*d.holdOmega,v=Math.max(1,Math.ceil(t/.002)),g=t/v,y=d.viewCouplingHip+(d.viewCouplingAds-d.viewCouplingHip)*this.ads,w=this.rot.x,P=this.rot.y;for(let U=0;U<v;U++){this.rot.vx+=(-f*this.rot.x-b*this.rot.vx)*g,this.rot.x+=this.rot.vx*g,this.rot.vy+=(-f*this.rot.y-b*this.rot.vy)*g,this.rot.y+=this.rot.vy*g;let V=900,E=2*.8*30;this.back.v+=(-V*this.back.z-E*this.back.v)*g,this.back.z+=this.back.v*g;let G=this.kick,I=46,W=I*I,Y=2*.42*I;G.vz+=(-W*G.z-Y*G.vz)*g,G.z+=G.vz*g,G.vrx+=(-W*G.rx-Y*G.vrx)*g,G.rx+=G.vrx*g,G.vrz+=(-W*G.rz-Y*G.vrz)*g,G.rz+=G.vrz*g}this.heat=Math.max(0,this.heat-t*3.5),this.wander*=Math.exp(-t*2),i.extraPitch+=(this.rot.x-w)*y,i.extraYaw+=(this.rot.y-P)*y,w=this.rot.x,P=this.rot.y;let k=s.locked?s.lookDelta(t):{yaw:0,pitch:0},A=140,T=2*.75*Math.sqrt(A);this.sway.vx-=k.pitch*4.5*(1-.6*this.ads),this.sway.vy-=k.yaw*4.5*(1-.6*this.ads);for(let U=0;U<v;U++)this.sway.vx+=(-A*this.sway.x-T*this.sway.vx)*g,this.sway.x+=this.sway.vx*g,this.sway.vy+=(-A*this.sway.y-T*this.sway.vy)*g,this.sway.y+=this.sway.vy*g;s.action("holdBreath")&&this.ads>.5?this.holdBreathT=Math.min(this.holdBreathT+t,6):this.holdBreathT=Math.max(0,this.holdBreathT-t*.5);let z=(.0016+.004*i.moving+.01*this.sprintBlend)*(this.holdBreathT>0&&this.holdBreathT<4?.15:1)*(1-.4*this.ads);this.breathPhase+=t*(.25+.35*i.moving)*Math.PI*2;let B=Math.sin(this.breathPhase)*z,C=Math.sin(this.breathPhase*.5+1.3)*z*.6;this.updateAction(t),this.updatePose(B,C),this.updateCasings()}updateAction(t){let r=this.spec.action,s=this.anim;if(this.slideT+=t,r){let i=r.backMs/1e3,a=r.returnMs/1e3,o=8e-4,l=r.travelM*(r.lockFraction??.92),c=u=>(u=Math.min(1,Math.max(0,u)),u*u*(3-2*u));if(this.releaseT>=0){this.releaseT+=t;let u=this.releaseT/a;s.slide=this.releaseFrom*(1-c(u)**.7),u>=1&&(this.releaseT=-1,s.slide=0)}else this.rackPull>=0?s.slide=Math.max(this.rackPull,s.lockedOpen?l:0):this.slideT<i?s.slide=r.travelM*Math.sin(this.slideT/i*Math.PI/2):this.slideT<i+o?s.slide=r.travelM:s.lockedOpen?s.slide=Math.max(l,r.travelM-(r.travelM-l)*c((this.slideT-i-o)/.003)):s.slide=r.travelM*(1-c((this.slideT-i-o)/a))}if(s.charge=this.rackPull>=0||this.rackRelease?s.slide:0,this.rackRelease&&s.slide<=0&&(this.rackRelease=!1),s.magOffset=0,s.magVisible=!0,this.reloadT>=0&&this.model.magAxis){let i=this.spec.reload,a=this.reloadT;if(a<i.magOut)s.magVisible=!this.magDropped,s.magOffset=this.magAnim.ejectSpeed*a+4.9*a*a,s.magOffset>.3&&(s.magVisible=!1);else if(a<i.magOut+i.magIn){let o=(a-i.magOut)/i.magIn,l=Math.min(1,o/this.magAnim.seatFraction);s.magOffset=this.magAnim.insertDistance*(1-l*l*(3-2*l))}}}updatePose(t,r){let s=this.spec,i=this.engine.camera,a=this.controller,o=a.eyeRot,l=a.eyePos,c=Math.sin(Math.PI*this.switchT)*(1-this.switchT*.3),u=L.fromEuler(L.create(),this.sway.x+t+this.rot.x+this.kick.rx-.02*c,this.sway.y+r+this.rot.y,this.sway.y*.6+this.kick.rz+.12*c),h=this.sprintBlend*this.sprintBlend*(3-2*this.sprintBlend),p=L.fromEuler(L.create(),-.35,.55,.25),d=this.reloadPose(),f=L.multiply(L.create(),o,u);L.multiply(f,f,L.slerp(L.create(),L.create(),p,h)),L.multiply(f,f,d.q);let b=1-this.anim.equip;b>0&&L.multiply(f,f,L.fromEuler(L.create(),-1.1*b*b,.25*b,.5*b*b));let v=m.transformQuat(m.create(),s.hipOffset,o);m.add(v,v,l);let g=m.transformQuat(m.create(),[0,0,-1],o),y=m.transformQuat(m.create(),this.model.rearSight,f),w=m.scaleAndAdd(m.create(),l,g,s.eyeRelief);m.sub(w,w,y);let P=this.ads*this.ads*(3-2*this.ads),k=m.lerp(m.create(),v,w,P),A=m.transformQuat(m.create(),[-.02*h,d.lift-this.equipDrop()-.01*c-.05*h,this.back.z+this.kick.z+d.back+.06*h],f);m.add(k,k,A);let T=Math.sin(this.engine.time*7)*.003*a.moving*(1-P)*(1+1.5*h);k[1]+=T,M.fromRotationTranslation(this.rootWorld,f,k);let z=this.anim,B=this.model.magAxis,C=(this.model.triggerTravelM??0)*z.trigger;for(let U of this.model.parts){let V=U.object.transform;if(U.bolt&&z.slide!==0?M.translate(V,this.rootWorld,[0,0,z.slide]):U.charge&&z.charge!==0?M.translate(V,this.rootWorld,[0,0,z.charge]):U.magazine&&B&&z.magOffset!==0?M.translate(V,this.rootWorld,[B[0]*z.magOffset,B[1]*z.magOffset,B[2]*z.magOffset]):U.trigger&&C!==0?M.translate(V,this.rootWorld,[0,0,C]):(!U.bolt||z.slide===0)&&(!U.charge||z.charge===0)&&M.copy(V,this.rootWorld),U.selector&&this.model.selector){let E=this.model.selector,G=L.setAxisAngle(L.create(),E.axis,this.selectorAngle),I=M.fromRotationTranslation(M.create(),G,[0,0,0]);M.translate(V,V,E.pivot),M.multiply(V,V,I),M.translate(V,V,[-E.pivot[0],-E.pivot[1],-E.pivot[2]])}M.multiply(V,V,U.local),U.magazine&&(U.object.visible=z.magVisible&&(!U.round||this.rounds>0))}}equipDrop(){let t=1-this.anim.equip;return .28*t*t*(3-2*t)}reloadPose(){let t=this.spec.reloadPose,r=o=>(o=Math.min(1,Math.max(0,o)),o*o*(3-2*o)),s=0,i=0;if(this.reloadT>=0){let o=this.reloadTotal();s=r(this.reloadT/.28)*r((o-this.reloadT)/.32),(this.reloadPhase==="charge"||this.reloadPhase==="release")&&(i=Math.sin(Math.PI*Math.min(1,this.phaseT))*s)}else if(this.rackT>=0){let o=this.spec.reload.charge??.6;s=r(this.rackT/.2)*r((o-this.rackT)/.25)*.6,i=Math.sin(Math.PI*Math.min(1,this.rackT/o))}return s===0?{q:L.create(),lift:0,back:0}:{q:L.fromEuler(L.create(),t.pitch*s,t.yaw*s,t.roll*s+t.chargeRoll*i),lift:t.lift*s,back:t.back*s}}updateRack(t){let r=this.spec.reload.charge??.6;this.rackT+=t,this.rackCycle(this.rackT/r,this.rackT-t<0),this.rackT>=r&&(this.rackT=-1,this.rackPull=-1)}rackCycle(t,r){let s=this.chargeTravel,i=o=>(o=Math.min(1,Math.max(0,o)),o*o*(3-2*o)),a=this.local(this.model.ejectionPort);if(r&&(this.rackSoundDone=0),t<.3){this.rackPull=-1;return}if(t<.55){let o=i((t-.3)/.25);this.rackPull=s*(.08+.92*o),this.rackSoundDone<1&&(this.rackSoundDone=1,this.audio.whenReady(()=>this.audio.vorp?.noise({levelSpl:68,attackMs:4,decayMs:110,hpHz:700,lpHz:7500,thumpDb:-34},a)),this.audio.modal(ee(1.25),[{timeMs:0,amp:.35,contactMs:.05,noiseDb:-10}],a,.6)),o>.97&&this.rackSoundDone<2&&(this.rackSoundDone=2,this.audio.modal(ee(1.1),[{timeMs:0,amp:.9,contactMs:.07,noiseDb:-6}],a,.9),this.chambered&&(this.ejectCasing(),this.chambered=!1));return}this.rackSoundDone<3&&(this.rackSoundDone=3,this.rackPull=-1,this.releaseFrom=Math.max(this.anim.slide,s),this.releaseT=0,this.anim.lockedOpen=!1,this.rackRelease=!0,this.audio.modal(ee(1),[{timeMs:0,amp:1.5,contactMs:.09,noiseDb:-3}],a,1.1),this.audio.whenReady(()=>this.audio.vorp?.noise({levelSpl:62,attackMs:2,decayMs:70,hpHz:900,lpHz:9e3,thumpDb:-30},a,{delayMs:8})),this.rounds>0&&!this.chambered&&(this.rounds--,this.chambered=!0))}startReload(){this.reloadT=0,this.reloadNeedsCharge=!this.chambered,this.reloadPhase="magOut",this.phaseT=0,this.rackSoundDone=0,this.magDropped=!1,this.model.magBox&&this.dropMagazine();let t=this.local(this.model.ejectionPort);this.audio.modal(ee(1.4),[{timeMs:0,amp:.25,contactMs:.06,noiseDb:-8}],t,.7),this.audio.whenReady(()=>this.audio.vorp?.noise({levelSpl:72,attackMs:8,decayMs:160,hpHz:600,lpHz:6e3,thumpDb:-40},t,{delayMs:60}))}updateReload(t){let r=this.spec.reload,s=this.reloadT;this.reloadT+=t;let i=this.local(this.model.ejectionPort),a=u=>s<u&&this.reloadT>=u,o=this.reloadPlan(),l=o.find(u=>this.reloadT<u.end)??o[o.length-1],c=this.reloadPhase;this.reloadPhase=l.phase,this.phaseT=Math.min(1,Math.max(0,(this.reloadT-l.start)/Math.max(1e-6,l.end-l.start))),a(r.magOut+r.magIn*.7)&&(this.audio.modal(ee(1.15),[{timeMs:0,amp:.6,contactMs:.08,noiseDb:-6},{timeMs:35,amp:.5,contactMs:.06,noiseDb:-8}],i,.9),this.rounds=this.spec.magazineCapacity),l.phase==="release"?this.phaseT>=.5&&this.anim.lockedOpen&&(this.anim.lockedOpen=!1,this.releaseFrom=this.anim.slide,this.releaseT=0,this.audio.modal(ee(1.35),[{timeMs:0,amp:.4,contactMs:.04,noiseDb:-8}],i,.6),this.audio.modal(ee(1),[{timeMs:0,amp:1.5,contactMs:.09,noiseDb:-3}],i,1.1,{delayMs:25}),this.rounds>0&&(this.rounds--,this.chambered=!0)):l.phase==="charge"&&this.rackCycle(this.phaseT,c!=="charge"),this.reloadT>=l.end&&l===o[o.length-1]&&(!this.chambered&&this.rounds>0&&(this.rounds--,this.chambered=!0),this.anim.lockedOpen=!1,this.reloadT=-1,this.reloadPhase=null,this.rackPull=-1)}cycleMode(){let t=this.spec.fireModes;this.mode=t[(t.indexOf(this.mode)+1)%t.length],this.switchT=0;let r=this.model.selector?m.transformMat4(m.create(),this.model.selector.pivot,this.rootWorld):this.local(this.model.ejectionPort);this.audio.whenReady(()=>{let s=this.audio.vorp;s&&(s.noise({levelSpl:74,attackMs:.2,decayMs:4,hpHz:1800,lpHz:9e3,thumpDb:-40},r),s.noise({levelSpl:80,attackMs:.2,decayMs:7,hpHz:1200,lpHz:8e3,thumpDb:-22},r,{delayMs:22}))}),this.input.rumble(.15,.05,25)}safeClick(){this.audio.modal(ee(.8),[{timeMs:0,amp:.15,contactMs:.08,noiseDb:-14}],this.local(this.model.ejectionPort),.35)}dryFire(){this.audio.modal(ee(1.5),[{timeMs:0,amp:.2,contactMs:.04,noiseDb:-10}],this.local(this.model.ejectionPort),.5)}fire(){let t=this.spec,r=t.caliber,s=this.local(this.model.muzzle),i=this.local(this.model.rearSight),a=this.local(this.model.frontSight),o=m.normalize(m.create(),m.sub(m.create(),a,i)),l=m.normalize(m.create(),m.set(m.create(),this.rootWorld[0],this.rootWorld[1],this.rootWorld[2])),c=m.cross(m.create(),l,o),u=t.accuracyMoa/60*q,h=this.rand.gauss()*u*.5,p=this.rand.gauss()*u*.5,d=m.normalize(m.create(),m.set(m.create(),o[0]+c[0]*(this.zeroAngle+p)+l[0]*h,o[1]+c[1]*(this.zeroAngle+p)+l[1]*h,o[2]+c[2]*(this.zeroAngle+p)+l[2]*h)),f=this.muzzleVelocity*(1+this.rand.gauss()*.004),b=m.scale(m.create(),d,f);m.add(b,b,this.controller.velocity);let v=m.scaleAndAdd(m.create(),s,d,-.05);this.physics.spawnProjectile(v,b,{bcG7:r.bcG7,massKg:r.bulletMassKg,diameterM:r.diameterM,maxTime:6,userId:1}),this.audio.projectileInfo.set(1,{diameter:r.diameterM,length:r.lengthM});let g={};t.suppressed&&(g.suppress=1,g.firstPopDb=this.engine.time-this.lastShotTime>4?4:0),this.effectsEnabled&&this.audio.gunshot(t.audio,s,d,this.local(this.model.ejectionPort),g);let y=this.recoilImpulse,w=t.recoil,P=y/(t.massKg+w.shoulderMassKg);this.back.v+=P;let k=y*w.boreAboveShoulderM/w.inertia,A=w.autoClimb??1;this.heat=Math.min(12,this.heat+1),this.wander=Math.max(-1.5,Math.min(1.5,this.wander+this.rand.gauss()*.45));let T=1+this.heat*.07*A;this.rot.vx+=k*(.85+.3*this.rand.next())*T,this.rot.vy+=k*w.horizontalRatio*(this.wander*.55+this.rand.gauss()*.5)*T,this.controller.extraPitch+=k/w.holdOmega*w.residualRise*(1+this.heat*.05*A);let z=(w.kick??1)*Math.min(2.5,Math.sqrt(this.freeRecoilEnergy/5));this.kick.vz+=.9*z,this.kick.vrx+=(2.2+this.rand.next()*.8)*z*(w.boreAboveShoulderM/.035),this.kick.vrz+=this.rand.gauss()*1.1*z;let B=(w.cameraPunch??1)*z;this.controller.punch(.9*B,this.rand.gauss()*.25*B,this.rand.gauss()*.55*B),this.input.rumble(Math.min(1,.6+.3*z),Math.min(1,.4+.3*z),70),this.effectsEnabled&&this.muzzleEffects(s,d),this.ejectCasing(),this.lastShotTime=this.engine.time,this.shotsFired++,this.rounds>0?(this.rounds--,this.chambered=!0):this.chambered=!1,this.slideT=0,this.releaseT=-1,!this.chambered&&this.spec.action?.lockOpenOnEmpty&&(this.anim.lockedOpen=!0),this.onShot?.(s,d)}muzzleEffects(t,r){let s=this.spec.flash,i=this.renderer.particles,a=ft(s.kelvin),o=.8+.4*this.rand.next();if(!this.spec.suppressed){if(i.spawn({kind:1,position:m.scaleAndAdd(m.create(),t,r,s.sizeM*.35),life:.022,size0:s.sizeM*o,size1:s.sizeM*o*1.15,color:a,alpha0:1,alpha1:1,luminance:s.luminance,rotation:this.rand.next()*6.28}),i.spawn({kind:1,position:m.scaleAndAdd(m.create(),t,r,s.sizeM*1.1),life:.018,size0:s.sizeM*.6*o,size1:s.sizeM*.7,color:a,alpha0:.8,alpha1:.6,luminance:s.luminance*.4}),s.sidePorts)for(let u of[-1,1]){let h=m.set(m.create(),this.rootWorld[0]*u,this.rootWorld[1]*u,this.rootWorld[2]*u);i.spawn({kind:1,position:m.scaleAndAdd(m.create(),t,h,.03),life:.015,size0:s.sizeM*.35,size1:s.sizeM*.45,color:a,alpha0:.7,alpha1:.4,luminance:s.luminance*.5})}this.flashLight.enabled=s.lightCandela>0,this.flashLight.position.set(m.scaleAndAdd(m.create(),t,r,.15)),this.flashLight.color=a,this.flashLight.intensity=s.lightCandela*o,this.flashLight.range=18,this.flashLight.radius=.05,this.flashLife=.017}let l=Math.round(3*s.smoke);for(let u=0;u<l;u++){let h=m.scale(m.create(),r,2+this.rand.next()*4);h[1]+=.3+this.rand.next()*.3,i.spawn({kind:0,position:m.scaleAndAdd(m.create(),t,r,.05+u*.08),velocity:h,life:1.6+this.rand.next()*1.4,size0:.04,size1:.45+this.rand.next()*.3,color:[.78,.77,.75],alpha0:.22,alpha1:0,drag:2.8,buoyancy:.25,spin:this.rand.range(-.6,.6),fadeIn:.02})}let c=this.local(this.model.ejectionPort);i.spawn({kind:0,position:c,velocity:[this.rootWorld[0]*.8,.3,this.rootWorld[2]*.8],life:.9,size0:.02,size1:.14,color:[.8,.8,.78],alpha0:.15,alpha1:0,drag:3,buoyancy:.2})}ejectCasing(){let t=this.spec.caliber.casing,r=this.spec.ejection,s=this.local(this.model.ejectionPort),i=this.physics.createBody(2,[t.diameterM/2,Math.max(.001,t.lengthM/2-t.diameterM/2),0],t.massKg,H.BRASS),a=M.getRotation(L.create(),this.rootWorld),o=L.rotateX(L.create(),a,Math.PI/2);i.setTransform(s,o);let l=(d,f,b)=>m.transformQuat(m.create(),[d,f,b],a),c=l(r.speed*(.9+.2*this.rand.next()),r.up*(.8+.4*this.rand.next()),r.back*(.8+.4*this.rand.next()));m.add(c,c,this.controller.velocity);let u=l(this.rand.gauss()*r.spinRad*.3,r.spinRad*(.7+.6*this.rand.next()),this.rand.gauss()*r.spinRad*.3);i.setVelocity(c,u);let h=new le(this.model.casingMesh,this.model.casingMaterial);h.castShadow=!0,this.engine.scene.add(h);let p={body:i,obj:h,born:this.engine.time,lastSound:-1,settled:!1};for(this.casings.push(p),this.casingByBody.set(i.id,p);this.casings.length>this.maxCasings;)this.removeCasing(this.casings[0])}dropMagazine(){let t=this.model.magBox,r=this.model.magAxis??m.create(0,-1,0),s=this.model.parts.filter(h=>h.magazine&&(!h.round||this.rounds>0));if(!s.length)return;let i=.08+.0118*this.rounds*(this.spec.caliber.bulletMassKg/.008*.5+.5),a=this.physics.createBody(1,[t.half[0],t.half[1],t.half[2]],i,H.POLYMER),o=M.getRotation(L.create(),this.rootWorld);a.setTransform(this.local(t.center),o);let l=m.transformQuat(m.create(),[r[0]*this.magAnim.ejectSpeed,r[1]*this.magAnim.ejectSpeed,r[2]*this.magAnim.ejectSpeed],o);m.add(l,l,this.controller.velocity),a.setVelocity(l,[this.rand.gauss()*1.5,this.rand.gauss()*.5,this.rand.gauss()*2]);let c=s.map(h=>{let p=new le(h.object.mesh,h.object.material);return p.castShadow=!0,this.engine.scene.add(p),p}),u={body:a,objs:c,lastSound:-1};for(this.droppedMags.push(u),this.magByBody.set(a.id,u),this.magDropped=!0;this.droppedMags.length>this.maxDroppedMags;){let h=this.droppedMags.shift();h.body.remove();for(let p of h.objs)this.engine.scene.remove(p);this.magByBody.delete(h.body.id)}this.updateDroppedMags()}tm=M.create();updateDroppedMags(){if(!this.droppedMags.length)return;let t=this.model.magBox.center;for(let r of this.droppedMags){let s=r.body.state();if(!(s[0]<.5)){this.tq[0]=s[4],this.tq[1]=s[5],this.tq[2]=s[6],this.tq[3]=s[7],M.fromRotationTranslation(this.tm,this.tq,[s[1],s[2],s[3]]),M.translate(this.tm,this.tm,[-t[0],-t[1],-t[2]]);for(let i of r.objs)M.copy(i.transform,this.tm)}}}removeCasing(t){t.body.remove(),this.engine.scene.remove(t.obj),this.casingByBody.delete(t.body.id),this.casings.splice(this.casings.indexOf(t),1)}tq=L.create();updateCasings(){for(let t of this.casings){let r=t.body.state();r[0]<.5||(this.tq[0]=r[4],this.tq[1]=r[5],this.tq[2]=r[6],this.tq[3]=r[7],M.fromRotationTranslation(t.obj.transform,this.tq,[r[1],r[2],r[3]]),t.settled=r[14]>.5)}}onCasingContact(t,r,s,i){let a=this.magByBody.get(t);if(a){if(r<.3||this.engine.time-a.lastSound<.06)return;a.lastSound=this.engine.time;let h=Math.min(1.5,r/2.5);oe(s).hard?this.audio.modal(ee(.75),[{timeMs:0,amp:h,contactMs:.25,noiseDb:-4}],i,.12+.2*h):this.audio.whenReady(()=>this.audio.vorp?.noise({...yr.dirt,levelSpl:58+12*h,decayMs:70,thumpDb:-3,grainsPerS:120},i));return}let o=this.casingByBody.get(t);if(!o||r<.35)return;let l=this.engine.time;if(l-o.lastSound<.05)return;o.lastSound=l;let c=oe(s),u=Math.min(1.5,r/3);if(c.hard){let h=this.spec.caliber.casing;this.audio.modal(vs(h.lengthM,h.diameterM),[{timeMs:0,amp:u,contactMs:.03+.05*(1-u),noiseDb:-12}],i,.05+.08*u)}else this.audio.whenReady(()=>this.audio.vorp?.noise({...yr.dirt,levelSpl:52+14*u,decayMs:40,thumpDb:-6,grainsPerS:200},i))}};function ja(n,e,t,r={}){let s=e/2,i=n;if(r.straight){let l=s*.955;return t([[0,-i/2],[s*.99,-i/2],[s*.99,-i/2+.0011],[s*.82,-i/2+.0015],[s*.82,-i/2+.0026],[s*.985,-i/2+.0032],[l,i/2],[l*.9,i/2],[l*.9,i/2-.002]],18)}let a=s*.68,o=[[0,-i/2],[s*.98,-i/2],[s*.98,-i/2+.0012],[s*.86,-i/2+.0016],[s*.86,-i/2+.0028],[s,-i/2+.0034],[s*.97,i/2-i*.22],[a,i/2-i*.13],[a,i/2],[a*.85,i/2]];return t(o,16)}import{plateModes as xs}from"./vorp.js";var Mr=class{constructor(e,t,r,s,i){this.spec=e;this.yaw=r;this.plate=s;this.pivot=m.clone(t),this.mass=7850*e.width*e.height*e.thickness,this.L=e.hangLength+e.height/2,this.inertia=this.mass*(this.L*this.L+(e.height*e.height+e.thickness*e.thickness)/12),this.twistInertia=this.mass*e.width*e.width/12,this.body=i.createBody(1,[e.width/2,e.height/2,e.thickness/2],5e3,H.STEEL_TARGET),this.sync()}angle=0;omega=0;twist=0;twistOmega=0;mass;pivot;body;hits=0;inertia;twistInertia;L;matrix(e=M.create()){let t=L.create();L.rotateY(t,t,this.yaw+this.twist),L.rotateX(t,t,-this.angle);let r=m.transformQuat(m.create(),[0,-this.L,0],t);return M.fromRotationTranslation(e,t,m.add(m.create(),this.pivot,r))}sync(){let e=this.matrix();this.plate.setTransform(e);let t=M.getRotation(L.create(),e);this.body.setTransform([e[12],e[13],e[14]],t),this.body.setVelocity([0,0,0],[0,0,0])}step(e){let r=Math.sqrt(this.mass*9.81*this.L/this.inertia),s=2*this.spec.damping*r,i=4,a=e/i;for(let o=0;o<i;o++){let l=-(this.mass*9.81*this.L*Math.sin(this.angle))/this.inertia-s*this.omega;this.omega+=l*a,this.angle+=this.omega*a,this.twistOmega+=(-6*this.twist-2*.15*Math.sqrt(6)*this.twistOmega)*a,this.twist+=this.twistOmega*a}this.sync()}hit(e,t){let r=this.matrix(),s=M.invert(M.create(),r),i=m.transformMat4(m.create(),t,s),a=i[0]/this.spec.width+.5,o=.5-i[1]/this.spec.height,l=m.normalize(m.create(),m.set(m.create(),r[0],r[1],r[2])),c=m.sub(m.create(),t,this.pivot),u=m.cross(m.create(),c,e);this.omega-=m.dot(u,l)/this.inertia;let h=m.create(0,1,0);return this.twistOmega+=m.dot(u,h)/this.twistInertia*.5,this.hits++,{u:Math.min(1,Math.max(0,a)),v:Math.min(1,Math.max(0,o))}}},Pr=class{constructor(e,t,r){this.object=e;this.width=t;this.height=r}hits=0},kr=class{constructor(e,t=.004){this.engine=e;this.bulletMass=t;e.physics.onProjectileHit.push(r=>this.onProjectileHit(r)),e.onFixed.push(r=>{for(let s of this.steel.values())s.step(r);this.checkPaper()})}steel=new Map;paper=[];rand=ie(9001);lastProj=new Map;steelMomentumTransfer=1.3;onHit=null;addSteel(e){this.steel.set(e.body.id,e)}addPaper(e){this.paper.push(e)}get renderer(){return this.engine.renderer}onProjectileHit(e){let t=e.body>=0?this.steel.get(e.body):void 0,r=m.length(e.velocity),s=.5*this.bulletMass*r*r;if(t){this.hitSteel(t,e,r);return}let i=oe(e.material);this.onHit?.(e,i.name);let a=this.renderer;i.decal!==null&&!e.ricochet&&a.decals.add(i.decal,e.point,e.normal,i.decalSize*(.8+.4*this.rand.next())),e.ricochet&&a.decals.add(4,e.point,e.normal,.02);let o=e.normal,l=m.normalize(m.create(),m.scaleAndAdd(m.create(),e.velocity,o,-2*m.dot(e.velocity,o)));if(i.debris==="dust"||i.debris==="splinters"){let u=i.debris==="dust"?5:3;for(let h=0;h<u;h++){let p=m.scale(m.create(),m.normalize(m.create(),m.set(m.create(),o[0]+this.rand.range(-.6,.6),o[1]+this.rand.range(0,.8),o[2]+this.rand.range(-.6,.6))),.8+this.rand.next()*2.5);a.particles.spawn({kind:3,position:e.point,velocity:p,life:.8+this.rand.next()*1.4,size0:.04,size1:.35+this.rand.next()*.3,color:i.debrisColor,alpha0:.55,alpha1:0,drag:3.5,gravity:.6})}for(let h=0;h<6;h++){let p=m.scale(m.create(),m.normalize(m.create(),m.set(m.create(),o[0]+this.rand.range(-.5,.5),o[1]+this.rand.range(.2,1),o[2]+this.rand.range(-.5,.5))),2+this.rand.next()*4);a.particles.spawn({kind:3,position:e.point,velocity:p,life:.5+this.rand.next()*.4,size0:.012,size1:.01,color:[i.debrisColor[0]*.5,i.debrisColor[1]*.5,i.debrisColor[2]*.5],alpha0:.9,alpha1:.6,gravity:9.81,drag:.4})}}else i.debris==="sparks"&&this.sparks(e.point,l,o,10);let c=10*Math.log10(Math.max(s,1)/1500);this.engine.audio.impact(i.impactSound,e.point,c)}sparks(e,t,r,s){for(let i=0;i<s;i++){let a=m.normalize(m.create(),m.set(m.create(),t[0]+r[0]*.5+this.rand.range(-.7,.7),t[1]+r[1]*.5+this.rand.range(-.4,.7),t[2]+r[2]*.5+this.rand.range(-.7,.7)));m.scale(a,a,4+this.rand.next()*10),this.renderer.particles.spawn({kind:2,position:e,velocity:a,life:.08+this.rand.next()*.25,size0:.0035,size1:.002,color:[1,.62,.28],alpha0:1,alpha1:.3,luminance:6e4,gravity:9.81,drag:1.2,stretch:.012})}this.renderer.particles.spawn({kind:1,position:e,life:.02,size0:.05,size1:.07,color:[1,.8,.55],alpha0:1,alpha1:1,luminance:15e4})}hitSteel(e,t,r){let s=m.normalize(m.create(),t.velocity),i=m.scale(m.create(),s,this.bulletMass*r*this.steelMomentumTransfer),{u:a,v:o}=e.hit(i,t.point);this.renderer.decals.add(4,t.point,t.normal,.06+this.rand.next()*.04,e.plate);let l=m.normalize(m.create(),m.scaleAndAdd(m.create(),s,t.normal,-2*m.dot(s,t.normal)));this.sparks(t.point,l,t.normal,14),this.renderer.particles.spawn({kind:3,position:t.point,velocity:[t.normal[0],t.normal[1]+.3,t.normal[2]],life:.6,size0:.05,size1:.3,color:[.55,.55,.55],alpha0:.35,alpha1:0,drag:4});let c=e.spec,u=xs({width:c.width,height:c.height,thickness:c.thickness,hitU:a,hitV:o,t60Fundamental:c.ringT60,level:30}),h=Math.min(2,(r/800)**2*1.2);this.engine.audio.modal(u,[{timeMs:0,amp:h,contactMs:.02,noiseDb:-14}],t.point,1,{bus:1}),this.onHit?.(t,"steel target")}checkPaper(){if(!this.paper.length){this.lastProj.clear();return}let e=this.engine.physics.projectiles(),t=new Set;for(let r of e){t.add(r.id);let s=this.lastProj.get(r.id);if(this.lastProj.set(r.id,m.clone(r.position)),!!s)for(let i of this.paper){let a=i.object.transform,o=m.create(a[12],a[13],a[14]),l=m.normalize(m.create(),m.set(m.create(),a[8],a[9],a[10])),c=m.dot(m.sub(m.create(),s,o),l),u=m.dot(m.sub(m.create(),r.position,o),l);if(c*u>0)continue;let h=c/(c-u),p=m.lerp(m.create(),s,r.position,h),d=M.invert(M.create(),a),f=m.transformMat4(m.create(),p,d);Math.abs(f[0])>i.width/2||Math.abs(f[1])>i.height/2||(i.hits++,this.renderer.decals.add(3,m.scaleAndAdd(m.create(),p,l,.001),l,.014,i.object),this.renderer.decals.add(3,m.scaleAndAdd(m.create(),p,l,-.004),m.negate(m.create(),l),.02,i.object),this.engine.audio.impact("paper",p,0))}}for(let r of[...this.lastProj.keys()])t.has(r)||this.lastProj.delete(r)}};export{st as AudioSystem,be as Behaviour,At as Body,zt as BodyShape,Ia as CALIBERS,He as Camera,Tt as Character,q as DEG2RAD,kt as DecalKind,Xe as DecalSystem,tt as DevUI,ws as EPSILON,vr as Engine,_e as FGLDevice,Pa as FOOTSTEPS,xr as FPSController,wr as Firearm,Ae as GIBaker,gt as Geometry,je as IBL,kr as ImpactSystem,Ze as Input,Me as MATERIAL_FLAGS,Ht as MATERIAL_UNIFORM_BYTES,te as MODULES,De as Material,Oe as MaterialSynth,we as Mesh,nt as MeshRendererC,yt as MipGenerator,Pr as PaperTarget,Pt as ParticleKind,$e as ParticleSystem,rt as PhysicsWorld,Ne as PointLight,ys as RAD2DEG,le as RenderObject,Ye as Renderer,Nt as SKIN_LAYOUT,Ce as SKIN_STRIDE,H as SURFACE,ze as SURFACES,We as Scene,Te as ScriptsC,Ie as Sky,Mr as SteelTarget,Ss as TEX_USAGE_RT,Ts as TEX_USAGE_STORAGE,Ee as TextureCache,Je as Transform,fe as TransformC,et as Tuning,Ve as UniformWriter,xt as VERTEX_LAYOUT,jt as VERTEX_STRIDE,wt as WGSL_MATERIAL,Qe as World,$ as aabb,dt as aabbInFrustum,Ur as box,Fs as capsule,ja as casingGeometry,Ns as circle2,Re as clamp,Kt as computeCascades,vt as computeTangents,Cs as cylinder,K as damp,as as defaultRenderSettings,qt as defaultShadows,Fr as defaultSky,pe as defineComponent,Ys as emptyBounds,Ft as ev100FromCamera,Ls as exposureFromEv100,mt as extractFrustumPlanes,js as extrude,gs as fillInvalid,ht as halton,Gs as hexToLinear,ft as kelvinToLinear,Ot as kelvinToLinearY1,Br as lathe,Gr as lerp,zs as linearToSrgb,It as lumensToCandela,M as mat4,Q as mipCount,Ds as plane,L as quat,gr as registerAudioTuning,br as registerRenderTuning,ga as registerSurfaces,ie as rng,Hs as roundRect2,Vs as roundedBox,zr as saturate,Ms as smoothstep,Es as sphere,pt as srgbToLinear,Wt as sunDirection,$r as sunTransmittance,ba as surfaceAlbedoTable,oe as surfaceOf,Os as torus,Rr as triangulate,Is as tube,m as vec3,Ps as vec4};
//# sourceMappingURL=fondainegl.js.map
