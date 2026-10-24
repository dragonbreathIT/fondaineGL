var Le=Math.PI/180,Ls=180/Math.PI;var m={create(n=0,e=0,a=0){let t=new Float32Array(3);return t[0]=n,t[1]=e,t[2]=a,t},clone(n){return m.create(n[0],n[1],n[2])},set(n,e,a,t){return n[0]=e,n[1]=a,n[2]=t,n},copy(n,e){return n[0]=e[0],n[1]=e[1],n[2]=e[2],n},add(n,e,a){return n[0]=e[0]+a[0],n[1]=e[1]+a[1],n[2]=e[2]+a[2],n},sub(n,e,a){return n[0]=e[0]-a[0],n[1]=e[1]-a[1],n[2]=e[2]-a[2],n},mul(n,e,a){return n[0]=e[0]*a[0],n[1]=e[1]*a[1],n[2]=e[2]*a[2],n},scale(n,e,a){return n[0]=e[0]*a,n[1]=e[1]*a,n[2]=e[2]*a,n},scaleAndAdd(n,e,a,t){return n[0]=e[0]+a[0]*t,n[1]=e[1]+a[1]*t,n[2]=e[2]+a[2]*t,n},dot(n,e){return n[0]*e[0]+n[1]*e[1]+n[2]*e[2]},cross(n,e,a){let t=e[0],r=e[1],s=e[2],i=a[0],o=a[1],c=a[2];return n[0]=r*c-s*o,n[1]=s*i-t*c,n[2]=t*o-r*i,n},length(n){return Math.hypot(n[0],n[1],n[2])},lengthSq(n){return n[0]*n[0]+n[1]*n[1]+n[2]*n[2]},distance(n,e){return Math.hypot(n[0]-e[0],n[1]-e[1],n[2]-e[2])},normalize(n,e){let a=Math.hypot(e[0],e[1],e[2]),t=a>0?1/a:0;return n[0]=e[0]*t,n[1]=e[1]*t,n[2]=e[2]*t,n},negate(n,e){return n[0]=-e[0],n[1]=-e[1],n[2]=-e[2],n},lerp(n,e,a,t){return n[0]=e[0]+(a[0]-e[0])*t,n[1]=e[1]+(a[1]-e[1])*t,n[2]=e[2]+(a[2]-e[2])*t,n},min(n,e,a){return n[0]=Math.min(e[0],a[0]),n[1]=Math.min(e[1],a[1]),n[2]=Math.min(e[2],a[2]),n},max(n,e,a){return n[0]=Math.max(e[0],a[0]),n[1]=Math.max(e[1],a[1]),n[2]=Math.max(e[2],a[2]),n},transformMat4(n,e,a){let t=e[0],r=e[1],s=e[2],i=a[3]*t+a[7]*r+a[11]*s+a[15];return i=i||1,n[0]=(a[0]*t+a[4]*r+a[8]*s+a[12])/i,n[1]=(a[1]*t+a[5]*r+a[9]*s+a[13])/i,n[2]=(a[2]*t+a[6]*r+a[10]*s+a[14])/i,n},transformDirMat4(n,e,a){let t=e[0],r=e[1],s=e[2];return n[0]=a[0]*t+a[4]*r+a[8]*s,n[1]=a[1]*t+a[5]*r+a[9]*s,n[2]=a[2]*t+a[6]*r+a[10]*s,n},transformQuat(n,e,a){let t=a[0],r=a[1],s=a[2],i=a[3],o=e[0],c=e[1],b=e[2],l=r*b-s*c,u=s*o-t*b,h=t*c-r*o,d=r*h-s*u,x=s*l-t*h,p=t*u-r*l,w=i*2;return l*=w,u*=w,h*=w,d*=2,x*=2,p*=2,n[0]=o+l+d,n[1]=c+u+x,n[2]=b+h+p,n}};var G={create(){let n=new Float32Array(4);return n[3]=1,n},fromValues(n,e,a,t){let r=new Float32Array(4);return r[0]=n,r[1]=e,r[2]=a,r[3]=t,r},identity(n){return n[0]=0,n[1]=0,n[2]=0,n[3]=1,n},copy(n,e){return n[0]=e[0],n[1]=e[1],n[2]=e[2],n[3]=e[3],n},setAxisAngle(n,e,a){let t=a*.5,r=Math.sin(t);return n[0]=r*e[0],n[1]=r*e[1],n[2]=r*e[2],n[3]=Math.cos(t),n},multiply(n,e,a){let t=e[0],r=e[1],s=e[2],i=e[3],o=a[0],c=a[1],b=a[2],l=a[3];return n[0]=t*l+i*o+r*b-s*c,n[1]=r*l+i*c+s*o-t*b,n[2]=s*l+i*b+t*c-r*o,n[3]=i*l-t*o-r*c-s*b,n},rotateX(n,e,a){let t=a*.5,r=Math.sin(t),s=Math.cos(t),i=e[0],o=e[1],c=e[2],b=e[3];return n[0]=i*s+b*r,n[1]=o*s+c*r,n[2]=c*s-o*r,n[3]=b*s-i*r,n},rotateY(n,e,a){let t=a*.5,r=Math.sin(t),s=Math.cos(t),i=e[0],o=e[1],c=e[2],b=e[3];return n[0]=i*s-c*r,n[1]=o*s+b*r,n[2]=c*s+i*r,n[3]=b*s-o*r,n},rotateZ(n,e,a){let t=a*.5,r=Math.sin(t),s=Math.cos(t),i=e[0],o=e[1],c=e[2],b=e[3];return n[0]=i*s+o*r,n[1]=o*s-i*r,n[2]=c*s+b*r,n[3]=b*s-c*r,n},fromEuler(n,e,a,t){return G.identity(n),G.rotateY(n,n,a),G.rotateX(n,n,e),G.rotateZ(n,n,t),n},normalize(n,e){let a=Math.hypot(e[0],e[1],e[2],e[3]),t=a>0?1/a:0;return n[0]=e[0]*t,n[1]=e[1]*t,n[2]=e[2]*t,n[3]=e[3]*t,n},conjugate(n,e){return n[0]=-e[0],n[1]=-e[1],n[2]=-e[2],n[3]=e[3],n},invert(n,e){let a=e[0]*e[0]+e[1]*e[1]+e[2]*e[2]+e[3]*e[3],t=a?1/a:0;return n[0]=-e[0]*t,n[1]=-e[1]*t,n[2]=-e[2]*t,n[3]=e[3]*t,n},dot(n,e){return n[0]*e[0]+n[1]*e[1]+n[2]*e[2]+n[3]*e[3]},slerp(n,e,a,t){let r=e[0],s=e[1],i=e[2],o=e[3],c=a[0],b=a[1],l=a[2],u=a[3],h=r*c+s*b+i*l+o*u;h<0&&(h=-h,c=-c,b=-b,l=-l,u=-u);let d,x;if(1-h>1e-6){let p=Math.acos(h),w=Math.sin(p);d=Math.sin((1-t)*p)/w,x=Math.sin(t*p)/w}else d=1-t,x=t;return n[0]=d*r+x*c,n[1]=d*s+x*b,n[2]=d*i+x*l,n[3]=d*o+x*u,n},rotationTo(n,e,a){let t=m.dot(e,a);if(t<-.999999){let s=m.create();return m.cross(s,m.create(1,0,0),e),m.length(s)<1e-6&&m.cross(s,m.create(0,1,0),e),m.normalize(s,s),G.setAxisAngle(n,s,Math.PI)}if(t>.999999)return G.identity(n);let r=m.cross(m.create(),e,a);return n[0]=r[0],n[1]=r[1],n[2]=r[2],n[3]=1+t,G.normalize(n,n)},lookRotation(n,e,a){let t=T.create(),r=m.normalize(m.create(),m.negate(m.create(),e)),s=m.normalize(m.create(),m.cross(m.create(),a,r)),i=m.cross(m.create(),r,s);return t[0]=s[0],t[1]=s[1],t[2]=s[2],t[4]=i[0],t[5]=i[1],t[6]=i[2],t[8]=r[0],t[9]=r[1],t[10]=r[2],T.getRotation(n,t)}},T={create(){let n=new Float32Array(16);return n[0]=n[5]=n[10]=n[15]=1,n},clone(n){return new Float32Array(n)},copy(n,e){for(let a=0;a<16;a++)n[a]=e[a];return n},identity(n){return n.fill(0),n[0]=n[5]=n[10]=n[15]=1,n},multiply(n,e,a){let t=e[0],r=e[1],s=e[2],i=e[3],o=e[4],c=e[5],b=e[6],l=e[7],u=e[8],h=e[9],d=e[10],x=e[11],p=e[12],w=e[13],g=e[14],y=e[15];for(let S=0;S<4;S++){let f=a[S*4],M=a[S*4+1],A=a[S*4+2],v=a[S*4+3];n[S*4]=f*t+M*o+A*u+v*p,n[S*4+1]=f*r+M*c+A*h+v*w,n[S*4+2]=f*s+M*b+A*d+v*g,n[S*4+3]=f*i+M*l+A*x+v*y}return n},invert(n,e){let a=e[0],t=e[1],r=e[2],s=e[3],i=e[4],o=e[5],c=e[6],b=e[7],l=e[8],u=e[9],h=e[10],d=e[11],x=e[12],p=e[13],w=e[14],g=e[15],y=a*o-t*i,S=a*c-r*i,f=a*b-s*i,M=t*c-r*o,A=t*b-s*o,v=r*b-s*c,k=l*p-u*x,P=l*w-h*x,j=l*g-d*x,E=u*w-h*p,z=u*g-d*p,I=h*g-d*w,L=y*I-S*z+f*E+M*j-A*P+v*k;return L?(L=1/L,n[0]=(o*I-c*z+b*E)*L,n[1]=(r*z-t*I-s*E)*L,n[2]=(p*v-w*A+g*M)*L,n[3]=(h*A-u*v-d*M)*L,n[4]=(c*j-i*I-b*P)*L,n[5]=(a*I-r*j+s*P)*L,n[6]=(w*f-x*v-g*S)*L,n[7]=(l*v-h*f+d*S)*L,n[8]=(i*z-o*j+b*k)*L,n[9]=(t*j-a*z-s*k)*L,n[10]=(x*A-p*f+g*y)*L,n[11]=(u*f-l*A-d*y)*L,n[12]=(o*P-i*E-c*k)*L,n[13]=(a*E-t*P+r*k)*L,n[14]=(p*S-x*M-w*y)*L,n[15]=(l*M-u*S+h*y)*L,n):null},transpose(n,e){if(n===e){let a=e[1],t=e[2],r=e[3],s=e[6],i=e[7],o=e[11];return n[1]=e[4],n[2]=e[8],n[3]=e[12],n[4]=a,n[6]=e[9],n[7]=e[13],n[8]=t,n[9]=s,n[11]=e[14],n[12]=r,n[13]=i,n[14]=o,n}for(let a=0;a<4;a++)for(let t=0;t<4;t++)n[t*4+a]=e[a*4+t];return n},fromRotationTranslationScale(n,e,a,t){let r=e[0],s=e[1],i=e[2],o=e[3],c=r+r,b=s+s,l=i+i,u=r*c,h=r*b,d=r*l,x=s*b,p=s*l,w=i*l,g=o*c,y=o*b,S=o*l,f=t[0],M=t[1],A=t[2];return n[0]=(1-(x+w))*f,n[1]=(h+S)*f,n[2]=(d-y)*f,n[3]=0,n[4]=(h-S)*M,n[5]=(1-(u+w))*M,n[6]=(p+g)*M,n[7]=0,n[8]=(d+y)*A,n[9]=(p-g)*A,n[10]=(1-(u+x))*A,n[11]=0,n[12]=a[0],n[13]=a[1],n[14]=a[2],n[15]=1,n},fromRotationTranslation(n,e,a){return T.fromRotationTranslationScale(n,e,a,_t)},translate(n,e,a){let t=a[0],r=a[1],s=a[2];if(n!==e)for(let i=0;i<12;i++)n[i]=e[i];return n[12]=e[0]*t+e[4]*r+e[8]*s+e[12],n[13]=e[1]*t+e[5]*r+e[9]*s+e[13],n[14]=e[2]*t+e[6]*r+e[10]*s+e[14],n[15]=e[3]*t+e[7]*r+e[11]*s+e[15],n},fromTranslation(n,e){return T.identity(n),n[12]=e[0],n[13]=e[1],n[14]=e[2],n},fromScaling(n,e){return T.identity(n),n[0]=e[0],n[5]=e[1],n[10]=e[2],n},fromQuat(n,e){return T.fromRotationTranslationScale(n,e,sn,_t)},getTranslation(n,e){return n[0]=e[12],n[1]=e[13],n[2]=e[14],n},getScaling(n,e){return n[0]=Math.hypot(e[0],e[1],e[2]),n[1]=Math.hypot(e[4],e[5],e[6]),n[2]=Math.hypot(e[8],e[9],e[10]),n},getRotation(n,e){let a=Math.hypot(e[0],e[1],e[2])||1,t=Math.hypot(e[4],e[5],e[6])||1,r=Math.hypot(e[8],e[9],e[10])||1,s=e[0]/a,i=e[1]/a,o=e[2]/a,c=e[4]/t,b=e[5]/t,l=e[6]/t,u=e[8]/r,h=e[9]/r,d=e[10]/r,x=s+b+d;if(x>0){let p=Math.sqrt(x+1)*2;n[3]=.25*p,n[0]=(l-h)/p,n[1]=(u-o)/p,n[2]=(i-c)/p}else if(s>b&&s>d){let p=Math.sqrt(1+s-b-d)*2;n[3]=(l-h)/p,n[0]=.25*p,n[1]=(i+c)/p,n[2]=(u+o)/p}else if(b>d){let p=Math.sqrt(1+b-s-d)*2;n[3]=(u-o)/p,n[0]=(i+c)/p,n[1]=.25*p,n[2]=(l+h)/p}else{let p=Math.sqrt(1+d-s-b)*2;n[3]=(i-c)/p,n[0]=(u+o)/p,n[1]=(l+h)/p,n[2]=.25*p}return n},lookAt(n,e,a,t){let r=e[0]-a[0],s=e[1]-a[1],i=e[2]-a[2],o=Math.hypot(r,s,i)||1;r/=o,s/=o,i/=o;let c=t[1]*i-t[2]*s,b=t[2]*r-t[0]*i,l=t[0]*s-t[1]*r;o=Math.hypot(c,b,l)||1,c/=o,b/=o,l/=o;let u=s*l-i*b,h=i*c-r*l,d=r*b-s*c;return n[0]=c,n[1]=u,n[2]=r,n[3]=0,n[4]=b,n[5]=h,n[6]=s,n[7]=0,n[8]=l,n[9]=d,n[10]=i,n[11]=0,n[12]=-(c*e[0]+b*e[1]+l*e[2]),n[13]=-(u*e[0]+h*e[1]+d*e[2]),n[14]=-(r*e[0]+s*e[1]+i*e[2]),n[15]=1,n},perspectiveReversedInfinite(n,e,a,t,r=0,s=0){let i=1/Math.tan(e/2);return n.fill(0),n[0]=i/a,n[5]=i,n[8]=-r,n[9]=-s,n[11]=-1,n[14]=t,n},perspectiveZO(n,e,a,t,r){let s=1/Math.tan(e/2);n.fill(0),n[0]=s/a,n[5]=s,n[11]=-1;let i=1/(t-r);return n[10]=r*i,n[14]=r*t*i,n},orthoZO(n,e,a,t,r,s,i){let o=1/(e-a),c=1/(t-r),b=1/(s-i);return n.fill(0),n[0]=-2*o,n[5]=-2*c,n[10]=b,n[15]=1,n[12]=(e+a)*o,n[13]=(r+t)*c,n[14]=s*b,n},normalMatrix12(n,e,a=0){let t=e[0],r=e[1],s=e[2],i=e[4],o=e[5],c=e[6],b=e[8],l=e[9],u=e[10],h=u*o-c*l,d=-u*i+c*b,x=l*i-o*b,p=t*h+r*d+s*x;p=p?1/p:0;let w=h*p,g=(-u*r+s*l)*p,y=(c*r-s*o)*p,S=d*p,f=(u*t-s*b)*p,M=(-c*t+s*i)*p,A=x*p,v=(-l*t+r*b)*p,k=(o*t-r*i)*p;return n[a+0]=w,n[a+1]=S,n[a+2]=A,n[a+3]=0,n[a+4]=g,n[a+5]=f,n[a+6]=v,n[a+7]=0,n[a+8]=y,n[a+9]=M,n[a+10]=k,n[a+11]=0,n}},_t=new Float32Array([1,1,1]),sn=new Float32Array([0,0,0]),ke={create(){return{min:m.create(1/0,1/0,1/0),max:m.create(-1/0,-1/0,-1/0)}},fromPositions(n){let e=ke.create();for(let a=0;a<n.length;a+=3){let t=n[a],r=n[a+1],s=n[a+2];t<e.min[0]&&(e.min[0]=t),r<e.min[1]&&(e.min[1]=r),s<e.min[2]&&(e.min[2]=s),t>e.max[0]&&(e.max[0]=t),r>e.max[1]&&(e.max[1]=r),s>e.max[2]&&(e.max[2]=s)}return e},transform(n,e,a){for(let t=0;t<3;t++){let r=a[12+t],s=a[12+t];for(let i=0;i<3;i++){let o=a[i*4+t],c=o*e.min[i],b=o*e.max[i];c<b?(r+=c,s+=b):(r+=b,s+=c)}n.min[t]=r,n.max[t]=s}return n}};function ft(n,e=new Float32Array(20)){let a=c=>[n[c],n[4+c],n[8+c],n[12+c]],t=a(0),r=a(1),s=a(2),i=a(3),o=[[i[0]+t[0],i[1]+t[1],i[2]+t[2],i[3]+t[3]],[i[0]-t[0],i[1]-t[1],i[2]-t[2],i[3]-t[3]],[i[0]+r[0],i[1]+r[1],i[2]+r[2],i[3]+r[3]],[i[0]-r[0],i[1]-r[1],i[2]-r[2],i[3]-r[3]],[i[0]-s[0],i[1]-s[1],i[2]-s[2],i[3]-s[3]]];for(let c=0;c<5;c++){let b=Math.hypot(o[c][0],o[c][1],o[c][2])||1;for(let l=0;l<4;l++)e[c*4+l]=o[c][l]/b}return e}function pt(n,e){for(let a=0;a<5;a++){let t=n[a*4],r=n[a*4+1],s=n[a*4+2],i=n[a*4+3],o=t>=0?e.max[0]:e.min[0],c=r>=0?e.max[1]:e.min[1],b=s>=0?e.max[2]:e.min[2];if(t*o+r*c+s*b+i<0)return!1}return!0}function Oe(n=2654435769){let e=n>>>0,a=()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296};return{next:a,range:(t,r)=>t+(r-t)*a(),gauss:()=>{let t=Math.max(a(),1e-12),r=a();return Math.sqrt(-2*Math.log(t))*Math.cos(2*Math.PI*r)},sign:()=>a()<.5?-1:1}}function gt(n,e){let a=1,t=0,r=n;for(;r>0;)a/=e,t+=a*(r%e),r=Math.floor(r/e);return t}var Ra=class n{adapter;device;context;canvas;presentationFormat;features;onError=e=>console.error("[fondaineGL]",e);offscreen;constructor(e,a,t,r){this.adapter=e,this.device=a,this.canvas=t,this.offscreen=r,this.presentationFormat=r?"rgba8unorm":navigator.gpu.getPreferredCanvasFormat();let s=r?null:t.getContext("webgpu");if(!r&&!s)throw new Error("fondaineGL: could not get a WebGPU canvas context");this.context=s,r||this.context.configure({device:a,format:this.presentationFormat,alphaMode:"opaque"}),this.features=new Set([...a.features]),a.addEventListener("uncapturederror",i=>this.onError(i.error.message)),a.lost.then(i=>this.onError(`device lost (${i.reason}): ${i.message}`))}static async create(e){if(!("gpu"in navigator))throw new Error("fondaineGL requires WebGPU (Chrome/Edge 113+, Safari 26+, Firefox 141+).");let a=await navigator.gpu.requestAdapter({powerPreference:e.powerPreference??"high-performance"});if(!a)throw new Error("fondaineGL: no WebGPU adapter available");let r=["float32-filterable","rg11b10ufloat-renderable","texture-compression-bc","texture-compression-astc","texture-compression-etc2",...e.optionalFeatures??[]].filter(o=>a.features.has(o)),s=a.limits,i=await a.requestDevice({requiredFeatures:r,requiredLimits:{maxTextureDimension2D:s.maxTextureDimension2D,maxTextureArrayLayers:s.maxTextureArrayLayers,maxStorageBufferBindingSize:s.maxStorageBufferBindingSize,maxBufferSize:s.maxBufferSize,maxComputeWorkgroupStorageSize:s.maxComputeWorkgroupStorageSize,maxComputeInvocationsPerWorkgroup:s.maxComputeInvocationsPerWorkgroup,maxStorageTexturesPerShaderStage:s.maxStorageTexturesPerShaderStage,maxSampledTexturesPerShaderStage:s.maxSampledTexturesPerShaderStage,maxColorAttachmentBytesPerSample:s.maxColorAttachmentBytesPerSample}});return new n(a,i,e.canvas,!!e.offscreen)}get floatFilterable(){return this.features.has("float32-filterable")}createBuffer(e,a,t,r){let s=Math.max(16,Math.ceil(e/16)*16),i=this.device.createBuffer({size:s,usage:a|GPUBufferUsage.COPY_DST,label:t});return r&&this.device.queue.writeBuffer(i,0,r.buffer,r.byteOffset,r.byteLength),i}createTexture(e){return this.device.createTexture(e)}shader(e,a){let t=this.device.createShaderModule({code:e,label:a});return t.getCompilationInfo?.().then(r=>{for(let s of r.messages){if(s.type!=="error")continue;let o=e.split(`
`).slice(Math.max(0,s.lineNum-3),s.lineNum+1).join(`
`);this.onError(`WGSL error in ${a??"shader"} @${s.lineNum}:${s.linePos}: ${s.message}
${o}`)}}),t}},La=class{f32;u32;buffer;constructor(e){this.buffer=new ArrayBuffer(Math.ceil(e/16)*16),this.f32=new Float32Array(this.buffer),this.u32=new Uint32Array(this.buffer)}mat4(e,a){this.f32.set(a,e/4)}vec4(e,a,t=0,r=0,s=0){let i=e/4;this.f32[i]=a,this.f32[i+1]=t,this.f32[i+2]=r,this.f32[i+3]=s}uvec4(e,a,t=0,r=0,s=0){let i=e/4;this.u32[i]=a,this.u32[i+1]=t,this.u32[i+2]=r,this.u32[i+3]=s}f(e,a){this.f32[e/4]=a}};function Ae(n,e=n){return Math.floor(Math.log2(Math.max(n,e)))+1}function Jt(n,e,a){return Math.log2(n*n/e*(100/a))}var ge=class n{positions;normals;uvs;tangents=null;indices;joints=null;weights=null;constructor(e,a,t,r){this.positions=Float32Array.from(e),this.normals=Float32Array.from(a),this.uvs=Float32Array.from(t),this.indices=Uint32Array.from(r)}get vertexCount(){return this.positions.length/3}get triangleCount(){return this.indices.length/3}clone(){let e=new n(this.positions,this.normals,this.uvs,this.indices);return this.tangents&&(e.tangents=Float32Array.from(this.tangents)),this.joints&&(e.joints=Uint16Array.from(this.joints)),this.weights&&(e.weights=Float32Array.from(this.weights)),e}bounds(){return ke.fromPositions(this.positions)}transform(e){let a=m.create(),t=m.create(),r=T.invert(T.create(),e);T.transpose(r,r);for(let i=0;i<this.positions.length;i+=3)m.transformMat4(a,this.positions.subarray(i,i+3),e),this.positions.set(a,i),m.transformDirMat4(t,this.normals.subarray(i,i+3),r),m.normalize(t,t),this.normals.set(t,i);if(this.tangents){let i=m.create();for(let o=0;o<this.tangents.length;o+=4)m.transformDirMat4(i,this.tangents.subarray(o,o+3),e),m.normalize(i,i),this.tangents.set(i,o)}return e[0]*(e[5]*e[10]-e[6]*e[9])-e[4]*(e[1]*e[10]-e[2]*e[9])+e[8]*(e[1]*e[6]-e[2]*e[5])<0&&this.flipWinding(),this}translate(e,a,t){return this.transform(T.fromTranslation(T.create(),[e,a,t]))}rotateX(e){let a=T.create();return a[5]=Math.cos(e),a[6]=Math.sin(e),a[9]=-Math.sin(e),a[10]=Math.cos(e),this.transform(a)}rotateY(e){let a=T.create();return a[0]=Math.cos(e),a[2]=-Math.sin(e),a[8]=Math.sin(e),a[10]=Math.cos(e),this.transform(a)}rotateZ(e){let a=T.create();return a[0]=Math.cos(e),a[1]=Math.sin(e),a[4]=-Math.sin(e),a[5]=Math.cos(e),this.transform(a)}scale(e,a=e,t=e){return this.transform(T.fromScaling(T.create(),[e,a,t]))}flipWinding(){let e=this.indices;for(let a=0;a<e.length;a+=3){let t=e[a+1];e[a+1]=e[a+2],e[a+2]=t}return this}scaleUVs(e,a=e){for(let t=0;t<this.uvs.length;t+=2)this.uvs[t]*=e,this.uvs[t+1]*=a;return this}displace(e){for(let a=0;a<this.positions.length;a+=3){let t=e([this.positions[a],this.positions[a+1],this.positions[a+2]]);this.positions[a]=t[0],this.positions[a+1]=t[1],this.positions[a+2]=t[2]}return this.computeNormals()}computeNormals(){let e=new Float32Array(this.positions.length),a=this.positions,t=this.indices;for(let r=0;r<t.length;r+=3){let s=t[r]*3,i=t[r+1]*3,o=t[r+2]*3,c=a[i]-a[s],b=a[i+1]-a[s+1],l=a[i+2]-a[s+2],u=a[o]-a[s],h=a[o+1]-a[s+1],d=a[o+2]-a[s+2],x=b*d-l*h,p=l*u-c*d,w=c*h-b*u;for(let g of[s,i,o])e[g]+=x,e[g+1]+=p,e[g+2]+=w}for(let r=0;r<e.length;r+=3){let s=Math.hypot(e[r],e[r+1],e[r+2])||1;e[r]/=s,e[r+1]/=s,e[r+2]/=s}return this.normals=e,this}computeTangents(){return this.tangents=yt(this.positions,this.normals,this.uvs,this.indices),this}toFlat(){let e=this.indices,a=new Float32Array(e.length*3),t=new Float32Array(e.length*2);for(let s=0;s<e.length;s++)a.set(this.positions.subarray(e[s]*3,e[s]*3+3),s*3),t.set(this.uvs.subarray(e[s]*2,e[s]*2+2),s*2);return new n(a,new Float32Array(a.length),t,Array.from({length:e.length},(s,i)=>i)).computeNormals()}static merge(e){let a=0,t=0;for(let d of e)a+=d.vertexCount,t+=d.indices.length;let r=new Float32Array(a*3),s=new Float32Array(a*3),i=new Float32Array(a*2),o=new Uint32Array(t),b=e.some(d=>d.tangents)?new Float32Array(a*4):null,l=0,u=0;for(let d of e){r.set(d.positions,l*3),s.set(d.normals,l*3),i.set(d.uvs,l*2),b&&d.tangents&&b.set(d.tangents,l*4);for(let x=0;x<d.indices.length;x++)o[u+x]=d.indices[x]+l;l+=d.vertexCount,u+=d.indices.length}let h=new n(r,s,i,o);return h.tangents=b,h}};function yt(n,e,a,t){let r=n.length/3,s=new Float32Array(r*3),i=new Float32Array(r*3);for(let c=0;c<t.length;c+=3){let b=t[c],l=t[c+1],u=t[c+2],h=n[l*3]-n[b*3],d=n[l*3+1]-n[b*3+1],x=n[l*3+2]-n[b*3+2],p=n[u*3]-n[b*3],w=n[u*3+1]-n[b*3+1],g=n[u*3+2]-n[b*3+2],y=a[l*2]-a[b*2],S=a[l*2+1]-a[b*2+1],f=a[u*2]-a[b*2],M=a[u*2+1]-a[b*2+1],A=y*M-f*S;if(Math.abs(A)<1e-12)continue;let v=1/A,k=(M*h-S*p)*v,P=(M*d-S*w)*v,j=(M*x-S*g)*v,E=(y*p-f*h)*v,z=(y*w-f*d)*v,I=(y*g-f*x)*v;for(let L of[b,l,u])s[L*3]+=k,s[L*3+1]+=P,s[L*3+2]+=j,i[L*3]+=E,i[L*3+1]+=z,i[L*3+2]+=I}let o=new Float32Array(r*4);for(let c=0;c<r;c++){let b=e[c*3],l=e[c*3+1],u=e[c*3+2],h=s[c*3],d=s[c*3+1],x=s[c*3+2],p=b*h+l*d+u*x;h-=b*p,d-=l*p,x-=u*p;let w=Math.hypot(h,d,x);if(w<1e-8){let M=Math.abs(b)<.9?1:0,A=M?0:1;h=A*u-0*l,d=0*b-M*u,x=M*l-A*b,w=Math.hypot(h,d,x)||1}h/=w,d/=w,x/=w;let g=l*x-u*d,y=u*h-b*x,S=b*d-l*h,f=g*i[c*3]+y*i[c*3+1]+S*i[c*3+2]<0?-1:1;o[c*4]=h,o[c*4+1]=d,o[c*4+2]=x,o[c*4+3]=f}return o}var Ce=class{pos=[];nrm=[];uv=[];ix=[];v(e,a,t,r,s,i,o,c){return this.pos.push(e,a,t),this.nrm.push(r,s,i),this.uv.push(o,c),this.pos.length/3-1}tri(e,a,t){this.ix.push(e,a,t)}quad(e,a,t,r){this.ix.push(e,a,t,e,t,r)}build(){return new ge(this.pos,this.nrm,this.uv,this.ix)}};function re(n,e,a,t=1){let r=new Ce,s=n/2,i=e/2,o=a/2,c=[[[1,0,0],[0,0,-1],[0,1,0],a,e],[[-1,0,0],[0,0,1],[0,1,0],a,e],[[0,1,0],[1,0,0],[0,0,-1],n,a],[[0,-1,0],[1,0,0],[0,0,1],n,a],[[0,0,1],[1,0,0],[0,1,0],n,e],[[0,0,-1],[-1,0,0],[0,1,0],n,e]],b=[s,i,o];for(let[l,u,h,d,x]of c){let p=r.pos.length/3;for(let w=0;w<=t;w++)for(let g=0;g<=t;g++){let y=(g/t-.5)*d,S=(w/t-.5)*x,f=l[0]*b[0]+u[0]*y+h[0]*S,M=l[1]*b[1]+u[1]*y+h[1]*S,A=l[2]*b[2]+u[2]*y+h[2]*S;r.v(f,M,A,l[0],l[1],l[2],y+d/2,S+x/2)}for(let w=0;w<t;w++)for(let g=0;g<t;g++){let y=p+w*(t+1)+g;r.quad(y,y+1,y+t+2,y+t+1)}}return r.build()}function ie(n,e,a,t,r=3){let s=Math.min(t,n/2,e/2,a/2)*.999,i=re(n,e,a,1),o=[n/2-s,e/2-s,a/2-s],c=new Ce,b=[[[1,0,0],[0,0,-1],[0,1,0]],[[-1,0,0],[0,0,1],[0,1,0]],[[0,1,0],[1,0,0],[0,0,-1]],[[0,-1,0],[1,0,0],[0,0,1]],[[0,0,1],[1,0,0],[0,1,0]],[[0,0,-1],[-1,0,0],[0,1,0]]],l=[n/2,e/2,a/2],u=h=>h[0]!==0?0:h[1]!==0?1:2;for(let[h,d,x]of b){let p=u(d),w=u(x),g=u(h),y=v=>{let k=[],P=l[v],j=o[v];for(let E=0;E<=r;E++)k.push(-P+E/r*(P-j));j>1e-6&&k.push(j);for(let E=1;E<=r;E++)k.push(j+E/r*(P-j));return k},S=y(p),f=y(w),M=c.pos.length/3;for(let v=0;v<f.length;v++)for(let k=0;k<S.length;k++){let P=[0,0,0];P[g]=h[g]*l[g],P[p]=S[k]*Math.sign(d[p]),P[w]=f[v]*Math.sign(x[w]);let j=[Math.max(-o[0],Math.min(o[0],P[0])),Math.max(-o[1],Math.min(o[1],P[1])),Math.max(-o[2],Math.min(o[2],P[2]))],E=P[0]-j[0],z=P[1]-j[1],I=P[2]-j[2],L=Math.hypot(E,z,I)||1;E/=L,z/=L,I/=L;let N=[j[0]+E*s,j[1]+z*s,j[2]+I*s];c.v(N[0],N[1],N[2],E,z,I,S[k]+l[p],f[v]+l[w])}let A=S.length;for(let v=0;v<f.length-1;v++)for(let k=0;k<A-1;k++){let P=M+v*A+k;c.quad(P,P+1,P+A+1,P+A)}}return c.build()}function me(n,e,a,t=24,r={}){let s=new Ce,i=r.heightSegments??1,o=r.thetaStart??0,c=r.thetaLength??Math.PI*2,b=(e-n)/a,l=Math.max(n,e);for(let h=0;h<=i;h++){let d=h/i,x=e+(n-e)*d,p=-a/2+d*a;for(let w=0;w<=t;w++){let g=o+w/t*c,y=Math.sin(g),S=Math.cos(g),f=Math.hypot(1,b);s.v(x*y,p,x*S,y/f,b/f,S/f,w/t*c*l,p+a/2)}}for(let h=0;h<i;h++)for(let d=0;d<t;d++){let x=h*(t+1)+d;s.quad(x,x+1,x+t+2,x+t+1)}let u=h=>{let d=h?n:e;if(d<=0)return;let x=h?a/2:-a/2,p=h?1:-1,w=s.v(0,x,0,0,p,0,0,0),g=s.pos.length/3;for(let y=0;y<=t;y++){let S=o+y/t*c;s.v(d*Math.sin(S),x,d*Math.cos(S),0,p,0,d*Math.sin(S),d*Math.cos(S))}for(let y=0;y<t;y++)h?s.tri(w,g+y,g+y+1):s.tri(w,g+y+1,g+y)};return r.capTop!==!1&&u(!0),r.capBottom!==!1&&u(!1),s.build()}function Ie(n,e=32,a=35){let t=new Ce,r=[],s=0;for(let c=0;c<n.length;c++){let[b,l]=n[c];c>0&&(s+=Math.hypot(b-n[c-1][0],l-n[c-1][1]));let u=n[Math.max(0,c-1)],h=n[Math.min(n.length-1,c+1)],d=c>0?[b-u[0],l-u[1]]:null,x=c<n.length-1?[h[0]-b,h[1]-l]:null,p=w=>{let g=Math.hypot(w[0],w[1])||1;return[w[1]/g,-w[0]/g]};if(d&&x){let w=Math.atan2(d[1],d[0]),g=Math.atan2(x[1],x[0]),y=Math.abs(w-g);if(y>Math.PI&&(y=2*Math.PI-y),y>a*Math.PI/180){let M=p(d),A=p(x);r.push({r:b,y:l,nr:M[0],ny:M[1],s}),r.push({r:b,y:l,nr:A[0],ny:A[1],s});continue}let S=[d[0]/(Math.hypot(d[0],d[1])||1)+x[0]/(Math.hypot(x[0],x[1])||1),d[1]/(Math.hypot(d[0],d[1])||1)+x[1]/(Math.hypot(x[0],x[1])||1)],f=p(S);r.push({r:b,y:l,nr:f[0],ny:f[1],s})}else{let w=p(d??x);r.push({r:b,y:l,nr:w[0],ny:w[1],s})}}let i=Math.max(...n.map(c=>c[0]),1e-4),o=e+1;for(let c of r)for(let b=0;b<=e;b++){let l=b/e*Math.PI*2,u=Math.sin(l),h=Math.cos(l);t.v(c.r*u,c.y,c.r*h,c.nr*u,c.ny,c.nr*h,b/e*Math.PI*2*i,c.s)}for(let c=0;c<r.length-1;c++)if(!(r[c].r===r[c+1].r&&r[c].y===r[c+1].y))for(let b=0;b<e;b++){let l=c*o+b;t.quad(l,l+1,l+o+1,l+o)}return t.build()}function Ia(n,e=24,a=16){let t=new Ce;for(let r=0;r<=a;r++){let s=r/a,i=s*Math.PI;for(let o=0;o<=e;o++){let c=o/e,b=c*Math.PI*2,l=-Math.cos(b)*Math.sin(i),u=Math.cos(i),h=Math.sin(b)*Math.sin(i);t.v(l*n,u*n,h*n,l,u,h,c*Math.PI*2*n,s*Math.PI*n)}}for(let r=0;r<a;r++)for(let s=0;s<e;s++){let i=r*(e+1)+s;r!==0&&t.tri(i,i+e+1,i+1),r!==a-1&&t.tri(i+1,i+e+1,i+e+2)}return t.build()}function Ye(n){let e=0;for(let a=0,t=n.length-1;a<n.length;t=a++)e+=(n[t][0]-n[a][0])*(n[t][1]+n[a][1]);return e/2}function on(n){let e=n.length;if(e<3)return[];let a=Array.from({length:e},(o,c)=>c);Ye(n)<0&&a.reverse();let t=[],r=(o,c,b)=>(c[0]-o[0])*(b[1]-o[1])-(c[1]-o[1])*(b[0]-o[0]),s=(o,c,b,l)=>r(c,b,o)>=0&&r(b,l,o)>=0&&r(l,c,o)>=0,i=0;for(;a.length>3&&i++<1e4;){let o=!1;for(let c=0;c<a.length;c++){let b=a[(c+a.length-1)%a.length],l=a[c],u=a[(c+1)%a.length],h=n[b],d=n[l],x=n[u];if(r(h,d,x)<=1e-12)continue;let p=!0;for(let w of a){if(w===b||w===l||w===u)continue;let g=n[w];if(!(g[0]===h[0]&&g[1]===h[1]||g[0]===d[0]&&g[1]===d[1]||g[0]===x[0]&&g[1]===x[1])&&s(g,h,d,x)){p=!1;break}}if(p){t.push(b,l,u),a.splice(c,1),o=!0;break}}if(!o){for(let c=1;c<a.length-1;c++)t.push(a[0],a[c],a[c+1]);return t}}return a.length===3&&t.push(a[0],a[1],a[2]),t}function cn(n,e){let a=Ye(n)<0?[...n].reverse():[...n],t=e.map(r=>Ye(r)>0?[...r].reverse():[...r]).sort((r,s)=>Math.max(...s.map(i=>i[0]))-Math.max(...r.map(i=>i[0])));for(let r of t){let s=0;for(let l=1;l<r.length;l++)r[l][0]>r[s][0]&&(s=l);let i=r[s],o=-1,c=1/0;for(let l=0;l<a.length;l++){let u=a[l];if(u[0]<i[0])continue;let h=Math.hypot(u[0]-i[0],u[1]-i[1]);h<c&&(c=h,o=l)}o<0&&(o=0);let b=[...r.slice(s),...r.slice(0,s+1)];a=[...a.slice(0,o+1),...b,a[o],...a.slice(o+1)]}return a}function vt(n,e){let t=Ye(n)>0?1:-1;return n.map((r,s)=>{let i=n[(s+n.length-1)%n.length],o=n[(s+1)%n.length],c=[r[0]-i[0],r[1]-i[1]],b=[o[0]-r[0],o[1]-r[1]],l=Math.hypot(c[0],c[1])||1,u=Math.hypot(b[0],b[1])||1,h=[-c[1]/l*t,c[0]/l*t],d=[-b[1]/u*t,b[0]/u*t],x=h[0]+d[0],p=h[1]+d[1],w=Math.hypot(x,p)||1;x/=w,p/=w;let g=Math.max(.35,x*h[0]+p*h[1]);return[r[0]+x*e/g,r[1]+p*e/g]})}function Qe(n,e,a={}){let t=new Ce,r=Math.min(a.bevel??0,e*.45),s=r>0?Math.max(1,a.bevelSegments??2):0,i=Ye(n)>0?n:[...n].reverse(),o=(a.holes??[]).map(p=>Ye(p)<0?p:[...p].reverse()),c=[i,...o],b=[],l=e/2;if(s>0){for(let p=0;p<=s;p++){let w=p/s*(Math.PI/2);b.push({off:r*(1-Math.sin(w)),z:-l+r*(1-Math.cos(w)),nz:-Math.cos(w),nxy:Math.sin(w)})}for(let p=0;p<=s;p++){let w=p/s*(Math.PI/2);b.push({off:r*(1-Math.cos(w)),z:l-r+r*Math.sin(w),nz:Math.sin(w),nxy:Math.cos(w)})}}else b.push({off:0,z:-l,nz:0,nxy:1},{off:0,z:l,nz:0,nxy:1});for(let p of c){let w=p!==i,g=b.map(S=>S.off>0?vt(p,w?-S.off:S.off):p),y=0;for(let S=0;S<p.length;S++){let f=p[S],M=p[(S+1)%p.length],A=Math.hypot(M[0]-f[0],M[1]-f[1]),v=M[0]-f[0],k=M[1]-f[1],P=Math.hypot(v,k)||1;v/=P,k/=P;let j=k,E=-v,z=t.pos.length/3;for(let I=0;I<b.length;I++){let L=b[I],N=g[I],B=N[S],C=N[(S+1)%N.length],D=[j*L.nxy,E*L.nxy,L.nz];t.v(B[0],B[1],L.z,D[0],D[1],D[2],y,L.z+l),t.v(C[0],C[1],L.z,D[0],D[1],D[2],y+A,L.z+l)}for(let I=0;I<b.length-1;I++){let L=z+I*2;t.quad(L,L+1,L+3,L+2)}y+=A}}let u=s>0?vt(i,r):i,h=o.map(p=>s>0?vt(p,-r):p),d=h.length?cn(u,h):u,x=on(d);for(let[p,w]of[[-l,-1],[l,1]]){let g=t.pos.length/3;for(let y of d)t.v(y[0],y[1],p,0,0,w,y[0],y[1]);for(let y=0;y<x.length;y+=3)w>0?t.tri(g+x[y],g+x[y+1],g+x[y+2]):t.tri(g+x[y],g+x[y+2],g+x[y+1])}return t.build()}function xt(n,e,a,t=24){return Array.from({length:t},(r,s)=>[n+Math.cos(s/t*Math.PI*2)*a,e+Math.sin(s/t*Math.PI*2)*a])}function Xt(n,e,a,t,r,s=4){let i=[],o=[[a-r,e+r,-Math.PI/2],[a-r,t-r,0],[n+r,t-r,Math.PI/2],[n+r,e+r,Math.PI]];for(let[c,b,l]of o)for(let u=0;u<=s;u++){let h=l+u/s*(Math.PI/2);i.push([c+Math.cos(h)*r,b+Math.sin(h)*r])}return i}var Yt=48,za=24,wt={arrayStride:Yt,attributes:[{shaderLocation:0,offset:0,format:"float32x3"},{shaderLocation:1,offset:12,format:"float32x3"},{shaderLocation:2,offset:24,format:"float32x4"},{shaderLocation:3,offset:40,format:"float32x2"}]},Qt={arrayStride:za,attributes:[{shaderLocation:4,offset:0,format:"uint16x4"},{shaderLocation:5,offset:8,format:"float32x4"}]},ee=class{vertexBuffer;indexBuffer;skinBuffer;indexCount;vertexCount;bounds;skinned;source;label;constructor(e,a,t={}){let r=a,s=r.positions.length/3,i=r.uvs??new Float32Array(s*2),o=r.tangents??yt(r.positions,r.normals,i,r.indices),c=new Float32Array(s*(Yt/4));for(let b=0;b<s;b++){let l=b*12;c[l]=r.positions[b*3],c[l+1]=r.positions[b*3+1],c[l+2]=r.positions[b*3+2],c[l+3]=r.normals[b*3],c[l+4]=r.normals[b*3+1],c[l+5]=r.normals[b*3+2],c[l+6]=o[b*4],c[l+7]=o[b*4+1],c[l+8]=o[b*4+2],c[l+9]=o[b*4+3],c[l+10]=i[b*2],c[l+11]=i[b*2+1]}if(this.label=t.label??"mesh",this.vertexBuffer=e.createBuffer(c.byteLength,GPUBufferUsage.VERTEX,`${this.label}.vb`,c),this.indexBuffer=e.createBuffer(r.indices.byteLength,GPUBufferUsage.INDEX,`${this.label}.ib`,r.indices),this.indexCount=r.indices.length,this.vertexCount=s,this.bounds=ke.fromPositions(r.positions),this.skinned=!!(r.joints&&r.weights),this.skinned){let b=new ArrayBuffer(s*za),l=new Uint16Array(b),u=new Float32Array(b);for(let h=0;h<s;h++){for(let d=0;d<4;d++)l[h*za/2+d]=r.joints[h*4+d];for(let d=0;d<4;d++)u[(h*za+8)/4+d]=r.weights[h*4+d]}this.skinBuffer=e.createBuffer(b.byteLength,GPUBufferUsage.VERTEX,`${this.label}.skin`,new Uint8Array(b))}else this.skinBuffer=null;this.source=t.keepSource?r:null}destroy(){this.vertexBuffer.destroy(),this.indexBuffer.destroy(),this.skinBuffer?.destroy()}};var ln=`
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
`,Mt=class{constructor(e){this.dev=e;this.sampler=e.device.createSampler({minFilter:"linear",magFilter:"linear"}),this.module=e.shader(ln,"mipgen")}pipelines=new Map;sampler;module;pipeline(e,a){let t=`${e}:${a}`,r=this.pipelines.get(t);return r||(r=this.dev.device.createRenderPipeline({layout:"auto",vertex:{module:this.module,entryPoint:"vs"},fragment:{module:this.module,entryPoint:a==="normal"?"fsNormal":"fs",targets:[{format:e}]},primitive:{topology:"triangle-list"}}),this.pipelines.set(t,r)),r}generate(e,a="color",t){let r=t??this.dev.device.createCommandEncoder({label:"mipgen"}),s=this.pipeline(e.format,a),i=e.depthOrArrayLayers;for(let o=0;o<i;o++)for(let c=1;c<e.mipLevelCount;c++){let b=this.dev.device.createBindGroup({layout:s.getBindGroupLayout(0),entries:[{binding:0,resource:e.createView({dimension:"2d",baseMipLevel:c-1,mipLevelCount:1,baseArrayLayer:o,arrayLayerCount:1})},{binding:1,resource:this.sampler}]}),l=r.beginRenderPass({colorAttachments:[{view:e.createView({dimension:"2d",baseMipLevel:c,mipLevelCount:1,baseArrayLayer:o,arrayLayerCount:1}),loadOp:"clear",storeOp:"store",clearValue:[0,0,0,0]}]});l.setPipeline(s),l.setBindGroup(0,b),l.draw(3),l.end()}t||this.dev.device.queue.submit([r.finish()])}},Ea=class{constructor(e){this.dev=e;this.mipgen=new Mt(e),this.white=this.solid([255,255,255,255],"rgba8unorm-srgb","white"),this.black=this.solid([0,0,0,255],"rgba8unorm-srgb","black"),this.flatNormal=this.solid([128,128,255,255],"rgba8unorm","flatNormal"),this.defaultOrm=this.solid([255,255,255,255],"rgba8unorm","orm"),this.white3d=e.device.createTexture({size:[1,1,1],dimension:"3d",format:"r16float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),e.device.queue.writeTexture({texture:this.white3d},new Uint16Array([15360]),{bytesPerRow:2},[1,1,1])}mipgen;white;black;flatNormal;defaultOrm;white3d;samplers=new Map;solid(e,a,t){let r=this.dev.device.createTexture({size:[1,1],format:a,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:t});return this.dev.device.queue.writeTexture({texture:r},new Uint8Array(e),{bytesPerRow:4},[1,1]),r}fromImage(e,a={}){let t=a.srgb?"rgba8unorm-srgb":"rgba8unorm",r=a.mips!==!1?Ae(e.width,e.height):1,s=this.dev.device.createTexture({size:[e.width,e.height],format:t,mipLevelCount:r,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT,label:a.label});return this.dev.device.queue.copyExternalImageToTexture({source:e},{texture:s},[e.width,e.height]),r>1&&this.mipgen.generate(s,a.normalMap?"normal":"color"),s}fromRGBA8(e,a,t,r={}){let s=r.srgb?"rgba8unorm-srgb":"rgba8unorm",i=r.mips!==!1?Ae(a,t):1,o=this.dev.device.createTexture({size:[a,t],format:s,mipLevelCount:i,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT,label:r.label});return this.dev.device.queue.writeTexture({texture:o},e,{bytesPerRow:a*4},[a,t]),i>1&&this.mipgen.generate(o,r.normalMap?"normal":"color"),o}async fromURL(e,a={}){let t=await(await fetch(e)).blob(),r=await createImageBitmap(t,{colorSpaceConversion:"none",premultiplyAlpha:"none"});return this.fromImage(r,{label:e,...a})}sampler(e={}){let a=e.address??"repeat",t=e.addressV??a,r=e.filter??"linear",s=e.anisotropy??16,i=`${a}|${t}|${r}|${s}`,o=this.samplers.get(i);return o||(o=this.dev.device.createSampler({addressModeU:a,addressModeV:t,addressModeW:a,magFilter:r,minFilter:r,mipmapFilter:r,maxAnisotropy:r==="linear"?s:1}),this.samplers.set(i,o)),o}};var Zt=96,la={ALPHA_MASK:1,UNLIT:2,WORLD_UV:4,FOLIAGE:8,WIND:16},bn=0,be=class{id=++bn;name;baseColor;emissive;emissiveLuminance;metallic;roughness;normalScale;occlusionStrength;specular;edgeWear;edgeWearRadius;uvScale;uvOffset;uvRotation;alphaMode;alphaCutoff;doubleSided;unlit;worldUV;foliage;wind;baseColorMap;normalMap;ormMap;emissiveMap;sampler;buffer=null;bindGroup=null;dirtyUniform=!0;dirtyBinding=!0;constructor(e={}){this.name=e.name??`material${this.id}`,this.baseColor=e.baseColor??[.8,.8,.8,1],this.emissive=e.emissive??[0,0,0],this.emissiveLuminance=e.emissiveLuminance??0,this.metallic=e.metallic??0,this.roughness=e.roughness??.6,this.normalScale=e.normalScale??1,this.occlusionStrength=e.occlusionStrength??1,this.specular=e.specular??.5,this.edgeWear=e.edgeWear??0,this.edgeWearRadius=e.edgeWearRadius??.003,this.uvScale=e.uvScale??[1,1],this.uvOffset=e.uvOffset??[0,0],this.uvRotation=e.uvRotation??0,this.alphaMode=e.alphaMode??"opaque",this.alphaCutoff=e.alphaCutoff??.5,this.doubleSided=e.doubleSided??!1,this.unlit=e.unlit??!1,this.worldUV=e.worldUV??!1,this.foliage=e.foliage??!1,this.wind=e.wind??!1,this.baseColorMap=e.baseColorMap??null,this.normalMap=e.normalMap??null,this.ormMap=e.ormMap??null,this.emissiveMap=e.emissiveMap??null,this.sampler=e.sampler??null}markDirty(){this.dirtyUniform=!0}markBindingsDirty(){this.dirtyBinding=!0,this.dirtyUniform=!0}get flags(){let e=0;return this.alphaMode==="mask"&&(e|=la.ALPHA_MASK),this.unlit&&(e|=la.UNLIT),this.worldUV&&(e|=la.WORLD_UV),this.foliage&&(e|=la.FOLIAGE),this.wind&&(e|=la.WIND),e}get variantKey(){return`${this.alphaMode}|${this.doubleSided?2:1}`}getBindGroup(e,a,t){if(this.buffer||(this.buffer=e.createBuffer(Zt,GPUBufferUsage.UNIFORM,`${this.name}.ub`)),this.dirtyUniform){let r=new Float32Array(Zt/4);r.set(this.baseColor,0),r.set(this.emissive,4),r[7]=this.emissiveLuminance,r[8]=this.metallic,r[9]=this.roughness,r[10]=this.normalScale,r[11]=this.occlusionStrength,r[12]=this.uvScale[0],r[13]=this.uvScale[1],r[14]=this.uvOffset[0],r[15]=this.uvOffset[1],r[16]=this.alphaCutoff,r[17]=this.specular,r[18]=this.uvRotation,r[19]=this.flags,r[20]=this.edgeWear,r[21]=this.edgeWearRadius,e.device.queue.writeBuffer(this.buffer,0,r),this.dirtyUniform=!1}return(this.dirtyBinding||!this.bindGroup)&&(this.bindGroup=e.device.createBindGroup({layout:t,label:this.name,entries:[{binding:0,resource:{buffer:this.buffer}},{binding:1,resource:this.sampler??a.sampler()},{binding:2,resource:(this.baseColorMap??a.white).createView()},{binding:3,resource:(this.normalMap??a.flatNormal).createView()},{binding:4,resource:(this.ormMap??a.defaultOrm).createView()},{binding:5,resource:(this.emissiveMap??a.white).createView()}]}),this.dirtyBinding=!1),this.bindGroup}},kt=`
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
`;var dn={concrete:0,wood:1,anodized:2,parkerized:3,polymer:4,paintedSteel:5,ground:6,gravel:7,brass:8,paperTarget:9,rubber:10,webbing:11,cardboard:12,bareSteel:13,grass:14},mn=`
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
`,un={concrete:{tileMeters:2,color:[.42,.41,.39],color2:[0,0,0],wear:.3,dirt:.5,roughness:-1,bumpMm:1.2,extra:0},wood:{tileMeters:1,color:[.52,.34,.18],color2:[.32,.19,.09],wear:.4,dirt:.2,roughness:-1,bumpMm:.6,extra:0},anodized:{tileMeters:.25,color:[.035,.036,.038],color2:[0,0,0],wear:.25,dirt:0,roughness:.42,bumpMm:.02,extra:0},parkerized:{tileMeters:.25,color:[.055,.058,.056],color2:[0,0,0],wear:.2,dirt:0,roughness:-1,bumpMm:.03,extra:0},polymer:{tileMeters:.2,color:[.03,.03,.032],color2:[0,0,0],wear:0,dirt:.2,roughness:.62,bumpMm:.15,extra:0},paintedSteel:{tileMeters:.5,color:[.8,.8,.78],color2:[0,0,0],wear:.35,dirt:0,roughness:-1,bumpMm:.3,extra:0},ground:{tileMeters:4,color:[.24,.18,.12],color2:[.09,.11,.04],wear:0,dirt:0,roughness:-1,bumpMm:8,extra:0},gravel:{tileMeters:1.5,color:[.5,.48,.45],color2:[.32,.3,.28],wear:0,dirt:0,roughness:-1,bumpMm:12,extra:0},brass:{tileMeters:.05,color:[.95,.73,.38],color2:[0,0,0],wear:.2,dirt:0,roughness:-1,bumpMm:.01,extra:0},paperTarget:{tileMeters:.45,color:[.75,.05,.03],color2:[0,0,0],wear:0,dirt:0,roughness:-1,bumpMm:.05,extra:0},rubber:{tileMeters:.1,color:[.025,.025,.025],color2:[0,0,0],wear:0,dirt:0,roughness:-1,bumpMm:.4,extra:1},webbing:{tileMeters:.05,color:[.12,.13,.1],color2:[0,0,0],wear:0,dirt:0,roughness:-1,bumpMm:.25,extra:0},cardboard:{tileMeters:.6,color:[.55,.4,.25],color2:[0,0,0],wear:0,dirt:.3,roughness:-1,bumpMm:.2,extra:0},bareSteel:{tileMeters:.5,color:[0,0,0],color2:[0,0,0],wear:.3,dirt:0,roughness:-1,bumpMm:.2,extra:0},grass:{tileMeters:1.5,color:[.055,.085,.022],color2:[.2,.17,.085],wear:0,dirt:0,roughness:-1,bumpMm:10,extra:0}},Ga=class{constructor(e,a){this.dev=e;this.tex=a;this.pipeline=e.device.createComputePipeline({layout:"auto",compute:{module:e.shader(mn,"material-synth"),entryPoint:"main"}})}pipeline;cache=new Map;generate(e,a={}){let r={...un[e],...a,size:a.size??1024,seed:a.seed??1},s=JSON.stringify([e,r]),i=this.cache.get(s);if(i)return i;let o=this.dev.device,c=r.size,b=j=>o.createTexture({size:[c,c],format:"rgba8unorm",usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.COPY_SRC,label:j}),l=b(`${e}.albedo.tmp`),u=b(`${e}.normal.tmp`),h=b(`${e}.orm.tmp`),d=new ArrayBuffer(64),x=new Uint32Array(d),p=new Float32Array(d);x[0]=dn[e],x[1]=r.seed>>>0,x[2]=c,p.set([...r.color,r.wear],4),p.set([...r.color2,r.dirt],8),p.set([r.tileMeters,r.roughness,r.bumpMm,r.extra],12);let w=this.dev.createBuffer(64,GPUBufferUsage.UNIFORM,"synth.params",new Uint8Array(d)),g=o.createBindGroup({layout:this.pipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:w}},{binding:1,resource:l.createView()},{binding:2,resource:u.createView()},{binding:3,resource:h.createView()}]}),y=Ae(c),S=(j,E)=>o.createTexture({size:[c,c],format:E,mipLevelCount:y,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT,label:j}),f=S(`${e}.albedo`,"rgba8unorm-srgb"),M=S(`${e}.normal`,"rgba8unorm"),A=S(`${e}.orm`,"rgba8unorm"),v=o.createCommandEncoder({label:`synth ${e}`}),k=v.beginComputePass();k.setPipeline(this.pipeline),k.setBindGroup(0,g),k.dispatchWorkgroups(Math.ceil(c/8),Math.ceil(c/8)),k.end(),v.copyTextureToTexture({texture:l},{texture:f},[c,c]),v.copyTextureToTexture({texture:u},{texture:M},[c,c]),v.copyTextureToTexture({texture:h},{texture:A},[c,c]),this.tex.mipgen.generate(f,"color",v),this.tex.mipgen.generate(M,"normal",v),this.tex.mipgen.generate(A,"color",v),o.queue.submit([v.finish()]),o.queue.onSubmittedWorkDone().then(()=>{l.destroy(),u.destroy(),h.destroy(),w.destroy()});let P={albedo:f,normal:M,orm:A,tileMeters:r.tileMeters};return this.cache.set(s,P),P}material(e,a={},t={}){let r=this.generate(e,a),s=1/r.tileMeters;return new be({name:t.name??e,baseColorMap:r.albedo,normalMap:r.normal,ormMap:r.orm,baseColor:[1,1,1,1],roughness:1,metallic:1,uvScale:[s,s],...t})}};var hn={sunElevation:38,sunAzimuth:130,sunIlluminance:128e3,sunAngularDiameter:.53,turbidity:1,rayleigh:1,ozone:1,mieG:.8,groundAlbedo:.18,altitude:100,multiScatter:1.25},Oa=636e4,fn=646e4,pn=[5802e-9,13558e-9,331e-7];var gn=44e-7,vn=[65e-8,1881e-9,85e-9],yn=8e3,xn=1200;function $t(n){let e=n.sunElevation*Math.PI/180,a=n.sunAzimuth*Math.PI/180;return[Math.cos(e)*Math.sin(a),Math.sin(e),-Math.cos(e)*Math.cos(a)]}function wn(n,e,a,t){let r=n*e,s=n*n-t*t,i=r*r-s;return i<0?-1:-r+Math.sqrt(i)}function Mn(n){let e=$t(n),a=Oa+n.altitude;if((()=>{let l=a*e[1],u=a*a-Oa*Oa,h=l*l-u;if(h<0)return-1;let d=-l-Math.sqrt(h);return d>0?d:-1})()>0)return[0,0,0];let r=wn(a,e[1],0,fn),s=64,i=r/s,o=0,c=0,b=0;for(let l=0;l<s;l++){let u=(l+.5)*i,h=e[0]*u,d=a+e[1]*u,x=e[2]*u,p=Math.hypot(h,d,x)-Oa;o+=Math.exp(-p/yn)*i,c+=Math.exp(-p/xn)*i,b+=Math.max(0,1-Math.abs(p-25e3)/15e3)*i}return[0,1,2].map(l=>Math.exp(-(pn[l]*n.rayleigh*o+gn*n.turbidity*c+vn[l]*n.ozone*b)))}var kn=`
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
`,Na=class{constructor(e,a,t=128){this.dev=e;this.tex=a;this.size=t,this.pipeline=e.device.createComputePipeline({layout:"auto",compute:{module:e.shader(kn,"sky"),entryPoint:"main"}}),this.ubuf=e.createBuffer(64,GPUBufferUsage.UNIFORM,"sky.u"),this.cube=e.device.createTexture({size:[t,t,6],format:"rgba16float",mipLevelCount:Ae(t),usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.RENDER_ATTACHMENT,label:"sky.cube"}),this.bg=e.device.createBindGroup({layout:this.pipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.ubuf}},{binding:1,resource:this.cube.createView({dimension:"2d-array",baseMipLevel:0,mipLevelCount:1})}]})}settings={...hn};cube;size;pipeline;ubuf;bg;version=0;lastKey="";get sunDir(){return $t(this.settings)}sunIlluminanceRGB(){let e=Mn(this.settings),a=this.settings.sunIlluminance;return[e[0]*a,e[1]*a,e[2]*a]}update(e){let a=JSON.stringify(this.settings);if(a===this.lastKey)return!1;this.lastKey=a;let t=this.settings,r=this.sunDir,s=this.sunIlluminanceRGB(),i=Math.max(0,r[1]),o=.12*t.sunIlluminance*Math.max(.02,Math.sin(Math.max(r[1],.02)))*(.8+.2*t.turbidity),c=[s[0]*i+o*.85,s[1]*i+o*.95,s[2]*i+o*1.15],b=new Float32Array([r[0],r[1],r[2],t.sunIlluminance,t.rayleigh,t.turbidity,t.ozone,t.mieG,t.groundAlbedo,t.altitude,t.multiScatter,this.size,c[0],c[1],c[2],0]);this.dev.device.queue.writeBuffer(this.ubuf,0,b);let l=e??this.dev.device.createCommandEncoder({label:"sky"}),u=l.beginComputePass({label:"sky bake"});return u.setPipeline(this.pipeline),u.setBindGroup(0,this.bg),u.dispatchWorkgroups(Math.ceil(this.size/8),Math.ceil(this.size/8),6),u.end(),this.tex.mipgen.generate(this.cube,"color",l),e||this.dev.device.queue.submit([l.finish()]),this.version++,!0}};var At=`
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
`,An=At+`
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
`,Sn=At+`
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
`,Pn=At+`
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
`,Fa=class{constructor(e,a=128,t=96){this.dev=e;this.size=a;let r=e.device;this.mips=Math.min(Ae(a),6),this.specular=r.createTexture({size:[a,a,6],format:"rgba16float",mipLevelCount:this.mips,usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING,label:"ibl.specular"}),this.sh=e.createBuffer(144,GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC,"ibl.sh"),this.brdfLut=r.createTexture({size:[128,128],format:"rgba16float",usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING,label:"brdf.lut"}),this.sampler=r.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"linear"}),this.prefilter=r.createComputePipeline({layout:"auto",compute:{module:e.shader(An,"ibl-prefilter"),entryPoint:"main"}}),this.shPipe=r.createComputePipeline({layout:"auto",compute:{module:e.shader(Sn,"ibl-sh"),entryPoint:"main"}});for(let c=0;c<this.mips;c++){let b=c/(this.mips-1),l=Math.max(1,a>>c);this.uniforms.push(e.createBuffer(16,GPUBufferUsage.UNIFORM,`ibl.u${c}`,new Float32Array([b,l,a,c===0?1:t])))}let s=r.createComputePipeline({layout:"auto",compute:{module:e.shader(Pn,"dfg"),entryPoint:"main"}}),i=r.createCommandEncoder({label:"dfg"}),o=i.beginComputePass();o.setPipeline(s),o.setBindGroup(0,r.createBindGroup({layout:s.getBindGroupLayout(0),entries:[{binding:0,resource:this.brdfLut.createView()}]})),o.dispatchWorkgroups(16,16),o.end(),r.queue.submit([i.finish()])}specular;sh;brdfLut;mips;prefilter;shPipe;sampler;uniforms=[];update(e,a){let t=this.dev.device,r=e.createView({dimension:"cube"}),s=a.beginComputePass({label:"ibl"});s.setPipeline(this.prefilter);for(let i=0;i<this.mips;i++){let o=Math.max(1,this.size>>i);s.setBindGroup(0,t.createBindGroup({layout:this.prefilter.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniforms[i]}},{binding:1,resource:r},{binding:2,resource:this.sampler},{binding:3,resource:this.specular.createView({dimension:"2d-array",baseMipLevel:i,mipLevelCount:1})}]})),s.dispatchWorkgroups(Math.ceil(o/8),Math.ceil(o/8),6)}s.setPipeline(this.shPipe),s.setBindGroup(0,t.createBindGroup({layout:this.shPipe.getBindGroupLayout(0),entries:[{binding:0,resource:r},{binding:1,resource:this.sampler},{binding:2,resource:{buffer:this.sh}}]})),s.dispatchWorkgroups(1),s.end()}};var er={enabled:!0,cascades:4,resolution:2048,distance:160,splitLambda:.82,casterExtent:120,constantBias:8e-5,slopeBias:1.6,normalBias:1.4,maxPenumbraTexels:14,blockerSamples:12,pcfSamples:20,blendFraction:.12},ba=m.create();function ar(n,e,a,t){let r=Math.max(1,Math.min(4,t.cascades)),s=Math.max(n.near,.05),i=t.distance,o=[];for(let g=1;g<=r;g++){let y=g/r,S=s*Math.pow(i/s,y),f=s+(i-s)*y;o.push(t.splitLambda*S+(1-t.splitLambda)*f)}let c=Math.tan(n.fovY/2),b=c*e,l={viewProj:[],splits:o,texelWorld:[],depthRange:[]},u=n.forward(),h=n.up(),d=n.right(),x=m.normalize(m.create(),a),p=Math.abs(x[1])>.99?m.create(0,0,1):m.create(0,1,0),w=s;for(let g=0;g<r;g++){let y=w,S=o[g];w=S;let f=b*b+c*c,M=.5*(y+S)*(1+f);M=Math.min(M,S);let A=Math.hypot(M-y,y*Math.sqrt(f)),v=Math.hypot(S-M,S*Math.sqrt(f)),k=Math.max(A,v)*1.02,P=m.scaleAndAdd(m.create(),n.position,u,M),j=t.resolution,E=2*k/j,z=T.lookAt(T.create(),x,[0,0,0],p);m.transformMat4(ba,P,z);let I=Math.round(ba[0]/E)*E,L=Math.round(ba[1]/E)*E,N=-ba[2]-k-t.casterExtent,B=-ba[2]+k,C=B-N,D=T.orthoZO(T.create(),I-k,I+k,L-k,L+k,N,B),V=T.multiply(T.create(),D,z);l.viewProj.push(V),l.texelWorld.push(E),l.depthRange.push(C)}return l}var Tn=0,ne=class{id=++Tn;mesh;material;transform=T.create();prevTransform=T.create();visible=!0;castShadow=!0;viewmodel=!1;joints=null;_skin=null;instances=null;instanceCount=0;instancesDirty=!1;_inst=null;instBounds=null;worldBounds=ke.create();first=!0;userData=null;constructor(e,a,t){this.mesh=e,this.material=a,t&&(T.copy(this.transform,t),T.copy(this.prevTransform,t))}setTransform(e){T.copy(this.transform,e)}setInstances(e,a=e.length/16){this.instances=e,this.instanceCount=a,this.instancesDirty=!0;let t=ke.create(),r=ke.create();for(let s=0;s<a;s++){ke.transform(r,this.mesh.bounds,e.subarray(s*16,s*16+16));for(let i=0;i<3;i++)t.min[i]=Math.min(t.min[i],r.min[i]),t.max[i]=Math.max(t.max[i],r.max[i])}this.instBounds=t}_endFrame(){T.copy(this.prevTransform,this.transform),this.first=!1}_beginFrame(){this.first&&T.copy(this.prevTransform,this.transform),ke.transform(this.worldBounds,this.instances&&this.instBounds?this.instBounds:this.mesh.bounds,this.transform)}resetHistory(){this.first=!0}};var Ua=class{position=m.create(0,1.7,0);rotation=G.create();fovY=70*Le;viewmodelFovY=55*Le;near=.04;aperture=8;shutter=1/250;iso=100;view=T.create();world=T.create();updateMatrices(){T.fromRotationTranslation(this.world,this.rotation,this.position),T.invert(this.view,this.world)}forward(e=m.create()){return m.transformQuat(e,[0,0,-1],this.rotation)}up(e=m.create()){return m.transformQuat(e,[0,1,0],this.rotation)}right(e=m.create()){return m.transformQuat(e,[1,0,0],this.rotation)}setFocalLength(e,a=24){this.fovY=2*Math.atan(a/(2*e))}},Ca=class{objects=new Set;lights=new Set;add(e){return this.objects.add(e),e}remove(e){this.objects.delete(e)}addLight(e){return this.lights.add(e),e}removeLight(e){this.lights.delete(e)}};var We=`
const PI: f32 = 3.14159265359;
const INV_PI: f32 = 0.31830988618;
const HALF_MAX: f32 = 60000.0;
`,qe=`
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
`,Be=`
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
`,da=`
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
`,Ba=`
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
`,ma=`
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
`,Da=`
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
`,tr=`
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
`;var jn=We+qe+Be+da+ma+`
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
    // emissive (flash core / hot sparks): additive via premultiplied alpha = 0
    rgb = i.color.rgb * tex.rgb * i.params.z * i.color.a * soft;
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
`;function Rn(n){let a=new Uint8Array(n*n*4*4),t=Oe(1234),r=new Float32Array(4096).map(()=>t.next()),s=(o,c)=>{let b=Math.floor(o),l=Math.floor(c),u=o-b,h=c-l,d=(w,g)=>r[(g&63)*64+(w&63)],x=u*u*(3-2*u),p=h*h*(3-2*h);return(d(b,l)*(1-x)+d(b+1,l)*x)*(1-p)+(d(b,l+1)*(1-x)+d(b+1,l+1)*x)*p},i=(o,c)=>{let b=0,l=.5,u=1;for(let h=0;h<5;h++)b+=l*s(o*u,c*u),l*=.5,u*=2;return b};for(let o=0;o<4;o++)for(let c=0;c<n;c++)for(let b=0;b<n;b++){let l=(b+.5)/n*2-1,u=(c+.5)/n*2-1,h=Math.hypot(l,u),d=0,x=255;if(o===0){let w=i(l*2.2+5,u*2.2+3);d=Math.max(0,Math.min(1,(1-h*h)*1.2))*Math.max(0,Math.min(1,w*1.8-.25)),x=Math.round(200+55*w)}else if(o===1){let w=Math.atan2(u,l),g=Math.pow(Math.abs(Math.cos(w*2.5)),6)*.6+Math.pow(Math.abs(Math.cos(w*4+.6)),10)*.4,y=i(l*4+11,u*4+7),S=.25+.75*g*(.6+.6*y);d=Math.max(0,1-h/S)**1.5+Math.max(0,1-h/.25)**2,d=Math.min(1,d),x=255}else if(o===2)d=Math.exp(-(u*u)*40)*Math.max(0,1-Math.abs(l)),x=255;else{let w=i(l*5+21,u*5+13);d=Math.max(0,1-h)**1.4*Math.max(0,w*1.6-.35),x=Math.round(180+75*w)}let p=((o*n+c)*n+b)*4;a[p]=x,a[p+1]=x,a[p+2]=x,a[p+3]=Math.round(Math.max(0,Math.min(1,d))*255)}return a}var Va=class{constructor(e){this.dev=e;this.instanceBuffer=e.createBuffer(this.capacity*64,GPUBufferUsage.VERTEX,"particles.inst");let a=128;this.atlas=e.device.createTexture({size:[a,a,4],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:"particle.atlas"}),e.device.queue.writeTexture({texture:this.atlas},Rn(a),{bytesPerRow:a*4,rowsPerImage:a},[a,a,4]),this.sampler=e.device.createSampler({magFilter:"linear",minFilter:"linear"})}particles=[];maxParticles=4096;wind=m.create(1.5,0,.5);instanceBuffer;capacity=1024;data=new Float32Array(1024*16);atlas;sampler;pipeline=null;bg=null;bgDepth=null;random=Oe(77);count=0;get random01(){return this.random.next()}spawn(e){this.particles.length>=this.maxParticles&&this.particles.shift(),this.particles.push({kind:e.kind,pos:Float32Array.from(e.position),vel:Float32Array.from(e.velocity??[0,0,0]),life:e.life,size0:e.size0,size1:e.size1,color:e.color??[1,1,1],alpha0:e.alpha0??1,alpha1:e.alpha1??0,luminance:e.luminance??0,rotation:e.rotation??this.random.next()*Math.PI*2,spin:e.spin??0,drag:e.drag??0,gravity:e.gravity??0,buoyancy:e.buoyancy??0,stretch:e.stretch??0,layer:e.layer??(e.kind===2?2:e.kind),fadeIn:e.fadeIn??.05,age:0,fresh:!0})}update(e){let a=this.particles,t=0;for(let r=0;r<a.length;r++){let s=a[r];if(s.fresh){s.fresh=!1,a[t++]=s;continue}if(s.age+=e,s.age>=s.life)continue;let i=s.kind===0||s.kind===3?1:0;for(let o=0;o<3;o++){let c=s.vel[o]-this.wind[o]*i;s.vel[o]-=c*Math.min(1,s.drag*e)}s.vel[1]+=(s.buoyancy-s.gravity)*e,s.pos[0]+=s.vel[0]*e,s.pos[1]+=s.vel[1]*e,s.pos[2]+=s.vel[2]*e,s.rotation+=s.spin*e,a[t++]=s}a.length=t}upload(e){let a=this.particles,t=a.length;t>this.capacity&&(this.capacity=Math.ceil(t*1.5),this.instanceBuffer.destroy(),this.instanceBuffer=this.dev.createBuffer(this.capacity*64,GPUBufferUsage.VERTEX,"particles.inst"),this.data=new Float32Array(this.capacity*16));let r=i=>(i.pos[0]-e[0])**2+(i.pos[1]-e[1])**2+(i.pos[2]-e[2])**2;a.sort((i,o)=>r(o)-r(i));let s=this.data;for(let i=0;i<t;i++){let o=a[i],c=i*16,b=o.age/o.life,l=Math.min(1,b/Math.max(o.fadeIn,.001)),u=o.size0+(o.size1-o.size0)*Math.sqrt(b),h=(o.alpha0+(o.alpha1-o.alpha0)*b)*l;s[c]=o.pos[0],s[c+1]=o.pos[1],s[c+2]=o.pos[2],s[c+3]=u,s[c+4]=o.color[0],s[c+5]=o.color[1],s[c+6]=o.color[2],s[c+7]=h,s[c+8]=o.rotation,s[c+9]=o.kind,s[c+10]=o.luminance*(1-b)*(1-b),s[c+11]=o.stretch,s[c+12]=o.vel[0],s[c+13]=o.vel[1],s[c+14]=o.vel[2],s[c+15]=o.layer}return t&&this.dev.device.queue.writeBuffer(this.instanceBuffer,0,s,0,t*16),this.count=t,t}createPipeline(e,a){let t=this.dev.device,r=this.dev.shader(jn,"particles"),s=t.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d-array"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"depth"}}]});return this.pipeline=t.createRenderPipeline({label:"particles",layout:t.createPipelineLayout({bindGroupLayouts:[e,s]}),vertex:{module:r,entryPoint:"vs",buffers:[{arrayStride:64,stepMode:"instance",attributes:[{shaderLocation:0,offset:0,format:"float32x4"},{shaderLocation:1,offset:16,format:"float32x4"},{shaderLocation:2,offset:32,format:"float32x4"},{shaderLocation:3,offset:48,format:"float32x4"}]}]},fragment:{module:r,entryPoint:"fs",targets:[{format:a,blend:{color:{srcFactor:"one",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"triangle-strip"},depthStencil:{format:"depth32float",depthWriteEnabled:!1,depthCompare:"greater-equal"}}),this.bg=null,s}draw(e,a){!this.pipeline||this.count===0||((!this.bg||this.bgDepth!==a)&&(this.bg=this.dev.device.createBindGroup({layout:this.pipeline.getBindGroupLayout(1),entries:[{binding:0,resource:this.atlas.createView({dimension:"2d-array"})},{binding:1,resource:this.sampler},{binding:2,resource:a.createView()}]}),this.bgDepth=a),e.setPipeline(this.pipeline),e.setBindGroup(1,this.bg),e.setVertexBuffer(0,this.instanceBuffer),e.draw(4,this.count))}};var Ln=We+qe+Be+da+Ba+ma+`
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
`;function In(n){let a=new Uint8Array(n*n*4*6),t=new Uint8Array(n*n*4*6),r=Oe(99),s=Array.from({length:64},()=>r.next());for(let i=0;i<6;i++){let o=new Float32Array(n*n);for(let b=0;b<n;b++)for(let l=0;l<n;l++){let u=(l+.5)/n*2-1,h=(b+.5)/n*2-1,d=Math.hypot(u,h),x=Math.atan2(h,u),p=1+.18*(s[Math.floor((x+Math.PI)/(2*Math.PI)*63)]-.5)*2,w=[0,0,0],g=0,y=0,S=.6;switch(i){case 0:{let M=d<.14*p,A=d<.32*p,v=d<.62*p;M?(w=[.16,.16,.17],g=1,y=-.6,S=.55):A?(w=[.78,.79,.8],g=1,y=-.15+.15*Math.cos(d*30),S=.22):v&&(w=[.22,.21,.2],g=Math.min(1,(.62*p-d)*12),y=-.05,S=.5);break}case 1:{let M=d<.12*p,A=Math.abs(Math.sin(x*7+s[3]*6))>.6&&d<.45*p;M?(w=[.02,.015,.01],g=1,y=-1,S=.95):A?(w=[.75,.6,.42],g=Math.min(1,(.45*p-d)*6),y=.2,S=.75):d<.25*p&&(w=[.3,.2,.12],g=.8,y=-.2,S=.8);break}case 2:{d<.3*p?(w=[.62,.61,.58],g=1,y=-.8*(1-d/(.3*p)),S=.95):d<.75&&(w=[.58,.57,.54],g=Math.max(0,.6*(1-(d-.3)/.45)),y=0,S=.95);break}case 3:{d<.2?(w=[.01,.01,.01],g=1,y=-1,S=1):d<.27&&(w=[.25,.25,.26],g=.85,y=0,S=.8);break}case 4:{let M=Math.pow(Math.abs(Math.cos(x*9+s[7]*5)),4);d<.18?(w=[.55,.55,.57],g=1,y=.2,S=.35):d<(.3+.6*M)*p&&(w=[.5,.5,.52],g=Math.max(0,1-d)*.9,y=.05,S=.4);break}default:d<.7*p&&(w=[.12,.09,.06],g=Math.max(0,1-d/(.7*p))*.9,y=-.3*(1-d),S=1)}o[b*n+l]=y;let f=((i*n+b)*n+l)*4;a[f]=Math.round(Math.pow(w[0],1/2.2)*255),a[f+1]=Math.round(Math.pow(w[1],1/2.2)*255),a[f+2]=Math.round(Math.pow(w[2],1/2.2)*255),a[f+3]=Math.round(Math.max(0,Math.min(1,g))*255),t[f+3]=Math.round(S*255)}let c=6;for(let b=0;b<n;b++)for(let l=0;l<n;l++){let u=o[b*n+Math.min(n-1,l+1)]-o[b*n+Math.max(0,l-1)],h=o[Math.min(n-1,b+1)*n+l]-o[Math.max(0,b-1)*n+l],d=-u*c,x=h*c,p=1,w=Math.hypot(d,x,p);d/=w,x/=w,p/=w;let g=((i*n+b)*n+l)*4;t[g]=Math.round((d*.5+.5)*255),t[g+1]=Math.round((x*.5+.5)*255),t[g+2]=Math.round((p*.5+.5)*255)}}return{albedo:a,normal:t,layers:6}}var Ha=class{constructor(e){this.dev=e;this.buffer=e.createBuffer(this.capacity*80,GPUBufferUsage.VERTEX,"decals.inst");let a=128,t=In(a),r=(s,i,o)=>{let c=e.device.createTexture({size:[a,a,t.layers],format:s,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:o});return e.device.queue.writeTexture({texture:c},i,{bytesPerRow:a*4,rowsPerImage:a},[a,a,t.layers]),c};this.albedo=r("rgba8unorm-srgb",t.albedo,"decal.albedo"),this.normal=r("rgba8unorm",t.normal,"decal.normal"),this.sampler=e.device.createSampler({magFilter:"linear",minFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"})}decals=[];maxDecals=512;buffer;capacity=512;data=new Float32Array(512*20);albedo;normal;sampler;pipeline=null;bg=null;count=0;tmp=T.create();add(e,a,t,r,s=null,i=[1,1,1],o=Math.random()*Math.PI*2){let c=m.normalize(m.create(),m.clone(t)),b=Math.abs(c[1])>.95?m.create(1,0,0):m.create(0,1,0),l=m.normalize(m.create(),m.cross(m.create(),b,c)),u=m.cross(m.create(),c,l),h=Math.cos(o),d=Math.sin(o),x=m.create(l[0]*h+u[0]*d,l[1]*h+u[1]*d,l[2]*h+u[2]*d),p=m.cross(m.create(),c,x),w=.0015,g=T.create();g[0]=x[0]*r,g[1]=x[1]*r,g[2]=x[2]*r,g[4]=p[0]*r,g[5]=p[1]*r,g[6]=p[2]*r,g[8]=c[0],g[9]=c[1],g[10]=c[2],g[12]=a[0]+c[0]*w,g[13]=a[1]+c[1]*w,g[14]=a[2]+c[2]*w;let y=g;if(s){let S=T.invert(T.create(),s.transform);y=T.multiply(T.create(),S,g)}this.decals.length>=this.maxDecals&&this.decals.shift(),this.decals.push({local:y,parent:s,kind:e,tint:i,age:0})}clear(){this.decals.length=0}upload(){let e=this.decals.length;e>this.capacity&&(this.capacity=Math.ceil(e*1.5),this.buffer.destroy(),this.buffer=this.dev.createBuffer(this.capacity*80,GPUBufferUsage.VERTEX,"decals.inst"),this.data=new Float32Array(this.capacity*20));for(let a=0;a<e;a++){let t=this.decals[a],r=t.parent?T.multiply(this.tmp,t.parent.transform,t.local):t.local;this.data.set(r,a*20),this.data[a*20+16]=t.kind,this.data[a*20+17]=t.tint[0],this.data[a*20+18]=t.tint[1],this.data[a*20+19]=t.tint[2]}return e&&this.dev.device.queue.writeBuffer(this.buffer,0,this.data,0,e*20),this.count=e,e}createPipeline(e,a){let t=this.dev.device,r=this.dev.shader(Ln,"decals"),s=t.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d-array"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d-array"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,sampler:{}}]});this.pipeline=t.createRenderPipeline({label:"decals",layout:t.createPipelineLayout({bindGroupLayouts:[e,s]}),vertex:{module:r,entryPoint:"vs",buffers:[{arrayStride:80,stepMode:"instance",attributes:[0,1,2,3,4].map(i=>({shaderLocation:i,offset:i*16,format:"float32x4"}))}]},fragment:{module:r,entryPoint:"fs",targets:[{format:a,blend:{color:{srcFactor:"one",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"triangle-strip"},depthStencil:{format:"depth32float",depthWriteEnabled:!1,depthCompare:"greater-equal",depthBias:2,depthBiasSlopeScale:2}}),this.bg=t.createBindGroup({layout:s,entries:[{binding:0,resource:this.albedo.createView({dimension:"2d-array"})},{binding:1,resource:this.normal.createView({dimension:"2d-array"})},{binding:2,resource:this.sampler}]})}draw(e){!this.pipeline||!this.bg||this.count===0||(e.setPipeline(this.pipeline),e.setBindGroup(1,this.bg),e.setVertexBuffer(0,this.buffer),e.draw(4,this.count))}};var De=256,rr=`
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
`,zn=`
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
`,nr=We+qe+Be+da+Ba+ma+tr+Da+rr+kt+zn+`
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
`,sr=rr+kt+`
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
`;var ir=`
struct FOut { @builtin(position) pos: vec4f, @location(0) uv: vec2f };
@vertex fn vsFull(@builtin(vertex_index) i: u32) -> FOut {
  let p = vec2f(f32((i << 1u) & 2u), f32(i & 2u));
  var o: FOut;
  o.pos = vec4f(p * 2.0 - 1.0, 0.0, 1.0);
  o.uv = vec2f(p.x, 1.0 - p.y);
  return o;
}
`,or=We+qe+Be+Da+ir+`
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
`,cr=`
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
`,lr=`
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
`,br=`
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
`,dr=`
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
`,mr=`
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
`,ur=`
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
`,hr=`
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
`,fr=`
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
`,pr=Be+ir+`
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
`;var gr=`
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
`;var vr=`
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
`,yr=vr+`
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
`,xr=vr+`
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
`;function Gn(){return{renderScale:1,maxDevicePixelRatio:2,taa:{enabled:!0,feedbackMin:.82,feedbackMax:.94,velocityWeight:.06,jitterSamples:16},exposure:{mode:"auto",ev100:14,compensation:0,minEv100:-2,maxEv100:17,speedUp:2.2,speedDown:1.4,lowPercent:.45,highPercent:.96,centerWeight:.6},bloom:{enabled:!0,intensity:.035,radius:1,clamp:6e4},gtao:{enabled:!0,radius:.9,falloff:.4,power:1.25,strength:1,slices:2,steps:6,blur:!0},motionBlur:{enabled:!0,shutterAngle:180,maxPixels:48,samples:10},dof:{enabled:!0,apertureMm:3.2,autoFocus:!0,focusDistance:10,focusSpeed:6,maxBlurPx:14,overrideDistance:.6,overrideWeight:0,minFocus:.12,quality:1},lens:{distortion:0,distortion2:0,chromaticAberration:.15,naturalVignette:.6,vignette:.12,vignetteRoundness:.6,sharpen:.25,fillZoom:1},sensor:{enabled:!0,readNoise:.0025,shotNoise:.0018,isoCoupled:!0,gain:1},grade:{tonemapper:"agx",contrast:1.04,saturation:1.02,temperature:0,tint:0,lift:0,gamma:1,gain:1,exposureBias:0,dither:1},fog:{density:35e-5,heightFalloff:.045,baseHeight:0,startDistance:15,inscatter:1,mieG:.72},ibl:{intensity:1,specularOcclusion:1,occludedAmbient:.15,groundBounce:.6},gi:{enabled:!0,intensity:1},wind:{direction:[.94,.35],speed:1.7,bend:.045,turbulence:.25},clouds:{enabled:!0,coverage:.42,density:1.6,altitude:1800,scale:2600,windSpeed:9,windDirDeg:25,shadowStrength:.88},shadows:{...er},viewmodelDepthSqueeze:.5,debugView:0}}var On={agx:0,aces:1,neutral:2,none:3};function Mr(n){let e=new Float32Array(1),a=new Uint32Array(e.buffer);e[0]=n;let t=a[0],r=t>>>16&32768,s=(t>>>23&255)-127+15,i=t&8388607;return s<=0?s<-10?r:(i=(i|8388608)>>1-s,r|i>>13):s>=31?r|31744:r|s<<10|i>>13}var Wa=class n{dev;device;settings;textures;synth;sky;ibl;particles;decals;stats={drawCalls:0,triangles:0,objects:0,culled:0,frameMs:0,gpuInfo:""};frameLayout;objectLayout;materialLayout;shadowLayout;frameBuf;lightBuf;exposureBuf;histBuf;objBuf;objCapacity=0;objData=new Float32Array(0);cascadeBuf;dummyJoints;staticObjectBG;frameBG=null;frameBGKey="";shadowMap;shadowRes=0;shadowCount=0;skyVis;skyVisParams={min:[0,0,0],cell:1,size:[1,1,1],enabled:!1};probes=[];cloudDrift=[0,0];probeParams={min:[0,0,0],cell:1,size:[1,1,1],enabled:!1};targets=null;linearClamp;shadowSampler;meshModule;shadowModule;pipelines=new Map;skyPipe;gtaoPipe;aoBlurPipe;taaPipe;mbPipe;dofFocusPipe;dofGatherPipe;dofState;bloomDownPipe;bloomUpPipe;histPipe;exposurePipe;compositePipe;debugPipe;postUniforms=new Map;frameIndex=0;prevViewProj=T.create();prevVmViewProj=T.create();historyValid=!1;time=0;lastSkyVersion=-1;fw=new La(1344);constructor(e){this.dev=e,this.device=e.device;let a=this.device;this.settings=Gn(),this.textures=new Ea(e),this.synth=new Ga(e,this.textures),this.sky=new Na(e,this.textures,128),this.ibl=new Fa(e,128),this.particles=new Va(e),this.decals=new Ha(e);let t=GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT;this.frameLayout=a.createBindGroupLayout({label:"frame",entries:[{binding:0,visibility:t,buffer:{type:"uniform"}},{binding:1,visibility:t,buffer:{type:"read-only-storage"}},{binding:2,visibility:t,buffer:{type:"read-only-storage"}},{binding:3,visibility:t,buffer:{type:"read-only-storage"}},{binding:4,visibility:t,texture:{viewDimension:"cube"}},{binding:5,visibility:t,texture:{}},{binding:6,visibility:t,texture:{sampleType:"depth",viewDimension:"2d-array"}},{binding:7,visibility:t,sampler:{type:"comparison"}},{binding:8,visibility:t,sampler:{}},{binding:9,visibility:t,texture:{sampleType:"unfilterable-float"}},{binding:10,visibility:t,texture:{viewDimension:"3d"}},{binding:11,visibility:t,texture:{viewDimension:"cube"}},{binding:12,visibility:t,texture:{viewDimension:"3d"}},{binding:13,visibility:t,texture:{viewDimension:"3d"}},{binding:14,visibility:t,texture:{viewDimension:"3d"}}]}),this.objectLayout=a.createBindGroupLayout({label:"object",entries:[{binding:0,visibility:t,buffer:{type:"uniform",hasDynamicOffset:!0,minBindingSize:De}},{binding:1,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}},{binding:2,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}}]}),this.materialLayout=a.createBindGroupLayout({label:"material",entries:[{binding:0,visibility:t,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:3,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:4,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:5,visibility:GPUShaderStage.FRAGMENT,texture:{}}]}),this.shadowLayout=a.createBindGroupLayout({label:"shadow",entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform",hasDynamicOffset:!0,minBindingSize:64}}]}),this.frameBuf=e.createBuffer(1344,GPUBufferUsage.UNIFORM,"frame"),this.lightBuf=e.createBuffer(4096,GPUBufferUsage.STORAGE,"lights"),this.exposureBuf=e.createBuffer(16,GPUBufferUsage.STORAGE,"exposure",new Float32Array([1/(1.2*2**14),14,14,1/(1.2*2**14)])),this.histBuf=e.createBuffer(256*4,GPUBufferUsage.STORAGE,"histogram"),this.cascadeBuf=e.createBuffer(256*4,GPUBufferUsage.UNIFORM,"cascades"),this.dummyJoints=e.createBuffer(64,GPUBufferUsage.STORAGE,"dummyJoints",T.create()),this.objBuf=this.ensureObjectCapacity(256),this.linearClamp=a.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",addressModeW:"clamp-to-edge"}),this.shadowSampler=a.createSampler({compare:"less",magFilter:"linear",minFilter:"linear"}),this.skyVis=this.textures.white3d,this.probes=[this.textures.white3d,this.textures.white3d,this.textures.white3d],this.createShadowMap(),this.meshModule=e.shader(nr,"mesh"),this.shadowModule=e.shader(sr,"shadow");let r="rgba16float",s=e.shader(or,"skypass");this.skyPipe=a.createRenderPipeline({label:"sky",layout:a.createPipelineLayout({bindGroupLayouts:[this.frameLayout]}),vertex:{module:s,entryPoint:"vsFull"},fragment:{module:s,entryPoint:"fsSky",targets:[{format:r}]},depthStencil:{format:"depth32float",depthWriteEnabled:!1,depthCompare:"greater-equal"}});let i=(c,b)=>a.createComputePipeline({label:b,layout:"auto",compute:{module:e.shader(c,b),entryPoint:"main"}});this.gtaoPipe=i(cr,"gtao"),this.aoBlurPipe=i(lr,"aoblur"),this.taaPipe=i(br,"taa"),this.mbPipe=i(dr,"motionblur"),this.dofFocusPipe=i(yr,"dof-focus"),this.dofGatherPipe=i(xr,"dof-gather"),this.dofState=e.createBuffer(16,GPUBufferUsage.STORAGE,"dof.state",new Float32Array([0,0,0,0])),this.bloomDownPipe=i(mr,"bloomdown"),this.bloomUpPipe=i(ur,"bloomup"),this.histPipe=i(hr,"histogram"),this.exposurePipe=i(fr,"exposure"),this.debugPipe=i(gr,"debug");let o=e.shader(pr,"composite");this.compositePipe=a.createRenderPipeline({label:"composite",layout:"auto",vertex:{module:o,entryPoint:"vsFull"},fragment:{module:o,entryPoint:"fsComposite",targets:[{format:e.presentationFormat}]}}),this.particles.createPipeline(this.frameLayout,r),this.decals.createPipeline(this.frameLayout,r),this.staticObjectBG=this.makeObjectBG(this.dummyJoints,this.dummyJoints)}static async create(e,a={}){let t=await Ra.create({canvas:e,powerPreference:a.powerPreference,offscreen:a.offscreen});return new n(t)}get materialBindGroupLayout(){return this.materialLayout}ensureObjectCapacity(e){if(e<=this.objCapacity)return this.objBuf;let a=Math.max(e,Math.ceil(this.objCapacity*1.5),256);this.objBuf?.destroy?.(),this.objBuf=this.dev.createBuffer(a*De,GPUBufferUsage.UNIFORM,"objects"),this.objData=new Float32Array(a*De/4),this.objCapacity=a,this.dummyJoints&&(this.staticObjectBG=this.makeObjectBG(this.dummyJoints,this.dummyJoints));for(let t of this.skinnedObjects)t._skin&&(t._skin.bg=null);return this.objBuf}skinnedObjects=new Set;makeObjectBG(e,a){return this.device.createBindGroup({layout:this.objectLayout,entries:[{binding:0,resource:{buffer:this.objBuf,size:De}},{binding:1,resource:{buffer:e}},{binding:2,resource:{buffer:a}}]})}createShadowMap(){let e=this.settings.shadows,a=Math.max(256,Math.min(8192,e.resolution|0)),t=Math.max(1,Math.min(4,e.cascades|0));this.shadowMap&&a===this.shadowRes&&t===this.shadowCount||(this.shadowMap?.destroy(),this.shadowMap=this.device.createTexture({size:[a,a,4],format:"depth32float",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING,label:"shadowmap"}),this.shadowRes=a,this.shadowCount=t,this.frameBG=null)}setSkyVisibility(e,a,t,r,s,i){let o=new Uint16Array(e.length);for(let b=0;b<e.length;b++)o[b]=Mr(e[b]);let c=this.device.createTexture({size:[a,t,r],dimension:"3d",format:"r16float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:"skyvis"});this.device.queue.writeTexture({texture:c},o,{bytesPerRow:a*2,rowsPerImage:t},[a,t,r]),this.skyVis!==this.textures.white3d&&this.skyVis.destroy(),this.skyVis=c,this.skyVisParams={min:[...s],cell:i,size:[a,t,r],enabled:!0},this.frameBG=null}setProbeVolume(e,a,t,r,s,i){let o=a*t*r;for(let c=0;c<3;c++){let b=new Uint16Array(o*4);for(let u=0;u<o;u++)for(let h=0;h<4;h++)b[u*4+h]=Mr(e[u*12+c*4+h]);let l=this.device.createTexture({size:[a,t,r],dimension:"3d",format:"rgba16float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:`gi.probes.${"rgb"[c]}`});this.device.queue.writeTexture({texture:l},b,{bytesPerRow:a*8,rowsPerImage:t},[a,t,r]),this.probes[c]!==this.textures.white3d&&this.probes[c].destroy(),this.probes[c]=l}this.probeParams={min:[s[0],s[1],s[2]],cell:i,size:[a,t,r],enabled:!0},this.frameBG=null}async readSkySH(){let e=this.device,a=e.createCommandEncoder({label:"sky-sh-readback"});this.sky.update(a),this.sky.version!==this.lastSkyVersion&&(this.ibl.update(this.sky.cube,a),this.lastSkyVersion=this.sky.version);let t=e.createBuffer({size:144,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST,label:"sh-readback"});a.copyBufferToBuffer(this.ibl.sh,0,t,0,144),e.queue.submit([a.finish()]),await t.mapAsync(GPUMapMode.READ);let r=new Float32Array(t.getMappedRange().slice(0));t.unmap(),t.destroy();let s=new Float32Array(27);for(let i=0;i<9;i++)for(let o=0;o<3;o++)s[i*3+o]=r[i*4+o];return s}makeTargets(e,a){let t=this.device,r=(l,u,h,d=[e,a])=>t.createTexture({label:l,size:d,format:u,usage:h}),s=GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING,i=GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING,o=[],c=[],b=Math.min(6,Ae(e,a)-2);for(let l=0;l<b;l++){let u=Math.max(1,e>>l+1),h=Math.max(1,a>>l+1);o.push(r(`bloom.down${l}`,"rgba16float",i,[u,h])),c.push(r(`bloom.up${l}`,"rgba16float",i,[u,h]))}return{w:e,h:a,depth:r("depth","depth32float",s),normal:r("normal","rgba16float",s),velocity:r("velocity","rg16float",s),hdr:r("hdr","rgba16float",s),aoRaw:r("ao.raw","r32float",i),ao:r("ao","r32float",i),history:[r("taa.a","rgba16float",i),r("taa.b","rgba16float",i)],mb:r("motionblur","rgba16float",i),dof:r("dof","rgba16float",i),debug:r("debug","rgba16float",i),bloomDown:o,bloomUp:c}}destroyTargets(e){for(let a of[e.depth,e.normal,e.velocity,e.hdr,e.aoRaw,e.ao,e.history[0],e.history[1],e.mb,e.dof,e.debug,...e.bloomDown,...e.bloomUp])a.destroy()}uniform(e,a){let t=this.postUniforms.get(e);return t||(t=this.dev.createBuffer(Math.max(16,a.byteLength),GPUBufferUsage.UNIFORM,e),this.postUniforms.set(e,t)),this.device.queue.writeBuffer(t,0,a.buffer,a.byteOffset,a.byteLength),t}getFrameBG(e){let a=`${e.w}x${e.h}`;return this.frameBG&&this.frameBGKey===a?this.frameBG:(this.frameBG=this.device.createBindGroup({layout:this.frameLayout,label:"frame",entries:[{binding:0,resource:{buffer:this.frameBuf}},{binding:1,resource:{buffer:this.lightBuf}},{binding:2,resource:{buffer:this.ibl.sh}},{binding:3,resource:{buffer:this.exposureBuf}},{binding:4,resource:this.ibl.specular.createView({dimension:"cube"})},{binding:5,resource:this.ibl.brdfLut.createView()},{binding:6,resource:this.shadowMap.createView({dimension:"2d-array"})},{binding:7,resource:this.shadowSampler},{binding:8,resource:this.linearClamp},{binding:9,resource:e.ao.createView()},{binding:10,resource:this.skyVis.createView()},{binding:11,resource:this.sky.cube.createView({dimension:"cube"})},{binding:12,resource:this.probes[0].createView()},{binding:13,resource:this.probes[1].createView()},{binding:14,resource:this.probes[2].createView()}]}),this.frameBGKey=a,this.frameBG)}getPipelines(e,a){let t=`${e?1:0}|${a.variantKey}`,r=this.pipelines.get(t);if(r)return r;let s=this.device,i=s.createPipelineLayout({bindGroupLayouts:[this.frameLayout,this.objectLayout,this.materialLayout]}),o=e?[wt,Qt]:[wt],c={module:this.meshModule,entryPoint:e?"vsSkinned":"vsStatic",buffers:o},b=a.doubleSided?"none":"back",l=s.createRenderPipeline({label:`prepass ${t}`,layout:i,vertex:c,fragment:{module:this.meshModule,entryPoint:"fsPrepass",targets:[{format:"rgba16float"},{format:"rg16float"}]},primitive:{topology:"triangle-list",cullMode:b},depthStencil:{format:"depth32float",depthWriteEnabled:!0,depthCompare:"greater"}}),u=s.createRenderPipeline({label:`main ${t}`,layout:i,vertex:c,fragment:{module:this.meshModule,entryPoint:"fsMain",targets:[{format:"rgba16float"}]},primitive:{topology:"triangle-list",cullMode:b},depthStencil:{format:"depth32float",depthWriteEnabled:!1,depthCompare:"equal"}}),h=s.createRenderPipeline({label:`transparent ${t}`,layout:i,vertex:c,fragment:{module:this.meshModule,entryPoint:"fsTransparent",targets:[{format:"rgba16float",blend:{color:{srcFactor:"one",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"triangle-list",cullMode:b},depthStencil:{format:"depth32float",depthWriteEnabled:!1,depthCompare:"greater"}}),d=this.settings.shadows,x=s.createRenderPipeline({label:`shadow ${t}`,layout:s.createPipelineLayout({bindGroupLayouts:[this.shadowLayout,this.objectLayout,this.materialLayout]}),vertex:{module:this.shadowModule,entryPoint:e?"vsShadowSkinned":"vsShadow",buffers:o},fragment:a.alphaMode==="mask"?{module:this.shadowModule,entryPoint:"fsShadowMask",targets:[]}:void 0,primitive:{topology:"triangle-list",cullMode:"none"},depthStencil:{format:"depth32float",depthWriteEnabled:!0,depthCompare:"less",depthBias:1,depthBiasSlopeScale:d.slopeBias,depthBiasClamp:.01}});return r={prepass:l,main:u,transparent:h,shadow:x},this.pipelines.set(t,r),r}render(e,a,t){let r=performance.now(),s=this.settings,i=this.device,o=this.dev.canvas,c=Math.min(globalThis.devicePixelRatio??1,s.maxDevicePixelRatio),b=Math.max(1,Math.floor((o.clientWidth||o.width)*c)),l=Math.max(1,Math.floor((o.clientHeight||o.height)*c));(o.width!==b||o.height!==l)&&(o.width=b,o.height=l);let u=Math.max(16,Math.round(b*s.renderScale)),h=Math.max(16,Math.round(l*s.renderScale));(!this.targets||this.targets.w!==u||this.targets.h!==h)&&(this.targets&&this.destroyTargets(this.targets),this.targets=this.makeTargets(u,h),this.frameBG=null,this.historyValid=!1);let d=this.targets;this.createShadowMap(),this.time+=t;let x=i.createCommandEncoder({label:"frame"});this.sky.update(x),this.sky.version!==this.lastSkyVersion&&(this.ibl.update(this.sky.cube,x),this.lastSkyVersion=this.sky.version),a.updateMatrices();let p=u/h,w=s.taa.enabled?Math.max(1,s.taa.jitterSamples):1,g=this.frameIndex%w+1,y=s.taa.enabled?(gt(g,2)-.5)*2/u:0,S=s.taa.enabled?(gt(g,3)-.5)*2/h:0,f=T.perspectiveReversedInfinite(T.create(),a.fovY,p,a.near,y,S),M=T.perspectiveReversedInfinite(T.create(),a.fovY,p,a.near),A=T.perspectiveReversedInfinite(T.create(),a.viewmodelFovY,p,a.near*.25,y,S),v=T.perspectiveReversedInfinite(T.create(),a.viewmodelFovY,p,a.near*.25),k=T.multiply(T.create(),f,a.view),P=T.multiply(T.create(),M,a.view),j=T.multiply(T.create(),A,a.view),E=T.multiply(T.create(),v,a.view);this.historyValid||(T.copy(this.prevViewProj,P),T.copy(this.prevVmViewProj,E));let z=T.invert(T.create(),f),I=T.invert(T.create(),k),L=T.invert(T.create(),P),N=this.sky.sunDir,B=this.sky.sunIlluminanceRGB(),C=this.sky.settings.sunAngularDiameter*Math.PI/360,D=s.shadows,V=D.enabled?ar(a,p,m.clone(N),D):null,U=this.fw;U.mat4(0,k),U.mat4(64,P),U.mat4(128,this.prevViewProj),U.mat4(192,j),U.mat4(256,E),U.mat4(320,this.prevVmViewProj),U.mat4(384,a.view),U.mat4(448,a.world),U.mat4(512,z),U.mat4(576,I),U.mat4(640,f),U.vec4(704,a.position[0],a.position[1],a.position[2],a.near),U.vec4(720,N[0],N[1],N[2],Math.cos(C)),U.vec4(736,B[0],B[1],B[2],1),U.vec4(752,u,h,1/u,1/h),U.vec4(768,y,S,0,0);let te=.06*this.sky.settings.sunIlluminance/Math.PI*Math.max(.05,Math.sin(Math.max(.03,N[1])))*s.fog.inscatter;if(U.vec4(784,s.fog.density,s.fog.heightFalloff,s.fog.baseHeight,s.fog.startDistance),U.vec4(800,te*.62,te*.75,te,s.fog.mieG),U.vec4(816,this.time,t,this.frameIndex,s.ibl.intensity),U.vec4(832,V?V.viewProj.length:0,D.maxPenumbraTexels,Math.tan(C),D.blendFraction),V){U.vec4(848,V.splits[0]??1e9,V.splits[1]??1e9,V.splits[2]??1e9,V.splits[3]??1e9);for(let R=0;R<4;R++)U.mat4(864+R*64,V.viewProj[R]??T.create());U.vec4(1120,V.texelWorld[0]??1,V.texelWorld[1]??1,V.texelWorld[2]??1,V.texelWorld[3]??1),U.vec4(1216,V.depthRange[0]??1,V.depthRange[1]??1,V.depthRange[2]??1,V.depthRange[3]??1)}let $=this.skyVisParams;U.vec4(1136,$.min[0],$.min[1],$.min[2],$.cell),U.vec4(1152,$.size[0],$.size[1],$.size[2],$.enabled?1:0);let X=new Float32Array(1024),_=0;for(let R of e.lights){if(!R.enabled||_>=64||R.intensity<=0)continue;let F=_*16;X.set([R.position[0],R.position[1],R.position[2],R.range],F),X.set([R.color[0]*R.intensity,R.color[1]*R.intensity,R.color[2]*R.intensity,0],F+4);let H=R.spotOuter>0,K=m.normalize(m.create(),R.direction);X.set([K[0],K[1],K[2],Math.cos(R.spotOuter*Math.PI/180)],F+8),X.set([Math.cos(Math.min(R.spotInner,R.spotOuter)*Math.PI/180),R.radius,H?1:0,0],F+12),_++}i.queue.writeBuffer(this.lightBuf,0,X,0,Math.max(16,_*16)),U.vec4(1168,_,s.ibl.specularOcclusion,s.gtao.enabled?s.gtao.strength:0,D.normalBias),U.vec4(1184,this.ibl.mips-1,1,this.sky.settings.groundAlbedo,s.debugView),U.vec4(1200,s.viewmodelDepthSqueeze,0,0,0),U.vec4(1232,D.constantBias,D.slopeBias,Math.min(16,D.blockerSamples),Math.min(32,D.pcfSamples)),U.vec4(1248,s.ibl.occludedAmbient,s.ibl.groundBounce,0,0),U.vec4(1264,s.wind.direction[0]*s.wind.speed,s.wind.direction[1]*s.wind.speed,s.wind.bend,s.wind.turbulence);let Y=s.clouds;this.cloudDrift[0]+=Math.cos(Y.windDirDeg*Math.PI/180)*Y.windSpeed*t,this.cloudDrift[1]+=Math.sin(Y.windDirDeg*Math.PI/180)*Y.windSpeed*t,U.vec4(1312,Y.coverage,Y.density,Y.altitude,Y.scale),U.vec4(1328,this.cloudDrift[0]%1e6,this.cloudDrift[1]%1e6,Y.shadowStrength,Y.enabled?1:0);let ce=this.probeParams;U.vec4(1280,ce.min[0],ce.min[1],ce.min[2],ce.cell),U.vec4(1296,ce.size[0],ce.size[1],ce.size[2],ce.enabled&&s.gi.enabled?s.gi.intensity:0),i.queue.writeBuffer(this.frameBuf,0,U.buffer);let Je=ft(k),Ge=[],de=[],xe=0,Re=[...e.objects];this.ensureObjectCapacity(Re.length+1);let Me=this.objData,oa=new Map,Ue=0,Dt=new Float32Array(12);for(let R of Re){if(!R.visible)continue;R._beginFrame();let F=Ue*De/4;if(Me.set(R.transform,F),Me.set(R.prevTransform,F+16),T.normalMatrix12(Dt,R.transform),Me.set(Dt,F+32),Me[F+44]=(R.viewmodel?1:0)+(R.instances?4:0),Me[F+45]=R.id,oa.set(R,Ue++),R.joints&&R.mesh.skinned&&this.updateSkin(R),R.instances&&(this.updateInstances(R),R.instanceCount===0)){Ue--,oa.delete(R);continue}R.castShadow&&!R.viewmodel&&de.push(R),R.viewmodel||pt(Je,R.worldBounds)?Ge.push(R):xe++}Ue&&i.queue.writeBuffer(this.objBuf,0,Me,0,Ue*De/4),this.stats.objects=Ge.length,this.stats.culled=xe;let Vt=0,Ht=0,rn=R=>R._skin?this.skinBG(R):R._inst?this.instBG(R):this.staticObjectBG,Pa=(R,F)=>{R.setBindGroup(1,rn(F),[oa.get(F)*De]),R.setBindGroup(2,F.material.getBindGroup(this.dev,this.textures,this.materialLayout)),R.setVertexBuffer(0,F.mesh.vertexBuffer),F.mesh.skinBuffer&&F._skin&&R.setVertexBuffer(1,F.mesh.skinBuffer),R.setIndexBuffer(F.mesh.indexBuffer,"uint32");let H=F.instances?F.instanceCount:1;R.drawIndexed(F.mesh.indexCount,H),Vt++,Ht+=F.mesh.indexCount/3*H};if(V){let R=new Float32Array(256);for(let H=0;H<V.viewProj.length;H++)R.set(V.viewProj[H],H*64);i.queue.writeBuffer(this.cascadeBuf,0,R);let F=i.createBindGroup({layout:this.shadowLayout,entries:[{binding:0,resource:{buffer:this.cascadeBuf,size:64}}]});for(let H=0;H<V.viewProj.length;H++){let K=x.beginRenderPass({label:`shadow ${H}`,colorAttachments:[],depthStencilAttachment:{view:this.shadowMap.createView({dimension:"2d",baseArrayLayer:H,arrayLayerCount:1}),depthLoadOp:"clear",depthStoreOp:"store",depthClearValue:1}});K.setBindGroup(0,F,[H*256]);let Z=ft(V.viewProj[H]);for(let se of de)se.material.alphaMode!=="blend"&&pt(Z,se.worldBounds)&&(K.setPipeline(this.getPipelines(!!se._skin,se.material).shadow),Pa(K,se));K.end()}}let ut=this.getFrameBG(d),ht=Ge.filter(R=>R.material.alphaMode!=="blend"),Wt=Ge.filter(R=>R.material.alphaMode==="blend");ht.sort((R,F)=>Number(F.viewmodel)-Number(R.viewmodel)||R.material.id-F.material.id);let qt=a.position;Wt.sort((R,F)=>m.distance(T.getTranslation(m.create(),F.transform),qt)-m.distance(T.getTranslation(m.create(),R.transform),qt));{let R=x.beginRenderPass({label:"prepass",colorAttachments:[{view:d.normal.createView(),loadOp:"clear",storeOp:"store",clearValue:[0,1,0,1]},{view:d.velocity.createView(),loadOp:"clear",storeOp:"store",clearValue:[0,0,0,0]}],depthStencilAttachment:{view:d.depth.createView(),depthLoadOp:"clear",depthStoreOp:"store",depthClearValue:0}});R.setBindGroup(0,ut);for(let F of ht)R.setPipeline(this.getPipelines(!!F._skin,F.material).prepass),Pa(R,F);R.end()}if(s.gtao.enabled){let R=s.gtao,F=new Float32Array(44);F.set(z,0),F.set(a.view,16),F.set([u,h,1/u,1/h],32),F.set([R.radius,R.falloff,R.power,this.frameIndex],36),F.set([M[0],M[5],R.steps,R.slices],40);let H=x.beginComputePass({label:"gtao"});H.setPipeline(this.gtaoPipe),H.setBindGroup(0,i.createBindGroup({layout:this.gtaoPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("gtao",F)}},{binding:1,resource:d.depth.createView()},{binding:2,resource:d.normal.createView()},{binding:3,resource:(R.blur?d.aoRaw:d.ao).createView()}]})),H.dispatchWorkgroups(Math.ceil(u/8),Math.ceil(h/8)),R.blur&&(H.setPipeline(this.aoBlurPipe),H.setBindGroup(0,i.createBindGroup({layout:this.aoBlurPipe.getBindGroupLayout(0),entries:[{binding:0,resource:d.aoRaw.createView()},{binding:1,resource:d.depth.createView()},{binding:2,resource:d.ao.createView()}]})),H.dispatchWorkgroups(Math.ceil(u/8),Math.ceil(h/8))),H.end()}this.decals.upload(),this.particles.update(t),this.particles.upload(a.position);{let R=x.beginRenderPass({label:"main",colorAttachments:[{view:d.hdr.createView(),loadOp:"clear",storeOp:"store",clearValue:[0,0,0,1]}],depthStencilAttachment:{view:d.depth.createView(),depthReadOnly:!0}});R.setBindGroup(0,ut);for(let F of ht)R.setPipeline(this.getPipelines(!!F._skin,F.material).main),Pa(R,F);R.setPipeline(this.skyPipe),R.draw(3),this.decals.draw(R),R.setBindGroup(0,ut);for(let F of Wt)R.setPipeline(this.getPipelines(!!F._skin,F.material).transparent),Pa(R,F);this.particles.draw(R,d.depth),R.end()}let nn=d.history[this.frameIndex&1],Kt=d.history[this.frameIndex+1&1],Ta=d.hdr;if(s.taa.enabled){let R=new Float32Array(44);R.set(L,0),R.set(this.prevViewProj,16),R.set([u,h,1/u,1/h],32),R.set([s.taa.feedbackMin,s.taa.feedbackMax,s.taa.velocityWeight,this.historyValid?0:1],36),R.set([y*.5,-S*.5,0,0],40);let F=x.beginComputePass({label:"taa"});F.setPipeline(this.taaPipe),F.setBindGroup(0,i.createBindGroup({layout:this.taaPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("taa",R)}},{binding:1,resource:d.hdr.createView()},{binding:2,resource:nn.createView()},{binding:3,resource:d.velocity.createView()},{binding:4,resource:d.depth.createView()},{binding:5,resource:this.linearClamp},{binding:6,resource:Kt.createView()},{binding:7,resource:{buffer:this.exposureBuf}}]})),F.dispatchWorkgroups(Math.ceil(u/8),Math.ceil(h/8)),F.end(),Ta=Kt}if(s.dof.enabled&&s.debugView===0){let R=s.dof,F=h/(2*Math.tan(a.fovY/2)),H=h/(2*Math.tan(a.viewmodelFovY/2)),K=new Float32Array([u,h,1/u,1/h,R.apertureMm/1e3,F,H,R.maxBlurPx*(h/1080),a.near,a.near*.25,s.viewmodelDepthSqueeze,1,R.focusDistance,R.autoFocus?1:0,R.overrideDistance,R.overrideWeight,Math.min(t,.1),R.focusSpeed,R.minFocus,1.6/Math.max(.25,R.quality)]),Z=this.uniform("dof",K),se=x.beginComputePass({label:"dof"});se.setPipeline(this.dofFocusPipe),se.setBindGroup(0,i.createBindGroup({layout:this.dofFocusPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:Z}},{binding:1,resource:d.depth.createView()},{binding:2,resource:{buffer:this.dofState}}]})),se.dispatchWorkgroups(1),se.setPipeline(this.dofGatherPipe),se.setBindGroup(0,i.createBindGroup({layout:this.dofGatherPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:Z}},{binding:1,resource:Ta.createView()},{binding:2,resource:d.depth.createView()},{binding:3,resource:{buffer:this.dofState}},{binding:4,resource:d.dof.createView()}]})),se.dispatchWorkgroups(Math.ceil(u/8),Math.ceil(h/8)),se.end(),Ta=d.dof}{let R=s.motionBlur,F=R.shutterAngle/360,H=new Float32Array([u,h,1/u,1/h,F,R.maxPixels,R.samples,R.enabled?1:0]),K=x.beginComputePass({label:"motionblur"});K.setPipeline(this.mbPipe),K.setBindGroup(0,i.createBindGroup({layout:this.mbPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("mb",H)}},{binding:1,resource:Ta.createView()},{binding:2,resource:d.velocity.createView()},{binding:3,resource:d.depth.createView()},{binding:4,resource:this.linearClamp},{binding:5,resource:d.mb.createView()}]})),K.dispatchWorkgroups(Math.ceil(u/8),Math.ceil(h/8)),K.end()}let ca=d.mb;{let R=s.exposure,F=-10,H=40,K=R.ev100;R.mode==="camera"&&(K=Jt(a.aperture,a.shutter,a.iso));let Z=x.beginComputePass({label:"exposure"});Z.setPipeline(this.histPipe),Z.setBindGroup(0,i.createBindGroup({layout:this.histPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("hist",new Float32Array([u,h,1/u,1/h,F,H,R.centerWeight,0]))}},{binding:1,resource:ca.createView()},{binding:2,resource:{buffer:this.histBuf}},{binding:3,resource:{buffer:this.exposureBuf}}]})),Z.dispatchWorkgroups(Math.ceil(u/32),Math.ceil(h/32)),Z.setPipeline(this.exposurePipe),Z.setBindGroup(0,i.createBindGroup({layout:this.exposurePipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("expo",new Float32Array([R.mode==="auto"?0:1,K,R.compensation,Math.min(t,.1),R.minEv100,R.maxEv100,R.speedUp,R.speedDown,R.lowPercent,R.highPercent,F,H]))}},{binding:1,resource:{buffer:this.histBuf}},{binding:2,resource:{buffer:this.exposureBuf}}]})),Z.dispatchWorkgroups(1),Z.end()}let Xe=s.bloom;if(Xe.enabled&&d.bloomDown.length>1){let R=x.beginComputePass({label:"bloom"});R.setPipeline(this.bloomDownPipe);let F=ca;for(let K=0;K<d.bloomDown.length;K++){let Z=d.bloomDown[K];R.setBindGroup(0,i.createBindGroup({layout:this.bloomDownPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform(`bd${K}`,new Float32Array([1/F.width,1/F.height,0,0,K===0?1:0,Xe.clamp,0,0]))}},{binding:1,resource:F.createView()},{binding:2,resource:this.linearClamp},{binding:3,resource:Z.createView()}]})),R.dispatchWorkgroups(Math.ceil(Z.width/8),Math.ceil(Z.height/8)),F=Z}R.setPipeline(this.bloomUpPipe);let H=d.bloomDown.length;for(let K=H-2;K>=0;K--){let Z=K===H-2?d.bloomDown[H-1]:d.bloomUp[K+1],se=d.bloomUp[K];R.setBindGroup(0,i.createBindGroup({layout:this.bloomUpPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform(`bu${K}`,new Float32Array([1/Z.width,1/Z.height,0,0,Xe.radius,0,0,0]))}},{binding:1,resource:Z.createView()},{binding:2,resource:d.bloomDown[K].createView()},{binding:3,resource:this.linearClamp},{binding:4,resource:se.createView()}]})),R.dispatchWorkgroups(Math.ceil(se.width/8),Math.ceil(se.height/8))}R.end()}if(s.debugView>0){let R=x.beginComputePass({label:"debug"});R.setPipeline(this.debugPipe),R.setBindGroup(0,i.createBindGroup({layout:this.debugPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("dbg",new Float32Array([s.debugView,a.near,u,h]))}},{binding:1,resource:d.normal.createView()},{binding:2,resource:d.ao.createView()},{binding:3,resource:d.velocity.createView()},{binding:4,resource:d.depth.createView()},{binding:5,resource:ca.createView()},{binding:6,resource:{buffer:this.exposureBuf}},{binding:7,resource:d.debug.createView()}]})),R.dispatchWorkgroups(Math.ceil(u/8),Math.ceil(h/8)),R.end()}{let R=s.lens,F=s.grade,H=s.sensor,K=H.isoCoupled?Math.pow(Math.max(a.iso,50)/100,.25):1,Z=new Float32Array([b,l,1/b,1/l,R.distortion,R.distortion2,R.chromaticAberration,R.fillZoom,R.naturalVignette,R.vignette,R.vignetteRoundness,a.fovY,Xe.enabled?Xe.intensity:0,0,0,0,H.readNoise,H.shotNoise,H.enabled?K*H.gain:0,this.frameIndex%1024,F.contrast,F.saturation,F.temperature,F.tint,F.lift,F.gamma,F.gain,On[F.tonemapper],R.sharpen,F.dither,s.debugView,F.exposureBias]),se=Xe.enabled&&d.bloomUp.length>1?d.bloomUp[0]:ca,ja=x.beginRenderPass({label:"composite",colorAttachments:[{view:this.outputView(b,l),loadOp:"clear",storeOp:"store",clearValue:[0,0,0,1]}]});ja.setPipeline(this.compositePipe),ja.setBindGroup(0,i.createBindGroup({layout:this.compositePipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("composite",Z)}},{binding:1,resource:ca.createView()},{binding:2,resource:se.createView()},{binding:3,resource:this.linearClamp},{binding:5,resource:d.debug.createView()}]})),ja.draw(3),ja.end()}i.queue.submit([x.finish()]),T.copy(this.prevViewProj,P),T.copy(this.prevVmViewProj,E);for(let R of Re)R.visible&&R._endFrame();for(let R of this.skinnedObjects)this.rotateSkin(R);this.historyValid=!0,this.frameIndex++,this.stats.drawCalls=Vt,this.stats.triangles=Ht,this.stats.frameMs=performance.now()-r}offscreenOut=null;outputView(e,a){return this.dev.offscreen?((!this.offscreenOut||this.offscreenOut.width!==e||this.offscreenOut.height!==a)&&(this.offscreenOut?.destroy(),this.offscreenOut=this.device.createTexture({size:[e,a],format:"rgba8unorm",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC,label:"offscreen.out"})),this.offscreenOut.createView()):this.dev.context.getCurrentTexture().createView()}async readback(){let e=this.offscreenOut;if(!e)throw new Error("readback requires Renderer.create(canvas, { offscreen: true })");let a=Math.ceil(e.width*4/256)*256,t=this.device.createBuffer({size:a*e.height,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),r=this.device.createCommandEncoder();r.copyTextureToBuffer({texture:e},{buffer:t,bytesPerRow:a},[e.width,e.height]),this.device.queue.submit([r.finish()]),await t.mapAsync(GPUMapMode.READ);let s=new Uint8Array(t.getMappedRange()),i=new Uint8Array(e.width*e.height*4);for(let o=0;o<e.height;o++)i.set(s.subarray(o*a,o*a+e.width*4),o*e.width*4);return t.unmap(),t.destroy(),{width:e.width,height:e.height,data:i}}resetHistory(){this.historyValid=!1}updateSkin(e){let a=e.joints,t=a.length/16;if(!e._skin||e._skin.count!==t){let r=Math.max(64,a.byteLength);e._skin?.cur.destroy(),e._skin?.prev.destroy();let s=this.dev.createBuffer(r,GPUBufferUsage.STORAGE,"joints"),i=this.dev.createBuffer(r,GPUBufferUsage.STORAGE,"joints.prev",a);e._skin={cur:s,prev:i,bg:null,count:t},this.skinnedObjects.add(e)}this.device.queue.writeBuffer(e._skin.cur,0,a)}updateInstances(e){let a=e.instances,t=Math.max(64,e.instanceCount*64);if(!e._inst||e._inst.cap<t){e._inst?.buf.destroy();let r=Math.max(t,(e._inst?.cap??0)*2);e._inst={buf:this.dev.createBuffer(r,GPUBufferUsage.STORAGE,"instances"),bg:null,cap:r},e.instancesDirty=!0}e.instancesDirty&&e.instanceCount>0&&(this.device.queue.writeBuffer(e._inst.buf,0,a,0,e.instanceCount*16),e.instancesDirty=!1)}instBG(e){let a=e._inst;return a.bg||(a.bg=this.makeObjectBG(a.buf,a.buf)),a.bg}skinBG(e){let a=e._skin;return a.bg||(a.bg=this.makeObjectBG(a.cur,a.prev)),a.bg}rotateSkin(e){!e._skin||!e.joints||this.device.queue.writeBuffer(e._skin.prev,0,e.joints)}};var Nn=1;function Ze(n){return{id:Nn++,name:n}}var qa=class{nextEntity=1;alive=new Set;stores=new Map;names=new Map;onDespawn=[];onRemove=new Map;spawn(e){let a=this.nextEntity++;return this.alive.add(a),e&&this.names.set(a,e),a}despawn(e){if(this.alive.has(e)){for(let a of this.onDespawn)a(e);for(let[a,t]of this.stores)if(t.has(e)){let r=t.get(e);t.delete(e);for(let s of this.onRemove.get(a)??[])s(e,r)}this.alive.delete(e),this.names.delete(e)}}isAlive(e){return this.alive.has(e)}nameOf(e){return this.names.get(e)??`entity#${e}`}get entityCount(){return this.alive.size}add(e,a,t){let r=this.stores.get(a.id);return r||(r=new Map,this.stores.set(a.id,r)),r.set(e,t),t}get(e,a){return this.stores.get(a.id)?.get(e)}require(e,a){let t=this.get(e,a);if(t===void 0)throw new Error(`${this.nameOf(e)} has no ${a.name}`);return t}has(e,a){return this.stores.get(a.id)?.has(e)??!1}remove(e,a){let t=this.stores.get(a.id);if(!t?.has(e))return;let r=t.get(e);t.delete(e);for(let s of this.onRemove.get(a.id)??[])s(e,r)}onRemoved(e,a){let t=this.onRemove.get(e.id)??[];t.push(a),this.onRemove.set(e.id,t)}*query(...e){let a=e.map(r=>this.stores.get(r.id));if(a.some(r=>!r))return;let t=0;for(let r=1;r<a.length;r++)a[r].size<a[t].size&&(t=r);for(let r of[...a[t].keys()]){let s=[r],i=!0;for(let o of a){if(!o.has(r)){i=!1;break}s.push(o.get(r))}i&&(yield s)}}entities(){return this.alive.values()}};var Ka=class{position=m.create();rotation=G.create();scale=m.create(1,1,1);parent=null;local=T.create();world=T.create();version=0;worldVersion=-1;parentVersion=-1;constructor(e,a,t){e&&m.copy(this.position,e),a&&G.copy(this.rotation,a),t&&m.copy(this.scale,t)}touch(){this.version++}setPosition(e,a,t){return m.set(this.position,e,a,t),this.version++,this}setRotation(e){return G.copy(this.rotation,e),this.version++,this}setEuler(e,a,t=0){return G.fromEuler(this.rotation,e,a,t),this.version++,this}get stamp(){return this.version+(this.parent?this.parent.stamp*31:0)}getWorld(){let e=this.parent?this.parent.stamp:0;return(this.worldVersion!==this.version||this.parentVersion!==e)&&(T.fromRotationTranslationScale(this.local,this.rotation,this.position,this.scale),this.parent?T.multiply(this.world,this.parent.getWorld(),this.local):T.copy(this.world,this.local),this.worldVersion=this.version,this.parentVersion=e),this.world}worldPosition(e=m.create()){return T.getTranslation(e,this.getWorld())}worldRotation(e=G.create()){return T.getRotation(e,this.getWorld())}forward(e=m.create()){let a=this.getWorld();return m.normalize(e,m.set(e,-a[8],-a[9],-a[10]))}right(e=m.create()){let a=this.getWorld();return m.normalize(e,m.set(e,a[0],a[1],a[2]))}up(e=m.create()){let a=this.getWorld();return m.normalize(e,m.set(e,a[4],a[5],a[6]))}transformPoint(e,a=m.create()){return m.transformMat4(a,e,this.getWorld())}},ua=Ze("Transform");var ha=Ze("Scripts");var _a=class{down=new Set;pressed=new Set;released=new Set;mouseDown=new Set;mousePressed=new Set;mouseReleased=new Set;padPrev=[];mouseDX=0;mouseDY=0;wheel=0;sensitivity=.075;invertY=!1;bindings=new Map;locked=!1;gamepad=null;padLookSpeed=160;deadzone=.12;target;constructor(e){this.target=e,addEventListener("keydown",a=>{a.repeat||(this.down.add(a.code),this.pressed.add(a.code),this.locked&&["Tab","Space","KeyF","Backquote"].includes(a.code)&&a.preventDefault())}),addEventListener("keyup",a=>{this.down.delete(a.code),this.released.add(a.code)}),addEventListener("blur",()=>{this.down.clear(),this.mouseDown.clear()}),e.addEventListener("mousedown",a=>{this.mouseDown.add(a.button),this.mousePressed.add(a.button)}),addEventListener("mouseup",a=>{this.mouseDown.delete(a.button),this.mouseReleased.add(a.button)}),addEventListener("mousemove",a=>{this.locked&&(this.mouseDX+=a.movementX,this.mouseDY+=a.movementY)}),addEventListener("wheel",a=>{this.wheel+=Math.sign(a.deltaY)},{passive:!0}),e.addEventListener("contextmenu",a=>a.preventDefault()),document.addEventListener("pointerlockchange",()=>{this.locked=document.pointerLockElement===this.target}),this.defaultBindings()}async lock(){try{await this.target.requestPointerLock.call(this.target,{unadjustedMovement:!0})}catch{try{await this.target.requestPointerLock()}catch{}}}unlock(){document.exitPointerLock()}defaultBindings(){let e=(a,t)=>this.bindings.set(a,t);e("forward",{keys:["KeyW"]}),e("back",{keys:["KeyS"]}),e("left",{keys:["KeyA"]}),e("right",{keys:["KeyD"]}),e("sprint",{keys:["ShiftLeft"],gamepadButtons:[10]}),e("crouch",{keys:["KeyC","ControlLeft"],gamepadButtons:[1]}),e("jump",{keys:["Space"],gamepadButtons:[0]}),e("fire",{mouse:[0],gamepadButtons:[7]}),e("aim",{mouse:[2],gamepadButtons:[6]}),e("reload",{keys:["KeyR"],gamepadButtons:[2]}),e("fireMode",{keys:["KeyX"],gamepadButtons:[12]}),e("leanLeft",{keys:["KeyQ"],gamepadButtons:[4]}),e("leanRight",{keys:["KeyE"],gamepadButtons:[5]}),e("earpro",{keys:["KeyV"]}),e("camera",{keys:["KeyH"]}),e("tuning",{keys:["F1","Backquote"]}),e("holdBreath",{keys:["AltLeft"],gamepadButtons:[11]})}padButton(e){return!!this.gamepad?.buttons[e]?.pressed}action(e){let a=this.bindings.get(e);return a?(a.keys?.some(t=>this.down.has(t))??!1)||(a.mouse?.some(t=>this.mouseDown.has(t))??!1)||(a.gamepadButtons?.some(t=>this.padButton(t))??!1):!1}actionPressed(e){let a=this.bindings.get(e);return a?(a.keys?.some(t=>this.pressed.has(t))??!1)||(a.mouse?.some(t=>this.mousePressed.has(t))??!1)||(a.gamepadButtons?.some(t=>this.padButton(t)&&!this.padPrev[t])??!1):!1}actionReleased(e){let a=this.bindings.get(e);return a?(a.keys?.some(t=>this.released.has(t))??!1)||(a.mouse?.some(t=>this.mouseReleased.has(t))??!1):!1}key(e){return this.down.has(e)}keyPressed(e){return this.pressed.has(e)}moveAxis(){let e=(this.action("right")?1:0)-(this.action("left")?1:0),a=(this.action("forward")?1:0)-(this.action("back")?1:0);if(this.gamepad){let r=this.gamepad.axes[0]??0,s=this.gamepad.axes[1]??0;Math.hypot(r,s)>this.deadzone&&(e+=r,a-=s)}let t=Math.hypot(e,a);return t>1&&(e/=t,a/=t),{x:e,y:a}}lookDelta(e){let a=this.sensitivity*Math.PI/180,t=-this.mouseDX*a,r=-this.mouseDY*a*(this.invertY?-1:1);if(this.gamepad){let s=this.gamepad.axes[2]??0,i=this.gamepad.axes[3]??0,o=this.padLookSpeed*Math.PI/180*e;Math.abs(s)>this.deadzone&&(t-=Math.sign(s)*(Math.abs(s)-this.deadzone)/(1-this.deadzone)*o),Math.abs(i)>this.deadzone&&(r-=Math.sign(i)*(Math.abs(i)-this.deadzone)/(1-this.deadzone)*o)}return{yaw:t,pitch:r}}rumble(e,a,t){this.gamepad?.vibrationActuator?.playEffect?.("dual-rumble",{duration:t,strongMagnitude:Math.min(1,e),weakMagnitude:Math.min(1,a)})}poll(){let e=navigator.getGamepads?.()??[];this.gamepad=e.find(a=>a&&a.connected)??null}endFrame(){this.pressed.clear(),this.released.clear(),this.mousePressed.clear(),this.mouseReleased.clear(),this.mouseDX=0,this.mouseDY=0,this.wheel=0,this.gamepad&&(this.padPrev=this.gamepad.buttons.map(e=>e.pressed))}};var Ne={gl:"fondaineGL",vorp:"vorp",oaxis:"oAxis"},Ja=class n{hub;storageKey;module;constructor(e="fondaine.tuning",a=Ne.gl,t){this.storageKey=e,this.module=a,this.hub=t??{params:[],listeners:[]}}get params(){return this.hub.params}scope(e){return new n(this.storageKey,e,this.hub)}get modules(){return[...new Set(this.hub.params.map(e=>e.module))]}k(e,a){return`${this.module}:${e}.${a}`}number(e,a,t,r){return this.hub.params.push({module:this.module,group:e,key:this.k(e,t),label:r.label??t,kind:"number",min:r.min,max:r.max,step:r.step??(r.max-r.min)/200,unit:r.unit,help:r.help,get:()=>a[t],set:s=>{a[t]=Number(s),r.onChange?.(Number(s)),this.emit()}}),this}bool(e,a,t,r={}){return this.hub.params.push({module:this.module,group:e,key:this.k(e,t),label:r.label??t,kind:"bool",help:r.help,get:()=>a[t],set:s=>{a[t]=!!s,r.onChange?.(!!s),this.emit()}}),this}choice(e,a,t,r,s={}){return this.hub.params.push({module:this.module,group:e,key:this.k(e,t),label:s.label??t,kind:"enum",options:r,help:s.help,get:()=>a[t],set:i=>{a[t]=String(i),s.onChange?.(String(i)),this.emit()}}),this}arrayValue(e,a,t,r){return this.hub.params.push({module:this.module,group:e,key:this.k(e,r.key),label:r.label,kind:"number",min:r.min,max:r.max,step:r.step??(r.max-r.min)/200,unit:r.unit,help:r.help,get:()=>a[t],set:s=>{a[t]=Number(s),r.onChange?.(),this.emit()}}),this}groups(e=this.module){return[...new Set(this.hub.params.filter(a=>a.module===e).map(a=>a.group))]}unregister(e,a=this.module){for(let t=this.hub.params.length-1;t>=0;t--)this.hub.params[t].module===a&&this.hub.params[t].group===e&&this.hub.params.splice(t,1)}onChange(e){this.hub.listeners.push(e)}emit(){for(let e of this.hub.listeners)e()}snapshot(e=this.module){let a={};for(let t of this.hub.params)(e==="*"||t.module===e)&&(a[t.key]=t.get());return a}apply(e){for(let a of this.hub.params)a.key in e&&a.set(e[a.key])}save(e="default",a=this.module){try{localStorage.setItem(`${this.storageKey}.${a}.${e}`,JSON.stringify(this.snapshot(a)))}catch{}}load(e="default",a=this.module){try{let t=localStorage.getItem(`${this.storageKey}.${a}.${e}`);return t?(this.apply(JSON.parse(t)),!0):!1}catch{return!1}}exportJSON(e=this.module){return JSON.stringify(this.snapshot(e),null,2)}};var Fn=`
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
`,Xa=class{constructor(e,a="fondaine"){this.tuning=e;if(!document.getElementById("fdui-css")){let s=document.createElement("style");s.id="fdui-css",s.textContent=Fn,document.head.appendChild(s)}this.root=document.createElement("div"),this.root.className="fdui",this.root.style.display="none",this.root.innerHTML=`<header><span class="logo">/f</span><b>${a}</b><span style="margin-left:auto;color:#6f747d">F1 to close</span></header>`,this.statsEl=document.createElement("div"),this.statsEl.className="stats",this.mods=document.createElement("div"),this.mods.className="mods",this.tabs=document.createElement("div"),this.tabs.className="tabs",this.body=document.createElement("div"),this.body.className="body";let t=document.createElement("footer"),r=(s,i)=>{let o=document.createElement("button");o.textContent=s,o.onclick=i,t.appendChild(o)};r("Save",()=>e.save("default",this.module)),r("Load",()=>{e.load("default",this.module),this.refresh()}),r("Export JSON",()=>{let s=new Blob([e.exportJSON(this.module)],{type:"application/json"}),i=document.createElement("a");i.href=URL.createObjectURL(s),i.download=`${this.module}-tuning.json`,i.click()}),r("Import JSON",()=>{let s=document.createElement("input");s.type="file",s.accept=".json",s.onchange=async()=>{let i=s.files?.[0];i&&(e.apply(JSON.parse(await i.text())),this.refresh())},s.click()}),this.root.append(this.statsEl,this.mods,this.tabs,this.body,t),document.body.appendChild(this.root);for(let s of["keydown","mousedown","wheel"])this.root.addEventListener(s,i=>i.stopPropagation())}root;body;statsEl;tabs;mods;module="";group="";inputs=new Map;visible=!1;statsText=()=>"";toggle(e=!this.visible){this.visible=e,this.root.style.display=e?"flex":"none",e&&this.rebuild()}rebuild(){let e=this.tuning.modules;(!this.module||!e.includes(this.module))&&(this.module=e[0]??""),this.mods.innerHTML="";for(let t of e){let r=document.createElement("button");r.textContent=t,t===this.module&&(r.className="on"),r.onclick=()=>{this.module=t,this.group="",this.rebuild()},this.mods.appendChild(r)}let a=this.tuning.groups(this.module);(!this.group||!a.includes(this.group))&&(this.group=a[0]??""),this.tabs.innerHTML="";for(let t of a){let r=document.createElement("button");r.textContent=t,t===this.group&&(r.className="on"),r.onclick=()=>{this.group=t,this.rebuild()},this.tabs.appendChild(r)}this.body.innerHTML="",this.inputs.clear();for(let t of this.tuning.params.filter(r=>r.module===this.module&&r.group===this.group))this.body.appendChild(this.row(t))}row(e){let a=document.createElement("div");a.className="row";let t=document.createElement("label");if(t.textContent=e.unit?`${e.label} (${e.unit})`:e.label,t.title=e.help??e.key,a.appendChild(t),e.kind==="number"){let r=document.createElement("input");r.type="range",r.min=String(e.min),r.max=String(e.max),r.step=String(e.step??.01);let s=document.createElement("input");s.type="number",s.step=String(e.step??.01);let i=()=>{let o=Number(e.get());r.value=String(o),s.value=String(+o.toPrecision(5))};r.oninput=()=>{e.set(Number(r.value)),s.value=String(+Number(r.value).toPrecision(5))},s.onchange=()=>{e.set(Number(s.value)),r.value=s.value},i(),this.inputs.set(e.key,i),a.append(r,s)}else if(e.kind==="bool"){let r=document.createElement("input");r.type="checkbox",r.checked=!!e.get(),r.onchange=()=>e.set(r.checked),this.inputs.set(e.key,()=>{r.checked=!!e.get()}),a.append(r,document.createElement("span"))}else{let r=document.createElement("select");for(let s of e.options??[]){let i=document.createElement("option");i.value=s,i.textContent=s,r.appendChild(i)}r.value=String(e.get()),r.onchange=()=>e.set(r.value),this.inputs.set(e.key,()=>{r.value=String(e.get())}),a.append(r,document.createElement("span"))}if(e.help){let r=document.createElement("div");r.className="help",r.textContent=e.help,a.appendChild(r)}return a}refresh(){for(let e of this.inputs.values())e()}update(){this.visible&&(this.statsEl.textContent=this.statsText())}};var Pt=class{constructor(e,a,t,r){this.p=e;this.id=a;this.radius=t;this.height=r}setPosition(e,a,t){this.p.ex.fp_character_set_position(this.id,e,a,t)}move(e,a,t){let r=this.p.ex.fp_character_move(this.id,e,a,t),s=this.p.result(8);return{position:m.create(s[0],s[1],s[2]),grounded:(r&1)!==0,ceiling:(r&2)!==0,wall:(r&4)!==0,groundNormal:m.create(s[3],s[4],s[5]),groundMaterial:s[6]}}setHeight(e){let a=this.p.ex.fp_character_set_height(this.id,e)===1;return a&&(this.height=e),a}remove(){this.p.ex.fp_character_remove(this.id)}},Tt=class{constructor(e,a){this.p=e;this.id=a}setTransform(e,a=[0,0,0,1]){this.p.ex.fp_body_set_transform(this.id,e[0],e[1],e[2],a[0],a[1],a[2],a[3])}setVelocity(e,a=[0,0,0]){this.p.ex.fp_body_set_velocity(this.id,e[0],e[1],e[2],a[0],a[1],a[2])}applyImpulse(e,a){this.p.ex.fp_body_apply_impulse(this.id,e[0],e[1],e[2],a[0],a[1],a[2])}remove(){this.p.ex.fp_body_remove(this.id)}state(){return this.p.bodyState(this.id)}get alive(){return this.state()[0]>.5}},Ya=class n{ex;stride=15;onProjectileHit=[];onContact=[];constructor(e){this.ex=e,this.stride=e.fp_body_stride?.()??15}static async load(e){let a=await(await fetch(e)).arrayBuffer();return n.fromBytes(a)}static async fromBytes(e){let a=await WebAssembly.compile(e),t={};for(let s of WebAssembly.Module.imports(a))t[s.module]??={},t[s.module][s.name]=s.kind==="function"?()=>0:void 0;let r=await WebAssembly.instantiate(a,t);return new n(r.exports)}f32(e,a){return new Float32Array(this.ex.memory.buffer,e,a)}result(e){return this.f32(this.ex.fp_result_ptr(),e)}withF32(e,a){let t=e.length*4,r=this.ex.fp_alloc(t);this.f32(r,e.length).set(e);try{return a(r)}finally{this.ex.fp_free(r,t)}}setMaterial(e,a){this.ex.fp_set_material(e,a.friction??.6,a.restitution??.2,a.ricochetAngleDeg??0,a.ricochetEnergyKeep??.3)}reset(){this.ex.fp_world_reset()}staticMeshes=[];addStaticMesh(e,a,t){this.staticMeshes.push({positions:Float32Array.from(e),indices:Uint32Array.from(a),material:t});let r=e.length/3,s=a.length,i=r*12,o=s*4,c=this.ex.fp_alloc(i),b=this.ex.fp_alloc(o);this.f32(c,e.length).set(e),new Uint32Array(this.ex.memory.buffer,b,s).set(a);let l=this.ex.fp_add_static_mesh(c,r,b,s,t);return this.ex.fp_free(c,i),this.ex.fp_free(b,o),l}addGeometry(e,a,t){let r=e.positions,s=new Float32Array(r.length),i=m.create();for(let o=0;o<r.length;o+=3)m.transformMat4(i,r.subarray(o,o+3),a),s.set(i,o);return this.addStaticMesh(s,e.indices,t)}build(){this.ex.fp_build()}raycast(e,a,t,r=!0){if(!this.ex.fp_raycast(e[0],e[1],e[2],a[0],a[1],a[2],t,r?1:0))return null;let i=this.result(10);return{t:i[0],point:m.create(i[1],i[2],i[3]),normal:m.create(i[4],i[5],i[6]),material:i[7],triangle:i[8],body:i[9]}}raycastBatch(e,a){let t=e.length/6,r=this.ex.fp_alloc(t*4),s=this.withF32(e,i=>(this.ex.fp_raycast_batch(i,t,a,r),this.f32(r,t).slice()));return this.ex.fp_free(r,t*4),s}bakeSkyVisibility(e,a,t,r,s,i=48,o=60){let c=t*r*s,b=this.ex.fp_alloc(c*4);this.ex.fp_bake_sky_visibility(e[0],e[1],e[2],a,t,r,s,i,o,b);let l=this.f32(b,c).slice();return this.ex.fp_free(b,c*4),l}bakeGI(e){let a=e.nx*e.ny*e.nz,t=a*12*4,r=108,s=Math.max(4,e.albedo.length*4),i=this.ex.fp_alloc(t),o=this.ex.fp_alloc(r),c=this.ex.fp_alloc(s);this.f32(o,27).set(Array.from(e.skySH).slice(0,27)),this.f32(c,e.albedo.length).set(e.albedo);let b=this.ex.fp_bake_gi(e.min[0],e.min[1],e.min[2],e.cell,e.nx,e.ny,e.nz,e.rays??192,e.passes??3,e.sunDir[0],e.sunDir[1],e.sunDir[2],e.sunRGB[0],e.sunRGB[1],e.sunRGB[2],o,c,Math.floor(e.albedo.length/3),e.maxDist??400,i),l=this.f32(i,a*12).slice();return this.ex.fp_free(i,t),this.ex.fp_free(o,r),this.ex.fp_free(c,s),{data:l,filled:b}}giPositions(e,a,t,r,s){let i=e.nx*e.ny*e.nz,o=this.ex.fp_alloc(i*12),c=this.ex.fp_alloc(Math.max(4,i));this.ex.fp_gi_positions(e.min[0],e.min[1],e.min[2],e.cell,e.nx,e.ny,e.nz,e.rays,a,t,o,c);let b=a*e.nx*e.ny,l=Math.min(e.nz,t)*e.nx*e.ny;r.set(this.f32(o+b*12,(l-b)*3),b*3),s.set(new Uint8Array(this.ex.memory.buffer,c+b,l-b),b),this.ex.fp_free(o,i*12),this.ex.fp_free(c,Math.max(4,i))}giPass(e,a,t,r,s,i,o,c){let b=e.nx*e.ny*e.nz,l={pos:b*12,valid:Math.max(4,b),prev:b*48,out:b*48,sh:108,al:Math.max(4,e.albedo.length*4)},u=this.ex.fp_alloc(l.pos),h=this.ex.fp_alloc(l.valid),d=this.ex.fp_alloc(l.out),x=this.ex.fp_alloc(l.sh),p=this.ex.fp_alloc(l.al),w=s?this.ex.fp_alloc(l.prev):0;this.f32(u,b*3).set(t),new Uint8Array(this.ex.memory.buffer,h,b).set(r),s&&this.f32(w,b*12).set(s),this.f32(x,27).set(Array.from(e.skySH).slice(0,27)),this.f32(p,e.albedo.length).set(e.albedo),this.ex.fp_gi_pass(e.min[0],e.min[1],e.min[2],e.cell,e.nx,e.ny,e.nz,e.rays,a,e.sunDir[0],e.sunDir[1],e.sunDir[2],e.sunRGB[0],e.sunRGB[1],e.sunRGB[2],x,p,Math.floor(e.albedo.length/3),e.maxDist??400,u,h,w,i,o,d);let g=i*e.nx*e.ny,y=Math.min(e.nz,o)*e.nx*e.ny;c.set(this.f32(d+g*48,(y-g)*12),g*12),this.ex.fp_free(u,l.pos),this.ex.fp_free(h,l.valid),this.ex.fp_free(d,l.out),this.ex.fp_free(x,l.sh),this.ex.fp_free(p,l.al),s&&this.ex.fp_free(w,l.prev)}createCharacter(e,a,t=.35,r=50){return new Pt(this,this.ex.fp_character_create(e,a,t,r),e,a)}createBody(e,a,t,r){return new Tt(this,this.ex.fp_body_create(e,a[0],a[1],a[2],t,r))}bodyState(e){let a=this.ex.fp_bodies_ptr();return this.f32(a+e*this.stride*4,this.stride)}setGravity(e,a,t){this.ex.fp_set_gravity(e,a,t)}setAtmosphere(e,a,t,r){this.ex.fp_set_atmosphere(e,a,t,r[0],r[1],r[2])}spawnProjectile(e,a,t){return this.ex.fp_projectile_spawn(e[0],e[1],e[2],a[0],a[1],a[2],t.bcG7,t.massKg,t.diameterM,t.maxTime??6,t.userId??0)}projectiles(){let e=this.ex.fp_projectile_count();if(!e)return[];let a=this.f32(this.ex.fp_projectiles_ptr(),e*8),t=[];for(let r=0;r<e;r++){let s=r*8;t.push({id:a[s],userId:a[s+1],position:m.create(a[s+2],a[s+3],a[s+4]),velocity:m.create(a[s+5],a[s+6],a[s+7])})}return t}step(e){this.ex.fp_step(e);let a=this.ex.fp_projectile_hit_count();if(a&&this.onProjectileHit.length){let r=this.f32(this.ex.fp_projectile_hits_ptr(),a*16).slice();for(let s=0;s<a;s++){let i=s*16,o={userId:r[i],point:m.create(r[i+1],r[i+2],r[i+3]),normal:m.create(r[i+4],r[i+5],r[i+6]),velocity:m.create(r[i+7],r[i+8],r[i+9]),material:r[i+10],distance:r[i+11],timeOfFlight:r[i+12],body:r[i+13],ricochet:r[i+14]>.5,projectileId:r[i+15]};for(let c of this.onProjectileHit)c(o)}}let t=this.ex.fp_contact_count();if(t&&this.onContact.length){let r=this.f32(this.ex.fp_contacts_ptr(),t*10).slice();for(let s=0;s<t;s++){let i=s*10,o={body:r[i],point:m.create(r[i+1],r[i+2],r[i+3]),normal:m.create(r[i+4],r[i+5],r[i+6]),impulse:r[i+7],speed:r[i+8],otherMaterial:r[i+9]};for(let c of this.onContact)c(o)}}}};var O=(n,e,a,t,r,s="",i="",o)=>({key:n,label:e,def:a,min:t,max:r,unit:s,help:i,step:o}),kr=[O("peakSpl","Peak SPL @1 m",158,120,180,"dB","Muzzle-blast peak sound pressure level 1 m from the muzzle, on axis. Rifles \u2248 155\u2013165, pistols \u2248 150\u2013160."),O("positiveMs","Positive phase",1,.1,5,"ms","Friedlander positive-phase duration at 1 m. Longer = bigger charge / longer barrel gas release.",.01),O("decayB","Blast decay (b)",1.4,.3,5,"","Friedlander waveform decay constant. Higher = sharper, smaller negative phase.",.01),O("precursorDb","Precursor",-14,-60,0,"dB","Level of the precursor shock (air column ahead of the bullet) relative to the main blast."),O("precursorLeadMs","Precursor lead",.35,0,2,"ms","How far the precursor leads the main blast.",.01),O("turbDb","Gas plume roar",-5,-60,0,"dB","Turbulent propellant-gas noise relative to the blast peak."),O("turbMs","Roar decay (T60)",140,2,400,"ms","Time for the gas roar to fall 60 dB."),O("turbHp","Roar highpass",180,20,2e3,"Hz"),O("turbLp","Roar lowpass",4500,500,16e3,"Hz"),O("bodyDb","Body (perceived boom)",-6,-60,0,"dB",'Low-frequency chest/room "boom". \u221260 for a purely measured (thin) signature.'),O("bodyHz","Body frequency",62,20,400,"Hz"),O("bodyMs","Body decay (T60)",160,5,1e3,"ms"),O("bodyDrop","Body pitch drop",.35,0,2,"","Initial pitch overshoot that glides down to the body frequency.",.01),O("suppress","Suppressor",0,0,1,"","Suppressor amount (0 none \u2026 1 full can).",.01),O("suppRedDb","Suppressor reduction",28,0,45,"dB","Peak reduction a full suppressor provides (good cans: 25\u201335 dB)."),O("firstPopDb","First-round pop",0,0,10,"dB","Extra level on the first suppressed shot (oxygen in the can). Set by the weapon at runtime."),O("variation","Shot-to-shot variation",.5,0,1,"","Random variation of level, duration and spectrum per shot.",.01),O("seed","Seed",0,0,1e5,"","Randomised per shot by the host.",1),O("brightHz","Brightness",16e3,1e3,2e4,"Hz","Final band-limit (anti-alias / mic bandwidth)."),O("directivityDb","Directivity (front\u2212rear)",9,0,20,"dB","How much louder the blast is in front of the muzzle than behind it."),O("rearLpHz","Rear darkening",4500,200,2e4,"Hz","Lowpass applied towards the rear of the muzzle (shooter\u2019s own ears are rear-ish)."),O("tailSendDb","Environment send",0,-40,12,"dB","Adjusts how much this weapon excites reflections / reverb."),O("crackDb","Report (snap)",-4,-90,6,"dB","Sharp band-limited report burst that gives each gun its character (relative to the blast peak)."),O("crackHz","Report pitch",2600,300,9e3,"Hz","Pistols \u2248 1.5\u20132 kHz (pop), 5.56 \u2248 3\u20133.5 kHz (crack), big rifles \u2248 2 kHz."),O("crackMs","Report decay (T60)",18,1,200,"ms"),O("subDb","Sub thump",-9,-90,6,"dB","Sub-bass pressure pulse you feel in your chest (relative to the blast peak)."),O("subHz","Sub frequency",40,15,150,"Hz"),O("subMs","Sub decay (T60)",150,5,1e3,"ms"),O("driveDb","Spike compaction",10,0,30,"dB","Soft-clips the instantaneous blast spike this far below its peak so the 50\u2013300 ms body carries the loudness (how a shot feels, not how a microphone peaks).")],Ar=[O("levelSpl","Peak SPL @1 m",120,60,170,"dB"),O("attackMs","Attack",.5,.01,50,"ms","",.01),O("decayMs","Decay (T60)",120,1,3e3,"ms"),O("hpHz","Highpass",200,20,8e3,"Hz"),O("lpHz","Lowpass",5e3,200,2e4,"Hz"),O("thumpHz","Thump frequency",90,20,400,"Hz"),O("thumpDb","Thump level",-6,-60,12,"dB"),O("thumpMs","Thump decay",60,2,1e3,"ms"),O("grainsPerS","Grain density",0,0,3e3,"/s","Granular crackle (gravel, dry grass, debris)."),O("grainDb","Grain level",-10,-60,6,"dB"),O("seed","Seed",0,0,1e5,"","",1),O("resonance","Filter Q",.7,.3,8,"","",.01)],fa=[O("protection","Hearing protection",0,0,2,"","0 none, 1 passive earmuffs, 2 electronic earmuffs",1),O("passiveAttenDb","Passive attenuation",25,0,40,"dB","Real-world muff/plug attenuation (\u2248 NRR \u2212 7)."),O("passiveHfExtraDb","Extra HF attenuation",10,0,30,"dB"),O("elecGainDb","Electronic gain",6,0,24,"dB","Ambient amplification of electronic muffs."),O("elecLimitSpl","Electronic limit",82,70,95,"dB SPL","Output limit of electronic muffs (most cut at ~82 dB)."),O("ttsThresholdSpl","Damage threshold (peak)",130,110,150,"dB SPL","Impulses above this cause a temporary threshold shift."),O("ttsRate","TTS rate",.15,0,2,"dB/dB","dB of threshold shift per dB above threshold per impulse.",.01),O("ttsMaxDb","Max TTS",18,0,60,"dB"),O("ttsRecoveryS","Recovery time constant",25,.5,600,"s","Real-world recovery takes hours; games use 10\u201360 s."),O("tinnitusHz","Tinnitus frequency",4200,1e3,12e3,"Hz"),O("tinnitusDb","Tinnitus level",-80,-80,-6,"dBFS","Ear ringing after loud exposure. \u221280 = off (default). \u2248 \u221240 is a realistic ring."),O("tinnitusTtsDb","Tinnitus full at TTS",12,1,40,"dB"),O("reflexThresholdSpl","Acoustic reflex threshold",95,70,120,"dB SPL"),O("reflexMaxDb","Reflex max attenuation",5,0,30,"dB"),O("reflexAttackMs","Reflex latency",90,5,300,"ms"),O("reflexReleaseMs","Reflex release",600,50,5e3,"ms"),O("muffle","Muffling amount",.6,0,2,"","How strongly TTS dulls and quiets hearing.",.01),O("enable","Hearing model",1,0,1,"","",1)],pa=[O("calibrationSpl","Calibration (SPL @ 0 dBFS)",100,70,140,"dB SPL","Acoustic level that maps to digital full scale before dynamics. Lower = everything louder."),O("compThresholdDb","Loudness threshold",-20,-60,0,"dBFS"),O("compRatio","Loudness ratio",3.2,1,20,":1","Perceptual compression of the 110+ dB real-world range into a playable range.",.1),O("compKneeDb","Knee",8,0,24,"dB"),O("compAttackMs","Attack",5,.1,100,"ms","",.1),O("compReleaseMs","Release",180,10,3e3,"ms","How long the world stays ducked after a shot."),O("limitCeilingDb","Limiter ceiling",-.5,-12,0,"dBFS","",.1),O("limitReleaseMs","Limiter release",30,1,500,"ms"),O("masterDb","Master volume",0,-60,12,"dB"),O("busWeaponsDb","Weapons bus",0,-60,12,"dB"),O("busImpactsDb","Impacts bus",0,-60,12,"dB"),O("busEnvDb","Environment bus",0,-60,12,"dB"),O("busUiDb","UI bus",0,-60,12,"dB"),O("erLevelDb","Early reflections",0,-40,12,"dB"),O("reverbLevelDb","Late reverb",0,-40,12,"dB"),O("convMix","Convolution mix",0,0,1,"","0 = algorithmic FDN, 1 = convolution IR",.01),O("headRadiusM","Head radius",.0875,.06,.12,"m","",5e-4),O("spatialEnable","Binaural",1,0,1,"","",1),O("compDetectorMs","Loudness integration",15,0,100,"ms","RMS window of the loudness detector (0 = peak)."),O("clipKneeDb","Saturation knee",-5,-24,-.1,"dBFS","Above this, the output saturates smoothly towards full scale: density instead of a 1 ms tick under a limiter.",.1),O("makeupDb","Make-up gain",0,-12,24,"dB","Overall loudness after the perceptual compressor. Raise for an even louder mix.")],ga=[O("rt60Low","RT60 low",1.2,.05,12,"s","",.01),O("rt60Mid","RT60 mid",1,.05,12,"s","",.01),O("rt60High","RT60 high",.5,.05,12,"s","",.01),O("xoverLow","Low crossover",250,50,1e3,"Hz"),O("xoverHigh","High crossover",4e3,1e3,12e3,"Hz"),O("size","Size",1,.1,8,"","Delay scale \u2248 room dimensions.",.01),O("diffusion","Diffusion",.7,0,1,"","",.01),O("predelayMs","Predelay",12,0,240,"ms"),O("modDepthMs","Modulation depth",.35,0,3,"ms","",.01),O("modRateHz","Modulation rate",.6,.05,5,"Hz","",.01),O("levelDb","Level",0,-40,12,"dB"),O("toneHz","Tone",9e3,1e3,2e4,"Hz")],va=[O("windSpl","Wind level",48,0,90,"dB SPL"),O("windGust","Gustiness",.5,0,1,"","",.01),O("windGustRate","Gust rate",.15,.01,2,"Hz","",.01),O("windToneHz","Wind tone",600,100,3e3,"Hz"),O("rumbleSpl","Distant rumble",38,0,80,"dB SPL"),O("enable","Ambience",1,0,1,"","",1)],Q={LISTENER:1,SPAWN:2,VOICE_POS:3,VOICE_TAPS:4,VOICE_OCCLUSION:5,VOICE_STOP:6,ATMOSPHERE:7,REVERB:8,HEARING:9,MASTER:10,AMBIENCE:11,VOICE_SEND:12,RESET_HEARING:13},$e={GUNSHOT:1,NWAVE:2,MODAL:3,NOISE:4,SAMPLE:5},oe={VOICE_ID:0,KIND:1,BUS:2,PX:3,DX:6,DIRECTIVITY_DB:9,REAR_LP_HZ:10,DISTANCE_MODE:11,MIN_DIST:12,REVERB_SEND_DB:13,SPATIAL:14,DELAY_MS:15,HEADER:16},Ve={WEAPONS:0,IMPACTS:1,ENV:2,UI:3},ve={PEAK_L:0,PEAK_R:1,SCENE_SPL:2,TTS:3,COMP_GR:4,LIMIT_GR:5,VOICES:6,REFLEX_GR:7,TINNITUS:8,EAR_SPL:9,SPEED_OF_SOUND:10,TIME:11,MAX_EAR_SPL:12};function Ke(n,e={}){let a=new Float32Array(n.length);return n.forEach((t,r)=>{a[r]=e[t.key]??t.def}),a}var Sr=n=>331.3*Math.sqrt(1+n/273.15);function Pr(n){let e=Math.max(n.mach,1.0001),a=Math.max(n.missDistance,.05),t=n.ambientPa??101325,r=n.c??343,s=Math.pow(e*e-1,.125),i=t*.53*s*n.diameter/(Math.pow(a,.75)*Math.pow(n.length,.25)),o=1.82*e*Math.pow(a,.25)*n.diameter/(r*Math.pow(e*e-1,.375)*Math.pow(n.length,.25));return{peakPa:i,duration:o}}function Qa(n=1){let e=[1180,2230,3410,4870,6620,8900,11200],a=[.06,.05,.04,.032,.025,.018,.012],t=[.55,.6,.5,.36,.27,.18,.1];return e.map((r,s)=>({freq:r*n,t60:a[s],amp:t[s]}))}function Tr(n,e,a=1,t=0){let r=n.slice(0,48),s=e.slice(0,8),i=new Float32Array(4+r.length*3+s.length*4);i[0]=a,i[1]=r.length,i[2]=s.length,i[3]=t,r.forEach((c,b)=>{i[4+b*3]=c.freq,i[5+b*3]=c.t60,i[6+b*3]=c.amp});let o=4+r.length*3;return s.forEach((c,b)=>{i[o+b*4]=c.timeMs,i[o+b*4+1]=c.amp,i[o+b*4+2]=c.contactMs,i[o+b*4+3]=c.noiseDb??-200}),i}var jr=n=>-20*Math.log10(Math.max(n,.1)),Rr=(n,e)=>.057*Math.sqrt(n/Math.max(e,.05));var Za={rifle556_16in:{name:'5.56\xD745 \u2014 16" carbine',params:{peakSpl:160,positiveMs:.9,decayB:1.6,crackDb:-3,crackHz:3300,crackMs:14,turbDb:-5,turbMs:120,turbLp:6e3,bodyDb:-7,bodyHz:72,bodyMs:150,subDb:-10,subHz:46,subMs:140,driveDb:12,directivityDb:9,rearLpHz:4500,tailSendDb:4},action:{brightness:1.35,level:1.4,hits:[{timeMs:-3,amp:.3,contactMs:.05,noiseDb:-12},{timeMs:3,amp:1.1,contactMs:.12,noiseDb:-6},{timeMs:40,amp:.5,contactMs:.3,noiseDb:-14},{timeMs:72,amp:1.5,contactMs:.09,noiseDb:-3}]}},rifle556_10in:{name:'5.56\xD745 \u2014 10.3" SBR',params:{peakSpl:163,positiveMs:1.1,decayB:1.5,crackDb:-2,crackHz:2900,crackMs:20,turbDb:-3,turbMs:190,turbLp:5e3,bodyDb:-5,bodyHz:60,bodyMs:200,subDb:-7,subHz:42,subMs:170,driveDb:14,directivityDb:7,rearLpHz:6e3,tailSendDb:5},action:{brightness:1.3,level:1.4,hits:[{timeMs:-3,amp:.3,contactMs:.05,noiseDb:-12},{timeMs:2.5,amp:1.2,contactMs:.12,noiseDb:-6},{timeMs:36,amp:.5,contactMs:.3,noiseDb:-14},{timeMs:64,amp:1.6,contactMs:.09,noiseDb:-3}]}},rifle308_bolt:{name:'.308 Win \u2014 20" bolt action',params:{peakSpl:163,positiveMs:1.4,decayB:1.3,crackDb:-6,crackHz:2200,crackMs:22,turbDb:-6,turbMs:160,turbLp:4200,bodyDb:-4,bodyHz:50,bodyMs:260,subDb:-5,subHz:35,subMs:220,driveDb:13,directivityDb:10,rearLpHz:4e3,tailSendDb:6},action:{brightness:.85,level:.6,hits:[{timeMs:-4,amp:.45,contactMs:.06,noiseDb:-10}]}},pistol9mm:{name:'9\xD719 \u2014 4" pistol',params:{peakSpl:157,positiveMs:.6,decayB:1.6,crackDb:-2,crackHz:1800,crackMs:26,turbDb:-7,turbMs:90,turbLp:4500,bodyDb:-6,bodyHz:95,bodyMs:110,subDb:-14,subHz:55,subMs:90,driveDb:11,directivityDb:6,rearLpHz:6500,precursorDb:-20,tailSendDb:3},action:{brightness:.95,level:1.3,hits:[{timeMs:-2,amp:.25,contactMs:.05,noiseDb:-12},{timeMs:4,amp:.9,contactMs:.1,noiseDb:-6},{timeMs:14,amp:1.1,contactMs:.09,noiseDb:-4}]}},pistol9mm_auto:{name:'9\xD719 \u2014 4" select-fire pistol',params:{peakSpl:157,positiveMs:.6,decayB:1.6,crackDb:-2,crackHz:1900,crackMs:22,turbDb:-6,turbMs:80,turbLp:4800,bodyDb:-6,bodyHz:100,bodyMs:90,subDb:-13,subHz:58,subMs:80,driveDb:11,directivityDb:6,rearLpHz:6500,precursorDb:-20,tailSendDb:3},action:{brightness:1,level:1.3,hits:[{timeMs:-2,amp:.25,contactMs:.05,noiseDb:-12},{timeMs:4,amp:.9,contactMs:.1,noiseDb:-6},{timeMs:12,amp:1,contactMs:.09,noiseDb:-4}]}}},Io={outdoorRange:{name:"Outdoor range (open field, berms)",reverb:{rt60Low:1.6,rt60Mid:1.1,rt60High:.35,xoverLow:300,xoverHigh:2500,size:2.6,diffusion:.75,predelayMs:20,modDepthMs:.4,modRateHz:.4,levelDb:0,toneHz:5e3},criticalDistance:32,ambience:{windSpl:46,windGust:.55,windGustRate:.12,windToneHz:520,rumbleSpl:36,enable:1},farReflectors:[{azimuth:0,distance:140,reflectivity:.35,lowpassHz:2200},{azimuth:75,distance:230,reflectivity:.25,lowpassHz:1800},{azimuth:-80,distance:190,reflectivity:.28,lowpassHz:1800},{azimuth:180,distance:300,reflectivity:.2,lowpassHz:1500}]},indoorRange:{name:"Indoor range (concrete, baffles)",reverb:{rt60Low:1.4,rt60Mid:1.1,rt60High:.6,xoverLow:250,xoverHigh:4e3,size:1.2,diffusion:.8,predelayMs:8,modDepthMs:.3,modRateHz:.6,levelDb:0,toneHz:8e3},criticalDistance:Rr(200*3.5,1.1),ambience:{windSpl:0,windGust:0,windGustRate:.1,windToneHz:500,rumbleSpl:42,enable:1}},forest:{name:"Forest",reverb:{rt60Low:1.8,rt60Mid:1.5,rt60High:.6,xoverLow:300,xoverHigh:3e3,size:4,diffusion:.9,predelayMs:25,modDepthMs:.5,modRateHz:.3,levelDb:0,toneHz:4500},criticalDistance:18,ambience:{windSpl:50,windGust:.7,windGustRate:.18,windToneHz:900,rumbleSpl:30,enable:1}}},Lr=n=>jr(n.criticalDistance),$a={dirt:{levelSpl:112,attackMs:.3,decayMs:90,hpHz:80,lpHz:2500,thumpHz:70,thumpDb:0,thumpMs:70,grainsPerS:900,grainDb:-14,resonance:.7},gravel:{levelSpl:116,attackMs:.2,decayMs:110,hpHz:300,lpHz:7e3,thumpHz:90,thumpDb:-8,thumpMs:40,grainsPerS:2200,grainDb:-6,resonance:.8},concrete:{levelSpl:124,attackMs:.05,decayMs:45,hpHz:900,lpHz:11e3,thumpHz:140,thumpDb:-10,thumpMs:20,grainsPerS:1500,grainDb:-10,resonance:1.1},wood:{levelSpl:118,attackMs:.1,decayMs:70,hpHz:250,lpHz:5e3,thumpHz:180,thumpDb:-2,thumpMs:50,grainsPerS:300,grainDb:-14,resonance:1.6},paper:{levelSpl:98,attackMs:.05,decayMs:25,hpHz:1500,lpHz:9e3,thumpHz:200,thumpDb:-30,thumpMs:10,grainsPerS:0,grainDb:-30,resonance:.7},cardboard:{levelSpl:104,attackMs:.08,decayMs:40,hpHz:400,lpHz:5e3,thumpHz:120,thumpDb:-6,thumpMs:30,grainsPerS:0,grainDb:-30,resonance:1.2}};var jt=class{buf=new Float32Array(4096);len=0;push(e,a){let t=this.len+2+a.length;if(t>this.buf.length){let r=new Float32Array(Math.max(t,this.buf.length*2));r.set(this.buf.subarray(0,this.len)),this.buf=r}this.buf[this.len++]=e,this.buf[this.len++]=a.length;for(let r=0;r<a.length;r++)this.buf[this.len++]=a[r]}take(){if(!this.len)return null;let e=this.buf.slice(0,this.len);return this.len=0,e}},Rt=class{constructor(e,a){this.v=e;this.id=a}setPosition(e,a){this.v.cmd(Q.VOICE_POS,a?[this.id,e[0],e[1],e[2],a[0],a[1],a[2]]:[this.id,e[0],e[1],e[2]])}setTaps(e){this.v.setTaps(this.id,e)}setOcclusion(e,a){this.v.cmd(Q.VOICE_OCCLUSION,[this.id,e,a])}setSend(e){this.v.cmd(Q.VOICE_SEND,[this.id,e])}stop(e=30){this.v.cmd(Q.VOICE_STOP,[this.id,e])}},et=class n{ctx;node;module;params={hearing:Ke(fa),master:Ke(pa),reverb:Ke(ga),ambience:Ke(va)};meters={peakL:-120,peakR:-120,sceneSpl:0,tts:0,compGr:0,limitGr:0,voices:0,reflexGr:0,tinnitus:0,earSpl:0,speedOfSound:343,time:0,cpu:0};zoneSendDb=-30;zone=null;atmosphere={tempC:15,humidity:.6,pressureKpa:101.325};cmdb=new jt;nextId=1;onError=e=>console.error("[vorp]",e);constructor(e,a,t){this.ctx=e,this.node=a,this.module=t,a.port.onmessage=r=>{let s=r.data;if(s.type==="meters"){let i=s.meters;Object.assign(this.meters,{peakL:i[ve.PEAK_L],peakR:i[ve.PEAK_R],sceneSpl:i[ve.SCENE_SPL],tts:i[ve.TTS],compGr:i[ve.COMP_GR],limitGr:i[ve.LIMIT_GR],voices:i[ve.VOICES],reflexGr:i[ve.REFLEX_GR],tinnitus:i[ve.TINNITUS],earSpl:i[ve.EAR_SPL],speedOfSound:i[ve.SPEED_OF_SOUND],time:i[ve.TIME],cpu:s.cpu})}else s.type==="error"&&this.onError(s.message)}}static async create(e){let a=e.context??new AudioContext({latencyHint:e.latencyHint??"interactive"}),[t]=await Promise.all([WebAssembly.compileStreaming(fetch(e.wasmUrl)).catch(async()=>WebAssembly.compile(await(await fetch(e.wasmUrl)).arrayBuffer())),a.audioWorklet.addModule(e.workletUrl)]),r=new AudioWorkletNode(a,"vorp",{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[2],processorOptions:{module:t}});r.connect(a.destination);let s=new n(a,r,t);return s.applyAll(),s}async resume(){this.ctx.state!=="running"&&await this.ctx.resume()}cmd(e,a){this.cmdb.push(e,a)}flush(){let e=this.cmdb.take();e&&this.node.port.postMessage({type:"cmd",data:e},[e.buffer])}setListener(e,a,t){this.cmd(Q.LISTENER,[e[0],e[1],e[2],a[0],a[1],a[2],t[0],t[1],t[2]])}setAtmosphere(e,a,t=101.325){this.atmosphere={tempC:e,humidity:a,pressureKpa:t},this.cmd(Q.ATMOSPHERE,[e,a,t])}setHearing(e){this.setGroup(fa,this.params.hearing,e,Q.HEARING)}setMaster(e){this.setGroup(pa,this.params.master,e,Q.MASTER)}setReverb(e){this.setGroup(ga,this.params.reverb,e,Q.REVERB)}setAmbience(e){this.setGroup(va,this.params.ambience,e,Q.AMBIENCE)}resetHearing(){this.cmd(Q.RESET_HEARING,[])}setZone(e){this.zone=e,this.zoneSendDb=Lr(e),this.setReverb(e.reverb),this.setAmbience(e.ambience)}applyAll(){this.cmd(Q.HEARING,this.params.hearing),this.cmd(Q.MASTER,this.params.master),this.cmd(Q.REVERB,this.params.reverb),this.cmd(Q.AMBIENCE,this.params.ambience),this.cmd(Q.ATMOSPHERE,[this.atmosphere.tempC,this.atmosphere.humidity,this.atmosphere.pressureKpa])}setGroup(e,a,t,r){e.forEach((s,i)=>{t[s.key]!==void 0&&(a[i]=t[s.key])}),this.cmd(r,a)}spawn(e,a,t,r={}){let s=this.nextId++;this.nextId>16e6&&(this.nextId=1);let i=new Float32Array(oe.HEADER+t.length);i[oe.VOICE_ID]=s,i[oe.KIND]=e,i[oe.BUS]=r.bus??Ve.WEAPONS,i[oe.PX]=a[0],i[oe.PX+1]=a[1],i[oe.PX+2]=a[2];let o=r.dir??[0,0,-1];return i[oe.DX]=o[0],i[oe.DX+1]=o[1],i[oe.DX+2]=o[2],i[oe.DIRECTIVITY_DB]=r.directivityDb??0,i[oe.REAR_LP_HZ]=r.rearLpHz??2e4,i[oe.DISTANCE_MODE]=r.distanceMode??0,i[oe.MIN_DIST]=r.minDistance??.1,i[oe.REVERB_SEND_DB]=r.reverbSendDb??this.zoneSendDb,i[oe.SPATIAL]=r.spatial===!1?0:1,i[oe.DELAY_MS]=r.delayMs??0,i.set(t,oe.HEADER),this.cmd(Q.SPAWN,i),new Rt(this,s)}gunshot(e,a,t,r,s={},i={}){let o={...e.params,seed:Math.random()*1e5|0,...s},c=Ke(kr,o),l=-Math.min(0,...e.action.hits.map(x=>x.timeMs)),u=o.tailSendDb??0,h=this.spawn($e.GUNSHOT,a,c,{...i,dir:t,directivityDb:o.directivityDb,rearLpHz:o.rearLpHz,delayMs:(i.delayMs??0)+l,reverbSendDb:(i.reverbSendDb??this.zoneSendDb)+u}),d=null;if(r&&e.action.hits.length){let x=Qa(e.action.brightness),p=e.action.hits.map(w=>({...w,timeMs:w.timeMs+l}));d=this.modal(x,p,r,e.action.level,{...i,delayMs:i.delayMs??0})}return{blast:h,action:d}}modal(e,a,t,r=1,s={}){return this.spawn($e.MODAL,t,Tr(e,a,r,Math.random()*1e5|0),{bus:Ve.IMPACTS,...s})}noise(e,a,t={}){return this.spawn($e.NOISE,a,Ke(Ar,{seed:Math.random()*1e5|0,...e}),{bus:Ve.IMPACTS,...t})}crack(e,a,t,r={}){return this.spawn($e.NWAVE,t,[e,a,20],{distanceMode:1,...r})}sample(e,a,t,r={}){return this.spawn($e.SAMPLE,a,[e,r.rate??1,t,r.loop?1:0,r.offsetS??0],r)}setTaps(e,a){let t=Math.min(a.length,10),r=new Float32Array(2+t*6);r[0]=e,r[1]=t;for(let s=0;s<t;s++){let i=a[s],o=2+s*6;r[o]=i.path,r[o+1]=i.gain,r[o+2]=i.lowpassHz,r[o+3]=i.dir[0],r[o+4]=i.dir[1],r[o+5]=i.dir[2]}this.cmd(Q.VOICE_TAPS,r)}async loadSample(e,a){let t=await this.ctx.decodeAudioData(await(await fetch(a)).arrayBuffer()),r=new Float32Array(t.length);for(let s=0;s<t.numberOfChannels;s++){let i=t.getChannelData(s);for(let o=0;o<i.length;o++)r[o]+=i[o]/t.numberOfChannels}this.node.port.postMessage({type:"sample",id:e,data:r},[r.buffer])}async loadImpulseResponse(e,a=1){let t=await this.ctx.decodeAudioData(await(await fetch(e)).arrayBuffer()),r=t.getChannelData(0).slice(),s=t.numberOfChannels>1?t.getChannelData(1).slice():null;this.node.port.postMessage({type:"ir",left:r,right:s},s?[r.buffer,s.buffer]:[r.buffer]),this.setMaster({convMix:a})}};var at=class{constructor(e,a){this.physics=e;this.urls=a}vorp=null;settings={reflections:!0,probeRays:14,probeDistance:45,occlusion:!0,occlusionDb:-14,occlusionLowpassHz:1100,cracks:!0};surfaces=new Map;listener={position:m.create(),forward:m.create(0,0,-1),up:m.create(0,1,0)};zone=null;zoneOrigin=m.create();pending=[];creating=null;crackDone=new Set;prevProj=new Map;tempC=18;async start(){if(this.vorp)return await this.vorp.resume(),this.vorp;this.creating||(this.creating=et.create({wasmUrl:this.urls.wasm,workletUrl:this.urls.worklet}).then(a=>{this.vorp=a,this.zone&&a.setZone(this.zone),a.setAtmosphere(this.tempC,.55);for(let t of this.pending)t();return this.pending=[],a}));let e=await this.creating;return await e.resume(),e}whenReady(e){this.vorp?e():this.pending.push(e)}setZone(e){this.zone=e,this.vorp?.setZone(e)}surface(e){return this.surfaces.get(e)??{reflection:.8,lowpassHz:6e3}}update(e){e.forward(this.listener.forward),e.up(this.listener.up),m.copy(this.listener.position,e.position);let a=this.vorp;a&&(a.setListener(this.listener.position,this.listener.forward,this.listener.up),this.settings.cracks&&this.physics&&this.trackCracks(a),a.flush())}computeTaps(e,a,t=0){let r=this.physics,s=this.listener.position,i=[],o=m.clone(e),c=a?m.normalize(m.create(),m.clone(a)):null,b=u=>{if(!c||t<=0)return 1;let h=m.dot(c,u);return Math.pow(10,-t*(1-h)*.5/20)},l=(u,h,d,x)=>{let p=m.sub(m.create(),s,u),w=m.length(p);if(w<.2)return;let g=m.dot(p,d);if(Math.abs(g)<1e-5)return;let y=m.dot(m.sub(m.create(),h,u),d)/g;if(y<=0||y>=1)return;let S=m.scaleAndAdd(m.create(),u,p,y),f=m.normalize(m.create(),m.sub(m.create(),S,o)),M=m.normalize(m.create(),m.sub(m.create(),S,s)),A=this.surface(x),v=A.reflection*b(f)/w;i.push({path:w,gain:v,lowpassHz:A.lowpassHz,dir:M,energy:v*v})};if(r&&this.settings.reflections){let u=r.raycast(o,[0,-1,0],50,!1);u&&l(m.scaleAndAdd(m.create(),o,u.normal,-2*m.dot(m.sub(m.create(),o,u.point),u.normal)),u.point,u.normal,u.material);let h=this.settings.probeRays;for(let d=0;d<h;d++){let x=2.399963*d,p=d===h-1?1:d/(h-1)*.9-.25,w=Math.sqrt(Math.max(0,1-p*p)),g=m.create(Math.cos(x)*w,p,Math.sin(x)*w),y=r.raycast(s,g,this.settings.probeDistance,!1);if(!y||y.t<.3)continue;let S=y.normal,f=m.dot(m.sub(m.create(),o,y.point),S);if(f<=0)continue;let M=m.scaleAndAdd(m.create(),o,S,-2*f);l(M,y.point,S,y.material)}}for(let u of this.zone?.farReflectors??[]){let h=u.azimuth*Math.PI/180,d=m.create(this.zoneOrigin[0]+Math.sin(h)*u.distance,o[1],this.zoneOrigin[2]-Math.cos(h)*u.distance),x=m.distance(o,d)+m.distance(d,s),p=m.normalize(m.create(),m.sub(m.create(),d,o)),w=m.normalize(m.create(),m.sub(m.create(),d,s)),g=u.reflectivity*b(p)/x;i.push({path:x,gain:g,lowpassHz:u.lowpassHz,dir:w,energy:g*g})}return i.sort((u,h)=>h.energy-u.energy),i.slice(0,10)}occlusionOf(e){if(!this.physics||!this.settings.occlusion)return null;let a=m.sub(m.create(),this.listener.position,m.clone(e)),t=m.length(a);if(t<.3)return null;m.scale(a,a,1/t);let r=m.scaleAndAdd(m.create(),m.clone(e),a,.05);return this.physics.raycast(r,a,t-.15,!1)?{db:this.settings.occlusionDb,lowpass:this.settings.occlusionLowpassHz}:null}finish(e,a,t,r){e.setTaps(this.computeTaps(a,t,r));let s=this.occlusionOf(a);s&&e.setOcclusion(s.db,s.lowpass)}gunshot(e,a,t,r,s={}){let i=this.vorp;if(!i)return null;let o=i.gunshot(e,a,t,r,s);return this.finish(o.blast,a,t,e.params.directivityDb??9),o.action&&r&&o.action.setTaps(this.computeTaps(r,null,0).slice(0,4)),o}impact(e,a,t=0){let r=this.vorp;if(!r)return null;let s={...$a[e]??$a.dirt};s.levelSpl=(s.levelSpl??110)+t;let i=r.noise(s,a,{bus:Ve.IMPACTS});return this.finish(i,a,null,0),i}modal(e,a,t,r=1,s={}){let i=this.vorp;if(!i)return null;let o=i.modal(e,a,t,r,s);return this.finish(o,t,null,0),o}footstep(e,a){let t=this.vorp;return t?t.noise(e,a,{bus:Ve.ENV,reverbSendDb:t.zoneSendDb}):null}projectileInfo=new Map;trackCracks(e){let a=this.physics,t=this.listener.position,r=Sr(this.tempC),s=a.projectiles(),i=new Set;for(let o of s){i.add(o.id);let c=this.prevProj.get(o.id);if(this.prevProj.set(o.id,m.clone(o.position)),!c||this.crackDone.has(o.id))continue;let b=m.length(o.velocity);if(b<=r*1.01)continue;let l=m.sub(m.create(),o.position,c),u=m.lengthSq(l);if(u<1e-8)continue;let h=m.dot(m.sub(m.create(),t,c),l)/u;if(h<0||h>1)continue;let d=m.scaleAndAdd(m.create(),c,l,h),x=m.distance(d,t);if(x>60||x<.02)continue;let p=m.distance(d,c),w=this.projectileInfo.get(o.userId)??{diameter:.0057,length:.023},g=Pr({mach:b/r,diameter:w.diameter,length:w.length,missDistance:x,c:r}),y=m.normalize(m.create(),l),S=r/b,f=m.scaleAndAdd(m.create(),d,y,-x*Math.sqrt(1-S*S)/Math.max(S,.001));e.crack(g.peakPa,g.duration,f,{bus:Ve.WEAPONS}).setTaps(this.computeTaps(f,null,0)),this.crackDone.add(o.id)}for(let o of[...this.prevProj.keys()])i.has(o)||(this.prevProj.delete(o),this.crackDone.delete(o))}};function Ir(n,e){let a=n.scope(Ne.gl),t=e.settings,r=e.sky.settings;a.number("Sky",r,"sunElevation",{label:"Sun elevation",min:-10,max:90,step:.1,unit:"\xB0"}).number("Sky",r,"sunAzimuth",{label:"Sun azimuth",min:0,max:360,step:.5,unit:"\xB0"}).number("Sky",r,"sunIlluminance",{label:"Solar illuminance (TOA)",min:1e3,max:14e4,step:100,unit:"lux",help:"Extraterrestrial sun illuminance \u2248 128 000 lux. Everything else is derived from this."}).number("Sky",r,"sunAngularDiameter",{label:"Sun angular diameter",min:.1,max:5,step:.01,unit:"\xB0",help:"Real sun: 0.53\xB0. Sets penumbra width of all sun shadows (PCSS) and sun specular size."}).number("Sky",r,"turbidity",{label:"Aerosol (haze)",min:0,max:10,step:.05,help:"Mie density. Hazy/humid days \u2248 2\u20134."}).number("Sky",r,"rayleigh",{label:"Rayleigh density",min:0,max:4,step:.01}).number("Sky",r,"ozone",{label:"Ozone",min:0,max:4,step:.01}).number("Sky",r,"mieG",{label:"Mie anisotropy",min:0,max:.99,step:.01}).number("Sky",r,"groundAlbedo",{label:"Ground albedo (env)",min:0,max:1,step:.01}).number("Sky",r,"multiScatter",{label:"Multiple scattering",min:.5,max:2.5,step:.01}).number("Sky",t.ibl,"intensity",{label:"IBL intensity",min:0,max:3,step:.01,help:"Keep at 1 for physical correctness."}).number("Sky",t.ibl,"specularOcclusion",{label:"Specular occlusion",min:0,max:1,step:.01}).number("Sky",t.ibl,"occludedAmbient",{label:"Bounce fill (occluded sky)",min:0,max:1,step:.01,help:"Fraction of sky ambient still arriving from occluded sky directions. \u22480.1\u20130.2."}).number("Sky",t.ibl,"groundBounce",{label:"Sun ground bounce",min:0,max:2,step:.01,help:"One-bounce sunlight (sun lux \xD7 ground albedo / \u03C0) received where the sky is blocked \u2014 lights pavilion/porch interiors. No real-time GI: \u22480.4\u20130.8 on sunny days."}),a.bool("Global illumination",t.gi,"enabled",{label:"Baked GI probes",help:"Path-traced at load: sky occlusion + multi-bounce sun/sky light. Replaces the analytic fill inside the probe volume."}).number("Global illumination",t.gi,"intensity",{label:"GI intensity",min:0,max:3,step:.01,help:"Keep at 1 for physical correctness."}),a.number("Atmosphere",t.wind,"speed",{label:"Wind speed",min:0,max:20,step:.1,unit:"m/s",help:"Drives foliage sway (and should match the physics/particle wind)."}).number("Atmosphere",t.wind,"bend",{label:"Foliage bend",min:0,max:.2,step:.001,unit:"m per m/s",help:"Tip displacement of a 1 m blade per m/s of wind."}).number("Atmosphere",t.wind,"turbulence",{label:"Foliage flutter",min:0,max:1,step:.01}),a.bool("Clouds",t.clouds,"enabled",{label:"Cloud deck"}).number("Clouds",t.clouds,"coverage",{label:"Coverage",min:0,max:1,step:.01,help:"Fraction of sky covered (scattered \u2248 0.3\u20130.5, broken \u2248 0.6\u20130.85, overcast 1). For overcast also lower the sun illuminance."}).number("Clouds",t.clouds,"density",{label:"Optical density",min:0,max:6,step:.01}).number("Clouds",t.clouds,"altitude",{label:"Altitude",min:300,max:9e3,step:10,unit:"m",help:"Cumulus base \u2248 1\u20132 km."}).number("Clouds",t.clouds,"scale",{label:"Feature size",min:200,max:12e3,step:10,unit:"m"}).number("Clouds",t.clouds,"windSpeed",{label:"Wind aloft",min:0,max:60,step:.1,unit:"m/s"}).number("Clouds",t.clouds,"windDirDeg",{label:"Wind direction",min:0,max:360,step:1,unit:"\xB0"}).number("Clouds",t.clouds,"shadowStrength",{label:"Cloud shadows",min:0,max:1,step:.01,help:"How much a thick cloud dims direct sunlight on the ground."}),a.choice("Exposure",t.exposure,"mode",["auto","manual","camera"],{label:"Mode",help:"auto = eye/camera metering; manual = EV100; camera = aperture/shutter/ISO of the Camera."}).number("Exposure",t.exposure,"ev100",{label:"Manual EV100",min:-6,max:20,step:.1,help:"Sunny 16 \u2248 15, overcast \u2248 12, indoor \u2248 7, night \u2248 0."}).number("Exposure",t.exposure,"compensation",{label:"Compensation",min:-5,max:5,step:.05,unit:"EV"}).number("Exposure",t.exposure,"minEv100",{label:"Min EV100",min:-10,max:20,step:.1}).number("Exposure",t.exposure,"maxEv100",{label:"Max EV100",min:-10,max:22,step:.1}).number("Exposure",t.exposure,"speedUp",{label:"Adapt to bright",min:.05,max:20,step:.05,unit:"EV/s"}).number("Exposure",t.exposure,"speedDown",{label:"Adapt to dark",min:.05,max:20,step:.05,unit:"EV/s"}).number("Exposure",t.exposure,"lowPercent",{label:"Metering low %",min:0,max:.99,step:.01}).number("Exposure",t.exposure,"highPercent",{label:"Metering high %",min:.01,max:1,step:.01}).number("Exposure",t.exposure,"centerWeight",{label:"Centre weighting",min:0,max:1,step:.01}),a.choice("Tone & colour",t.grade,"tonemapper",["agx","aces","neutral","none"],{label:"Tonemapper"}).number("Tone & colour",t.grade,"exposureBias",{label:"Exposure bias",min:-4,max:4,step:.05,unit:"EV"}).number("Tone & colour",t.grade,"contrast",{label:"Contrast",min:.5,max:1.6,step:.01}).number("Tone & colour",t.grade,"saturation",{label:"Saturation",min:0,max:2,step:.01}).number("Tone & colour",t.grade,"temperature",{label:"White balance temp",min:-1,max:1,step:.01}).number("Tone & colour",t.grade,"tint",{label:"White balance tint",min:-1,max:1,step:.01}).number("Tone & colour",t.grade,"lift",{label:"Lift",min:-.2,max:.2,step:.001}).number("Tone & colour",t.grade,"gamma",{label:"Gamma",min:.5,max:2,step:.01}).number("Tone & colour",t.grade,"gain",{label:"Gain",min:.5,max:2,step:.01}).number("Tone & colour",t.grade,"dither",{label:"Dither",min:0,max:2,step:.01}),a.number("Lens & sensor",t.lens,"distortion",{label:"Barrel distortion k1",min:-.6,max:.6,step:.005,help:"Negative = barrel (wide/bodycam lenses), positive = pincushion."}).number("Lens & sensor",t.lens,"distortion2",{label:"Distortion k2",min:-.5,max:.5,step:.005}).number("Lens & sensor",t.lens,"fillZoom",{label:"Distortion fill zoom",min:.5,max:2,step:.005}).number("Lens & sensor",t.lens,"chromaticAberration",{label:"Chromatic aberration",min:0,max:3,step:.01}).number("Lens & sensor",t.lens,"naturalVignette",{label:"Natural vignetting (cos\u2074)",min:0,max:1,step:.01}).number("Lens & sensor",t.lens,"vignette",{label:"Artistic vignette",min:0,max:1,step:.01}).number("Lens & sensor",t.lens,"vignetteRoundness",{label:"Vignette roundness",min:0,max:1,step:.01}).number("Lens & sensor",t.lens,"sharpen",{label:"Sharpening",min:0,max:1,step:.01}).bool("Lens & sensor",t.sensor,"enabled",{label:"Sensor noise"}).number("Lens & sensor",t.sensor,"readNoise",{label:"Read noise",min:0,max:.05,step:1e-4}).number("Lens & sensor",t.sensor,"shotNoise",{label:"Photon shot noise",min:0,max:.05,step:1e-4}).number("Lens & sensor",t.sensor,"gain",{label:"Sensor gain",min:0,max:8,step:.01}).bool("Lens & sensor",t.sensor,"isoCoupled",{label:"Noise follows camera ISO"}).bool("Lens & sensor",t.motionBlur,"enabled",{label:"Motion blur"}).number("Lens & sensor",t.motionBlur,"shutterAngle",{label:"Shutter angle",min:0,max:360,step:1,unit:"\xB0",help:"180\xB0 = film look; bodycams shoot ~ 90\u2013180\xB0."}).number("Lens & sensor",t.motionBlur,"maxPixels",{label:"Max blur",min:4,max:128,step:1,unit:"px"}).number("Lens & sensor",t.motionBlur,"samples",{label:"Blur samples",min:4,max:32,step:1}).bool("Lens & sensor",t.dof,"enabled",{label:"Depth of field"}).number("Lens & sensor",t.dof,"apertureMm",{label:"Aperture / pupil",min:0,max:30,step:.1,unit:"mm",help:"Human pupil \u2248 3 mm in daylight (iron sights: target goes soft), 6\u20137 mm at night. Camera: focal length \xF7 f-number. Bodycams \u2248 1 mm (everything sharp)."}).bool("Lens & sensor",t.dof,"autoFocus",{label:"Auto focus (accommodation)"}).number("Lens & sensor",t.dof,"focusDistance",{label:"Manual focus",min:.1,max:500,step:.1,unit:"m"}).number("Lens & sensor",t.dof,"focusSpeed",{label:"Refocus speed",min:.5,max:30,step:.1,unit:"1/s",help:"Eye accommodation \u2248 4\u20138/s."}).number("Lens & sensor",t.dof,"maxBlurPx",{label:"Max blur radius",min:2,max:40,step:1,unit:"px@1080p"}).number("Lens & sensor",t.dof,"quality",{label:"DOF quality",min:.25,max:3,step:.05}).bool("Lens & sensor",t.bloom,"enabled",{label:"Bloom (lens scatter)"}).number("Lens & sensor",t.bloom,"intensity",{label:"Bloom amount",min:0,max:.3,step:.001,help:"Fraction of light scattered by the lens (physical \u2248 0.02\u20130.05)."}).number("Lens & sensor",t.bloom,"radius",{label:"Bloom radius",min:.5,max:3,step:.01});let s=t.shadows;a.bool("Shadows",s,"enabled",{label:"Sun shadows"}).number("Shadows",s,"cascades",{label:"Cascades",min:1,max:4,step:1}).number("Shadows",s,"resolution",{label:"Resolution",min:512,max:8192,step:512,unit:"px"}).number("Shadows",s,"distance",{label:"Distance",min:10,max:600,step:1,unit:"m"}).number("Shadows",s,"splitLambda",{label:"Split lambda",min:0,max:1,step:.01}).number("Shadows",s,"constantBias",{label:"Depth bias",min:0,max:.002,step:1e-5}).number("Shadows",s,"slopeBias",{label:"Slope bias",min:0,max:8,step:.05}).number("Shadows",s,"normalBias",{label:"Normal bias",min:0,max:6,step:.05,unit:"texels"}).number("Shadows",s,"maxPenumbraTexels",{label:"Max penumbra",min:1,max:48,step:1,unit:"texels"}).number("Shadows",s,"blockerSamples",{label:"PCSS blocker taps",min:1,max:16,step:1}).number("Shadows",s,"pcfSamples",{label:"PCF taps",min:1,max:32,step:1}).number("Shadows",s,"blendFraction",{label:"Cascade blend",min:0,max:.5,step:.01}),a.bool("AO & AA",t.gtao,"enabled",{label:"GTAO"}).number("AO & AA",t.gtao,"radius",{label:"AO radius",min:.05,max:4,step:.01,unit:"m"}).number("AO & AA",t.gtao,"falloff",{label:"AO falloff",min:.05,max:1,step:.01}).number("AO & AA",t.gtao,"power",{label:"AO power",min:.5,max:4,step:.01}).number("AO & AA",t.gtao,"strength",{label:"AO strength",min:0,max:1,step:.01}).number("AO & AA",t.gtao,"slices",{label:"AO slices",min:1,max:8,step:1}).number("AO & AA",t.gtao,"steps",{label:"AO steps",min:2,max:16,step:1}).bool("AO & AA",t.taa,"enabled",{label:"TAA"}).number("AO & AA",t.taa,"feedbackMin",{label:"TAA feedback (moving)",min:0,max:.99,step:.005}).number("AO & AA",t.taa,"feedbackMax",{label:"TAA feedback (still)",min:0,max:.99,step:.005}).number("AO & AA",t,"renderScale",{label:"Render scale",min:.25,max:1.5,step:.05}).number("AO & AA",t,"debugView",{label:"Debug view",min:0,max:9,step:1,help:"1 normals, 2 AO, 3 velocity, 4 depth, 5 luminance (cd/m\xB2 false colour), 6 HDR, 7 sky visibility, 8 ambient diffuse, 9 direct only"}),a.number("Atmosphere",t.fog,"density",{label:"Fog density",min:0,max:.02,step:1e-5,unit:"1/m"}).number("Atmosphere",t.fog,"heightFalloff",{label:"Height falloff",min:.001,max:1,step:.001,unit:"1/m"}).number("Atmosphere",t.fog,"baseHeight",{label:"Base height",min:-50,max:200,step:.5,unit:"m"}).number("Atmosphere",t.fog,"startDistance",{label:"Start distance",min:0,max:200,step:.5,unit:"m"}).number("Atmosphere",t.fog,"inscatter",{label:"Inscatter",min:0,max:4,step:.01}).number("Atmosphere",t.fog,"mieG",{label:"Sun glow anisotropy",min:0,max:.99,step:.01})}function zr(n,e){let a=n.scope(Ne.vorp),t=(r,s,i,o)=>{s.forEach((c,b)=>a.arrayValue(r,i,b,{key:c.key,label:c.label,min:c.min,max:c.max,step:c.step,unit:c.unit,help:c.help,onChange:()=>e.cmd(o,i)}))};t("Hearing",fa,e.params.hearing,Q.HEARING),t("Master",pa,e.params.master,Q.MASTER),t("Reverb",ga,e.params.reverb,Q.REVERB),t("Ambience",va,e.params.ambience,Q.AMBIENCE)}var ya=class n{constructor(e,a,t,r){this.physics=e;this.workerUrl=a;this.wasmUrl=t;let s=typeof navigator<"u"&&navigator.hardwareConcurrency||4;this.threads=Math.max(1,Math.min(r??s-1,12))}workers=[];ready=null;job=0;pending=new Map;threads;meshCount=-1;busy=!1;static supported(){return typeof Worker<"u"}init(){let e=this.physics.staticMeshes;return this.ready&&this.meshCount===e.length?this.ready:(this.dispose(),this.meshCount=e.length,this.ready=Promise.all(Array.from({length:this.threads},()=>new Promise((a,t)=>{let r=new Worker(this.workerUrl,{type:"module",name:"fondaine-gi"});r.onmessage=s=>{let i=s.data;if(i.type==="ready"){a();return}if(i.type==="error"){t(new Error(i.message));for(let c of this.pending.values())c.reject(new Error(i.message));this.pending.clear();return}let o=this.pending.get(i.job);o&&(this.pending.delete(i.job),o.resolve(i))},r.onerror=s=>{t(s),this.failAll(new Error("GI worker crashed: "+(s.message??s)))},r.postMessage({type:"init",wasm:this.wasmUrl,meshes:e}),this.workers.push(r),setTimeout(()=>t(new Error("GI worker did not start within 30 s")),3e4)}))).then(()=>{}).catch(a=>{throw this.dispose(),this.ready=null,a}),this.ready)}call(e,a,t=[]){let r=++this.job;return new Promise((s,i)=>{let o=setTimeout(()=>{this.pending.delete(r)&&i(new Error(`GI worker job timed out after ${n.jobTimeoutMs/1e3} s`))},n.jobTimeoutMs);this.pending.set(r,{resolve:c=>{clearTimeout(o),s(c)},reject:c=>{clearTimeout(o),i(c)}}),e.postMessage({...a,job:r},t)})}static jobTimeoutMs=18e4;failAll(e){for(let a of this.pending.values())a.reject(e);this.pending.clear()}async runSlabs(e,a,t,r){let s=Math.max(1,Math.ceil(e/(this.threads*4))),i=[];for(let b=0;b<e;b+=s)i.push([b,Math.min(e,b+s)]);let o=i.length,c=0;await Promise.all(this.workers.map(async b=>{for(;i.length;){let[l,u]=i.shift();t(await this.call(b,a(l,u))),r?.(++c/o)}}))}async bake(e,a,t){let r=performance.now();this.busy=!0;try{await this.init();let{nx:s,ny:i,nz:o}=e,c=s*i*o,b=s*i,l=new Float32Array(c*3),u=new Uint8Array(c);await this.runSlabs(o,(x,p)=>({type:"pos",grid:e,z0:x,z1:p}),x=>{l.set(x.pos,x.z0*b*3),u.set(x.valid,x.z0*b)},x=>t?.(x*.05,"placing probes"));for(let x of this.workers)x.postMessage({type:"probes",pos:l,valid:u});let h=null;for(let x=0;x<a;x++){let p=new Float32Array(c*12),w=h;await this.runSlabs(o,(g,y)=>({type:"pass",grid:e,pass:x,prev:w,z0:g,z1:y}),g=>p.set(g.data,g.z0*b*12),g=>t?.(.05+.95*((x+g)/a),`bounce ${x+1} of ${a}`)),Un(p,u,s,i,o),h=p}let d=0;for(let x=0;x<c;x++)u[x]||d++;return{data:h,filled:d,ms:performance.now()-r,threads:this.threads}}finally{this.busy=!1}}dispose(){for(let e of this.workers)e.terminate();this.workers=[],this.ready=null,this.pending.clear()}};function Un(n,e,a,t,r){let s=Uint8Array.from(e);for(let i=0;i<4;i++){let o=!1,c=Uint8Array.from(s),b=n.slice();for(let l=0;l<r;l++)for(let u=0;u<t;u++)for(let h=0;h<a;h++){let d=(l*t+u)*a+h;if(c[d])continue;let x=new Float32Array(12),p=0;for(let w=-1;w<=1;w++)for(let g=-1;g<=1;g++)for(let y=-1;y<=1;y++){let S=h+y,f=u+g,M=l+w;if(S<0||f<0||M<0||S>=a||f>=t||M>=r)continue;let A=(M*t+f)*a+S;if(c[A]){for(let v=0;v<12;v++)x[v]+=b[A*12+v];p++}}if(p){for(let w=0;w<12;w++)n[d*12+w]=x[w]/p;s[d]=1,o=!0}}if(!o)break}}var tt=Ze("MeshRenderer"),rt=class n{renderer;scene=new Ca;camera=new Ua;world=new qa;physics;audio;input;tuning=new Ja;devui;canvas;time=0;fixedDt;maxFrameTime=.1;timeScale=1;paused=!1;frame=0;fps=0;acc=0;last=0;running=!1;fpsAcc=0;fpsFrames=0;onUpdate=[];onFixed=[];onLate=[];giBaker;autoRebakeGI=!0;giLast=null;giChangeT=0;constructor(e,a,t){this.canvas=e.canvas,this.renderer=a,this.physics=t,this.fixedDt=1/(e.fixedHz??120);let r=e.baseUrl??"/";this.audio=new at(t,{wasm:e.vorpWasm??`${r}wasm/vorp_dsp.wasm`,worklet:e.vorpWorklet??`${r}vorp/vorp-worklet.js`}),this.input=new _a(e.canvas);let s=i=>new URL(i,typeof location<"u"?location.href:"http://localhost/").href;this.giBaker=ya.supported()&&e.giThreads!==0?new ya(t,s(e.giWorker??`${r}fondaine/gi-worker.js`),s(e.physicsWasm??`${r}wasm/fondaine_physics.wasm`),e.giThreads):null,this.devui=new Xa(this.tuning,e.title??"fondaine"),this.world.onRemoved(tt,(i,o)=>this.scene.remove(o.object)),this.world.onRemoved(ha,(i,o)=>{for(let c of o)c.onDestroy?.()}),Ir(this.tuning,this.renderer),this.devui.statsText=()=>{let i=this.renderer.stats,o=this.audio.vorp?.meters;return`${this.fps.toFixed(0)} fps  ${i.frameMs.toFixed(2)} ms cpu  ${i.drawCalls} draws  ${(i.triangles/1e3).toFixed(0)}k tris
`+(o?`audio: ${o.voices} voices  eardrum ${o.earSpl.toFixed(0)} dB SPL  TTS ${o.tts.toFixed(1)} dB  dsp ${(o.cpu*100).toFixed(1)}%`:"audio: click to start")}}static async create(e){let a=e.baseUrl??"/",[t,r]=await Promise.all([Wa.create(e.canvas,{offscreen:e.offscreen}),Ya.load(e.physicsWasm??`${a}wasm/fondaine_physics.wasm`)]);return new n(e,t,r)}async startAudio(){let e=await this.audio.start();return this.tuning.params.some(a=>a.module===Ne.vorp)||zr(this.tuning,e),e}async bakeGlobalIllumination(e){let a=e.cell??.5,t=Math.max(1,Math.ceil((e.max[0]-e.min[0])/a)),r=Math.max(1,Math.ceil((e.max[1]-e.min[1])/a)),s=Math.max(1,Math.ceil((e.max[2]-e.min[2])/a)),i=e.rays??256,o=e.passes??3,c=t*r*s,b=await this.giGrid({min:[e.min[0],e.min[1],e.min[2]],cell:a,nx:t,ny:r,nz:s,rays:i,albedo:Array.from(e.albedo)});e.onStatus?.(`Path tracing global illumination \xB7 ${c.toLocaleString()} probes`);let l=await this.runGIBake(b,o,(u,h)=>e.onStatus?.(`Path tracing global illumination \xB7 ${h} \xB7 ${Math.round(u*100)}%`));return console.info(`[fondaineGL] GI bake: ${t}\xD7${r}\xD7${s} probes, ${i} rays, ${o} passes, ${l.filled} filled, ${(l.ms/1e3).toFixed(1)} s on ${l.threads} thread(s)`),{probes:c,ms:l.ms,filled:l.filled}}async giGrid(e){let a=Array.from(await this.renderer.readSkySH());return{...e,sunDir:[...this.renderer.sky.sunDir],sunRGB:[...this.renderer.sky.sunIlluminanceRGB()],skySH:a}}skyKey(){let e=this.renderer.sky.settings;return[e.sunElevation,e.sunAzimuth,e.sunIlluminance,e.turbidity,e.rayleigh,e.ozone,e.groundAlbedo].map(a=>Number(a).toFixed(2)).join("|")}async runGIBake(e,a,t){let r;if(this.giBaker)try{r=await this.giBaker.bake(e,a,t)}catch(s){console.warn("[fondaineGL] worker GI bake failed, using the main thread",s),r=this.bakeGISync(e,a)}else r=this.bakeGISync(e,a);return this.renderer.setProbeVolume(r.data,e.nx,e.ny,e.nz,e.min,e.cell),this.giLast={grid:e,passes:a,key:this.skyKey()},r}bakeGISync(e,a){let t=performance.now(),{data:r,filled:s}=this.physics.bakeGI({...e,passes:a});return{data:r,filled:s,ms:performance.now()-t,threads:1}}watchGI(e){if(!this.autoRebakeGI||!this.giLast||!this.giBaker||this.giBaker.busy)return;if(this.skyKey()===this.giLast.key){this.giChangeT=0;return}if(this.giChangeT+=e,this.giChangeT<.6)return;this.giChangeT=0;let a=this.giLast;this.giLast={...a,key:this.skyKey()},this.giGrid({min:a.grid.min,cell:a.grid.cell,nx:a.grid.nx,ny:a.grid.ny,nz:a.grid.nz,rays:Math.min(a.grid.rays,128),albedo:a.grid.albedo}).then(t=>this.runGIBake(t,a.passes)).then(t=>console.info(`[fondaineGL] GI re-baked for the new sun in ${(t.ms/1e3).toFixed(1)} s`)).catch(t=>console.warn("[fondaineGL] GI re-bake failed",t))}createEntity(e,a,t){let r=this.world.spawn(e);return this.world.add(r,ua,new Ka(a,t)),r}transform(e){return this.world.require(e,ua)}addMesh(e,a,t,r={}){let s=a instanceof ee?a:new ee(this.renderer.dev,a),i=new ne(s,t);return i.castShadow=r.castShadow??!0,i.viewmodel=r.viewmodel??!1,i.userData=e,this.scene.add(i),this.world.add(e,tt,{object:i,offset:r.offset??null}),this.syncObject(e),i.resetHistory(),i}addScript(e,a){return a.engine=this,a.entity=e,(this.world.get(e,ha)??this.world.add(e,ha,[])).push(a),a}destroy(e){this.world.despawn(e)}tmp=T.create();syncObject(e){let a=this.world.get(e,tt),t=this.world.get(e,ua);!a||!t||(a.offset?a.object.setTransform(T.multiply(this.tmp,t.getWorld(),a.offset)):a.object.setTransform(t.getWorld()))}start(){if(this.running)return;this.running=!0,this.last=performance.now();let e=a=>{if(!this.running)return;let t=Math.max(0,Math.min((a-this.last)/1e3,this.maxFrameTime));this.last=a,this.step(t),requestAnimationFrame(e)};requestAnimationFrame(e)}stop(){this.running=!1}step(e){e=Math.max(0,e);let a=this.paused?0:e*this.timeScale;this.input.poll(),this.input.actionPressed("tuning")&&(this.devui.toggle(),this.devui.visible&&this.input.unlock());let t=[...this.world.query(ha)];for(let[,s]of t)for(let i of s)i.enabled&&!i._started&&(i._started=!0,i.onStart?.());this.acc+=a;let r=0;for(;this.acc>=this.fixedDt&&r<12;){for(let[,s]of t)for(let i of s)i.enabled&&i.onFixedUpdate?.(this.fixedDt);for(let s of this.onFixed)s(this.fixedDt);this.physics.step(this.fixedDt),this.acc-=this.fixedDt,this.time+=this.fixedDt,r++}r>=12&&(this.acc=0);for(let[,s]of t)for(let i of s)i.enabled&&i.onUpdate?.(a);for(let s of this.onUpdate)s(a);for(let[,s]of t)for(let i of s)i.enabled&&i.onLateUpdate?.(a);for(let s of this.onLate)s(a);for(let[s]of this.world.query(tt))this.syncObject(s);this.watchGI(e),this.audio.update(this.camera),this.renderer.render(this.scene,this.camera,Math.max(e,1e-4)),this.devui.update(),this.input.endFrame(),this.frame++,this.fpsAcc+=e,this.fpsFrames++,this.fpsAcc>.5&&(this.fps=this.fpsFrames/this.fpsAcc,this.fpsAcc=0,this.fpsFrames=0)}};var ue={DEFAULT:0,CONCRETE:1,DIRT:2,GRAVEL:3,WOOD:4,STEEL:5,STEEL_TARGET:6,PAPER:7,CARDBOARD:8,GRASS:9,BRASS:10,POLYMER:11},we=(n,e,a)=>({id:n,name:e,friction:.6,restitution:.2,ricochetAngleDeg:0,ricochetEnergyKeep:.3,reflection:.8,reflectionLowpassHz:6e3,impactSound:"dirt",footstepSound:"dirt",decal:null,decalSize:.03,debris:"dust",debrisColor:[.4,.35,.28],hard:!1,albedo:[.25,.25,.25],...a}),Tc=[we(ue.DEFAULT,"default",{}),we(ue.CONCRETE,"concrete",{friction:.75,restitution:.35,ricochetAngleDeg:12,ricochetEnergyKeep:.25,reflection:.97,reflectionLowpassHz:9e3,impactSound:"concrete",footstepSound:"concrete",decal:2,decalSize:.05,debris:"dust",debrisColor:[.62,.61,.58],hard:!0,albedo:[.36,.35,.33]}),we(ue.DIRT,"dirt",{friction:.8,restitution:.1,reflection:.65,reflectionLowpassHz:2500,impactSound:"dirt",footstepSound:"dirt",decal:5,decalSize:.12,debris:"dust",debrisColor:[.35,.28,.2],albedo:[.2,.15,.1]}),we(ue.GRAVEL,"gravel",{friction:.85,restitution:.15,ricochetAngleDeg:8,reflection:.75,reflectionLowpassHz:4e3,impactSound:"gravel",footstepSound:"gravel",decal:null,debris:"dust",debrisColor:[.5,.48,.45],hard:!0,albedo:[.3,.29,.27]}),we(ue.WOOD,"wood",{friction:.55,restitution:.3,reflection:.85,reflectionLowpassHz:5e3,impactSound:"wood",footstepSound:"wood",decal:1,decalSize:.035,debris:"splinters",debrisColor:[.6,.48,.32],hard:!0,albedo:[.42,.3,.17]}),we(ue.STEEL,"steel",{friction:.45,restitution:.4,ricochetAngleDeg:25,ricochetEnergyKeep:.4,reflection:.98,reflectionLowpassHz:12e3,impactSound:"concrete",footstepSound:"concrete",decal:0,decalSize:.04,debris:"sparks",debrisColor:[1,.7,.35],hard:!0,albedo:[.3,.3,.3]}),we(ue.STEEL_TARGET,"steel target",{friction:.45,restitution:.4,ricochetAngleDeg:0,reflection:.98,reflectionLowpassHz:12e3,impactSound:"concrete",decal:4,decalSize:.07,debris:"sparks",debrisColor:[1,.7,.35],hard:!0,albedo:[.55,.45,.38]}),we(ue.PAPER,"paper",{reflection:.3,reflectionLowpassHz:2e3,impactSound:"paper",decal:3,decalSize:.012,debris:"none",albedo:[.7,.68,.62]}),we(ue.CARDBOARD,"cardboard",{reflection:.4,reflectionLowpassHz:2500,impactSound:"cardboard",decal:3,decalSize:.014,debris:"none",albedo:[.45,.33,.2]}),we(ue.GRASS,"grass",{friction:.7,reflection:.5,reflectionLowpassHz:1800,impactSound:"dirt",footstepSound:"grass",decal:5,decalSize:.1,debris:"dust",debrisColor:[.3,.3,.18],albedo:[.07,.11,.035]}),we(ue.BRASS,"brass",{friction:.35,restitution:.45,hard:!0,impactSound:"concrete",debris:"none",albedo:[.5,.38,.2]}),we(ue.POLYMER,"polymer",{friction:.6,restitution:.3,hard:!0,impactSound:"wood",debris:"none",albedo:[.04,.04,.04]})];var nt={"5.56x45 M855":{name:"5.56\xD745mm M855 62gr",bulletMassKg:.004018,diameterM:.0057,lengthM:.0233,bcG7:.151,muzzleVelocity:948,referenceBarrelM:.508,velocityPerBarrelM:380,powderMassKg:.00168,gasVelocityFactor:1.7,casing:{lengthM:.0448,diameterM:.0095,massKg:.0063}},"5.56x45 Mk262":{name:"5.56\xD745mm Mk262 77gr",bulletMassKg:.00499,diameterM:.0057,lengthM:.0254,bcG7:.186,muzzleVelocity:850,referenceBarrelM:.457,velocityPerBarrelM:340,powderMassKg:.00162,gasVelocityFactor:1.7,casing:{lengthM:.0448,diameterM:.0095,massKg:.0063}},"7.62x51 M118LR":{name:"7.62\xD751mm M118LR 175gr",bulletMassKg:.01134,diameterM:.00782,lengthM:.0315,bcG7:.243,muzzleVelocity:790,referenceBarrelM:.559,velocityPerBarrelM:230,powderMassKg:.00272,gasVelocityFactor:1.6,casing:{lengthM:.0512,diameterM:.0119,massKg:.0123}},"9x19 124gr":{name:"9\xD719mm 124gr FMJ",bulletMassKg:.00803,diameterM:.00901,lengthM:.0155,bcG7:.072,muzzleVelocity:360,referenceBarrelM:.102,velocityPerBarrelM:300,powderMassKg:36e-5,gasVelocityFactor:1.3,casing:{lengthM:.019,diameterM:.0099,massKg:.0037}}};function ea(n,e,a,t={}){let r=e/2,s=n;if(t.straight){let c=r*.955;return a([[0,-s/2],[r*.99,-s/2],[r*.99,-s/2+.0011],[r*.82,-s/2+.0015],[r*.82,-s/2+.0026],[r*.985,-s/2+.0032],[c,s/2],[c*.9,s/2],[c*.9,s/2-.002]],18)}let i=r*.68,o=[[0,-s/2],[r*.98,-s/2],[r*.98,-s/2+.0012],[r*.86,-s/2+.0016],[r*.86,-s/2+.0028],[r,-s/2+.0034],[r*.97,s/2-s*.22],[i,s/2-s*.13],[i,s/2],[i*.85,s/2]];return a(o,16)}var W={BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,UNSIGNED_INT:5125,FLOAT:5126,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,NEAREST:9728,LINEAR:9729,NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987,CLAMP_TO_EDGE:33071,MIRRORED_REPEAT:33648,REPEAT:10497};var Gr={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16};function qn(n){switch(n){case W.BYTE:case W.UNSIGNED_BYTE:return 1;case W.SHORT:case W.UNSIGNED_SHORT:return 2;case W.UNSIGNED_INT:case W.FLOAT:return 4;default:throw new Error(`glTF: unknown accessor componentType ${n}`)}}function aa(n){let e=Gr[n.type];if(!e)throw new Error(`glTF: unknown accessor type "${n.type}"`);return e}function Kn(n,e){let a,t;switch(n){case"MAT2":a=2,t=2;break;case"MAT3":a=3,t=3;break;case"MAT4":a=4,t=4;break;default:a=Gr[n]??1,t=1}let r=a*e,s=t>1?r+3&-4:r;return{rows:a,cols:t,colStride:s,elementSize:s*t}}function _n(n){switch(n){case W.BYTE:return(e,a)=>e.getInt8(a);case W.UNSIGNED_BYTE:return(e,a)=>e.getUint8(a);case W.SHORT:return(e,a)=>e.getInt16(a,!0);case W.UNSIGNED_SHORT:return(e,a)=>e.getUint16(a,!0);case W.UNSIGNED_INT:return(e,a)=>e.getUint32(a,!0);case W.FLOAT:return(e,a)=>e.getFloat32(a,!0);default:throw new Error(`glTF: unknown accessor componentType ${n}`)}}function Jn(n,e){switch(n){case W.BYTE:return Math.max(e/127,-1);case W.UNSIGNED_BYTE:return e/255;case W.SHORT:return Math.max(e/32767,-1);case W.UNSIGNED_SHORT:return e/65535;case W.UNSIGNED_INT:return e/4294967295;default:return e}}function xa(n,e){let a=n.json.bufferViews?.[e];if(!a)throw new Error(`glTF: bufferView ${e} does not exist`);let t=n.buffers[a.buffer];if(!t)throw new Error(`glTF: buffer ${a.buffer} (bufferView ${e}) was not loaded`);let r=a.byteOffset??0;if(r+a.byteLength>t.byteLength)throw new Error(`glTF: bufferView ${e} [${r}, ${r+a.byteLength}) overruns buffer ${a.buffer} (${t.byteLength} bytes)`);return{bytes:t.subarray(r,r+a.byteLength),byteStride:a.byteStride??0}}function Lt(n,e,a,t,r,s,i,o,c){let b=qn(s),l=Kn(r,b),u=a||l.elementSize,h=l.rows*l.cols,d=e+(t>0?(t-1)*u+l.elementSize:0);if(d>n.byteLength)throw new Error(`glTF: accessor data overruns its bufferView (${d} > ${n.byteLength} bytes)`);if(s===W.FLOAT&&o instanceof Float32Array&&u===l.elementSize&&l.cols===1&&(n.byteOffset+e&3)===0){o.set(new Float32Array(n.buffer,n.byteOffset+e,t*h),c);return}let x=new DataView(n.buffer,n.byteOffset,n.byteLength),p=_n(s),w=c;for(let g=0;g<t;g++){let y=e+g*u;for(let S=0;S<l.cols;S++){let f=y+S*l.colStride;for(let M=0;M<l.rows;M++){let A=p(x,f+M*b);o[w++]=i?Jn(s,A):A}}}}function Or(n,e,a,t){let r=n.json.accessors?.[e];if(!r)throw new Error(`glTF: accessor ${e} does not exist`);let s=aa(r);if(r.bufferView!==void 0){let{bytes:o,byteStride:c}=xa(n,r.bufferView);Lt(o,r.byteOffset??0,c,r.count,r.type,r.componentType,t,a,0)}else a.fill(0);let i=r.sparse;if(i&&i.count>0){let o=new Uint32Array(i.count),c=xa(n,i.indices.bufferView);Lt(c.bytes,i.indices.byteOffset??0,0,i.count,"SCALAR",i.indices.componentType,!1,o,0);let b=a instanceof Float32Array?new Float32Array(i.count*s):new Uint32Array(i.count*s),l=xa(n,i.values.bufferView);Lt(l.bytes,i.values.byteOffset??0,0,i.count,r.type,r.componentType,t,b,0);for(let u=0;u<i.count;u++){let h=o[u];if(h>=r.count)throw new Error(`glTF: sparse index ${h} out of range in accessor ${e}`);for(let d=0;d<s;d++)a[h*s+d]=b[u*s+d]}}}function he(n,e){let a=n.json.accessors?.[e];if(!a)throw new Error(`glTF: accessor ${e} does not exist`);let t=new Float32Array(a.count*aa(a));return Or(n,e,t,!!a.normalized&&a.componentType!==W.FLOAT),t}function It(n,e){let a=n.json.accessors?.[e];if(!a)throw new Error(`glTF: accessor ${e} does not exist`);if(a.componentType===W.FLOAT)throw new Error(`glTF: accessor ${e} is FLOAT, expected an integer type`);let t=new Uint32Array(a.count*aa(a));return Or(n,e,t,!1),t}function st(n,e){let a=n.json.accessors?.[e];if(!a)throw new Error(`glTF: accessor ${e} does not exist`);return a}function Nr(n,e,a,t,r=!0){let s=Math.floor(n.length/3),i=new Float64Array(s*3),o=new Float64Array(s*3);for(let b=0;b+2<t.length;b+=3){let l=t[b],u=t[b+1],h=t[b+2];if(l>=s||u>=s||h>=s)continue;let d=n[l*3],x=n[l*3+1],p=n[l*3+2],w=n[u*3]-d,g=n[u*3+1]-x,y=n[u*3+2]-p,S=n[h*3]-d,f=n[h*3+1]-x,M=n[h*3+2]-p,A=a[l*2],v=a[l*2+1],k=a[u*2]-A,P=a[u*2+1]-v,j=a[h*2]-A,E=a[h*2+1]-v,z=k*E-j*P;if(!Number.isFinite(z)||Math.abs(z)<1e-12)continue;let I=1/z,L=(w*E-S*P)*I,N=(g*E-f*P)*I,B=(y*E-M*P)*I,C=(S*k-w*j)*I,D=(f*k-g*j)*I,V=(M*k-y*j)*I;if(Number.isFinite(L+N+B+C+D+V))for(let U of[l,u,h])i[U*3]+=L,i[U*3+1]+=N,i[U*3+2]+=B,o[U*3]+=C,o[U*3+1]+=D,o[U*3+2]+=V}let c=new Float32Array(s*4);for(let b=0;b<s;b++){let l=e[b*3],u=e[b*3+1],h=e[b*3+2],d=Math.hypot(l,u,h);d>0?(l/=d,u/=d,h/=d):(l=0,u=0,h=1);let x=i[b*3],p=i[b*3+1],w=i[b*3+2],g=l*x+u*p+h*w;x-=l*g,p-=u*g,w-=h*g;let y=Math.hypot(x,p,w);y<1e-10&&(Math.abs(l)<.9?(x=0,p=h,w=-u):(x=-h,p=0,w=l),y=Math.hypot(x,p,w)),x/=y,p/=y,w/=y;let S=u*w-h*p,f=h*x-l*w,M=l*p-u*x,v=S*o[b*3]+f*o[b*3+1]+M*o[b*3+2]<0?-1:1;r&&(v=-v),c[b*4]=x,c[b*4+1]=p,c[b*4+2]=w,c[b*4+3]=v}return c}function Fr(n,e){switch(n){case W.TRIANGLES:{let a=e.length-e.length%3;return{indices:a===e.length?e:e.slice(0,a),topology:"triangle-list"}}case W.TRIANGLE_STRIP:{let a=[];for(let t=0;t+2<e.length;t++){let r=e[t],s=e[t+1+(t&1)],i=e[t+2-(t&1)];r===s||s===i||r===i||a.push(r,s,i)}return{indices:Uint32Array.from(a),topology:"triangle-list"}}case W.TRIANGLE_FAN:{let a=[];for(let t=0;t+2<e.length;t++)a.push(e[t+1],e[t+2],e[0]);return{indices:Uint32Array.from(a),topology:"triangle-list"}}case W.LINES:{let a=e.length-e.length%2;return{indices:a===e.length?e:e.slice(0,a),topology:"line-list"}}case W.LINE_STRIP:case W.LINE_LOOP:{let a=[];for(let t=0;t+1<e.length;t++)a.push(e[t],e[t+1]);return n===W.LINE_LOOP&&e.length>2&&a.push(e[e.length-1],e[0]),{indices:Uint32Array.from(a),topology:"line-list"}}case W.POINTS:return{indices:e,topology:"point-list"};default:throw new Error(`glTF: unknown primitive mode ${n}`)}}function Se(n,e,a){let t=n.constructor,r=new t(a.length*e);for(let s=0;s<a.length;s++){let i=a[s]*e,o=s*e;for(let c=0;c<e;c++)r[o+c]=n[i+c]}return r}function Ur(n){let e=n.length/3,a=new Float32Array(e*3);for(let t=0;t+2<e;t+=3){let r=t*3,s=n[r+3]-n[r],i=n[r+4]-n[r+1],o=n[r+5]-n[r+2],c=n[r+6]-n[r],b=n[r+7]-n[r+1],l=n[r+8]-n[r+2],u=i*l-o*b,h=o*c-s*l,d=s*b-i*c,x=Math.hypot(u,h,d);x>0?(u/=x,h/=x,d/=x):(u=0,h=1,d=0);for(let p=0;p<3;p++)a[r+p*3]=u,a[r+p*3+1]=h,a[r+p*3+2]=d}return a}function Cr(n){let e=[1/0,1/0,1/0],a=[-1/0,-1/0,-1/0];for(let t=0;t+2<n.length;t+=3)for(let r=0;r<3;r++){let s=n[t+r];s<e[r]&&(e[r]=s),s>a[r]&&(a[r]=s)}return n.length<3?{min:[0,0,0],max:[0,0,0]}:{min:e,max:a}}var zt=(function(){var n="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuixkbeeeddddillviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WboY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbrl79IV9Rbwq;X8:kdbk:kYi5ud9:du8Jjjjjbcjq9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxcj;abad9Uc;WFbGcjdadca0EhmaialfgPar9Rgoadfhsavaoadz:jjjjbgzceVhHcbhOdndninaeaO9nmeaPax9RaD6mdamaeaO9RaOamfgoae6EgAcsfglc9WGhCaAcethXaxaDfhiaOaeaoaeao6E9RhQalcl4cifcd4hLazcjdfaAfhKcbhYabaOad2fg8AhEaHh3incbh5dnawTmbaxaYcd4fRbbh5kcbh8Eazcjdfhqinaih8Fdndndndna5a8Ecet4ciGgoc9:fPdebdkaPa8F9RaA6mrazcjdfa8EaA2fa8FaAz:jjjjb8Aa8FaAfhixdkazcjdfa8EaA2fcbaAz:kjjjb8Aa8FhixekaPa8F9RaL6mva8FaLfhidnaCTmbaPai9RcK6mbaocdtc:q:G:cjbfcj:G:cjbawEhaczhrcbhlinargoc9Wfghaqfhrdndndndndndnaaa8Fahco4fRbbalcoG4ciGcdtfydbPDbedvivvvlvkar9cb83bwar9cb83bbxlkarcbaiRbdai8Xbb9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbaqaofgrcGfcbaicdfa8J9c8N1:NfghRbbag9cjjjjjw:dg8J9qE86bbarcVfcbaha8J9c8M1:NfghRbbag9cjjjjjl:dg8J9qE86bbarc7fcbaha8J9c8L1:NfghRbbag9cjjjjjd:dg8J9qE86bbarctfcbaha8J9c8K1:NfghRbbag9cjjjjje:dg8J9qE86bbarc91fcbaha8J9c8J1:NfghRbbag9cjjjj;ab:dg8J9qE86bbarc4fcbaha8J9cg1:NfghRbbag9cjjjja:dg8J9qE86bbarc93fcbaha8J9ch1:NfghRbbag9cjjjjz:dgg9qE86bbarc94fcbahag9ca1:NfghRbbai8Xbe9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbarc95fcbaha8J9c8N1:NfgiRbbag9cjjjjjw:dg8J9qE86bbarc96fcbaia8J9c8M1:NfgiRbbag9cjjjjjl:dg8J9qE86bbarc97fcbaia8J9c8L1:NfgiRbbag9cjjjjjd:dg8J9qE86bbarc98fcbaia8J9c8K1:NfgiRbbag9cjjjjje:dg8J9qE86bbarc99fcbaia8J9c8J1:NfgiRbbag9cjjjj;ab:dg8J9qE86bbarc9:fcbaia8J9cg1:NfgiRbbag9cjjjja:dg8J9qE86bbarcufcbaia8J9ch1:NfgiRbbag9cjjjjz:dgg9qE86bbaiag9ca1:NfhixikaraiRblaiRbbghco4g8Ka8KciSg8KE86bbaqaofgrcGfaiclfa8Kfg8KRbbahcl4ciGg8La8LciSg8LE86bbarcVfa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc7fa8Ka8Lfg8KRbbahciGghahciSghE86bbarctfa8Kahfg8KRbbaiRbeghco4g8La8LciSg8LE86bbarc91fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc4fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc93fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc94fa8Kahfg8KRbbaiRbdghco4g8La8LciSg8LE86bbarc95fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc96fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc97fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc98fa8KahfghRbbaiRbigico4g8Ka8KciSg8KE86bbarc99faha8KfghRbbaicl4ciGg8Ka8KciSg8KE86bbarc9:faha8KfghRbbaicd4ciGg8Ka8KciSg8KE86bbarcufaha8KfgrRbbaiciGgiaiciSgiE86bbaraifhixdkaraiRbwaiRbbghcl4g8Ka8KcsSg8KE86bbaqaofgrcGfaicwfa8Kfg8KRbbahcsGghahcsSghE86bbarcVfa8KahfghRbbaiRbeg8Kcl4g8La8LcsSg8LE86bbarc7faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarctfaha8KfghRbbaiRbdg8Kcl4g8La8LcsSg8LE86bbarc91faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc4faha8KfghRbbaiRbig8Kcl4g8La8LcsSg8LE86bbarc93faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc94faha8KfghRbbaiRblg8Kcl4g8La8LcsSg8LE86bbarc95faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc96faha8KfghRbbaiRbvg8Kcl4g8La8LcsSg8LE86bbarc97faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc98faha8KfghRbbaiRbog8Kcl4g8La8LcsSg8LE86bbarc99faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc9:faha8KfghRbbaiRbrgicl4g8Ka8KcsSg8KE86bbarcufaha8KfgrRbbaicsGgiaicsSgiE86bbaraifhixekarai8Pbw83bwarai8Pbb83bbaiczfhikdnaoaC9pmbalcdfhlaoczfhraPai9RcL0mekkaoaC6moaimexokaCmva8FTmvkaqaAfhqa8Ecefg8Ecl9hmbkdndndndnawTmbasaYcd4fRbbgociGPlbedrbkaATmdazaYfh8Fazcjdfhhcbh8EaEhaina8FRbbhraahocbhlinaoahalfRbbgqce4cbaqceG9R7arfgr86bbaoadfhoaAalcefgl9hmbkaacefhaa8Fcefh8FahaAfhha8Ecefg8Ecl9hmbxikkaATmeazaYfhaazcjdfhhcbhoceh8EaKh8FinaEaofhlaa8Vbbhrcbhoinala8FaofRbbcwtahaofRbbgqVc;:FiGce4cbaqceG9R7arfgr87bbaladfhlaQaocefgofmbka8FaXfh8FcdhoaacdfhaahaXfhha8EceGhlcbh8EalmbxdkkaATmbaocl4h8EazaYfRbbhqcwhoa3hlinalRbbaotaqVhqalcefhlaocwfgoca9hmbkcbhhaEh8FaKhainazcjdfahfRbbhrcwhoaahlinalRbbaotarVhralaAfhlaocwfgoca9hmbkara8E94aq7hqcbhoa8Fhlinalaqao486bbalcefhlaocwfgoca9hmbka8Fadfh8FaacefhaahcefghaA9hmbkkaEclfhEa3clfh3aYclfgYad6mbkaza8AaAcufad2fadz:jjjjb8AaAaOfhOaihxaimbkc9:hoxdkcbc99aPax9RakSEhoxekc9:hokavcjqf8Kjjjjbaok:bsesu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecjez:kjjjb8Aav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhDaicefgiarfhqdndnaeci9pmbaqhexekcmcsawceSEhkcbhxcbhmaqhecbhlcbhoindndnaiRbbgrc;Ve0mbavc;abfaoarcu7gPcl4fcsGcitfgwydlhsawydbhzdndnarcsGgwak9pmbavalaPfcsGcdtfydbaxawEhraxawTgHfhxxekdnaeaD9nmbc9:hoxokdndnawcsSmbcehHamawcetfcWfhrxekaecefhrae8SbbgwcFeGhPdndnawcu9mmbarhexekaecvfheaPcFbGhPcrhwdninar8SbbgHcFbGawtaPVhPaHcu9kmearcefhrawcrfgwc8J9hmbxdkkarcefhekcehHaPce4cbaPceG9R7amfhrkarhmkavc;abfaocitfgwarBdbawasBdlavalcdtfarBdbavc;abfaocefcsGcitfgwazBdbawarBdlaocdfhoaHalfhldnadcd9hmbabar87elabas87edabaz87ebabcofhbxdkabarBdwabasBdlabazBdbabcxfhbxekdnarcpe0mbavalaDarcsGfRbbgwcl4gP9RcsGcdtfydbaxcefgsaPEhravalaw9RcsGcdtfydbasaPTgzfgsawcsGgPEhwaPThPdndnadcd9hmbabaw87elabar87edabax87ebcohHxekabawBdwabarBdlabaxBdbcxhHkavalcdtfaxBdbavc;abfaocitfgOarBdbaOaxBdlavalcefglcsGcdtfarBdbavc;abfaocefcsGcitfgOawBdbaOarBdlavalazfglcsGcdtfawBdbavc;abfaocdfcsGcitfgraxBdbarawBdlaocifhoabaHfhbalaPfhlasaPfhxxekdnaeaD9nmbc9:hoxlkaxcbaeRbbgwEgHarc;:eSgrfhsawcsGhOdndnawcl4gAmbascefhzxekashzavalaA9RcsGcdtfydbhskdndnaOmbazcefhxxekazhxavalaw9RcsGcdtfydbhzkdndnarTmbaecefhrxekaecdfhrae8SbegPcFeGhwdnaPcu9kmbaecofhHawcFbGhwcrhedninar8SbbgPcFbGaetawVhwaPcu9kmearcefhraecrfgec8J9hmbkaHhrxekarcefhrkawce4cbawceG9R7amfgmhHkdndnaAcsSmbarhwxekarcefhwar8SbbgecFeGhPdnaecu9kmbarcvfhsaPcFbGhPcrhedninaw8SbbgrcFbGaetaPVhParcu9kmeawcefhwaecrfgec8J9hmbkashwxekawcefhwkaPce4cbaPceG9R7amfgmhskdndnaOcsSmbawhexekawcefheaw8SbbgrcFeGhPdnarcu9kmbawcvfhzaPcFbGhPcrhrdninae8SbbgwcFbGartaPVhPawcu9kmeaecefhearcrfgrc8J9hmbkazhexekaecefhekaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabaz87elabas87edabaH87ebcohrxekabazBdwabasBdlabaHBdbcxhrkavc;abfaocitfgwasBdbawaHBdlavalcdtfaHBdbavc;abfaocefcsGcitfgwazBdbawasBdlavalcefglcsGcdtfasBdbavc;abfaocdfcsGcitfgwaHBdbawazBdlavalaATaAcsSVfglcsGcdtfazBdbalaOTaOcsSVfhlaocifhoabarfhbkaocsGhoalcsGhlaicefgiaq6mbkkcbc99aeaDSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk:4ioiue99dud99dud99dnaeTmbcbhiabhlindndnal8Uebgv:YgoJ:ji:1Salcof8UebgrciVgw:Y:vgDNJbbbZJbbb:;avcu9kEMgq:lJbbb9p9DTmbaq:Ohkxekcjjjj94hkkalclf8Uebhvalcdf8UebhxalarcefciGcetfak87ebdndnax:YgqaDNJbbbZJbbb:;axcu9kEMgm:lJbbb9p9DTmbam:Ohxxekcjjjj94hxkabaiarciGgkfcd7cetfax87ebdndnav:YgmaDNJbbbZJbbb:;avcu9kEMgP:lJbbb9p9DTmbaP:Ohvxekcjjjj94hvkalarcufciGcetfav87ebdndnawaw2:ZgPaPMaoaoN:taqaqN:tamamN:tgoJbbbbaoJbbbb9GE:raDNJbbbZMgD:lJbbb9p9DTmbaD:Ohrxekcjjjj94hrkalakcetfar87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk:Tvirud99eudndnadcl9hmbaeTmeindndnabRbbgiabcefgl8Sbbgvabcdfgo8Sbbgrf9R:YJbbuJabcifgwRbbgdce4adVgDcd4aDVgDcl4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax86bbdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao86bbdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai86bbdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad86bbabclfhbaecufgembxdkkaeTmbindndnab8Vebgiabcdfgl8Uebgvabclfgo8Uebgrf9R:YJbFu9habcofgw8Vebgdce4adVgDcd4aDVgDcl4aDVgDcw4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax87ebdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao87ebdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai87ebdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad87ebabcwfhbaecufgembkkk9teiucbcbyd:K:G:cjbgeabcifc98GfgbBd:K:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkk83dbcj:Gdk8Kbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbc:K:Gdkl8W:qbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuixkbbebeeddddilve9Weeeviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WbwY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbDl79IV9Rbqq:I9Dklbzik94evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaeai86b:q:W:cjbaecitab8Piw83i:q:G:cjbaecefgecjd9hmbkk:SBlEud97dur978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaialfgxar9RhodnadTgmmbavaoad;8qbbkaicefhPcj;abad9Uc;WFbGcjdadca0EhsdndndnadTmbaoadfhzcbhHinaeaH9nmdaxaP9RaD6miabaHad2fgOavcjdfasaeaH9RaHasfae6EgAaAcsfgoc9WGgCSEhXaPaDfhQaocl4cifcd4hLavcj;cbfaCcetfhKavcj;cbfaCci2fhYavcj;cbfaCfh8AcbhEaoc;ab6h3incbh5dnawTmbaPaEcd4fRbbh5kcbh8Eavcj;cbfh8Findndndndna5a8Ecet4ciGgoc9:fPdebdkaxaQ9RaC6mwdnaCTmbavcj;cbfa8EaC2faQaC;8qbbkaQaAfhQxdkaCTmeavcj;cbfa8EaC2fcbaC;8kbxekaxaQ9RaL6moaoclVcbawEhraQaLfhocbhidna3mbaxao9Rc;Gb6mbcbhlina8FalfhidndndndndndnaQalco4fRbbgqciGarfPDbedibledibkaipxbbbbbbbbbbbbbbbbpklbxlkaiaopbblaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLgacdp:meaapmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9oghpxiiiiiiiiiiiiiiiip8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaoclffa8JRb:q:W:cjbfhoxikaiaopbbwaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLpxssssssssssssssssp9oghpxssssssssssssssssp8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaocwffa8JRb:q:W:cjbfhoxdkaiaopbbbpklbaoczfhoxekaiaopbbdaoRbbggcitpbi:q:G:cjbagRb:q:W:cjbggpsaoRbeg8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbagaocdffa8JRb:q:W:cjbfhokdndndndndndnaqcd4ciGarfPDbedibledibkaiczfpxbbbbbbbbbbbbbbbbpklbxlkaiczfaopbblaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLgacdp:meaapmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9oghpxiiiiiiiiiiiiiiiip8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaoclffa8JRb:q:W:cjbfhoxikaiczfaopbbwaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLpxssssssssssssssssp9oghpxssssssssssssssssp8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaocwffa8JRb:q:W:cjbfhoxdkaiczfaopbbbpklbaoczfhoxekaiczfaopbbdaoRbbggcitpbi:q:G:cjbagRb:q:W:cjbggpsaoRbeg8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbagaocdffa8JRb:q:W:cjbfhokdndndndndndnaqcl4ciGarfPDbedibledibkaicafpxbbbbbbbbbbbbbbbbpklbxlkaicafaopbblaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLgacdp:meaapmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9oghpxiiiiiiiiiiiiiiiip8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaoclffa8JRb:q:W:cjbfhoxikaicafaopbbwaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLpxssssssssssssssssp9oghpxssssssssssssssssp8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaocwffa8JRb:q:W:cjbfhoxdkaicafaopbbbpklbaoczfhoxekaicafaopbbdaoRbbggcitpbi:q:G:cjbagRb:q:W:cjbggpsaoRbeg8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbagaocdffa8JRb:q:W:cjbfhokdndndndndndnaqco4arfPDbedibledibkaic8Wfpxbbbbbbbbbbbbbbbbpklbxlkaic8Wfaopbblaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLgacdp:meaapmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9oghpxiiiiiiiiiiiiiiiip8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsaap5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbaiaoclffaqRb:q:W:cjbfhoxikaic8Wfaopbbwaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLpxssssssssssssssssp9oghpxssssssssssssssssp8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsaap5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbaiaocwffaqRb:q:W:cjbfhoxdkaic8Wfaopbbbpklbaoczfhoxekaic8WfaopbbdaoRbbgicitpbi:q:G:cjbaiRb:q:W:cjbgipsaoRbegqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbaiaocdffaqRb:q:W:cjbfhokalc;abfhialcjefaC0meaihlaxao9Rc;Fb0mbkkdnaiaC9pmbaici4hlinaxao9RcK6mwa8FaifhqdndndndndndnaQaico4fRbbalcoG4ciGarfPDbedibledibkaqpxbbbbbbbbbbbbbbbbpkbbxlkaqaopbblaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLgacdp:meaapmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9oghpxiiiiiiiiiiiiiiiip8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spkbbagaoclffa8JRb:q:W:cjbfhoxikaqaopbbwaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLpxssssssssssssssssp9oghpxssssssssssssssssp8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spkbbagaocwffa8JRb:q:W:cjbfhoxdkaqaopbbbpkbbaoczfhoxekaqaopbbdaoRbbggcitpbi:q:G:cjbagRb:q:W:cjbggpsaoRbeg8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpkbbagaocdffa8JRb:q:W:cjbfhokalcdfhlaiczfgiaC6mbkkaohQaoTmoka8FaCfh8Fa8Ecefg8Ecl9hmbkdndndndnawTmbazaEcd4fRbbglciGPlbedwbkaCTmdaXaEfhlavaEfpbdbh8Kcbhoinalavcj;cbfaofpblbg8La8Aaofpblbg8MpmbzeHdOiAlCvXoQrLg8NaKaofpblbgyaYaofpblbg8PpmbzeHdOiAlCvXoQrLgIpmbezHdiOAlvCXorQLgacep9Taapxeeeeeeeeeeeeeeeeghp9op9Hp9rgaa8Kp9Ug8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp9Ug8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp9Ug8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp9Ug8Kp9Abbbaladfgla8Ka8NaIpmwDKYqk8AExm35Ps8E8Fgacep9Taaahp9op9Hp9rgap9Ug8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp9Ug8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp9Ug8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp9Ug8Kp9Abbbaladfgla8Ka8La8MpmwKDYq8AkEx3m5P8Es8Fg8Laya8PpmwKDYq8AkEx3m5P8Es8Fg8MpmbezHdiOAlvCXorQLgacep9Taaahp9op9Hp9rgap9Ug8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp9Ug8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp9Ug8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp9Ug8Kp9Abbbaladfgla8Ka8La8MpmwDKYqk8AExm35Ps8E8Fgacep9Taaahp9op9Hp9rgap9Ughp9Abbbaladfglahaaaapmlvorlvorlvorlvorp9Ughp9AbbbaladfglahaaaapmwDqkwDqkwDqkwDqkp9Ughp9AbbbaladfglahaaaapmxmPsxmPsxmPsxmPsp9Ug8Kp9AbbbaladfhlaoczfgoaC6mbxikkaCTmeaXaEfhlavaEfpbdbh8Kcbhoinalavcj;cbfaofpblbg8La8Aaofpblbg8MpmbzeHdOiAlCvXoQrLg8NaKaofpblbgyaYaofpblbg8PpmbzeHdOiAlCvXoQrLgIpmbezHdiOAlvCXorQLgacep:neaapxebebebebebebebebghp9op:bep9rgaa8Kp:oeg8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp:oeg8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp:oeg8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp:oeg8Kp9Abbbaladfgla8Ka8NaIpmwDKYqk8AExm35Ps8E8Fgacep:neaaahp9op:bep9rgap:oeg8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp:oeg8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp:oeg8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp:oeg8Kp9Abbbaladfgla8Ka8La8MpmwKDYq8AkEx3m5P8Es8Fg8Laya8PpmwKDYq8AkEx3m5P8Es8Fg8MpmbezHdiOAlvCXorQLgacep:neaaahp9op:bep9rgap:oeg8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp:oeg8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp:oeg8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp:oeg8Kp9Abbbaladfgla8Ka8La8MpmwDKYqk8AExm35Ps8E8Fgacep:neaaahp9op:bep9rgap:oeghp9Abbbaladfglahaaaapmlvorlvorlvorlvorp:oeghp9AbbbaladfglahaaaapmwDqkwDqkwDqkwDqkp:oeghp9AbbbaladfglahaaaapmxmPsxmPsxmPsxmPsp:oeg8Kp9AbbbaladfhlaoczfgoaC6mbxdkkaCTmbaXaEfhrcbhocbalcl4gl9Rc8FGhiavaEfpbdbhhinaravcj;cbfaofpblbg8Ka8Aaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaKaofpblbg8NaYaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLgaaip:Reaaalp:Tep9qgaahp9rghp9Abbbaradfgrahaaaapmlvorlvorlvorlvorp9rghp9AbbbaradfgrahaaaapmwDqkwDqkwDqkwDqkp9rghp9AbbbaradfgrahaaaapmxmPsxmPsxmPsxmPsp9rghp9Abbbaradfgraha8Ma8PpmwDKYqk8AExm35Ps8E8Fgaaip:Reaaalp:Tep9qgap9rghp9Abbbaradfgrahaaaapmlvorlvorlvorlvorp9rghp9AbbbaradfgrahaaaapmwDqkwDqkwDqkwDqkp9rghp9AbbbaradfgrahaaaapmxmPsxmPsxmPsxmPsp9rghp9Abbbaradfgraha8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLgaaip:Reaaalp:Tep9qgap9rghp9Abbbaradfgrahaaaapmlvorlvorlvorlvorp9rghp9AbbbaradfgrahaaaapmwDqkwDqkwDqkwDqkp9rghp9AbbbaradfgrahaaaapmxmPsxmPsxmPsxmPsp9rghp9Abbbaradfgraha8Ka8LpmwDKYqk8AExm35Ps8E8Fgaaip:Reaaalp:Tep9qgap9rghp9Abbbaradfgrahaaaapmlvorlvorlvorlvorp9rghp9AbbbaradfgrahaaaapmwDqkwDqkwDqkwDqkp9rghp9AbbbaradfgrahaaaapmxmPsxmPsxmPsxmPsp9rghp9AbbbaradfhraoczfgoaC6mbkkaEclfgEad6mbkdnaXavcjdf9hmbaAad2goTmbaOavcjdfao;8qbbkdnammbavaXaAcufad2fad;8qbbkaAaHfhHc9:hoaQhPaQmbxlkkaeTmbaDalfhrcbhocuhlinaralaD9RglfaD6mdasaeao9Raoasfae6Eaofgoae6mbkaial9RhPkcbc99axaP9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaokwbz:bjjjbkpPesu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecje;8kbav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhDaicefgiarfhqdndnaeci9pmbaqhexekcmcsawceSEhkcbhxcbhmaqhecbhlcbhoindndnaiRbbgrc;Ve0mbavc;abfaoarcu7gPcl4fcsGcitfgwydlhsawydbhzdndnarcsGgwak9pmbavalaPfcsGcdtfydbaxawEhraxawTgHfhxxekdnaeaD9nmbc9:hoxokdndnawcsSmbcehHamawcetfcWfhrxekaecefhrae8SbbgwcFeGhPdndnawcu9mmbarhexekaecvfheaPcFbGhPcrhwdninar8SbbgHcFbGawtaPVhPaHcu9kmearcefhrawcrfgwc8J9hmbxdkkarcefhekcehHaPce4cbaPceG9R7amfhrkarhmkavc;abfaocitfgwarBdbawasBdlavalcdtfarBdbavc;abfaocefcsGcitfgwazBdbawarBdlaocdfhoaHalfhldnadcd9hmbabar87elabas87edabaz87ebabcofhbxdkabarBdwabasBdlabazBdbabcxfhbxekdnarcpe0mbavalaDarcsGfRbbgwcl4gP9RcsGcdtfydbaxcefgsaPEhravalaw9RcsGcdtfydbasaPTgzfgsawcsGgPEhwaPThPdndnadcd9hmbabaw87elabar87edabax87ebcohHxekabawBdwabarBdlabaxBdbcxhHkavalcdtfaxBdbavc;abfaocitfgOarBdbaOaxBdlavalcefglcsGcdtfarBdbavc;abfaocefcsGcitfgOawBdbaOarBdlavalazfglcsGcdtfawBdbavc;abfaocdfcsGcitfgraxBdbarawBdlaocifhoabaHfhbalaPfhlasaPfhxxekdnaeaD9nmbc9:hoxlkaxcbaeRbbgwEgHarc;:eSgrfhsawcsGhOdndnawcl4gAmbascefhzxekashzavalaA9RcsGcdtfydbhskdndnaOmbazcefhxxekazhxavalaw9RcsGcdtfydbhzkdndnarTmbaecefhrxekaecdfhrae8SbegPcFeGhwdnaPcu9kmbaecofhHawcFbGhwcrhedninar8SbbgPcFbGaetawVhwaPcu9kmearcefhraecrfgec8J9hmbkaHhrxekarcefhrkawce4cbawceG9R7amfgmhHkdndnaAcsSmbarhwxekarcefhwar8SbbgecFeGhPdnaecu9kmbarcvfhsaPcFbGhPcrhedninaw8SbbgrcFbGaetaPVhParcu9kmeawcefhwaecrfgec8J9hmbkashwxekawcefhwkaPce4cbaPceG9R7amfgmhskdndnaOcsSmbawhexekawcefheaw8SbbgrcFeGhPdnarcu9kmbawcvfhzaPcFbGhPcrhrdninae8SbbgwcFbGartaPVhPawcu9kmeaecefhearcrfgrc8J9hmbkazhexekaecefhekaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabaz87elabas87edabaH87ebcohrxekabazBdwabasBdlabaHBdbcxhrkavc;abfaocitfgwasBdbawaHBdlavalcdtfaHBdbavc;abfaocefcsGcitfgwazBdbawasBdlavalcefglcsGcdtfasBdbavc;abfaocdfcsGcitfgwaHBdbawazBdlavalaATaAcsSVfglcsGcdtfazBdbalaOTaOcsSVfhlaocifhoabarfhbkaocsGhoalcsGhlaicefgiaq6mbkkcbc99aeaDSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk;Toio97eue97aec98Ghedndnadcl9hmbaeTmecbhdinababpbbbgicKp:RecKp:Sep;6eglaicwp:RecKp:Sep;6ealp;Geaiczp:RecKp:Sep;6egvp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgwp9op9rp;Keglpxbb;:9cbb;:9cbb;:9cbb;:9calalp;Meaoaop;Meavaravawp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFbbbFbbbFbbbFbbbp9oaipxbbbFbbbFbbbFbbbFp9op9qalavp;Mearp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaoavp;Mearp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgDaDpbbbgipxbbbbbbFFbbbbbbFFgwp9oabpbbbgoaipmbediwDqkzHOAKY8AEgvczp:Reczp:Sep;6eglaoaipmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eavczp:Sep;6egvp;Gealp;Gep;Kep;Legipxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgqp9op9rp;Keglpxb;:FSb;:FSb;:FSb;:FSalalp;Meaiaip;Meavaravaqp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbp9oaiavp;Mearp;Keczp:Rep9qgialavp;Mearp;KepxFFbbFFbbFFbbFFbbp9oglpmwDKYqk8AExm35Ps8E8Fp9qpkbbabaoawp9oaialpmbezHdiOAlvCXorQLp9qpkbbabcafhbadclfgdae6mbkkk;2ileue97euo97dnaec98GgiTmbcbheinabcKfpx:ji:1S:ji:1S:ji:1S:ji:1SabpbbbglabczfgvpbbbgopmlvorxmPsCXQL358E8Fgrczp:Segwpxibbbibbbibbbibbbp9qp;6egDp;NegqaDaDp;MegDaDp;KealaopmbediwDqkzHOAKY8AEgDczp:Reczp:Sep;6eglalp;MeaDczp:Sep;6egoaop;Mearczp:Reczp:Sep;6egrarp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jep;Mepxbbn0bbn0bbn0bbn0gDp;KepxFFbbFFbbFFbbFFbbgkp9oaqaop;MeaDp;Keczp:Rep9qgoaqalp;MeaDp;Keakp9oaqarp;MeaDp;Keczp:Rep9qgDpmwDKYqk8AExm35Ps8E8Fglp5eawclp:RegqpEi:T:j83ibavalp5baqpEd:T:j83ibabcwfaoaDpmbezHdiOAlvCXorQLgDp5eaqpEe:T:j83ibabaDp5baqpEb:T:j83ibabcafhbaeclfgeai6mbkkkuee97dnadcd4ae2c98GgeTmbcbhdinababpbbbgicwp:Recwp:Sep;6eaicep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbabczfhbadclfgdae6mbkkk:Sodw97euaec98Ghedndnadcl9hmbaeTmecbhdinabpxbbuJbbuJbbuJbbuJabpbbbgicKp:TeglaicYp:Tep9qgvcdp:Teavp9qgvclp:Teavp9qgop;6ep;Negvaicwp:RecKp:SegraipxFbbbFbbbFbbbFbbbgwp9ogDp:Uep;6ep;Mepxbbn0bbn0bbn0bbn0gqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9oavaDarp:Xeaiczp:RecKp:Segip:Uep;6ep;Meaqp;Keawp9op9qavaDaraip:Uep:Xep;6ep;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qavaoalcep:Rep9oalpxebbbebbbebbbebbbp9op9qp;6ep;Meaqp;KecKp:Rep9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgkpxbFu9hbFu9hbFu9hbFu9habpbbbglakpbbbgrpmlvorxmPsCXQL358E8Fgvczp:TegqavcHp:Tep9qgicdp:Teaip9qgiclp:Teaip9qgicwp:Teaip9qgop;6ep;NegialarpmbediwDqkzHOAKY8AEgDpxFFbbFFbbFFbbFFbbglp9ograDczp:Segwp:Ueavczp:Reczp:SegDp:Xep;6ep;Mepxbbn0bbn0bbn0bbn0gvp;Kealp9oaiarawaDp:Uep:Xep;6ep;Meavp;Keczp:Rep9qgwaiaoaqcep:Rep9oaqpxebbbebbbebbbebbbp9op9qp;6ep;Meavp;Keczp:ReaiaDarp:Uep;6ep;Meavp;Kealp9op9qgipmwDKYqk8AExm35Ps8E8FpkbbabawaipmbezHdiOAlvCXorQLpkbbabcafhbadclfgdae6mbkkk9teiucbcbydj:G:cjbgeabcifc98GfgbBdj:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkxebcj:Gdklz:zbb",a=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),t=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var r=WebAssembly.validate(a)?o(e):o(n),s,i=WebAssembly.instantiate(r,{}).then(function(g){s=g.instance,s.exports.__wasm_call_ctors()});function o(g){for(var y=new Uint8Array(g.length),S=0;S<g.length;++S){var f=g.charCodeAt(S);y[S]=f>96?f-97:f>64?f-39:f+4}for(var M=0,S=0;S<g.length;++S)y[M++]=y[S]<60?t[y[S]]:(y[S]-60)*64+y[++S];return y.buffer.slice(0,M)}function c(g,y,S,f,M,A,v){var k=g.exports.sbrk,P=f+3&-4,j=k(P*M),E=k(A.length),z=new Uint8Array(g.exports.memory.buffer);z.set(A,E);var I=y(j,f,M,E,A.length);if(I==0&&v&&v(j,P,M),S.set(z.subarray(j,j+f*M)),k(j-k(0)),I!=0)throw new Error("Malformed buffer data: "+I)}var b={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp",COLOR:"meshopt_decodeFilterColor"},l={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},u=[],h=0;function d(g){var y={object:new Worker(g),pending:0,requests:{}};return y.object.onmessage=function(S){var f=S.data;y.pending-=f.count,y.requests[f.id][f.action](f.value),delete y.requests[f.id]},y}function x(g){for(var y="self.ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(r)+"]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = "+w.name+";"+c.toString()+w.toString(),S=new Blob([y],{type:"text/javascript"}),f=URL.createObjectURL(S),M=u.length;M<g;++M)u[M]=d(f);for(var M=g;M<u.length;++M)u[M].object.postMessage({});u.length=g,URL.revokeObjectURL(f)}function p(g,y,S,f,M){for(var A=u[0],v=1;v<u.length;++v)u[v].pending<A.pending&&(A=u[v]);return new Promise(function(k,P){var j=new Uint8Array(S),E=++h;A.pending+=g,A.requests[E]={resolve:k,reject:P},A.object.postMessage({id:E,count:g,size:y,source:j,mode:f,filter:M},[j.buffer])})}function w(g){var y=g.data;self.ready.then(function(S){if(!y.id)return self.close();try{var f=new Uint8Array(y.count*y.size);c(S,S.exports[y.mode],f,y.count,y.size,y.source,S.exports[y.filter]),self.postMessage({id:y.id,count:y.count,action:"resolve",value:f},[f.buffer])}catch(M){self.postMessage({id:y.id,count:y.count,action:"reject",value:M})}})}return{ready:i,supported:!0,useWorkers:function(g){x(g)},decodeVertexBuffer:function(g,y,S,f,M){c(s,s.exports.meshopt_decodeVertexBuffer,g,y,S,f,s.exports[b[M]])},decodeIndexBuffer:function(g,y,S,f){c(s,s.exports.meshopt_decodeIndexBuffer,g,y,S,f)},decodeIndexSequence:function(g,y,S,f){c(s,s.exports.meshopt_decodeIndexSequence,g,y,S,f)},decodeGltfBuffer:function(g,y,S,f,M,A){c(s,s.exports[l[M]],g,y,S,f,s.exports[b[A]])},decodeGltfBufferAsync:function(g,y,S,f,M){return u.length>0?p(g,y,S,l[f],b[M]):i.then(function(){var A=new Uint8Array(g*y);return c(s,s.exports[l[f]],A,g,y,S,s.exports[b[M]]),A})}}})();var Xn=["KHR_mesh_quantization","KHR_texture_transform","KHR_materials_emissive_strength","KHR_materials_unlit","KHR_lights_punctual","KHR_materials_ior","KHR_materials_specular","KHR_materials_clearcoat","KHR_materials_transmission","EXT_meshopt_compression","KHR_meshopt_compression"],Dr=["KHR_draco_mesh_compression","KHR_texture_basisu"],Yn=1179937895,Qn=1313821514,Zn=5130562;async function Vr(n,e={}){let a=e.fetch??globalThis.fetch;if(!a)throw new Error("glTF: no fetch implementation available");let t=await a(n);if(!t.ok)throw new Error(`glTF: failed to fetch ${n}: ${t.status} ${t.statusText}`);let r=await t.arrayBuffer();return ns(r,$n(n),e)}function $n(n){let e=n.search(/[?#]/),a=e>=0?n.slice(0,e):n,t=a.lastIndexOf("/");return t>=0?a.slice(0,t+1):""}function es(n,e){if(/^(data:|blob:|[a-z][a-z0-9+.-]*:\/\/)/i.test(n)||n.startsWith("/")||!e)return n;try{return new URL(n,e).href}catch{return e+n}}function as(n){let e=n.indexOf(",");if(e<0)throw new Error("glTF: malformed data: URI");let a=n.slice(5,e),t=n.slice(e+1),r=/;base64$/i.test(a),s=a.replace(/;base64$/i,"").split(";")[0]||"application/octet-stream";if(r){let i=atob(t),o=new Uint8Array(i.length);for(let c=0;c<i.length;c++)o[c]=i.charCodeAt(c);return{bytes:o,mimeType:s}}return{bytes:new TextEncoder().encode(decodeURIComponent(t)),mimeType:s}}function ts(n){return n instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&n instanceof SharedArrayBuffer}function rs(n){if(ArrayBuffer.isView(n)){let r=n;n=r.buffer.slice(r.byteOffset,r.byteOffset+r.byteLength)}if(!ts(n))return{json:n};let e=new Uint8Array(n),a=new DataView(n);if(e.byteLength>=12&&a.getUint32(0,!0)===Yn){let r=a.getUint32(4,!0);if(r!==2)throw new Error(`glTF: unsupported GLB version ${r}`);let s=Math.min(a.getUint32(8,!0),e.byteLength),i=12,o,c;for(;i+8<=s;){let b=a.getUint32(i,!0),l=a.getUint32(i+4,!0);if(i+=8,i+b>s)throw new Error("glTF: GLB chunk overruns file");let u=e.subarray(i,i+b);l===Qn&&!o?o=JSON.parse(new TextDecoder().decode(u)):l===Zn&&!c&&(c=u),i+=b+(4-b%4)%4}if(!o)throw new Error("glTF: GLB has no JSON chunk");return{json:o,glbBin:c}}let t=new TextDecoder().decode(e);return t.charCodeAt(0)===65279&&(t=t.slice(1)),{json:JSON.parse(t)}}async function ns(n,e,a){let{json:t,glbBin:r}=rs(n);if(!t||typeof t!="object"||!t.asset)throw new Error('glTF: missing "asset" property \u2014 not a glTF 2.0 file');if(parseInt(String(t.asset.minVersion??t.asset.version??"2"),10)!==2)throw new Error(`glTF: unsupported version ${t.asset.version} (only 2.x)`);let i=t.extensionsUsed??[],o=t.extensionsRequired??[];for(let v of o){if(Dr.includes(v))throw new Error(`glTF: required extension "${v}" is not supported by fondaineGL's loader (decompress the asset, e.g. with gltf-transform, first)`);if(!Xn.includes(v))throw new Error(`glTF: required extension "${v}" is not supported`)}let c=a.fetch??(typeof globalThis.fetch=="function"?globalThis.fetch.bind(globalThis):void 0),b=async v=>{if(v.startsWith("data:"))return as(v);if(!c)throw new Error(`glTF: cannot load external resource "${v}" \u2014 no fetch available`);let k=es(v,e),P=await c(k);if(!P.ok)throw new Error(`glTF: failed to fetch ${k}: ${P.status} ${P.statusText}`);return{bytes:new Uint8Array(await P.arrayBuffer()),mimeType:P.headers.get("content-type")??""}},l=await Promise.all((t.buffers??[]).map(async(v,k)=>{let P=v.extensions?.EXT_meshopt_compression??v.extensions?.KHR_meshopt_compression;if(v.uri===void 0&&P?.fallback)return new Uint8Array(v.byteLength);if(v.uri===void 0){if(k!==0||!r)throw new Error(`glTF: buffer ${k} has no uri and no GLB BIN chunk`);return r}let{bytes:j}=await b(v.uri);if(j.byteLength<v.byteLength)throw new Error(`glTF: buffer ${k} is ${j.byteLength} bytes, expected ${v.byteLength}`);return j})),u=(t.bufferViews??[]).filter(v=>v.extensions?.EXT_meshopt_compression||v.extensions?.KHR_meshopt_compression);if(u.length){await zt.ready;for(let v of u){let k=v.extensions.EXT_meshopt_compression??v.extensions.KHR_meshopt_compression,P=l[k.buffer].subarray(k.byteOffset??0,(k.byteOffset??0)+k.byteLength),j=new Uint8Array(k.count*k.byteStride);zt.decodeGltfBuffer(j,k.count,k.byteStride,P,k.mode,k.filter),l.push(j),v.buffer=l.length-1,v.byteOffset=0,v.byteLength=j.byteLength,k.mode==="ATTRIBUTES"&&(v.byteStride=k.byteStride),delete v.extensions.EXT_meshopt_compression,delete v.extensions.KHR_meshopt_compression}}let h={json:t,buffers:l},d=await Promise.all((t.images??[]).map(async(v,k)=>{if(v.bufferView!==void 0){let{bytes:E}=xa(h,v.bufferView);return{name:v.name??`image${k}`,mimeType:v.mimeType??Br(E),data:E}}if(v.uri===void 0)throw new Error(`glTF: image ${k} has neither uri nor bufferView`);let{bytes:P,mimeType:j}=await b(v.uri);return{name:v.name??v.uri.slice(0,64),mimeType:v.mimeType??(j.startsWith("image/")?j:Br(P)),data:P}})),x=[];if((a.decodeImages??!0)&&typeof globalThis.createImageBitmap=="function"&&typeof Blob<"u"){let v=await Promise.all(d.map(k=>createImageBitmap(new Blob([k.data],{type:k.mimeType}),{colorSpaceConversion:"none",premultiplyAlpha:"none"})));x.push(...v)}let p=ds(t),w=(t.materials??[]).map((v,k)=>is(t,k)),g=(t.meshes??[]).map((v,k)=>bs(h,k,w)),y=us(t,p),S=(t.skins??[]).map((v,k)=>{let P=v.joints.length,j;if(v.inverseBindMatrices!==void 0){if(j=he(h,v.inverseBindMatrices),j.length<P*16)throw new Error(`glTF: skin ${k} inverseBindMatrices has ${j.length/16} matrices for ${P} joints`);j.length>P*16&&(j=j.slice(0,P*16))}else{j=new Float32Array(P*16);for(let E=0;E<P;E++)j[E*16]=j[E*16+5]=j[E*16+10]=j[E*16+15]=1}return{name:v.name??`skin${k}`,joints:v.joints.slice(),inverseBindMatrices:j,skeleton:v.skeleton}}),f=(t.animations??[]).map((v,k)=>hs(h,k)),M=(t.cameras??[]).map((v,k)=>({name:v.name??`camera${k}`,type:v.type==="orthographic"?"orthographic":"perspective",perspective:v.perspective?{...v.perspective}:void 0,orthographic:v.orthographic?{...v.orthographic}:void 0})),A=(t.scenes??[]).map((v,k)=>({name:v.name??`scene${k}`,nodes:(v.nodes??[]).slice()}));return A.length===0&&y.length>0&&(A=[{name:"scene0",nodes:y.map((v,k)=>v.parent<0?k:-1).filter(v=>v>=0)}]),{meshes:g,materials:w,images:x,nodes:y,scenes:A,scene:t.scene??0,skins:S,animations:f,extensionsUsed:i.slice(),imageData:d,cameras:M,lights:p,extensionsRequired:o.slice()}}function Br(n){return n[0]===137&&n[1]===80&&n[2]===78&&n[3]===71?"image/png":n[0]===255&&n[1]===216?"image/jpeg":n[0]===82&&n[1]===73&&n[2]===70&&n[3]===70&&n[8]===87&&n[9]===69?"image/webp":n[0]===71&&n[1]===73&&n[2]===70?"image/gif":n[4]===102&&n[5]===116&&n[6]===121&&n[7]===112?"image/avif":"application/octet-stream"}var q=(n,e)=>typeof n=="number"&&Number.isFinite(n)?n:e,Te=(n,e)=>n?.extensions?.[e];function ss(n,e){let a=e!==void 0?n.samplers?.[e]:void 0,t=b=>b===W.CLAMP_TO_EDGE?"clamp-to-edge":b===W.MIRRORED_REPEAT?"mirror-repeat":"repeat",r=a?.minFilter,s=a?.magFilter,i=r===void 0||r>=W.NEAREST_MIPMAP_NEAREST,o=r===W.NEAREST||r===W.NEAREST_MIPMAP_NEAREST||r===W.NEAREST_MIPMAP_LINEAR?"nearest":"linear",c=r===W.NEAREST_MIPMAP_NEAREST||r===W.LINEAR_MIPMAP_NEAREST?"nearest":"linear";return{magFilter:s===W.NEAREST?"nearest":"linear",minFilter:o,mipmap:i,mipmapFilter:c,wrapS:t(a?.wrapS),wrapT:t(a?.wrapT)}}function Pe(n,e){if(!e)return;let a=n.textures?.[e.index];if(!a)return;if(Te(a,"KHR_texture_basisu")&&a.source===void 0)throw new Error('glTF: extension "KHR_texture_basisu" is not supported (texture has no fallback source)');let t=a.source;if(t===void 0)for(let o of["EXT_texture_webp","EXT_texture_avif"]){let c=Te(a,o);if(c&&typeof c.source=="number"){t=c.source;break}}if(t===void 0)return;let r=e.texCoord??0,s,i=Te(e,"KHR_texture_transform");if(i){let o=i.offset,c=i.scale;s={offset:[q(o?.[0],0),q(o?.[1],0)],rotation:q(i.rotation,0),scale:[q(c?.[0],1),q(c?.[1],1)]},typeof i.texCoord=="number"&&(r=i.texCoord)}return{image:t,sampler:ss(n,a.sampler),texCoord:r,transform:s}}function is(n,e){let a=n.materials[e],t=a.pbrMetallicRoughness??{},r=t.baseColorFactor??[1,1,1,1],s=a.emissiveFactor??[0,0,0],i=a.alphaMode==="MASK"||a.alphaMode==="BLEND"?a.alphaMode:"OPAQUE",o={name:a.name??`material${e}`,baseColorFactor:[q(r[0],1),q(r[1],1),q(r[2],1),q(r[3],1)],baseColorTexture:Pe(n,t.baseColorTexture),metallicFactor:q(t.metallicFactor,1),roughnessFactor:q(t.roughnessFactor,1),metallicRoughnessTexture:Pe(n,t.metallicRoughnessTexture),normalTexture:Pe(n,a.normalTexture),normalScale:q(a.normalTexture?.scale,1),occlusionTexture:Pe(n,a.occlusionTexture),occlusionStrength:q(a.occlusionTexture?.strength,1),emissiveTexture:Pe(n,a.emissiveTexture),emissiveFactor:[q(s[0],0),q(s[1],0),q(s[2],0)],emissiveStrength:1,alphaMode:i,alphaCutoff:q(a.alphaCutoff,.5),doubleSided:!!a.doubleSided,unlit:!!Te(a,"KHR_materials_unlit")},c=Te(a,"KHR_materials_emissive_strength");c&&(o.emissiveStrength=q(c.emissiveStrength,1));let b=Te(a,"KHR_materials_ior");b&&(o.ior=q(b.ior,1.5));let l=Te(a,"KHR_materials_specular");if(l){o.specularFactor=q(l.specularFactor,1);let d=l.specularColorFactor;o.specularColorFactor=[q(d?.[0],1),q(d?.[1],1),q(d?.[2],1)],o.specularTexture=Pe(n,l.specularTexture),o.specularColorTexture=Pe(n,l.specularColorTexture)}let u=Te(a,"KHR_materials_clearcoat");u&&(o.clearcoat={factor:q(u.clearcoatFactor,0),roughness:q(u.clearcoatRoughnessFactor,0)},o.clearcoatTexture=Pe(n,u.clearcoatTexture),o.clearcoatRoughnessTexture=Pe(n,u.clearcoatRoughnessTexture),o.clearcoatNormalTexture=Pe(n,u.clearcoatNormalTexture));let h=Te(a,"KHR_materials_transmission");return h&&(o.transmission=q(h.transmissionFactor,0),o.transmissionTexture=Pe(n,h.transmissionTexture)),o}function os(n){for(let e=0;e+3<n.length;e+=4){let a=n[e]+n[e+1]+n[e+2]+n[e+3];if(a>1e-8){let t=1/a;n[e]*=t,n[e+1]*=t,n[e+2]*=t,n[e+3]*=t}else n[e]=1,n[e+1]=0,n[e+2]=0,n[e+3]=0}}function cs(n,e,a){if(e===4)return n;let t=new Float32Array(a*4);for(let r=0;r<a;r++)t[r*4]=n[r*3],t[r*4+1]=n[r*3+1],t[r*4+2]=n[r*3+2],t[r*4+3]=1;return t}function ls(n,e,a,t){for(let k of Object.keys(e.extensions??{}))if(Dr.includes(k))throw new Error(`glTF: mesh ${a} uses unsupported extension "${k}"`);let r=e.attributes;if(r.POSITION===void 0)throw new Error(`glTF: mesh ${a} primitive has no POSITION attribute`);let s=st(n,r.POSITION),i=s.count,o=he(n,r.POSITION),c=r.NORMAL!==void 0?he(n,r.NORMAL):void 0,b=r.TANGENT!==void 0?he(n,r.TANGENT):void 0,l=r.TEXCOORD_0!==void 0?he(n,r.TEXCOORD_0):void 0,u=r.TEXCOORD_1!==void 0?he(n,r.TEXCOORD_1):void 0,h;if(r.COLOR_0!==void 0){let k=st(n,r.COLOR_0);h=cs(he(n,r.COLOR_0),aa(k),k.count)}let d;if(r.JOINTS_0!==void 0){let k=It(n,r.JOINTS_0);d=new Uint16Array(k.length);for(let P=0;P<k.length;P++)d[P]=k[P]}let x=r.WEIGHTS_0!==void 0?he(n,r.WEIGHTS_0):void 0;x&&os(x);let p;e.targets&&e.targets.length&&(p=e.targets.map(k=>({positions:k.POSITION!==void 0?he(n,k.POSITION):void 0,normals:k.NORMAL!==void 0?he(n,k.NORMAL):void 0,tangents:k.TANGENT!==void 0?he(n,k.TANGENT):void 0})));let w;if(e.indices!==void 0)w=It(n,e.indices);else{w=new Uint32Array(i);for(let k=0;k<i;k++)w[k]=k}for(let k=0;k<w.length;k++)if(w[k]>=i)throw new Error(`glTF: mesh ${a} index ${w[k]} out of range (${i} vertices)`);let g=Fr(e.mode??W.TRIANGLES,w),y=g.indices,S=i,f=!1;if(!c&&g.topology==="triangle-list"){if(o=Se(o,3,y),b&&(b=Se(b,4,y)),l&&(l=Se(l,2,y)),u&&(u=Se(u,2,y)),h&&(h=Se(h,4,y)),d&&(d=Se(d,4,y)),x&&(x=Se(x,4,y)),p){let k=y;p=p.map(P=>({positions:P.positions?Se(P.positions,3,k):void 0,normals:P.normals?Se(P.normals,3,k):void 0,tangents:P.tangents?Se(P.tangents,3,k):void 0}))}S=y.length,y=new Uint32Array(S);for(let k=0;k<S;k++)y[k]=k;c=Ur(o),f=!0}let M=e.material??-1,A=!1;if(!b&&c&&l&&g.topology==="triangle-list"&&M>=0){let k=t[M];if(k?.normalTexture){let P=k.normalTexture.texCoord===1&&u?u:l;b=Nr(o,c,P,y),A=!0}}let v;return s.min&&s.max&&s.min.length>=3&&s.max.length>=3&&!s.sparse&&!s.normalized?v={min:[s.min[0],s.min[1],s.min[2]],max:[s.max[0],s.max[1],s.max[2]]}:v=Cr(o),{positions:o,normals:c,tangents:b,uvs:l,uvs2:u,colors:h,joints:d,weights:x,indices:y,material:M,bounds:v,morphTargets:p,topology:g.topology,vertexCount:S,generatedNormals:f,generatedTangents:A}}function bs(n,e,a){let t=n.json.meshes[e];return{name:t.name??`mesh${e}`,primitives:t.primitives.map(r=>ls(n,r,e,a)),weights:t.weights?.slice()}}function ds(n){return(Te(n,"KHR_lights_punctual")?.lights??[]).map(t=>{let r=t.type==="directional"||t.type==="spot"?t.type:"point",s=t.color,i={type:r,color:[q(s?.[0],1),q(s?.[1],1),q(s?.[2],1)],intensity:q(t.intensity,1)};if(typeof t.name=="string"&&(i.name=t.name),typeof t.range=="number"&&t.range>0&&(i.range=t.range),r==="spot"){let o=t.spot??{};i.innerConeAngle=q(o.innerConeAngle,0),i.outerConeAngle=q(o.outerConeAngle,Math.PI/4)}return i})}function ms(n){let e=Math.hypot(n[0],n[1],n[2]),a=Math.hypot(n[4],n[5],n[6]),t=Math.hypot(n[8],n[9],n[10]);n[0]*(n[5]*n[10]-n[6]*n[9])-n[4]*(n[1]*n[10]-n[2]*n[9])+n[8]*(n[1]*n[6]-n[2]*n[5])<0&&(e=-e);let s=e?1/e:0,i=a?1/a:0,o=t?1/t:0,c=n[0]*s,b=n[1]*s,l=n[2]*s,u=n[4]*i,h=n[5]*i,d=n[6]*i,x=n[8]*o,p=n[9]*o,w=n[10]*o,g,y,S,f,M=c+h+w;if(M>0){let v=Math.sqrt(M+1)*2;f=.25*v,g=(d-p)/v,y=(x-l)/v,S=(b-u)/v}else if(c>h&&c>w){let v=Math.sqrt(1+c-h-w)*2;f=(d-p)/v,g=.25*v,y=(b+u)/v,S=(x+l)/v}else if(h>w){let v=Math.sqrt(1+h-c-w)*2;f=(x-l)/v,g=(b+u)/v,y=.25*v,S=(d+p)/v}else{let v=Math.sqrt(1+w-c-h)*2;f=(b-u)/v,g=(x+l)/v,y=(d+p)/v,S=.25*v}let A=Math.hypot(g,y,S,f)||1;return{translation:[n[12],n[13],n[14]],rotation:[g/A,y/A,S/A,f/A],scale:[e,a,t]}}function us(n,e){let t=(n.nodes??[]).map((r,s)=>{let i=[0,0,0],o=[0,0,0,1],c=[1,1,1];if(r.matrix&&r.matrix.length===16)({translation:i,rotation:o,scale:c}=ms(r.matrix));else{if(r.translation&&(i=[q(r.translation[0],0),q(r.translation[1],0),q(r.translation[2],0)]),r.rotation){let u=r.rotation,h=Math.hypot(u[0],u[1],u[2],u[3])||1;o=[u[0]/h,u[1]/h,u[2]/h,u[3]/h]}r.scale&&(c=[q(r.scale[0],1),q(r.scale[1],1),q(r.scale[2],1)])}let b={name:r.name??`node${s}`,children:(r.children??[]).slice(),parent:-1,mesh:r.mesh,skin:r.skin,camera:r.camera,translation:i,rotation:o,scale:c};r.weights&&(b.weights=r.weights.slice());let l=Te(r,"KHR_lights_punctual");return l&&typeof l.light=="number"&&e[l.light]&&(b.light={...e[l.light]}),b});return t.forEach((r,s)=>{for(let i of r.children){if(!t[i])throw new Error(`glTF: node ${s} references missing child ${i}`);if(t[i].parent>=0)throw new Error(`glTF: node ${i} has multiple parents`);t[i].parent=s}}),t}function hs(n,e){let a=n.json.animations[e],t=0,r=a.samplers.map((i,o)=>{let c=he(n,i.input),b=he(n,i.output),l=i.interpolation==="STEP"||i.interpolation==="CUBICSPLINE"?i.interpolation:"LINEAR",u=c.length,h=l==="CUBICSPLINE"?3:1,d=u>0?Math.round(b.length/(u*h)):aa(st(n,i.output));if(u>0&&d*u*h!==b.length)throw new Error(`glTF: animation ${e} sampler ${o}: output length ${b.length} does not match ${u} keys`);return u>0&&(t=Math.max(t,c[u-1])),{input:c,output:b,interpolation:l,components:d}}),s=[];for(let i of a.channels){let o=i.target.path;i.target.node!==void 0&&(o!=="translation"&&o!=="rotation"&&o!=="scale"&&o!=="weights"||s.push({node:i.target.node,path:o,sampler:i.sampler}))}return{name:a.name??`animation${e}`,channels:s,samplers:r,duration:t}}function Hr(n){return n+3&-4}function Wr(n,e={}){let a=[],t=0,r=[],s=[],i=[],o=[],c=[],b=new Map,l=(f,M)=>{let A=new Uint8Array(f.buffer,f.byteOffset,f.byteLength),v=t,k=Hr(A.byteLength),P=new Uint8Array(k);return P.set(A),a.push(P),t+=k,r.push({buffer:0,byteOffset:v,byteLength:A.byteLength,...M?{target:M}:{}}),r.length-1},u=(f,M,A,v,k=!1)=>{let P=l(f,v),j=f.length/A,E={bufferView:P,componentType:f instanceof Float32Array?5126:5125,count:j,type:M};if(k){let z=Array(A).fill(1/0),I=Array(A).fill(-1/0);for(let L=0;L<j;L++)for(let N=0;N<A;N++){let B=f[L*A+N];B<z[N]&&(z[N]=B),B>I[N]&&(I[N]=B)}E.min=z,E.max=I}return s.push(E),s.length-1};for(let f of n){let M=f.object.mesh.source;if(!M)continue;let A=f.object.material,v=b.get(A);v===void 0&&(c.push({name:A.name,pbrMetallicRoughness:{baseColorFactor:Array.from(A.baseColor),metallicFactor:A.metallic,roughnessFactor:A.roughness},doubleSided:A.doubleSided,...A.alphaMode==="mask"?{alphaMode:"MASK",alphaCutoff:A.alphaCutoff}:{}}),v=c.length-1,b.set(A,v));let k={POSITION:u(Float32Array.from(M.positions),"VEC3",3,34962,!0),NORMAL:u(Float32Array.from(M.normals),"VEC3",3,34962)};M.uvs&&(k.TEXCOORD_0=u(Float32Array.from(M.uvs),"VEC2",2,34962)),M.tangents&&(k.TANGENT=u(Float32Array.from(M.tangents),"VEC4",4,34962));let P=u(Uint32Array.from(M.indices),"SCALAR",1,34963);i.push({name:f.name,primitives:[{attributes:k,indices:P,material:v}]}),o.push({name:f.name,mesh:i.length-1,matrix:Array.from(f.object.transform)})}let h={asset:{version:"2.0",generator:e.generator??"fondaine oAxis"},scene:0,scenes:[{nodes:o.map((f,M)=>M)}],nodes:o,meshes:i,materials:c,accessors:s,bufferViews:r,buffers:[{byteLength:t}]},d=new TextEncoder().encode(JSON.stringify(h)),x=Hr(d.byteLength),p=20+x+8+t,w=new ArrayBuffer(p),g=new DataView(w),y=new Uint8Array(w);g.setUint32(0,1179937895,!0),g.setUint32(4,2,!0),g.setUint32(8,p,!0),g.setUint32(12,x,!0),g.setUint32(16,1313821514,!0),y.set(d,20);for(let f=d.byteLength;f<x;f++)y[20+f]=32;let S=20+x;g.setUint32(S,t,!0),g.setUint32(S+4,5130562,!0),S+=8;for(let f of a)y.set(f,S),S+=f.byteLength;return w}function fs(n){return T.fromRotationTranslationScale(T.create(),n.rotation,n.translation,n.scale)}function Et(n){let e=n.nodes.map(()=>T.create()),a=(t,r)=>{let s=fs(n.nodes[t]);r?T.multiply(e[t],r,s):T.copy(e[t],s);for(let i of n.nodes[t].children)a(i,e[t])};for(let t=0;t<n.nodes.length;t++)n.nodes[t].parent<0&&a(t,null);return e}function it(n,e,a={}){let t=n.textures,r=new Map,s=(d,x,p=!1)=>{if(!d)return null;let w=e.images[d.image];if(!w)return null;let g=`${d.image}|${x?1:0}`,y=r.get(g);return y||(y=t.fromImage(w,{srgb:x,normalMap:p,label:e.imageData[d.image]?.name}),r.set(g,y)),y},i=e.materials.map((d,x)=>{let p=d.metallicRoughnessTexture,w=!!d.occlusionTexture&&!!p&&d.occlusionTexture.image===p.image,g=s(p??d.occlusionTexture,!1),y=d.baseColorTexture?.transform,S=new be({name:d.name||`gltf-mat-${x}`,baseColorMap:s(d.baseColorTexture,!0),normalMap:s(d.normalTexture,!1,!0),ormMap:g,emissiveMap:s(d.emissiveTexture,!0),baseColor:[...d.baseColorFactor],metallic:d.metallicFactor,roughness:d.roughnessFactor,normalScale:d.normalScale,occlusionStrength:w||!p&&d.occlusionTexture?d.occlusionStrength:0,emissive:d.emissiveFactor,emissiveLuminance:d.emissiveFactor[0]+d.emissiveFactor[1]+d.emissiveFactor[2]>0?100*(d.emissiveStrength??1):0,alphaMode:d.alphaMode==="MASK"?"mask":d.alphaMode==="BLEND"?"blend":"opaque",alphaCutoff:d.alphaCutoff,doubleSided:d.doubleSided,unlit:d.unlit,uvScale:y?y.scale:[1,1],uvOffset:y?y.offset:[0,0],uvRotation:y?y.rotation:0,specular:d.specularFactor!==void 0?.5*d.specularFactor:.5});return p&&!w&&!d.occlusionTexture&&(S.occlusionStrength=0),a.material&&(S=a.material(S,x)),S}),o=new be({name:"gltf-default",baseColor:[.8,.8,.8,1],roughness:.6,metallic:0}),c=Et(e),b=[],l=new Map,u=[1/0,1/0,1/0],h=[-1/0,-1/0,-1/0];return e.nodes.forEach((d,x)=>{if(d.mesh!==void 0)for(let p of e.meshes[d.mesh].primitives){if(p.topology!=="triangle-list")continue;let w=l.get(p);if(!w){let y=new ge(p.positions,p.normals??new Float32Array(p.positions.length),p.uvs??new Float32Array(p.vertexCount*2),p.indices);p.tangents&&(y.tangents=p.tangents),p.joints&&p.weights&&(y.joints=p.joints,y.weights=p.weights),w=new ee(n.dev,y.tangents?y:y.computeTangents(),{label:`${e.meshes[d.mesh].name}`,keepSource:a.keepSource}),l.set(p,w)}let g=c[x];b.push({node:x,nodeName:d.name,mesh:w,material:p.material>=0?i[p.material]:o,world:g,skinned:d.skin!==void 0&&!!p.joints,primitive:p});for(let y=0;y<8;y++){let S=[y&1?p.bounds.max[0]:p.bounds.min[0],y&2?p.bounds.max[1]:p.bounds.min[1],y&4?p.bounds.max[2]:p.bounds.min[2]],f=g[0]*S[0]+g[4]*S[1]+g[8]*S[2]+g[12],M=g[1]*S[0]+g[5]*S[1]+g[9]*S[2]+g[13],A=g[2]*S[0]+g[6]*S[1]+g[10]*S[2]+g[14];u[0]=Math.min(u[0],f),u[1]=Math.min(u[1],M),u[2]=Math.min(u[2],A),h[0]=Math.max(h[0],f),h[1]=Math.max(h[1],M),h[2]=Math.max(h[2],A)}}}),{asset:e,drawables:b,materials:i,nodeWorld:c,bounds:{min:u,max:h}}}function qr(n,e,a=T.create(),t={}){return e.drawables.map(r=>{let s=new ne(r.mesh,r.material,T.multiply(T.create(),a,r.world));return s.castShadow=t.castShadow??!0,s.viewmodel=t.viewmodel??!1,n.add(s),s})}var Zl=G.create(),$l=G.create(),eb=G.create();var tb=new Float32Array(64);var ib=T.create(),ob=T.create();var cb={t:new Float32Array(3),r:new Float32Array(4),s:new Float32Array(3)},lb=new Int32Array(1024);var hb=G.create(),fb=G.create(),pb=G.create(),gb=new Float32Array(4),vb=new Float32Array(4);var wb=T.create(),Mb=T.create(),kb=T.create(),Ab=m.create(),Sb=m.create(),Pb=m.create(),Tb=m.create(),jb=m.create(),Rb=m.create(),Lb=m.create(),Ib=m.create(),zb=m.create(),Eb=m.create(),Gb=G.create(),Ob=G.create(),Nb=G.create(),Fb=G.create(),Ub=G.create(),Cb=m.create(1,0,0),Bb=m.create(0,0,1);function ae(n,e,a=.0015,t=[]){return Qe(n,e,{bevel:a,bevelSegments:2,holes:t}).rotateY(Math.PI/2)}function Gt(n,e,a,t=8e-4,r=[]){return Qe(n,e,{bevel:t,bevelSegments:2,holes:r}).translate(0,0,a)}function ze(n,e,a,t=0,r=0,s=28){let i=Math.abs(a-e);return me(n,n,i,s).rotateX(Math.PI/2).translate(r,t,(e+a)/2)}function wa(n,e,a,t,r,s=16){return me(n,n,e,s).rotateZ(Math.PI/2).translate(a,t,r)}function ra(n,e,a,t,r,s=20){return me(n,n,e,s).rotateX(Math.PI/2).translate(a,t,r)}function Ma(n,e,a=0,t=32){return Ie(n,t).rotateX(-Math.PI/2).translate(0,a,e)}var ta=class{constructor(e){this.renderer=e}buckets=new Map;add(e,a,t={}){let r=`${a.id}|${t.magazine?1:0}${t.bolt?1:0}${t.trigger?1:0}${t.selector?1:0}`,s=this.buckets.get(r)??{m:a,geoms:[],flags:t};return s.geoms.push(e.tangents?e:e.computeTangents()),this.buckets.set(r,s),this}finish(){let e=[];for(let a of this.buckets.values()){let t=new ne(new ee(this.renderer.dev,ge.merge(a.geoms),{label:a.m.name,keepSource:!0}),a.m);e.push({object:t,local:T.create(),...a.flags})}return e}};var fe={textureSize:2048,detail:1.5},Kr="fondaine.oaxis.settings";try{let n=typeof localStorage<"u"?localStorage.getItem(Kr):null;n&&Object.assign(fe,JSON.parse(n))}catch{}function _r(n){let e=n.scope(Ne.oaxis),a=()=>{try{localStorage.setItem(Kr,JSON.stringify(fe))}catch{}};e.number("Models",fe,"textureSize",{label:"Texture resolution",min:256,max:4096,step:256,unit:"px",help:"Procedural PBR texture size for weapons/props. Applies on reload (load time grows with it).",onChange:a}).number("Models",fe,"detail",{label:"Geometry detail",min:.5,max:3,step:.25,help:"Radial segments and bevel smoothness multiplier. Applies on reload.",onChange:a})}function le(n){return Math.max(6,Math.round(n*fe.detail))}var Ot={slideRear:.088,slideFront:-.0975,slideTop:.0165,slideBottom:-.0115,slideWidth:.0255,frameWidth:.0265,sightLine:.0225,rearSightZ:.082,frontSightZ:-.088,slideTravel:.034,portZ0:-.003,portZ1:-.04};function Jr(n,e={}){let a=n.synth,t=e.textureSize??fe.textureSize,r=Ot,s=a.material("parkerized",{size:t,tileMeters:.12,color:e.slideColor??[.032,.034,.037],wear:.14,seed:41,bumpMm:.015},{name:"c15-slide-nitride",edgeWear:.7,edgeWearRadius:.0035}),i=a.material("parkerized",{size:512,tileMeters:.08,color:[.05,.048,.045],wear:.45,seed:42},{name:"c15-barrel",edgeWear:.8}),o=a.material("polymer",{size:t,tileMeters:.1,color:e.frameColor??[.028,.028,.03],seed:43},{name:"c15-frame",edgeWear:.35}),c=a.material("polymer",{size:t,tileMeters:.05,color:e.frameColor??[.028,.028,.03],extra:.95,bumpMm:.3,seed:44},{name:"c15-stipple"}),b=a.material("parkerized",{size:512,tileMeters:.06,color:[.018,.018,.019],wear:.06,seed:45},{name:"c15-steel-black"}),l=a.material("parkerized",{size:256,tileMeters:.02,color:[.11,.11,.115],wear:.6,seed:46},{name:"c15-pins"}),u=a.material("parkerized",{size:512,tileMeters:.1,color:[.025,.025,.027],wear:.3,seed:47},{name:"c15-mag-body",edgeWear:.6}),h=a.material("brass",{size:512,tileMeters:.03,seed:48},{name:"c15-brass"}),d=new be({name:"c15-sight-white",baseColor:[.82,.82,.78,1],roughness:.55,metallic:0}),x=e.frontSight==="white"?d:new be({name:"c15-tritium",baseColor:[.75,.9,.72,1],roughness:.3,metallic:0,emissive:[.35,1,.4],emissiveLuminance:40}),p=new ta(n),w={bolt:!0},g={magazine:!0},y=-r.slideRear,S=-r.slideFront,f=-r.portZ0,M=-r.portZ1,A=.004,v=[[y,r.slideBottom],[S-.0075,r.slideBottom],[S,-.0085],[S,.0115],[S-.0045,r.slideTop],[M,r.slideTop],[M,A],[f,A],[f,r.slideTop],[y+.003,r.slideTop],[y,r.slideTop-.004]];p.add(ae(v,r.slideWidth,.0028),s,w);let k=.0088;p.add(ae([[f,A],[M,A],[M,r.slideTop],[f,r.slideTop]],k,.0012).translate(-r.slideWidth/2+k/2,0,0),s,w),p.add(re(r.slideWidth-k-.001,6e-4,Math.abs(r.portZ1-r.portZ0)-.001).translate(k/2,A+4e-4,(r.portZ0+r.portZ1)/2),b,w),p.add(ie(9e-4,.0034,.017,3e-4).translate(r.slideWidth/2+2e-4,.0098,.007),b,w);let P=r.slideWidth/2+15e-5;for(let X of[-1,1]){for(let _=0;_<8;_++)p.add(re(5e-4,.0185,.0011).rotateX(.24).translate(X*P,.0022,.053+_*.0034),b,w);for(let _=0;_<5;_++)p.add(re(5e-4,.015,.0011).rotateX(.24).translate(X*P,.0032,-.058-_*.0034),b,w)}p.add(wa(.0026,.0016,-r.slideWidth/2-7e-4,.004,.074),b,{bolt:!0,selector:!0}),p.add(ie(.0016,.011,.0045,7e-4).translate(-r.slideWidth/2-9e-4,.004+.0055,.074),b,{bolt:!0,selector:!0}),p.add(ie(.0175,.019,.0012,.002).translate(0,.0025,r.slideRear+4e-4),b,w);let j=r.sightLine,E=r.slideTop-4e-4,z=.0018,I=.0029,L=[[-.0105,E],[.0105,E],[.0105,j-.0012],[.0092,j],[z,j],[z,j-I],[-z,j-I],[-z,j],[-.0092,j],[-.0105,j-.0012]];p.add(Gt(L,.0095,r.rearSightZ-.00475,5e-4),b,w);for(let X of[-1,1])p.add(ra(.0011,4e-4,X*.0058,j-.0022,r.rearSightZ+1e-4),d,w);p.add(Gt([[-.00175,r.slideTop-4e-4],[.00175,r.slideTop-4e-4],[.00175,r.sightLine],[-.00175,r.sightLine]],.0045,r.frontSightZ,3e-4),b,w);let N=r.sightLine-.0021;p.add(ra(.0013,3e-4,0,N,r.frontSightZ+.00235),d,w),p.add(ra(75e-5,4e-4,0,N,r.frontSightZ+.00245),x,w),p.add(ra(.0024,4e-4,0,-.0072,r.slideFront-2e-4),b,w),p.add(ie(.0106,.0118,Math.abs(r.portZ1-r.portZ0)+.002,.0012).translate(6e-4,r.slideTop-7e-4-.0059,(r.portZ0+r.portZ1)/2),i),p.add(ze(.0071,r.portZ1,r.slideFront+4e-4,0,0,le(28)),i),p.add(Ma([[.0046,0],[.0071,0],[.0071,6e-4],[.0052,9e-4],[.0046,9e-4]],r.slideFront+4e-4,0,le(28)),i),p.add(ra(.0046,4e-4,0,0,r.slideFront-3e-4),b);let B=[[-.0905,-.0118],[.094,-.0118],[.094,-.0262],[.051,-.0268],[.0485,-.031],[.0465,-.0535],[.041,-.0585],[-.006,-.0585],[-.0135,-.0505],[-.0185,-.0455],[-.0425,-.1135],[-.0455,-.1165],[-.0855,-.1165],[-.0885,-.1135],[-.0705,-.0545],[-.0725,-.0305],[-.0845,-.0225],[-.0915,-.0165]],C=[[.0405,-.0315],[.0405,-.0495],[.037,-.0525],[-.0035,-.0525],[-.0095,-.0472],[-.0125,-.0315]];p.add(ae(B,r.frameWidth,.0024,[C]),o),p.add(ae([[-.0186,-.0475],[-.0414,-.112],[-.0886,-.112],[-.0717,-.056],[-.0717,-.0475]],.0293,.0042),c),p.add(ae([[-.0423,-.1105],[-.0408,-.1172],[-.0908,-.1172],[-.0893,-.1105]],.0305,.0018),o);for(let X of[-.064,-.078])p.add(re(.022,8e-4,.0042).translate(0,-.0264,X),b);for(let X of[-1,1])p.add(re(6e-4,.0028,.04).translate(X*(r.frameWidth/2+1e-4),-.0228,-.073),b);p.add(wa(.0015,r.frameWidth+7e-4,0,-.0215,-.01),l),p.add(wa(.0015,r.frameWidth+7e-4,0,-.0175,-.034),l),p.add(ie(r.frameWidth+9e-4,.0028,.0055,6e-4).translate(0,-.0158,-.044),l),p.add(ae([[.004,-.0122],[.027,-.0122],[.029,-.0142],[.013,-.0158],[.004,-.0152]],.0012,3e-4).translate(-r.frameWidth/2-6e-4,0,0),b),p.add(ie(.0032,.0068,.0082,.0011).translate(-r.frameWidth/2-8e-4,-.0395,.0118),c);let D=[[.0098,-.03],[.0148,-.03],[.0142,-.036],[.0118,-.0425],[.0083,-.0478],[.0058,-.0498],[.0046,-.0488],[.0071,-.044],[.0094,-.0378],[.0098,-.03]];p.add(ae(D.slice(0,-1),.0062,9e-4),b,{trigger:!0});let V=[[-.0125,-.02],[-.0466,-.1165],[-.0864,-.1165],[-.057,-.02]];p.add(ae(V,.0222,.0016),u,g),p.add(ae([[-.0455,-.1165],[-.0442,-.1226],[-.0478,-.1256],[-.088,-.1256],[-.0906,-.1216],[-.0868,-.1165]],.0262,.002),o,g),p.add(Ma([[0,0],[.00495,0],[.00495,.0185],[.0047,.0195],[.004,.0235],[.0026,.0272],[.001,.029],[0,.0293]],-.046,-.0172,24),h,g);for(let X=0;X<4;X++){let _=.25+X*.17,Y=-.02-_*.0965,ce=-.057-_*.0294+.004;p.add(wa(.0012,.0226,0,Y,-ce,12),b,g)}let U=p.finish(),te=new ee(n.dev,ea(.019,.0099,Ie,{straight:!0}));return{model:{parts:U,muzzle:m.create(0,0,r.slideFront-.001),ejectionPort:m.create(.0105,.0125,(r.portZ0+r.portZ1)/2),rearSight:m.create(0,r.sightLine,r.rearSightZ),frontSight:m.create(0,r.sightLine,r.frontSightZ),casingMesh:te,casingMaterial:h,magAxis:m.normalize(m.create(),m.create(0,-.951,.309)),magBox:{center:m.create(0,-.07,.051),half:m.create(.0131,.053,.019)},triggerTravelM:.0045,selector:{pivot:[-r.slideWidth/2-8e-4,.004,.074],axis:[1,0,0],angles:{safe:0,semi:-.9,auto:-1.8}}},spec:ys(r.sightLine),grips:vs}}var vs={right:{position:[.0285,-.0326,.1253],fingerDir:[0,-.309,-.951],dorsal:[1,0,0],fingers:[{curl:[.5,.7,.3],spread:.42},{curl:[1.25,1.35,.7]},{curl:[1.3,1.35,.7]},{curl:[1.35,1.3,.7]}],thumb:{dir:[-.55,-.55,-.62],bend:[.15,.1]}},indexPressed:{curl:[.55,.95,.45],spread:.42},left:{position:[-.034,-.0325,.0823],fingerDir:[0,-.5,-.866],dorsal:[-1,0,0],fingers:[{curl:[1.15,1.2,.6]},{curl:[1.2,1.2,.6]},{curl:[1.2,1.2,.6]},{curl:[1.2,1.15,.6]}],thumb:{dir:[-.5,-.1,-.86],bend:[.05,.05]}},leftOnMagazine:{position:[0,-.15,.13],fingerDir:[0,.25,-.97],dorsal:[0,-1,0],fingers:[{curl:[.9,.9,.4]},{curl:[.95,.9,.4]},{curl:[.95,.9,.4]},{curl:[.95,.9,.4]}],thumb:{dir:[-.7,.2,-.6],bend:[.2,.1]}}};function ys(n=Ot.sightLine){return{name:"C15 Compact 9mm",caliber:nt["9x19 124gr"],barrelLengthM:.102,massKg:.84,rpm:1100,fireModes:["safe","semi","auto"],magazineCapacity:15,sightHeightM:n,zeroM:23,accuracyMoa:3,recoil:{boreAboveShoulderM:.045,inertia:.075,shoulderMassKg:3.5,holdOmega:15,holdDamping:.55,horizontalRatio:.3,viewCouplingHip:.04,viewCouplingAds:.1,residualRise:.06},reload:{magOut:.45,magIn:.85,boltRelease:.35},audio:Za.pistol9mm,flash:{kelvin:1850,luminance:45e4,sizeM:.07,lightCandela:12e3,sidePorts:!1,smoke:.5},ejection:{speed:3.2,up:2.4,back:1,spinRad:35},hipOffset:[.05,-.15,-.4],eyeRelief:.56,adsTime:.22,action:{travelM:Ot.slideTravel,backMs:5,returnMs:8,lockOpenOnEmpty:!0,lockFraction:.93},drawTime:.45}}function Xr(n,e={}){let a=n.synth,t=e.textureSize??fe.textureSize,r=a.material("anodized",{size:t,tileMeters:.25,wear:.22,seed:11},{name:"anodized",edgeWear:.55}),s=a.material("anodized",{size:t,tileMeters:.25,wear:.4,seed:12},{name:"anodized-rail",edgeWear:.8,edgeWearRadius:.002}),i=a.material("parkerized",{size:t,tileMeters:.2,wear:.15,seed:13},{name:"parkerized",edgeWear:.45}),o=a.material("polymer",{size:t,tileMeters:.12,extra:0,seed:14},{name:"polymer",edgeWear:.25}),c=a.material("polymer",{size:t,tileMeters:.08,extra:.9,seed:15,bumpMm:.25},{name:"polymer-stipple"}),b=a.material("rubber",{size:512,seed:16},{name:"rubber"}),l=a.material("brass",{size:512,tileMeters:.03,seed:17},{name:"brass"}),u=a.material("parkerized",{size:512,tileMeters:.1,color:[.03,.03,.03],wear:.05,seed:18},{name:"steel-black"}),h=new ta(n),d=(I,L,N={})=>h.add(I,L,N);d(ae([[-.075,-.004],[.115,-.004],[.118,.012],[.118,.026],[.11,.031],[-.07,.031],[-.075,.025]],.028,.0025),r),d(ie(.012,.022,.03,.004).translate(.017,.016,.055),r),d(me(.006,.0068,.03,le(18)).rotateZ(Math.PI/2).rotateY(.35).translate(.022,.017,.07),i),d(re(.0012,.013,.05).translate(.0142,.012,-.02),u),d(ze(.0016,-.05,.005,-.001,.0145,10),i);let x=.56,p=.07;d(re(.021,.006,x).translate(0,.034,p-x/2),s);for(let I=0;I<55;I++)d(re(.0215,.0045,.0052).translate(0,.0395,p-.006-I*.01),s);d(ie(.045,.008,.012,.003).translate(0,.024,.083),r),d(re(.012,.006,.03).translate(0,.025,.065),r),d(ae([[-.09,-.004],[.112,-.004],[.112,-.012],[.095,-.024],[.07,-.028],[.07,-.062],[.012,-.062],[.006,-.03],[-.03,-.03],[-.07,-.036],[-.09,-.022]],.025,.002),r),d(ae([[.07,-.05],[.074,-.066],[.008,-.066],[.012,-.05]],.03,.002),r),d(ae([[.004,-.03],[.006,-.036],[-.05,-.041],[-.06,-.034],[-.06,-.03]],.012,.001),r),h.add(ae([[-.012,-.03],[-.016,-.031],[-.02,-.04],[-.018,-.046],[-.014,-.04],[-.01,-.031]],.006,6e-4),u,{trigger:!0}),d(ie(.004,.012,.018,.0015).translate(-.0145,-.012,-.065),i),d(me(.0045,.0045,.006,le(16)).rotateZ(Math.PI/2).translate(.0145,-.018,-.01),i),h.add(me(.0042,.0042,.003,le(14)).rotateZ(Math.PI/2).translate(-.0142,-.012,.03),i,{selector:!0}),h.add(ie(.0035,.0045,.017,.0015).translate(-.0153,-.012,.03-.0085),i,{selector:!0}),d(ze(.0145,.09,.33,.005,0,le(32)),r),d(ze(.0175,.088,.1,.005,0,12),i),d(ae([[-.06,-.03],[-.03,-.03],[-.05,-.065],[-.072,-.122],[-.082,-.128],[-.112,-.122],[-.098,-.09],[-.085,-.05],[-.072,-.036]],.031,.006),c),d(ae([[-.21,.02],[-.335,.026],[-.345,.018],[-.345,-.088],[-.33,-.095],[-.27,-.06],[-.24,-.02],[-.21,-.008]],.044,.006),o),d(ae([[-.345,.024],[-.356,.024],[-.356,-.094],[-.345,-.094]],.046,.004),b),d(ie(.008,.006,.035,.002).translate(0,-.012,.25),o);let w=-.12,g=-.495,y=Array.from({length:8},(I,L)=>{let N=L/8*Math.PI*2+Math.PI/8;return[Math.cos(N)*.024,Math.sin(N)*.024+.006]});d(Qe(y,Math.abs(g-w),{bevel:.0012,bevelSegments:2,holes:[xt(0,.006,.0175,le(24))]}).translate(0,0,(w+g)/2),r);for(let I of[-1,1])for(let L=0;L<5;L++)d(re(.002,.007,.032).translate(I*.0222,.006,-.17-L*.065),u);d(ze(.0215,-.105,-.122,.006,0,le(24)),r);let S=-.118,f=S-.406;d(ze(.0094,S,-.2,0,0,le(24)),i),d(ze(.0083,-.2,f+.012,0,0,le(24)),i),d(ze(.0076,f+.012,f-.012,0,0,le(20)),i);let M=f-.002;d(Ma([[.0076,0],[.0108,.003],[.011,.006],[.011,.05],[.0104,.054],[.0062,.055],[.0062,0]],0,0,le(32)).translate(0,0,M),i);for(let I=0;I<4;I++){let L=I/4*Math.PI*1.1-Math.PI*.05+Math.PI/2-Math.PI*.55+Math.PI*.5;d(re(.003,.004,.028).translate(0,.0102,0).rotateZ(L).translate(0,0,M-.028),u)}let A=M-.055,v=.064;d(ie(.026,.012,.03,.002).translate(0,.043,.04),r),d(Qe(Xt(-.0075,-.009,.0075,.009,.003),.003,{holes:[xt(0,0,.0034,le(24))],bevel:5e-4}).translate(0,v,.046),u),d(re(.006,.006,.003).translate(0,.05,.046),u);let k=-.47;d(ie(.026,.012,.028,.002).translate(0,.043,k),r);for(let I of[-1,1])d(re(.004,.026,.01).translate(I*.008,.06,k),u);d(re(.0016,.022,.0016).translate(0,v-.011,k),u);let P=[],j=10;for(let I=0;I<=j;I++){let L=I/j;P.push([.068+L*L*.03,-.055-L*.17])}for(let I=j;I>=0;I--){let L=I/j;P.push([.012+L*L*.045,-.055-L*.17])}d(ae(P,.0225,.0025),o,{magazine:!0}),d(ae([[.11,-.22],[.112,-.236],[.052,-.236],[.054,-.222]],.027,.003),o,{magazine:!0});let E=h.finish(),z=new ee(n.dev,ea(.0448,.0095,Ie));return{model:{parts:E,muzzle:m.create(0,0,A),ejectionPort:m.create(.016,.012,-.02),rearSight:m.create(0,v,.046),frontSight:m.create(0,v,k),casingMesh:z,casingMaterial:l,magAxis:m.normalize(m.create(),m.create(0,-.985,-.17)),magBox:{center:m.create(0,-.145,-.07),half:m.create(.0125,.085,.032)},triggerTravelM:.003,selector:{pivot:[-.0145,-.012,.03],axis:[1,0,0],angles:{safe:0,semi:Math.PI/2,auto:Math.PI}}},spec:ws(v),grips:xs}}var xs={right:{position:[.0305,-.049,.155],fingerDir:[0,-.33,-.94],dorsal:[1,0,0],fingers:[{curl:[.25,.55,.3],spread:.35},{curl:[1.3,1.3,.7]},{curl:[1.3,1.3,.7]},{curl:[1.3,1.25,.7]}],thumb:{dir:[-.6,-.6,-.5],bend:[.25,.15]}},indexPressed:{curl:[.35,.8,.45],spread:.35},left:{position:[-.064,-.047,-.278],fingerDir:[.8,.15,-.55],dorsal:[0,-1,0],fingers:[{curl:[1.1,1.15,.6]},{curl:[1.1,1.2,.6]},{curl:[1.1,1.2,.6]},{curl:[1.1,1.15,.6]}],thumb:{dir:[-.3,.7,-.6],bend:[.15,.1]}},leftOnMagazine:{position:[-.02,-.25,-.02],fingerDir:[.3,.3,-.9],dorsal:[-.2,-1,0],fingers:[{curl:[.9,.9,.4]},{curl:[.95,.9,.4]},{curl:[.95,.9,.4]},{curl:[.95,.9,.4]}],thumb:{dir:[-.7,.3,-.6],bend:[.2,.1]}}};function ws(n=.064){return{name:"AR carbine 16in",caliber:nt["5.56x45 M855"],barrelLengthM:.406,massKg:3.3,rpm:760,fireModes:["safe","semi","auto"],magazineCapacity:30,sightHeightM:n,zeroM:50,accuracyMoa:1.5,recoil:{boreAboveShoulderM:.035,inertia:.24,shoulderMassKg:12,holdOmega:13,holdDamping:.72,horizontalRatio:.35,viewCouplingHip:.45,viewCouplingAds:.88,residualRise:.16},reload:{magOut:.55,magIn:.95,boltRelease:.35},audio:Za.rifle556_16in,flash:{kelvin:1900,luminance:6e5,sizeM:.15,lightCandela:25e3,sidePorts:!0,smoke:1},ejection:{speed:4.2,up:1.4,back:1.2,spinRad:28},hipOffset:[.135,-.165,-.36],eyeRelief:.075,adsTime:.26,drawTime:.6}}var Yr=[{base:[-.03,.004,-.093],len:[.046,.027,.023],r:[.0098,.0091,.0084]},{base:[-.0095,.005,-.097],len:[.051,.031,.024],r:[.0101,.0094,.0086]},{base:[.0115,.004,-.094],len:[.048,.029,.023],r:[.0096,.0089,.0082]},{base:[.0305,.002,-.085],len:[.037,.022,.02],r:[.0088,.0082,.0076]}],ot={base:[-.03,-.008,-.024],len:[.044,.034,.029],r:[.0128,.0112,.0102]},ye={w:.084,h:.027,l:.097};function na(n,e,a=G.create()){let t=m.normalize(m.create(),m.set(m.create(),-n[0],-n[1],-n[2])),r=m.set(m.create(),e[0],e[1],e[2]),s=m.normalize(m.create(),m.scaleAndAdd(m.create(),r,t,-m.dot(r,t))),i=m.cross(m.create(),s,t),o=T.create();return o[0]=i[0],o[1]=i[1],o[2]=i[2],o[4]=s[0],o[5]=s[1],o[6]=s[2],o[8]=t[0],o[9]=t[1],o[10]=t[2],T.getRotation(a,o)}function Qr(n,e){let a=le(14),t=[];for(let r=0;r<=6;r++){let s=r/6*Math.PI/2;t.push([Math.sin(s)*n,-Math.cos(s)*n])}for(let r=0;r<=6;r++){let s=r/6*Math.PI/2;t.push([Math.cos(s)*n,e+Math.sin(s)*n])}return Ie(t,a).rotateX(-Math.PI/2)}function Nt(n,e,a,t=.85){return me(n,e,a,le(20)).rotateX(Math.PI/2).translate(0,0,-a/2).scale(1,t,1)}var lt=class{constructor(e,a={}){this.renderer=e;this.options={gloveColor:a.gloveColor??[.035,.033,.03],palmColor:a.palmColor??[.06,.05,.04],sleeveColor:a.sleeveColor??[.075,.08,.065],shoulderRight:a.shoulderRight??[.2,-.31,.1],shoulderLeft:a.shoulderLeft??[-.2,-.31,.1],forearmLength:a.forearmLength??.27,upperArmLength:a.upperArmLength??.31,viewmodel:a.viewmodel??!0};let t=e.synth,r=Math.min(fe.textureSize,2048),s=t.material("webbing",{size:r,tileMeters:.025,color:this.options.gloveColor,seed:61},{name:"glove-fabric"}),i=t.material("rubber",{size:1024,tileMeters:.04,color:this.options.palmColor,seed:62},{name:"glove-palm"}),o=t.material("webbing",{size:r,tileMeters:.06,color:this.options.sleeveColor,seed:63},{name:"sleeve"}),c=e.dev,b=(l,u)=>{let h=new ne(new ee(c,l.computeTangents()),u);return h.viewmodel=this.options.viewmodel,h.castShadow=!this.options.viewmodel,this.objects.push(h),h};for(let l of[1,-1]){let u=new Map,h=ie(ye.w,ye.h,ye.l,.0125,5).translate(0,.002,-ye.l/2-.004);{let w=h.positions;for(let g=0;g<w.length;g+=3){let y=Math.min(1,Math.max(0,-w[g+2]/ye.l));if(w[g]*=.8+.2*Math.sin(y*Math.PI*.6),w[g+1]*=1-.18*y*y,w[g+1]>0){let S=w[g]/(ye.w/2);w[g+1]+=(.0045*(1-S*S)+.0012*Math.cos(S*Math.PI*3.5)*y)*Math.sin(Math.PI*Math.min(1,y*1.1))}}}u.set("palm",b(h,s));let d=Ia(1,18,12).scale(ye.w*.42,.011,ye.l*.36).translate(0,-ye.h/2+.004,-ye.l*.55);u.set("pad",b(ge.merge([d,Ia(1,14,10).scale(.02,.014,.033).translate(-.025*l,-.007,-.032)]),i)),Yr.forEach((w,g)=>w.len.forEach((y,S)=>u.set(`f${g}${S}`,b(Qr(w.r[S],y),S===0?s:i)))),ot.len.forEach((w,g)=>u.set(`t${g}`,b(Qr(ot.r[g],w),g===0?s:i))),u.set("guard",b(ie(ye.w*.9,.008,.022,.004).translate(0,ye.h/2+.002,-ye.l+.012),i)),this.hands.push({pieces:u,side:l});let x=this.options.forearmLength,p=this.options.upperArmLength;this.arms.push({cuff:b(Nt(.031,.033,.055),s),fore:b(Nt(.034,.044,1),o),upper:b(Nt(.045,.052,1),o)})}}objects=[];options;visible=!0;hands=[];arms=[];tmp=T.create();addTo(e){for(let a of this.objects)e.add(a);return this}setVisible(e){this.visible=e;for(let a of this.objects)a.visible=e}update(e,a,t,r={}){if(!this.visible)return;let s=a.right,i=a.indexPressed&&(r.trigger??0)>0?Zr(s.fingers[0],a.indexPressed,r.trigger??0):s.fingers[0],o={...s,fingers:[i,s.fingers[1],s.fingers[2],s.fingers[3]]};this.poseHand(0,e,o,t,this.options.shoulderRight);let c=a.left??null;r.leftOverride&&c?c=Ft(c,r.leftOverride,r.leftWeight??1):r.leftOverride&&(c=r.leftOverride);let b=this.hands[1],l=this.arms[1],u=!!c;for(let h of b.pieces.values())h.visible=u;l.fore.visible=l.upper.visible=l.cuff.visible=u,c&&this.poseHand(1,e,c,t,this.options.shoulderLeft)}poseHand(e,a,t,r,s){let i=this.hands[e],o=i.side,c=na(t.fingerDir,t.dorsal),b=T.fromRotationTranslation(T.create(),c,t.position),l=T.multiply(T.create(),a,b),u=A=>[A[0]*o,A[1],A[2]];i.pieces.get("palm").setTransform(l),i.pieces.get("pad").setTransform(l),i.pieces.get("guard").setTransform(l),Yr.forEach((A,v)=>{let k=t.fingers[v],P=T.translate(T.create(),l,u(A.base)),j=(k.spread??0)*o,E=G.fromEuler(G.create(),0,j,0);for(let z=0;z<3;z++){E=G.multiply(G.create(),E,G.fromEuler(G.create(),-k.curl[z],0,0));let I=T.multiply(T.create(),P,T.fromQuat(T.create(),E));i.pieces.get(`f${v}${z}`).setTransform(I);let L=m.transformQuat(m.create(),[0,0,-A.len[z]],E);T.translate(P,P,L)}});{let A=m.normalize(m.create(),m.create(t.thumb.dir[0]*o,t.thumb.dir[1],t.thumb.dir[2])),v=na(A,[0,1,0]),k=T.translate(T.create(),l,u(ot.base)),P=v;for(let j=0;j<3;j++)j>0&&(P=G.multiply(G.create(),P,G.fromEuler(G.create(),-t.thumb.bend[j-1],0,0))),i.pieces.get(`t${j}`).setTransform(T.multiply(T.create(),k,T.fromQuat(T.create(),P))),T.translate(k,k,m.transformQuat(m.create(),[0,0,-ot.len[j]],P))}let h=m.transformMat4(m.create(),[0,0,.004],l),d=m.normalize(m.create(),m.transformQuat(m.create(),[0,0,1],T.getRotation(G.create(),l))),x=this.arms[e],p=this.options.forearmLength,w=this.options.upperArmLength,g,y;if(r){y=m.add(m.create(),m.set(m.create(),r.position[0],r.position[1],r.position[2]),m.transformQuat(m.create(),s,r.rotation));let A=(w+p)*.995;m.distance(y,h)>A&&(y=m.scaleAndAdd(m.create(),h,m.normalize(m.create(),m.sub(m.create(),y,h)),A));let k=m.transformQuat(m.create(),[o*.7,-1,.15],r.rotation);g=Ms(y,h,w,p,k,d)}else g=m.scaleAndAdd(m.create(),h,d,p),y=m.scaleAndAdd(m.create(),g,d,w);let S=(A,v,k,P,j=0)=>{let E=m.sub(m.create(),k,v),z=m.length(E),I=m.scale(m.create(),E,1/Math.max(z,1e-6)),L=T.fromRotationTranslation(this.tmp,na(I,P),v);if(j>=0&&A!==x.cuff){let N=z+j;L[8]*=N,L[9]*=N,L[10]*=N}A.setTransform(L)},f=m.transformQuat(m.create(),[0,1,0],T.getRotation(G.create(),l));S(x.cuff,m.scaleAndAdd(m.create(),h,d,-.012),g,f),S(x.fore,m.scaleAndAdd(m.create(),h,d,.035),g,f,.02);let M=m.normalize(m.create(),m.sub(m.create(),y,g));S(x.upper,m.scaleAndAdd(m.create(),g,M,-.025),m.scaleAndAdd(m.create(),y,M,.4),f)}};function Ms(n,e,a,t,r,s){let i=m.sub(m.create(),e,n),o=m.length(i);if(o<1e-5)return m.scaleAndAdd(m.create(),e,s,t);let c=m.scale(m.create(),i,1/o);o=Math.min(o,(a+t)*.9995);let b=(a*a-t*t+o*o)/(2*o),l=Math.sqrt(Math.max(0,a*a-b*b)),u=m.scaleAndAdd(m.create(),r,c,-m.dot(r,c)),h=m.length(u)>1e-6?m.normalize(u,u):m.normalize(m.create(),m.cross(m.create(),c,m.create(0,1,0))),d=m.scaleAndAdd(m.create(),n,c,b);return m.scaleAndAdd(d,d,h,l)}function Zr(n,e,a){return{curl:[n.curl[0]+(e.curl[0]-n.curl[0])*a,n.curl[1]+(e.curl[1]-n.curl[1])*a,n.curl[2]+(e.curl[2]-n.curl[2])*a],spread:(n.spread??0)+((e.spread??0)-(n.spread??0))*a}}function ct(n,e,a){return[n[0]+(e[0]-n[0])*a,n[1]+(e[1]-n[1])*a,n[2]+(e[2]-n[2])*a]}function Ft(n,e,a){return{position:ct(n.position,e.position,a),fingerDir:ct(n.fingerDir,e.fingerDir,a),dorsal:ct(n.dorsal,e.dorsal,a),fingers:[0,1,2,3].map(t=>Zr(n.fingers[t],e.fingers[t],a)),thumb:{dir:ct(n.thumb.dir,e.thumb.dir,a),bend:[n.thumb.bend[0]+(e.thumb.bend[0]-n.thumb.bend[0])*a,n.thumb.bend[1]+(e.thumb.bend[1]-n.thumb.bend[1])*a]}}}var $r=["Index","Middle","Ring","Pinky"],en=n=>n.replace(/^.*[:|]/,"").replace(/^mixamorig\d*_?/i,""),bt=class n{objects=[];asset;inst;skin;restLocal;restWorld;parent;order;sides;keepSet;jointData;rigScale=1;visible=!0;opts;constructor(e,a,t={}){this.inst=a,this.asset=a.asset,this.opts={shoulderRight:t.shoulderRight??[.19,-.3,.1],shoulderLeft:t.shoulderLeft??[-.19,-.3,.1],keep:t.keep??[],viewmodel:t.viewmodel??!0};let r=this.asset;if(!r.skins.length)throw new Error("SkinnedArms: the model has no skin");this.skin={joints:r.skins[0].joints,ibm:r.skins[0].inverseBindMatrices},this.parent=r.nodes.map(l=>l.parent),this.restLocal=r.nodes.map(l=>({t:m.create(...l.translation),r:G.fromValues(...l.rotation),s:m.create(...l.scale)})),this.restWorld=Et(r),this.order=[];let s=l=>{this.order.push(l);for(let u of r.nodes[l].children)s(u)};r.nodes.forEach((l,u)=>{l.parent<0&&s(u)});let i=l=>r.nodes.findIndex(u=>en(u.name)===l),o=l=>{let u=i(l);if(u<0)throw new Error(`SkinnedArms: bone "${l}" not found (Mixamo naming expected)`);return u},c=l=>m.create(this.restWorld[l][12],this.restWorld[l][13],this.restWorld[l][14]);this.sides=["Right","Left"].map((l,u)=>{let h=u===0?1:-1,d=o(`${l}Arm`),x=o(`${l}ForeArm`),p=o(`${l}Hand`),w=$r.map(j=>[1,2,3].map(E=>i(`${l}Hand${j}${E}`))),g=[1,2,3].map(j=>i(`${l}HandThumb${j}`)),y=c(p),S=w[1][0]>=0?c(w[1][0]):m.add(m.create(),y,m.sub(m.create(),y,c(x))),f=m.normalize(m.create(),m.sub(m.create(),S,y)),M=w[0][0]>=0&&w[3][0]>=0?m.normalize(m.create(),m.sub(m.create(),c(w[0][0]),c(w[3][0]))):m.create(0,0,1),A=m.normalize(m.create(),m.cross(m.create(),M,f));g[0]>=0&&m.dot(m.sub(m.create(),c(g[0]),y),A)>0&&m.scale(A,A,-1);let v={s:h,shoulder:i(`${l}Shoulder`),arm:d,fore:x,hand:p,fingers:w,thumb:g,armLen:m.distance(c(d),c(x)),foreLen:m.distance(c(x),y),restFinger:f,restDorsal:A,restHandQ:T.getRotation(G.create(),this.restWorld[p]),flexLocal:new Map},k=m.scale(m.create(),A,-1),P=m.normalize(m.create(),m.cross(m.create(),f,k));for(let j of[...w.flat(),g[1],g[2]]){if(j<0)continue;let E=T.getRotation(G.create(),this.restWorld[j]),z=G.invert(G.create(),E);v.flexLocal.set(j,m.normalize(m.create(),m.transformQuat(m.create(),P,z)))}return v}),this.rigScale=Math.hypot(this.restWorld[this.sides[0].arm][0],this.restWorld[this.sides[0].arm][1],this.restWorld[this.sides[0].arm][2]),this.keepSet=new Set;let b=/^(Right|Left)(Shoulder|Arm|ForeArm|Hand.*)$/;r.nodes.forEach((l,u)=>{let h=en(l.name);(b.test(h)||this.opts.keep.includes(h))&&this.keepSet.add(u)}),this.jointData=new Float32Array(this.skin.joints.length*16);for(let l of a.drawables){if(!l.skinned)continue;let u=new ne(l.mesh,l.material);u.viewmodel=this.opts.viewmodel,u.castShadow=!this.opts.viewmodel,u.joints=this.jointData,this.objects.push(u)}}static async fromAsset(e,a,t={}){return new n(e,it(e,a),t)}addTo(e){for(let a of this.objects)e.add(a);return this}setVisible(e){this.visible=e;for(let a of this.objects)a.visible=e}update(e,a,t,r={}){if(!this.visible||!t)return;let s=this.asset.nodes.length,i=this.restLocal.map(z=>({t:m.clone(z.t),r:G.copy(G.create(),z.r),s:m.clone(z.s)})),o=m.transformQuat(m.create(),[0,0,-1],t.rotation),c=Math.atan2(-o[0],-o[2]),b=G.fromEuler(G.create(),0,c,0),l=this.restWorld[this.sides[0].arm],u=this.restWorld[this.sides[1].arm],h=m.create((l[12]+u[12])/2,(l[13]+u[13])/2,(l[14]+u[14])/2),d=m.create((this.opts.shoulderRight[0]+this.opts.shoulderLeft[0])/2,(this.opts.shoulderRight[1]+this.opts.shoulderLeft[1])/2,(this.opts.shoulderRight[2]+this.opts.shoulderLeft[2])/2),x=m.add(m.create(),m.create(t.position[0],t.position[1],t.position[2]),m.transformQuat(m.create(),d,t.rotation)),p=G.multiply(G.create(),b,G.fromEuler(G.create(),0,Math.PI,0)),w=T.fromRotationTranslation(T.create(),p,x);T.translate(w,w,[-h[0],-h[1],-h[2]]);let g=new Array(s),y=new Array(s),S=(z=0)=>{for(let I=z;I<this.order.length;I++){let L=this.order[I],N=T.fromRotationTranslationScale(T.create(),i[L].r,i[L].t,i[L].s),B=this.parent[L];g[L]=B>=0?T.multiply(T.create(),g[B],N):T.multiply(T.create(),w,N),y[L]=T.getRotation(G.create(),g[L])}};S();let f=z=>m.create(g[z][12],g[z][13],g[z][14]),M=(z,I)=>{let L=this.parent[z],N=L>=0?y[L]:T.getRotation(G.create(),w);G.multiply(i[z].r,G.invert(G.create(),N),I)},A=(z,I,L)=>{let N=m.normalize(m.create(),m.sub(m.create(),f(I),f(z))),B=m.normalize(m.create(),m.sub(m.create(),L,f(z))),C=G.rotationTo(G.create(),N,B);M(z,G.multiply(G.create(),C,y[z]))},v=a.right,k=a.indexPressed&&(r.trigger??0)>0?ks(v.fingers[0],a.indexPressed,r.trigger??0):v.fingers[0],P=a.left??null;r.leftOverride&&P?P=Ft(P,r.leftOverride,r.leftWeight??1):r.leftOverride&&(P=r.leftOverride);let j=[{...v,fingers:[k,v.fingers[1],v.fingers[2],v.fingers[3]]},P];this.sides.forEach((z,I)=>{let L=j[I];if(!L)return;let N=G.multiply(G.create(),T.getRotation(G.create(),e),na(L.fingerDir,L.dorsal)),B=m.transformMat4(m.create(),L.position,e),C=f(z.arm),D=z.armLen*this.rigScaleAt(z.arm,g),V=z.foreLen*this.rigScaleAt(z.arm,g),U=(D+V)*.995,te=m.distance(C,B),$=te>U?m.scaleAndAdd(m.create(),B,m.normalize(m.create(),m.sub(m.create(),C,B)),U):C;if(z.shoulder>=0&&te>U){let de=this.parent[z.shoulder],xe=de>=0?Math.hypot(g[de][0],g[de][1],g[de][2]):1,Re=m.transformQuat(m.create(),m.sub(m.create(),$,C),G.invert(G.create(),y[de]));i[z.shoulder].t=m.scaleAndAdd(i[z.shoulder].t,i[z.shoulder].t,Re,1/Math.max(xe,1e-9)),S()}let X=m.transformQuat(m.create(),[z.s*.7,-1,.15],t.rotation),_=As(f(z.arm),B,D,V,X);A(z.arm,z.fore,_),S(),A(z.fore,z.hand,B),S();let Y=na(z.restFinger,z.restDorsal),ce=G.multiply(G.create(),T.getRotation(G.create(),w),Y),Je=G.multiply(G.create(),T.getRotation(G.create(),w),z.restHandQ),Ge=G.multiply(G.create(),N,G.invert(G.create(),ce));M(z.hand,G.multiply(G.create(),Ge,Je)),$r.forEach((de,xe)=>{let Re=L.fingers[xe];z.fingers[xe].forEach((Me,oa)=>{if(Me<0)return;let Ue=z.flexLocal.get(Me);Ue&&(i[Me].r=G.multiply(G.create(),this.restLocal[Me].r,G.setAxisAngle(G.create(),Ue,Re.curl[oa])))})});for(let de=1;de<3;de++){let xe=z.thumb[de],Re=xe>=0?z.flexLocal.get(xe):void 0;Re&&(i[xe].r=G.multiply(G.create(),this.restLocal[xe].r,G.setAxisAngle(G.create(),Re,L.thumb.bend[de-1]*.8)))}S()});let E=T.fromRotationTranslationScale(T.create(),G.create(),m.scaleAndAdd(m.create(),x,o,-.25),[1e-4,1e-4,1e-4]);this.skin.joints.forEach((z,I)=>{let L=this.skin.ibm.subarray(I*16,I*16+16),N=this.keepSet.has(z)?T.multiply(T.create(),g[z],L):E;this.jointData.set(N,I*16)})}rigScaleAt(e,a){let t=a[e];return Math.hypot(t[0],t[1],t[2])/Math.max(this.rigScale,1e-9)*this.rigScale/Math.max(Math.hypot(this.restWorld[e][0],this.restWorld[e][1],this.restWorld[e][2]),1e-9)}};function ks(n,e,a){return{curl:[n.curl[0]+(e.curl[0]-n.curl[0])*a,n.curl[1]+(e.curl[1]-n.curl[1])*a,n.curl[2]+(e.curl[2]-n.curl[2])*a],spread:n.spread}}function As(n,e,a,t,r){let s=m.sub(m.create(),e,n),i=m.length(s),o=m.scale(m.create(),s,1/Math.max(i,1e-6));i=Math.min(i,(a+t)*.9995);let c=(a*a-t*t+i*i)/(2*i),b=Math.sqrt(Math.max(0,a*a-c*c)),l=m.scaleAndAdd(m.create(),r,o,-m.dot(r,o));m.normalize(l,l);let u=m.scaleAndAdd(m.create(),n,o,c);return m.scaleAndAdd(u,u,l,b)}var Ss=(function(){var n="b9H79Tebbbe;veC9Geueu9Geub9Gbb9Gsuuuuuuuuuuuu99uueu9Gvuuuuub9Gruuuuuuub9Gouuuuuue999Gvuuuuueu9Gzuuuuuuuuuuu99uuuub9Gquuuuuuu99uueu9GPuuuuuuuuuuu99uueu9Gquuuuuuuu99ueu9Gruuuuuu99eu9Gwuuuuuu99ueu9Giuuue999GDuuuuuuuuueu9Gkuuuuuuuu99uub9Gluuuueu9Gluuuub9Giuuueui3EdilvorlwDiqkrxmPszdHObAAbeAlve9Weiiviebeoweuecj:Gdkr:Sdmo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bbz9TW79O9V9Wt9F79P9T9W29P9M95bw8E9TW79O9V9Wt9F79P9T9W29P9M959x9Pt9OcttV9P9I91tW7bD8A9TW79O9V9Wt9F79P9T9W29P9M959x9Pt9O9v9W9K9HtWbqQ9TW79O9V9Wt9F79P9T9W29P9M959t29V9W9W95bkX9TW79O9V9Wt9F79P9T9W29P9M959qV919UWbmQ9TW79O9V9Wt9F79P9T9W29P9M959q9V9P9Ut7bPX9TW79O9V9Wt9F79P9T9W29P9M959t9J9H2WbsP9TW79O9V9Wt9FVW9TW79Obza9TW79O9V9Wt9F9V9Wt9P9T9P96W9wWVtW94SWt9J9O9sW9T9H9WbA59TW79O9V9Wt9F9NW9UWV9HtW9q9V79Pt9P9V9U9sW9T9H9WbCl79IV9RbXDwebcekdKYq:p:1dElbzOk:Q:tekYue99iuQ99eui99Due99xue9:w998Jjjjjbcj;sb9Rgs8Kjjjjbcbhzasc:Cefcbc;Kbz:xjjjb8AdnabaeSmbabaeadcdtz:wjjjb8AkdnamcdGTmbalcrfci4cbyd;y:L:cjbHjjjjbbhHasc:Cefasyd;8egecdtfaHBdbasaecefBd;8ecbhlcbhednadTmbabheadhOinaHaeydbci4fcb86bbaeclfheaOcufgOmbkcbhlabheadhOinaHaeydbgAci4fgCaCRbbgCceaAcrGgAtV86bbaCcu7aA4ceGalfhlaeclfheaOcufgOmbkcualcdtalcFFFFi0Ehekaecbyd;y:L:cjbHjjjjbbhzasc:Cefasyd;8egecdtfazBdbasaecefBd;8ealcd4alfhOcehHinaHgecethHaeaO6mbkcbhXcuaecdtgOaecFFFFi0Ecbyd;y:L:cjbHjjjjbbhHasc:Cefasyd;8egAcdtfaHBdbasaAcefBd;8eaHcFeaOz:xjjjbhQdnadTmbaecufhLcbhKindndnaQabaKcdtfgYydbgAc:v;t;h;Ev2aLGgOcdtfgCydbgHcuSmbceheinazaHcdtfydbaASmdaOaefhHaecefheaQaHaLGgOcdtfgCydbgHcu9hmbkkazaXcdtfaABdbaCaXBdbaXhHaXcefhXkaYaHBdbaKcefgKad9hmbkkaQcbyd;C:L:cjbH:bjjjbbasasyd;8ecufBd;8ekcbh8AcualcefgecdtaecFFFFi0Ecbyd;y:L:cjbHjjjjbbhKasc:Cefasyd;8egecdtfaKBdbasaKBdNeasaecefBd;8ecuadcitadcFFFFe0Ecbyd;y:L:cjbHjjjjbbhEasc:Cefasyd;8egecdtfaEBdbasaEBd:yeasaecefBd;8eascNefabadalcbz:cjjjbcualcdtgealcFFFFi0Eg3cbyd;y:L:cjbHjjjjbbhHasc:Cefasyd;8egOcdtfaHBdbasaOcefBd;8ea3cbyd;y:L:cjbHjjjjbbhXasc:Cefasyd;8egOcdtfaXBdbasaOcefBd;8eaHaXaialavazasc:Cefz:djjjbalcbyd;y:L:cjbHjjjjbbh5asc:Cefasyd;8egOcdtfa5BdbasaOcefBd;8ea3cbyd;y:L:cjbHjjjjbbhOasc:Cefasyd;8egAcdtfaOBdbasaAcefBd;8ea3cbyd;y:L:cjbHjjjjbbhAasc:Cefasyd;8egCcdtfaABdbasaCcefBd;8eaOcFeaez:xjjjbh8EaAcFeaez:xjjjbh8FdnalTmbindnaKa8AgAcefg8AcdtfydbgCaKaAcdtgefydbgOSmbaCaO9RhYaEaOcitfhaa8Faefhha8EaefhLcbhCindndnaaaCcitfydbgQaA9hmbaLaABdbahaABdbxekdnaKaQcdtggfgeclfydbgOaeydbgeSmbaOae9RhOaEaecitfheinaeydbaASmdaecwfheaOcufgOmbkka8FagfgeaAaQaeydbcuSEBdbaLaQaAaLydbcuSEBdbkaCcefgCaY9hmbkka8Aal9hmbkaHhOaXhAa8EhQa8FhCcbheindndnaeaOydbgL9hmbdnaeaAydbgL9hmbaQydbhLdnaCydbgYcu9hmbaLcu9hmba5aefcb86bbxikdnaYcuSmbaLcuSmbaeaYSmbaHaYcdtfydbaHaLcdtfydb9hmba5aefcd86bbxika5aefhadnaeaYSmbaeaLSmbaace86bbxikaacv86bbxdkdnaeaXaLcdtgYfydb9hmbdnaCydbgacuSmbaeaaSmbaQydbggcuSmbaeagSmba8FaYfydbghcuSmbahaLSmba8EaYfydbgYcuSmbaYaLSmbaHaacdtfydbgLaHaYcdtfydb9hmbaLaHagcdtfydbgYSmbaYaHahcdtfydb9hmba5aefcd86bbxika5aefcv86bbxdka5aefcv86bbxeka5aefa5aLfRbb86bbkaOclfhOaAclfhAaQclfhQaCclfhCalaecefge9hmbkdnamcaGTmbcbh8Jindndna5a8Jfg8KRbbg8Lc9:fPlbeebekdndndnaHa8Jcdtfydbgea8J9hmbcbhYcbh8MaqTmednazTmbcbh8Ma8JheinaqazaecdtgefydbfRbbce4a8MVceGh8MaXaefydbgea8J9hmbxikkcbh8Ma8JheinaqaefRbbce4a8MVceGh8MaXaecdtfydbgea8J9hmbxdkka5aefRbbhexeka8JheindnaKaecdtg8AfgeclfydbgOaeydbgeSmbaOae9RhgaEaecitfhhaHa8AfhacbhLinahaLcitfydbgQhednindnaKaecdtgCfgeclfydbgOaeydbgeSmbaOae9RhOaEaecitfheaaydbhAdninaHaeydbcdtfydbaASmeaecwfheaOcufgOTmdxbkkcbhexdkaXaCfydbgeaQ9hmbkcehekaYaeVhYaLcefgLag9hmbkkaXa8Afydbgea8J9hmbka8LclciaYceGEa8MEheka8Kae86bbka8Jcefg8Jal9hmbkkdnaqTmbdndnazTmbazheaHhOalhAindnaqaeydbfRbbceGTmba5aOydbfcv86bbkaeclfheaOclfhOaAcufgAmbxdkkaqheaHhOalhAindnaeRbbceGTmba5aOydbfcv86bbkaecefheaOclfhOaAcufgAmbkkaHhealhAa5hOindna5aeydbfRbbcv9hmbaOcv86bbkaeclfheaOcefhOaAcufgAmbkkamceGTmba5healhOindndnaeRbbcufPlbeebekaecv86bbkaecefheaOcufgOmbkkcbh8Ncualcx2alc;v:Q;v:Qe0Ecbyd;y:L:cjbHjjjjbbh8Kasc:Cefasyd;8egecdtfa8KBdbasaecefBd;8eascbBd:qeas9cb83i1ea8Kaialavazasc1efz:ejjjbhydndnaDmbcbh8PcbhaxekcbhaawhecbhOindnaeIdbJbbbb9ETmbasaacdtfaOBdbaacefhakaeclfheaDaOcefgO9hmbkcuaaal2gecdtaecFFFFi0Ecbyd;y:L:cjbHjjjjbbh8Pasc:Cefasyd;8egecdtfa8PBdbasaecefBd;8ealTmbdnaambcbhaxekarcd4hgdnazTmbaacdthhcbhLa8PhYinaoazaLcdtfydbag2cdtfhQasheaYhOaahAinaOaQaeydbcdtgCfIdbawaCfIdbNUdbaeclfheaOclfhOaAcufgAmbkaYahfhYaLcefgLal9hmbxdkkaacdthhcbhLa8PhYinaoaLag2cdtfhQasheaYhOaahAinaOaQaeydbcdtgCfIdbawaCfIdbNUdbaeclfheaOclfhOaAcufgAmbkaYahfhYaLcefgLal9hmbkkcualc8S2gOalc;D;O;f8U0EgCcbyd;y:L:cjbHjjjjbbheasc:Cefasyd;8egAcdtfaeBdbasaAcefBd;8eaecbaOz:xjjjbhIcbh8RcbhgdnaaTmbcbh8NaCcbyd;y:L:cjbHjjjjbbhgasc:Cefasyd;8egecdtfagBdbasaecefBd;8eagcbaOz:xjjjb8Acuaaal2gecltgOaecFFFFb0Ecbyd;y:L:cjbHjjjjbbh8Rasc:Cefasyd;8egecdtfa8RBdbasaecefBd;8ea8RcbaOz:xjjjb8AamcjjjjdGTmbcualcltgealcFFFFb0Ecbyd;y:L:cjbHjjjjbbh8Nasc:Cefasyd;8egOcdtfa8NBdbasaOcefBd;8ea8Ncbaez:xjjjb8AkdnadTmbcbhQabhOina8KaOclfydbgLcx2fgeIdba8KaOydbgYcx2fgAIdbg8S:tgRa8KaOcwfydbghcx2fgCIdlaAIdlg8U:tg8VNaeIdla8U:tg8WaCIdba8S:tg8XN:tg8Ya8YNa8WaCIdwaAIdwg8Z:tg80NaeIdwa8Z:tg8Wa8VN:tg81a81Na8Wa8XNaRa80N:tg80a80NMMg8V:rhBa8Yh8Xa80h8Wa81hRdna8VJbbbb9EgATmba8YaB:vh8Xa80aB:vh8Wa81aB:vhRkaIaHaYcdtfydbgCc8S2fgeaRaB:rg8VaRNNg83aeIdbMUdbaea8Wa8Va8WNgUNg85aeIdlMUdlaea8Xa8Va8XNg86Ng87aeIdwMUdwaeaRaUNgUaeIdxMUdxaea86aRNg88aeIdzMUdzaea8Wa86Ng89aeIdCMUdCaeaRa8Va8Xa8ZNaRa8SNa8Ua8WNMM:mg8:Ng86NgRaeIdKMUdKaea8Wa86Ng8WaeId3MUd3aea8Xa86Ng8XaeIdaMUdaaea86a8:Ng86aeId8KMUd8Kaea8VaeIdyMUdyaIaHaLcdtfydbgLc8S2fgea83aeIdbMUdbaea85aeIdlMUdlaea87aeIdwMUdwaeaUaeIdxMUdxaea88aeIdzMUdzaea89aeIdCMUdCaeaRaeIdKMUdKaea8WaeId3MUd3aea8XaeIdaMUdaaea86aeId8KMUd8Kaea8VaeIdyMUdyaIaHahcdtfydbgYc8S2fgea83aeIdbMUdbaea85aeIdlMUdlaea87aeIdwMUdwaeaUaeIdxMUdxaea88aeIdzMUdzaea89aeIdCMUdCaeaRaeIdKMUdKaea8WaeId3MUd3aea8XaeIdaMUdaaea86aeId8KMUd8Kaea8VaeIdyMUdydna8NTmbdnaATmba8YaB:vh8Ya80aB:vh80a81aB:vh81ka8NaCcltfgeaBJbbbZNgRa80Ng8VaeIdlMUdlaeaRa8YNg8WaeIdwMUdwaeaRa81Ng8XaeIdbMUdbaeaRa8S:ma81Na8Ua80N:ta8Za8YN:tNgRaeIdxMUdxa8NaLcltfgea8VaeIdlMUdlaea8WaeIdwMUdwaea8XaeIdbMUdbaeaRaeIdxMUdxa8NaYcltfgea8VaeIdlMUdlaea8WaeIdwMUdwaea8XaeIdbMUdbaeaRaeIdxMUdxkaOcxfhOaQcifgQad6mbkkdnalTmbJq;x8J88J;n;m;m89J:v:;;w8ZamczGEamc;abGEh80cbhOaHhCazhQaIhea8KhAindnaOaCydb9hmbaOhLdnazTmbaQydbhLka80hRdnaqTmbJbbjZa80aqaLfRbbclGEhRkaecxfgLaLIdbJbbbbMUdbaeczfgLaLIdbJbbbbMUdbaecCfgLaLIdbJbbbbMUdbaeaRaecyfgLIdbg8YNgRaeIdbMUdbaeclfgYaRaYIdbMUdbaecwfgYaRaYIdbMUdbaecKfgYaYIdbaAIdbg8WaRN:tUdbaAcwfIdbh8Vaec3fgYaYIdbaRaAclfIdbg8XN:tUdbaecafgYaYIdbaRa8VN:tUdbaec8KfgYIdbh81aLa8YaRMUdbaYa81aRa8Va8VNa8Wa8WNa8Xa8XNMMNMUdbkaCclfhCaQclfhQaec8SfheaAcxfhAalaOcefgO9hmbkkdnadTmbcbh8AabhLinaba8AcdtfhYcbheindna5aLaefydbgCfRbbgOTmba5aYaec:G:G:cjbfydbcdtfydbgQfRbbcFeGgATmbdnaOclSghmbaOci6mbaAclSmbaAcd0mekdnaOcd0mba8EaCcdtfydbaQ9hmekdnaAcd0mba8FaQcdtfydbaC9hmekdndnahmbaAcl9hmekaOciSmeaAciSmekJbbbZJbbbZJbbacaAcdSEaOcdSEhUdna8KaYaec:K:G:cjbfydbcdtfydbcx2fgOIdwa8KaCcx2fgAIdwg86:tg8Sa8KaQcx2fghIdwa86:tg8Xa8XNahIdbaAIdbg8U:tg80a80NahIdlaAIdlg8Z:tg8Va8VNMMg81Na8Xa8Sa8XNaOIdba8U:tg83a80Na8VaOIdla8Z:tg85NMMg8WN:tg8Ya8YNa83a81Na80a8WN:tgRaRNa85a81Na8Va8WN:tg8Wa8WNMMgBJbbbb9ETmba8YaB:rgB:vh8Ya8WaB:vh8WaRaB:vhRkaUa81:rNgBa8Ya86NaRa8UNa8Za8WNMM:mg81Ng87a81Nh88a80a85Na8Va83N:tg81a81Na8Va8SNa8Xa85N:tg8Va8VNa8Xa83Na80a8SN:tg8Xa8XNMMg83:rh80a8Ya87Nh85a8Wa87Nh89aRa87Nh87a8WaBa8YNg8SNh8:a8SaRNhZaRaBa8WNgnNhca8Ya8SNh8Ya8WanNh8WaRaBaRNNh8Sdna83Jbbbb9ETmba81a80:vh81a8Xa80:vh8Xa8Va80:vh8VkaIaHaCcdtfydbc8S2fgOaOIdba8Sa8VaUa80:rNgRa8VNNMg80MUdbaOa8Wa8XaRa8XNg8SNMg83aOIdlMUdlaOa8Ya81aRa81Ng8WNMg8YaOIdwMUdwaOaca8Va8SNMg8SaOIdxMUdxaOaZa8Wa8VNMgUaOIdzMUdzaOa8:a8Xa8WNMg8WaOIdCMUdCaOa87a8VaRa81a86Na8Va8UNa8Za8XNMMg86:mNgRNMg8VaOIdKMUdKaOa89a8XaRNMg8XaOId3MUd3aOa85a81aRNMg81aOIdaMUdaaOa88a86aRN:tgRaOId8KMUd8KaOaBaOIdyMUdyaIaHaQcdtfydbc8S2fgOa80aOIdbMUdbaOa83aOIdlMUdlaOa8YaOIdwMUdwaOa8SaOIdxMUdxaOaUaOIdzMUdzaOa8WaOIdCMUdCaOa8VaOIdKMUdKaOa8XaOId3MUd3aOa81aOIdaMUdaaOaRaOId8KMUd8KaOaBaOIdyMUdykaeclfgecx9hmbkaLcxfhLa8Acifg8Aad6mbkkdnamcjeGTmbalTmbcbh9cindnaKa9cgecdtgOfydbghaKaecefg9ccdtfydbg8M9pmba8Kaecx2fhDaIaHaOfydbgCc8S2fh8AindnaHaEahcitfgeydbgLcdtfydbg8JaC0mbaeydlh8LcuhAaLheindnaKaecdtgYfgeclfydbgOaeydbgeSmbaOae9RhOaEaecitfheindnaHaeydbcdtfydbaC9hmbaAcu9hhQaLhAaQmbaeclfydbhAkaecwfheaOcufgOmbkkaXaYfydbgeaL9hmbkaAaLSmbaAcuSmba8KaLcx2fgeIdbaDIdbg81:tgRa8Ka8Lcx2fgOIdlaDIdlg80:tg8XNaeIdla80:tg8VaOIdba81:tg8YN:tg86a8KaAcx2fgAIdba81:tg8Za8VNaAIdla80:tg83aRN:tg8SNa8VaOIdwaDIdwgB:tg8UNaeIdwaB:tg8Wa8XN:tg85a83a8WNaAIdwaB:tg87a8VN:tgUNa8Wa8YNaRa8UN:tg88a87aRNa8Za8WN:tg89NMMa86a86Na85a85Na88a88NMM:rJ:A:z9z:;Na8Sa8SNaUaUNa89a89NMM:rN9Gmbdna8Ua8Wa8WNaRaRNa8Va8VNMMg8SNa8Wa8Ua8WNa8YaRNa8Va8XNMMg86N:tg8Ua8UNa8Ya8SNaRa86N:tg8Ya8YNa8Xa8SNa8Va86N:tg86a86NMMg8XJbbbb9ETmba8Ua8X:rg8X:vh8Ua86a8X:vh86a8Ya8X:vh8Yka8S:rg8Xa8UaBNa8Ya81Na80a86NMM:mgUNg85aUNhUa8Ua85Nh88a86a85Nh89a8Ya85Nh8:a86a8Xa8UNg85NhZa85a8YNhna8Ya8Xa86NgcNhJa8Ua85Nh8Ua86acNh86a8Ya8Xa8YNNh85dna87a8SNa8Wa87a8WNa8ZaRNa8Va83NMMg8YN:tg8Wa8WNa8Za8SNaRa8YN:tgRaRNa83a8SNa8Va8YN:tg8Va8VNMMg8YJbbbb9ETmba8Wa8Y:rg8Y:vh8Wa8Va8Y:vh8VaRa8Y:vhRka8Aa8AIdba85aRa8XaRNNMg8SMUdba8Aa86a8Va8Xa8VNg8ZNMg86a8AIdlMUdla8Aa8Ua8Wa8Xa8WNg8YNMg8Ua8AIdwMUdwa8AaJaRa8ZNMg8Za8AIdxMUdxa8Aana8YaRNMg83a8AIdzMUdza8AaZa8Va8YNMg85a8AIdCMUdCa8Aa8:aRa8Xa8WaBNaRa81Na80a8VNMMg81:mNg8YNMgRa8AIdKMUdKa8Aa89a8Va8YNMg8Va8AId3MUd3a8Aa88a8Wa8YNMg8Wa8AIdaMUdaa8AaUa81a8YN:tg8Ya8AId8KMUd8Ka8Aa8Xa8XMg8Xa8AIdyMUdyaIa8Jc8S2fgea8SaeIdbMUdbaea86aeIdlMUdlaea8UaeIdwMUdwaea8ZaeIdxMUdxaea83aeIdzMUdzaea85aeIdCMUdCaeaRaeIdKMUdKaea8VaeId3MUd3aea8WaeIdaMUdaaea8YaeId8KMUd8Kaea8XaeIdyMUdykahcefgha8M9hmbkka9cal9hmbkkdnadTmbaaTmbcbhYinJbbbbh80a8KabaYcdtfgeclfydbgLcx2fgOIdwa8Kaeydbghcx2fgAIdwg8Z:tg8Va8VNaOIdbaAIdbg83:tg8Wa8WNaOIdlaAIdlg85:tg8Xa8XNMMg8Sa8Kaecwfydbg8Acx2fgeIdwa8Z:tg8YNa8Va8YNa8WaeIdba83:tg81Na8XaeIdla85:tgBNMMgRa8VN:tJbbbbJbbjZa8Sa8Ya8YNa81a81NaBaBNMMg8UNaRaRN:tg86:va86Jbbbb9BEg86Nh88a8Ua8VNaRa8YN:ta86Nh89a8SaBNaRa8XN:ta86Nh8:a8Ua8XNaRaBN:ta86NhZa8Sa81NaRa8WN:ta86Nhna8Ua8WNaRa81N:ta86Nhca8WaBNa8Xa81N:tgRaRNa8Xa8YNa8VaBN:tgRaRNa8Va81Na8Wa8YN:tgRaRNMM:rJbbbZNhRa8Pahaa2g8JcdtfhOa8Pa8Aaa2g8McdtfhAa8PaLaa2gDcdtfhCa8Z:mhJa85:mh9ea83:mhTascjdfheaahQJbbbbhBJbbbbh86Jbbbbh8SJbbbbh8UJbbbbh8ZJbbbbh83Jbbbbh85Jbbbbh87JbbbbhUinaecwfaRa89aCIdbaOIdbg8Y:tg8XNa88aAIdba8Y:tg81NMg8VNUdbaeclfaRaZa8XNa8:a81NMg8WNUdbaeaRaca8XNana81NMg8XNUdbaecxfaRaJa8VNa9ea8WNa8YaTa8XNMMMg8YNUdbaRa8Va8WNNa8ZMh8ZaRa8Va8XNNa8UMh8UaRa8Wa8XNNa8SMh8SaRa8Ya8YNNaUMhUaRa8Va8YNNa87Mh87aRa8Wa8YNNa85Mh85aRa8Xa8YNNa83Mh83aRa8Va8VNNa86Mh86aRa8Wa8WNNaBMhBaRa8Xa8XNNa80Mh80aOclfhOaCclfhCaAclfhAaeczfheaQcufgQmbkagahc8S2fgea80aeIdbMUdbaeaBaeIdlMUdlaea86aeIdwMUdwaea8SaeIdxMUdxaea8UaeIdzMUdzaea8ZaeIdCMUdCaea83aeIdKMUdKaea85aeId3MUd3aea87aeIdaMUdaaeaUaeId8KMUd8KaeaRaeIdyMUdyagaLc8S2fgea80aeIdbMUdbaeaBaeIdlMUdlaea86aeIdwMUdwaea8SaeIdxMUdxaea8UaeIdzMUdzaea8ZaeIdCMUdCaea83aeIdKMUdKaea85aeId3MUd3aea87aeIdaMUdaaeaUaeId8KMUd8KaeaRaeIdyMUdyaga8Ac8S2fgea80aeIdbMUdbaeaBaeIdlMUdlaea86aeIdwMUdwaea8SaeIdxMUdxaea8UaeIdzMUdzaea8ZaeIdCMUdCaea83aeIdKMUdKaea85aeId3MUd3aea87aeIdaMUdaaeaUaeId8KMUd8KaeaRaeIdyMUdya8Ra8JcltfhLcbhOaahCinaLaOfgeascjdfaOfgAIdbaeIdbMUdbaeclfgQaAclfIdbaQIdbMUdbaecwfgQaAcwfIdbaQIdbMUdbaecxfgeaAcxfIdbaeIdbMUdbaOczfhOaCcufgCmbka8RaDcltfhLcbhOaahCinaLaOfgeascjdfaOfgAIdbaeIdbMUdbaeclfgQaAclfIdbaQIdbMUdbaecwfgQaAcwfIdbaQIdbMUdbaecxfgeaAcxfIdbaeIdbMUdbaOczfhOaCcufgCmbka8Ra8McltfhLcbhOaahCinaLaOfgeascjdfaOfgAIdbaeIdbMUdbaeclfgQaAclfIdbaQIdbMUdbaecwfgQaAcwfIdbaQIdbMUdbaecxfgeaAcxfIdbaeIdbMUdbaOczfhOaCcufgCmbkaYcifgYad6mbkkcbhAdndnamcwGgSmbJbbbbh86cbh9hcbh9icbh6xekcbh9ha3cbyd;y:L:cjbHjjjjbbh6asc:Cefasyd;8egecdtfa6BdbasaecefBd;8ecua6alabadaHz:fjjjbgCcltaCcjjjjiGEcbyd;y:L:cjbHjjjjbbh9iasc:Cefasyd;8egecdtfa9iBdbasaecefBd;8ea9iaCa6a8Kalz:gjjjbJFFuuh86aCTmba9iheaChOinaeIdbgRa86a86aR9EEh86aeclfheaOcufgOmbkaCh9hkdnalTmbaKclfheaKydbhCa5hOalhQcbhAincbaeydbgLaC9RaORbbcpeGEaAfhAaOcefhOaeclfheaLhCaQcufgQmbkaAce4hAkcuadaA9Rcifg9kcx2a9kc;v:Q;v:Qe0Ecbyd;y:L:cjbHjjjjbbh0asc:Cefasyd;8egecdtfa0BdbasaecefBd;8ecua9kcdta9kcFFFFi0Ecbyd;y:L:cjbHjjjjbbh9masc:Cefasyd;8egecdtfa9mBdbasaecefBd;8ea3cbyd;y:L:cjbHjjjjbbh9nasc:Cefasyd;8egecdtfa9nBdbasaecefBd;8ealcbyd;y:L:cjbHjjjjbbh9oasc:Cefasyd;8egecdtfa9oBdbasaecefBd;8eaxaxNayJbbjZamclGEg9pa9pN:vh87JbbbbhUdnadak9nmbdna9kci6mbamcjdGh9qaaclth9ra0cwfh9sJbbbbh85JbbbbhUinascNefabadalaHz:cjjjbabh8Acbh3cbh9tinaba9tcdtfh8McbheindnaHa8AaefydbgAcdtghfydbgCaHa8Maec:W:G:cjbfydbcdtfydbgOcdtg8JfydbgQSmba5aOfRbbgYco2a5aAfRbbgLfRb;a:G:cjbg8LaLco2aYfgDRb;a:G:cjbg9cVcFeGTmbdnaQaC9nmbaDRb;W:G:cjbcFeGmekdnaLcufcFeGce0mbaYTmba8EahfydbaO9hmekdnaLTmbaYcufcFeGce0mba8Fa8JfydbaA9hmeka0a3cx2fgCaOaAa9ccFeGgQEBdlaCaAaOaQEBdbaCaQa8LGcb9hBdwa3cefh3kaeclfgecx9hmbkdna9tcifg9tad9pmba8Acxfh8Aa3cifa9k9nmekka3TmdcbhDinaIaHa0aDcx2fghydbgLcdtgCfydbg8Jc8S2fgeIdwa8KahydlgYcx2fgOIdwg8WNaeIdzaOIdbg8XNaeIdaMgRaRMMa8WNaeIdlaOIdlg8YNaeIdCa8WNaeId3MgRaRMMa8YNaeIdba8XNaeIdxa8YNaeIdKMgRaRMMa8XNaeId8KMMM:lhRJbbbbJbbjZaeIdyg8V:va8VJbbbb9BEh8Vdndnahydwg8MmbJFFuuhBxekJbbbbJbbjZaIaHaYcdtfydbc8S2fgeIdyg81:va81Jbbbb9BEaeIdwa8KaLcx2fgOIdwg81NaeIdzaOIdbg80NaeIdaMgBaBMMa81NaeIdlaOIdlgBNaeIdCa81NaeId3Mg81a81MMaBNaeIdba80NaeIdxaBNaeIdKMg81a81MMa80NaeId8KMMM:lNhBka8VaRNh80dnaaTmbagaLc8S2fgAIdwa8WNaAIdza8XNaAIdaMgRaRMMa8WNaAIdla8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8PaYaa2gQcdtfhOa8RaLaa2g8AcltfheaAIdyh81aahAinaOIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaOclfhOaeczfheaAcufgAmbkaR:lgRa81aRa819DEaRa9qEh8Sdndna8MmbJbbbbhRxekagaYc8S2fgAIdwa8KaLcx2fgeIdwg8WNaAIdzaeIdbg8XNaAIdaMgRaRMMa8WNaAIdlaeIdlg8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8Pa8AcdtfhOa8RaQcltfheaAIdyh81aahAinaOIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaOclfhOaeczfheaAcufgAmbkaR:lgRa81aRa819DEaRa9qEhRka80a8SMh80aBaRMhBdndndna5aLfRbbc9:fPibeedkdna8Fa8Ea8EaCfydbaYSEaXaCfydbgQcdtfydbgCcu9hmbaXaYcdtfydbhCkagaQc8S2fgAIdwa8KaCcx2fgeIdwg8WNaAIdzaeIdbg8XNaAIdaMgRaRMMa8WNaAIdlaeIdlg8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8PaCaa2g8AcdtfhOa8RaQaa2g8JcltfheaAIdyh81aahAinaOIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaOclfhOaeczfheaAcufgAmbkaR:lgRa81aRa819DEaRa9qEh8Sdndna8MmbJbbbbhRxekagaCc8S2fgAIdwa8KaQcx2fgeIdwg8WNaAIdzaeIdbg8XNaAIdaMgRaRMMa8WNaAIdlaeIdlg8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8Pa8JcdtfhOa8Ra8AcltfheaAIdyh81aahAinaOIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaOclfhOaeczfheaAcufgAmbkaR:lgRa81aRa819DEaRa9qEhRka80a8SMh80aBaRMhBxdkaXaCfydbgCaLSmbaHaYcdtfydbh8Aindndna8EaCcdtgQfydbgecuSmbaHaecdtfydba8ASmekdna8FaQfydbgecuSmbaHaecdtfydba8ASmekaYhekagaCc8S2fgAIdwa8Kaecx2fgOIdwg8WNaAIdzaOIdbg8XNaAIdaMgRaRMMa8WNaAIdlaOIdlg8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8Paeaa2cdtfhOa8RaCaa2cltfheaAIdyh81aahAinaOIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaOclfhOaeczfheaAcufgAmbka80aR:lgRa81aRa819DEaRa9qEMh80aXaQfydbgCaL9hmbkkdna5aYfRbbgeciSmbaecl9hmeka8MTmbaXaYcdtfydbgCaYSmbindndna8EaCcdtgQfydbgecuSmbaHaecdtfydba8JSmekdna8FaQfydbgecuSmbaHaecdtfydba8JSmekaLhekagaCc8S2fgAIdwa8Kaecx2fgOIdwg8WNaAIdzaOIdbg8XNaAIdaMgRaRMMa8WNaAIdlaOIdlg8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8Paeaa2cdtfhOa8RaCaa2cltfheaAIdyh81aahAinaOIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaOclfhOaeczfheaAcufgAmbkaBaR:lgRa81aRa819DEaRa9qEMhBaXaQfydbgCaY9hmbkkahaBa80aBa809DgeEUdwahaLaYaea8Mcb9hGgeEBdlahaYaLaeEBdbaDcefgDa39hmbkascjdfcbcj;qbz:xjjjb8Aa9shea3hOinascjdfaeydbcA4cF8FGgAcFAaAcFA6EcdtfgAaAydbcefBdbaecxfheaOcufgOmbkcbhecbhOinascjdfaefgAydbhCaAaOBdbaCaOfhOaeclfgecj;qb9hmbkcbhea9shOinascjdfaOydbcA4cF8FGgAcFAaAcFA6EcdtfgAaAydbgAcefBdba9maAcdtfaeBdbaOcxfhOa3aecefge9hmbkadak9RgAci9Uh9udnalTmbcbhea9nhOinaOaeBdbaOclfhOalaecefge9hmbkkcbh9va9ocbalz:xjjjbh9caAcO9Uh9wa9uce4h9tcbh8Lcbh8Mdnina0a9ma8Mcdtfydbcx2fg8JIdwgRa879Emea8La9u9pmeJFFuuh8Vdna9ta39pmba0a9ma9tcdtfydbcx2fIdwJbb;aZNh8VkdnaRa8V9ETmbaRaU9ETmba8La9w0mdkdna9caHa8JydlgDcdtg9xfg8AydbgAfg9yRbba9caHa8Jydbghcdtg9zfydbgefg9ARbbVmba5ahfRbbh9BdndnaKaecdtfgOclfydbgCaOydbgOSmbaCaO9RhCa8KaAcx2fhLa8Kaecx2fhYaEaOcitfheindna9naeydbcdtfydbgOaASmba9naeclfydbcdtfydbgQaASmbaOaQSmba8KaQcx2fgQIdba8KaOcx2fgOIdbg8W:tgRaYIdlaOIdlg8X:tg80NaQIdla8X:tg8VaYIdba8W:tgBN:tg8YaRaLIdla8X:tg8SNa8VaLIdba8W:tg8UN:tg8XNa8VaYIdwaOIdwg81:tg8ZNaQIdwa81:tg8Wa80N:tg80a8VaLIdwa81:tg83Na8Wa8SN:tg8VNa8WaBNaRa8ZN:tg81a8Wa8UNaRa83N:tgRNMMa8Ya8YNa80a80Na81a81NMMa8Xa8XNa8Va8VNaRaRNMMN:rJbbj8:N9FmikaecwfheaCcufgCmbkkdndna9Bc99fcFeGce0mba9na9zfaDBdbaXa9zfydbgeahSmeina8AydbhAdndna8EaecdtgOfydbgecuSmbaHaecdtfydbaASmekdna8FaOfydbgecuSmbaHaecdtfydbaASmekaDheka9naOfaeBdbaXaOfydbgeah9hmbxdkkdndna9BcFeGcdSmbaDhexekdna8Fa8Ea8Ea9zfydbaDSEaXa9zfydbghcdtfydbgecu9hmbaXa9xfydbheka9na9zfaDBdbka9nahcdtfaeBdbka9Ace86bba9yce86bba8JIdwgRaUaUaR9DEhUa9vcefh9vcecda9BcFeGceSEa8Lfh8Lxeka9tcefh9tka8Mcefg8Ma39hmbkka9vTmddnalTmbcbhLcbhhindna9nahcdtgefydbgAahSmbaHaAcdtfydbh8AdnahaHaefydb9hg8JmbaIa8Ac8S2fgeaIahc8S2fgOIdbaeIdbMUdbaeaOIdlaeIdlMUdlaeaOIdwaeIdwMUdwaeaOIdxaeIdxMUdxaeaOIdzaeIdzMUdzaeaOIdCaeIdCMUdCaeaOIdKaeIdKMUdKaeaOId3aeId3MUd3aeaOIdaaeIdaMUdaaeaOId8KaeId8KMUd8KaeaOIdyaeIdyMUdya8NTmba8Na8Acltfgea8NahcltfgOIdbaeIdbMUdbaeaOIdlaeIdlMUdlaeaOIdwaeIdwMUdwaeaOIdxaeIdxMUdxkaaTmbagaAc8S2fgeagahc8S2g8MfgOIdbaeIdbMUdbaeaOIdlaeIdlMUdlaeaOIdwaeIdwMUdwaeaOIdxaeIdxMUdxaeaOIdzaeIdzMUdzaeaOIdCaeIdCMUdCaeaOIdKaeIdKMUdKaeaOId3aeId3MUd3aeaOIdaaeIdaMUdaaeaOId8KaeId8KMUd8KaeaOIdyaeIdyMUdya9raA2hYa8RhOaahCinaOaYfgeaOaLfgAIdbaeIdbMUdbaeclfgQaAclfIdbaQIdbMUdbaecwfgQaAcwfIdbaQIdbMUdbaecxfgeaAcxfIdbaeIdbMUdbaOczfhOaCcufgCmbka8JmbJbbbbJbbjZaIa8MfgeIdygR:vaRJbbbb9BEaeIdwa8Ka8Acx2fgOIdwgRNaeIdzaOIdbg8VNaeIdaMg8Wa8WMMaRNaeIdlaOIdlg8WNaeIdCaRNaeId3MgRaRMMa8WNaeIdba8VNaeIdxa8WNaeIdKMgRaRMMa8VNaeId8KMMM:lNgRa85a85aR9DEh85kaLa9rfhLahcefghal9hmbkcbhOa8EheindnaeydbgAcuSmbdnaOa9naAcdtgCfydbgA9hmbcuhAa8EaCfydbgCcuSmba9naCcdtfydbhAkaeaABdbkaeclfhealaOcefgO9hmbkcbhOa8FheindnaeydbgAcuSmbdnaOa9naAcdtgCfydbgA9hmbcuhAa8FaCfydbgCcuSmba9naCcdtfydbhAkaeaABdbkaeclfhealaOcefgO9hmbkka85aUaaEh85cbhOabhecbhAindnaHa9naeydbcdtfydbgLcdtfydbgCaHa9naeclfydbcdtfydbgYcdtfydbgQSmbaCaHa9naecwfydbcdtfydbg8AcdtfydbghSmbaQahSmbabaOcdtfgCaLBdbaCcwfa8ABdbaCclfaYBdbaOcifhOkaecxfheaAcifgAad6mbkdndnaSmbaOhdxekdnaOak0mbaOhdxekdna86a859FmbaOhdxekJFFuuh86cbhdabhecbhAindna9ia6aeydbgCcdtfydbcdtfIdbgRa859ETmbaeclf8Pdbh9CabadcdtfgQaCBdbaQclfa9C83dbaRa86a86aR9EEh86adcifhdkaecxfheaAcifgAaO6mbkkadak0mbxdkkascNefabadalaHz:cjjjbkdndnadak0mbadhYxekdnaSmbadhYxekdna86a879FmbadhYxekcehQina86Jbb;aZNgRa87aRa879DEh8WJbbbbhRdna9hTmba9ihea9hhOinaeIdbg8VaRa8Va8W9FEaRa8VaR9EEhRaeclfheaOcufgOmbkkJFFuuh86cbhYabhecbhOindna9ia6aeydbgAcdtfydbcdtfIdbg8Va8W9ETmbaeclf8Pdbh9CabaYcdtfgCaABdbaCclfa9C83dba8Va86a86a8V9EEh86aYcifhYkaecxfheaOcifgOad6mbkdnaQaYad9hVceGmbadhYxdkaRaUaUaR9DEhUaYak9nmecbhQaYhda86a879FmbkkdnamcjjjjdGTmba9ocbalz:xjjjbh8AdnaYTmbabheaYhOina8AaeydbgAfce86bba8AaHaAcdtfydbfce86bbaeclfheaOcufgOmbkkascNefabaYalaHz:cjjjbdndnalTmbcbhCindna8AaCfRbbTmbdna5aCfRbbPlbeebekdnaHaCcdtgLfydbgeaCSmba8KaCcx2fgOa8Kaecx2fgeydwBdwaOae8Pdb83dbxekaIaCc8S2fgQIdygnanJL:3;rUNgRMh87aQIdwgxaRMh8SaQIdlg9DaRMh8UaQIdbg9EaRMh81aQIdag9FaRa8KaCcx2fg8JIdwg88N:th8ZaQId3g9GaRa8JIdlg89N:th83aQIdKg9Ha8JIdbg8:aRN:th80JbbbbhZaQIdCg9IJbbbbMh85aQIdzg9JJbbbbMhBaQIdxg9KJbbbbMh86dndnaaTmbaChAinJbbbba87agaAc8S2fgOIdygR:vaRJbbbb9BEhRa8RaAaa2cltfheaOIdaa87Na8ZMh8ZaOId3a87Na83Mh83aOIdKa87Na80Mh80aOIdCa87Na85Mh85aOIdza87NaBMhBaOIdxa87Na86Mh86aOIdwa87Na8SMh8SaOIdla87Na8UMh8UaOIdba87Na81Mh81aahOina8ZaecwfIdbg8VaecxfIdbg8YNaRN:th8Za83aeclfIdbg8Wa8YNaRN:th83a85a8Wa8VNaRN:th85a81aeIdbg8Xa8XNaRN:th81a80a8Xa8YNaRN:th80aBa8Xa8VNaRN:thBa86a8Xa8WNaRN:th86a8Sa8Va8VNaRN:th8Sa8Ua8Wa8WNaRN:th8UaeczfheaOcufgOmbkaXaAcdtfydbgAaC9hmbka8NTmba8NaCcltfgeIdxhTaeIdwhcaeIdlhJaeIdbhRxekJbbbbhTJbbbbhcJbbbbhJJbbbbhRkaBa81:vg8Wa80Na8Z:ta85aBa86a81:vg8VN:tg8Za8Ua86a8VN:tg8Y:vg8Xa8Va80Na83:tg8UN:th83acaRa8WN:taJaRa8VN:tg86a8XN:tg85a8SaBa8WN:ta8Za8XN:tgB:vg8S:mh8Za86a8Y:vgc:mhJdnJbbbbaRaRa81:vg9eN:ta86acN:ta85a8SN:tg86:la87J:983:g81NgR9ETmba8Za83NaJa8UNa9ea80NaT:tMMa86:vhZka81:laR9ETmba8Y:laR9ETmbaB:laR9ETmba9e:maZNa8W:ma8ZaZNa83aB:vMgBNa8V:maJaZNa8X:maBNa8Ua8Y:vMMg85Na80:ma81:vMMMh87aKaLfgeclfydbgOaeydbge9RhhaEaecitfhLJbbbbhRdnaOaeSg8MmbJbbbbhRaLheahhAina8Kaeclfydbcx2fgOIdwa88:tg8Va8VNaOIdba8::tg8Va8VNaOIdla89:tg8Va8VNMMg8Va8Kaeydbcx2fgOIdwa88:tg8Wa8WNaOIdba8::tg8Wa8WNaOIdla89:tg8Wa8WNMMg8WaRaRa8W9DEgRaRa8V9DEhRaecwfheaAcufgAmbkaR:rgRaRNhRkaBa88:tg8Va8VNa87a8::tg8Va8VNa85a89:tg8Va8VNMMaR9EmbaQId8KhZdna8Mmbina8KaLclfydbcx2fgeIdba8KaLydbcx2fgOIdbg8W:tgRa89aOIdlg8X:tg80NaeIdla8X:tg8Va8:a8W:tg86N:tg8YaRa85a8X:tg8SNa8Va87a8W:tg8UN:tg8XNa8Va88aOIdwg81:tg8ZNaeIdwa81:tg8Wa80N:tg80a8VaBa81:tg83Na8Wa8SN:tg8VNa8Wa86NaRa8ZN:tg81a8Wa8UNaRa83N:tgRNMMa8Ya8YNa80a80Na81a81NMMa8Xa8XNa8Va8VNaRaRNMMN:rJbbj8:N9FmdaLcwfhLahcufghmbkkJbbbbJbbjZan:vanJbbbb9BEgRaxaBNa9Ja87Na9FMg8Va8VMMaBNa9Da85Na9IaBNa9GMg8Va8VMMa85Na9Ea87Na9Ka85Na9HMg8Va8VMMa87NaZMMM:lNaRaxa88Na9Ja8:Na9FMg8Va8VMMa88Na9Da89Na9Ia88Na9GMg8Va8VMMa89Na9Ea8:Na9Ka89Na9HMg8Va8VMMa8:NaZMMM:lNJbb;aZNJ:983:g81M9Emba8JaBUdwa8Ja85Udla8Ja87UdbkaCcefgCal9hmbkdnaambcbhaxdkcbhQindna8AaQfRbbTmbaHaQcdtgefydbaQ9hmba5aQfhhaXaefh8Ja8KaQcx2fhAa8PaQaa2cdtfh8McbhEincuhCdnahRbbc99fcFeGce0mbaQhCa8JydbgeaQSmba8PaEcdtgOfhLa8MaOfIdbhRaQhCinaChOcuhCdnaLaeaa2cdtfIdbaR9CmbaOcuSmbaOhCagaec8S2fIdyagaOc8S2fIdy9ETmbaehCkaXaecdtfydbgeaQ9hmbkka8PaEcdtfhLa8RaEcltfhKaQheinaLaeaa2cdtfJbbbbJbbjZagaeaCaCcuSEgOc8S2fIdygR:vaRJbbbb9BEaKaOaa2cltfgOIdwaAIdwNaOIdbaAIdbNaOIdlaAIdlNMMaOIdxMNUdbaXaecdtfydbgeaQ9hmbkaEcefgEaa9hmbkkaQcefgQal9hmbxdkkaambcbhakaiavaoarawaaala8Ka8Pazasayasc1efa5a8Aaqz:hjjjbkdnamcjjjjlGTmbazmbaYTmbabhecbhLina5aeydbgAfRbbc3thQaecwfgXydbhHcjjjj94hCdna8EaAcdtgEfydbaeclfgKydbgOSmbcjjjj94cba8FaOcdtfydbaASEhCkaeaQaCVaAVBdba5aOfRbbc3thacjjjj94hCcjjjj94hQdna8EaOcdtfydbaHSmbcjjjj94cba8FaHcdtfydbaOSEhQkaKaaaQVaOVBdba5aHfRbbc3thOdna8EaHcdtfydbaASmbcjjjj94cba8FaEfydbaHSEhCkaXaOaCVaHVBdbaecxfheaLcifgLaY6mbkkdnazTmbaYTmbaYheinabazabydbcdtfydbBdbabclfhbaecufgembkkdnaPTmbaPa9paU:rNUdbkdnasyd;8egHTmbaHcdtasc:Ceffc98fheinaeydbcbyd;C:L:cjbH:bjjjbbaec98fheaHcufgHmbkkascj;sbf8KjjjjbaYk;Yieouabydlhvabydbclfcbaicdtz:xjjjbhoadci9UhrdnadTmbdnalTmbaehwadhDinaoalawydbcdtfydbcdtfgqaqydbcefBdbawclfhwaDcufgDmbxdkkaehwadhDinaoawydbcdtfgqaqydbcefBdbawclfhwaDcufgDmbkkdnaiTmbcbhDaohwinawydbhqawaDBdbawclfhwaqaDfhDaicufgimbkkdnadci6mbinaecwfydbhwaeclfydbhDaeydbhidnalTmbalawcdtfydbhwalaDcdtfydbhDalaicdtfydbhikavaoaicdtfgqydbcitfaDBdbavaqydbcitfawBdlaqaqydbcefBdbavaoaDcdtfgqydbcitfawBdbavaqydbcitfaiBdlaqaqydbcefBdbavaoawcdtfgwydbcitfaiBdbavawydbcitfaDBdlawawydbcefBdbaecxfhearcufgrmbkkabydbcbBdbk:todDue99aicd4aifhrcehwinawgDcethwaDar6mbkcuaDcdtgraDcFFFFi0Ecbyd;y:L:cjbHjjjjbbhwaoaoyd9GgqcefBd9GaoaqcdtfawBdbawcFearz:xjjjbhkdnaiTmbalcd4hlaDcufhxcbhminamhDdnavTmbavamcdtfydbhDkcbadaDal2cdtfgDydlgwawcjjjj94SEgwcH4aw7c:F:b:DD2cbaDydbgwawcjjjj94SEgwcH4aw7c;D;O:B8J27cbaDydwgDaDcjjjj94SEgDcH4aD7c:3F;N8N27axGhwamcdthPdndndnavTmbakawcdtfgrydbgDcuSmeadavaPfydbal2cdtfgsIdbhzcehqinaqhrdnadavaDcdtfydbal2cdtfgqIdbaz9CmbaqIdlasIdl9CmbaqIdwasIdw9BmlkarcefhqakawarfaxGgwcdtfgrydbgDcu9hmbxdkkakawcdtfgrydbgDcuSmbadamal2cdtfgsIdbhzcehqinaqhrdnadaDal2cdtfgqIdbaz9CmbaqIdlasIdl9CmbaqIdwasIdw9BmikarcefhqakawarfaxGgwcdtfgrydbgDcu9hmbkkaramBdbamhDkabaPfaDBdbamcefgmai9hmbkkakcbyd;C:L:cjbH:bjjjbbaoaoyd9GcufBd9GdnaeTmbaiTmbcbhDaehwinawaDBdbawclfhwaiaDcefgD9hmbkcbhDaehwindnaDabydbgrSmbawaearcdtfgrydbBdbaraDBdbkabclfhbawclfhwaiaDcefgD9hmbkkk;:odvuv998Jjjjjbca9Rgocbyd1:G:cjbBdKaocb8Pdj:G:cjb83izaocbydN:G:cjbBdwaocb8Pd:m:G:cjb83ibdnadTmbaicd4hrdnabmbdnalTmbcbhwinaealawcdtfydbar2cdtfhDcbhiinaoczfaifgqaDaifIdbgkaqIdbgxaxak9EEUdbaoaifgqakaqIdbgxaxak9DEUdbaiclfgicx9hmbkawcefgwad9hmbxikkarcdthwcbhDincbhiinaoczfaifgqaeaifIdbgkaqIdbgxaxak9EEUdbaoaifgqakaqIdbgxaxak9DEUdbaiclfgicx9hmbkaeawfheaDcefgDad9hmbxdkkdnalTmbcbhwinabawcx2fgiaealawcdtfydbar2cdtfgDIdbUdbaiaDIdlUdlaiaDIdwUdwcbhiinaoczfaifgqaDaifIdbgkaqIdbgxaxak9EEUdbaoaifgqakaqIdbgxaxak9DEUdbaiclfgicx9hmbkawcefgwad9hmbxdkkarcdthlcbhwaehDinabawcx2fgiaeawar2cdtfgqIdbUdbaiaqIdlUdlaiaqIdwUdwcbhiinaoczfaifgqaDaifIdbgkaqIdbgxaxak9EEUdbaoaifgqakaqIdbgxaxak9DEUdbaiclfgicx9hmbkaDalfhDawcefgwad9hmbkkJbbbbaoIdbaoIdzgx:tgkakJbbbb9DEgkaoIdlaoIdCgm:tgPaPak9DEgkaoIdwaoIdKgP:tgsasak9DEhsdnabTmbadTmbJbbbbJbbjZas:vasJbbbb9BEhkinabakabIdbax:tNUdbabclfgoakaoIdbam:tNUdbabcwfgoakaoIdbaP:tNUdbabcxfhbadcufgdmbkkdnavTmbavaPUdwavamUdlavaxUdbkask:WlewudnaeTmbcbhvabhoinaoavBdbaoclfhoaeavcefgv9hmbkkdnaiTmbcbhrinadarcdtfhwcbhDinalawaDcdtgvyd:G:G:cjbcdtfydbcdtfydbhodnalawavfydbcdtfydbgqabaqcdtfgkydbgvSmbinakabavgqcdtfgxydbgvBdbaxhkaqav9hmbkkdnaoabaocdtfgkydbgvSmbinakabavgocdtfgxydbgvBdbaxhkaoav9hmbkkdnaqaoSmbabaqaoaqao0Ecdtfaqaoaqao6EBdbkaDcefgDci9hmbkarcifgrai6mbkkdnaembcbskcbhxindnalaxcdtgvfydbax9hmbaxhodnaxabavfgDydbgvSmbaDhqinaqabavgocdtfgkydbgvBdbakhqaoav9hmbkkaDaoBdbkaxcefgxae9hmbkcbhkabhvcbhoindndnaoalydbgq9hmbdnaoavydbgq9hmbavakBdbakcefhkxdkavabaqcdtfydbBdbxekavabaqcdtfydbBdbkalclfhlavclfhvaeaocefgo9hmbkakk;jiilud99euabcbaecltz:xjjjbhvdnalTmbadhoaihralhwinarcwfIdbhDarclfIdbhqavaoydbcltfgkarIdbakIdbMUdbakaqakIdlMUdlakaDakIdwMUdwakakIdxJbbjZMUdxaoclfhoarcxfhrawcufgwmbkkdnaeTmbavhkaehrinakcxfgoIdbhDaocbBdbakakIdbJbbbbJbbjZaD:vaDJbbbb9BEgDNUdbakclfgoaDaoIdbNUdbakcwfgoaDaoIdbNUdbakczfhkarcufgrmbkkdnalTmbinavadydbcltfgkaicwfIdbakIdw:tgDaDNaiIdbakIdb:tgDaDNaiclfIdbakIdl:tgDaDNMMgDakIdxgqaqaD9DEUdxadclfhdaicxfhialcufglmbkkdnaeTmbavcxfhkinabakIdbUdbakczfhkabclfhbaecufgembkkk:moerudnaoTmbaecd4hzdnavTmbaicd4hHavcdthOcbhAindnaPaAfRbbTmbaAhednaDTmbaDaAcdtfydbhekdnasTmbasaefRbbceGmekdnamaAfRbbcvSmbabaeaz2cdtfgiaraAcx2fgCIdbakNaxIdbMUdbaiaCIdlakNaxIdlMUdlaiaCIdwakNaxIdwMUdwkadaeaH2cdtfhXaqheawhiavhCinaXaeydbcdtgQfaiIdbalaQfIdb:vUdbaeclfheaiclfhiaCcufgCmbkkawaOfhwaAcefgAao9hmbxdkkdnasmbcbheaDhiindnaPaefRbbTmbaehCdnaDTmbaiydbhCkamaefRbbcvSmbabaCaz2cdtfgCarIdbakNaxIdbMUdbaCarclfIdbakNaxIdlMUdlaCarcwfIdbakNaxIdwMUdwkaiclfhiarcxfhraoaecefge9hmbxdkkdnaDTmbindnaPRbbTmbasaDydbgefRbbceGmbamRbbcvSmbabaeaz2cdtfgearIdbakNaxIdbMUdbaearclfIdbakNaxIdlMUdlaearcwfIdbakNaxIdwMUdwkaPcefhPaDclfhDamcefhmarcxfhraocufgombxdkkazcdthicbheindnaPaefRbbTmbasaefRbbceGmbamaefRbbcvSmbabarIdbakNaxIdbMUdbabclfarclfIdbakNaxIdlMUdbabcwfarcwfIdbakNaxIdwMUdbkarcxfhrabaifhbaoaecefge9hmbkkk8MbabaeadaialavcbcbcbcbcbaoarawaDz:bjjjbk8MbabaeadaialavaoarawaDaqakaxamaPz:bjjjbkRbababaeadaialavaoarawaDaqakaxcjjjjdVamz:bjjjbk:vgoque99due99duq998Jjjjjbc;Wb9Rgq8Kjjjjbcbhkaqcxfcbc;Kbz:xjjjb8Aaqcualcx2alc;v:Q;v:Qe0Ecbyd;y:L:cjbHjjjjbbgxBdxaqceBd2axaialavcbcbz:ejjjb8AaqcualcdtalcFFFFi0Egmcbyd;y:L:cjbHjjjjbbgiBdzaqcdBd2dndnJFF959eJbbjZawJbbjZawJbbjZ9DE:vawJ9VO:d869DEgw:lJbbb9p9DTmbaw:OhPxekcjjjj94hPkadci9Uhsarco9UhzdndnaombaPcd9imekdnalTmbaPcuf:YhwdnaoTmbcbhvaihHaxhOindndnaoavfRbbceGTmbavcjjjjlVhAxekdndnaOclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhAxekcjjjj94hAkaAcqthAdndnaOcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaAaXVhAdndnaOIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaAaXcCtVhAkaHaABdbaHclfhHaOcxfhOalavcefgv9hmbxdkkaxhvaihOalhHindndnavIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhAxekcjjjj94hAkaAcCthAdndnavclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaXcqtaAVhAdndnavcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaOaAaXVBdbavcxfhvaOclfhOaHcufgHmbkkadTmbcbhkaehvcbhOinakaiavclfydbcdtfydbgHaiavcwfydbcdtfydbgA9haiavydbcdtfydbgXaH9haXaA9hGGfhkavcxfhvaOcifgOad6mbkkarci9UhQdndnaz:Z:rJbbbZMgw:lJbbb9p9DTmbaw:Ohvxekcjjjj94hvkaQ:ZhLcbhKc:bwhzdninakaQ9pmeazaP9Rcd9imeavazcufgOavaO9iEaPcefavaP9kEhYdnalTmbaYcuf:YhwdnaoTmbcbhOaihHaxhvindndnaoaOfRbbceGTmbaOcjjjjlVhAxekdndnavclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhAxekcjjjj94hAkaAcqthAdndnavcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaAaXVhAdndnavIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaAaXcCtVhAkaHaABdbaHclfhHavcxfhvalaOcefgO9hmbxdkkaxhvaihOalhHindndnavIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhAxekcjjjj94hAkaAcCthAdndnavclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaXcqtaAVhAdndnavcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaOaAaXVBdbavcxfhvaOclfhOaHcufgHmbkkcbhOdnadTmbaehvcbhHinaOaiavclfydbcdtfydbgAaiavcwfydbcdtfydbgX9haiavydbcdtfydbgraA9haraX9hGGfhOavcxfhvaHcifgHad6mbkkdnas:ZgCaL:taY:Ygwaz:Y:tg8ANak:ZgEaO:Zg3:tNaEaL:tawaP:Y:tg5Na3aC:tNMg8EJbbbb9BmbaCaE:ta5a8Aa3aL:tNNNa8E:vawMhwkdndnaOaQ0mbaOhkaYhPxekaOhsaYhzkdndnaKcl0mbdnawJbbbZMgw:lJbbb9p9DTmbaw:Ohvxdkcjjjj94hvxekaPazfcd9ThvkaKcefgKcs9hmbkkdndndnakmbJbbjZhwcbhOcdhvaDmexdkalcd4alfhHcehOinaOgvcethOavaH6mbkaqcuavcdtavcFFFFi0Ecbyd;y:L:cjbHjjjjbbgYBdCaqciBd2aqamcbyd;y:L:cjbHjjjjbbgzBdKaqclBd2dnalTmbaPcuf:YhwdnaoTmbcbhOaihAaxhHindndnaoaOfRbbceGTmbaOcjjjjlVhXxekdndnaHclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaXcqthXdndnaHcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:Ohrxekcjjjj94hrkaXarVhXdndnaHIdbawNJbbbZMgC:lJbbb9p9DTmbaC:Ohrxekcjjjj94hrkaXarcCtVhXkaAaXBdbaAclfhAaHcxfhHalaOcefgO9hmbxdkkaxhOaihHalhAindndnaOIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaXcCthXdndnaOclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:Ohrxekcjjjj94hrkarcqtaXVhXdndnaOcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:Ohrxekcjjjj94hrkaHaXarVBdbaOcxfhOaHclfhHaAcufgAmbkkaqcuaYavazaialz:mjjjbgXc8S2gvaXc;D;O;f8U0Ecbyd;y:L:cjbHjjjjbbgiBd3aqcvBd2aicbavz:xjjjbhOdnadTmbcbhraehiinaxaiclfydbgocx2fgvIdbaxaiydbgPcx2fgHIdbg3:tgCaxaicwfydbgYcx2fgAIdlaHIdlg8A:tgwNavIdla8A:tgEaAIdba3:tg8EN:tgLaLNaEaAIdwaHIdwg5:tg8FNavIdwa5:tgEawN:tgwawNaEa8ENaCa8FN:tgCaCNMMg8E:rhEJbbnnJbbjZazaPcdtfydbgvazaocdtfydbgASavazaYcdtfydbgoSGgHEh8Fdna8EJbbbb9ETmbaLaE:vhLaCaE:vhCawaE:vhwkaOavc8S2fgvavIdbawa8FaE:rNgEawNNg8FMUdbavaCaEaCNgaNghavIdlMUdlavaLaEaLNg8ENggavIdwMUdwavawaaNgaavIdxMUdxava8EawNg8JavIdzMUdzavaCa8ENg8EavIdCMUdCavawaEaLa5Nawa3Na8AaCNMM:mg8ANg3NgwavIdKMUdKavaCa3NgCavId3MUd3avaLa3NgLavIdaMUdaava3a8ANg3avId8KMUd8KavaEavIdyMUdydnaHmbaOaAc8S2fgva8FavIdbMUdbavahavIdlMUdlavagavIdwMUdwavaaavIdxMUdxava8JavIdzMUdzava8EavIdCMUdCavawavIdKMUdKavaCavId3MUd3avaLavIdaMUdaava3avId8KMUd8KavaEavIdyMUdyaOaoc8S2fgva8FavIdbMUdbavahavIdlMUdlavagavIdwMUdwavaaavIdxMUdxava8JavIdzMUdzava8EavIdCMUdCavawavIdKMUdKavaCavId3MUd3avaLavIdaMUdaava3avId8KMUd8KavaEavIdyMUdykaicxfhiarcifgrad6mbkkcbhAaqcuaXcdtgvaXcFFFFi0Egicbyd;y:L:cjbHjjjjbbgHBdaaqcoBd2aqaicbyd;y:L:cjbHjjjjbbgiBd8KaqcrBd2aHcFeavz:xjjjbhPdnalTmbazhHinJbbbbJbbjZaOaHydbgrc8S2fgvIdygw:vawJbbbb9BEavIdwaxcwfIdbgwNavIdzaxIdbgCNavIdaMgLaLMMawNavIdlaxclfIdbgLNavIdCawNavId3MgwawMMaLNavIdbaCNavIdxaLNavIdKMgwawMMaCNavId8KMMM:lNhwdndnaParcdtgvfgrydbcuSmbaiavfIdbaw9ETmekaraABdbaiavfawUdbkaHclfhHaxcxfhxalaAcefgA9hmbkkdndnaXmbJbbbbhwxekJbbbbhwinaiIdbgCawawaC9DEhwaiclfhiaXcufgXmbkaw:rhwkakcd4akfhOcehiinaigvcethiavaO6mbkcbhOaqcuavcdtgiavcFFFFi0Ecbyd;y:L:cjbHjjjjbbgHBdyaHcFeaiz:xjjjbhXdnadTmbavcufhrcbhkcbhxindnazaeaxcdtfgvydbcdtfydbgiazavclfydbcdtfydbgOSmbaiazavcwfydbcdtfydbgvSmbaOavSmbaPavcdtfydbhAdndnaPaOcdtfydbgvaPaicdtfydbgi9pmbavaA9pmbaAhlaihoavhAxekdnaAai9pmbaAav9pmbaihlavhoxekavhlaAhoaihAkabakcx2fgvaABdbavcwfaoBdbavclfalBdbdnaXaoc:3F;N8N2alc:F:b:DD27aAc;D;O:B8J27arGgOcdtfgvydbgicuSmbcehHinaHhvdnabaicx2fgiydbaA9hmbaiydlal9hmbaiydwaoSmikavcefhHaXaOavfarGgOcdtfgvydbgicu9hmbkkavakBdbakcefhkkaxcifgxad6mbkakci2hOkcwhvaDTmekaDawUdbkavcdthvaqcxfc98fhiinaiavfydbcbyd;C:L:cjbH:bjjjbbavc98fgvmbkaqc;Wbf8KjjjjbaOk:0iewuabcFeaecdtz:xjjjbhbdnalmbcbskaecufhvdndnaiTmbcbhocbhrindndndnabaiarcdtgwfydbgDcm4aD7c:v;t;h;Ev2gecs4ae7avGgqcdtfgkydbgxcuSmbceheinaiaxcdtgxfydbaDSmdaqaefhxaecefheabaxavGgqcdtfgkydbgxcu9hmbkkakarBdbaoheaocefhoxekadaxfydbhekadawfaeBdbarcefgral9hmbxdkkcbhocbhDindnabaDcm4aD7c:v;t;h;Ev2gecs4ae7avGgqcdtfgkydbgxcuSmbaxaDSmbceheinabaqaefavGgqcdtfgkydbgxcuSmeaecefheaxaD9hmbkkdndnaxcu9hmbakaDBdbaoheaocefhoxekadaxcdtfydbhekadaDcdtfaeBdbaDcefgDal9hmbkkaok:3ldrue9:8Jjjjjbc;Wb9Rgr8Kjjjjbcbhwarcxfcbc;Kbz:xjjjb8AdnabaeSmbabaeadcdtz:wjjjb8AkarcualcdtalcFFFFi0EgDcbyd;y:L:cjbHjjjjbbgqBdxarceBd2aqcbaialavcbarcxfz:djjjbcualcx2alc;v:Q;v:Qe0Ecbyd;y:L:cjbHjjjjbbhkarcxfaryd2gxcdtfakBdbaraxcefgmBd2akaialavcbcbz:ejjjb8AarcxfamcdtfaDcbyd;y:L:cjbHjjjjbbgiBdbaraxcdfgvBd2arcxfavcdtfcuaialaeadaqz:fjjjbgecltaecjjjjiGEcbyd;y:L:cjbHjjjjbbgqBdbaqaeaiakalz:gjjjbaxcifhkdnadTmbaoaoNhocbhwabhlcbheindnaqaialydbgvcdtfydbcdtfIdbao9ETmbalclf8PdbhPabawcdtfgDavBdbaDclfaP83dbawcifhwkalcxfhlaecifgead6mbkkdnakTmbaxcdtarcxffcwfhlinalydbcbyd;C:L:cjbH:bjjjbbalc98fhlakcufgkmbkkarc;Wbf8Kjjjjbawk;lOoDud99oue99vuv998Jjjjjbc;Wb9Rgw8KjjjjbdndnarmbcbhDxekawcxfcbc;Kbz:xjjjb8Aawcuadcx2adc;v:Q;v:Qe0Ecbyd;y:L:cjbHjjjjbbgqBdxawceBd2aqaeadaicbcbz:ejjjb8AawcuadcdtadcFFFFi0Egkcbyd;y:L:cjbHjjjjbbgxBdzawcdBd2adcd4adfhecehiinaigmcethiamae6mbkcbhPawcuamcdtgsamcFFFFi0Ecbyd;y:L:cjbHjjjjbbgzBdCawciBd2dndnar:ZgH:rJbbbZMgO:lJbbb9p9DTmbaO:Ohixekcjjjj94hikamcufhAc:bwhCcbhXadhQcbhLinaiaCcufgeaiae9iEaPcefaiaP9kEhDdndnadTmbaDcuf:YhOaqhiaxheadhKindndnaiIdbaONJbbbZMgY:lJbbb9p9DTmbaY:Oh8Axekcjjjj94h8Aka8AcCth8AdndnaiclfIdbaONJbbbZMgY:lJbbb9p9DTmbaY:OhExekcjjjj94hEkaEcqta8AVh8AdndnaicwfIdbaONJbbbZMgY:lJbbb9p9DTmbaY:OhExekcjjjj94hEkaea8AaEVBdbaicxfhiaeclfheaKcufgKmbkazcFeasz:xjjjbh3cbh5cbh8Eindna3axa8Ecdtfydbg8Acm4a8A7c:v;t;h;Ev2gics4ai7aAGgKcdtfgEydbgecuSmbaea8ASmbcehiina3aKaifaAGgKcdtfgEydbgecuSmeaicefhiaea8A9hmbkkaEa8ABdba5aecuSfh5a8Ecefg8Ead9hmbxdkkazcFeasz:xjjjb8Acbh5kdnaQ:ZgYaH:taD:YgOaC:Y:tg8FNaX:Zgaa5:Zgh:tNaaaH:taOaP:Y:tggNahaY:tNMg8JJbbbb9BmbaYaa:taga8FahaH:tNNNa8J:vaOMhOkaPaDa5ar0geEhPaXa5aeEhXdna5arSmbaDaCaeEgCaP9Rcd9imbdndnaLcl0mbdnaOJbbbZMgO:lJbbb9p9DTmbaO:Ohixdkcjjjj94hixekaPaCfcd9Thika5aQaeEhQaLcefgLcs9hmekkdndnaXmbcihicbhDxekawakcbyd;y:L:cjbHjjjjbbg8ABdKawclBd2aPcuf:YhYdnadTmbaqhiaxheadhKindndnaiIdbaYNJbbbZMgO:lJbbb9p9DTmbaO:OhExekcjjjj94hEkaEcCthEdndnaiclfIdbaYNJbbbZMgO:lJbbb9p9DTmbaO:Oh3xekcjjjj94h3ka3cqtaEVhEdndnaicwfIdbaYNJbbbZMgO:lJbbb9p9DTmbaO:Oh3xekcjjjj94h3kaeaEa3VBdbaicxfhiaeclfheaKcufgKmbkkawcuazama8Aaxadz:mjjjbgDc32giaDc;j:KM;jb0Ecbyd;y:L:cjbHjjjjbbgeBd3awcvBd2aecbaiz:xjjjbh3avcd4hxdnadTmbdnalTmbaxcdth8Ea8AhEaqhealhKadhAina3aEydbc32fgiaeIdbaiIdbMUdbaiaeclfIdbaiIdlMUdlaiaecwfIdbaiIdwMUdwaiaKIdbaiIdxMUdxaiaKclfIdbaiIdzMUdzaiaKcwfIdbaiIdCMUdCaiaiIdKJbbjZMUdKaEclfhEaecxfheaKa8EfhKaAcufgAmbxdkka8AhKaqheadhEina3aKydbc32fgiaeIdbaiIdbMUdbaiaeclfIdbaiIdlMUdlaiaecwfIdbaiIdwMUdwaiaiIdxJbbbbMUdxaiaiIdzJbbbbMUdzaiaiIdCJbbbbMUdCaiaiIdKJbbjZMUdKaKclfhKaecxfheaEcufgEmbkkdnaDTmba3hiaDheinaiaiIdbJbbbbJbbjZaicKfIdbgO:vaOJbbbb9BEgONUdbaiclfgKaOaKIdbNUdbaicwfgKaOaKIdbNUdbaicxfgKaOaKIdbNUdbaiczfgKaOaKIdbNUdbaicCfgKaOaKIdbNUdbaic3fhiaecufgembkkcbhEawcuaDcdtgCaDcFFFFi0Egicbyd;y:L:cjbHjjjjbbgeBdaawcoBd2awaicbyd;y:L:cjbHjjjjbbg8EBd8KaecFeaCz:xjjjbh5dnadTmbaoJbbjZJbbjZaY:vaPceSENgOaONhYaxcdthxalheinaYaecN:H:cjbalEgKIdwa3a8AydbgAc32fgiIdC:tgOaONaKIdbaiIdx:tgOaONaKIdlaiIdz:tgOaONMMNaqcwfIdbaiIdw:tgOaONaqIdbaiIdb:tgOaONaqclfIdbaiIdl:tgOaONMMMhOdndna5aAcdtgifgKydbcuSmba8EaifIdbaO9ETmekaKaEBdba8EaifaOUdbka8Aclfh8AaqcxfhqaeaxfheadaEcefgE9hmbkkaba5aCz:wjjjb8Acrhikaicdthiawcxfc98fheinaeaifydbcbyd;C:L:cjbH:bjjjbbaic98fgimbkkawc;Wbf8KjjjjbaDk:Pdidui99ducbhi8Jjjjjbca9Rglcbyd1:G:cjbBdKalcb8Pdj:G:cjb83izalcbydN:G:cjbBdwalcb8Pd:m:G:cjb83ibdndnaembJbbjFhvJbbjFhoJbbjFhrxekadcd4cdthwincbhdinalczfadfgDabadfIdbgvaDIdbgoaoav9EEUdbaladfgDavaDIdbgoaoav9DEUdbadclfgdcx9hmbkabawfhbaicefgiae9hmbkalIdwalIdK:thralIdlalIdC:thoalIdbalIdz:thvkJbbbbavavJbbbb9DEgvaoaoav9DEgvararav9DEk:H8Modui99lud99Aus998Jjjjjbcji9RgD8KjjjjbcbhqaDcxfcbc;Kbz:xjjjb8AaDcbBdwaD9cb83ibaDcbyd;i:L:cjbBd1eaDcb8Pd;a:L:cjb83ijeaDcbyd;u:L:cjbBd94aDcb8Pd;m:L:cjb83i9WdndnavmbJbbjFhkJbbjFhxJbbjFhmxekaocd4cdthPalhsincbhzinaDcjefazfgHasazfIdbgkaHIdbgxaxak9EEUdbaDc;WbfazfgHakaHIdbgxaxak9DEUdbazclfgzcx9hmbkasaPfhsaqcefgqav9hmbkaDId94aDId1e:thmaDIdtaDId:ee:thxaDId9WaDIdje:thkkJbbbbhOdnar:YgAJq;x8J88MaA:vJbbbbakakJbbbb9DEgkaxaxak9DEgkamamak9DENgxJbbbb9Bmbarc9:f:Yax:vhOkaDcCfhCaDcxfcxfhXcbhzinaDazfaDcjefazfIdbgkaxaDc;WbfazfIdbak:t:tJbbb:;NMUdbazclfgzcx9hmbkcbhQaDarar2gLar2gzcbyd;y:L:cjbHjjjjbbgHBdxaDceBd2aHcbazz:xjjjbgKcbcbadaialaoaraOaDawz:rjjjbcdhYaDcuaLcdtaLcFFFFi0Eg8Acbyd;y:L:cjbHjjjjbbgEBdzaDcdBd2aDcjefcbarz:xjjjb8Acbh3dnaLTmbdnarcb9kmbaKhzaEhHaLhsincbh3aHcbcuazaDcjefarz:AjjjbEBdbazarfhzaHclfhHascufgsmbxdkkaKhPcbh3cbhvindndnaKavar2faDcjefarz:AjjjbTmbcbhHaPhzarhsinazaHazRbbgqfgHcbaqE86bbazcefhzascufgsmbkaEavcdtfa3BdbaHa3fh3xekaEavcdtfcuBdbkaParfhPavcefgvaL9hmbkkdnabTmbaDcua3cotgza3cFFF8F0Ecbyd;y:L:cjbHjjjjbbgQBdCcihYaDciBd2aQcbazz:xjjjb8AaXhCkdnawceGmbaCa8Acbyd;y:L:cjbHjjjjbbg5BdbaDaYcefgzBd2aDcxfazcdtfaLcbyd;y:L:cjbHjjjjbbgzBdbaDaYcdfgYBd2azcbaLz:xjjjbh8EarcufhXdnarci9imbarc9:fhCararcef2aKfcefh8Aceh8Fina8Far2hPa8AhvcehqindnaEaqaPfcdtfydbcuSmbavhzaChHinazazRbbgscuasE86bbazcefhzaHcufgHmbkkavarfhvaqcefgqaX9hmbka8AaLfh8Aa8Fcefg8FaX9hmbkkarce9imbcbh8Acbhqcbhvina8EaqfhscbhzindnasazfgHRbbmbaHce86bba5a8AcdtfaqazfBdba8Acefh8Akarazcefgz9hmbkaqarfhqavcefgvar9hmbka8ATmbaKcefhaaKc9:fhharc9:fhgarci9ih8Jina8Ea5a8Acufg8Acdtfydbgvfcb86bbavar2hPdna8JmbaEavcdtfydbcuSmbaKaPfhHaghqindnaHcefgzRbbgscFe9hmbaHRbbmbcbhskazas86bbazhHaqcufgqmbkaharavcef2fhzaXhsindnazRbbgHcFe9hmbazcefRbbmbcbhHkazaH86bbazcufhzascufgsce9kmbkkaaaPfh8Kavavar9Ug8Lar29Rh8FcbhCindnaCceScuaCEa8Ffgzce9imbazaX9ombcuaCciSaCcdSEa8LfgHce9imbaHaX9ombaEaHar2azfg8McdtfydbcuSmba8Jmbaaa8Mar2fhzcbhqa8KhsaghvinazazRbbgHcbaHaHcFeSEasRbbEgP86bbascefhsazcefhzaPaH7aqVhqavcufgvmbkaqcFeGTmba8Ea8MfgzRbbmbazce86bba5a8Acdtfa8MBdba8Acefh8AkaCcefgCcl9hmbka8AmbkkdnaQTmbaKaEaQadaialaoaraOaDawz:rjjjba3TmbJbbjZaO:vhkawcjjjjlGhPdnawcdGTmbJbbnnaOaON:vh8NakJbbbZNhyaQhzinazczfgsIdbg8PazcCfIdbgx:vhmazcxfgqIdbgIax:vhAazcwfgvIdbg8Rax:vh8SakazydbgHcFrG:ZNhRakaHcq4cFrG:ZNh8UakaHcC4cFrG:ZNh8VdnaxJ:p;c;188Ng8WazcKfIdbMg8X:laxJ:983:g81Ngx9ETmba8Wazc3fIdbMazc8KfIdbg8Ya8Ya8X:vg8YN:tg8Z:lax9ETmba8WazcafIdbMazcyfIdbg8Wa8Wa8X:vg80N:tazc8SfIdba8Wa8YN:tg8Wa8Wa8Z:vg8WN:tg81:lax9ETmba8PJ:p;c;188NazcUfIdb:ta80a8RJ:p;c;188Nazc8WfIdb:tg8PN:ta8WaIJ:p;c;188Nazc80fIdb:ta8Ya8PN:tgIN:ta81:vgxam:tg8Ra8RNa8Pa8X:va8YaIa8Z:va8WaxN:tg8XN:ta80axN:tg8Wa8S:tg8Ya8YNa8XaA:tg8Ya8YNMMa8N9DTmbaxaRaxaR9EEgxakaRMgmaxam9DEhma8Xa8Ua8Xa8U9EEgxaka8UMgAaxaA9DEhAa8Wa8Va8Wa8V9EEgxaka8VMg8Saxa8S9DEh8SkdnaPTmbayaRMhmaya8UMhAaya8VMh8SkasamUdbaqaAUdbava8SUdbazc;abfhza3cufg3mbxdkkdnaPTmbakJbbbZNhxaQhzinazczfaxakazydbgHcFrG:ZNMUdbazcxfaxakaHcq4cFrG:ZNMUdbazcwfaxakaHcC4cFrG:ZNMUdbazc;abfhza3cufg3mbxdkkaQcCfhzinazc98fgHaHIdbazIdbgk:vUdbazc94fgHaHIdbak:vUdbazctfgHaHIdbak:vUdbazc;abfhza3cufg3mbkkcbhsdndnarcd9imbarcufh3aEarcdtfhadnabmbaKcefg8Mararcefgz2fh8JaKazfhba8MaLfh8Ecbhscbh8Kina8Kar2h8La8Mheabh8Aa8Eh8Fa8Jh5cbhXindnaEaXa8LfgqcdtgzfgHclfydbaHydbGaaazfgzydbGazclfydbGcuSmbclcbaKaqar2fgzarfRbbEazRbbcb9hVczcbazaLfgzRbbEVc;abcbazarfRbbEVhPaehza8AhHa8Fhqa5hva3hQindnaPclcbaHRbbEazRbbcb9hVczcbaqRbbEVc;abcbavRbbEVgPcetVgCTmbaCcFeSmbasaCRb;W;p:cjbfhskazcefhzaHcefhHaqcefhqavcefhvaQcufgQmbkkaearfhea8Aarfh8Aa8Farfh8Fa5arfh5aXcefgXa39hmbka8MaLfh8MabaLfhba8EaLfh8Ea8JaLfh8Ja8Kcefg8Ka39hmbxdkkJbbjZaO:vgkakJk;x8J88NNh8RawcdGh8EaDIdwhkaDIdlhxaDIdbhmcbhscbhPinaPar2h8KcbhvindnaEava8KfgqcdtgzfgHclfydbaHydbGaaazfgzydbGazclfydbGcuSmbcbh8AclcbaKaqar2fgYarfRbbEaYRbbcb9hVczcbaYaLfg8JRbbEVc;abcba8JarfRbbEVh8Lindna8LclcbaYa8Ag8Mcefg8AfgzarfRbbEazRbbcb9hVczcba8Ja8AfgzRbbEVc;abcbazarfRbbEVg8LcetVgCTmbaCcFeSmbcbhqdndndnaCRb;W;n:cjbcufPdebdka8ETmeaCcC2gz8Ve;W:L:cjbcltaz8Ve;Y:L:cjbcsGVh8FaKa8Mfh5cxhzaDcjefhHinaHaQaEa8Faz4gqce4ceGavfaqcd4ceGaPfar2fgXcdtfydbcotfa5aqceGfaXar2fRbbcotfcnfBdbaHclfhHazc98fgzc989hmbkaDydjegzIdyaDyd:megHIdyMaDyd:eegqIdyaDyd1egXIdyMMg8XaqIdwaXIdwMJbbbZNgANazIdUaHIdUMaqIdUaXIdUMMg8WMg8Sa8SMazIdaaHIdaMaqIdaaXIdaMMg8YaqIdzaXIdzMJbbbZNg8SNMa8SNazId8SaHId8SMaqId8SaXId8SMMgRa8SNazId80aHId80MaqId80aXId80MMg8UMg8Sa8SMazId3aHId3MaqId3aXId3MMg8VaqIdxaXIdxMJbbbZNg8SNMa8SNazId8KaHId8KMaqId8KaXId8KMMg8Za8SNazId8WaHId8WMaqId8WaXId8WMMg80Mg8Sa8SMazIdKaHIdKMaqIdKaXIdKMMgyaANMaANazId88aHId88MaqId88aXId88MMg8PMMM:lgIa8RazIdCaHIdCMaqIdCaXIdCMMN9Ea8XazIdwaHIdwMJbbbZNgANa8WMg8Sa8SMa8YazIdzaHIdzMJbbbZNg8SNMa8SNaRa8SNa8UMg8Sa8SMa8VazIdxaHIdxMJbbbZNg8SNMa8SNa8Za8SNa80Mg8Sa8SMayaANMaANa8PMMM:laIJ;d;1UZN9DGhqxekaKa8Mfh8FcbhzcrhHindnaCaz4ceGTmba8FazceGfazce4ceGavfazcd4aPfar2fgqar2fRbbgXcFeSmbaQaEaqcdtfydbcotfaXcotfc9efRbbaH4ceGTmbcbhqxdkaHcufhHcehqazcefgzcw9hmbkkaCcC2aqcq2fgH8Ve;W:L:cjbgzTmbaHc;Y:L:cjbfhqaKa8MfhCabasc8K2fhHindnasae9pmbaHaQaEazcD4ceGavfazcq4ceGaPfar2fgXcdtfydbcotfaCazcw4ceGfaXar2fRbbcotfgXc9ifIdbamMUdbaHclfaXc9mfIdbaxMUdbaHcwfaXc9qfIdbakMUdbaHcxfamaQaEazcv4ceGavfazco4ceGaPfar2fgXcdtfydbcotfaCazcl4ceGfaXar2fRbbcotfgXc9ifIdbMUdbaHczfaxaXc9mfIdbMUdbaHcCfakaXc9qfIdbMUdbaHcKfamaQaEazce4ceGavfazcd4ceGaPfar2fgXcdtfydbcotfaCazceGfaXar2fRbbcotfgzc9ifIdbMUdbaHc3faxazc9mfIdbMUdbaHcafakazc9qfIdbMUdbkaHc8KfhHascefhsaq8Vebhzaqcdfhqazmbkka8Aa39hmbkkavcefgva39hmbkaPcefgPa39hmbkaDyd2gYTmekaYcdtaDcxffc98fhzinazydbcbyd;C:L:cjbH:bjjjbbazc98fhzaYcufgYmbkkaDcjif8Kjjjjbask;Kxmiue99due99euz99eui99eud99dud99oudnalTmbaocd4hkaqcdGhxarc99fhqarcethmawawMhPcbhsindndnawavaiascdtfgoclfydbak2cdtfgzIdwgHavaoydbak2cdtfgOIdwgA:tgCaCNazIdbgXaOIdbgQ:tgLaLNazIdlgKaOIdlgY:tg8Aa8ANMMgEavaocwfydbak2cdtfgoIdwg3aA:tg5a5NaoIdbg8EaQ:tg8Fa8FNaoIdlgaaY:tghahNMMggaEag9EEgEa3aH:tgHaHNa8EaX:tgHaHNaaaK:tgHaHNMMgHaEaH9EE:rNgHaHMgH:lJbbb9p9DTmbaH:Ohoxekcjjjj94hokdnaLahNa8Aa8FN:tgHaHNa8Aa5NaCahN:tgXaXNaCa8FNaLa5N:tgKaKNMMg3Jbbbb9BmbJbbjZhEdnaoceaoce9kEgoamaoam9iEg8Jcd9imbJbbjZa8J:Z:vhEkarcb9imbaAaDIdw:th8KaYaDIdl:th8LaQaDIdb:th8Ma8Jcba8Jcb9kEh8NdnadTmbaHJbbjZa3:rgA:vgQNg3aAa8Jcefa8Jcdf2:Y:vgANh8EaKaQNgKaANhyaXaQNgXaXaANNh8PcbhIina8Jcba8Jcb9kEcefh8RaEaI:ZNgQaCNa8KMhgaQa8ANa8LMh8SaQaLNa8MMhRcbhzindndnaPaEaz:ZNgQahNa8SMgYNgH:lJbbb9p9DTmbaH:OhOxekcjjjj94hOkaOce91goaqaoaq6Eh8UdndnaPaQa5NagMgHNga:lJbbb9p9DTmbaa:Oh8Vxekcjjjj94h8Vka8Ua8Vce91goaqaoaq6Eg8Wcefar2fcefgoar2h8XdndnaPaQa8FNaRMgQNga:lJbbb9p9DTmbaa:Oh8Yxekcjjjj94h8Ykadaeaocdtfydbcotfaba8Yce91goaqaoaq6Eg8Zfa8XfcefRbbcotfgocnfa8Ucqta8ZcCtVa8WVBdbaoc9efg8Ua8URbbcea8YceGaOcetcdGVa8VcdtclGVtV86bbaoc9ifgOaQaANaOIdbMUdbaoc9mfgOaYaANaOIdbMUdbaoc9qfgOaHaANaOIdbMUdbaoc9ufgOaAaOIdbMUdbdnaxTmbaoc9yfgOa8PaOIdbMUdbaoc9CfgOaKayNaOIdbMUdbaoc9GfgOa3a8ENaOIdbMUdbaoc9KfgOaXayNaOIdbMUdbaoc9OfgOaXa8ENaOIdbMUdbaoc2fgOaKa8ENaOIdbMUdbaoc9WfgOaXaAa3aHNaXaQNaKaYNMMgY:mNgQNaOIdbMUdbaoctfgOaKaQNaOIdbMUdbaoc94fgOa3aQNaOIdbMUdbaoc98fgoaoIdbaYaQN:tUdbka8Razcefgz9hmbka8Jcufh8JaIa8NShoaIcefhIaoTmbxdkkcbh8Vina8Jcba8Jcb9kEcefh8UaEa8V:ZNgAaCNa8KMhYaAa8ANa8LMhHaAaLNa8MMhXcbhoindndnaPaEao:ZNgAahNaHMNgQ:lJbbb9p9DTmbaQ:Ohzxekcjjjj94hzkazce91gzaqazaq6EhzdndnaPaAa5NaYMNgQ:lJbbb9p9DTmbaQ:OhOxekcjjjj94hOkazaOce91gOaqaOaq6Ecefar2fcefar2hzdndnaPaAa8FNaXMNgA:lJbbb9p9DTmbaA:OhOxekcjjjj94hOkabaOce91gOaqaOaq6Efazfcefce86bba8Uaocefgo9hmbka8Jcufh8Ja8Va8NShoa8Vcefh8VaoTmbkkascifgsal6mbkkk:Nvezu8Jjjjjbcjd9Rgb8Kjjjjbcbheabcbcjdz:xjjjbhdc:W:H:cjbhbinabRbbgicC2glabcqf8Veb87e;4:L:cjbalabcdfgv8Peb83e;W:L:cjbaiabcefRbb86b;W;n:cjbadaifce86bbalavabcxfceaetc:F:d;avGEgi8Peb83e;6:L:cjbalai8Vew87e:c:M:cjbabcQfhbaecefgecK9hmbkcbhoinc;Y:L:cjbhrcbhvindnadavfgwRbbce9hmbavcC2c;W:L:cjbfhDcbhbcehqavc;W;n:cjbfhkinabcitc:G:H:cjbfhlcbhbcbheinaeavab4ceGalabfRbbtVheabcefgbcw9hmbkdnadaecFeGgxfgmRbbmbaxcC2c;W:L:cjbfhPcbhbcehsindnaDabcq2gif8VebgbTmbaraifheaPaifhiinaialabcl4csGfRbbcltalabcw4csGfRbbcwtValabcsGfRbbV87ebaicdfhiae8VebhbaecdfheabmbkkcehbasceGhecbhsaembkamce86bbaxakRbb86b;W;n:cjbkcehbaqceGhlcbhqalmbkawcd86bbkarcCfhravcefgvcjd9hmbkaocefgoci9hmbkcbhic;W:L:cjbhvincuhlavhbinalcefhlab8Vebheabcdfhbaembkaial86b;W;p:cjbavcCfhvaicefgicjd9hmbkadcjdf8Kjjjjbk9DeeuabcFeaicdtz:xjjjbhlcbhbdnadTmbindnalaeydbcdtfgiydbcu9hmbaiabBdbabcefhbkaeclfheadcufgdmbkkabk;Bidqui998Jjjjjbc;Wb9Rgl8Kjjjjbalcxfcbc;Kbz:xjjjb8Aadcd4adfhvcehoinaogrcethoarav6mbkalcuarcdtgoarcFFFFi0Ecbyd;y:L:cjbHjjjjbbgvBdxavcFeaoz:xjjjbhwdnadTmbaicd4hDarcufhqcbhkindndnawcbaeakaD2cdtfgrydlgiaicjjjj94SEgocH4ao7c:F:b:DD2cbarydbgxaxcjjjj94SEgocH4ao7c;D;O:B8J27cbarydwgmamcjjjj94SEgrcH4ar7c:3F;N8N27aqGgvcdtfgrydbgocuSmbam::hPai::hsax::hzcehiinaihrdnaeaoaD2cdtfgiIdbaz9CmbaiIdlas9CmbaiIdwaP9BmikarcefhiawavarfaqGgvcdtfgrydbgocu9hmbkkarakBdbakhokabakcdtfaoBdbakcefgkad9hmbkkalydxcbyd;C:L:cjbH:bjjjbbalc;Wbf8Kjjjjbk9teiucbcbyd;G:L:cjbgeabcifc98GfgbBd;G:L:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabk9teiucbcbyd;G:L:cjbgeabcrfc94GfgbBd;G:L:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikTeeucbabcbyd;G:L:cjbge9Rcifc98GaefgbBd;G:L:cjbdnabZbcztge9nmbabae9RcFFifcz4nb8Akk6eiucbhidnadTmbdninabRbbglaeRbbgv9hmeaecefheabcefhbadcufgdmbxdkkalav9Rhikaikk;0vdbcj:Gdk;yvFFuuFFuuFFuuFFuFFFuFFFuFbbbbbbbbebbbdbbbbbbbebbbebbbdbbbbbbbbbbbeeeeeebebbeebbebbebbbeeebbbbebbbbbbbbbbbbbbbbbbbeeeeeeebebbbeeebbeebbbbbebbbbbebebbbbbbbbbbbbbbbdiorbelvlbodveribbbbbbbbbbbbbbbbbbbbbbebbbbbbbbbbbbbbbbbbbbbibbbbbbbbbbbbbbbbbbbbbobbbbbbbbbbbbbbbbbbbbbrbaebbbbbbbbbbbbbbbbbbsd8We8YbbbbbbbhiaebbbbbbQe8Ke9cebbbbbbbbbbbbbbbbLb8KebbbbbbbbbbbbbbbbbbKbbbbbbbbbbbbbbbbbbbbbYeJbilbbbbbbbbbbbbbbbbEe80e8WlbbbbbbzlAbbbbbbb5eJdnibbbbbbai8Kbbbbbbb8Ee9ce8Ylcibbbb8Yebbbbbbbb8FdOlAdbbbbbb80e8Ylbbbbbb88eTi8KiJv8Jlbbbbbbbbbbbb89e9td8Kv9qibbbbndlvaibbbbZd8Li8KvbbbbbbJdTibbbbbb9Pe81b9GvoiBvbbbbbbbbbbbb9Re9JbvoWibbbbvibbbbbbbb9VeWi9Gvbbbbbb8WvBbbbbbbb9:b9ceBvbbbbbbbbbbbbbbbbubWibbbbbbbbbbbbbbbbbb;Wd9hvSrbbbbbbWl9NvbbbbbbFbbbbbbbbbbbbbbbbbbbbbFFuuFFuuFFuuFFuFFFuFFFuFbc;y:Ldkxebbbdbbb;W:Obb",e=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var a,t=WebAssembly.instantiate(r(n),{}).then(function(f){a=f.instance,a.exports.__wasm_call_ctors()});function r(f){for(var M=new Uint8Array(f.length),A=0;A<f.length;++A){var v=f.charCodeAt(A);M[A]=v>96?v-97:v>64?v-39:v+4}for(var k=0,A=0;A<f.length;++A)M[k++]=M[A]<60?e[M[A]]:(M[A]-60)*64+M[++A];return M.buffer.slice(0,k)}function s(f){if(!f)throw new Error("Assertion failed")}function i(f){return new Uint8Array(f.buffer,f.byteOffset,f.byteLength)}function o(f,M,A,v){var k=a.exports.sbrk,P=k(A*4),j=k(A*v*4),E=new Uint8Array(a.exports.memory.buffer);E.set(i(M),j),f(P,j,A,v*4),E=new Uint8Array(a.exports.memory.buffer);var z=new Uint32Array(A);return new Uint8Array(z.buffer).set(E.subarray(P,P+A*4)),k(P-k(0)),z}function c(f,M,A){var v=a.exports.sbrk,k=v(M.length*4),P=v(A*4),j=new Uint8Array(a.exports.memory.buffer),E=i(M);j.set(E,k);var z=f(P,k,M.length,A);j=new Uint8Array(a.exports.memory.buffer);var I=new Uint32Array(A);new Uint8Array(I.buffer).set(j.subarray(P,P+A*4)),v(k-v(0));for(var L=0;L<M.length;++L)M[L]=I[M[L]];return[I,z]}function b(f){for(var M=0,A=0;A<f.length;++A){var v=f[A];M=M<v?v:M}return M}function l(f,M,A,v,k,P,j,E,z){var I=a.exports.sbrk,L=I(4),N=I(A*4),B=I(k*P),C=I(A*4),D=new Uint8Array(a.exports.memory.buffer);D.set(i(v),B),D.set(i(M),C);var V=f(N,C,A,B,k,P,j,E,z,L);D=new Uint8Array(a.exports.memory.buffer);var U=new Uint32Array(V);i(U).set(D.subarray(N,N+V*4));var te=new Float32Array(1);return i(te).set(D.subarray(L,L+4)),I(L-I(0)),[U,te[0]]}function u(f,M,A,v,k,P,j,E,z,I,L,N,B){var C=a.exports.sbrk,D=C(4),V=C(A*4),U=C(k*P),te=C(k*E),$=C(z.length*4),X=C(A*4),_=I?C(k):0,Y=new Uint8Array(a.exports.memory.buffer);Y.set(i(v),U),Y.set(i(j),te),Y.set(i(z),$),Y.set(i(M),X),I&&Y.set(i(I),_);var ce=f(V,X,A,U,k,P,te,E,$,z.length,_,L,N,B,D);Y=new Uint8Array(a.exports.memory.buffer);var Je=new Uint32Array(ce);i(Je).set(Y.subarray(V,V+ce*4));var Ge=new Float32Array(1);return i(Ge).set(Y.subarray(D,D+4)),C(D-C(0)),[Je,Ge[0]]}function h(f,M,A,v,k,P,j,E,z,I,L,N,B){var C=a.exports.sbrk,D=C(4),V=C(k*P),U=C(k*E),te=C(z.length*4),$=C(A*4),X=I?C(k):0,_=new Uint8Array(a.exports.memory.buffer);_.set(i(v),V),_.set(i(j),U),_.set(i(z),te),_.set(i(M),$),I&&_.set(i(I),X);var Y=f($,A,V,k,P,U,E,te,z.length,X,L,N,B,D);_=new Uint8Array(a.exports.memory.buffer),i(M).set(_.subarray($,$+Y*4)),i(v).set(_.subarray(V,V+k*P)),i(j).set(_.subarray(U,U+k*E));var ce=new Float32Array(1);return i(ce).set(_.subarray(D,D+4)),C(D-C(0)),[Y,ce[0]]}function d(f,M,A,v){var k=a.exports.sbrk,P=k(A*v),j=new Uint8Array(a.exports.memory.buffer);j.set(i(M),P);var E=f(P,A,v);return k(P-k(0)),E}function x(f,M,A,v,k,P,j,E){var z=a.exports.sbrk,I=z(E*4),L=z(A*v),N=k?z(A*P):0,B=new Uint8Array(a.exports.memory.buffer);B.set(i(M),L),k&&B.set(i(k),N);var C=f(I,L,A,v,N,P,j,E);B=new Uint8Array(a.exports.memory.buffer);var D=new Uint32Array(C);return i(D).set(B.subarray(I,I+C*4)),z(I-z(0)),D}function p(f,M,A,v,k,P,j,E,z){var I=a.exports.sbrk,L=I(4),N=I(A*4),B=I(k*P),C=I(A*4),D=j?I(k):0,V=new Uint8Array(a.exports.memory.buffer);V.set(i(v),B),V.set(i(M),C),j&&V.set(i(j),D);var U=f(N,C,A,B,k,P,D,E,z,L);V=new Uint8Array(a.exports.memory.buffer);var te=new Uint32Array(U);i(te).set(V.subarray(N,N+U*4));var $=new Float32Array(1);return i($).set(V.subarray(L,L+4)),I(L-I(0)),[te,$[0]]}function w(f,M,A,v,k,P,j){var E=a.exports.sbrk,z=E(A*4),I=E(k*P),L=E(A*4),N=new Uint8Array(a.exports.memory.buffer);N.set(i(v),I),N.set(i(M),L);var B=f(z,L,A,I,k,P,j);N=new Uint8Array(a.exports.memory.buffer);var C=new Uint32Array(B);return i(C).set(N.subarray(z,z+B*4)),E(z-E(0)),C}function g(f,M,A,v,k,P){var j=a.exports.sbrk,E=j(A.byteLength),z=j(M.byteLength),I=new Uint8Array(a.exports.memory.buffer);I.set(i(A),E),I.set(i(M),z);var L=A.byteLength/v,N=f(0,0,z,M.length,E,L,v,k,P),B=j(N*9*4),C=f(B,N,z,M.length,E,L,v,k,P);s(C<=N),I=new Uint8Array(a.exports.memory.buffer);var D=new Float32Array(C*9);return i(D).set(I.subarray(B,B+D.byteLength)),j(E-j(0)),D}var y={LockBorder:1,Sparse:2,ErrorAbsolute:4,Prune:8,Regularize:16,Permissive:32,RegularizeLight:64,PreserveFolds:128,ErrorClamped:256,_InternalDebug:1<<30},S={Shell:1,Solve:2,Thicken:0,_InternalDebug:1<<30};return{ready:t,supported:!0,compactMesh:function(f){s(f instanceof Uint32Array||f instanceof Int32Array||f instanceof Uint16Array||f instanceof Int16Array),s(f.length%3==0);var M=f.BYTES_PER_ELEMENT==4?f:new Uint32Array(f),A=c(a.exports.meshopt_optimizeVertexFetchRemap,M,b(f)+1);if(f!==M)for(var v=0;v<M.length;++v)f[v]=M[v];return A},generatePositionRemap:function(f,M){return s(f instanceof Float32Array),s(f.length%M==0),s(M>=3),o(a.exports.meshopt_generatePositionRemap,f,f.length/M,M)},simplify:function(f,M,A,v,k,P){s(f instanceof Uint32Array||f instanceof Int32Array||f instanceof Uint16Array||f instanceof Int16Array),s(f.length%3==0),s(M instanceof Float32Array),s(M.length%A==0),s(A>=3),s(v>=0&&v<=f.length),s(v%3==0),s(k>=0);for(var j=0,E=0;E<(P?P.length:0);++E)s(P[E]in y),j|=y[P[E]];var z=f.BYTES_PER_ELEMENT==4?f:new Uint32Array(f),I=l(a.exports.meshopt_simplify,z,f.length,M,M.length/A,A*4,v,k,j);return I[0]=f instanceof Uint32Array?I[0]:new f.constructor(I[0]),I},simplifyWithAttributes:function(f,M,A,v,k,P,j,E,z,I){s(f instanceof Uint32Array||f instanceof Int32Array||f instanceof Uint16Array||f instanceof Int16Array),s(f.length%3==0),s(M instanceof Float32Array),s(M.length%A==0),s(A>=3),s(v instanceof Float32Array),s(v.length==k*(M.length/A)),s(k>=0),s(j==null||j instanceof Uint8Array),s(j==null||j.length==M.length/A),s(E>=0&&E<=f.length),s(E%3==0),s(z>=0),s(Array.isArray(P)),s(k>=P.length),s(P.length<=32);for(var L=0;L<P.length;++L)s(P[L]>=0);for(var N=0,L=0;L<(I?I.length:0);++L)s(I[L]in y),N|=y[I[L]];var B=f.BYTES_PER_ELEMENT==4?f:new Uint32Array(f),C=u(a.exports.meshopt_simplifyWithAttributes,B,f.length,M,M.length/A,A*4,v,k*4,new Float32Array(P),j,E,z,N);return C[0]=f instanceof Uint32Array?C[0]:new f.constructor(C[0]),C},simplifyWithUpdate:function(f,M,A,v,k,P,j,E,z,I){s(f instanceof Uint32Array||f instanceof Int32Array||f instanceof Uint16Array||f instanceof Int16Array),s(f.length%3==0),s(M instanceof Float32Array),s(M.length%A==0),s(A>=3),s(v instanceof Float32Array),s(v.length==k*(M.length/A)),s(k>=0),s(j==null||j instanceof Uint8Array),s(j==null||j.length==M.length/A),s(E>=0&&E<=f.length),s(E%3==0),s(z>=0),s(Array.isArray(P)),s(k>=P.length),s(P.length<=32);for(var L=0;L<P.length;++L)s(P[L]>=0);for(var N=0,L=0;L<(I?I.length:0);++L)s(I[L]in y),N|=y[I[L]];var B=f.BYTES_PER_ELEMENT==4?f:new Uint32Array(f),C=h(a.exports.meshopt_simplifyWithUpdate,B,f.length,M,M.length/A,A*4,v,k*4,new Float32Array(P),j,E,z,N);if(f!==B)for(var L=0;L<C[0];++L)f[L]=B[L];return C},getScale:function(f,M){return s(f instanceof Float32Array),s(f.length%M==0),s(M>=3),d(a.exports.meshopt_simplifyScale,f,f.length/M,M*4)},simplifyPoints:function(f,M,A,v,k,P){return s(f instanceof Float32Array),s(f.length%M==0),s(M>=3),s(A>=0&&A<=f.length/M),v?(s(v instanceof Float32Array),s(v.length%k==0),s(k>=3),s(f.length/M==v.length/k),x(a.exports.meshopt_simplifyPoints,f,f.length/M,M*4,v,k*4,P||0,A)):x(a.exports.meshopt_simplifyPoints,f,f.length/M,M*4,void 0,0,0,A)},simplifySloppy:function(f,M,A,v,k,P){s(f instanceof Uint32Array||f instanceof Int32Array||f instanceof Uint16Array||f instanceof Int16Array),s(f.length%3==0),s(M instanceof Float32Array),s(M.length%A==0),s(A>=3),s(v==null||v instanceof Uint8Array),s(v==null||v.length==M.length/A),s(k>=0&&k<=f.length),s(k%3==0),s(P>=0);var j=f.BYTES_PER_ELEMENT==4?f:new Uint32Array(f),E=p(a.exports.meshopt_simplifySloppy,j,f.length,M,M.length/A,A*4,v,k,P);return E[0]=f instanceof Uint32Array?E[0]:new f.constructor(E[0]),E},simplifyPrune:function(f,M,A,v){s(f instanceof Uint32Array||f instanceof Int32Array||f instanceof Uint16Array||f instanceof Int16Array),s(f.length%3==0),s(M instanceof Float32Array),s(M.length%A==0),s(A>=3),s(v>=0);var k=f.BYTES_PER_ELEMENT==4?f:new Uint32Array(f),P=w(a.exports.meshopt_simplifyPrune,k,f.length,M,M.length/A,A*4,v);return P=f instanceof Uint32Array?P:new f.constructor(P),P},remesh:function(f,M,A,v,k){s(f instanceof Uint32Array||f instanceof Int32Array||f instanceof Uint16Array||f instanceof Int16Array),s(f.length%3==0),s(M instanceof Float32Array),s(M.length%A==0),s(A>=3),s(v>=4&&v<=256);for(var P=0,j=0;j<(k?k.length:0);++j)s(k[j]in S),P|=S[k[j]];var E=f.BYTES_PER_ELEMENT==4?f:new Uint32Array(f);return g(a.exports.meshopt_remesh,E,M,A*4,v,P)}}})();var ka=class n{constructor(e,a,t){this.renderer=e;this.baseUrl=a;this.manifest=t}models=new Map;materials=new Map;static async load(e,a="../../assets/"){let t=a.endsWith("/")?a:a+"/",r={version:1,textures:{},models:{}};try{let s=await fetch(t+"manifest.json",{cache:"no-cache"});s.ok&&(r={textures:{},models:{},...await s.json()})}catch{}return new n(e,t,r)}get empty(){return!Object.keys(this.manifest.textures).length&&!Object.keys(this.manifest.models).length}hasModel(e){return e in this.manifest.models}hasTexture(e){return e in this.manifest.textures}modelSlots(e){return Object.keys(this.manifest.models).filter(a=>a.startsWith(e))}model(e,a=!0){let t=this.models.get(e);if(!t){let r=this.manifest.models[e];t=r?Vr(this.baseUrl+r.file).then(s=>it(this.renderer,s,{keepSource:a})).catch(s=>(console.warn(`[oAxis] model ${e} failed to load`,s),null)):Promise.resolve(null),this.models.set(e,t)}return t}modelEntry(e){return this.manifest.models[e]}texture(e,a={}){let t=this.materials.get(e);if(!t){let r=this.manifest.textures[e];t=r?this.buildMaterial(e,r,a).catch(s=>(console.warn(`[oAxis] texture ${e} failed`,s),null)):Promise.resolve(null),this.materials.set(e,t)}return t}async buildMaterial(e,a,t){let r=this.renderer.textures,s=(l,u,h=!1)=>r.fromURL(this.baseUrl+l,{srgb:u,normalMap:h}),[i,o,c]=await Promise.all([s(a.diff,!0),a.nor?s(a.nor,!1,!0):null,a.arm?s(a.arm,!1):null]),b=1/(a.tileMeters??2);return new be({name:t.name??e,baseColorMap:i,normalMap:o,ormMap:c,baseColor:[1,1,1,1],metallic:c?1:0,roughness:t.roughness??1,occlusionStrength:c?1:0,uvScale:[b,b],worldUV:t.worldUV??!1,edgeWear:t.edgeWear??0})}credits(){let e=[];for(let[a,t]of Object.entries(this.manifest.textures))e.push({...t,slot:a});for(let[a,t]of Object.entries(this.manifest.models))e.push({...t,slot:a});return e}};var je=new URLSearchParams(location.search),pe=(n,e)=>je.has(n)?Number(je.get(n)):e,ia=document.getElementById("view"),Sa=document.getElementById("status"),an=je.get("offscreen")==="1";je.get("tex")&&(fe.textureSize=pe("tex",2048));var J=await rt.create({canvas:ia,baseUrl:"../../",title:"oAxis viewer",offscreen:an});_r(J.tuning);var sa={frames:0,errors:[],done:!1};window.__test=sa;J.renderer.dev.onError=n=>{sa.errors.push(n),console.error(n)};var tn=J.renderer.sky.settings;tn.sunElevation=pe("sun",32);tn.sunAzimuth=pe("az",130);var Ps=J.renderer.settings;Ps.exposure.compensation=pe("ev",.3);var Ts=J.renderer.synth.material("concrete",{size:1024,tileMeters:1,seed:3,dirt:.2},{name:"table"}),js=new ne(new ee(J.renderer.dev,re(1.6,.04,1).computeTangents()),Ts,T.fromTranslation(T.create(),[0,-.02,0]));J.scene.add(js);Sa.textContent="Building models\u2026";var Ee={pistol:Jr(J.renderer),carbine:Xr(J.renderer)},Fe=je.get("model")in Ee?je.get("model"):"pistol",Rs=n=>{let e=0;for(let a of n.parts){let t=a.object.mesh.bounds;t&&(e=Math.min(e,t.min[1]))}return T.fromRotationTranslation(T.create(),G.create(),[0,-e+.001,0])},He={slide:pe("slide",0),mag:pe("mag",0),trigger:pe("trigger",0)},Ut=je.get("hands")==="1"?new lt(J.renderer,{viewmodel:!1}).addTo(J.scene):null;if(je.get("rig")==="1"){let e=await(await ka.load(J.renderer,"../../assets/")).model("arms",!1);e?Ut=new bt(J.renderer,e,{viewmodel:!1}).addTo(J.scene):Sa.textContent='no "arms" slot in assets/manifest.json'}function Ct(n){for(let e of Object.values(Ee))for(let a of e.model.parts)J.scene.remove(a.object);Fe=n;for(let e of Ee[n].model.parts)J.scene.add(e.object)}Ct(Fe);var dt=je.get("asset");if(dt){Sa.textContent=`Loading ${dt}\u2026`;let e=await(await ka.load(J.renderer,"../../assets/")).model(dt,!1);if(e){for(let i of Object.values(Ee))for(let o of i.model.parts)J.scene.remove(o.object);let a=e.bounds,t=Math.max(a.max[0]-a.min[0],a.max[1]-a.min[1],a.max[2]-a.min[2]),r=pe("assetScale",.3/t),s=T.fromRotationTranslationScale(T.create(),G.fromEuler(G.create(),0,pe("assetYaw",0)*Le,0),[-(a.min[0]+a.max[0])/2*r,-a.min[1]*r+.001,-(a.min[2]+a.max[2])/2*r],[r,r,r]);qr(J.scene,e,s),Ee.pistol.model.parts.length=0,Ee.carbine.model.parts.length=0}else Sa.textContent=`asset ${dt} not found in assets/manifest.json`}var mt=pe("yaw",35)*Le,Aa=pe("pitch",12)*Le,_e=pe("dist",Fe==="pistol"?.38:1.1);J.camera.fovY=pe("fov",30)*Le;J.camera.near=.01;var Bt=!1;ia.addEventListener("pointerdown",n=>{Bt=!0,ia.setPointerCapture(n.pointerId)});ia.addEventListener("pointerup",()=>{Bt=!1});ia.addEventListener("pointermove",n=>{Bt&&(mt-=n.movementX*.005,Aa=Math.max(-1.4,Math.min(1.4,Aa+n.movementY*.005)))});ia.addEventListener("wheel",n=>{_e=Math.max(.08,Math.min(5,_e*Math.exp(n.deltaY*.001))),n.preventDefault()},{passive:!1});window.addEventListener("keydown",n=>{if(n.code==="Digit1"&&(Ct("carbine"),_e=1.1),n.code==="Digit2"&&(Ct("pistol"),_e=.38),n.code==="KeyG"){let e=Ee[Fe],a=Wr(e.model.parts.map((r,s)=>({name:`${Fe}-${r.bolt?"slide":r.magazine?"magazine":r.trigger?"trigger":"part"}-${s}`,object:r.object}))),t=document.createElement("a");t.href=URL.createObjectURL(new Blob([a],{type:"model/gltf-binary"})),t.download=`${Fe}.glb`,t.click()}n.code==="Space"&&(He.slide=He.slide>0?0:Ee.pistol.spec.action?.travelM??.03)});J.onUpdate.push(()=>{let n=Ee[Fe].model,e=Rs(n),a=m.create(0,.06,Fe==="pistol"?0:-.1),t=Math.cos(Aa);J.camera.position.set([a[0]+Math.sin(mt)*t*_e,a[1]+Math.sin(Aa)*_e,a[2]+Math.cos(mt)*t*_e]),G.fromEuler(J.camera.rotation,-Aa,mt,0);let r=n.magAxis;for(let s of n.parts){let i=s.object.transform;s.bolt?T.translate(i,e,[0,0,He.slide]):s.magazine&&r?T.translate(i,e,[r[0]*He.mag,r[1]*He.mag,r[2]*He.mag]):s.trigger?T.translate(i,e,[0,0,(n.triggerTravelM??0)*He.trigger]):T.copy(i,e)}if(Ut){let s=Ee[Fe],i=null;if(je.get("eye")==="1"){let o=m.transformMat4(m.create(),[n.rearSight[0],n.rearSight[1],n.rearSight[2]+s.spec.eyeRelief],e);i={position:o,rotation:G.create()},je.get("pov")==="1"&&(J.camera.position.set(o),G.identity(J.camera.rotation))}s.grips&&Ut.update(e,s.grips,i,{trigger:He.trigger})}sa.frames=J.frame});Sa.textContent="";if(an){let n=pe("frames",12);J.onUpdate.push(()=>{J.frame>=n&&!sa.done&&(sa.done=!0,J.stop(),J.renderer.readback().then(({width:e,height:a,data:t})=>{let r=document.createElement("canvas");r.width=e,r.height=a,r.style.cssText="position:fixed;inset:0;width:100%;height:100%;z-index:5",r.getContext("2d").putImageData(new ImageData(new Uint8ClampedArray(t.buffer),e,a),0,0),document.body.appendChild(r),sa.captured=!0}))})}J.start();
//# sourceMappingURL=main.js.map
