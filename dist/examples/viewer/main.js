var st=Math.PI/180,uc=180/Math.PI;var h={create(n=0,e=0,t=0){let r=new Float32Array(3);return r[0]=n,r[1]=e,r[2]=t,r},clone(n){return h.create(n[0],n[1],n[2])},set(n,e,t,r){return n[0]=e,n[1]=t,n[2]=r,n},copy(n,e){return n[0]=e[0],n[1]=e[1],n[2]=e[2],n},add(n,e,t){return n[0]=e[0]+t[0],n[1]=e[1]+t[1],n[2]=e[2]+t[2],n},sub(n,e,t){return n[0]=e[0]-t[0],n[1]=e[1]-t[1],n[2]=e[2]-t[2],n},mul(n,e,t){return n[0]=e[0]*t[0],n[1]=e[1]*t[1],n[2]=e[2]*t[2],n},scale(n,e,t){return n[0]=e[0]*t,n[1]=e[1]*t,n[2]=e[2]*t,n},scaleAndAdd(n,e,t,r){return n[0]=e[0]+t[0]*r,n[1]=e[1]+t[1]*r,n[2]=e[2]+t[2]*r,n},dot(n,e){return n[0]*e[0]+n[1]*e[1]+n[2]*e[2]},cross(n,e,t){let r=e[0],a=e[1],s=e[2],i=t[0],o=t[1],c=t[2];return n[0]=a*c-s*o,n[1]=s*i-r*c,n[2]=r*o-a*i,n},length(n){return Math.hypot(n[0],n[1],n[2])},lengthSq(n){return n[0]*n[0]+n[1]*n[1]+n[2]*n[2]},distance(n,e){return Math.hypot(n[0]-e[0],n[1]-e[1],n[2]-e[2])},normalize(n,e){let t=Math.hypot(e[0],e[1],e[2]),r=t>0?1/t:0;return n[0]=e[0]*r,n[1]=e[1]*r,n[2]=e[2]*r,n},negate(n,e){return n[0]=-e[0],n[1]=-e[1],n[2]=-e[2],n},lerp(n,e,t,r){return n[0]=e[0]+(t[0]-e[0])*r,n[1]=e[1]+(t[1]-e[1])*r,n[2]=e[2]+(t[2]-e[2])*r,n},min(n,e,t){return n[0]=Math.min(e[0],t[0]),n[1]=Math.min(e[1],t[1]),n[2]=Math.min(e[2],t[2]),n},max(n,e,t){return n[0]=Math.max(e[0],t[0]),n[1]=Math.max(e[1],t[1]),n[2]=Math.max(e[2],t[2]),n},transformMat4(n,e,t){let r=e[0],a=e[1],s=e[2],i=t[3]*r+t[7]*a+t[11]*s+t[15];return i=i||1,n[0]=(t[0]*r+t[4]*a+t[8]*s+t[12])/i,n[1]=(t[1]*r+t[5]*a+t[9]*s+t[13])/i,n[2]=(t[2]*r+t[6]*a+t[10]*s+t[14])/i,n},transformDirMat4(n,e,t){let r=e[0],a=e[1],s=e[2];return n[0]=t[0]*r+t[4]*a+t[8]*s,n[1]=t[1]*r+t[5]*a+t[9]*s,n[2]=t[2]*r+t[6]*a+t[10]*s,n},transformQuat(n,e,t){let r=t[0],a=t[1],s=t[2],i=t[3],o=e[0],c=e[1],b=e[2],l=a*b-s*c,u=s*o-r*b,m=r*c-a*o,d=a*m-s*u,v=s*l-r*m,p=r*u-a*l,M=i*2;return l*=M,u*=M,m*=M,d*=2,v*=2,p*=2,n[0]=o+l+d,n[1]=c+u+v,n[2]=b+m+p,n}};var K={create(){let n=new Float32Array(4);return n[3]=1,n},fromValues(n,e,t,r){let a=new Float32Array(4);return a[0]=n,a[1]=e,a[2]=t,a[3]=r,a},identity(n){return n[0]=0,n[1]=0,n[2]=0,n[3]=1,n},copy(n,e){return n[0]=e[0],n[1]=e[1],n[2]=e[2],n[3]=e[3],n},setAxisAngle(n,e,t){let r=t*.5,a=Math.sin(r);return n[0]=a*e[0],n[1]=a*e[1],n[2]=a*e[2],n[3]=Math.cos(r),n},multiply(n,e,t){let r=e[0],a=e[1],s=e[2],i=e[3],o=t[0],c=t[1],b=t[2],l=t[3];return n[0]=r*l+i*o+a*b-s*c,n[1]=a*l+i*c+s*o-r*b,n[2]=s*l+i*b+r*c-a*o,n[3]=i*l-r*o-a*c-s*b,n},rotateX(n,e,t){let r=t*.5,a=Math.sin(r),s=Math.cos(r),i=e[0],o=e[1],c=e[2],b=e[3];return n[0]=i*s+b*a,n[1]=o*s+c*a,n[2]=c*s-o*a,n[3]=b*s-i*a,n},rotateY(n,e,t){let r=t*.5,a=Math.sin(r),s=Math.cos(r),i=e[0],o=e[1],c=e[2],b=e[3];return n[0]=i*s-c*a,n[1]=o*s+b*a,n[2]=c*s+i*a,n[3]=b*s-o*a,n},rotateZ(n,e,t){let r=t*.5,a=Math.sin(r),s=Math.cos(r),i=e[0],o=e[1],c=e[2],b=e[3];return n[0]=i*s+o*a,n[1]=o*s-i*a,n[2]=c*s+b*a,n[3]=b*s-c*a,n},fromEuler(n,e,t,r){return K.identity(n),K.rotateY(n,n,t),K.rotateX(n,n,e),K.rotateZ(n,n,r),n},normalize(n,e){let t=Math.hypot(e[0],e[1],e[2],e[3]),r=t>0?1/t:0;return n[0]=e[0]*r,n[1]=e[1]*r,n[2]=e[2]*r,n[3]=e[3]*r,n},conjugate(n,e){return n[0]=-e[0],n[1]=-e[1],n[2]=-e[2],n[3]=e[3],n},invert(n,e){let t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2]+e[3]*e[3],r=t?1/t:0;return n[0]=-e[0]*r,n[1]=-e[1]*r,n[2]=-e[2]*r,n[3]=e[3]*r,n},dot(n,e){return n[0]*e[0]+n[1]*e[1]+n[2]*e[2]+n[3]*e[3]},slerp(n,e,t,r){let a=e[0],s=e[1],i=e[2],o=e[3],c=t[0],b=t[1],l=t[2],u=t[3],m=a*c+s*b+i*l+o*u;m<0&&(m=-m,c=-c,b=-b,l=-l,u=-u);let d,v;if(1-m>1e-6){let p=Math.acos(m),M=Math.sin(p);d=Math.sin((1-r)*p)/M,v=Math.sin(r*p)/M}else d=1-r,v=r;return n[0]=d*a+v*c,n[1]=d*s+v*b,n[2]=d*i+v*l,n[3]=d*o+v*u,n},rotationTo(n,e,t){let r=h.dot(e,t);if(r<-.999999){let s=h.create();return h.cross(s,h.create(1,0,0),e),h.length(s)<1e-6&&h.cross(s,h.create(0,1,0),e),h.normalize(s,s),K.setAxisAngle(n,s,Math.PI)}if(r>.999999)return K.identity(n);let a=h.cross(h.create(),e,t);return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=1+r,K.normalize(n,n)},lookRotation(n,e,t){let r=O.create(),a=h.normalize(h.create(),h.negate(h.create(),e)),s=h.normalize(h.create(),h.cross(h.create(),t,a)),i=h.cross(h.create(),a,s);return r[0]=s[0],r[1]=s[1],r[2]=s[2],r[4]=i[0],r[5]=i[1],r[6]=i[2],r[8]=a[0],r[9]=a[1],r[10]=a[2],O.getRotation(n,r)}},O={create(){let n=new Float32Array(16);return n[0]=n[5]=n[10]=n[15]=1,n},clone(n){return new Float32Array(n)},copy(n,e){for(let t=0;t<16;t++)n[t]=e[t];return n},identity(n){return n.fill(0),n[0]=n[5]=n[10]=n[15]=1,n},multiply(n,e,t){let r=e[0],a=e[1],s=e[2],i=e[3],o=e[4],c=e[5],b=e[6],l=e[7],u=e[8],m=e[9],d=e[10],v=e[11],p=e[12],M=e[13],g=e[14],w=e[15];for(let x=0;x<4;x++){let y=t[x*4],k=t[x*4+1],f=t[x*4+2],A=t[x*4+3];n[x*4]=y*r+k*o+f*u+A*p,n[x*4+1]=y*a+k*c+f*m+A*M,n[x*4+2]=y*s+k*b+f*d+A*g,n[x*4+3]=y*i+k*l+f*v+A*w}return n},invert(n,e){let t=e[0],r=e[1],a=e[2],s=e[3],i=e[4],o=e[5],c=e[6],b=e[7],l=e[8],u=e[9],m=e[10],d=e[11],v=e[12],p=e[13],M=e[14],g=e[15],w=t*o-r*i,x=t*c-a*i,y=t*b-s*i,k=r*c-a*o,f=r*b-s*o,A=a*b-s*c,S=l*p-u*v,P=l*M-m*v,T=l*g-d*v,R=u*M-m*p,L=u*g-d*p,z=m*g-d*M,j=w*z-x*L+y*R+k*T-f*P+A*S;return j?(j=1/j,n[0]=(o*z-c*L+b*R)*j,n[1]=(a*L-r*z-s*R)*j,n[2]=(p*A-M*f+g*k)*j,n[3]=(m*f-u*A-d*k)*j,n[4]=(c*T-i*z-b*P)*j,n[5]=(t*z-a*T+s*P)*j,n[6]=(M*y-v*A-g*x)*j,n[7]=(l*A-m*y+d*x)*j,n[8]=(i*L-o*T+b*S)*j,n[9]=(r*T-t*L-s*S)*j,n[10]=(v*f-p*y+g*w)*j,n[11]=(u*y-l*f-d*w)*j,n[12]=(o*P-i*R-c*S)*j,n[13]=(t*R-r*P+a*S)*j,n[14]=(p*x-v*k-M*w)*j,n[15]=(l*k-u*x+m*w)*j,n):null},transpose(n,e){if(n===e){let t=e[1],r=e[2],a=e[3],s=e[6],i=e[7],o=e[11];return n[1]=e[4],n[2]=e[8],n[3]=e[12],n[4]=t,n[6]=e[9],n[7]=e[13],n[8]=r,n[9]=s,n[11]=e[14],n[12]=a,n[13]=i,n[14]=o,n}for(let t=0;t<4;t++)for(let r=0;r<4;r++)n[r*4+t]=e[t*4+r];return n},fromRotationTranslationScale(n,e,t,r){let a=e[0],s=e[1],i=e[2],o=e[3],c=a+a,b=s+s,l=i+i,u=a*c,m=a*b,d=a*l,v=s*b,p=s*l,M=i*l,g=o*c,w=o*b,x=o*l,y=r[0],k=r[1],f=r[2];return n[0]=(1-(v+M))*y,n[1]=(m+x)*y,n[2]=(d-w)*y,n[3]=0,n[4]=(m-x)*k,n[5]=(1-(u+M))*k,n[6]=(p+g)*k,n[7]=0,n[8]=(d+w)*f,n[9]=(p-g)*f,n[10]=(1-(u+v))*f,n[11]=0,n[12]=t[0],n[13]=t[1],n[14]=t[2],n[15]=1,n},fromRotationTranslation(n,e,t){return O.fromRotationTranslationScale(n,e,t,$r)},translate(n,e,t){let r=t[0],a=t[1],s=t[2];if(n!==e)for(let i=0;i<12;i++)n[i]=e[i];return n[12]=e[0]*r+e[4]*a+e[8]*s+e[12],n[13]=e[1]*r+e[5]*a+e[9]*s+e[13],n[14]=e[2]*r+e[6]*a+e[10]*s+e[14],n[15]=e[3]*r+e[7]*a+e[11]*s+e[15],n},fromTranslation(n,e){return O.identity(n),n[12]=e[0],n[13]=e[1],n[14]=e[2],n},fromScaling(n,e){return O.identity(n),n[0]=e[0],n[5]=e[1],n[10]=e[2],n},fromQuat(n,e){return O.fromRotationTranslationScale(n,e,Qs,$r)},getTranslation(n,e){return n[0]=e[12],n[1]=e[13],n[2]=e[14],n},getScaling(n,e){return n[0]=Math.hypot(e[0],e[1],e[2]),n[1]=Math.hypot(e[4],e[5],e[6]),n[2]=Math.hypot(e[8],e[9],e[10]),n},getRotation(n,e){let t=Math.hypot(e[0],e[1],e[2])||1,r=Math.hypot(e[4],e[5],e[6])||1,a=Math.hypot(e[8],e[9],e[10])||1,s=e[0]/t,i=e[1]/t,o=e[2]/t,c=e[4]/r,b=e[5]/r,l=e[6]/r,u=e[8]/a,m=e[9]/a,d=e[10]/a,v=s+b+d;if(v>0){let p=Math.sqrt(v+1)*2;n[3]=.25*p,n[0]=(l-m)/p,n[1]=(u-o)/p,n[2]=(i-c)/p}else if(s>b&&s>d){let p=Math.sqrt(1+s-b-d)*2;n[3]=(l-m)/p,n[0]=.25*p,n[1]=(i+c)/p,n[2]=(u+o)/p}else if(b>d){let p=Math.sqrt(1+b-s-d)*2;n[3]=(u-o)/p,n[0]=(i+c)/p,n[1]=.25*p,n[2]=(l+m)/p}else{let p=Math.sqrt(1+d-s-b)*2;n[3]=(i-c)/p,n[0]=(u+o)/p,n[1]=(l+m)/p,n[2]=.25*p}return n},lookAt(n,e,t,r){let a=e[0]-t[0],s=e[1]-t[1],i=e[2]-t[2],o=Math.hypot(a,s,i)||1;a/=o,s/=o,i/=o;let c=r[1]*i-r[2]*s,b=r[2]*a-r[0]*i,l=r[0]*s-r[1]*a;o=Math.hypot(c,b,l)||1,c/=o,b/=o,l/=o;let u=s*l-i*b,m=i*c-a*l,d=a*b-s*c;return n[0]=c,n[1]=u,n[2]=a,n[3]=0,n[4]=b,n[5]=m,n[6]=s,n[7]=0,n[8]=l,n[9]=d,n[10]=i,n[11]=0,n[12]=-(c*e[0]+b*e[1]+l*e[2]),n[13]=-(u*e[0]+m*e[1]+d*e[2]),n[14]=-(a*e[0]+s*e[1]+i*e[2]),n[15]=1,n},perspectiveReversedInfinite(n,e,t,r,a=0,s=0){let i=1/Math.tan(e/2);return n.fill(0),n[0]=i/t,n[5]=i,n[8]=-a,n[9]=-s,n[11]=-1,n[14]=r,n},perspectiveZO(n,e,t,r,a){let s=1/Math.tan(e/2);n.fill(0),n[0]=s/t,n[5]=s,n[11]=-1;let i=1/(r-a);return n[10]=a*i,n[14]=a*r*i,n},orthoZO(n,e,t,r,a,s,i){let o=1/(e-t),c=1/(r-a),b=1/(s-i);return n.fill(0),n[0]=-2*o,n[5]=-2*c,n[10]=b,n[15]=1,n[12]=(e+t)*o,n[13]=(a+r)*c,n[14]=s*b,n},normalMatrix12(n,e,t=0){let r=e[0],a=e[1],s=e[2],i=e[4],o=e[5],c=e[6],b=e[8],l=e[9],u=e[10],m=u*o-c*l,d=-u*i+c*b,v=l*i-o*b,p=r*m+a*d+s*v;p=p?1/p:0;let M=m*p,g=(-u*a+s*l)*p,w=(c*a-s*o)*p,x=d*p,y=(u*r-s*b)*p,k=(-c*r+s*i)*p,f=v*p,A=(-l*r+a*b)*p,S=(o*r-a*i)*p;return n[t+0]=M,n[t+1]=x,n[t+2]=f,n[t+3]=0,n[t+4]=g,n[t+5]=y,n[t+6]=A,n[t+7]=0,n[t+8]=w,n[t+9]=k,n[t+10]=S,n[t+11]=0,n}},$r=new Float32Array([1,1,1]),Qs=new Float32Array([0,0,0]),Qe={create(){return{min:h.create(1/0,1/0,1/0),max:h.create(-1/0,-1/0,-1/0)}},fromPositions(n){let e=Qe.create();for(let t=0;t<n.length;t+=3){let r=n[t],a=n[t+1],s=n[t+2];r<e.min[0]&&(e.min[0]=r),a<e.min[1]&&(e.min[1]=a),s<e.min[2]&&(e.min[2]=s),r>e.max[0]&&(e.max[0]=r),a>e.max[1]&&(e.max[1]=a),s>e.max[2]&&(e.max[2]=s)}return e},transform(n,e,t){for(let r=0;r<3;r++){let a=t[12+r],s=t[12+r];for(let i=0;i<3;i++){let o=t[i*4+r],c=o*e.min[i],b=o*e.max[i];c<b?(a+=c,s+=b):(a+=b,s+=c)}n.min[r]=a,n.max[r]=s}return n}};function br(n,e=new Float32Array(20)){let t=c=>[n[c],n[4+c],n[8+c],n[12+c]],r=t(0),a=t(1),s=t(2),i=t(3),o=[[i[0]+r[0],i[1]+r[1],i[2]+r[2],i[3]+r[3]],[i[0]-r[0],i[1]-r[1],i[2]-r[2],i[3]-r[3]],[i[0]+a[0],i[1]+a[1],i[2]+a[2],i[3]+a[3]],[i[0]-a[0],i[1]-a[1],i[2]-a[2],i[3]-a[3]],[i[0]-s[0],i[1]-s[1],i[2]-s[2],i[3]-s[3]]];for(let c=0;c<5;c++){let b=Math.hypot(o[c][0],o[c][1],o[c][2])||1;for(let l=0;l<4;l++)e[c*4+l]=o[c][l]/b}return e}function dr(n,e){for(let t=0;t<5;t++){let r=n[t*4],a=n[t*4+1],s=n[t*4+2],i=n[t*4+3],o=r>=0?e.max[0]:e.min[0],c=a>=0?e.max[1]:e.min[1],b=s>=0?e.max[2]:e.min[2];if(r*o+a*c+s*b+i<0)return!1}return!0}function dt(n=2654435769){let e=n>>>0,t=()=>{e=e+1831565813>>>0;let r=e;return r=Math.imul(r^r>>>15,r|1),r^=r+Math.imul(r^r>>>7,r|61),((r^r>>>14)>>>0)/4294967296};return{next:t,range:(r,a)=>r+(a-r)*t(),gauss:()=>{let r=Math.max(t(),1e-12),a=t();return Math.sqrt(-2*Math.log(r))*Math.cos(2*Math.PI*a)},sign:()=>t()<.5?-1:1}}function ur(n,e){let t=1,r=0,a=n;for(;a>0;)t/=e,r+=t*(a%e),a=Math.floor(a/e);return r}var ga=class n{adapter;device;context;canvas;presentationFormat;features;onError=e=>console.error("[fondaineGL]",e);offscreen;constructor(e,t,r,a){this.adapter=e,this.device=t,this.canvas=r,this.offscreen=a,this.presentationFormat=a?"rgba8unorm":navigator.gpu.getPreferredCanvasFormat();let s=a?null:r.getContext("webgpu");if(!a&&!s)throw new Error("fondaineGL: could not get a WebGPU canvas context");this.context=s,a||this.context.configure({device:t,format:this.presentationFormat,alphaMode:"opaque"}),this.features=new Set([...t.features]),t.addEventListener("uncapturederror",i=>this.onError(i.error.message)),t.lost.then(i=>this.onError(`device lost (${i.reason}): ${i.message}`))}static async create(e){if(!("gpu"in navigator))throw new Error("fondaineGL requires WebGPU (Chrome/Edge 113+, Safari 26+, Firefox 141+).");let t=await navigator.gpu.requestAdapter({powerPreference:e.powerPreference??"high-performance"});if(!t)throw new Error("fondaineGL: no WebGPU adapter available");let a=["float32-filterable","rg11b10ufloat-renderable","texture-compression-bc","texture-compression-astc","texture-compression-etc2",...e.optionalFeatures??[]].filter(o=>t.features.has(o)),s=t.limits,i=await t.requestDevice({requiredFeatures:a,requiredLimits:{maxTextureDimension2D:s.maxTextureDimension2D,maxTextureArrayLayers:s.maxTextureArrayLayers,maxStorageBufferBindingSize:s.maxStorageBufferBindingSize,maxBufferSize:s.maxBufferSize,maxComputeWorkgroupStorageSize:s.maxComputeWorkgroupStorageSize,maxComputeInvocationsPerWorkgroup:s.maxComputeInvocationsPerWorkgroup,maxStorageTexturesPerShaderStage:s.maxStorageTexturesPerShaderStage,maxSampledTexturesPerShaderStage:s.maxSampledTexturesPerShaderStage,maxColorAttachmentBytesPerSample:s.maxColorAttachmentBytesPerSample}});return new n(t,i,e.canvas,!!e.offscreen)}get floatFilterable(){return this.features.has("float32-filterable")}createBuffer(e,t,r,a){let s=Math.max(16,Math.ceil(e/16)*16),i=this.device.createBuffer({size:s,usage:t|GPUBufferUsage.COPY_DST,label:r});return a&&this.device.queue.writeBuffer(i,0,a.buffer,a.byteOffset,a.byteLength),i}createTexture(e){return this.device.createTexture(e)}shader(e,t){let r=this.device.createShaderModule({code:e,label:t});return r.getCompilationInfo?.().then(a=>{for(let s of a.messages){if(s.type!=="error")continue;let o=e.split(`
`).slice(Math.max(0,s.lineNum-3),s.lineNum+1).join(`
`);this.onError(`WGSL error in ${t??"shader"} @${s.lineNum}:${s.linePos}: ${s.message}
${o}`)}}),r}},ya=class{f32;u32;buffer;constructor(e){this.buffer=new ArrayBuffer(Math.ceil(e/16)*16),this.f32=new Float32Array(this.buffer),this.u32=new Uint32Array(this.buffer)}mat4(e,t){this.f32.set(t,e/4)}vec4(e,t,r=0,a=0,s=0){let i=e/4;this.f32[i]=t,this.f32[i+1]=r,this.f32[i+2]=a,this.f32[i+3]=s}uvec4(e,t,r=0,a=0,s=0){let i=e/4;this.u32[i]=t,this.u32[i+1]=r,this.u32[i+2]=a,this.u32[i+3]=s}f(e,t){this.f32[e/4]=t}};function Ze(n,e=n){return Math.floor(Math.log2(Math.max(n,e)))+1}function en(n,e,t){return Math.log2(n*n/e*(100/t))}var fe=class n{positions;normals;uvs;tangents=null;indices;joints=null;weights=null;constructor(e,t,r,a){this.positions=Float32Array.from(e),this.normals=Float32Array.from(t),this.uvs=Float32Array.from(r),this.indices=Uint32Array.from(a)}get vertexCount(){return this.positions.length/3}get triangleCount(){return this.indices.length/3}clone(){let e=new n(this.positions,this.normals,this.uvs,this.indices);return this.tangents&&(e.tangents=Float32Array.from(this.tangents)),this.joints&&(e.joints=Uint16Array.from(this.joints)),this.weights&&(e.weights=Float32Array.from(this.weights)),e}bounds(){return Qe.fromPositions(this.positions)}transform(e){let t=h.create(),r=h.create(),a=O.invert(O.create(),e);O.transpose(a,a);for(let i=0;i<this.positions.length;i+=3)h.transformMat4(t,this.positions.subarray(i,i+3),e),this.positions.set(t,i),h.transformDirMat4(r,this.normals.subarray(i,i+3),a),h.normalize(r,r),this.normals.set(r,i);if(this.tangents){let i=h.create();for(let o=0;o<this.tangents.length;o+=4)h.transformDirMat4(i,this.tangents.subarray(o,o+3),e),h.normalize(i,i),this.tangents.set(i,o)}return e[0]*(e[5]*e[10]-e[6]*e[9])-e[4]*(e[1]*e[10]-e[2]*e[9])+e[8]*(e[1]*e[6]-e[2]*e[5])<0&&this.flipWinding(),this}translate(e,t,r){return this.transform(O.fromTranslation(O.create(),[e,t,r]))}rotateX(e){let t=O.create();return t[5]=Math.cos(e),t[6]=Math.sin(e),t[9]=-Math.sin(e),t[10]=Math.cos(e),this.transform(t)}rotateY(e){let t=O.create();return t[0]=Math.cos(e),t[2]=-Math.sin(e),t[8]=Math.sin(e),t[10]=Math.cos(e),this.transform(t)}rotateZ(e){let t=O.create();return t[0]=Math.cos(e),t[1]=Math.sin(e),t[4]=-Math.sin(e),t[5]=Math.cos(e),this.transform(t)}scale(e,t=e,r=e){return this.transform(O.fromScaling(O.create(),[e,t,r]))}flipWinding(){let e=this.indices;for(let t=0;t<e.length;t+=3){let r=e[t+1];e[t+1]=e[t+2],e[t+2]=r}return this}scaleUVs(e,t=e){for(let r=0;r<this.uvs.length;r+=2)this.uvs[r]*=e,this.uvs[r+1]*=t;return this}displace(e){for(let t=0;t<this.positions.length;t+=3){let r=e([this.positions[t],this.positions[t+1],this.positions[t+2]]);this.positions[t]=r[0],this.positions[t+1]=r[1],this.positions[t+2]=r[2]}return this.computeNormals()}computeNormals(){let e=new Float32Array(this.positions.length),t=this.positions,r=this.indices;for(let a=0;a<r.length;a+=3){let s=r[a]*3,i=r[a+1]*3,o=r[a+2]*3,c=t[i]-t[s],b=t[i+1]-t[s+1],l=t[i+2]-t[s+2],u=t[o]-t[s],m=t[o+1]-t[s+1],d=t[o+2]-t[s+2],v=b*d-l*m,p=l*u-c*d,M=c*m-b*u;for(let g of[s,i,o])e[g]+=v,e[g+1]+=p,e[g+2]+=M}for(let a=0;a<e.length;a+=3){let s=Math.hypot(e[a],e[a+1],e[a+2])||1;e[a]/=s,e[a+1]/=s,e[a+2]/=s}return this.normals=e,this}computeTangents(){return this.tangents=hr(this.positions,this.normals,this.uvs,this.indices),this}toFlat(){let e=this.indices,t=new Float32Array(e.length*3),r=new Float32Array(e.length*2);for(let s=0;s<e.length;s++)t.set(this.positions.subarray(e[s]*3,e[s]*3+3),s*3),r.set(this.uvs.subarray(e[s]*2,e[s]*2+2),s*2);return new n(t,new Float32Array(t.length),r,Array.from({length:e.length},(s,i)=>i)).computeNormals()}static merge(e){let t=0,r=0;for(let d of e)t+=d.vertexCount,r+=d.indices.length;let a=new Float32Array(t*3),s=new Float32Array(t*3),i=new Float32Array(t*2),o=new Uint32Array(r),b=e.some(d=>d.tangents)?new Float32Array(t*4):null,l=0,u=0;for(let d of e){a.set(d.positions,l*3),s.set(d.normals,l*3),i.set(d.uvs,l*2),b&&d.tangents&&b.set(d.tangents,l*4);for(let v=0;v<d.indices.length;v++)o[u+v]=d.indices[v]+l;l+=d.vertexCount,u+=d.indices.length}let m=new n(a,s,i,o);return m.tangents=b,m}};function hr(n,e,t,r){let a=n.length/3,s=new Float32Array(a*3),i=new Float32Array(a*3);for(let c=0;c<r.length;c+=3){let b=r[c],l=r[c+1],u=r[c+2],m=n[l*3]-n[b*3],d=n[l*3+1]-n[b*3+1],v=n[l*3+2]-n[b*3+2],p=n[u*3]-n[b*3],M=n[u*3+1]-n[b*3+1],g=n[u*3+2]-n[b*3+2],w=t[l*2]-t[b*2],x=t[l*2+1]-t[b*2+1],y=t[u*2]-t[b*2],k=t[u*2+1]-t[b*2+1],f=w*k-y*x;if(Math.abs(f)<1e-12)continue;let A=1/f,S=(k*m-x*p)*A,P=(k*d-x*M)*A,T=(k*v-x*g)*A,R=(w*p-y*m)*A,L=(w*M-y*d)*A,z=(w*g-y*v)*A;for(let j of[b,l,u])s[j*3]+=S,s[j*3+1]+=P,s[j*3+2]+=T,i[j*3]+=R,i[j*3+1]+=L,i[j*3+2]+=z}let o=new Float32Array(a*4);for(let c=0;c<a;c++){let b=e[c*3],l=e[c*3+1],u=e[c*3+2],m=s[c*3],d=s[c*3+1],v=s[c*3+2],p=b*m+l*d+u*v;m-=b*p,d-=l*p,v-=u*p;let M=Math.hypot(m,d,v);if(M<1e-8){let k=Math.abs(b)<.9?1:0,f=k?0:1;m=f*u-0*l,d=0*b-k*u,v=k*l-f*b,M=Math.hypot(m,d,v)||1}m/=M,d/=M,v/=M;let g=l*v-u*d,w=u*m-b*v,x=b*d-l*m,y=g*i[c*3]+w*i[c*3+1]+x*i[c*3+2]<0?-1:1;o[c*4]=m,o[c*4+1]=d,o[c*4+2]=v,o[c*4+3]=y}return o}var gt=class{pos=[];nrm=[];uv=[];ix=[];v(e,t,r,a,s,i,o,c){return this.pos.push(e,t,r),this.nrm.push(a,s,i),this.uv.push(o,c),this.pos.length/3-1}tri(e,t,r){this.ix.push(e,t,r)}quad(e,t,r,a){this.ix.push(e,t,r,e,r,a)}build(){return new fe(this.pos,this.nrm,this.uv,this.ix)}};function we(n,e,t,r=1){let a=new gt,s=n/2,i=e/2,o=t/2,c=[[[1,0,0],[0,0,-1],[0,1,0],t,e],[[-1,0,0],[0,0,1],[0,1,0],t,e],[[0,1,0],[1,0,0],[0,0,-1],n,t],[[0,-1,0],[1,0,0],[0,0,1],n,t],[[0,0,1],[1,0,0],[0,1,0],n,e],[[0,0,-1],[-1,0,0],[0,1,0],n,e]],b=[s,i,o];for(let[l,u,m,d,v]of c){let p=a.pos.length/3;for(let M=0;M<=r;M++)for(let g=0;g<=r;g++){let w=(g/r-.5)*d,x=(M/r-.5)*v,y=l[0]*b[0]+u[0]*w+m[0]*x,k=l[1]*b[1]+u[1]*w+m[1]*x,f=l[2]*b[2]+u[2]*w+m[2]*x;a.v(y,k,f,l[0],l[1],l[2],w+d/2,x+v/2)}for(let M=0;M<r;M++)for(let g=0;g<r;g++){let w=p+M*(r+1)+g;a.quad(w,w+1,w+r+2,w+r+1)}}return a.build()}function me(n,e,t,r,a=3){let s=Math.min(r,n/2,e/2,t/2)*.999,i=we(n,e,t,1),o=[n/2-s,e/2-s,t/2-s],c=new gt,b=[[[1,0,0],[0,0,-1],[0,1,0]],[[-1,0,0],[0,0,1],[0,1,0]],[[0,1,0],[1,0,0],[0,0,-1]],[[0,-1,0],[1,0,0],[0,0,1]],[[0,0,1],[1,0,0],[0,1,0]],[[0,0,-1],[-1,0,0],[0,1,0]]],l=[n/2,e/2,t/2],u=m=>m[0]!==0?0:m[1]!==0?1:2;for(let[m,d,v]of b){let p=u(d),M=u(v),g=u(m),w=A=>{let S=[],P=l[A],T=o[A];for(let R=0;R<=a;R++)S.push(-P+R/a*(P-T));T>1e-6&&S.push(T);for(let R=1;R<=a;R++)S.push(T+R/a*(P-T));return S},x=w(p),y=w(M),k=c.pos.length/3;for(let A=0;A<y.length;A++)for(let S=0;S<x.length;S++){let P=[0,0,0];P[g]=m[g]*l[g],P[p]=x[S]*Math.sign(d[p]),P[M]=y[A]*Math.sign(v[M]);let T=[Math.max(-o[0],Math.min(o[0],P[0])),Math.max(-o[1],Math.min(o[1],P[1])),Math.max(-o[2],Math.min(o[2],P[2]))],R=P[0]-T[0],L=P[1]-T[1],z=P[2]-T[2],j=Math.hypot(R,L,z)||1;R/=j,L/=j,z/=j;let I=[T[0]+R*s,T[1]+L*s,T[2]+z*s];c.v(I[0],I[1],I[2],R,L,z,x[S]+l[p],y[A]+l[M])}let f=x.length;for(let A=0;A<y.length-1;A++)for(let S=0;S<f-1;S++){let P=k+A*f+S;c.quad(P,P+1,P+f+1,P+f)}}return c.build()}function ut(n,e,t,r=24,a={}){let s=new gt,i=a.heightSegments??1,o=a.thetaStart??0,c=a.thetaLength??Math.PI*2,b=(e-n)/t,l=Math.max(n,e);for(let m=0;m<=i;m++){let d=m/i,v=e+(n-e)*d,p=-t/2+d*t;for(let M=0;M<=r;M++){let g=o+M/r*c,w=Math.sin(g),x=Math.cos(g),y=Math.hypot(1,b);s.v(v*w,p,v*x,w/y,b/y,x/y,M/r*c*l,p+t/2)}}for(let m=0;m<i;m++)for(let d=0;d<r;d++){let v=m*(r+1)+d;s.quad(v,v+1,v+r+2,v+r+1)}let u=m=>{let d=m?n:e;if(d<=0)return;let v=m?t/2:-t/2,p=m?1:-1,M=s.v(0,v,0,0,p,0,0,0),g=s.pos.length/3;for(let w=0;w<=r;w++){let x=o+w/r*c;s.v(d*Math.sin(x),v,d*Math.cos(x),0,p,0,d*Math.sin(x),d*Math.cos(x))}for(let w=0;w<r;w++)m?s.tri(M,g+w,g+w+1):s.tri(M,g+w+1,g+w)};return a.capTop!==!1&&u(!0),a.capBottom!==!1&&u(!1),s.build()}function je(n,e=32,t=35){let r=new gt,a=[],s=0;for(let c=0;c<n.length;c++){let[b,l]=n[c];c>0&&(s+=Math.hypot(b-n[c-1][0],l-n[c-1][1]));let u=n[Math.max(0,c-1)],m=n[Math.min(n.length-1,c+1)],d=c>0?[b-u[0],l-u[1]]:null,v=c<n.length-1?[m[0]-b,m[1]-l]:null,p=M=>{let g=Math.hypot(M[0],M[1])||1;return[M[1]/g,-M[0]/g]};if(d&&v){let M=Math.atan2(d[1],d[0]),g=Math.atan2(v[1],v[0]),w=Math.abs(M-g);if(w>Math.PI&&(w=2*Math.PI-w),w>t*Math.PI/180){let k=p(d),f=p(v);a.push({r:b,y:l,nr:k[0],ny:k[1],s}),a.push({r:b,y:l,nr:f[0],ny:f[1],s});continue}let x=[d[0]/(Math.hypot(d[0],d[1])||1)+v[0]/(Math.hypot(v[0],v[1])||1),d[1]/(Math.hypot(d[0],d[1])||1)+v[1]/(Math.hypot(v[0],v[1])||1)],y=p(x);a.push({r:b,y:l,nr:y[0],ny:y[1],s})}else{let M=p(d??v);a.push({r:b,y:l,nr:M[0],ny:M[1],s})}}let i=Math.max(...n.map(c=>c[0]),1e-4),o=e+1;for(let c of a)for(let b=0;b<=e;b++){let l=b/e*Math.PI*2,u=Math.sin(l),m=Math.cos(l);r.v(c.r*u,c.y,c.r*m,c.nr*u,c.ny,c.nr*m,b/e*Math.PI*2*i,c.s)}for(let c=0;c<a.length-1;c++)if(!(a[c].r===a[c+1].r&&a[c].y===a[c+1].y))for(let b=0;b<e;b++){let l=c*o+b;r.quad(l,l+1,l+o+1,l+o)}return r.build()}function tn(n,e=24,t=16){let r=new gt;for(let a=0;a<=t;a++){let s=a/t,i=s*Math.PI;for(let o=0;o<=e;o++){let c=o/e,b=c*Math.PI*2,l=-Math.cos(b)*Math.sin(i),u=Math.cos(i),m=Math.sin(b)*Math.sin(i);r.v(l*n,u*n,m*n,l,u,m,c*Math.PI*2*n,s*Math.PI*n)}}for(let a=0;a<t;a++)for(let s=0;s<e;s++){let i=a*(e+1)+s;a!==0&&r.tri(i,i+e+1,i+1),a!==t-1&&r.tri(i+1,i+e+1,i+e+2)}return r.build()}function Nt(n){let e=0;for(let t=0,r=n.length-1;t<n.length;r=t++)e+=(n[r][0]-n[t][0])*(n[r][1]+n[t][1]);return e/2}function fr(n){let e=n.length;if(e<3)return[];let t=Array.from({length:e},(o,c)=>c);Nt(n)<0&&t.reverse();let r=[],a=(o,c,b)=>(c[0]-o[0])*(b[1]-o[1])-(c[1]-o[1])*(b[0]-o[0]),s=(o,c,b,l)=>a(c,b,o)>=0&&a(b,l,o)>=0&&a(l,c,o)>=0,i=0;for(;t.length>3&&i++<1e4;){let o=!1;for(let c=0;c<t.length;c++){let b=t[(c+t.length-1)%t.length],l=t[c],u=t[(c+1)%t.length],m=n[b],d=n[l],v=n[u];if(a(m,d,v)<=1e-12)continue;let p=!0;for(let M of t){if(M===b||M===l||M===u)continue;let g=n[M];if(!(g[0]===m[0]&&g[1]===m[1]||g[0]===d[0]&&g[1]===d[1]||g[0]===v[0]&&g[1]===v[1])&&s(g,m,d,v)){p=!1;break}}if(p){r.push(b,l,u),t.splice(c,1),o=!0;break}}if(!o){for(let c=1;c<t.length-1;c++)r.push(t[0],t[c],t[c+1]);return r}}return t.length===3&&r.push(t[0],t[1],t[2]),r}function Zs(n,e){let t=Nt(n)<0?[...n].reverse():[...n],r=e.map(a=>Nt(a)>0?[...a].reverse():[...a]).sort((a,s)=>Math.max(...s.map(i=>i[0]))-Math.max(...a.map(i=>i[0])));for(let a of r){let s=0;for(let l=1;l<a.length;l++)a[l][0]>a[s][0]&&(s=l);let i=a[s],o=-1,c=1/0;for(let l=0;l<t.length;l++){let u=t[l];if(u[0]<i[0])continue;let m=Math.hypot(u[0]-i[0],u[1]-i[1]);m<c&&(c=m,o=l)}o<0&&(o=0);let b=[...a.slice(s),...a.slice(0,s+1)];t=[...t.slice(0,o+1),...b,t[o],...t.slice(o+1)]}return t}function mr(n,e){let r=Nt(n)>0?1:-1;return n.map((a,s)=>{let i=n[(s+n.length-1)%n.length],o=n[(s+1)%n.length],c=[a[0]-i[0],a[1]-i[1]],b=[o[0]-a[0],o[1]-a[1]],l=Math.hypot(c[0],c[1])||1,u=Math.hypot(b[0],b[1])||1,m=[-c[1]/l*r,c[0]/l*r],d=[-b[1]/u*r,b[0]/u*r],v=m[0]+d[0],p=m[1]+d[1],M=Math.hypot(v,p)||1;v/=M,p/=M;let g=Math.max(.35,v*m[0]+p*m[1]);return[a[0]+v*e/g,a[1]+p*e/g]})}function it(n,e,t={}){let r=new gt,a=Math.min(t.bevel??0,e*.45),s=a>0?Math.max(1,t.bevelSegments??2):0,i=Nt(n)>0?n:[...n].reverse(),o=(t.holes??[]).map(p=>Nt(p)<0?p:[...p].reverse()),c=[i,...o],b=[],l=e/2;if(s>0){for(let p=0;p<=s;p++){let M=p/s*(Math.PI/2);b.push({off:a*(1-Math.sin(M)),z:-l+a*(1-Math.cos(M)),nz:-Math.cos(M),nxy:Math.sin(M)})}for(let p=0;p<=s;p++){let M=p/s*(Math.PI/2);b.push({off:a*(1-Math.cos(M)),z:l-a+a*Math.sin(M),nz:Math.sin(M),nxy:Math.cos(M)})}}else b.push({off:0,z:-l,nz:0,nxy:1},{off:0,z:l,nz:0,nxy:1});for(let p of c){let M=p!==i,g=b.map(x=>x.off>0?mr(p,M?-x.off:x.off):p),w=0;for(let x=0;x<p.length;x++){let y=p[x],k=p[(x+1)%p.length],f=Math.hypot(k[0]-y[0],k[1]-y[1]),A=k[0]-y[0],S=k[1]-y[1],P=Math.hypot(A,S)||1;A/=P,S/=P;let T=S,R=-A,L=r.pos.length/3;for(let z=0;z<b.length;z++){let j=b[z],I=g[z],F=I[x],N=I[(x+1)%I.length],G=[T*j.nxy,R*j.nxy,j.nz];r.v(F[0],F[1],j.z,G[0],G[1],G[2],w,j.z+l),r.v(N[0],N[1],j.z,G[0],G[1],G[2],w+f,j.z+l)}for(let z=0;z<b.length-1;z++){let j=L+z*2;r.quad(j,j+1,j+3,j+2)}w+=f}}let u=s>0?mr(i,a):i,m=o.map(p=>s>0?mr(p,-a):p),d=m.length?Zs(u,m):u,v=fr(d);for(let[p,M]of[[-l,-1],[l,1]]){let g=r.pos.length/3;for(let w of d)r.v(w[0],w[1],p,0,0,M,w[0],w[1]);for(let w=0;w<v.length;w+=3)M>0?r.tri(g+v[w],g+v[w+1],g+v[w+2]):r.tri(g+v[w],g+v[w+2],g+v[w+1])}return r.build()}function pr(n,e,t,r=24){return Array.from({length:r},(a,s)=>[n+Math.cos(s/r*Math.PI*2)*t,e+Math.sin(s/r*Math.PI*2)*t])}function Xt(n,e,t,r,a,s=4){let i=[],o=[[t-a,e+a,-Math.PI/2],[t-a,r-a,0],[n+a,r-a,Math.PI/2],[n+a,e+a,Math.PI]];for(let[c,b,l]of o)for(let u=0;u<=s;u++){let m=l+u/s*(Math.PI/2);i.push([c+Math.cos(m)*a,b+Math.sin(m)*a])}return i}var an=48,va=24,gr={arrayStride:an,attributes:[{shaderLocation:0,offset:0,format:"float32x3"},{shaderLocation:1,offset:12,format:"float32x3"},{shaderLocation:2,offset:24,format:"float32x4"},{shaderLocation:3,offset:40,format:"float32x2"}]},rn={arrayStride:va,attributes:[{shaderLocation:4,offset:0,format:"uint16x4"},{shaderLocation:5,offset:8,format:"float32x4"}]},ve=class{vertexBuffer;indexBuffer;skinBuffer;indexCount;vertexCount;bounds;skinned;source;label;constructor(e,t,r={}){let a=t,s=a.positions.length/3,i=a.uvs??new Float32Array(s*2),o=a.tangents??hr(a.positions,a.normals,i,a.indices),c=new Float32Array(s*(an/4));for(let b=0;b<s;b++){let l=b*12;c[l]=a.positions[b*3],c[l+1]=a.positions[b*3+1],c[l+2]=a.positions[b*3+2],c[l+3]=a.normals[b*3],c[l+4]=a.normals[b*3+1],c[l+5]=a.normals[b*3+2],c[l+6]=o[b*4],c[l+7]=o[b*4+1],c[l+8]=o[b*4+2],c[l+9]=o[b*4+3],c[l+10]=i[b*2],c[l+11]=i[b*2+1]}if(this.label=r.label??"mesh",this.vertexBuffer=e.createBuffer(c.byteLength,GPUBufferUsage.VERTEX,`${this.label}.vb`,c),this.indexBuffer=e.createBuffer(a.indices.byteLength,GPUBufferUsage.INDEX,`${this.label}.ib`,a.indices),this.indexCount=a.indices.length,this.vertexCount=s,this.bounds=Qe.fromPositions(a.positions),this.skinned=!!(a.joints&&a.weights),this.skinned){let b=new ArrayBuffer(s*va),l=new Uint16Array(b),u=new Float32Array(b);for(let m=0;m<s;m++){for(let d=0;d<4;d++)l[m*va/2+d]=a.joints[m*4+d];for(let d=0;d<4;d++)u[(m*va+8)/4+d]=a.weights[m*4+d]}this.skinBuffer=e.createBuffer(b.byteLength,GPUBufferUsage.VERTEX,`${this.label}.skin`,new Uint8Array(b))}else this.skinBuffer=null;this.source=r.keepSource?a:null}destroy(){this.vertexBuffer.destroy(),this.indexBuffer.destroy(),this.skinBuffer?.destroy()}};var $s=`
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
`,yr=class{constructor(e){this.dev=e;this.sampler=e.device.createSampler({minFilter:"linear",magFilter:"linear"}),this.module=e.shader($s,"mipgen")}pipelines=new Map;sampler;module;pipeline(e,t){let r=`${e}:${t}`,a=this.pipelines.get(r);return a||(a=this.dev.device.createRenderPipeline({layout:"auto",vertex:{module:this.module,entryPoint:"vs"},fragment:{module:this.module,entryPoint:t==="normal"?"fsNormal":"fs",targets:[{format:e}]},primitive:{topology:"triangle-list"}}),this.pipelines.set(r,a)),a}generate(e,t="color",r){let a=r??this.dev.device.createCommandEncoder({label:"mipgen"}),s=this.pipeline(e.format,t),i=e.depthOrArrayLayers;for(let o=0;o<i;o++)for(let c=1;c<e.mipLevelCount;c++){let b=this.dev.device.createBindGroup({layout:s.getBindGroupLayout(0),entries:[{binding:0,resource:e.createView({dimension:"2d",baseMipLevel:c-1,mipLevelCount:1,baseArrayLayer:o,arrayLayerCount:1})},{binding:1,resource:this.sampler}]}),l=a.beginRenderPass({colorAttachments:[{view:e.createView({dimension:"2d",baseMipLevel:c,mipLevelCount:1,baseArrayLayer:o,arrayLayerCount:1}),loadOp:"clear",storeOp:"store",clearValue:[0,0,0,0]}]});l.setPipeline(s),l.setBindGroup(0,b),l.draw(3),l.end()}r||this.dev.device.queue.submit([a.finish()])}},xa=class{constructor(e){this.dev=e;this.mipgen=new yr(e),this.white=this.solid([255,255,255,255],"rgba8unorm-srgb","white"),this.black=this.solid([0,0,0,255],"rgba8unorm-srgb","black"),this.flatNormal=this.solid([128,128,255,255],"rgba8unorm","flatNormal"),this.defaultOrm=this.solid([255,255,255,255],"rgba8unorm","orm"),this.white3d=e.device.createTexture({size:[1,1,1],dimension:"3d",format:"r16float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),e.device.queue.writeTexture({texture:this.white3d},new Uint16Array([15360]),{bytesPerRow:2},[1,1,1])}mipgen;white;black;flatNormal;defaultOrm;white3d;samplers=new Map;solid(e,t,r){let a=this.dev.device.createTexture({size:[1,1],format:t,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:r});return this.dev.device.queue.writeTexture({texture:a},new Uint8Array(e),{bytesPerRow:4},[1,1]),a}fromImage(e,t={}){let r=t.srgb?"rgba8unorm-srgb":"rgba8unorm",a=t.mips!==!1?Ze(e.width,e.height):1,s=this.dev.device.createTexture({size:[e.width,e.height],format:r,mipLevelCount:a,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT,label:t.label});return this.dev.device.queue.copyExternalImageToTexture({source:e},{texture:s},[e.width,e.height]),a>1&&this.mipgen.generate(s,t.normalMap?"normal":"color"),s}fromRGBA8(e,t,r,a={}){let s=a.srgb?"rgba8unorm-srgb":"rgba8unorm",i=a.mips!==!1?Ze(t,r):1,o=this.dev.device.createTexture({size:[t,r],format:s,mipLevelCount:i,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT,label:a.label});return this.dev.device.queue.writeTexture({texture:o},e,{bytesPerRow:t*4},[t,r]),i>1&&this.mipgen.generate(o,a.normalMap?"normal":"color"),o}async fromURL(e,t={}){let r=await(await fetch(e)).blob(),a=await createImageBitmap(r,{colorSpaceConversion:"none",premultiplyAlpha:"none"});return this.fromImage(a,{label:e,...t})}sampler(e={}){let t=e.address??"repeat",r=e.addressV??t,a=e.filter??"linear",s=e.anisotropy??16,i=`${t}|${r}|${a}|${s}`,o=this.samplers.get(i);return o||(o=this.dev.device.createSampler({addressModeU:t,addressModeV:r,addressModeW:t,magFilter:a,minFilter:a,mipmapFilter:a,maxAnisotropy:a==="linear"?s:1}),this.samplers.set(i,o)),o}};var nn=128,Pt={ALPHA_MASK:1,UNLIT:2,WORLD_UV:4,FOLIAGE:8,WIND:16,TERRAIN:32},ei=0,pe=class{id=++ei;name;baseColor;emissive;emissiveLuminance;metallic;roughness;normalScale;occlusionStrength;specular;edgeWear;edgeWearRadius;uvScale;uvOffset;uvRotation;alphaMode;alphaCutoff;doubleSided;unlit;worldUV;foliage;wind;terrain;layerTextures;layerScale;blendSharpness;blendNoise;baseColorMap;normalMap;ormMap;emissiveMap;sampler;buffer=null;bindGroup=null;dirtyUniform=!0;dirtyBinding=!0;constructor(e={}){this.name=e.name??`material${this.id}`,this.baseColor=e.baseColor??[.8,.8,.8,1],this.emissive=e.emissive??[0,0,0],this.emissiveLuminance=e.emissiveLuminance??0,this.metallic=e.metallic??0,this.roughness=e.roughness??.6,this.normalScale=e.normalScale??1,this.occlusionStrength=e.occlusionStrength??1,this.specular=e.specular??.5,this.edgeWear=e.edgeWear??0,this.edgeWearRadius=e.edgeWearRadius??.003,this.uvScale=e.uvScale??[1,1],this.uvOffset=e.uvOffset??[0,0],this.uvRotation=e.uvRotation??0,this.alphaMode=e.alphaMode??"opaque",this.alphaCutoff=e.alphaCutoff??.5,this.doubleSided=e.doubleSided??!1,this.unlit=e.unlit??!1,this.worldUV=e.worldUV??!1,this.foliage=e.foliage??!1,this.wind=e.wind??!1,this.terrain=e.terrain??!1,this.layerTextures=e.layerTextures??null,this.layerScale=e.layerScale??[1,1,1],this.blendSharpness=e.blendSharpness??.75,this.blendNoise=e.blendNoise??[1.7,.22],this.baseColorMap=e.baseColorMap??null,this.normalMap=e.normalMap??null,this.ormMap=e.ormMap??null,this.emissiveMap=e.emissiveMap??null,this.sampler=e.sampler??null}markDirty(){this.dirtyUniform=!0}markBindingsDirty(){this.dirtyBinding=!0,this.dirtyUniform=!0}get flags(){let e=0;return this.alphaMode==="mask"&&(e|=Pt.ALPHA_MASK),this.unlit&&(e|=Pt.UNLIT),this.worldUV&&(e|=Pt.WORLD_UV),this.foliage&&(e|=Pt.FOLIAGE),this.wind&&(e|=Pt.WIND),this.terrain&&(e|=Pt.TERRAIN|Pt.WORLD_UV),e}get variantKey(){return`${this.alphaMode}|${this.doubleSided?2:1}|${this.terrain?"T":"S"}`}getBindGroup(e,t,r){if(this.buffer||(this.buffer=e.createBuffer(nn,GPUBufferUsage.UNIFORM,`${this.name}.ub`)),this.dirtyUniform){let a=new Float32Array(nn/4);a.set(this.baseColor,0),a.set(this.emissive,4),a[7]=this.emissiveLuminance,a[8]=this.metallic,a[9]=this.roughness,a[10]=this.normalScale,a[11]=this.occlusionStrength,a[12]=this.uvScale[0],a[13]=this.uvScale[1],a[14]=this.uvOffset[0],a[15]=this.uvOffset[1],a[16]=this.alphaCutoff,a[17]=this.specular,a[18]=this.uvRotation,a[19]=this.flags,a[20]=this.edgeWear,a[21]=this.edgeWearRadius,a[24]=this.layerScale[0],a[25]=this.layerScale[1],a[26]=this.layerScale[2],a[27]=this.blendSharpness,a[28]=this.blendNoise[0],a[29]=this.blendNoise[1],e.device.queue.writeBuffer(this.buffer,0,a),this.dirtyUniform=!1}if(this.dirtyBinding||!this.bindGroup){if(this.terrain){if(!this.layerTextures)throw new Error(`material ${this.name}: terrain materials need layerTextures`);let a=this.layerTextures,s=i=>i.createView({dimension:"2d-array"});return this.bindGroup=e.device.createBindGroup({layout:r,label:this.name,entries:[{binding:0,resource:{buffer:this.buffer}},{binding:1,resource:this.sampler??t.sampler()},{binding:2,resource:s(a.albedo)},{binding:3,resource:s(a.normal)},{binding:4,resource:s(a.orm)},{binding:5,resource:(this.emissiveMap??t.white).createView()}]}),this.dirtyBinding=!1,this.bindGroup}this.bindGroup=e.device.createBindGroup({layout:r,label:this.name,entries:[{binding:0,resource:{buffer:this.buffer}},{binding:1,resource:this.sampler??t.sampler()},{binding:2,resource:(this.baseColorMap??t.white).createView()},{binding:3,resource:(this.normalMap??t.flatNormal).createView()},{binding:4,resource:(this.ormMap??t.defaultOrm).createView()},{binding:5,resource:(this.emissiveMap??t.white).createView()}]}),this.dirtyBinding=!1}return this.bindGroup}};function wa(n=!1){let e=n?"texture_2d_array<f32>":"texture_2d<f32>",t=n?", layer":"";return`
struct MaterialU {
  baseColor: vec4f,
  emissive: vec4f,      // rgb, w = luminance (cd/m^2)
  pbr: vec4f,           // metallic, roughness, normal scale, occlusion strength
  uvTransform: vec4f,   // scale.xy, offset.xy
  params: vec4f,        // alpha cutoff, specular, uv rotation, flags (bits)
  wear: vec4f,          // edge wear amount, full-wear edge radius (m), unused, unused
  layers: vec4f,        // terrain: uv scale of layer 0, 1, 2; blend sharpness
  layers2: vec4f,       // terrain: blend noise scale (m), blend noise strength, unused, unused
};
@group(2) @binding(0) var<uniform> material: MaterialU;
@group(2) @binding(1) var matSampler: sampler;
@group(2) @binding(2) var baseColorTex: ${e};
@group(2) @binding(3) var normalTex: ${e};
@group(2) @binding(4) var ormTex: ${e};
@group(2) @binding(5) var emissiveTex: texture_2d<f32>;
const MATERIAL_IS_TERRAIN: bool = ${n?"true":"false"};
fn sampleBase(uv: vec2f, layer: i32) -> vec4f { return textureSample(baseColorTex, matSampler, uv${t}); }
fn sampleNormalMap(uv: vec2f, layer: i32) -> vec4f { return textureSample(normalTex, matSampler, uv${t}); }
fn sampleOrm(uv: vec2f, layer: i32) -> vec4f { return textureSample(ormTex, matSampler, uv${t}); }

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
`}var zc=wa(!1);var ti={concrete:0,wood:1,anodized:2,parkerized:3,polymer:4,paintedSteel:5,ground:6,gravel:7,brass:8,paperTarget:9,rubber:10,webbing:11,cardboard:12,bareSteel:13,grass:14,nitride:15,machined:16,skin:17,glove:18},ai=`
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
      // 'extra' = outdoor weathering (0..1): rust streaks running down (+v), grime where it meets the ground (v\u22480)
      let fine = fbm(uv, 64, 3, seed);
      let orange = fbm(uv, 24, 4, seed + 2u);
      let chips = smoothstep(0.62, 0.7, fbm(uv, 10, 6, seed + 6u) * 0.5 + 0.5) * wear;
      let rustN = fbm(uv, 20, 5, seed + 10u);
      let rust = saturate(chips * smoothstep(0.0, 0.6, rustN + 0.3));
      let steel = vec3f(0.08, 0.085, 0.09) * (0.8 + 0.4 * fine);
      let rustC = mix(vec3f(0.18, 0.06, 0.02), vec3f(0.35, 0.13, 0.04), rustN * 0.5 + 0.5);
      var c = P.color.rgb * (0.94 + 0.05 * orange + 0.03 * fine);
      c = mix(c, mix(steel, rustC, rust), chips);
      var streak = 0.0;
      var grime = 0.0;
      if (extra > 0.0) {
        // streaks: thin vertical runs seeded at a few u positions, fading downwards; stronger near the top
        let col = gnoise(vec2f(uv.x * 60.0, uv.y * 1.5), vec2i(60, 2), seed + 21u);
        let run = smoothstep(0.55, 0.9, abs(col)) * smoothstep(0.0, 0.35, 1.0 - uv.y) * (0.5 + 0.5 * fbm(uv, 6, 3, seed + 23u));
        streak = saturate(run * 1.3) * extra;
        grime = smoothstep(0.22, 0.0, uv.y) * extra * (0.6 + 0.4 * fbm(uv, 12, 3, seed + 25u));
        c = mix(c, rustC * 0.9, streak * 0.7);
        c = mix(c, c * vec3f(0.45, 0.42, 0.38), grime * 0.8);
      }
      s.albedo = c;
      s.metal = chips * (1.0 - rust) * 0.9;
      s.rough = mix(0.45 + 0.08 * orange, mix(0.45, 0.85, rust), chips);
      s.rough = mix(s.rough, 0.85, max(streak * 0.6, grime * 0.7));
      s.height = 0.5 + 0.04 * orange + 0.03 * fine - 0.25 * chips - 0.05 * streak;
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
    case 7u: { // range gravel: 1\u20132 cm angular crushed stone in a bed of fines/dust, size variation, worn lanes
      // 'extra' = wear (compacted, dusty tyre / foot paths, 0..1); P.misc.x = tile metres (stones scale with it)
      let tm = max(P.misc.x, 0.25);
      let fS = i32(round(tm * 70.0));   // \u2248 1.4 cm stones
      let fM = i32(round(tm * 36.0));   // \u2248 2.8 cm stones (sparser)
      let fL = i32(round(tm * 16.0));   // the odd 6 cm cobble
      let ws = worley(uv, fS, seed);
      let wm = worley(uv, fM, seed + 3u);
      let wl = worley(uv, fL, seed + 5u);
      // angular facets: cell distance warped by per-cell noise, hard edge where cells meet (F2 \u2212 F1)
      let facet = gnoise(uv * f32(fS) * 3.0, vec2i(fS * 3), seed + 7u);
      let stoneS = smoothstep(0.02, 0.09, ws.y - ws.x) * step(0.18, ws.z);
      let stoneM = smoothstep(0.03, 0.14, wm.y - wm.x) * step(0.62, wm.z);
      let stoneL = smoothstep(0.05, 0.2, wl.y - wl.x) * step(0.9, wl.z);
      let stone = max(stoneS, max(stoneM, stoneL));
      // compacted wear lanes: low-frequency bands where traffic has ground the stones into the fines
      let lanes = smoothstep(0.15, 0.55, fbm(uv, 2, 3, seed + 11u) * 0.5 + 0.5) * extra;
      let wearK = 1.0 - 0.75 * lanes;
      let dust = smoothstep(0.3, 0.9, fbm(uv, 24, 3, seed + 13u) * 0.5 + 0.5);
      // stone colours: a mix of grey, buff and darker basalt-like pieces, each piece one colour
      let idc = select(ws.z, select(wm.z, wl.z, stoneL > 0.5), stoneM > 0.5);
      var stoneC = mix(P.color.rgb, P.color2.rgb, smoothstep(0.3, 0.7, idc));
      stoneC = mix(stoneC, vec3f(0.5, 0.47, 0.42), step(0.82, fract(idc * 7.31)) * 0.6);
      stoneC *= 0.78 + 0.3 * facet + 0.12 * fbm(uv, 128, 2, seed + 17u);
      let fines = vec3f(0.3, 0.27, 0.24) * (0.75 + 0.35 * dust + 0.1 * fbm(uv, 64, 3, seed + 19u));
      var c = mix(fines, stoneC, stone * wearK);
      c = mix(c, c * 0.72 + fines * 0.2, lanes * 0.5);          // lanes: dustier, duller, slightly darker
      s.albedo = c;
      let relS = (1.0 - ws.x * 1.6) * stoneS;
      let relM = (1.0 - wm.x * 1.3) * stoneM * 1.6;
      let relL = (1.0 - wl.x) * stoneL * 2.4;
      s.height = 0.35 + 0.5 * max(relS, max(relM, relL)) * wearK + 0.08 * dust;
      s.rough = mix(0.86, 0.68, stone * (1.0 - lanes)) + 0.06 * facet;
      s.ao = 1.0 - 0.45 * (1.0 - stone) * (1.0 - lanes);
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
`,ri={concrete:{tileMeters:2,color:[.42,.41,.39],color2:[0,0,0],wear:.3,dirt:.5,roughness:-1,bumpMm:1.2,extra:0},wood:{tileMeters:1,color:[.52,.34,.18],color2:[.32,.19,.09],wear:.4,dirt:.2,roughness:-1,bumpMm:.6,extra:0},anodized:{tileMeters:.25,color:[.035,.036,.038],color2:[0,0,0],wear:.25,dirt:0,roughness:.42,bumpMm:.02,extra:0},parkerized:{tileMeters:.25,color:[.055,.058,.056],color2:[0,0,0],wear:.2,dirt:0,roughness:-1,bumpMm:.03,extra:0},polymer:{tileMeters:.2,color:[.03,.03,.032],color2:[0,0,0],wear:0,dirt:.2,roughness:.62,bumpMm:.15,extra:0},paintedSteel:{tileMeters:.5,color:[.8,.8,.78],color2:[0,0,0],wear:.35,dirt:0,roughness:-1,bumpMm:.3,extra:0},ground:{tileMeters:4,color:[.24,.18,.12],color2:[.09,.11,.04],wear:0,dirt:0,roughness:-1,bumpMm:8,extra:0},gravel:{tileMeters:1.5,color:[.52,.5,.46],color2:[.3,.29,.28],wear:0,dirt:0,roughness:-1,bumpMm:9,extra:.5},brass:{tileMeters:.05,color:[.95,.73,.38],color2:[0,0,0],wear:.2,dirt:0,roughness:-1,bumpMm:.01,extra:0},paperTarget:{tileMeters:.45,color:[.75,.05,.03],color2:[0,0,0],wear:0,dirt:0,roughness:-1,bumpMm:.05,extra:0},rubber:{tileMeters:.1,color:[.025,.025,.025],color2:[0,0,0],wear:0,dirt:0,roughness:-1,bumpMm:.4,extra:1},webbing:{tileMeters:.05,color:[.12,.13,.1],color2:[0,0,0],wear:0,dirt:0,roughness:-1,bumpMm:.25,extra:0},cardboard:{tileMeters:.6,color:[.55,.4,.25],color2:[0,0,0],wear:0,dirt:.3,roughness:-1,bumpMm:.2,extra:0},bareSteel:{tileMeters:.5,color:[0,0,0],color2:[0,0,0],wear:.3,dirt:0,roughness:-1,bumpMm:.2,extra:0},grass:{tileMeters:1.5,color:[.055,.085,.022],color2:[.2,.17,.085],wear:0,dirt:0,roughness:-1,bumpMm:10,extra:0},nitride:{tileMeters:.12,color:[.028,.029,.032],color2:[0,0,0],wear:.2,dirt:0,roughness:-1,bumpMm:.015,extra:0},machined:{tileMeters:.06,color:[.62,.62,.63],color2:[0,0,0],wear:.15,dirt:0,roughness:-1,bumpMm:.01,extra:1},skin:{tileMeters:.05,color:[.56,.33,.24],color2:[0,0,0],wear:0,dirt:0,roughness:-1,bumpMm:.12,extra:0},glove:{tileMeters:.04,color:[.045,.043,.04],color2:[0,0,0],wear:.35,dirt:.1,roughness:-1,bumpMm:.12,extra:0}},Ma=class{constructor(e,t){this.dev=e;this.tex=t;this.pipeline=e.device.createComputePipeline({layout:"auto",compute:{module:e.shader(ai,"material-synth"),entryPoint:"main"}})}pipeline;cache=new Map;generate(e,t={}){let a={...ri[e],...t,size:t.size??1024,seed:t.seed??1},s=JSON.stringify([e,a]),i=this.cache.get(s);if(i)return i;let o=this.dev.device,c=a.size,b=T=>o.createTexture({size:[c,c],format:"rgba8unorm",usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.COPY_SRC,label:T}),l=b(`${e}.albedo.tmp`),u=b(`${e}.normal.tmp`),m=b(`${e}.orm.tmp`),d=new ArrayBuffer(64),v=new Uint32Array(d),p=new Float32Array(d);v[0]=ti[e],v[1]=a.seed>>>0,v[2]=c,p.set([...a.color,a.wear],4),p.set([...a.color2,a.dirt],8),p.set([a.tileMeters,a.roughness,a.bumpMm,a.extra],12);let M=this.dev.createBuffer(64,GPUBufferUsage.UNIFORM,"synth.params",new Uint8Array(d)),g=o.createBindGroup({layout:this.pipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:M}},{binding:1,resource:l.createView()},{binding:2,resource:u.createView()},{binding:3,resource:m.createView()}]}),w=Ze(c),x=(T,R)=>o.createTexture({size:[c,c],format:R,mipLevelCount:w,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT,label:T}),y=x(`${e}.albedo`,"rgba8unorm-srgb"),k=x(`${e}.normal`,"rgba8unorm"),f=x(`${e}.orm`,"rgba8unorm"),A=o.createCommandEncoder({label:`synth ${e}`}),S=A.beginComputePass();S.setPipeline(this.pipeline),S.setBindGroup(0,g),S.dispatchWorkgroups(Math.ceil(c/8),Math.ceil(c/8)),S.end(),A.copyTextureToTexture({texture:l},{texture:y},[c,c]),A.copyTextureToTexture({texture:u},{texture:k},[c,c]),A.copyTextureToTexture({texture:m},{texture:f},[c,c]),this.tex.mipgen.generate(y,"color",A),this.tex.mipgen.generate(k,"normal",A),this.tex.mipgen.generate(f,"color",A),o.queue.submit([A.finish()]),o.queue.onSubmittedWorkDone().then(()=>{l.destroy(),u.destroy(),m.destroy(),M.destroy()});let P={albedo:y,normal:k,orm:f,tileMeters:a.tileMeters};return this.cache.set(s,P),P}material(e,t={},r={}){let a=this.generate(e,t),s=1/a.tileMeters;return new pe({name:r.name??e,baseColorMap:a.albedo,normalMap:a.normal,ormMap:a.orm,baseColor:[1,1,1,1],roughness:1,metallic:1,uvScale:[s,s],...r})}};var ni={enabled:!0,mode:"volumetric",quality:"auto",coverage:.45,type:.55,density:32,altitude:1500,thickness:1900,featureScale:7e3,shapeScale:5200,detailScale:520,windFactor:2.5,windVeer:25,shadowStrength:1,ambient:1,multiScatter:1.6,albedo:.97},si={low:{dome:256,steps:40,lightSteps:3,updateDiv:2,shadow:192,shadowSteps:8,baseNoise:64,detailNoise:32},medium:{dome:384,steps:64,lightSteps:5,updateDiv:4,shadow:384,shadowSteps:16,baseNoise:128,detailNoise:32},high:{dome:640,steps:96,lightSteps:6,updateDiv:4,shadow:512,shadowSteps:24,baseNoise:128,detailNoise:32}},vr=64,Yt=512,Qt=48e3,sn=3600,ka=1.2,xr=128;function ii(n){let e=n.info,t=`${e?.vendor??""} ${e?.architecture??""} ${e?.device??""} ${e?.description??""}`.toLowerCase();return/swiftshader|lavapipe|llvmpipe|software/.test(t)||!!n.isFallbackAdapter}var Sa=`
fn hash33(p: vec3f) -> vec3f {
  var q = fract(p * vec3f(0.1031, 0.1030, 0.0973));
  q += dot(q, q.yxz + 33.33);
  return fract((q.xxy + q.yxx) * q.zyx);
}
fn hash21(p: vec2f) -> f32 {
  var q = fract(vec3f(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}
fn modv3(p: vec3f, period: f32) -> vec3f { return p - period * floor(p / period); }
fn modv2(p: vec2f, period: f32) -> vec2f { return p - period * floor(p / period); }
fn remap(v: f32, lo: f32, hi: f32, nlo: f32, nhi: f32) -> f32 { return nlo + (v - lo) * (nhi - nlo) / max(hi - lo, 1e-5); }
fn remapc(v: f32, lo: f32, hi: f32, nlo: f32, nhi: f32) -> f32 { return clamp(remap(v, lo, hi, nlo, nhi), min(nlo, nhi), max(nlo, nhi)); }

/// Tileable 3D gradient (Perlin) noise, period in cells. Range \u2248 [-0.9, 0.9].
fn perlin3(x: vec3f, period: f32) -> f32 {
  let i = floor(x);
  let f = fract(x);
  let u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  var s = array<f32, 8>();
  for (var c = 0u; c < 8u; c++) {
    let o = vec3f(f32(c & 1u), f32((c >> 1u) & 1u), f32((c >> 2u) & 1u));
    let g = normalize(hash33(modv3(i + o, period)) * 2.0 - 1.0 + vec3f(1e-4));
    s[c] = dot(g, f - o);
  }
  let x0 = mix(mix(s[0], s[1], u.x), mix(s[2], s[3], u.x), u.y);
  let x1 = mix(mix(s[4], s[5], u.x), mix(s[6], s[7], u.x), u.y);
  return mix(x0, x1, u.z);
}
/// Tileable 3D Worley (cellular) noise, inverted so cell centres are 1: billowy cloud puffs.
fn worley3(x: vec3f, period: f32) -> f32 {
  let i = floor(x);
  let f = fract(x);
  var md = 1e9;
  for (var dz = -1; dz <= 1; dz++) {
    for (var dy = -1; dy <= 1; dy++) {
      for (var dx = -1; dx <= 1; dx++) {
        let c = vec3f(f32(dx), f32(dy), f32(dz));
        let o = hash33(modv3(i + c, period));
        let d = c + o - f;
        md = min(md, dot(d, d));
      }
    }
  }
  return saturate(1.0 - sqrt(md));
}
/// Tileable 2D value noise.
fn vnoise2(x: vec2f, period: f32) -> f32 {
  let i = floor(x);
  let f = fract(x);
  let u = f * f * (3.0 - 2.0 * f);
  let a = hash21(modv2(i, period));
  let b = hash21(modv2(i + vec2f(1.0, 0.0), period));
  let c = hash21(modv2(i + vec2f(0.0, 1.0), period));
  let d = hash21(modv2(i + vec2f(1.0, 1.0), period));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
fn fbm2(p: vec2f, period: f32, octaves: i32) -> f32 {
  var v = 0.0;
  var a = 0.5;
  var norm = 0.0;
  var q = p;
  var per = period;
  for (var o = 0; o < 8; o++) {
    if (o >= octaves) { break; }
    v += a * vnoise2(q, per);
    norm += a;
    q = q * 2.0 + vec2f(13.7, 7.1);
    per *= 2.0;
    a *= 0.5;
  }
  return v / norm;
}
`,oi=Sa+`
struct P { size: vec4f };
@group(0) @binding(0) var<uniform> U: P;
@group(0) @binding(1) var outTex: texture_storage_3d<rgba8unorm, write>;
@compute @workgroup_size(4, 4, 4)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let n = u32(U.size.x);
  if (id.x >= n || id.y >= n || id.z >= n) { return; }
  let p = (vec3f(id) + 0.5) / f32(n);
  let fs = U.size.y; // frequency scale (1 at 128\xB3)
  let f0 = 4.0 * fs;
  var pf = perlin3(p * f0, f0) * 0.5 + perlin3(p * f0 * 2.0, f0 * 2.0) * 0.25 + perlin3(p * f0 * 4.0, f0 * 4.0) * 0.125;
  pf = saturate(pf * 0.78 / 0.875 + 0.5);
  let w0 = worley3(p * f0, f0);
  let w1 = worley3(p * f0 * 2.0, f0 * 2.0);
  let w2 = worley3(p * f0 * 4.0, f0 * 4.0);
  let wfbm = w0 * 0.625 + w1 * 0.25 + w2 * 0.125;
  let pw = remapc(pf, 0.0, 1.0, wfbm, 1.0);
  let g = worley3(p * f0 * 2.0 + 17.0, f0 * 2.0);
  let b = worley3(p * f0 * 4.0 + 31.0, f0 * 4.0);
  let a = worley3(p * f0 * 8.0 + 47.0, f0 * 8.0);
  textureStore(outTex, vec3i(id), vec4f(pw, g, b, a));
}
`,ci=Sa+`
struct P { size: vec4f };
@group(0) @binding(0) var<uniform> U: P;
@group(0) @binding(1) var outTex: texture_storage_3d<rgba8unorm, write>;
@compute @workgroup_size(4, 4, 4)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let n = u32(U.size.x);
  if (id.x >= n || id.y >= n || id.z >= n) { return; }
  let p = (vec3f(id) + 0.5) / f32(n);
  let r = worley3(p * 4.0 + 3.0, 4.0);
  let g = worley3(p * 8.0 + 5.0, 8.0);
  let b = worley3(p * 16.0 + 9.0, 16.0);
  textureStore(outTex, vec3i(id), vec4f(r, g, b, 1.0));
}
`,li=Sa+`
struct P {
  params: vec4f,   // coverage, type, feature scale (m), mode flag (0 volumetric, 1 flat)
  size: vec4f,     // texture size, extent (m), blob count, seed
};
struct Blob { a: vec4f, b: vec4f };   // a = x, z (weather space, m), radius, density; b = mode, type, 0, 0
@group(0) @binding(0) var<uniform> U: P;
@group(0) @binding(1) var<storage, read> blobs: array<Blob>;
@group(0) @binding(2) var outTex: texture_storage_2d<rgba8unorm, write>;
@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let n = u32(U.size.x);
  if (id.x >= n || id.y >= n) { return; }
  let uv = (vec2f(id.xy) + 0.5) / f32(n);
  let extent = U.size.y;
  let xz = (uv - 0.5) * extent;
  // feature-scale periodic noise (period = whole field)
  let cells = max(2.0, round(extent / max(U.params.z, 500.0)));
  let n1 = fbm2(uv * cells + U.size.w, cells, 5);
  let n2 = fbm2(uv * cells * 0.7 + 41.0 + U.size.w, cells * 0.7, 4);
  let cov = U.params.x;
  // value noise fbm sits around 0.5 \xB1 0.15: threshold so that coverage \u2248 covered fraction
  let th = mix(0.74, 0.22, cov);
  var c = saturate((n1 - th) / 0.26);
  c = c * c * (3.0 - 2.0 * c);
  // wider systems grow a denser core: cumulus congestus in the middle, wisps at the rim
  c = saturate(c * (0.85 + 0.3 * cov));
  var volCov = select(c, 0.0, U.params.w > 0.5);
  var flatCov = select(0.0, c, U.params.w > 0.5);
  var ctype = saturate(U.params.y + (n2 - 0.5) * 0.6);
  let count = i32(U.size.z);
  for (var i = 0; i < count; i++) {
    let bl = blobs[i];
    var d = xz - bl.a.xy;
    d -= extent * round(d / extent);
    let r = max(bl.a.z, 50.0);
    let dist = length(d) / r;
    let edgeNoise = 0.75 + 0.5 * fbm2(uv * cells * 3.0 + 7.0, cells * 3.0, 3);
    let shape = smoothstep(1.0, 0.2, dist * edgeNoise);
    let bc = bl.a.w * shape;
    if (bc <= 0.001) { continue; }
    if (bl.b.x > 0.5) { flatCov = max(flatCov, bc); } else { volCov = max(volCov, bc); }
    ctype = mix(ctype, bl.b.y, saturate(bc * 2.0));
  }
  textureStore(outTex, vec2i(id.xy), vec4f(volCov, flatCov, ctype, 1.0));
}
`,on=Sa+`
struct CloudU {
  camPos: vec4f,     // xyz world, w = time (s)
  sunDir: vec4f,     // xyz towards the sun, w = sky luminance scale
  sunL: vec4f,       // rgb sun illuminance at cloud altitude (lux), w = albedo
  layer: vec4f,      // base altitude (m), thickness (m), shape tile (m), detail tile (m)
  params: vec4f,     // extinction (1/m), coverage multiplier, type bias, mode (0 vol, 1 flat)
  wind: vec4f,       // drift x, z (m), detail drift x, z (m)
  weather: vec4f,    // 1/extent, flat altitude (m), flat detail scale (m), flat optical depth
  dome: vec4f,       // dome size (px), map radius, blend alpha, frame
  quality: vec4f,    // steps, light steps, max distance (m), update divisor
  atmo: vec4f,       // rayleigh mult, turbidity, multi-scatter boost, ambient mult
  shadow: vec4f,     // shadow centre x, z, 1/(2\xB7half extent), shadow steps
  misc: vec4f,       // bayer offset x, y, cube size, enabled
};
@group(0) @binding(0) var<uniform> U: CloudU;
@group(0) @binding(1) var baseNoise: texture_3d<f32>;
@group(0) @binding(2) var detailNoise: texture_3d<f32>;
@group(0) @binding(3) var weatherTex: texture_2d<f32>;
@group(0) @binding(4) var sampRepeat: sampler;
@group(0) @binding(5) var skyCube: texture_cube<f32>;
@group(0) @binding(6) var sampClamp: sampler;

const PI: f32 = 3.14159265359;
const RG: f32 = 6360e3;

fn sphereEnter(o: vec3f, d: vec3f, r: f32) -> f32 {
  let b = dot(o, d);
  let c = dot(o, o) - r * r;
  let disc = b * b - c;
  if (disc < 0.0) { return -1.0; }
  return -b - sqrt(disc);
}
fn sphereExit(o: vec3f, d: vec3f, r: f32) -> f32 {
  let b = dot(o, d);
  let c = dot(o, o) - r * r;
  let disc = b * b - c;
  if (disc < 0.0) { return -1.0; }
  return -b + sqrt(disc);
}
fn phaseHG(c: f32, g: f32) -> f32 {
  let g2 = g * g;
  return (1.0 - g2) / (4.0 * PI * pow(max(1.0 + g2 - 2.0 * g * c, 1e-4), 1.5));
}
/// Dual-lobe droplet phase: strong forward peak (silver lining) + mild back-scatter (glory side).
fn phaseCloud(c: f32, g: f32) -> f32 { return mix(phaseHG(c, g), phaseHG(c, -0.25 * g), 0.3); }

fn weatherAt(xz: vec2f) -> vec3f {
  let uv = (xz + U.wind.xy) * U.weather.x + 0.5;
  return textureSampleLevel(weatherTex, sampRepeat, uv, 0.0).rgb;
}
/// Vertical density profile for a cloud type: stratus hug the base, cumulus tower with rounded tops.
fn heightGradient(h: f32, ctype: f32) -> f32 {
  let top = mix(0.28, 1.0, ctype);
  let bottom = smoothstep(0.0, 0.08, h);
  let upper = 1.0 - smoothstep(top * 0.5, top, h);
  // stratus: flat, dense all the way across; cumulus: densest in the lower-middle
  let bulge = mix(1.0, 1.0 - 0.35 * smoothstep(0.2, top, h), ctype);
  return bottom * upper * bulge;
}
/// Cloud density (0..1) at world p with slab height fraction h. cheap = base shape only (no erosion).
fn cloudDensity(p: vec3f, h: f32, cov: f32, ctype: f32, cheap: bool) -> f32 {
  // wind shear: tops lag behind the bases
  let shear = vec3f(h * U.layer.y * 0.18, 0.0, h * U.layer.y * 0.08);
  let pb = (p + vec3f(U.wind.x, 0.0, U.wind.y) + shear) / U.layer.z;
  let b = textureSampleLevel(baseNoise, sampRepeat, pb, 0.0);
  let lowFbm = b.g * 0.625 + b.b * 0.25 + b.a * 0.125;
  var shape = remapc(b.r, lowFbm - 1.0, 1.0, 0.0, 1.0);
  shape *= heightGradient(h, ctype);
  // coverage: thin the shape at the edges of a cloud system
  let c = saturate(cov);
  shape = remapc(shape, 1.0 - c, 1.0, 0.0, 1.0) * c;
  if (cheap || shape <= 0.0) { return shape; }
  let pd = (p + vec3f(U.wind.z, 0.0, U.wind.w)) / U.layer.w;
  let d = textureSampleLevel(detailNoise, sampRepeat, pd, 0.0).rgb;
  let hf = d.r * 0.625 + d.g * 0.25 + d.b * 0.125;
  // wispy at the base, billowy (inverted worley) higher up
  let hfMod = mix(hf, 1.0 - hf, saturate(h * 8.0));
  shape = remapc(shape, hfMod * 0.38, 1.0, 0.0, 1.0);
  return saturate(shape);
}
fn slabHeight(p: vec3f) -> f32 {
  let r = length(p + vec3f(0.0, RG, 0.0)) - RG;
  return (r - U.layer.x) / U.layer.y;
}
/// Optical depth towards the sun from p (light march with growing steps; base shape only).
fn sunOpticalDepth(p: vec3f, cov: f32, ctype: f32) -> f32 {
  let n = i32(U.quality.y);
  let thick = U.layer.y;
  let ls = thick * 0.75 / f32(n);
  var tau = 0.0;
  var t = 0.0;
  for (var i = 0; i < n; i++) {
    let step = ls * (0.6 + 0.8 * f32(i));
    t += step * 0.5;
    let q = p + U.sunDir.xyz * t;
    let h = slabHeight(q);
    if (h < 0.0 || h > 1.0) { t += step * 0.5; continue; }
    let w = weatherAt(q.xz);
    tau += cloudDensity(q, h, w.r * U.params.y, w.b, i > 0) * step;
    t += step * 0.5;
  }
  // distant occlusion by the rest of the slab
  let far = p + U.sunDir.xyz * thick * 2.2;
  let hf = slabHeight(far);
  if (hf > 0.0 && hf < 1.0) { let w = weatherAt(far.xz); tau += cloudDensity(far, hf, w.r * U.params.y, w.b, true) * thick * 0.5; }
  return tau * U.params.x;
}
/// 2D detail for the flat layer (old-style deck).
fn flatDensity(xz: vec2f) -> f32 {
  let w = weatherAt(xz).g;
  if (w <= 0.002) { return 0.0; }
  let s = U.weather.z;
  var p = (xz + U.wind.xy) / s;
  var v = 0.0;
  var a = 0.5;
  var norm = 0.0;
  for (var o = 0; o < 6; o++) {
    v += a * vnoise2(p, 1e6);
    norm += a;
    p = mat2x2f(1.6, 1.2, -1.2, 1.6) * p + vec2f(7.3, -3.1);
    a *= 0.5;
  }
  v /= norm;
  return saturate((v - (1.0 - w)) / max(w * 0.6, 1e-3));
}
`,bi=on+`
@group(0) @binding(7) var domeOut: texture_storage_2d<rgba16float, write>;
@group(0) @binding(8) var domePrev: texture_2d<f32>;

fn ign(p: vec2f, f: f32) -> f32 {
  let q = p + 5.588238 * (f % 64.0);
  return fract(52.9829189 * fract(0.06711056 * q.x + 0.00583715 * q.y));
}
fn dirFromDome(uv: vec2f) -> vec3f {
  let p = (uv - 0.5) * 2.0 * U.dome.y;
  let q = dot(p, p);
  let y = (1.0 - q) / (1.0 + q);
  return normalize(vec3f(p.x * (1.0 + y), y, p.y * (1.0 + y)));
}

/// Old-style 2D deck at the slab middle for the flat weather channel. Returns (L, T).
fn flatLayer(o: vec3f, dir: vec3f, cosA: f32, skyDir: vec3f, skyUp: vec3f) -> vec4f {
  if (dir.y <= 0.004) { return vec4f(0.0, 0.0, 0.0, 1.0); }
  let alt = U.weather.y;
  let t = (alt - o.y) / dir.y;
  if (t <= 0.0) { return vec4f(0.0, 0.0, 0.0, 1.0); }
  let p = o.xz + dir.xz * t;
  let d = flatDensity(p);
  if (d <= 0.001) { return vec4f(0.0, 0.0, 0.0, 1.0); }
  let tau = d * U.weather.w * (1.0 + 2.0 / max(dir.y, 0.08));
  let alpha = 1.0 - exp(-tau);
  let sp = p + U.sunDir.xz / max(U.sunDir.y, 0.15) * U.weather.z * 0.35;
  let selfShadow = exp(-flatDensity(sp) * U.weather.w * 2.5);
  let powder = 1.0 - exp(-tau * 2.0);
  let ph = phaseCloud(cosA, 0.7);
  let sunL = U.sunL.rgb * ((1.0 / PI) * 0.5 * powder * (0.35 + 0.65 * selfShadow) * U.atmo.z + ph * 0.8 * selfShadow);
  let amb = skyUp * U.atmo.w * 0.9;
  let cl = sunL + amb * (0.6 + 0.4 * (1.0 - d));
  let fade = exp(-t / 45000.0);
  let a = alpha * fade;
  return vec4f(mix(skyDir * a, cl * a, fade), 1.0 - a);
}

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let size = u32(U.dome.x);
  let div = u32(U.quality.w);
  let px = id.xy * div + vec2u(U.misc.xy);
  if (px.x >= size || px.y >= size) { return; }
  let uv = (vec2f(px) + 0.5) / f32(size);
  let pm = (uv - 0.5) * 2.0 * U.dome.y;
  if (dot(pm, pm) > U.dome.y * U.dome.y || U.misc.w < 0.5) { textureStore(domeOut, vec2i(px), vec4f(0.0, 0.0, 0.0, 1.0)); return; }
  let dir = dirFromDome(uv);
  let o = U.camPos.xyz;
  let oc = o + vec3f(0.0, RG, 0.0);          // planet-centred
  let rIn = RG + U.layer.x;
  let rOut = rIn + U.layer.y;
  let skyDir = textureSampleLevel(skyCube, sampClamp, dir, 1.0).rgb * U.sunDir.w;
  let skyUp = textureSampleLevel(skyCube, sampClamp, vec3f(0.0, 1.0, 0.0), 4.0).rgb * U.sunDir.w;
  let skyHoriz = textureSampleLevel(skyCube, sampClamp, normalize(vec3f(dir.x, 0.08, dir.z) + vec3f(1e-3, 0.0, 0.0)), 3.0).rgb * U.sunDir.w;
  let groundL = textureSampleLevel(skyCube, sampClamp, vec3f(0.0, -1.0, 0.0), 4.0).rgb * U.sunDir.w;
  let cosA = dot(dir, U.sunDir.xyz);
  var L = vec3f(0.0);
  var T = 1.0;
  // ground hit: no cloud
  let tGround = sphereEnter(oc, dir, RG);
  let hitsGround = tGround > 0.0;
  var tStart = -1.0;
  var tEnd = -1.0;
  let rc = length(oc);
  if (rc < rIn) {
    tStart = sphereExit(oc, dir, rIn);
    tEnd = sphereExit(oc, dir, rOut);
  } else if (rc < rOut) {
    tStart = 0.0;
    let dIn = sphereEnter(oc, dir, rIn);
    tEnd = select(sphereExit(oc, dir, rOut), dIn, dIn > 0.0);
  } else {
    tStart = sphereEnter(oc, dir, rOut);
    let dIn = sphereEnter(oc, dir, rIn);
    tEnd = select(sphereExit(oc, dir, rOut), dIn, dIn > 0.0);
  }
  var domeL = vec3f(0.0);
  var domeT = 1.0;
  // the volumetric channel is always marched: in flat mode it only holds painted volumetric clouds
  if (!hitsGround && tStart >= 0.0 && tEnd > tStart) {
    let maxDist = U.quality.z;
    tEnd = min(tEnd, tStart + maxDist);
    let steps = i32(U.quality.x);
    let pathLen = tEnd - tStart;
    let jitter = ign(vec2f(px), U.dome.w);
    let ext = U.params.x;
    let albedo = U.sunL.w;
    var tw = 0.0;
    var wsum = 0.0;
    var zeroRun = 0;
    var prevT = tStart;
    for (var i = 0; i < steps; i++) {
      let x0 = (f32(i) + jitter) / f32(steps);
      let x1 = (f32(i) + 1.0 + jitter) / f32(steps);
      let ta = tStart + pathLen * pow(x0, 1.35);
      let tb = tStart + pathLen * pow(min(x1, 1.0), 1.35);
      let dt = max(tb - ta, 1.0);
      let t = ta;
      let p = o + dir * t;
      let h = slabHeight(p);
      if (h < 0.0 || h > 1.0) { continue; }
      let w = weatherAt(p.xz);
      let cov = w.r * U.params.y;
      if (cov <= 0.01) { continue; }
      let dens = cloudDensity(p, h, cov, w.b, false);
      if (dens <= 0.0005) { continue; }
      let sigma = dens * ext;
      let tauSun = sunOpticalDepth(p, cov, w.b);
      // multiple-scattering octaves (Wrenninge): each octave softer, less attenuated, more isotropic
      // (the user boost stands in for the diffuse higher orders only: it must not scale the forward peak)
      var scatt = 0.0;
      var a = 1.0; var b = 1.0; var g = 0.78;
      for (var n = 0; n < 3; n++) {
        scatt += a * exp(-b * tauSun) * phaseCloud(cosA, g) * select(U.atmo.z, 1.0, n == 0);
        a *= 0.5; b *= 0.5; g *= 0.6;
      }
      // powder: multiple-scattering darkening of crevices on the lit side (sun behind the viewer)
      let powder = mix(1.0, 1.0 - 0.6 * exp(-2.0 * sigma * dt * 6.0 - tauSun * 0.5), saturate(-cosA) * 0.7 + 0.15);
      let sun = U.sunL.rgb * scatt * powder;
      // ambient: sky from above (tops), horizon sky + lit ground from below (bases), shadowed by cloud above
      let occUp = exp(-tauSun * 0.15 - (1.0 - h) * 1.2 * dens);
      let amb = (skyUp * mix(0.35, 1.0, h) * occUp + (skyHoriz * 0.5 + groundL * 0.55) * mix(0.75, 0.2, h) * exp(-dens * h * 1.5)) * U.atmo.w;
      let S = (sun + amb) * sigma * albedo;
      let Tstep = exp(-sigma * dt);
      let Sint = (S - S * Tstep) / sigma;
      L += T * Sint;
      let contrib = T * (1.0 - Tstep);
      tw += t * contrib; wsum += contrib;
      T *= Tstep;
      if (T < 0.008) { break; }
    }
    // aerial perspective: the air between us and the cloud both dims it and adds haze in its place
    if (wsum > 0.0) {
      let tMean = tw / wsum;
      let od = (vec3f(5.802e-6, 13.558e-6, 33.1e-6) * U.atmo.x * 0.72 + vec3f(4.4e-6 * U.atmo.y * 0.4)) * tMean;
      let Ta = exp(-od);
      let blocked = 1.0 - T;
      domeL = L * Ta + skyDir * blocked * (1.0 - Ta);
      domeT = T;
    }
  }
  // flat deck (global flat mode or flat blobs) composited behind the volumes
  let fl = flatLayer(o, dir, cosA, skyDir, skyUp);
  if (fl.a < 1.0 && !hitsGround) {
    domeL += domeT * fl.rgb;
    domeT *= fl.a;
  }
  // rgba16float: keep below half-float range (a thin cloud in front of the sun is blinding anyway)
  var cur = vec4f(min(domeL, vec3f(6.0e4)), domeT);
  let prev = textureLoad(domePrev, vec2i(px), 0);
  let alpha = U.dome.z;
  let outv = mix(prev, cur, alpha);
  textureStore(domeOut, vec2i(px), outv);
}
`,di=on+`
@group(0) @binding(7) var shadowOut: texture_storage_2d<rgba8unorm, write>;
@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let size = u32(U.misc.z);
  if (id.x >= size || id.y >= size) { return; }
  if (U.misc.w < 0.5 || U.sunDir.y <= 0.01) { textureStore(shadowOut, vec2i(id.xy), vec4f(1.0)); return; }
  let uv = (vec2f(id.xy) + 0.5) / f32(size);
  let half = 0.5 / U.shadow.z;
  let xz = U.shadow.xy + (uv - 0.5) * 2.0 * half;
  let s = U.sunDir.xyz;
  let p0 = vec3f(xz.x, U.layer.x, xz.y);
  let n = i32(U.shadow.w);
  let len = U.layer.y / max(s.y, 0.25);
  let dl = len / f32(n);
  var tau = 0.0;
  for (var i = 0; i < n; i++) {
    let p = p0 + s * ((f32(i) + 0.5) * dl);
    let h = slabHeight(p);
    if (h < 0.0 || h > 1.0) { continue; }
    let w = weatherAt(p.xz);
    let cov = w.r * U.params.y;
    if (cov <= 0.01) { continue; }
    tau += cloudDensity(p, h, cov, w.b, i % 2 == 1) * dl;
  }
  tau *= U.params.x;
  // flat deck
  let tf = (U.weather.y - U.layer.x) / max(s.y, 0.05);
  let fp = xz + s.xz * tf;
  tau += flatDensity(fp) * U.weather.w * 3.0;
  textureStore(shadowOut, vec2i(id.xy), vec4f(exp(-tau), 0.0, 0.0, 1.0));
}
`,ui=`
struct P { params: vec4f };  // cube size, dome radius, 0, 0
@group(0) @binding(0) var<uniform> U: P;
@group(0) @binding(1) var skyCube: texture_cube<f32>;
@group(0) @binding(2) var dome: texture_2d<f32>;
@group(0) @binding(3) var samp: sampler;
@group(0) @binding(4) var outCube: texture_storage_2d_array<rgba16float, write>;
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
@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let size = u32(U.params.x);
  if (id.x >= size || id.y >= size) { return; }
  let uv = (vec2f(id.xy) + 0.5) / f32(size);
  let dir = faceDir(id.z, uv);
  var L = textureSampleLevel(skyCube, samp, dir, 0.0).rgb;
  let p = dir.xz / (1.0 + max(dir.y, -0.3));
  if (dot(p, p) < U.params.y * U.params.y) {
    let c = textureSampleLevel(dome, samp, p / U.params.y * 0.5 + 0.5, 0.0);
    L = L * c.a + c.rgb;
  }
  textureStore(outCube, vec2i(id.xy), i32(id.z), vec4f(min(L, vec3f(6.0e4)), 1.0));
}
`,Aa=class{settings={...ni};dome;shadow;resourceVersion=0;domeRadius=ka;dev;tex;skyCube;preset;presetName="";baseNoise;detailNoise;weather;domeWork;ubuf;blobBuf;weatherU;compU;pipeBase;pipeDetail;pipeWeather;pipeDome;pipeShadow;pipeComposite;bgDome=null;bgShadow=null;bgWeather;sampRepeat;sampClamp;blobs=[];blobId=1;blobsDirty=!0;weatherKey="";domeKey="";frame=0;sinceComposite=1e9;drift=[0,0];lastCam=[0,100,0];software;u=new Float32Array(48);constructor(e,t,r){this.dev=e,this.tex=t,this.skyCube=r,this.software=ii(e.adapter);let a=e.device,s=(u,m)=>a.createComputePipeline({label:m,layout:"auto",compute:{module:e.shader(u,m),entryPoint:"main"}});this.pipeBase=s(oi,"clouds.noise.base"),this.pipeDetail=s(ci,"clouds.noise.detail"),this.pipeWeather=s(li,"clouds.weather");let i=GPUShaderStage.COMPUTE,o=[{binding:0,visibility:i,buffer:{type:"uniform"}},{binding:1,visibility:i,texture:{viewDimension:"3d"}},{binding:2,visibility:i,texture:{viewDimension:"3d"}},{binding:3,visibility:i,texture:{}},{binding:4,visibility:i,sampler:{}},{binding:5,visibility:i,texture:{viewDimension:"cube"}},{binding:6,visibility:i,sampler:{}}],c=a.createBindGroupLayout({label:"clouds.dome",entries:[...o,{binding:7,visibility:i,storageTexture:{format:"rgba16float",access:"write-only"}},{binding:8,visibility:i,texture:{}}]}),b=a.createBindGroupLayout({label:"clouds.shadow",entries:[...o,{binding:7,visibility:i,storageTexture:{format:"rgba8unorm",access:"write-only"}}]}),l=(u,m,d)=>a.createComputePipeline({label:m,layout:a.createPipelineLayout({bindGroupLayouts:[d]}),compute:{module:e.shader(u,m),entryPoint:"main"}});this.pipeDome=l(bi,"clouds.dome",c),this.pipeShadow=l(di,"clouds.shadow",b),this.pipeComposite=s(ui,"clouds.composite"),this.ubuf=e.createBuffer(192,GPUBufferUsage.UNIFORM,"clouds.u"),this.weatherU=e.createBuffer(32,GPUBufferUsage.UNIFORM,"clouds.weather.u"),this.compU=e.createBuffer(16,GPUBufferUsage.UNIFORM,"clouds.composite.u"),this.blobBuf=e.createBuffer(vr*32,GPUBufferUsage.STORAGE,"clouds.blobs"),this.sampRepeat=a.createSampler({magFilter:"linear",minFilter:"linear",addressModeU:"repeat",addressModeV:"repeat",addressModeW:"repeat"}),this.sampClamp=a.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",addressModeW:"clamp-to-edge"}),this.weather=a.createTexture({size:[Yt,Yt],format:"rgba8unorm",usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING,label:"clouds.weather"}),this.bgWeather=a.createBindGroup({layout:this.pipeWeather.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.weatherU}},{binding:1,resource:{buffer:this.blobBuf}},{binding:2,resource:this.weather.createView()}]}),this.ensureResources()}get qualityPreset(){let e=this.settings.quality;return e!=="auto"?e:this.software?"low":"high"}get driftXZ(){return[this.drift[0],this.drift[1]]}addCloud(e){let t={id:this.blobId++,x:e.position[0]+this.drift[0],z:e.position[e.position.length>=3?2:1]+this.drift[1],size:e.size??900,density:e.density??1,mode:e.mode??this.settings.mode,type:e.type??this.settings.type};this.blobs.length>=vr&&this.blobs.shift(),this.blobs.push(t),this.blobsDirty=!0;let r=this;return{id:t.id,set(a){a.position&&(t.x=a.position[0]+r.drift[0],t.z=a.position[a.position.length>=3?2:1]+r.drift[1]),a.size!==void 0&&(t.size=a.size),a.density!==void 0&&(t.density=a.density),a.mode&&(t.mode=a.mode),a.type!==void 0&&(t.type=a.type),r.blobsDirty=!0},remove(){let a=r.blobs.indexOf(t);a>=0&&(r.blobs.splice(a,1),r.blobsDirty=!0)}}}clearClouds(){this.blobs.length=0,this.blobsDirty=!0}get cloudCount(){return this.blobs.length}ensureResources(){let e=this.qualityPreset;if(e===this.presetName)return;this.presetName=e;let t=this.preset=si[e],r=this.dev.device;this.baseNoise?.destroy(),this.detailNoise?.destroy(),this.dome?.destroy(),this.domeWork?.destroy(),this.shadow?.destroy();let a=(i,o)=>r.createTexture({size:[i,i,i],dimension:"3d",format:"rgba8unorm",usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING,label:o});this.baseNoise=a(t.baseNoise,"clouds.noise.base"),this.detailNoise=a(t.detailNoise,"clouds.noise.detail"),this.dome=r.createTexture({size:[t.dome,t.dome],format:"rgba16float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:"clouds.dome"}),this.domeWork=r.createTexture({size:[t.dome,t.dome],format:"rgba16float",usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.COPY_SRC,label:"clouds.dome.work"}),this.shadow=r.createTexture({size:[t.shadow,t.shadow],format:"rgba8unorm",usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING,label:"clouds.shadow"}),this.generateNoise();let s=(i,o)=>r.createBindGroup({layout:i.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.ubuf}},{binding:1,resource:this.baseNoise.createView()},{binding:2,resource:this.detailNoise.createView()},{binding:3,resource:this.weather.createView()},{binding:4,resource:this.sampRepeat},{binding:5,resource:this.skyCube.createView({dimension:"cube"})},{binding:6,resource:this.sampClamp},...o]});this.bgDome=s(this.pipeDome,[{binding:7,resource:this.domeWork.createView()},{binding:8,resource:this.dome.createView()}]),this.bgShadow=s(this.pipeShadow,[{binding:7,resource:this.shadow.createView()}]),this.domeKey="",this.resourceVersion++}generateNoise(){let e=this.dev.device,t=this.preset,r=e.createCommandEncoder({label:"clouds.noise"}),a=r.beginComputePass(),s=(i,o,c,b,l)=>{let u=this.dev.createBuffer(16,GPUBufferUsage.UNIFORM,l,new Float32Array([c,b,0,0]));a.setPipeline(i),a.setBindGroup(0,e.createBindGroup({layout:i.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:u}},{binding:1,resource:o.createView()}]}));let m=Math.ceil(c/4);a.dispatchWorkgroups(m,m,m)};s(this.pipeBase,this.baseNoise,t.baseNoise,t.baseNoise/128,"clouds.noise.base.u"),s(this.pipeDetail,this.detailNoise,t.detailNoise,1,"clouds.noise.detail.u"),a.end(),e.queue.submit([r.finish()])}updateWeather(e){let t=this.settings,r=`${t.coverage}|${t.type}|${t.featureScale}|${t.mode}|${this.blobs.length}`;if(!this.blobsDirty&&r===this.weatherKey)return!1;this.weatherKey=r,this.blobsDirty=!1;let a=this.dev.device,s=new Float32Array(vr*8);this.blobs.forEach((o,c)=>s.set([o.x,o.z,o.size,o.density,o.mode==="flat"?1:0,o.type,0,0],c*8)),a.queue.writeBuffer(this.blobBuf,0,s),a.queue.writeBuffer(this.weatherU,0,new Float32Array([t.coverage,t.type,t.featureScale,t.mode==="flat"?1:0,Yt,Qt,this.blobs.length,7]));let i=e.beginComputePass({label:"clouds.weather"});return i.setPipeline(this.pipeWeather),i.setBindGroup(0,this.bgWeather),i.dispatchWorkgroups(Math.ceil(Yt/8),Math.ceil(Yt/8)),i.end(),!0}frameParams(){let e=this.settings,[t,r]=this.shadowCentre(this.lastCam,this.lastSun),a=1-.55*e.coverage*Math.min(1,e.density/25);return[t,r,1/(2*sn),e.enabled?1:0,a,e.altitude,e.shadowStrength,ka]}lastSun=[0,1,0];shadowCentre(e,t){let r=Math.max(t[1],.05),a=(this.settings.altitude-e[1])/r;return[e[0]+t[0]*a,e[2]+t[2]*a]}update(e,t){let r=this.settings;this.ensureResources();let a=this.preset,s=this.dev.device;this.lastCam=[t.camPos[0],t.camPos[1],t.camPos[2]],this.lastSun=[t.sunDir[0],t.sunDir[1],t.sunDir[2]],this.drift[0]+=t.windAloft[0]*t.dt,this.drift[1]+=t.windAloft[1]*t.dt;for(let y=0;y<2;y++)this.drift[y]=(this.drift[y]%Qt+Qt)%Qt;let i=this.updateWeather(e),o=JSON.stringify([r.enabled,r.mode,r.density,r.altitude,r.thickness,r.shapeScale,r.detailScale,r.shadowStrength,r.ambient,r.multiScatter,r.albedo,t.skyKey,t.rayleigh,t.turbidity])+(i?`|${this.frame}`:""),c=o!==this.domeKey;this.domeKey=o;let b=c?1:a.updateDiv,l=this.frame%(b*b),[u,m]=b===1?[0,0]:b===2?mi[l]:hi[l],[d,v]=this.shadowCentre(t.camPos,t.sunDir),p=this.u,M=r.altitude+r.thickness*.5;p.set([t.camPos[0],t.camPos[1],t.camPos[2],this.frame/60],0),p.set([t.sunDir[0],t.sunDir[1],t.sunDir[2],1],4),p.set([t.sunRGB[0],t.sunRGB[1],t.sunRGB[2],r.albedo],8),p.set([r.altitude,r.thickness,r.shapeScale*(a.baseNoise/128),r.detailScale],12),p.set([r.density/1e3,1,r.type,r.mode==="flat"?1:0],16),p.set([this.drift[0],this.drift[1],this.drift[0]*1.25+this.frame*.15,this.drift[1]*1.25+this.frame*.07],20),p.set([1/Qt,M,r.shapeScale*.5,r.density*r.thickness*.5/1e3*.12],24),p.set([a.dome,ka,c?1:.55,this.frame],28),p.set([a.steps,a.lightSteps,6e4,b],32),p.set([t.rayleigh,t.turbidity,r.multiScatter,r.ambient],36),p.set([d,v,1/(2*sn),a.shadowSteps],40),p.set([u,m,a.shadow,r.enabled?1:0],44),s.queue.writeBuffer(this.ubuf,0,p);let g=e.beginComputePass({label:"clouds"});g.setPipeline(this.pipeDome),g.setBindGroup(0,this.bgDome);let w=Math.ceil(a.dome/b/8);g.dispatchWorkgroups(w,w),g.setPipeline(this.pipeShadow),g.setBindGroup(0,this.bgShadow),g.dispatchWorkgroups(Math.ceil(a.shadow/8),Math.ceil(a.shadow/8)),g.end(),e.copyTextureToTexture({texture:this.domeWork},{texture:this.dome},[a.dome,a.dome]),this.frame++,this.sinceComposite++;let x=c||this.sinceComposite>300;return x&&(this.sinceComposite=0),x}compositeEnv(e,t){let r=this.dev.device;r.queue.writeBuffer(this.compU,0,new Float32Array([xr,ka,0,0]));let a=e.beginComputePass({label:"clouds.composite"});a.setPipeline(this.pipeComposite),a.setBindGroup(0,r.createBindGroup({layout:this.pipeComposite.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.compU}},{binding:1,resource:this.skyCube.createView({dimension:"cube"})},{binding:2,resource:this.dome.createView()},{binding:3,resource:this.sampClamp},{binding:4,resource:t.createView({dimension:"2d-array",baseMipLevel:0,mipLevelCount:1})}]})),a.dispatchWorkgroups(Math.ceil(xr/8),Math.ceil(xr/8),6),a.end()}};var mi=[[0,0],[1,1],[1,0],[0,1]],hi=[[0,0],[2,2],[2,0],[0,2],[1,1],[3,3],[3,1],[1,3],[1,0],[3,2],[3,0],[1,2],[0,1],[2,3],[2,1],[0,3]];var fi={sunElevation:38,sunAzimuth:130,sunIlluminance:128e3,sunAngularDiameter:.53,turbidity:1,rayleigh:1,ozone:1,mieG:.8,groundAlbedo:.18,altitude:100,multiScatter:1.25},Pa=636e4,pi=646e4,gi=[5802e-9,13558e-9,331e-7];var yi=44e-7,vi=[65e-8,1881e-9,85e-9],xi=8e3,wi=1200;function ln(n){let e=n.sunElevation*Math.PI/180,t=n.sunAzimuth*Math.PI/180;return[Math.cos(e)*Math.sin(t),Math.sin(e),-Math.cos(e)*Math.cos(t)]}function Mi(n,e,t,r){let a=n*e,s=n*n-r*r,i=a*a-s;return i<0?-1:-a+Math.sqrt(i)}function cn(n){let e=ln(n),t=Pa+n.altitude;if((()=>{let l=t*e[1],u=t*t-Pa*Pa,m=l*l-u;if(m<0)return-1;let d=-l-Math.sqrt(m);return d>0?d:-1})()>0)return[0,0,0];let a=Mi(t,e[1],0,pi),s=64,i=a/s,o=0,c=0,b=0;for(let l=0;l<s;l++){let u=(l+.5)*i,m=e[0]*u,d=t+e[1]*u,v=e[2]*u,p=Math.hypot(m,d,v)-Pa;o+=Math.exp(-p/xi)*i,c+=Math.exp(-p/wi)*i,b+=Math.max(0,1-Math.abs(p-25e3)/15e3)*i}return[0,1,2].map(l=>Math.exp(-(gi[l]*n.rayleigh*o+yi*n.turbidity*c+vi[l]*n.ozone*b)))}var ki=`
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
`,Ta=class{constructor(e,t,r=128){this.dev=e;this.tex=t;this.size=r,this.pipeline=e.device.createComputePipeline({layout:"auto",compute:{module:e.shader(ki,"sky"),entryPoint:"main"}}),this.ubuf=e.createBuffer(64,GPUBufferUsage.UNIFORM,"sky.u");let a=s=>({size:[r,r,6],format:"rgba16float",mipLevelCount:Ze(r),usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.RENDER_ATTACHMENT,label:s});this.cube=e.device.createTexture(a("sky.cube")),this.envCube=e.device.createTexture(a("sky.env")),this.bg=e.device.createBindGroup({layout:this.pipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.ubuf}},{binding:1,resource:this.cube.createView({dimension:"2d-array",baseMipLevel:0,mipLevelCount:1})}]}),this.clouds=new Aa(e,t,this.cube)}settings={...fi};cube;envCube;clouds;size;pipeline;ubuf;bg;version=0;envVersion=0;lastKey="";lastView={camPos:[0,100,0],dt:0};get sunDir(){return ln(this.settings)}sunIlluminanceRGB(){let e=cn(this.settings),t=this.settings.sunIlluminance;return[e[0]*t,e[1]*t,e[2]*t]}sunIlluminanceAt(e){let t=cn({...this.settings,altitude:e}),r=this.settings.sunIlluminance;return[t[0]*r,t[1]*r,t[2]*r]}addCloud(e){return this.clouds.addCloud(e)}get atmosphereKey(){let e=this.settings;return[e.sunElevation,e.sunAzimuth,e.sunIlluminance,e.turbidity,e.rayleigh,e.ozone,e.mieG,e.altitude].join("|")}update(e,t){t&&(this.lastView=t);let r=this.lastView,a=e??this.dev.device.createCommandEncoder({label:"sky"}),s=JSON.stringify(this.settings),i=!1;s!==this.lastKey&&(this.lastKey=s,this.bakeAtmosphere(a),i=!0);let o=this.settings,c=this.clouds.settings,b=this.clouds.update(a,{camPos:r.camPos,dt:r.dt,sunDir:this.sunDir,sunRGB:this.sunIlluminanceAt(c.altitude+c.thickness*.5),rayleigh:o.rayleigh,turbidity:o.turbidity,skyKey:this.atmosphereKey,windAloft:r.windAloft??[0,0]}),l=!1;return(i||b||this.envVersion===0)&&(this.clouds.compositeEnv(a,this.envCube),this.tex.mipgen.generate(this.envCube,"color",a),this.envVersion++,l=!0),e||this.dev.device.queue.submit([a.finish()]),l}bakeAtmosphere(e){let t=this.settings,r=this.sunDir,a=this.sunIlluminanceRGB(),s=Math.max(0,r[1]),i=.12*t.sunIlluminance*Math.max(.02,Math.sin(Math.max(r[1],.02)))*(.8+.2*t.turbidity),o=[a[0]*s+i*.85,a[1]*s+i*.95,a[2]*s+i*1.15],c=new Float32Array([r[0],r[1],r[2],t.sunIlluminance,t.rayleigh,t.turbidity,t.ozone,t.mieG,t.groundAlbedo,t.altitude,t.multiScatter,this.size,o[0],o[1],o[2],0]);this.dev.device.queue.writeBuffer(this.ubuf,0,c);let b=e.beginComputePass({label:"sky bake"});b.setPipeline(this.pipeline),b.setBindGroup(0,this.bg),b.dispatchWorkgroups(Math.ceil(this.size/8),Math.ceil(this.size/8),6),b.end(),this.tex.mipgen.generate(this.cube,"color",e),this.version++}};var Ai={speed:1.7,direction:111,gustiness:.35,gustFrequency:.12,turbulence:.25,foliageBend:.045,aloftFactor:2.5,aloftVeer:25};function Zt(n,e){let t=Math.floor(n),r=n-t,a=c=>{let b=Math.sin((c+e*131.7)*12.9898)*43758.5453;return(b-Math.floor(b))*2-1},s=r*r*r*(r*(r*6-15)+10),i=a(t)*r,o=a(t+1)*(r-1);return(i+(o-i)*s)*2}function bn(n,e){return(Zt(n,e)*.5+Zt(n*2.13+7.7,e+1)*.3+Zt(n*4.7+3.1,e+2)*.2)/.78}var za=class{settings={...Ai};vector=h.create();direction=h.create(0,0,-1);gustFactor=1;onGust=[];onSettingsChanged=null;time=0;lastKey="";inGust=!1;constructor(e={}){Object.assign(this.settings,e),this.update(0)}get speed(){return h.length(this.vector)}set(e){let{direction:t,...r}=e;if(Object.assign(this.settings,r),typeof t=="number")this.settings.direction=t;else if(t){let a=t[0],s=t.length>=3?t[2]:t[1];this.settings.direction=Math.atan2(a,-s)*180/Math.PI,e.speed===void 0&&(this.settings.speed=Math.hypot(a,s))}return this.update(0),this}gust(e){let t=this.settings,r=bn(e*t.gustFrequency,3),a=Math.pow(Math.max(0,r-.15)/.85,1.6);return Math.max(.15,1+t.gustiness*(.45*r+1.25*a))}heading(e){let t=this.settings;return t.direction+t.gustiness*22*bn(e*t.gustFrequency*.6+50,11)}aloft(e,t=h.create()){let r=this.settings,a=Math.min(1,Math.max(0,e)/1500)**.4,s=r.speed*(1+(r.aloftFactor-1)*a),i=(r.direction+r.aloftVeer*a)*Math.PI/180;return h.set(t,Math.sin(i)*s,0,-Math.cos(i)*s)}update(e){this.time+=e;let t=this.settings,r=this.time,a=this.gust(r),s=this.heading(r)*Math.PI/180,i=t.speed*a,o=t.turbulence*t.speed*.18,c=Zt(r*3.1,21)*o,b=Zt(r*2.7+9,22)*o;h.set(this.direction,Math.sin(s),0,-Math.cos(s)),h.set(this.vector,this.direction[0]*i+c,0,this.direction[2]*i+b),this.gustFactor=a;let l=Math.min(1,Math.max(0,(a-1)/Math.max(.001,1.7*t.gustiness)));if(!this.inGust&&l>.3){this.inGust=!0;for(let m of this.onGust)m(l,this.vector)}else this.inGust&&l<.12&&(this.inGust=!1);let u=`${t.speed}|${t.gustiness}|${t.gustFrequency}|${t.turbulence}`;u!==this.lastKey&&(this.lastKey=u,this.onSettingsChanged?.(t))}};var wr=`
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
`,Si=wr+`
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
`,Pi=wr+`
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
`,Ti=wr+`
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
`,Ra=class{constructor(e,t=128,r=96){this.dev=e;this.size=t;let a=e.device;this.mips=Math.min(Ze(t),6),this.specular=a.createTexture({size:[t,t,6],format:"rgba16float",mipLevelCount:this.mips,usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING,label:"ibl.specular"}),this.sh=e.createBuffer(144,GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC,"ibl.sh"),this.brdfLut=a.createTexture({size:[128,128],format:"rgba16float",usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING,label:"brdf.lut"}),this.sampler=a.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"linear"}),this.prefilter=a.createComputePipeline({layout:"auto",compute:{module:e.shader(Si,"ibl-prefilter"),entryPoint:"main"}}),this.shPipe=a.createComputePipeline({layout:"auto",compute:{module:e.shader(Pi,"ibl-sh"),entryPoint:"main"}});for(let c=0;c<this.mips;c++){let b=c/(this.mips-1),l=Math.max(1,t>>c);this.uniforms.push(e.createBuffer(16,GPUBufferUsage.UNIFORM,`ibl.u${c}`,new Float32Array([b,l,t,c===0?1:r])))}let s=a.createComputePipeline({layout:"auto",compute:{module:e.shader(Ti,"dfg"),entryPoint:"main"}}),i=a.createCommandEncoder({label:"dfg"}),o=i.beginComputePass();o.setPipeline(s),o.setBindGroup(0,a.createBindGroup({layout:s.getBindGroupLayout(0),entries:[{binding:0,resource:this.brdfLut.createView()}]})),o.dispatchWorkgroups(16,16),o.end(),a.queue.submit([i.finish()])}specular;sh;brdfLut;mips;prefilter;shPipe;sampler;uniforms=[];update(e,t){let r=this.dev.device,a=e.createView({dimension:"cube"}),s=t.beginComputePass({label:"ibl"});s.setPipeline(this.prefilter);for(let i=0;i<this.mips;i++){let o=Math.max(1,this.size>>i);s.setBindGroup(0,r.createBindGroup({layout:this.prefilter.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniforms[i]}},{binding:1,resource:a},{binding:2,resource:this.sampler},{binding:3,resource:this.specular.createView({dimension:"2d-array",baseMipLevel:i,mipLevelCount:1})}]})),s.dispatchWorkgroups(Math.ceil(o/8),Math.ceil(o/8),6)}s.setPipeline(this.shPipe),s.setBindGroup(0,r.createBindGroup({layout:this.shPipe.getBindGroupLayout(0),entries:[{binding:0,resource:a},{binding:1,resource:this.sampler},{binding:2,resource:{buffer:this.sh}}]})),s.dispatchWorkgroups(1),s.end()}};var dn={enabled:!0,cascades:4,resolution:2048,distance:160,splitLambda:.82,casterExtent:120,constantBias:8e-5,slopeBias:1.6,normalBias:1.4,maxPenumbraTexels:14,blockerSamples:12,pcfSamples:20,blendFraction:.12},$t=h.create();function un(n,e,t,r){let a=Math.max(1,Math.min(4,r.cascades)),s=Math.max(n.near,.05),i=r.distance,o=[];for(let g=1;g<=a;g++){let w=g/a,x=s*Math.pow(i/s,w),y=s+(i-s)*w;o.push(r.splitLambda*x+(1-r.splitLambda)*y)}let c=Math.tan(n.fovY/2),b=c*e,l={viewProj:[],splits:o,texelWorld:[],depthRange:[]},u=n.forward(),m=n.up(),d=n.right(),v=h.normalize(h.create(),t),p=Math.abs(v[1])>.99?h.create(0,0,1):h.create(0,1,0),M=s;for(let g=0;g<a;g++){let w=M,x=o[g];M=x;let y=b*b+c*c,k=.5*(w+x)*(1+y);k=Math.min(k,x);let f=Math.hypot(k-w,w*Math.sqrt(y)),A=Math.hypot(x-k,x*Math.sqrt(y)),S=Math.max(f,A)*1.02,P=h.scaleAndAdd(h.create(),n.position,u,k),T=r.resolution,R=2*S/T,L=O.lookAt(O.create(),v,[0,0,0],p);h.transformMat4($t,P,L);let z=Math.round($t[0]/R)*R,j=Math.round($t[1]/R)*R,I=-$t[2]-S-r.casterExtent,F=-$t[2]+S,N=F-I,G=O.orthoZO(O.create(),z-S,z+S,j-S,j+S,I,F),H=O.multiply(O.create(),G,L);l.viewProj.push(H),l.texelWorld.push(R),l.depthRange.push(N)}return l}var zi=0,Me=class{id=++zi;mesh;material;transform=O.create();prevTransform=O.create();visible=!0;castShadow=!0;viewmodel=!1;joints=null;_skin=null;instances=null;instanceCount=0;instancesDirty=!1;_inst=null;instBounds=null;worldBounds=Qe.create();first=!0;userData=null;constructor(e,t,r){this.mesh=e,this.material=t,r&&(O.copy(this.transform,r),O.copy(this.prevTransform,r))}setTransform(e){O.copy(this.transform,e)}setInstances(e,t=e.length/16){this.instances=e,this.instanceCount=t,this.instancesDirty=!0;let r=Qe.create(),a=Qe.create();for(let s=0;s<t;s++){Qe.transform(a,this.mesh.bounds,e.subarray(s*16,s*16+16));for(let i=0;i<3;i++)r.min[i]=Math.min(r.min[i],a.min[i]),r.max[i]=Math.max(r.max[i],a.max[i])}this.instBounds=r}_endFrame(){O.copy(this.prevTransform,this.transform),this.first=!1}_beginFrame(){this.first&&O.copy(this.prevTransform,this.transform),Qe.transform(this.worldBounds,this.instances&&this.instBounds?this.instBounds:this.mesh.bounds,this.transform)}resetHistory(){this.first=!0}};var La=class{position=h.create(0,1.7,0);rotation=K.create();fovY=70*st;viewmodelFovY=55*st;near=.04;aperture=8;shutter=1/250;iso=100;view=O.create();world=O.create();updateMatrices(){O.fromRotationTranslation(this.world,this.rotation,this.position),O.invert(this.view,this.world)}forward(e=h.create()){return h.transformQuat(e,[0,0,-1],this.rotation)}up(e=h.create()){return h.transformQuat(e,[0,1,0],this.rotation)}right(e=h.create()){return h.transformQuat(e,[1,0,0],this.rotation)}setFocalLength(e,t=24){this.fovY=2*Math.atan(t/(2*e))}},Ia=class{objects=new Set;lights=new Set;add(e){return this.objects.add(e),e}remove(e){this.objects.delete(e)}addLight(e){return this.lights.add(e),e}removeLight(e){this.lights.delete(e)}};var Tt=`
const PI: f32 = 3.14159265359;
const INV_PI: f32 = 0.31830988618;
const HALF_MAX: f32 = 60000.0;
`,zt=`
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
  cloud: vec4f,                   // 1312 cloud shadow map centre x, z (m, slab-base plane), 1/(2\xB7half extent), clouds enabled
  cloud2: vec4f,                  // 1328 shadow edge fallback transmittance, cloud base altitude (m), shadow strength, dome map radius
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
@group(0) @binding(15) var cloudShadowTex: texture_2d<f32>;
@group(0) @binding(16) var cloudDomeTex: texture_2d<f32>;
`,yt=`
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
`,ea=`
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
`,ja=`
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
`,ta=`
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
`,Ga=`
/// Fraction of direct sunlight reaching a surface point through the clouds (0..1).
fn cloudShadow(worldPos: vec3f) -> f32 {
  if (frame.cloud.w < 0.5 || frame.sunDir.y <= 0.01) { return 1.0; }
  let t = (frame.cloud2.y - worldPos.y) / frame.sunDir.y;
  let p = worldPos.xz + frame.sunDir.xz * t;
  let uv = (p - frame.cloud.xy) * frame.cloud.z + 0.5;
  let T = textureSampleLevel(cloudShadowTex, linearClamp, uv, 0.0).r;
  // outside the map: fall back to the average transmittance of the deck
  let edge = 1.0 - smoothstep(0.42, 0.5, max(abs(uv.x - 0.5), abs(uv.y - 0.5)));
  let Tm = mix(frame.cloud2.x, T, edge);
  return 1.0 - frame.cloud2.z * (1.0 - Tm);
}
/// Paraboloid dome coordinates for a view direction (upper hemisphere + a little below the horizon).
fn cloudDomeUV(dir: vec3f) -> vec2f {
  let p = dir.xz / (1.0 + max(dir.y, -0.3));
  return p / frame.cloud2.w * 0.5 + 0.5;
}
/// Clouds along a view direction: rgb = premultiplied radiance (cd/m\xB2), a = transmittance of the sky behind.
fn cloudDome(dir: vec3f) -> vec4f {
  if (frame.cloud.w < 0.5) { return vec4f(0.0, 0.0, 0.0, 1.0); }
  let p = dir.xz / (1.0 + max(dir.y, -0.3));
  if (dot(p, p) >= frame.cloud2.w * frame.cloud2.w) { return vec4f(0.0, 0.0, 0.0, 1.0); }
  return textureSampleLevel(cloudDomeTex, linearClamp, p / frame.cloud2.w * 0.5 + 0.5, 0.0);
}
`,mn=`
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
`;var Ri=Tt+zt+yt+ea+ta+`
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
`;function Li(n){let t=new Uint8Array(n*n*4*4),r=dt(1234),a=new Float32Array(4096).map(()=>r.next()),s=(o,c)=>{let b=Math.floor(o),l=Math.floor(c),u=o-b,m=c-l,d=(M,g)=>a[(g&63)*64+(M&63)],v=u*u*(3-2*u),p=m*m*(3-2*m);return(d(b,l)*(1-v)+d(b+1,l)*v)*(1-p)+(d(b,l+1)*(1-v)+d(b+1,l+1)*v)*p},i=(o,c)=>{let b=0,l=.5,u=1;for(let m=0;m<5;m++)b+=l*s(o*u,c*u),l*=.5,u*=2;return b};for(let o=0;o<4;o++)for(let c=0;c<n;c++)for(let b=0;b<n;b++){let l=(b+.5)/n*2-1,u=(c+.5)/n*2-1,m=Math.hypot(l,u),d=0,v=255;if(o===0){let M=i(l*2.2+5,u*2.2+3);d=Math.max(0,Math.min(1,(1-m*m)*1.2))*Math.max(0,Math.min(1,M*1.8-.25)),v=Math.round(200+55*M)}else if(o===1){let M=Math.atan2(u,l),g=Math.pow(Math.abs(Math.cos(M*2.5)),6)*.6+Math.pow(Math.abs(Math.cos(M*4+.6)),10)*.4,w=i(l*4+11,u*4+7),x=.25+.75*g*(.6+.6*w);d=Math.max(0,1-m/x)**1.5+Math.max(0,1-m/.25)**2,d=Math.min(1,d),v=255}else if(o===2)d=Math.exp(-(u*u)*40)*Math.max(0,1-Math.abs(l)),v=255;else{let M=i(l*5+21,u*5+13);d=Math.max(0,1-m)**1.4*Math.max(0,M*1.6-.35),v=Math.round(180+75*M)}let p=((o*n+c)*n+b)*4;t[p]=v,t[p+1]=v,t[p+2]=v,t[p+3]=Math.round(Math.max(0,Math.min(1,d))*255)}return t}var Fa=class{constructor(e){this.dev=e;this.instanceBuffer=e.createBuffer(this.capacity*64,GPUBufferUsage.VERTEX,"particles.inst");let t=128;this.atlas=e.device.createTexture({size:[t,t,4],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:"particle.atlas"}),e.device.queue.writeTexture({texture:this.atlas},Li(t),{bytesPerRow:t*4,rowsPerImage:t},[t,t,4]),this.sampler=e.device.createSampler({magFilter:"linear",minFilter:"linear"})}particles=[];maxParticles=4096;wind=h.create(1.5,0,.5);instanceBuffer;capacity=1024;data=new Float32Array(1024*16);atlas;sampler;pipeline=null;bg=null;bgDepth=null;random=dt(77);count=0;get random01(){return this.random.next()}spawn(e){this.particles.length>=this.maxParticles&&this.particles.shift(),this.particles.push({kind:e.kind,pos:Float32Array.from(e.position),vel:Float32Array.from(e.velocity??[0,0,0]),life:e.life,size0:e.size0,size1:e.size1,color:e.color??[1,1,1],alpha0:e.alpha0??1,alpha1:e.alpha1??0,luminance:e.luminance??0,rotation:e.rotation??this.random.next()*Math.PI*2,spin:e.spin??0,drag:e.drag??0,gravity:e.gravity??0,buoyancy:e.buoyancy??0,stretch:e.stretch??0,layer:e.layer??(e.kind===2?2:e.kind),fadeIn:e.fadeIn??.05,age:0,fresh:!0})}update(e){let t=this.particles,r=0;for(let a=0;a<t.length;a++){let s=t[a];if(s.fresh){s.fresh=!1,t[r++]=s;continue}if(s.age+=e,s.age>=s.life)continue;let i=s.kind===0||s.kind===3?1:0;for(let o=0;o<3;o++){let c=s.vel[o]-this.wind[o]*i;s.vel[o]-=c*Math.min(1,s.drag*e)}s.vel[1]+=(s.buoyancy-s.gravity)*e,s.pos[0]+=s.vel[0]*e,s.pos[1]+=s.vel[1]*e,s.pos[2]+=s.vel[2]*e,s.rotation+=s.spin*e,t[r++]=s}t.length=r}upload(e){let t=this.particles,r=t.length;r>this.capacity&&(this.capacity=Math.ceil(r*1.5),this.instanceBuffer.destroy(),this.instanceBuffer=this.dev.createBuffer(this.capacity*64,GPUBufferUsage.VERTEX,"particles.inst"),this.data=new Float32Array(this.capacity*16));let a=i=>(i.pos[0]-e[0])**2+(i.pos[1]-e[1])**2+(i.pos[2]-e[2])**2;t.sort((i,o)=>a(o)-a(i));let s=this.data;for(let i=0;i<r;i++){let o=t[i],c=i*16,b=o.age/o.life,l=Math.min(1,b/Math.max(o.fadeIn,.001)),u=o.size0+(o.size1-o.size0)*Math.sqrt(b),m=(o.alpha0+(o.alpha1-o.alpha0)*b)*l;s[c]=o.pos[0],s[c+1]=o.pos[1],s[c+2]=o.pos[2],s[c+3]=u,s[c+4]=o.color[0],s[c+5]=o.color[1],s[c+6]=o.color[2],s[c+7]=m,s[c+8]=o.rotation,s[c+9]=o.kind,s[c+10]=o.luminance*(1-b)*(1-b),s[c+11]=o.stretch,s[c+12]=o.vel[0],s[c+13]=o.vel[1],s[c+14]=o.vel[2],s[c+15]=o.layer}return r&&this.dev.device.queue.writeBuffer(this.instanceBuffer,0,s,0,r*16),this.count=r,r}createPipeline(e,t){let r=this.dev.device,a=this.dev.shader(Ri,"particles"),s=r.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d-array"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"depth"}}]});return this.pipeline=r.createRenderPipeline({label:"particles",layout:r.createPipelineLayout({bindGroupLayouts:[e,s]}),vertex:{module:a,entryPoint:"vs",buffers:[{arrayStride:64,stepMode:"instance",attributes:[{shaderLocation:0,offset:0,format:"float32x4"},{shaderLocation:1,offset:16,format:"float32x4"},{shaderLocation:2,offset:32,format:"float32x4"},{shaderLocation:3,offset:48,format:"float32x4"}]}]},fragment:{module:a,entryPoint:"fs",targets:[{format:t,blend:{color:{srcFactor:"one",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"triangle-strip"},depthStencil:{format:"depth32float",depthWriteEnabled:!1,depthCompare:"greater-equal"}}),this.bg=null,s}draw(e,t){!this.pipeline||this.count===0||((!this.bg||this.bgDepth!==t)&&(this.bg=this.dev.device.createBindGroup({layout:this.pipeline.getBindGroupLayout(1),entries:[{binding:0,resource:this.atlas.createView({dimension:"2d-array"})},{binding:1,resource:this.sampler},{binding:2,resource:t.createView()}]}),this.bgDepth=t),e.setPipeline(this.pipeline),e.setBindGroup(1,this.bg),e.setVertexBuffer(0,this.instanceBuffer),e.draw(4,this.count))}};var Ii=Tt+zt+yt+ea+ja+ta+`
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
`;function ji(n){let t=new Uint8Array(n*n*4*6),r=new Uint8Array(n*n*4*6),a=dt(99),s=Array.from({length:64},()=>a.next());for(let i=0;i<6;i++){let o=new Float32Array(n*n);for(let b=0;b<n;b++)for(let l=0;l<n;l++){let u=(l+.5)/n*2-1,m=(b+.5)/n*2-1,d=Math.hypot(u,m),v=Math.atan2(m,u),p=1+.18*(s[Math.floor((v+Math.PI)/(2*Math.PI)*63)]-.5)*2,M=[0,0,0],g=0,w=0,x=.6;switch(i){case 0:{let k=d<.14*p,f=d<.32*p,A=d<.62*p;k?(M=[.16,.16,.17],g=1,w=-.6,x=.55):f?(M=[.78,.79,.8],g=1,w=-.15+.15*Math.cos(d*30),x=.22):A&&(M=[.22,.21,.2],g=Math.min(1,(.62*p-d)*12),w=-.05,x=.5);break}case 1:{let k=d<.12*p,f=Math.abs(Math.sin(v*7+s[3]*6))>.6&&d<.45*p;k?(M=[.02,.015,.01],g=1,w=-1,x=.95):f?(M=[.75,.6,.42],g=Math.min(1,(.45*p-d)*6),w=.2,x=.75):d<.25*p&&(M=[.3,.2,.12],g=.8,w=-.2,x=.8);break}case 2:{d<.3*p?(M=[.62,.61,.58],g=1,w=-.8*(1-d/(.3*p)),x=.95):d<.75&&(M=[.58,.57,.54],g=Math.max(0,.6*(1-(d-.3)/.45)),w=0,x=.95);break}case 3:{d<.2?(M=[.01,.01,.01],g=1,w=-1,x=1):d<.27&&(M=[.25,.25,.26],g=.85,w=0,x=.8);break}case 4:{let k=Math.pow(Math.abs(Math.cos(v*9+s[7]*5)),4);d<.18?(M=[.55,.55,.57],g=1,w=.2,x=.35):d<(.3+.6*k)*p&&(M=[.5,.5,.52],g=Math.max(0,1-d)*.9,w=.05,x=.4);break}default:d<.7*p&&(M=[.12,.09,.06],g=Math.max(0,1-d/(.7*p))*.9,w=-.3*(1-d),x=1)}o[b*n+l]=w;let y=((i*n+b)*n+l)*4;t[y]=Math.round(Math.pow(M[0],1/2.2)*255),t[y+1]=Math.round(Math.pow(M[1],1/2.2)*255),t[y+2]=Math.round(Math.pow(M[2],1/2.2)*255),t[y+3]=Math.round(Math.max(0,Math.min(1,g))*255),r[y+3]=Math.round(x*255)}let c=6;for(let b=0;b<n;b++)for(let l=0;l<n;l++){let u=o[b*n+Math.min(n-1,l+1)]-o[b*n+Math.max(0,l-1)],m=o[Math.min(n-1,b+1)*n+l]-o[Math.max(0,b-1)*n+l],d=-u*c,v=m*c,p=1,M=Math.hypot(d,v,p);d/=M,v/=M,p/=M;let g=((i*n+b)*n+l)*4;r[g]=Math.round((d*.5+.5)*255),r[g+1]=Math.round((v*.5+.5)*255),r[g+2]=Math.round((p*.5+.5)*255)}}return{albedo:t,normal:r,layers:6}}var Ea=class{constructor(e){this.dev=e;this.buffer=e.createBuffer(this.capacity*80,GPUBufferUsage.VERTEX,"decals.inst");let t=128,r=ji(t),a=(s,i,o)=>{let c=e.device.createTexture({size:[t,t,r.layers],format:s,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:o});return e.device.queue.writeTexture({texture:c},i,{bytesPerRow:t*4,rowsPerImage:t},[t,t,r.layers]),c};this.albedo=a("rgba8unorm-srgb",r.albedo,"decal.albedo"),this.normal=a("rgba8unorm",r.normal,"decal.normal"),this.sampler=e.device.createSampler({magFilter:"linear",minFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"})}decals=[];maxDecals=512;buffer;capacity=512;data=new Float32Array(512*20);albedo;normal;sampler;pipeline=null;bg=null;count=0;tmp=O.create();add(e,t,r,a,s=null,i=[1,1,1],o=Math.random()*Math.PI*2){let c=h.normalize(h.create(),h.clone(r)),b=Math.abs(c[1])>.95?h.create(1,0,0):h.create(0,1,0),l=h.normalize(h.create(),h.cross(h.create(),b,c)),u=h.cross(h.create(),c,l),m=Math.cos(o),d=Math.sin(o),v=h.create(l[0]*m+u[0]*d,l[1]*m+u[1]*d,l[2]*m+u[2]*d),p=h.cross(h.create(),c,v),M=.0015,g=O.create();g[0]=v[0]*a,g[1]=v[1]*a,g[2]=v[2]*a,g[4]=p[0]*a,g[5]=p[1]*a,g[6]=p[2]*a,g[8]=c[0],g[9]=c[1],g[10]=c[2],g[12]=t[0]+c[0]*M,g[13]=t[1]+c[1]*M,g[14]=t[2]+c[2]*M;let w=g;if(s){let x=O.invert(O.create(),s.transform);w=O.multiply(O.create(),x,g)}this.decals.length>=this.maxDecals&&this.decals.shift(),this.decals.push({local:w,parent:s,kind:e,tint:i,age:0})}clear(){this.decals.length=0}upload(){let e=this.decals.length;e>this.capacity&&(this.capacity=Math.ceil(e*1.5),this.buffer.destroy(),this.buffer=this.dev.createBuffer(this.capacity*80,GPUBufferUsage.VERTEX,"decals.inst"),this.data=new Float32Array(this.capacity*20));for(let t=0;t<e;t++){let r=this.decals[t],a=r.parent?O.multiply(this.tmp,r.parent.transform,r.local):r.local;this.data.set(a,t*20),this.data[t*20+16]=r.kind,this.data[t*20+17]=r.tint[0],this.data[t*20+18]=r.tint[1],this.data[t*20+19]=r.tint[2]}return e&&this.dev.device.queue.writeBuffer(this.buffer,0,this.data,0,e*20),this.count=e,e}createPipeline(e,t){let r=this.dev.device,a=this.dev.shader(Ii,"decals"),s=r.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d-array"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d-array"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,sampler:{}}]});this.pipeline=r.createRenderPipeline({label:"decals",layout:r.createPipelineLayout({bindGroupLayouts:[e,s]}),vertex:{module:a,entryPoint:"vs",buffers:[{arrayStride:80,stepMode:"instance",attributes:[0,1,2,3,4].map(i=>({shaderLocation:i,offset:i*16,format:"float32x4"}))}]},fragment:{module:a,entryPoint:"fs",targets:[{format:t,blend:{color:{srcFactor:"one",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"triangle-strip"},depthStencil:{format:"depth32float",depthWriteEnabled:!1,depthCompare:"greater-equal",depthBias:2,depthBiasSlopeScale:2}}),this.bg=r.createBindGroup({layout:s,entries:[{binding:0,resource:this.albedo.createView({dimension:"2d-array"})},{binding:1,resource:this.normal.createView({dimension:"2d-array"})},{binding:2,resource:this.sampler}]})}draw(e){!this.pipeline||!this.bg||this.count===0||(e.setPipeline(this.pipeline),e.setBindGroup(1,this.bg),e.setVertexBuffer(0,this.buffer),e.draw(4,this.count))}};var vt=256,hn=`
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
`,Gi=`
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
`;function Mr(n=!1){return Tt+zt+yt+ea+ja+ta+mn+Ga+hn+wa(n)+Gi+`
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
    let a = sampleBase(uv, 0).a * material.baseColor.a;
    if (a < material.params.x) { discard; }
  }
}

@fragment fn fsPrepass(i: VOut, @builtin(front_facing) ff: bool) -> PrepassOut {
  let uv = materialUV(i.uv, i.worldPos);
  alphaTest(uv);
  var o: PrepassOut;
  let ng = select(-normalize(i.nrm), normalize(i.nrm), ff);
  var rough = material.pbr.y;
  if (MATERIAL_IS_TERRAIN) {
    let w = vec3f(saturate(1.0 - i.uv.x - i.uv.y), saturate(i.uv.x), saturate(i.uv.y));
    rough *= sampleOrm(uv * material.layers.x, 0).g * w.x + sampleOrm(uv * material.layers.y, 1).g * w.y + sampleOrm(uv * material.layers.z, 2).g * w.z;
  } else {
    rough *= sampleOrm(uv, 0).g;
  }
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

// ---- terrain: three material layers blended per pixel
// Vertex weights (uv.x = layer 1, uv.y = layer 2, layer 0 = remainder) are perturbed by world-space noise
// where layers meet and sharpened by each layer's own relief (brightness as a height proxy), so stones and
// grass blades poke through the neighbouring layer instead of cross-fading.
fn tnHash(p: vec2f) -> f32 { return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453); }
fn tnValue(p: vec2f) -> f32 {
  let i = floor(p); let f = fract(p);
  let u = f * f * (3.0 - 2.0 * f);
  let a = tnHash(i); let b = tnHash(i + vec2f(1.0, 0.0)); let c = tnHash(i + vec2f(0.0, 1.0)); let d = tnHash(i + vec2f(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y) * 2.0 - 1.0;
}
fn terrainNoise(p: vec2f) -> f32 { return 0.65 * tnValue(p) + 0.35 * tnValue(p * 2.7 + vec2f(3.1, 7.9)); }
/// Vertex layer weights \u2192 per-pixel weights (noise near transitions only, never inside a pure region).
fn terrainWeights(uvIn: vec2f, wp: vec3f) -> vec3f {
  var w = vec3f(saturate(1.0 - uvIn.x - uvIn.y), saturate(uvIn.x), saturate(uvIn.y));
  let mixed = saturate(3.0 * (1.0 - max(w.x, max(w.y, w.z))));
  if (mixed > 0.0) {
    let sc = max(material.layers2.x, 0.05);
    let n1 = terrainNoise(wp.xz / sc);
    let n2 = terrainNoise(wp.xz / (sc * 0.43) + vec2f(11.3, -5.7));
    let k = material.layers2.y * mixed;
    w += vec3f(-n1 - 0.5 * n2, n1 - 0.5 * n2, n2) * k;
    w = max(w, vec3f(0.0));
    w /= max(w.x + w.y + w.z, 1e-4);
  }
  return w;
}
struct TerrainSample { base: vec4f, nrm: vec3f, orm: vec4f };
fn sampleTerrain(uv: vec2f, uvIn: vec2f, wp: vec3f) -> TerrainSample {
  let w = terrainWeights(uvIn, wp);
  let scales = material.layers.xyz;
  var base: array<vec4f, 3>;
  var lum = vec3f(0.0);
  let macroV = sampleBase(uv * 0.021 + vec2f(0.11, 0.29), 1).g;
  let macroK = mix(0.84, 1.16, saturate(macroV * 2.5));
  for (var l = 0; l < 3; l++) {
    let uvl = uv * scales[l];
    var b = sampleBase(uvl, l);
    // hide tiling: a second rotated/scaled sample of the same layer
    let uv2 = vec2f(uvl.x * 0.31 - uvl.y * 0.17, uvl.x * 0.17 + uvl.y * 0.31) + vec2f(0.37, 0.71);
    let b2 = sampleBase(uv2, l);
    b = vec4f(mix(b.rgb, b2.rgb, 0.45) * macroK, b.a);
    base[l] = b;
    lum[l] = dot(b.rgb, vec3f(0.3, 0.59, 0.11));
  }
  // height-based sharpening: brighter (higher) relief wins near a transition
  let k = material.layers.w;
  let h = lum * k * 0.55;
  let b = w + h;
  let mx = max(b.x, max(b.y, b.z));
  let depth = mix(0.6, 0.12, k);
  var ws = max(b - mx + vec3f(depth), vec3f(0.0)) * select(vec3f(0.0), vec3f(1.0), w > vec3f(0.002));
  ws /= max(ws.x + ws.y + ws.z, 1e-4);
  var o: TerrainSample;
  o.base = base[0] * ws.x + base[1] * ws.y + base[2] * ws.z;
  var n = vec3f(0.0);
  var orm = vec4f(0.0);
  for (var l = 0; l < 3; l++) {
    // sampled unconditionally: textureSample needs uniform control flow
    let uvl = uv * scales[l];
    n += (sampleNormalMap(uvl, l).xyz * 2.0 - 1.0) * ws[l];
    orm += sampleOrm(uvl, l) * ws[l];
  }
  o.nrm = normalize(vec3f(n.xy, max(n.z, 0.05)));
  o.orm = orm;
  return o;
}

fn surfaceFromInputs(i: VOut, ff: bool) -> ShadeIn {
  let uv = materialUV(i.uv, i.worldPos);
  var s: ShadeIn;
  s.worldPos = i.worldPos;
  var orm: vec4f;
  var nt: vec3f;
  if (MATERIAL_IS_TERRAIN) {
    let ts = sampleTerrain(uv, i.uv, i.worldPos);
    s.base = ts.base * material.baseColor;
    orm = ts.orm;
    nt = ts.nrm;
  } else {
    s.base = sampleBase(uv, 0) * material.baseColor;
    if ((materialFlags() & 4u) != 0u) {
      // large surfaces: blend a second, rotated & scaled sample and a macro brightness variation to hide tiling
      let uv2 = vec2f(uv.x * 0.31 - uv.y * 0.17, uv.x * 0.17 + uv.y * 0.31) + vec2f(0.37, 0.71);
      let b2 = sampleBase(uv2, 0) * material.baseColor;
      let macroV = sampleBase(uv * 0.043 + vec2f(0.11, 0.29), 0).g;
      s.base = vec4f(mix(s.base.rgb, b2.rgb, 0.45) * mix(0.8, 1.2, saturate(macroV * 2.5)), s.base.a);
    }
    orm = sampleOrm(uv, 0);
    nt = sampleNormalMap(uv, 0).xyz * 2.0 - 1.0;
  }
  s.metallic = saturate(material.pbr.x * orm.b);
  s.rough = saturate(material.pbr.y * orm.g);
  s.ao = mix(1.0, orm.r, material.pbr.w);
  var ng = normalize(i.nrm);
  if (!ff) { ng = -ng; }
  s.Ng = ng;
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
`}var fn=Mr(!1);function kr(n=!1){return hn+wa(n)+`
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
  let a = sampleBase(uv, 0).a * material.baseColor.a;
  if (a < material.params.x) { discard; }
}
`}var pn=kr(!1);var gn=`
struct FOut { @builtin(position) pos: vec4f, @location(0) uv: vec2f };
@vertex fn vsFull(@builtin(vertex_index) i: u32) -> FOut {
  let p = vec2f(f32((i << 1u) & 2u), f32(i & 2u));
  var o: FOut;
  o.pos = vec4f(p * 2.0 - 1.0, 0.0, 1.0);
  o.uv = vec2f(p.x, 1.0 - p.y);
  return o;
}
`,yn=Tt+zt+yt+Ga+gn+`
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
  // ---- clouds: ray-marched dome (premultiplied radiance + transmittance), covers the sun disk too
  let cl = cloudDome(dir);
  L = L * cl.a + cl.rgb;
  return vec4f(min(L * exposure.current, vec3f(HALF_MAX)), 1.0);
}
`,vn=`
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
`,xn=`
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
`,wn=`
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
`,Mn=`
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
`,kn=`
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
`,An=`
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
`,Sn=`
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
`,Pn=`
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
`,Tn=yt+gn+`
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
`;var zn=`
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
`;var Rn=`
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
`,Ln=Rn+`
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
`,In=Rn+`
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
`;function Ei(){return{renderScale:1,maxDevicePixelRatio:2,taa:{enabled:!0,feedbackMin:.82,feedbackMax:.94,velocityWeight:.06,jitterSamples:16},exposure:{mode:"auto",ev100:14,compensation:0,minEv100:-2,maxEv100:17,speedUp:2.2,speedDown:1.4,lowPercent:.45,highPercent:.96,centerWeight:.6},bloom:{enabled:!0,intensity:.035,radius:1,clamp:6e4},gtao:{enabled:!0,radius:.9,falloff:.4,power:1.25,strength:1,slices:2,steps:6,blur:!0},motionBlur:{enabled:!0,shutterAngle:180,maxPixels:48,samples:10},dof:{enabled:!0,apertureMm:3.2,autoFocus:!0,focusDistance:10,focusSpeed:6,maxBlurPx:14,overrideDistance:.6,overrideWeight:0,minFocus:.12,quality:1},lens:{distortion:0,distortion2:0,chromaticAberration:.15,naturalVignette:.6,vignette:.12,vignetteRoundness:.6,sharpen:.25,fillZoom:1},sensor:{enabled:!0,readNoise:.0025,shotNoise:.0018,isoCoupled:!0,gain:1},grade:{tonemapper:"agx",contrast:1.04,saturation:1.02,temperature:0,tint:0,lift:0,gamma:1,gain:1,exposureBias:0,dither:1},fog:{density:35e-5,heightFalloff:.045,baseHeight:0,startDistance:15,inscatter:1,mieG:.72},ibl:{intensity:1,specularOcclusion:1,occludedAmbient:.15,groundBounce:.6,viewmodelFill:1.7},gi:{enabled:!0,intensity:1},shadows:{...dn},viewmodelDepthSqueeze:.5,debugView:0}}var Ui={agx:0,aces:1,neutral:2,none:3};function Gn(n){let e=new Float32Array(1),t=new Uint32Array(e.buffer);e[0]=n;let r=t[0],a=r>>>16&32768,s=(r>>>23&255)-127+15,i=r&8388607;return s<=0?s<-10?a:(i=(i|8388608)>>1-s,a|i>>13):s>=31?a|31744:a|s<<10|i>>13}var Ua=class n{dev;device;settings;textures;synth;sky;wind=new za;ibl;particles;decals;stats={drawCalls:0,triangles:0,objects:0,culled:0,frameMs:0,gpuInfo:""};frameLayout;objectLayout;materialLayout;terrainMaterialLayout;terrainMeshModule=null;terrainShadowModule=null;shadowLayout;frameBuf;lightBuf;exposureBuf;histBuf;objBuf;objCapacity=0;objData=new Float32Array(0);cascadeBuf;dummyJoints;staticObjectBG;frameBG=null;frameBGKey="";shadowMap;shadowRes=0;shadowCount=0;skyVis;skyVisParams={min:[0,0,0],cell:1,size:[1,1,1],enabled:!1};probes=[];probeParams={min:[0,0,0],cell:1,size:[1,1,1],enabled:!1};targets=null;linearClamp;shadowSampler;meshModule;shadowModule;pipelines=new Map;skyPipe;gtaoPipe;aoBlurPipe;taaPipe;mbPipe;dofFocusPipe;dofGatherPipe;dofState;bloomDownPipe;bloomUpPipe;histPipe;exposurePipe;compositePipe;debugPipe;postUniforms=new Map;frameIndex=0;prevViewProj=O.create();prevVmViewProj=O.create();historyValid=!1;time=0;lastSkyVersion=-1;fw=new ya(1344);constructor(e){this.dev=e,this.device=e.device;let t=this.device;this.settings=Ei(),this.textures=new xa(e),this.synth=new Ma(e,this.textures),this.sky=new Ta(e,this.textures,128),this.ibl=new Ra(e,128),this.particles=new Fa(e),this.decals=new Ea(e);let r=GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT;this.frameLayout=t.createBindGroupLayout({label:"frame",entries:[{binding:0,visibility:r,buffer:{type:"uniform"}},{binding:1,visibility:r,buffer:{type:"read-only-storage"}},{binding:2,visibility:r,buffer:{type:"read-only-storage"}},{binding:3,visibility:r,buffer:{type:"read-only-storage"}},{binding:4,visibility:r,texture:{viewDimension:"cube"}},{binding:5,visibility:r,texture:{}},{binding:6,visibility:r,texture:{sampleType:"depth",viewDimension:"2d-array"}},{binding:7,visibility:r,sampler:{type:"comparison"}},{binding:8,visibility:r,sampler:{}},{binding:9,visibility:r,texture:{sampleType:"unfilterable-float"}},{binding:10,visibility:r,texture:{viewDimension:"3d"}},{binding:11,visibility:r,texture:{viewDimension:"cube"}},{binding:12,visibility:r,texture:{viewDimension:"3d"}},{binding:13,visibility:r,texture:{viewDimension:"3d"}},{binding:14,visibility:r,texture:{viewDimension:"3d"}},{binding:15,visibility:r,texture:{}},{binding:16,visibility:r,texture:{}}]}),this.objectLayout=t.createBindGroupLayout({label:"object",entries:[{binding:0,visibility:r,buffer:{type:"uniform",hasDynamicOffset:!0,minBindingSize:vt}},{binding:1,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}},{binding:2,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}}]}),this.materialLayout=t.createBindGroupLayout({label:"material",entries:[{binding:0,visibility:r,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:3,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:4,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:5,visibility:GPUShaderStage.FRAGMENT,texture:{}}]}),this.terrainMaterialLayout=t.createBindGroupLayout({label:"material-terrain",entries:[{binding:0,visibility:r,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d-array"}},{binding:3,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d-array"}},{binding:4,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d-array"}},{binding:5,visibility:GPUShaderStage.FRAGMENT,texture:{}}]}),this.shadowLayout=t.createBindGroupLayout({label:"shadow",entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform",hasDynamicOffset:!0,minBindingSize:64}}]}),this.frameBuf=e.createBuffer(1344,GPUBufferUsage.UNIFORM,"frame"),this.lightBuf=e.createBuffer(4096,GPUBufferUsage.STORAGE,"lights"),this.exposureBuf=e.createBuffer(16,GPUBufferUsage.STORAGE,"exposure",new Float32Array([1/(1.2*2**14),14,14,1/(1.2*2**14)])),this.histBuf=e.createBuffer(256*4,GPUBufferUsage.STORAGE,"histogram"),this.cascadeBuf=e.createBuffer(256*4,GPUBufferUsage.UNIFORM,"cascades"),this.dummyJoints=e.createBuffer(64,GPUBufferUsage.STORAGE,"dummyJoints",O.create()),this.objBuf=this.ensureObjectCapacity(256),this.linearClamp=t.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",addressModeW:"clamp-to-edge"}),this.shadowSampler=t.createSampler({compare:"less",magFilter:"linear",minFilter:"linear"}),this.skyVis=this.textures.white3d,this.probes=[this.textures.white3d,this.textures.white3d,this.textures.white3d],this.createShadowMap(),this.meshModule=e.shader(fn,"mesh"),this.shadowModule=e.shader(pn,"shadow");let a="rgba16float",s=e.shader(yn,"skypass");this.skyPipe=t.createRenderPipeline({label:"sky",layout:t.createPipelineLayout({bindGroupLayouts:[this.frameLayout]}),vertex:{module:s,entryPoint:"vsFull"},fragment:{module:s,entryPoint:"fsSky",targets:[{format:a}]},depthStencil:{format:"depth32float",depthWriteEnabled:!1,depthCompare:"greater-equal"}});let i=(c,b)=>t.createComputePipeline({label:b,layout:"auto",compute:{module:e.shader(c,b),entryPoint:"main"}});this.gtaoPipe=i(vn,"gtao"),this.aoBlurPipe=i(xn,"aoblur"),this.taaPipe=i(wn,"taa"),this.mbPipe=i(Mn,"motionblur"),this.dofFocusPipe=i(Ln,"dof-focus"),this.dofGatherPipe=i(In,"dof-gather"),this.dofState=e.createBuffer(16,GPUBufferUsage.STORAGE,"dof.state",new Float32Array([0,0,0,0])),this.bloomDownPipe=i(kn,"bloomdown"),this.bloomUpPipe=i(An,"bloomup"),this.histPipe=i(Sn,"histogram"),this.exposurePipe=i(Pn,"exposure"),this.debugPipe=i(zn,"debug");let o=e.shader(Tn,"composite");this.compositePipe=t.createRenderPipeline({label:"composite",layout:"auto",vertex:{module:o,entryPoint:"vsFull"},fragment:{module:o,entryPoint:"fsComposite",targets:[{format:e.presentationFormat}]}}),this.particles.createPipeline(this.frameLayout,a),this.decals.createPipeline(this.frameLayout,a),this.staticObjectBG=this.makeObjectBG(this.dummyJoints,this.dummyJoints)}static async create(e,t={}){let r=await ga.create({canvas:e,powerPreference:t.powerPreference,offscreen:t.offscreen});return new n(r)}get materialBindGroupLayout(){return this.materialLayout}materialLayoutFor(e){return e.terrain?this.terrainMaterialLayout:this.materialLayout}ensureObjectCapacity(e){if(e<=this.objCapacity)return this.objBuf;let t=Math.max(e,Math.ceil(this.objCapacity*1.5),256);this.objBuf?.destroy?.(),this.objBuf=this.dev.createBuffer(t*vt,GPUBufferUsage.UNIFORM,"objects"),this.objData=new Float32Array(t*vt/4),this.objCapacity=t,this.dummyJoints&&(this.staticObjectBG=this.makeObjectBG(this.dummyJoints,this.dummyJoints));for(let r of this.skinnedObjects)r._skin&&(r._skin.bg=null);return this.objBuf}skinnedObjects=new Set;makeObjectBG(e,t){return this.device.createBindGroup({layout:this.objectLayout,entries:[{binding:0,resource:{buffer:this.objBuf,size:vt}},{binding:1,resource:{buffer:e}},{binding:2,resource:{buffer:t}}]})}createShadowMap(){let e=this.settings.shadows,t=Math.max(256,Math.min(8192,e.resolution|0)),r=Math.max(1,Math.min(4,e.cascades|0));this.shadowMap&&t===this.shadowRes&&r===this.shadowCount||(this.shadowMap?.destroy(),this.shadowMap=this.device.createTexture({size:[t,t,4],format:"depth32float",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING,label:"shadowmap"}),this.shadowRes=t,this.shadowCount=r,this.frameBG=null)}setSkyVisibility(e,t,r,a,s,i){let o=new Uint16Array(e.length);for(let b=0;b<e.length;b++)o[b]=Gn(e[b]);let c=this.device.createTexture({size:[t,r,a],dimension:"3d",format:"r16float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:"skyvis"});this.device.queue.writeTexture({texture:c},o,{bytesPerRow:t*2,rowsPerImage:r},[t,r,a]),this.skyVis!==this.textures.white3d&&this.skyVis.destroy(),this.skyVis=c,this.skyVisParams={min:[...s],cell:i,size:[t,r,a],enabled:!0},this.frameBG=null}setProbeVolume(e,t,r,a,s,i){let o=t*r*a;for(let c=0;c<3;c++){let b=new Uint16Array(o*4);for(let u=0;u<o;u++)for(let m=0;m<4;m++)b[u*4+m]=Gn(e[u*12+c*4+m]);let l=this.device.createTexture({size:[t,r,a],dimension:"3d",format:"rgba16float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:`gi.probes.${"rgb"[c]}`});this.device.queue.writeTexture({texture:l},b,{bytesPerRow:t*8,rowsPerImage:r},[t,r,a]),this.probes[c]!==this.textures.white3d&&this.probes[c].destroy(),this.probes[c]=l}this.probeParams={min:[s[0],s[1],s[2]],cell:i,size:[t,r,a],enabled:!0},this.frameBG=null}async readSkySH(){let e=this.device,t=e.createCommandEncoder({label:"sky-sh-readback"});this.sky.update(t),this.sky.envVersion!==this.lastSkyVersion&&(this.ibl.update(this.sky.envCube,t),this.lastSkyVersion=this.sky.envVersion);let r=e.createBuffer({size:144,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST,label:"sh-readback"});t.copyBufferToBuffer(this.ibl.sh,0,r,0,144),e.queue.submit([t.finish()]),await r.mapAsync(GPUMapMode.READ);let a=new Float32Array(r.getMappedRange().slice(0));r.unmap(),r.destroy();let s=new Float32Array(27);for(let i=0;i<9;i++)for(let o=0;o<3;o++)s[i*3+o]=a[i*4+o];return s}makeTargets(e,t){let r=this.device,a=(l,u,m,d=[e,t])=>r.createTexture({label:l,size:d,format:u,usage:m}),s=GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING,i=GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING,o=[],c=[],b=Math.min(6,Ze(e,t)-2);for(let l=0;l<b;l++){let u=Math.max(1,e>>l+1),m=Math.max(1,t>>l+1);o.push(a(`bloom.down${l}`,"rgba16float",i,[u,m])),c.push(a(`bloom.up${l}`,"rgba16float",i,[u,m]))}return{w:e,h:t,depth:a("depth","depth32float",s),normal:a("normal","rgba16float",s),velocity:a("velocity","rg16float",s),hdr:a("hdr","rgba16float",s),aoRaw:a("ao.raw","r32float",i),ao:a("ao","r32float",i),history:[a("taa.a","rgba16float",i),a("taa.b","rgba16float",i)],mb:a("motionblur","rgba16float",i),dof:a("dof","rgba16float",i),debug:a("debug","rgba16float",i),bloomDown:o,bloomUp:c}}destroyTargets(e){for(let t of[e.depth,e.normal,e.velocity,e.hdr,e.aoRaw,e.ao,e.history[0],e.history[1],e.mb,e.dof,e.debug,...e.bloomDown,...e.bloomUp])t.destroy()}uniform(e,t){let r=this.postUniforms.get(e);return r||(r=this.dev.createBuffer(Math.max(16,t.byteLength),GPUBufferUsage.UNIFORM,e),this.postUniforms.set(e,r)),this.device.queue.writeBuffer(r,0,t.buffer,t.byteOffset,t.byteLength),r}getFrameBG(e){let t=`${e.w}x${e.h}|${this.sky.clouds.resourceVersion}`;return this.frameBG&&this.frameBGKey===t?this.frameBG:(this.frameBG=this.device.createBindGroup({layout:this.frameLayout,label:"frame",entries:[{binding:0,resource:{buffer:this.frameBuf}},{binding:1,resource:{buffer:this.lightBuf}},{binding:2,resource:{buffer:this.ibl.sh}},{binding:3,resource:{buffer:this.exposureBuf}},{binding:4,resource:this.ibl.specular.createView({dimension:"cube"})},{binding:5,resource:this.ibl.brdfLut.createView()},{binding:6,resource:this.shadowMap.createView({dimension:"2d-array"})},{binding:7,resource:this.shadowSampler},{binding:8,resource:this.linearClamp},{binding:9,resource:e.ao.createView()},{binding:10,resource:this.skyVis.createView()},{binding:11,resource:this.sky.cube.createView({dimension:"cube"})},{binding:12,resource:this.probes[0].createView()},{binding:13,resource:this.probes[1].createView()},{binding:14,resource:this.probes[2].createView()},{binding:15,resource:this.sky.clouds.shadow.createView()},{binding:16,resource:this.sky.clouds.dome.createView()}]}),this.frameBGKey=t,this.frameBG)}getPipelines(e,t){let r=`${e?1:0}|${t.variantKey}`,a=this.pipelines.get(r);if(a)return a;let s=this.device,i=this.materialLayoutFor(t),o=this.meshModule,c=this.shadowModule;t.terrain&&(this.terrainMeshModule??=this.dev.shader(Mr(!0),"mesh-terrain"),this.terrainShadowModule??=this.dev.shader(kr(!0),"shadow-terrain"),o=this.terrainMeshModule,c=this.terrainShadowModule);let b=s.createPipelineLayout({bindGroupLayouts:[this.frameLayout,this.objectLayout,i]}),l=e?[gr,rn]:[gr],u={module:o,entryPoint:e?"vsSkinned":"vsStatic",buffers:l},m=t.doubleSided?"none":"back",d=s.createRenderPipeline({label:`prepass ${r}`,layout:b,vertex:u,fragment:{module:o,entryPoint:"fsPrepass",targets:[{format:"rgba16float"},{format:"rg16float"}]},primitive:{topology:"triangle-list",cullMode:m},depthStencil:{format:"depth32float",depthWriteEnabled:!0,depthCompare:"greater"}}),v=s.createRenderPipeline({label:`main ${r}`,layout:b,vertex:u,fragment:{module:o,entryPoint:"fsMain",targets:[{format:"rgba16float"}]},primitive:{topology:"triangle-list",cullMode:m},depthStencil:{format:"depth32float",depthWriteEnabled:!1,depthCompare:"equal"}}),p=s.createRenderPipeline({label:`transparent ${r}`,layout:b,vertex:u,fragment:{module:o,entryPoint:"fsTransparent",targets:[{format:"rgba16float",blend:{color:{srcFactor:"one",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"triangle-list",cullMode:m},depthStencil:{format:"depth32float",depthWriteEnabled:!1,depthCompare:"greater"}}),M=this.settings.shadows,g=s.createRenderPipeline({label:`shadow ${r}`,layout:s.createPipelineLayout({bindGroupLayouts:[this.shadowLayout,this.objectLayout,i]}),vertex:{module:c,entryPoint:e?"vsShadowSkinned":"vsShadow",buffers:l},fragment:t.alphaMode==="mask"?{module:c,entryPoint:"fsShadowMask",targets:[]}:void 0,primitive:{topology:"triangle-list",cullMode:"none"},depthStencil:{format:"depth32float",depthWriteEnabled:!0,depthCompare:"less",depthBias:1,depthBiasSlopeScale:M.slopeBias,depthBiasClamp:.01}});return a={prepass:d,main:v,transparent:p,shadow:g},this.pipelines.set(r,a),a}render(e,t,r){let a=performance.now(),s=this.settings,i=this.device,o=this.dev.canvas,c=Math.min(globalThis.devicePixelRatio??1,s.maxDevicePixelRatio),b=Math.max(1,Math.floor((o.clientWidth||o.width)*c)),l=Math.max(1,Math.floor((o.clientHeight||o.height)*c));(o.width!==b||o.height!==l)&&(o.width=b,o.height=l);let u=Math.max(16,Math.round(b*s.renderScale)),m=Math.max(16,Math.round(l*s.renderScale));(!this.targets||this.targets.w!==u||this.targets.h!==m)&&(this.targets&&this.destroyTargets(this.targets),this.targets=this.makeTargets(u,m),this.frameBG=null,this.historyValid=!1);let d=this.targets;this.createShadowMap(),this.time+=r;let v=i.createCommandEncoder({label:"frame"});this.wind.update(r),this.particles.wind.set(this.wind.vector);let p=this.wind.aloft(this.sky.clouds.settings.altitude);this.sky.update(v,{camPos:t.position,dt:r,windAloft:[p[0],p[2]]}),this.sky.envVersion!==this.lastSkyVersion&&(this.ibl.update(this.sky.envCube,v),this.lastSkyVersion=this.sky.envVersion),t.updateMatrices();let M=u/m,g=s.taa.enabled?Math.max(1,s.taa.jitterSamples):1,w=this.frameIndex%g+1,x=s.taa.enabled?(ur(w,2)-.5)*2/u:0,y=s.taa.enabled?(ur(w,3)-.5)*2/m:0,k=O.perspectiveReversedInfinite(O.create(),t.fovY,M,t.near,x,y),f=O.perspectiveReversedInfinite(O.create(),t.fovY,M,t.near),A=O.perspectiveReversedInfinite(O.create(),t.viewmodelFovY,M,t.near*.25,x,y),S=O.perspectiveReversedInfinite(O.create(),t.viewmodelFovY,M,t.near*.25),P=O.multiply(O.create(),k,t.view),T=O.multiply(O.create(),f,t.view),R=O.multiply(O.create(),A,t.view),L=O.multiply(O.create(),S,t.view);this.historyValid||(O.copy(this.prevViewProj,T),O.copy(this.prevVmViewProj,L));let z=O.invert(O.create(),k),j=O.invert(O.create(),P),I=O.invert(O.create(),T),F=this.sky.sunDir,N=this.sky.sunIlluminanceRGB(),G=this.sky.settings.sunAngularDiameter*Math.PI/360,H=s.shadows,_=H.enabled?un(t,M,h.clone(F),H):null,V=this.fw;V.mat4(0,P),V.mat4(64,T),V.mat4(128,this.prevViewProj),V.mat4(192,R),V.mat4(256,L),V.mat4(320,this.prevVmViewProj),V.mat4(384,t.view),V.mat4(448,t.world),V.mat4(512,z),V.mat4(576,j),V.mat4(640,k),V.vec4(704,t.position[0],t.position[1],t.position[2],t.near),V.vec4(720,F[0],F[1],F[2],Math.cos(G)),V.vec4(736,N[0],N[1],N[2],1),V.vec4(752,u,m,1/u,1/m),V.vec4(768,x,y,0,0);let U=.06*this.sky.settings.sunIlluminance/Math.PI*Math.max(.05,Math.sin(Math.max(.03,F[1])))*s.fog.inscatter;if(V.vec4(784,s.fog.density,s.fog.heightFalloff,s.fog.baseHeight,s.fog.startDistance),V.vec4(800,U*.62,U*.75,U,s.fog.mieG),V.vec4(816,this.time,r,this.frameIndex,s.ibl.intensity),V.vec4(832,_?_.viewProj.length:0,H.maxPenumbraTexels,Math.tan(G),H.blendFraction),_){V.vec4(848,_.splits[0]??1e9,_.splits[1]??1e9,_.splits[2]??1e9,_.splits[3]??1e9);for(let B=0;B<4;B++)V.mat4(864+B*64,_.viewProj[B]??O.create());V.vec4(1120,_.texelWorld[0]??1,_.texelWorld[1]??1,_.texelWorld[2]??1,_.texelWorld[3]??1),V.vec4(1216,_.depthRange[0]??1,_.depthRange[1]??1,_.depthRange[2]??1,_.depthRange[3]??1)}let q=this.skyVisParams;V.vec4(1136,q.min[0],q.min[1],q.min[2],q.cell),V.vec4(1152,q.size[0],q.size[1],q.size[2],q.enabled?1:0);let C=new Float32Array(1024),X=0;for(let B of e.lights){if(!B.enabled||X>=64||B.intensity<=0)continue;let ae=X*16;C.set([B.position[0],B.position[1],B.position[2],B.range],ae),C.set([B.color[0]*B.intensity,B.color[1]*B.intensity,B.color[2]*B.intensity,0],ae+4);let ce=B.spotOuter>0,ue=h.normalize(h.create(),B.direction);C.set([ue[0],ue[1],ue[2],Math.cos(B.spotOuter*Math.PI/180)],ae+8),C.set([Math.cos(Math.min(B.spotInner,B.spotOuter)*Math.PI/180),B.radius,ce?1:0,0],ae+12),X++}i.queue.writeBuffer(this.lightBuf,0,C,0,Math.max(16,X*16)),V.vec4(1168,X,s.ibl.specularOcclusion,s.gtao.enabled?s.gtao.strength:0,H.normalBias),V.vec4(1184,this.ibl.mips-1,1,this.sky.settings.groundAlbedo,s.debugView),V.vec4(1200,s.viewmodelDepthSqueeze,0,0,0),V.vec4(1232,H.constantBias,H.slopeBias,Math.min(16,H.blockerSamples),Math.min(32,H.pcfSamples)),V.vec4(1248,s.ibl.occludedAmbient,s.ibl.groundBounce,s.ibl.viewmodelFill,0);let te=this.wind;V.vec4(1264,te.vector[0],te.vector[2],te.settings.foliageBend,te.settings.turbulence);let W=this.sky.clouds.frameParams();V.vec4(1312,W[0],W[1],W[2],W[3]),V.vec4(1328,W[4],W[5],W[6],W[7]);let Q=this.probeParams;V.vec4(1280,Q.min[0],Q.min[1],Q.min[2],Q.cell),V.vec4(1296,Q.size[0],Q.size[1],Q.size[2],Q.enabled&&s.gi.enabled?s.gi.intensity:0),i.queue.writeBuffer(this.frameBuf,0,V.buffer);let E=br(P),J=[],Y=[],D=0,ee=[...e.objects];this.ensureObjectCapacity(ee.length+1);let re=this.objData,se=new Map,ne=0,he=new Float32Array(12);for(let B of ee){if(!B.visible)continue;B._beginFrame();let ae=ne*vt/4;if(re.set(B.transform,ae),re.set(B.prevTransform,ae+16),O.normalMatrix12(he,B.transform),re.set(he,ae+32),re[ae+44]=(B.viewmodel?1:0)+(B.instances?4:0),re[ae+45]=B.id,se.set(B,ne++),B.joints&&B.mesh.skinned&&this.updateSkin(B),B.instances&&(this.updateInstances(B),B.instanceCount===0)){ne--,se.delete(B);continue}B.castShadow&&!B.viewmodel&&Y.push(B),B.viewmodel||dr(E,B.worldBounds)?J.push(B):D++}ne&&i.queue.writeBuffer(this.objBuf,0,re,0,ne*vt/4),this.stats.objects=J.length,this.stats.culled=D;let Ce=0,Re=0,Le=B=>B._skin?this.skinBG(B):B._inst?this.instBG(B):this.staticObjectBG,Te=(B,ae)=>{B.setBindGroup(1,Le(ae),[se.get(ae)*vt]),B.setBindGroup(2,ae.material.getBindGroup(this.dev,this.textures,this.materialLayoutFor(ae.material))),B.setVertexBuffer(0,ae.mesh.vertexBuffer),ae.mesh.skinBuffer&&ae._skin&&B.setVertexBuffer(1,ae.mesh.skinBuffer),B.setIndexBuffer(ae.mesh.indexBuffer,"uint32");let ce=ae.instances?ae.instanceCount:1;B.drawIndexed(ae.mesh.indexCount,ce),Ce++,Re+=ae.mesh.indexCount/3*ce};if(_){let B=new Float32Array(256);for(let ce=0;ce<_.viewProj.length;ce++)B.set(_.viewProj[ce],ce*64);i.queue.writeBuffer(this.cascadeBuf,0,B);let ae=i.createBindGroup({layout:this.shadowLayout,entries:[{binding:0,resource:{buffer:this.cascadeBuf,size:64}}]});for(let ce=0;ce<_.viewProj.length;ce++){let ue=v.beginRenderPass({label:`shadow ${ce}`,colorAttachments:[],depthStencilAttachment:{view:this.shadowMap.createView({dimension:"2d",baseArrayLayer:ce,arrayLayerCount:1}),depthLoadOp:"clear",depthStoreOp:"store",depthClearValue:1}});ue.setBindGroup(0,ae,[ce*256]);let ye=br(_.viewProj[ce]);for(let ke of Y)ke.material.alphaMode!=="blend"&&dr(ye,ke.worldBounds)&&(ue.setPipeline(this.getPipelines(!!ke._skin,ke.material).shadow),Te(ue,ke));ue.end()}}let Kt=this.getFrameBG(d),bt=J.filter(B=>B.material.alphaMode!=="blend"),De=J.filter(B=>B.material.alphaMode==="blend");bt.sort((B,ae)=>Number(ae.viewmodel)-Number(B.viewmodel)||B.material.id-ae.material.id);let Xe=t.position;De.sort((B,ae)=>h.distance(O.getTranslation(h.create(),ae.transform),Xe)-h.distance(O.getTranslation(h.create(),B.transform),Xe));{let B=v.beginRenderPass({label:"prepass",colorAttachments:[{view:d.normal.createView(),loadOp:"clear",storeOp:"store",clearValue:[0,1,0,1]},{view:d.velocity.createView(),loadOp:"clear",storeOp:"store",clearValue:[0,0,0,0]}],depthStencilAttachment:{view:d.depth.createView(),depthLoadOp:"clear",depthStoreOp:"store",depthClearValue:0}});B.setBindGroup(0,Kt);for(let ae of bt)B.setPipeline(this.getPipelines(!!ae._skin,ae.material).prepass),Te(B,ae);B.end()}if(s.gtao.enabled){let B=s.gtao,ae=new Float32Array(44);ae.set(z,0),ae.set(t.view,16),ae.set([u,m,1/u,1/m],32),ae.set([B.radius,B.falloff,B.power,this.frameIndex],36),ae.set([f[0],f[5],B.steps,B.slices],40);let ce=v.beginComputePass({label:"gtao"});ce.setPipeline(this.gtaoPipe),ce.setBindGroup(0,i.createBindGroup({layout:this.gtaoPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("gtao",ae)}},{binding:1,resource:d.depth.createView()},{binding:2,resource:d.normal.createView()},{binding:3,resource:(B.blur?d.aoRaw:d.ao).createView()}]})),ce.dispatchWorkgroups(Math.ceil(u/8),Math.ceil(m/8)),B.blur&&(ce.setPipeline(this.aoBlurPipe),ce.setBindGroup(0,i.createBindGroup({layout:this.aoBlurPipe.getBindGroupLayout(0),entries:[{binding:0,resource:d.aoRaw.createView()},{binding:1,resource:d.depth.createView()},{binding:2,resource:d.ao.createView()}]})),ce.dispatchWorkgroups(Math.ceil(u/8),Math.ceil(m/8))),ce.end()}this.decals.upload(),this.particles.update(r),this.particles.upload(t.position);{let B=v.beginRenderPass({label:"main",colorAttachments:[{view:d.hdr.createView(),loadOp:"clear",storeOp:"store",clearValue:[0,0,0,1]}],depthStencilAttachment:{view:d.depth.createView(),depthReadOnly:!0}});B.setBindGroup(0,Kt);for(let ae of bt)B.setPipeline(this.getPipelines(!!ae._skin,ae.material).main),Te(B,ae);B.setPipeline(this.skyPipe),B.draw(3),this.decals.draw(B),B.setBindGroup(0,Kt);for(let ae of De)B.setPipeline(this.getPipelines(!!ae._skin,ae.material).transparent),Te(B,ae);this.particles.draw(B,d.depth),B.end()}let nt=d.history[this.frameIndex&1],Jt=d.history[this.frameIndex+1&1],pt=d.hdr;if(s.taa.enabled){let B=new Float32Array(44);B.set(I,0),B.set(this.prevViewProj,16),B.set([u,m,1/u,1/m],32),B.set([s.taa.feedbackMin,s.taa.feedbackMax,s.taa.velocityWeight,this.historyValid?0:1],36),B.set([x*.5,-y*.5,0,0],40);let ae=v.beginComputePass({label:"taa"});ae.setPipeline(this.taaPipe),ae.setBindGroup(0,i.createBindGroup({layout:this.taaPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("taa",B)}},{binding:1,resource:d.hdr.createView()},{binding:2,resource:nt.createView()},{binding:3,resource:d.velocity.createView()},{binding:4,resource:d.depth.createView()},{binding:5,resource:this.linearClamp},{binding:6,resource:Jt.createView()},{binding:7,resource:{buffer:this.exposureBuf}}]})),ae.dispatchWorkgroups(Math.ceil(u/8),Math.ceil(m/8)),ae.end(),pt=Jt}if(s.dof.enabled&&s.debugView===0){let B=s.dof,ae=m/(2*Math.tan(t.fovY/2)),ce=m/(2*Math.tan(t.viewmodelFovY/2)),ue=new Float32Array([u,m,1/u,1/m,B.apertureMm/1e3,ae,ce,B.maxBlurPx*(m/1080),t.near,t.near*.25,s.viewmodelDepthSqueeze,1,B.focusDistance,B.autoFocus?1:0,B.overrideDistance,B.overrideWeight,Math.min(r,.1),B.focusSpeed,B.minFocus,1.6/Math.max(.25,B.quality)]),ye=this.uniform("dof",ue),ke=v.beginComputePass({label:"dof"});ke.setPipeline(this.dofFocusPipe),ke.setBindGroup(0,i.createBindGroup({layout:this.dofFocusPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:ye}},{binding:1,resource:d.depth.createView()},{binding:2,resource:{buffer:this.dofState}}]})),ke.dispatchWorkgroups(1),ke.setPipeline(this.dofGatherPipe),ke.setBindGroup(0,i.createBindGroup({layout:this.dofGatherPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:ye}},{binding:1,resource:pt.createView()},{binding:2,resource:d.depth.createView()},{binding:3,resource:{buffer:this.dofState}},{binding:4,resource:d.dof.createView()}]})),ke.dispatchWorkgroups(Math.ceil(u/8),Math.ceil(m/8)),ke.end(),pt=d.dof}{let B=s.motionBlur,ae=B.shutterAngle/360,ce=new Float32Array([u,m,1/u,1/m,ae,B.maxPixels,B.samples,B.enabled?1:0]),ue=v.beginComputePass({label:"motionblur"});ue.setPipeline(this.mbPipe),ue.setBindGroup(0,i.createBindGroup({layout:this.mbPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("mb",ce)}},{binding:1,resource:pt.createView()},{binding:2,resource:d.velocity.createView()},{binding:3,resource:d.depth.createView()},{binding:4,resource:this.linearClamp},{binding:5,resource:d.mb.createView()}]})),ue.dispatchWorkgroups(Math.ceil(u/8),Math.ceil(m/8)),ue.end()}let Ie=d.mb;{let B=s.exposure,ae=-10,ce=40,ue=B.ev100;B.mode==="camera"&&(ue=en(t.aperture,t.shutter,t.iso));let ye=v.beginComputePass({label:"exposure"});ye.setPipeline(this.histPipe),ye.setBindGroup(0,i.createBindGroup({layout:this.histPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("hist",new Float32Array([u,m,1/u,1/m,ae,ce,B.centerWeight,0]))}},{binding:1,resource:Ie.createView()},{binding:2,resource:{buffer:this.histBuf}},{binding:3,resource:{buffer:this.exposureBuf}}]})),ye.dispatchWorkgroups(Math.ceil(u/32),Math.ceil(m/32)),ye.setPipeline(this.exposurePipe),ye.setBindGroup(0,i.createBindGroup({layout:this.exposurePipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("expo",new Float32Array([B.mode==="auto"?0:1,ue,B.compensation,Math.min(r,.1),B.minEv100,B.maxEv100,B.speedUp,B.speedDown,B.lowPercent,B.highPercent,ae,ce]))}},{binding:1,resource:{buffer:this.histBuf}},{binding:2,resource:{buffer:this.exposureBuf}}]})),ye.dispatchWorkgroups(1),ye.end()}let Ot=s.bloom;if(Ot.enabled&&d.bloomDown.length>1){let B=v.beginComputePass({label:"bloom"});B.setPipeline(this.bloomDownPipe);let ae=Ie;for(let ue=0;ue<d.bloomDown.length;ue++){let ye=d.bloomDown[ue];B.setBindGroup(0,i.createBindGroup({layout:this.bloomDownPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform(`bd${ue}`,new Float32Array([1/ae.width,1/ae.height,0,0,ue===0?1:0,Ot.clamp,0,0]))}},{binding:1,resource:ae.createView()},{binding:2,resource:this.linearClamp},{binding:3,resource:ye.createView()}]})),B.dispatchWorkgroups(Math.ceil(ye.width/8),Math.ceil(ye.height/8)),ae=ye}B.setPipeline(this.bloomUpPipe);let ce=d.bloomDown.length;for(let ue=ce-2;ue>=0;ue--){let ye=ue===ce-2?d.bloomDown[ce-1]:d.bloomUp[ue+1],ke=d.bloomUp[ue];B.setBindGroup(0,i.createBindGroup({layout:this.bloomUpPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform(`bu${ue}`,new Float32Array([1/ye.width,1/ye.height,0,0,Ot.radius,0,0,0]))}},{binding:1,resource:ye.createView()},{binding:2,resource:d.bloomDown[ue].createView()},{binding:3,resource:this.linearClamp},{binding:4,resource:ke.createView()}]})),B.dispatchWorkgroups(Math.ceil(ke.width/8),Math.ceil(ke.height/8))}B.end()}if(s.debugView>0){let B=v.beginComputePass({label:"debug"});B.setPipeline(this.debugPipe),B.setBindGroup(0,i.createBindGroup({layout:this.debugPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("dbg",new Float32Array([s.debugView,t.near,u,m]))}},{binding:1,resource:d.normal.createView()},{binding:2,resource:d.ao.createView()},{binding:3,resource:d.velocity.createView()},{binding:4,resource:d.depth.createView()},{binding:5,resource:Ie.createView()},{binding:6,resource:{buffer:this.exposureBuf}},{binding:7,resource:d.debug.createView()}]})),B.dispatchWorkgroups(Math.ceil(u/8),Math.ceil(m/8)),B.end()}{let B=s.lens,ae=s.grade,ce=s.sensor,ue=ce.isoCoupled?Math.pow(Math.max(t.iso,50)/100,.25):1,ye=new Float32Array([b,l,1/b,1/l,B.distortion,B.distortion2,B.chromaticAberration,B.fillZoom,B.naturalVignette,B.vignette,B.vignetteRoundness,t.fovY,Ot.enabled?Ot.intensity:0,0,0,0,ce.readNoise,ce.shotNoise,ce.enabled?ue*ce.gain:0,this.frameIndex%1024,ae.contrast,ae.saturation,ae.temperature,ae.tint,ae.lift,ae.gamma,ae.gain,Ui[ae.tonemapper],B.sharpen,ae.dither,s.debugView,ae.exposureBias]),ke=Ot.enabled&&d.bloomUp.length>1?d.bloomUp[0]:Ie,pa=v.beginRenderPass({label:"composite",colorAttachments:[{view:this.outputView(b,l),loadOp:"clear",storeOp:"store",clearValue:[0,0,0,1]}]});pa.setPipeline(this.compositePipe),pa.setBindGroup(0,i.createBindGroup({layout:this.compositePipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("composite",ye)}},{binding:1,resource:Ie.createView()},{binding:2,resource:ke.createView()},{binding:3,resource:this.linearClamp},{binding:5,resource:d.debug.createView()}]})),pa.draw(3),pa.end()}i.queue.submit([v.finish()]),O.copy(this.prevViewProj,T),O.copy(this.prevVmViewProj,L);for(let B of ee)B.visible&&B._endFrame();for(let B of this.skinnedObjects)this.rotateSkin(B);this.historyValid=!0,this.frameIndex++,this.stats.drawCalls=Ce,this.stats.triangles=Re,this.stats.frameMs=performance.now()-a}offscreenOut=null;outputView(e,t){return this.dev.offscreen?((!this.offscreenOut||this.offscreenOut.width!==e||this.offscreenOut.height!==t)&&(this.offscreenOut?.destroy(),this.offscreenOut=this.device.createTexture({size:[e,t],format:"rgba8unorm",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC,label:"offscreen.out"})),this.offscreenOut.createView()):this.dev.context.getCurrentTexture().createView()}async readback(){let e=this.offscreenOut;if(!e)throw new Error("readback requires Renderer.create(canvas, { offscreen: true })");let t=Math.ceil(e.width*4/256)*256,r=this.device.createBuffer({size:t*e.height,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),a=this.device.createCommandEncoder();a.copyTextureToBuffer({texture:e},{buffer:r,bytesPerRow:t},[e.width,e.height]),this.device.queue.submit([a.finish()]),await r.mapAsync(GPUMapMode.READ);let s=new Uint8Array(r.getMappedRange()),i=new Uint8Array(e.width*e.height*4);for(let o=0;o<e.height;o++)i.set(s.subarray(o*t,o*t+e.width*4),o*e.width*4);return r.unmap(),r.destroy(),{width:e.width,height:e.height,data:i}}resetHistory(){this.historyValid=!1}updateSkin(e){let t=e.joints,r=t.length/16;if(!e._skin||e._skin.count!==r){let a=Math.max(64,t.byteLength);e._skin?.cur.destroy(),e._skin?.prev.destroy();let s=this.dev.createBuffer(a,GPUBufferUsage.STORAGE,"joints"),i=this.dev.createBuffer(a,GPUBufferUsage.STORAGE,"joints.prev",t);e._skin={cur:s,prev:i,bg:null,count:r},this.skinnedObjects.add(e)}this.device.queue.writeBuffer(e._skin.cur,0,t)}updateInstances(e){let t=e.instances,r=Math.max(64,e.instanceCount*64);if(!e._inst||e._inst.cap<r){e._inst?.buf.destroy();let a=Math.max(r,(e._inst?.cap??0)*2);e._inst={buf:this.dev.createBuffer(a,GPUBufferUsage.STORAGE,"instances"),bg:null,cap:a},e.instancesDirty=!0}e.instancesDirty&&e.instanceCount>0&&(this.device.queue.writeBuffer(e._inst.buf,0,t,0,e.instanceCount*16),e.instancesDirty=!1)}instBG(e){let t=e._inst;return t.bg||(t.bg=this.makeObjectBG(t.buf,t.buf)),t.bg}skinBG(e){let t=e._skin;return t.bg||(t.bg=this.makeObjectBG(t.cur,t.prev)),t.bg}rotateSkin(e){!e._skin||!e.joints||this.device.queue.writeBuffer(e._skin.prev,0,e.joints)}};var Oi=1;function Ct(n){return{id:Oi++,name:n}}var Oa=class{nextEntity=1;alive=new Set;stores=new Map;names=new Map;onDespawn=[];onRemove=new Map;spawn(e){let t=this.nextEntity++;return this.alive.add(t),e&&this.names.set(t,e),t}despawn(e){if(this.alive.has(e)){for(let t of this.onDespawn)t(e);for(let[t,r]of this.stores)if(r.has(e)){let a=r.get(e);r.delete(e);for(let s of this.onRemove.get(t)??[])s(e,a)}this.alive.delete(e),this.names.delete(e)}}isAlive(e){return this.alive.has(e)}nameOf(e){return this.names.get(e)??`entity#${e}`}get entityCount(){return this.alive.size}add(e,t,r){let a=this.stores.get(t.id);return a||(a=new Map,this.stores.set(t.id,a)),a.set(e,r),r}get(e,t){return this.stores.get(t.id)?.get(e)}require(e,t){let r=this.get(e,t);if(r===void 0)throw new Error(`${this.nameOf(e)} has no ${t.name}`);return r}has(e,t){return this.stores.get(t.id)?.has(e)??!1}remove(e,t){let r=this.stores.get(t.id);if(!r?.has(e))return;let a=r.get(e);r.delete(e);for(let s of this.onRemove.get(t.id)??[])s(e,a)}onRemoved(e,t){let r=this.onRemove.get(e.id)??[];r.push(t),this.onRemove.set(e.id,r)}*query(...e){let t=e.map(a=>this.stores.get(a.id));if(t.some(a=>!a))return;let r=0;for(let a=1;a<t.length;a++)t[a].size<t[r].size&&(r=a);for(let a of[...t[r].keys()]){let s=[a],i=!0;for(let o of t){if(!o.has(a)){i=!1;break}s.push(o.get(a))}i&&(yield s)}}entities(){return this.alive.values()}};var Na=class{position=h.create();rotation=K.create();scale=h.create(1,1,1);parent=null;local=O.create();world=O.create();version=0;worldVersion=-1;parentVersion=-1;constructor(e,t,r){e&&h.copy(this.position,e),t&&K.copy(this.rotation,t),r&&h.copy(this.scale,r)}touch(){this.version++}setPosition(e,t,r){return h.set(this.position,e,t,r),this.version++,this}setRotation(e){return K.copy(this.rotation,e),this.version++,this}setEuler(e,t,r=0){return K.fromEuler(this.rotation,e,t,r),this.version++,this}get stamp(){return this.version+(this.parent?this.parent.stamp*31:0)}getWorld(){let e=this.parent?this.parent.stamp:0;return(this.worldVersion!==this.version||this.parentVersion!==e)&&(O.fromRotationTranslationScale(this.local,this.rotation,this.position,this.scale),this.parent?O.multiply(this.world,this.parent.getWorld(),this.local):O.copy(this.world,this.local),this.worldVersion=this.version,this.parentVersion=e),this.world}worldPosition(e=h.create()){return O.getTranslation(e,this.getWorld())}worldRotation(e=K.create()){return O.getRotation(e,this.getWorld())}forward(e=h.create()){let t=this.getWorld();return h.normalize(e,h.set(e,-t[8],-t[9],-t[10]))}right(e=h.create()){let t=this.getWorld();return h.normalize(e,h.set(e,t[0],t[1],t[2]))}up(e=h.create()){let t=this.getWorld();return h.normalize(e,h.set(e,t[4],t[5],t[6]))}transformPoint(e,t=h.create()){return h.transformMat4(t,e,this.getWorld())}},aa=Ct("Transform");var ra=Ct("Scripts");var Ca=class{down=new Set;pressed=new Set;released=new Set;mouseDown=new Set;mousePressed=new Set;mouseReleased=new Set;padPrev=[];mouseDX=0;mouseDY=0;wheel=0;sensitivity=.075;invertY=!1;bindings=new Map;locked=!1;gamepad=null;padLookSpeed=160;deadzone=.12;target;constructor(e){this.target=e,addEventListener("keydown",t=>{t.repeat||(this.down.add(t.code),this.pressed.add(t.code),this.locked&&["Tab","Space","KeyF","Backquote"].includes(t.code)&&t.preventDefault())}),addEventListener("keyup",t=>{this.down.delete(t.code),this.released.add(t.code)}),addEventListener("blur",()=>{this.down.clear(),this.mouseDown.clear()}),e.addEventListener("mousedown",t=>{this.mouseDown.add(t.button),this.mousePressed.add(t.button)}),addEventListener("mouseup",t=>{this.mouseDown.delete(t.button),this.mouseReleased.add(t.button)}),addEventListener("mousemove",t=>{this.locked&&(this.mouseDX+=t.movementX,this.mouseDY+=t.movementY)}),addEventListener("wheel",t=>{this.wheel+=Math.sign(t.deltaY)},{passive:!0}),e.addEventListener("contextmenu",t=>t.preventDefault()),document.addEventListener("pointerlockchange",()=>{this.locked=document.pointerLockElement===this.target}),this.defaultBindings()}async lock(){try{await this.target.requestPointerLock.call(this.target,{unadjustedMovement:!0})}catch{try{await this.target.requestPointerLock()}catch{}}}unlock(){document.exitPointerLock()}defaultBindings(){let e=(t,r)=>this.bindings.set(t,r);e("forward",{keys:["KeyW"]}),e("back",{keys:["KeyS"]}),e("left",{keys:["KeyA"]}),e("right",{keys:["KeyD"]}),e("sprint",{keys:["ShiftLeft"],gamepadButtons:[10]}),e("crouch",{keys:["KeyC","ControlLeft"],gamepadButtons:[1]}),e("jump",{keys:["Space"],gamepadButtons:[0]}),e("fire",{mouse:[0],gamepadButtons:[7]}),e("aim",{mouse:[2],gamepadButtons:[6]}),e("reload",{keys:["KeyR"],gamepadButtons:[2]}),e("fireMode",{keys:["KeyX"],gamepadButtons:[12]}),e("leanLeft",{keys:["KeyQ"],gamepadButtons:[4]}),e("leanRight",{keys:["KeyE"],gamepadButtons:[5]}),e("earpro",{keys:["KeyV"]}),e("camera",{keys:["KeyH"]}),e("tuning",{keys:["F1","Backquote"]}),e("holdBreath",{keys:["AltLeft"],gamepadButtons:[11]})}padButton(e){return!!this.gamepad?.buttons[e]?.pressed}action(e){let t=this.bindings.get(e);return t?(t.keys?.some(r=>this.down.has(r))??!1)||(t.mouse?.some(r=>this.mouseDown.has(r))??!1)||(t.gamepadButtons?.some(r=>this.padButton(r))??!1):!1}actionPressed(e){let t=this.bindings.get(e);return t?(t.keys?.some(r=>this.pressed.has(r))??!1)||(t.mouse?.some(r=>this.mousePressed.has(r))??!1)||(t.gamepadButtons?.some(r=>this.padButton(r)&&!this.padPrev[r])??!1):!1}actionReleased(e){let t=this.bindings.get(e);return t?(t.keys?.some(r=>this.released.has(r))??!1)||(t.mouse?.some(r=>this.mouseReleased.has(r))??!1):!1}key(e){return this.down.has(e)}keyPressed(e){return this.pressed.has(e)}moveAxis(){let e=(this.action("right")?1:0)-(this.action("left")?1:0),t=(this.action("forward")?1:0)-(this.action("back")?1:0);if(this.gamepad){let a=this.gamepad.axes[0]??0,s=this.gamepad.axes[1]??0;Math.hypot(a,s)>this.deadzone&&(e+=a,t-=s)}let r=Math.hypot(e,t);return r>1&&(e/=r,t/=r),{x:e,y:t}}lookDelta(e){let t=this.sensitivity*Math.PI/180,r=-this.mouseDX*t,a=-this.mouseDY*t*(this.invertY?-1:1);if(this.gamepad){let s=this.gamepad.axes[2]??0,i=this.gamepad.axes[3]??0,o=this.padLookSpeed*Math.PI/180*e;Math.abs(s)>this.deadzone&&(r-=Math.sign(s)*(Math.abs(s)-this.deadzone)/(1-this.deadzone)*o),Math.abs(i)>this.deadzone&&(a-=Math.sign(i)*(Math.abs(i)-this.deadzone)/(1-this.deadzone)*o)}return{yaw:r,pitch:a}}rumble(e,t,r){this.gamepad?.vibrationActuator?.playEffect?.("dual-rumble",{duration:r,strongMagnitude:Math.min(1,e),weakMagnitude:Math.min(1,t)})}poll(){let e=navigator.getGamepads?.()??[];this.gamepad=e.find(t=>t&&t.connected)??null}endFrame(){this.pressed.clear(),this.released.clear(),this.mousePressed.clear(),this.mouseReleased.clear(),this.mouseDX=0,this.mouseDY=0,this.wheel=0,this.gamepad&&(this.padPrev=this.gamepad.buttons.map(e=>e.pressed))}};var mt={gl:"fondaineGL",vorp:"vorp",oaxis:"oAxis"},Da=class n{hub;storageKey;module;constructor(e="fondaine.tuning",t=mt.gl,r){this.storageKey=e,this.module=t,this.hub=r??{params:[],listeners:[]}}get params(){return this.hub.params}scope(e){return new n(this.storageKey,e,this.hub)}get modules(){return[...new Set(this.hub.params.map(e=>e.module))]}k(e,t){return`${this.module}:${e}.${t}`}number(e,t,r,a){return this.hub.params.push({module:this.module,group:e,key:this.k(e,r),label:a.label??r,kind:"number",min:a.min,max:a.max,step:a.step??(a.max-a.min)/200,unit:a.unit,help:a.help,get:()=>t[r],set:s=>{t[r]=Number(s),a.onChange?.(Number(s)),this.emit()}}),this}bool(e,t,r,a={}){return this.hub.params.push({module:this.module,group:e,key:this.k(e,r),label:a.label??r,kind:"bool",help:a.help,get:()=>t[r],set:s=>{t[r]=!!s,a.onChange?.(!!s),this.emit()}}),this}choice(e,t,r,a,s={}){return this.hub.params.push({module:this.module,group:e,key:this.k(e,r),label:s.label??r,kind:"enum",options:a,help:s.help,get:()=>t[r],set:i=>{t[r]=String(i),s.onChange?.(String(i)),this.emit()}}),this}arrayValue(e,t,r,a){return this.hub.params.push({module:this.module,group:e,key:this.k(e,a.key),label:a.label,kind:"number",min:a.min,max:a.max,step:a.step??(a.max-a.min)/200,unit:a.unit,help:a.help,get:()=>t[r],set:s=>{t[r]=Number(s),a.onChange?.(),this.emit()}}),this}groups(e=this.module){return[...new Set(this.hub.params.filter(t=>t.module===e).map(t=>t.group))]}unregister(e,t=this.module){for(let r=this.hub.params.length-1;r>=0;r--)this.hub.params[r].module===t&&this.hub.params[r].group===e&&this.hub.params.splice(r,1)}onChange(e){this.hub.listeners.push(e)}emit(){for(let e of this.hub.listeners)e()}snapshot(e=this.module){let t={};for(let r of this.hub.params)(e==="*"||r.module===e)&&(t[r.key]=r.get());return t}apply(e){for(let t of this.hub.params)t.key in e&&t.set(e[t.key])}save(e="default",t=this.module){try{localStorage.setItem(`${this.storageKey}.${t}.${e}`,JSON.stringify(this.snapshot(t)))}catch{}}load(e="default",t=this.module){try{let r=localStorage.getItem(`${this.storageKey}.${t}.${e}`);return r?(this.apply(JSON.parse(r)),!0):!1}catch{return!1}}exportJSON(e=this.module){return JSON.stringify(this.snapshot(e),null,2)}};var Ni=`
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
`,Ba=class{constructor(e,t="fondaine"){this.tuning=e;if(!document.getElementById("fdui-css")){let s=document.createElement("style");s.id="fdui-css",s.textContent=Ni,document.head.appendChild(s)}this.root=document.createElement("div"),this.root.className="fdui",this.root.style.display="none",this.root.innerHTML=`<header><span class="logo">/f</span><b>${t}</b><span style="margin-left:auto;color:#6f747d">F1 to close</span></header>`,this.statsEl=document.createElement("div"),this.statsEl.className="stats",this.mods=document.createElement("div"),this.mods.className="mods",this.tabs=document.createElement("div"),this.tabs.className="tabs",this.body=document.createElement("div"),this.body.className="body";let r=document.createElement("footer"),a=(s,i)=>{let o=document.createElement("button");o.textContent=s,o.onclick=i,r.appendChild(o)};a("Save",()=>e.save("default",this.module)),a("Load",()=>{e.load("default",this.module),this.refresh()}),a("Export JSON",()=>{let s=new Blob([e.exportJSON(this.module)],{type:"application/json"}),i=document.createElement("a");i.href=URL.createObjectURL(s),i.download=`${this.module}-tuning.json`,i.click()}),a("Import JSON",()=>{let s=document.createElement("input");s.type="file",s.accept=".json",s.onchange=async()=>{let i=s.files?.[0];i&&(e.apply(JSON.parse(await i.text())),this.refresh())},s.click()}),this.root.append(this.statsEl,this.mods,this.tabs,this.body,r),document.body.appendChild(this.root);for(let s of["keydown","mousedown","wheel"])this.root.addEventListener(s,i=>i.stopPropagation())}root;body;statsEl;tabs;mods;module="";group="";inputs=new Map;visible=!1;statsText=()=>"";toggle(e=!this.visible){this.visible=e,this.root.style.display=e?"flex":"none",e&&this.rebuild()}rebuild(){let e=this.tuning.modules;(!this.module||!e.includes(this.module))&&(this.module=e[0]??""),this.mods.innerHTML="";for(let r of e){let a=document.createElement("button");a.textContent=r,r===this.module&&(a.className="on"),a.onclick=()=>{this.module=r,this.group="",this.rebuild()},this.mods.appendChild(a)}let t=this.tuning.groups(this.module);(!this.group||!t.includes(this.group))&&(this.group=t[0]??""),this.tabs.innerHTML="";for(let r of t){let a=document.createElement("button");a.textContent=r,r===this.group&&(a.className="on"),a.onclick=()=>{this.group=r,this.rebuild()},this.tabs.appendChild(a)}this.body.innerHTML="",this.inputs.clear();for(let r of this.tuning.params.filter(a=>a.module===this.module&&a.group===this.group))this.body.appendChild(this.row(r))}row(e){let t=document.createElement("div");t.className="row";let r=document.createElement("label");if(r.textContent=e.unit?`${e.label} (${e.unit})`:e.label,r.title=e.help??e.key,t.appendChild(r),e.kind==="number"){let a=document.createElement("input");a.type="range",a.min=String(e.min),a.max=String(e.max),a.step=String(e.step??.01);let s=document.createElement("input");s.type="number",s.step=String(e.step??.01);let i=()=>{let o=Number(e.get());a.value=String(o),s.value=String(+o.toPrecision(5))};a.oninput=()=>{e.set(Number(a.value)),s.value=String(+Number(a.value).toPrecision(5))},s.onchange=()=>{e.set(Number(s.value)),a.value=s.value},i(),this.inputs.set(e.key,i),t.append(a,s)}else if(e.kind==="bool"){let a=document.createElement("input");a.type="checkbox",a.checked=!!e.get(),a.onchange=()=>e.set(a.checked),this.inputs.set(e.key,()=>{a.checked=!!e.get()}),t.append(a,document.createElement("span"))}else{let a=document.createElement("select");for(let s of e.options??[]){let i=document.createElement("option");i.value=s,i.textContent=s,a.appendChild(i)}a.value=String(e.get()),a.onchange=()=>e.set(a.value),this.inputs.set(e.key,()=>{a.value=String(e.get())}),t.append(a,document.createElement("span"))}if(e.help){let a=document.createElement("div");a.className="help",a.textContent=e.help,t.appendChild(a)}return t}refresh(){for(let e of this.inputs.values())e()}update(){this.visible&&(this.statsEl.textContent=this.statsText())}};var Sr=class{constructor(e,t,r,a){this.p=e;this.id=t;this.radius=r;this.height=a}setPosition(e,t,r){this.p.ex.fp_character_set_position(this.id,e,t,r)}move(e,t,r){let a=this.p.ex.fp_character_move(this.id,e,t,r),s=this.p.result(8);return{position:h.create(s[0],s[1],s[2]),grounded:(a&1)!==0,ceiling:(a&2)!==0,wall:(a&4)!==0,groundNormal:h.create(s[3],s[4],s[5]),groundMaterial:s[6]}}setHeight(e){let t=this.p.ex.fp_character_set_height(this.id,e)===1;return t&&(this.height=e),t}remove(){this.p.ex.fp_character_remove(this.id)}},Pr=class{constructor(e,t){this.p=e;this.id=t}setTransform(e,t=[0,0,0,1]){this.p.ex.fp_body_set_transform(this.id,e[0],e[1],e[2],t[0],t[1],t[2],t[3])}setVelocity(e,t=[0,0,0]){this.p.ex.fp_body_set_velocity(this.id,e[0],e[1],e[2],t[0],t[1],t[2])}applyImpulse(e,t){this.p.ex.fp_body_apply_impulse(this.id,e[0],e[1],e[2],t[0],t[1],t[2])}remove(){this.p.ex.fp_body_remove(this.id)}state(){return this.p.bodyState(this.id)}get alive(){return this.state()[0]>.5}},Va=class n{ex;stride=15;onProjectileHit=[];onContact=[];constructor(e){this.ex=e,this.stride=e.fp_body_stride?.()??15}static async load(e){let t=await(await fetch(e)).arrayBuffer();return n.fromBytes(t)}static async fromBytes(e){let t=await WebAssembly.compile(e),r={};for(let s of WebAssembly.Module.imports(t))r[s.module]??={},r[s.module][s.name]=s.kind==="function"?()=>0:void 0;let a=await WebAssembly.instantiate(t,r);return new n(a.exports)}f32(e,t){return new Float32Array(this.ex.memory.buffer,e,t)}result(e){return this.f32(this.ex.fp_result_ptr(),e)}withF32(e,t){let r=e.length*4,a=this.ex.fp_alloc(r);this.f32(a,e.length).set(e);try{return t(a)}finally{this.ex.fp_free(a,r)}}setMaterial(e,t){this.ex.fp_set_material(e,t.friction??.6,t.restitution??.2,t.ricochetAngleDeg??0,t.ricochetEnergyKeep??.3)}reset(){this.ex.fp_world_reset()}staticMeshes=[];addStaticMesh(e,t,r){this.staticMeshes.push({positions:Float32Array.from(e),indices:Uint32Array.from(t),material:r});let a=e.length/3,s=t.length,i=a*12,o=s*4,c=this.ex.fp_alloc(i),b=this.ex.fp_alloc(o);this.f32(c,e.length).set(e),new Uint32Array(this.ex.memory.buffer,b,s).set(t);let l=this.ex.fp_add_static_mesh(c,a,b,s,r);return this.ex.fp_free(c,i),this.ex.fp_free(b,o),l}addGeometry(e,t,r){let a=e.positions,s=new Float32Array(a.length),i=h.create();for(let o=0;o<a.length;o+=3)h.transformMat4(i,a.subarray(o,o+3),t),s.set(i,o);return this.addStaticMesh(s,e.indices,r)}build(){this.ex.fp_build()}raycast(e,t,r,a=!0){if(!this.ex.fp_raycast(e[0],e[1],e[2],t[0],t[1],t[2],r,a?1:0))return null;let i=this.result(10);return{t:i[0],point:h.create(i[1],i[2],i[3]),normal:h.create(i[4],i[5],i[6]),material:i[7],triangle:i[8],body:i[9]}}raycastBatch(e,t){let r=e.length/6,a=this.ex.fp_alloc(r*4),s=this.withF32(e,i=>(this.ex.fp_raycast_batch(i,r,t,a),this.f32(a,r).slice()));return this.ex.fp_free(a,r*4),s}bakeSkyVisibility(e,t,r,a,s,i=48,o=60){let c=r*a*s,b=this.ex.fp_alloc(c*4);this.ex.fp_bake_sky_visibility(e[0],e[1],e[2],t,r,a,s,i,o,b);let l=this.f32(b,c).slice();return this.ex.fp_free(b,c*4),l}bakeGI(e){let t=e.nx*e.ny*e.nz,r=t*12*4,a=108,s=Math.max(4,e.albedo.length*4),i=this.ex.fp_alloc(r),o=this.ex.fp_alloc(a),c=this.ex.fp_alloc(s);this.f32(o,27).set(Array.from(e.skySH).slice(0,27)),this.f32(c,e.albedo.length).set(e.albedo);let b=this.ex.fp_bake_gi(e.min[0],e.min[1],e.min[2],e.cell,e.nx,e.ny,e.nz,e.rays??192,e.passes??3,e.sunDir[0],e.sunDir[1],e.sunDir[2],e.sunRGB[0],e.sunRGB[1],e.sunRGB[2],o,c,Math.floor(e.albedo.length/3),e.maxDist??400,i),l=this.f32(i,t*12).slice();return this.ex.fp_free(i,r),this.ex.fp_free(o,a),this.ex.fp_free(c,s),{data:l,filled:b}}giPositions(e,t,r,a,s){let i=e.nx*e.ny*e.nz,o=this.ex.fp_alloc(i*12),c=this.ex.fp_alloc(Math.max(4,i));this.ex.fp_gi_positions(e.min[0],e.min[1],e.min[2],e.cell,e.nx,e.ny,e.nz,e.rays,t,r,o,c);let b=t*e.nx*e.ny,l=Math.min(e.nz,r)*e.nx*e.ny;a.set(this.f32(o+b*12,(l-b)*3),b*3),s.set(new Uint8Array(this.ex.memory.buffer,c+b,l-b),b),this.ex.fp_free(o,i*12),this.ex.fp_free(c,Math.max(4,i))}giPass(e,t,r,a,s,i,o,c){let b=e.nx*e.ny*e.nz,l={pos:b*12,valid:Math.max(4,b),prev:b*48,out:b*48,sh:108,al:Math.max(4,e.albedo.length*4)},u=this.ex.fp_alloc(l.pos),m=this.ex.fp_alloc(l.valid),d=this.ex.fp_alloc(l.out),v=this.ex.fp_alloc(l.sh),p=this.ex.fp_alloc(l.al),M=s?this.ex.fp_alloc(l.prev):0;this.f32(u,b*3).set(r),new Uint8Array(this.ex.memory.buffer,m,b).set(a),s&&this.f32(M,b*12).set(s),this.f32(v,27).set(Array.from(e.skySH).slice(0,27)),this.f32(p,e.albedo.length).set(e.albedo),this.ex.fp_gi_pass(e.min[0],e.min[1],e.min[2],e.cell,e.nx,e.ny,e.nz,e.rays,t,e.sunDir[0],e.sunDir[1],e.sunDir[2],e.sunRGB[0],e.sunRGB[1],e.sunRGB[2],v,p,Math.floor(e.albedo.length/3),e.maxDist??400,u,m,M,i,o,d);let g=i*e.nx*e.ny,w=Math.min(e.nz,o)*e.nx*e.ny;c.set(this.f32(d+g*48,(w-g)*12),g*12),this.ex.fp_free(u,l.pos),this.ex.fp_free(m,l.valid),this.ex.fp_free(d,l.out),this.ex.fp_free(v,l.sh),this.ex.fp_free(p,l.al),s&&this.ex.fp_free(M,l.prev)}createCharacter(e,t,r=.35,a=50){return new Sr(this,this.ex.fp_character_create(e,t,r,a),e,t)}createBody(e,t,r,a){return new Pr(this,this.ex.fp_body_create(e,t[0],t[1],t[2],r,a))}bodyState(e){let t=this.ex.fp_bodies_ptr();return this.f32(t+e*this.stride*4,this.stride)}setGravity(e,t,r){this.ex.fp_set_gravity(e,t,r)}setAtmosphere(e,t,r,a){this.ex.fp_set_atmosphere(e,t,r,a[0],a[1],a[2])}spawnProjectile(e,t,r){return this.ex.fp_projectile_spawn(e[0],e[1],e[2],t[0],t[1],t[2],r.bcG7,r.massKg,r.diameterM,r.maxTime??6,r.userId??0)}projectiles(){let e=this.ex.fp_projectile_count();if(!e)return[];let t=this.f32(this.ex.fp_projectiles_ptr(),e*8),r=[];for(let a=0;a<e;a++){let s=a*8;r.push({id:t[s],userId:t[s+1],position:h.create(t[s+2],t[s+3],t[s+4]),velocity:h.create(t[s+5],t[s+6],t[s+7])})}return r}step(e){this.ex.fp_step(e);let t=this.ex.fp_projectile_hit_count();if(t&&this.onProjectileHit.length){let a=this.f32(this.ex.fp_projectile_hits_ptr(),t*16).slice();for(let s=0;s<t;s++){let i=s*16,o={userId:a[i],point:h.create(a[i+1],a[i+2],a[i+3]),normal:h.create(a[i+4],a[i+5],a[i+6]),velocity:h.create(a[i+7],a[i+8],a[i+9]),material:a[i+10],distance:a[i+11],timeOfFlight:a[i+12],body:a[i+13],ricochet:a[i+14]>.5,projectileId:a[i+15]};for(let c of this.onProjectileHit)c(o)}}let r=this.ex.fp_contact_count();if(r&&this.onContact.length){let a=this.f32(this.ex.fp_contacts_ptr(),r*10).slice();for(let s=0;s<r;s++){let i=s*10,o={body:a[i],point:h.create(a[i+1],a[i+2],a[i+3]),normal:h.create(a[i+4],a[i+5],a[i+6]),impulse:a[i+7],speed:a[i+8],otherMaterial:a[i+9]};for(let c of this.onContact)c(o)}}}};var Z=(n,e,t,r,a,s="",i="",o)=>({key:n,label:e,def:t,min:r,max:a,unit:s,help:i,step:o}),Tr=[Z("peakSpl","Peak SPL @1 m",158,120,180,"dB","Muzzle-blast peak sound pressure level 1 m from the muzzle, on axis. Rifles \u2248 155\u2013165, pistols \u2248 150\u2013160."),Z("positiveMs","Positive phase",1,.1,5,"ms","Friedlander positive-phase duration at 1 m. Longer = bigger charge / longer barrel gas release.",.01),Z("decayB","Blast decay (b)",1.4,.3,5,"","Friedlander waveform decay constant. Higher = sharper, smaller negative phase.",.01),Z("precursorDb","Precursor",-14,-60,0,"dB","Level of the precursor shock (air column ahead of the bullet) relative to the main blast."),Z("precursorLeadMs","Precursor lead",.35,0,2,"ms","How far the precursor leads the main blast.",.01),Z("turbDb","Gas plume roar",-6,-60,0,"dB","Turbulent propellant-gas noise relative to the blast peak."),Z("turbMs","Roar decay (T60)",260,2,800,"ms","Time for the gas roar to fall 60 dB (a quieter late tail at 3\xD7 this follows)."),Z("turbHp","Roar highpass",120,20,2e3,"Hz"),Z("turbLp","Roar lowpass",5500,500,16e3,"Hz"),Z("bodyDb","Body (perceived boom)",-11,-60,0,"dB",'Low-frequency chest/room "boom" (two partials with a soft-saturated attack). \u221260 for a purely measured (thin) signature.'),Z("bodyHz","Body frequency",62,20,400,"Hz"),Z("bodyMs","Body decay (T60)",280,5,1e3,"ms"),Z("bodyDrop","Body pitch drop",.35,0,2,"","Initial pitch overshoot that glides down to the body frequency.",.01),Z("suppress","Suppressor",0,0,1,"","Suppressor amount (0 none \u2026 1 full can).",.01),Z("suppRedDb","Suppressor reduction",28,0,45,"dB","Peak reduction a full suppressor provides (good cans: 25\u201335 dB)."),Z("firstPopDb","First-round pop",0,0,10,"dB","Extra level on the first suppressed shot (oxygen in the can). Set by the weapon at runtime."),Z("variation","Shot-to-shot variation",.5,0,1,"","Random variation of level, duration and spectrum per shot.",.01),Z("seed","Seed",0,0,1e5,"","Randomised per shot by the host.",1),Z("brightHz","Brightness",16e3,1e3,2e4,"Hz","Final band-limit (anti-alias / mic bandwidth)."),Z("directivityDb","Directivity (front\u2212rear)",9,0,20,"dB","How much louder the blast is in front of the muzzle than behind it."),Z("rearLpHz","Rear darkening",4500,200,2e4,"Hz","Lowpass applied towards the rear of the muzzle (shooter\u2019s own ears are rear-ish)."),Z("tailSendDb","Environment send",0,-40,12,"dB","Adjusts how much this weapon excites reflections / reverb."),Z("crackDb","Report (snap)",-4,-90,6,"dB","Sharp band-limited report burst that gives each gun its character (relative to the blast peak)."),Z("crackHz","Report pitch",3400,300,9e3,"Hz","Pistols \u2248 2\u20132.5 kHz (hard snap), 5.56 \u2248 4\u20135 kHz (crack), big rifles \u2248 2.5 kHz."),Z("crackMs","Report decay (T60)",10,1,200,"ms"),Z("subDb","Sub thump",-13,-90,6,"dB","Sub-bass pressure pulse you feel in your chest (relative to the blast peak)."),Z("subHz","Sub frequency",40,15,150,"Hz"),Z("subMs","Sub decay (T60)",360,5,1e3,"ms"),Z("driveDb","Spike compaction",12,0,30,"dB","Soft-clips the instantaneous blast spike (only the spike) this far below its peak so the 50\u2013300 ms body carries the loudness (how a shot feels, not how a microphone peaks).")],Fn=[Z("levelSpl","Peak SPL @1 m",120,60,170,"dB"),Z("attackMs","Attack",.5,.01,50,"ms","",.01),Z("decayMs","Decay (T60)",120,1,3e3,"ms"),Z("hpHz","Highpass",200,20,8e3,"Hz"),Z("lpHz","Lowpass",5e3,200,2e4,"Hz"),Z("thumpHz","Thump frequency",90,20,400,"Hz"),Z("thumpDb","Thump level",-6,-60,12,"dB"),Z("thumpMs","Thump decay",60,2,1e3,"ms"),Z("grainsPerS","Grain density",0,0,3e3,"/s","Granular crackle (gravel, dry grass, debris)."),Z("grainDb","Grain level",-10,-60,6,"dB"),Z("seed","Seed",0,0,1e5,"","",1),Z("resonance","Filter Q",.7,.3,8,"","",.01),Z("hit2Ms","Second hit delay",0,0,500,"ms","Two-stage clicks / bounces: the envelope re-triggers this long after the first hit."),Z("hit2Db","Second hit level",-200,-200,12,"dB","Relative to the first hit; \u2212200 = none.")],na=[Z("protection","Hearing protection",0,0,2,"","0 none, 1 passive earmuffs, 2 electronic earmuffs",1),Z("passiveAttenDb","Passive attenuation",25,0,40,"dB","Real-world muff/plug attenuation (\u2248 NRR \u2212 7)."),Z("passiveHfExtraDb","Extra HF attenuation",10,0,30,"dB"),Z("elecGainDb","Electronic gain",6,0,24,"dB","Ambient amplification of electronic muffs."),Z("elecLimitSpl","Electronic limit",82,70,95,"dB SPL","Output limit of electronic muffs (most cut at ~82 dB)."),Z("ttsThresholdSpl","Damage threshold (peak)",130,110,150,"dB SPL","Impulses above this cause a temporary threshold shift."),Z("ttsRate","TTS rate",.15,0,2,"dB/dB","dB of threshold shift per dB above threshold per impulse.",.01),Z("ttsMaxDb","Max TTS",18,0,60,"dB"),Z("ttsRecoveryS","Recovery time constant",10,.5,600,"s","Real-world recovery takes hours; games use 10\u201360 s."),Z("tinnitusHz","Tinnitus frequency",5200,1e3,12e3,"Hz"),Z("tinnitusDb","Tinnitus level",-46,-80,-6,"dBFS","Ear ringing after loud exposure, at full TTS. \u221280 = off. \u221246 is a faint ring after a long unprotected string; \u221230 is loud and obvious."),Z("tinnitusTtsDb","Tinnitus full at TTS",20,1,40,"dB"),Z("reflexThresholdSpl","Acoustic reflex threshold",95,70,120,"dB SPL"),Z("reflexMaxDb","Reflex max attenuation",6,0,30,"dB"),Z("reflexAttackMs","Reflex latency",90,5,300,"ms"),Z("reflexReleaseMs","Reflex release",900,50,5e3,"ms"),Z("muffle","Muffling amount",1,0,2,"","How strongly TTS dulls and quiets hearing.",.01),Z("enable","Hearing model",1,0,1,"","",1),Z("dullRecoveryMs","Post-shot dulling recovery",350,20,3e3,"ms","After every impulse over the damage threshold the highs drop for a moment and recover with this time constant."),Z("dullHz","Dulling cutoff",4e3,800,12e3,"Hz","Lowpass cutoff at full post-shot dulling.")],sa=[Z("calibrationSpl","Calibration (SPL @ 0 dBFS)",112,70,140,"dB SPL","Acoustic level that maps to digital full scale before dynamics. Lower = everything louder. 112 keeps footsteps/casings 35\u201340 dB under a shot."),Z("compThresholdDb","Loudness threshold",-6,-60,0,"dBFS"),Z("compRatio","Loudness ratio",2.6,1,20,":1","Perceptual compression of the 110+ dB real-world range into a playable range. Only shots and very close impacts cross the threshold.",.1),Z("compKneeDb","Knee",6,0,24,"dB"),Z("compAttackMs","Attack",.3,.05,100,"ms","Fast: every onset is measured on its own level, so full-auto shots never duck each other.",.05),Z("compReleaseMs","Release",90,10,3e3,"ms","Release after a brief peak; sustained loudness releases \u2248 4\xD7 slower (program-dependent), so the world stays ducked after a shot and recovers smoothly."),Z("limitCeilingDb","Limiter ceiling",-.3,-12,0,"dBFS","",.1),Z("limitReleaseMs","Limiter release",12,1,500,"ms","Release after an isolated peak (sustained limiting releases slower)."),Z("masterDb","Master volume",0,-60,12,"dB"),Z("busWeaponsDb","Weapons bus",0,-60,12,"dB"),Z("busImpactsDb","Impacts bus",0,-60,12,"dB"),Z("busEnvDb","Environment bus",0,-60,12,"dB"),Z("busUiDb","UI bus",0,-60,12,"dB"),Z("erLevelDb","Early reflections",0,-40,12,"dB"),Z("reverbLevelDb","Late reverb",0,-40,12,"dB"),Z("convMix","Convolution mix",0,0,1,"","0 = algorithmic FDN, 1 = convolution IR",.01),Z("headRadiusM","Head radius",.0875,.06,.12,"m","",5e-4),Z("spatialEnable","Binaural",1,0,1,"","",1),Z("compDetectorMs","Loudness integration",2,0,100,"ms","RMS window of the loudness detector (0 = peak)."),Z("clipKneeDb","Saturation knee",-4,-24,-.1,"dBFS","Above this, the output saturates smoothly towards full scale: density instead of a 1 ms tick under a limiter.",.1),Z("makeupDb","Make-up gain",0,-12,24,"dB","Overall loudness after the perceptual compressor. Raise for an even louder mix."),Z("satAsym","Saturation asymmetry",.5,0,1,"","Positive half-cycles clip earlier than negative ones (even harmonics: the crunch of an overdriven ear / camera limiter).",.01),Z("satDullHz","Overload dulling cutoff",4500,800,16e3,"Hz","While the saturator is driven a lowpass drops towards this cutoff \u2014 the brief HF loss right after an overload."),Z("satDullMs","Overload dulling recovery",45,2,500,"ms")],ia=[Z("rt60Low","RT60 low",1.2,.05,12,"s","",.01),Z("rt60Mid","RT60 mid",1,.05,12,"s","",.01),Z("rt60High","RT60 high",.5,.05,12,"s","",.01),Z("xoverLow","Low crossover",250,50,1e3,"Hz"),Z("xoverHigh","High crossover",4e3,1e3,12e3,"Hz"),Z("size","Size",1,.1,8,"","Delay scale \u2248 room dimensions.",.01),Z("diffusion","Diffusion",.7,0,1,"","",.01),Z("predelayMs","Predelay",12,0,240,"ms"),Z("modDepthMs","Modulation depth",.35,0,3,"ms","",.01),Z("modRateHz","Modulation rate",.6,.05,5,"Hz","",.01),Z("levelDb","Level",0,-40,12,"dB"),Z("toneHz","Tone",9e3,1e3,2e4,"Hz")],oa=[Z("windSpl","Wind level",48,0,90,"dB SPL"),Z("windGust","Gustiness",.5,0,1,"","",.01),Z("windGustRate","Gust rate",.15,.01,2,"Hz","",.01),Z("windToneHz","Wind tone",600,100,3e3,"Hz"),Z("rumbleSpl","Distant rumble",38,0,80,"dB SPL"),Z("enable","Ambience",1,0,1,"","",1)],ge={LISTENER:1,SPAWN:2,VOICE_POS:3,VOICE_TAPS:4,VOICE_OCCLUSION:5,VOICE_STOP:6,ATMOSPHERE:7,REVERB:8,HEARING:9,MASTER:10,AMBIENCE:11,VOICE_SEND:12,RESET_HEARING:13},Rt={GUNSHOT:1,NWAVE:2,MODAL:3,NOISE:4,SAMPLE:5},Ae={VOICE_ID:0,KIND:1,BUS:2,PX:3,DX:6,DIRECTIVITY_DB:9,REAR_LP_HZ:10,DISTANCE_MODE:11,MIN_DIST:12,REVERB_SEND_DB:13,SPATIAL:14,DELAY_MS:15,HEADER:16},$e={WEAPONS:0,IMPACTS:1,ENV:2,UI:3},_e={PEAK_L:0,PEAK_R:1,SCENE_SPL:2,TTS:3,COMP_GR:4,LIMIT_GR:5,VOICES:6,REFLEX_GR:7,TINNITUS:8,EAR_SPL:9,SPEED_OF_SOUND:10,TIME:11,MAX_EAR_SPL:12,SAT_CUTOFF_HZ:13};function xt(n,e={}){let t=new Float32Array(n.length);return n.forEach((r,a)=>{t[a]=e[r.key]??r.def}),t}var En=n=>331.3*Math.sqrt(1+n/273.15);function Un(n){let e=Math.max(n.mach,1.0001),t=Math.max(n.missDistance,.05),r=n.ambientPa??101325,a=n.c??343,s=Math.pow(e*e-1,.125),i=r*.53*s*n.diameter/(Math.pow(t,.75)*Math.pow(n.length,.25)),o=1.82*e*Math.pow(t,.25)*n.diameter/(a*Math.pow(e*e-1,.375)*Math.pow(n.length,.25));return{peakPa:i,duration:o}}function ca(n=1){let e=[1180,2230,3410,4870,6620,8900,11200],t=[.06,.05,.04,.032,.025,.018,.012],r=[.55,.6,.5,.36,.27,.18,.1];return e.map((a,s)=>({freq:a*n,t60:t[s],amp:r[s]}))}function On(n,e,t=1,r=0){let a=n.slice(0,48),s=e.slice(0,8),i=new Float32Array(4+a.length*3+s.length*4);i[0]=t,i[1]=a.length,i[2]=s.length,i[3]=r,a.forEach((c,b)=>{i[4+b*3]=c.freq,i[5+b*3]=c.t60,i[6+b*3]=c.amp});let o=4+a.length*3;return s.forEach((c,b)=>{i[o+b*4]=c.timeMs,i[o+b*4+1]=c.amp,i[o+b*4+2]=c.contactMs,i[o+b*4+3]=c.noiseDb??-200}),i}var Nn=n=>-20*Math.log10(Math.max(n,.1)),Cn=(n,e)=>.057*Math.sqrt(n/Math.max(e,.05));var Ha={rifle556_16in:{name:'5.56\xD745 \u2014 16" carbine',params:{peakSpl:160,positiveMs:.9,decayB:1.6,crackDb:-2,crackHz:4200,crackMs:8,turbDb:-5,turbMs:360,turbHp:150,turbLp:6500,bodyDb:-9,bodyHz:70,bodyMs:320,bodyDrop:.4,subDb:-12,subHz:44,subMs:420,driveDb:12,directivityDb:9,rearLpHz:5e3,tailSendDb:4},action:{brightness:1.35,level:1.4,hits:[{timeMs:-3,amp:.15,contactMs:.05,noiseDb:-14},{timeMs:3,amp:1.1,contactMs:.12,noiseDb:-6},{timeMs:40,amp:.5,contactMs:.3,noiseDb:-14},{timeMs:72,amp:1.5,contactMs:.09,noiseDb:-3}]},samples:{shot:["shot.rifle556"],shotTail:["shot.rifle556.mid"],auto:["shot.rifle556.auto"],suppressed:["shot.rifle556.suppressed","shot.suppressed"]}},rifle556_10in:{name:'5.56\xD745 \u2014 10.3" SBR',params:{peakSpl:163,positiveMs:1.1,decayB:1.5,crackDb:-1,crackHz:3800,crackMs:10,turbDb:-3,turbMs:380,turbHp:140,turbLp:5500,bodyDb:-7,bodyHz:60,bodyMs:380,bodyDrop:.4,subDb:-9,subHz:42,subMs:480,driveDb:14,directivityDb:7,rearLpHz:6500,tailSendDb:5},action:{brightness:1.3,level:1.4,hits:[{timeMs:-3,amp:.15,contactMs:.05,noiseDb:-14},{timeMs:2.5,amp:1.2,contactMs:.12,noiseDb:-6},{timeMs:36,amp:.5,contactMs:.3,noiseDb:-14},{timeMs:64,amp:1.6,contactMs:.09,noiseDb:-3}]},samples:{shot:["shot.rifle556"],shotTail:["shot.rifle556.mid"],auto:["shot.rifle556.auto"],suppressed:["shot.rifle556.suppressed","shot.suppressed"]}},rifle308_bolt:{name:'.308 Win \u2014 20" bolt action',params:{peakSpl:163,positiveMs:1.4,decayB:1.3,crackDb:-4,crackHz:2600,crackMs:12,turbDb:-5,turbMs:360,turbHp:110,turbLp:4800,bodyDb:-6,bodyHz:50,bodyMs:450,bodyDrop:.35,subDb:-7,subHz:34,subMs:560,driveDb:13,directivityDb:10,rearLpHz:4500,tailSendDb:6},action:{brightness:.85,level:.6,hits:[{timeMs:-4,amp:.45,contactMs:.06,noiseDb:-10}]},samples:{shot:["shot.rifle308","shot.rifle3006"],shotTail:["shot.rifle3006.mid"]}},pistol9mm:{name:'9\xD719 \u2014 4" pistol',params:{peakSpl:157,positiveMs:.6,decayB:1.7,crackDb:-1,crackHz:2300,crackMs:7,turbDb:-6,turbMs:200,turbHp:200,turbLp:6e3,bodyDb:-12,bodyHz:100,bodyMs:170,bodyDrop:.5,subDb:-20,subHz:55,subMs:160,driveDb:11,directivityDb:6,rearLpHz:7e3,precursorDb:-20,tailSendDb:4},action:{brightness:.95,level:1.3,hits:[{timeMs:-2,amp:.25,contactMs:.05,noiseDb:-12},{timeMs:4,amp:.9,contactMs:.1,noiseDb:-6},{timeMs:14,amp:1.1,contactMs:.09,noiseDb:-4}]},samples:{shot:["shot.pistol9"],shotTail:["shot.pistol9.mid"],suppressed:["shot.pistol9.suppressed","shot.suppressed"]}},pistol9mm_auto:{name:'9\xD719 \u2014 4" select-fire pistol',params:{peakSpl:157,positiveMs:.6,decayB:1.7,crackDb:-1,crackHz:2400,crackMs:6,turbDb:-5,turbMs:140,turbHp:200,turbLp:6500,bodyDb:-12,bodyHz:105,bodyMs:150,bodyDrop:.5,subDb:-19,subHz:58,subMs:140,driveDb:11,directivityDb:6,rearLpHz:7e3,precursorDb:-20,tailSendDb:3},action:{brightness:1,level:1.3,hits:[{timeMs:-2,amp:.25,contactMs:.05,noiseDb:-12},{timeMs:4,amp:.9,contactMs:.1,noiseDb:-6},{timeMs:12,amp:1,contactMs:.09,noiseDb:-4}]},samples:{shot:["shot.pistol9"],shotTail:["shot.pistol9.mid"],auto:["shot.smg9"],suppressed:["shot.pistol9.suppressed","shot.suppressed"]}}},zl={outdoorRange:{name:"Outdoor range (open field, berms)",reverb:{rt60Low:1.1,rt60Mid:.75,rt60High:.25,xoverLow:300,xoverHigh:2500,size:2.6,diffusion:.7,predelayMs:20,modDepthMs:.4,modRateHz:.4,levelDb:-3,toneHz:4500},criticalDistance:32,ambience:{windSpl:46,windGust:.55,windGustRate:.12,windToneHz:520,rumbleSpl:36,enable:1},farReflectors:[{azimuth:0,distance:140,reflectivity:.22,lowpassHz:2e3},{azimuth:75,distance:230,reflectivity:.15,lowpassHz:1600},{azimuth:-80,distance:190,reflectivity:.17,lowpassHz:1600},{azimuth:180,distance:300,reflectivity:.12,lowpassHz:1400}]},coveredRange:{name:"Covered firing point (roof, baffles, open field beyond)",reverb:{rt60Low:1.8,rt60Mid:1.2,rt60High:.45,xoverLow:300,xoverHigh:3e3,size:1.6,diffusion:.85,predelayMs:10,modDepthMs:.35,modRateHz:.5,levelDb:0,toneHz:6e3},criticalDistance:8,ambience:{windSpl:44,windGust:.5,windGustRate:.12,windToneHz:480,rumbleSpl:36,enable:1},farReflectors:[{azimuth:0,distance:140,reflectivity:.22,lowpassHz:2e3},{azimuth:75,distance:230,reflectivity:.15,lowpassHz:1600},{azimuth:-80,distance:190,reflectivity:.17,lowpassHz:1600}]},indoorRange:{name:"Indoor range (concrete, baffles)",reverb:{rt60Low:1.4,rt60Mid:1.1,rt60High:.6,xoverLow:250,xoverHigh:4e3,size:1.2,diffusion:.8,predelayMs:8,modDepthMs:.3,modRateHz:.6,levelDb:0,toneHz:8e3},criticalDistance:Cn(200*3.5,1.1),ambience:{windSpl:0,windGust:0,windGustRate:.1,windToneHz:500,rumbleSpl:42,enable:1}},forest:{name:"Forest",reverb:{rt60Low:1.8,rt60Mid:1.5,rt60High:.6,xoverLow:300,xoverHigh:3e3,size:4,diffusion:.9,predelayMs:25,modDepthMs:.5,modRateHz:.3,levelDb:0,toneHz:4500},criticalDistance:18,ambience:{windSpl:50,windGust:.7,windGustRate:.18,windToneHz:900,rumbleSpl:30,enable:1}}},Dn=n=>Nn(n.criticalDistance),Wa={dirt:{levelSpl:112,attackMs:.3,decayMs:90,hpHz:80,lpHz:2500,thumpHz:70,thumpDb:0,thumpMs:70,grainsPerS:900,grainDb:-14,resonance:.7},gravel:{levelSpl:116,attackMs:.2,decayMs:110,hpHz:300,lpHz:7e3,thumpHz:90,thumpDb:-8,thumpMs:40,grainsPerS:2200,grainDb:-6,resonance:.8},concrete:{levelSpl:124,attackMs:.05,decayMs:45,hpHz:900,lpHz:11e3,thumpHz:140,thumpDb:-10,thumpMs:20,grainsPerS:1500,grainDb:-10,resonance:1.1},wood:{levelSpl:118,attackMs:.1,decayMs:70,hpHz:250,lpHz:5e3,thumpHz:180,thumpDb:-2,thumpMs:50,grainsPerS:300,grainDb:-14,resonance:1.6},paper:{levelSpl:98,attackMs:.05,decayMs:25,hpHz:1500,lpHz:9e3,thumpHz:200,thumpDb:-30,thumpMs:10,grainsPerS:0,grainDb:-30,resonance:.7},cardboard:{levelSpl:104,attackMs:.08,decayMs:40,hpHz:400,lpHz:5e3,thumpHz:120,thumpDb:-6,thumpMs:30,grainsPerS:0,grainDb:-30,resonance:1.2}};var Bn={magRelease:{sample:"mech.magRelease",noise:{levelSpl:62,attackMs:.15,decayMs:22,hpHz:1800,lpHz:9500,thumpHz:420,thumpDb:-10,thumpMs:7,resonance:1.3},ring:{brightness:1.4,level:.1,hits:[{timeMs:0,amp:.25,contactMs:.06,noiseDb:-8}]}},magOut:{sample:"mech.magOut",noise:{levelSpl:58,attackMs:8,decayMs:140,hpHz:500,lpHz:6e3,thumpDb:-40,grainsPerS:350,grainDb:-14,resonance:.8}},magDropConcrete:{sample:"mech.magDropConcrete",noise:{levelSpl:86,attackMs:.08,decayMs:60,hpHz:220,lpHz:7500,thumpHz:150,thumpDb:3,thumpMs:38,grainsPerS:500,grainDb:-10,resonance:1.1,hit2Ms:48,hit2Db:-9},ring:{brightness:.55,level:.15,hits:[{timeMs:0,amp:.6,contactMs:.25,noiseDb:-6}]}},magDropDirt:{sample:"mech.magDropDirt",noise:{levelSpl:76,attackMs:.6,decayMs:85,hpHz:70,lpHz:2400,thumpHz:72,thumpDb:5,thumpMs:65,grainsPerS:700,grainDb:-16,resonance:.75}},magSeat:{sample:"mech.magSeat",noise:{levelSpl:68,attackMs:.1,decayMs:34,hpHz:650,lpHz:8500,thumpHz:230,thumpDb:-3,thumpMs:22,resonance:1,hit2Ms:35,hit2Db:-2},ring:{brightness:1.15,level:.11,hits:[{timeMs:0,amp:.6,contactMs:.08,noiseDb:-6},{timeMs:35,amp:.5,contactMs:.06,noiseDb:-8}]}},slideRack:{sample:"mech.slideRack",noise:{levelSpl:62,attackMs:5,decayMs:125,hpHz:750,lpHz:7800,thumpDb:-40,grainsPerS:1100,grainDb:-7,resonance:.9},ring:{brightness:1.25,level:.075,hits:[{timeMs:0,amp:.35,contactMs:.05,noiseDb:-10}]}},slideStop:{sample:"mech.slideStop",noise:{levelSpl:66,attackMs:.08,decayMs:40,hpHz:480,lpHz:9500,thumpHz:270,thumpDb:-2,thumpMs:18,resonance:1},ring:{brightness:1.1,level:.095,hits:[{timeMs:0,amp:.9,contactMs:.07,noiseDb:-6}]}},slideHome:{sample:"mech.slideHome",noise:{levelSpl:72,attackMs:.05,decayMs:58,hpHz:280,lpHz:10500,thumpHz:175,thumpDb:2,thumpMs:30,resonance:1,hit2Ms:7,hit2Db:-9},ring:{brightness:1,level:.085,hits:[{timeMs:0,amp:1.5,contactMs:.09,noiseDb:-3}]}},chargingHandle:{sample:"mech.chargingHandle",noise:{levelSpl:64,attackMs:1.5,decayMs:95,hpHz:600,lpHz:7200,thumpDb:-40,grainsPerS:600,grainDb:-10,resonance:.9,hit2Ms:65,hit2Db:-3},ring:{brightness:1.3,level:.07,hits:[{timeMs:0,amp:.3,contactMs:.05,noiseDb:-10},{timeMs:65,amp:.7,contactMs:.07,noiseDb:-6}]}},boltCatch:{sample:"mech.boltCatch",noise:{levelSpl:66,attackMs:.08,decayMs:28,hpHz:950,lpHz:9500,thumpHz:320,thumpDb:-8,thumpMs:12,resonance:1.2},ring:{brightness:1.35,level:.075,hits:[{timeMs:0,amp:.4,contactMs:.04,noiseDb:-8}]}},selector:{sample:"mech.selector",noise:{levelSpl:60,attackMs:.1,decayMs:20,hpHz:1500,lpHz:9e3,thumpDb:-40,resonance:1.2,hit2Ms:16,hit2Db:2},ring:{brightness:1.75,level:.025,hits:[{timeMs:0,amp:.55,contactMs:.035,noiseDb:-8},{timeMs:16,amp:.85,contactMs:.03,noiseDb:-6}]}},dryFire:{sample:"mech.dryFire",noise:{levelSpl:62,attackMs:.05,decayMs:18,hpHz:1200,lpHz:9e3,thumpHz:350,thumpDb:-12,thumpMs:8,resonance:1.1},ring:{brightness:1.5,level:.075,hits:[{timeMs:0,amp:.2,contactMs:.04,noiseDb:-10}]}}},Vn={levelSpl:45,attackMs:150,decayMs:420,hpHz:340,lpHz:1900,thumpDb:-60,grainsPerS:0,grainDb:-60,resonance:1.7};var Ci=2e-5,Di=n=>Ci*Math.pow(10,n/20),Bi=(n,e)=>n===e||n.startsWith(e+".")&&/^\d+$/.test(n.slice(e.length+1)),zr=class{buf=new Float32Array(4096);len=0;push(e,t){let r=this.len+2+t.length;if(r>this.buf.length){let a=new Float32Array(Math.max(r,this.buf.length*2));a.set(this.buf.subarray(0,this.len)),this.buf=a}this.buf[this.len++]=e,this.buf[this.len++]=t.length;for(let a=0;a<t.length;a++)this.buf[this.len++]=t[a]}take(){if(!this.len)return null;let e=this.buf.slice(0,this.len);return this.len=0,e}},Rr=class{constructor(e,t){this.v=e;this.id=t}setPosition(e,t){this.v.cmd(ge.VOICE_POS,t?[this.id,e[0],e[1],e[2],t[0],t[1],t[2]]:[this.id,e[0],e[1],e[2]])}setTaps(e){this.v.setTaps(this.id,e)}setOcclusion(e,t){this.v.cmd(ge.VOICE_OCCLUSION,[this.id,e,t])}setSend(e){this.v.cmd(ge.VOICE_SEND,[this.id,e])}stop(e=30){this.v.cmd(ge.VOICE_STOP,[this.id,e])}},Lr=class{params={hearing:xt(na),master:xt(sa),reverb:xt(ia),ambience:xt(oa)};zoneSendDb=-30;shotWet={recordedSendCutDb:9,tailDb:-14,burstWindowS:.25,burstDuckDb:2,burstDuckMaxDb:6,burstChokeMs:160};burst={t:-1e9,n:0,voices:[]};clock(){return 0}zone=null;atmosphere={tempC:15,humidity:.6,pressureKpa:101.325};cmdb=new zr;nextId=1;random=Math.random;samples=new Map;lastPick=new Map;nextSampleId=1;cmd(e,t){this.cmdb.push(e,t)}registerSample(e,t,r,a={}){let s=t;a.trimMs&&a.trimMs>0&&(s=s.subarray(Math.min(s.length,Math.round(a.trimMs/1e3*r)))),Math.abs(r-this.engineRate)>.5&&(s=Vi(s,r,this.engineRate));let i=0;for(let l=0;l<s.length;l++){let u=Math.abs(s[l]);u>i&&(i=u)}let c=this.samples.get(e)?.id??this.nextSampleId++,b={id:c,slot:e,peak:Math.max(i,1e-6),frames:s.length,gainDb:a.gainDb??0,loop:!!a.loop};return this.uploadSample(c,s),this.samples.set(e,b),b}samplesFor(e){let t=Array.isArray(e)?e:[e],r=[];for(let[a,s]of this.samples)t.some(i=>Bi(a,i))&&r.push(s);return r}hasSample(e){return this.samplesFor(e).length>0}pickSample(e,t){let r=this.lastPick.get(e),a=Math.min(t.length-1,this.random()*t.length|0);return t.length>1&&t[a].id===r&&(a=(a+1+Math.min(t.length-2,this.random()*(t.length-1)|0))%t.length),this.lastPick.set(e,t[a].id),t[a]}playSample(e,t,r,a={}){let s=Di(r+e.gainDb)/e.peak,i=Math.pow(2,(a.semitones??0)/12);return this.sample(e.id,t,s,{...a,rate:i,loop:a.loop??e.loop})}sampleAt(e,t,r,a={}){let s=this.samplesFor(e);if(!s.length)return null;let i=a.variation??1,o=this.pickSample(Array.isArray(e)?e.join("|"):e,s);return this.playSample(o,t,r+(this.random()*2-1)*i,{...a,semitones:(this.random()*2-1)*i})}loopSample(e,t,r={}){return this.sampleAt(e,[0,0,0],t,{bus:$e.ENV,spatial:!1,reverbSendDb:-90,variation:0,loop:!0,...r})}setListener(e,t,r){this.cmd(ge.LISTENER,[e[0],e[1],e[2],t[0],t[1],t[2],r[0],r[1],r[2]])}setAtmosphere(e,t,r=101.325){this.atmosphere={tempC:e,humidity:t,pressureKpa:r},this.cmd(ge.ATMOSPHERE,[e,t,r])}setHearing(e){this.setGroup(na,this.params.hearing,e,ge.HEARING)}setMaster(e){this.setGroup(sa,this.params.master,e,ge.MASTER)}setReverb(e){this.setGroup(ia,this.params.reverb,e,ge.REVERB)}setAmbience(e){this.setGroup(oa,this.params.ambience,e,ge.AMBIENCE)}resetHearing(){this.cmd(ge.RESET_HEARING,[])}setZone(e){this.zone=e,this.zoneSendDb=Dn(e),this.setReverb(e.reverb),this.setAmbience(e.ambience)}applyAll(){this.cmd(ge.HEARING,this.params.hearing),this.cmd(ge.MASTER,this.params.master),this.cmd(ge.REVERB,this.params.reverb),this.cmd(ge.AMBIENCE,this.params.ambience),this.cmd(ge.ATMOSPHERE,[this.atmosphere.tempC,this.atmosphere.humidity,this.atmosphere.pressureKpa])}setGroup(e,t,r,a){e.forEach((s,i)=>{r[s.key]!==void 0&&(t[i]=r[s.key])}),this.cmd(a,t)}seed(){return this.random()*1e5|0}spawn(e,t,r,a={}){let s=this.nextId++;this.nextId>16e6&&(this.nextId=1);let i=new Float32Array(Ae.HEADER+r.length);i[Ae.VOICE_ID]=s,i[Ae.KIND]=e,i[Ae.BUS]=a.bus??$e.WEAPONS,i[Ae.PX]=t[0],i[Ae.PX+1]=t[1],i[Ae.PX+2]=t[2];let o=a.dir??[0,0,-1];return i[Ae.DX]=o[0],i[Ae.DX+1]=o[1],i[Ae.DX+2]=o[2],i[Ae.DIRECTIVITY_DB]=a.directivityDb??0,i[Ae.REAR_LP_HZ]=a.rearLpHz??2e4,i[Ae.DISTANCE_MODE]=a.distanceMode??0,i[Ae.MIN_DIST]=a.minDistance??.1,i[Ae.REVERB_SEND_DB]=a.reverbSendDb??this.zoneSendDb,i[Ae.SPATIAL]=a.spatial===!1?0:1,i[Ae.DELAY_MS]=a.delayMs??0,i.set(r,Ae.HEADER),this.cmd(ge.SPAWN,i),new Rr(this,s)}gunshot(e,t,r,a,s={},i={}){let o={...e.params,seed:this.seed(),...s},b=-Math.min(0,...e.action.hits.map(P=>P.timeMs)),l=this.shotWet,u=this.clock(),m=u+(i.delayMs??0)/1e3,d=m-this.burst.t,v=d>=0&&d<l.burstWindowS;if(v&&l.burstChokeMs>0&&this.burst.t<=u)for(let P of this.burst.voices)P.stop(l.burstChokeMs);this.burst.n=v?this.burst.n+1:0,this.burst.t=m;let p=Math.min(l.burstDuckMaxDb,l.burstDuckDb*this.burst.n),M=(o.tailSendDb??0)-p,g={...i,dir:r,directivityDb:o.directivityDb,rearLpHz:o.rearLpHz,delayMs:(i.delayMs??0)+b,reverbSendDb:(i.reverbSendDb??this.zoneSendDb)+M},w=e.samples,x=Math.max(0,Math.min(1,o.suppress??0)),y=[];w&&(x>.5&&w.suppressed&&(y=this.samplesFor(w.suppressed)),!y.length&&(s.auto??0)>.5&&w.auto&&(y=this.samplesFor(w.auto)),y.length||(y=this.samplesFor(w.shot)));let k=[],f=null,A=null;if(y.length){let P=f=this.pickSample(e.name,y),T=o.peakSpl-(o.suppRedDb??28)*x+(o.firstPopDb??0)*x+(e.sampleTrimDb??0)+(this.random()*2-1),R=(g.reverbSendDb??this.zoneSendDb)-l.recordedSendCutDb;k.push(this.playSample(P,t,T,{...g,reverbSendDb:R,semitones:this.random()*2-1}));let L=w?.shotTail?this.samplesFor(w.shotTail):[];L.length&&k.push(this.playSample(this.pickSample(e.name+"/tail",L),t,T+(e.sampleTailDb??l.tailDb)-p,{...g,reverbSendDb:-90,semitones:(this.random()*2-1)*.5}));let z=e.synthBedDb??-16;if(z>-90){let j={...o,peakSpl:o.peakSpl+z,crackDb:-90,precursorDb:-90,turbDb:(o.turbDb??-6)-12};A=this.spawn(Rt.GUNSHOT,t,xt(Tr,j),g)}else A=k[0]}else A=this.spawn(Rt.GUNSHOT,t,xt(Tr,o),g);let S=null;if(a&&e.action.hits.length){let P=ca(e.action.brightness),T=e.action.hits.map(R=>({...R,timeMs:R.timeMs+b}));S=this.modal(P,T,a,e.action.level,{...i,delayMs:i.delayMs??0})}return this.burst.voices=k,{blast:A,action:S,samples:k,take:f,duckDb:p}}modal(e,t,r,a=1,s={}){return this.spawn(Rt.MODAL,r,On(e,t,a,this.seed()),{bus:$e.IMPACTS,...s})}noise(e,t,r={}){return this.spawn(Rt.NOISE,t,xt(Fn,{seed:this.seed(),...e}),{bus:$e.IMPACTS,...r})}mech(e,t,r={}){let a=Bn[e],s=a.sample?this.sampleAt(a.sample,t,(a.noise.levelSpl??70)+10+(a.sampleDb??0),{bus:$e.IMPACTS,...r}):null,i=s??this.noise(a.noise,t,r),o=a.ring&&!s?this.modal(ca(a.ring.brightness),a.ring.hits,t,a.ring.level,r):null;return{noise:i,ring:o,recorded:s!==null}}impact(e,t,r=0,a={}){let s={...Wa[e]??Wa.dirt};return s.levelSpl=(s.levelSpl??110)+r,this.sampleAt(`impact.${e}`,t,s.levelSpl,{bus:$e.IMPACTS,...a})??this.noise(s,t,{bus:$e.IMPACTS,...a})}breath(e,t={}){return this.noise(Vn,e,t)}crack(e,t,r,a={}){return this.spawn(Rt.NWAVE,r,[e,t,20],{distanceMode:1,...a})}sample(e,t,r,a={}){return this.spawn(Rt.SAMPLE,t,[e,a.rate??1,r,a.loop?1:0,a.offsetS??0],a)}setTaps(e,t){let r=Math.min(t.length,10),a=new Float32Array(2+r*6);a[0]=e,a[1]=r;for(let s=0;s<r;s++){let i=t[s],o=2+s*6;a[o]=i.path,a[o+1]=i.gain,a[o+2]=i.lowpassHz,a[o+3]=i.dir[0],a[o+4]=i.dir[1],a[o+5]=i.dir[2]}this.cmd(ge.VOICE_TAPS,a)}},qa=class n extends Lr{ctx;node;module;meters={peakL:-120,peakR:-120,sceneSpl:0,tts:0,compGr:0,limitGr:0,voices:0,reflexGr:0,tinnitus:0,earSpl:0,speedOfSound:343,time:0,cpu:0};onError=e=>console.error("[vorp]",e);constructor(e,t,r){super(),this.ctx=e,this.node=t,this.module=r,t.port.onmessage=a=>{let s=a.data;if(s.type==="meters"){let i=s.meters;Object.assign(this.meters,{peakL:i[_e.PEAK_L],peakR:i[_e.PEAK_R],sceneSpl:i[_e.SCENE_SPL],tts:i[_e.TTS],compGr:i[_e.COMP_GR],limitGr:i[_e.LIMIT_GR],voices:i[_e.VOICES],reflexGr:i[_e.REFLEX_GR],tinnitus:i[_e.TINNITUS],earSpl:i[_e.EAR_SPL],speedOfSound:i[_e.SPEED_OF_SOUND],time:i[_e.TIME],cpu:s.cpu})}else s.type==="error"&&this.onError(s.message)}}static async create(e){let t=e.context??new AudioContext({latencyHint:e.latencyHint??"interactive"}),[r]=await Promise.all([WebAssembly.compileStreaming(fetch(e.wasmUrl)).catch(async()=>WebAssembly.compile(await(await fetch(e.wasmUrl)).arrayBuffer())),t.audioWorklet.addModule(e.workletUrl)]),a=new AudioWorkletNode(t,"vorp",{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[2],processorOptions:{module:r}});a.connect(t.destination);let s=new n(t,a,r);return s.applyAll(),s}async resume(){this.ctx.state!=="running"&&await this.ctx.resume()}clock(){return this.ctx.currentTime}get engineRate(){return this.ctx.sampleRate}uploadSample(e,t){let r=t.slice();this.node.port.postMessage({type:"sample",id:e,data:r},[r.buffer])}flush(){let e=this.cmdb.take();e&&this.node.port.postMessage({type:"cmd",data:e},[e.buffer])}async loadSample(e,t){let r=await this.ctx.decodeAudioData(await(await fetch(t)).arrayBuffer()),a=new Float32Array(r.length);for(let s=0;s<r.numberOfChannels;s++){let i=r.getChannelData(s);for(let o=0;o<i.length;o++)a[o]+=i[o]/r.numberOfChannels}this.node.port.postMessage({type:"sample",id:e,data:a},[a.buffer])}async loadSamples(e,t="",r){let a=Object.entries(e.sounds??{}),s=[];return await Promise.all(a.map(async([i,o])=>{try{let c=r?.get(i);if(!c){let u=await fetch(t+o.file);if(!u.ok)throw new Error(`${u.status} ${u.statusText}`);c=await u.arrayBuffer()}let b=await this.ctx.decodeAudioData(c.slice(0)),l=new Float32Array(b.length);for(let u=0;u<b.numberOfChannels;u++){let m=b.getChannelData(u);for(let d=0;d<m.length;d++)l[d]+=m[d]/b.numberOfChannels}this.registerSample(i,l,b.sampleRate,{gainDb:o.gainDb,loop:o.loop,trimMs:o.trimMs}),s.push(i)}catch(c){console.warn(`[vorp] recorded sound "${i}" (${o.file}) not loaded:`,c)}})),s.sort(),console.info(`[vorp] recorded sounds: ${s.length}/${a.length} loaded${s.length?" \u2014 "+s.join(", "):""}`),s}async loadImpulseResponse(e,t=1){let r=await this.ctx.decodeAudioData(await(await fetch(e)).arrayBuffer()),a=r.getChannelData(0).slice(),s=r.numberOfChannels>1?r.getChannelData(1).slice():null;this.node.port.postMessage({type:"ir",left:a,right:s},s?[a.buffer,s.buffer]:[a.buffer]),this.setMaster({convMix:t})}};function Vi(n,e,t){let r=Math.max(1,Math.round(n.length*t/e)),a=new Float32Array(r),s=e/t;for(let i=0;i<r;i++){let o=i*s,c=Math.min(n.length-1,o|0),b=o-c,l=n[c],u=n[Math.min(n.length-1,c+1)];a[i]=l+(u-l)*b}return a}var _a=class{constructor(e,t){this.physics=e;this.urls=t}vorp=null;settings={reflections:!0,probeRays:14,probeDistance:45,occlusion:!0,occlusionDb:-14,occlusionLowpassHz:1100,cracks:!0,windAmbience:!0,ambienceBeds:!0};surfaces=new Map;listener={position:h.create(),forward:h.create(0,0,-1),up:h.create(0,1,0)};zone=null;zoneOrigin=h.create();pending=[];creating=null;crackDone=new Set;prevProj=new Map;tempC=18;async start(){if(this.vorp)return await this.vorp.resume(),this.vorp;this.creating||(this.creating=qa.create({wasmUrl:this.urls.wasm,workletUrl:this.urls.worklet}).then(t=>{this.vorp=t,this.zone&&t.setZone(this.zone),t.setAtmosphere(this.tempC,.55);for(let r of this.pending)r();return this.pending=[],t}));let e=await this.creating;return await e.resume(),e}whenReady(e){this.vorp?e():this.pending.push(e)}sounds=new Set;beds=[];async loadSoundAssets(e,t){let r,a=t;if(typeof e=="string"){a??=e.slice(0,e.lastIndexOf("/")+1);try{let c=await fetch(e,{cache:"no-cache"});if(!c.ok)return[];r=await c.json()}catch{return[]}}else r=e;a??="";let s=Object.entries(r.sounds??{});if(!s.length)return[];let i=new Map;await Promise.all(s.map(async([c,b])=>{try{let l=await fetch(a+b.file);l.ok?i.set(c,await l.arrayBuffer()):console.warn(`[audio] recorded sound "${c}": ${a+b.file} \u2192 ${l.status}`)}catch(l){console.warn(`[audio] recorded sound "${c}" not fetched`,l)}}));let o={sounds:Object.fromEntries(s.filter(([c])=>i.has(c)))};return this.whenReady(()=>{this.vorp.loadSamples(o,a,i).then(c=>{for(let b of c)this.sounds.add(b);this.startBeds()})}),[...i.keys()]}startBeds(){let e=this.vorp;if(!e||!this.settings.ambienceBeds||this.beds.length)return;let t=e.loopSample("amb.birds",52);t&&this.beds.push(t);let r=e.loopSample("amb.wind",48);r&&this.beds.push(r)}setZone(e){this.zone=e,this.vorp?.setZone(e),this.lastWind&&this.setWind(...this.lastWind)}lastWind=null;setWind(e,t,r){if(this.lastWind=[e,t,r],!this.settings.windAmbience)return;let a=e<.05?0:28+26*Math.log10(1+e),s=450+60*e;this.whenReady(()=>this.vorp?.setAmbience({windSpl:a,windGust:t,windGustRate:r,windToneHz:s}))}surface(e){return this.surfaces.get(e)??{reflection:.8,lowpassHz:6e3}}update(e){e.forward(this.listener.forward),e.up(this.listener.up),h.copy(this.listener.position,e.position);let t=this.vorp;t&&(t.setListener(this.listener.position,this.listener.forward,this.listener.up),this.settings.cracks&&this.physics&&this.trackCracks(t),t.flush())}computeTaps(e,t,r=0){let a=this.physics,s=this.listener.position,i=[],o=h.clone(e),c=t?h.normalize(h.create(),h.clone(t)):null,b=u=>{if(!c||r<=0)return 1;let m=h.dot(c,u);return Math.pow(10,-r*(1-m)*.5/20)},l=(u,m,d,v)=>{let p=h.sub(h.create(),s,u),M=h.length(p);if(M<.2)return;let g=h.dot(p,d);if(Math.abs(g)<1e-5)return;let w=h.dot(h.sub(h.create(),m,u),d)/g;if(w<=0||w>=1)return;let x=h.scaleAndAdd(h.create(),u,p,w),y=h.normalize(h.create(),h.sub(h.create(),x,o)),k=h.normalize(h.create(),h.sub(h.create(),x,s)),f=this.surface(v),A=f.reflection*b(y)/M;i.push({path:M,gain:A,lowpassHz:f.lowpassHz,dir:k,energy:A*A})};if(a&&this.settings.reflections){let u=a.raycast(o,[0,-1,0],50,!1);u&&l(h.scaleAndAdd(h.create(),o,u.normal,-2*h.dot(h.sub(h.create(),o,u.point),u.normal)),u.point,u.normal,u.material);let m=this.settings.probeRays;for(let d=0;d<m;d++){let v=2.399963*d,p=d===m-1?1:d/(m-1)*.9-.25,M=Math.sqrt(Math.max(0,1-p*p)),g=h.create(Math.cos(v)*M,p,Math.sin(v)*M),w=a.raycast(s,g,this.settings.probeDistance,!1);if(!w||w.t<.3)continue;let x=w.normal,y=h.dot(h.sub(h.create(),o,w.point),x);if(y<=0)continue;let k=h.scaleAndAdd(h.create(),o,x,-2*y);l(k,w.point,x,w.material)}}for(let u of this.zone?.farReflectors??[]){let m=u.azimuth*Math.PI/180,d=h.create(this.zoneOrigin[0]+Math.sin(m)*u.distance,o[1],this.zoneOrigin[2]-Math.cos(m)*u.distance),v=h.distance(o,d)+h.distance(d,s),p=h.normalize(h.create(),h.sub(h.create(),d,o)),M=h.normalize(h.create(),h.sub(h.create(),d,s)),g=u.reflectivity*b(p)/v;i.push({path:v,gain:g,lowpassHz:u.lowpassHz,dir:M,energy:g*g})}return i.sort((u,m)=>m.energy-u.energy),i.slice(0,10)}occlusionOf(e){if(!this.physics||!this.settings.occlusion)return null;let t=h.sub(h.create(),this.listener.position,h.clone(e)),r=h.length(t);if(r<.3)return null;h.scale(t,t,1/r);let a=h.scaleAndAdd(h.create(),h.clone(e),t,.05);return this.physics.raycast(a,t,r-.15,!1)?{db:this.settings.occlusionDb,lowpass:this.settings.occlusionLowpassHz}:null}finish(e,t,r,a){e.setTaps(this.computeTaps(t,r,a));let s=this.occlusionOf(t);s&&e.setOcclusion(s.db,s.lowpass)}gunshot(e,t,r,a,s={}){let i=this.vorp;if(!i)return null;let o=i.gunshot(e,t,r,a,s),c=Math.pow(10,-o.duckDb/20),b=this.computeTaps(t,r,e.params.directivityDb??9).map(m=>m.path>30?{...m,gain:m.gain*c}:m),l=this.occlusionOf(t),u=o.samples.length?o.samples[0]:o.blast;for(let m of new Set([o.blast,...o.samples]))(m===u||m===o.blast)&&m.setTaps(b),l&&m.setOcclusion(l.db,l.lowpass);return o.action&&a&&o.action.setTaps(this.computeTaps(a,null,0).slice(0,4)),o}impact(e,t,r=0){let a=this.vorp;if(!a)return null;let s=a.impact(e,t,r);return this.finish(s,t,null,0),s}modal(e,t,r,a=1,s={}){let i=this.vorp;if(!i)return null;let o=i.modal(e,t,r,a,s);return this.finish(o,r,null,0),o}mech(e,t,r={}){let a=this.vorp;if(!a)return null;let s=a.mech(e,t,r);return this.finish(s.noise,t,null,0),s.ring&&this.finish(s.ring,t,null,0),s}breath(e,t={}){let r=this.vorp;return r?r.breath(e,t):null}footstep(e,t,r){let a=this.vorp;if(!a)return null;let s={bus:$e.ENV,reverbSendDb:a.zoneSendDb};return(r?a.sampleAt(`step.${r}`,t,e.levelSpl??70,s):null)??a.noise(e,t,s)}projectileInfo=new Map;trackCracks(e){let t=this.physics,r=this.listener.position,a=En(this.tempC),s=t.projectiles(),i=new Set;for(let o of s){i.add(o.id);let c=this.prevProj.get(o.id);if(this.prevProj.set(o.id,h.clone(o.position)),!c||this.crackDone.has(o.id))continue;let b=h.length(o.velocity);if(b<=a*1.01)continue;let l=h.sub(h.create(),o.position,c),u=h.lengthSq(l);if(u<1e-8)continue;let m=h.dot(h.sub(h.create(),r,c),l)/u;if(m<0||m>1)continue;let d=h.scaleAndAdd(h.create(),c,l,m),v=h.distance(d,r);if(v>60||v<.02)continue;let p=h.distance(d,c),M=this.projectileInfo.get(o.userId)??{diameter:.0057,length:.023},g=Un({mach:b/a,diameter:M.diameter,length:M.length,missDistance:v,c:a}),w=h.normalize(h.create(),l),x=a/b,y=h.scaleAndAdd(h.create(),d,w,-v*Math.sqrt(1-x*x)/Math.max(x,.001));e.crack(g.peakPa,g.duration,y,{bus:$e.WEAPONS}).setTaps(this.computeTaps(y,null,0)),this.crackDone.add(o.id)}for(let o of[...this.prevProj.keys()])i.has(o)||(this.prevProj.delete(o),this.crackDone.delete(o))}};function Hn(n,e){let t=n.scope(mt.gl),r=e.settings,a=e.sky.settings;t.number("Sky",a,"sunElevation",{label:"Sun elevation",min:-10,max:90,step:.1,unit:"\xB0"}).number("Sky",a,"sunAzimuth",{label:"Sun azimuth",min:0,max:360,step:.5,unit:"\xB0"}).number("Sky",a,"sunIlluminance",{label:"Solar illuminance (TOA)",min:1e3,max:14e4,step:100,unit:"lux",help:"Extraterrestrial sun illuminance \u2248 128 000 lux. Everything else is derived from this."}).number("Sky",a,"sunAngularDiameter",{label:"Sun angular diameter",min:.1,max:5,step:.01,unit:"\xB0",help:"Real sun: 0.53\xB0. Sets penumbra width of all sun shadows (PCSS) and sun specular size."}).number("Sky",a,"turbidity",{label:"Aerosol (haze)",min:0,max:10,step:.05,help:"Mie density. Hazy/humid days \u2248 2\u20134."}).number("Sky",a,"rayleigh",{label:"Rayleigh density",min:0,max:4,step:.01}).number("Sky",a,"ozone",{label:"Ozone",min:0,max:4,step:.01}).number("Sky",a,"mieG",{label:"Mie anisotropy",min:0,max:.99,step:.01}).number("Sky",a,"groundAlbedo",{label:"Ground albedo (env)",min:0,max:1,step:.01}).number("Sky",a,"multiScatter",{label:"Multiple scattering",min:.5,max:2.5,step:.01}).number("Sky",r.ibl,"intensity",{label:"IBL intensity",min:0,max:3,step:.01,help:"Keep at 1 for physical correctness."}).number("Sky",r.ibl,"specularOcclusion",{label:"Specular occlusion",min:0,max:1,step:.01}).number("Sky",r.ibl,"occludedAmbient",{label:"Bounce fill (occluded sky)",min:0,max:1,step:.01,help:"Fraction of sky ambient still arriving from occluded sky directions. \u22480.1\u20130.2."}).number("Sky",r.ibl,"viewmodelFill",{label:"Viewmodel ambient fill",min:.5,max:3,step:.05,help:"Ambient multiplier on the first-person weapon and hands only (1 = physical). Dark gear in roof shadow needs \u22481.5\u20132 to read like it does to an adapted eye."}).number("Sky",r.ibl,"groundBounce",{label:"Sun ground bounce",min:0,max:2,step:.01,help:"One-bounce sunlight (sun lux \xD7 ground albedo / \u03C0) received where the sky is blocked \u2014 lights pavilion/porch interiors. No real-time GI: \u22480.4\u20130.8 on sunny days."}),t.bool("Global illumination",r.gi,"enabled",{label:"Baked GI probes",help:"Path-traced at load: sky occlusion + multi-bounce sun/sky light. Replaces the analytic fill inside the probe volume."}).number("Global illumination",r.gi,"intensity",{label:"GI intensity",min:0,max:3,step:.01,help:"Keep at 1 for physical correctness."});let s=e.wind.settings;t.number("Wind",s,"speed",{label:"Wind speed",min:0,max:25,step:.1,unit:"m/s",help:"Mean surface wind. Drives foliage, smoke/dust drift, cloud drift (\xD7 wind aloft) and the ambience bed."}).number("Wind",s,"direction",{label:"Direction (blowing to)",min:0,max:360,step:1,unit:"\xB0",help:"0 = north (\u2212Z), 90 = east (+X); same compass as the sun azimuth."}).number("Wind",s,"gustiness",{label:"Gustiness",min:0,max:1,step:.01,help:"Gust peaks reach \u2248 speed \xD7 (1 + 1.7 \xD7 gustiness)."}).number("Wind",s,"gustFrequency",{label:"Gust rate",min:.02,max:.6,step:.01,unit:"Hz"}).number("Wind",s,"turbulence",{label:"Turbulence (flutter)",min:0,max:1,step:.01}).number("Wind",s,"foliageBend",{label:"Foliage bend",min:0,max:.2,step:.001,unit:"m per m/s",help:"Tip displacement of a 1 m blade per m/s of wind."}).number("Wind",s,"aloftFactor",{label:"Wind aloft \xD7",min:1,max:6,step:.05,help:"Cloud-level wind relative to the surface wind."}).number("Wind",s,"aloftVeer",{label:"Veer aloft",min:-90,max:90,step:1,unit:"\xB0"});let i=e.sky.clouds.settings;t.bool("Clouds",i,"enabled",{label:"Clouds"}).choice("Clouds",i,"mode",["volumetric","flat"],{label:"Mode",help:"volumetric = ray-marched 3D clouds; flat = cheap 2D deck. Individual clouds (sky.addCloud) can pick either."}).choice("Clouds",i,"quality",["auto","low","medium","high"],{label:"Quality",help:"Dome resolution and march steps. auto = high on a GPU, low on software WebGPU (headless captures)."}).number("Clouds",i,"coverage",{label:"Coverage",min:0,max:1,step:.01,help:"Fraction of sky covered (scattered \u2248 0.3\u20130.5, broken \u2248 0.6\u20130.85, overcast 1)."}).number("Clouds",i,"type",{label:"Cloud type",min:0,max:1,step:.01,help:"0 flat stratus / stratocumulus \u2026 1 towering cumulus."}).number("Clouds",i,"density",{label:"Extinction",min:2,max:120,step:.5,unit:"1/km",help:"Optical density of a fully dense cloud. Cumulus \u2248 20\u201380."}).number("Clouds",i,"altitude",{label:"Base altitude",min:300,max:6e3,step:10,unit:"m",help:"Cumulus base \u2248 1\u20132 km."}).number("Clouds",i,"thickness",{label:"Layer thickness",min:200,max:5e3,step:10,unit:"m"}).number("Clouds",i,"featureScale",{label:"System size",min:1e3,max:2e4,step:100,unit:"m",help:"Size of cloud systems and the gaps between them."}).number("Clouds",i,"shapeScale",{label:"Shape scale",min:1e3,max:15e3,step:100,unit:"m"}).number("Clouds",i,"detailScale",{label:"Detail scale",min:100,max:2e3,step:10,unit:"m"}).number("Clouds",i,"windFactor",{label:"Drift (\xD7 wind aloft)",min:0,max:6,step:.05,help:"Cloud drift speed relative to the Wind system's wind aloft."}).number("Clouds",i,"shadowStrength",{label:"Cloud shadows",min:0,max:1,step:.01,help:"How much a thick cloud dims direct sunlight on the ground (1 = physical)."}).number("Clouds",i,"ambient",{label:"Ambient light",min:0,max:3,step:.01,help:"Sky/ground light scattered by the clouds (1 \u2248 physical)."}).number("Clouds",i,"multiScatter",{label:"Multiple scattering",min:.2,max:4,step:.01,help:"Sunlight energy boost standing in for higher scattering orders."}).number("Clouds",i,"albedo",{label:"Droplet albedo",min:.5,max:1,step:.005}),t.choice("Exposure",r.exposure,"mode",["auto","manual","camera"],{label:"Mode",help:"auto = eye/camera metering; manual = EV100; camera = aperture/shutter/ISO of the Camera."}).number("Exposure",r.exposure,"ev100",{label:"Manual EV100",min:-6,max:20,step:.1,help:"Sunny 16 \u2248 15, overcast \u2248 12, indoor \u2248 7, night \u2248 0."}).number("Exposure",r.exposure,"compensation",{label:"Compensation",min:-5,max:5,step:.05,unit:"EV"}).number("Exposure",r.exposure,"minEv100",{label:"Min EV100",min:-10,max:20,step:.1}).number("Exposure",r.exposure,"maxEv100",{label:"Max EV100",min:-10,max:22,step:.1}).number("Exposure",r.exposure,"speedUp",{label:"Adapt to bright",min:.05,max:20,step:.05,unit:"EV/s"}).number("Exposure",r.exposure,"speedDown",{label:"Adapt to dark",min:.05,max:20,step:.05,unit:"EV/s"}).number("Exposure",r.exposure,"lowPercent",{label:"Metering low %",min:0,max:.99,step:.01}).number("Exposure",r.exposure,"highPercent",{label:"Metering high %",min:.01,max:1,step:.01}).number("Exposure",r.exposure,"centerWeight",{label:"Centre weighting",min:0,max:1,step:.01}),t.choice("Tone & colour",r.grade,"tonemapper",["agx","aces","neutral","none"],{label:"Tonemapper"}).number("Tone & colour",r.grade,"exposureBias",{label:"Exposure bias",min:-4,max:4,step:.05,unit:"EV"}).number("Tone & colour",r.grade,"contrast",{label:"Contrast",min:.5,max:1.6,step:.01}).number("Tone & colour",r.grade,"saturation",{label:"Saturation",min:0,max:2,step:.01}).number("Tone & colour",r.grade,"temperature",{label:"White balance temp",min:-1,max:1,step:.01}).number("Tone & colour",r.grade,"tint",{label:"White balance tint",min:-1,max:1,step:.01}).number("Tone & colour",r.grade,"lift",{label:"Lift",min:-.2,max:.2,step:.001}).number("Tone & colour",r.grade,"gamma",{label:"Gamma",min:.5,max:2,step:.01}).number("Tone & colour",r.grade,"gain",{label:"Gain",min:.5,max:2,step:.01}).number("Tone & colour",r.grade,"dither",{label:"Dither",min:0,max:2,step:.01}),t.number("Lens & sensor",r.lens,"distortion",{label:"Barrel distortion k1",min:-.6,max:.6,step:.005,help:"Negative = barrel (wide/bodycam lenses), positive = pincushion."}).number("Lens & sensor",r.lens,"distortion2",{label:"Distortion k2",min:-.5,max:.5,step:.005}).number("Lens & sensor",r.lens,"fillZoom",{label:"Distortion fill zoom",min:.5,max:2,step:.005}).number("Lens & sensor",r.lens,"chromaticAberration",{label:"Chromatic aberration",min:0,max:3,step:.01}).number("Lens & sensor",r.lens,"naturalVignette",{label:"Natural vignetting (cos\u2074)",min:0,max:1,step:.01}).number("Lens & sensor",r.lens,"vignette",{label:"Artistic vignette",min:0,max:1,step:.01}).number("Lens & sensor",r.lens,"vignetteRoundness",{label:"Vignette roundness",min:0,max:1,step:.01}).number("Lens & sensor",r.lens,"sharpen",{label:"Sharpening",min:0,max:1,step:.01}).bool("Lens & sensor",r.sensor,"enabled",{label:"Sensor noise"}).number("Lens & sensor",r.sensor,"readNoise",{label:"Read noise",min:0,max:.05,step:1e-4}).number("Lens & sensor",r.sensor,"shotNoise",{label:"Photon shot noise",min:0,max:.05,step:1e-4}).number("Lens & sensor",r.sensor,"gain",{label:"Sensor gain",min:0,max:8,step:.01}).bool("Lens & sensor",r.sensor,"isoCoupled",{label:"Noise follows camera ISO"}).bool("Lens & sensor",r.motionBlur,"enabled",{label:"Motion blur"}).number("Lens & sensor",r.motionBlur,"shutterAngle",{label:"Shutter angle",min:0,max:360,step:1,unit:"\xB0",help:"180\xB0 = film look; bodycams shoot ~ 90\u2013180\xB0."}).number("Lens & sensor",r.motionBlur,"maxPixels",{label:"Max blur",min:4,max:128,step:1,unit:"px"}).number("Lens & sensor",r.motionBlur,"samples",{label:"Blur samples",min:4,max:32,step:1}).bool("Lens & sensor",r.dof,"enabled",{label:"Depth of field"}).number("Lens & sensor",r.dof,"apertureMm",{label:"Aperture / pupil",min:0,max:30,step:.1,unit:"mm",help:"Human pupil \u2248 3 mm in daylight (iron sights: target goes soft), 6\u20137 mm at night. Camera: focal length \xF7 f-number. Bodycams \u2248 1 mm (everything sharp)."}).bool("Lens & sensor",r.dof,"autoFocus",{label:"Auto focus (accommodation)"}).number("Lens & sensor",r.dof,"focusDistance",{label:"Manual focus",min:.1,max:500,step:.1,unit:"m"}).number("Lens & sensor",r.dof,"focusSpeed",{label:"Refocus speed",min:.5,max:30,step:.1,unit:"1/s",help:"Eye accommodation \u2248 4\u20138/s."}).number("Lens & sensor",r.dof,"maxBlurPx",{label:"Max blur radius",min:2,max:40,step:1,unit:"px@1080p"}).number("Lens & sensor",r.dof,"quality",{label:"DOF quality",min:.25,max:3,step:.05}).bool("Lens & sensor",r.bloom,"enabled",{label:"Bloom (lens scatter)"}).number("Lens & sensor",r.bloom,"intensity",{label:"Bloom amount",min:0,max:.3,step:.001,help:"Fraction of light scattered by the lens (physical \u2248 0.02\u20130.05)."}).number("Lens & sensor",r.bloom,"radius",{label:"Bloom radius",min:.5,max:3,step:.01});let o=r.shadows;t.bool("Shadows",o,"enabled",{label:"Sun shadows"}).number("Shadows",o,"cascades",{label:"Cascades",min:1,max:4,step:1}).number("Shadows",o,"resolution",{label:"Resolution",min:512,max:8192,step:512,unit:"px"}).number("Shadows",o,"distance",{label:"Distance",min:10,max:600,step:1,unit:"m"}).number("Shadows",o,"splitLambda",{label:"Split lambda",min:0,max:1,step:.01}).number("Shadows",o,"constantBias",{label:"Depth bias",min:0,max:.002,step:1e-5}).number("Shadows",o,"slopeBias",{label:"Slope bias",min:0,max:8,step:.05}).number("Shadows",o,"normalBias",{label:"Normal bias",min:0,max:6,step:.05,unit:"texels"}).number("Shadows",o,"maxPenumbraTexels",{label:"Max penumbra",min:1,max:48,step:1,unit:"texels"}).number("Shadows",o,"blockerSamples",{label:"PCSS blocker taps",min:1,max:16,step:1}).number("Shadows",o,"pcfSamples",{label:"PCF taps",min:1,max:32,step:1}).number("Shadows",o,"blendFraction",{label:"Cascade blend",min:0,max:.5,step:.01}),t.bool("AO & AA",r.gtao,"enabled",{label:"GTAO"}).number("AO & AA",r.gtao,"radius",{label:"AO radius",min:.05,max:4,step:.01,unit:"m"}).number("AO & AA",r.gtao,"falloff",{label:"AO falloff",min:.05,max:1,step:.01}).number("AO & AA",r.gtao,"power",{label:"AO power",min:.5,max:4,step:.01}).number("AO & AA",r.gtao,"strength",{label:"AO strength",min:0,max:1,step:.01}).number("AO & AA",r.gtao,"slices",{label:"AO slices",min:1,max:8,step:1}).number("AO & AA",r.gtao,"steps",{label:"AO steps",min:2,max:16,step:1}).bool("AO & AA",r.taa,"enabled",{label:"TAA"}).number("AO & AA",r.taa,"feedbackMin",{label:"TAA feedback (moving)",min:0,max:.99,step:.005}).number("AO & AA",r.taa,"feedbackMax",{label:"TAA feedback (still)",min:0,max:.99,step:.005}).number("AO & AA",r,"renderScale",{label:"Render scale",min:.25,max:1.5,step:.05}).number("AO & AA",r,"debugView",{label:"Debug view",min:0,max:9,step:1,help:"1 normals, 2 AO, 3 velocity, 4 depth, 5 luminance (cd/m\xB2 false colour), 6 HDR, 7 sky visibility, 8 ambient diffuse, 9 direct only"}),t.number("Atmosphere",r.fog,"density",{label:"Fog density",min:0,max:.02,step:1e-5,unit:"1/m"}).number("Atmosphere",r.fog,"heightFalloff",{label:"Height falloff",min:.001,max:1,step:.001,unit:"1/m"}).number("Atmosphere",r.fog,"baseHeight",{label:"Base height",min:-50,max:200,step:.5,unit:"m"}).number("Atmosphere",r.fog,"startDistance",{label:"Start distance",min:0,max:200,step:.5,unit:"m"}).number("Atmosphere",r.fog,"inscatter",{label:"Inscatter",min:0,max:4,step:.01}).number("Atmosphere",r.fog,"mieG",{label:"Sun glow anisotropy",min:0,max:.99,step:.01})}function Wn(n,e){let t=n.scope(mt.vorp),r=(s,i,o,c)=>{i.forEach((b,l)=>t.arrayValue(s,o,l,{key:b.key,label:b.label,min:b.min,max:b.max,step:b.step,unit:b.unit,help:b.help,onChange:()=>e.cmd(c,o)}))};r("Hearing",na,e.params.hearing,ge.HEARING),r("Master",sa,e.params.master,ge.MASTER),r("Reverb",ia,e.params.reverb,ge.REVERB),r("Ambience",oa,e.params.ambience,ge.AMBIENCE);let a=e.shotWet;t.number("Gunshot wet",a,"recordedSendCutDb",{label:"Recorded shot reverb cut",min:0,max:30,step:.5,unit:"dB",help:"Field recordings carry their own reverb; this much less send for them"}).number("Gunshot wet",a,"tailDb",{label:"Recorded tail layer",min:-40,max:0,step:.5,unit:"dB",help:"Level of the distant tail recording under the report (presets can override)"}).number("Gunshot wet",a,"burstWindowS",{label:"Burst window",min:0,max:1,step:.01,unit:"s",help:"Shots closer than this count as one burst"}).number("Gunshot wet",a,"burstDuckDb",{label:"Duck per burst shot",min:0,max:12,step:.5,unit:"dB"}).number("Gunshot wet",a,"burstDuckMaxDb",{label:"Max burst duck",min:0,max:30,step:.5,unit:"dB"}).number("Gunshot wet",a,"burstChokeMs",{label:"Burst echo choke",min:0,max:2e3,step:10,unit:"ms",help:"In a burst, the previous round's recorded echo fades out over this long (0 = let every tail ring)"})}var la=class n{constructor(e,t,r,a){this.physics=e;this.workerUrl=t;this.wasmUrl=r;let s=typeof navigator<"u"&&navigator.hardwareConcurrency||4;this.threads=Math.max(1,Math.min(a??s-1,12))}workers=[];ready=null;job=0;pending=new Map;threads;meshCount=-1;busy=!1;static supported(){return typeof Worker<"u"}init(){let e=this.physics.staticMeshes;return this.ready&&this.meshCount===e.length?this.ready:(this.dispose(),this.meshCount=e.length,this.ready=Promise.all(Array.from({length:this.threads},()=>new Promise((t,r)=>{let a=new Worker(this.workerUrl,{type:"module",name:"fondaine-gi"});a.onmessage=s=>{let i=s.data;if(i.type==="ready"){t();return}if(i.type==="error"){r(new Error(i.message));for(let c of this.pending.values())c.reject(new Error(i.message));this.pending.clear();return}let o=this.pending.get(i.job);o&&(this.pending.delete(i.job),o.resolve(i))},a.onerror=s=>{r(s),this.failAll(new Error("GI worker crashed: "+(s.message??s)))},a.postMessage({type:"init",wasm:this.wasmUrl,meshes:e}),this.workers.push(a),setTimeout(()=>r(new Error("GI worker did not start within 30 s")),3e4)}))).then(()=>{}).catch(t=>{throw this.dispose(),this.ready=null,t}),this.ready)}call(e,t,r=[]){let a=++this.job;return new Promise((s,i)=>{let o=setTimeout(()=>{this.pending.delete(a)&&i(new Error(`GI worker job timed out after ${n.jobTimeoutMs/1e3} s`))},n.jobTimeoutMs);this.pending.set(a,{resolve:c=>{clearTimeout(o),s(c)},reject:c=>{clearTimeout(o),i(c)}}),e.postMessage({...t,job:a},r)})}static jobTimeoutMs=18e4;failAll(e){for(let t of this.pending.values())t.reject(e);this.pending.clear()}async runSlabs(e,t,r,a){let s=Math.max(1,Math.ceil(e/(this.threads*4))),i=[];for(let b=0;b<e;b+=s)i.push([b,Math.min(e,b+s)]);let o=i.length,c=0;await Promise.all(this.workers.map(async b=>{for(;i.length;){let[l,u]=i.shift();r(await this.call(b,t(l,u))),a?.(++c/o)}}))}async bake(e,t,r){let a=performance.now();this.busy=!0;try{await this.init();let{nx:s,ny:i,nz:o}=e,c=s*i*o,b=s*i,l=new Float32Array(c*3),u=new Uint8Array(c);await this.runSlabs(o,(v,p)=>({type:"pos",grid:e,z0:v,z1:p}),v=>{l.set(v.pos,v.z0*b*3),u.set(v.valid,v.z0*b)},v=>r?.(v*.05,"placing probes"));for(let v of this.workers)v.postMessage({type:"probes",pos:l,valid:u});let m=null;for(let v=0;v<t;v++){let p=new Float32Array(c*12),M=m;await this.runSlabs(o,(g,w)=>({type:"pass",grid:e,pass:v,prev:M,z0:g,z1:w}),g=>p.set(g.data,g.z0*b*12),g=>r?.(.05+.95*((v+g)/t),`bounce ${v+1} of ${t}`)),Hi(p,u,s,i,o),m=p}let d=0;for(let v=0;v<c;v++)u[v]||d++;return{data:m,filled:d,ms:performance.now()-a,threads:this.threads}}finally{this.busy=!1}}dispose(){for(let e of this.workers)e.terminate();this.workers=[],this.ready=null,this.pending.clear()}};function Hi(n,e,t,r,a){let s=Uint8Array.from(e);for(let i=0;i<4;i++){let o=!1,c=Uint8Array.from(s),b=n.slice();for(let l=0;l<a;l++)for(let u=0;u<r;u++)for(let m=0;m<t;m++){let d=(l*r+u)*t+m;if(c[d])continue;let v=new Float32Array(12),p=0;for(let M=-1;M<=1;M++)for(let g=-1;g<=1;g++)for(let w=-1;w<=1;w++){let x=m+w,y=u+g,k=l+M;if(x<0||y<0||k<0||x>=t||y>=r||k>=a)continue;let f=(k*r+y)*t+x;if(c[f]){for(let A=0;A<12;A++)v[A]+=b[f*12+A];p++}}if(p){for(let M=0;M<12;M++)n[d*12+M]=v[M]/p;s[d]=1,o=!0}}if(!o)break}}var Ka=Ct("MeshRenderer"),Ja=class n{renderer;scene=new Ia;camera=new La;world=new Oa;physics;audio;input;tuning=new Da;devui;canvas;time=0;fixedDt;maxFrameTime=.1;timeScale=1;paused=!1;frame=0;fps=0;acc=0;last=0;running=!1;fpsAcc=0;fpsFrames=0;onUpdate=[];onFixed=[];onLate=[];giBaker;autoRebakeGI=!0;giLast=null;giChangeT=0;constructor(e,t,r){this.canvas=e.canvas,this.renderer=t,this.physics=r,this.fixedDt=1/(e.fixedHz??120);let a=e.baseUrl??"/";this.audio=new _a(r,{wasm:e.vorpWasm??`${a}wasm/vorp_dsp.wasm`,worklet:e.vorpWorklet??`${a}vorp/vorp-worklet.js`}),this.input=new Ca(e.canvas);let s=i=>new URL(i,typeof location<"u"?location.href:"http://localhost/").href;this.giBaker=la.supported()&&e.giThreads!==0?new la(r,s(e.giWorker??`${a}fondaine/gi-worker.js`),s(e.physicsWasm??`${a}wasm/fondaine_physics.wasm`),e.giThreads):null,this.devui=new Ba(this.tuning,e.title??"fondaine"),this.world.onRemoved(Ka,(i,o)=>this.scene.remove(o.object)),this.world.onRemoved(ra,(i,o)=>{for(let c of o)c.onDestroy?.()}),Hn(this.tuning,this.renderer),this.renderer.wind.onSettingsChanged=i=>this.audio.setWind(i.speed,i.gustiness,i.gustFrequency),this.audio.setWind(this.renderer.wind.settings.speed,this.renderer.wind.settings.gustiness,this.renderer.wind.settings.gustFrequency),this.devui.statsText=()=>{let i=this.renderer.stats,o=this.audio.vorp?.meters;return`${this.fps.toFixed(0)} fps  ${i.frameMs.toFixed(2)} ms cpu  ${i.drawCalls} draws  ${(i.triangles/1e3).toFixed(0)}k tris
`+(o?`audio: ${o.voices} voices  eardrum ${o.earSpl.toFixed(0)} dB SPL  TTS ${o.tts.toFixed(1)} dB  dsp ${(o.cpu*100).toFixed(1)}%`:"audio: click to start")}}get sky(){return this.renderer.sky}get wind(){return this.renderer.wind}cloud(e){return this.renderer.sky.addCloud(e)}static async create(e){let t=e.baseUrl??"/",[r,a]=await Promise.all([Ua.create(e.canvas,{offscreen:e.offscreen}),Va.load(e.physicsWasm??`${t}wasm/fondaine_physics.wasm`)]);return new n(e,r,a)}async startAudio(){let e=await this.audio.start();return this.tuning.params.some(t=>t.module===mt.vorp)||Wn(this.tuning,e),e}async bakeGlobalIllumination(e){let t=e.cell??.5,r=Math.max(1,Math.ceil((e.max[0]-e.min[0])/t)),a=Math.max(1,Math.ceil((e.max[1]-e.min[1])/t)),s=Math.max(1,Math.ceil((e.max[2]-e.min[2])/t)),i=e.rays??256,o=e.passes??3,c=r*a*s,b=await this.giGrid({min:[e.min[0],e.min[1],e.min[2]],cell:t,nx:r,ny:a,nz:s,rays:i,albedo:Array.from(e.albedo)});e.onStatus?.(`Path tracing global illumination \xB7 ${c.toLocaleString()} probes`);let l=await this.runGIBake(b,o,(u,m)=>e.onStatus?.(`Path tracing global illumination \xB7 ${m} \xB7 ${Math.round(u*100)}%`));return console.info(`[fondaineGL] GI bake: ${r}\xD7${a}\xD7${s} probes, ${i} rays, ${o} passes, ${l.filled} filled, ${(l.ms/1e3).toFixed(1)} s on ${l.threads} thread(s)`),{probes:c,ms:l.ms,filled:l.filled}}async giGrid(e){let t=Array.from(await this.renderer.readSkySH());return{...e,sunDir:[...this.renderer.sky.sunDir],sunRGB:[...this.renderer.sky.sunIlluminanceRGB()],skySH:t}}skyKey(){let e=this.renderer.sky.settings;return[e.sunElevation,e.sunAzimuth,e.sunIlluminance,e.turbidity,e.rayleigh,e.ozone,e.groundAlbedo].map(t=>Number(t).toFixed(2)).join("|")}async runGIBake(e,t,r){let a;if(this.giBaker)try{a=await this.giBaker.bake(e,t,r)}catch(s){console.warn("[fondaineGL] worker GI bake failed, using the main thread",s),a=this.bakeGISync(e,t)}else a=this.bakeGISync(e,t);return this.renderer.setProbeVolume(a.data,e.nx,e.ny,e.nz,e.min,e.cell),this.giLast={grid:e,passes:t,key:this.skyKey()},a}bakeGISync(e,t){let r=performance.now(),{data:a,filled:s}=this.physics.bakeGI({...e,passes:t});return{data:a,filled:s,ms:performance.now()-r,threads:1}}watchGI(e){if(!this.autoRebakeGI||!this.giLast||!this.giBaker||this.giBaker.busy)return;if(this.skyKey()===this.giLast.key){this.giChangeT=0;return}if(this.giChangeT+=e,this.giChangeT<.6)return;this.giChangeT=0;let t=this.giLast;this.giLast={...t,key:this.skyKey()},this.giGrid({min:t.grid.min,cell:t.grid.cell,nx:t.grid.nx,ny:t.grid.ny,nz:t.grid.nz,rays:Math.min(t.grid.rays,128),albedo:t.grid.albedo}).then(r=>this.runGIBake(r,t.passes)).then(r=>console.info(`[fondaineGL] GI re-baked for the new sun in ${(r.ms/1e3).toFixed(1)} s`)).catch(r=>console.warn("[fondaineGL] GI re-bake failed",r))}createEntity(e,t,r){let a=this.world.spawn(e);return this.world.add(a,aa,new Na(t,r)),a}transform(e){return this.world.require(e,aa)}addMesh(e,t,r,a={}){let s=t instanceof ve?t:new ve(this.renderer.dev,t),i=new Me(s,r);return i.castShadow=a.castShadow??!0,i.viewmodel=a.viewmodel??!1,i.userData=e,this.scene.add(i),this.world.add(e,Ka,{object:i,offset:a.offset??null}),this.syncObject(e),i.resetHistory(),i}addScript(e,t){return t.engine=this,t.entity=e,(this.world.get(e,ra)??this.world.add(e,ra,[])).push(t),t}destroy(e){this.world.despawn(e)}tmp=O.create();syncObject(e){let t=this.world.get(e,Ka),r=this.world.get(e,aa);!t||!r||(t.offset?t.object.setTransform(O.multiply(this.tmp,r.getWorld(),t.offset)):t.object.setTransform(r.getWorld()))}start(){if(this.running)return;this.running=!0,this.last=performance.now();let e=t=>{if(!this.running)return;let r=Math.max(0,Math.min((t-this.last)/1e3,this.maxFrameTime));this.last=t,this.step(r),requestAnimationFrame(e)};requestAnimationFrame(e)}stop(){this.running=!1}step(e){e=Math.max(0,e);let t=this.paused?0:e*this.timeScale;this.input.poll(),this.input.actionPressed("tuning")&&(this.devui.toggle(),this.devui.visible&&this.input.unlock());let r=[...this.world.query(ra)];for(let[,s]of r)for(let i of s)i.enabled&&!i._started&&(i._started=!0,i.onStart?.());this.acc+=t;let a=0;for(;this.acc>=this.fixedDt&&a<12;){for(let[,s]of r)for(let i of s)i.enabled&&i.onFixedUpdate?.(this.fixedDt);for(let s of this.onFixed)s(this.fixedDt);this.physics.step(this.fixedDt),this.acc-=this.fixedDt,this.time+=this.fixedDt,a++}a>=12&&(this.acc=0);for(let[,s]of r)for(let i of s)i.enabled&&i.onUpdate?.(t);for(let s of this.onUpdate)s(t);for(let[,s]of r)for(let i of s)i.enabled&&i.onLateUpdate?.(t);for(let s of this.onLate)s(t);for(let[s]of this.world.query(Ka))this.syncObject(s);this.watchGI(e),this.audio.update(this.camera),this.renderer.render(this.scene,this.camera,Math.max(e,1e-4)),this.devui.update(),this.input.endFrame(),this.frame++,this.fpsAcc+=e,this.fpsFrames++,this.fpsAcc>.5&&(this.fps=this.fpsFrames/this.fpsAcc,this.fpsAcc=0,this.fpsFrames=0)}};var Be={DEFAULT:0,CONCRETE:1,DIRT:2,GRAVEL:3,WOOD:4,STEEL:5,STEEL_TARGET:6,PAPER:7,CARDBOARD:8,GRASS:9,BRASS:10,POLYMER:11},Ye=(n,e,t)=>({id:n,name:e,friction:.6,restitution:.2,ricochetAngleDeg:0,ricochetEnergyKeep:.3,reflection:.8,reflectionLowpassHz:6e3,impactSound:"dirt",footstepSound:"dirt",decal:null,decalSize:.03,debris:"dust",debrisColor:[.4,.35,.28],hard:!1,albedo:[.25,.25,.25],...t}),Ib=[Ye(Be.DEFAULT,"default",{}),Ye(Be.CONCRETE,"concrete",{friction:.75,restitution:.35,ricochetAngleDeg:12,ricochetEnergyKeep:.25,reflection:.97,reflectionLowpassHz:9e3,impactSound:"concrete",footstepSound:"concrete",decal:2,decalSize:.05,debris:"dust",debrisColor:[.62,.61,.58],hard:!0,albedo:[.36,.35,.33]}),Ye(Be.DIRT,"dirt",{friction:.8,restitution:.1,reflection:.65,reflectionLowpassHz:2500,impactSound:"dirt",footstepSound:"dirt",decal:5,decalSize:.12,debris:"dust",debrisColor:[.35,.28,.2],albedo:[.2,.15,.1]}),Ye(Be.GRAVEL,"gravel",{friction:.85,restitution:.15,ricochetAngleDeg:8,reflection:.75,reflectionLowpassHz:4e3,impactSound:"gravel",footstepSound:"gravel",decal:null,debris:"dust",debrisColor:[.5,.48,.45],hard:!0,albedo:[.3,.29,.27]}),Ye(Be.WOOD,"wood",{friction:.55,restitution:.3,reflection:.85,reflectionLowpassHz:5e3,impactSound:"wood",footstepSound:"wood",decal:1,decalSize:.035,debris:"splinters",debrisColor:[.6,.48,.32],hard:!0,albedo:[.42,.3,.17]}),Ye(Be.STEEL,"steel",{friction:.45,restitution:.4,ricochetAngleDeg:25,ricochetEnergyKeep:.4,reflection:.98,reflectionLowpassHz:12e3,impactSound:"concrete",footstepSound:"concrete",decal:0,decalSize:.04,debris:"sparks",debrisColor:[1,.7,.35],hard:!0,albedo:[.3,.3,.3]}),Ye(Be.STEEL_TARGET,"steel target",{friction:.45,restitution:.4,ricochetAngleDeg:0,reflection:.98,reflectionLowpassHz:12e3,impactSound:"concrete",decal:4,decalSize:.07,debris:"sparks",debrisColor:[1,.7,.35],hard:!0,albedo:[.55,.45,.38]}),Ye(Be.PAPER,"paper",{reflection:.3,reflectionLowpassHz:2e3,impactSound:"paper",decal:3,decalSize:.012,debris:"none",albedo:[.7,.68,.62]}),Ye(Be.CARDBOARD,"cardboard",{reflection:.4,reflectionLowpassHz:2500,impactSound:"cardboard",decal:3,decalSize:.014,debris:"none",albedo:[.45,.33,.2]}),Ye(Be.GRASS,"grass",{friction:.7,reflection:.5,reflectionLowpassHz:1800,impactSound:"dirt",footstepSound:"grass",decal:5,decalSize:.1,debris:"dust",debrisColor:[.3,.3,.18],albedo:[.07,.11,.035]}),Ye(Be.BRASS,"brass",{friction:.35,restitution:.45,hard:!0,impactSound:"concrete",debris:"none",albedo:[.5,.38,.2]}),Ye(Be.POLYMER,"polymer",{friction:.6,restitution:.3,hard:!0,impactSound:"wood",debris:"none",albedo:[.04,.04,.04]})];var Xa={"5.56x45 M855":{name:"5.56\xD745mm M855 62gr",bulletMassKg:.004018,diameterM:.0057,lengthM:.0233,bcG7:.151,muzzleVelocity:948,referenceBarrelM:.508,velocityPerBarrelM:380,powderMassKg:.00168,gasVelocityFactor:1.7,casing:{lengthM:.0448,diameterM:.0095,massKg:.0063}},"5.56x45 Mk262":{name:"5.56\xD745mm Mk262 77gr",bulletMassKg:.00499,diameterM:.0057,lengthM:.0254,bcG7:.186,muzzleVelocity:850,referenceBarrelM:.457,velocityPerBarrelM:340,powderMassKg:.00162,gasVelocityFactor:1.7,casing:{lengthM:.0448,diameterM:.0095,massKg:.0063}},"7.62x51 M118LR":{name:"7.62\xD751mm M118LR 175gr",bulletMassKg:.01134,diameterM:.00782,lengthM:.0315,bcG7:.243,muzzleVelocity:790,referenceBarrelM:.559,velocityPerBarrelM:230,powderMassKg:.00272,gasVelocityFactor:1.6,casing:{lengthM:.0512,diameterM:.0119,massKg:.0123}},"9x19 124gr":{name:"9\xD719mm 124gr FMJ",bulletMassKg:.00803,diameterM:.00901,lengthM:.0155,bcG7:.072,muzzleVelocity:360,referenceBarrelM:.102,velocityPerBarrelM:300,powderMassKg:36e-5,gasVelocityFactor:1.3,casing:{lengthM:.019,diameterM:.0099,massKg:.0037}}};function wt(n,e,t,r={}){let a=e/2,s=n;if(r.straight){let c=a*.955;return t([[0,-s/2],[a*.99,-s/2],[a*.99,-s/2+.0011],[a*.82,-s/2+.0015],[a*.82,-s/2+.0026],[a*.985,-s/2+.0032],[c,s/2],[c*.9,s/2],[c*.9,s/2-.002]],18)}let i=a*.68,o=[[0,-s/2],[a*.98,-s/2],[a*.98,-s/2+.0012],[a*.86,-s/2+.0016],[a*.86,-s/2+.0028],[a,-s/2+.0034],[a*.97,s/2-s*.22],[i,s/2-s*.13],[i,s/2],[i*.85,s/2]];return t(o,16)}var le={BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,UNSIGNED_INT:5125,FLOAT:5126,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,NEAREST:9728,LINEAR:9729,NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987,CLAMP_TO_EDGE:33071,MIRRORED_REPEAT:33648,REPEAT:10497};var _n={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16};function Yi(n){switch(n){case le.BYTE:case le.UNSIGNED_BYTE:return 1;case le.SHORT:case le.UNSIGNED_SHORT:return 2;case le.UNSIGNED_INT:case le.FLOAT:return 4;default:throw new Error(`glTF: unknown accessor componentType ${n}`)}}function Dt(n){let e=_n[n.type];if(!e)throw new Error(`glTF: unknown accessor type "${n.type}"`);return e}function Qi(n,e){let t,r;switch(n){case"MAT2":t=2,r=2;break;case"MAT3":t=3,r=3;break;case"MAT4":t=4,r=4;break;default:t=_n[n]??1,r=1}let a=t*e,s=r>1?a+3&-4:a;return{rows:t,cols:r,colStride:s,elementSize:s*r}}function Zi(n){switch(n){case le.BYTE:return(e,t)=>e.getInt8(t);case le.UNSIGNED_BYTE:return(e,t)=>e.getUint8(t);case le.SHORT:return(e,t)=>e.getInt16(t,!0);case le.UNSIGNED_SHORT:return(e,t)=>e.getUint16(t,!0);case le.UNSIGNED_INT:return(e,t)=>e.getUint32(t,!0);case le.FLOAT:return(e,t)=>e.getFloat32(t,!0);default:throw new Error(`glTF: unknown accessor componentType ${n}`)}}function $i(n,e){switch(n){case le.BYTE:return Math.max(e/127,-1);case le.UNSIGNED_BYTE:return e/255;case le.SHORT:return Math.max(e/32767,-1);case le.UNSIGNED_SHORT:return e/65535;case le.UNSIGNED_INT:return e/4294967295;default:return e}}function ba(n,e){let t=n.json.bufferViews?.[e];if(!t)throw new Error(`glTF: bufferView ${e} does not exist`);let r=n.buffers[t.buffer];if(!r)throw new Error(`glTF: buffer ${t.buffer} (bufferView ${e}) was not loaded`);let a=t.byteOffset??0;if(a+t.byteLength>r.byteLength)throw new Error(`glTF: bufferView ${e} [${a}, ${a+t.byteLength}) overruns buffer ${t.buffer} (${r.byteLength} bytes)`);return{bytes:r.subarray(a,a+t.byteLength),byteStride:t.byteStride??0}}function Ir(n,e,t,r,a,s,i,o,c){let b=Yi(s),l=Qi(a,b),u=t||l.elementSize,m=l.rows*l.cols,d=e+(r>0?(r-1)*u+l.elementSize:0);if(d>n.byteLength)throw new Error(`glTF: accessor data overruns its bufferView (${d} > ${n.byteLength} bytes)`);if(s===le.FLOAT&&o instanceof Float32Array&&u===l.elementSize&&l.cols===1&&(n.byteOffset+e&3)===0){o.set(new Float32Array(n.buffer,n.byteOffset+e,r*m),c);return}let v=new DataView(n.buffer,n.byteOffset,n.byteLength),p=Zi(s),M=c;for(let g=0;g<r;g++){let w=e+g*u;for(let x=0;x<l.cols;x++){let y=w+x*l.colStride;for(let k=0;k<l.rows;k++){let f=p(v,y+k*b);o[M++]=i?$i(s,f):f}}}}function Kn(n,e,t,r){let a=n.json.accessors?.[e];if(!a)throw new Error(`glTF: accessor ${e} does not exist`);let s=Dt(a);if(a.bufferView!==void 0){let{bytes:o,byteStride:c}=ba(n,a.bufferView);Ir(o,a.byteOffset??0,c,a.count,a.type,a.componentType,r,t,0)}else t.fill(0);let i=a.sparse;if(i&&i.count>0){let o=new Uint32Array(i.count),c=ba(n,i.indices.bufferView);Ir(c.bytes,i.indices.byteOffset??0,0,i.count,"SCALAR",i.indices.componentType,!1,o,0);let b=t instanceof Float32Array?new Float32Array(i.count*s):new Uint32Array(i.count*s),l=ba(n,i.values.bufferView);Ir(l.bytes,i.values.byteOffset??0,0,i.count,a.type,a.componentType,r,b,0);for(let u=0;u<i.count;u++){let m=o[u];if(m>=a.count)throw new Error(`glTF: sparse index ${m} out of range in accessor ${e}`);for(let d=0;d<s;d++)t[m*s+d]=b[u*s+d]}}}function Ve(n,e){let t=n.json.accessors?.[e];if(!t)throw new Error(`glTF: accessor ${e} does not exist`);let r=new Float32Array(t.count*Dt(t));return Kn(n,e,r,!!t.normalized&&t.componentType!==le.FLOAT),r}function jr(n,e){let t=n.json.accessors?.[e];if(!t)throw new Error(`glTF: accessor ${e} does not exist`);if(t.componentType===le.FLOAT)throw new Error(`glTF: accessor ${e} is FLOAT, expected an integer type`);let r=new Uint32Array(t.count*Dt(t));return Kn(n,e,r,!1),r}function Ya(n,e){let t=n.json.accessors?.[e];if(!t)throw new Error(`glTF: accessor ${e} does not exist`);return t}function Jn(n,e,t,r,a=!0){let s=Math.floor(n.length/3),i=new Float64Array(s*3),o=new Float64Array(s*3);for(let b=0;b+2<r.length;b+=3){let l=r[b],u=r[b+1],m=r[b+2];if(l>=s||u>=s||m>=s)continue;let d=n[l*3],v=n[l*3+1],p=n[l*3+2],M=n[u*3]-d,g=n[u*3+1]-v,w=n[u*3+2]-p,x=n[m*3]-d,y=n[m*3+1]-v,k=n[m*3+2]-p,f=t[l*2],A=t[l*2+1],S=t[u*2]-f,P=t[u*2+1]-A,T=t[m*2]-f,R=t[m*2+1]-A,L=S*R-T*P;if(!Number.isFinite(L)||Math.abs(L)<1e-12)continue;let z=1/L,j=(M*R-x*P)*z,I=(g*R-y*P)*z,F=(w*R-k*P)*z,N=(x*S-M*T)*z,G=(y*S-g*T)*z,H=(k*S-w*T)*z;if(Number.isFinite(j+I+F+N+G+H))for(let _ of[l,u,m])i[_*3]+=j,i[_*3+1]+=I,i[_*3+2]+=F,o[_*3]+=N,o[_*3+1]+=G,o[_*3+2]+=H}let c=new Float32Array(s*4);for(let b=0;b<s;b++){let l=e[b*3],u=e[b*3+1],m=e[b*3+2],d=Math.hypot(l,u,m);d>0?(l/=d,u/=d,m/=d):(l=0,u=0,m=1);let v=i[b*3],p=i[b*3+1],M=i[b*3+2],g=l*v+u*p+m*M;v-=l*g,p-=u*g,M-=m*g;let w=Math.hypot(v,p,M);w<1e-10&&(Math.abs(l)<.9?(v=0,p=m,M=-u):(v=-m,p=0,M=l),w=Math.hypot(v,p,M)),v/=w,p/=w,M/=w;let x=u*M-m*p,y=m*v-l*M,k=l*p-u*v,A=x*o[b*3]+y*o[b*3+1]+k*o[b*3+2]<0?-1:1;a&&(A=-A),c[b*4]=v,c[b*4+1]=p,c[b*4+2]=M,c[b*4+3]=A}return c}function Xn(n,e){switch(n){case le.TRIANGLES:{let t=e.length-e.length%3;return{indices:t===e.length?e:e.slice(0,t),topology:"triangle-list"}}case le.TRIANGLE_STRIP:{let t=[];for(let r=0;r+2<e.length;r++){let a=e[r],s=e[r+1+(r&1)],i=e[r+2-(r&1)];a===s||s===i||a===i||t.push(a,s,i)}return{indices:Uint32Array.from(t),topology:"triangle-list"}}case le.TRIANGLE_FAN:{let t=[];for(let r=0;r+2<e.length;r++)t.push(e[r+1],e[r+2],e[0]);return{indices:Uint32Array.from(t),topology:"triangle-list"}}case le.LINES:{let t=e.length-e.length%2;return{indices:t===e.length?e:e.slice(0,t),topology:"line-list"}}case le.LINE_STRIP:case le.LINE_LOOP:{let t=[];for(let r=0;r+1<e.length;r++)t.push(e[r],e[r+1]);return n===le.LINE_LOOP&&e.length>2&&t.push(e[e.length-1],e[0]),{indices:Uint32Array.from(t),topology:"line-list"}}case le.POINTS:return{indices:e,topology:"point-list"};default:throw new Error(`glTF: unknown primitive mode ${n}`)}}function et(n,e,t){let r=n.constructor,a=new r(t.length*e);for(let s=0;s<t.length;s++){let i=t[s]*e,o=s*e;for(let c=0;c<e;c++)a[o+c]=n[i+c]}return a}function Yn(n){let e=n.length/3,t=new Float32Array(e*3);for(let r=0;r+2<e;r+=3){let a=r*3,s=n[a+3]-n[a],i=n[a+4]-n[a+1],o=n[a+5]-n[a+2],c=n[a+6]-n[a],b=n[a+7]-n[a+1],l=n[a+8]-n[a+2],u=i*l-o*b,m=o*c-s*l,d=s*b-i*c,v=Math.hypot(u,m,d);v>0?(u/=v,m/=v,d/=v):(u=0,m=1,d=0);for(let p=0;p<3;p++)t[a+p*3]=u,t[a+p*3+1]=m,t[a+p*3+2]=d}return t}function Qn(n){let e=[1/0,1/0,1/0],t=[-1/0,-1/0,-1/0];for(let r=0;r+2<n.length;r+=3)for(let a=0;a<3;a++){let s=n[r+a];s<e[a]&&(e[a]=s),s>t[a]&&(t[a]=s)}return n.length<3?{min:[0,0,0],max:[0,0,0]}:{min:e,max:t}}var Gr=(function(){var n="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuixkbeeeddddillviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WboY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbrl79IV9Rbwq;X8:kdbk:kYi5ud9:du8Jjjjjbcjq9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxcj;abad9Uc;WFbGcjdadca0EhmaialfgPar9Rgoadfhsavaoadz:jjjjbgzceVhHcbhOdndninaeaO9nmeaPax9RaD6mdamaeaO9RaOamfgoae6EgAcsfglc9WGhCaAcethXaxaDfhiaOaeaoaeao6E9RhQalcl4cifcd4hLazcjdfaAfhKcbhYabaOad2fg8AhEaHh3incbh5dnawTmbaxaYcd4fRbbh5kcbh8Eazcjdfhqinaih8Fdndndndna5a8Ecet4ciGgoc9:fPdebdkaPa8F9RaA6mrazcjdfa8EaA2fa8FaAz:jjjjb8Aa8FaAfhixdkazcjdfa8EaA2fcbaAz:kjjjb8Aa8FhixekaPa8F9RaL6mva8FaLfhidnaCTmbaPai9RcK6mbaocdtc:q:G:cjbfcj:G:cjbawEhaczhrcbhlinargoc9Wfghaqfhrdndndndndndnaaa8Fahco4fRbbalcoG4ciGcdtfydbPDbedvivvvlvkar9cb83bwar9cb83bbxlkarcbaiRbdai8Xbb9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbaqaofgrcGfcbaicdfa8J9c8N1:NfghRbbag9cjjjjjw:dg8J9qE86bbarcVfcbaha8J9c8M1:NfghRbbag9cjjjjjl:dg8J9qE86bbarc7fcbaha8J9c8L1:NfghRbbag9cjjjjjd:dg8J9qE86bbarctfcbaha8J9c8K1:NfghRbbag9cjjjjje:dg8J9qE86bbarc91fcbaha8J9c8J1:NfghRbbag9cjjjj;ab:dg8J9qE86bbarc4fcbaha8J9cg1:NfghRbbag9cjjjja:dg8J9qE86bbarc93fcbaha8J9ch1:NfghRbbag9cjjjjz:dgg9qE86bbarc94fcbahag9ca1:NfghRbbai8Xbe9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbarc95fcbaha8J9c8N1:NfgiRbbag9cjjjjjw:dg8J9qE86bbarc96fcbaia8J9c8M1:NfgiRbbag9cjjjjjl:dg8J9qE86bbarc97fcbaia8J9c8L1:NfgiRbbag9cjjjjjd:dg8J9qE86bbarc98fcbaia8J9c8K1:NfgiRbbag9cjjjjje:dg8J9qE86bbarc99fcbaia8J9c8J1:NfgiRbbag9cjjjj;ab:dg8J9qE86bbarc9:fcbaia8J9cg1:NfgiRbbag9cjjjja:dg8J9qE86bbarcufcbaia8J9ch1:NfgiRbbag9cjjjjz:dgg9qE86bbaiag9ca1:NfhixikaraiRblaiRbbghco4g8Ka8KciSg8KE86bbaqaofgrcGfaiclfa8Kfg8KRbbahcl4ciGg8La8LciSg8LE86bbarcVfa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc7fa8Ka8Lfg8KRbbahciGghahciSghE86bbarctfa8Kahfg8KRbbaiRbeghco4g8La8LciSg8LE86bbarc91fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc4fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc93fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc94fa8Kahfg8KRbbaiRbdghco4g8La8LciSg8LE86bbarc95fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc96fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc97fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc98fa8KahfghRbbaiRbigico4g8Ka8KciSg8KE86bbarc99faha8KfghRbbaicl4ciGg8Ka8KciSg8KE86bbarc9:faha8KfghRbbaicd4ciGg8Ka8KciSg8KE86bbarcufaha8KfgrRbbaiciGgiaiciSgiE86bbaraifhixdkaraiRbwaiRbbghcl4g8Ka8KcsSg8KE86bbaqaofgrcGfaicwfa8Kfg8KRbbahcsGghahcsSghE86bbarcVfa8KahfghRbbaiRbeg8Kcl4g8La8LcsSg8LE86bbarc7faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarctfaha8KfghRbbaiRbdg8Kcl4g8La8LcsSg8LE86bbarc91faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc4faha8KfghRbbaiRbig8Kcl4g8La8LcsSg8LE86bbarc93faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc94faha8KfghRbbaiRblg8Kcl4g8La8LcsSg8LE86bbarc95faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc96faha8KfghRbbaiRbvg8Kcl4g8La8LcsSg8LE86bbarc97faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc98faha8KfghRbbaiRbog8Kcl4g8La8LcsSg8LE86bbarc99faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc9:faha8KfghRbbaiRbrgicl4g8Ka8KcsSg8KE86bbarcufaha8KfgrRbbaicsGgiaicsSgiE86bbaraifhixekarai8Pbw83bwarai8Pbb83bbaiczfhikdnaoaC9pmbalcdfhlaoczfhraPai9RcL0mekkaoaC6moaimexokaCmva8FTmvkaqaAfhqa8Ecefg8Ecl9hmbkdndndndnawTmbasaYcd4fRbbgociGPlbedrbkaATmdazaYfh8Fazcjdfhhcbh8EaEhaina8FRbbhraahocbhlinaoahalfRbbgqce4cbaqceG9R7arfgr86bbaoadfhoaAalcefgl9hmbkaacefhaa8Fcefh8FahaAfhha8Ecefg8Ecl9hmbxikkaATmeazaYfhaazcjdfhhcbhoceh8EaKh8FinaEaofhlaa8Vbbhrcbhoinala8FaofRbbcwtahaofRbbgqVc;:FiGce4cbaqceG9R7arfgr87bbaladfhlaQaocefgofmbka8FaXfh8FcdhoaacdfhaahaXfhha8EceGhlcbh8EalmbxdkkaATmbaocl4h8EazaYfRbbhqcwhoa3hlinalRbbaotaqVhqalcefhlaocwfgoca9hmbkcbhhaEh8FaKhainazcjdfahfRbbhrcwhoaahlinalRbbaotarVhralaAfhlaocwfgoca9hmbkara8E94aq7hqcbhoa8Fhlinalaqao486bbalcefhlaocwfgoca9hmbka8Fadfh8FaacefhaahcefghaA9hmbkkaEclfhEa3clfh3aYclfgYad6mbkaza8AaAcufad2fadz:jjjjb8AaAaOfhOaihxaimbkc9:hoxdkcbc99aPax9RakSEhoxekc9:hokavcjqf8Kjjjjbaok:bsesu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecjez:kjjjb8Aav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhDaicefgiarfhqdndnaeci9pmbaqhexekcmcsawceSEhkcbhxcbhmaqhecbhlcbhoindndnaiRbbgrc;Ve0mbavc;abfaoarcu7gPcl4fcsGcitfgwydlhsawydbhzdndnarcsGgwak9pmbavalaPfcsGcdtfydbaxawEhraxawTgHfhxxekdnaeaD9nmbc9:hoxokdndnawcsSmbcehHamawcetfcWfhrxekaecefhrae8SbbgwcFeGhPdndnawcu9mmbarhexekaecvfheaPcFbGhPcrhwdninar8SbbgHcFbGawtaPVhPaHcu9kmearcefhrawcrfgwc8J9hmbxdkkarcefhekcehHaPce4cbaPceG9R7amfhrkarhmkavc;abfaocitfgwarBdbawasBdlavalcdtfarBdbavc;abfaocefcsGcitfgwazBdbawarBdlaocdfhoaHalfhldnadcd9hmbabar87elabas87edabaz87ebabcofhbxdkabarBdwabasBdlabazBdbabcxfhbxekdnarcpe0mbavalaDarcsGfRbbgwcl4gP9RcsGcdtfydbaxcefgsaPEhravalaw9RcsGcdtfydbasaPTgzfgsawcsGgPEhwaPThPdndnadcd9hmbabaw87elabar87edabax87ebcohHxekabawBdwabarBdlabaxBdbcxhHkavalcdtfaxBdbavc;abfaocitfgOarBdbaOaxBdlavalcefglcsGcdtfarBdbavc;abfaocefcsGcitfgOawBdbaOarBdlavalazfglcsGcdtfawBdbavc;abfaocdfcsGcitfgraxBdbarawBdlaocifhoabaHfhbalaPfhlasaPfhxxekdnaeaD9nmbc9:hoxlkaxcbaeRbbgwEgHarc;:eSgrfhsawcsGhOdndnawcl4gAmbascefhzxekashzavalaA9RcsGcdtfydbhskdndnaOmbazcefhxxekazhxavalaw9RcsGcdtfydbhzkdndnarTmbaecefhrxekaecdfhrae8SbegPcFeGhwdnaPcu9kmbaecofhHawcFbGhwcrhedninar8SbbgPcFbGaetawVhwaPcu9kmearcefhraecrfgec8J9hmbkaHhrxekarcefhrkawce4cbawceG9R7amfgmhHkdndnaAcsSmbarhwxekarcefhwar8SbbgecFeGhPdnaecu9kmbarcvfhsaPcFbGhPcrhedninaw8SbbgrcFbGaetaPVhParcu9kmeawcefhwaecrfgec8J9hmbkashwxekawcefhwkaPce4cbaPceG9R7amfgmhskdndnaOcsSmbawhexekawcefheaw8SbbgrcFeGhPdnarcu9kmbawcvfhzaPcFbGhPcrhrdninae8SbbgwcFbGartaPVhPawcu9kmeaecefhearcrfgrc8J9hmbkazhexekaecefhekaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabaz87elabas87edabaH87ebcohrxekabazBdwabasBdlabaHBdbcxhrkavc;abfaocitfgwasBdbawaHBdlavalcdtfaHBdbavc;abfaocefcsGcitfgwazBdbawasBdlavalcefglcsGcdtfasBdbavc;abfaocdfcsGcitfgwaHBdbawazBdlavalaATaAcsSVfglcsGcdtfazBdbalaOTaOcsSVfhlaocifhoabarfhbkaocsGhoalcsGhlaicefgiaq6mbkkcbc99aeaDSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk:4ioiue99dud99dud99dnaeTmbcbhiabhlindndnal8Uebgv:YgoJ:ji:1Salcof8UebgrciVgw:Y:vgDNJbbbZJbbb:;avcu9kEMgq:lJbbb9p9DTmbaq:Ohkxekcjjjj94hkkalclf8Uebhvalcdf8UebhxalarcefciGcetfak87ebdndnax:YgqaDNJbbbZJbbb:;axcu9kEMgm:lJbbb9p9DTmbam:Ohxxekcjjjj94hxkabaiarciGgkfcd7cetfax87ebdndnav:YgmaDNJbbbZJbbb:;avcu9kEMgP:lJbbb9p9DTmbaP:Ohvxekcjjjj94hvkalarcufciGcetfav87ebdndnawaw2:ZgPaPMaoaoN:taqaqN:tamamN:tgoJbbbbaoJbbbb9GE:raDNJbbbZMgD:lJbbb9p9DTmbaD:Ohrxekcjjjj94hrkalakcetfar87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk:Tvirud99eudndnadcl9hmbaeTmeindndnabRbbgiabcefgl8Sbbgvabcdfgo8Sbbgrf9R:YJbbuJabcifgwRbbgdce4adVgDcd4aDVgDcl4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax86bbdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao86bbdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai86bbdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad86bbabclfhbaecufgembxdkkaeTmbindndnab8Vebgiabcdfgl8Uebgvabclfgo8Uebgrf9R:YJbFu9habcofgw8Vebgdce4adVgDcd4aDVgDcl4aDVgDcw4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax87ebdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao87ebdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai87ebdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad87ebabcwfhbaecufgembkkk9teiucbcbyd:K:G:cjbgeabcifc98GfgbBd:K:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkk83dbcj:Gdk8Kbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbc:K:Gdkl8W:qbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuixkbbebeeddddilve9Weeeviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WbwY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbDl79IV9Rbqq:I9Dklbzik94evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaeai86b:q:W:cjbaecitab8Piw83i:q:G:cjbaecefgecjd9hmbkk:SBlEud97dur978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaialfgxar9RhodnadTgmmbavaoad;8qbbkaicefhPcj;abad9Uc;WFbGcjdadca0EhsdndndnadTmbaoadfhzcbhHinaeaH9nmdaxaP9RaD6miabaHad2fgOavcjdfasaeaH9RaHasfae6EgAaAcsfgoc9WGgCSEhXaPaDfhQaocl4cifcd4hLavcj;cbfaCcetfhKavcj;cbfaCci2fhYavcj;cbfaCfh8AcbhEaoc;ab6h3incbh5dnawTmbaPaEcd4fRbbh5kcbh8Eavcj;cbfh8Findndndndna5a8Ecet4ciGgoc9:fPdebdkaxaQ9RaC6mwdnaCTmbavcj;cbfa8EaC2faQaC;8qbbkaQaAfhQxdkaCTmeavcj;cbfa8EaC2fcbaC;8kbxekaxaQ9RaL6moaoclVcbawEhraQaLfhocbhidna3mbaxao9Rc;Gb6mbcbhlina8FalfhidndndndndndnaQalco4fRbbgqciGarfPDbedibledibkaipxbbbbbbbbbbbbbbbbpklbxlkaiaopbblaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLgacdp:meaapmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9oghpxiiiiiiiiiiiiiiiip8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaoclffa8JRb:q:W:cjbfhoxikaiaopbbwaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLpxssssssssssssssssp9oghpxssssssssssssssssp8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaocwffa8JRb:q:W:cjbfhoxdkaiaopbbbpklbaoczfhoxekaiaopbbdaoRbbggcitpbi:q:G:cjbagRb:q:W:cjbggpsaoRbeg8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbagaocdffa8JRb:q:W:cjbfhokdndndndndndnaqcd4ciGarfPDbedibledibkaiczfpxbbbbbbbbbbbbbbbbpklbxlkaiczfaopbblaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLgacdp:meaapmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9oghpxiiiiiiiiiiiiiiiip8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaoclffa8JRb:q:W:cjbfhoxikaiczfaopbbwaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLpxssssssssssssssssp9oghpxssssssssssssssssp8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaocwffa8JRb:q:W:cjbfhoxdkaiczfaopbbbpklbaoczfhoxekaiczfaopbbdaoRbbggcitpbi:q:G:cjbagRb:q:W:cjbggpsaoRbeg8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbagaocdffa8JRb:q:W:cjbfhokdndndndndndnaqcl4ciGarfPDbedibledibkaicafpxbbbbbbbbbbbbbbbbpklbxlkaicafaopbblaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLgacdp:meaapmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9oghpxiiiiiiiiiiiiiiiip8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaoclffa8JRb:q:W:cjbfhoxikaicafaopbbwaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLpxssssssssssssssssp9oghpxssssssssssssssssp8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaocwffa8JRb:q:W:cjbfhoxdkaicafaopbbbpklbaoczfhoxekaicafaopbbdaoRbbggcitpbi:q:G:cjbagRb:q:W:cjbggpsaoRbeg8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbagaocdffa8JRb:q:W:cjbfhokdndndndndndnaqco4arfPDbedibledibkaic8Wfpxbbbbbbbbbbbbbbbbpklbxlkaic8Wfaopbblaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLgacdp:meaapmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9oghpxiiiiiiiiiiiiiiiip8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsaap5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbaiaoclffaqRb:q:W:cjbfhoxikaic8Wfaopbbwaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLpxssssssssssssssssp9oghpxssssssssssssssssp8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsaap5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbaiaocwffaqRb:q:W:cjbfhoxdkaic8Wfaopbbbpklbaoczfhoxekaic8WfaopbbdaoRbbgicitpbi:q:G:cjbaiRb:q:W:cjbgipsaoRbegqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbaiaocdffaqRb:q:W:cjbfhokalc;abfhialcjefaC0meaihlaxao9Rc;Fb0mbkkdnaiaC9pmbaici4hlinaxao9RcK6mwa8FaifhqdndndndndndnaQaico4fRbbalcoG4ciGarfPDbedibledibkaqpxbbbbbbbbbbbbbbbbpkbbxlkaqaopbblaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLgacdp:meaapmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9oghpxiiiiiiiiiiiiiiiip8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spkbbagaoclffa8JRb:q:W:cjbfhoxikaqaopbbwaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLpxssssssssssssssssp9oghpxssssssssssssssssp8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spkbbagaocwffa8JRb:q:W:cjbfhoxdkaqaopbbbpkbbaoczfhoxekaqaopbbdaoRbbggcitpbi:q:G:cjbagRb:q:W:cjbggpsaoRbeg8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpkbbagaocdffa8JRb:q:W:cjbfhokalcdfhlaiczfgiaC6mbkkaohQaoTmoka8FaCfh8Fa8Ecefg8Ecl9hmbkdndndndnawTmbazaEcd4fRbbglciGPlbedwbkaCTmdaXaEfhlavaEfpbdbh8Kcbhoinalavcj;cbfaofpblbg8La8Aaofpblbg8MpmbzeHdOiAlCvXoQrLg8NaKaofpblbgyaYaofpblbg8PpmbzeHdOiAlCvXoQrLgIpmbezHdiOAlvCXorQLgacep9Taapxeeeeeeeeeeeeeeeeghp9op9Hp9rgaa8Kp9Ug8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp9Ug8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp9Ug8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp9Ug8Kp9Abbbaladfgla8Ka8NaIpmwDKYqk8AExm35Ps8E8Fgacep9Taaahp9op9Hp9rgap9Ug8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp9Ug8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp9Ug8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp9Ug8Kp9Abbbaladfgla8Ka8La8MpmwKDYq8AkEx3m5P8Es8Fg8Laya8PpmwKDYq8AkEx3m5P8Es8Fg8MpmbezHdiOAlvCXorQLgacep9Taaahp9op9Hp9rgap9Ug8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp9Ug8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp9Ug8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp9Ug8Kp9Abbbaladfgla8Ka8La8MpmwDKYqk8AExm35Ps8E8Fgacep9Taaahp9op9Hp9rgap9Ughp9Abbbaladfglahaaaapmlvorlvorlvorlvorp9Ughp9AbbbaladfglahaaaapmwDqkwDqkwDqkwDqkp9Ughp9AbbbaladfglahaaaapmxmPsxmPsxmPsxmPsp9Ug8Kp9AbbbaladfhlaoczfgoaC6mbxikkaCTmeaXaEfhlavaEfpbdbh8Kcbhoinalavcj;cbfaofpblbg8La8Aaofpblbg8MpmbzeHdOiAlCvXoQrLg8NaKaofpblbgyaYaofpblbg8PpmbzeHdOiAlCvXoQrLgIpmbezHdiOAlvCXorQLgacep:neaapxebebebebebebebebghp9op:bep9rgaa8Kp:oeg8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp:oeg8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp:oeg8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp:oeg8Kp9Abbbaladfgla8Ka8NaIpmwDKYqk8AExm35Ps8E8Fgacep:neaaahp9op:bep9rgap:oeg8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp:oeg8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp:oeg8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp:oeg8Kp9Abbbaladfgla8Ka8La8MpmwKDYq8AkEx3m5P8Es8Fg8Laya8PpmwKDYq8AkEx3m5P8Es8Fg8MpmbezHdiOAlvCXorQLgacep:neaaahp9op:bep9rgap:oeg8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp:oeg8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp:oeg8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp:oeg8Kp9Abbbaladfgla8Ka8La8MpmwDKYqk8AExm35Ps8E8Fgacep:neaaahp9op:bep9rgap:oeghp9Abbbaladfglahaaaapmlvorlvorlvorlvorp:oeghp9AbbbaladfglahaaaapmwDqkwDqkwDqkwDqkp:oeghp9AbbbaladfglahaaaapmxmPsxmPsxmPsxmPsp:oeg8Kp9AbbbaladfhlaoczfgoaC6mbxdkkaCTmbaXaEfhrcbhocbalcl4gl9Rc8FGhiavaEfpbdbhhinaravcj;cbfaofpblbg8Ka8Aaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaKaofpblbg8NaYaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLgaaip:Reaaalp:Tep9qgaahp9rghp9Abbbaradfgrahaaaapmlvorlvorlvorlvorp9rghp9AbbbaradfgrahaaaapmwDqkwDqkwDqkwDqkp9rghp9AbbbaradfgrahaaaapmxmPsxmPsxmPsxmPsp9rghp9Abbbaradfgraha8Ma8PpmwDKYqk8AExm35Ps8E8Fgaaip:Reaaalp:Tep9qgap9rghp9Abbbaradfgrahaaaapmlvorlvorlvorlvorp9rghp9AbbbaradfgrahaaaapmwDqkwDqkwDqkwDqkp9rghp9AbbbaradfgrahaaaapmxmPsxmPsxmPsxmPsp9rghp9Abbbaradfgraha8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLgaaip:Reaaalp:Tep9qgap9rghp9Abbbaradfgrahaaaapmlvorlvorlvorlvorp9rghp9AbbbaradfgrahaaaapmwDqkwDqkwDqkwDqkp9rghp9AbbbaradfgrahaaaapmxmPsxmPsxmPsxmPsp9rghp9Abbbaradfgraha8Ka8LpmwDKYqk8AExm35Ps8E8Fgaaip:Reaaalp:Tep9qgap9rghp9Abbbaradfgrahaaaapmlvorlvorlvorlvorp9rghp9AbbbaradfgrahaaaapmwDqkwDqkwDqkwDqkp9rghp9AbbbaradfgrahaaaapmxmPsxmPsxmPsxmPsp9rghp9AbbbaradfhraoczfgoaC6mbkkaEclfgEad6mbkdnaXavcjdf9hmbaAad2goTmbaOavcjdfao;8qbbkdnammbavaXaAcufad2fad;8qbbkaAaHfhHc9:hoaQhPaQmbxlkkaeTmbaDalfhrcbhocuhlinaralaD9RglfaD6mdasaeao9Raoasfae6Eaofgoae6mbkaial9RhPkcbc99axaP9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaokwbz:bjjjbkpPesu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecje;8kbav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhDaicefgiarfhqdndnaeci9pmbaqhexekcmcsawceSEhkcbhxcbhmaqhecbhlcbhoindndnaiRbbgrc;Ve0mbavc;abfaoarcu7gPcl4fcsGcitfgwydlhsawydbhzdndnarcsGgwak9pmbavalaPfcsGcdtfydbaxawEhraxawTgHfhxxekdnaeaD9nmbc9:hoxokdndnawcsSmbcehHamawcetfcWfhrxekaecefhrae8SbbgwcFeGhPdndnawcu9mmbarhexekaecvfheaPcFbGhPcrhwdninar8SbbgHcFbGawtaPVhPaHcu9kmearcefhrawcrfgwc8J9hmbxdkkarcefhekcehHaPce4cbaPceG9R7amfhrkarhmkavc;abfaocitfgwarBdbawasBdlavalcdtfarBdbavc;abfaocefcsGcitfgwazBdbawarBdlaocdfhoaHalfhldnadcd9hmbabar87elabas87edabaz87ebabcofhbxdkabarBdwabasBdlabazBdbabcxfhbxekdnarcpe0mbavalaDarcsGfRbbgwcl4gP9RcsGcdtfydbaxcefgsaPEhravalaw9RcsGcdtfydbasaPTgzfgsawcsGgPEhwaPThPdndnadcd9hmbabaw87elabar87edabax87ebcohHxekabawBdwabarBdlabaxBdbcxhHkavalcdtfaxBdbavc;abfaocitfgOarBdbaOaxBdlavalcefglcsGcdtfarBdbavc;abfaocefcsGcitfgOawBdbaOarBdlavalazfglcsGcdtfawBdbavc;abfaocdfcsGcitfgraxBdbarawBdlaocifhoabaHfhbalaPfhlasaPfhxxekdnaeaD9nmbc9:hoxlkaxcbaeRbbgwEgHarc;:eSgrfhsawcsGhOdndnawcl4gAmbascefhzxekashzavalaA9RcsGcdtfydbhskdndnaOmbazcefhxxekazhxavalaw9RcsGcdtfydbhzkdndnarTmbaecefhrxekaecdfhrae8SbegPcFeGhwdnaPcu9kmbaecofhHawcFbGhwcrhedninar8SbbgPcFbGaetawVhwaPcu9kmearcefhraecrfgec8J9hmbkaHhrxekarcefhrkawce4cbawceG9R7amfgmhHkdndnaAcsSmbarhwxekarcefhwar8SbbgecFeGhPdnaecu9kmbarcvfhsaPcFbGhPcrhedninaw8SbbgrcFbGaetaPVhParcu9kmeawcefhwaecrfgec8J9hmbkashwxekawcefhwkaPce4cbaPceG9R7amfgmhskdndnaOcsSmbawhexekawcefheaw8SbbgrcFeGhPdnarcu9kmbawcvfhzaPcFbGhPcrhrdninae8SbbgwcFbGartaPVhPawcu9kmeaecefhearcrfgrc8J9hmbkazhexekaecefhekaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabaz87elabas87edabaH87ebcohrxekabazBdwabasBdlabaHBdbcxhrkavc;abfaocitfgwasBdbawaHBdlavalcdtfaHBdbavc;abfaocefcsGcitfgwazBdbawasBdlavalcefglcsGcdtfasBdbavc;abfaocdfcsGcitfgwaHBdbawazBdlavalaATaAcsSVfglcsGcdtfazBdbalaOTaOcsSVfhlaocifhoabarfhbkaocsGhoalcsGhlaicefgiaq6mbkkcbc99aeaDSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk;Toio97eue97aec98Ghedndnadcl9hmbaeTmecbhdinababpbbbgicKp:RecKp:Sep;6eglaicwp:RecKp:Sep;6ealp;Geaiczp:RecKp:Sep;6egvp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgwp9op9rp;Keglpxbb;:9cbb;:9cbb;:9cbb;:9calalp;Meaoaop;Meavaravawp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFbbbFbbbFbbbFbbbp9oaipxbbbFbbbFbbbFbbbFp9op9qalavp;Mearp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaoavp;Mearp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgDaDpbbbgipxbbbbbbFFbbbbbbFFgwp9oabpbbbgoaipmbediwDqkzHOAKY8AEgvczp:Reczp:Sep;6eglaoaipmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eavczp:Sep;6egvp;Gealp;Gep;Kep;Legipxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgqp9op9rp;Keglpxb;:FSb;:FSb;:FSb;:FSalalp;Meaiaip;Meavaravaqp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbp9oaiavp;Mearp;Keczp:Rep9qgialavp;Mearp;KepxFFbbFFbbFFbbFFbbp9oglpmwDKYqk8AExm35Ps8E8Fp9qpkbbabaoawp9oaialpmbezHdiOAlvCXorQLp9qpkbbabcafhbadclfgdae6mbkkk;2ileue97euo97dnaec98GgiTmbcbheinabcKfpx:ji:1S:ji:1S:ji:1S:ji:1SabpbbbglabczfgvpbbbgopmlvorxmPsCXQL358E8Fgrczp:Segwpxibbbibbbibbbibbbp9qp;6egDp;NegqaDaDp;MegDaDp;KealaopmbediwDqkzHOAKY8AEgDczp:Reczp:Sep;6eglalp;MeaDczp:Sep;6egoaop;Mearczp:Reczp:Sep;6egrarp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jep;Mepxbbn0bbn0bbn0bbn0gDp;KepxFFbbFFbbFFbbFFbbgkp9oaqaop;MeaDp;Keczp:Rep9qgoaqalp;MeaDp;Keakp9oaqarp;MeaDp;Keczp:Rep9qgDpmwDKYqk8AExm35Ps8E8Fglp5eawclp:RegqpEi:T:j83ibavalp5baqpEd:T:j83ibabcwfaoaDpmbezHdiOAlvCXorQLgDp5eaqpEe:T:j83ibabaDp5baqpEb:T:j83ibabcafhbaeclfgeai6mbkkkuee97dnadcd4ae2c98GgeTmbcbhdinababpbbbgicwp:Recwp:Sep;6eaicep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbabczfhbadclfgdae6mbkkk:Sodw97euaec98Ghedndnadcl9hmbaeTmecbhdinabpxbbuJbbuJbbuJbbuJabpbbbgicKp:TeglaicYp:Tep9qgvcdp:Teavp9qgvclp:Teavp9qgop;6ep;Negvaicwp:RecKp:SegraipxFbbbFbbbFbbbFbbbgwp9ogDp:Uep;6ep;Mepxbbn0bbn0bbn0bbn0gqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9oavaDarp:Xeaiczp:RecKp:Segip:Uep;6ep;Meaqp;Keawp9op9qavaDaraip:Uep:Xep;6ep;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qavaoalcep:Rep9oalpxebbbebbbebbbebbbp9op9qp;6ep;Meaqp;KecKp:Rep9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgkpxbFu9hbFu9hbFu9hbFu9habpbbbglakpbbbgrpmlvorxmPsCXQL358E8Fgvczp:TegqavcHp:Tep9qgicdp:Teaip9qgiclp:Teaip9qgicwp:Teaip9qgop;6ep;NegialarpmbediwDqkzHOAKY8AEgDpxFFbbFFbbFFbbFFbbglp9ograDczp:Segwp:Ueavczp:Reczp:SegDp:Xep;6ep;Mepxbbn0bbn0bbn0bbn0gvp;Kealp9oaiarawaDp:Uep:Xep;6ep;Meavp;Keczp:Rep9qgwaiaoaqcep:Rep9oaqpxebbbebbbebbbebbbp9op9qp;6ep;Meavp;Keczp:ReaiaDarp:Uep;6ep;Meavp;Kealp9op9qgipmwDKYqk8AExm35Ps8E8FpkbbabawaipmbezHdiOAlvCXorQLpkbbabcafhbadclfgdae6mbkkk9teiucbcbydj:G:cjbgeabcifc98GfgbBdj:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkxebcj:Gdklz:zbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),r=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var a=WebAssembly.validate(t)?o(e):o(n),s,i=WebAssembly.instantiate(a,{}).then(function(g){s=g.instance,s.exports.__wasm_call_ctors()});function o(g){for(var w=new Uint8Array(g.length),x=0;x<g.length;++x){var y=g.charCodeAt(x);w[x]=y>96?y-97:y>64?y-39:y+4}for(var k=0,x=0;x<g.length;++x)w[k++]=w[x]<60?r[w[x]]:(w[x]-60)*64+w[++x];return w.buffer.slice(0,k)}function c(g,w,x,y,k,f,A){var S=g.exports.sbrk,P=y+3&-4,T=S(P*k),R=S(f.length),L=new Uint8Array(g.exports.memory.buffer);L.set(f,R);var z=w(T,y,k,R,f.length);if(z==0&&A&&A(T,P,k),x.set(L.subarray(T,T+y*k)),S(T-S(0)),z!=0)throw new Error("Malformed buffer data: "+z)}var b={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp",COLOR:"meshopt_decodeFilterColor"},l={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},u=[],m=0;function d(g){var w={object:new Worker(g),pending:0,requests:{}};return w.object.onmessage=function(x){var y=x.data;w.pending-=y.count,w.requests[y.id][y.action](y.value),delete w.requests[y.id]},w}function v(g){for(var w="self.ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(a)+"]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = "+M.name+";"+c.toString()+M.toString(),x=new Blob([w],{type:"text/javascript"}),y=URL.createObjectURL(x),k=u.length;k<g;++k)u[k]=d(y);for(var k=g;k<u.length;++k)u[k].object.postMessage({});u.length=g,URL.revokeObjectURL(y)}function p(g,w,x,y,k){for(var f=u[0],A=1;A<u.length;++A)u[A].pending<f.pending&&(f=u[A]);return new Promise(function(S,P){var T=new Uint8Array(x),R=++m;f.pending+=g,f.requests[R]={resolve:S,reject:P},f.object.postMessage({id:R,count:g,size:w,source:T,mode:y,filter:k},[T.buffer])})}function M(g){var w=g.data;self.ready.then(function(x){if(!w.id)return self.close();try{var y=new Uint8Array(w.count*w.size);c(x,x.exports[w.mode],y,w.count,w.size,w.source,x.exports[w.filter]),self.postMessage({id:w.id,count:w.count,action:"resolve",value:y},[y.buffer])}catch(k){self.postMessage({id:w.id,count:w.count,action:"reject",value:k})}})}return{ready:i,supported:!0,useWorkers:function(g){v(g)},decodeVertexBuffer:function(g,w,x,y,k){c(s,s.exports.meshopt_decodeVertexBuffer,g,w,x,y,s.exports[b[k]])},decodeIndexBuffer:function(g,w,x,y){c(s,s.exports.meshopt_decodeIndexBuffer,g,w,x,y)},decodeIndexSequence:function(g,w,x,y){c(s,s.exports.meshopt_decodeIndexSequence,g,w,x,y)},decodeGltfBuffer:function(g,w,x,y,k,f){c(s,s.exports[l[k]],g,w,x,y,s.exports[b[f]])},decodeGltfBufferAsync:function(g,w,x,y,k){return u.length>0?p(g,w,x,l[y],b[k]):i.then(function(){var f=new Uint8Array(g*w);return c(s,s.exports[l[y]],f,g,w,x,s.exports[b[k]]),f})}}})();var eo=["KHR_mesh_quantization","KHR_texture_transform","KHR_materials_emissive_strength","KHR_materials_unlit","KHR_lights_punctual","KHR_materials_ior","KHR_materials_specular","KHR_materials_clearcoat","KHR_materials_transmission","EXT_meshopt_compression","KHR_meshopt_compression"],$n=["KHR_draco_mesh_compression","KHR_texture_basisu"],to=1179937895,ao=1313821514,ro=5130562;async function Qa(n,e={}){let t=e.fetch??globalThis.fetch;if(!t)throw new Error("glTF: no fetch implementation available");let r=await t(n);if(!r.ok)throw new Error(`glTF: failed to fetch ${n}: ${r.status} ${r.statusText}`);let a=await r.arrayBuffer();return lo(a,no(n),e)}function no(n){let e=n.search(/[?#]/),t=e>=0?n.slice(0,e):n,r=t.lastIndexOf("/");return r>=0?t.slice(0,r+1):""}function so(n,e){if(/^(data:|blob:|[a-z][a-z0-9+.-]*:\/\/)/i.test(n)||n.startsWith("/")||!e)return n;try{return new URL(n,e).href}catch{return e+n}}function io(n){let e=n.indexOf(",");if(e<0)throw new Error("glTF: malformed data: URI");let t=n.slice(5,e),r=n.slice(e+1),a=/;base64$/i.test(t),s=t.replace(/;base64$/i,"").split(";")[0]||"application/octet-stream";if(a){let i=atob(r),o=new Uint8Array(i.length);for(let c=0;c<i.length;c++)o[c]=i.charCodeAt(c);return{bytes:o,mimeType:s}}return{bytes:new TextEncoder().encode(decodeURIComponent(r)),mimeType:s}}function oo(n){return n instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&n instanceof SharedArrayBuffer}function co(n){if(ArrayBuffer.isView(n)){let a=n;n=a.buffer.slice(a.byteOffset,a.byteOffset+a.byteLength)}if(!oo(n))return{json:n};let e=new Uint8Array(n),t=new DataView(n);if(e.byteLength>=12&&t.getUint32(0,!0)===to){let a=t.getUint32(4,!0);if(a!==2)throw new Error(`glTF: unsupported GLB version ${a}`);let s=Math.min(t.getUint32(8,!0),e.byteLength),i=12,o,c;for(;i+8<=s;){let b=t.getUint32(i,!0),l=t.getUint32(i+4,!0);if(i+=8,i+b>s)throw new Error("glTF: GLB chunk overruns file");let u=e.subarray(i,i+b);l===ao&&!o?o=JSON.parse(new TextDecoder().decode(u)):l===ro&&!c&&(c=u),i+=b+(4-b%4)%4}if(!o)throw new Error("glTF: GLB has no JSON chunk");return{json:o,glbBin:c}}let r=new TextDecoder().decode(e);return r.charCodeAt(0)===65279&&(r=r.slice(1)),{json:JSON.parse(r)}}async function lo(n,e,t){let{json:r,glbBin:a}=co(n);if(!r||typeof r!="object"||!r.asset)throw new Error('glTF: missing "asset" property \u2014 not a glTF 2.0 file');if(parseInt(String(r.asset.minVersion??r.asset.version??"2"),10)!==2)throw new Error(`glTF: unsupported version ${r.asset.version} (only 2.x)`);let i=r.extensionsUsed??[],o=r.extensionsRequired??[];for(let A of o){if($n.includes(A))throw new Error(`glTF: required extension "${A}" is not supported by fondaineGL's loader (decompress the asset, e.g. with gltf-transform, first)`);if(!eo.includes(A))throw new Error(`glTF: required extension "${A}" is not supported`)}let c=t.fetch??(typeof globalThis.fetch=="function"?globalThis.fetch.bind(globalThis):void 0),b=async A=>{if(A.startsWith("data:"))return io(A);if(!c)throw new Error(`glTF: cannot load external resource "${A}" \u2014 no fetch available`);let S=so(A,e),P=await c(S);if(!P.ok)throw new Error(`glTF: failed to fetch ${S}: ${P.status} ${P.statusText}`);return{bytes:new Uint8Array(await P.arrayBuffer()),mimeType:P.headers.get("content-type")??""}},l=await Promise.all((r.buffers??[]).map(async(A,S)=>{let P=A.extensions?.EXT_meshopt_compression??A.extensions?.KHR_meshopt_compression;if(A.uri===void 0&&P?.fallback)return new Uint8Array(A.byteLength);if(A.uri===void 0){if(S!==0||!a)throw new Error(`glTF: buffer ${S} has no uri and no GLB BIN chunk`);return a}let{bytes:T}=await b(A.uri);if(T.byteLength<A.byteLength)throw new Error(`glTF: buffer ${S} is ${T.byteLength} bytes, expected ${A.byteLength}`);return T})),u=(r.bufferViews??[]).filter(A=>A.extensions?.EXT_meshopt_compression||A.extensions?.KHR_meshopt_compression);if(u.length){await Gr.ready;for(let A of u){let S=A.extensions.EXT_meshopt_compression??A.extensions.KHR_meshopt_compression,P=l[S.buffer].subarray(S.byteOffset??0,(S.byteOffset??0)+S.byteLength),T=new Uint8Array(S.count*S.byteStride);Gr.decodeGltfBuffer(T,S.count,S.byteStride,P,S.mode,S.filter),l.push(T),A.buffer=l.length-1,A.byteOffset=0,A.byteLength=T.byteLength,S.mode==="ATTRIBUTES"&&(A.byteStride=S.byteStride),delete A.extensions.EXT_meshopt_compression,delete A.extensions.KHR_meshopt_compression}}let m={json:r,buffers:l},d=await Promise.all((r.images??[]).map(async(A,S)=>{if(A.bufferView!==void 0){let{bytes:R}=ba(m,A.bufferView);return{name:A.name??`image${S}`,mimeType:A.mimeType??Zn(R),data:R}}if(A.uri===void 0)throw new Error(`glTF: image ${S} has neither uri nor bufferView`);let{bytes:P,mimeType:T}=await b(A.uri);return{name:A.name??A.uri.slice(0,64),mimeType:A.mimeType??(T.startsWith("image/")?T:Zn(P)),data:P}})),v=[];if((t.decodeImages??!0)&&typeof globalThis.createImageBitmap=="function"&&typeof Blob<"u"){let A=await Promise.all(d.map(S=>createImageBitmap(new Blob([S.data],{type:S.mimeType}),{colorSpaceConversion:"none",premultiplyAlpha:"none"})));v.push(...A)}let p=go(r),M=(r.materials??[]).map((A,S)=>uo(r,S)),g=(r.meshes??[]).map((A,S)=>po(m,S,M)),w=vo(r,p),x=(r.skins??[]).map((A,S)=>{let P=A.joints.length,T;if(A.inverseBindMatrices!==void 0){if(T=Ve(m,A.inverseBindMatrices),T.length<P*16)throw new Error(`glTF: skin ${S} inverseBindMatrices has ${T.length/16} matrices for ${P} joints`);T.length>P*16&&(T=T.slice(0,P*16))}else{T=new Float32Array(P*16);for(let R=0;R<P;R++)T[R*16]=T[R*16+5]=T[R*16+10]=T[R*16+15]=1}return{name:A.name??`skin${S}`,joints:A.joints.slice(),inverseBindMatrices:T,skeleton:A.skeleton}}),y=(r.animations??[]).map((A,S)=>xo(m,S)),k=(r.cameras??[]).map((A,S)=>({name:A.name??`camera${S}`,type:A.type==="orthographic"?"orthographic":"perspective",perspective:A.perspective?{...A.perspective}:void 0,orthographic:A.orthographic?{...A.orthographic}:void 0})),f=(r.scenes??[]).map((A,S)=>({name:A.name??`scene${S}`,nodes:(A.nodes??[]).slice()}));return f.length===0&&w.length>0&&(f=[{name:"scene0",nodes:w.map((A,S)=>A.parent<0?S:-1).filter(A=>A>=0)}]),{meshes:g,materials:M,images:v,nodes:w,scenes:f,scene:r.scene??0,skins:x,animations:y,extensionsUsed:i.slice(),imageData:d,cameras:k,lights:p,extensionsRequired:o.slice()}}function Zn(n){return n[0]===137&&n[1]===80&&n[2]===78&&n[3]===71?"image/png":n[0]===255&&n[1]===216?"image/jpeg":n[0]===82&&n[1]===73&&n[2]===70&&n[3]===70&&n[8]===87&&n[9]===69?"image/webp":n[0]===71&&n[1]===73&&n[2]===70?"image/gif":n[4]===102&&n[5]===116&&n[6]===121&&n[7]===112?"image/avif":"application/octet-stream"}var be=(n,e)=>typeof n=="number"&&Number.isFinite(n)?n:e,at=(n,e)=>n?.extensions?.[e];function bo(n,e){let t=e!==void 0?n.samplers?.[e]:void 0,r=b=>b===le.CLAMP_TO_EDGE?"clamp-to-edge":b===le.MIRRORED_REPEAT?"mirror-repeat":"repeat",a=t?.minFilter,s=t?.magFilter,i=a===void 0||a>=le.NEAREST_MIPMAP_NEAREST,o=a===le.NEAREST||a===le.NEAREST_MIPMAP_NEAREST||a===le.NEAREST_MIPMAP_LINEAR?"nearest":"linear",c=a===le.NEAREST_MIPMAP_NEAREST||a===le.LINEAR_MIPMAP_NEAREST?"nearest":"linear";return{magFilter:s===le.NEAREST?"nearest":"linear",minFilter:o,mipmap:i,mipmapFilter:c,wrapS:r(t?.wrapS),wrapT:r(t?.wrapT)}}function tt(n,e){if(!e)return;let t=n.textures?.[e.index];if(!t)return;if(at(t,"KHR_texture_basisu")&&t.source===void 0)throw new Error('glTF: extension "KHR_texture_basisu" is not supported (texture has no fallback source)');let r=t.source;if(r===void 0)for(let o of["EXT_texture_webp","EXT_texture_avif"]){let c=at(t,o);if(c&&typeof c.source=="number"){r=c.source;break}}if(r===void 0)return;let a=e.texCoord??0,s,i=at(e,"KHR_texture_transform");if(i){let o=i.offset,c=i.scale;s={offset:[be(o?.[0],0),be(o?.[1],0)],rotation:be(i.rotation,0),scale:[be(c?.[0],1),be(c?.[1],1)]},typeof i.texCoord=="number"&&(a=i.texCoord)}return{image:r,sampler:bo(n,t.sampler),texCoord:a,transform:s}}function uo(n,e){let t=n.materials[e],r=t.pbrMetallicRoughness??{},a=r.baseColorFactor??[1,1,1,1],s=t.emissiveFactor??[0,0,0],i=t.alphaMode==="MASK"||t.alphaMode==="BLEND"?t.alphaMode:"OPAQUE",o={name:t.name??`material${e}`,baseColorFactor:[be(a[0],1),be(a[1],1),be(a[2],1),be(a[3],1)],baseColorTexture:tt(n,r.baseColorTexture),metallicFactor:be(r.metallicFactor,1),roughnessFactor:be(r.roughnessFactor,1),metallicRoughnessTexture:tt(n,r.metallicRoughnessTexture),normalTexture:tt(n,t.normalTexture),normalScale:be(t.normalTexture?.scale,1),occlusionTexture:tt(n,t.occlusionTexture),occlusionStrength:be(t.occlusionTexture?.strength,1),emissiveTexture:tt(n,t.emissiveTexture),emissiveFactor:[be(s[0],0),be(s[1],0),be(s[2],0)],emissiveStrength:1,alphaMode:i,alphaCutoff:be(t.alphaCutoff,.5),doubleSided:!!t.doubleSided,unlit:!!at(t,"KHR_materials_unlit")},c=at(t,"KHR_materials_emissive_strength");c&&(o.emissiveStrength=be(c.emissiveStrength,1));let b=at(t,"KHR_materials_ior");b&&(o.ior=be(b.ior,1.5));let l=at(t,"KHR_materials_specular");if(l){o.specularFactor=be(l.specularFactor,1);let d=l.specularColorFactor;o.specularColorFactor=[be(d?.[0],1),be(d?.[1],1),be(d?.[2],1)],o.specularTexture=tt(n,l.specularTexture),o.specularColorTexture=tt(n,l.specularColorTexture)}let u=at(t,"KHR_materials_clearcoat");u&&(o.clearcoat={factor:be(u.clearcoatFactor,0),roughness:be(u.clearcoatRoughnessFactor,0)},o.clearcoatTexture=tt(n,u.clearcoatTexture),o.clearcoatRoughnessTexture=tt(n,u.clearcoatRoughnessTexture),o.clearcoatNormalTexture=tt(n,u.clearcoatNormalTexture));let m=at(t,"KHR_materials_transmission");return m&&(o.transmission=be(m.transmissionFactor,0),o.transmissionTexture=tt(n,m.transmissionTexture)),o}function mo(n){for(let e=0;e+3<n.length;e+=4){let t=n[e]+n[e+1]+n[e+2]+n[e+3];if(t>1e-8){let r=1/t;n[e]*=r,n[e+1]*=r,n[e+2]*=r,n[e+3]*=r}else n[e]=1,n[e+1]=0,n[e+2]=0,n[e+3]=0}}function ho(n,e,t){if(e===4)return n;let r=new Float32Array(t*4);for(let a=0;a<t;a++)r[a*4]=n[a*3],r[a*4+1]=n[a*3+1],r[a*4+2]=n[a*3+2],r[a*4+3]=1;return r}function fo(n,e,t,r){for(let S of Object.keys(e.extensions??{}))if($n.includes(S))throw new Error(`glTF: mesh ${t} uses unsupported extension "${S}"`);let a=e.attributes;if(a.POSITION===void 0)throw new Error(`glTF: mesh ${t} primitive has no POSITION attribute`);let s=Ya(n,a.POSITION),i=s.count,o=Ve(n,a.POSITION),c=a.NORMAL!==void 0?Ve(n,a.NORMAL):void 0,b=a.TANGENT!==void 0?Ve(n,a.TANGENT):void 0,l=a.TEXCOORD_0!==void 0?Ve(n,a.TEXCOORD_0):void 0,u=a.TEXCOORD_1!==void 0?Ve(n,a.TEXCOORD_1):void 0,m;if(a.COLOR_0!==void 0){let S=Ya(n,a.COLOR_0);m=ho(Ve(n,a.COLOR_0),Dt(S),S.count)}let d;if(a.JOINTS_0!==void 0){let S=jr(n,a.JOINTS_0);d=new Uint16Array(S.length);for(let P=0;P<S.length;P++)d[P]=S[P]}let v=a.WEIGHTS_0!==void 0?Ve(n,a.WEIGHTS_0):void 0;v&&mo(v);let p;e.targets&&e.targets.length&&(p=e.targets.map(S=>({positions:S.POSITION!==void 0?Ve(n,S.POSITION):void 0,normals:S.NORMAL!==void 0?Ve(n,S.NORMAL):void 0,tangents:S.TANGENT!==void 0?Ve(n,S.TANGENT):void 0})));let M;if(e.indices!==void 0)M=jr(n,e.indices);else{M=new Uint32Array(i);for(let S=0;S<i;S++)M[S]=S}for(let S=0;S<M.length;S++)if(M[S]>=i)throw new Error(`glTF: mesh ${t} index ${M[S]} out of range (${i} vertices)`);let g=Xn(e.mode??le.TRIANGLES,M),w=g.indices,x=i,y=!1;if(!c&&g.topology==="triangle-list"){if(o=et(o,3,w),b&&(b=et(b,4,w)),l&&(l=et(l,2,w)),u&&(u=et(u,2,w)),m&&(m=et(m,4,w)),d&&(d=et(d,4,w)),v&&(v=et(v,4,w)),p){let S=w;p=p.map(P=>({positions:P.positions?et(P.positions,3,S):void 0,normals:P.normals?et(P.normals,3,S):void 0,tangents:P.tangents?et(P.tangents,3,S):void 0}))}x=w.length,w=new Uint32Array(x);for(let S=0;S<x;S++)w[S]=S;c=Yn(o),y=!0}let k=e.material??-1,f=!1;if(!b&&c&&l&&g.topology==="triangle-list"&&k>=0){let S=r[k];if(S?.normalTexture){let P=S.normalTexture.texCoord===1&&u?u:l;b=Jn(o,c,P,w),f=!0}}let A;return s.min&&s.max&&s.min.length>=3&&s.max.length>=3&&!s.sparse&&!s.normalized?A={min:[s.min[0],s.min[1],s.min[2]],max:[s.max[0],s.max[1],s.max[2]]}:A=Qn(o),{positions:o,normals:c,tangents:b,uvs:l,uvs2:u,colors:m,joints:d,weights:v,indices:w,material:k,bounds:A,morphTargets:p,topology:g.topology,vertexCount:x,generatedNormals:y,generatedTangents:f}}function po(n,e,t){let r=n.json.meshes[e];return{name:r.name??`mesh${e}`,primitives:r.primitives.map(a=>fo(n,a,e,t)),weights:r.weights?.slice()}}function go(n){return(at(n,"KHR_lights_punctual")?.lights??[]).map(r=>{let a=r.type==="directional"||r.type==="spot"?r.type:"point",s=r.color,i={type:a,color:[be(s?.[0],1),be(s?.[1],1),be(s?.[2],1)],intensity:be(r.intensity,1)};if(typeof r.name=="string"&&(i.name=r.name),typeof r.range=="number"&&r.range>0&&(i.range=r.range),a==="spot"){let o=r.spot??{};i.innerConeAngle=be(o.innerConeAngle,0),i.outerConeAngle=be(o.outerConeAngle,Math.PI/4)}return i})}function yo(n){let e=Math.hypot(n[0],n[1],n[2]),t=Math.hypot(n[4],n[5],n[6]),r=Math.hypot(n[8],n[9],n[10]);n[0]*(n[5]*n[10]-n[6]*n[9])-n[4]*(n[1]*n[10]-n[2]*n[9])+n[8]*(n[1]*n[6]-n[2]*n[5])<0&&(e=-e);let s=e?1/e:0,i=t?1/t:0,o=r?1/r:0,c=n[0]*s,b=n[1]*s,l=n[2]*s,u=n[4]*i,m=n[5]*i,d=n[6]*i,v=n[8]*o,p=n[9]*o,M=n[10]*o,g,w,x,y,k=c+m+M;if(k>0){let A=Math.sqrt(k+1)*2;y=.25*A,g=(d-p)/A,w=(v-l)/A,x=(b-u)/A}else if(c>m&&c>M){let A=Math.sqrt(1+c-m-M)*2;y=(d-p)/A,g=.25*A,w=(b+u)/A,x=(v+l)/A}else if(m>M){let A=Math.sqrt(1+m-c-M)*2;y=(v-l)/A,g=(b+u)/A,w=.25*A,x=(d+p)/A}else{let A=Math.sqrt(1+M-c-m)*2;y=(b-u)/A,g=(v+l)/A,w=(d+p)/A,x=.25*A}let f=Math.hypot(g,w,x,y)||1;return{translation:[n[12],n[13],n[14]],rotation:[g/f,w/f,x/f,y/f],scale:[e,t,r]}}function vo(n,e){let r=(n.nodes??[]).map((a,s)=>{let i=[0,0,0],o=[0,0,0,1],c=[1,1,1];if(a.matrix&&a.matrix.length===16)({translation:i,rotation:o,scale:c}=yo(a.matrix));else{if(a.translation&&(i=[be(a.translation[0],0),be(a.translation[1],0),be(a.translation[2],0)]),a.rotation){let u=a.rotation,m=Math.hypot(u[0],u[1],u[2],u[3])||1;o=[u[0]/m,u[1]/m,u[2]/m,u[3]/m]}a.scale&&(c=[be(a.scale[0],1),be(a.scale[1],1),be(a.scale[2],1)])}let b={name:a.name??`node${s}`,children:(a.children??[]).slice(),parent:-1,mesh:a.mesh,skin:a.skin,camera:a.camera,translation:i,rotation:o,scale:c};a.weights&&(b.weights=a.weights.slice());let l=at(a,"KHR_lights_punctual");return l&&typeof l.light=="number"&&e[l.light]&&(b.light={...e[l.light]}),b});return r.forEach((a,s)=>{for(let i of a.children){if(!r[i])throw new Error(`glTF: node ${s} references missing child ${i}`);if(r[i].parent>=0)throw new Error(`glTF: node ${i} has multiple parents`);r[i].parent=s}}),r}function xo(n,e){let t=n.json.animations[e],r=0,a=t.samplers.map((i,o)=>{let c=Ve(n,i.input),b=Ve(n,i.output),l=i.interpolation==="STEP"||i.interpolation==="CUBICSPLINE"?i.interpolation:"LINEAR",u=c.length,m=l==="CUBICSPLINE"?3:1,d=u>0?Math.round(b.length/(u*m)):Dt(Ya(n,i.output));if(u>0&&d*u*m!==b.length)throw new Error(`glTF: animation ${e} sampler ${o}: output length ${b.length} does not match ${u} keys`);return u>0&&(r=Math.max(r,c[u-1])),{input:c,output:b,interpolation:l,components:d}}),s=[];for(let i of t.channels){let o=i.target.path;i.target.node!==void 0&&(o!=="translation"&&o!=="rotation"&&o!=="scale"&&o!=="weights"||s.push({node:i.target.node,path:o,sampler:i.sampler}))}return{name:t.name??`animation${e}`,channels:s,samplers:a,duration:r}}function es(n){return n+3&-4}function ts(n,e={}){let t=[],r=0,a=[],s=[],i=[],o=[],c=[],b=new Map,l=(y,k)=>{let f=new Uint8Array(y.buffer,y.byteOffset,y.byteLength),A=r,S=es(f.byteLength),P=new Uint8Array(S);return P.set(f),t.push(P),r+=S,a.push({buffer:0,byteOffset:A,byteLength:f.byteLength,...k?{target:k}:{}}),a.length-1},u=(y,k,f,A,S=!1)=>{let P=l(y,A),T=y.length/f,R={bufferView:P,componentType:y instanceof Float32Array?5126:5125,count:T,type:k};if(S){let L=Array(f).fill(1/0),z=Array(f).fill(-1/0);for(let j=0;j<T;j++)for(let I=0;I<f;I++){let F=y[j*f+I];F<L[I]&&(L[I]=F),F>z[I]&&(z[I]=F)}R.min=L,R.max=z}return s.push(R),s.length-1};for(let y of n){let k=y.object.mesh.source;if(!k)continue;let f=y.object.material,A=b.get(f);A===void 0&&(c.push({name:f.name,pbrMetallicRoughness:{baseColorFactor:Array.from(f.baseColor),metallicFactor:f.metallic,roughnessFactor:f.roughness},doubleSided:f.doubleSided,...f.alphaMode==="mask"?{alphaMode:"MASK",alphaCutoff:f.alphaCutoff}:{}}),A=c.length-1,b.set(f,A));let S={POSITION:u(Float32Array.from(k.positions),"VEC3",3,34962,!0),NORMAL:u(Float32Array.from(k.normals),"VEC3",3,34962)};k.uvs&&(S.TEXCOORD_0=u(Float32Array.from(k.uvs),"VEC2",2,34962)),k.tangents&&(S.TANGENT=u(Float32Array.from(k.tangents),"VEC4",4,34962));let P=u(Uint32Array.from(k.indices),"SCALAR",1,34963);i.push({name:y.name,primitives:[{attributes:S,indices:P,material:A}]}),o.push({name:y.name,mesh:i.length-1,matrix:Array.from(y.object.transform)})}let m={asset:{version:"2.0",generator:e.generator??"fondaine oAxis"},scene:0,scenes:[{nodes:o.map((y,k)=>k)}],nodes:o,meshes:i,materials:c,accessors:s,bufferViews:a,buffers:[{byteLength:r}]},d=new TextEncoder().encode(JSON.stringify(m)),v=es(d.byteLength),p=20+v+8+r,M=new ArrayBuffer(p),g=new DataView(M),w=new Uint8Array(M);g.setUint32(0,1179937895,!0),g.setUint32(4,2,!0),g.setUint32(8,p,!0),g.setUint32(12,v,!0),g.setUint32(16,1313821514,!0),w.set(d,20);for(let y=d.byteLength;y<v;y++)w[20+y]=32;let x=20+v;g.setUint32(x,r,!0),g.setUint32(x+4,5130562,!0),x+=8;for(let y of t)w.set(y,x),x+=y.byteLength;return M}function wo(n){return O.fromRotationTranslationScale(O.create(),n.rotation,n.translation,n.scale)}function Fr(n){let e=n.nodes.map(()=>O.create()),t=(r,a)=>{let s=wo(n.nodes[r]);a?O.multiply(e[r],a,s):O.copy(e[r],s);for(let i of n.nodes[r].children)t(i,e[r])};for(let r=0;r<n.nodes.length;r++)n.nodes[r].parent<0&&t(r,null);return e}function Bt(n,e,t={}){let r=n.textures,a=new Map,s=(d,v,p=!1)=>{if(!d)return null;let M=e.images[d.image];if(!M)return null;let g=`${d.image}|${v?1:0}`,w=a.get(g);return w||(w=r.fromImage(M,{srgb:v,normalMap:p,label:e.imageData[d.image]?.name}),a.set(g,w)),w},i=e.materials.map((d,v)=>{let p=d.metallicRoughnessTexture,M=!!d.occlusionTexture&&!!p&&d.occlusionTexture.image===p.image,g=s(p??d.occlusionTexture,!1),w=d.baseColorTexture?.transform,x=new pe({name:d.name||`gltf-mat-${v}`,baseColorMap:s(d.baseColorTexture,!0),normalMap:s(d.normalTexture,!1,!0),ormMap:g,emissiveMap:s(d.emissiveTexture,!0),baseColor:[...d.baseColorFactor],metallic:d.metallicFactor,roughness:d.roughnessFactor,normalScale:d.normalScale,occlusionStrength:M||!p&&d.occlusionTexture?d.occlusionStrength:0,emissive:d.emissiveFactor,emissiveLuminance:d.emissiveFactor[0]+d.emissiveFactor[1]+d.emissiveFactor[2]>0?100*(d.emissiveStrength??1):0,alphaMode:d.alphaMode==="MASK"?"mask":d.alphaMode==="BLEND"?"blend":"opaque",alphaCutoff:d.alphaCutoff,doubleSided:d.doubleSided,unlit:d.unlit,uvScale:w?w.scale:[1,1],uvOffset:w?w.offset:[0,0],uvRotation:w?w.rotation:0,specular:d.specularFactor!==void 0?.5*d.specularFactor:.5});return p&&!M&&!d.occlusionTexture&&(x.occlusionStrength=0),t.material&&(x=t.material(x,v)),x}),o=new pe({name:"gltf-default",baseColor:[.8,.8,.8,1],roughness:.6,metallic:0}),c=Fr(e),b=[],l=new Map,u=[1/0,1/0,1/0],m=[-1/0,-1/0,-1/0];return e.nodes.forEach((d,v)=>{if(d.mesh!==void 0)for(let p of e.meshes[d.mesh].primitives){if(p.topology!=="triangle-list")continue;let M=l.get(p);if(!M){let w=new fe(p.positions,p.normals??new Float32Array(p.positions.length),p.uvs??new Float32Array(p.vertexCount*2),p.indices);p.tangents&&(w.tangents=p.tangents),p.joints&&p.weights&&(w.joints=p.joints,w.weights=p.weights),M=new ve(n.dev,w.tangents?w:w.computeTangents(),{label:`${e.meshes[d.mesh].name}`,keepSource:t.keepSource}),l.set(p,M)}let g=c[v];b.push({node:v,nodeName:d.name,mesh:M,material:p.material>=0?i[p.material]:o,world:g,skinned:d.skin!==void 0&&!!p.joints,primitive:p});for(let w=0;w<8;w++){let x=[w&1?p.bounds.max[0]:p.bounds.min[0],w&2?p.bounds.max[1]:p.bounds.min[1],w&4?p.bounds.max[2]:p.bounds.min[2]],y=g[0]*x[0]+g[4]*x[1]+g[8]*x[2]+g[12],k=g[1]*x[0]+g[5]*x[1]+g[9]*x[2]+g[13],f=g[2]*x[0]+g[6]*x[1]+g[10]*x[2]+g[14];u[0]=Math.min(u[0],y),u[1]=Math.min(u[1],k),u[2]=Math.min(u[2],f),m[0]=Math.max(m[0],y),m[1]=Math.max(m[1],k),m[2]=Math.max(m[2],f)}}}),{asset:e,drawables:b,materials:i,nodeWorld:c,bounds:{min:u,max:m}}}function as(n,e,t=O.create(),r={}){return e.drawables.map(a=>{let s=new Me(a.mesh,a.material,O.multiply(O.create(),t,a.world));return s.castShadow=r.castShadow??!0,s.viewmodel=r.viewmodel??!1,n.add(s),s})}var au=K.create(),ru=K.create(),nu=K.create();var iu=new Float32Array(64);var bu=O.create(),du=O.create();var uu={t:new Float32Array(3),r:new Float32Array(4),s:new Float32Array(3)},mu=new Int32Array(1024);var yu=K.create(),vu=K.create(),xu=K.create(),wu=new Float32Array(4),Mu=new Float32Array(4);var Su=O.create(),Pu=O.create(),Tu=O.create(),zu=h.create(),Ru=h.create(),Lu=h.create(),Iu=h.create(),ju=h.create(),Gu=h.create(),Fu=h.create(),Eu=h.create(),Uu=h.create(),Ou=h.create(),Nu=K.create(),Cu=K.create(),Du=K.create(),Bu=K.create(),Vu=K.create(),Hu=h.create(1,0,0),Wu=h.create(0,0,1);function Pe(n,e,t=.0015,r=[]){return it(n,e,{bevel:t,bevelSegments:2,holes:r}).rotateY(Math.PI/2)}function ot(n,e,t,r=8e-4,a=[]){return it(n,e,{bevel:r,bevelSegments:2,holes:a}).translate(0,0,t)}function Fe(n,e,t,r=0,a=0,s=28){let i=Math.abs(t-e);return ut(n,n,i,s).rotateX(Math.PI/2).translate(a,r,(e+t)/2)}function Ee(n,e,t,r,a,s=16){return ut(n,n,e,s).rotateZ(Math.PI/2).translate(t,r,a)}function Lt(n,e,t,r,a,s=16){return ut(n,n,e,s).translate(t,r,a)}function Se(n,e,t,r,a,s=20){return ut(n,n,e,s).rotateX(Math.PI/2).translate(t,r,a)}function rt(n,e,t=0,r=32){return je(n,r).rotateX(-Math.PI/2).translate(0,t,e)}function Za(n,e,t,r,a=24){return je(n,a).rotateZ(-Math.PI/2).translate(e,t,r)}function ct(n,e,t,r,a,s="hex",i=16){let o=n*.55,c=[[0,0],[n,0],[n,o*.5],[n*.82,o*.9],[n*.45,o],[0,o]],b=je(c,i,40);if(s==="hex"){let l=n*.5,u=o*.6,m=Array.from({length:6},(d,v)=>[Math.cos(v/6*Math.PI*2)*l,Math.sin(v/6*Math.PI*2)*l]);b=fe.merge([b,it(m,u,{}).rotateX(-Math.PI/2).translate(0,o-u/2+2e-5,0).flipWinding()])}else s==="slot"&&(b=fe.merge([b,it([[-n*.8,-n*.12],[n*.8,-n*.12],[n*.8,n*.12],[-n*.8,n*.12]],o*.5,{}).rotateX(-Math.PI/2).translate(0,o-o*.25+2e-5,0).flipWinding()]));return b.rotateZ(a>0?-Math.PI/2:Math.PI/2).translate(e,t,r)}var He=class{pts=[];smooth=[];nrm=[];pt(e,t,r=!1,a=null){return this.pts.push([e,t]),this.smooth.push(r),this.nrm.push(a),this}arc(e,t,r,a,s,i=3){let o=s>=a?1:-1;for(let c=0;c<=i;c++){let b=a+(s-a)*c/i;this.pt(e+Math.cos(b)*r,t+Math.sin(b)*r,!0,[Math.cos(b)*o,Math.sin(b)*o])}return this}append(e){return this.pts.push(...e.pts),this.smooth.push(...e.smooth),this.nrm.push(...e.nrm??e.pts.map(()=>null)),this}done(){return{pts:this.pts,smooth:this.smooth,nrm:this.nrm}}};function Ue(n,e,t,r=3,a=0,s=0){let i=new He,o=Math.min(t,n/2-1e-6,e/2-1e-6),c=a-n/2+o,b=a+n/2-o,l=s-e/2+o,u=s+e/2-o;return i.arc(b,l,o,-Math.PI/2,0,r).arc(b,u,o,0,Math.PI/2,r).arc(c,u,o,Math.PI/2,Math.PI,r).arc(c,l,o,Math.PI,Math.PI*1.5,r),i.done()}function Ao(n,e,t=e,r=0,a=0){return{pts:n.pts.map(([s,i])=>[r+(s-r)*e,a+(i-a)*t]),smooth:n.smooth.slice(),nrm:Math.abs(e-t)<1e-9?n.nrm?.slice():void 0}}function Ke(n,e={}){if(n.length<2)throw new Error("loft needs \u2265 2 stations");let t=0;{let g=n[0].prof.pts;for(let w=0,x=g.length-1;w<g.length;x=w++)t+=(g[x][0]-g[w][0])*(g[x][1]+g[w][1])}t<0&&(n=n.map(g=>({...g,prof:{pts:[...g.prof.pts].reverse(),smooth:[...g.prof.smooth].reverse(),nrm:g.prof.nrm?[...g.prof.nrm].reverse().map(w=>w?[-w[0],-w[1]]:null):void 0}})));let r=n.length,a=n[0].prof.pts.length;for(let g of n)if(g.prof.pts.length!==a)throw new Error(`loft: profile point count mismatch (${g.prof.pts.length} vs ${a})`);let s=n[r-1].z>=n[0].z?1:-1,i=(g,w)=>{let x=n[g],[y,k]=x.prof.pts[w],f=x.z;return x.shear&&(f+=x.shear*(k-(x.shearY0??0))),x.shearX&&(f+=x.shearX*(y-(x.shearX0??0))),[y,k,f]},o=[];for(let g=0;g<r-1;g++){let w=new Float64Array(a*3);for(let x=0;x<a;x++){let y=(x+1)%a,k=i(g,x),f=i(g,y),A=i(g+1,y),S=i(g+1,x),P=[k,f,A,S],T=0,R=0,L=0;for(let j=0;j<4;j++){let I=P[j],F=P[(j+1)%4];T+=(I[1]-F[1])*(I[2]+F[2]),R+=(I[2]-F[2])*(I[0]+F[0]),L+=(I[0]-F[0])*(I[1]+F[1])}let z=Math.hypot(T,R,L);z>1e-14&&(w[x*3]=T/z*s,w[x*3+1]=R/z*s,w[x*3+2]=L/z*s)}o.push(w)}let c=[],b=[],l=[],u=[],m=(g,w,x,y)=>(c.push(g[0],g[1],g[2]),b.push(w[0],w[1],w[2]),l.push(x,y),c.length/3-1),d=(g,w,x,y,k)=>{let f=n[g+w].prof.nrm?.[x];if(f){let z=i(g,x),j=i(g+1,x),I=j[0]-z[0],F=j[1]-z[1],N=j[2]-z[2],G=w===0?g-1:g+1;if((w===0&&n[g].smooth||w===1&&n[g+1]?.smooth)&&G>=0&&G<r-1){let C=i(G,x),X=i(G+1,x);I+=X[0]-C[0],F+=X[1]-C[1],N+=X[2]-C[2]}let H=Math.hypot(I,F,N),_=f[0],V=f[1],U=0;if(H>1e-12){I/=H,F/=H,N/=H;let C=_*I+V*F;_-=I*C,V-=F*C,U-=N*C}let q=Math.hypot(_,V,U)||1;return[_/q,V/q,U/q]}let A=0,S=0,P=0,T=(z,j)=>{if(z<0||z>=r-1)return;let I=o[z];A+=I[j*3],S+=I[j*3+1],P+=I[j*3+2]},R=[g];w===0&&n[g].smooth&&R.push(g-1),w===1&&n[g+1]?.smooth&&R.push(g+1);for(let z of R)T(z,y),k&&T(z,y===x?(x+a-1)%a:x);let L=Math.hypot(A,S,P);if(L<1e-9){let z=o[g],j=Math.hypot(z[y*3],z[y*3+1],z[y*3+2])||1;return[z[y*3]/j,z[y*3+1]/j,z[y*3+2]/j]}return[A/L,S/L,P/L]},v=new Float64Array(a+1);for(let g=0;g<a;g++){let w=n[0].prof.pts[g],x=n[0].prof.pts[(g+1)%a];v[g+1]=v[g]+Math.hypot(x[0]-w[0],x[1]-w[1])}let p=e.v0??0;for(let g=0;g<r-1;g++){let w=n[g],x=n[g+1],y=Math.abs(x.z-w.z);for(let k=0;k<a;k++){let f=(k+1)%a,A=o[g];if(A[k*3]===0&&A[k*3+1]===0&&A[k*3+2]===0)continue;let S=w.prof.smooth[k],P=w.prof.smooth[f],T=m(i(g,k),d(g,0,k,k,S),v[k],p),R=m(i(g,f),d(g,0,f,k,P),v[k+1],p),L=m(i(g+1,f),d(g,1,f,k,P),v[k+1],p+y),z=m(i(g+1,k),d(g,1,k,k,S),v[k],p+y);s>0?u.push(T,R,L,T,L,z):u.push(T,L,R,T,z,L)}p+=y}let M=(g,w)=>{let x=n[g].prof.pts,y=fr(x),k=c.length/3;for(let f=0;f<a;f++)m(i(g,f),[0,0,w],x[f][0],x[f][1]);for(let f=0;f<y.length;f+=3)w>0?u.push(k+y[f],k+y[f+1],k+y[f+2]):u.push(k+y[f],k+y[f+2],k+y[f+1])};return e.capStart!==!1&&M(0,-s),e.capEnd!==!1&&M(r-1,s),new fe(c,b,l,u)}function Mt(n,e,t,r={}){return Ke([{z:e,prof:n},{z:t,prof:n}],r)}function rs(n,e,t,r,a,s=0,i=0,o={}){let c=r>=t?1:-1,b=a.map(([u,m])=>c>0?[Math.min(u,m),Math.max(u,m)]:[Math.max(u,m),Math.min(u,m)]).sort((u,m)=>(u[0]-m[0])*c),l=[{z:t,prof:n}];for(let[u,m]of b)l.push({z:u,prof:n,shear:s,shearY0:i},{z:u,prof:e,shear:s,shearY0:i},{z:m,prof:e,shear:s,shearY0:i},{z:m,prof:n,shear:s,shearY0:i});return l.push({z:r,prof:n}),Ke(l,o)}function ns(n,e,t=[0,0,-1],r=()=>[1,1],a={}){let s=e.length,i=[0];for(let p=1;p<s;p++)i.push(i[p-1]+Math.hypot(e[p][0]-e[p-1][0],e[p][1]-e[p-1][1],e[p][2]-e[p-1][2]));let o=i[s-1],c=e.map((p,M)=>{let[g,w]=r(i[M]/o);return{z:i[M],prof:Ao(n,g,w),smooth:M>0}}),b=Ke(c,a),l=e.map((p,M)=>{let g=e[Math.max(0,M-1)],w=e[Math.min(s-1,M+1)],x=[w[0]-g[0],w[1]-g[1],w[2]-g[2]],y=Math.hypot(x[0],x[1],x[2])||1;x=x.map(T=>T/y);let k=t,f=k[0]*x[0]+k[1]*x[1]+k[2]*x[2],A=[k[0]-x[0]*f,k[1]-x[1]*f,k[2]-x[2]*f],S=Math.hypot(A[0],A[1],A[2])||1;A=A.map(T=>T/S);let P=[A[1]*x[2]-A[2]*x[1],A[2]*x[0]-A[0]*x[2],A[0]*x[1]-A[1]*x[0]];return{p,t:x,x:P,y:A}}),u=(p,M,g)=>{let w=0;for(;w<s-2&&i[w+1]<g-1e-9;)w++;let x=l[w],y=l[Math.min(s-1,w+1)],k=i[w+1]-i[w]||1,f=Math.max(0,Math.min(1,(g-i[w])/k)),A=(R,L)=>[R[0]+(L[0]-R[0])*f,R[1]+(L[1]-R[1])*f,R[2]+(L[2]-R[2])*f],S=A(x.p,y.p),P=A(x.x,y.x),T=A(x.y,y.y);return[S[0]+P[0]*p+T[0]*M,S[1]+P[1]*p+T[1]*M,S[2]+P[2]*p+T[2]*M]},m=p=>{let M=0;for(;M<s-2&&i[M+1]<p-1e-9;)M++;let g=l[M],w=l[Math.min(s-1,M+1)],x=i[M+1]-i[M]||1,y=Math.max(0,Math.min(1,(p-i[M])/x)),k=(f,A)=>[f[0]+(A[0]-f[0])*y,f[1]+(A[1]-f[1])*y,f[2]+(A[2]-f[2])*y];return{x:k(g.x,w.x),y:k(g.y,w.y),t:k(g.t,w.t)}},d=b.positions,v=b.normals;for(let p=0;p<d.length;p+=3){let M=m(d[p+2]),g=u(d[p],d[p+1],d[p+2]),w=v[p],x=v[p+1],y=v[p+2],k=M.x[0]*w+M.y[0]*x+M.t[0]*y,f=M.x[1]*w+M.y[1]*x+M.t[1]*y,A=M.x[2]*w+M.y[2]*x+M.t[2]*y,S=Math.hypot(k,f,A)||1;d[p]=g[0],d[p+1]=g[1],d[p+2]=g[2],v[p]=k/S,v[p+1]=f/S,v[p+2]=A/S}return b}var Vt=class{constructor(e){this.renderer=e}buckets=new Map;triangles=0;add(e,t,r={}){let a=`${t.id}|${r.magazine?1:0}${r.bolt?1:0}${r.trigger?1:0}${r.selector?1:0}${r.charge?1:0}${r.round?1:0}`,s=this.buckets.get(a)??{m:t,geoms:[],flags:r};return s.geoms.push(e.tangents?e:e.computeTangents()),this.triangles+=e.triangleCount,this.buckets.set(a,s),this}finish(){let e=[];for(let t of this.buckets.values()){let r=new Me(new ve(this.renderer.dev,fe.merge(t.geoms),{label:t.m.name,keepSource:!0}),t.m);e.push({object:r,local:O.create(),...t.flags})}return e}};var Oe={textureSize:2048,detail:1.5},ss="fondaine.oaxis.settings";try{let n=typeof localStorage<"u"?localStorage.getItem(ss):null;n&&Object.assign(Oe,JSON.parse(n))}catch{}function is(n){let e=n.scope(mt.oaxis),t=()=>{try{localStorage.setItem(ss,JSON.stringify(Oe))}catch{}};e.number("Models",Oe,"textureSize",{label:"Texture resolution",min:256,max:4096,step:256,unit:"px",help:"Procedural PBR texture size for weapons/props. Applies on reload (load time grows with it).",onChange:t}).number("Models",Oe,"detail",{label:"Geometry detail",min:.5,max:3,step:.25,help:"Radial segments and bevel smoothness multiplier. Applies on reload.",onChange:t})}function oe(n){return Math.max(6,Math.round(n*Oe.detail))}function So(n,e){try{if(typeof document<"u"){let t=document.createElement("canvas");return t.width=n,t.height=e,t}if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(n,e)}catch{}return null}function ht(n,e,t,r,a={}){let s=a.px??1024,i=s,o=Math.max(16,Math.round(s*r/t)),c=So(i,o);if(!c)return null;let b=c.getContext("2d");if(!b)return null;b.clearRect(0,0,i,o);let l=e.length,u=o/l,m=Math.floor(u*.62);b.fillStyle="#ffffff",b.strokeStyle="#ffffff",b.textBaseline="middle",b.textAlign=a.align??"left",b.font=`${a.font??"bold"} ${m}px "Arial Narrow", "DejaVu Sans Condensed", "Liberation Sans Narrow", Arial, sans-serif`;let d=(a.tracking??.08)*m,v=a.align==="center"?i/2:a.align==="right"?i-m*.3:m*.3;for(let T=0;T<l;T++){let R=u*(T+.5),L=e[T],z=[...L].map(F=>b.measureText(F).width),j=z.reduce((F,N)=>F+N,0)+d*(L.length-1),I=a.align==="center"?v-j/2:a.align==="right"?v-j:v;b.textAlign="left";for(let F=0;F<L.length;F++)b.fillText(L[F],I,R),(a.weight??.08)>0&&(b.lineWidth=Math.max(1,m*(a.weight??.08)*.5),b.strokeText(L[F],I,R)),I+=z[F]+d}let M=b.getImageData(0,0,i,o).data,g=a.color??[.42,.42,.43],w=T=>Math.round(255*(T<=.0031308?T*12.92:1.055*Math.pow(T,1/2.4)-.055)),x=new Uint8Array(i*o*4),y=new Float32Array(i*o);for(let T=0;T<i*o;T++){let R=M[T*4+3]/255;y[T]=R,x[T*4]=w(g[0]),x[T*4+1]=w(g[1]),x[T*4+2]=w(g[2]),x[T*4+3]=Math.round(R*255)}let k=new Uint8Array(i*o*4),f=2.2;for(let T=0;T<o;T++)for(let R=0;R<i;R++){let L=T*i+R,z=y[T*i+Math.max(0,R-1)],j=y[T*i+Math.min(i-1,R+1)],I=y[Math.max(0,T-1)*i+R],F=y[Math.min(o-1,T+1)*i+R],N=(j-z)*f,G=-(F-I)*f,H=1,_=Math.hypot(N,G,H);N/=_,G/=_,H/=_,k[L*4]=Math.round((N*.5+.5)*255),k[L*4+1]=Math.round((G*.5+.5)*255),k[L*4+2]=Math.round((H*.5+.5)*255),k[L*4+3]=255}let A=n.textures,S=A.fromRGBA8(x,i,o,{srgb:!0,label:"engrave.albedo"}),P=A.fromRGBA8(k,i,o,{normalMap:!0,label:"engrave.normal"});return new pe({name:"engraving",baseColorMap:S,normalMap:P,baseColor:[1,1,1,1],roughness:a.roughness??.6,metallic:a.metallic??1,alphaMode:"mask",alphaCutoff:.35,normalScale:.8,uvScale:[1,1],sampler:A.sampler({address:"clamp-to-edge"})})}function ft(n,e,t,r,a,s){let i=s<0?t-r/2:t+r/2,o=s<0?t+r/2:t-r/2,c=[n,e-a/2,i,n,e-a/2,o,n,e+a/2,o,n,e+a/2,i],b=[s,0,0,s,0,0,s,0,0,s,0,0],l=[0,1,1,1,1,0,0,0];return new fe(c,b,l,[0,1,2,0,2,3]).computeTangents()}var er={slideRear:.088,slideFront:-.0975,slideTop:.0165,slideBottom:-.0115,slideWidth:.0255,frameWidth:.0265,sightLine:.0225,rearSightZ:.082,frontSightZ:-.088,slideTravel:.034,portZ0:-.003,portZ1:-.04},os=Math.PI*2;function It(n){let e=er,t=n.hw??e.slideWidth/2,r=n.yb??e.slideBottom,a=n.yt??e.slideTop,s=n.chamfer??.0042,i=7e-4,o=5e-4,c=2,b=-.0055,l=.0105,u=n.grooveR??0,m=n.grooveL??0,d=!!n.port,v=n.xin??-t+.0075,p=n.portFloor??-5e-4,M=d?p:l,g=new He;g.arc(t-i,r+i,i,-Math.PI/2,0,c),g.pt(t,b).pt(t-u,b).pt(t-u,M).pt(t,M);let w=o*Math.tan(Math.PI/8),x=Math.SQRT1_2,y=(k,f,A,S)=>{let P=[k-A[0]*w,f-A[1]*w],T=[k+S[0]*w,f+S[1]*w],R=[-A[1],A[0]],L=[P[0]+R[0]*o,P[1]+R[1]*o],z=Math.atan2(P[1]-L[1],P[0]-L[0]),I=Math.atan2(T[1]-L[1],T[0]-L[0])-z;for(;I>Math.PI;)I-=os;for(;I<-Math.PI;)I+=os;g.arc(L[0],L[1],o,z,z+I,c)};if(d){for(let k=0;k<=c;k++)g.pt(t,p);for(let k=0;k<=c;k++)g.pt(v,p)}else y(t,a-s,[0,1],[-x,x]),y(t-s,a,[-x,x],[-1,0]);return g.pt(v,a,!d),y(-t+s,a,[-1,0],[-x,-x]),y(-t,a-s,[-x,-x],[0,-1]),g.pt(-t,l).pt(-t+m,l).pt(-t+m,b).pt(-t,b),g.arc(-t+i,r+i,i,Math.PI,Math.PI*1.5,c),g.done()}function $a(n,e=0){let t=(n-.028)/.08850000000000001,r=.0185+.0229*t,a=.0725+.0161*t;r+=7e-4*(Math.exp(-((n-.067)**2)/(2*.006**2))+Math.exp(-((n-.089)**2)/(2*.006**2))),a+=.0016*Math.exp(-((n-.078)**2)/(2*.014**2))-6e-4*Math.exp(-((n-.034)**2)/(2*.008**2));let s=.0128+.0021*Math.sin(Math.PI*Math.min(1,Math.max(0,(n-.03)/.09)))**.7;s+=e,r-=e*.6,a+=e*.8;let i=Math.min(.0098,s-.0012),o=Math.min(.0068,s-.0012),c=new He;return c.arc(s-i,r+i,i,-Math.PI/2,0,5),c.arc(s-o,a-o,o,0,Math.PI/2,4),c.arc(-s+o,a-o,o,Math.PI/2,Math.PI,4),c.arc(-s+i,r+i,i,Math.PI,Math.PI*1.5,5),c.done()}function cs(n,e={}){let t=performance.now(),r=n.synth,a=e.textureSize??Oe.textureSize,s=Math.min(a,1024),i=Math.min(a,512),o=er,c=r.material("nitride",{size:a,tileMeters:.12,color:e.slideColor??[.036,.037,.04],wear:.18,roughness:.4,seed:41,bumpMm:.004},{name:"c15-slide-nitride",edgeWear:.75,edgeWearRadius:.0028}),b=r.material("machined",{size:s,tileMeters:.05,color:[.4,.4,.41],wear:.3,roughness:.42,seed:42,extra:1},{name:"c15-barrel",edgeWear:.3}),l=e.frameColor??[.03,.03,.032],u=r.material("polymer",{size:a,tileMeters:.12,color:l,extra:.35,roughness:.56,bumpMm:.12,seed:43},{name:"c15-frame",edgeWear:.3,edgeWearRadius:.0025}),m=r.material("polymer",{size:a,tileMeters:.16,color:l,extra:.97,roughness:.62,bumpMm:.4,seed:44},{name:"c15-stipple",edgeWear:.2}),d=r.material("parkerized",{size:s,tileMeters:.06,color:[.02,.02,.021],wear:.12,seed:45},{name:"c15-steel-black",edgeWear:.5,edgeWearRadius:.002}),v=r.material("parkerized",{size:s,tileMeters:.05,color:[.045,.046,.045],wear:.3,seed:46},{name:"c15-parkerized",edgeWear:.6,edgeWearRadius:.002}),p=r.material("machined",{size:i,tileMeters:.02,color:[.3,.3,.31],wear:.4,seed:47,extra:.4},{name:"c15-pins"}),M=r.material("nitride",{size:s,tileMeters:.1,color:[.034,.034,.036],wear:.3,roughness:.45,seed:48},{name:"c15-mag-body",edgeWear:.75,edgeWearRadius:.0025}),g=r.material("brass",{size:i,tileMeters:.03,seed:49},{name:"c15-brass"}),w=new pe({name:"c15-sight-white",baseColor:[.85,.85,.8,1],roughness:.5,metallic:0}),x=new pe({name:"c15-follower",baseColor:[.75,.22,.03,1],roughness:.6,metallic:0}),y=new pe({name:"c15-cavity",baseColor:[.02,.02,.02,1],roughness:.9,metallic:.3}),k=e.frontSight==="white"?w:new pe({name:"c15-tritium",baseColor:[.75,.9,.72,1],roughness:.3,metallic:0,emissive:[.35,1,.4],emissiveLuminance:40}),f=new Vt(n),A={bolt:!0},S={magazine:!0},P=o.slideWidth/2;{let I=It({}),F=It({grooveL:6e-4,grooveR:6e-4}),N=It({port:!0}),G=-.16,H=.0025,_=[];_.push({z:o.slideRear,prof:It({yt:o.slideTop-.0035,chamfer:.0042})}),_.push({z:o.slideRear-.0035,prof:I});let V=(Q,E)=>_.push({z:Q,prof:I,shear:G,shearY0:H},{z:Q,prof:E,shear:G,shearY0:H},{z:Q-.0015,prof:E,shear:G,shearY0:H},{z:Q-.0015,prof:I,shear:G,shearY0:H});for(let Q=0;Q<8;Q++)V(.0775-Q*.0034,F);_.push({z:o.portZ0+.004,prof:I},{z:o.portZ0+.004,prof:It({port:!0,portFloor:.0075})}),_.push({z:o.portZ0,prof:It({port:!0,portFloor:.0075})},{z:o.portZ0,prof:N}),_.push({z:o.portZ1,prof:N},{z:o.portZ1,prof:I});for(let Q=0;Q<5;Q++)V(-.0565-Q*.0034,F);_.push({z:-.0905,prof:I}),_.push({z:o.slideFront,prof:It({yb:-.0085,yt:.0118,hw:P-.0022,chamfer:.0042})}),f.add(Ke(_),c,A),f.add(Se(.0082,4e-4,0,0,o.slideFront-15e-5,oe(28)),y,A),f.add(Se(.0046,6e-4,0,-.0068,o.slideFront-15e-5,oe(20)),y,A),f.add(Se(.0031,.0012,0,-.0068,o.slideFront-2e-4,oe(16)),v,A),f.add(Se(.0011,5e-4,6e-4,0,o.portZ0+1e-4,10),y,A),f.add(me(.0012,.0046,.0205,4e-4).translate(P-4e-4,.0048,o.portZ0+.0105),v,A),f.add(me(9e-4,.0028,.004,3e-4).translate(P+3e-4,.0048,o.portZ0+.0185),v,A),f.add(Ee(.0029,.0014,-P-1e-4,.004,.074,oe(16)),v,{bolt:!0,selector:!0}),f.add(me(.0018,.0115,.0046,8e-4).translate(-P-.0012,.004+.0058,.074),v,{bolt:!0,selector:!0});for(let Q=0;Q<4;Q++)f.add(we(4e-4,4e-4,.004).translate(-P-.0021,.0065+Q*.0022,.074),d,{bolt:!0,selector:!0});f.add(ot(Ue(.0178,.0218,.0018,3,0,.0018).pts,.0012,o.slideRear+6e-4,4e-4),v,A),f.add(Se(.0028,4e-4,0,6e-4,o.slideRear+.00125,14),y,A),f.add(Se(.0017,7e-4,0,6e-4,o.slideRear+.0013,12),p,A);let U=o.sightLine,q=o.slideTop-3e-4,C=.0019,X=.0031,te=[[-.0105,q],[.0105,q],[.0105,U-.0014],[.0094,U],[C,U],[C,U-X],[-C,U-X],[-C,U],[-.0094,U],[-.0105,U-.0014]];f.add(ot(te,.0092,o.rearSightZ-.0046,5e-4),v,A);for(let Q=0;Q<5;Q++)f.add(we(.0186,5e-4,4e-4).translate(0,q+9e-4+Q*.001,o.rearSightZ+1e-4),d,A);for(let Q of[-1,1])f.add(Se(.0012,4e-4,Q*.0058,U-.0021,o.rearSightZ+2e-4),w,A);f.add(Pe([[-o.frontSightZ-.0028,o.slideTop-3e-4],[-o.frontSightZ+.0022,o.slideTop-3e-4],[-o.frontSightZ+.0022,o.sightLine],[-o.frontSightZ-.001,o.sightLine]],.0036,3e-4),v,A);let W=o.sightLine-.0022;f.add(Se(.0013,3e-4,0,W,o.frontSightZ+.00235),w,A),f.add(Se(75e-5,5e-4,0,W,o.frontSightZ+.00245),k,A)}{let I=Ue(.0168,.0246,.0042,4,6e-4,.0035);f.add(Mt(I,o.portZ0-2e-4,o.portZ1-.003),b),f.add(Se(.0052,4e-4,6e-4,0,o.portZ0+5e-5,oe(20)),y),f.add(rt([[.0071,0],[.0071,.006],[.0082,.009],[.0082,0],[.0071,0]],o.portZ1-.003,0,oe(28)),b),f.add(Fe(.0071,o.portZ1-.003,o.slideFront+6e-4,0,0,oe(32)),b),f.add(rt([[.0046,0],[.0062,0],[.0071,9e-4],[.0071,.0012],[.0046,.0012]],o.slideFront+4e-4,0,oe(32)),b),f.add(Se(.0046,4e-4,0,0,o.slideFront-4e-4),y)}let T=o.frameWidth;{let I=[[-.094,-.0132],[.0905,-.0132],[.094,-.0168],[.094,-.0262],[.051,-.0268],[.0485,-.0288],[-.0125,-.0288],[-.0185,-.0335],[-.0185,-.047],[-.0775,-.054],[-.0738,-.0305],[-.0845,-.0228],[-.0915,-.0168],[-.094,-.0138]];f.add(Pe(I,T,.0022),u),f.add(Pe([[-.0915,-.0133],[.0905,-.0133],[.0905,-.0117],[-.0915,-.0117]],T-.0028,4e-4),d);for(let C of[-1,1])f.add(we(.0012,.0014,.028).translate(C*(T/2-.0014+3e-4),-.0125,-.055),p),f.add(we(.0012,.0014,.02).translate(C*(T/2-.0014+3e-4),-.0125,.065),p);let F=[[.051,-.0262],[.0498,-.03],[.0485,-.036],[.0472,-.0532],[.0415,-.0588],[.03,-.06],[-.004,-.059],[-.013,-.052],[-.0188,-.0455],[-.0188,-.0262]],N=[[.0405,-.0315],[.0405,-.0495],[.037,-.0528],[-.0035,-.0528],[-.0102,-.047],[-.013,-.0315]];f.add(Pe(F,.0112,.0032,[N]),u);let G=[];for(let C=.028;C<=.1125+1e-9;C+=.0035)G.push(C);let H=G.filter(C=>C<=.0455+1e-9),_=G.filter(C=>C>=.0455-1e-9),V=(C,X=[])=>Ke([...C.map((te,W)=>({z:te,prof:$a(te),smooth:W>0})),...X],{capStart:!1,capEnd:!1}).rotateX(Math.PI/2);f.add(V(H),u),f.add(V(_,[{z:.1145,prof:$a(.1145,8e-4),smooth:!0},{z:.1165,prof:$a(.1165,.0016),smooth:!1},{z:.1172,prof:$a(.1165,.0014)}]),m);let U=Mt(Ue(.0236,.0356,.004,4),0,.105,{capEnd:!1}).flipWinding();f.add(U.rotateX(Math.PI/2-Math.atan2(.309,.951)).translate(0,-.0135,.0365),y);for(let C of[-1,1]){let X=it(Ue(.0205,.052,.004,4).pts,.0012,{bevel:5e-4,bevelSegments:2});f.add(X.rotateY(C*Math.PI/2).transform(Po(C)),m)}{let C=new He().pt(.0105,-.0262).pt(.0105,-.0278).pt(.0083,-.03).pt(-.0083,-.03).pt(-.0105,-.0278).pt(-.0105,-.0262).done(),X=new He().pt(.0105,-.0262).pt(.0105,-.0266).pt(.0083,-.0266).pt(-.0083,-.0266).pt(-.0105,-.0266).pt(-.0105,-.0262).done();f.add(rs(C,X,-.05,-.092,[[-.061,-.0662],[-.075,-.0802]]),u)}f.add(Ee(.0016,T+6e-4,0,-.0215,-.01,14),p),f.add(Ee(.0016,T+6e-4,0,-.018,-.034,14),p),f.add(Ee(.0015,T+6e-4,0,-.0215,.072,14),p);for(let C of[-1,1]){f.add(me(.0011,.0028,.0096,5e-4).translate(C*(T/2+4e-4),-.0165,-.044),v);for(let X=0;X<4;X++)f.add(we(5e-4,.0032,5e-4).translate(C*(T/2+9e-4),-.0165,-.0405-X*.0022),d)}let q=[[.004,-.0138],[.0262,-.0138],[.03,-.015],[.032,-.0172],[.0282,-.0188],[.021,-.0176],[.012,-.0165],[.004,-.0162]];if(f.add(Pe(q,.0016,4e-4).translate(-T/2-9e-4,0,0),v),f.add(Pe([[.018,-.0132],[.026,-.0132],[.0276,-.0148],[.0176,-.016]],.0024,5e-4).translate(-T/2-.0016,0,0),v),f.add(ct(.0017,-T/2-.0018,-.018,-.034,-1,"dome",12),p),f.add(me(.0024,.0098,.0106,.0014).translate(-T/2-.0012+6e-4,-.0395,.0135),u),f.add(me(.0034,.0066,.0074,.0012).translate(-T/2-.0022,-.0395,.0135),m),f.add(me(.0012,.0066,.0074,8e-4).translate(T/2+4e-4,-.0395,.0135),v),e.engravings!==!1){let C=ht(n,["C15 COMPACT  9x19"],.054,.0046,{px:1024,tracking:.12});C&&f.add(ft(-P-6e-5,.0032,.0135,.054,.0046,-1),C,A);let X=ht(n,["FONDAINE ARMS   MOD. C15"],.066,.0034,{px:1024,tracking:.1});X&&f.add(ft(P+6e-5,-.0062,.012,.066,.0034,1),X,A);let te=me(8e-4,.0062,.03,3e-4).translate(T/2+15e-5,-.0205,-.07);f.add(te,p);let W=ht(n,["FA 2209 0417"],.028,.0036,{px:512,color:[.12,.12,.125],metallic:.9,roughness:.5,tracking:.1});W&&f.add(ft(T/2+62e-5,-.0205,-.07,.028,.0036,1),W);let Q=ht(n,["C15"],.009,.0045,{px:256,color:[.07,.07,.072],metallic:0,roughness:.7,tracking:.05,align:"center"});Q&&f.add(ft(-T/2-6e-5,-.0225,-.075,.009,.0045,-1),Q)}}{let I=[[.0098,-.03],[.015,-.03],[.0146,-.035],[.0126,-.042],[.0094,-.0478],[.006,-.05],[.0046,-.049],[.0072,-.044],[.0094,-.0378]];f.add(Pe(I,.0066,.001),v,{trigger:!0}),f.add(Pe([[.0152,-.034],[.0166,-.0345],[.0146,-.047],[.012,-.0478],[.0126,-.042]],.0022,5e-4),d,{trigger:!0})}{let I=Math.PI/2-Math.atan2(.309,.951),F=V=>V.rotateX(I).translate(0,-.0195,.0385),N=Ue(.0222,.0338,.0038,4),G=Ue(.0214,.033,.0036,4);f.add(F(Ke([{z:-.001,prof:G},{z:.006,prof:N,smooth:!0},{z:.1005,prof:N}],{capStart:!1})),M,S),f.add(F(Mt(Ue(.0196,.03,.003,3),-.0035,.004)),x,S);let H=je([[0,0],[.00495,0],[.00495,.0185],[.0047,.0195],[.004,.0235],[.0026,.0272],[.001,.029],[0,.0293]],oe(20));f.add(H.rotateX(-Math.PI/2).translate(.0025,-.0155,.0535),g,{...S,round:!0});let _=Ue(.0262,.0392,.0032,3);f.add(F(Ke([{z:.0995,prof:Ue(.0232,.0348,.003,3)},{z:.1015,prof:_},{z:.1075,prof:_},{z:.1095,prof:Ue(.0242,.0372,.0032,3)}])),u,S),f.add(F(Se(.0028,6e-4,0,.004,.1097,12)),p,S);for(let V=0;V<6;V++)f.add(F(Lt(.0011,6e-4,0,.0169,.018+V*.0145,10)),y,S)}let R=f.finish(),L=new ve(n.dev,wt(.019,.0099,je,{straight:!0})),z={parts:R,muzzle:h.create(0,0,o.slideFront-.001),ejectionPort:h.create(.0105,.0125,(o.portZ0+o.portZ1)/2),rearSight:h.create(0,o.sightLine,o.rearSightZ),frontSight:h.create(0,o.sightLine,o.frontSightZ),casingMesh:L,casingMaterial:g,magAxis:h.normalize(h.create(),h.create(0,-.951,.309)),magBox:{center:h.create(0,-.07,.051),half:h.create(.0131,.053,.019)},triggerTravelM:.0045,selector:{pivot:[-o.slideWidth/2-8e-4,.004,.074],axis:[1,0,0],angles:{safe:0,semi:-.9,auto:-1.8}},charge:{grip:h.create(0,o.slideTop+.004,.064),travelM:o.slideTravel,release:"slingshot",pullDir:h.create(0,0,1)}},j={triangles:f.triangles,buildMs:performance.now()-t};return console.info(`[oaxis] C15 Compact: ${j.triangles.toLocaleString()} tris in ${j.buildMs.toFixed(0)} ms`),{model:z,spec:Ur(o.sightLine),grips:Er,stats:j}}function Po(n){let t=.576271186440678,r=.0185+.0229*t,a=.0725+.0161*t,s=.0128+.0021*Math.sin(Math.PI*Math.min(1,Math.max(0,(.079-.03)/.09)))**.7,i=Math.atan2(.0229+.0161,2*(.1165-.028)),o=Math.cos(i),c=Math.sin(i);return new Float32Array([1,0,0,0,0,o,-c,0,0,c,o,0,n*(s-1e-4),-.079,(r+a)/2,1])}var Er={right:{position:[.0285,-.0326,.1253],fingerDir:[0,-.309,-.951],dorsal:[1,0,0],fingers:[{curl:[.5,.7,.3],spread:.1},{curl:[1.25,1.35,.7]},{curl:[1.3,1.35,.7]},{curl:[1.35,1.3,.7]}],thumb:{dir:[-.55,-.55,-.62],bend:[.15,.1]}},indexPressed:{curl:[.55,.95,.45],spread:.08},left:{position:[-.034,-.0325,.0823],fingerDir:[0,-.5,-.866],dorsal:[-1,0,0],fingers:[{curl:[1.15,1.2,.6]},{curl:[1.2,1.2,.6]},{curl:[1.2,1.2,.6]},{curl:[1.2,1.15,.6]}],thumb:{dir:[-.5,-.1,-.86],bend:[.05,.05]}},leftOnMagazine:{position:[0,-.15,.13],fingerDir:[0,.25,-.97],dorsal:[0,-1,0],fingers:[{curl:[.9,.9,.4]},{curl:[.95,.9,.4]},{curl:[.95,.9,.4]},{curl:[.95,.9,.4]}],thumb:{dir:[-.7,.2,-.6],bend:[.2,.1]}}};function Ur(n=er.sightLine){return{name:"C15 Compact 9mm",caliber:Xa["9x19 124gr"],barrelLengthM:.102,massKg:.84,rpm:1100,fireModes:["safe","semi","auto"],magazineCapacity:15,sightHeightM:n,zeroM:23,accuracyMoa:3,recoil:{boreAboveShoulderM:.045,inertia:.075,shoulderMassKg:3.5,holdOmega:15,holdDamping:.55,horizontalRatio:.3,viewCouplingHip:.04,viewCouplingAds:.1,residualRise:.06},reload:{magOut:.45,magIn:.85,boltRelease:.35},audio:Ha.pistol9mm,flash:{kelvin:1850,luminance:45e4,sizeM:.07,lightCandela:12e3,sidePorts:!1,smoke:.5},ejection:{speed:3.2,up:2.4,back:1,spinRad:35},hipOffset:[.05,-.118,-.38],eyeRelief:.56,adsTime:.22,action:{travelM:er.slideTravel,backMs:5,returnMs:8,lockOpenOnEmpty:!0,lockFraction:.93},drawTime:.45}}var $={seam:-.012,upperHW:.015,lowerHW:.0148,railTop:.0307,railNeck:.0276,upperRear:.115,upperFront:-.118,boltFace:-.054,portZ0:.009,portZ1:-.049,portY0:-.006,portY1:.013,hgZ0:-.122,hgZ1:-.463,barrelLen:.406,tubeR:.0146,slotPitch:.01001,slotW:.00523},kt=Math.PI*2;function bs(n,e,t,r=$.railTop,a=$.railNeck){t?n.pt(e,a).pt(e,a).pt(e,a):n.pt(e,a).pt(e+.0023,a+.0023).pt(e+.0023,r)}function ds(n,e,t,r=$.railTop,a=$.railNeck){t?n.pt(-e,a).pt(-e,a).pt(-e,a):n.pt(-(e+.0023),r).pt(-(e+.0023),a+.0023).pt(-e,a)}function To(n={}){let e=$.upperHW,t=$.seam,r=.004,a=e,s=.0018,i=2,o=.0105,c=.00783,b=$.railNeck-.0015,l=.0125,u=.0012,m=Math.acos(o/a),d=new He;d.arc(e-s,t+s,s,-Math.PI/2,0,i);let v=6,p=14;if(d.pt(e,$.portY0),n.port){let M=Math.sqrt(l*l-($.portY0-u)**2),g=Math.sqrt(l*l-($.portY1-u)**2);d.pt(M,$.portY0);let w=Math.atan2($.portY0-u,M),x=Math.atan2($.portY1-u,g)-kt;d.arc(0,u,l,w,x,p-1);let y=Math.sqrt(a*a-($.portY1-r)**2);d.pt(y,$.portY1);let k=Math.asin(($.portY1-r)/a);for(let f=0;f<=v;f++){let A=k+(m-k)*f/v;d.pt(Math.cos(A)*a,r+Math.sin(A)*a,f>0&&f<v)}}else{for(let M=0;M<=p;M++)d.pt(e,$.portY0);d.pt(e,r,!0);for(let M=0;M<=v;M++){let g=m*M/v;d.pt(Math.cos(g)*a,r+Math.sin(g)*a,M>0&&M<v)}}d.pt(o,b).pt(c,b),bs(d,c,!!n.cut),ds(d,c,!!n.cut),d.pt(-c,b).pt(-o,b);for(let M=0;M<=v;M++){let g=Math.PI-m+m*M/v;d.pt(Math.cos(g)*a,r+Math.sin(g)*a,M>0&&M<v)}return d.pt(-e,r,!0),d.arc(-e+s,t+s,s,Math.PI,Math.PI*1.5,i),d.done()}function zo(n={}){let c=new He,b=!!n.mlok;return c.pt(-.0035,-.0205).pt(-.0035,b?-.0205+.0085:-.0205).pt(.0035,b?-.0205+.0085:-.0205).pt(.0035,-.0205),c.pt(.0195-.0075,-.0205),c.pt(.0195,-.0205+.0075),c.pt(.0195,-.0035).pt(b?.0195-.0085:.0195,-.0035).pt(b?.0195-.0085:.0195,.0035).pt(.0195,.0035),c.pt(.0195,.0205-.0075),c.pt(.0195-.0075,.0205),c.pt(.0105,.0205).pt(.0105,$.railNeck-.0015).pt(.00783,$.railNeck-.0015),bs(c,.00783,!!n.cut),ds(c,.00783,!!n.cut),c.pt(-.00783,$.railNeck-.0015).pt(-.0105,$.railNeck-.0015).pt(-.0105,.0205),c.pt(-(.0195-.0075),.0205),c.pt(-.0195,.0205-.0075),c.pt(-.0195,.0035).pt(b?-(.0195-.0085):-.0195,.0035).pt(b?-(.0195-.0085):-.0195,-.0035).pt(-.0195,-.0035),c.pt(-.0195,-.0205+.0075),c.pt(-(.0195-.0075),-.0205),c.done()}function Ro(n){let t=new He,r=36;for(let a=0;a<r;a++){let s=a/r*kt,i=Math.abs((s+Math.PI)%kt-Math.PI)<.14,o=n&&i?.0124-.0012:.0124;t.pt(Math.cos(s)*o,Math.sin(s)*o,!i)}return t.done()}function Or(n,e,t,r,a){let s=e>=n?1:-1,i=new Set([n,e]),o=p=>[Math.min(p[0],p[1]),Math.max(p[0],p[1])],c=t.map(o),b=r.map(o);for(let p of[...c,...b])for(let M of p)(M-n)*s>1e-9&&(e-M)*s>1e-9&&i.add(M);let l=[...i].sort((p,M)=>(p-M)*s),u=(p,M)=>M.some(([g,w])=>p>g+1e-9&&p<w-1e-9),m=[],d=new Map,v=(p,M)=>{let g=`${p}${M}`,w=d.get(g);return w||(w=a(p,M),d.set(g,w)),w};for(let p=0;p<l.length-1;p++){let M=(l[p]+l[p+1])/2,g=v(u(M,c),u(M,b));m.push({z:l[p],prof:g},{z:l[p+1],prof:g})}return m}function ls(n,e){let t=Math.min(n,e),r=Math.max(n,e),a=[];for(let s=Math.ceil((t+.003)/$.slotPitch);s*$.slotPitch<r-.003;s++){let i=s*$.slotPitch;i-$.slotW/2>t+.0015&&i+$.slotW/2<r-.0015&&a.push([i-$.slotW/2,i+$.slotW/2])}return a}function us(n,e={}){let t=performance.now(),r=n.synth,a=e.textureSize??Oe.textureSize,s=Math.min(a,1024),i=Math.min(a,512),o=r.material("anodized",{size:a,tileMeters:.22,color:[.03,.031,.033],wear:.06,roughness:.52,seed:11,bumpMm:.02},{name:"anodized",edgeWear:.6,edgeWearRadius:.0025}),c=r.material("anodized",{size:a,tileMeters:.22,color:[.03,.031,.033],wear:.12,roughness:.5,seed:12,bumpMm:.02},{name:"anodized-rail",edgeWear:.85,edgeWearRadius:.002}),b=r.material("anodized",{size:a,tileMeters:.25,color:[.028,.029,.032],wear:.07,roughness:.54,seed:19,bumpMm:.025},{name:"anodized-handguard",edgeWear:.65,edgeWearRadius:.0022}),l=r.material("parkerized",{size:a,tileMeters:.16,color:[.05,.052,.05],wear:.2,seed:13},{name:"parkerized",edgeWear:.5,edgeWearRadius:.002}),u=r.material("nitride",{size:s,tileMeters:.1,color:[.04,.041,.043],wear:.35,roughness:.42,seed:20},{name:"bcg-nitride",edgeWear:.8,edgeWearRadius:.0025}),m=r.material("polymer",{size:a,tileMeters:.14,color:[.03,.03,.032],extra:.3,roughness:.6,bumpMm:.12,seed:14},{name:"polymer",edgeWear:.25}),d=r.material("polymer",{size:a,tileMeters:.16,color:[.03,.03,.032],extra:.95,roughness:.64,bumpMm:.4,seed:15},{name:"polymer-stipple",edgeWear:.2}),v=r.material("polymer",{size:a,tileMeters:.14,color:[.034,.034,.036],extra:.5,roughness:.58,bumpMm:.2,seed:21},{name:"polymer-mag",edgeWear:.3}),p=r.material("rubber",{size:i,seed:16,extra:1},{name:"rubber"}),M=r.material("brass",{size:i,tileMeters:.03,seed:17},{name:"brass"}),g=r.material("parkerized",{size:s,tileMeters:.08,color:[.022,.022,.023],wear:.08,seed:18},{name:"steel-black",edgeWear:.5,edgeWearRadius:.0018}),w=r.material("machined",{size:s,tileMeters:.05,color:[.4,.4,.41],wear:.35,roughness:.42,seed:22,extra:1},{name:"stainless"}),x=r.material("machined",{size:i,tileMeters:.02,color:[.28,.28,.29],wear:.4,seed:23,extra:.4},{name:"pins"}),y=new pe({name:"cavity",baseColor:[.02,.02,.02,1],roughness:.9,metallic:.3}),k=new pe({name:"sight-white",baseColor:[.85,.85,.8,1],roughness:.5,metallic:0}),f=new Vt(n),A={bolt:!0},S={charge:!0},P={magazine:!0},T=$.upperHW,R=$.lowerHW;{let G=ls($.upperRear-.004,$.upperFront+.004),H=Or($.upperRear,$.upperFront,G,[[$.portZ0,$.portZ1]],(q,C)=>To({cut:q,port:C}));f.add(Ke(H),o),f.add(Fe(.016,$.upperFront,$.upperFront-.006,0,0,oe(28)),o),f.add(rt([[.0125,0],[.0168,0],[.0168,.004],[.0158,.0045],[.0158,.0215],[.0125,.0215]],$.upperFront-.006,0,oe(24)),l),f.add(me(.0148,.0078,.03,6e-4).translate(0,.0235,$.upperRear-.01),y),f.add(it([[T-.004,.0105],[T+.0068,.0235],[T+.0068,.0305],[T-.004,.0305]],.017,{bevel:.0015,bevelSegments:2}).rotateX(Math.PI/2).translate(0,.0045,0),o);let _=T+.0042,V=.009;f.add(Fe(.0068,.03,.062,V,_,oe(18)),o),f.add(rt([[0,0],[.0052,0],[.0062,.0015],[.0062,.009],[.0058,.0105],[.0049,.011],[0,.011]],.073,V,oe(20)).translate(_,0,0),l);for(let q=0;q<12;q++){let C=q/12*kt;f.add(we(7e-4,.0028,.006).translate(0,.0063,0).rotateZ(C).translate(_,V,.068),g)}let U=me(.0012,.0186,.0585,5e-4);f.add(U.translate(0,-.0093,0).rotateZ(.35).translate(T+.0012,$.portY0-5e-4,($.portZ0+$.portZ1)/2),l),f.add(Fe(.0014,$.portZ0+.004,$.portZ1-.004,$.portY0-8e-4,T+.0012,10),x);for(let q of[-1,1])f.add(ct(.0038,q*(R+3e-4),$.seam-.0085,.0735,q,"dome",16),x),f.add(ct(.0038,q*(R+3e-4),$.seam-.0085,-.0655,q,"dome",16),x)}{let G=[];for(let U=0;U<9;U++)G.push([-.034+U*.0045,-.034+U*.0045+.0018]);let H=$.boltFace+.012,_=$.upperRear+.03;f.add(Ke(Or(H,_,G,[],U=>Ro(U))),u,A),f.add(Fe(.0124,$.boltFace-.012,H-6e-4,0,0,oe(28)),l),f.add(Fe(.0094,$.boltFace,H+5e-4,0,0,oe(24)),u,A),f.add(Se(.0094,4e-4,0,0,$.boltFace-2e-4,oe(24)),g,A),f.add(me(.0062,.0036,.0082,.001).translate(.0072,.0108,H+.013),u,A),f.add(me(.0068,.0046,.018,.0012).translate(0,.0128,H+.052),u,A),f.add(ct(.0021,0,0,0,1,"hex",12).rotateZ(Math.PI/2).translate(0,.0151,H+.046),g,A);let V=.0235;f.add(me(.0128,.0058,.105,.0012).translate(0,V,$.upperRear-.045),o,S),f.add(me(.051,.0075,.019,.0022).translate(.002,V,$.upperRear+.011),o,S);for(let U=0;U<6;U++)f.add(we(.0038,.0012,.009).translate(-.0205+U*.0082,V+.0042,$.upperRear+.012),g,S);f.add(me(.0096,.0064,.021,.0014).translate(-.0302,V,$.upperRear+.0105),l,S),f.add(Lt(.0013,.009,-.0245,V,$.upperRear+.016,10),x,S)}{let G=$.seam,H=[[-.1145,G+5e-4],[.0705,G+5e-4],[.0705,-.038],[.012,-.04],[-.03,-.04],[-.04,-.044],[-.06,-.0585],[-.072,-.052],[-.08,-.03],[-.1145,-.026]];f.add(Pe(H,R*2,.002),o),f.add(Fe(.0185,.0985,$.upperRear+5e-4,0,0,oe(28)),o);let _=[[.0705,G],[.0705,-.07],[.0725,-.0745],[.0105,-.0745],[.0125,-.07],[.0125,G]];f.add(Pe(_,R*2+4e-4,.0025),o),f.add(Mt(Ue(.0238,.0565,.003,3),0,.064).rotateX(Math.PI/2+.17).flipWinding().translate(0,G,-.0415+.011),y),f.add(Pe([[.012,-.04],[.012,-.0545],[.0085,-.0575],[-.0265,-.0575],[-.03,-.0545],[-.03,-.04],[-.0255,-.04],[-.0255,-.0525],[.0075,-.0525],[.0075,-.04]],.0088,.0016),o),f.add(Ee(.0013,.0115,0,-.043,-.0095,10),x),f.add(Ee(.0013,.0115,0,-.043,.0275,10),x),f.add(Pe([[-.012,-.04],[-.0155,-.04],[-.0195,-.047],[-.0185,-.0535],[-.0135,-.0525],[-.0105,-.046]],.0062,8e-4),l,{trigger:!0});let V=[-(R+.0016),G-.0092,.03];f.add(Ee(.0045,.0028,V[0],V[1],V[2],oe(16)),l,{selector:!0}),f.add(me(.0036,.0046,.0195,.0014).translate(V[0]-.0012,V[1],V[2]-.0085),l,{selector:!0});for(let U=0;U<5;U++)f.add(we(6e-4,.0052,6e-4).translate(V[0]-.0031,V[1],V[2]-.0135-U*.0015),g,{selector:!0});if(e.engravings!==!1){let U=ht(n,["SAFE   SEMI   AUTO"],.028,.0028,{px:512,color:[.8,.8,.78],metallic:0,roughness:.6,tracking:.05,align:"center"});U&&f.add(ft(-(R+8e-5),G-.0028,.021,.028,.0028,-1),U);let q=ht(n,["FONDAINE ARMS","MOD. FA-15   CAL. 5.56 NATO"],.046,.009,{px:1024,color:[.75,.75,.74],metallic:0,roughness:.6,tracking:.08,align:"left"});q&&f.add(ft(-(.0146+8e-5),-.03,-.0415,.046,.009,-1),q);let C=ht(n,["FA15-0042117"],.028,.0034,{px:512,color:[.78,.78,.77],metallic:0,roughness:.6,tracking:.08,align:"left"});C&&f.add(ft(.0146+8e-5,-.03,-.0415,.028,.0034,1),C)}f.add(Pe([[.004,G-.004],[.004,G-.0185],[.009,G-.0225],[.0205,G-.0225],[.0205,G-.004]],.0036,.0012).translate(R+.0015,0,0),o),f.add(Za([[0,0],[.0046,0],[.0046,.0024],[.0038,.0032],[0,.0032]],R+5e-4,G-.0145,-.0125,oe(16)),l),f.add(Pe([[.012,G-.004],[.012,G-.0165],[-.002,G-.0165],[-.002,G-.004]],.0032,.001).translate(-(R+.0012),0,0),o),f.add(me(.0022,.0105,.0078,8e-4).translate(-(R+.0028),G-.0075,5e-4),l),f.add(me(.0022,.0062,.0062,8e-4).translate(-(R+.0028),G-.0118,-.0085),l),f.add(Ee(.0011,.0036,-(R+.0014),G-.0098,-.0038,8),x);{let U=[];for(let Q=0;Q<=14;Q++){let E=Q/14,J=.0292+.004*Math.sin(Math.PI*E)**.8+.001*E,Y=.0335+.012*E+.002*Math.sin(Math.PI*E),D=Ue(J,Y,Math.min(.009,J/2-.001),4,0,0);U.push({z:E*.088,prof:D,smooth:Q>0})}let q=Ke(U,{capStart:!1});q=fe.merge([q,me(.026,.009,.012,.003).translate(0,-.0198,.007)]);let C=.52,X=-.036,te=.06,W=.088;f.add(q.rotateX(Math.PI/2-C).translate(0,X,te),d),f.add(ct(.0035,0,0,0,1,"hex",14).rotateZ(-Math.PI/2).translate(0,X-W*Math.cos(C)+6e-4,te+W*Math.sin(C)),x)}f.add(rt([[.0147,0],[.0196,0],[.0196,.0085],[.0188,.0092],[.0147,.0092]],.1275,0,oe(28)),o);for(let U=0;U<6;U++){let q=U/6*kt;f.add(we(.0035,.0032,.0036).translate(0,.0185,0).rotateZ(q).translate(0,0,.1275-.0018),y)}f.add(Se(.0205,.0022,0,0,$.upperRear+.0016,oe(28)),l),f.add(Fe($.tubeR,$.upperRear,.335,0,0,oe(32)),o),f.add(rt([[0,0],[.0135,0],[$.tubeR,5e-4],[$.tubeR,.002],[0,.002]],.335,0,oe(32)).translate(0,0,.002),o);for(let U=0;U<6;U++)f.add(Lt(.0032,.004,0,-$.tubeR+4e-4,.165+U*.019,12),y);f.add(we(.006,.0025,.19).translate(0,-$.tubeR+.0012,.235),o)}{let G=[[-.205,.0185],[-.33,.0215],[-.342,.016],[-.345,0],[-.345,-.088],[-.332,-.095],[-.3,-.088],[-.262,-.052],[-.236,-.018],[-.205,-.0185]],H=[[-.318,-.045],[-.318,-.067],[-.324,-.07],[-.33,-.067],[-.33,-.045],[-.324,-.042]];f.add(Pe(G,.04,.004,[H]),m),f.add(Fe($.tubeR+.0025,.203,.236,0,0,oe(28)),m),f.add(me(.012,.0035,.032,.0012).translate(0,-$.tubeR-.006,.224),m),f.add(me(.009,.006,.0085,.0015).translate(0,-$.tubeR-.0035,.2075),m),f.add(Ee(.0015,.0145,0,-$.tubeR-.0075,.238,8),x),f.add(Pe([[-.345,0],[-.356,0],[-.357,-.09],[-.345,-.092]],.042,.0035),p);for(let _=0;_<9;_++)f.add(we(.034,.0022,8e-4).translate(0,-.0835+_*.0095,.3568),p);f.add(Za([[0,0],[.0062,0],[.0062,8e-4],[.0035,8e-4],[.0035,0],[0,0]],-.0201,-.0045,.2255,oe(16)),l),f.add(Ee(.0012,.0404,0,-.056,.324,8),x)}{let G=ls($.hgZ0-.002,$.hgZ1+.002),H=[];for(let V=0;V<8;V++){let U=$.hgZ0-.03-V*.04;H.push([U-.016,U+.016])}let _=Or($.hgZ0,$.hgZ1,G,H,(V,U)=>zo({cut:V,mlok:U}));f.add(Ke(_,{capStart:!0,capEnd:!0}),b),f.add(Fe(.0163,$.hgZ0,$.hgZ1,0,0,oe(28)).flipWinding(),y);for(let V of[-1,1])f.add(ct(.0028,V*.0196,-.0155,$.hgZ0-.012,V,"hex",12),g),f.add(ct(.0028,V*.0196,-.0155,$.hgZ0-.022,V,"hex",12),g);f.add(Se(.0165,.001,0,0,$.hgZ1-4e-4,oe(28)),y)}let L=$.boltFace-$.barrelLen-.054;{let G=$.upperFront-.006;f.add(Fe(.0095,G,-.35,0,0,oe(28)),l),f.add(rt([[.0095,0],[.0095,.012],[.0089,.013],[.0089,.054],[.0062,.0545],[.0062,.062]],-.35-.045,0,oe(28)),l),f.add(Fe(.0089,-.395,$.boltFace-$.barrelLen+.001,0,0,oe(28)),l);let H=$.boltFace-$.barrelLen+5e-4;f.add(rt([[.0062,0],[.011,0],[.011,.0022],[.0062,.0022]],H+.0022,0,oe(24)),w);let _=rt([[.0075,0],[.011,.0025],[.0112,.012],[.0112,.048],[.0104,.0525],[.0066,.0545],[.0062,.0545],[.0062,0]],H,0,oe(36));f.add(_,l);for(let U=0;U<5;U++){let q=(U-2)*(kt/7.2);f.add(me(.0032,.006,.03,8e-4).translate(0,.0098,0).rotateZ(q).translate(0,0,H-.034),y)}f.add(Se(.0062,6e-4,0,0,H-.044,oe(20)),l),f.add(Se(.0029,8e-4,0,0,H-.0443,oe(16)),y);let V=-.372;f.add(ot(Xt(-.0115,-.0118,.0115,.0135,.0025,4),.03,V,.0012),l);for(let U=0;U<2;U++)f.add(ct(.0022,0,0,0,1,"hex",10).rotateZ(-Math.PI/2).translate(0,-.0118,V-.007+U*.014),g);f.add(Fe(.0024,V-.012,$.upperFront+.012,.0138,0,12),w),f.add(Ee(.0011,.0245,0,.0138,V+.003,8),x)}let z=.064,j=-.447;{f.add(ot(Xt(-.0125,$.railTop-.0036,.0125,$.railTop+.0085,.0018,3),.034,.046+.001,8e-4),o),f.add(Ee(.0022,.0252,0,$.railTop+.0105,.046+.012,12),l);let H=[[-.0118,$.railTop+.0085],[.0118,$.railTop+.0085],[.0118,z+.0075],[.0085,z+.0098],[-.0085,z+.0098],[-.0118,z+.0075]];f.add(ot(H,.0042,.046,6e-4,[pr(0,z,.0036,oe(20))]),l),f.add(ot(Xt(-.0068,-.0068,.0068,.0068,.0025,3),.0012,0,3e-4,[pr(0,0,.0011,12)]).rotateX(-Math.PI/2).translate(0,$.railTop+.0091,.046-.0095),l),f.add(Za([[0,0],[.0062,0],[.0062,.012],[.0048,.0125],[0,.0125]],.0118,z-.001,.046,oe(16)),l);for(let U=0;U<10;U++){let q=U/10*kt;f.add(we(.012,8e-4,.0025).translate(0,.0062,0).rotateX(q).translate(.0118+.006,z-.001,.046),g)}f.add(ot(Xt(-.0125,$.railTop-.0036,.0125,$.railTop+.0085,.0018,3),.032,j,8e-4),o),f.add(Ee(.0022,.0252,0,$.railTop+.0105,j-.011,12),l);let _=$.railTop+.0085,V=[[-.0112,_],[.0112,_],[.0112,z-.004],[.0062,z+.0075],[.004,z+.0075],[.0062,_+.004],[-.0062,_+.004],[-.004,z+.0075],[-.0062,z+.0075],[-.0112,z-.004]];f.add(ot(V,.0046,j,6e-4),l),f.add(Lt(.0046,.0052,0,_+.004+.0026,j,oe(18)),l);for(let U=0;U<12;U++){let q=U/12*kt;f.add(we(7e-4,.0054,7e-4).translate(.0046,0,0).rotateY(q).translate(0,_+.004+.0026,j),g)}f.add(we(.0018,z-(_+.0092),.0018).translate(0,(z+_+.0092)/2,j),g),f.add(we(.0018,.0012,.0019).translate(0,z+6e-4,j),k)}{let G=[],H=[0,$.seam+.004,-.039715],_=16,V=.205;for(let te=0;te<=_;te++){let W=te/_*V,E=.17+Math.max(0,W-.055)*2.1;if(te===0)G.push(H);else{let J=G[te-1],Y=V/_;G.push([0,J[1]-Math.cos(E)*Y,J[2]-Math.sin(E)*Y])}}let U=(()=>{let te=new He,W=.0114,Q=.0282,E=.0038;return te.arc(W-E,-Q+E,E,-Math.PI/2,0,3),te.pt(W,-.012).pt(W+7e-4,-.0105,!0).pt(W,-.009).pt(W,.006).pt(W+7e-4,.0075,!0).pt(W,.009),te.arc(W-E,Q-E,E,0,Math.PI/2,3).arc(-W+E,Q-E,E,Math.PI/2,Math.PI,3),te.pt(-W,.009).pt(-W-7e-4,.0075,!0).pt(-W,.006).pt(-W,-.009).pt(-W-7e-4,-.0105,!0).pt(-W,-.012),te.arc(-W+E,-Q+E,E,Math.PI,Math.PI*1.5,3),te.done()})(),q=ns(U,G,[0,0,1],te=>te>.955?[1.1,1.08]:te>.935?[1+(te-.935)*5,1+(te-.935)*4]:[1,1],{capStart:!1,capEnd:!0});f.add(q,v,P),f.add(Mt(Ue(.0208,.05,.003,3),-.003,.004).rotateX(Math.PI/2+.17).translate(0,H[1]-.001,H[2]),new pe({name:"follower",baseColor:[.75,.22,.03,1],roughness:.6}),P);let C=wt(.0448,.0095,je);f.add(C.rotateX(-Math.PI/2).translate(.0045,H[1]+.003,H[2]+.027),M,{...P,round:!0});let X=G[G.length-1];f.add(Lt(.0032,.0012,0,X[1]-4e-4,X[2],12),v,P)}let I=f.finish(),F=new ve(n.dev,wt(.0448,.0095,je)),N={triangles:f.triangles,buildMs:performance.now()-t};return console.info(`[oaxis] AR carbine: ${N.triangles.toLocaleString()} tris in ${N.buildMs.toFixed(0)} ms`),{model:{parts:I,muzzle:h.create(0,0,L),ejectionPort:h.create(.016,.012,-.02),rearSight:h.create(0,z,.046),frontSight:h.create(0,z,j),casingMesh:F,casingMaterial:M,magAxis:h.normalize(h.create(),h.create(0,-.985,-.17)),magBox:{center:h.create(0,-.145,-.07),half:h.create(.0125,.085,.032)},triggerTravelM:.003,selector:{pivot:[-($.lowerHW+.0016),$.seam-.0092,.03],axis:[1,0,0],angles:{safe:0,semi:Math.PI/2,auto:Math.PI}},charge:{grip:h.create(-.03,.0235,$.upperRear+.0105),travelM:.085,release:"boltRelease",pullDir:h.create(0,0,1)}},spec:Cr(z),grips:Nr,stats:N}}var Nr={right:{position:[.0305,-.049,.155],fingerDir:[0,-.33,-.94],dorsal:[1,0,0],fingers:[{curl:[.25,.55,.3],spread:.08},{curl:[1.3,1.3,.7]},{curl:[1.3,1.3,.7]},{curl:[1.3,1.25,.7]}],thumb:{dir:[-.6,-.6,-.5],bend:[.25,.15]}},indexPressed:{curl:[.35,.8,.45],spread:.06},left:{position:[-.064,-.047,-.278],fingerDir:[.8,.15,-.55],dorsal:[0,-1,0],fingers:[{curl:[1.1,1.15,.6]},{curl:[1.1,1.2,.6]},{curl:[1.1,1.2,.6]},{curl:[1.1,1.15,.6]}],thumb:{dir:[-.3,.7,-.6],bend:[.15,.1]}},leftOnMagazine:{position:[-.02,-.25,-.02],fingerDir:[.3,.3,-.9],dorsal:[-.2,-1,0],fingers:[{curl:[.9,.9,.4]},{curl:[.95,.9,.4]},{curl:[.95,.9,.4]},{curl:[.95,.9,.4]}],thumb:{dir:[-.7,.3,-.6],bend:[.2,.1]}}};function Cr(n=.064){return{name:"AR carbine 16in",caliber:Xa["5.56x45 M855"],barrelLengthM:.406,massKg:3.3,rpm:760,fireModes:["safe","semi","auto"],magazineCapacity:30,sightHeightM:n,zeroM:50,accuracyMoa:1.5,recoil:{boreAboveShoulderM:.035,inertia:.24,shoulderMassKg:12,holdOmega:13,holdDamping:.72,horizontalRatio:.35,viewCouplingHip:.45,viewCouplingAds:.88,residualRise:.16},reload:{magOut:.55,magIn:.95,boltRelease:.35},audio:Ha.rifle556_16in,flash:{kelvin:1900,luminance:6e5,sizeM:.15,lightCandela:25e3,sidePorts:!0,smoke:1},ejection:{speed:4.2,up:1.4,back:1.2,spinRad:28},hipOffset:[.12,-.135,-.34],eyeRelief:.075,adsTime:.26,drawTime:.6,action:{travelM:.089,backMs:9,returnMs:14,lockOpenOnEmpty:!0,lockFraction:.9}}}var ms={"+x":[1,0,0],"-x":[-1,0,0],"+y":[0,1,0],"-y":[0,-1,0],"+z":[0,0,1],"-z":[0,0,-1]},Lo={slide:"slide|\\bbolt\\b|carrier",magazine:"\\bmag(azine)?\\b|mag_|magazine",trigger:"trigger",selector:"selector|safety|fire_?mode",charge:"charg(e|ing)",muzzle:"muzzle",ejectionPort:"eject|port",rearSight:"rear_?sight|sight_?rear|notch",frontSight:"front_?sight|sight_?front|post"},da={pistol:{lengthM:.19,triggerZ:-.01,portBack:.012,triggerTravelM:.0045},carbine:{lengthM:.85,triggerZ:.015,portBack:.035,triggerTravelM:.003,chargeTravelM:.085},rifle:{lengthM:1,triggerZ:.015,portBack:.035,triggerTravelM:.003,chargeTravelM:.085}},Io=(n,e)=>[n[0]-e[0],n[1]-e[1],n[2]-e[2]],jt=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],Ht=(n,e)=>n[0]*e[0]+n[1]*e[1]+n[2]*e[2],Gt=n=>{let e=Math.hypot(n[0],n[1],n[2])||1;return[n[0]/e,n[1]/e,n[2]/e]},hs=(n,e)=>[n[0]*e[0]+n[4]*e[1]+n[8]*e[2]+n[12],n[1]*e[0]+n[5]*e[1]+n[9]*e[2]+n[13],n[2]*e[0]+n[6]*e[1]+n[10]*e[2]+n[14]];function ys(n){let e=n.slice(),t=[1,0,0,0,1,0,0,0,1];for(let a=0;a<48;a++){let s=0,i=1,o=Math.abs(e[1]);if(Math.abs(e[2])>o&&(s=0,i=2,o=Math.abs(e[2])),Math.abs(e[5])>o&&(s=1,i=2,o=Math.abs(e[5])),o<1e-14*(Math.abs(e[0])+Math.abs(e[4])+Math.abs(e[8])+1e-30))break;let c=.5*Math.atan2(2*e[s*3+i],e[i*3+i]-e[s*3+s]),b=Math.cos(c),l=Math.sin(c);for(let u=0;u<3;u++){let m=e[u*3+s],d=e[u*3+i];e[u*3+s]=b*m-l*d,e[u*3+i]=l*m+b*d}for(let u=0;u<3;u++){let m=e[s*3+u],d=e[i*3+u];e[s*3+u]=b*m-l*d,e[i*3+u]=l*m+b*d}for(let u=0;u<3;u++){let m=t[u*3+s],d=t[u*3+i];t[u*3+s]=b*m-l*d,t[u*3+i]=l*m+b*d}}return[0,1,2].sort((a,s)=>e[s*3+s]-e[a*3+a]).map(a=>Gt([t[a],t[3+a],t[6+a]]))}function jo(n,e){let t=e?e.length/3:n.length/9,r=new Float32Array(t*3),a=new Float32Array(t);for(let s=0;s<t;s++){let i=(e?e[s*3]:s*3)*3,o=(e?e[s*3+1]:s*3+1)*3,c=(e?e[s*3+2]:s*3+2)*3,b=[n[o]-n[i],n[o+1]-n[i+1],n[o+2]-n[i+2]],l=[n[c]-n[i],n[c+1]-n[i+1],n[c+2]-n[i+2]],u=jt(b,l);a[s]=.5*Math.hypot(u[0],u[1],u[2]),r[s*3]=(n[i]+n[o]+n[c])/3,r[s*3+1]=(n[i+1]+n[o+1]+n[c+1])/3,r[s*3+2]=(n[i+2]+n[o+2]+n[c+2])/3}return{c:r,w:a}}function Go(n,e){let t=e.length,r=0,a=[0,0,0];for(let D=0;D<t;D++)r+=e[D],a[0]+=n[D*3]*e[D],a[1]+=n[D*3+1]*e[D],a[2]+=n[D*3+2]*e[D];r=r||1,a[0]/=r,a[1]/=r,a[2]/=r;let s=[0,0,0,0,0,0,0,0,0];for(let D=0;D<t;D++){let ee=n[D*3]-a[0],re=n[D*3+1]-a[1],se=n[D*3+2]-a[2],ne=e[D]/r;s[0]+=ee*ee*ne,s[1]+=ee*re*ne,s[2]+=ee*se*ne,s[4]+=re*re*ne,s[5]+=re*se*ne,s[8]+=se*se*ne}s[3]=s[1],s[6]=s[2],s[7]=s[5];let i=ys(s)[2],o=!1,c=D=>{let ee=[0,1,2].reduce((re,se)=>Math.abs(D[se])>Math.abs(D[re])?se:re,0);if(Math.abs(D[ee])>.985){o=!0;let re=[0,0,0];return re[ee]=Math.sign(D[ee]),re}return D};i=c(i);let b=Math.abs(i[0])<.9?[1,0,0]:[0,1,0],l=Gt(jt(i,b)),u=Gt(jt(i,l)),m=Math.max(1,Math.ceil(t/6e4)),d=[],v=[];for(let D=0;D<t;D+=m){let ee=[n[D*3],n[D*3+1],n[D*3+2]];d.push(Ht(ee,l)),v.push(Ht(ee,u))}let p=D=>{let ee=Math.cos(D),re=Math.sin(D),se=1/0,ne=-1/0,he=1/0,Ce=-1/0;for(let Re=0;Re<d.length;Re++){let Le=ee*d[Re]+re*v[Re],Te=-re*d[Re]+ee*v[Re];Le<se&&(se=Le),Le>ne&&(ne=Le),Te<he&&(he=Te),Te>Ce&&(Ce=Te)}return{area:(ne-se)*(Ce-he),du:ne-se,dv:Ce-he}},M={th:0,...p(0)};for(let D=1;D<180;D++){let ee=D*Math.PI/180,re=p(ee);re.area<M.area&&(M={th:ee,...re})}for(let D=-9;D<=9;D++){let ee=M.th+D*Math.PI/1800,re=p(ee);re.area<M.area&&(M={th:ee,...re})}let g=Math.cos(M.th),w=Math.sin(M.th),x=[g*l[0]+w*u[0],g*l[1]+w*u[1],g*l[2]+w*u[2]],y=[-w*l[0]+g*u[0],-w*l[1]+g*u[1],-w*l[2]+g*u[2]],k=M.du>=M.dv?x:y,f=M.du>=M.dv?y:x;k=c(k),f=Gt(jt(i,k)),f=c(f),k=Gt(jt(f,i));let A=new Float32Array(t),S=new Float32Array(t),P=1/0,T=-1/0,R=1/0,L=-1/0;for(let D=0;D<t;D++){let ee=[n[D*3],n[D*3+1],n[D*3+2]];A[D]=Ht(ee,k),S[D]=Ht(ee,f),P=Math.min(P,A[D]),T=Math.max(T,A[D]),R=Math.min(R,S[D]),L=Math.max(L,S[D])}let z=20,j=new Float32Array(z).fill(1/0),I=new Float32Array(z).fill(-1/0);for(let D=0;D<t;D++){let ee=Math.min(z-1,Math.floor((S[D]-R)/(L-R||1)*z));j[ee]=Math.min(j[ee],A[D]),I[ee]=Math.max(I[ee],A[D])}let F=(D,ee)=>{let re=0,se=0;for(let ne=D;ne<ee;ne++)I[ne]>j[ne]&&(re+=I[ne]-j[ne],se++);return se?re/se:0};F(0,6)>F(z-6,z)&&(f=[-f[0],-f[1],-f[2]]);let N=T-P,G=1/0,H=-1/0,_=1/0,V=-1/0;for(let D=0;D<t;D++)A[D]<P+.2*N&&(G=Math.min(G,S[D]),H=Math.max(H,S[D])),A[D]>T-.2*N&&(_=Math.min(_,S[D]),V=Math.max(V,S[D]));let U=0,q=0,C=R+.22*(L-R),X=F(0,6)<=F(z-6,z);for(let D=0;D<t;D++)(X?S[D]<C:S[D]>L-.22*(L-R))&&(U+=A[D],q++);let te=q?U/q:(P+T)/2,W=te-P,Q=T-te;Math.abs(W-Q)>.06*N?W>Q&&(k=[-k[0],-k[1],-k[2]]):H-G<V-_&&(k=[-k[0],-k[1],-k[2]]);let E=[-k[0],-k[1],-k[2]],J=f;return{ex:Gt(jt(J,E)),ey:J,ez:E,snapped:o}}function vs(n){let e=[1/0,1/0,1/0],t=[-1/0,-1/0,-1/0];for(let r=0;r<n.length;r+=3)for(let a=0;a<3;a++){let s=n[r+a];s<e[a]&&(e[a]=s),s>t[a]&&(t[a]=s)}return{min:e,max:t}}function Fo(n){let e=n.length/3,t=[0,0,0];for(let s=0;s<n.length;s+=3)t[0]+=n[s],t[1]+=n[s+1],t[2]+=n[s+2];t[0]/=e||1,t[1]/=e||1,t[2]/=e||1;let r=[0,0,0,0,0,0,0,0,0];for(let s=0;s<n.length;s+=3){let i=n[s]-t[0],o=n[s+1]-t[1],c=n[s+2]-t[2];r[0]+=i*i,r[1]+=i*o,r[2]+=i*c,r[4]+=o*o,r[5]+=o*c,r[8]+=c*c}r[3]=r[1],r[6]=r[2],r[7]=r[5];let a=ys(r)[0];return a[1]>0?[-a[0],-a[1],-a[2]]:a}function xs(n,e){for(let t of n){let r=t.pos,a=t.idx?t.idx.length:r.length/3;for(let s=0;s+2<a;s+=3){let i=(t.idx?t.idx[s]:s)*3,o=(t.idx?t.idx[s+1]:s+1)*3,c=(t.idx?t.idx[s+2]:s+2)*3;e(r[i],r[i+1],r[i+2],r[o],r[o+1],r[o+2]),e(r[o],r[o+1],r[o+2],r[c],r[c+1],r[c+2]),e(r[c],r[c+1],r[c+2],r[i],r[i+1],r[i+2])}}}function Dr(n,e,t,r,a){let s=-1/0,i=1/0,o=0;return xs(n,(c,b,l,u,m,d)=>{if((b-e)*(m-e)>0||b===m)return;let v=(e-b)/(m-b),p=l+(d-l)*v;if(p<t||p>r)return;let M=Math.abs(c+(u-c)*v-a);p>s&&(s=p),p<i&&(i=p),M>o&&(o=M)}),{back:s,front:i,hw:o}}function fs(n,e,t={}){let r=n.reduce((U,q)=>U+q.pos.length,0),a=new Float32Array(r);{let U=0;for(let q of n)a.set(q.pos,U),U+=q.pos.length}let{min:s,max:i}=vs(a),o=i[2]-s[2],c=i[1]-s[1],b=0,l=0,u=0;for(let U=0;U<a.length;U+=3)a[U+2]<s[2]+.04*o&&(b+=a[U],l+=a[U+1],u++);b/=u||1,l/=u||1;let m=e??(o/c>2.2?"carbine":"pistol"),d=m!=="pistol",v=60,p=o/v,M=new Float32Array(v).fill(1/0),g=new Float32Array(v).fill(-1/0),w=new Float32Array(v),x=U=>s[2]+(U+.5)*p,y=U=>Math.max(0,Math.min(v-1,Math.floor((U-s[2])/p))),k=(U,q,C)=>{q-=l,C=Math.abs(C-b),q<M[U]&&(M[U]=q),q>g[U]&&(g[U]=q),C>w[U]&&(w[U]=C)};xs(n,(U,q,C,X,te,W)=>{let Q=y(C),E=y(W);if(k(Q,q,U),k(E,te,X),Math.abs(Q-E)<2)return;let J=Math.min(Q,E),Y=Math.max(Q,E);for(let D=J+1;D<Y;D++){let ee=(x(D)-C)/(W-C);k(D,q+(te-q)*ee,U+(X-U)*ee)}});let f=s[1]-l,A=[];for(let U=0;U<v;U++){if(!(M[U]<.5*f))continue;let q=A[A.length-1];q&&U-q.b1<=2?q.b1=U:A.push({b0:U,b1:U})}let S=null,P=null;if(A.length){let U=A[A.length-1];(U.b1-U.b0+1)*p>.12&&(U={b0:U.b0,b1:U.b0+Math.ceil(.06/p)});let q=s[2]+U.b0*p,C=s[2]+(U.b1+1)*p,X=1/0;for(let De=U.b0;De<=U.b1;De++)X=Math.min(X,M[De]);let te=Math.min(X+.088,.2*f-.005),W=12,Q=X+.012,E=te-.004,J=0,Y=0,D=0,ee=0,re=0;for(let De=0;De<W;De++){let Xe=Q+(De+.5)/W*(E-Q),nt=Dr(n,Xe+l,q-.015,C+.03,b);isFinite(nt.back)&&(J++,Y+=Xe,D+=nt.back,ee+=Xe*Xe,re+=Xe*nt.back)}let se=J*ee-Y*Y,ne=J>=4&&Math.abs(se)>1e-12?Math.atan(-(J*re-Y*D)/se):.3;ne=Math.max(0,Math.min(.6,ne));let he=Dr(n,te+l,q-.015,C+.03,b),Ce=isFinite(he.back)?he.back:C,Re=isFinite(he.front)?he.front:q,Le=he.hw>0?he.hw:.015,Te=Dr(n,te-.085*Math.sin(ne)+l,q-.005,C+.03,b),Kt=isFinite(Te.front)?Te.front:Re;S={z0:q,z1:C,bottom:X,top:.2*f,yWrist:te,zBack:Ce,zFront:Re,zFrontKnuckle:Kt,halfWidth:Le,rake:ne};let bt=A.length>1?A[A.length-2]:null;if(bt&&d){let De=s[2]+bt.b0*p,Xe=s[2]+(bt.b1+1)*p,nt=1/0;for(let Ie=bt.b0;Ie<=bt.b1;Ie++)nt=Math.min(nt,M[Ie]);let Jt=0,pt=0;for(let Ie=0;Ie<a.length;Ie+=3)a[Ie+2]>=De&&a[Ie+2]<=Xe&&a[Ie+1]-l<nt+.015&&(Jt+=a[Ie+2],pt++);P={z0:De,z1:Xe,bottom:nt,zBottom:pt?Jt/pt:(De+Xe)/2}}}if(t.magazine){let U=t.magazine,q=0,C=0;for(let X=0;X<U.pos.length;X+=3)U.pos[X+1]<U.min[1]+.015&&(q+=U.pos[X+2],C++);P={z0:U.min[2],z1:U.max[2],bottom:U.min[1]-l,zBottom:C?q/C:U.center[2]}}let T=S?S.z0:s[2]+.6*o,R=t.trigger?[t.trigger[0],t.trigger[1]-l,t.trigger[2]]:[b,-.04,T-(d?.055:.04)],L=1/0;for(let U=0;U<a.length;U+=3)Math.abs(a[U]-b)<.012&&Math.abs(a[U+1]-l)<.012&&a[U+2]<L&&(L=a[U+2]);let z=[b,l,isFinite(L)?L:s[2]],j=(s[2]+i[2])/2,I=(U,q,C)=>{let X=y(U),te=y(q),W=-1/0;for(let E=X;E<=te;E++)W=Math.max(W,g[E]);let Q=C?X:te;if(C){for(let E=te;E>=X;E--)if(g[E]>=W-.002){Q=E;break}}else for(let E=X;E<=te;E++)if(g[E]>=W-.002){Q=E;break}return[b,l+W,x(Q)]},F=d?I(j-.1*o,i[2]-.25*o,!0):I(j,i[2],!0),N=I(s[2],s[2]+.25*o,!1);d||(F=[F[0],F[1]-.0015,F[2]],N=[N[0],N[1]-.001,N[2]]);let G=null;if(d){let U=[];for(let W=0;W<v;W++)isFinite(g[W])&&g[W]>0&&U.push(g[W]);U.sort((W,Q)=>W-Q);let q=U.length?U[Math.floor(U.length*.3)]:0,C=[];for(let W=0;W<v;W++)g[W]-q>.028&&C.push(W);let X=null,te=-1;for(let W=0;W<=C.length;W++){if(W<C.length&&(W===0||C[W]===C[W-1]+1)){te<0&&(te=C[W]);continue}if(te>=0){let Q=C[W-1];(!X||Q-te>X[1]-X[0])&&(X=[te,Q])}te=W<C.length?C[W]:-1}if(X&&(X[1]-X[0]+1)*p>.08){let W=J=>g[J]-Math.min(w[J],.6*(g[J]-q)),Q=X[1],E=X[0];F=[b,l+W(Q),x(Q)+p*.5],N=[b,l+W(E),x(E)-p*.5],G={z0:x(E),z1:x(Q),railY:q}}}let H=R[2]-da[m].portBack,_=[b+Math.max(.008,w[y(H)]-.003),l+.012,H],V=null;if(d){let U=P?P.z0:T-.1,q=Math.max(s[2]+.12,Math.min(U-.06,U-.145)),C=y(q),X=1/0,te=0;for(let W=Math.max(0,C-1);W<=Math.min(v-1,C+1);W++)X=Math.min(X,M[W]),te=Math.max(te,w[W]);V={z:q,floor:isFinite(X)?X:-.02,halfWidth:te||.02}}return t.charge,{kind:m,min:s,max:i,bore:[b,l],muzzle:z,rearSight:F,frontSight:N,ejectionPort:_,grip:S,mag:P,trigger:R,handguard:V,optic:G,length:o,height:c}}var Eo=[{curl:[.5,.7,.3],spread:.1},{curl:[1.25,1.35,.7]},{curl:[1.3,1.35,.7]},{curl:[1.35,1.3,.7]}],Uo=[{curl:[.25,.55,.3],spread:.08},{curl:[1.3,1.3,.7]},{curl:[1.3,1.3,.7]},{curl:[1.3,1.25,.7]}],ps=[{curl:[1.15,1.2,.6]},{curl:[1.2,1.2,.6]},{curl:[1.2,1.2,.6]},{curl:[1.2,1.15,.6]}],Oo=[{curl:[.9,.9,.4]},{curl:[.95,.9,.4]},{curl:[.95,.9,.4]},{curl:[.95,.9,.4]}],tr=n=>n.map(e=>({...e,curl:[...e.curl]}));function No(n){let e=n.grip;if(!e)return null;let t=n.kind!=="pistol",r=e.rake,a={position:[e.halfWidth+.013,e.yWrist,e.zFrontKnuckle+.013+.085*Math.cos(r)],fingerDir:[0,-Math.sin(r),-Math.cos(r)],dorsal:[1,0,0],fingers:tr(t?Uo:Eo),thumb:t?{dir:[-.6,-.6,-.5],bend:[.25,.15]}:{dir:[-.55,-.55,-.62],bend:[.15,.1]}},s;if(t&&n.handguard){let b=n.handguard;s={position:[-(b.halfWidth+.044),b.floor-.026,b.z],fingerDir:[.8,.15,-.55],dorsal:[0,-1,0],fingers:tr(ps),thumb:{dir:[-.3,.7,-.6],bend:[.15,.1]}}}else{let b=r+.21;s={position:[-(e.halfWidth+.018),e.yWrist,a.position[2]-.043],fingerDir:[0,-Math.sin(b),-Math.cos(b)],dorsal:[-1,0,0],fingers:tr(ps),thumb:{dir:[-.5,-.1,-.86],bend:[.05,.05]}}}let i=n.mag?n.mag.bottom:e.bottom,o;n.mag?o=n.mag.zBottom:o=(e.zFront+e.zBack)/2+Math.tan(r)*(e.yWrist-e.bottom)*.5;let c={position:[-.01,i-.027,o+.055],fingerDir:[.15,.27,-.95],dorsal:[-.1,-1,0],fingers:tr(Oo),thumb:{dir:[-.7,.25,-.6],bend:[.2,.1]}};return{right:a,left:s,indexPressed:t?{curl:[.35,.8,.45],spread:.06}:{curl:[.55,.95,.45],spread:.08},leftOnMagazine:c}}function Br(n,e,t={},r){let a=[],s=[],i=E=>new RegExp(t[E]??Lo[E],"i"),o=E=>{let J=e.drawables[E],Y=e.asset.nodes[J.node];return`${Y.name} ${Y.mesh!==void 0?e.asset.meshes[Y.mesh].name:""} ${J.material.name}`},c=E=>/(^|\s)(muzzle|ejection|rear_?sight_?marker|front_?sight_?marker|socket)/i.test(e.asset.nodes[e.drawables[E].node].name)&&e.drawables[E].mesh.indexCount<=36,b=e.drawables.map((E,J)=>{if(c(J))return null;let Y=E.primitive.positions,D=new Float32Array(Y.length);for(let ee=0;ee<Y.length;ee+=3){let re=hs(E.world,[Y[ee],Y[ee+1],Y[ee+2]]);D[ee]=re[0],D[ee+1]=re[1],D[ee+2]=re[2]}return D}),l=b.reduce((E,J)=>E+(J?J.length:0),0),u=new Float32Array(l);{let E=0;for(let J of b)J&&(u.set(J,E),E+=J.length)}let m,d,v;if(t.forward||t.up||!t.autoOrient){let E=ms[t.forward??"-z"],J=ms[t.up??"+y"];v=[-E[0],-E[1],-E[2]],d=[J[0],J[1],J[2]],m=Gt(jt(d,v))}else{let E=[],J=[];b.forEach((re,se)=>{if(!re)return;let{c:ne,w:he}=jo(re,e.drawables[se].primitive.indices??null);E.push(ne),J.push(he)});let Y=new Float32Array(E.reduce((re,se)=>re+se.length,0)),D=new Float32Array(J.reduce((re,se)=>re+se.length,0));{let re=0,se=0;for(let ne=0;ne<E.length;ne++)Y.set(E[ne],re),re+=E[ne].length,D.set(J[ne],se),se+=J[ne].length}let ee=Go(Y,D);m=ee.ex,d=ee.ey,v=ee.ez,s.push(`orientation from principal axes (forward ${gs([-v[0],-v[1],-v[2]])}, up ${gs(d)}${ee.snapped?"":", not axis-aligned"})`)}let p=O.create();p[0]=m[0],p[4]=m[1],p[8]=m[2],p[1]=d[0],p[5]=d[1],p[9]=d[2],p[2]=v[0],p[6]=v[1],p[10]=v[2];let M=(()=>{let E=1/0,J=-1/0;for(let Y=0;Y<u.length;Y+=3){let D=Ht([u[Y],u[Y+1],u[Y+2]],v);E=Math.min(E,D),J=Math.max(J,D)}return Math.max(J-E,1e-6)})(),g=t.kind,w=t.scale??1;if(t.lengthM)w=t.lengthM/M;else if(t.scale===void 0&&t.autoOrient){if(!g){let D=1/0,ee=-1/0;for(let re=0;re<u.length;re+=3){let se=Ht([u[re],u[re+1],u[re+2]],d);D=Math.min(D,se),ee=Math.max(ee,se)}g=M/Math.max(ee-D,1e-6)>2.2?"carbine":"pistol",s.push(`kind "${g}" from the proportions`)}let E=g==="pistol"?[.13,.32]:g==="carbine"?[.6,1.25]:[.75,1.6],Y=[[1,"m"],[.01,"cm"],[.001,"mm"],[.0254,"in"],[.1,"dm"]].find(([D])=>M*D>=E[0]&&M*D<=E[1]);if(Y)w=Y[0],s.push(`units ${Y[1]} (overall length ${(M*w).toFixed(3)} m)`);else{let D=t.nominalLengthM??da[g].lengthM;w=D/M,s.push(`scale ${w.toPrecision(4)} (units not recognised; fitted to ${D} m for a ${g})`)}}let x=O.multiply(O.create(),p,O.fromScaling(O.create(),[w,w,w])),y=[],k=new Float32Array(l);{let E=0;b.forEach((J,Y)=>{if(!J)return;let D=new Float32Array(J.length);for(let re=0;re<J.length;re+=3){let se=hs(x,[J[re],J[re+1],J[re+2]]);D[re]=se[0],D[re+1]=se[1],D[re+2]=se[2]}k.set(D,E),E+=D.length;let ee=vs(D);y.push({i:Y,...ee,size:Io(ee.max,ee.min),center:[(ee.min[0]+ee.max[0])/2,(ee.min[1]+ee.max[1])/2,(ee.min[2]+ee.max[2])/2],tris:e.drawables[Y].mesh.indexCount/3,name:o(Y),pos:D,idx:e.drawables[Y].primitive.indices??null})})}let f=y.map(E=>({bolt:i("slide").test(E.name),magazine:i("magazine").test(E.name),trigger:i("trigger").test(E.name),selector:i("selector").test(E.name),charge:i("charge").test(E.name)})),A=E=>f.some(J=>J[E]),S=fs(y,g,{});g=S.kind;let[P,T]=S.bore,R=S.length,L=S.min[1]-T,z=g!=="pistol",j=y.reduce((E,J)=>J.tris>(E?.tris??-1)?J:E,null);if(!A("bolt")&&!z&&y.length>1){let J=y.filter(Y=>Y.center[1]>T-.004&&Y.min[1]>T-.03&&Y.size[2]>.5*R).sort((Y,D)=>D.size[2]-Y.size[2])[0];if(J){f[y.indexOf(J)].bolt=!0;for(let Y of y)Y!==J&&Y.size[2]<.12*R&&Y.min[1]>J.center[1]&&Y.min[2]>J.min[2]-.005&&Y.max[2]<J.max[2]+.005&&(f[y.indexOf(Y)].bolt=!0);s.push(`slide = "${J.name.trim()}" (+ ${f.filter(Y=>Y.bolt).length-1} small meshes riding on it)`)}}if(!A("charge")&&z&&y.length>1){let E=(S.min[2]+S.max[2])/2,Y=y.filter(D=>D.min[1]>T+.01&&D.center[2]>E&&D.size[2]>.05*R&&D.size[2]<.2*R&&D.size[1]<.025&&D.size[0]<.08).sort((D,ee)=>ee.max[2]-D.max[2])[0];Y&&(f[y.indexOf(Y)].charge=!0,s.push(`charging handle = "${Y.name.trim()}"`))}if(!A("magazine")&&y.length>1){let J=y.filter(Y=>Y!==j&&Y.max[1]<T+.005&&Y.size[1]>.35*-L&&Y.size[2]<.3*R&&Y.size[1]/Math.max(Y.size[2],1e-6)>1.2).sort((Y,D)=>Y.min[1]-D.min[1])[0];J&&(f[y.indexOf(J)].magazine=!0,s.push(`magazine = "${J.name.trim()}"`))}if(!A("trigger")&&y.length>1&&S.grip){let E=S.grip.z0,Y=y.filter(D=>D.size[0]<.035&&D.size[1]<.035&&D.size[2]<.035&&D.size[1]>.008&&D.center[1]-T>-.07&&D.center[1]-T<-.02&&D.center[2]>E-.075&&D.center[2]<E).sort((D,ee)=>ee.size[1]-D.size[1])[0];Y&&(f[y.indexOf(Y)].trigger=!0,s.push(`trigger = "${Y.name.trim()}"`))}let I=y.find(E=>f[y.indexOf(E)].magazine)??null,F=y.find(E=>f[y.indexOf(E)].trigger)??null,N=y.find(E=>f[y.indexOf(E)].charge)??null,G=fs(y,g,{trigger:F?F.center:null,magazine:I,charge:N}),H=[-P,-T,da[g].triggerZ-G.trigger[2]],_=O.multiply(O.create(),O.fromTranslation(O.create(),H),x),V=E=>h.create(E[0]+H[0],E[1]+H[1],E[2]+H[2]),U=E=>[E[0]+H[0],E[1]+H[1],E[2]+H[2]];G.muzzle=U(G.muzzle),G.rearSight=U(G.rearSight),G.frontSight=U(G.frontSight),G.ejectionPort=U(G.ejectionPort),G.min=U(G.min),G.max=U(G.max),G.trigger=[G.trigger[0]+H[0],G.trigger[1],G.trigger[2]+H[2]],G.grip&&(G.grip.z0+=H[2],G.grip.z1+=H[2],G.grip.zBack+=H[2],G.grip.zFront+=H[2],G.grip.zFrontKnuckle+=H[2]),G.mag&&(G.mag.z0+=H[2],G.mag.z1+=H[2],G.mag.zBottom+=H[2]),G.handguard&&(G.handguard.z+=H[2]),G.bore=[0,0];let q=y.map((E,J)=>{let Y=e.drawables[E.i],D=O.multiply(O.create(),_,Y.world),ee=f[J];return{object:new Me(Y.mesh,Y.material),local:D,bolt:ee.bolt||void 0,magazine:ee.magazine||void 0,trigger:ee.trigger||void 0,selector:ee.selector||void 0,charge:ee.charge||void 0}}),C=E=>{let J=t.sockets?.[E];if(J)return h.create(J[0],J[1],J[2]);let Y=i(E),D=e.asset.nodes.findIndex(ee=>Y.test(ee.name));if(D>=0){let ee=e.nodeWorld[D];return h.transformMat4(h.create(),[ee[12],ee[13],ee[14]],_)}return s.push(`${E} socket from the geometry`),h.create(G[E][0],G[E][1],G[E][2])},X=t.casing?.lengthM??(z?.0448:.019),te=t.casing?.diameterM??(z?.0095:.0099),W={parts:q,muzzle:C("muzzle"),ejectionPort:C("ejectionPort"),rearSight:C("rearSight"),frontSight:C("frontSight"),casingMesh:new ve(n.dev,wt(X,te,je,{straight:t.casing?.straight??!z})),casingMaterial:n.synth.material("brass",{size:512,tileMeters:.03,seed:5},{name:"brass"})};if(t.magAxis)W.magAxis=h.normalize(h.create(),h.create(...t.magAxis));else if(I){let E=Fo(I.pos);E[1]<-.7&&(W.magAxis=h.create(E[0],E[1],E[2]),s.push("magAxis from the magazine's long axis"))}if(!W.magAxis){let E=G.grip?.rake??.3;W.magAxis=z?h.create(0,-.985,-.17):h.create(0,-Math.cos(E),Math.sin(E))}if(t.magBox?W.magBox={center:h.create(...t.magBox.center),half:h.create(...t.magBox.half)}:I?W.magBox={center:V(I.center),half:h.create(I.size[0]/2,I.size[1]/2,I.size[2]/2)}:G.mag&&(W.magBox={center:h.create(0,(G.mag.bottom+.4*L)/2,(G.mag.z0+G.mag.z1)/2),half:h.create(.013,(.4*L-G.mag.bottom)/2,(G.mag.z1-G.mag.z0)/2)}),t.triggerTravelM!==void 0?W.triggerTravelM=t.triggerTravelM:F&&(W.triggerTravelM=da[g].triggerTravelM),t.chargeContract){let E=t.chargeContract;W.charge={grip:h.create(...E.grip),travelM:E.travelM,release:E.release,pullDir:E.pullDir?h.create(...E.pullDir):void 0}}else if(t.chargeContract!==!1&&z){let E=da[g].chargeTravelM;if(N)W.charge={grip:V([N.min[0]+.005,N.center[1],N.max[2]-.011]),travelM:E,release:"boltRelease",pullDir:h.create(0,0,1)};else if(G.grip){let J=G.grip.zBack,Y=-1/0;for(let D=0;D<k.length;D+=3)Math.abs(k[D+2]+H[2]-J)<.01&&(Y=Math.max(Y,k[D+1]-T));W.charge={grip:h.create(-.03,(isFinite(Y)?Y:G.rearSight[1])-.007,J+.002),travelM:E,release:"boltRelease",pullDir:h.create(0,0,1)},s.push("charging handle position (rear of the receiver)")}}let Q=r??t.grips;if(!Q&&t.autoGrips!==!1){let E=No(G);E?(Q=E,s.push("grips from the grip column"+(z?" and handguard":""))):a.push("no pistol grip found below the bore \u2014 pass mapping.grips")}return s.length&&a.push(`guessed: ${s.join("; ")}`),!q.some(E=>E.bolt)&&!z&&a.push('no slide part (one mesh?) \u2014 the action will not animate; name it "slide" or split the mesh'),q.some(E=>E.magazine)||a.push("no magazine part \u2014 reloads will not show the magazine"),q.some(E=>E.trigger)||a.push("no trigger part \u2014 the trigger will not move"),{model:W,grips:Q,warnings:a,analysis:G,kind:g}}function gs(n){let e=[0,1,2].reduce((r,a)=>Math.abs(n[a])>Math.abs(n[r])?a:r,0),t=(n[e]>=0?"+":"-")+"xyz"[e];return Math.abs(n[e])>.985?t:`\u2248${t} [${n.map(r=>r.toFixed(2)).join(", ")}]`}function ws(n){if(/pistol|handgun|sidearm|9mm/i.test(n))return"pistol";if(/carbine|rifle|\bar-?15\b|\bm4\b|\bak\b/i.test(n))return"carbine"}function Ms(n,e){return n==="pistol"?Ur(e):Cr(e)}async function ks(n,e,t,r={}){if(!e?.hasModel(t))return null;let a=await e.model(t,!0);if(!a)return null;let s={kind:ws(t),autoOrient:!0,...await e.weaponMapping(t),...r},i=Br(n,a,s),o=e.modelEntry(t),c=Ms(i.kind,i.model.rearSight[1]);return o?.title&&(c.name=o.title),{model:i.model,spec:c,grips:i.grips,warnings:i.warnings,kind:i.kind,slot:t,title:o?.title??t,analysis:i.analysis}}async function As(n,e,t={}){let r=await Qa(e),a=Bt(n,r,{keepSource:!0}),s=Br(n,a,{kind:ws(e),autoOrient:!0,...t}),i=e.split("/").pop()??e,o=Ms(s.kind,s.model.rearSight[1]);return o.name=i,{model:s.model,spec:o,grips:s.grips,warnings:s.warnings,kind:s.kind,slot:e,title:i,analysis:s.analysis}}var We=[{base:[-.029,.003,-.089],len:[.044,.026,.023],r:[.0092,.0083,.0076]},{base:[-.009,.004,-.092],len:[.048,.029,.024],r:[.0094,.0085,.0078]},{base:[.011,.003,-.089],len:[.045,.028,.023],r:[.009,.0082,.0075]},{base:[.029,.001,-.08],len:[.036,.02,.021],r:[.008,.0073,.0068]}],Ge={base:[-.03,-.006,-.022],len:[.044,.032,.027],r:[.0115,.01,.009]},Vr=[[-.016,.003,-.03],[-.004,.004,-.032],[.008,.003,-.03],[.018,.001,-.028]],xe={z0:-.012,z1:-.08,w0:.028,w1:.041,t0:.013,t1:.0105,cup:.003},Hr=[[-.07,.026,.009],[-.035,.029,.015],[0,.029,.0185],[.04,.031,.023],[.1,.036,.03],[.18,.044,.04],[.24,.042,.039],[.3,.038,.036]],js=[{curl:[.18,.22,.12],spread:.12},{curl:[.2,.25,.12],spread:.03},{curl:[.22,.27,.14],spread:-.06},{curl:[.25,.3,.15],spread:-.14}],Gs={dir:[-.45,-.33,-.83],bend:[.2,.15]},ie={root:0,finger:(n,e)=>1+n*3+e,thumb:n=>13+n,foreA:16,foreB:17,count:18};function Je(n,e,t=K.create()){let r=h.normalize(h.create(),h.set(h.create(),-n[0],-n[1],-n[2])),a=h.set(h.create(),e[0],e[1],e[2]),s=h.normalize(h.create(),h.scaleAndAdd(h.create(),a,r,-h.dot(a,r))),i=h.cross(h.create(),s,r),o=O.create();return o[0]=i[0],o[1]=i[1],o[2]=i[2],o[4]=s[0],o[5]=s[1],o[6]=s[2],o[8]=r[0],o[9]=r[1],o[10]=r[2],O.getRotation(t,o)}function Ft(n,e,t,r){let a=r??Array.from({length:ie.count},()=>({p:h.create(),q:K.create()}));h.set(a[0].p,0,0,0),K.identity(a[0].q);let s=h.create(),i=K.create();We.forEach((l,u)=>{let m=n[u],d=h.set(h.create(),l.base[0]*t,l.base[1],l.base[2]),v=K.fromEuler(K.create(),0,(m.spread??0)*t,0);for(let p=0;p<3;p++){K.multiply(v,v,K.fromEuler(i,-m.curl[p],0,0));let M=a[ie.finger(u,p)];h.copy(M.p,d),K.copy(M.q,v),h.add(d,d,h.transformQuat(s,[0,0,-l.len[p]],v))}});let o=h.normalize(h.create(),h.set(h.create(),e.dir[0]*t,e.dir[1],e.dir[2])),c=Je(o,[0,1,0]),b=h.set(h.create(),Ge.base[0]*t,Ge.base[1],Ge.base[2]);for(let l=0;l<3;l++){l>0&&K.multiply(c,c,K.fromEuler(i,-e.bend[l-1],0,0));let u=a[ie.thumb(l)];h.copy(u.p,b),K.copy(u.q,c),h.add(b,b,h.transformQuat(s,[0,0,-Ge.len[l]],c))}return a}var Ss=0,Ps=1,Ts=2,Co=3,zs=4,Rs=20,Wr=class{kind=[];k=[];prm=[];bmin=[];bmax=[];clipZ=1/0;n=0;push(e,t,r,a,s){this.kind.push(e),this.k.push(t);for(let i=0;i<Rs;i++)this.prm.push(r[i]??0);this.bmin.push(...a),this.bmax.push(...s),this.n++}roundCone(e,t,r,a,s){let i=[t[0]-e[0],t[1]-e[1],t[2]-e[2]],o=i[0]*i[0]+i[1]*i[1]+i[2]*i[2],c=r-a,b=o-c*c,l=1/o,u=Math.max(r,a);this.push(Ss,s,[e[0],e[1],e[2],t[0],t[1],t[2],r,a,i[0],i[1],i[2],o,c,b,l],[Math.min(e[0],t[0])-u,Math.min(e[1],t[1])-u,Math.min(e[2],t[2])-u],[Math.max(e[0],t[0])+u,Math.max(e[1],t[1])+u,Math.max(e[2],t[2])+u])}sphere(e,t,r){this.push(zs,r,[e[0],e[1],e[2],t],[e[0]-t,e[1]-t,e[2]-t],[e[0]+t,e[1]+t,e[2]+t])}ellipsoid(e,t,r,a=[0,0,-1],s=[0,1,0]){let i=Je(a,s),o=O.fromQuat(O.create(),i),c=Math.max(...t);this.push(Ps,r,[e[0],e[1],e[2],t[0],t[1],t[2],o[0],o[1],o[2],o[4],o[5],o[6],o[8],o[9],o[10]],[e[0]-c,e[1]-c,e[2]-c],[e[0]+c,e[1]+c,e[2]+c])}palm(e){let t=xe,r=Math.max(t.w0,t.w1),a=Math.max(t.t0,t.t1)+t.cup;this.push(Ts,e,[],[-r,-a,t.z1-.01],[r,a,t.z0+.01])}forearm(e){let t=Hr;this.push(Co,e,[],[-.05,-.045,t[0][0]-.01],[.05,.045,t[t.length-1][0]+.01])}bounds(){let e=h.set(h.create(),1/0,1/0,1/0),t=h.set(h.create(),-1/0,-1/0,-1/0);for(let r=0;r<this.n;r++)for(let a=0;a<3;a++)e[a]=Math.min(e[a],this.bmin[r*3+a]),t[a]=Math.max(t[a],this.bmax[r*3+a]);return t[2]=Math.min(t[2],this.clipZ),{min:e,max:t}}bk={o:[0,0,0],size:.02,nx:0,ny:0,nz:0,start:new Int32Array(0),list:new Int32Array(0),margin:0};finalize(e){let{min:t,max:r}=this.bounds(),a=this.bk;a.margin=e,a.o=[t[0]-.005,t[1]-.005,t[2]-.005],a.nx=Math.ceil((r[0]-a.o[0]+.01)/a.size),a.ny=Math.ceil((r[1]-a.o[1]+.01)/a.size),a.nz=Math.ceil((r[2]-a.o[2]+.01)/a.size);let s=Array.from({length:a.nx*a.ny*a.nz},()=>[]);for(let o=0;o<this.n;o++){let c=e+this.k[o],b=[0,1,2].map(u=>Math.max(0,Math.floor((this.bmin[o*3+u]-c-a.o[u])/a.size))),l=[0,1,2].map(u=>Math.min([a.nx,a.ny,a.nz][u]-1,Math.floor((this.bmax[o*3+u]+c-a.o[u])/a.size)));for(let u=b[0];u<=l[0];u++)for(let m=b[1];m<=l[1];m++)for(let d=b[2];d<=l[2];d++)s[(u*a.ny+m)*a.nz+d].push(o)}a.start=new Int32Array(s.length+1);let i=0;s.forEach((o,c)=>{a.start[c]=i,i+=o.length}),a.start[s.length]=i,a.list=new Int32Array(i),s.forEach((o,c)=>a.list.set(o,a.start[c]))}evals=0;eval(e,t,r){this.evals++;let a=1e9,s=this.prm,i=this.bmin,o=this.bmax,c=this.bk,b=0,l=this.n,u=!1;if(c.nx>0){let m=Math.floor((e-c.o[0])/c.size),d=Math.floor((t-c.o[1])/c.size),v=Math.floor((r-c.o[2])/c.size);if(m<0||d<0||v<0||m>=c.nx||d>=c.ny||v>=c.nz)b=l=0,a=c.margin;else{let p=(m*c.ny+d)*c.nz+v;b=c.start[p],l=c.start[p+1],u=!0}}for(let m=b;m<l;m++){let d=u?c.list[m]:m,v=this.k[d],p=d*3,M=Math.max(i[p]-e,0,e-o[p]),g=Math.max(i[p+1]-t,0,t-o[p+1]),w=Math.max(i[p+2]-r,0,r-o[p+2]);if(M*M+g*g+w*w>=(a+v)*(a+v))continue;let x=d*Rs,y;switch(this.kind[d]){case Ss:{let f=e-s[x],A=t-s[x+1],S=r-s[x+2],P=s[x+8],T=s[x+9],R=s[x+10],L=s[x+11],z=s[x+12],j=s[x+13],I=s[x+14],F=s[x+6],N=s[x+7],G=f*P+A*T+S*R,H=G-L,_=f*L-P*G,V=A*L-T*G,U=S*L-R*G,q=_*_+V*V+U*U,C=G*G*L,X=H*H*L,te=(z<0?-1:1)*z*z*q;(H<0?-1:1)*j*X>te?y=Math.sqrt(q+X)*I-N:(G<0?-1:1)*j*C<te?y=Math.sqrt(q+C)*I-F:y=(Math.sqrt(q*j*I)+G*z)*I-F;break}case Ps:{let f=e-s[x],A=t-s[x+1],S=r-s[x+2],P=s[x+6]*f+s[x+7]*A+s[x+8]*S,T=s[x+9]*f+s[x+10]*A+s[x+11]*S,R=s[x+12]*f+s[x+13]*A+s[x+14]*S,L=s[x+3],z=s[x+4],j=s[x+5],I=P/L,F=T/z,N=R/j,G=Math.sqrt(I*I+F*F+N*N),H=Math.sqrt(I/L*(I/L)+F/z*(F/z)+N/j*(N/j));y=H>1e-12?G*(G-1)/H:-Math.min(L,z,j);break}case zs:{let f=e-s[x],A=t-s[x+1],S=r-s[x+2];y=Math.sqrt(f*f+A*A+S*S)-s[x+3];break}case Ts:{let f=xe,A=Math.min(1,Math.max(0,(f.z0-r)/(f.z0-f.z1))),S=A*A*(3-2*A),P=f.w0+(f.w1-f.w0)*S,T=f.t0+(f.t1-f.t0)*A,R=e/P,L=t+f.cup*R*R,z=Math.abs(e)-(P-T),j=Math.abs(L),I=Math.max(z,0),F=Math.max(j,0),N=Math.sqrt(I*I+F*F)-T+Math.min(Math.max(z,j-T),0),G=(f.z0+f.z1)/2,H=(f.z0-f.z1)/2,_=Math.abs(r-G)-H,V=Math.max(N,0),U=Math.max(_,0);y=Math.sqrt(V*V+U*U)+Math.min(Math.max(N,_),0);break}default:{let f=Math.min(rr-1,Math.max(0,Math.round((r-Fs)/Es))),A=Us[f],S=Os[f],P=Math.sqrt(e*e+t*t),T;if(P<1e-9)T=-Math.min(A,S);else{let I=e/(P*A),F=t/(P*S);T=P-1/Math.sqrt(I*I+F*F)}let L=Hr[0][0]-r,z=Math.max(T,0),j=Math.max(L,0);y=Math.sqrt(z*z+j*j)+Math.min(Math.max(T,L),0);break}}let k=Math.max(v-Math.abs(a-y),0)/v;a=Math.min(a,y)-k*k*v*.25}return u&&a>c.margin&&(a=c.margin),this.clipZ<1/0&&(a=Math.max(a,r-this.clipZ)),a}grad(e,t,r,a,s=4e-4){a[0]=this.eval(e+s,t,r)-this.eval(e-s,t,r),a[1]=this.eval(e,t+s,r)-this.eval(e,t-s,r),a[2]=this.eval(e,t,r+s)-this.eval(e,t,r-s);let i=Math.hypot(a[0],a[1],a[2])||1;return a[0]/=i,a[1]/=i,a[2]/=i,a}evalGrad(e,t,r,a,s=3e-4){let i=this.eval(e,t,r);a[0]=this.eval(e+s,t,r)-i,a[1]=this.eval(e,t+s,r)-i,a[2]=this.eval(e,t,r+s)-i;let o=Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2])||1;return a[0]/=o,a[1]/=o,a[2]/=o,i}},Fs=-.25,Es=5e-4,rr=1200,Us=new Float32Array(rr),Os=new Float32Array(rr);for(let n=0;n<rr;n++){let[e,t]=Ns(Fs+n*Es);Us[n]=e,Os[n]=t}function Ns(n){let e=Hr;if(n<=e[0][0])return[e[0][1],e[0][2]];for(let t=0;t<e.length-1;t++){let r=e[t],a=e[t+1];if(n<=a[0]){let s=(n-r[0])/(a[0]-r[0]),i=s*s*(3-2*s);return[r[1]+(a[1]-r[1])*i,r[2]+(a[2]-r[2])*i]}}return[e[e.length-1][1],e[e.length-1][2]]}function Cs(n){let e=n.len[2],t=n.r[2],r=t*.72,a=Math.atan2(t-r,e-r),s=.56;return{centre:[0,t+(r-t)*Math.min(1,e*s/(e-r))-.0016,-e*s],radii:[t*.58,.0014,e*.3],tilt:a,r:t,L:e}}function Do(n,e){let t=new Wr;t.clipZ=e;let r=(m,d)=>h.transformQuat(h.create(),m,d),a=(m,d,v=1)=>h.set(h.create(),m[0]+d[0]*v,m[1]+d[1]*v,m[2]+d[2]*v),s=(m,d)=>h.set(h.create(),(m[0]+d[0])/2,(m[1]+d[1])/2,(m[2]+d[2])/2);t.forearm(.016),t.palm(.009),We.forEach((m,d)=>{let v=n[ie.finger(d,0)];t.roundCone(Vr[d],a(v.p,r([0,0,1],v.q),.003),.007,.009,.008)});let i=n[ie.thumb(0)],o=r([0,0,-1],i.q),c=a(i.p,o,Ge.len[0]),b=n[ie.finger(0,0)];t.ellipsoid(a(a(i.p,o,.024),[.005,-.008,-.002]),[.019,.01,.031],.012,o,[0,1,0]);{let m=a(b.p,[0,-.002,.014]),d=h.normalize(h.create(),h.sub(h.create(),m,c)),v=h.distance(m,c)/2,p=h.cross(h.create(),o,d);t.ellipsoid(a(s(c,m),[0,-.002,.004]),[v+.004,.004,.014],.009,o,p)}t.ellipsoid([.026,-.007,-.048],[.012,.0095,.034],.012,[.1,0,-1]);let l=h.normalize(h.create(),h.sub(h.create(),n[ie.finger(3,0)].p,b.p));t.ellipsoid([0,-.0075,-.079],[.016,.0065,.036],.01,l),t.sphere([.026,.006,.012],.006,.01),We.forEach((m,d)=>{let v=n[ie.finger(d,0)],p=Vr[d][0]*1.2,M=.0125-xe.cup*(p/.033)**2;t.roundCone([p,M-5e-4,-.038],a(v.p,[0,m.r[0]*.9,.01]),.0016,.0019,.007)});let u=(m,d,v)=>{for(let p=0;p<3;p++){let M=n[d(p)],g=r([0,0,-1],M.q),w=r([0,1,0],M.q),x=m.r[p];if(p<2){let y=a(M.p,g,m.len[p]);t.roundCone(M.p,y,x*.95,m.r[p+1]*.95,p===0?v:.005),t.ellipsoid(a(M.p,g,m.len[p]*.5),[x*1,x*.8,m.len[p]*.46],.004,g,w),t.ellipsoid(a(a(M.p,g,m.len[p]*.5),w,-x*.3),[x*.86,x*.8,m.len[p]*.38],.004,g,w),t.sphere(a(y,w,5e-4),m.r[p+1]*1.03,.008)}else{let y=x*.72;t.roundCone(M.p,a(a(M.p,g,m.len[p]-y),w,-x*.12),x*.97,y,.005),t.ellipsoid(a(a(M.p,g,m.len[p]*.5),w,-x*.25),[x*.92,x*.9,m.len[p]*.42],.004,g,w);let k=Cs(m),f=K.multiply(K.create(),M.q,K.fromEuler(K.create(),k.tilt,0,0));t.ellipsoid(h.add(h.create(),M.p,r(k.centre,M.q)),k.radii,.0015,r([0,0,-1],f),r([0,1,0],f))}p===0&&t.sphere(a(M.p,w,.0015),x*1.1,.007)}};We.forEach((m,d)=>u(m,v=>ie.finger(d,v),.0065)),u(Ge,m=>ie.thumb(m),.012);for(let m=0;m<3;m++){let d=n[ie.finger(m,0)],v=n[ie.finger(m+1,0)],p=r([0,0,-1],d.q),M=r([0,0,-1],v.q),g=a(d.p,p,.006),w=a(v.p,M,.006),x=h.normalize(h.create(),h.add(h.create(),p,M));t.ellipsoid(a(s(g,w),[0,-.0015,0]),[h.distance(g,w)/2+.002,.0055,.007],.008,x,[0,1,0])}return t}function Bo(n,e){let{min:t,max:r}=n.bounds(),a=t[0]-e,s=t[1]-e,i=t[2]-e,o=Math.ceil((r[0]-t[0])/e)+3,c=Math.ceil((r[1]-t[1])/e)+3,b=Math.ceil((r[2]-t[2])/e)+3,l=new Float32Array(o*c*b),u=(I,F,N)=>(I*c+F)*b+N,m=2,d=m*e*Math.sqrt(3)*1.05+e,v=Math.ceil((o-1)/m),p=Math.ceil((c-1)/m),M=Math.ceil((b-1)/m),g=new Float32Array((v+1)*(p+1)*(M+1)),w=(I,F,N)=>(I*(p+1)+F)*(M+1)+N;for(let I=0;I<=v;I++)for(let F=0;F<=p;F++)for(let N=0;N<=M;N++)g[w(I,F,N)]=n.eval(a+Math.min(I*m,o-1)*e,s+Math.min(F*m,c-1)*e,i+Math.min(N*m,b-1)*e);let x=new Float32Array(8);for(let I=0;I<v;I++)for(let F=0;F<p;F++)for(let N=0;N<M;N++){let G=!1;for(let Q=0;Q<8;Q++)x[Q]=g[w(I+(Q&1),F+(Q>>1&1),N+(Q>>2))],Math.abs(x[Q])<d&&(G=!0);let H=I*m,_=F*m,V=N*m,U=Math.min(H+m,o-1),q=Math.min(_+m,c-1),C=Math.min(V+m,b-1),X=U===o-1?U:U-1,te=q===c-1?q:q-1,W=C===b-1?C:C-1;for(let Q=H;Q<=X;Q++)for(let E=_;E<=te;E++){let J=a+Q*e,Y=s+E*e,D=(Q*c+E)*b;if(G)for(let ee=V;ee<=W;ee++)l[D+ee]=n.eval(J,Y,i+ee*e);else{let ee=(Q-H)/(U-H||1),re=(E-_)/(q-_||1),se=x[0]+(x[1]-x[0])*ee,ne=x[2]+(x[3]-x[2])*ee,he=x[4]+(x[5]-x[4])*ee,Ce=x[6]+(x[7]-x[6])*ee,Re=se+(ne-se)*re,Le=he+(Ce-he)*re;for(let Te=V;Te<=W;Te++)l[D+Te]=Re+(Le-Re)*((Te-V)/(C-V||1))}}}let y=o-1,k=c-1,f=b-1,A=new Int32Array(y*k*f).fill(-1),S=[],P=0,T=[[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]],R=new Float32Array(8);for(let I=0;I<y;I++)for(let F=0;F<k;F++)for(let N=0;N<f;N++){let G=0;for(let q=0;q<8;q++){let C=l[u(I+(q&1),F+(q>>1&1),N+(q>>2))];R[q]=C,C<=0&&(G|=1<<q)}if(G===0||G===255)continue;let H=0,_=0,V=0,U=0;for(let[q,C]of T){let X=G>>q&1,te=G>>C&1;if(X===te)continue;let W=R[q],Q=R[C],E=W/(W-Q);H+=(q&1)+((C&1)-(q&1))*E,_+=(q>>1&1)+((C>>1&1)-(q>>1&1))*E,V+=(q>>2)+((C>>2)-(q>>2))*E,U++}S.push(a+(I+H/U)*e,s+(F+_/U)*e,i+(N+V/U)*e),A[(I*k+F)*f+N]=P++}let L=[],z=(I,F,N)=>A[(I*k+F)*f+N],j=(I,F,N,G,H)=>{I<0||F<0||N<0||G<0||(H?L.push(I,G,N,I,N,F):L.push(I,F,N,I,N,G))};for(let I=0;I<o;I++)for(let F=0;F<c;F++)for(let N=0;N<b;N++){let G=l[u(I,F,N)]<=0;if(I<y&&F>0&&N>0&&F<k&&N<f){let H=l[u(I+1,F,N)]<=0;G!==H&&j(z(I,F-1,N-1),z(I,F,N-1),z(I,F,N),z(I,F-1,N),G)}if(F<k&&I>0&&N>0&&I<y&&N<f){let H=l[u(I,F+1,N)]<=0;G!==H&&j(z(I-1,F,N-1),z(I,F,N-1),z(I,F,N),z(I-1,F,N),!G)}if(N<f&&I>0&&F>0&&I<y&&F<k){let H=l[u(I,F,N+1)]<=0;G!==H&&j(z(I-1,F-1,N),z(I,F-1,N),z(I,F,N),z(I-1,F,N),G)}}return{pos:Float32Array.from(S),tris:Uint32Array.from(L)}}function Vo(n,e,t,r){let a=e.pos.length/3,s=e.pos,i=h.create(),o=(u,m)=>{for(let d=0;d<m;d++){let v=s[u*3],p=s[u*3+1],M=s[u*3+2],g=n.evalGrad(v,p,M,i),w=Math.max(-.0015,Math.min(.0015,g));s[u*3]-=i[0]*w,s[u*3+1]-=i[1]*w,s[u*3+2]-=i[2]*w}};for(let u=0;u<a;u++)o(u,1);let c=Array.from({length:a},()=>[]),b=e.tris;for(let u=0;u<b.length;u+=3){let m=b[u],d=b[u+1],v=b[u+2];c[m].includes(d)||c[m].push(d),c[m].includes(v)||c[m].push(v),c[d].includes(m)||c[d].push(m),c[d].includes(v)||c[d].push(v),c[v].includes(m)||c[v].push(m),c[v].includes(d)||c[v].push(d)}let l=new Float32Array(s.length);for(let u=0;u<t;u++){for(let m=0;m<a;m++){let d=c[m];if(!d.length){l[m*3]=s[m*3],l[m*3+1]=s[m*3+1],l[m*3+2]=s[m*3+2];continue}let v=0,p=0,M=0;for(let x of d)v+=s[x*3],p+=s[x*3+1],M+=s[x*3+2];v=v/d.length-s[m*3],p=p/d.length-s[m*3+1],M=M/d.length-s[m*3+2];let g=n.evalGrad(s[m*3],s[m*3+1],s[m*3+2],i),w=v*i[0]+p*i[1]+M*i[2]+Math.max(-.0015,Math.min(.0015,g));l[m*3]=s[m*3]+.6*v-i[0]*w,l[m*3+1]=s[m*3+1]+.6*p-i[1]*w,l[m*3+2]=s[m*3+2]+.6*M-i[2]*w}s.set(l)}for(let u=0;u<a;u++)n.grad(s[u*3],s[u*3+1],s[u*3+2],i),r[u*3]=i[0],r[u*3+1]=i[1],r[u*3+2]=i[2];for(let u=0;u<b.length;u+=3){let m=b[u]*3,d=b[u+1]*3,v=b[u+2]*3,p=s[d]-s[m],M=s[d+1]-s[m+1],g=s[d+2]-s[m+2],w=s[v]-s[m],x=s[v+1]-s[m+1],y=s[v+2]-s[m+2],k=M*y-g*x,f=g*w-p*y,A=p*x-M*w,S=r[m]+r[d]+r[v],P=r[m+1]+r[d+1]+r[v+1],T=r[m+2]+r[d+2]+r[v+2];if(k*S+f*P+A*T<0){let R=b[u+1];b[u+1]=b[u+2],b[u+2]=R}}}var ar={membershipPower:7,fingerGates:[.008,.005,.0045],thumbGates:[.024,.0065,.005],wristGate:.012};function Ho(n,e,t){let r=t[0]-e[0],a=t[1]-e[1],s=t[2]-e[2],i=n[0]-e[0],o=n[1]-e[1],c=n[2]-e[2],b=r*r+a*a+s*s,l=b>0?Math.min(1,Math.max(0,(i*r+o*a+c*s)/b)):0;return Math.hypot(i-r*l,o-a*l,c-s*l)}var Wo=(n,e,t)=>{let r=Math.min(1,Math.max(0,(t-n)/(e-n)));return r*r*(3-2*r)};function qo(n,e){let t=(i,o)=>h.transformQuat(h.create(),i,o),r=[],a=(i,o,c,b)=>{let l={bones:[],segs:[],gates:[],island:b},u=null;for(let m=0;m<3;m++){let d=n[o(m)],v=t([0,0,-1],d.q);l.bones.push(o(m)),l.segs.push({a:h.clone(d.p),b:h.scaleAndAdd(h.create(),d.p,v,i.len[m]),r:i.r[m]});let p=u?h.normalize(h.create(),h.add(h.create(),u,v)):h.clone(v);l.gates.push({p:m===0?h.scaleAndAdd(h.create(),d.p,v,c[m]*.5):h.clone(d.p),axis:p,h:c[m]}),u=v}r.push(l)};We.forEach((i,o)=>a(i,c=>ie.finger(o,c),ar.fingerGates,1+o)),a(Ge,i=>ie.thumb(i),ar.thumbGates,5),r.push({bones:[ie.foreA,ie.foreB],segs:[{a:h.create(0,0,-.02),b:h.create(0,0,e),r:.03}],gates:[{p:h.create(0,0,.006),axis:h.create(0,0,1),h:ar.wristGate},{p:h.create(0,0,.03),axis:h.create(0,0,1),h:0,linearTo:e}],island:0});let s={bones:[],segs:[],gates:[],island:0};return We.forEach((i,o)=>s.segs.push({a:h.clone(Vr[o]),b:h.clone(n[ie.finger(o,0)].p),r:.0095})),s.segs.push({a:h.create(0,0,-.035),b:h.create(0,0,-.005),r:.02}),r.push(s),r}function _o(n,e,t,r){let a=0;for(let s=0;s<e.length;s++){let i=e[s],o=1/0;for(let b of i.segs)o=Math.min(o,Ho(n,b.a,b.b)/b.r);let c=Math.pow(o+.05,-ar.membershipPower);r[s]=c,a+=c}t.fill(0);for(let s=0;s<e.length;s++){let i=e[s],o=r[s]/a;if(r[s]=o,o<1e-5)continue;let c=1,b=1;for(let l=0;l<i.bones.length;l++){let u=i.gates[l],m=(n[0]-u.p[0])*u.axis[0]+(n[1]-u.p[1])*u.axis[1]+(n[2]-u.p[2])*u.axis[2],d=u.linearTo!==void 0?Math.min(1,Math.max(0,m/(u.linearTo-u.p[2]))):Wo(-u.h,u.h,m);l===0&&(b=1-d),l>0&&(t[i.bones[l-1]]+=o*c*(1-d)),c*=d}i.bones.length&&(t[i.bones[i.bones.length-1]]+=o*c),t[ie.root]+=o*(i.bones.length?b:1)}}function Ls(n,e,t){let a=t/24,s=0;for(let i=0;i<24;i++){let o=(i+.5)*a;s+=Math.hypot(n*Math.sin(o),e*Math.cos(o))}return s*a}function Ko(n){let e=[];e.push({uv(r){let[a,s]=Ns(r[2]),i=Math.atan2(r[1]/s,-r[0]/a),o=Ls(a,s,Math.PI*2);return[Ls(a,s,i),r[2],o]}});let t=(r,a)=>{let s=[0,1,2].map(b=>{let l=n[a(b)];return{p:l.p,q:K.invert(K.create(),l.q),len:r.len[b]}}),i=(r.r[0]+r.r[1]+r.r[2])/3,o=Math.PI*2*i,c=h.create();return{uv(b){let l=1/0,u=0,m=0,d=0;for(let v=0;v<3;v++){let p=s[v];h.transformQuat(c,h.set(c,b[0]-p.p[0],b[1]-p.p[1],b[2]-p.p[2]),p.q);let M=Math.min(0,Math.max(-p.len,c[2])),g=Math.hypot(c[0],c[1],c[2]-M);g<l&&(l=g,u=Math.atan2(c[1],-c[0])*i,m=d-c[2]),d+=p.len}return[u,m,o]}}};return We.forEach((r,a)=>e.push(t(r,s=>ie.finger(a,s)))),e.push(t(Ge,r=>ie.thumb(r))),e}function qr(n,e){let t=Ft(js,Gs,n),r=[];for(let a=0;a<ie.count;a++){let s=O.create();a===ie.foreA||(a===ie.foreB?O.fromTranslation(s,[0,0,e]):O.fromRotationTranslation(s,t[a].q,t[a].p)),r.push(O.invert(O.create(),s))}return r}var Is=new Map;function Ds(n={}){let e=n.cell??.0022,t=n.forearmLength??.27,r=n.skinnedForearm??.12,a=n.smoothIterations??2,s=JSON.stringify([e,t,r,a]),i=Is.get(s);if(i)return i;let o=performance.now(),c=Ft(js,Gs,1),b=Do(c,r);b.finalize(e*10);let l=Bo(b,e),u=performance.now(),m=l.pos.length/3,d=new Float32Array(m*3);Vo(b,l,a,d);let v=performance.now(),{min:p,max:M}=b.bounds(),g=Math.ceil((M[0]-p[0])/e+3)*Math.ceil((M[1]-p[1])/e+3)*Math.ceil((M[2]-p[2])/e+3),w=qo(c,t),x=Ko(c),y=new Uint16Array(m*4),k=new Float32Array(m*4),f=new Uint8Array(m),A=new Float64Array(ie.count),S=new Float64Array(w.length),P=h.create();for(let C=0;C<m;C++){h.set(P,l.pos[C*3],l.pos[C*3+1],l.pos[C*3+2]),_o(P,w,A,S);let X=0;for(let W=1;W<S.length;W++)S[W]>S[X]&&(X=W);f[C]=w[X].island;let te=0;for(let W=0;W<4;W++){let Q=-1,E=1e-7;for(let J=0;J<ie.count;J++)A[J]>E&&(E=A[J],Q=J);if(Q<0){y[C*4+W]=0,k[C*4+W]=0;continue}y[C*4+W]=Q,k[C*4+W]=E,te+=E,A[Q]=0}for(let W=0;W<4;W++)k[C*4+W]/=te||1}let T=[],R=[],L=[],z=[],j=[],I=[],F=new Map,N=new Map,G=(C,X)=>{let te=C*8+X,W=N.get(te);return W||(W=x[X].uv(l.pos.subarray(C*3,C*3+3)),N.set(te,W)),W},H=(C,X,te,W,Q)=>{let E=(C*8+X)*2+(Q?1:0),J=F.get(E);if(J===void 0){J=T.length/3,F.set(E,J),T.push(l.pos[C*3],l.pos[C*3+1],l.pos[C*3+2]),R.push(d[C*3],d[C*3+1],d[C*3+2]),L.push(te,W);for(let Y=0;Y<4;Y++)z.push(y[C*4+Y]),j.push(k[C*4+Y])}return J},_=l.tris;for(let C=0;C<_.length;C+=3){let X=_[C],te=_[C+1],W=_[C+2],Q=f[X],E=f[te],J=f[W],Y=Q===E||Q===J?Q:E===J?E:Q,D=G(X,Y),ee=G(te,Y),re=G(W,Y),se=D[2],ne=[D[0],ee[0],re[0]],he=[!1,!1,!1],Ce=Math.min(ne[0],ne[1],ne[2]);if(Math.max(ne[0],ne[1],ne[2])-Ce>se/2)for(let Le=0;Le<3;Le++)ne[Le]-Ce<=se/2&&(ne[Le]+=se,he[Le]=!0);I.push(H(X,Y,ne[0],D[1],he[0]),H(te,Y,ne[1],ee[1],he[1]),H(W,Y,ne[2],re[1],he[2]))}let V=new fe(T,R,L,I);V.joints=Uint16Array.from(z),V.weights=Float32Array.from(j),V.computeTangents();let U=Jo(c),q={geometry:V,nails:U,bindInverse:qr(1,t),bindFrames:c,forearmLength:t,stats:{vertices:V.vertexCount,triangles:V.triangleCount,cell:e,ms:performance.now()-o,gridSamples:g,phases:{grid:u-o,relax:v-u,skin:performance.now()-v},sdfEvals:b.evals}};return Is.set(s,q),q}function Jo(n){let e=[],t=[],r=[],a=(i,o)=>{let c=Cs(i),b=n[o],l=tn(1,20,12).scale(c.radii[0]*.95,c.radii[1]*.9,c.radii[2]*.95).rotateX(c.tilt).translate(c.centre[0],c.centre[1]+5e-4,c.centre[2]);l.transform(O.fromRotationTranslation(O.create(),b.q,b.p)),l.scaleUVs(.004);for(let u=0;u<l.vertexCount;u++)t.push(o,0,0,0),r.push(1,0,0,0);e.push(l)};We.forEach((i,o)=>a(i,ie.finger(o,2))),a(Ge,ie.thumb(2));let s=fe.merge(e);return s.joints=Uint16Array.from(t),s.weights=Float32Array.from(r),s.computeTangents()}function ua(n){let e=n.clone();for(let t=0;t<e.positions.length;t+=3)e.positions[t]=-e.positions[t],e.normals[t]=-e.normals[t];return e.flipWinding(),e.tangents=null,e.computeTangents()}var Bs=.1,Xo=.12,nr=class{constructor(e,t={}){this.renderer=e;this.options={skin:t.skin??"bare",skinColor:t.skinColor??[.56,.36,.27],gloveColor:t.gloveColor??[.085,.08,.072],palmColor:t.palmColor??[.06,.05,.04],sleeveColor:t.sleeveColor??[.075,.08,.065],shoulderRight:t.shoulderRight??[.2,-.31,.1],shoulderLeft:t.shoulderLeft??[-.2,-.31,.1],forearmLength:t.forearmLength??.27,upperArmLength:t.upperArmLength??.31,viewmodel:t.viewmodel??!0,meshCell:t.meshCell??Math.min(.0035,Math.max(.0016,.0033/Oe.detail))};let r=e.synth,a=Math.min(Oe.textureSize,2048),s=this.options.skin==="bare",i=s?r.material("skin",{size:a,tileMeters:.05,color:this.options.skinColor,seed:71},{name:"skin",specular:.35,normalScale:.85}):r.material("glove",{size:a,tileMeters:.04,color:this.options.gloveColor,seed:61},{name:"glove-knit",specular:.3,normalScale:.9}),o=r.material("glove",{size:1024,tileMeters:.05,color:this.options.palmColor,extra:1,seed:64},{name:"glove-leather",specular:.4}),c=r.material("skin",{size:512,tileMeters:.02,color:this.options.skinColor,extra:1,seed:72},{name:"nail",specular:.6,normalScale:.5}),b=r.material("webbing",{size:a,tileMeters:.06,color:this.options.sleeveColor,seed:63},{name:"sleeve"}),l=e.dev,u=(x,y,k)=>{let f=new Me(new ve(l,x,{label:k}),y);return f.viewmodel=this.options.viewmodel,f.castShadow=!this.options.viewmodel,this.objects.push(f),f},m=this.options.forearmLength,d=Ds({cell:this.options.meshCell,forearmLength:m,skinnedForearm:Xo});this.meshStats=d.stats,this.sleeveLength=m-Bs+.03;let v=Zo(this.sleeveLength),p=this.options.upperArmLength+.42,M=ut(.04,.05,p,oe(20)).rotateX(Math.PI/2).translate(0,0,-p/2).scale(1,.86,1);this.upperLength=p;let g=Yo(),w=Qo();for(let x of[1,-1]){let y=x===1?d.geometry:ua(d.geometry),k=x===1?d.nails:ua(d.nails),f=new Float32Array(ie.count*16);for(let T=0;T<ie.count;T++)O.identity(f.subarray(T*16,T*16+16));let A=u(y,i,`hand-${x}`),S=u(k,c,`nails-${x}`);A.joints=f,S.joints=f,S.visible=s;let P=[];s||(P.push(u(x===1?g:ua(g),o,`cuff-${x}`)),P.push(u(x===1?w:ua(w),o,`knuckles-${x}`))),this.sides.push({side:x,hand:A,nails:S,joints:f,trim:P,sleeve:u(v,b,`sleeve-${x}`),upper:u(M,b,`upper-${x}`),bindInv:x===1?d.bindInverse:qr(-1,m),frames:Array.from({length:ie.count},()=>({p:h.create(),q:K.create()}))})}}objects=[];options;visible=!0;meshStats;sides=[];sleeveLength;upperLength=1;tmp=O.create();tmp2=O.create();addTo(e){for(let t of this.objects)e.add(t);return this}setVisible(e){this.visible=e;for(let t of this.objects)t.visible=e;if(e&&this.options.skin!=="bare")for(let t of this.sides)t.nails.visible=!1}update(e,t,r,a={}){if(!this.visible)return;let s=t.right,i=t.indexPressed&&(a.trigger??0)>0?Vs(s.fingers[0],t.indexPressed,a.trigger??0):s.fingers[0],o=s.thumb;if(a.rightThumb&&a.rightThumb.weight>0){let m=Math.min(1,a.rightThumb.weight),d=a.rightThumb.thumb;o={dir:ma(s.thumb.dir,d.dir,m),bend:[s.thumb.bend[0]+(d.bend[0]-s.thumb.bend[0])*m,s.thumb.bend[1]+(d.bend[1]-s.thumb.bend[1])*m]}}let c={...s,fingers:[i,s.fingers[1],s.fingers[2],s.fingers[3]],thumb:o};this.poseHand(this.sides[0],e,c,r,this.options.shoulderRight);let b=t.left??null;a.leftOverride&&b?b=_r(b,a.leftOverride,a.leftWeight??1):a.leftOverride&&(b=a.leftOverride);let l=this.sides[1],u=!!b;l.hand.visible=l.sleeve.visible=l.upper.visible=u;for(let m of l.trim)m.visible=u;l.nails.visible=u&&this.options.skin==="bare",b&&this.poseHand(l,e,b,r,this.options.shoulderLeft)}poseHand(e,t,r,a,s){let i=e.side,o=Je(r.fingerDir,r.dorsal),c=O.fromRotationTranslation(O.create(),o,r.position),b=O.multiply(O.create(),t,c);for(let F of e.trim)F.setTransform(b);let l=Ft(r.fingers,r.thumb,i,e.frames),u=e.joints,m=this.tmp,d=this.tmp2;for(let F=0;F<ie.foreA;F++)O.fromRotationTranslation(m,l[F].q,l[F].p),O.multiply(d,b,m),O.multiply(m,d,e.bindInv[F]),u.set(m,F*16);let v=h.transformMat4(h.create(),[0,0,0],b),p=O.getRotation(K.create(),b),M=h.normalize(h.create(),h.transformQuat(h.create(),[0,0,1],p)),g=h.transformQuat(h.create(),[0,1,0],p),w=this.options.forearmLength,x=this.options.upperArmLength,y,k;if(a){k=h.add(h.create(),h.set(h.create(),a.position[0],a.position[1],a.position[2]),h.transformQuat(h.create(),s,a.rotation));let F=(x+w)*.995;h.distance(k,v)>F&&(k=h.scaleAndAdd(h.create(),v,h.normalize(h.create(),h.sub(h.create(),k,v)),F));let G=h.transformQuat(h.create(),[i*.7,-1,.15],a.rotation);y=$o(k,v,x,w,G,M)}else y=h.scaleAndAdd(h.create(),v,M,w),k=h.scaleAndAdd(h.create(),y,M,x);let f=h.sub(h.create(),y,v),A=h.length(f),S=h.scale(h.create(),f,1/Math.max(A,1e-6)),P=h.negate(h.create(),S),T=h.sub(h.create(),k,y),R=h.scaleAndAdd(h.create(),T,S,-h.dot(T,S)),L=h.normalize(h.create(),h.scaleAndAdd(h.create(),g,R,-1/x*1.4));O.fromRotationTranslation(m,Je(P,g),v),u.set(m,ie.foreA*16),O.fromRotationTranslation(d,Je(P,L),y),O.multiply(m,d,e.bindInv[ie.foreB]),u.set(m,ie.foreB*16);let z=(F,N,G,H,_)=>{let V=h.sub(h.create(),G,N),U=h.length(V),q=h.scale(h.create(),V,1/Math.max(U,1e-6)),C=O.fromRotationTranslation(this.tmp,Je(q,H),N),X=U/_;C[8]*=X,C[9]*=X,C[10]*=X,F.setTransform(C)},j=h.normalize(h.create(),h.lerp(h.create(),g,L,.4));z(e.sleeve,h.scaleAndAdd(h.create(),v,S,Bs*(A/w)),h.scaleAndAdd(h.create(),y,S,.03),j,this.sleeveLength);let I=h.normalize(h.create(),T);z(e.upper,h.scaleAndAdd(h.create(),y,I,-.02),h.scaleAndAdd(h.create(),k,I,.4),L,this.upperLength)}};function Yo(){let n=je([[.0295,-.006],[.0315,-.004],[.0325,0],[.0335,.014],[.0345,.03],[.0335,.038],[.031,.04],[.0295,.038]],oe(26)).rotateX(-Math.PI/2).scale(1,.66,1),e=me(.056,.0024,.016,9e-4).translate(.002,.0238,.021),t=me(.011,.003,.012,.001).translate(.0335,.023,.021);return fe.merge([n,e,t]).computeTangents()}function Qo(){let n=me(.064,.0055,.028,.0026,4).translate(0,.0205,-.071);{let e=n.positions;for(let t=0;t<e.length;t+=3){let r=e[t]/.033;e[t+1]-=.0032*r*r}}return n.computeNormals().computeTangents()}function Zo(n){let e=[[.034,.006],[.036,0],[.0395,.003],[.0415,.009],[.042,.016],[.0405,.024],[.0385,.032],[.0385,n*.4],[.0405,n*.7],[.0435,n*.9],[.0445,n],[.037,n+.004],[0,n+.004]];return je(e,oe(22)).rotateX(-Math.PI/2).scale(1,.84,1)}function $o(n,e,t,r,a,s){let i=h.sub(h.create(),e,n),o=h.length(i);if(o<1e-5)return h.scaleAndAdd(h.create(),e,s,r);let c=h.scale(h.create(),i,1/o);o=Math.min(o,(t+r)*.9995);let b=(t*t-r*r+o*o)/(2*o),l=Math.sqrt(Math.max(0,t*t-b*b)),u=h.scaleAndAdd(h.create(),a,c,-h.dot(a,c)),m=h.length(u)>1e-6?h.normalize(u,u):h.normalize(h.create(),h.cross(h.create(),c,h.create(0,1,0))),d=h.scaleAndAdd(h.create(),n,c,b);return h.scaleAndAdd(d,d,m,l)}function Vs(n,e,t){return{curl:[n.curl[0]+(e.curl[0]-n.curl[0])*t,n.curl[1]+(e.curl[1]-n.curl[1])*t,n.curl[2]+(e.curl[2]-n.curl[2])*t],spread:(n.spread??0)+((e.spread??0)-(n.spread??0))*t}}function ma(n,e,t){return[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t,n[2]+(e[2]-n[2])*t]}function _r(n,e,t){return{position:ma(n.position,e.position,t),fingerDir:ma(n.fingerDir,e.fingerDir,t),dorsal:ma(n.dorsal,e.dorsal,t),fingers:[0,1,2,3].map(r=>Vs(n.fingers[r],e.fingers[r],t)),thumb:{dir:ma(n.thumb.dir,e.thumb.dir,t),bend:[n.thumb.bend[0]+(e.thumb.bend[0]-n.thumb.bend[0])*t,n.thumb.bend[1]+(e.thumb.bend[1]-n.thumb.bend[1])*t]}}}function ec(n,e){let t=0;for(let r=0;r+2<e.length;r+=3){let a=e[r]*3,s=e[r+1]*3,i=e[r+2]*3;t+=n[a]*(n[s+1]*n[i+2]-n[s+2]*n[i+1])-n[a+1]*(n[s]*n[i+2]-n[s+2]*n[i])+n[a+2]*(n[s]*n[i+1]-n[s+1]*n[i])}return t/6}function Kr(n){let e=[],t=[],r=h.create();for(let m of n.parts){let d=m.object.mesh.source;if(!d||ec(d.positions,d.indices)<0)continue;let v=e.length/3,p=d.positions.length/3;for(let M=0;M<p;M++)h.transformMat4(r,[d.positions[M*3],d.positions[M*3+1],d.positions[M*3+2]],m.local),e.push(r[0],r[1],r[2]);for(let M=0;M<d.indices.length;M++)t.push(v+d.indices[M])}if(!t.length)return null;let a=new Float32Array(e),s=new Uint32Array(t),i=s.length/3,o=new Float32Array(i*3),c=h.create(1/0,1/0,1/0);for(let m=0;m<a.length;m+=3)c[0]=Math.min(c[0],a[m]),c[1]=Math.min(c[1],a[m+1]),c[2]=Math.min(c[2],a[m+2]);let b=.012,l=new Map,u=(m,d,v)=>(m&1023)<<20|(d&1023)<<10|v&1023;for(let m=0;m<i;m++){let d=s[m*3]*3,v=s[m*3+1]*3,p=s[m*3+2]*3,M=h.create(a[v]-a[d],a[v+1]-a[d+1],a[v+2]-a[d+2]),g=h.create(a[p]-a[d],a[p+1]-a[d+1],a[p+2]-a[d+2]),w=h.cross(h.create(),M,g),x=h.length(w)||1;o[m*3]=w[0]/x,o[m*3+1]=w[1]/x,o[m*3+2]=w[2]/x;let y=[1/0,1/0,1/0],k=[-1/0,-1/0,-1/0];for(let S of[d,v,p])for(let P=0;P<3;P++)y[P]=Math.min(y[P],a[S+P]),k[P]=Math.max(k[P],a[S+P]);let f=y.map((S,P)=>Math.floor((S-c[P])/b)),A=k.map((S,P)=>Math.floor((S-c[P])/b));for(let S=f[0];S<=A[0];S++)for(let P=f[1];P<=A[1];P++)for(let T=f[2];T<=A[2];T++){let R=u(S,P,T),L=l.get(R);L||l.set(R,L=[]),L.push(m)}}return{pos:a,tri:s,nrm:o,grid:l,cell:b,min:c}}function tc(n,e,t,r,a){let s=h.sub(h.create(),t,e),i=h.sub(h.create(),r,e),o=h.sub(h.create(),n,e),c=h.dot(s,o),b=h.dot(i,o);if(c<=0&&b<=0)return h.copy(a,e);let l=h.sub(h.create(),n,t),u=h.dot(s,l),m=h.dot(i,l);if(u>=0&&m<=u)return h.copy(a,t);let d=c*m-u*b;if(d<=0&&c>=0&&u<=0){let f=c/(c-u);return h.scaleAndAdd(a,e,s,f)}let v=h.sub(h.create(),n,r),p=h.dot(s,v),M=h.dot(i,v);if(M>=0&&p<=M)return h.copy(a,r);let g=p*b-c*M;if(g<=0&&b>=0&&M<=0){let f=b/(b-M);return h.scaleAndAdd(a,e,i,f)}let w=u*M-p*m;if(w<=0&&m-u>=0&&p-M>=0){let f=(m-u)/(m-u+(p-M));return h.sub(a,r,t),h.scaleAndAdd(a,t,a,f)}let x=1/(w+g+d),y=g*x,k=d*x;return h.scaleAndAdd(a,e,s,y),h.scaleAndAdd(a,a,i,k)}function ha(n,e,t){let r=Math.floor((e[0]-n.min[0])/n.cell),a=Math.floor((e[1]-n.min[1])/n.cell),s=Math.floor((e[2]-n.min[2])/n.cell),i=Math.ceil(t/n.cell),o=1/0,c=-1,b=1/0,l=h.create(),u=h.create(),m=h.create(),d=h.create(),v=(M,g,w)=>(M&1023)<<20|(g&1023)<<10|w&1023,p=new Set;for(let M=0;M<=i;M++){for(let g=r-M;g<=r+M;g++)for(let w=a-M;w<=a+M;w++)for(let x=s-M;x<=s+M;x++){if(Math.max(Math.abs(g-r),Math.abs(w-a),Math.abs(x-s))!==M)continue;let y=n.grid.get(v(g,w,x));if(y)for(let k of y){if(p.has(k))continue;p.add(k);let f=n.tri[k*3]*3,A=n.tri[k*3+1]*3,S=n.tri[k*3+2]*3;h.set(u,n.pos[f],n.pos[f+1],n.pos[f+2]),h.set(m,n.pos[A],n.pos[A+1],n.pos[A+2]),h.set(d,n.pos[S],n.pos[S+1],n.pos[S+2]),tc(e,u,m,d,l);let P=h.distance(e,l);P<o&&(o=P,c=k),P<b&&(e[0]-n.pos[f])*n.nrm[k*3]+(e[1]-n.pos[f+1])*n.nrm[k*3+1]+(e[2]-n.pos[f+2])*n.nrm[k*3+2]>=0&&(b=P)}}if(c>=0&&o<M*n.cell)break}return c<0?t:b<=o+.0015?b:o<.025?-o:o}var ac=[1.65,1.95,1.25],rc=[1,1.3];function ir(n){return O.fromRotationTranslation(O.create(),Je(n.fingerDir,n.dorsal),n.position)}function sr(n,e,t,r,a,s,i,o,c=5){let l=Ft(t,r,a)[s],u=h.transformQuat(h.create(),[0,0,-1],l.q),m=1/0,d=h.create(),v=h.create();for(let p=0;p<=c;p++){h.scaleAndAdd(d,l.p,u,i*(.3+.7*(p/c))),h.transformMat4(v,d,e);let M=ha(n,v,.06)-o;M<m&&(m=M)}return m}function Hs(n,e,t,r){if(n(t)>=r)return t;if(n(e)<r)return e;for(let a=0;a<14;a++){let s=(e+t)/2;n(s)>=r?e=s:t=s}return e}function nc(n,e,t,r={}){let a=r.clearance??8e-4,s=r.maxCurl??ac,i=r.maxThumbBend??rc,o={...n,position:[...n.position],fingers:n.fingers.map(d=>({...d,curl:[...d.curl]})),thumb:{dir:[...n.thumb.dir],bend:[...n.thumb.bend]}},c={changed:0,palmPush:0,fingers:[]},b=ir(o),l=r.lockIndex??!1,u=d=>!(o.fingers[d].lock||d===0&&l),m=o.fingers.map((d,v)=>u(v)?{...d,curl:[0,0,0]}:d);if(r.fixPalm!==!1){let d=h.normalize(h.create(),h.set(h.create(),n.dorsal[0],n.dorsal[1],n.dorsal[2])),v=h.normalize(h.create(),h.set(h.create(),n.fingerDir[0],n.fingerDir[1],n.fingerDir[2])),p=[...o.position],M=h.create(),g=()=>{let x=1/0;for(let y=0;y<=3;y++)for(let k=-1;k<=1;k++){let f=xe.z0+(xe.z1-xe.z0)*(y/3),A=xe.t0+(xe.t1-xe.t0)*(y/3),S=(xe.w0+(xe.w1-xe.w0)*(y/3))*.8;h.transformMat4(M,[k*S*t,-A,f],b),x=Math.min(x,ha(e,M,.05))}return o.fingers.forEach((y,k)=>{u(k)&&(x=Math.min(x,sr(e,b,m,o.thumb,t,ie.finger(k,0),We[k].len[0],We[k].r[0])))}),Math.max(0,-x)},w={score:g()*1e3,a:0,b:0};if(w.score>0){for(let x=0;x<=16;x+=2)for(let y=-16;y<=16;y+=2){if(x===0&&y===0)continue;for(let f=0;f<3;f++)o.position[f]=p[f]+d[f]*x*.001+v[f]*y*.001;b=ir(o);let k=g()*1e3+.12*Math.hypot(x,y);k<w.score&&(w={score:k,a:x,b:y})}for(let x=0;x<3;x++)o.position[x]=p[x]+d[x]*w.a*.001+v[x]*w.b*.001;b=ir(o),c.palmPush=Math.hypot(w.a,w.b)*.001,c.offset=[w.a*.001,w.b*.001]}}o.fingers.forEach((d,v)=>{if(!u(v))return;let p=[...d.curl],M=We[v];for(let g=0;g<3;g++){let w=x=>{let y=o.fingers.map((f,A)=>A===v?{...f,curl:f.curl.map((S,P)=>P===g?x:P>g?0:S)}:f),k=1/0;for(let f=g;f<3;f++)k=Math.min(k,sr(e,b,y,o.thumb,t,ie.finger(v,f),M.len[f],M.r[f]));return k};d.curl[g]=Hs(w,0,Math.min(s[g],p[g]+.4),a)}p.some((g,w)=>Math.abs(g-d.curl[w])>.001)&&(c.changed++,c.fingers.push({finger:v,from:p,to:[...d.curl]}))});{let d=[...o.thumb.bend],v=[...o.thumb.dir],p=M=>{let g=1/0;for(let w=0;w<3;w++)g=Math.min(g,sr(e,b,o.fingers,{dir:M,bend:[0,0]},t,ie.thumb(w),Ge.len[w],Ge.r[w]));return g};if(p(v)<0){let M=(w,x)=>{let y=K.multiply(K.create(),K.setAxisAngle(K.create(),[0,0,1],w*Math.PI/180),K.setAxisAngle(K.create(),[1,0,0],x*Math.PI/180)),k=h.transformQuat(h.create(),v,y);return[k[0],k[1],k[2]]},g={pen:-p(v)*1e3,az:0,ax:0};for(let w=-60;w<=60;w+=5)for(let x=-30;x<=30;x+=5){if(!w&&!x)continue;let y=Math.max(0,-p(M(w,x)))*1e3+(Math.abs(w)+Math.abs(x))*.03;y<g.pen&&(g={pen:y,az:w,ax:x})}(g.az||g.ax)&&(o.thumb.dir=M(g.az,g.ax),c.thumbTurnDeg=g.az+(g.ax,0))}for(let M=0;M<2;M++){let g=w=>{let x={dir:o.thumb.dir,bend:o.thumb.bend.map((k,f)=>f===M?w:f>M?0:k)},y=1/0;for(let k=M+1;k<3;k++)y=Math.min(y,sr(e,b,o.fingers,x,t,ie.thumb(k),Ge.len[k],Ge.r[k]));return y};o.thumb.bend[M]=Hs(g,0,Math.min(i[M],d[M]+.4),a)}d.some((M,g)=>Math.abs(M-o.thumb.bend[g])>.001)&&(c.changed++,c.fingers.push({finger:4,from:d,to:[...o.thumb.bend]}))}return{pose:o,report:c}}function Jr(n,e,t={}){let r=Kr(e);if(!r)return{grips:n,reports:{}};let a={},s=(o,c,b,l)=>{if(!c)return c;let u=nc(c,r,b,{...t,lockIndex:l});return a[o]=u.report,u.pose},i={...n,right:s("right",n.right,1,!1),left:s("left",n.left,-1,!1),leftOnMagazine:s("leftOnMagazine",n.leftOnMagazine,-1,!1)};if(n.indexPressed){let o=s("indexPressed",{...i.right,fingers:[n.indexPressed,i.right.fingers[1],i.right.fingers[2],i.right.fingers[3]]},1,!1);i.indexPressed=o.fingers[0]}for(let o of Object.keys(n)){if(o==="right"||o==="left"||o==="leftOnMagazine"||o==="indexPressed")continue;let c=n[o];c&&typeof c=="object"&&"fingers"in c&&(i[o]=s(o,c,-1,!1))}return{grips:i,reports:a}}function Ws(n,e,t=.1){let r=Kr(n);return r?ha(r,h.create(e[0],e[1],e[2]),t):t}function qs(n,e,t){let r=Kr(e);if(!r)return null;let a=ir(n),s=Ft(n.fingers,n.thumb,t),i={},o=h.create(),c=h.create(),b=(d,v,p,M)=>{let g=s[v],w=h.transformQuat(h.create(),[0,0,-1],g.q),x=[];for(let y=0;y<=5;y++)h.scaleAndAdd(o,g.p,w,p*(y+.5)/6),h.transformMat4(c,o,a),x.push(Math.round((ha(r,c,.06)-M)*1e4)/10);i[d]=x};We.forEach((d,v)=>{for(let p=0;p<3;p++)b(`f${v}${p}`,ie.finger(v,p),d.len[p],d.r[p])});for(let d=0;d<3;d++)b(`t${d}`,ie.thumb(d),Ge.len[d],Ge.r[d]);let l=[];for(let d=0;d<=3;d++)for(let v=-1;v<=1;v++){let p=xe.z0+(xe.z1-xe.z0)*(d/3),M=xe.t0+(xe.t1-xe.t0)*(d/3),g=(xe.w0+(xe.w1-xe.w0)*(d/3))*.8;h.transformMat4(c,[v*g*t,-M,p],a),l.push(Math.round(ha(r,c,.05)*1e4)/10)}i.palm=l;let u=h.transformMat4(h.create(),[0,0,0],a),m=h.transformMat4(h.create(),s[ie.finger(1,0)].p,a);for(let d=0;d<3;d++){let v=s[ie.finger(0,d)],p=h.transformQuat(h.create(),[0,0,-1],v.q),M=[];for(let g=0;g<=2;g++)h.scaleAndAdd(o,v.p,p,We[0].len[d]*(.3+.7*(g/2))),h.transformMat4(c,o,a),M.push(...Array.from(c).map(w=>Math.round(w*1e4)/1e4));i[`f0${d}_pos`]=M}return i.wristW=Array.from(u).map(d=>Math.round(d*1e4)/1e4),i.middleKnuckleW=Array.from(m).map(d=>Math.round(d*1e4)/1e4),i}var _s=["Index","Middle","Ring","Pinky"],Ks=n=>n.replace(/^.*[:|]/,"").replace(/^mixamorig\d*_?/i,""),or=class n{objects=[];asset;inst;skin;restLocal;restWorld;parent;order;sides;keepSet;jointData;rigScale=1;visible=!0;opts;constructor(e,t,r={}){this.inst=t,this.asset=t.asset,this.opts={shoulderRight:r.shoulderRight??[.19,-.3,.1],shoulderLeft:r.shoulderLeft??[-.19,-.3,.1],keep:r.keep??[],viewmodel:r.viewmodel??!0};let a=this.asset;if(!a.skins.length)throw new Error("SkinnedArms: the model has no skin");this.skin={joints:a.skins[0].joints,ibm:a.skins[0].inverseBindMatrices},this.parent=a.nodes.map(l=>l.parent),this.restLocal=a.nodes.map(l=>({t:h.create(...l.translation),r:K.fromValues(...l.rotation),s:h.create(...l.scale)})),this.restWorld=Fr(a),this.order=[];let s=l=>{this.order.push(l);for(let u of a.nodes[l].children)s(u)};a.nodes.forEach((l,u)=>{l.parent<0&&s(u)});let i=l=>a.nodes.findIndex(u=>Ks(u.name)===l),o=l=>{let u=i(l);if(u<0)throw new Error(`SkinnedArms: bone "${l}" not found (Mixamo naming expected)`);return u},c=l=>h.create(this.restWorld[l][12],this.restWorld[l][13],this.restWorld[l][14]);this.sides=["Right","Left"].map((l,u)=>{let m=u===0?1:-1,d=o(`${l}Arm`),v=o(`${l}ForeArm`),p=o(`${l}Hand`),M=_s.map(T=>[1,2,3].map(R=>i(`${l}Hand${T}${R}`))),g=[1,2,3].map(T=>i(`${l}HandThumb${T}`)),w=c(p),x=M[1][0]>=0?c(M[1][0]):h.add(h.create(),w,h.sub(h.create(),w,c(v))),y=h.normalize(h.create(),h.sub(h.create(),x,w)),k=M[0][0]>=0&&M[3][0]>=0?h.normalize(h.create(),h.sub(h.create(),c(M[0][0]),c(M[3][0]))):h.create(0,0,1),f=h.normalize(h.create(),h.cross(h.create(),k,y));g[0]>=0&&h.dot(h.sub(h.create(),c(g[0]),w),f)>0&&h.scale(f,f,-1);let A={s:m,shoulder:i(`${l}Shoulder`),arm:d,fore:v,hand:p,fingers:M,thumb:g,armLen:h.distance(c(d),c(v)),foreLen:h.distance(c(v),w),restFinger:y,restDorsal:f,restHandQ:O.getRotation(K.create(),this.restWorld[p]),flexLocal:new Map},S=h.scale(h.create(),f,-1),P=h.normalize(h.create(),h.cross(h.create(),y,S));for(let T of[...M.flat(),g[1],g[2]]){if(T<0)continue;let R=O.getRotation(K.create(),this.restWorld[T]),L=K.invert(K.create(),R);A.flexLocal.set(T,h.normalize(h.create(),h.transformQuat(h.create(),P,L)))}return A}),this.rigScale=Math.hypot(this.restWorld[this.sides[0].arm][0],this.restWorld[this.sides[0].arm][1],this.restWorld[this.sides[0].arm][2]),this.keepSet=new Set;let b=/^(Right|Left)(Shoulder|Arm|ForeArm|Hand.*)$/;a.nodes.forEach((l,u)=>{let m=Ks(l.name);(b.test(m)||this.opts.keep.includes(m))&&this.keepSet.add(u)}),this.jointData=new Float32Array(this.skin.joints.length*16);for(let l of t.drawables){if(!l.skinned)continue;let u=new Me(l.mesh,l.material);u.viewmodel=this.opts.viewmodel,u.castShadow=!this.opts.viewmodel,u.joints=this.jointData,this.objects.push(u)}}static async fromAsset(e,t,r={}){return new n(e,Bt(e,t),r)}addTo(e){for(let t of this.objects)e.add(t);return this}setVisible(e){this.visible=e;for(let t of this.objects)t.visible=e}update(e,t,r,a={}){if(!this.visible||!r)return;let s=this.asset.nodes.length,i=this.restLocal.map(L=>({t:h.clone(L.t),r:K.copy(K.create(),L.r),s:h.clone(L.s)})),o=h.transformQuat(h.create(),[0,0,-1],r.rotation),c=Math.atan2(-o[0],-o[2]),b=K.fromEuler(K.create(),0,c,0),l=this.restWorld[this.sides[0].arm],u=this.restWorld[this.sides[1].arm],m=h.create((l[12]+u[12])/2,(l[13]+u[13])/2,(l[14]+u[14])/2),d=h.create((this.opts.shoulderRight[0]+this.opts.shoulderLeft[0])/2,(this.opts.shoulderRight[1]+this.opts.shoulderLeft[1])/2,(this.opts.shoulderRight[2]+this.opts.shoulderLeft[2])/2),v=h.add(h.create(),h.create(r.position[0],r.position[1],r.position[2]),h.transformQuat(h.create(),d,r.rotation)),p=K.multiply(K.create(),b,K.fromEuler(K.create(),0,Math.PI,0)),M=O.fromRotationTranslation(O.create(),p,v);O.translate(M,M,[-m[0],-m[1],-m[2]]);let g=new Array(s),w=new Array(s),x=(L=0)=>{for(let z=L;z<this.order.length;z++){let j=this.order[z],I=O.fromRotationTranslationScale(O.create(),i[j].r,i[j].t,i[j].s),F=this.parent[j];g[j]=F>=0?O.multiply(O.create(),g[F],I):O.multiply(O.create(),M,I),w[j]=O.getRotation(K.create(),g[j])}};x();let y=L=>h.create(g[L][12],g[L][13],g[L][14]),k=(L,z)=>{let j=this.parent[L],I=j>=0?w[j]:O.getRotation(K.create(),M);K.multiply(i[L].r,K.invert(K.create(),I),z)},f=(L,z,j)=>{let I=h.normalize(h.create(),h.sub(h.create(),y(z),y(L))),F=h.normalize(h.create(),h.sub(h.create(),j,y(L))),N=K.rotationTo(K.create(),I,F);k(L,K.multiply(K.create(),N,w[L]))},A=t.right,S=t.indexPressed&&(a.trigger??0)>0?sc(A.fingers[0],t.indexPressed,a.trigger??0):A.fingers[0],P=t.left??null;a.leftOverride&&P?P=_r(P,a.leftOverride,a.leftWeight??1):a.leftOverride&&(P=a.leftOverride);let T=[{...A,fingers:[S,A.fingers[1],A.fingers[2],A.fingers[3]]},P];this.sides.forEach((L,z)=>{let j=T[z];if(!j)return;let I=K.multiply(K.create(),O.getRotation(K.create(),e),Je(j.fingerDir,j.dorsal)),F=h.transformMat4(h.create(),j.position,e),N=y(L.arm),G=L.armLen*this.rigScaleAt(L.arm,g),H=L.foreLen*this.rigScaleAt(L.arm,g),_=(G+H)*.995,V=h.distance(N,F),U=V>_?h.scaleAndAdd(h.create(),F,h.normalize(h.create(),h.sub(h.create(),N,F)),_):N;if(L.shoulder>=0&&V>_){let E=this.parent[L.shoulder],J=E>=0?Math.hypot(g[E][0],g[E][1],g[E][2]):1,Y=h.transformQuat(h.create(),h.sub(h.create(),U,N),K.invert(K.create(),w[E]));i[L.shoulder].t=h.scaleAndAdd(i[L.shoulder].t,i[L.shoulder].t,Y,1/Math.max(J,1e-9)),x()}let q=h.transformQuat(h.create(),[L.s*.7,-1,.15],r.rotation),C=ic(y(L.arm),F,G,H,q);f(L.arm,L.fore,C),x(),f(L.fore,L.hand,F),x();let X=Je(L.restFinger,L.restDorsal),te=K.multiply(K.create(),O.getRotation(K.create(),M),X),W=K.multiply(K.create(),O.getRotation(K.create(),M),L.restHandQ),Q=K.multiply(K.create(),I,K.invert(K.create(),te));k(L.hand,K.multiply(K.create(),Q,W)),_s.forEach((E,J)=>{let Y=j.fingers[J];L.fingers[J].forEach((D,ee)=>{if(D<0)return;let re=L.flexLocal.get(D);re&&(i[D].r=K.multiply(K.create(),this.restLocal[D].r,K.setAxisAngle(K.create(),re,Y.curl[ee])))})});for(let E=1;E<3;E++){let J=L.thumb[E],Y=J>=0?L.flexLocal.get(J):void 0;Y&&(i[J].r=K.multiply(K.create(),this.restLocal[J].r,K.setAxisAngle(K.create(),Y,j.thumb.bend[E-1]*.8)))}x()});let R=O.fromRotationTranslationScale(O.create(),K.create(),h.scaleAndAdd(h.create(),v,o,-.25),[1e-4,1e-4,1e-4]);this.skin.joints.forEach((L,z)=>{let j=this.skin.ibm.subarray(z*16,z*16+16),I=this.keepSet.has(L)?O.multiply(O.create(),g[L],j):R;this.jointData.set(I,z*16)})}rigScaleAt(e,t){let r=t[e];return Math.hypot(r[0],r[1],r[2])/Math.max(this.rigScale,1e-9)*this.rigScale/Math.max(Math.hypot(this.restWorld[e][0],this.restWorld[e][1],this.restWorld[e][2]),1e-9)}};function sc(n,e,t){return{curl:[n.curl[0]+(e.curl[0]-n.curl[0])*t,n.curl[1]+(e.curl[1]-n.curl[1])*t,n.curl[2]+(e.curl[2]-n.curl[2])*t],spread:n.spread}}function ic(n,e,t,r,a){let s=h.sub(h.create(),e,n),i=h.length(s),o=h.scale(h.create(),s,1/Math.max(i,1e-6));i=Math.min(i,(t+r)*.9995);let c=(t*t-r*r+i*i)/(2*i),b=Math.sqrt(Math.max(0,t*t-c*c)),l=h.scaleAndAdd(h.create(),a,o,-h.dot(a,o));h.normalize(l,l);let u=h.scaleAndAdd(h.create(),n,o,c);return h.scaleAndAdd(u,u,l,b)}var oc=(function(){var n="b9H79Tebbbe;veC9Geueu9Geub9Gbb9Gsuuuuuuuuuuuu99uueu9Gvuuuuub9Gruuuuuuub9Gouuuuuue999Gvuuuuueu9Gzuuuuuuuuuuu99uuuub9Gquuuuuuu99uueu9GPuuuuuuuuuuu99uueu9Gquuuuuuuu99ueu9Gruuuuuu99eu9Gwuuuuuu99ueu9Giuuue999GDuuuuuuuuueu9Gkuuuuuuuu99uub9Gluuuueu9Gluuuub9Giuuueui3EdilvorlwDiqkrxmPszdHObAAbeAlve9Weiiviebeoweuecj:Gdkr:Sdmo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bbz9TW79O9V9Wt9F79P9T9W29P9M95bw8E9TW79O9V9Wt9F79P9T9W29P9M959x9Pt9OcttV9P9I91tW7bD8A9TW79O9V9Wt9F79P9T9W29P9M959x9Pt9O9v9W9K9HtWbqQ9TW79O9V9Wt9F79P9T9W29P9M959t29V9W9W95bkX9TW79O9V9Wt9F79P9T9W29P9M959qV919UWbmQ9TW79O9V9Wt9F79P9T9W29P9M959q9V9P9Ut7bPX9TW79O9V9Wt9F79P9T9W29P9M959t9J9H2WbsP9TW79O9V9Wt9FVW9TW79Obza9TW79O9V9Wt9F9V9Wt9P9T9P96W9wWVtW94SWt9J9O9sW9T9H9WbA59TW79O9V9Wt9F9NW9UWV9HtW9q9V79Pt9P9V9U9sW9T9H9WbCl79IV9RbXDwebcekdKYq:p:1dElbzOk:Q:tekYue99iuQ99eui99Due99xue9:w998Jjjjjbcj;sb9Rgs8Kjjjjbcbhzasc:Cefcbc;Kbz:xjjjb8AdnabaeSmbabaeadcdtz:wjjjb8AkdnamcdGTmbalcrfci4cbyd;y:L:cjbHjjjjbbhHasc:Cefasyd;8egecdtfaHBdbasaecefBd;8ecbhlcbhednadTmbabheadhOinaHaeydbci4fcb86bbaeclfheaOcufgOmbkcbhlabheadhOinaHaeydbgAci4fgCaCRbbgCceaAcrGgAtV86bbaCcu7aA4ceGalfhlaeclfheaOcufgOmbkcualcdtalcFFFFi0Ehekaecbyd;y:L:cjbHjjjjbbhzasc:Cefasyd;8egecdtfazBdbasaecefBd;8ealcd4alfhOcehHinaHgecethHaeaO6mbkcbhXcuaecdtgOaecFFFFi0Ecbyd;y:L:cjbHjjjjbbhHasc:Cefasyd;8egAcdtfaHBdbasaAcefBd;8eaHcFeaOz:xjjjbhQdnadTmbaecufhLcbhKindndnaQabaKcdtfgYydbgAc:v;t;h;Ev2aLGgOcdtfgCydbgHcuSmbceheinazaHcdtfydbaASmdaOaefhHaecefheaQaHaLGgOcdtfgCydbgHcu9hmbkkazaXcdtfaABdbaCaXBdbaXhHaXcefhXkaYaHBdbaKcefgKad9hmbkkaQcbyd;C:L:cjbH:bjjjbbasasyd;8ecufBd;8ekcbh8AcualcefgecdtaecFFFFi0Ecbyd;y:L:cjbHjjjjbbhKasc:Cefasyd;8egecdtfaKBdbasaKBdNeasaecefBd;8ecuadcitadcFFFFe0Ecbyd;y:L:cjbHjjjjbbhEasc:Cefasyd;8egecdtfaEBdbasaEBd:yeasaecefBd;8eascNefabadalcbz:cjjjbcualcdtgealcFFFFi0Eg3cbyd;y:L:cjbHjjjjbbhHasc:Cefasyd;8egOcdtfaHBdbasaOcefBd;8ea3cbyd;y:L:cjbHjjjjbbhXasc:Cefasyd;8egOcdtfaXBdbasaOcefBd;8eaHaXaialavazasc:Cefz:djjjbalcbyd;y:L:cjbHjjjjbbh5asc:Cefasyd;8egOcdtfa5BdbasaOcefBd;8ea3cbyd;y:L:cjbHjjjjbbhOasc:Cefasyd;8egAcdtfaOBdbasaAcefBd;8ea3cbyd;y:L:cjbHjjjjbbhAasc:Cefasyd;8egCcdtfaABdbasaCcefBd;8eaOcFeaez:xjjjbh8EaAcFeaez:xjjjbh8FdnalTmbindnaKa8AgAcefg8AcdtfydbgCaKaAcdtgefydbgOSmbaCaO9RhYaEaOcitfhaa8Faefhha8EaefhLcbhCindndnaaaCcitfydbgQaA9hmbaLaABdbahaABdbxekdnaKaQcdtggfgeclfydbgOaeydbgeSmbaOae9RhOaEaecitfheinaeydbaASmdaecwfheaOcufgOmbkka8FagfgeaAaQaeydbcuSEBdbaLaQaAaLydbcuSEBdbkaCcefgCaY9hmbkka8Aal9hmbkaHhOaXhAa8EhQa8FhCcbheindndnaeaOydbgL9hmbdnaeaAydbgL9hmbaQydbhLdnaCydbgYcu9hmbaLcu9hmba5aefcb86bbxikdnaYcuSmbaLcuSmbaeaYSmbaHaYcdtfydbaHaLcdtfydb9hmba5aefcd86bbxika5aefhadnaeaYSmbaeaLSmbaace86bbxikaacv86bbxdkdnaeaXaLcdtgYfydb9hmbdnaCydbgacuSmbaeaaSmbaQydbggcuSmbaeagSmba8FaYfydbghcuSmbahaLSmba8EaYfydbgYcuSmbaYaLSmbaHaacdtfydbgLaHaYcdtfydb9hmbaLaHagcdtfydbgYSmbaYaHahcdtfydb9hmba5aefcd86bbxika5aefcv86bbxdka5aefcv86bbxeka5aefa5aLfRbb86bbkaOclfhOaAclfhAaQclfhQaCclfhCalaecefge9hmbkdnamcaGTmbcbh8Jindndna5a8Jfg8KRbbg8Lc9:fPlbeebekdndndnaHa8Jcdtfydbgea8J9hmbcbhYcbh8MaqTmednazTmbcbh8Ma8JheinaqazaecdtgefydbfRbbce4a8MVceGh8MaXaefydbgea8J9hmbxikkcbh8Ma8JheinaqaefRbbce4a8MVceGh8MaXaecdtfydbgea8J9hmbxdkka5aefRbbhexeka8JheindnaKaecdtg8AfgeclfydbgOaeydbgeSmbaOae9RhgaEaecitfhhaHa8AfhacbhLinahaLcitfydbgQhednindnaKaecdtgCfgeclfydbgOaeydbgeSmbaOae9RhOaEaecitfheaaydbhAdninaHaeydbcdtfydbaASmeaecwfheaOcufgOTmdxbkkcbhexdkaXaCfydbgeaQ9hmbkcehekaYaeVhYaLcefgLag9hmbkkaXa8Afydbgea8J9hmbka8LclciaYceGEa8MEheka8Kae86bbka8Jcefg8Jal9hmbkkdnaqTmbdndnazTmbazheaHhOalhAindnaqaeydbfRbbceGTmba5aOydbfcv86bbkaeclfheaOclfhOaAcufgAmbxdkkaqheaHhOalhAindnaeRbbceGTmba5aOydbfcv86bbkaecefheaOclfhOaAcufgAmbkkaHhealhAa5hOindna5aeydbfRbbcv9hmbaOcv86bbkaeclfheaOcefhOaAcufgAmbkkamceGTmba5healhOindndnaeRbbcufPlbeebekaecv86bbkaecefheaOcufgOmbkkcbh8Ncualcx2alc;v:Q;v:Qe0Ecbyd;y:L:cjbHjjjjbbh8Kasc:Cefasyd;8egecdtfa8KBdbasaecefBd;8eascbBd:qeas9cb83i1ea8Kaialavazasc1efz:ejjjbhydndnaDmbcbh8PcbhaxekcbhaawhecbhOindnaeIdbJbbbb9ETmbasaacdtfaOBdbaacefhakaeclfheaDaOcefgO9hmbkcuaaal2gecdtaecFFFFi0Ecbyd;y:L:cjbHjjjjbbh8Pasc:Cefasyd;8egecdtfa8PBdbasaecefBd;8ealTmbdnaambcbhaxekarcd4hgdnazTmbaacdthhcbhLa8PhYinaoazaLcdtfydbag2cdtfhQasheaYhOaahAinaOaQaeydbcdtgCfIdbawaCfIdbNUdbaeclfheaOclfhOaAcufgAmbkaYahfhYaLcefgLal9hmbxdkkaacdthhcbhLa8PhYinaoaLag2cdtfhQasheaYhOaahAinaOaQaeydbcdtgCfIdbawaCfIdbNUdbaeclfheaOclfhOaAcufgAmbkaYahfhYaLcefgLal9hmbkkcualc8S2gOalc;D;O;f8U0EgCcbyd;y:L:cjbHjjjjbbheasc:Cefasyd;8egAcdtfaeBdbasaAcefBd;8eaecbaOz:xjjjbhIcbh8RcbhgdnaaTmbcbh8NaCcbyd;y:L:cjbHjjjjbbhgasc:Cefasyd;8egecdtfagBdbasaecefBd;8eagcbaOz:xjjjb8Acuaaal2gecltgOaecFFFFb0Ecbyd;y:L:cjbHjjjjbbh8Rasc:Cefasyd;8egecdtfa8RBdbasaecefBd;8ea8RcbaOz:xjjjb8AamcjjjjdGTmbcualcltgealcFFFFb0Ecbyd;y:L:cjbHjjjjbbh8Nasc:Cefasyd;8egOcdtfa8NBdbasaOcefBd;8ea8Ncbaez:xjjjb8AkdnadTmbcbhQabhOina8KaOclfydbgLcx2fgeIdba8KaOydbgYcx2fgAIdbg8S:tgRa8KaOcwfydbghcx2fgCIdlaAIdlg8U:tg8VNaeIdla8U:tg8WaCIdba8S:tg8XN:tg8Ya8YNa8WaCIdwaAIdwg8Z:tg80NaeIdwa8Z:tg8Wa8VN:tg81a81Na8Wa8XNaRa80N:tg80a80NMMg8V:rhBa8Yh8Xa80h8Wa81hRdna8VJbbbb9EgATmba8YaB:vh8Xa80aB:vh8Wa81aB:vhRkaIaHaYcdtfydbgCc8S2fgeaRaB:rg8VaRNNg83aeIdbMUdbaea8Wa8Va8WNgUNg85aeIdlMUdlaea8Xa8Va8XNg86Ng87aeIdwMUdwaeaRaUNgUaeIdxMUdxaea86aRNg88aeIdzMUdzaea8Wa86Ng89aeIdCMUdCaeaRa8Va8Xa8ZNaRa8SNa8Ua8WNMM:mg8:Ng86NgRaeIdKMUdKaea8Wa86Ng8WaeId3MUd3aea8Xa86Ng8XaeIdaMUdaaea86a8:Ng86aeId8KMUd8Kaea8VaeIdyMUdyaIaHaLcdtfydbgLc8S2fgea83aeIdbMUdbaea85aeIdlMUdlaea87aeIdwMUdwaeaUaeIdxMUdxaea88aeIdzMUdzaea89aeIdCMUdCaeaRaeIdKMUdKaea8WaeId3MUd3aea8XaeIdaMUdaaea86aeId8KMUd8Kaea8VaeIdyMUdyaIaHahcdtfydbgYc8S2fgea83aeIdbMUdbaea85aeIdlMUdlaea87aeIdwMUdwaeaUaeIdxMUdxaea88aeIdzMUdzaea89aeIdCMUdCaeaRaeIdKMUdKaea8WaeId3MUd3aea8XaeIdaMUdaaea86aeId8KMUd8Kaea8VaeIdyMUdydna8NTmbdnaATmba8YaB:vh8Ya80aB:vh80a81aB:vh81ka8NaCcltfgeaBJbbbZNgRa80Ng8VaeIdlMUdlaeaRa8YNg8WaeIdwMUdwaeaRa81Ng8XaeIdbMUdbaeaRa8S:ma81Na8Ua80N:ta8Za8YN:tNgRaeIdxMUdxa8NaLcltfgea8VaeIdlMUdlaea8WaeIdwMUdwaea8XaeIdbMUdbaeaRaeIdxMUdxa8NaYcltfgea8VaeIdlMUdlaea8WaeIdwMUdwaea8XaeIdbMUdbaeaRaeIdxMUdxkaOcxfhOaQcifgQad6mbkkdnalTmbJq;x8J88J;n;m;m89J:v:;;w8ZamczGEamc;abGEh80cbhOaHhCazhQaIhea8KhAindnaOaCydb9hmbaOhLdnazTmbaQydbhLka80hRdnaqTmbJbbjZa80aqaLfRbbclGEhRkaecxfgLaLIdbJbbbbMUdbaeczfgLaLIdbJbbbbMUdbaecCfgLaLIdbJbbbbMUdbaeaRaecyfgLIdbg8YNgRaeIdbMUdbaeclfgYaRaYIdbMUdbaecwfgYaRaYIdbMUdbaecKfgYaYIdbaAIdbg8WaRN:tUdbaAcwfIdbh8Vaec3fgYaYIdbaRaAclfIdbg8XN:tUdbaecafgYaYIdbaRa8VN:tUdbaec8KfgYIdbh81aLa8YaRMUdbaYa81aRa8Va8VNa8Wa8WNa8Xa8XNMMNMUdbkaCclfhCaQclfhQaec8SfheaAcxfhAalaOcefgO9hmbkkdnadTmbcbh8AabhLinaba8AcdtfhYcbheindna5aLaefydbgCfRbbgOTmba5aYaec:G:G:cjbfydbcdtfydbgQfRbbcFeGgATmbdnaOclSghmbaOci6mbaAclSmbaAcd0mekdnaOcd0mba8EaCcdtfydbaQ9hmekdnaAcd0mba8FaQcdtfydbaC9hmekdndnahmbaAcl9hmekaOciSmeaAciSmekJbbbZJbbbZJbbacaAcdSEaOcdSEhUdna8KaYaec:K:G:cjbfydbcdtfydbcx2fgOIdwa8KaCcx2fgAIdwg86:tg8Sa8KaQcx2fghIdwa86:tg8Xa8XNahIdbaAIdbg8U:tg80a80NahIdlaAIdlg8Z:tg8Va8VNMMg81Na8Xa8Sa8XNaOIdba8U:tg83a80Na8VaOIdla8Z:tg85NMMg8WN:tg8Ya8YNa83a81Na80a8WN:tgRaRNa85a81Na8Va8WN:tg8Wa8WNMMgBJbbbb9ETmba8YaB:rgB:vh8Ya8WaB:vh8WaRaB:vhRkaUa81:rNgBa8Ya86NaRa8UNa8Za8WNMM:mg81Ng87a81Nh88a80a85Na8Va83N:tg81a81Na8Va8SNa8Xa85N:tg8Va8VNa8Xa83Na80a8SN:tg8Xa8XNMMg83:rh80a8Ya87Nh85a8Wa87Nh89aRa87Nh87a8WaBa8YNg8SNh8:a8SaRNhZaRaBa8WNgnNhca8Ya8SNh8Ya8WanNh8WaRaBaRNNh8Sdna83Jbbbb9ETmba81a80:vh81a8Xa80:vh8Xa8Va80:vh8VkaIaHaCcdtfydbc8S2fgOaOIdba8Sa8VaUa80:rNgRa8VNNMg80MUdbaOa8Wa8XaRa8XNg8SNMg83aOIdlMUdlaOa8Ya81aRa81Ng8WNMg8YaOIdwMUdwaOaca8Va8SNMg8SaOIdxMUdxaOaZa8Wa8VNMgUaOIdzMUdzaOa8:a8Xa8WNMg8WaOIdCMUdCaOa87a8VaRa81a86Na8Va8UNa8Za8XNMMg86:mNgRNMg8VaOIdKMUdKaOa89a8XaRNMg8XaOId3MUd3aOa85a81aRNMg81aOIdaMUdaaOa88a86aRN:tgRaOId8KMUd8KaOaBaOIdyMUdyaIaHaQcdtfydbc8S2fgOa80aOIdbMUdbaOa83aOIdlMUdlaOa8YaOIdwMUdwaOa8SaOIdxMUdxaOaUaOIdzMUdzaOa8WaOIdCMUdCaOa8VaOIdKMUdKaOa8XaOId3MUd3aOa81aOIdaMUdaaOaRaOId8KMUd8KaOaBaOIdyMUdykaeclfgecx9hmbkaLcxfhLa8Acifg8Aad6mbkkdnamcjeGTmbalTmbcbh9cindnaKa9cgecdtgOfydbghaKaecefg9ccdtfydbg8M9pmba8Kaecx2fhDaIaHaOfydbgCc8S2fh8AindnaHaEahcitfgeydbgLcdtfydbg8JaC0mbaeydlh8LcuhAaLheindnaKaecdtgYfgeclfydbgOaeydbgeSmbaOae9RhOaEaecitfheindnaHaeydbcdtfydbaC9hmbaAcu9hhQaLhAaQmbaeclfydbhAkaecwfheaOcufgOmbkkaXaYfydbgeaL9hmbkaAaLSmbaAcuSmba8KaLcx2fgeIdbaDIdbg81:tgRa8Ka8Lcx2fgOIdlaDIdlg80:tg8XNaeIdla80:tg8VaOIdba81:tg8YN:tg86a8KaAcx2fgAIdba81:tg8Za8VNaAIdla80:tg83aRN:tg8SNa8VaOIdwaDIdwgB:tg8UNaeIdwaB:tg8Wa8XN:tg85a83a8WNaAIdwaB:tg87a8VN:tgUNa8Wa8YNaRa8UN:tg88a87aRNa8Za8WN:tg89NMMa86a86Na85a85Na88a88NMM:rJ:A:z9z:;Na8Sa8SNaUaUNa89a89NMM:rN9Gmbdna8Ua8Wa8WNaRaRNa8Va8VNMMg8SNa8Wa8Ua8WNa8YaRNa8Va8XNMMg86N:tg8Ua8UNa8Ya8SNaRa86N:tg8Ya8YNa8Xa8SNa8Va86N:tg86a86NMMg8XJbbbb9ETmba8Ua8X:rg8X:vh8Ua86a8X:vh86a8Ya8X:vh8Yka8S:rg8Xa8UaBNa8Ya81Na80a86NMM:mgUNg85aUNhUa8Ua85Nh88a86a85Nh89a8Ya85Nh8:a86a8Xa8UNg85NhZa85a8YNhna8Ya8Xa86NgcNhJa8Ua85Nh8Ua86acNh86a8Ya8Xa8YNNh85dna87a8SNa8Wa87a8WNa8ZaRNa8Va83NMMg8YN:tg8Wa8WNa8Za8SNaRa8YN:tgRaRNa83a8SNa8Va8YN:tg8Va8VNMMg8YJbbbb9ETmba8Wa8Y:rg8Y:vh8Wa8Va8Y:vh8VaRa8Y:vhRka8Aa8AIdba85aRa8XaRNNMg8SMUdba8Aa86a8Va8Xa8VNg8ZNMg86a8AIdlMUdla8Aa8Ua8Wa8Xa8WNg8YNMg8Ua8AIdwMUdwa8AaJaRa8ZNMg8Za8AIdxMUdxa8Aana8YaRNMg83a8AIdzMUdza8AaZa8Va8YNMg85a8AIdCMUdCa8Aa8:aRa8Xa8WaBNaRa81Na80a8VNMMg81:mNg8YNMgRa8AIdKMUdKa8Aa89a8Va8YNMg8Va8AId3MUd3a8Aa88a8Wa8YNMg8Wa8AIdaMUdaa8AaUa81a8YN:tg8Ya8AId8KMUd8Ka8Aa8Xa8XMg8Xa8AIdyMUdyaIa8Jc8S2fgea8SaeIdbMUdbaea86aeIdlMUdlaea8UaeIdwMUdwaea8ZaeIdxMUdxaea83aeIdzMUdzaea85aeIdCMUdCaeaRaeIdKMUdKaea8VaeId3MUd3aea8WaeIdaMUdaaea8YaeId8KMUd8Kaea8XaeIdyMUdykahcefgha8M9hmbkka9cal9hmbkkdnadTmbaaTmbcbhYinJbbbbh80a8KabaYcdtfgeclfydbgLcx2fgOIdwa8Kaeydbghcx2fgAIdwg8Z:tg8Va8VNaOIdbaAIdbg83:tg8Wa8WNaOIdlaAIdlg85:tg8Xa8XNMMg8Sa8Kaecwfydbg8Acx2fgeIdwa8Z:tg8YNa8Va8YNa8WaeIdba83:tg81Na8XaeIdla85:tgBNMMgRa8VN:tJbbbbJbbjZa8Sa8Ya8YNa81a81NaBaBNMMg8UNaRaRN:tg86:va86Jbbbb9BEg86Nh88a8Ua8VNaRa8YN:ta86Nh89a8SaBNaRa8XN:ta86Nh8:a8Ua8XNaRaBN:ta86NhZa8Sa81NaRa8WN:ta86Nhna8Ua8WNaRa81N:ta86Nhca8WaBNa8Xa81N:tgRaRNa8Xa8YNa8VaBN:tgRaRNa8Va81Na8Wa8YN:tgRaRNMM:rJbbbZNhRa8Pahaa2g8JcdtfhOa8Pa8Aaa2g8McdtfhAa8PaLaa2gDcdtfhCa8Z:mhJa85:mh9ea83:mhTascjdfheaahQJbbbbhBJbbbbh86Jbbbbh8SJbbbbh8UJbbbbh8ZJbbbbh83Jbbbbh85Jbbbbh87JbbbbhUinaecwfaRa89aCIdbaOIdbg8Y:tg8XNa88aAIdba8Y:tg81NMg8VNUdbaeclfaRaZa8XNa8:a81NMg8WNUdbaeaRaca8XNana81NMg8XNUdbaecxfaRaJa8VNa9ea8WNa8YaTa8XNMMMg8YNUdbaRa8Va8WNNa8ZMh8ZaRa8Va8XNNa8UMh8UaRa8Wa8XNNa8SMh8SaRa8Ya8YNNaUMhUaRa8Va8YNNa87Mh87aRa8Wa8YNNa85Mh85aRa8Xa8YNNa83Mh83aRa8Va8VNNa86Mh86aRa8Wa8WNNaBMhBaRa8Xa8XNNa80Mh80aOclfhOaCclfhCaAclfhAaeczfheaQcufgQmbkagahc8S2fgea80aeIdbMUdbaeaBaeIdlMUdlaea86aeIdwMUdwaea8SaeIdxMUdxaea8UaeIdzMUdzaea8ZaeIdCMUdCaea83aeIdKMUdKaea85aeId3MUd3aea87aeIdaMUdaaeaUaeId8KMUd8KaeaRaeIdyMUdyagaLc8S2fgea80aeIdbMUdbaeaBaeIdlMUdlaea86aeIdwMUdwaea8SaeIdxMUdxaea8UaeIdzMUdzaea8ZaeIdCMUdCaea83aeIdKMUdKaea85aeId3MUd3aea87aeIdaMUdaaeaUaeId8KMUd8KaeaRaeIdyMUdyaga8Ac8S2fgea80aeIdbMUdbaeaBaeIdlMUdlaea86aeIdwMUdwaea8SaeIdxMUdxaea8UaeIdzMUdzaea8ZaeIdCMUdCaea83aeIdKMUdKaea85aeId3MUd3aea87aeIdaMUdaaeaUaeId8KMUd8KaeaRaeIdyMUdya8Ra8JcltfhLcbhOaahCinaLaOfgeascjdfaOfgAIdbaeIdbMUdbaeclfgQaAclfIdbaQIdbMUdbaecwfgQaAcwfIdbaQIdbMUdbaecxfgeaAcxfIdbaeIdbMUdbaOczfhOaCcufgCmbka8RaDcltfhLcbhOaahCinaLaOfgeascjdfaOfgAIdbaeIdbMUdbaeclfgQaAclfIdbaQIdbMUdbaecwfgQaAcwfIdbaQIdbMUdbaecxfgeaAcxfIdbaeIdbMUdbaOczfhOaCcufgCmbka8Ra8McltfhLcbhOaahCinaLaOfgeascjdfaOfgAIdbaeIdbMUdbaeclfgQaAclfIdbaQIdbMUdbaecwfgQaAcwfIdbaQIdbMUdbaecxfgeaAcxfIdbaeIdbMUdbaOczfhOaCcufgCmbkaYcifgYad6mbkkcbhAdndnamcwGgSmbJbbbbh86cbh9hcbh9icbh6xekcbh9ha3cbyd;y:L:cjbHjjjjbbh6asc:Cefasyd;8egecdtfa6BdbasaecefBd;8ecua6alabadaHz:fjjjbgCcltaCcjjjjiGEcbyd;y:L:cjbHjjjjbbh9iasc:Cefasyd;8egecdtfa9iBdbasaecefBd;8ea9iaCa6a8Kalz:gjjjbJFFuuh86aCTmba9iheaChOinaeIdbgRa86a86aR9EEh86aeclfheaOcufgOmbkaCh9hkdnalTmbaKclfheaKydbhCa5hOalhQcbhAincbaeydbgLaC9RaORbbcpeGEaAfhAaOcefhOaeclfheaLhCaQcufgQmbkaAce4hAkcuadaA9Rcifg9kcx2a9kc;v:Q;v:Qe0Ecbyd;y:L:cjbHjjjjbbh0asc:Cefasyd;8egecdtfa0BdbasaecefBd;8ecua9kcdta9kcFFFFi0Ecbyd;y:L:cjbHjjjjbbh9masc:Cefasyd;8egecdtfa9mBdbasaecefBd;8ea3cbyd;y:L:cjbHjjjjbbh9nasc:Cefasyd;8egecdtfa9nBdbasaecefBd;8ealcbyd;y:L:cjbHjjjjbbh9oasc:Cefasyd;8egecdtfa9oBdbasaecefBd;8eaxaxNayJbbjZamclGEg9pa9pN:vh87JbbbbhUdnadak9nmbdna9kci6mbamcjdGh9qaaclth9ra0cwfh9sJbbbbh85JbbbbhUinascNefabadalaHz:cjjjbabh8Acbh3cbh9tinaba9tcdtfh8McbheindnaHa8AaefydbgAcdtghfydbgCaHa8Maec:W:G:cjbfydbcdtfydbgOcdtg8JfydbgQSmba5aOfRbbgYco2a5aAfRbbgLfRb;a:G:cjbg8LaLco2aYfgDRb;a:G:cjbg9cVcFeGTmbdnaQaC9nmbaDRb;W:G:cjbcFeGmekdnaLcufcFeGce0mbaYTmba8EahfydbaO9hmekdnaLTmbaYcufcFeGce0mba8Fa8JfydbaA9hmeka0a3cx2fgCaOaAa9ccFeGgQEBdlaCaAaOaQEBdbaCaQa8LGcb9hBdwa3cefh3kaeclfgecx9hmbkdna9tcifg9tad9pmba8Acxfh8Aa3cifa9k9nmekka3TmdcbhDinaIaHa0aDcx2fghydbgLcdtgCfydbg8Jc8S2fgeIdwa8KahydlgYcx2fgOIdwg8WNaeIdzaOIdbg8XNaeIdaMgRaRMMa8WNaeIdlaOIdlg8YNaeIdCa8WNaeId3MgRaRMMa8YNaeIdba8XNaeIdxa8YNaeIdKMgRaRMMa8XNaeId8KMMM:lhRJbbbbJbbjZaeIdyg8V:va8VJbbbb9BEh8Vdndnahydwg8MmbJFFuuhBxekJbbbbJbbjZaIaHaYcdtfydbc8S2fgeIdyg81:va81Jbbbb9BEaeIdwa8KaLcx2fgOIdwg81NaeIdzaOIdbg80NaeIdaMgBaBMMa81NaeIdlaOIdlgBNaeIdCa81NaeId3Mg81a81MMaBNaeIdba80NaeIdxaBNaeIdKMg81a81MMa80NaeId8KMMM:lNhBka8VaRNh80dnaaTmbagaLc8S2fgAIdwa8WNaAIdza8XNaAIdaMgRaRMMa8WNaAIdla8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8PaYaa2gQcdtfhOa8RaLaa2g8AcltfheaAIdyh81aahAinaOIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaOclfhOaeczfheaAcufgAmbkaR:lgRa81aRa819DEaRa9qEh8Sdndna8MmbJbbbbhRxekagaYc8S2fgAIdwa8KaLcx2fgeIdwg8WNaAIdzaeIdbg8XNaAIdaMgRaRMMa8WNaAIdlaeIdlg8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8Pa8AcdtfhOa8RaQcltfheaAIdyh81aahAinaOIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaOclfhOaeczfheaAcufgAmbkaR:lgRa81aRa819DEaRa9qEhRka80a8SMh80aBaRMhBdndndna5aLfRbbc9:fPibeedkdna8Fa8Ea8EaCfydbaYSEaXaCfydbgQcdtfydbgCcu9hmbaXaYcdtfydbhCkagaQc8S2fgAIdwa8KaCcx2fgeIdwg8WNaAIdzaeIdbg8XNaAIdaMgRaRMMa8WNaAIdlaeIdlg8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8PaCaa2g8AcdtfhOa8RaQaa2g8JcltfheaAIdyh81aahAinaOIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaOclfhOaeczfheaAcufgAmbkaR:lgRa81aRa819DEaRa9qEh8Sdndna8MmbJbbbbhRxekagaCc8S2fgAIdwa8KaQcx2fgeIdwg8WNaAIdzaeIdbg8XNaAIdaMgRaRMMa8WNaAIdlaeIdlg8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8Pa8JcdtfhOa8Ra8AcltfheaAIdyh81aahAinaOIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaOclfhOaeczfheaAcufgAmbkaR:lgRa81aRa819DEaRa9qEhRka80a8SMh80aBaRMhBxdkaXaCfydbgCaLSmbaHaYcdtfydbh8Aindndna8EaCcdtgQfydbgecuSmbaHaecdtfydba8ASmekdna8FaQfydbgecuSmbaHaecdtfydba8ASmekaYhekagaCc8S2fgAIdwa8Kaecx2fgOIdwg8WNaAIdzaOIdbg8XNaAIdaMgRaRMMa8WNaAIdlaOIdlg8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8Paeaa2cdtfhOa8RaCaa2cltfheaAIdyh81aahAinaOIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaOclfhOaeczfheaAcufgAmbka80aR:lgRa81aRa819DEaRa9qEMh80aXaQfydbgCaL9hmbkkdna5aYfRbbgeciSmbaecl9hmeka8MTmbaXaYcdtfydbgCaYSmbindndna8EaCcdtgQfydbgecuSmbaHaecdtfydba8JSmekdna8FaQfydbgecuSmbaHaecdtfydba8JSmekaLhekagaCc8S2fgAIdwa8Kaecx2fgOIdwg8WNaAIdzaOIdbg8XNaAIdaMgRaRMMa8WNaAIdlaOIdlg8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8Paeaa2cdtfhOa8RaCaa2cltfheaAIdyh81aahAinaOIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaOclfhOaeczfheaAcufgAmbkaBaR:lgRa81aRa819DEaRa9qEMhBaXaQfydbgCaY9hmbkkahaBa80aBa809DgeEUdwahaLaYaea8Mcb9hGgeEBdlahaYaLaeEBdbaDcefgDa39hmbkascjdfcbcj;qbz:xjjjb8Aa9shea3hOinascjdfaeydbcA4cF8FGgAcFAaAcFA6EcdtfgAaAydbcefBdbaecxfheaOcufgOmbkcbhecbhOinascjdfaefgAydbhCaAaOBdbaCaOfhOaeclfgecj;qb9hmbkcbhea9shOinascjdfaOydbcA4cF8FGgAcFAaAcFA6EcdtfgAaAydbgAcefBdba9maAcdtfaeBdbaOcxfhOa3aecefge9hmbkadak9RgAci9Uh9udnalTmbcbhea9nhOinaOaeBdbaOclfhOalaecefge9hmbkkcbh9va9ocbalz:xjjjbh9caAcO9Uh9wa9uce4h9tcbh8Lcbh8Mdnina0a9ma8Mcdtfydbcx2fg8JIdwgRa879Emea8La9u9pmeJFFuuh8Vdna9ta39pmba0a9ma9tcdtfydbcx2fIdwJbb;aZNh8VkdnaRa8V9ETmbaRaU9ETmba8La9w0mdkdna9caHa8JydlgDcdtg9xfg8AydbgAfg9yRbba9caHa8Jydbghcdtg9zfydbgefg9ARbbVmba5ahfRbbh9BdndnaKaecdtfgOclfydbgCaOydbgOSmbaCaO9RhCa8KaAcx2fhLa8Kaecx2fhYaEaOcitfheindna9naeydbcdtfydbgOaASmba9naeclfydbcdtfydbgQaASmbaOaQSmba8KaQcx2fgQIdba8KaOcx2fgOIdbg8W:tgRaYIdlaOIdlg8X:tg80NaQIdla8X:tg8VaYIdba8W:tgBN:tg8YaRaLIdla8X:tg8SNa8VaLIdba8W:tg8UN:tg8XNa8VaYIdwaOIdwg81:tg8ZNaQIdwa81:tg8Wa80N:tg80a8VaLIdwa81:tg83Na8Wa8SN:tg8VNa8WaBNaRa8ZN:tg81a8Wa8UNaRa83N:tgRNMMa8Ya8YNa80a80Na81a81NMMa8Xa8XNa8Va8VNaRaRNMMN:rJbbj8:N9FmikaecwfheaCcufgCmbkkdndna9Bc99fcFeGce0mba9na9zfaDBdbaXa9zfydbgeahSmeina8AydbhAdndna8EaecdtgOfydbgecuSmbaHaecdtfydbaASmekdna8FaOfydbgecuSmbaHaecdtfydbaASmekaDheka9naOfaeBdbaXaOfydbgeah9hmbxdkkdndna9BcFeGcdSmbaDhexekdna8Fa8Ea8Ea9zfydbaDSEaXa9zfydbghcdtfydbgecu9hmbaXa9xfydbheka9na9zfaDBdbka9nahcdtfaeBdbka9Ace86bba9yce86bba8JIdwgRaUaUaR9DEhUa9vcefh9vcecda9BcFeGceSEa8Lfh8Lxeka9tcefh9tka8Mcefg8Ma39hmbkka9vTmddnalTmbcbhLcbhhindna9nahcdtgefydbgAahSmbaHaAcdtfydbh8AdnahaHaefydb9hg8JmbaIa8Ac8S2fgeaIahc8S2fgOIdbaeIdbMUdbaeaOIdlaeIdlMUdlaeaOIdwaeIdwMUdwaeaOIdxaeIdxMUdxaeaOIdzaeIdzMUdzaeaOIdCaeIdCMUdCaeaOIdKaeIdKMUdKaeaOId3aeId3MUd3aeaOIdaaeIdaMUdaaeaOId8KaeId8KMUd8KaeaOIdyaeIdyMUdya8NTmba8Na8Acltfgea8NahcltfgOIdbaeIdbMUdbaeaOIdlaeIdlMUdlaeaOIdwaeIdwMUdwaeaOIdxaeIdxMUdxkaaTmbagaAc8S2fgeagahc8S2g8MfgOIdbaeIdbMUdbaeaOIdlaeIdlMUdlaeaOIdwaeIdwMUdwaeaOIdxaeIdxMUdxaeaOIdzaeIdzMUdzaeaOIdCaeIdCMUdCaeaOIdKaeIdKMUdKaeaOId3aeId3MUd3aeaOIdaaeIdaMUdaaeaOId8KaeId8KMUd8KaeaOIdyaeIdyMUdya9raA2hYa8RhOaahCinaOaYfgeaOaLfgAIdbaeIdbMUdbaeclfgQaAclfIdbaQIdbMUdbaecwfgQaAcwfIdbaQIdbMUdbaecxfgeaAcxfIdbaeIdbMUdbaOczfhOaCcufgCmbka8JmbJbbbbJbbjZaIa8MfgeIdygR:vaRJbbbb9BEaeIdwa8Ka8Acx2fgOIdwgRNaeIdzaOIdbg8VNaeIdaMg8Wa8WMMaRNaeIdlaOIdlg8WNaeIdCaRNaeId3MgRaRMMa8WNaeIdba8VNaeIdxa8WNaeIdKMgRaRMMa8VNaeId8KMMM:lNgRa85a85aR9DEh85kaLa9rfhLahcefghal9hmbkcbhOa8EheindnaeydbgAcuSmbdnaOa9naAcdtgCfydbgA9hmbcuhAa8EaCfydbgCcuSmba9naCcdtfydbhAkaeaABdbkaeclfhealaOcefgO9hmbkcbhOa8FheindnaeydbgAcuSmbdnaOa9naAcdtgCfydbgA9hmbcuhAa8FaCfydbgCcuSmba9naCcdtfydbhAkaeaABdbkaeclfhealaOcefgO9hmbkka85aUaaEh85cbhOabhecbhAindnaHa9naeydbcdtfydbgLcdtfydbgCaHa9naeclfydbcdtfydbgYcdtfydbgQSmbaCaHa9naecwfydbcdtfydbg8AcdtfydbghSmbaQahSmbabaOcdtfgCaLBdbaCcwfa8ABdbaCclfaYBdbaOcifhOkaecxfheaAcifgAad6mbkdndnaSmbaOhdxekdnaOak0mbaOhdxekdna86a859FmbaOhdxekJFFuuh86cbhdabhecbhAindna9ia6aeydbgCcdtfydbcdtfIdbgRa859ETmbaeclf8Pdbh9CabadcdtfgQaCBdbaQclfa9C83dbaRa86a86aR9EEh86adcifhdkaecxfheaAcifgAaO6mbkkadak0mbxdkkascNefabadalaHz:cjjjbkdndnadak0mbadhYxekdnaSmbadhYxekdna86a879FmbadhYxekcehQina86Jbb;aZNgRa87aRa879DEh8WJbbbbhRdna9hTmba9ihea9hhOinaeIdbg8VaRa8Va8W9FEaRa8VaR9EEhRaeclfheaOcufgOmbkkJFFuuh86cbhYabhecbhOindna9ia6aeydbgAcdtfydbcdtfIdbg8Va8W9ETmbaeclf8Pdbh9CabaYcdtfgCaABdbaCclfa9C83dba8Va86a86a8V9EEh86aYcifhYkaecxfheaOcifgOad6mbkdnaQaYad9hVceGmbadhYxdkaRaUaUaR9DEhUaYak9nmecbhQaYhda86a879FmbkkdnamcjjjjdGTmba9ocbalz:xjjjbh8AdnaYTmbabheaYhOina8AaeydbgAfce86bba8AaHaAcdtfydbfce86bbaeclfheaOcufgOmbkkascNefabaYalaHz:cjjjbdndnalTmbcbhCindna8AaCfRbbTmbdna5aCfRbbPlbeebekdnaHaCcdtgLfydbgeaCSmba8KaCcx2fgOa8Kaecx2fgeydwBdwaOae8Pdb83dbxekaIaCc8S2fgQIdygnanJL:3;rUNgRMh87aQIdwgxaRMh8SaQIdlg9DaRMh8UaQIdbg9EaRMh81aQIdag9FaRa8KaCcx2fg8JIdwg88N:th8ZaQId3g9GaRa8JIdlg89N:th83aQIdKg9Ha8JIdbg8:aRN:th80JbbbbhZaQIdCg9IJbbbbMh85aQIdzg9JJbbbbMhBaQIdxg9KJbbbbMh86dndnaaTmbaChAinJbbbba87agaAc8S2fgOIdygR:vaRJbbbb9BEhRa8RaAaa2cltfheaOIdaa87Na8ZMh8ZaOId3a87Na83Mh83aOIdKa87Na80Mh80aOIdCa87Na85Mh85aOIdza87NaBMhBaOIdxa87Na86Mh86aOIdwa87Na8SMh8SaOIdla87Na8UMh8UaOIdba87Na81Mh81aahOina8ZaecwfIdbg8VaecxfIdbg8YNaRN:th8Za83aeclfIdbg8Wa8YNaRN:th83a85a8Wa8VNaRN:th85a81aeIdbg8Xa8XNaRN:th81a80a8Xa8YNaRN:th80aBa8Xa8VNaRN:thBa86a8Xa8WNaRN:th86a8Sa8Va8VNaRN:th8Sa8Ua8Wa8WNaRN:th8UaeczfheaOcufgOmbkaXaAcdtfydbgAaC9hmbka8NTmba8NaCcltfgeIdxhTaeIdwhcaeIdlhJaeIdbhRxekJbbbbhTJbbbbhcJbbbbhJJbbbbhRkaBa81:vg8Wa80Na8Z:ta85aBa86a81:vg8VN:tg8Za8Ua86a8VN:tg8Y:vg8Xa8Va80Na83:tg8UN:th83acaRa8WN:taJaRa8VN:tg86a8XN:tg85a8SaBa8WN:ta8Za8XN:tgB:vg8S:mh8Za86a8Y:vgc:mhJdnJbbbbaRaRa81:vg9eN:ta86acN:ta85a8SN:tg86:la87J:983:g81NgR9ETmba8Za83NaJa8UNa9ea80NaT:tMMa86:vhZka81:laR9ETmba8Y:laR9ETmbaB:laR9ETmba9e:maZNa8W:ma8ZaZNa83aB:vMgBNa8V:maJaZNa8X:maBNa8Ua8Y:vMMg85Na80:ma81:vMMMh87aKaLfgeclfydbgOaeydbge9RhhaEaecitfhLJbbbbhRdnaOaeSg8MmbJbbbbhRaLheahhAina8Kaeclfydbcx2fgOIdwa88:tg8Va8VNaOIdba8::tg8Va8VNaOIdla89:tg8Va8VNMMg8Va8Kaeydbcx2fgOIdwa88:tg8Wa8WNaOIdba8::tg8Wa8WNaOIdla89:tg8Wa8WNMMg8WaRaRa8W9DEgRaRa8V9DEhRaecwfheaAcufgAmbkaR:rgRaRNhRkaBa88:tg8Va8VNa87a8::tg8Va8VNa85a89:tg8Va8VNMMaR9EmbaQId8KhZdna8Mmbina8KaLclfydbcx2fgeIdba8KaLydbcx2fgOIdbg8W:tgRa89aOIdlg8X:tg80NaeIdla8X:tg8Va8:a8W:tg86N:tg8YaRa85a8X:tg8SNa8Va87a8W:tg8UN:tg8XNa8Va88aOIdwg81:tg8ZNaeIdwa81:tg8Wa80N:tg80a8VaBa81:tg83Na8Wa8SN:tg8VNa8Wa86NaRa8ZN:tg81a8Wa8UNaRa83N:tgRNMMa8Ya8YNa80a80Na81a81NMMa8Xa8XNa8Va8VNaRaRNMMN:rJbbj8:N9FmdaLcwfhLahcufghmbkkJbbbbJbbjZan:vanJbbbb9BEgRaxaBNa9Ja87Na9FMg8Va8VMMaBNa9Da85Na9IaBNa9GMg8Va8VMMa85Na9Ea87Na9Ka85Na9HMg8Va8VMMa87NaZMMM:lNaRaxa88Na9Ja8:Na9FMg8Va8VMMa88Na9Da89Na9Ia88Na9GMg8Va8VMMa89Na9Ea8:Na9Ka89Na9HMg8Va8VMMa8:NaZMMM:lNJbb;aZNJ:983:g81M9Emba8JaBUdwa8Ja85Udla8Ja87UdbkaCcefgCal9hmbkdnaambcbhaxdkcbhQindna8AaQfRbbTmbaHaQcdtgefydbaQ9hmba5aQfhhaXaefh8Ja8KaQcx2fhAa8PaQaa2cdtfh8McbhEincuhCdnahRbbc99fcFeGce0mbaQhCa8JydbgeaQSmba8PaEcdtgOfhLa8MaOfIdbhRaQhCinaChOcuhCdnaLaeaa2cdtfIdbaR9CmbaOcuSmbaOhCagaec8S2fIdyagaOc8S2fIdy9ETmbaehCkaXaecdtfydbgeaQ9hmbkka8PaEcdtfhLa8RaEcltfhKaQheinaLaeaa2cdtfJbbbbJbbjZagaeaCaCcuSEgOc8S2fIdygR:vaRJbbbb9BEaKaOaa2cltfgOIdwaAIdwNaOIdbaAIdbNaOIdlaAIdlNMMaOIdxMNUdbaXaecdtfydbgeaQ9hmbkaEcefgEaa9hmbkkaQcefgQal9hmbxdkkaambcbhakaiavaoarawaaala8Ka8Pazasayasc1efa5a8Aaqz:hjjjbkdnamcjjjjlGTmbazmbaYTmbabhecbhLina5aeydbgAfRbbc3thQaecwfgXydbhHcjjjj94hCdna8EaAcdtgEfydbaeclfgKydbgOSmbcjjjj94cba8FaOcdtfydbaASEhCkaeaQaCVaAVBdba5aOfRbbc3thacjjjj94hCcjjjj94hQdna8EaOcdtfydbaHSmbcjjjj94cba8FaHcdtfydbaOSEhQkaKaaaQVaOVBdba5aHfRbbc3thOdna8EaHcdtfydbaASmbcjjjj94cba8FaEfydbaHSEhCkaXaOaCVaHVBdbaecxfheaLcifgLaY6mbkkdnazTmbaYTmbaYheinabazabydbcdtfydbBdbabclfhbaecufgembkkdnaPTmbaPa9paU:rNUdbkdnasyd;8egHTmbaHcdtasc:Ceffc98fheinaeydbcbyd;C:L:cjbH:bjjjbbaec98fheaHcufgHmbkkascj;sbf8KjjjjbaYk;Yieouabydlhvabydbclfcbaicdtz:xjjjbhoadci9UhrdnadTmbdnalTmbaehwadhDinaoalawydbcdtfydbcdtfgqaqydbcefBdbawclfhwaDcufgDmbxdkkaehwadhDinaoawydbcdtfgqaqydbcefBdbawclfhwaDcufgDmbkkdnaiTmbcbhDaohwinawydbhqawaDBdbawclfhwaqaDfhDaicufgimbkkdnadci6mbinaecwfydbhwaeclfydbhDaeydbhidnalTmbalawcdtfydbhwalaDcdtfydbhDalaicdtfydbhikavaoaicdtfgqydbcitfaDBdbavaqydbcitfawBdlaqaqydbcefBdbavaoaDcdtfgqydbcitfawBdbavaqydbcitfaiBdlaqaqydbcefBdbavaoawcdtfgwydbcitfaiBdbavawydbcitfaDBdlawawydbcefBdbaecxfhearcufgrmbkkabydbcbBdbk:todDue99aicd4aifhrcehwinawgDcethwaDar6mbkcuaDcdtgraDcFFFFi0Ecbyd;y:L:cjbHjjjjbbhwaoaoyd9GgqcefBd9GaoaqcdtfawBdbawcFearz:xjjjbhkdnaiTmbalcd4hlaDcufhxcbhminamhDdnavTmbavamcdtfydbhDkcbadaDal2cdtfgDydlgwawcjjjj94SEgwcH4aw7c:F:b:DD2cbaDydbgwawcjjjj94SEgwcH4aw7c;D;O:B8J27cbaDydwgDaDcjjjj94SEgDcH4aD7c:3F;N8N27axGhwamcdthPdndndnavTmbakawcdtfgrydbgDcuSmeadavaPfydbal2cdtfgsIdbhzcehqinaqhrdnadavaDcdtfydbal2cdtfgqIdbaz9CmbaqIdlasIdl9CmbaqIdwasIdw9BmlkarcefhqakawarfaxGgwcdtfgrydbgDcu9hmbxdkkakawcdtfgrydbgDcuSmbadamal2cdtfgsIdbhzcehqinaqhrdnadaDal2cdtfgqIdbaz9CmbaqIdlasIdl9CmbaqIdwasIdw9BmikarcefhqakawarfaxGgwcdtfgrydbgDcu9hmbkkaramBdbamhDkabaPfaDBdbamcefgmai9hmbkkakcbyd;C:L:cjbH:bjjjbbaoaoyd9GcufBd9GdnaeTmbaiTmbcbhDaehwinawaDBdbawclfhwaiaDcefgD9hmbkcbhDaehwindnaDabydbgrSmbawaearcdtfgrydbBdbaraDBdbkabclfhbawclfhwaiaDcefgD9hmbkkk;:odvuv998Jjjjjbca9Rgocbyd1:G:cjbBdKaocb8Pdj:G:cjb83izaocbydN:G:cjbBdwaocb8Pd:m:G:cjb83ibdnadTmbaicd4hrdnabmbdnalTmbcbhwinaealawcdtfydbar2cdtfhDcbhiinaoczfaifgqaDaifIdbgkaqIdbgxaxak9EEUdbaoaifgqakaqIdbgxaxak9DEUdbaiclfgicx9hmbkawcefgwad9hmbxikkarcdthwcbhDincbhiinaoczfaifgqaeaifIdbgkaqIdbgxaxak9EEUdbaoaifgqakaqIdbgxaxak9DEUdbaiclfgicx9hmbkaeawfheaDcefgDad9hmbxdkkdnalTmbcbhwinabawcx2fgiaealawcdtfydbar2cdtfgDIdbUdbaiaDIdlUdlaiaDIdwUdwcbhiinaoczfaifgqaDaifIdbgkaqIdbgxaxak9EEUdbaoaifgqakaqIdbgxaxak9DEUdbaiclfgicx9hmbkawcefgwad9hmbxdkkarcdthlcbhwaehDinabawcx2fgiaeawar2cdtfgqIdbUdbaiaqIdlUdlaiaqIdwUdwcbhiinaoczfaifgqaDaifIdbgkaqIdbgxaxak9EEUdbaoaifgqakaqIdbgxaxak9DEUdbaiclfgicx9hmbkaDalfhDawcefgwad9hmbkkJbbbbaoIdbaoIdzgx:tgkakJbbbb9DEgkaoIdlaoIdCgm:tgPaPak9DEgkaoIdwaoIdKgP:tgsasak9DEhsdnabTmbadTmbJbbbbJbbjZas:vasJbbbb9BEhkinabakabIdbax:tNUdbabclfgoakaoIdbam:tNUdbabcwfgoakaoIdbaP:tNUdbabcxfhbadcufgdmbkkdnavTmbavaPUdwavamUdlavaxUdbkask:WlewudnaeTmbcbhvabhoinaoavBdbaoclfhoaeavcefgv9hmbkkdnaiTmbcbhrinadarcdtfhwcbhDinalawaDcdtgvyd:G:G:cjbcdtfydbcdtfydbhodnalawavfydbcdtfydbgqabaqcdtfgkydbgvSmbinakabavgqcdtfgxydbgvBdbaxhkaqav9hmbkkdnaoabaocdtfgkydbgvSmbinakabavgocdtfgxydbgvBdbaxhkaoav9hmbkkdnaqaoSmbabaqaoaqao0Ecdtfaqaoaqao6EBdbkaDcefgDci9hmbkarcifgrai6mbkkdnaembcbskcbhxindnalaxcdtgvfydbax9hmbaxhodnaxabavfgDydbgvSmbaDhqinaqabavgocdtfgkydbgvBdbakhqaoav9hmbkkaDaoBdbkaxcefgxae9hmbkcbhkabhvcbhoindndnaoalydbgq9hmbdnaoavydbgq9hmbavakBdbakcefhkxdkavabaqcdtfydbBdbxekavabaqcdtfydbBdbkalclfhlavclfhvaeaocefgo9hmbkakk;jiilud99euabcbaecltz:xjjjbhvdnalTmbadhoaihralhwinarcwfIdbhDarclfIdbhqavaoydbcltfgkarIdbakIdbMUdbakaqakIdlMUdlakaDakIdwMUdwakakIdxJbbjZMUdxaoclfhoarcxfhrawcufgwmbkkdnaeTmbavhkaehrinakcxfgoIdbhDaocbBdbakakIdbJbbbbJbbjZaD:vaDJbbbb9BEgDNUdbakclfgoaDaoIdbNUdbakcwfgoaDaoIdbNUdbakczfhkarcufgrmbkkdnalTmbinavadydbcltfgkaicwfIdbakIdw:tgDaDNaiIdbakIdb:tgDaDNaiclfIdbakIdl:tgDaDNMMgDakIdxgqaqaD9DEUdxadclfhdaicxfhialcufglmbkkdnaeTmbavcxfhkinabakIdbUdbakczfhkabclfhbaecufgembkkk:moerudnaoTmbaecd4hzdnavTmbaicd4hHavcdthOcbhAindnaPaAfRbbTmbaAhednaDTmbaDaAcdtfydbhekdnasTmbasaefRbbceGmekdnamaAfRbbcvSmbabaeaz2cdtfgiaraAcx2fgCIdbakNaxIdbMUdbaiaCIdlakNaxIdlMUdlaiaCIdwakNaxIdwMUdwkadaeaH2cdtfhXaqheawhiavhCinaXaeydbcdtgQfaiIdbalaQfIdb:vUdbaeclfheaiclfhiaCcufgCmbkkawaOfhwaAcefgAao9hmbxdkkdnasmbcbheaDhiindnaPaefRbbTmbaehCdnaDTmbaiydbhCkamaefRbbcvSmbabaCaz2cdtfgCarIdbakNaxIdbMUdbaCarclfIdbakNaxIdlMUdlaCarcwfIdbakNaxIdwMUdwkaiclfhiarcxfhraoaecefge9hmbxdkkdnaDTmbindnaPRbbTmbasaDydbgefRbbceGmbamRbbcvSmbabaeaz2cdtfgearIdbakNaxIdbMUdbaearclfIdbakNaxIdlMUdlaearcwfIdbakNaxIdwMUdwkaPcefhPaDclfhDamcefhmarcxfhraocufgombxdkkazcdthicbheindnaPaefRbbTmbasaefRbbceGmbamaefRbbcvSmbabarIdbakNaxIdbMUdbabclfarclfIdbakNaxIdlMUdbabcwfarcwfIdbakNaxIdwMUdbkarcxfhrabaifhbaoaecefge9hmbkkk8MbabaeadaialavcbcbcbcbcbaoarawaDz:bjjjbk8MbabaeadaialavaoarawaDaqakaxamaPz:bjjjbkRbababaeadaialavaoarawaDaqakaxcjjjjdVamz:bjjjbk:vgoque99due99duq998Jjjjjbc;Wb9Rgq8Kjjjjbcbhkaqcxfcbc;Kbz:xjjjb8Aaqcualcx2alc;v:Q;v:Qe0Ecbyd;y:L:cjbHjjjjbbgxBdxaqceBd2axaialavcbcbz:ejjjb8AaqcualcdtalcFFFFi0Egmcbyd;y:L:cjbHjjjjbbgiBdzaqcdBd2dndnJFF959eJbbjZawJbbjZawJbbjZ9DE:vawJ9VO:d869DEgw:lJbbb9p9DTmbaw:OhPxekcjjjj94hPkadci9Uhsarco9UhzdndnaombaPcd9imekdnalTmbaPcuf:YhwdnaoTmbcbhvaihHaxhOindndnaoavfRbbceGTmbavcjjjjlVhAxekdndnaOclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhAxekcjjjj94hAkaAcqthAdndnaOcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaAaXVhAdndnaOIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaAaXcCtVhAkaHaABdbaHclfhHaOcxfhOalavcefgv9hmbxdkkaxhvaihOalhHindndnavIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhAxekcjjjj94hAkaAcCthAdndnavclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaXcqtaAVhAdndnavcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaOaAaXVBdbavcxfhvaOclfhOaHcufgHmbkkadTmbcbhkaehvcbhOinakaiavclfydbcdtfydbgHaiavcwfydbcdtfydbgA9haiavydbcdtfydbgXaH9haXaA9hGGfhkavcxfhvaOcifgOad6mbkkarci9UhQdndnaz:Z:rJbbbZMgw:lJbbb9p9DTmbaw:Ohvxekcjjjj94hvkaQ:ZhLcbhKc:bwhzdninakaQ9pmeazaP9Rcd9imeavazcufgOavaO9iEaPcefavaP9kEhYdnalTmbaYcuf:YhwdnaoTmbcbhOaihHaxhvindndnaoaOfRbbceGTmbaOcjjjjlVhAxekdndnavclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhAxekcjjjj94hAkaAcqthAdndnavcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaAaXVhAdndnavIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaAaXcCtVhAkaHaABdbaHclfhHavcxfhvalaOcefgO9hmbxdkkaxhvaihOalhHindndnavIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhAxekcjjjj94hAkaAcCthAdndnavclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaXcqtaAVhAdndnavcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaOaAaXVBdbavcxfhvaOclfhOaHcufgHmbkkcbhOdnadTmbaehvcbhHinaOaiavclfydbcdtfydbgAaiavcwfydbcdtfydbgX9haiavydbcdtfydbgraA9haraX9hGGfhOavcxfhvaHcifgHad6mbkkdnas:ZgCaL:taY:Ygwaz:Y:tg8ANak:ZgEaO:Zg3:tNaEaL:tawaP:Y:tg5Na3aC:tNMg8EJbbbb9BmbaCaE:ta5a8Aa3aL:tNNNa8E:vawMhwkdndnaOaQ0mbaOhkaYhPxekaOhsaYhzkdndnaKcl0mbdnawJbbbZMgw:lJbbb9p9DTmbaw:Ohvxdkcjjjj94hvxekaPazfcd9ThvkaKcefgKcs9hmbkkdndndnakmbJbbjZhwcbhOcdhvaDmexdkalcd4alfhHcehOinaOgvcethOavaH6mbkaqcuavcdtavcFFFFi0Ecbyd;y:L:cjbHjjjjbbgYBdCaqciBd2aqamcbyd;y:L:cjbHjjjjbbgzBdKaqclBd2dnalTmbaPcuf:YhwdnaoTmbcbhOaihAaxhHindndnaoaOfRbbceGTmbaOcjjjjlVhXxekdndnaHclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaXcqthXdndnaHcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:Ohrxekcjjjj94hrkaXarVhXdndnaHIdbawNJbbbZMgC:lJbbb9p9DTmbaC:Ohrxekcjjjj94hrkaXarcCtVhXkaAaXBdbaAclfhAaHcxfhHalaOcefgO9hmbxdkkaxhOaihHalhAindndnaOIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaXcCthXdndnaOclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:Ohrxekcjjjj94hrkarcqtaXVhXdndnaOcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:Ohrxekcjjjj94hrkaHaXarVBdbaOcxfhOaHclfhHaAcufgAmbkkaqcuaYavazaialz:mjjjbgXc8S2gvaXc;D;O;f8U0Ecbyd;y:L:cjbHjjjjbbgiBd3aqcvBd2aicbavz:xjjjbhOdnadTmbcbhraehiinaxaiclfydbgocx2fgvIdbaxaiydbgPcx2fgHIdbg3:tgCaxaicwfydbgYcx2fgAIdlaHIdlg8A:tgwNavIdla8A:tgEaAIdba3:tg8EN:tgLaLNaEaAIdwaHIdwg5:tg8FNavIdwa5:tgEawN:tgwawNaEa8ENaCa8FN:tgCaCNMMg8E:rhEJbbnnJbbjZazaPcdtfydbgvazaocdtfydbgASavazaYcdtfydbgoSGgHEh8Fdna8EJbbbb9ETmbaLaE:vhLaCaE:vhCawaE:vhwkaOavc8S2fgvavIdbawa8FaE:rNgEawNNg8FMUdbavaCaEaCNgaNghavIdlMUdlavaLaEaLNg8ENggavIdwMUdwavawaaNgaavIdxMUdxava8EawNg8JavIdzMUdzavaCa8ENg8EavIdCMUdCavawaEaLa5Nawa3Na8AaCNMM:mg8ANg3NgwavIdKMUdKavaCa3NgCavId3MUd3avaLa3NgLavIdaMUdaava3a8ANg3avId8KMUd8KavaEavIdyMUdydnaHmbaOaAc8S2fgva8FavIdbMUdbavahavIdlMUdlavagavIdwMUdwavaaavIdxMUdxava8JavIdzMUdzava8EavIdCMUdCavawavIdKMUdKavaCavId3MUd3avaLavIdaMUdaava3avId8KMUd8KavaEavIdyMUdyaOaoc8S2fgva8FavIdbMUdbavahavIdlMUdlavagavIdwMUdwavaaavIdxMUdxava8JavIdzMUdzava8EavIdCMUdCavawavIdKMUdKavaCavId3MUd3avaLavIdaMUdaava3avId8KMUd8KavaEavIdyMUdykaicxfhiarcifgrad6mbkkcbhAaqcuaXcdtgvaXcFFFFi0Egicbyd;y:L:cjbHjjjjbbgHBdaaqcoBd2aqaicbyd;y:L:cjbHjjjjbbgiBd8KaqcrBd2aHcFeavz:xjjjbhPdnalTmbazhHinJbbbbJbbjZaOaHydbgrc8S2fgvIdygw:vawJbbbb9BEavIdwaxcwfIdbgwNavIdzaxIdbgCNavIdaMgLaLMMawNavIdlaxclfIdbgLNavIdCawNavId3MgwawMMaLNavIdbaCNavIdxaLNavIdKMgwawMMaCNavId8KMMM:lNhwdndnaParcdtgvfgrydbcuSmbaiavfIdbaw9ETmekaraABdbaiavfawUdbkaHclfhHaxcxfhxalaAcefgA9hmbkkdndnaXmbJbbbbhwxekJbbbbhwinaiIdbgCawawaC9DEhwaiclfhiaXcufgXmbkaw:rhwkakcd4akfhOcehiinaigvcethiavaO6mbkcbhOaqcuavcdtgiavcFFFFi0Ecbyd;y:L:cjbHjjjjbbgHBdyaHcFeaiz:xjjjbhXdnadTmbavcufhrcbhkcbhxindnazaeaxcdtfgvydbcdtfydbgiazavclfydbcdtfydbgOSmbaiazavcwfydbcdtfydbgvSmbaOavSmbaPavcdtfydbhAdndnaPaOcdtfydbgvaPaicdtfydbgi9pmbavaA9pmbaAhlaihoavhAxekdnaAai9pmbaAav9pmbaihlavhoxekavhlaAhoaihAkabakcx2fgvaABdbavcwfaoBdbavclfalBdbdnaXaoc:3F;N8N2alc:F:b:DD27aAc;D;O:B8J27arGgOcdtfgvydbgicuSmbcehHinaHhvdnabaicx2fgiydbaA9hmbaiydlal9hmbaiydwaoSmikavcefhHaXaOavfarGgOcdtfgvydbgicu9hmbkkavakBdbakcefhkkaxcifgxad6mbkakci2hOkcwhvaDTmekaDawUdbkavcdthvaqcxfc98fhiinaiavfydbcbyd;C:L:cjbH:bjjjbbavc98fgvmbkaqc;Wbf8KjjjjbaOk:0iewuabcFeaecdtz:xjjjbhbdnalmbcbskaecufhvdndnaiTmbcbhocbhrindndndnabaiarcdtgwfydbgDcm4aD7c:v;t;h;Ev2gecs4ae7avGgqcdtfgkydbgxcuSmbceheinaiaxcdtgxfydbaDSmdaqaefhxaecefheabaxavGgqcdtfgkydbgxcu9hmbkkakarBdbaoheaocefhoxekadaxfydbhekadawfaeBdbarcefgral9hmbxdkkcbhocbhDindnabaDcm4aD7c:v;t;h;Ev2gecs4ae7avGgqcdtfgkydbgxcuSmbaxaDSmbceheinabaqaefavGgqcdtfgkydbgxcuSmeaecefheaxaD9hmbkkdndnaxcu9hmbakaDBdbaoheaocefhoxekadaxcdtfydbhekadaDcdtfaeBdbaDcefgDal9hmbkkaok:3ldrue9:8Jjjjjbc;Wb9Rgr8Kjjjjbcbhwarcxfcbc;Kbz:xjjjb8AdnabaeSmbabaeadcdtz:wjjjb8AkarcualcdtalcFFFFi0EgDcbyd;y:L:cjbHjjjjbbgqBdxarceBd2aqcbaialavcbarcxfz:djjjbcualcx2alc;v:Q;v:Qe0Ecbyd;y:L:cjbHjjjjbbhkarcxfaryd2gxcdtfakBdbaraxcefgmBd2akaialavcbcbz:ejjjb8AarcxfamcdtfaDcbyd;y:L:cjbHjjjjbbgiBdbaraxcdfgvBd2arcxfavcdtfcuaialaeadaqz:fjjjbgecltaecjjjjiGEcbyd;y:L:cjbHjjjjbbgqBdbaqaeaiakalz:gjjjbaxcifhkdnadTmbaoaoNhocbhwabhlcbheindnaqaialydbgvcdtfydbcdtfIdbao9ETmbalclf8PdbhPabawcdtfgDavBdbaDclfaP83dbawcifhwkalcxfhlaecifgead6mbkkdnakTmbaxcdtarcxffcwfhlinalydbcbyd;C:L:cjbH:bjjjbbalc98fhlakcufgkmbkkarc;Wbf8Kjjjjbawk;lOoDud99oue99vuv998Jjjjjbc;Wb9Rgw8KjjjjbdndnarmbcbhDxekawcxfcbc;Kbz:xjjjb8Aawcuadcx2adc;v:Q;v:Qe0Ecbyd;y:L:cjbHjjjjbbgqBdxawceBd2aqaeadaicbcbz:ejjjb8AawcuadcdtadcFFFFi0Egkcbyd;y:L:cjbHjjjjbbgxBdzawcdBd2adcd4adfhecehiinaigmcethiamae6mbkcbhPawcuamcdtgsamcFFFFi0Ecbyd;y:L:cjbHjjjjbbgzBdCawciBd2dndnar:ZgH:rJbbbZMgO:lJbbb9p9DTmbaO:Ohixekcjjjj94hikamcufhAc:bwhCcbhXadhQcbhLinaiaCcufgeaiae9iEaPcefaiaP9kEhDdndnadTmbaDcuf:YhOaqhiaxheadhKindndnaiIdbaONJbbbZMgY:lJbbb9p9DTmbaY:Oh8Axekcjjjj94h8Aka8AcCth8AdndnaiclfIdbaONJbbbZMgY:lJbbb9p9DTmbaY:OhExekcjjjj94hEkaEcqta8AVh8AdndnaicwfIdbaONJbbbZMgY:lJbbb9p9DTmbaY:OhExekcjjjj94hEkaea8AaEVBdbaicxfhiaeclfheaKcufgKmbkazcFeasz:xjjjbh3cbh5cbh8Eindna3axa8Ecdtfydbg8Acm4a8A7c:v;t;h;Ev2gics4ai7aAGgKcdtfgEydbgecuSmbaea8ASmbcehiina3aKaifaAGgKcdtfgEydbgecuSmeaicefhiaea8A9hmbkkaEa8ABdba5aecuSfh5a8Ecefg8Ead9hmbxdkkazcFeasz:xjjjb8Acbh5kdnaQ:ZgYaH:taD:YgOaC:Y:tg8FNaX:Zgaa5:Zgh:tNaaaH:taOaP:Y:tggNahaY:tNMg8JJbbbb9BmbaYaa:taga8FahaH:tNNNa8J:vaOMhOkaPaDa5ar0geEhPaXa5aeEhXdna5arSmbaDaCaeEgCaP9Rcd9imbdndnaLcl0mbdnaOJbbbZMgO:lJbbb9p9DTmbaO:Ohixdkcjjjj94hixekaPaCfcd9Thika5aQaeEhQaLcefgLcs9hmekkdndnaXmbcihicbhDxekawakcbyd;y:L:cjbHjjjjbbg8ABdKawclBd2aPcuf:YhYdnadTmbaqhiaxheadhKindndnaiIdbaYNJbbbZMgO:lJbbb9p9DTmbaO:OhExekcjjjj94hEkaEcCthEdndnaiclfIdbaYNJbbbZMgO:lJbbb9p9DTmbaO:Oh3xekcjjjj94h3ka3cqtaEVhEdndnaicwfIdbaYNJbbbZMgO:lJbbb9p9DTmbaO:Oh3xekcjjjj94h3kaeaEa3VBdbaicxfhiaeclfheaKcufgKmbkkawcuazama8Aaxadz:mjjjbgDc32giaDc;j:KM;jb0Ecbyd;y:L:cjbHjjjjbbgeBd3awcvBd2aecbaiz:xjjjbh3avcd4hxdnadTmbdnalTmbaxcdth8Ea8AhEaqhealhKadhAina3aEydbc32fgiaeIdbaiIdbMUdbaiaeclfIdbaiIdlMUdlaiaecwfIdbaiIdwMUdwaiaKIdbaiIdxMUdxaiaKclfIdbaiIdzMUdzaiaKcwfIdbaiIdCMUdCaiaiIdKJbbjZMUdKaEclfhEaecxfheaKa8EfhKaAcufgAmbxdkka8AhKaqheadhEina3aKydbc32fgiaeIdbaiIdbMUdbaiaeclfIdbaiIdlMUdlaiaecwfIdbaiIdwMUdwaiaiIdxJbbbbMUdxaiaiIdzJbbbbMUdzaiaiIdCJbbbbMUdCaiaiIdKJbbjZMUdKaKclfhKaecxfheaEcufgEmbkkdnaDTmba3hiaDheinaiaiIdbJbbbbJbbjZaicKfIdbgO:vaOJbbbb9BEgONUdbaiclfgKaOaKIdbNUdbaicwfgKaOaKIdbNUdbaicxfgKaOaKIdbNUdbaiczfgKaOaKIdbNUdbaicCfgKaOaKIdbNUdbaic3fhiaecufgembkkcbhEawcuaDcdtgCaDcFFFFi0Egicbyd;y:L:cjbHjjjjbbgeBdaawcoBd2awaicbyd;y:L:cjbHjjjjbbg8EBd8KaecFeaCz:xjjjbh5dnadTmbaoJbbjZJbbjZaY:vaPceSENgOaONhYaxcdthxalheinaYaecN:H:cjbalEgKIdwa3a8AydbgAc32fgiIdC:tgOaONaKIdbaiIdx:tgOaONaKIdlaiIdz:tgOaONMMNaqcwfIdbaiIdw:tgOaONaqIdbaiIdb:tgOaONaqclfIdbaiIdl:tgOaONMMMhOdndna5aAcdtgifgKydbcuSmba8EaifIdbaO9ETmekaKaEBdba8EaifaOUdbka8Aclfh8AaqcxfhqaeaxfheadaEcefgE9hmbkkaba5aCz:wjjjb8Acrhikaicdthiawcxfc98fheinaeaifydbcbyd;C:L:cjbH:bjjjbbaic98fgimbkkawc;Wbf8KjjjjbaDk:Pdidui99ducbhi8Jjjjjbca9Rglcbyd1:G:cjbBdKalcb8Pdj:G:cjb83izalcbydN:G:cjbBdwalcb8Pd:m:G:cjb83ibdndnaembJbbjFhvJbbjFhoJbbjFhrxekadcd4cdthwincbhdinalczfadfgDabadfIdbgvaDIdbgoaoav9EEUdbaladfgDavaDIdbgoaoav9DEUdbadclfgdcx9hmbkabawfhbaicefgiae9hmbkalIdwalIdK:thralIdlalIdC:thoalIdbalIdz:thvkJbbbbavavJbbbb9DEgvaoaoav9DEgvararav9DEk:H8Modui99lud99Aus998Jjjjjbcji9RgD8KjjjjbcbhqaDcxfcbc;Kbz:xjjjb8AaDcbBdwaD9cb83ibaDcbyd;i:L:cjbBd1eaDcb8Pd;a:L:cjb83ijeaDcbyd;u:L:cjbBd94aDcb8Pd;m:L:cjb83i9WdndnavmbJbbjFhkJbbjFhxJbbjFhmxekaocd4cdthPalhsincbhzinaDcjefazfgHasazfIdbgkaHIdbgxaxak9EEUdbaDc;WbfazfgHakaHIdbgxaxak9DEUdbazclfgzcx9hmbkasaPfhsaqcefgqav9hmbkaDId94aDId1e:thmaDIdtaDId:ee:thxaDId9WaDIdje:thkkJbbbbhOdnar:YgAJq;x8J88MaA:vJbbbbakakJbbbb9DEgkaxaxak9DEgkamamak9DENgxJbbbb9Bmbarc9:f:Yax:vhOkaDcCfhCaDcxfcxfhXcbhzinaDazfaDcjefazfIdbgkaxaDc;WbfazfIdbak:t:tJbbb:;NMUdbazclfgzcx9hmbkcbhQaDarar2gLar2gzcbyd;y:L:cjbHjjjjbbgHBdxaDceBd2aHcbazz:xjjjbgKcbcbadaialaoaraOaDawz:rjjjbcdhYaDcuaLcdtaLcFFFFi0Eg8Acbyd;y:L:cjbHjjjjbbgEBdzaDcdBd2aDcjefcbarz:xjjjb8Acbh3dnaLTmbdnarcb9kmbaKhzaEhHaLhsincbh3aHcbcuazaDcjefarz:AjjjbEBdbazarfhzaHclfhHascufgsmbxdkkaKhPcbh3cbhvindndnaKavar2faDcjefarz:AjjjbTmbcbhHaPhzarhsinazaHazRbbgqfgHcbaqE86bbazcefhzascufgsmbkaEavcdtfa3BdbaHa3fh3xekaEavcdtfcuBdbkaParfhPavcefgvaL9hmbkkdnabTmbaDcua3cotgza3cFFF8F0Ecbyd;y:L:cjbHjjjjbbgQBdCcihYaDciBd2aQcbazz:xjjjb8AaXhCkdnawceGmbaCa8Acbyd;y:L:cjbHjjjjbbg5BdbaDaYcefgzBd2aDcxfazcdtfaLcbyd;y:L:cjbHjjjjbbgzBdbaDaYcdfgYBd2azcbaLz:xjjjbh8EarcufhXdnarci9imbarc9:fhCararcef2aKfcefh8Aceh8Fina8Far2hPa8AhvcehqindnaEaqaPfcdtfydbcuSmbavhzaChHinazazRbbgscuasE86bbazcefhzaHcufgHmbkkavarfhvaqcefgqaX9hmbka8AaLfh8Aa8Fcefg8FaX9hmbkkarce9imbcbh8Acbhqcbhvina8EaqfhscbhzindnasazfgHRbbmbaHce86bba5a8AcdtfaqazfBdba8Acefh8Akarazcefgz9hmbkaqarfhqavcefgvar9hmbka8ATmbaKcefhaaKc9:fhharc9:fhgarci9ih8Jina8Ea5a8Acufg8Acdtfydbgvfcb86bbavar2hPdna8JmbaEavcdtfydbcuSmbaKaPfhHaghqindnaHcefgzRbbgscFe9hmbaHRbbmbcbhskazas86bbazhHaqcufgqmbkaharavcef2fhzaXhsindnazRbbgHcFe9hmbazcefRbbmbcbhHkazaH86bbazcufhzascufgsce9kmbkkaaaPfh8Kavavar9Ug8Lar29Rh8FcbhCindnaCceScuaCEa8Ffgzce9imbazaX9ombcuaCciSaCcdSEa8LfgHce9imbaHaX9ombaEaHar2azfg8McdtfydbcuSmba8Jmbaaa8Mar2fhzcbhqa8KhsaghvinazazRbbgHcbaHaHcFeSEasRbbEgP86bbascefhsazcefhzaPaH7aqVhqavcufgvmbkaqcFeGTmba8Ea8MfgzRbbmbazce86bba5a8Acdtfa8MBdba8Acefh8AkaCcefgCcl9hmbka8AmbkkdnaQTmbaKaEaQadaialaoaraOaDawz:rjjjba3TmbJbbjZaO:vhkawcjjjjlGhPdnawcdGTmbJbbnnaOaON:vh8NakJbbbZNhyaQhzinazczfgsIdbg8PazcCfIdbgx:vhmazcxfgqIdbgIax:vhAazcwfgvIdbg8Rax:vh8SakazydbgHcFrG:ZNhRakaHcq4cFrG:ZNh8UakaHcC4cFrG:ZNh8VdnaxJ:p;c;188Ng8WazcKfIdbMg8X:laxJ:983:g81Ngx9ETmba8Wazc3fIdbMazc8KfIdbg8Ya8Ya8X:vg8YN:tg8Z:lax9ETmba8WazcafIdbMazcyfIdbg8Wa8Wa8X:vg80N:tazc8SfIdba8Wa8YN:tg8Wa8Wa8Z:vg8WN:tg81:lax9ETmba8PJ:p;c;188NazcUfIdb:ta80a8RJ:p;c;188Nazc8WfIdb:tg8PN:ta8WaIJ:p;c;188Nazc80fIdb:ta8Ya8PN:tgIN:ta81:vgxam:tg8Ra8RNa8Pa8X:va8YaIa8Z:va8WaxN:tg8XN:ta80axN:tg8Wa8S:tg8Ya8YNa8XaA:tg8Ya8YNMMa8N9DTmbaxaRaxaR9EEgxakaRMgmaxam9DEhma8Xa8Ua8Xa8U9EEgxaka8UMgAaxaA9DEhAa8Wa8Va8Wa8V9EEgxaka8VMg8Saxa8S9DEh8SkdnaPTmbayaRMhmaya8UMhAaya8VMh8SkasamUdbaqaAUdbava8SUdbazc;abfhza3cufg3mbxdkkdnaPTmbakJbbbZNhxaQhzinazczfaxakazydbgHcFrG:ZNMUdbazcxfaxakaHcq4cFrG:ZNMUdbazcwfaxakaHcC4cFrG:ZNMUdbazc;abfhza3cufg3mbxdkkaQcCfhzinazc98fgHaHIdbazIdbgk:vUdbazc94fgHaHIdbak:vUdbazctfgHaHIdbak:vUdbazc;abfhza3cufg3mbkkcbhsdndnarcd9imbarcufh3aEarcdtfhadnabmbaKcefg8Mararcefgz2fh8JaKazfhba8MaLfh8Ecbhscbh8Kina8Kar2h8La8Mheabh8Aa8Eh8Fa8Jh5cbhXindnaEaXa8LfgqcdtgzfgHclfydbaHydbGaaazfgzydbGazclfydbGcuSmbclcbaKaqar2fgzarfRbbEazRbbcb9hVczcbazaLfgzRbbEVc;abcbazarfRbbEVhPaehza8AhHa8Fhqa5hva3hQindnaPclcbaHRbbEazRbbcb9hVczcbaqRbbEVc;abcbavRbbEVgPcetVgCTmbaCcFeSmbasaCRb;W;p:cjbfhskazcefhzaHcefhHaqcefhqavcefhvaQcufgQmbkkaearfhea8Aarfh8Aa8Farfh8Fa5arfh5aXcefgXa39hmbka8MaLfh8MabaLfhba8EaLfh8Ea8JaLfh8Ja8Kcefg8Ka39hmbxdkkJbbjZaO:vgkakJk;x8J88NNh8RawcdGh8EaDIdwhkaDIdlhxaDIdbhmcbhscbhPinaPar2h8KcbhvindnaEava8KfgqcdtgzfgHclfydbaHydbGaaazfgzydbGazclfydbGcuSmbcbh8AclcbaKaqar2fgYarfRbbEaYRbbcb9hVczcbaYaLfg8JRbbEVc;abcba8JarfRbbEVh8Lindna8LclcbaYa8Ag8Mcefg8AfgzarfRbbEazRbbcb9hVczcba8Ja8AfgzRbbEVc;abcbazarfRbbEVg8LcetVgCTmbaCcFeSmbcbhqdndndnaCRb;W;n:cjbcufPdebdka8ETmeaCcC2gz8Ve;W:L:cjbcltaz8Ve;Y:L:cjbcsGVh8FaKa8Mfh5cxhzaDcjefhHinaHaQaEa8Faz4gqce4ceGavfaqcd4ceGaPfar2fgXcdtfydbcotfa5aqceGfaXar2fRbbcotfcnfBdbaHclfhHazc98fgzc989hmbkaDydjegzIdyaDyd:megHIdyMaDyd:eegqIdyaDyd1egXIdyMMg8XaqIdwaXIdwMJbbbZNgANazIdUaHIdUMaqIdUaXIdUMMg8WMg8Sa8SMazIdaaHIdaMaqIdaaXIdaMMg8YaqIdzaXIdzMJbbbZNg8SNMa8SNazId8SaHId8SMaqId8SaXId8SMMgRa8SNazId80aHId80MaqId80aXId80MMg8UMg8Sa8SMazId3aHId3MaqId3aXId3MMg8VaqIdxaXIdxMJbbbZNg8SNMa8SNazId8KaHId8KMaqId8KaXId8KMMg8Za8SNazId8WaHId8WMaqId8WaXId8WMMg80Mg8Sa8SMazIdKaHIdKMaqIdKaXIdKMMgyaANMaANazId88aHId88MaqId88aXId88MMg8PMMM:lgIa8RazIdCaHIdCMaqIdCaXIdCMMN9Ea8XazIdwaHIdwMJbbbZNgANa8WMg8Sa8SMa8YazIdzaHIdzMJbbbZNg8SNMa8SNaRa8SNa8UMg8Sa8SMa8VazIdxaHIdxMJbbbZNg8SNMa8SNa8Za8SNa80Mg8Sa8SMayaANMaANa8PMMM:laIJ;d;1UZN9DGhqxekaKa8Mfh8FcbhzcrhHindnaCaz4ceGTmba8FazceGfazce4ceGavfazcd4aPfar2fgqar2fRbbgXcFeSmbaQaEaqcdtfydbcotfaXcotfc9efRbbaH4ceGTmbcbhqxdkaHcufhHcehqazcefgzcw9hmbkkaCcC2aqcq2fgH8Ve;W:L:cjbgzTmbaHc;Y:L:cjbfhqaKa8MfhCabasc8K2fhHindnasae9pmbaHaQaEazcD4ceGavfazcq4ceGaPfar2fgXcdtfydbcotfaCazcw4ceGfaXar2fRbbcotfgXc9ifIdbamMUdbaHclfaXc9mfIdbaxMUdbaHcwfaXc9qfIdbakMUdbaHcxfamaQaEazcv4ceGavfazco4ceGaPfar2fgXcdtfydbcotfaCazcl4ceGfaXar2fRbbcotfgXc9ifIdbMUdbaHczfaxaXc9mfIdbMUdbaHcCfakaXc9qfIdbMUdbaHcKfamaQaEazce4ceGavfazcd4ceGaPfar2fgXcdtfydbcotfaCazceGfaXar2fRbbcotfgzc9ifIdbMUdbaHc3faxazc9mfIdbMUdbaHcafakazc9qfIdbMUdbkaHc8KfhHascefhsaq8Vebhzaqcdfhqazmbkka8Aa39hmbkkavcefgva39hmbkaPcefgPa39hmbkaDyd2gYTmekaYcdtaDcxffc98fhzinazydbcbyd;C:L:cjbH:bjjjbbazc98fhzaYcufgYmbkkaDcjif8Kjjjjbask;Kxmiue99due99euz99eui99eud99dud99oudnalTmbaocd4hkaqcdGhxarc99fhqarcethmawawMhPcbhsindndnawavaiascdtfgoclfydbak2cdtfgzIdwgHavaoydbak2cdtfgOIdwgA:tgCaCNazIdbgXaOIdbgQ:tgLaLNazIdlgKaOIdlgY:tg8Aa8ANMMgEavaocwfydbak2cdtfgoIdwg3aA:tg5a5NaoIdbg8EaQ:tg8Fa8FNaoIdlgaaY:tghahNMMggaEag9EEgEa3aH:tgHaHNa8EaX:tgHaHNaaaK:tgHaHNMMgHaEaH9EE:rNgHaHMgH:lJbbb9p9DTmbaH:Ohoxekcjjjj94hokdnaLahNa8Aa8FN:tgHaHNa8Aa5NaCahN:tgXaXNaCa8FNaLa5N:tgKaKNMMg3Jbbbb9BmbJbbjZhEdnaoceaoce9kEgoamaoam9iEg8Jcd9imbJbbjZa8J:Z:vhEkarcb9imbaAaDIdw:th8KaYaDIdl:th8LaQaDIdb:th8Ma8Jcba8Jcb9kEh8NdnadTmbaHJbbjZa3:rgA:vgQNg3aAa8Jcefa8Jcdf2:Y:vgANh8EaKaQNgKaANhyaXaQNgXaXaANNh8PcbhIina8Jcba8Jcb9kEcefh8RaEaI:ZNgQaCNa8KMhgaQa8ANa8LMh8SaQaLNa8MMhRcbhzindndnaPaEaz:ZNgQahNa8SMgYNgH:lJbbb9p9DTmbaH:OhOxekcjjjj94hOkaOce91goaqaoaq6Eh8UdndnaPaQa5NagMgHNga:lJbbb9p9DTmbaa:Oh8Vxekcjjjj94h8Vka8Ua8Vce91goaqaoaq6Eg8Wcefar2fcefgoar2h8XdndnaPaQa8FNaRMgQNga:lJbbb9p9DTmbaa:Oh8Yxekcjjjj94h8Ykadaeaocdtfydbcotfaba8Yce91goaqaoaq6Eg8Zfa8XfcefRbbcotfgocnfa8Ucqta8ZcCtVa8WVBdbaoc9efg8Ua8URbbcea8YceGaOcetcdGVa8VcdtclGVtV86bbaoc9ifgOaQaANaOIdbMUdbaoc9mfgOaYaANaOIdbMUdbaoc9qfgOaHaANaOIdbMUdbaoc9ufgOaAaOIdbMUdbdnaxTmbaoc9yfgOa8PaOIdbMUdbaoc9CfgOaKayNaOIdbMUdbaoc9GfgOa3a8ENaOIdbMUdbaoc9KfgOaXayNaOIdbMUdbaoc9OfgOaXa8ENaOIdbMUdbaoc2fgOaKa8ENaOIdbMUdbaoc9WfgOaXaAa3aHNaXaQNaKaYNMMgY:mNgQNaOIdbMUdbaoctfgOaKaQNaOIdbMUdbaoc94fgOa3aQNaOIdbMUdbaoc98fgoaoIdbaYaQN:tUdbka8Razcefgz9hmbka8Jcufh8JaIa8NShoaIcefhIaoTmbxdkkcbh8Vina8Jcba8Jcb9kEcefh8UaEa8V:ZNgAaCNa8KMhYaAa8ANa8LMhHaAaLNa8MMhXcbhoindndnaPaEao:ZNgAahNaHMNgQ:lJbbb9p9DTmbaQ:Ohzxekcjjjj94hzkazce91gzaqazaq6EhzdndnaPaAa5NaYMNgQ:lJbbb9p9DTmbaQ:OhOxekcjjjj94hOkazaOce91gOaqaOaq6Ecefar2fcefar2hzdndnaPaAa8FNaXMNgA:lJbbb9p9DTmbaA:OhOxekcjjjj94hOkabaOce91gOaqaOaq6Efazfcefce86bba8Uaocefgo9hmbka8Jcufh8Ja8Va8NShoa8Vcefh8VaoTmbkkascifgsal6mbkkk:Nvezu8Jjjjjbcjd9Rgb8Kjjjjbcbheabcbcjdz:xjjjbhdc:W:H:cjbhbinabRbbgicC2glabcqf8Veb87e;4:L:cjbalabcdfgv8Peb83e;W:L:cjbaiabcefRbb86b;W;n:cjbadaifce86bbalavabcxfceaetc:F:d;avGEgi8Peb83e;6:L:cjbalai8Vew87e:c:M:cjbabcQfhbaecefgecK9hmbkcbhoinc;Y:L:cjbhrcbhvindnadavfgwRbbce9hmbavcC2c;W:L:cjbfhDcbhbcehqavc;W;n:cjbfhkinabcitc:G:H:cjbfhlcbhbcbheinaeavab4ceGalabfRbbtVheabcefgbcw9hmbkdnadaecFeGgxfgmRbbmbaxcC2c;W:L:cjbfhPcbhbcehsindnaDabcq2gif8VebgbTmbaraifheaPaifhiinaialabcl4csGfRbbcltalabcw4csGfRbbcwtValabcsGfRbbV87ebaicdfhiae8VebhbaecdfheabmbkkcehbasceGhecbhsaembkamce86bbaxakRbb86b;W;n:cjbkcehbaqceGhlcbhqalmbkawcd86bbkarcCfhravcefgvcjd9hmbkaocefgoci9hmbkcbhic;W:L:cjbhvincuhlavhbinalcefhlab8Vebheabcdfhbaembkaial86b;W;p:cjbavcCfhvaicefgicjd9hmbkadcjdf8Kjjjjbk9DeeuabcFeaicdtz:xjjjbhlcbhbdnadTmbindnalaeydbcdtfgiydbcu9hmbaiabBdbabcefhbkaeclfheadcufgdmbkkabk;Bidqui998Jjjjjbc;Wb9Rgl8Kjjjjbalcxfcbc;Kbz:xjjjb8Aadcd4adfhvcehoinaogrcethoarav6mbkalcuarcdtgoarcFFFFi0Ecbyd;y:L:cjbHjjjjbbgvBdxavcFeaoz:xjjjbhwdnadTmbaicd4hDarcufhqcbhkindndnawcbaeakaD2cdtfgrydlgiaicjjjj94SEgocH4ao7c:F:b:DD2cbarydbgxaxcjjjj94SEgocH4ao7c;D;O:B8J27cbarydwgmamcjjjj94SEgrcH4ar7c:3F;N8N27aqGgvcdtfgrydbgocuSmbam::hPai::hsax::hzcehiinaihrdnaeaoaD2cdtfgiIdbaz9CmbaiIdlas9CmbaiIdwaP9BmikarcefhiawavarfaqGgvcdtfgrydbgocu9hmbkkarakBdbakhokabakcdtfaoBdbakcefgkad9hmbkkalydxcbyd;C:L:cjbH:bjjjbbalc;Wbf8Kjjjjbk9teiucbcbyd;G:L:cjbgeabcifc98GfgbBd;G:L:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabk9teiucbcbyd;G:L:cjbgeabcrfc94GfgbBd;G:L:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikTeeucbabcbyd;G:L:cjbge9Rcifc98GaefgbBd;G:L:cjbdnabZbcztge9nmbabae9RcFFifcz4nb8Akk6eiucbhidnadTmbdninabRbbglaeRbbgv9hmeaecefheabcefhbadcufgdmbxdkkalav9Rhikaikk;0vdbcj:Gdk;yvFFuuFFuuFFuuFFuFFFuFFFuFbbbbbbbbebbbdbbbbbbbebbbebbbdbbbbbbbbbbbeeeeeebebbeebbebbebbbeeebbbbebbbbbbbbbbbbbbbbbbbeeeeeeebebbbeeebbeebbbbbebbbbbebebbbbbbbbbbbbbbbdiorbelvlbodveribbbbbbbbbbbbbbbbbbbbbbebbbbbbbbbbbbbbbbbbbbbibbbbbbbbbbbbbbbbbbbbbobbbbbbbbbbbbbbbbbbbbbrbaebbbbbbbbbbbbbbbbbbsd8We8YbbbbbbbhiaebbbbbbQe8Ke9cebbbbbbbbbbbbbbbbLb8KebbbbbbbbbbbbbbbbbbKbbbbbbbbbbbbbbbbbbbbbYeJbilbbbbbbbbbbbbbbbbEe80e8WlbbbbbbzlAbbbbbbb5eJdnibbbbbbai8Kbbbbbbb8Ee9ce8Ylcibbbb8Yebbbbbbbb8FdOlAdbbbbbb80e8Ylbbbbbb88eTi8KiJv8Jlbbbbbbbbbbbb89e9td8Kv9qibbbbndlvaibbbbZd8Li8KvbbbbbbJdTibbbbbb9Pe81b9GvoiBvbbbbbbbbbbbb9Re9JbvoWibbbbvibbbbbbbb9VeWi9Gvbbbbbb8WvBbbbbbbb9:b9ceBvbbbbbbbbbbbbbbbbubWibbbbbbbbbbbbbbbbbb;Wd9hvSrbbbbbbWl9NvbbbbbbFbbbbbbbbbbbbbbbbbbbbbFFuuFFuuFFuuFFuFFFuFFFuFbc;y:Ldkxebbbdbbb;W:Obb",e=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var t,r=WebAssembly.instantiate(a(n),{}).then(function(y){t=y.instance,t.exports.__wasm_call_ctors()});function a(y){for(var k=new Uint8Array(y.length),f=0;f<y.length;++f){var A=y.charCodeAt(f);k[f]=A>96?A-97:A>64?A-39:A+4}for(var S=0,f=0;f<y.length;++f)k[S++]=k[f]<60?e[k[f]]:(k[f]-60)*64+k[++f];return k.buffer.slice(0,S)}function s(y){if(!y)throw new Error("Assertion failed")}function i(y){return new Uint8Array(y.buffer,y.byteOffset,y.byteLength)}function o(y,k,f,A){var S=t.exports.sbrk,P=S(f*4),T=S(f*A*4),R=new Uint8Array(t.exports.memory.buffer);R.set(i(k),T),y(P,T,f,A*4),R=new Uint8Array(t.exports.memory.buffer);var L=new Uint32Array(f);return new Uint8Array(L.buffer).set(R.subarray(P,P+f*4)),S(P-S(0)),L}function c(y,k,f){var A=t.exports.sbrk,S=A(k.length*4),P=A(f*4),T=new Uint8Array(t.exports.memory.buffer),R=i(k);T.set(R,S);var L=y(P,S,k.length,f);T=new Uint8Array(t.exports.memory.buffer);var z=new Uint32Array(f);new Uint8Array(z.buffer).set(T.subarray(P,P+f*4)),A(S-A(0));for(var j=0;j<k.length;++j)k[j]=z[k[j]];return[z,L]}function b(y){for(var k=0,f=0;f<y.length;++f){var A=y[f];k=k<A?A:k}return k}function l(y,k,f,A,S,P,T,R,L){var z=t.exports.sbrk,j=z(4),I=z(f*4),F=z(S*P),N=z(f*4),G=new Uint8Array(t.exports.memory.buffer);G.set(i(A),F),G.set(i(k),N);var H=y(I,N,f,F,S,P,T,R,L,j);G=new Uint8Array(t.exports.memory.buffer);var _=new Uint32Array(H);i(_).set(G.subarray(I,I+H*4));var V=new Float32Array(1);return i(V).set(G.subarray(j,j+4)),z(j-z(0)),[_,V[0]]}function u(y,k,f,A,S,P,T,R,L,z,j,I,F){var N=t.exports.sbrk,G=N(4),H=N(f*4),_=N(S*P),V=N(S*R),U=N(L.length*4),q=N(f*4),C=z?N(S):0,X=new Uint8Array(t.exports.memory.buffer);X.set(i(A),_),X.set(i(T),V),X.set(i(L),U),X.set(i(k),q),z&&X.set(i(z),C);var te=y(H,q,f,_,S,P,V,R,U,L.length,C,j,I,F,G);X=new Uint8Array(t.exports.memory.buffer);var W=new Uint32Array(te);i(W).set(X.subarray(H,H+te*4));var Q=new Float32Array(1);return i(Q).set(X.subarray(G,G+4)),N(G-N(0)),[W,Q[0]]}function m(y,k,f,A,S,P,T,R,L,z,j,I,F){var N=t.exports.sbrk,G=N(4),H=N(S*P),_=N(S*R),V=N(L.length*4),U=N(f*4),q=z?N(S):0,C=new Uint8Array(t.exports.memory.buffer);C.set(i(A),H),C.set(i(T),_),C.set(i(L),V),C.set(i(k),U),z&&C.set(i(z),q);var X=y(U,f,H,S,P,_,R,V,L.length,q,j,I,F,G);C=new Uint8Array(t.exports.memory.buffer),i(k).set(C.subarray(U,U+X*4)),i(A).set(C.subarray(H,H+S*P)),i(T).set(C.subarray(_,_+S*R));var te=new Float32Array(1);return i(te).set(C.subarray(G,G+4)),N(G-N(0)),[X,te[0]]}function d(y,k,f,A){var S=t.exports.sbrk,P=S(f*A),T=new Uint8Array(t.exports.memory.buffer);T.set(i(k),P);var R=y(P,f,A);return S(P-S(0)),R}function v(y,k,f,A,S,P,T,R){var L=t.exports.sbrk,z=L(R*4),j=L(f*A),I=S?L(f*P):0,F=new Uint8Array(t.exports.memory.buffer);F.set(i(k),j),S&&F.set(i(S),I);var N=y(z,j,f,A,I,P,T,R);F=new Uint8Array(t.exports.memory.buffer);var G=new Uint32Array(N);return i(G).set(F.subarray(z,z+N*4)),L(z-L(0)),G}function p(y,k,f,A,S,P,T,R,L){var z=t.exports.sbrk,j=z(4),I=z(f*4),F=z(S*P),N=z(f*4),G=T?z(S):0,H=new Uint8Array(t.exports.memory.buffer);H.set(i(A),F),H.set(i(k),N),T&&H.set(i(T),G);var _=y(I,N,f,F,S,P,G,R,L,j);H=new Uint8Array(t.exports.memory.buffer);var V=new Uint32Array(_);i(V).set(H.subarray(I,I+_*4));var U=new Float32Array(1);return i(U).set(H.subarray(j,j+4)),z(j-z(0)),[V,U[0]]}function M(y,k,f,A,S,P,T){var R=t.exports.sbrk,L=R(f*4),z=R(S*P),j=R(f*4),I=new Uint8Array(t.exports.memory.buffer);I.set(i(A),z),I.set(i(k),j);var F=y(L,j,f,z,S,P,T);I=new Uint8Array(t.exports.memory.buffer);var N=new Uint32Array(F);return i(N).set(I.subarray(L,L+F*4)),R(L-R(0)),N}function g(y,k,f,A,S,P){var T=t.exports.sbrk,R=T(f.byteLength),L=T(k.byteLength),z=new Uint8Array(t.exports.memory.buffer);z.set(i(f),R),z.set(i(k),L);var j=f.byteLength/A,I=y(0,0,L,k.length,R,j,A,S,P),F=T(I*9*4),N=y(F,I,L,k.length,R,j,A,S,P);s(N<=I),z=new Uint8Array(t.exports.memory.buffer);var G=new Float32Array(N*9);return i(G).set(z.subarray(F,F+G.byteLength)),T(R-T(0)),G}var w={LockBorder:1,Sparse:2,ErrorAbsolute:4,Prune:8,Regularize:16,Permissive:32,RegularizeLight:64,PreserveFolds:128,ErrorClamped:256,_InternalDebug:1<<30},x={Shell:1,Solve:2,Thicken:0,_InternalDebug:1<<30};return{ready:r,supported:!0,compactMesh:function(y){s(y instanceof Uint32Array||y instanceof Int32Array||y instanceof Uint16Array||y instanceof Int16Array),s(y.length%3==0);var k=y.BYTES_PER_ELEMENT==4?y:new Uint32Array(y),f=c(t.exports.meshopt_optimizeVertexFetchRemap,k,b(y)+1);if(y!==k)for(var A=0;A<k.length;++A)y[A]=k[A];return f},generatePositionRemap:function(y,k){return s(y instanceof Float32Array),s(y.length%k==0),s(k>=3),o(t.exports.meshopt_generatePositionRemap,y,y.length/k,k)},simplify:function(y,k,f,A,S,P){s(y instanceof Uint32Array||y instanceof Int32Array||y instanceof Uint16Array||y instanceof Int16Array),s(y.length%3==0),s(k instanceof Float32Array),s(k.length%f==0),s(f>=3),s(A>=0&&A<=y.length),s(A%3==0),s(S>=0);for(var T=0,R=0;R<(P?P.length:0);++R)s(P[R]in w),T|=w[P[R]];var L=y.BYTES_PER_ELEMENT==4?y:new Uint32Array(y),z=l(t.exports.meshopt_simplify,L,y.length,k,k.length/f,f*4,A,S,T);return z[0]=y instanceof Uint32Array?z[0]:new y.constructor(z[0]),z},simplifyWithAttributes:function(y,k,f,A,S,P,T,R,L,z){s(y instanceof Uint32Array||y instanceof Int32Array||y instanceof Uint16Array||y instanceof Int16Array),s(y.length%3==0),s(k instanceof Float32Array),s(k.length%f==0),s(f>=3),s(A instanceof Float32Array),s(A.length==S*(k.length/f)),s(S>=0),s(T==null||T instanceof Uint8Array),s(T==null||T.length==k.length/f),s(R>=0&&R<=y.length),s(R%3==0),s(L>=0),s(Array.isArray(P)),s(S>=P.length),s(P.length<=32);for(var j=0;j<P.length;++j)s(P[j]>=0);for(var I=0,j=0;j<(z?z.length:0);++j)s(z[j]in w),I|=w[z[j]];var F=y.BYTES_PER_ELEMENT==4?y:new Uint32Array(y),N=u(t.exports.meshopt_simplifyWithAttributes,F,y.length,k,k.length/f,f*4,A,S*4,new Float32Array(P),T,R,L,I);return N[0]=y instanceof Uint32Array?N[0]:new y.constructor(N[0]),N},simplifyWithUpdate:function(y,k,f,A,S,P,T,R,L,z){s(y instanceof Uint32Array||y instanceof Int32Array||y instanceof Uint16Array||y instanceof Int16Array),s(y.length%3==0),s(k instanceof Float32Array),s(k.length%f==0),s(f>=3),s(A instanceof Float32Array),s(A.length==S*(k.length/f)),s(S>=0),s(T==null||T instanceof Uint8Array),s(T==null||T.length==k.length/f),s(R>=0&&R<=y.length),s(R%3==0),s(L>=0),s(Array.isArray(P)),s(S>=P.length),s(P.length<=32);for(var j=0;j<P.length;++j)s(P[j]>=0);for(var I=0,j=0;j<(z?z.length:0);++j)s(z[j]in w),I|=w[z[j]];var F=y.BYTES_PER_ELEMENT==4?y:new Uint32Array(y),N=m(t.exports.meshopt_simplifyWithUpdate,F,y.length,k,k.length/f,f*4,A,S*4,new Float32Array(P),T,R,L,I);if(y!==F)for(var j=0;j<N[0];++j)y[j]=F[j];return N},getScale:function(y,k){return s(y instanceof Float32Array),s(y.length%k==0),s(k>=3),d(t.exports.meshopt_simplifyScale,y,y.length/k,k*4)},simplifyPoints:function(y,k,f,A,S,P){return s(y instanceof Float32Array),s(y.length%k==0),s(k>=3),s(f>=0&&f<=y.length/k),A?(s(A instanceof Float32Array),s(A.length%S==0),s(S>=3),s(y.length/k==A.length/S),v(t.exports.meshopt_simplifyPoints,y,y.length/k,k*4,A,S*4,P||0,f)):v(t.exports.meshopt_simplifyPoints,y,y.length/k,k*4,void 0,0,0,f)},simplifySloppy:function(y,k,f,A,S,P){s(y instanceof Uint32Array||y instanceof Int32Array||y instanceof Uint16Array||y instanceof Int16Array),s(y.length%3==0),s(k instanceof Float32Array),s(k.length%f==0),s(f>=3),s(A==null||A instanceof Uint8Array),s(A==null||A.length==k.length/f),s(S>=0&&S<=y.length),s(S%3==0),s(P>=0);var T=y.BYTES_PER_ELEMENT==4?y:new Uint32Array(y),R=p(t.exports.meshopt_simplifySloppy,T,y.length,k,k.length/f,f*4,A,S,P);return R[0]=y instanceof Uint32Array?R[0]:new y.constructor(R[0]),R},simplifyPrune:function(y,k,f,A){s(y instanceof Uint32Array||y instanceof Int32Array||y instanceof Uint16Array||y instanceof Int16Array),s(y.length%3==0),s(k instanceof Float32Array),s(k.length%f==0),s(f>=3),s(A>=0);var S=y.BYTES_PER_ELEMENT==4?y:new Uint32Array(y),P=M(t.exports.meshopt_simplifyPrune,S,y.length,k,k.length/f,f*4,A);return P=y instanceof Uint32Array?P:new y.constructor(P),P},remesh:function(y,k,f,A,S){s(y instanceof Uint32Array||y instanceof Int32Array||y instanceof Uint16Array||y instanceof Int16Array),s(y.length%3==0),s(k instanceof Float32Array),s(k.length%f==0),s(f>=3),s(A>=4&&A<=256);for(var P=0,T=0;T<(S?S.length:0);++T)s(S[T]in x),P|=x[S[T]];var R=y.BYTES_PER_ELEMENT==4?y:new Uint32Array(y);return g(t.exports.meshopt_remesh,R,k,f*4,A,P)}}})();var Wt=class n{constructor(e,t,r){this.renderer=e;this.baseUrl=t;this.manifest=r}models=new Map;materials=new Map;static async load(e,t="../../assets/"){let r=t.endsWith("/")?t:t+"/",a={version:1,textures:{},models:{}};try{let s=await fetch(r+"manifest.json",{cache:"no-cache"});s.ok&&(a={textures:{},models:{},...await s.json()})}catch{}return new n(e,r,a)}get empty(){return!Object.keys(this.manifest.textures).length&&!Object.keys(this.manifest.models).length}hasModel(e){return e in this.manifest.models}hasTexture(e){return e in this.manifest.textures}modelSlots(e){return Object.keys(this.manifest.models).filter(t=>t.startsWith(e))}model(e,t=!0){let r=this.models.get(e);if(!r){let a=this.manifest.models[e];r=a?Qa(this.baseUrl+a.file).then(s=>Bt(this.renderer,s,{keepSource:t})).catch(s=>(console.warn(`[oAxis] model ${e} failed to load`,s),null)):Promise.resolve(null),this.models.set(e,r)}return r}modelEntry(e){return this.manifest.models[e]}async weaponMapping(e){let t=a=>{if(a.autoOrient&&(a.lengthM===.85||a.lengthM===.19)){let{lengthM:s,...i}=a;return{...i,nominalLengthM:s}}return a},r=t({...this.manifest.models[e]?.hints?.weapon??{}});try{let a=await fetch(`${this.baseUrl}weapons/${e}.mapping.json`,{cache:"no-cache"});if(a.ok)return t({...r,...await a.json()})}catch{}return r}texture(e,t={}){let r=this.materials.get(e);if(!r){let a=this.manifest.textures[e];r=a?this.buildMaterial(e,a,t).catch(s=>(console.warn(`[oAxis] texture ${e} failed`,s),null)):Promise.resolve(null),this.materials.set(e,r)}return r}async buildMaterial(e,t,r){let a=this.renderer.textures,s=(l,u,m=!1)=>a.fromURL(this.baseUrl+l,{srgb:u,normalMap:m}),[i,o,c]=await Promise.all([s(t.diff,!0),t.nor?s(t.nor,!1,!0):null,t.arm?s(t.arm,!1):null]),b=1/(t.tileMeters??2);return new pe({name:r.name??e,baseColorMap:i,normalMap:o,ormMap:c,baseColor:[1,1,1,1],metallic:c?1:0,roughness:r.roughness??1,occlusionStrength:c?1:0,uvScale:[b,b],worldUV:r.worldUV??!1,edgeWear:r.edgeWear??0})}credits(){let e=[];for(let[t,r]of Object.entries(this.manifest.textures))e.push({...r,slot:t});for(let[t,r]of Object.entries(this.manifest.models))e.push({...r,slot:t});for(let[t,r]of Object.entries(this.manifest.sounds??{}))e.push({...r,slot:t});return e}};var Ne=new URLSearchParams(location.search),qe=(n,e)=>Ne.has(n)?Number(Ne.get(n)):e,_t=document.getElementById("view"),St=document.getElementById("status"),Js=Ne.get("offscreen")==="1";Ne.get("tex")&&(Oe.textureSize=qe("tex",2048));var de=await Ja.create({canvas:_t,baseUrl:"../../",title:"oAxis viewer",offscreen:Js});is(de.tuning);var qt={frames:0,errors:[],done:!1};window.__test=qt;de.renderer.dev.onError=n=>{qt.errors.push(n),console.error(n)};var Xs=de.renderer.sky.settings;Xs.sunElevation=qe("sun",32);Xs.sunAzimuth=qe("az",130);var cc=de.renderer.settings;cc.exposure.compensation=qe("ev",.3);var lc=de.renderer.synth.material("concrete",{size:1024,tileMeters:1,seed:3,dirt:.2},{name:"table"}),bc=new Me(new ve(de.renderer.dev,we(1.6,.04,1).computeTangents()),lc,O.fromTranslation(O.create(),[0,-.02,0]));de.scene.add(bc);St.textContent="Building models\u2026";var ze={pistol:cs(de.renderer),carbine:us(de.renderer)},Qr={};if(Ne.get("fit")!=="0"){for(let[n,e]of Object.entries(ze))if(e.grips){let t=Jr(e.grips,e.model);e.grips=t.grips,Qr[n]=t.reports}}window.__fit=Qr;window.__builds=ze;window.__clear=(n,e,t)=>{let r=t?ze[n].grips:n==="pistol"?Er:Nr;return qs(r[e],ze[n].model,e==="right"?1:-1)};window.__sd=(n,e)=>Ws(ze[n].model,e);var lt=(Ne.get("model")??"")in ze?Ne.get("model"):"pistol",Ys=n=>n==="carbine"||ze[n].kind==="carbine",dc=n=>{let e=0,t=h.create();for(let r of n.parts){let a=r.object.mesh.bounds;if(a)for(let s=0;s<8;s++)h.transformMat4(t,[s&1?a.max[0]:a.min[0],s&2?a.max[1]:a.min[1],s&4?a.max[2]:a.min[2]],r.local),e=Math.min(e,t[1])}return O.fromRotationTranslation(O.create(),K.create(),[0,-e+.001,0])},At={slide:qe("slide",0),mag:qe("mag",0),trigger:qe("trigger",0)},Xr=Ne.get("hands")==="1"?new nr(de.renderer,{viewmodel:!1,skin:Ne.get("glove")==="1"?"glove":"bare"}).addTo(de.scene):null;if(Ne.get("rig")==="1"){let e=await(await Wt.load(de.renderer,"../../assets/")).model("arms",!1);e?Xr=new or(de.renderer,e,{viewmodel:!1}).addTo(de.scene):St.textContent='no "arms" slot in assets/manifest.json'}function Yr(n){for(let e of Object.values(ze))for(let t of e.model.parts)de.scene.remove(t.object);lt=n;for(let e of ze[n].model.parts)de.scene.add(e.object)}var Et=Ne.get("weapon");if(Et){St.textContent=`Loading ${Et}\u2026`;try{let n=await Wt.load(de.renderer,"../../assets/"),e=/\.(glb|gltf)(\?|$)/i.test(Et)?await As(de.renderer,n.baseUrl+Et):await ks(de.renderer,n,Et);if(e){for(let t of e.warnings)console.warn("[viewer] scanned weapon:",t);if(Ne.get("fit")!=="0"&&e.grips){let t=Jr(e.grips,e.model);e.grips=t.grips,Qr.scanned=t.reports}ze.scanned=e,lt="scanned",window.__scanned=e,console.info(`[viewer] scanned weapon "${e.title}": ${e.kind}, ${e.model.parts.length} parts, ${e.model.parts.filter(t=>t.bolt).length} slide/bolt, ${e.model.parts.filter(t=>t.magazine).length} magazine, ${e.model.parts.filter(t=>t.trigger).length} trigger`)}else St.textContent=`weapon ${Et} is not in assets/manifest.json`}catch(n){St.textContent=`weapon ${Et} failed: ${n.message}`,console.error(n)}}Yr(lt);var cr=Ne.get("asset");if(cr){St.textContent=`Loading ${cr}\u2026`;let e=await(await Wt.load(de.renderer,"../../assets/")).model(cr,!1);if(e){for(let i of Object.values(ze))for(let o of i.model.parts)de.scene.remove(o.object);let t=e.bounds,r=Math.max(t.max[0]-t.min[0],t.max[1]-t.min[1],t.max[2]-t.min[2]),a=qe("assetScale",.3/r),s=O.fromRotationTranslationScale(O.create(),K.fromEuler(K.create(),0,qe("assetYaw",0)*st,0),[-(t.min[0]+t.max[0])/2*a,-t.min[1]*a+.001,-(t.min[2]+t.max[2])/2*a],[a,a,a]);as(de.scene,e,s),ze.pistol.model.parts.length=0,ze.carbine.model.parts.length=0}else St.textContent=`asset ${cr} not found in assets/manifest.json`}var lr=qe("yaw",35)*st,fa=qe("pitch",12)*st,Ut=qe("dist",Ys(lt)?1.1:.38);de.camera.fovY=qe("fov",30)*st;de.camera.near=.01;var Zr=!1;_t.addEventListener("pointerdown",n=>{Zr=!0,_t.setPointerCapture(n.pointerId)});_t.addEventListener("pointerup",()=>{Zr=!1});_t.addEventListener("pointermove",n=>{Zr&&(lr-=n.movementX*.005,fa=Math.max(-1.4,Math.min(1.4,fa+n.movementY*.005)))});_t.addEventListener("wheel",n=>{Ut=Math.max(.08,Math.min(5,Ut*Math.exp(n.deltaY*.001))),n.preventDefault()},{passive:!1});window.addEventListener("keydown",n=>{if(n.code==="Digit1"&&(Yr("carbine"),Ut=1.1),n.code==="Digit2"&&(Yr("pistol"),Ut=.38),n.code==="KeyG"){let e=ze[lt],t=ts(e.model.parts.map((a,s)=>({name:`${lt}-${a.bolt?"slide":a.magazine?"magazine":a.trigger?"trigger":"part"}-${s}`,object:a.object}))),r=document.createElement("a");r.href=URL.createObjectURL(new Blob([t],{type:"model/gltf-binary"})),r.download=`${lt}.glb`,r.click()}n.code==="Space"&&(At.slide=At.slide>0?0:ze.pistol.spec.action?.travelM??.03)});de.onUpdate.push(()=>{let n=ze[lt].model,e=dc(n),t=h.create(0,.06,Ys(lt)?-.1:0),r=Math.cos(fa);de.camera.position.set([t[0]+Math.sin(lr)*r*Ut,t[1]+Math.sin(fa)*Ut,t[2]+Math.cos(lr)*r*Ut]),K.fromEuler(de.camera.rotation,-fa,lr,0);let a=n.magAxis;for(let s of n.parts){let i=s.object.transform;s.bolt?O.translate(i,e,[0,0,At.slide]):s.magazine&&a?O.translate(i,e,[a[0]*At.mag,a[1]*At.mag,a[2]*At.mag]):s.trigger?O.translate(i,e,[0,0,(n.triggerTravelM??0)*At.trigger]):O.copy(i,e),O.multiply(i,i,s.local)}if(Xr){let s=ze[lt],i=null;if(Ne.get("eye")==="1"){let o=h.transformMat4(h.create(),[n.rearSight[0],n.rearSight[1],n.rearSight[2]+s.spec.eyeRelief],e);i={position:o,rotation:K.create()},Ne.get("pov")==="1"&&(de.camera.position.set(o),K.identity(de.camera.rotation))}s.grips&&Xr.update(e,s.grips,i,{trigger:At.trigger})}qt.frames=de.frame});St.textContent="";if(Js){let n=qe("frames",12);de.onUpdate.push(()=>{de.frame>=n&&!qt.done&&(qt.done=!0,de.stop(),de.renderer.readback().then(({width:e,height:t,data:r})=>{let a=document.createElement("canvas");a.width=e,a.height=t,a.style.cssText="position:fixed;inset:0;width:100%;height:100%;z-index:5",a.getContext("2d").putImageData(new ImageData(new Uint8ClampedArray(r.buffer),e,t),0,0),document.body.appendChild(a),qt.captured=!0}))})}de.start();
//# sourceMappingURL=main.js.map
