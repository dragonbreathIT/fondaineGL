var ut=Math.PI/180,Ec=180/Math.PI;var f={create(n=0,e=0,t=0){let a=new Float32Array(3);return a[0]=n,a[1]=e,a[2]=t,a},clone(n){return f.create(n[0],n[1],n[2])},set(n,e,t,a){return n[0]=e,n[1]=t,n[2]=a,n},copy(n,e){return n[0]=e[0],n[1]=e[1],n[2]=e[2],n},add(n,e,t){return n[0]=e[0]+t[0],n[1]=e[1]+t[1],n[2]=e[2]+t[2],n},sub(n,e,t){return n[0]=e[0]-t[0],n[1]=e[1]-t[1],n[2]=e[2]-t[2],n},mul(n,e,t){return n[0]=e[0]*t[0],n[1]=e[1]*t[1],n[2]=e[2]*t[2],n},scale(n,e,t){return n[0]=e[0]*t,n[1]=e[1]*t,n[2]=e[2]*t,n},scaleAndAdd(n,e,t,a){return n[0]=e[0]+t[0]*a,n[1]=e[1]+t[1]*a,n[2]=e[2]+t[2]*a,n},dot(n,e){return n[0]*e[0]+n[1]*e[1]+n[2]*e[2]},cross(n,e,t){let a=e[0],r=e[1],s=e[2],i=t[0],o=t[1],c=t[2];return n[0]=r*c-s*o,n[1]=s*i-a*c,n[2]=a*o-r*i,n},length(n){return Math.hypot(n[0],n[1],n[2])},lengthSq(n){return n[0]*n[0]+n[1]*n[1]+n[2]*n[2]},distance(n,e){return Math.hypot(n[0]-e[0],n[1]-e[1],n[2]-e[2])},normalize(n,e){let t=Math.hypot(e[0],e[1],e[2]),a=t>0?1/t:0;return n[0]=e[0]*a,n[1]=e[1]*a,n[2]=e[2]*a,n},negate(n,e){return n[0]=-e[0],n[1]=-e[1],n[2]=-e[2],n},lerp(n,e,t,a){return n[0]=e[0]+(t[0]-e[0])*a,n[1]=e[1]+(t[1]-e[1])*a,n[2]=e[2]+(t[2]-e[2])*a,n},min(n,e,t){return n[0]=Math.min(e[0],t[0]),n[1]=Math.min(e[1],t[1]),n[2]=Math.min(e[2],t[2]),n},max(n,e,t){return n[0]=Math.max(e[0],t[0]),n[1]=Math.max(e[1],t[1]),n[2]=Math.max(e[2],t[2]),n},transformMat4(n,e,t){let a=e[0],r=e[1],s=e[2],i=t[3]*a+t[7]*r+t[11]*s+t[15];return i=i||1,n[0]=(t[0]*a+t[4]*r+t[8]*s+t[12])/i,n[1]=(t[1]*a+t[5]*r+t[9]*s+t[13])/i,n[2]=(t[2]*a+t[6]*r+t[10]*s+t[14])/i,n},transformDirMat4(n,e,t){let a=e[0],r=e[1],s=e[2];return n[0]=t[0]*a+t[4]*r+t[8]*s,n[1]=t[1]*a+t[5]*r+t[9]*s,n[2]=t[2]*a+t[6]*r+t[10]*s,n},transformQuat(n,e,t){let a=t[0],r=t[1],s=t[2],i=t[3],o=e[0],c=e[1],l=e[2],b=r*l-s*c,d=s*o-a*l,m=a*c-r*o,u=r*m-s*d,y=s*b-a*m,p=a*d-r*b,w=i*2;return b*=w,d*=w,m*=w,u*=2,y*=2,p*=2,n[0]=o+b+u,n[1]=c+d+y,n[2]=l+m+p,n}};var X={create(){let n=new Float32Array(4);return n[3]=1,n},fromValues(n,e,t,a){let r=new Float32Array(4);return r[0]=n,r[1]=e,r[2]=t,r[3]=a,r},identity(n){return n[0]=0,n[1]=0,n[2]=0,n[3]=1,n},copy(n,e){return n[0]=e[0],n[1]=e[1],n[2]=e[2],n[3]=e[3],n},setAxisAngle(n,e,t){let a=t*.5,r=Math.sin(a);return n[0]=r*e[0],n[1]=r*e[1],n[2]=r*e[2],n[3]=Math.cos(a),n},multiply(n,e,t){let a=e[0],r=e[1],s=e[2],i=e[3],o=t[0],c=t[1],l=t[2],b=t[3];return n[0]=a*b+i*o+r*l-s*c,n[1]=r*b+i*c+s*o-a*l,n[2]=s*b+i*l+a*c-r*o,n[3]=i*b-a*o-r*c-s*l,n},rotateX(n,e,t){let a=t*.5,r=Math.sin(a),s=Math.cos(a),i=e[0],o=e[1],c=e[2],l=e[3];return n[0]=i*s+l*r,n[1]=o*s+c*r,n[2]=c*s-o*r,n[3]=l*s-i*r,n},rotateY(n,e,t){let a=t*.5,r=Math.sin(a),s=Math.cos(a),i=e[0],o=e[1],c=e[2],l=e[3];return n[0]=i*s-c*r,n[1]=o*s+l*r,n[2]=c*s+i*r,n[3]=l*s-o*r,n},rotateZ(n,e,t){let a=t*.5,r=Math.sin(a),s=Math.cos(a),i=e[0],o=e[1],c=e[2],l=e[3];return n[0]=i*s+o*r,n[1]=o*s-i*r,n[2]=c*s+l*r,n[3]=l*s-c*r,n},fromEuler(n,e,t,a){return X.identity(n),X.rotateY(n,n,t),X.rotateX(n,n,e),X.rotateZ(n,n,a),n},normalize(n,e){let t=Math.hypot(e[0],e[1],e[2],e[3]),a=t>0?1/t:0;return n[0]=e[0]*a,n[1]=e[1]*a,n[2]=e[2]*a,n[3]=e[3]*a,n},conjugate(n,e){return n[0]=-e[0],n[1]=-e[1],n[2]=-e[2],n[3]=e[3],n},invert(n,e){let t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2]+e[3]*e[3],a=t?1/t:0;return n[0]=-e[0]*a,n[1]=-e[1]*a,n[2]=-e[2]*a,n[3]=e[3]*a,n},dot(n,e){return n[0]*e[0]+n[1]*e[1]+n[2]*e[2]+n[3]*e[3]},slerp(n,e,t,a){let r=e[0],s=e[1],i=e[2],o=e[3],c=t[0],l=t[1],b=t[2],d=t[3],m=r*c+s*l+i*b+o*d;m<0&&(m=-m,c=-c,l=-l,b=-b,d=-d);let u,y;if(1-m>1e-6){let p=Math.acos(m),w=Math.sin(p);u=Math.sin((1-a)*p)/w,y=Math.sin(a*p)/w}else u=1-a,y=a;return n[0]=u*r+y*c,n[1]=u*s+y*l,n[2]=u*i+y*b,n[3]=u*o+y*d,n},rotationTo(n,e,t){let a=f.dot(e,t);if(a<-.999999){let s=f.create();return f.cross(s,f.create(1,0,0),e),f.length(s)<1e-6&&f.cross(s,f.create(0,1,0),e),f.normalize(s,s),X.setAxisAngle(n,s,Math.PI)}if(a>.999999)return X.identity(n);let r=f.cross(f.create(),e,t);return n[0]=r[0],n[1]=r[1],n[2]=r[2],n[3]=1+a,X.normalize(n,n)},lookRotation(n,e,t){let a=U.create(),r=f.normalize(f.create(),f.negate(f.create(),e)),s=f.normalize(f.create(),f.cross(f.create(),t,r)),i=f.cross(f.create(),r,s);return a[0]=s[0],a[1]=s[1],a[2]=s[2],a[4]=i[0],a[5]=i[1],a[6]=i[2],a[8]=r[0],a[9]=r[1],a[10]=r[2],U.getRotation(n,a)}},U={create(){let n=new Float32Array(16);return n[0]=n[5]=n[10]=n[15]=1,n},clone(n){return new Float32Array(n)},copy(n,e){for(let t=0;t<16;t++)n[t]=e[t];return n},identity(n){return n.fill(0),n[0]=n[5]=n[10]=n[15]=1,n},multiply(n,e,t){let a=e[0],r=e[1],s=e[2],i=e[3],o=e[4],c=e[5],l=e[6],b=e[7],d=e[8],m=e[9],u=e[10],y=e[11],p=e[12],w=e[13],x=e[14],M=e[15];for(let v=0;v<4;v++){let g=t[v*4],k=t[v*4+1],h=t[v*4+2],A=t[v*4+3];n[v*4]=g*a+k*o+h*d+A*p,n[v*4+1]=g*r+k*c+h*m+A*w,n[v*4+2]=g*s+k*l+h*u+A*x,n[v*4+3]=g*i+k*b+h*y+A*M}return n},invert(n,e){let t=e[0],a=e[1],r=e[2],s=e[3],i=e[4],o=e[5],c=e[6],l=e[7],b=e[8],d=e[9],m=e[10],u=e[11],y=e[12],p=e[13],w=e[14],x=e[15],M=t*o-a*i,v=t*c-r*i,g=t*l-s*i,k=a*c-r*o,h=a*l-s*o,A=r*l-s*c,P=b*p-d*y,S=b*w-m*y,T=b*x-u*y,z=d*w-m*p,L=d*x-u*p,I=m*x-u*w,G=M*I-v*L+g*z+k*T-h*S+A*P;return G?(G=1/G,n[0]=(o*I-c*L+l*z)*G,n[1]=(r*L-a*I-s*z)*G,n[2]=(p*A-w*h+x*k)*G,n[3]=(m*h-d*A-u*k)*G,n[4]=(c*T-i*I-l*S)*G,n[5]=(t*I-r*T+s*S)*G,n[6]=(w*g-y*A-x*v)*G,n[7]=(b*A-m*g+u*v)*G,n[8]=(i*L-o*T+l*P)*G,n[9]=(a*T-t*L-s*P)*G,n[10]=(y*h-p*g+x*M)*G,n[11]=(d*g-b*h-u*M)*G,n[12]=(o*S-i*z-c*P)*G,n[13]=(t*z-a*S+r*P)*G,n[14]=(p*v-y*k-w*M)*G,n[15]=(b*k-d*v+m*M)*G,n):null},transpose(n,e){if(n===e){let t=e[1],a=e[2],r=e[3],s=e[6],i=e[7],o=e[11];return n[1]=e[4],n[2]=e[8],n[3]=e[12],n[4]=t,n[6]=e[9],n[7]=e[13],n[8]=a,n[9]=s,n[11]=e[14],n[12]=r,n[13]=i,n[14]=o,n}for(let t=0;t<4;t++)for(let a=0;a<4;a++)n[a*4+t]=e[t*4+a];return n},fromRotationTranslationScale(n,e,t,a){let r=e[0],s=e[1],i=e[2],o=e[3],c=r+r,l=s+s,b=i+i,d=r*c,m=r*l,u=r*b,y=s*l,p=s*b,w=i*b,x=o*c,M=o*l,v=o*b,g=a[0],k=a[1],h=a[2];return n[0]=(1-(y+w))*g,n[1]=(m+v)*g,n[2]=(u-M)*g,n[3]=0,n[4]=(m-v)*k,n[5]=(1-(d+w))*k,n[6]=(p+x)*k,n[7]=0,n[8]=(u+M)*h,n[9]=(p-x)*h,n[10]=(1-(d+y))*h,n[11]=0,n[12]=t[0],n[13]=t[1],n[14]=t[2],n[15]=1,n},fromRotationTranslation(n,e,t){return U.fromRotationTranslationScale(n,e,t,cn)},translate(n,e,t){let a=t[0],r=t[1],s=t[2];if(n!==e)for(let i=0;i<12;i++)n[i]=e[i];return n[12]=e[0]*a+e[4]*r+e[8]*s+e[12],n[13]=e[1]*a+e[5]*r+e[9]*s+e[13],n[14]=e[2]*a+e[6]*r+e[10]*s+e[14],n[15]=e[3]*a+e[7]*r+e[11]*s+e[15],n},fromTranslation(n,e){return U.identity(n),n[12]=e[0],n[13]=e[1],n[14]=e[2],n},fromScaling(n,e){return U.identity(n),n[0]=e[0],n[5]=e[1],n[10]=e[2],n},fromQuat(n,e){return U.fromRotationTranslationScale(n,e,bi,cn)},getTranslation(n,e){return n[0]=e[12],n[1]=e[13],n[2]=e[14],n},getScaling(n,e){return n[0]=Math.hypot(e[0],e[1],e[2]),n[1]=Math.hypot(e[4],e[5],e[6]),n[2]=Math.hypot(e[8],e[9],e[10]),n},getRotation(n,e){let t=Math.hypot(e[0],e[1],e[2])||1,a=Math.hypot(e[4],e[5],e[6])||1,r=Math.hypot(e[8],e[9],e[10])||1,s=e[0]/t,i=e[1]/t,o=e[2]/t,c=e[4]/a,l=e[5]/a,b=e[6]/a,d=e[8]/r,m=e[9]/r,u=e[10]/r,y=s+l+u;if(y>0){let p=Math.sqrt(y+1)*2;n[3]=.25*p,n[0]=(b-m)/p,n[1]=(d-o)/p,n[2]=(i-c)/p}else if(s>l&&s>u){let p=Math.sqrt(1+s-l-u)*2;n[3]=(b-m)/p,n[0]=.25*p,n[1]=(i+c)/p,n[2]=(d+o)/p}else if(l>u){let p=Math.sqrt(1+l-s-u)*2;n[3]=(d-o)/p,n[0]=(i+c)/p,n[1]=.25*p,n[2]=(b+m)/p}else{let p=Math.sqrt(1+u-s-l)*2;n[3]=(i-c)/p,n[0]=(d+o)/p,n[1]=(b+m)/p,n[2]=.25*p}return n},lookAt(n,e,t,a){let r=e[0]-t[0],s=e[1]-t[1],i=e[2]-t[2],o=Math.hypot(r,s,i)||1;r/=o,s/=o,i/=o;let c=a[1]*i-a[2]*s,l=a[2]*r-a[0]*i,b=a[0]*s-a[1]*r;o=Math.hypot(c,l,b)||1,c/=o,l/=o,b/=o;let d=s*b-i*l,m=i*c-r*b,u=r*l-s*c;return n[0]=c,n[1]=d,n[2]=r,n[3]=0,n[4]=l,n[5]=m,n[6]=s,n[7]=0,n[8]=b,n[9]=u,n[10]=i,n[11]=0,n[12]=-(c*e[0]+l*e[1]+b*e[2]),n[13]=-(d*e[0]+m*e[1]+u*e[2]),n[14]=-(r*e[0]+s*e[1]+i*e[2]),n[15]=1,n},perspectiveReversedInfinite(n,e,t,a,r=0,s=0){let i=1/Math.tan(e/2);return n.fill(0),n[0]=i/t,n[5]=i,n[8]=-r,n[9]=-s,n[11]=-1,n[14]=a,n},perspectiveZO(n,e,t,a,r){let s=1/Math.tan(e/2);n.fill(0),n[0]=s/t,n[5]=s,n[11]=-1;let i=1/(a-r);return n[10]=r*i,n[14]=r*a*i,n},orthoZO(n,e,t,a,r,s,i){let o=1/(e-t),c=1/(a-r),l=1/(s-i);return n.fill(0),n[0]=-2*o,n[5]=-2*c,n[10]=l,n[15]=1,n[12]=(e+t)*o,n[13]=(r+a)*c,n[14]=s*l,n},normalMatrix12(n,e,t=0){let a=e[0],r=e[1],s=e[2],i=e[4],o=e[5],c=e[6],l=e[8],b=e[9],d=e[10],m=d*o-c*b,u=-d*i+c*l,y=b*i-o*l,p=a*m+r*u+s*y;p=p?1/p:0;let w=m*p,x=(-d*r+s*b)*p,M=(c*r-s*o)*p,v=u*p,g=(d*a-s*l)*p,k=(-c*a+s*i)*p,h=y*p,A=(-b*a+r*l)*p,P=(o*a-r*i)*p;return n[t+0]=w,n[t+1]=v,n[t+2]=h,n[t+3]=0,n[t+4]=x,n[t+5]=g,n[t+6]=A,n[t+7]=0,n[t+8]=M,n[t+9]=k,n[t+10]=P,n[t+11]=0,n}},cn=new Float32Array([1,1,1]),bi=new Float32Array([0,0,0]),rt={create(){return{min:f.create(1/0,1/0,1/0),max:f.create(-1/0,-1/0,-1/0)}},fromPositions(n){let e=rt.create();for(let t=0;t<n.length;t+=3){let a=n[t],r=n[t+1],s=n[t+2];a<e.min[0]&&(e.min[0]=a),r<e.min[1]&&(e.min[1]=r),s<e.min[2]&&(e.min[2]=s),a>e.max[0]&&(e.max[0]=a),r>e.max[1]&&(e.max[1]=r),s>e.max[2]&&(e.max[2]=s)}return e},transform(n,e,t){for(let a=0;a<3;a++){let r=t[12+a],s=t[12+a];for(let i=0;i<3;i++){let o=t[i*4+a],c=o*e.min[i],l=o*e.max[i];c<l?(r+=c,s+=l):(r+=l,s+=c)}n.min[a]=r,n.max[a]=s}return n}};function pr(n,e=new Float32Array(20)){let t=c=>[n[c],n[4+c],n[8+c],n[12+c]],a=t(0),r=t(1),s=t(2),i=t(3),o=[[i[0]+a[0],i[1]+a[1],i[2]+a[2],i[3]+a[3]],[i[0]-a[0],i[1]-a[1],i[2]-a[2],i[3]-a[3]],[i[0]+r[0],i[1]+r[1],i[2]+r[2],i[3]+r[3]],[i[0]-r[0],i[1]-r[1],i[2]-r[2],i[3]-r[3]],[i[0]-s[0],i[1]-s[1],i[2]-s[2],i[3]-s[3]]];for(let c=0;c<5;c++){let l=Math.hypot(o[c][0],o[c][1],o[c][2])||1;for(let b=0;b<4;b++)e[c*4+b]=o[c][b]/l}return e}function gr(n,e){for(let t=0;t<5;t++){let a=n[t*4],r=n[t*4+1],s=n[t*4+2],i=n[t*4+3],o=a>=0?e.max[0]:e.min[0],c=r>=0?e.max[1]:e.min[1],l=s>=0?e.max[2]:e.min[2];if(a*o+r*c+s*l+i<0)return!1}return!0}function ft(n=2654435769){let e=n>>>0,t=()=>{e=e+1831565813>>>0;let a=e;return a=Math.imul(a^a>>>15,a|1),a^=a+Math.imul(a^a>>>7,a|61),((a^a>>>14)>>>0)/4294967296};return{next:t,range:(a,r)=>a+(r-a)*t(),gauss:()=>{let a=Math.max(t(),1e-12),r=t();return Math.sqrt(-2*Math.log(a))*Math.cos(2*Math.PI*r)},sign:()=>t()<.5?-1:1}}function yr(n,e){let t=1,a=0,r=n;for(;r>0;)t/=e,a+=t*(r%e),r=Math.floor(r/e);return a}var xa=class n{adapter;device;context;canvas;presentationFormat;features;onError=e=>console.error("[fondaineGL]",e);offscreen;constructor(e,t,a,r){this.adapter=e,this.device=t,this.canvas=a,this.offscreen=r,this.presentationFormat=r?"rgba8unorm":navigator.gpu.getPreferredCanvasFormat();let s=r?null:a.getContext("webgpu");if(!r&&!s)throw new Error("fondaineGL: could not get a WebGPU canvas context");this.context=s,r||this.context.configure({device:t,format:this.presentationFormat,alphaMode:"opaque"}),this.features=new Set([...t.features]),t.addEventListener("uncapturederror",i=>this.onError(i.error.message)),t.lost.then(i=>this.onError(`device lost (${i.reason}): ${i.message}`))}static async create(e){if(!("gpu"in navigator))throw new Error("fondaineGL requires WebGPU (Chrome/Edge 113+, Safari 26+, Firefox 141+).");let t=await navigator.gpu.requestAdapter({powerPreference:e.powerPreference??"high-performance"});if(!t)throw new Error("fondaineGL: no WebGPU adapter available");let r=["float32-filterable","rg11b10ufloat-renderable","texture-compression-bc","texture-compression-astc","texture-compression-etc2",...e.optionalFeatures??[]].filter(o=>t.features.has(o)),s=t.limits,i=await t.requestDevice({requiredFeatures:r,requiredLimits:{maxTextureDimension2D:s.maxTextureDimension2D,maxTextureArrayLayers:s.maxTextureArrayLayers,maxStorageBufferBindingSize:s.maxStorageBufferBindingSize,maxBufferSize:s.maxBufferSize,maxComputeWorkgroupStorageSize:s.maxComputeWorkgroupStorageSize,maxComputeInvocationsPerWorkgroup:s.maxComputeInvocationsPerWorkgroup,maxStorageTexturesPerShaderStage:s.maxStorageTexturesPerShaderStage,maxSampledTexturesPerShaderStage:s.maxSampledTexturesPerShaderStage,maxColorAttachmentBytesPerSample:s.maxColorAttachmentBytesPerSample}});return new n(t,i,e.canvas,!!e.offscreen)}get floatFilterable(){return this.features.has("float32-filterable")}createBuffer(e,t,a,r){let s=Math.max(16,Math.ceil(e/16)*16),i=this.device.createBuffer({size:s,usage:t|GPUBufferUsage.COPY_DST,label:a});return r&&this.device.queue.writeBuffer(i,0,r.buffer,r.byteOffset,r.byteLength),i}createTexture(e){return this.device.createTexture(e)}shader(e,t){let a=this.device.createShaderModule({code:e,label:t});return a.getCompilationInfo?.().then(r=>{for(let s of r.messages){if(s.type!=="error")continue;let o=e.split(`
`).slice(Math.max(0,s.lineNum-3),s.lineNum+1).join(`
`);this.onError(`WGSL error in ${t??"shader"} @${s.lineNum}:${s.linePos}: ${s.message}
${o}`)}}),a}},wa=class{f32;u32;buffer;constructor(e){this.buffer=new ArrayBuffer(Math.ceil(e/16)*16),this.f32=new Float32Array(this.buffer),this.u32=new Uint32Array(this.buffer)}mat4(e,t){this.f32.set(t,e/4)}vec4(e,t,a=0,r=0,s=0){let i=e/4;this.f32[i]=t,this.f32[i+1]=a,this.f32[i+2]=r,this.f32[i+3]=s}uvec4(e,t,a=0,r=0,s=0){let i=e/4;this.u32[i]=t,this.u32[i+1]=a,this.u32[i+2]=r,this.u32[i+3]=s}f(e,t){this.f32[e/4]=t}};function nt(n,e=n){return Math.floor(Math.log2(Math.max(n,e)))+1}function ln(n,e,t){return Math.log2(n*n/e*(100/t))}var we=class n{positions;normals;uvs;tangents=null;indices;joints=null;weights=null;constructor(e,t,a,r){this.positions=Float32Array.from(e),this.normals=Float32Array.from(t),this.uvs=Float32Array.from(a),this.indices=Uint32Array.from(r)}get vertexCount(){return this.positions.length/3}get triangleCount(){return this.indices.length/3}clone(){let e=new n(this.positions,this.normals,this.uvs,this.indices);return this.tangents&&(e.tangents=Float32Array.from(this.tangents)),this.joints&&(e.joints=Uint16Array.from(this.joints)),this.weights&&(e.weights=Float32Array.from(this.weights)),e}bounds(){return rt.fromPositions(this.positions)}transform(e){let t=f.create(),a=f.create(),r=U.invert(U.create(),e);U.transpose(r,r);for(let i=0;i<this.positions.length;i+=3)f.transformMat4(t,this.positions.subarray(i,i+3),e),this.positions.set(t,i),f.transformDirMat4(a,this.normals.subarray(i,i+3),r),f.normalize(a,a),this.normals.set(a,i);if(this.tangents){let i=f.create();for(let o=0;o<this.tangents.length;o+=4)f.transformDirMat4(i,this.tangents.subarray(o,o+3),e),f.normalize(i,i),this.tangents.set(i,o)}return e[0]*(e[5]*e[10]-e[6]*e[9])-e[4]*(e[1]*e[10]-e[2]*e[9])+e[8]*(e[1]*e[6]-e[2]*e[5])<0&&this.flipWinding(),this}translate(e,t,a){return this.transform(U.fromTranslation(U.create(),[e,t,a]))}rotateX(e){let t=U.create();return t[5]=Math.cos(e),t[6]=Math.sin(e),t[9]=-Math.sin(e),t[10]=Math.cos(e),this.transform(t)}rotateY(e){let t=U.create();return t[0]=Math.cos(e),t[2]=-Math.sin(e),t[8]=Math.sin(e),t[10]=Math.cos(e),this.transform(t)}rotateZ(e){let t=U.create();return t[0]=Math.cos(e),t[1]=Math.sin(e),t[4]=-Math.sin(e),t[5]=Math.cos(e),this.transform(t)}scale(e,t=e,a=e){return this.transform(U.fromScaling(U.create(),[e,t,a]))}flipWinding(){let e=this.indices;for(let t=0;t<e.length;t+=3){let a=e[t+1];e[t+1]=e[t+2],e[t+2]=a}return this}scaleUVs(e,t=e){for(let a=0;a<this.uvs.length;a+=2)this.uvs[a]*=e,this.uvs[a+1]*=t;return this}displace(e){for(let t=0;t<this.positions.length;t+=3){let a=e([this.positions[t],this.positions[t+1],this.positions[t+2]]);this.positions[t]=a[0],this.positions[t+1]=a[1],this.positions[t+2]=a[2]}return this.computeNormals()}computeNormals(){let e=new Float32Array(this.positions.length),t=this.positions,a=this.indices;for(let r=0;r<a.length;r+=3){let s=a[r]*3,i=a[r+1]*3,o=a[r+2]*3,c=t[i]-t[s],l=t[i+1]-t[s+1],b=t[i+2]-t[s+2],d=t[o]-t[s],m=t[o+1]-t[s+1],u=t[o+2]-t[s+2],y=l*u-b*m,p=b*d-c*u,w=c*m-l*d;for(let x of[s,i,o])e[x]+=y,e[x+1]+=p,e[x+2]+=w}for(let r=0;r<e.length;r+=3){let s=Math.hypot(e[r],e[r+1],e[r+2])||1;e[r]/=s,e[r+1]/=s,e[r+2]/=s}return this.normals=e,this}computeTangents(){return this.tangents=xr(this.positions,this.normals,this.uvs,this.indices),this}toFlat(){let e=this.indices,t=new Float32Array(e.length*3),a=new Float32Array(e.length*2);for(let s=0;s<e.length;s++)t.set(this.positions.subarray(e[s]*3,e[s]*3+3),s*3),a.set(this.uvs.subarray(e[s]*2,e[s]*2+2),s*2);return new n(t,new Float32Array(t.length),a,Array.from({length:e.length},(s,i)=>i)).computeNormals()}static merge(e){let t=0,a=0;for(let u of e)t+=u.vertexCount,a+=u.indices.length;let r=new Float32Array(t*3),s=new Float32Array(t*3),i=new Float32Array(t*2),o=new Uint32Array(a),l=e.some(u=>u.tangents)?new Float32Array(t*4):null,b=0,d=0;for(let u of e){r.set(u.positions,b*3),s.set(u.normals,b*3),i.set(u.uvs,b*2),l&&u.tangents&&l.set(u.tangents,b*4);for(let y=0;y<u.indices.length;y++)o[d+y]=u.indices[y]+b;b+=u.vertexCount,d+=u.indices.length}let m=new n(r,s,i,o);return m.tangents=l,m}};function xr(n,e,t,a){let r=n.length/3,s=new Float32Array(r*3),i=new Float32Array(r*3);for(let c=0;c<a.length;c+=3){let l=a[c],b=a[c+1],d=a[c+2],m=n[b*3]-n[l*3],u=n[b*3+1]-n[l*3+1],y=n[b*3+2]-n[l*3+2],p=n[d*3]-n[l*3],w=n[d*3+1]-n[l*3+1],x=n[d*3+2]-n[l*3+2],M=t[b*2]-t[l*2],v=t[b*2+1]-t[l*2+1],g=t[d*2]-t[l*2],k=t[d*2+1]-t[l*2+1],h=M*k-g*v;if(Math.abs(h)<1e-12)continue;let A=1/h,P=(k*m-v*p)*A,S=(k*u-v*w)*A,T=(k*y-v*x)*A,z=(M*p-g*m)*A,L=(M*w-g*u)*A,I=(M*x-g*y)*A;for(let G of[l,b,d])s[G*3]+=P,s[G*3+1]+=S,s[G*3+2]+=T,i[G*3]+=z,i[G*3+1]+=L,i[G*3+2]+=I}let o=new Float32Array(r*4);for(let c=0;c<r;c++){let l=e[c*3],b=e[c*3+1],d=e[c*3+2],m=s[c*3],u=s[c*3+1],y=s[c*3+2],p=l*m+b*u+d*y;m-=l*p,u-=b*p,y-=d*p;let w=Math.hypot(m,u,y);if(w<1e-8){let k=Math.abs(l)<.9?1:0,h=k?0:1;m=h*d-0*b,u=0*l-k*d,y=k*b-h*l,w=Math.hypot(m,u,y)||1}m/=w,u/=w,y/=w;let x=b*y-d*u,M=d*m-l*y,v=l*u-b*m,g=x*i[c*3]+M*i[c*3+1]+v*i[c*3+2]<0?-1:1;o[c*4]=m,o[c*4+1]=u,o[c*4+2]=y,o[c*4+3]=g}return o}var xt=class{pos=[];nrm=[];uv=[];ix=[];v(e,t,a,r,s,i,o,c){return this.pos.push(e,t,a),this.nrm.push(r,s,i),this.uv.push(o,c),this.pos.length/3-1}tri(e,t,a){this.ix.push(e,t,a)}quad(e,t,a,r){this.ix.push(e,t,a,e,a,r)}build(){return new we(this.pos,this.nrm,this.uv,this.ix)}};function je(n,e,t,a=1){let r=new xt,s=n/2,i=e/2,o=t/2,c=[[[1,0,0],[0,0,-1],[0,1,0],t,e],[[-1,0,0],[0,0,1],[0,1,0],t,e],[[0,1,0],[1,0,0],[0,0,-1],n,t],[[0,-1,0],[1,0,0],[0,0,1],n,t],[[0,0,1],[1,0,0],[0,1,0],n,e],[[0,0,-1],[-1,0,0],[0,1,0],n,e]],l=[s,i,o];for(let[b,d,m,u,y]of c){let p=r.pos.length/3;for(let w=0;w<=a;w++)for(let x=0;x<=a;x++){let M=(x/a-.5)*u,v=(w/a-.5)*y,g=b[0]*l[0]+d[0]*M+m[0]*v,k=b[1]*l[1]+d[1]*M+m[1]*v,h=b[2]*l[2]+d[2]*M+m[2]*v;r.v(g,k,h,b[0],b[1],b[2],M+u/2,v+y/2)}for(let w=0;w<a;w++)for(let x=0;x<a;x++){let M=p+w*(a+1)+x;r.quad(M,M+1,M+a+2,M+a+1)}}return r.build()}function ye(n,e,t,a,r=3){let s=Math.min(a,n/2,e/2,t/2)*.999,i=je(n,e,t,1),o=[n/2-s,e/2-s,t/2-s],c=new xt,l=[[[1,0,0],[0,0,-1],[0,1,0]],[[-1,0,0],[0,0,1],[0,1,0]],[[0,1,0],[1,0,0],[0,0,-1]],[[0,-1,0],[1,0,0],[0,0,1]],[[0,0,1],[1,0,0],[0,1,0]],[[0,0,-1],[-1,0,0],[0,1,0]]],b=[n/2,e/2,t/2],d=m=>m[0]!==0?0:m[1]!==0?1:2;for(let[m,u,y]of l){let p=d(u),w=d(y),x=d(m),M=A=>{let P=[],S=b[A],T=o[A];for(let z=0;z<=r;z++)P.push(-S+z/r*(S-T));T>1e-6&&P.push(T);for(let z=1;z<=r;z++)P.push(T+z/r*(S-T));return P},v=M(p),g=M(w),k=c.pos.length/3;for(let A=0;A<g.length;A++)for(let P=0;P<v.length;P++){let S=[0,0,0];S[x]=m[x]*b[x],S[p]=v[P]*Math.sign(u[p]),S[w]=g[A]*Math.sign(y[w]);let T=[Math.max(-o[0],Math.min(o[0],S[0])),Math.max(-o[1],Math.min(o[1],S[1])),Math.max(-o[2],Math.min(o[2],S[2]))],z=S[0]-T[0],L=S[1]-T[1],I=S[2]-T[2],G=Math.hypot(z,L,I)||1;z/=G,L/=G,I/=G;let j=[T[0]+z*s,T[1]+L*s,T[2]+I*s];c.v(j[0],j[1],j[2],z,L,I,v[P]+b[p],g[A]+b[w])}let h=v.length;for(let A=0;A<g.length-1;A++)for(let P=0;P<h-1;P++){let S=k+A*h+P;c.quad(S,S+1,S+h+1,S+h)}}return c.build()}function pt(n,e,t,a=24,r={}){let s=new xt,i=r.heightSegments??1,o=r.thetaStart??0,c=r.thetaLength??Math.PI*2,l=(e-n)/t,b=Math.max(n,e);for(let m=0;m<=i;m++){let u=m/i,y=e+(n-e)*u,p=-t/2+u*t;for(let w=0;w<=a;w++){let x=o+w/a*c,M=Math.sin(x),v=Math.cos(x),g=Math.hypot(1,l);s.v(y*M,p,y*v,M/g,l/g,v/g,w/a*c*b,p+t/2)}}for(let m=0;m<i;m++)for(let u=0;u<a;u++){let y=m*(a+1)+u;s.quad(y,y+1,y+a+2,y+a+1)}let d=m=>{let u=m?n:e;if(u<=0)return;let y=m?t/2:-t/2,p=m?1:-1,w=s.v(0,y,0,0,p,0,0,0),x=s.pos.length/3;for(let M=0;M<=a;M++){let v=o+M/a*c;s.v(u*Math.sin(v),y,u*Math.cos(v),0,p,0,u*Math.sin(v),u*Math.cos(v))}for(let M=0;M<a;M++)m?s.tri(w,x+M,x+M+1):s.tri(w,x+M+1,x+M)};return r.capTop!==!1&&d(!0),r.capBottom!==!1&&d(!1),s.build()}function Ce(n,e=32,t=35){let a=new xt,r=[],s=0;for(let c=0;c<n.length;c++){let[l,b]=n[c];c>0&&(s+=Math.hypot(l-n[c-1][0],b-n[c-1][1]));let d=n[Math.max(0,c-1)],m=n[Math.min(n.length-1,c+1)],u=c>0?[l-d[0],b-d[1]]:null,y=c<n.length-1?[m[0]-l,m[1]-b]:null,p=w=>{let x=Math.hypot(w[0],w[1])||1;return[w[1]/x,-w[0]/x]};if(u&&y){let w=Math.atan2(u[1],u[0]),x=Math.atan2(y[1],y[0]),M=Math.abs(w-x);if(M>Math.PI&&(M=2*Math.PI-M),M>t*Math.PI/180){let k=p(u),h=p(y);r.push({r:l,y:b,nr:k[0],ny:k[1],s}),r.push({r:l,y:b,nr:h[0],ny:h[1],s});continue}let v=[u[0]/(Math.hypot(u[0],u[1])||1)+y[0]/(Math.hypot(y[0],y[1])||1),u[1]/(Math.hypot(u[0],u[1])||1)+y[1]/(Math.hypot(y[0],y[1])||1)],g=p(v);r.push({r:l,y:b,nr:g[0],ny:g[1],s})}else{let w=p(u??y);r.push({r:l,y:b,nr:w[0],ny:w[1],s})}}let i=Math.max(...n.map(c=>c[0]),1e-4),o=e+1;for(let c of r)for(let l=0;l<=e;l++){let b=l/e*Math.PI*2,d=Math.sin(b),m=Math.cos(b);a.v(c.r*d,c.y,c.r*m,c.nr*d,c.ny,c.nr*m,l/e*Math.PI*2*i,c.s)}for(let c=0;c<r.length-1;c++)if(!(r[c].r===r[c+1].r&&r[c].y===r[c+1].y))for(let l=0;l<e;l++){let b=c*o+l;a.quad(b,b+1,b+o+1,b+o)}return a.build()}function bn(n,e=24,t=16){let a=new xt;for(let r=0;r<=t;r++){let s=r/t,i=s*Math.PI;for(let o=0;o<=e;o++){let c=o/e,l=c*Math.PI*2,b=-Math.cos(l)*Math.sin(i),d=Math.cos(i),m=Math.sin(l)*Math.sin(i);a.v(b*n,d*n,m*n,b,d,m,c*Math.PI*2*n,s*Math.PI*n)}}for(let r=0;r<t;r++)for(let s=0;s<e;s++){let i=r*(e+1)+s;r!==0&&a.tri(i,i+e+1,i+1),r!==t-1&&a.tri(i+1,i+e+1,i+e+2)}return a.build()}function Bt(n){let e=0;for(let t=0,a=n.length-1;t<n.length;a=t++)e+=(n[a][0]-n[t][0])*(n[a][1]+n[t][1]);return e/2}function wr(n){let e=n.length;if(e<3)return[];let t=Array.from({length:e},(o,c)=>c);Bt(n)<0&&t.reverse();let a=[],r=(o,c,l)=>(c[0]-o[0])*(l[1]-o[1])-(c[1]-o[1])*(l[0]-o[0]),s=(o,c,l,b)=>r(c,l,o)>=0&&r(l,b,o)>=0&&r(b,c,o)>=0,i=0;for(;t.length>3&&i++<1e4;){let o=!1;for(let c=0;c<t.length;c++){let l=t[(c+t.length-1)%t.length],b=t[c],d=t[(c+1)%t.length],m=n[l],u=n[b],y=n[d];if(r(m,u,y)<=1e-12)continue;let p=!0;for(let w of t){if(w===l||w===b||w===d)continue;let x=n[w];if(!(x[0]===m[0]&&x[1]===m[1]||x[0]===u[0]&&x[1]===u[1]||x[0]===y[0]&&x[1]===y[1])&&s(x,m,u,y)){p=!1;break}}if(p){a.push(l,b,d),t.splice(c,1),o=!0;break}}if(!o){for(let c=1;c<t.length-1;c++)a.push(t[0],t[c],t[c+1]);return a}}return t.length===3&&a.push(t[0],t[1],t[2]),a}function ui(n,e){let t=Bt(n)<0?[...n].reverse():[...n],a=e.map(r=>Bt(r)>0?[...r].reverse():[...r]).sort((r,s)=>Math.max(...s.map(i=>i[0]))-Math.max(...r.map(i=>i[0])));for(let r of a){let s=0;for(let b=1;b<r.length;b++)r[b][0]>r[s][0]&&(s=b);let i=r[s],o=-1,c=1/0;for(let b=0;b<t.length;b++){let d=t[b];if(d[0]<i[0])continue;let m=Math.hypot(d[0]-i[0],d[1]-i[1]);m<c&&(c=m,o=b)}o<0&&(o=0);let l=[...r.slice(s),...r.slice(0,s+1)];t=[...t.slice(0,o+1),...l,t[o],...t.slice(o+1)]}return t}function vr(n,e){let a=Bt(n)>0?1:-1;return n.map((r,s)=>{let i=n[(s+n.length-1)%n.length],o=n[(s+1)%n.length],c=[r[0]-i[0],r[1]-i[1]],l=[o[0]-r[0],o[1]-r[1]],b=Math.hypot(c[0],c[1])||1,d=Math.hypot(l[0],l[1])||1,m=[-c[1]/b*a,c[0]/b*a],u=[-l[1]/d*a,l[0]/d*a],y=m[0]+u[0],p=m[1]+u[1],w=Math.hypot(y,p)||1;y/=w,p/=w;let x=Math.max(.35,y*m[0]+p*m[1]);return[r[0]+y*e/x,r[1]+p*e/x]})}function Dt(n,e,t={}){let a=new xt,r=Math.min(t.bevel??0,e*.45),s=r>0?Math.max(1,t.bevelSegments??2):0,i=Bt(n)>0?n:[...n].reverse(),o=(t.holes??[]).map(p=>Bt(p)<0?p:[...p].reverse()),c=[i,...o],l=[],b=e/2;if(s>0){for(let p=0;p<=s;p++){let w=p/s*(Math.PI/2);l.push({off:r*(1-Math.sin(w)),z:-b+r*(1-Math.cos(w)),nz:-Math.cos(w),nxy:Math.sin(w)})}for(let p=0;p<=s;p++){let w=p/s*(Math.PI/2);l.push({off:r*(1-Math.cos(w)),z:b-r+r*Math.sin(w),nz:Math.sin(w),nxy:Math.cos(w)})}}else l.push({off:0,z:-b,nz:0,nxy:1},{off:0,z:b,nz:0,nxy:1});for(let p of c){let w=p!==i,x=l.map(v=>v.off>0?vr(p,w?-v.off:v.off):p),M=0;for(let v=0;v<p.length;v++){let g=p[v],k=p[(v+1)%p.length],h=Math.hypot(k[0]-g[0],k[1]-g[1]),A=k[0]-g[0],P=k[1]-g[1],S=Math.hypot(A,P)||1;A/=S,P/=S;let T=P,z=-A,L=a.pos.length/3;for(let I=0;I<l.length;I++){let G=l[I],j=x[I],R=j[v],F=j[(v+1)%j.length],N=[T*G.nxy,z*G.nxy,G.nz];a.v(R[0],R[1],G.z,N[0],N[1],N[2],M,G.z+b),a.v(F[0],F[1],G.z,N[0],N[1],N[2],M+h,G.z+b)}for(let I=0;I<l.length-1;I++){let G=L+I*2;a.quad(G,G+1,G+3,G+2)}M+=h}}let d=s>0?vr(i,r):i,m=o.map(p=>s>0?vr(p,-r):p),u=m.length?ui(d,m):d,y=wr(u);for(let[p,w]of[[-b,-1],[b,1]]){let x=a.pos.length/3;for(let M of u)a.v(M[0],M[1],p,0,0,w,M[0],M[1]);for(let M=0;M<y.length;M+=3)w>0?a.tri(x+y[M],x+y[M+1],x+y[M+2]):a.tri(x+y[M],x+y[M+2],x+y[M+1])}return a.build()}function Mr(n,e,t,a=24){return Array.from({length:a},(r,s)=>[n+Math.cos(s/a*Math.PI*2)*t,e+Math.sin(s/a*Math.PI*2)*t])}function un(n,e,t,a,r,s=4){let i=[],o=[[t-r,e+r,-Math.PI/2],[t-r,a-r,0],[n+r,a-r,Math.PI/2],[n+r,e+r,Math.PI]];for(let[c,l,b]of o)for(let d=0;d<=s;d++){let m=b+d/s*(Math.PI/2);i.push([c+Math.cos(m)*r,l+Math.sin(m)*r])}return i}var dn=48,Ma=24,Yt={arrayStride:dn,attributes:[{shaderLocation:0,offset:0,format:"float32x3"},{shaderLocation:1,offset:12,format:"float32x3"},{shaderLocation:2,offset:24,format:"float32x4"},{shaderLocation:3,offset:40,format:"float32x2"}]},mn={arrayStride:Ma,attributes:[{shaderLocation:4,offset:0,format:"uint16x4"},{shaderLocation:5,offset:8,format:"float32x4"}]},Ae=class{vertexBuffer;indexBuffer;skinBuffer;indexCount;vertexCount;bounds;skinned;source;label;constructor(e,t,a={}){let r=t,s=r.positions.length/3,i=r.uvs??new Float32Array(s*2),o=r.tangents??xr(r.positions,r.normals,i,r.indices),c=new Float32Array(s*(dn/4));for(let l=0;l<s;l++){let b=l*12;c[b]=r.positions[l*3],c[b+1]=r.positions[l*3+1],c[b+2]=r.positions[l*3+2],c[b+3]=r.normals[l*3],c[b+4]=r.normals[l*3+1],c[b+5]=r.normals[l*3+2],c[b+6]=o[l*4],c[b+7]=o[l*4+1],c[b+8]=o[l*4+2],c[b+9]=o[l*4+3],c[b+10]=i[l*2],c[b+11]=i[l*2+1]}if(this.label=a.label??"mesh",this.vertexBuffer=e.createBuffer(c.byteLength,GPUBufferUsage.VERTEX,`${this.label}.vb`,c),this.indexBuffer=e.createBuffer(r.indices.byteLength,GPUBufferUsage.INDEX,`${this.label}.ib`,r.indices),this.indexCount=r.indices.length,this.vertexCount=s,this.bounds=rt.fromPositions(r.positions),this.skinned=!!(r.joints&&r.weights),this.skinned){let l=new ArrayBuffer(s*Ma),b=new Uint16Array(l),d=new Float32Array(l);for(let m=0;m<s;m++){for(let u=0;u<4;u++)b[m*Ma/2+u]=r.joints[m*4+u];for(let u=0;u<4;u++)d[(m*Ma+8)/4+u]=r.weights[m*4+u]}this.skinBuffer=e.createBuffer(l.byteLength,GPUBufferUsage.VERTEX,`${this.label}.skin`,new Uint8Array(l))}else this.skinBuffer=null;this.source=a.keepSource?r:null}destroy(){this.vertexBuffer.destroy(),this.indexBuffer.destroy(),this.skinBuffer?.destroy()}};var di=`
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
`,kr=class{constructor(e){this.dev=e;this.sampler=e.device.createSampler({minFilter:"linear",magFilter:"linear"}),this.module=e.shader(di,"mipgen")}pipelines=new Map;sampler;module;pipeline(e,t){let a=`${e}:${t}`,r=this.pipelines.get(a);return r||(r=this.dev.device.createRenderPipeline({layout:"auto",vertex:{module:this.module,entryPoint:"vs"},fragment:{module:this.module,entryPoint:t==="normal"?"fsNormal":"fs",targets:[{format:e}]},primitive:{topology:"triangle-list"}}),this.pipelines.set(a,r)),r}generate(e,t="color",a){let r=a??this.dev.device.createCommandEncoder({label:"mipgen"}),s=this.pipeline(e.format,t),i=e.depthOrArrayLayers;for(let o=0;o<i;o++)for(let c=1;c<e.mipLevelCount;c++){let l=this.dev.device.createBindGroup({layout:s.getBindGroupLayout(0),entries:[{binding:0,resource:e.createView({dimension:"2d",baseMipLevel:c-1,mipLevelCount:1,baseArrayLayer:o,arrayLayerCount:1})},{binding:1,resource:this.sampler}]}),b=r.beginRenderPass({colorAttachments:[{view:e.createView({dimension:"2d",baseMipLevel:c,mipLevelCount:1,baseArrayLayer:o,arrayLayerCount:1}),loadOp:"clear",storeOp:"store",clearValue:[0,0,0,0]}]});b.setPipeline(s),b.setBindGroup(0,l),b.draw(3),b.end()}a||this.dev.device.queue.submit([r.finish()])}},ka=class{constructor(e){this.dev=e;this.mipgen=new kr(e),this.white=this.solid([255,255,255,255],"rgba8unorm-srgb","white"),this.black=this.solid([0,0,0,255],"rgba8unorm-srgb","black"),this.flatNormal=this.solid([128,128,255,255],"rgba8unorm","flatNormal"),this.defaultOrm=this.solid([255,255,255,255],"rgba8unorm","orm"),this.white3d=e.device.createTexture({size:[1,1,1],dimension:"3d",format:"r16float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),e.device.queue.writeTexture({texture:this.white3d},new Uint16Array([15360]),{bytesPerRow:2},[1,1,1])}mipgen;white;black;flatNormal;defaultOrm;white3d;samplers=new Map;solid(e,t,a){let r=this.dev.device.createTexture({size:[1,1],format:t,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:a});return this.dev.device.queue.writeTexture({texture:r},new Uint8Array(e),{bytesPerRow:4},[1,1]),r}fromImage(e,t={}){let a=t.srgb?"rgba8unorm-srgb":"rgba8unorm",r=t.mips!==!1?nt(e.width,e.height):1,s=this.dev.device.createTexture({size:[e.width,e.height],format:a,mipLevelCount:r,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT,label:t.label});return this.dev.device.queue.copyExternalImageToTexture({source:e},{texture:s},[e.width,e.height]),r>1&&this.mipgen.generate(s,t.normalMap?"normal":"color"),s}fromRGBA8(e,t,a,r={}){let s=r.srgb?"rgba8unorm-srgb":"rgba8unorm",i=r.mips!==!1?nt(t,a):1,o=this.dev.device.createTexture({size:[t,a],format:s,mipLevelCount:i,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT,label:r.label});return this.dev.device.queue.writeTexture({texture:o},e,{bytesPerRow:t*4},[t,a]),i>1&&this.mipgen.generate(o,r.normalMap?"normal":"color"),o}async fromURL(e,t={}){let a=await(await fetch(e)).blob(),r=await createImageBitmap(a,{colorSpaceConversion:"none",premultiplyAlpha:"none"});return this.fromImage(r,{label:e,...t})}sampler(e={}){let t=e.address??"repeat",a=e.addressV??t,r=e.filter??"linear",s=e.anisotropy??16,i=`${t}|${a}|${r}|${s}`,o=this.samplers.get(i);return o||(o=this.dev.device.createSampler({addressModeU:t,addressModeV:a,addressModeW:t,magFilter:r,minFilter:r,mipmapFilter:r,maxAnisotropy:r==="linear"?s:1}),this.samplers.set(i,o)),o}};var hn=128,It={ALPHA_MASK:1,UNLIT:2,WORLD_UV:4,FOLIAGE:8,WIND:16,TERRAIN:32},mi=0,xe=class{id=++mi;name;baseColor;emissive;emissiveLuminance;metallic;roughness;normalScale;occlusionStrength;specular;edgeWear;edgeWearRadius;uvScale;uvOffset;uvRotation;alphaMode;alphaCutoff;doubleSided;unlit;worldUV;foliage;wind;terrain;layerTextures;layerScale;blendSharpness;blendNoise;baseColorMap;normalMap;ormMap;emissiveMap;sampler;buffer=null;bindGroup=null;dirtyUniform=!0;dirtyBinding=!0;constructor(e={}){this.name=e.name??`material${this.id}`,this.baseColor=e.baseColor??[.8,.8,.8,1],this.emissive=e.emissive??[0,0,0],this.emissiveLuminance=e.emissiveLuminance??0,this.metallic=e.metallic??0,this.roughness=e.roughness??.6,this.normalScale=e.normalScale??1,this.occlusionStrength=e.occlusionStrength??1,this.specular=e.specular??.5,this.edgeWear=e.edgeWear??0,this.edgeWearRadius=e.edgeWearRadius??.003,this.uvScale=e.uvScale??[1,1],this.uvOffset=e.uvOffset??[0,0],this.uvRotation=e.uvRotation??0,this.alphaMode=e.alphaMode??"opaque",this.alphaCutoff=e.alphaCutoff??.5,this.doubleSided=e.doubleSided??!1,this.unlit=e.unlit??!1,this.worldUV=e.worldUV??!1,this.foliage=e.foliage??!1,this.wind=e.wind??!1,this.terrain=e.terrain??!1,this.layerTextures=e.layerTextures??null,this.layerScale=e.layerScale??[1,1,1],this.blendSharpness=e.blendSharpness??.75,this.blendNoise=e.blendNoise??[1.7,.22],this.baseColorMap=e.baseColorMap??null,this.normalMap=e.normalMap??null,this.ormMap=e.ormMap??null,this.emissiveMap=e.emissiveMap??null,this.sampler=e.sampler??null}markDirty(){this.dirtyUniform=!0}markBindingsDirty(){this.dirtyBinding=!0,this.dirtyUniform=!0}get flags(){let e=0;return this.alphaMode==="mask"&&(e|=It.ALPHA_MASK),this.unlit&&(e|=It.UNLIT),this.worldUV&&(e|=It.WORLD_UV),this.foliage&&(e|=It.FOLIAGE),this.wind&&(e|=It.WIND),this.terrain&&(e|=It.TERRAIN|It.WORLD_UV),e}get variantKey(){return`${this.alphaMode}|${this.doubleSided?2:1}|${this.terrain?"T":"S"}`}getBindGroup(e,t,a){if(this.buffer||(this.buffer=e.createBuffer(hn,GPUBufferUsage.UNIFORM,`${this.name}.ub`)),this.dirtyUniform){let r=new Float32Array(hn/4);r.set(this.baseColor,0),r.set(this.emissive,4),r[7]=this.emissiveLuminance,r[8]=this.metallic,r[9]=this.roughness,r[10]=this.normalScale,r[11]=this.occlusionStrength,r[12]=this.uvScale[0],r[13]=this.uvScale[1],r[14]=this.uvOffset[0],r[15]=this.uvOffset[1],r[16]=this.alphaCutoff,r[17]=this.specular,r[18]=this.uvRotation,r[19]=this.flags,r[20]=this.edgeWear,r[21]=this.edgeWearRadius,r[24]=this.layerScale[0],r[25]=this.layerScale[1],r[26]=this.layerScale[2],r[27]=this.blendSharpness,r[28]=this.blendNoise[0],r[29]=this.blendNoise[1],e.device.queue.writeBuffer(this.buffer,0,r),this.dirtyUniform=!1}if(this.dirtyBinding||!this.bindGroup){if(this.terrain){if(!this.layerTextures)throw new Error(`material ${this.name}: terrain materials need layerTextures`);let r=this.layerTextures,s=i=>i.createView({dimension:"2d-array"});return this.bindGroup=e.device.createBindGroup({layout:a,label:this.name,entries:[{binding:0,resource:{buffer:this.buffer}},{binding:1,resource:this.sampler??t.sampler()},{binding:2,resource:s(r.albedo)},{binding:3,resource:s(r.normal)},{binding:4,resource:s(r.orm)},{binding:5,resource:(this.emissiveMap??t.white).createView()}]}),this.dirtyBinding=!1,this.bindGroup}this.bindGroup=e.device.createBindGroup({layout:a,label:this.name,entries:[{binding:0,resource:{buffer:this.buffer}},{binding:1,resource:this.sampler??t.sampler()},{binding:2,resource:(this.baseColorMap??t.white).createView()},{binding:3,resource:(this.normalMap??t.flatNormal).createView()},{binding:4,resource:(this.ormMap??t.defaultOrm).createView()},{binding:5,resource:(this.emissiveMap??t.white).createView()}]}),this.dirtyBinding=!1}return this.bindGroup}};function Aa(n=!1){let e=n?"texture_2d_array<f32>":"texture_2d<f32>",t=n?", layer":"";return`
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
`}var Zc=Aa(!1);var hi={concrete:0,wood:1,anodized:2,parkerized:3,polymer:4,paintedSteel:5,ground:6,gravel:7,brass:8,paperTarget:9,rubber:10,webbing:11,cardboard:12,bareSteel:13,grass:14,nitride:15,machined:16,skin:17,glove:18,brushed:19},fi=`
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
    case 19u: { // brushed black-nitride / DLC steel (slides, carriers): directional machining lines, holster wear
      // extra = brushing direction: 0 \u2192 lines run along V (lengthwise on a lofted slide), 1 \u2192 along U
      let along = select(vec2f(uv.x * 1600.0, uv.y * 3.0), vec2f(uv.x * 3.0, uv.y * 1600.0), extra > 0.5);
      let per = select(vec2i(1600, 3), vec2i(3, 1600), extra > 0.5);
      let brush = gnoise(along, per, seed + 3u);
      let per2 = select(vec2i(800, 6), vec2i(6, 800), extra > 0.5);
      let brush2 = gnoise(along * select(vec2f(0.5, 2.0), vec2f(2.0, 0.5), extra > 0.5), per2, seed + 5u);
      let fine = fbm(uv, 180, 2, seed + 7u);
      let blotch = fbm(uv, 4, 4, seed + 11u);
      let sc = scratches(uv, seed + 13u, wear * 1.2);
      let haze = smoothstep(0.55, 0.85, fbm(uv, 7, 4, seed + 17u) * 0.5 + 0.5) * wear * 0.5;
      let bare = saturate(sc * 0.9);
      let lines = 0.5 + 0.5 * brush + 0.25 * brush2;
      s.albedo = mix(P.color.rgb * (0.94 + 0.1 * blotch + 0.04 * fine + 0.03 * lines) + vec3f(0.012) * haze, vec3f(0.6, 0.6, 0.62), bare);
      s.metal = mix(0.9, 1.0, bare);
      s.rough = mix(select(P.misc.y, 0.32, P.misc.y < 0.0) + 0.06 * (lines - 0.5) + 0.03 * fine + 0.1 * haze, 0.3, bare);
      s.height = 0.5 + 0.35 * brush + 0.12 * brush2 + 0.03 * fine - 0.3 * sc;
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
`,pi={concrete:{tileMeters:2,color:[.42,.41,.39],color2:[0,0,0],wear:.3,dirt:.5,roughness:-1,bumpMm:1.2,extra:0},wood:{tileMeters:1,color:[.52,.34,.18],color2:[.32,.19,.09],wear:.4,dirt:.2,roughness:-1,bumpMm:.6,extra:0},anodized:{tileMeters:.25,color:[.035,.036,.038],color2:[0,0,0],wear:.25,dirt:0,roughness:.42,bumpMm:.02,extra:0},parkerized:{tileMeters:.25,color:[.055,.058,.056],color2:[0,0,0],wear:.2,dirt:0,roughness:-1,bumpMm:.03,extra:0},polymer:{tileMeters:.2,color:[.03,.03,.032],color2:[0,0,0],wear:0,dirt:.2,roughness:.62,bumpMm:.15,extra:0},paintedSteel:{tileMeters:.5,color:[.8,.8,.78],color2:[0,0,0],wear:.35,dirt:0,roughness:-1,bumpMm:.3,extra:0},ground:{tileMeters:4,color:[.24,.18,.12],color2:[.09,.11,.04],wear:0,dirt:0,roughness:-1,bumpMm:8,extra:0},gravel:{tileMeters:1.5,color:[.52,.5,.46],color2:[.3,.29,.28],wear:0,dirt:0,roughness:-1,bumpMm:9,extra:.5},brass:{tileMeters:.05,color:[.95,.73,.38],color2:[0,0,0],wear:.2,dirt:0,roughness:-1,bumpMm:.01,extra:0},paperTarget:{tileMeters:.45,color:[.75,.05,.03],color2:[0,0,0],wear:0,dirt:0,roughness:-1,bumpMm:.05,extra:0},rubber:{tileMeters:.1,color:[.025,.025,.025],color2:[0,0,0],wear:0,dirt:0,roughness:-1,bumpMm:.4,extra:1},webbing:{tileMeters:.05,color:[.12,.13,.1],color2:[0,0,0],wear:0,dirt:0,roughness:-1,bumpMm:.25,extra:0},cardboard:{tileMeters:.6,color:[.55,.4,.25],color2:[0,0,0],wear:0,dirt:.3,roughness:-1,bumpMm:.2,extra:0},bareSteel:{tileMeters:.5,color:[0,0,0],color2:[0,0,0],wear:.3,dirt:0,roughness:-1,bumpMm:.2,extra:0},grass:{tileMeters:1.5,color:[.055,.085,.022],color2:[.2,.17,.085],wear:0,dirt:0,roughness:-1,bumpMm:10,extra:0},nitride:{tileMeters:.12,color:[.028,.029,.032],color2:[0,0,0],wear:.2,dirt:0,roughness:-1,bumpMm:.015,extra:0},machined:{tileMeters:.06,color:[.62,.62,.63],color2:[0,0,0],wear:.15,dirt:0,roughness:-1,bumpMm:.01,extra:1},skin:{tileMeters:.05,color:[.56,.33,.24],color2:[0,0,0],wear:0,dirt:0,roughness:-1,bumpMm:.12,extra:0},glove:{tileMeters:.04,color:[.045,.043,.04],color2:[0,0,0],wear:.35,dirt:.1,roughness:-1,bumpMm:.12,extra:0},brushed:{tileMeters:.1,color:[.03,.031,.034],color2:[0,0,0],wear:.2,dirt:0,roughness:-1,bumpMm:.006,extra:0}},Pa=class{constructor(e,t){this.dev=e;this.tex=t;this.pipeline=e.device.createComputePipeline({layout:"auto",compute:{module:e.shader(fi,"material-synth"),entryPoint:"main"}})}pipeline;cache=new Map;generate(e,t={}){let r={...pi[e],...t,size:t.size??1024,seed:t.seed??1},s=JSON.stringify([e,r]),i=this.cache.get(s);if(i)return i;let o=this.dev.device,c=r.size,l=T=>o.createTexture({size:[c,c],format:"rgba8unorm",usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.COPY_SRC,label:T}),b=l(`${e}.albedo.tmp`),d=l(`${e}.normal.tmp`),m=l(`${e}.orm.tmp`),u=new ArrayBuffer(64),y=new Uint32Array(u),p=new Float32Array(u);y[0]=hi[e],y[1]=r.seed>>>0,y[2]=c,p.set([...r.color,r.wear],4),p.set([...r.color2,r.dirt],8),p.set([r.tileMeters,r.roughness,r.bumpMm,r.extra],12);let w=this.dev.createBuffer(64,GPUBufferUsage.UNIFORM,"synth.params",new Uint8Array(u)),x=o.createBindGroup({layout:this.pipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:w}},{binding:1,resource:b.createView()},{binding:2,resource:d.createView()},{binding:3,resource:m.createView()}]}),M=nt(c),v=(T,z)=>o.createTexture({size:[c,c],format:z,mipLevelCount:M,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT,label:T}),g=v(`${e}.albedo`,"rgba8unorm-srgb"),k=v(`${e}.normal`,"rgba8unorm"),h=v(`${e}.orm`,"rgba8unorm"),A=o.createCommandEncoder({label:`synth ${e}`}),P=A.beginComputePass();P.setPipeline(this.pipeline),P.setBindGroup(0,x),P.dispatchWorkgroups(Math.ceil(c/8),Math.ceil(c/8)),P.end(),A.copyTextureToTexture({texture:b},{texture:g},[c,c]),A.copyTextureToTexture({texture:d},{texture:k},[c,c]),A.copyTextureToTexture({texture:m},{texture:h},[c,c]),this.tex.mipgen.generate(g,"color",A),this.tex.mipgen.generate(k,"normal",A),this.tex.mipgen.generate(h,"color",A),o.queue.submit([A.finish()]),o.queue.onSubmittedWorkDone().then(()=>{b.destroy(),d.destroy(),m.destroy(),w.destroy()});let S={albedo:g,normal:k,orm:h,tileMeters:r.tileMeters};return this.cache.set(s,S),S}material(e,t={},a={}){let r=this.generate(e,t),s=1/r.tileMeters;return new xe({name:a.name??e,baseColorMap:r.albedo,normalMap:r.normal,ormMap:r.orm,baseColor:[1,1,1,1],roughness:1,metallic:1,uvScale:[s,s],...a})}};var gi={enabled:!0,mode:"volumetric",quality:"auto",coverage:.45,type:.55,density:32,altitude:1500,thickness:1900,featureScale:7e3,shapeScale:5200,detailScale:520,windFactor:2.5,windVeer:25,shadowStrength:1,ambient:1,multiScatter:1.6,albedo:.97},yi={low:{dome:256,steps:40,lightSteps:3,updateDiv:2,shadow:192,shadowSteps:8,baseNoise:64,detailNoise:32},medium:{dome:384,steps:64,lightSteps:5,updateDiv:4,shadow:384,shadowSteps:16,baseNoise:128,detailNoise:32},high:{dome:640,steps:96,lightSteps:6,updateDiv:4,shadow:512,shadowSteps:24,baseNoise:128,detailNoise:32}},Ar=64,Qt=512,Zt=48e3,fn=3600,Sa=1.2,Pr=128;function vi(n){let e=n.info,t=`${e?.vendor??""} ${e?.architecture??""} ${e?.device??""} ${e?.description??""}`.toLowerCase();return/swiftshader|lavapipe|llvmpipe|software/.test(t)||!!n.isFallbackAdapter}var za=`
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
`,xi=za+`
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
`,wi=za+`
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
`,Mi=za+`
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
`,pn=za+`
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
`,ki=pn+`
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
`,Ai=pn+`
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
`,Pi=`
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
`,Ta=class{settings={...gi};dome;shadow;resourceVersion=0;domeRadius=Sa;dev;tex;skyCube;preset;presetName="";baseNoise;detailNoise;weather;domeWork;ubuf;blobBuf;weatherU;compU;pipeBase;pipeDetail;pipeWeather;pipeDome;pipeShadow;pipeComposite;bgDome=null;bgShadow=null;bgWeather;sampRepeat;sampClamp;blobs=[];blobId=1;blobsDirty=!0;weatherKey="";domeKey="";frame=0;sinceComposite=1e9;drift=[0,0];lastCam=[0,100,0];software;u=new Float32Array(48);constructor(e,t,a){this.dev=e,this.tex=t,this.skyCube=a,this.software=vi(e.adapter);let r=e.device,s=(d,m)=>r.createComputePipeline({label:m,layout:"auto",compute:{module:e.shader(d,m),entryPoint:"main"}});this.pipeBase=s(xi,"clouds.noise.base"),this.pipeDetail=s(wi,"clouds.noise.detail"),this.pipeWeather=s(Mi,"clouds.weather");let i=GPUShaderStage.COMPUTE,o=[{binding:0,visibility:i,buffer:{type:"uniform"}},{binding:1,visibility:i,texture:{viewDimension:"3d"}},{binding:2,visibility:i,texture:{viewDimension:"3d"}},{binding:3,visibility:i,texture:{}},{binding:4,visibility:i,sampler:{}},{binding:5,visibility:i,texture:{viewDimension:"cube"}},{binding:6,visibility:i,sampler:{}}],c=r.createBindGroupLayout({label:"clouds.dome",entries:[...o,{binding:7,visibility:i,storageTexture:{format:"rgba16float",access:"write-only"}},{binding:8,visibility:i,texture:{}}]}),l=r.createBindGroupLayout({label:"clouds.shadow",entries:[...o,{binding:7,visibility:i,storageTexture:{format:"rgba8unorm",access:"write-only"}}]}),b=(d,m,u)=>r.createComputePipeline({label:m,layout:r.createPipelineLayout({bindGroupLayouts:[u]}),compute:{module:e.shader(d,m),entryPoint:"main"}});this.pipeDome=b(ki,"clouds.dome",c),this.pipeShadow=b(Ai,"clouds.shadow",l),this.pipeComposite=s(Pi,"clouds.composite"),this.ubuf=e.createBuffer(192,GPUBufferUsage.UNIFORM,"clouds.u"),this.weatherU=e.createBuffer(32,GPUBufferUsage.UNIFORM,"clouds.weather.u"),this.compU=e.createBuffer(16,GPUBufferUsage.UNIFORM,"clouds.composite.u"),this.blobBuf=e.createBuffer(Ar*32,GPUBufferUsage.STORAGE,"clouds.blobs"),this.sampRepeat=r.createSampler({magFilter:"linear",minFilter:"linear",addressModeU:"repeat",addressModeV:"repeat",addressModeW:"repeat"}),this.sampClamp=r.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",addressModeW:"clamp-to-edge"}),this.weather=r.createTexture({size:[Qt,Qt],format:"rgba8unorm",usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING,label:"clouds.weather"}),this.bgWeather=r.createBindGroup({layout:this.pipeWeather.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.weatherU}},{binding:1,resource:{buffer:this.blobBuf}},{binding:2,resource:this.weather.createView()}]}),this.ensureResources()}get qualityPreset(){let e=this.settings.quality;return e!=="auto"?e:this.software?"low":"high"}get driftXZ(){return[this.drift[0],this.drift[1]]}addCloud(e){let t={id:this.blobId++,x:e.position[0]+this.drift[0],z:e.position[e.position.length>=3?2:1]+this.drift[1],size:e.size??900,density:e.density??1,mode:e.mode??this.settings.mode,type:e.type??this.settings.type};this.blobs.length>=Ar&&this.blobs.shift(),this.blobs.push(t),this.blobsDirty=!0;let a=this;return{id:t.id,set(r){r.position&&(t.x=r.position[0]+a.drift[0],t.z=r.position[r.position.length>=3?2:1]+a.drift[1]),r.size!==void 0&&(t.size=r.size),r.density!==void 0&&(t.density=r.density),r.mode&&(t.mode=r.mode),r.type!==void 0&&(t.type=r.type),a.blobsDirty=!0},remove(){let r=a.blobs.indexOf(t);r>=0&&(a.blobs.splice(r,1),a.blobsDirty=!0)}}}clearClouds(){this.blobs.length=0,this.blobsDirty=!0}get cloudCount(){return this.blobs.length}ensureResources(){let e=this.qualityPreset;if(e===this.presetName)return;this.presetName=e;let t=this.preset=yi[e],a=this.dev.device;this.baseNoise?.destroy(),this.detailNoise?.destroy(),this.dome?.destroy(),this.domeWork?.destroy(),this.shadow?.destroy();let r=(i,o)=>a.createTexture({size:[i,i,i],dimension:"3d",format:"rgba8unorm",usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING,label:o});this.baseNoise=r(t.baseNoise,"clouds.noise.base"),this.detailNoise=r(t.detailNoise,"clouds.noise.detail"),this.dome=a.createTexture({size:[t.dome,t.dome],format:"rgba16float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:"clouds.dome"}),this.domeWork=a.createTexture({size:[t.dome,t.dome],format:"rgba16float",usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.COPY_SRC,label:"clouds.dome.work"}),this.shadow=a.createTexture({size:[t.shadow,t.shadow],format:"rgba8unorm",usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING,label:"clouds.shadow"}),this.generateNoise();let s=(i,o)=>a.createBindGroup({layout:i.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.ubuf}},{binding:1,resource:this.baseNoise.createView()},{binding:2,resource:this.detailNoise.createView()},{binding:3,resource:this.weather.createView()},{binding:4,resource:this.sampRepeat},{binding:5,resource:this.skyCube.createView({dimension:"cube"})},{binding:6,resource:this.sampClamp},...o]});this.bgDome=s(this.pipeDome,[{binding:7,resource:this.domeWork.createView()},{binding:8,resource:this.dome.createView()}]),this.bgShadow=s(this.pipeShadow,[{binding:7,resource:this.shadow.createView()}]),this.domeKey="",this.resourceVersion++}generateNoise(){let e=this.dev.device,t=this.preset,a=e.createCommandEncoder({label:"clouds.noise"}),r=a.beginComputePass(),s=(i,o,c,l,b)=>{let d=this.dev.createBuffer(16,GPUBufferUsage.UNIFORM,b,new Float32Array([c,l,0,0]));r.setPipeline(i),r.setBindGroup(0,e.createBindGroup({layout:i.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:d}},{binding:1,resource:o.createView()}]}));let m=Math.ceil(c/4);r.dispatchWorkgroups(m,m,m)};s(this.pipeBase,this.baseNoise,t.baseNoise,t.baseNoise/128,"clouds.noise.base.u"),s(this.pipeDetail,this.detailNoise,t.detailNoise,1,"clouds.noise.detail.u"),r.end(),e.queue.submit([a.finish()])}updateWeather(e){let t=this.settings,a=`${t.coverage}|${t.type}|${t.featureScale}|${t.mode}|${this.blobs.length}`;if(!this.blobsDirty&&a===this.weatherKey)return!1;this.weatherKey=a,this.blobsDirty=!1;let r=this.dev.device,s=new Float32Array(Ar*8);this.blobs.forEach((o,c)=>s.set([o.x,o.z,o.size,o.density,o.mode==="flat"?1:0,o.type,0,0],c*8)),r.queue.writeBuffer(this.blobBuf,0,s),r.queue.writeBuffer(this.weatherU,0,new Float32Array([t.coverage,t.type,t.featureScale,t.mode==="flat"?1:0,Qt,Zt,this.blobs.length,7]));let i=e.beginComputePass({label:"clouds.weather"});return i.setPipeline(this.pipeWeather),i.setBindGroup(0,this.bgWeather),i.dispatchWorkgroups(Math.ceil(Qt/8),Math.ceil(Qt/8)),i.end(),!0}frameParams(){let e=this.settings,[t,a]=this.shadowCentre(this.lastCam,this.lastSun),r=1-.55*e.coverage*Math.min(1,e.density/25);return[t,a,1/(2*fn),e.enabled?1:0,r,e.altitude,e.shadowStrength,Sa]}lastSun=[0,1,0];shadowCentre(e,t){let a=Math.max(t[1],.05),r=(this.settings.altitude-e[1])/a;return[e[0]+t[0]*r,e[2]+t[2]*r]}update(e,t){let a=this.settings;this.ensureResources();let r=this.preset,s=this.dev.device;this.lastCam=[t.camPos[0],t.camPos[1],t.camPos[2]],this.lastSun=[t.sunDir[0],t.sunDir[1],t.sunDir[2]],this.drift[0]+=t.windAloft[0]*t.dt,this.drift[1]+=t.windAloft[1]*t.dt;for(let g=0;g<2;g++)this.drift[g]=(this.drift[g]%Zt+Zt)%Zt;let i=this.updateWeather(e),o=JSON.stringify([a.enabled,a.mode,a.density,a.altitude,a.thickness,a.shapeScale,a.detailScale,a.shadowStrength,a.ambient,a.multiScatter,a.albedo,t.skyKey,t.rayleigh,t.turbidity])+(i?`|${this.frame}`:""),c=o!==this.domeKey;this.domeKey=o;let l=c?1:r.updateDiv,b=this.frame%(l*l),[d,m]=l===1?[0,0]:l===2?Si[b]:Ti[b],[u,y]=this.shadowCentre(t.camPos,t.sunDir),p=this.u,w=a.altitude+a.thickness*.5;p.set([t.camPos[0],t.camPos[1],t.camPos[2],this.frame/60],0),p.set([t.sunDir[0],t.sunDir[1],t.sunDir[2],1],4),p.set([t.sunRGB[0],t.sunRGB[1],t.sunRGB[2],a.albedo],8),p.set([a.altitude,a.thickness,a.shapeScale*(r.baseNoise/128),a.detailScale],12),p.set([a.density/1e3,1,a.type,a.mode==="flat"?1:0],16),p.set([this.drift[0],this.drift[1],this.drift[0]*1.25+this.frame*.15,this.drift[1]*1.25+this.frame*.07],20),p.set([1/Zt,w,a.shapeScale*.5,a.density*a.thickness*.5/1e3*.12],24),p.set([r.dome,Sa,c?1:.55,this.frame],28),p.set([r.steps,r.lightSteps,6e4,l],32),p.set([t.rayleigh,t.turbidity,a.multiScatter,a.ambient],36),p.set([u,y,1/(2*fn),r.shadowSteps],40),p.set([d,m,r.shadow,a.enabled?1:0],44),s.queue.writeBuffer(this.ubuf,0,p);let x=e.beginComputePass({label:"clouds"});x.setPipeline(this.pipeDome),x.setBindGroup(0,this.bgDome);let M=Math.ceil(r.dome/l/8);x.dispatchWorkgroups(M,M),x.setPipeline(this.pipeShadow),x.setBindGroup(0,this.bgShadow),x.dispatchWorkgroups(Math.ceil(r.shadow/8),Math.ceil(r.shadow/8)),x.end(),e.copyTextureToTexture({texture:this.domeWork},{texture:this.dome},[r.dome,r.dome]),this.frame++,this.sinceComposite++;let v=c||this.sinceComposite>300;return v&&(this.sinceComposite=0),v}compositeEnv(e,t){let a=this.dev.device;a.queue.writeBuffer(this.compU,0,new Float32Array([Pr,Sa,0,0]));let r=e.beginComputePass({label:"clouds.composite"});r.setPipeline(this.pipeComposite),r.setBindGroup(0,a.createBindGroup({layout:this.pipeComposite.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.compU}},{binding:1,resource:this.skyCube.createView({dimension:"cube"})},{binding:2,resource:this.dome.createView()},{binding:3,resource:this.sampClamp},{binding:4,resource:t.createView({dimension:"2d-array",baseMipLevel:0,mipLevelCount:1})}]})),r.dispatchWorkgroups(Math.ceil(Pr/8),Math.ceil(Pr/8),6),r.end()}};var Si=[[0,0],[1,1],[1,0],[0,1]],Ti=[[0,0],[2,2],[2,0],[0,2],[1,1],[3,3],[3,1],[1,3],[1,0],[3,2],[3,0],[1,2],[0,1],[2,3],[2,1],[0,3]];var zi={sunElevation:38,sunAzimuth:130,sunIlluminance:128e3,sunAngularDiameter:.53,turbidity:1,rayleigh:1,ozone:1,mieG:.8,groundAlbedo:.18,altitude:100,multiScatter:1.25},Ra=636e4,Ri=646e4,Li=[5802e-9,13558e-9,331e-7];var Ii=44e-7,ji=[65e-8,1881e-9,85e-9],Gi=8e3,Fi=1200;function yn(n){let e=n.sunElevation*Math.PI/180,t=n.sunAzimuth*Math.PI/180;return[Math.cos(e)*Math.sin(t),Math.sin(e),-Math.cos(e)*Math.cos(t)]}function Ui(n,e,t,a){let r=n*e,s=n*n-a*a,i=r*r-s;return i<0?-1:-r+Math.sqrt(i)}function gn(n){let e=yn(n),t=Ra+n.altitude;if((()=>{let b=t*e[1],d=t*t-Ra*Ra,m=b*b-d;if(m<0)return-1;let u=-b-Math.sqrt(m);return u>0?u:-1})()>0)return[0,0,0];let r=Ui(t,e[1],0,Ri),s=64,i=r/s,o=0,c=0,l=0;for(let b=0;b<s;b++){let d=(b+.5)*i,m=e[0]*d,u=t+e[1]*d,y=e[2]*d,p=Math.hypot(m,u,y)-Ra;o+=Math.exp(-p/Gi)*i,c+=Math.exp(-p/Fi)*i,l+=Math.max(0,1-Math.abs(p-25e3)/15e3)*i}return[0,1,2].map(b=>Math.exp(-(Li[b]*n.rayleigh*o+Ii*n.turbidity*c+ji[b]*n.ozone*l)))}var Ei=`
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
`,La=class{constructor(e,t,a=128){this.dev=e;this.tex=t;this.size=a,this.pipeline=e.device.createComputePipeline({layout:"auto",compute:{module:e.shader(Ei,"sky"),entryPoint:"main"}}),this.ubuf=e.createBuffer(64,GPUBufferUsage.UNIFORM,"sky.u");let r=s=>({size:[a,a,6],format:"rgba16float",mipLevelCount:nt(a),usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.RENDER_ATTACHMENT,label:s});this.cube=e.device.createTexture(r("sky.cube")),this.envCube=e.device.createTexture(r("sky.env")),this.bg=e.device.createBindGroup({layout:this.pipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.ubuf}},{binding:1,resource:this.cube.createView({dimension:"2d-array",baseMipLevel:0,mipLevelCount:1})}]}),this.clouds=new Ta(e,t,this.cube)}settings={...zi};cube;envCube;clouds;size;pipeline;ubuf;bg;version=0;envVersion=0;lastKey="";lastView={camPos:[0,100,0],dt:0};get sunDir(){return yn(this.settings)}sunIlluminanceRGB(){let e=gn(this.settings),t=this.settings.sunIlluminance;return[e[0]*t,e[1]*t,e[2]*t]}sunIlluminanceAt(e){let t=gn({...this.settings,altitude:e}),a=this.settings.sunIlluminance;return[t[0]*a,t[1]*a,t[2]*a]}addCloud(e){return this.clouds.addCloud(e)}get atmosphereKey(){let e=this.settings;return[e.sunElevation,e.sunAzimuth,e.sunIlluminance,e.turbidity,e.rayleigh,e.ozone,e.mieG,e.altitude].join("|")}update(e,t){t&&(this.lastView=t);let a=this.lastView,r=e??this.dev.device.createCommandEncoder({label:"sky"}),s=JSON.stringify(this.settings),i=!1;s!==this.lastKey&&(this.lastKey=s,this.bakeAtmosphere(r),i=!0);let o=this.settings,c=this.clouds.settings,l=this.clouds.update(r,{camPos:a.camPos,dt:a.dt,sunDir:this.sunDir,sunRGB:this.sunIlluminanceAt(c.altitude+c.thickness*.5),rayleigh:o.rayleigh,turbidity:o.turbidity,skyKey:this.atmosphereKey,windAloft:a.windAloft??[0,0]}),b=!1;return(i||l||this.envVersion===0)&&(this.clouds.compositeEnv(r,this.envCube),this.tex.mipgen.generate(this.envCube,"color",r),this.envVersion++,b=!0),e||this.dev.device.queue.submit([r.finish()]),b}bakeAtmosphere(e){let t=this.settings,a=this.sunDir,r=this.sunIlluminanceRGB(),s=Math.max(0,a[1]),i=.12*t.sunIlluminance*Math.max(.02,Math.sin(Math.max(a[1],.02)))*(.8+.2*t.turbidity),o=[r[0]*s+i*.85,r[1]*s+i*.95,r[2]*s+i*1.15],c=new Float32Array([a[0],a[1],a[2],t.sunIlluminance,t.rayleigh,t.turbidity,t.ozone,t.mieG,t.groundAlbedo,t.altitude,t.multiScatter,this.size,o[0],o[1],o[2],0]);this.dev.device.queue.writeBuffer(this.ubuf,0,c);let l=e.beginComputePass({label:"sky bake"});l.setPipeline(this.pipeline),l.setBindGroup(0,this.bg),l.dispatchWorkgroups(Math.ceil(this.size/8),Math.ceil(this.size/8),6),l.end(),this.tex.mipgen.generate(this.cube,"color",e),this.version++}};var Oi={speed:1.7,direction:111,gustiness:.35,gustFrequency:.12,turbulence:.25,foliageBend:.045,aloftFactor:2.5,aloftVeer:25};function $t(n,e){let t=Math.floor(n),a=n-t,r=c=>{let l=Math.sin((c+e*131.7)*12.9898)*43758.5453;return(l-Math.floor(l))*2-1},s=a*a*a*(a*(a*6-15)+10),i=r(t)*a,o=r(t+1)*(a-1);return(i+(o-i)*s)*2}function vn(n,e){return($t(n,e)*.5+$t(n*2.13+7.7,e+1)*.3+$t(n*4.7+3.1,e+2)*.2)/.78}var Ia=class{settings={...Oi};vector=f.create();direction=f.create(0,0,-1);gustFactor=1;onGust=[];onSettingsChanged=null;time=0;lastKey="";inGust=!1;constructor(e={}){Object.assign(this.settings,e),this.update(0)}get speed(){return f.length(this.vector)}set(e){let{direction:t,...a}=e;if(Object.assign(this.settings,a),typeof t=="number")this.settings.direction=t;else if(t){let r=t[0],s=t.length>=3?t[2]:t[1];this.settings.direction=Math.atan2(r,-s)*180/Math.PI,e.speed===void 0&&(this.settings.speed=Math.hypot(r,s))}return this.update(0),this}gust(e){let t=this.settings,a=vn(e*t.gustFrequency,3),r=Math.pow(Math.max(0,a-.15)/.85,1.6);return Math.max(.15,1+t.gustiness*(.45*a+1.25*r))}heading(e){let t=this.settings;return t.direction+t.gustiness*22*vn(e*t.gustFrequency*.6+50,11)}aloft(e,t=f.create()){let a=this.settings,r=Math.min(1,Math.max(0,e)/1500)**.4,s=a.speed*(1+(a.aloftFactor-1)*r),i=(a.direction+a.aloftVeer*r)*Math.PI/180;return f.set(t,Math.sin(i)*s,0,-Math.cos(i)*s)}update(e){this.time+=e;let t=this.settings,a=this.time,r=this.gust(a),s=this.heading(a)*Math.PI/180,i=t.speed*r,o=t.turbulence*t.speed*.18,c=$t(a*3.1,21)*o,l=$t(a*2.7+9,22)*o;f.set(this.direction,Math.sin(s),0,-Math.cos(s)),f.set(this.vector,this.direction[0]*i+c,0,this.direction[2]*i+l),this.gustFactor=r;let b=Math.min(1,Math.max(0,(r-1)/Math.max(.001,1.7*t.gustiness)));if(!this.inGust&&b>.3){this.inGust=!0;for(let m of this.onGust)m(b,this.vector)}else this.inGust&&b<.12&&(this.inGust=!1);let d=`${t.speed}|${t.gustiness}|${t.gustFrequency}|${t.turbulence}`;d!==this.lastKey&&(this.lastKey=d,this.onSettingsChanged?.(t))}};var Sr=`
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
`,Ni=Sr+`
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
`,Ci=Sr+`
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
`,Bi=Sr+`
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
`,ja=class{constructor(e,t=128,a=96){this.dev=e;this.size=t;let r=e.device;this.mips=Math.min(nt(t),6),this.specular=r.createTexture({size:[t,t,6],format:"rgba16float",mipLevelCount:this.mips,usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING,label:"ibl.specular"}),this.sh=e.createBuffer(144,GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC,"ibl.sh"),this.brdfLut=r.createTexture({size:[128,128],format:"rgba16float",usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING,label:"brdf.lut"}),this.sampler=r.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"linear"}),this.prefilter=r.createComputePipeline({layout:"auto",compute:{module:e.shader(Ni,"ibl-prefilter"),entryPoint:"main"}}),this.shPipe=r.createComputePipeline({layout:"auto",compute:{module:e.shader(Ci,"ibl-sh"),entryPoint:"main"}});for(let c=0;c<this.mips;c++){let l=c/(this.mips-1),b=Math.max(1,t>>c);this.uniforms.push(e.createBuffer(16,GPUBufferUsage.UNIFORM,`ibl.u${c}`,new Float32Array([l,b,t,c===0?1:a])))}let s=r.createComputePipeline({layout:"auto",compute:{module:e.shader(Bi,"dfg"),entryPoint:"main"}}),i=r.createCommandEncoder({label:"dfg"}),o=i.beginComputePass();o.setPipeline(s),o.setBindGroup(0,r.createBindGroup({layout:s.getBindGroupLayout(0),entries:[{binding:0,resource:this.brdfLut.createView()}]})),o.dispatchWorkgroups(16,16),o.end(),r.queue.submit([i.finish()])}specular;sh;brdfLut;mips;prefilter;shPipe;sampler;uniforms=[];update(e,t){let a=this.dev.device,r=e.createView({dimension:"cube"}),s=t.beginComputePass({label:"ibl"});s.setPipeline(this.prefilter);for(let i=0;i<this.mips;i++){let o=Math.max(1,this.size>>i);s.setBindGroup(0,a.createBindGroup({layout:this.prefilter.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniforms[i]}},{binding:1,resource:r},{binding:2,resource:this.sampler},{binding:3,resource:this.specular.createView({dimension:"2d-array",baseMipLevel:i,mipLevelCount:1})}]})),s.dispatchWorkgroups(Math.ceil(o/8),Math.ceil(o/8),6)}s.setPipeline(this.shPipe),s.setBindGroup(0,a.createBindGroup({layout:this.shPipe.getBindGroupLayout(0),entries:[{binding:0,resource:r},{binding:1,resource:this.sampler},{binding:2,resource:{buffer:this.sh}}]})),s.dispatchWorkgroups(1),s.end()}};var xn={enabled:!0,cascades:4,resolution:2048,distance:160,splitLambda:.82,casterExtent:120,constantBias:8e-5,slopeBias:1.6,normalBias:1.4,maxPenumbraTexels:14,blockerSamples:12,pcfSamples:20,blendFraction:.12},ea=f.create();function wn(n,e,t,a){let r=Math.max(1,Math.min(4,a.cascades)),s=Math.max(n.near,.05),i=a.distance,o=[];for(let x=1;x<=r;x++){let M=x/r,v=s*Math.pow(i/s,M),g=s+(i-s)*M;o.push(a.splitLambda*v+(1-a.splitLambda)*g)}let c=Math.tan(n.fovY/2),l=c*e,b={viewProj:[],splits:o,texelWorld:[],depthRange:[]},d=n.forward(),m=n.up(),u=n.right(),y=f.normalize(f.create(),t),p=Math.abs(y[1])>.99?f.create(0,0,1):f.create(0,1,0),w=s;for(let x=0;x<r;x++){let M=w,v=o[x];w=v;let g=l*l+c*c,k=.5*(M+v)*(1+g);k=Math.min(k,v);let h=Math.hypot(k-M,M*Math.sqrt(g)),A=Math.hypot(v-k,v*Math.sqrt(g)),P=Math.max(h,A)*1.02,S=f.scaleAndAdd(f.create(),n.position,d,k),T=a.resolution,z=2*P/T,L=U.lookAt(U.create(),y,[0,0,0],p);f.transformMat4(ea,S,L);let I=Math.round(ea[0]/z)*z,G=Math.round(ea[1]/z)*z,j=-ea[2]-P-a.casterExtent,R=-ea[2]+P,F=R-j,N=U.orthoZO(U.create(),I-P,I+P,G-P,G+P,j,R),C=U.multiply(U.create(),N,L);b.viewProj.push(C),b.texelWorld.push(z),b.depthRange.push(F)}return b}var Di=0,Te=class{id=++Di;mesh;material;transform=U.create();prevTransform=U.create();visible=!0;castShadow=!0;viewmodel=!1;joints=null;_skin=null;instances=null;instanceCount=0;instancesDirty=!1;_inst=null;instBounds=null;worldBounds=rt.create();first=!0;userData=null;constructor(e,t,a){this.mesh=e,this.material=t,a&&(U.copy(this.transform,a),U.copy(this.prevTransform,a))}setTransform(e){U.copy(this.transform,e)}setInstances(e,t=e.length/16){this.instances=e,this.instanceCount=t,this.instancesDirty=!0;let a=rt.create(),r=rt.create();for(let s=0;s<t;s++){rt.transform(r,this.mesh.bounds,e.subarray(s*16,s*16+16));for(let i=0;i<3;i++)a.min[i]=Math.min(a.min[i],r.min[i]),a.max[i]=Math.max(a.max[i],r.max[i])}this.instBounds=a}_endFrame(){U.copy(this.prevTransform,this.transform),this.first=!1}_beginFrame(){this.first&&U.copy(this.prevTransform,this.transform),rt.transform(this.worldBounds,this.instances&&this.instBounds?this.instBounds:this.mesh.bounds,this.transform)}resetHistory(){this.first=!0}};var Ga=class{position=f.create(0,1.7,0);rotation=X.create();fovY=70*ut;viewmodelFovY=55*ut;near=.04;aperture=8;shutter=1/250;iso=100;view=U.create();world=U.create();updateMatrices(){U.fromRotationTranslation(this.world,this.rotation,this.position),U.invert(this.view,this.world)}forward(e=f.create()){return f.transformQuat(e,[0,0,-1],this.rotation)}up(e=f.create()){return f.transformQuat(e,[0,1,0],this.rotation)}right(e=f.create()){return f.transformQuat(e,[1,0,0],this.rotation)}setFocalLength(e,t=24){this.fovY=2*Math.atan(t/(2*e))}},Fa=class{objects=new Set;lights=new Set;add(e){return this.objects.add(e),e}remove(e){this.objects.delete(e)}addLight(e){return this.lights.add(e),e}removeLight(e){this.lights.delete(e)}};var jt=`
const PI: f32 = 3.14159265359;
const INV_PI: f32 = 0.31830988618;
const HALF_MAX: f32 = 60000.0;
`,Gt=`
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
`,wt=`
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
`,ta=`
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
`,Ua=`
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
`,aa=`
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
`,Ea=`
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
`,Mn=`
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
`;var Vi=jt+Gt+wt+ta+aa+`
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
`;function Hi(n){let t=new Uint8Array(n*n*4*4),a=ft(1234),r=new Float32Array(4096).map(()=>a.next()),s=(o,c)=>{let l=Math.floor(o),b=Math.floor(c),d=o-l,m=c-b,u=(w,x)=>r[(x&63)*64+(w&63)],y=d*d*(3-2*d),p=m*m*(3-2*m);return(u(l,b)*(1-y)+u(l+1,b)*y)*(1-p)+(u(l,b+1)*(1-y)+u(l+1,b+1)*y)*p},i=(o,c)=>{let l=0,b=.5,d=1;for(let m=0;m<5;m++)l+=b*s(o*d,c*d),b*=.5,d*=2;return l};for(let o=0;o<4;o++)for(let c=0;c<n;c++)for(let l=0;l<n;l++){let b=(l+.5)/n*2-1,d=(c+.5)/n*2-1,m=Math.hypot(b,d),u=0,y=255;if(o===0){let w=i(b*2.2+5,d*2.2+3);u=Math.max(0,Math.min(1,(1-m*m)*1.2))*Math.max(0,Math.min(1,w*1.8-.25)),y=Math.round(200+55*w)}else if(o===1){let w=Math.atan2(d,b),x=Math.pow(Math.abs(Math.cos(w*2.5)),6)*.6+Math.pow(Math.abs(Math.cos(w*4+.6)),10)*.4,M=i(b*4+11,d*4+7),v=.25+.75*x*(.6+.6*M);u=Math.max(0,1-m/v)**1.5+Math.max(0,1-m/.25)**2,u=Math.min(1,u),y=255}else if(o===2)u=Math.exp(-(d*d)*40)*Math.max(0,1-Math.abs(b)),y=255;else{let w=i(b*5+21,d*5+13);u=Math.max(0,1-m)**1.4*Math.max(0,w*1.6-.35),y=Math.round(180+75*w)}let p=((o*n+c)*n+l)*4;t[p]=y,t[p+1]=y,t[p+2]=y,t[p+3]=Math.round(Math.max(0,Math.min(1,u))*255)}return t}var Oa=class{constructor(e){this.dev=e;this.instanceBuffer=e.createBuffer(this.capacity*64,GPUBufferUsage.VERTEX,"particles.inst");let t=128;this.atlas=e.device.createTexture({size:[t,t,4],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:"particle.atlas"}),e.device.queue.writeTexture({texture:this.atlas},Hi(t),{bytesPerRow:t*4,rowsPerImage:t},[t,t,4]),this.sampler=e.device.createSampler({magFilter:"linear",minFilter:"linear"})}particles=[];maxParticles=4096;wind=f.create(1.5,0,.5);instanceBuffer;capacity=1024;data=new Float32Array(1024*16);atlas;sampler;pipeline=null;bg=null;bgDepth=null;random=ft(77);count=0;get random01(){return this.random.next()}spawn(e){this.particles.length>=this.maxParticles&&this.particles.shift(),this.particles.push({kind:e.kind,pos:Float32Array.from(e.position),vel:Float32Array.from(e.velocity??[0,0,0]),life:e.life,size0:e.size0,size1:e.size1,color:e.color??[1,1,1],alpha0:e.alpha0??1,alpha1:e.alpha1??0,luminance:e.luminance??0,rotation:e.rotation??this.random.next()*Math.PI*2,spin:e.spin??0,drag:e.drag??0,gravity:e.gravity??0,buoyancy:e.buoyancy??0,stretch:e.stretch??0,layer:e.layer??(e.kind===2?2:e.kind),fadeIn:e.fadeIn??.05,age:0,fresh:!0})}update(e){let t=this.particles,a=0;for(let r=0;r<t.length;r++){let s=t[r];if(s.fresh){s.fresh=!1,t[a++]=s;continue}if(s.age+=e,s.age>=s.life)continue;let i=s.kind===0||s.kind===3?1:0;for(let o=0;o<3;o++){let c=s.vel[o]-this.wind[o]*i;s.vel[o]-=c*Math.min(1,s.drag*e)}s.vel[1]+=(s.buoyancy-s.gravity)*e,s.pos[0]+=s.vel[0]*e,s.pos[1]+=s.vel[1]*e,s.pos[2]+=s.vel[2]*e,s.rotation+=s.spin*e,t[a++]=s}t.length=a}upload(e){let t=this.particles,a=t.length;a>this.capacity&&(this.capacity=Math.ceil(a*1.5),this.instanceBuffer.destroy(),this.instanceBuffer=this.dev.createBuffer(this.capacity*64,GPUBufferUsage.VERTEX,"particles.inst"),this.data=new Float32Array(this.capacity*16));let r=i=>(i.pos[0]-e[0])**2+(i.pos[1]-e[1])**2+(i.pos[2]-e[2])**2;t.sort((i,o)=>r(o)-r(i));let s=this.data;for(let i=0;i<a;i++){let o=t[i],c=i*16,l=o.age/o.life,b=Math.min(1,l/Math.max(o.fadeIn,.001)),d=o.size0+(o.size1-o.size0)*Math.sqrt(l),m=(o.alpha0+(o.alpha1-o.alpha0)*l)*b;s[c]=o.pos[0],s[c+1]=o.pos[1],s[c+2]=o.pos[2],s[c+3]=d,s[c+4]=o.color[0],s[c+5]=o.color[1],s[c+6]=o.color[2],s[c+7]=m,s[c+8]=o.rotation,s[c+9]=o.kind,s[c+10]=o.luminance*(1-l)*(1-l),s[c+11]=o.stretch,s[c+12]=o.vel[0],s[c+13]=o.vel[1],s[c+14]=o.vel[2],s[c+15]=o.layer}return a&&this.dev.device.queue.writeBuffer(this.instanceBuffer,0,s,0,a*16),this.count=a,a}createPipeline(e,t){let a=this.dev.device,r=this.dev.shader(Vi,"particles"),s=a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d-array"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"depth"}}]});return this.pipeline=a.createRenderPipeline({label:"particles",layout:a.createPipelineLayout({bindGroupLayouts:[e,s]}),vertex:{module:r,entryPoint:"vs",buffers:[{arrayStride:64,stepMode:"instance",attributes:[{shaderLocation:0,offset:0,format:"float32x4"},{shaderLocation:1,offset:16,format:"float32x4"},{shaderLocation:2,offset:32,format:"float32x4"},{shaderLocation:3,offset:48,format:"float32x4"}]}]},fragment:{module:r,entryPoint:"fs",targets:[{format:t,blend:{color:{srcFactor:"one",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"triangle-strip"},depthStencil:{format:"depth32float",depthWriteEnabled:!1,depthCompare:"greater-equal"}}),this.bg=null,s}draw(e,t){!this.pipeline||this.count===0||((!this.bg||this.bgDepth!==t)&&(this.bg=this.dev.device.createBindGroup({layout:this.pipeline.getBindGroupLayout(1),entries:[{binding:0,resource:this.atlas.createView({dimension:"2d-array"})},{binding:1,resource:this.sampler},{binding:2,resource:t.createView()}]}),this.bgDepth=t),e.setPipeline(this.pipeline),e.setBindGroup(1,this.bg),e.setVertexBuffer(0,this.instanceBuffer),e.draw(4,this.count))}};var Wi=jt+Gt+wt+ta+Ua+aa+`
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
`;function qi(n){let t=new Uint8Array(n*n*4*6),a=new Uint8Array(n*n*4*6),r=ft(99),s=Array.from({length:64},()=>r.next());for(let i=0;i<6;i++){let o=new Float32Array(n*n);for(let l=0;l<n;l++)for(let b=0;b<n;b++){let d=(b+.5)/n*2-1,m=(l+.5)/n*2-1,u=Math.hypot(d,m),y=Math.atan2(m,d),p=1+.18*(s[Math.floor((y+Math.PI)/(2*Math.PI)*63)]-.5)*2,w=[0,0,0],x=0,M=0,v=.6;switch(i){case 0:{let k=u<.14*p,h=u<.32*p,A=u<.62*p;k?(w=[.16,.16,.17],x=1,M=-.6,v=.55):h?(w=[.78,.79,.8],x=1,M=-.15+.15*Math.cos(u*30),v=.22):A&&(w=[.22,.21,.2],x=Math.min(1,(.62*p-u)*12),M=-.05,v=.5);break}case 1:{let k=u<.12*p,h=Math.abs(Math.sin(y*7+s[3]*6))>.6&&u<.45*p;k?(w=[.02,.015,.01],x=1,M=-1,v=.95):h?(w=[.75,.6,.42],x=Math.min(1,(.45*p-u)*6),M=.2,v=.75):u<.25*p&&(w=[.3,.2,.12],x=.8,M=-.2,v=.8);break}case 2:{u<.3*p?(w=[.62,.61,.58],x=1,M=-.8*(1-u/(.3*p)),v=.95):u<.75&&(w=[.58,.57,.54],x=Math.max(0,.6*(1-(u-.3)/.45)),M=0,v=.95);break}case 3:{u<.2?(w=[.01,.01,.01],x=1,M=-1,v=1):u<.27&&(w=[.25,.25,.26],x=.85,M=0,v=.8);break}case 4:{let k=Math.pow(Math.abs(Math.cos(y*9+s[7]*5)),4);u<.18?(w=[.55,.55,.57],x=1,M=.2,v=.35):u<(.3+.6*k)*p&&(w=[.5,.5,.52],x=Math.max(0,1-u)*.9,M=.05,v=.4);break}default:u<.7*p&&(w=[.12,.09,.06],x=Math.max(0,1-u/(.7*p))*.9,M=-.3*(1-u),v=1)}o[l*n+b]=M;let g=((i*n+l)*n+b)*4;t[g]=Math.round(Math.pow(w[0],1/2.2)*255),t[g+1]=Math.round(Math.pow(w[1],1/2.2)*255),t[g+2]=Math.round(Math.pow(w[2],1/2.2)*255),t[g+3]=Math.round(Math.max(0,Math.min(1,x))*255),a[g+3]=Math.round(v*255)}let c=6;for(let l=0;l<n;l++)for(let b=0;b<n;b++){let d=o[l*n+Math.min(n-1,b+1)]-o[l*n+Math.max(0,b-1)],m=o[Math.min(n-1,l+1)*n+b]-o[Math.max(0,l-1)*n+b],u=-d*c,y=m*c,p=1,w=Math.hypot(u,y,p);u/=w,y/=w,p/=w;let x=((i*n+l)*n+b)*4;a[x]=Math.round((u*.5+.5)*255),a[x+1]=Math.round((y*.5+.5)*255),a[x+2]=Math.round((p*.5+.5)*255)}}return{albedo:t,normal:a,layers:6}}var Na=class{constructor(e){this.dev=e;this.buffer=e.createBuffer(this.capacity*80,GPUBufferUsage.VERTEX,"decals.inst");let t=128,a=qi(t),r=(s,i,o)=>{let c=e.device.createTexture({size:[t,t,a.layers],format:s,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:o});return e.device.queue.writeTexture({texture:c},i,{bytesPerRow:t*4,rowsPerImage:t},[t,t,a.layers]),c};this.albedo=r("rgba8unorm-srgb",a.albedo,"decal.albedo"),this.normal=r("rgba8unorm",a.normal,"decal.normal"),this.sampler=e.device.createSampler({magFilter:"linear",minFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"})}decals=[];maxDecals=512;buffer;capacity=512;data=new Float32Array(512*20);albedo;normal;sampler;pipeline=null;bg=null;count=0;tmp=U.create();add(e,t,a,r,s=null,i=[1,1,1],o=Math.random()*Math.PI*2){let c=f.normalize(f.create(),f.clone(a)),l=Math.abs(c[1])>.95?f.create(1,0,0):f.create(0,1,0),b=f.normalize(f.create(),f.cross(f.create(),l,c)),d=f.cross(f.create(),c,b),m=Math.cos(o),u=Math.sin(o),y=f.create(b[0]*m+d[0]*u,b[1]*m+d[1]*u,b[2]*m+d[2]*u),p=f.cross(f.create(),c,y),w=.0015,x=U.create();x[0]=y[0]*r,x[1]=y[1]*r,x[2]=y[2]*r,x[4]=p[0]*r,x[5]=p[1]*r,x[6]=p[2]*r,x[8]=c[0],x[9]=c[1],x[10]=c[2],x[12]=t[0]+c[0]*w,x[13]=t[1]+c[1]*w,x[14]=t[2]+c[2]*w;let M=x;if(s){let v=U.invert(U.create(),s.transform);M=U.multiply(U.create(),v,x)}this.decals.length>=this.maxDecals&&this.decals.shift(),this.decals.push({local:M,parent:s,kind:e,tint:i,age:0})}clear(){this.decals.length=0}upload(){let e=this.decals.length;e>this.capacity&&(this.capacity=Math.ceil(e*1.5),this.buffer.destroy(),this.buffer=this.dev.createBuffer(this.capacity*80,GPUBufferUsage.VERTEX,"decals.inst"),this.data=new Float32Array(this.capacity*20));for(let t=0;t<e;t++){let a=this.decals[t],r=a.parent?U.multiply(this.tmp,a.parent.transform,a.local):a.local;this.data.set(r,t*20),this.data[t*20+16]=a.kind,this.data[t*20+17]=a.tint[0],this.data[t*20+18]=a.tint[1],this.data[t*20+19]=a.tint[2]}return e&&this.dev.device.queue.writeBuffer(this.buffer,0,this.data,0,e*20),this.count=e,e}createPipeline(e,t){let a=this.dev.device,r=this.dev.shader(Wi,"decals"),s=a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d-array"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d-array"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,sampler:{}}]});this.pipeline=a.createRenderPipeline({label:"decals",layout:a.createPipelineLayout({bindGroupLayouts:[e,s]}),vertex:{module:r,entryPoint:"vs",buffers:[{arrayStride:80,stepMode:"instance",attributes:[0,1,2,3,4].map(i=>({shaderLocation:i,offset:i*16,format:"float32x4"}))}]},fragment:{module:r,entryPoint:"fs",targets:[{format:t,blend:{color:{srcFactor:"one",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"triangle-strip"},depthStencil:{format:"depth32float",depthWriteEnabled:!1,depthCompare:"greater-equal",depthBias:2,depthBiasSlopeScale:2}}),this.bg=a.createBindGroup({layout:s,entries:[{binding:0,resource:this.albedo.createView({dimension:"2d-array"})},{binding:1,resource:this.normal.createView({dimension:"2d-array"})},{binding:2,resource:this.sampler}]})}draw(e){!this.pipeline||!this.bg||this.count===0||(e.setPipeline(this.pipeline),e.setBindGroup(1,this.bg),e.setVertexBuffer(0,this.buffer),e.draw(4,this.count))}};var Mt=256,kn=`
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
`,_i=`
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
`;function Tr(n=!1){return jt+Gt+wt+ta+Ua+aa+Mn+Ea+kn+Aa(n)+_i+`
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
`}var An=Tr(!1);function zr(n=!1){return kn+Aa(n)+`
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
`}var Pn=zr(!1);var Sn=`
struct FOut { @builtin(position) pos: vec4f, @location(0) uv: vec2f };
@vertex fn vsFull(@builtin(vertex_index) i: u32) -> FOut {
  let p = vec2f(f32((i << 1u) & 2u), f32(i & 2u));
  var o: FOut;
  o.pos = vec4f(p * 2.0 - 1.0, 0.0, 1.0);
  o.uv = vec2f(p.x, 1.0 - p.y);
  return o;
}
`,Tn=jt+Gt+wt+Ea+Sn+`
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
`,zn=`
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
`,Rn=`
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
`,Ln=`
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
`,In=`
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
`,jn=`
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
`,Gn=`
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
`,Fn=`
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
`,Un=`
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
`,En=wt+Sn+`
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
`;var On=`
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
`;var Nn=`
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
`,Cn=Nn+`
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
`,Bn=Nn+`
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
`;function Ji(){return{renderScale:1,maxDevicePixelRatio:2,taa:{enabled:!0,feedbackMin:.82,feedbackMax:.94,velocityWeight:.06,jitterSamples:16},exposure:{mode:"auto",ev100:14,compensation:0,minEv100:-2,maxEv100:17,speedUp:2.2,speedDown:1.4,lowPercent:.45,highPercent:.96,centerWeight:.6},bloom:{enabled:!0,intensity:.035,radius:1,clamp:6e4},gtao:{enabled:!0,radius:.9,falloff:.4,power:1.25,strength:1,slices:2,steps:6,blur:!0},motionBlur:{enabled:!0,shutterAngle:180,maxPixels:48,samples:10},dof:{enabled:!0,apertureMm:3.2,autoFocus:!0,focusDistance:10,focusSpeed:6,maxBlurPx:14,overrideDistance:.6,overrideWeight:0,minFocus:.12,quality:1},lens:{distortion:0,distortion2:0,chromaticAberration:.15,naturalVignette:.6,vignette:.12,vignetteRoundness:.6,sharpen:.25,fillZoom:1},sensor:{enabled:!0,readNoise:.0025,shotNoise:.0018,isoCoupled:!0,gain:1},grade:{tonemapper:"agx",contrast:1.04,saturation:1.02,temperature:0,tint:0,lift:0,gamma:1,gain:1,exposureBias:0,dither:1},fog:{density:35e-5,heightFalloff:.045,baseHeight:0,startDistance:15,inscatter:1,mieG:.72},ibl:{intensity:1,specularOcclusion:1,occludedAmbient:.15,groundBounce:.6,viewmodelFill:1.7},gi:{enabled:!0,intensity:1},shadows:{...xn},viewmodelDepthSqueeze:.5,debugView:0}}var Xi={agx:0,aces:1,neutral:2,none:3};function Vn(n){let e=new Float32Array(1),t=new Uint32Array(e.buffer);e[0]=n;let a=t[0],r=a>>>16&32768,s=(a>>>23&255)-127+15,i=a&8388607;return s<=0?s<-10?r:(i=(i|8388608)>>1-s,r|i>>13):s>=31?r|31744:r|s<<10|i>>13}var Ca=class n{dev;device;settings;textures;synth;sky;wind=new Ia;ibl;particles;decals;stats={drawCalls:0,triangles:0,objects:0,culled:0,frameMs:0,gpuInfo:""};frameLayout;objectLayout;materialLayout;terrainMaterialLayout;terrainMeshModule=null;terrainShadowModule=null;shadowLayout;frameBuf;lightBuf;exposureBuf;histBuf;objBuf;objCapacity=0;objData=new Float32Array(0);cascadeBuf;dummyJoints;staticObjectBG;frameBG=null;frameBGKey="";shadowMap;shadowRes=0;shadowCount=0;skyVis;skyVisParams={min:[0,0,0],cell:1,size:[1,1,1],enabled:!1};probes=[];probeParams={min:[0,0,0],cell:1,size:[1,1,1],enabled:!1};targets=null;linearClamp;shadowSampler;meshModule;shadowModule;pipelines=new Map;skyPipe;gtaoPipe;aoBlurPipe;taaPipe;mbPipe;dofFocusPipe;dofGatherPipe;dofState;bloomDownPipe;bloomUpPipe;histPipe;exposurePipe;compositePipe;debugPipe;postUniforms=new Map;frameIndex=0;prevViewProj=U.create();prevVmViewProj=U.create();historyValid=!1;time=0;lastSkyVersion=-1;fw=new wa(1344);constructor(e){this.dev=e,this.device=e.device;let t=this.device;this.settings=Ji(),this.textures=new ka(e),this.synth=new Pa(e,this.textures),this.sky=new La(e,this.textures,128),this.ibl=new ja(e,128),this.particles=new Oa(e),this.decals=new Na(e);let a=GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT;this.frameLayout=t.createBindGroupLayout({label:"frame",entries:[{binding:0,visibility:a,buffer:{type:"uniform"}},{binding:1,visibility:a,buffer:{type:"read-only-storage"}},{binding:2,visibility:a,buffer:{type:"read-only-storage"}},{binding:3,visibility:a,buffer:{type:"read-only-storage"}},{binding:4,visibility:a,texture:{viewDimension:"cube"}},{binding:5,visibility:a,texture:{}},{binding:6,visibility:a,texture:{sampleType:"depth",viewDimension:"2d-array"}},{binding:7,visibility:a,sampler:{type:"comparison"}},{binding:8,visibility:a,sampler:{}},{binding:9,visibility:a,texture:{sampleType:"unfilterable-float"}},{binding:10,visibility:a,texture:{viewDimension:"3d"}},{binding:11,visibility:a,texture:{viewDimension:"cube"}},{binding:12,visibility:a,texture:{viewDimension:"3d"}},{binding:13,visibility:a,texture:{viewDimension:"3d"}},{binding:14,visibility:a,texture:{viewDimension:"3d"}},{binding:15,visibility:a,texture:{}},{binding:16,visibility:a,texture:{}}]}),this.objectLayout=t.createBindGroupLayout({label:"object",entries:[{binding:0,visibility:a,buffer:{type:"uniform",hasDynamicOffset:!0,minBindingSize:Mt}},{binding:1,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}},{binding:2,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}}]}),this.materialLayout=t.createBindGroupLayout({label:"material",entries:[{binding:0,visibility:a,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:3,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:4,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:5,visibility:GPUShaderStage.FRAGMENT,texture:{}}]}),this.terrainMaterialLayout=t.createBindGroupLayout({label:"material-terrain",entries:[{binding:0,visibility:a,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d-array"}},{binding:3,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d-array"}},{binding:4,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d-array"}},{binding:5,visibility:GPUShaderStage.FRAGMENT,texture:{}}]}),this.shadowLayout=t.createBindGroupLayout({label:"shadow",entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform",hasDynamicOffset:!0,minBindingSize:64}}]}),this.frameBuf=e.createBuffer(1344,GPUBufferUsage.UNIFORM,"frame"),this.lightBuf=e.createBuffer(4096,GPUBufferUsage.STORAGE,"lights"),this.exposureBuf=e.createBuffer(16,GPUBufferUsage.STORAGE,"exposure",new Float32Array([1/(1.2*2**14),14,14,1/(1.2*2**14)])),this.histBuf=e.createBuffer(256*4,GPUBufferUsage.STORAGE,"histogram"),this.cascadeBuf=e.createBuffer(256*4,GPUBufferUsage.UNIFORM,"cascades"),this.dummyJoints=e.createBuffer(64,GPUBufferUsage.STORAGE,"dummyJoints",U.create()),this.objBuf=this.ensureObjectCapacity(256),this.linearClamp=t.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",addressModeW:"clamp-to-edge"}),this.shadowSampler=t.createSampler({compare:"less",magFilter:"linear",minFilter:"linear"}),this.skyVis=this.textures.white3d,this.probes=[this.textures.white3d,this.textures.white3d,this.textures.white3d],this.createShadowMap(),this.meshModule=e.shader(An,"mesh"),this.shadowModule=e.shader(Pn,"shadow");let r="rgba16float",s=e.shader(Tn,"skypass");this.skyPipe=t.createRenderPipeline({label:"sky",layout:t.createPipelineLayout({bindGroupLayouts:[this.frameLayout]}),vertex:{module:s,entryPoint:"vsFull"},fragment:{module:s,entryPoint:"fsSky",targets:[{format:r}]},depthStencil:{format:"depth32float",depthWriteEnabled:!1,depthCompare:"greater-equal"}});let i=(c,l)=>t.createComputePipeline({label:l,layout:"auto",compute:{module:e.shader(c,l),entryPoint:"main"}});this.gtaoPipe=i(zn,"gtao"),this.aoBlurPipe=i(Rn,"aoblur"),this.taaPipe=i(Ln,"taa"),this.mbPipe=i(In,"motionblur"),this.dofFocusPipe=i(Cn,"dof-focus"),this.dofGatherPipe=i(Bn,"dof-gather"),this.dofState=e.createBuffer(16,GPUBufferUsage.STORAGE,"dof.state",new Float32Array([0,0,0,0])),this.bloomDownPipe=i(jn,"bloomdown"),this.bloomUpPipe=i(Gn,"bloomup"),this.histPipe=i(Fn,"histogram"),this.exposurePipe=i(Un,"exposure"),this.debugPipe=i(On,"debug");let o=e.shader(En,"composite");this.compositePipe=t.createRenderPipeline({label:"composite",layout:"auto",vertex:{module:o,entryPoint:"vsFull"},fragment:{module:o,entryPoint:"fsComposite",targets:[{format:e.presentationFormat}]}}),this.particles.createPipeline(this.frameLayout,r),this.decals.createPipeline(this.frameLayout,r),this.staticObjectBG=this.makeObjectBG(this.dummyJoints,this.dummyJoints)}static async create(e,t={}){let a=await xa.create({canvas:e,powerPreference:t.powerPreference,offscreen:t.offscreen});return new n(a)}get materialBindGroupLayout(){return this.materialLayout}materialLayoutFor(e){return e.terrain?this.terrainMaterialLayout:this.materialLayout}ensureObjectCapacity(e){if(e<=this.objCapacity)return this.objBuf;let t=Math.max(e,Math.ceil(this.objCapacity*1.5),256);this.objBuf?.destroy?.(),this.objBuf=this.dev.createBuffer(t*Mt,GPUBufferUsage.UNIFORM,"objects"),this.objData=new Float32Array(t*Mt/4),this.objCapacity=t,this.dummyJoints&&(this.staticObjectBG=this.makeObjectBG(this.dummyJoints,this.dummyJoints));for(let a of this.skinnedObjects)a._skin&&(a._skin.bg=null);return this.objBuf}skinnedObjects=new Set;makeObjectBG(e,t){return this.device.createBindGroup({layout:this.objectLayout,entries:[{binding:0,resource:{buffer:this.objBuf,size:Mt}},{binding:1,resource:{buffer:e}},{binding:2,resource:{buffer:t}}]})}createShadowMap(){let e=this.settings.shadows,t=Math.max(256,Math.min(8192,e.resolution|0)),a=Math.max(1,Math.min(4,e.cascades|0));this.shadowMap&&t===this.shadowRes&&a===this.shadowCount||(this.shadowMap?.destroy(),this.shadowMap=this.device.createTexture({size:[t,t,4],format:"depth32float",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING,label:"shadowmap"}),this.shadowRes=t,this.shadowCount=a,this.frameBG=null)}setSkyVisibility(e,t,a,r,s,i){let o=new Uint16Array(e.length);for(let l=0;l<e.length;l++)o[l]=Vn(e[l]);let c=this.device.createTexture({size:[t,a,r],dimension:"3d",format:"r16float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:"skyvis"});this.device.queue.writeTexture({texture:c},o,{bytesPerRow:t*2,rowsPerImage:a},[t,a,r]),this.skyVis!==this.textures.white3d&&this.skyVis.destroy(),this.skyVis=c,this.skyVisParams={min:[...s],cell:i,size:[t,a,r],enabled:!0},this.frameBG=null}setProbeVolume(e,t,a,r,s,i){let o=t*a*r;for(let c=0;c<3;c++){let l=new Uint16Array(o*4);for(let d=0;d<o;d++)for(let m=0;m<4;m++)l[d*4+m]=Vn(e[d*12+c*4+m]);let b=this.device.createTexture({size:[t,a,r],dimension:"3d",format:"rgba16float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:`gi.probes.${"rgb"[c]}`});this.device.queue.writeTexture({texture:b},l,{bytesPerRow:t*8,rowsPerImage:a},[t,a,r]),this.probes[c]!==this.textures.white3d&&this.probes[c].destroy(),this.probes[c]=b}this.probeParams={min:[s[0],s[1],s[2]],cell:i,size:[t,a,r],enabled:!0},this.frameBG=null}async readSkySH(){let e=this.device,t=e.createCommandEncoder({label:"sky-sh-readback"});this.sky.update(t),this.sky.envVersion!==this.lastSkyVersion&&(this.ibl.update(this.sky.envCube,t),this.lastSkyVersion=this.sky.envVersion);let a=e.createBuffer({size:144,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST,label:"sh-readback"});t.copyBufferToBuffer(this.ibl.sh,0,a,0,144),e.queue.submit([t.finish()]),await a.mapAsync(GPUMapMode.READ);let r=new Float32Array(a.getMappedRange().slice(0));a.unmap(),a.destroy();let s=new Float32Array(27);for(let i=0;i<9;i++)for(let o=0;o<3;o++)s[i*3+o]=r[i*4+o];return s}makeTargets(e,t){let a=this.device,r=(b,d,m,u=[e,t])=>a.createTexture({label:b,size:u,format:d,usage:m}),s=GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING,i=GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING,o=[],c=[],l=Math.min(6,nt(e,t)-2);for(let b=0;b<l;b++){let d=Math.max(1,e>>b+1),m=Math.max(1,t>>b+1);o.push(r(`bloom.down${b}`,"rgba16float",i,[d,m])),c.push(r(`bloom.up${b}`,"rgba16float",i,[d,m]))}return{w:e,h:t,depth:r("depth","depth32float",s),normal:r("normal","rgba16float",s),velocity:r("velocity","rg16float",s),hdr:r("hdr","rgba16float",s),aoRaw:r("ao.raw","r32float",i),ao:r("ao","r32float",i),history:[r("taa.a","rgba16float",i),r("taa.b","rgba16float",i)],mb:r("motionblur","rgba16float",i),dof:r("dof","rgba16float",i),debug:r("debug","rgba16float",i),bloomDown:o,bloomUp:c}}destroyTargets(e){for(let t of[e.depth,e.normal,e.velocity,e.hdr,e.aoRaw,e.ao,e.history[0],e.history[1],e.mb,e.dof,e.debug,...e.bloomDown,...e.bloomUp])t.destroy()}uniform(e,t){let a=this.postUniforms.get(e);return a||(a=this.dev.createBuffer(Math.max(16,t.byteLength),GPUBufferUsage.UNIFORM,e),this.postUniforms.set(e,a)),this.device.queue.writeBuffer(a,0,t.buffer,t.byteOffset,t.byteLength),a}getFrameBG(e){let t=`${e.w}x${e.h}|${this.sky.clouds.resourceVersion}`;return this.frameBG&&this.frameBGKey===t?this.frameBG:(this.frameBG=this.device.createBindGroup({layout:this.frameLayout,label:"frame",entries:[{binding:0,resource:{buffer:this.frameBuf}},{binding:1,resource:{buffer:this.lightBuf}},{binding:2,resource:{buffer:this.ibl.sh}},{binding:3,resource:{buffer:this.exposureBuf}},{binding:4,resource:this.ibl.specular.createView({dimension:"cube"})},{binding:5,resource:this.ibl.brdfLut.createView()},{binding:6,resource:this.shadowMap.createView({dimension:"2d-array"})},{binding:7,resource:this.shadowSampler},{binding:8,resource:this.linearClamp},{binding:9,resource:e.ao.createView()},{binding:10,resource:this.skyVis.createView()},{binding:11,resource:this.sky.cube.createView({dimension:"cube"})},{binding:12,resource:this.probes[0].createView()},{binding:13,resource:this.probes[1].createView()},{binding:14,resource:this.probes[2].createView()},{binding:15,resource:this.sky.clouds.shadow.createView()},{binding:16,resource:this.sky.clouds.dome.createView()}]}),this.frameBGKey=t,this.frameBG)}getPipelines(e,t){let a=`${e?1:0}|${t.variantKey}`,r=this.pipelines.get(a);if(r)return r;let s=this.device,i=this.materialLayoutFor(t),o=this.meshModule,c=this.shadowModule;t.terrain&&(this.terrainMeshModule??=this.dev.shader(Tr(!0),"mesh-terrain"),this.terrainShadowModule??=this.dev.shader(zr(!0),"shadow-terrain"),o=this.terrainMeshModule,c=this.terrainShadowModule);let l=s.createPipelineLayout({bindGroupLayouts:[this.frameLayout,this.objectLayout,i]}),b=e?[Yt,mn]:[Yt],d={module:o,entryPoint:e?"vsSkinned":"vsStatic",buffers:b},m=t.doubleSided?"none":"back",u=s.createRenderPipeline({label:`prepass ${a}`,layout:l,vertex:d,fragment:{module:o,entryPoint:"fsPrepass",targets:[{format:"rgba16float"},{format:"rg16float"}]},primitive:{topology:"triangle-list",cullMode:m},depthStencil:{format:"depth32float",depthWriteEnabled:!0,depthCompare:"greater"}}),y=s.createRenderPipeline({label:`main ${a}`,layout:l,vertex:d,fragment:{module:o,entryPoint:"fsMain",targets:[{format:"rgba16float"}]},primitive:{topology:"triangle-list",cullMode:m},depthStencil:{format:"depth32float",depthWriteEnabled:!1,depthCompare:"equal"}}),p=s.createRenderPipeline({label:`transparent ${a}`,layout:l,vertex:d,fragment:{module:o,entryPoint:"fsTransparent",targets:[{format:"rgba16float",blend:{color:{srcFactor:"one",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"triangle-list",cullMode:m},depthStencil:{format:"depth32float",depthWriteEnabled:!1,depthCompare:"greater"}}),w=this.settings.shadows,x=s.createRenderPipeline({label:`shadow ${a}`,layout:s.createPipelineLayout({bindGroupLayouts:[this.shadowLayout,this.objectLayout,i]}),vertex:{module:c,entryPoint:e?"vsShadowSkinned":"vsShadow",buffers:b},fragment:t.alphaMode==="mask"?{module:c,entryPoint:"fsShadowMask",targets:[]}:void 0,primitive:{topology:"triangle-list",cullMode:"none"},depthStencil:{format:"depth32float",depthWriteEnabled:!0,depthCompare:"less",depthBias:1,depthBiasSlopeScale:w.slopeBias,depthBiasClamp:.01}});return r={prepass:u,main:y,transparent:p,shadow:x},this.pipelines.set(a,r),r}render(e,t,a){let r=performance.now(),s=this.settings,i=this.device,o=this.dev.canvas,c=Math.min(globalThis.devicePixelRatio??1,s.maxDevicePixelRatio),l=Math.max(1,Math.floor((o.clientWidth||o.width)*c)),b=Math.max(1,Math.floor((o.clientHeight||o.height)*c));(o.width!==l||o.height!==b)&&(o.width=l,o.height=b);let d=Math.max(16,Math.round(l*s.renderScale)),m=Math.max(16,Math.round(b*s.renderScale));(!this.targets||this.targets.w!==d||this.targets.h!==m)&&(this.targets&&this.destroyTargets(this.targets),this.targets=this.makeTargets(d,m),this.frameBG=null,this.historyValid=!1);let u=this.targets;this.createShadowMap(),this.time+=a;let y=i.createCommandEncoder({label:"frame"});this.wind.update(a),this.particles.wind.set(this.wind.vector);let p=this.wind.aloft(this.sky.clouds.settings.altitude);this.sky.update(y,{camPos:t.position,dt:a,windAloft:[p[0],p[2]]}),this.sky.envVersion!==this.lastSkyVersion&&(this.ibl.update(this.sky.envCube,y),this.lastSkyVersion=this.sky.envVersion),t.updateMatrices();let w=d/m,x=s.taa.enabled?Math.max(1,s.taa.jitterSamples):1,M=this.frameIndex%x+1,v=s.taa.enabled?(yr(M,2)-.5)*2/d:0,g=s.taa.enabled?(yr(M,3)-.5)*2/m:0,k=U.perspectiveReversedInfinite(U.create(),t.fovY,w,t.near,v,g),h=U.perspectiveReversedInfinite(U.create(),t.fovY,w,t.near),A=U.perspectiveReversedInfinite(U.create(),t.viewmodelFovY,w,t.near*.25,v,g),P=U.perspectiveReversedInfinite(U.create(),t.viewmodelFovY,w,t.near*.25),S=U.multiply(U.create(),k,t.view),T=U.multiply(U.create(),h,t.view),z=U.multiply(U.create(),A,t.view),L=U.multiply(U.create(),P,t.view);this.historyValid||(U.copy(this.prevViewProj,T),U.copy(this.prevVmViewProj,L));let I=U.invert(U.create(),k),G=U.invert(U.create(),S),j=U.invert(U.create(),T),R=this.sky.sunDir,F=this.sky.sunIlluminanceRGB(),N=this.sky.settings.sunAngularDiameter*Math.PI/360,C=s.shadows,K=C.enabled?wn(t,w,f.clone(R),C):null,q=this.fw;q.mat4(0,S),q.mat4(64,T),q.mat4(128,this.prevViewProj),q.mat4(192,z),q.mat4(256,L),q.mat4(320,this.prevVmViewProj),q.mat4(384,t.view),q.mat4(448,t.world),q.mat4(512,I),q.mat4(576,G),q.mat4(640,k),q.vec4(704,t.position[0],t.position[1],t.position[2],t.near),q.vec4(720,R[0],R[1],R[2],Math.cos(N)),q.vec4(736,F[0],F[1],F[2],1),q.vec4(752,d,m,1/d,1/m),q.vec4(768,v,g,0,0);let O=.06*this.sky.settings.sunIlluminance/Math.PI*Math.max(.05,Math.sin(Math.max(.03,R[1])))*s.fog.inscatter;if(q.vec4(784,s.fog.density,s.fog.heightFalloff,s.fog.baseHeight,s.fog.startDistance),q.vec4(800,O*.62,O*.75,O,s.fog.mieG),q.vec4(816,this.time,a,this.frameIndex,s.ibl.intensity),q.vec4(832,K?K.viewProj.length:0,C.maxPenumbraTexels,Math.tan(N),C.blendFraction),K){q.vec4(848,K.splits[0]??1e9,K.splits[1]??1e9,K.splits[2]??1e9,K.splits[3]??1e9);for(let H=0;H<4;H++)q.mat4(864+H*64,K.viewProj[H]??U.create());q.vec4(1120,K.texelWorld[0]??1,K.texelWorld[1]??1,K.texelWorld[2]??1,K.texelWorld[3]??1),q.vec4(1216,K.depthRange[0]??1,K.depthRange[1]??1,K.depthRange[2]??1,K.depthRange[3]??1)}let V=this.skyVisParams;q.vec4(1136,V.min[0],V.min[1],V.min[2],V.cell),q.vec4(1152,V.size[0],V.size[1],V.size[2],V.enabled?1:0);let B=new Float32Array(1024),_=0;for(let H of e.lights){if(!H.enabled||_>=64||H.intensity<=0)continue;let re=_*16;B.set([H.position[0],H.position[1],H.position[2],H.range],re),B.set([H.color[0]*H.intensity,H.color[1]*H.intensity,H.color[2]*H.intensity,0],re+4);let ce=H.spotOuter>0,fe=f.normalize(f.create(),H.direction);B.set([fe[0],fe[1],fe[2],Math.cos(H.spotOuter*Math.PI/180)],re+8),B.set([Math.cos(Math.min(H.spotInner,H.spotOuter)*Math.PI/180),H.radius,ce?1:0,0],re+12),_++}i.queue.writeBuffer(this.lightBuf,0,B,0,Math.max(16,_*16)),q.vec4(1168,_,s.ibl.specularOcclusion,s.gtao.enabled?s.gtao.strength:0,C.normalBias),q.vec4(1184,this.ibl.mips-1,1,this.sky.settings.groundAlbedo,s.debugView),q.vec4(1200,s.viewmodelDepthSqueeze,0,0,0),q.vec4(1232,C.constantBias,C.slopeBias,Math.min(16,C.blockerSamples),Math.min(32,C.pcfSamples)),q.vec4(1248,s.ibl.occludedAmbient,s.ibl.groundBounce,s.ibl.viewmodelFill,0);let ee=this.wind;q.vec4(1264,ee.vector[0],ee.vector[2],ee.settings.foliageBend,ee.settings.turbulence);let W=this.sky.clouds.frameParams();q.vec4(1312,W[0],W[1],W[2],W[3]),q.vec4(1328,W[4],W[5],W[6],W[7]);let Y=this.probeParams;q.vec4(1280,Y.min[0],Y.min[1],Y.min[2],Y.cell),q.vec4(1296,Y.size[0],Y.size[1],Y.size[2],Y.enabled&&s.gi.enabled?s.gi.intensity:0),i.queue.writeBuffer(this.frameBuf,0,q.buffer);let E=pr(S),D=[],J=[],$=0,ae=[...e.objects];this.ensureObjectCapacity(ae.length+1);let se=this.objData,de=new Map,be=0,pe=new Float32Array(12);for(let H of ae){if(!H.visible)continue;H._beginFrame();let re=be*Mt/4;if(se.set(H.transform,re),se.set(H.prevTransform,re+16),U.normalMatrix12(pe,H.transform),se.set(pe,re+32),se[re+44]=(H.viewmodel?1:0)+(H.instances?4:0),se[re+45]=H.id,de.set(H,be++),H.joints&&H.mesh.skinned&&this.updateSkin(H),H.instances&&(this.updateInstances(H),H.instanceCount===0)){be--,de.delete(H);continue}H.castShadow&&!H.viewmodel&&J.push(H),H.viewmodel||gr(E,H.worldBounds)?D.push(H):$++}be&&i.queue.writeBuffer(this.objBuf,0,se,0,be*Mt/4),this.stats.objects=D.length,this.stats.culled=$;let Le=0,Re=0,te=H=>H._skin?this.skinBG(H):H._inst?this.instBG(H):this.staticObjectBG,ne=(H,re)=>{H.setBindGroup(1,te(re),[de.get(re)*Mt]),H.setBindGroup(2,re.material.getBindGroup(this.dev,this.textures,this.materialLayoutFor(re.material))),H.setVertexBuffer(0,re.mesh.vertexBuffer),re.mesh.skinBuffer&&re._skin&&H.setVertexBuffer(1,re.mesh.skinBuffer),H.setIndexBuffer(re.mesh.indexBuffer,"uint32");let ce=re.instances?re.instanceCount:1;H.drawIndexed(re.mesh.indexCount,ce),Le++,Re+=re.mesh.indexCount/3*ce};if(K){let H=new Float32Array(256);for(let ce=0;ce<K.viewProj.length;ce++)H.set(K.viewProj[ce],ce*64);i.queue.writeBuffer(this.cascadeBuf,0,H);let re=i.createBindGroup({layout:this.shadowLayout,entries:[{binding:0,resource:{buffer:this.cascadeBuf,size:64}}]});for(let ce=0;ce<K.viewProj.length;ce++){let fe=y.beginRenderPass({label:`shadow ${ce}`,colorAttachments:[],depthStencilAttachment:{view:this.shadowMap.createView({dimension:"2d",baseArrayLayer:ce,arrayLayerCount:1}),depthLoadOp:"clear",depthStoreOp:"store",depthClearValue:1}});fe.setBindGroup(0,re,[ce*256]);let ke=pr(K.viewProj[ce]);for(let Ie of J)Ie.material.alphaMode!=="blend"&&gr(ke,Ie.worldBounds)&&(fe.setPipeline(this.getPipelines(!!Ie._skin,Ie.material).shadow),ne(fe,Ie));fe.end()}}let me=this.getFrameBG(u),ve=D.filter(H=>H.material.alphaMode!=="blend"),ge=D.filter(H=>H.material.alphaMode==="blend");ve.sort((H,re)=>Number(re.viewmodel)-Number(H.viewmodel)||H.material.id-re.material.id);let Oe=t.position;ge.sort((H,re)=>f.distance(U.getTranslation(f.create(),re.transform),Oe)-f.distance(U.getTranslation(f.create(),H.transform),Oe));{let H=y.beginRenderPass({label:"prepass",colorAttachments:[{view:u.normal.createView(),loadOp:"clear",storeOp:"store",clearValue:[0,1,0,1]},{view:u.velocity.createView(),loadOp:"clear",storeOp:"store",clearValue:[0,0,0,0]}],depthStencilAttachment:{view:u.depth.createView(),depthLoadOp:"clear",depthStoreOp:"store",depthClearValue:0}});H.setBindGroup(0,me);for(let re of ve)H.setPipeline(this.getPipelines(!!re._skin,re.material).prepass),ne(H,re);H.end()}if(s.gtao.enabled){let H=s.gtao,re=new Float32Array(44);re.set(I,0),re.set(t.view,16),re.set([d,m,1/d,1/m],32),re.set([H.radius,H.falloff,H.power,this.frameIndex],36),re.set([h[0],h[5],H.steps,H.slices],40);let ce=y.beginComputePass({label:"gtao"});ce.setPipeline(this.gtaoPipe),ce.setBindGroup(0,i.createBindGroup({layout:this.gtaoPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("gtao",re)}},{binding:1,resource:u.depth.createView()},{binding:2,resource:u.normal.createView()},{binding:3,resource:(H.blur?u.aoRaw:u.ao).createView()}]})),ce.dispatchWorkgroups(Math.ceil(d/8),Math.ceil(m/8)),H.blur&&(ce.setPipeline(this.aoBlurPipe),ce.setBindGroup(0,i.createBindGroup({layout:this.aoBlurPipe.getBindGroupLayout(0),entries:[{binding:0,resource:u.aoRaw.createView()},{binding:1,resource:u.depth.createView()},{binding:2,resource:u.ao.createView()}]})),ce.dispatchWorkgroups(Math.ceil(d/8),Math.ceil(m/8))),ce.end()}this.decals.upload(),this.particles.update(a),this.particles.upload(t.position);{let H=y.beginRenderPass({label:"main",colorAttachments:[{view:u.hdr.createView(),loadOp:"clear",storeOp:"store",clearValue:[0,0,0,1]}],depthStencilAttachment:{view:u.depth.createView(),depthReadOnly:!0}});H.setBindGroup(0,me);for(let re of ve)H.setPipeline(this.getPipelines(!!re._skin,re.material).main),ne(H,re);H.setPipeline(this.skyPipe),H.draw(3),this.decals.draw(H),H.setBindGroup(0,me);for(let re of ge)H.setPipeline(this.getPipelines(!!re._skin,re.material).transparent),ne(H,re);this.particles.draw(H,u.depth),H.end()}let Be=u.history[this.frameIndex&1],tt=u.history[this.frameIndex+1&1],Qe=u.hdr;if(s.taa.enabled){let H=new Float32Array(44);H.set(j,0),H.set(this.prevViewProj,16),H.set([d,m,1/d,1/m],32),H.set([s.taa.feedbackMin,s.taa.feedbackMax,s.taa.velocityWeight,this.historyValid?0:1],36),H.set([v*.5,-g*.5,0,0],40);let re=y.beginComputePass({label:"taa"});re.setPipeline(this.taaPipe),re.setBindGroup(0,i.createBindGroup({layout:this.taaPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("taa",H)}},{binding:1,resource:u.hdr.createView()},{binding:2,resource:Be.createView()},{binding:3,resource:u.velocity.createView()},{binding:4,resource:u.depth.createView()},{binding:5,resource:this.linearClamp},{binding:6,resource:tt.createView()},{binding:7,resource:{buffer:this.exposureBuf}}]})),re.dispatchWorkgroups(Math.ceil(d/8),Math.ceil(m/8)),re.end(),Qe=tt}if(s.dof.enabled&&s.debugView===0){let H=s.dof,re=m/(2*Math.tan(t.fovY/2)),ce=m/(2*Math.tan(t.viewmodelFovY/2)),fe=new Float32Array([d,m,1/d,1/m,H.apertureMm/1e3,re,ce,H.maxBlurPx*(m/1080),t.near,t.near*.25,s.viewmodelDepthSqueeze,1,H.focusDistance,H.autoFocus?1:0,H.overrideDistance,H.overrideWeight,Math.min(a,.1),H.focusSpeed,H.minFocus,1.6/Math.max(.25,H.quality)]),ke=this.uniform("dof",fe),Ie=y.beginComputePass({label:"dof"});Ie.setPipeline(this.dofFocusPipe),Ie.setBindGroup(0,i.createBindGroup({layout:this.dofFocusPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:ke}},{binding:1,resource:u.depth.createView()},{binding:2,resource:{buffer:this.dofState}}]})),Ie.dispatchWorkgroups(1),Ie.setPipeline(this.dofGatherPipe),Ie.setBindGroup(0,i.createBindGroup({layout:this.dofGatherPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:ke}},{binding:1,resource:Qe.createView()},{binding:2,resource:u.depth.createView()},{binding:3,resource:{buffer:this.dofState}},{binding:4,resource:u.dof.createView()}]})),Ie.dispatchWorkgroups(Math.ceil(d/8),Math.ceil(m/8)),Ie.end(),Qe=u.dof}{let H=s.motionBlur,re=H.shutterAngle/360,ce=new Float32Array([d,m,1/d,1/m,re,H.maxPixels,H.samples,H.enabled?1:0]),fe=y.beginComputePass({label:"motionblur"});fe.setPipeline(this.mbPipe),fe.setBindGroup(0,i.createBindGroup({layout:this.mbPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("mb",ce)}},{binding:1,resource:Qe.createView()},{binding:2,resource:u.velocity.createView()},{binding:3,resource:u.depth.createView()},{binding:4,resource:this.linearClamp},{binding:5,resource:u.mb.createView()}]})),fe.dispatchWorkgroups(Math.ceil(d/8),Math.ceil(m/8)),fe.end()}let Se=u.mb;{let H=s.exposure,re=-10,ce=40,fe=H.ev100;H.mode==="camera"&&(fe=ln(t.aperture,t.shutter,t.iso));let ke=y.beginComputePass({label:"exposure"});ke.setPipeline(this.histPipe),ke.setBindGroup(0,i.createBindGroup({layout:this.histPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("hist",new Float32Array([d,m,1/d,1/m,re,ce,H.centerWeight,0]))}},{binding:1,resource:Se.createView()},{binding:2,resource:{buffer:this.histBuf}},{binding:3,resource:{buffer:this.exposureBuf}}]})),ke.dispatchWorkgroups(Math.ceil(d/32),Math.ceil(m/32)),ke.setPipeline(this.exposurePipe),ke.setBindGroup(0,i.createBindGroup({layout:this.exposurePipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("expo",new Float32Array([H.mode==="auto"?0:1,fe,H.compensation,Math.min(a,.1),H.minEv100,H.maxEv100,H.speedUp,H.speedDown,H.lowPercent,H.highPercent,re,ce]))}},{binding:1,resource:{buffer:this.histBuf}},{binding:2,resource:{buffer:this.exposureBuf}}]})),ke.dispatchWorkgroups(1),ke.end()}let Ct=s.bloom;if(Ct.enabled&&u.bloomDown.length>1){let H=y.beginComputePass({label:"bloom"});H.setPipeline(this.bloomDownPipe);let re=Se;for(let fe=0;fe<u.bloomDown.length;fe++){let ke=u.bloomDown[fe];H.setBindGroup(0,i.createBindGroup({layout:this.bloomDownPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform(`bd${fe}`,new Float32Array([1/re.width,1/re.height,0,0,fe===0?1:0,Ct.clamp,0,0]))}},{binding:1,resource:re.createView()},{binding:2,resource:this.linearClamp},{binding:3,resource:ke.createView()}]})),H.dispatchWorkgroups(Math.ceil(ke.width/8),Math.ceil(ke.height/8)),re=ke}H.setPipeline(this.bloomUpPipe);let ce=u.bloomDown.length;for(let fe=ce-2;fe>=0;fe--){let ke=fe===ce-2?u.bloomDown[ce-1]:u.bloomUp[fe+1],Ie=u.bloomUp[fe];H.setBindGroup(0,i.createBindGroup({layout:this.bloomUpPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform(`bu${fe}`,new Float32Array([1/ke.width,1/ke.height,0,0,Ct.radius,0,0,0]))}},{binding:1,resource:ke.createView()},{binding:2,resource:u.bloomDown[fe].createView()},{binding:3,resource:this.linearClamp},{binding:4,resource:Ie.createView()}]})),H.dispatchWorkgroups(Math.ceil(Ie.width/8),Math.ceil(Ie.height/8))}H.end()}if(s.debugView>0){let H=y.beginComputePass({label:"debug"});H.setPipeline(this.debugPipe),H.setBindGroup(0,i.createBindGroup({layout:this.debugPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("dbg",new Float32Array([s.debugView,t.near,d,m]))}},{binding:1,resource:u.normal.createView()},{binding:2,resource:u.ao.createView()},{binding:3,resource:u.velocity.createView()},{binding:4,resource:u.depth.createView()},{binding:5,resource:Se.createView()},{binding:6,resource:{buffer:this.exposureBuf}},{binding:7,resource:u.debug.createView()}]})),H.dispatchWorkgroups(Math.ceil(d/8),Math.ceil(m/8)),H.end()}{let H=s.lens,re=s.grade,ce=s.sensor,fe=ce.isoCoupled?Math.pow(Math.max(t.iso,50)/100,.25):1,ke=new Float32Array([l,b,1/l,1/b,H.distortion,H.distortion2,H.chromaticAberration,H.fillZoom,H.naturalVignette,H.vignette,H.vignetteRoundness,t.fovY,Ct.enabled?Ct.intensity:0,0,0,0,ce.readNoise,ce.shotNoise,ce.enabled?fe*ce.gain:0,this.frameIndex%1024,re.contrast,re.saturation,re.temperature,re.tint,re.lift,re.gamma,re.gain,Xi[re.tonemapper],H.sharpen,re.dither,s.debugView,re.exposureBias]),Ie=Ct.enabled&&u.bloomUp.length>1?u.bloomUp[0]:Se,va=y.beginRenderPass({label:"composite",colorAttachments:[{view:this.outputView(l,b),loadOp:"clear",storeOp:"store",clearValue:[0,0,0,1]}]});va.setPipeline(this.compositePipe),va.setBindGroup(0,i.createBindGroup({layout:this.compositePipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("composite",ke)}},{binding:1,resource:Se.createView()},{binding:2,resource:Ie.createView()},{binding:3,resource:this.linearClamp},{binding:5,resource:u.debug.createView()}]})),va.draw(3),va.end()}i.queue.submit([y.finish()]),U.copy(this.prevViewProj,T),U.copy(this.prevVmViewProj,L);for(let H of ae)H.visible&&H._endFrame();for(let H of this.skinnedObjects)this.rotateSkin(H);this.historyValid=!0,this.frameIndex++,this.stats.drawCalls=Le,this.stats.triangles=Re,this.stats.frameMs=performance.now()-r}offscreenOut=null;outputView(e,t){return this.dev.offscreen?((!this.offscreenOut||this.offscreenOut.width!==e||this.offscreenOut.height!==t)&&(this.offscreenOut?.destroy(),this.offscreenOut=this.device.createTexture({size:[e,t],format:"rgba8unorm",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC,label:"offscreen.out"})),this.offscreenOut.createView()):this.dev.context.getCurrentTexture().createView()}async readback(){let e=this.offscreenOut;if(!e)throw new Error("readback requires Renderer.create(canvas, { offscreen: true })");let t=Math.ceil(e.width*4/256)*256,a=this.device.createBuffer({size:t*e.height,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),r=this.device.createCommandEncoder();r.copyTextureToBuffer({texture:e},{buffer:a,bytesPerRow:t},[e.width,e.height]),this.device.queue.submit([r.finish()]),await a.mapAsync(GPUMapMode.READ);let s=new Uint8Array(a.getMappedRange()),i=new Uint8Array(e.width*e.height*4);for(let o=0;o<e.height;o++)i.set(s.subarray(o*t,o*t+e.width*4),o*e.width*4);return a.unmap(),a.destroy(),{width:e.width,height:e.height,data:i}}resetHistory(){this.historyValid=!1}updateSkin(e){let t=e.joints,a=t.length/16;if(!e._skin||e._skin.count!==a){let r=Math.max(64,t.byteLength);e._skin?.cur.destroy(),e._skin?.prev.destroy();let s=this.dev.createBuffer(r,GPUBufferUsage.STORAGE,"joints"),i=this.dev.createBuffer(r,GPUBufferUsage.STORAGE,"joints.prev",t);e._skin={cur:s,prev:i,bg:null,count:a},this.skinnedObjects.add(e)}this.device.queue.writeBuffer(e._skin.cur,0,t)}updateInstances(e){let t=e.instances,a=Math.max(64,e.instanceCount*64);if(!e._inst||e._inst.cap<a){e._inst?.buf.destroy();let r=Math.max(a,(e._inst?.cap??0)*2);e._inst={buf:this.dev.createBuffer(r,GPUBufferUsage.STORAGE,"instances"),bg:null,cap:r},e.instancesDirty=!0}e.instancesDirty&&e.instanceCount>0&&(this.device.queue.writeBuffer(e._inst.buf,0,t,0,e.instanceCount*16),e.instancesDirty=!1)}instBG(e){let t=e._inst;return t.bg||(t.bg=this.makeObjectBG(t.buf,t.buf)),t.bg}skinBG(e){let t=e._skin;return t.bg||(t.bg=this.makeObjectBG(t.cur,t.prev)),t.bg}rotateSkin(e){!e._skin||!e.joints||this.device.queue.writeBuffer(e._skin.prev,0,e.joints)}};var Yi=1;function Vt(n){return{id:Yi++,name:n}}var Ba=class{nextEntity=1;alive=new Set;stores=new Map;names=new Map;onDespawn=[];onRemove=new Map;spawn(e){let t=this.nextEntity++;return this.alive.add(t),e&&this.names.set(t,e),t}despawn(e){if(this.alive.has(e)){for(let t of this.onDespawn)t(e);for(let[t,a]of this.stores)if(a.has(e)){let r=a.get(e);a.delete(e);for(let s of this.onRemove.get(t)??[])s(e,r)}this.alive.delete(e),this.names.delete(e)}}isAlive(e){return this.alive.has(e)}nameOf(e){return this.names.get(e)??`entity#${e}`}get entityCount(){return this.alive.size}add(e,t,a){let r=this.stores.get(t.id);return r||(r=new Map,this.stores.set(t.id,r)),r.set(e,a),a}get(e,t){return this.stores.get(t.id)?.get(e)}require(e,t){let a=this.get(e,t);if(a===void 0)throw new Error(`${this.nameOf(e)} has no ${t.name}`);return a}has(e,t){return this.stores.get(t.id)?.has(e)??!1}remove(e,t){let a=this.stores.get(t.id);if(!a?.has(e))return;let r=a.get(e);a.delete(e);for(let s of this.onRemove.get(t.id)??[])s(e,r)}onRemoved(e,t){let a=this.onRemove.get(e.id)??[];a.push(t),this.onRemove.set(e.id,a)}*query(...e){let t=e.map(r=>this.stores.get(r.id));if(t.some(r=>!r))return;let a=0;for(let r=1;r<t.length;r++)t[r].size<t[a].size&&(a=r);for(let r of[...t[a].keys()]){let s=[r],i=!0;for(let o of t){if(!o.has(r)){i=!1;break}s.push(o.get(r))}i&&(yield s)}}entities(){return this.alive.values()}};var Da=class{position=f.create();rotation=X.create();scale=f.create(1,1,1);parent=null;local=U.create();world=U.create();version=0;worldVersion=-1;parentVersion=-1;constructor(e,t,a){e&&f.copy(this.position,e),t&&X.copy(this.rotation,t),a&&f.copy(this.scale,a)}touch(){this.version++}setPosition(e,t,a){return f.set(this.position,e,t,a),this.version++,this}setRotation(e){return X.copy(this.rotation,e),this.version++,this}setEuler(e,t,a=0){return X.fromEuler(this.rotation,e,t,a),this.version++,this}get stamp(){return this.version+(this.parent?this.parent.stamp*31:0)}getWorld(){let e=this.parent?this.parent.stamp:0;return(this.worldVersion!==this.version||this.parentVersion!==e)&&(U.fromRotationTranslationScale(this.local,this.rotation,this.position,this.scale),this.parent?U.multiply(this.world,this.parent.getWorld(),this.local):U.copy(this.world,this.local),this.worldVersion=this.version,this.parentVersion=e),this.world}worldPosition(e=f.create()){return U.getTranslation(e,this.getWorld())}worldRotation(e=X.create()){return U.getRotation(e,this.getWorld())}forward(e=f.create()){let t=this.getWorld();return f.normalize(e,f.set(e,-t[8],-t[9],-t[10]))}right(e=f.create()){let t=this.getWorld();return f.normalize(e,f.set(e,t[0],t[1],t[2]))}up(e=f.create()){let t=this.getWorld();return f.normalize(e,f.set(e,t[4],t[5],t[6]))}transformPoint(e,t=f.create()){return f.transformMat4(t,e,this.getWorld())}},ra=Vt("Transform");var na=Vt("Scripts");var Va=class{down=new Set;pressed=new Set;released=new Set;mouseDown=new Set;mousePressed=new Set;mouseReleased=new Set;padPrev=[];mouseDX=0;mouseDY=0;wheel=0;sensitivity=.075;invertY=!1;bindings=new Map;locked=!1;gamepad=null;padLookSpeed=160;deadzone=.12;target;constructor(e){this.target=e,addEventListener("keydown",t=>{t.repeat||(this.down.add(t.code),this.pressed.add(t.code),this.locked&&["Tab","Space","KeyF","Backquote"].includes(t.code)&&t.preventDefault())}),addEventListener("keyup",t=>{this.down.delete(t.code),this.released.add(t.code)}),addEventListener("blur",()=>{this.down.clear(),this.mouseDown.clear()}),e.addEventListener("mousedown",t=>{this.mouseDown.add(t.button),this.mousePressed.add(t.button)}),addEventListener("mouseup",t=>{this.mouseDown.delete(t.button),this.mouseReleased.add(t.button)}),addEventListener("mousemove",t=>{this.locked&&(this.mouseDX+=t.movementX,this.mouseDY+=t.movementY)}),addEventListener("wheel",t=>{this.wheel+=Math.sign(t.deltaY)},{passive:!0}),e.addEventListener("contextmenu",t=>t.preventDefault()),document.addEventListener("pointerlockchange",()=>{this.locked=document.pointerLockElement===this.target}),this.defaultBindings()}async lock(){try{await this.target.requestPointerLock.call(this.target,{unadjustedMovement:!0})}catch{try{await this.target.requestPointerLock()}catch{}}}unlock(){document.exitPointerLock()}defaultBindings(){let e=(t,a)=>this.bindings.set(t,a);e("forward",{keys:["KeyW"]}),e("back",{keys:["KeyS"]}),e("left",{keys:["KeyA"]}),e("right",{keys:["KeyD"]}),e("sprint",{keys:["ShiftLeft"],gamepadButtons:[10]}),e("crouch",{keys:["KeyC","ControlLeft"],gamepadButtons:[1]}),e("jump",{keys:["Space"],gamepadButtons:[0]}),e("fire",{mouse:[0],gamepadButtons:[7]}),e("aim",{mouse:[2],gamepadButtons:[6]}),e("reload",{keys:["KeyR"],gamepadButtons:[2]}),e("fireMode",{keys:["KeyX"],gamepadButtons:[12]}),e("leanLeft",{keys:["KeyQ"],gamepadButtons:[4]}),e("leanRight",{keys:["KeyE"],gamepadButtons:[5]}),e("earpro",{keys:["KeyV"]}),e("camera",{keys:["KeyH"]}),e("tuning",{keys:["F1","Backquote"]}),e("holdBreath",{keys:["AltLeft"],gamepadButtons:[11]})}padButton(e){return!!this.gamepad?.buttons[e]?.pressed}action(e){let t=this.bindings.get(e);return t?(t.keys?.some(a=>this.down.has(a))??!1)||(t.mouse?.some(a=>this.mouseDown.has(a))??!1)||(t.gamepadButtons?.some(a=>this.padButton(a))??!1):!1}actionPressed(e){let t=this.bindings.get(e);return t?(t.keys?.some(a=>this.pressed.has(a))??!1)||(t.mouse?.some(a=>this.mousePressed.has(a))??!1)||(t.gamepadButtons?.some(a=>this.padButton(a)&&!this.padPrev[a])??!1):!1}actionReleased(e){let t=this.bindings.get(e);return t?(t.keys?.some(a=>this.released.has(a))??!1)||(t.mouse?.some(a=>this.mouseReleased.has(a))??!1):!1}key(e){return this.down.has(e)}keyPressed(e){return this.pressed.has(e)}moveAxis(){let e=(this.action("right")?1:0)-(this.action("left")?1:0),t=(this.action("forward")?1:0)-(this.action("back")?1:0);if(this.gamepad){let r=this.gamepad.axes[0]??0,s=this.gamepad.axes[1]??0;Math.hypot(r,s)>this.deadzone&&(e+=r,t-=s)}let a=Math.hypot(e,t);return a>1&&(e/=a,t/=a),{x:e,y:t}}lookDelta(e){let t=this.sensitivity*Math.PI/180,a=-this.mouseDX*t,r=-this.mouseDY*t*(this.invertY?-1:1);if(this.gamepad){let s=this.gamepad.axes[2]??0,i=this.gamepad.axes[3]??0,o=this.padLookSpeed*Math.PI/180*e;Math.abs(s)>this.deadzone&&(a-=Math.sign(s)*(Math.abs(s)-this.deadzone)/(1-this.deadzone)*o),Math.abs(i)>this.deadzone&&(r-=Math.sign(i)*(Math.abs(i)-this.deadzone)/(1-this.deadzone)*o)}return{yaw:a,pitch:r}}rumble(e,t,a){this.gamepad?.vibrationActuator?.playEffect?.("dual-rumble",{duration:a,strongMagnitude:Math.min(1,e),weakMagnitude:Math.min(1,t)})}poll(){let e=navigator.getGamepads?.()??[];this.gamepad=e.find(t=>t&&t.connected)??null}endFrame(){this.pressed.clear(),this.released.clear(),this.mousePressed.clear(),this.mouseReleased.clear(),this.mouseDX=0,this.mouseDY=0,this.wheel=0,this.gamepad&&(this.padPrev=this.gamepad.buttons.map(e=>e.pressed))}};var gt={gl:"fondaineGL",vorp:"vorp",oaxis:"oAxis"},Ha=class n{hub;storageKey;module;constructor(e="fondaine.tuning",t=gt.gl,a){this.storageKey=e,this.module=t,this.hub=a??{params:[],listeners:[]}}get params(){return this.hub.params}scope(e){return new n(this.storageKey,e,this.hub)}get modules(){return[...new Set(this.hub.params.map(e=>e.module))]}k(e,t){return`${this.module}:${e}.${t}`}number(e,t,a,r){return this.hub.params.push({module:this.module,group:e,key:this.k(e,a),label:r.label??a,kind:"number",min:r.min,max:r.max,step:r.step??(r.max-r.min)/200,unit:r.unit,help:r.help,get:()=>t[a],set:s=>{t[a]=Number(s),r.onChange?.(Number(s)),this.emit()}}),this}bool(e,t,a,r={}){return this.hub.params.push({module:this.module,group:e,key:this.k(e,a),label:r.label??a,kind:"bool",help:r.help,get:()=>t[a],set:s=>{t[a]=!!s,r.onChange?.(!!s),this.emit()}}),this}choice(e,t,a,r,s={}){return this.hub.params.push({module:this.module,group:e,key:this.k(e,a),label:s.label??a,kind:"enum",options:r,help:s.help,get:()=>t[a],set:i=>{t[a]=String(i),s.onChange?.(String(i)),this.emit()}}),this}arrayValue(e,t,a,r){return this.hub.params.push({module:this.module,group:e,key:this.k(e,r.key),label:r.label,kind:"number",min:r.min,max:r.max,step:r.step??(r.max-r.min)/200,unit:r.unit,help:r.help,get:()=>t[a],set:s=>{t[a]=Number(s),r.onChange?.(),this.emit()}}),this}groups(e=this.module){return[...new Set(this.hub.params.filter(t=>t.module===e).map(t=>t.group))]}unregister(e,t=this.module){for(let a=this.hub.params.length-1;a>=0;a--)this.hub.params[a].module===t&&this.hub.params[a].group===e&&this.hub.params.splice(a,1)}onChange(e){this.hub.listeners.push(e)}emit(){for(let e of this.hub.listeners)e()}snapshot(e=this.module){let t={};for(let a of this.hub.params)(e==="*"||a.module===e)&&(t[a.key]=a.get());return t}apply(e){for(let t of this.hub.params)t.key in e&&t.set(e[t.key])}save(e="default",t=this.module){try{localStorage.setItem(`${this.storageKey}.${t}.${e}`,JSON.stringify(this.snapshot(t)))}catch{}}load(e="default",t=this.module){try{let a=localStorage.getItem(`${this.storageKey}.${t}.${e}`);return a?(this.apply(JSON.parse(a)),!0):!1}catch{return!1}}exportJSON(e=this.module){return JSON.stringify(this.snapshot(e),null,2)}};var Qi=`
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
`,Wa=class{constructor(e,t="fondaine"){this.tuning=e;if(!document.getElementById("fdui-css")){let s=document.createElement("style");s.id="fdui-css",s.textContent=Qi,document.head.appendChild(s)}this.root=document.createElement("div"),this.root.className="fdui",this.root.style.display="none",this.root.innerHTML=`<header><span class="logo">/f</span><b>${t}</b><span style="margin-left:auto;color:#6f747d">F1 to close</span></header>`,this.statsEl=document.createElement("div"),this.statsEl.className="stats",this.mods=document.createElement("div"),this.mods.className="mods",this.tabs=document.createElement("div"),this.tabs.className="tabs",this.body=document.createElement("div"),this.body.className="body";let a=document.createElement("footer"),r=(s,i)=>{let o=document.createElement("button");o.textContent=s,o.onclick=i,a.appendChild(o)};r("Save",()=>e.save("default",this.module)),r("Load",()=>{e.load("default",this.module),this.refresh()}),r("Export JSON",()=>{let s=new Blob([e.exportJSON(this.module)],{type:"application/json"}),i=document.createElement("a");i.href=URL.createObjectURL(s),i.download=`${this.module}-tuning.json`,i.click()}),r("Import JSON",()=>{let s=document.createElement("input");s.type="file",s.accept=".json",s.onchange=async()=>{let i=s.files?.[0];i&&(e.apply(JSON.parse(await i.text())),this.refresh())},s.click()}),this.root.append(this.statsEl,this.mods,this.tabs,this.body,a),document.body.appendChild(this.root);for(let s of["keydown","mousedown","wheel"])this.root.addEventListener(s,i=>i.stopPropagation())}root;body;statsEl;tabs;mods;module="";group="";inputs=new Map;visible=!1;statsText=()=>"";toggle(e=!this.visible){this.visible=e,this.root.style.display=e?"flex":"none",e&&this.rebuild()}rebuild(){let e=this.tuning.modules;(!this.module||!e.includes(this.module))&&(this.module=e[0]??""),this.mods.innerHTML="";for(let a of e){let r=document.createElement("button");r.textContent=a,a===this.module&&(r.className="on"),r.onclick=()=>{this.module=a,this.group="",this.rebuild()},this.mods.appendChild(r)}let t=this.tuning.groups(this.module);(!this.group||!t.includes(this.group))&&(this.group=t[0]??""),this.tabs.innerHTML="";for(let a of t){let r=document.createElement("button");r.textContent=a,a===this.group&&(r.className="on"),r.onclick=()=>{this.group=a,this.rebuild()},this.tabs.appendChild(r)}this.body.innerHTML="",this.inputs.clear();for(let a of this.tuning.params.filter(r=>r.module===this.module&&r.group===this.group))this.body.appendChild(this.row(a))}row(e){let t=document.createElement("div");t.className="row";let a=document.createElement("label");if(a.textContent=e.unit?`${e.label} (${e.unit})`:e.label,a.title=e.help??e.key,t.appendChild(a),e.kind==="number"){let r=document.createElement("input");r.type="range",r.min=String(e.min),r.max=String(e.max),r.step=String(e.step??.01);let s=document.createElement("input");s.type="number",s.step=String(e.step??.01);let i=()=>{let o=Number(e.get());r.value=String(o),s.value=String(+o.toPrecision(5))};r.oninput=()=>{e.set(Number(r.value)),s.value=String(+Number(r.value).toPrecision(5))},s.onchange=()=>{e.set(Number(s.value)),r.value=s.value},i(),this.inputs.set(e.key,i),t.append(r,s)}else if(e.kind==="bool"){let r=document.createElement("input");r.type="checkbox",r.checked=!!e.get(),r.onchange=()=>e.set(r.checked),this.inputs.set(e.key,()=>{r.checked=!!e.get()}),t.append(r,document.createElement("span"))}else{let r=document.createElement("select");for(let s of e.options??[]){let i=document.createElement("option");i.value=s,i.textContent=s,r.appendChild(i)}r.value=String(e.get()),r.onchange=()=>e.set(r.value),this.inputs.set(e.key,()=>{r.value=String(e.get())}),t.append(r,document.createElement("span"))}if(e.help){let r=document.createElement("div");r.className="help",r.textContent=e.help,t.appendChild(r)}return t}refresh(){for(let e of this.inputs.values())e()}update(){this.visible&&(this.statsEl.textContent=this.statsText())}};var Lr=class{constructor(e,t,a,r){this.p=e;this.id=t;this.radius=a;this.height=r}setPosition(e,t,a){this.p.ex.fp_character_set_position(this.id,e,t,a)}move(e,t,a){let r=this.p.ex.fp_character_move(this.id,e,t,a),s=this.p.result(8);return{position:f.create(s[0],s[1],s[2]),grounded:(r&1)!==0,ceiling:(r&2)!==0,wall:(r&4)!==0,groundNormal:f.create(s[3],s[4],s[5]),groundMaterial:s[6]}}setHeight(e){let t=this.p.ex.fp_character_set_height(this.id,e)===1;return t&&(this.height=e),t}remove(){this.p.ex.fp_character_remove(this.id)}},Ir=class{constructor(e,t){this.p=e;this.id=t}setTransform(e,t=[0,0,0,1]){this.p.ex.fp_body_set_transform(this.id,e[0],e[1],e[2],t[0],t[1],t[2],t[3])}setVelocity(e,t=[0,0,0]){this.p.ex.fp_body_set_velocity(this.id,e[0],e[1],e[2],t[0],t[1],t[2])}applyImpulse(e,t){this.p.ex.fp_body_apply_impulse(this.id,e[0],e[1],e[2],t[0],t[1],t[2])}remove(){this.p.ex.fp_body_remove(this.id)}state(){return this.p.bodyState(this.id)}get alive(){return this.state()[0]>.5}},qa=class n{ex;stride=15;onProjectileHit=[];onContact=[];constructor(e){this.ex=e,this.stride=e.fp_body_stride?.()??15}static async load(e){let t=await(await fetch(e)).arrayBuffer();return n.fromBytes(t)}static async fromBytes(e){let t=await WebAssembly.compile(e),a={};for(let s of WebAssembly.Module.imports(t))a[s.module]??={},a[s.module][s.name]=s.kind==="function"?()=>0:void 0;let r=await WebAssembly.instantiate(t,a);return new n(r.exports)}f32(e,t){return new Float32Array(this.ex.memory.buffer,e,t)}result(e){return this.f32(this.ex.fp_result_ptr(),e)}withF32(e,t){let a=e.length*4,r=this.ex.fp_alloc(a);this.f32(r,e.length).set(e);try{return t(r)}finally{this.ex.fp_free(r,a)}}setMaterial(e,t){this.ex.fp_set_material(e,t.friction??.6,t.restitution??.2,t.ricochetAngleDeg??0,t.ricochetEnergyKeep??.3)}reset(){this.ex.fp_world_reset()}staticMeshes=[];addStaticMesh(e,t,a){this.staticMeshes.push({positions:Float32Array.from(e),indices:Uint32Array.from(t),material:a});let r=e.length/3,s=t.length,i=r*12,o=s*4,c=this.ex.fp_alloc(i),l=this.ex.fp_alloc(o);this.f32(c,e.length).set(e),new Uint32Array(this.ex.memory.buffer,l,s).set(t);let b=this.ex.fp_add_static_mesh(c,r,l,s,a);return this.ex.fp_free(c,i),this.ex.fp_free(l,o),b}addGeometry(e,t,a){let r=e.positions,s=new Float32Array(r.length),i=f.create();for(let o=0;o<r.length;o+=3)f.transformMat4(i,r.subarray(o,o+3),t),s.set(i,o);return this.addStaticMesh(s,e.indices,a)}build(){this.ex.fp_build()}raycast(e,t,a,r=!0){if(!this.ex.fp_raycast(e[0],e[1],e[2],t[0],t[1],t[2],a,r?1:0))return null;let i=this.result(10);return{t:i[0],point:f.create(i[1],i[2],i[3]),normal:f.create(i[4],i[5],i[6]),material:i[7],triangle:i[8],body:i[9]}}raycastBatch(e,t){let a=e.length/6,r=this.ex.fp_alloc(a*4),s=this.withF32(e,i=>(this.ex.fp_raycast_batch(i,a,t,r),this.f32(r,a).slice()));return this.ex.fp_free(r,a*4),s}bakeSkyVisibility(e,t,a,r,s,i=48,o=60){let c=a*r*s,l=this.ex.fp_alloc(c*4);this.ex.fp_bake_sky_visibility(e[0],e[1],e[2],t,a,r,s,i,o,l);let b=this.f32(l,c).slice();return this.ex.fp_free(l,c*4),b}bakeGI(e){let t=e.nx*e.ny*e.nz,a=t*12*4,r=108,s=Math.max(4,e.albedo.length*4),i=this.ex.fp_alloc(a),o=this.ex.fp_alloc(r),c=this.ex.fp_alloc(s);this.f32(o,27).set(Array.from(e.skySH).slice(0,27)),this.f32(c,e.albedo.length).set(e.albedo);let l=this.ex.fp_bake_gi(e.min[0],e.min[1],e.min[2],e.cell,e.nx,e.ny,e.nz,e.rays??192,e.passes??3,e.sunDir[0],e.sunDir[1],e.sunDir[2],e.sunRGB[0],e.sunRGB[1],e.sunRGB[2],o,c,Math.floor(e.albedo.length/3),e.maxDist??400,i),b=this.f32(i,t*12).slice();return this.ex.fp_free(i,a),this.ex.fp_free(o,r),this.ex.fp_free(c,s),{data:b,filled:l}}giPositions(e,t,a,r,s){let i=e.nx*e.ny*e.nz,o=this.ex.fp_alloc(i*12),c=this.ex.fp_alloc(Math.max(4,i));this.ex.fp_gi_positions(e.min[0],e.min[1],e.min[2],e.cell,e.nx,e.ny,e.nz,e.rays,t,a,o,c);let l=t*e.nx*e.ny,b=Math.min(e.nz,a)*e.nx*e.ny;r.set(this.f32(o+l*12,(b-l)*3),l*3),s.set(new Uint8Array(this.ex.memory.buffer,c+l,b-l),l),this.ex.fp_free(o,i*12),this.ex.fp_free(c,Math.max(4,i))}giPass(e,t,a,r,s,i,o,c){let l=e.nx*e.ny*e.nz,b={pos:l*12,valid:Math.max(4,l),prev:l*48,out:l*48,sh:108,al:Math.max(4,e.albedo.length*4)},d=this.ex.fp_alloc(b.pos),m=this.ex.fp_alloc(b.valid),u=this.ex.fp_alloc(b.out),y=this.ex.fp_alloc(b.sh),p=this.ex.fp_alloc(b.al),w=s?this.ex.fp_alloc(b.prev):0;this.f32(d,l*3).set(a),new Uint8Array(this.ex.memory.buffer,m,l).set(r),s&&this.f32(w,l*12).set(s),this.f32(y,27).set(Array.from(e.skySH).slice(0,27)),this.f32(p,e.albedo.length).set(e.albedo),this.ex.fp_gi_pass(e.min[0],e.min[1],e.min[2],e.cell,e.nx,e.ny,e.nz,e.rays,t,e.sunDir[0],e.sunDir[1],e.sunDir[2],e.sunRGB[0],e.sunRGB[1],e.sunRGB[2],y,p,Math.floor(e.albedo.length/3),e.maxDist??400,d,m,w,i,o,u);let x=i*e.nx*e.ny,M=Math.min(e.nz,o)*e.nx*e.ny;c.set(this.f32(u+x*48,(M-x)*12),x*12),this.ex.fp_free(d,b.pos),this.ex.fp_free(m,b.valid),this.ex.fp_free(u,b.out),this.ex.fp_free(y,b.sh),this.ex.fp_free(p,b.al),s&&this.ex.fp_free(w,b.prev)}createCharacter(e,t,a=.35,r=50){return new Lr(this,this.ex.fp_character_create(e,t,a,r),e,t)}createBody(e,t,a,r){return new Ir(this,this.ex.fp_body_create(e,t[0],t[1],t[2],a,r))}bodyState(e){let t=this.ex.fp_bodies_ptr();return this.f32(t+e*this.stride*4,this.stride)}setGravity(e,t,a){this.ex.fp_set_gravity(e,t,a)}setAtmosphere(e,t,a,r){this.ex.fp_set_atmosphere(e,t,a,r[0],r[1],r[2])}spawnProjectile(e,t,a){return this.ex.fp_projectile_spawn(e[0],e[1],e[2],t[0],t[1],t[2],a.bcG7,a.massKg,a.diameterM,a.maxTime??6,a.userId??0)}projectiles(){let e=this.ex.fp_projectile_count();if(!e)return[];let t=this.f32(this.ex.fp_projectiles_ptr(),e*8),a=[];for(let r=0;r<e;r++){let s=r*8;a.push({id:t[s],userId:t[s+1],position:f.create(t[s+2],t[s+3],t[s+4]),velocity:f.create(t[s+5],t[s+6],t[s+7])})}return a}step(e){this.ex.fp_step(e);let t=this.ex.fp_projectile_hit_count();if(t&&this.onProjectileHit.length){let r=this.f32(this.ex.fp_projectile_hits_ptr(),t*16).slice();for(let s=0;s<t;s++){let i=s*16,o={userId:r[i],point:f.create(r[i+1],r[i+2],r[i+3]),normal:f.create(r[i+4],r[i+5],r[i+6]),velocity:f.create(r[i+7],r[i+8],r[i+9]),material:r[i+10],distance:r[i+11],timeOfFlight:r[i+12],body:r[i+13],ricochet:r[i+14]>.5,projectileId:r[i+15]};for(let c of this.onProjectileHit)c(o)}}let a=this.ex.fp_contact_count();if(a&&this.onContact.length){let r=this.f32(this.ex.fp_contacts_ptr(),a*10).slice();for(let s=0;s<a;s++){let i=s*10,o={body:r[i],point:f.create(r[i+1],r[i+2],r[i+3]),normal:f.create(r[i+4],r[i+5],r[i+6]),impulse:r[i+7],speed:r[i+8],otherMaterial:r[i+9]};for(let c of this.onContact)c(o)}}}};var Q=(n,e,t,a,r,s="",i="",o)=>({key:n,label:e,def:t,min:a,max:r,unit:s,help:i,step:o}),jr=[Q("peakSpl","Peak SPL @1 m",158,120,180,"dB","Muzzle-blast peak sound pressure level 1 m from the muzzle, on axis. Rifles \u2248 155\u2013165, pistols \u2248 150\u2013160."),Q("positiveMs","Positive phase",1,.1,5,"ms","Friedlander positive-phase duration at 1 m. Longer = bigger charge / longer barrel gas release.",.01),Q("decayB","Blast decay (b)",1.4,.3,5,"","Friedlander waveform decay constant. Higher = sharper, smaller negative phase.",.01),Q("precursorDb","Precursor",-14,-60,0,"dB","Level of the precursor shock (air column ahead of the bullet) relative to the main blast."),Q("precursorLeadMs","Precursor lead",.35,0,2,"ms","How far the precursor leads the main blast.",.01),Q("turbDb","Gas plume roar",-6,-60,0,"dB","Turbulent propellant-gas noise relative to the blast peak."),Q("turbMs","Roar decay (T60)",260,2,800,"ms","Time for the gas roar to fall 60 dB (a quieter late tail at 3\xD7 this follows)."),Q("turbHp","Roar highpass",120,20,2e3,"Hz"),Q("turbLp","Roar lowpass",5500,500,16e3,"Hz"),Q("bodyDb","Body (perceived boom)",-11,-60,0,"dB",'Low-frequency chest/room "boom" (two partials with a soft-saturated attack). \u221260 for a purely measured (thin) signature.'),Q("bodyHz","Body frequency",62,20,400,"Hz"),Q("bodyMs","Body decay (T60)",280,5,1e3,"ms"),Q("bodyDrop","Body pitch drop",.35,0,2,"","Initial pitch overshoot that glides down to the body frequency.",.01),Q("suppress","Suppressor",0,0,1,"","Suppressor amount (0 none \u2026 1 full can).",.01),Q("suppRedDb","Suppressor reduction",28,0,45,"dB","Peak reduction a full suppressor provides (good cans: 25\u201335 dB)."),Q("firstPopDb","First-round pop",0,0,10,"dB","Extra level on the first suppressed shot (oxygen in the can). Set by the weapon at runtime."),Q("variation","Shot-to-shot variation",.5,0,1,"","Random variation of level, duration and spectrum per shot.",.01),Q("seed","Seed",0,0,1e5,"","Randomised per shot by the host.",1),Q("brightHz","Brightness",16e3,1e3,2e4,"Hz","Final band-limit (anti-alias / mic bandwidth)."),Q("directivityDb","Directivity (front\u2212rear)",9,0,20,"dB","How much louder the blast is in front of the muzzle than behind it."),Q("rearLpHz","Rear darkening",4500,200,2e4,"Hz","Lowpass applied towards the rear of the muzzle (shooter\u2019s own ears are rear-ish)."),Q("tailSendDb","Environment send",0,-40,12,"dB","Adjusts how much this weapon excites reflections / reverb."),Q("crackDb","Report (snap)",-4,-90,6,"dB","Sharp band-limited report burst that gives each gun its character (relative to the blast peak)."),Q("crackHz","Report pitch",3400,300,9e3,"Hz","Pistols \u2248 2\u20132.5 kHz (hard snap), 5.56 \u2248 4\u20135 kHz (crack), big rifles \u2248 2.5 kHz."),Q("crackMs","Report decay (T60)",10,1,200,"ms"),Q("subDb","Sub thump",-13,-90,6,"dB","Sub-bass pressure pulse you feel in your chest (relative to the blast peak)."),Q("subHz","Sub frequency",40,15,150,"Hz"),Q("subMs","Sub decay (T60)",360,5,1e3,"ms"),Q("driveDb","Spike compaction",12,0,30,"dB","Soft-clips the instantaneous blast spike (only the spike) this far below its peak so the 50\u2013300 ms body carries the loudness (how a shot feels, not how a microphone peaks).")],Hn=[Q("levelSpl","Peak SPL @1 m",120,60,170,"dB"),Q("attackMs","Attack",.5,.01,50,"ms","",.01),Q("decayMs","Decay (T60)",120,1,3e3,"ms"),Q("hpHz","Highpass",200,20,8e3,"Hz"),Q("lpHz","Lowpass",5e3,200,2e4,"Hz"),Q("thumpHz","Thump frequency",90,20,400,"Hz"),Q("thumpDb","Thump level",-6,-60,12,"dB"),Q("thumpMs","Thump decay",60,2,1e3,"ms"),Q("grainsPerS","Grain density",0,0,3e3,"/s","Granular crackle (gravel, dry grass, debris)."),Q("grainDb","Grain level",-10,-60,6,"dB"),Q("seed","Seed",0,0,1e5,"","",1),Q("resonance","Filter Q",.7,.3,8,"","",.01),Q("hit2Ms","Second hit delay",0,0,500,"ms","Two-stage clicks / bounces: the envelope re-triggers this long after the first hit."),Q("hit2Db","Second hit level",-200,-200,12,"dB","Relative to the first hit; \u2212200 = none.")],sa=[Q("protection","Hearing protection",0,0,2,"","0 none, 1 passive earmuffs, 2 electronic earmuffs",1),Q("passiveAttenDb","Passive attenuation",25,0,40,"dB","Real-world muff/plug attenuation (\u2248 NRR \u2212 7)."),Q("passiveHfExtraDb","Extra HF attenuation",10,0,30,"dB"),Q("elecGainDb","Electronic gain",6,0,24,"dB","Ambient amplification of electronic muffs."),Q("elecLimitSpl","Electronic limit",82,70,95,"dB SPL","Output limit of electronic muffs (most cut at ~82 dB)."),Q("ttsThresholdSpl","Damage threshold (peak)",130,110,150,"dB SPL","Impulses above this cause a temporary threshold shift."),Q("ttsRate","TTS rate",.15,0,2,"dB/dB","dB of threshold shift per dB above threshold per impulse.",.01),Q("ttsMaxDb","Max TTS",18,0,60,"dB"),Q("ttsRecoveryS","Recovery time constant",10,.5,600,"s","Real-world recovery takes hours; games use 10\u201360 s."),Q("tinnitusHz","Tinnitus frequency",5200,1e3,12e3,"Hz"),Q("tinnitusDb","Tinnitus level",-46,-80,-6,"dBFS","Ear ringing after loud exposure, at full TTS. \u221280 = off. \u221246 is a faint ring after a long unprotected string; \u221230 is loud and obvious."),Q("tinnitusTtsDb","Tinnitus full at TTS",20,1,40,"dB"),Q("reflexThresholdSpl","Acoustic reflex threshold",95,70,120,"dB SPL"),Q("reflexMaxDb","Reflex max attenuation",6,0,30,"dB"),Q("reflexAttackMs","Reflex latency",90,5,300,"ms"),Q("reflexReleaseMs","Reflex release",900,50,5e3,"ms"),Q("muffle","Muffling amount",1,0,2,"","How strongly TTS dulls and quiets hearing.",.01),Q("enable","Hearing model",1,0,1,"","",1),Q("dullRecoveryMs","Post-shot dulling recovery",350,20,3e3,"ms","After every impulse over the damage threshold the highs drop for a moment and recover with this time constant."),Q("dullHz","Dulling cutoff",4e3,800,12e3,"Hz","Lowpass cutoff at full post-shot dulling.")],ia=[Q("calibrationSpl","Calibration (SPL @ 0 dBFS)",112,70,140,"dB SPL","Acoustic level that maps to digital full scale before dynamics. Lower = everything louder. 112 keeps footsteps/casings 35\u201340 dB under a shot."),Q("compThresholdDb","Loudness threshold",-6,-60,0,"dBFS"),Q("compRatio","Loudness ratio",2.6,1,20,":1","Perceptual compression of the 110+ dB real-world range into a playable range. Only shots and very close impacts cross the threshold.",.1),Q("compKneeDb","Knee",6,0,24,"dB"),Q("compAttackMs","Attack",.3,.05,100,"ms","Fast: every onset is measured on its own level, so full-auto shots never duck each other.",.05),Q("compReleaseMs","Release",90,10,3e3,"ms","Release after a brief peak; sustained loudness releases \u2248 4\xD7 slower (program-dependent), so the world stays ducked after a shot and recovers smoothly."),Q("limitCeilingDb","Limiter ceiling",-.3,-12,0,"dBFS","",.1),Q("limitReleaseMs","Limiter release",12,1,500,"ms","Release after an isolated peak (sustained limiting releases slower)."),Q("masterDb","Master volume",0,-60,12,"dB"),Q("busWeaponsDb","Weapons bus",0,-60,12,"dB"),Q("busImpactsDb","Impacts bus",0,-60,12,"dB"),Q("busEnvDb","Environment bus",0,-60,12,"dB"),Q("busUiDb","UI bus",0,-60,12,"dB"),Q("erLevelDb","Early reflections",0,-40,12,"dB"),Q("reverbLevelDb","Late reverb",0,-40,12,"dB"),Q("convMix","Convolution mix",0,0,1,"","0 = algorithmic FDN, 1 = convolution IR",.01),Q("headRadiusM","Head radius",.0875,.06,.12,"m","",5e-4),Q("spatialEnable","Binaural",1,0,1,"","",1),Q("compDetectorMs","Loudness integration",2,0,100,"ms","RMS window of the loudness detector (0 = peak)."),Q("clipKneeDb","Saturation knee",-4,-24,-.1,"dBFS","Above this, the output saturates smoothly towards full scale: density instead of a 1 ms tick under a limiter.",.1),Q("makeupDb","Make-up gain",0,-12,24,"dB","Overall loudness after the perceptual compressor. Raise for an even louder mix."),Q("satAsym","Saturation asymmetry",.5,0,1,"","Positive half-cycles clip earlier than negative ones (even harmonics: the crunch of an overdriven ear / camera limiter).",.01),Q("satDullHz","Overload dulling cutoff",4500,800,16e3,"Hz","While the saturator is driven a lowpass drops towards this cutoff \u2014 the brief HF loss right after an overload."),Q("satDullMs","Overload dulling recovery",45,2,500,"ms")],oa=[Q("rt60Low","RT60 low",1.2,.05,12,"s","",.01),Q("rt60Mid","RT60 mid",1,.05,12,"s","",.01),Q("rt60High","RT60 high",.5,.05,12,"s","",.01),Q("xoverLow","Low crossover",250,50,1e3,"Hz"),Q("xoverHigh","High crossover",4e3,1e3,12e3,"Hz"),Q("size","Size",1,.1,8,"","Delay scale \u2248 room dimensions.",.01),Q("diffusion","Diffusion",.7,0,1,"","",.01),Q("predelayMs","Predelay",12,0,240,"ms"),Q("modDepthMs","Modulation depth",.35,0,3,"ms","",.01),Q("modRateHz","Modulation rate",.6,.05,5,"Hz","",.01),Q("levelDb","Level",0,-40,12,"dB"),Q("toneHz","Tone",9e3,1e3,2e4,"Hz")],ca=[Q("windSpl","Wind level",48,0,90,"dB SPL"),Q("windGust","Gustiness",.5,0,1,"","",.01),Q("windGustRate","Gust rate",.15,.01,2,"Hz","",.01),Q("windToneHz","Wind tone",600,100,3e3,"Hz"),Q("rumbleSpl","Distant rumble",38,0,80,"dB SPL"),Q("enable","Ambience",1,0,1,"","",1)],Me={LISTENER:1,SPAWN:2,VOICE_POS:3,VOICE_TAPS:4,VOICE_OCCLUSION:5,VOICE_STOP:6,ATMOSPHERE:7,REVERB:8,HEARING:9,MASTER:10,AMBIENCE:11,VOICE_SEND:12,RESET_HEARING:13},Ft={GUNSHOT:1,NWAVE:2,MODAL:3,NOISE:4,SAMPLE:5},Ge={VOICE_ID:0,KIND:1,BUS:2,PX:3,DX:6,DIRECTIVITY_DB:9,REAR_LP_HZ:10,DISTANCE_MODE:11,MIN_DIST:12,REVERB_SEND_DB:13,SPATIAL:14,DELAY_MS:15,HEADER:16},st={WEAPONS:0,IMPACTS:1,ENV:2,UI:3},Ze={PEAK_L:0,PEAK_R:1,SCENE_SPL:2,TTS:3,COMP_GR:4,LIMIT_GR:5,VOICES:6,REFLEX_GR:7,TINNITUS:8,EAR_SPL:9,SPEED_OF_SOUND:10,TIME:11,MAX_EAR_SPL:12,SAT_CUTOFF_HZ:13};function kt(n,e={}){let t=new Float32Array(n.length);return n.forEach((a,r)=>{t[r]=e[a.key]??a.def}),t}var Wn=n=>331.3*Math.sqrt(1+n/273.15);function qn(n){let e=Math.max(n.mach,1.0001),t=Math.max(n.missDistance,.05),a=n.ambientPa??101325,r=n.c??343,s=Math.pow(e*e-1,.125),i=a*.53*s*n.diameter/(Math.pow(t,.75)*Math.pow(n.length,.25)),o=1.82*e*Math.pow(t,.25)*n.diameter/(r*Math.pow(e*e-1,.375)*Math.pow(n.length,.25));return{peakPa:i,duration:o}}function la(n=1){let e=[1180,2230,3410,4870,6620,8900,11200],t=[.06,.05,.04,.032,.025,.018,.012],a=[.55,.6,.5,.36,.27,.18,.1];return e.map((r,s)=>({freq:r*n,t60:t[s],amp:a[s]}))}function _n(n,e,t=1,a=0){let r=n.slice(0,48),s=e.slice(0,8),i=new Float32Array(4+r.length*3+s.length*4);i[0]=t,i[1]=r.length,i[2]=s.length,i[3]=a,r.forEach((c,l)=>{i[4+l*3]=c.freq,i[5+l*3]=c.t60,i[6+l*3]=c.amp});let o=4+r.length*3;return s.forEach((c,l)=>{i[o+l*4]=c.timeMs,i[o+l*4+1]=c.amp,i[o+l*4+2]=c.contactMs,i[o+l*4+3]=c.noiseDb??-200}),i}var Kn=n=>-20*Math.log10(Math.max(n,.1)),Jn=(n,e)=>.057*Math.sqrt(n/Math.max(e,.05));var _a={rifle556_16in:{name:'5.56\xD745 \u2014 16" carbine',params:{peakSpl:160,positiveMs:.9,decayB:1.6,crackDb:-2,crackHz:4200,crackMs:8,turbDb:-5,turbMs:360,turbHp:150,turbLp:6500,bodyDb:-9,bodyHz:70,bodyMs:320,bodyDrop:.4,subDb:-12,subHz:44,subMs:420,driveDb:12,directivityDb:9,rearLpHz:5e3,tailSendDb:4},action:{brightness:1.35,level:1.4,hits:[{timeMs:-3,amp:.15,contactMs:.05,noiseDb:-14},{timeMs:3,amp:1.1,contactMs:.12,noiseDb:-6},{timeMs:40,amp:.5,contactMs:.3,noiseDb:-14},{timeMs:72,amp:1.5,contactMs:.09,noiseDb:-3}]},samples:{shot:["shot.rifle556"],shotTail:["shot.rifle556.mid"],auto:["shot.rifle556.auto"],suppressed:["shot.rifle556.suppressed","shot.suppressed"]}},rifle556_10in:{name:'5.56\xD745 \u2014 10.3" SBR',params:{peakSpl:163,positiveMs:1.1,decayB:1.5,crackDb:-1,crackHz:3800,crackMs:10,turbDb:-3,turbMs:380,turbHp:140,turbLp:5500,bodyDb:-7,bodyHz:60,bodyMs:380,bodyDrop:.4,subDb:-9,subHz:42,subMs:480,driveDb:14,directivityDb:7,rearLpHz:6500,tailSendDb:5},action:{brightness:1.3,level:1.4,hits:[{timeMs:-3,amp:.15,contactMs:.05,noiseDb:-14},{timeMs:2.5,amp:1.2,contactMs:.12,noiseDb:-6},{timeMs:36,amp:.5,contactMs:.3,noiseDb:-14},{timeMs:64,amp:1.6,contactMs:.09,noiseDb:-3}]},samples:{shot:["shot.rifle556"],shotTail:["shot.rifle556.mid"],auto:["shot.rifle556.auto"],suppressed:["shot.rifle556.suppressed","shot.suppressed"]}},rifle308_bolt:{name:'.308 Win \u2014 20" bolt action',params:{peakSpl:163,positiveMs:1.4,decayB:1.3,crackDb:-4,crackHz:2600,crackMs:12,turbDb:-5,turbMs:360,turbHp:110,turbLp:4800,bodyDb:-6,bodyHz:50,bodyMs:450,bodyDrop:.35,subDb:-7,subHz:34,subMs:560,driveDb:13,directivityDb:10,rearLpHz:4500,tailSendDb:6},action:{brightness:.85,level:.6,hits:[{timeMs:-4,amp:.45,contactMs:.06,noiseDb:-10}]},samples:{shot:["shot.rifle308","shot.rifle3006"],shotTail:["shot.rifle3006.mid"]}},pistol9mm:{name:'9\xD719 \u2014 4" pistol',params:{peakSpl:157,positiveMs:.6,decayB:1.7,crackDb:-1,crackHz:2300,crackMs:7,turbDb:-6,turbMs:200,turbHp:200,turbLp:6e3,bodyDb:-12,bodyHz:100,bodyMs:170,bodyDrop:.5,subDb:-20,subHz:55,subMs:160,driveDb:11,directivityDb:6,rearLpHz:7e3,precursorDb:-20,tailSendDb:4},action:{brightness:.95,level:1.3,hits:[{timeMs:-2,amp:.25,contactMs:.05,noiseDb:-12},{timeMs:4,amp:.9,contactMs:.1,noiseDb:-6},{timeMs:14,amp:1.1,contactMs:.09,noiseDb:-4}]},samples:{shot:["shot.pistol9"],shotTail:["shot.pistol9.mid"],suppressed:["shot.pistol9.suppressed","shot.suppressed"]}},pistol9mm_auto:{name:'9\xD719 \u2014 4" select-fire pistol',params:{peakSpl:157,positiveMs:.6,decayB:1.7,crackDb:-1,crackHz:2400,crackMs:6,turbDb:-5,turbMs:140,turbHp:200,turbLp:6500,bodyDb:-12,bodyHz:105,bodyMs:150,bodyDrop:.5,subDb:-19,subHz:58,subMs:140,driveDb:11,directivityDb:6,rearLpHz:7e3,precursorDb:-20,tailSendDb:3},action:{brightness:1,level:1.3,hits:[{timeMs:-2,amp:.25,contactMs:.05,noiseDb:-12},{timeMs:4,amp:.9,contactMs:.1,noiseDb:-6},{timeMs:12,amp:1,contactMs:.09,noiseDb:-4}]},samples:{shot:["shot.pistol9"],shotTail:["shot.pistol9.mid"],auto:["shot.smg9"],suppressed:["shot.pistol9.suppressed","shot.suppressed"]}}},Zl={outdoorRange:{name:"Outdoor range (open field, berms)",reverb:{rt60Low:1.1,rt60Mid:.75,rt60High:.25,xoverLow:300,xoverHigh:2500,size:2.6,diffusion:.7,predelayMs:20,modDepthMs:.4,modRateHz:.4,levelDb:-3,toneHz:4500},criticalDistance:32,ambience:{windSpl:46,windGust:.55,windGustRate:.12,windToneHz:520,rumbleSpl:36,enable:1},farReflectors:[{azimuth:0,distance:140,reflectivity:.22,lowpassHz:2e3},{azimuth:75,distance:230,reflectivity:.15,lowpassHz:1600},{azimuth:-80,distance:190,reflectivity:.17,lowpassHz:1600},{azimuth:180,distance:300,reflectivity:.12,lowpassHz:1400}]},coveredRange:{name:"Covered firing point (roof, baffles, open field beyond)",reverb:{rt60Low:1.8,rt60Mid:1.2,rt60High:.45,xoverLow:300,xoverHigh:3e3,size:1.6,diffusion:.85,predelayMs:10,modDepthMs:.35,modRateHz:.5,levelDb:0,toneHz:6e3},criticalDistance:8,ambience:{windSpl:44,windGust:.5,windGustRate:.12,windToneHz:480,rumbleSpl:36,enable:1},farReflectors:[{azimuth:0,distance:140,reflectivity:.22,lowpassHz:2e3},{azimuth:75,distance:230,reflectivity:.15,lowpassHz:1600},{azimuth:-80,distance:190,reflectivity:.17,lowpassHz:1600}]},indoorRange:{name:"Indoor range (concrete, baffles)",reverb:{rt60Low:1.4,rt60Mid:1.1,rt60High:.6,xoverLow:250,xoverHigh:4e3,size:1.2,diffusion:.8,predelayMs:8,modDepthMs:.3,modRateHz:.6,levelDb:0,toneHz:8e3},criticalDistance:Jn(200*3.5,1.1),ambience:{windSpl:0,windGust:0,windGustRate:.1,windToneHz:500,rumbleSpl:42,enable:1}},forest:{name:"Forest",reverb:{rt60Low:1.8,rt60Mid:1.5,rt60High:.6,xoverLow:300,xoverHigh:3e3,size:4,diffusion:.9,predelayMs:25,modDepthMs:.5,modRateHz:.3,levelDb:0,toneHz:4500},criticalDistance:18,ambience:{windSpl:50,windGust:.7,windGustRate:.18,windToneHz:900,rumbleSpl:30,enable:1}}},Xn=n=>Kn(n.criticalDistance),Ka={dirt:{levelSpl:112,attackMs:.3,decayMs:90,hpHz:80,lpHz:2500,thumpHz:70,thumpDb:0,thumpMs:70,grainsPerS:900,grainDb:-14,resonance:.7},gravel:{levelSpl:116,attackMs:.2,decayMs:110,hpHz:300,lpHz:7e3,thumpHz:90,thumpDb:-8,thumpMs:40,grainsPerS:2200,grainDb:-6,resonance:.8},concrete:{levelSpl:124,attackMs:.05,decayMs:45,hpHz:900,lpHz:11e3,thumpHz:140,thumpDb:-10,thumpMs:20,grainsPerS:1500,grainDb:-10,resonance:1.1},wood:{levelSpl:118,attackMs:.1,decayMs:70,hpHz:250,lpHz:5e3,thumpHz:180,thumpDb:-2,thumpMs:50,grainsPerS:300,grainDb:-14,resonance:1.6},paper:{levelSpl:98,attackMs:.05,decayMs:25,hpHz:1500,lpHz:9e3,thumpHz:200,thumpDb:-30,thumpMs:10,grainsPerS:0,grainDb:-30,resonance:.7},cardboard:{levelSpl:104,attackMs:.08,decayMs:40,hpHz:400,lpHz:5e3,thumpHz:120,thumpDb:-6,thumpMs:30,grainsPerS:0,grainDb:-30,resonance:1.2}};var Yn={magRelease:{sample:"mech.magRelease",noise:{levelSpl:62,attackMs:.15,decayMs:22,hpHz:1800,lpHz:9500,thumpHz:420,thumpDb:-10,thumpMs:7,resonance:1.3},ring:{brightness:1.4,level:.1,hits:[{timeMs:0,amp:.25,contactMs:.06,noiseDb:-8}]}},magOut:{sample:"mech.magOut",noise:{levelSpl:58,attackMs:8,decayMs:140,hpHz:500,lpHz:6e3,thumpDb:-40,grainsPerS:350,grainDb:-14,resonance:.8}},magDropConcrete:{sample:"mech.magDropConcrete",noise:{levelSpl:86,attackMs:.08,decayMs:60,hpHz:220,lpHz:7500,thumpHz:150,thumpDb:3,thumpMs:38,grainsPerS:500,grainDb:-10,resonance:1.1,hit2Ms:48,hit2Db:-9},ring:{brightness:.55,level:.15,hits:[{timeMs:0,amp:.6,contactMs:.25,noiseDb:-6}]}},magDropDirt:{sample:"mech.magDropDirt",noise:{levelSpl:76,attackMs:.6,decayMs:85,hpHz:70,lpHz:2400,thumpHz:72,thumpDb:5,thumpMs:65,grainsPerS:700,grainDb:-16,resonance:.75}},magSeat:{sample:"mech.magSeat",noise:{levelSpl:68,attackMs:.1,decayMs:34,hpHz:650,lpHz:8500,thumpHz:230,thumpDb:-3,thumpMs:22,resonance:1,hit2Ms:35,hit2Db:-2},ring:{brightness:1.15,level:.11,hits:[{timeMs:0,amp:.6,contactMs:.08,noiseDb:-6},{timeMs:35,amp:.5,contactMs:.06,noiseDb:-8}]}},slideRack:{sample:"mech.slideRack",noise:{levelSpl:62,attackMs:5,decayMs:125,hpHz:750,lpHz:7800,thumpDb:-40,grainsPerS:1100,grainDb:-7,resonance:.9},ring:{brightness:1.25,level:.075,hits:[{timeMs:0,amp:.35,contactMs:.05,noiseDb:-10}]}},slideStop:{sample:"mech.slideStop",noise:{levelSpl:66,attackMs:.08,decayMs:40,hpHz:480,lpHz:9500,thumpHz:270,thumpDb:-2,thumpMs:18,resonance:1},ring:{brightness:1.1,level:.095,hits:[{timeMs:0,amp:.9,contactMs:.07,noiseDb:-6}]}},slideHome:{sample:"mech.slideHome",noise:{levelSpl:72,attackMs:.05,decayMs:58,hpHz:280,lpHz:10500,thumpHz:175,thumpDb:2,thumpMs:30,resonance:1,hit2Ms:7,hit2Db:-9},ring:{brightness:1,level:.085,hits:[{timeMs:0,amp:1.5,contactMs:.09,noiseDb:-3}]}},chargingHandle:{sample:"mech.chargingHandle",noise:{levelSpl:64,attackMs:1.5,decayMs:95,hpHz:600,lpHz:7200,thumpDb:-40,grainsPerS:600,grainDb:-10,resonance:.9,hit2Ms:65,hit2Db:-3},ring:{brightness:1.3,level:.07,hits:[{timeMs:0,amp:.3,contactMs:.05,noiseDb:-10},{timeMs:65,amp:.7,contactMs:.07,noiseDb:-6}]}},boltCatch:{sample:"mech.boltCatch",noise:{levelSpl:66,attackMs:.08,decayMs:28,hpHz:950,lpHz:9500,thumpHz:320,thumpDb:-8,thumpMs:12,resonance:1.2},ring:{brightness:1.35,level:.075,hits:[{timeMs:0,amp:.4,contactMs:.04,noiseDb:-8}]}},selector:{sample:"mech.selector",noise:{levelSpl:60,attackMs:.1,decayMs:20,hpHz:1500,lpHz:9e3,thumpDb:-40,resonance:1.2,hit2Ms:16,hit2Db:2},ring:{brightness:1.75,level:.025,hits:[{timeMs:0,amp:.55,contactMs:.035,noiseDb:-8},{timeMs:16,amp:.85,contactMs:.03,noiseDb:-6}]}},dryFire:{sample:"mech.dryFire",noise:{levelSpl:62,attackMs:.05,decayMs:18,hpHz:1200,lpHz:9e3,thumpHz:350,thumpDb:-12,thumpMs:8,resonance:1.1},ring:{brightness:1.5,level:.075,hits:[{timeMs:0,amp:.2,contactMs:.04,noiseDb:-10}]}}},Qn={levelSpl:45,attackMs:150,decayMs:420,hpHz:340,lpHz:1900,thumpDb:-60,grainsPerS:0,grainDb:-60,resonance:1.7};var Zi=2e-5,$i=n=>Zi*Math.pow(10,n/20),eo=(n,e)=>n===e||n.startsWith(e+".")&&/^\d+$/.test(n.slice(e.length+1)),Gr=class{buf=new Float32Array(4096);len=0;push(e,t){let a=this.len+2+t.length;if(a>this.buf.length){let r=new Float32Array(Math.max(a,this.buf.length*2));r.set(this.buf.subarray(0,this.len)),this.buf=r}this.buf[this.len++]=e,this.buf[this.len++]=t.length;for(let r=0;r<t.length;r++)this.buf[this.len++]=t[r]}take(){if(!this.len)return null;let e=this.buf.slice(0,this.len);return this.len=0,e}},Fr=class{constructor(e,t){this.v=e;this.id=t}setPosition(e,t){this.v.cmd(Me.VOICE_POS,t?[this.id,e[0],e[1],e[2],t[0],t[1],t[2]]:[this.id,e[0],e[1],e[2]])}setTaps(e){this.v.setTaps(this.id,e)}setOcclusion(e,t){this.v.cmd(Me.VOICE_OCCLUSION,[this.id,e,t])}setSend(e){this.v.cmd(Me.VOICE_SEND,[this.id,e])}stop(e=30){this.v.cmd(Me.VOICE_STOP,[this.id,e])}},Ur=class{params={hearing:kt(sa),master:kt(ia),reverb:kt(oa),ambience:kt(ca)};zoneSendDb=-30;shotWet={recordedSendCutDb:9,tailDb:-14,burstWindowS:.25,burstDuckDb:2,burstDuckMaxDb:6,burstChokeMs:160};burst={t:-1e9,n:0,voices:[]};clock(){return 0}zone=null;atmosphere={tempC:15,humidity:.6,pressureKpa:101.325};cmdb=new Gr;nextId=1;random=Math.random;samples=new Map;lastPick=new Map;nextSampleId=1;cmd(e,t){this.cmdb.push(e,t)}registerSample(e,t,a,r={}){let s=t;r.trimMs&&r.trimMs>0&&(s=s.subarray(Math.min(s.length,Math.round(r.trimMs/1e3*a)))),Math.abs(a-this.engineRate)>.5&&(s=to(s,a,this.engineRate));let i=0;for(let b=0;b<s.length;b++){let d=Math.abs(s[b]);d>i&&(i=d)}let c=this.samples.get(e)?.id??this.nextSampleId++,l={id:c,slot:e,peak:Math.max(i,1e-6),frames:s.length,gainDb:r.gainDb??0,loop:!!r.loop};return this.uploadSample(c,s),this.samples.set(e,l),l}samplesFor(e){let t=Array.isArray(e)?e:[e],a=[];for(let[r,s]of this.samples)t.some(i=>eo(r,i))&&a.push(s);return a}hasSample(e){return this.samplesFor(e).length>0}pickSample(e,t){let a=this.lastPick.get(e),r=Math.min(t.length-1,this.random()*t.length|0);return t.length>1&&t[r].id===a&&(r=(r+1+Math.min(t.length-2,this.random()*(t.length-1)|0))%t.length),this.lastPick.set(e,t[r].id),t[r]}playSample(e,t,a,r={}){let s=$i(a+e.gainDb)/e.peak,i=Math.pow(2,(r.semitones??0)/12);return this.sample(e.id,t,s,{...r,rate:i,loop:r.loop??e.loop})}sampleAt(e,t,a,r={}){let s=this.samplesFor(e);if(!s.length)return null;let i=r.variation??1,o=this.pickSample(Array.isArray(e)?e.join("|"):e,s);return this.playSample(o,t,a+(this.random()*2-1)*i,{...r,semitones:(this.random()*2-1)*i})}loopSample(e,t,a={}){return this.sampleAt(e,[0,0,0],t,{bus:st.ENV,spatial:!1,reverbSendDb:-90,variation:0,loop:!0,...a})}setListener(e,t,a){this.cmd(Me.LISTENER,[e[0],e[1],e[2],t[0],t[1],t[2],a[0],a[1],a[2]])}setAtmosphere(e,t,a=101.325){this.atmosphere={tempC:e,humidity:t,pressureKpa:a},this.cmd(Me.ATMOSPHERE,[e,t,a])}setHearing(e){this.setGroup(sa,this.params.hearing,e,Me.HEARING)}setMaster(e){this.setGroup(ia,this.params.master,e,Me.MASTER)}setReverb(e){this.setGroup(oa,this.params.reverb,e,Me.REVERB)}setAmbience(e){this.setGroup(ca,this.params.ambience,e,Me.AMBIENCE)}resetHearing(){this.cmd(Me.RESET_HEARING,[])}setZone(e){this.zone=e,this.zoneSendDb=Xn(e),this.setReverb(e.reverb),this.setAmbience(e.ambience)}applyAll(){this.cmd(Me.HEARING,this.params.hearing),this.cmd(Me.MASTER,this.params.master),this.cmd(Me.REVERB,this.params.reverb),this.cmd(Me.AMBIENCE,this.params.ambience),this.cmd(Me.ATMOSPHERE,[this.atmosphere.tempC,this.atmosphere.humidity,this.atmosphere.pressureKpa])}setGroup(e,t,a,r){e.forEach((s,i)=>{a[s.key]!==void 0&&(t[i]=a[s.key])}),this.cmd(r,t)}seed(){return this.random()*1e5|0}spawn(e,t,a,r={}){let s=this.nextId++;this.nextId>16e6&&(this.nextId=1);let i=new Float32Array(Ge.HEADER+a.length);i[Ge.VOICE_ID]=s,i[Ge.KIND]=e,i[Ge.BUS]=r.bus??st.WEAPONS,i[Ge.PX]=t[0],i[Ge.PX+1]=t[1],i[Ge.PX+2]=t[2];let o=r.dir??[0,0,-1];return i[Ge.DX]=o[0],i[Ge.DX+1]=o[1],i[Ge.DX+2]=o[2],i[Ge.DIRECTIVITY_DB]=r.directivityDb??0,i[Ge.REAR_LP_HZ]=r.rearLpHz??2e4,i[Ge.DISTANCE_MODE]=r.distanceMode??0,i[Ge.MIN_DIST]=r.minDistance??.1,i[Ge.REVERB_SEND_DB]=r.reverbSendDb??this.zoneSendDb,i[Ge.SPATIAL]=r.spatial===!1?0:1,i[Ge.DELAY_MS]=r.delayMs??0,i.set(a,Ge.HEADER),this.cmd(Me.SPAWN,i),new Fr(this,s)}gunshot(e,t,a,r,s={},i={}){let o={...e.params,seed:this.seed(),...s},l=-Math.min(0,...e.action.hits.map(S=>S.timeMs)),b=this.shotWet,d=this.clock(),m=d+(i.delayMs??0)/1e3,u=m-this.burst.t,y=u>=0&&u<b.burstWindowS;if(y&&b.burstChokeMs>0&&this.burst.t<=d)for(let S of this.burst.voices)S.stop(b.burstChokeMs);this.burst.n=y?this.burst.n+1:0,this.burst.t=m;let p=Math.min(b.burstDuckMaxDb,b.burstDuckDb*this.burst.n),w=(o.tailSendDb??0)-p,x={...i,dir:a,directivityDb:o.directivityDb,rearLpHz:o.rearLpHz,delayMs:(i.delayMs??0)+l,reverbSendDb:(i.reverbSendDb??this.zoneSendDb)+w},M=e.samples,v=Math.max(0,Math.min(1,o.suppress??0)),g=[];M&&(v>.5&&M.suppressed&&(g=this.samplesFor(M.suppressed)),!g.length&&(s.auto??0)>.5&&M.auto&&(g=this.samplesFor(M.auto)),g.length||(g=this.samplesFor(M.shot)));let k=[],h=null,A=null;if(g.length){let S=h=this.pickSample(e.name,g),T=o.peakSpl-(o.suppRedDb??28)*v+(o.firstPopDb??0)*v+(e.sampleTrimDb??0)+(this.random()*2-1),z=(x.reverbSendDb??this.zoneSendDb)-b.recordedSendCutDb;k.push(this.playSample(S,t,T,{...x,reverbSendDb:z,semitones:this.random()*2-1}));let L=M?.shotTail?this.samplesFor(M.shotTail):[];L.length&&k.push(this.playSample(this.pickSample(e.name+"/tail",L),t,T+(e.sampleTailDb??b.tailDb)-p,{...x,reverbSendDb:-90,semitones:(this.random()*2-1)*.5}));let I=e.synthBedDb??-16;if(I>-90){let G={...o,peakSpl:o.peakSpl+I,crackDb:-90,precursorDb:-90,turbDb:(o.turbDb??-6)-12};A=this.spawn(Ft.GUNSHOT,t,kt(jr,G),x)}else A=k[0]}else A=this.spawn(Ft.GUNSHOT,t,kt(jr,o),x);let P=null;if(r&&e.action.hits.length){let S=la(e.action.brightness),T=e.action.hits.map(z=>({...z,timeMs:z.timeMs+l}));P=this.modal(S,T,r,e.action.level,{...i,delayMs:i.delayMs??0})}return this.burst.voices=k,{blast:A,action:P,samples:k,take:h,duckDb:p}}modal(e,t,a,r=1,s={}){return this.spawn(Ft.MODAL,a,_n(e,t,r,this.seed()),{bus:st.IMPACTS,...s})}noise(e,t,a={}){return this.spawn(Ft.NOISE,t,kt(Hn,{seed:this.seed(),...e}),{bus:st.IMPACTS,...a})}mech(e,t,a={}){let r=Yn[e],s=r.sample?this.sampleAt(r.sample,t,(r.noise.levelSpl??70)+10+(r.sampleDb??0),{bus:st.IMPACTS,...a}):null,i=s??this.noise(r.noise,t,a),o=r.ring&&!s?this.modal(la(r.ring.brightness),r.ring.hits,t,r.ring.level,a):null;return{noise:i,ring:o,recorded:s!==null}}impact(e,t,a=0,r={}){let s={...Ka[e]??Ka.dirt};return s.levelSpl=(s.levelSpl??110)+a,this.sampleAt(`impact.${e}`,t,s.levelSpl,{bus:st.IMPACTS,...r})??this.noise(s,t,{bus:st.IMPACTS,...r})}breath(e,t={}){return this.noise(Qn,e,t)}crack(e,t,a,r={}){return this.spawn(Ft.NWAVE,a,[e,t,20],{distanceMode:1,...r})}sample(e,t,a,r={}){return this.spawn(Ft.SAMPLE,t,[e,r.rate??1,a,r.loop?1:0,r.offsetS??0],r)}setTaps(e,t){let a=Math.min(t.length,10),r=new Float32Array(2+a*6);r[0]=e,r[1]=a;for(let s=0;s<a;s++){let i=t[s],o=2+s*6;r[o]=i.path,r[o+1]=i.gain,r[o+2]=i.lowpassHz,r[o+3]=i.dir[0],r[o+4]=i.dir[1],r[o+5]=i.dir[2]}this.cmd(Me.VOICE_TAPS,r)}},Ja=class n extends Ur{ctx;node;module;meters={peakL:-120,peakR:-120,sceneSpl:0,tts:0,compGr:0,limitGr:0,voices:0,reflexGr:0,tinnitus:0,earSpl:0,speedOfSound:343,time:0,cpu:0};onError=e=>console.error("[vorp]",e);constructor(e,t,a){super(),this.ctx=e,this.node=t,this.module=a,t.port.onmessage=r=>{let s=r.data;if(s.type==="meters"){let i=s.meters;Object.assign(this.meters,{peakL:i[Ze.PEAK_L],peakR:i[Ze.PEAK_R],sceneSpl:i[Ze.SCENE_SPL],tts:i[Ze.TTS],compGr:i[Ze.COMP_GR],limitGr:i[Ze.LIMIT_GR],voices:i[Ze.VOICES],reflexGr:i[Ze.REFLEX_GR],tinnitus:i[Ze.TINNITUS],earSpl:i[Ze.EAR_SPL],speedOfSound:i[Ze.SPEED_OF_SOUND],time:i[Ze.TIME],cpu:s.cpu})}else s.type==="error"&&this.onError(s.message)}}static async create(e){let t=e.context??new AudioContext({latencyHint:e.latencyHint??"interactive"}),[a]=await Promise.all([WebAssembly.compileStreaming(fetch(e.wasmUrl)).catch(async()=>WebAssembly.compile(await(await fetch(e.wasmUrl)).arrayBuffer())),t.audioWorklet.addModule(e.workletUrl)]),r=new AudioWorkletNode(t,"vorp",{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[2],processorOptions:{module:a}});r.connect(t.destination);let s=new n(t,r,a);return s.applyAll(),s}async resume(){this.ctx.state!=="running"&&await this.ctx.resume()}clock(){return this.ctx.currentTime}get engineRate(){return this.ctx.sampleRate}uploadSample(e,t){let a=t.slice();this.node.port.postMessage({type:"sample",id:e,data:a},[a.buffer])}flush(){let e=this.cmdb.take();e&&this.node.port.postMessage({type:"cmd",data:e},[e.buffer])}async loadSample(e,t){let a=await this.ctx.decodeAudioData(await(await fetch(t)).arrayBuffer()),r=new Float32Array(a.length);for(let s=0;s<a.numberOfChannels;s++){let i=a.getChannelData(s);for(let o=0;o<i.length;o++)r[o]+=i[o]/a.numberOfChannels}this.node.port.postMessage({type:"sample",id:e,data:r},[r.buffer])}async loadSamples(e,t="",a){let r=Object.entries(e.sounds??{}),s=[];return await Promise.all(r.map(async([i,o])=>{try{let c=a?.get(i);if(!c){let d=await fetch(t+o.file);if(!d.ok)throw new Error(`${d.status} ${d.statusText}`);c=await d.arrayBuffer()}let l=await this.ctx.decodeAudioData(c.slice(0)),b=new Float32Array(l.length);for(let d=0;d<l.numberOfChannels;d++){let m=l.getChannelData(d);for(let u=0;u<m.length;u++)b[u]+=m[u]/l.numberOfChannels}this.registerSample(i,b,l.sampleRate,{gainDb:o.gainDb,loop:o.loop,trimMs:o.trimMs}),s.push(i)}catch(c){console.warn(`[vorp] recorded sound "${i}" (${o.file}) not loaded:`,c)}})),s.sort(),console.info(`[vorp] recorded sounds: ${s.length}/${r.length} loaded${s.length?" \u2014 "+s.join(", "):""}`),s}async loadImpulseResponse(e,t=1){let a=await this.ctx.decodeAudioData(await(await fetch(e)).arrayBuffer()),r=a.getChannelData(0).slice(),s=a.numberOfChannels>1?a.getChannelData(1).slice():null;this.node.port.postMessage({type:"ir",left:r,right:s},s?[r.buffer,s.buffer]:[r.buffer]),this.setMaster({convMix:t})}};function to(n,e,t){let a=Math.max(1,Math.round(n.length*t/e)),r=new Float32Array(a),s=e/t;for(let i=0;i<a;i++){let o=i*s,c=Math.min(n.length-1,o|0),l=o-c,b=n[c],d=n[Math.min(n.length-1,c+1)];r[i]=b+(d-b)*l}return r}var Xa=class{constructor(e,t){this.physics=e;this.urls=t}vorp=null;settings={reflections:!0,probeRays:14,probeDistance:45,occlusion:!0,occlusionDb:-14,occlusionLowpassHz:1100,cracks:!0,windAmbience:!0,ambienceBeds:!0};surfaces=new Map;listener={position:f.create(),forward:f.create(0,0,-1),up:f.create(0,1,0)};zone=null;zoneOrigin=f.create();pending=[];creating=null;crackDone=new Set;prevProj=new Map;tempC=18;async start(){if(this.vorp)return await this.vorp.resume(),this.vorp;this.creating||(this.creating=Ja.create({wasmUrl:this.urls.wasm,workletUrl:this.urls.worklet}).then(t=>{this.vorp=t,this.zone&&t.setZone(this.zone),t.setAtmosphere(this.tempC,.55);for(let a of this.pending)a();return this.pending=[],t}));let e=await this.creating;return await e.resume(),e}whenReady(e){this.vorp?e():this.pending.push(e)}sounds=new Set;beds=[];async loadSoundAssets(e,t){let a,r=t;if(typeof e=="string"){r??=e.slice(0,e.lastIndexOf("/")+1);try{let c=await fetch(e,{cache:"no-cache"});if(!c.ok)return[];a=await c.json()}catch{return[]}}else a=e;r??="";let s=Object.entries(a.sounds??{});if(!s.length)return[];let i=new Map;await Promise.all(s.map(async([c,l])=>{try{let b=await fetch(r+l.file);b.ok?i.set(c,await b.arrayBuffer()):console.warn(`[audio] recorded sound "${c}": ${r+l.file} \u2192 ${b.status}`)}catch(b){console.warn(`[audio] recorded sound "${c}" not fetched`,b)}}));let o={sounds:Object.fromEntries(s.filter(([c])=>i.has(c)))};return this.whenReady(()=>{this.vorp.loadSamples(o,r,i).then(c=>{for(let l of c)this.sounds.add(l);this.startBeds()})}),[...i.keys()]}startBeds(){let e=this.vorp;if(!e||!this.settings.ambienceBeds||this.beds.length)return;let t=e.loopSample("amb.birds",52);t&&this.beds.push(t);let a=e.loopSample("amb.wind",48);a&&this.beds.push(a)}setZone(e){this.zone=e,this.vorp?.setZone(e),this.lastWind&&this.setWind(...this.lastWind)}lastWind=null;setWind(e,t,a){if(this.lastWind=[e,t,a],!this.settings.windAmbience)return;let r=e<.05?0:28+26*Math.log10(1+e),s=450+60*e;this.whenReady(()=>this.vorp?.setAmbience({windSpl:r,windGust:t,windGustRate:a,windToneHz:s}))}surface(e){return this.surfaces.get(e)??{reflection:.8,lowpassHz:6e3}}update(e){e.forward(this.listener.forward),e.up(this.listener.up),f.copy(this.listener.position,e.position);let t=this.vorp;t&&(t.setListener(this.listener.position,this.listener.forward,this.listener.up),this.settings.cracks&&this.physics&&this.trackCracks(t),t.flush())}computeTaps(e,t,a=0){let r=this.physics,s=this.listener.position,i=[],o=f.clone(e),c=t?f.normalize(f.create(),f.clone(t)):null,l=d=>{if(!c||a<=0)return 1;let m=f.dot(c,d);return Math.pow(10,-a*(1-m)*.5/20)},b=(d,m,u,y)=>{let p=f.sub(f.create(),s,d),w=f.length(p);if(w<.2)return;let x=f.dot(p,u);if(Math.abs(x)<1e-5)return;let M=f.dot(f.sub(f.create(),m,d),u)/x;if(M<=0||M>=1)return;let v=f.scaleAndAdd(f.create(),d,p,M),g=f.normalize(f.create(),f.sub(f.create(),v,o)),k=f.normalize(f.create(),f.sub(f.create(),v,s)),h=this.surface(y),A=h.reflection*l(g)/w;i.push({path:w,gain:A,lowpassHz:h.lowpassHz,dir:k,energy:A*A})};if(r&&this.settings.reflections){let d=r.raycast(o,[0,-1,0],50,!1);d&&b(f.scaleAndAdd(f.create(),o,d.normal,-2*f.dot(f.sub(f.create(),o,d.point),d.normal)),d.point,d.normal,d.material);let m=this.settings.probeRays;for(let u=0;u<m;u++){let y=2.399963*u,p=u===m-1?1:u/(m-1)*.9-.25,w=Math.sqrt(Math.max(0,1-p*p)),x=f.create(Math.cos(y)*w,p,Math.sin(y)*w),M=r.raycast(s,x,this.settings.probeDistance,!1);if(!M||M.t<.3)continue;let v=M.normal,g=f.dot(f.sub(f.create(),o,M.point),v);if(g<=0)continue;let k=f.scaleAndAdd(f.create(),o,v,-2*g);b(k,M.point,v,M.material)}}for(let d of this.zone?.farReflectors??[]){let m=d.azimuth*Math.PI/180,u=f.create(this.zoneOrigin[0]+Math.sin(m)*d.distance,o[1],this.zoneOrigin[2]-Math.cos(m)*d.distance),y=f.distance(o,u)+f.distance(u,s),p=f.normalize(f.create(),f.sub(f.create(),u,o)),w=f.normalize(f.create(),f.sub(f.create(),u,s)),x=d.reflectivity*l(p)/y;i.push({path:y,gain:x,lowpassHz:d.lowpassHz,dir:w,energy:x*x})}return i.sort((d,m)=>m.energy-d.energy),i.slice(0,10)}occlusionOf(e){if(!this.physics||!this.settings.occlusion)return null;let t=f.sub(f.create(),this.listener.position,f.clone(e)),a=f.length(t);if(a<.3)return null;f.scale(t,t,1/a);let r=f.scaleAndAdd(f.create(),f.clone(e),t,.05);return this.physics.raycast(r,t,a-.15,!1)?{db:this.settings.occlusionDb,lowpass:this.settings.occlusionLowpassHz}:null}finish(e,t,a,r){e.setTaps(this.computeTaps(t,a,r));let s=this.occlusionOf(t);s&&e.setOcclusion(s.db,s.lowpass)}gunshot(e,t,a,r,s={}){let i=this.vorp;if(!i)return null;let o=i.gunshot(e,t,a,r,s),c=Math.pow(10,-o.duckDb/20),l=this.computeTaps(t,a,e.params.directivityDb??9).map(m=>m.path>30?{...m,gain:m.gain*c}:m),b=this.occlusionOf(t),d=o.samples.length?o.samples[0]:o.blast;for(let m of new Set([o.blast,...o.samples]))(m===d||m===o.blast)&&m.setTaps(l),b&&m.setOcclusion(b.db,b.lowpass);return o.action&&r&&o.action.setTaps(this.computeTaps(r,null,0).slice(0,4)),o}impact(e,t,a=0){let r=this.vorp;if(!r)return null;let s=r.impact(e,t,a);return this.finish(s,t,null,0),s}modal(e,t,a,r=1,s={}){let i=this.vorp;if(!i)return null;let o=i.modal(e,t,a,r,s);return this.finish(o,a,null,0),o}mech(e,t,a={}){let r=this.vorp;if(!r)return null;let s=r.mech(e,t,a);return this.finish(s.noise,t,null,0),s.ring&&this.finish(s.ring,t,null,0),s}breath(e,t={}){let a=this.vorp;return a?a.breath(e,t):null}footstep(e,t,a){let r=this.vorp;if(!r)return null;let s={bus:st.ENV,reverbSendDb:r.zoneSendDb};return(a?r.sampleAt(`step.${a}`,t,e.levelSpl??70,s):null)??r.noise(e,t,s)}projectileInfo=new Map;trackCracks(e){let t=this.physics,a=this.listener.position,r=Wn(this.tempC),s=t.projectiles(),i=new Set;for(let o of s){i.add(o.id);let c=this.prevProj.get(o.id);if(this.prevProj.set(o.id,f.clone(o.position)),!c||this.crackDone.has(o.id))continue;let l=f.length(o.velocity);if(l<=r*1.01)continue;let b=f.sub(f.create(),o.position,c),d=f.lengthSq(b);if(d<1e-8)continue;let m=f.dot(f.sub(f.create(),a,c),b)/d;if(m<0||m>1)continue;let u=f.scaleAndAdd(f.create(),c,b,m),y=f.distance(u,a);if(y>60||y<.02)continue;let p=f.distance(u,c),w=this.projectileInfo.get(o.userId)??{diameter:.0057,length:.023},x=qn({mach:l/r,diameter:w.diameter,length:w.length,missDistance:y,c:r}),M=f.normalize(f.create(),b),v=r/l,g=f.scaleAndAdd(f.create(),u,M,-y*Math.sqrt(1-v*v)/Math.max(v,.001));e.crack(x.peakPa,x.duration,g,{bus:st.WEAPONS}).setTaps(this.computeTaps(g,null,0)),this.crackDone.add(o.id)}for(let o of[...this.prevProj.keys()])i.has(o)||(this.prevProj.delete(o),this.crackDone.delete(o))}};function Zn(n,e){let t=n.scope(gt.gl),a=e.settings,r=e.sky.settings;t.number("Sky",r,"sunElevation",{label:"Sun elevation",min:-10,max:90,step:.1,unit:"\xB0"}).number("Sky",r,"sunAzimuth",{label:"Sun azimuth",min:0,max:360,step:.5,unit:"\xB0"}).number("Sky",r,"sunIlluminance",{label:"Solar illuminance (TOA)",min:1e3,max:14e4,step:100,unit:"lux",help:"Extraterrestrial sun illuminance \u2248 128 000 lux. Everything else is derived from this."}).number("Sky",r,"sunAngularDiameter",{label:"Sun angular diameter",min:.1,max:5,step:.01,unit:"\xB0",help:"Real sun: 0.53\xB0. Sets penumbra width of all sun shadows (PCSS) and sun specular size."}).number("Sky",r,"turbidity",{label:"Aerosol (haze)",min:0,max:10,step:.05,help:"Mie density. Hazy/humid days \u2248 2\u20134."}).number("Sky",r,"rayleigh",{label:"Rayleigh density",min:0,max:4,step:.01}).number("Sky",r,"ozone",{label:"Ozone",min:0,max:4,step:.01}).number("Sky",r,"mieG",{label:"Mie anisotropy",min:0,max:.99,step:.01}).number("Sky",r,"groundAlbedo",{label:"Ground albedo (env)",min:0,max:1,step:.01}).number("Sky",r,"multiScatter",{label:"Multiple scattering",min:.5,max:2.5,step:.01}).number("Sky",a.ibl,"intensity",{label:"IBL intensity",min:0,max:3,step:.01,help:"Keep at 1 for physical correctness."}).number("Sky",a.ibl,"specularOcclusion",{label:"Specular occlusion",min:0,max:1,step:.01}).number("Sky",a.ibl,"occludedAmbient",{label:"Bounce fill (occluded sky)",min:0,max:1,step:.01,help:"Fraction of sky ambient still arriving from occluded sky directions. \u22480.1\u20130.2."}).number("Sky",a.ibl,"viewmodelFill",{label:"Viewmodel ambient fill",min:.5,max:3,step:.05,help:"Ambient multiplier on the first-person weapon and hands only (1 = physical). Dark gear in roof shadow needs \u22481.5\u20132 to read like it does to an adapted eye."}).number("Sky",a.ibl,"groundBounce",{label:"Sun ground bounce",min:0,max:2,step:.01,help:"One-bounce sunlight (sun lux \xD7 ground albedo / \u03C0) received where the sky is blocked \u2014 lights pavilion/porch interiors. No real-time GI: \u22480.4\u20130.8 on sunny days."}),t.bool("Global illumination",a.gi,"enabled",{label:"Baked GI probes",help:"Path-traced at load: sky occlusion + multi-bounce sun/sky light. Replaces the analytic fill inside the probe volume."}).number("Global illumination",a.gi,"intensity",{label:"GI intensity",min:0,max:3,step:.01,help:"Keep at 1 for physical correctness."});let s=e.wind.settings;t.number("Wind",s,"speed",{label:"Wind speed",min:0,max:25,step:.1,unit:"m/s",help:"Mean surface wind. Drives foliage, smoke/dust drift, cloud drift (\xD7 wind aloft) and the ambience bed."}).number("Wind",s,"direction",{label:"Direction (blowing to)",min:0,max:360,step:1,unit:"\xB0",help:"0 = north (\u2212Z), 90 = east (+X); same compass as the sun azimuth."}).number("Wind",s,"gustiness",{label:"Gustiness",min:0,max:1,step:.01,help:"Gust peaks reach \u2248 speed \xD7 (1 + 1.7 \xD7 gustiness)."}).number("Wind",s,"gustFrequency",{label:"Gust rate",min:.02,max:.6,step:.01,unit:"Hz"}).number("Wind",s,"turbulence",{label:"Turbulence (flutter)",min:0,max:1,step:.01}).number("Wind",s,"foliageBend",{label:"Foliage bend",min:0,max:.2,step:.001,unit:"m per m/s",help:"Tip displacement of a 1 m blade per m/s of wind."}).number("Wind",s,"aloftFactor",{label:"Wind aloft \xD7",min:1,max:6,step:.05,help:"Cloud-level wind relative to the surface wind."}).number("Wind",s,"aloftVeer",{label:"Veer aloft",min:-90,max:90,step:1,unit:"\xB0"});let i=e.sky.clouds.settings;t.bool("Clouds",i,"enabled",{label:"Clouds"}).choice("Clouds",i,"mode",["volumetric","flat"],{label:"Mode",help:"volumetric = ray-marched 3D clouds; flat = cheap 2D deck. Individual clouds (sky.addCloud) can pick either."}).choice("Clouds",i,"quality",["auto","low","medium","high"],{label:"Quality",help:"Dome resolution and march steps. auto = high on a GPU, low on software WebGPU (headless captures)."}).number("Clouds",i,"coverage",{label:"Coverage",min:0,max:1,step:.01,help:"Fraction of sky covered (scattered \u2248 0.3\u20130.5, broken \u2248 0.6\u20130.85, overcast 1)."}).number("Clouds",i,"type",{label:"Cloud type",min:0,max:1,step:.01,help:"0 flat stratus / stratocumulus \u2026 1 towering cumulus."}).number("Clouds",i,"density",{label:"Extinction",min:2,max:120,step:.5,unit:"1/km",help:"Optical density of a fully dense cloud. Cumulus \u2248 20\u201380."}).number("Clouds",i,"altitude",{label:"Base altitude",min:300,max:6e3,step:10,unit:"m",help:"Cumulus base \u2248 1\u20132 km."}).number("Clouds",i,"thickness",{label:"Layer thickness",min:200,max:5e3,step:10,unit:"m"}).number("Clouds",i,"featureScale",{label:"System size",min:1e3,max:2e4,step:100,unit:"m",help:"Size of cloud systems and the gaps between them."}).number("Clouds",i,"shapeScale",{label:"Shape scale",min:1e3,max:15e3,step:100,unit:"m"}).number("Clouds",i,"detailScale",{label:"Detail scale",min:100,max:2e3,step:10,unit:"m"}).number("Clouds",i,"windFactor",{label:"Drift (\xD7 wind aloft)",min:0,max:6,step:.05,help:"Cloud drift speed relative to the Wind system's wind aloft."}).number("Clouds",i,"shadowStrength",{label:"Cloud shadows",min:0,max:1,step:.01,help:"How much a thick cloud dims direct sunlight on the ground (1 = physical)."}).number("Clouds",i,"ambient",{label:"Ambient light",min:0,max:3,step:.01,help:"Sky/ground light scattered by the clouds (1 \u2248 physical)."}).number("Clouds",i,"multiScatter",{label:"Multiple scattering",min:.2,max:4,step:.01,help:"Sunlight energy boost standing in for higher scattering orders."}).number("Clouds",i,"albedo",{label:"Droplet albedo",min:.5,max:1,step:.005}),t.choice("Exposure",a.exposure,"mode",["auto","manual","camera"],{label:"Mode",help:"auto = eye/camera metering; manual = EV100; camera = aperture/shutter/ISO of the Camera."}).number("Exposure",a.exposure,"ev100",{label:"Manual EV100",min:-6,max:20,step:.1,help:"Sunny 16 \u2248 15, overcast \u2248 12, indoor \u2248 7, night \u2248 0."}).number("Exposure",a.exposure,"compensation",{label:"Compensation",min:-5,max:5,step:.05,unit:"EV"}).number("Exposure",a.exposure,"minEv100",{label:"Min EV100",min:-10,max:20,step:.1}).number("Exposure",a.exposure,"maxEv100",{label:"Max EV100",min:-10,max:22,step:.1}).number("Exposure",a.exposure,"speedUp",{label:"Adapt to bright",min:.05,max:20,step:.05,unit:"EV/s"}).number("Exposure",a.exposure,"speedDown",{label:"Adapt to dark",min:.05,max:20,step:.05,unit:"EV/s"}).number("Exposure",a.exposure,"lowPercent",{label:"Metering low %",min:0,max:.99,step:.01}).number("Exposure",a.exposure,"highPercent",{label:"Metering high %",min:.01,max:1,step:.01}).number("Exposure",a.exposure,"centerWeight",{label:"Centre weighting",min:0,max:1,step:.01}),t.choice("Tone & colour",a.grade,"tonemapper",["agx","aces","neutral","none"],{label:"Tonemapper"}).number("Tone & colour",a.grade,"exposureBias",{label:"Exposure bias",min:-4,max:4,step:.05,unit:"EV"}).number("Tone & colour",a.grade,"contrast",{label:"Contrast",min:.5,max:1.6,step:.01}).number("Tone & colour",a.grade,"saturation",{label:"Saturation",min:0,max:2,step:.01}).number("Tone & colour",a.grade,"temperature",{label:"White balance temp",min:-1,max:1,step:.01}).number("Tone & colour",a.grade,"tint",{label:"White balance tint",min:-1,max:1,step:.01}).number("Tone & colour",a.grade,"lift",{label:"Lift",min:-.2,max:.2,step:.001}).number("Tone & colour",a.grade,"gamma",{label:"Gamma",min:.5,max:2,step:.01}).number("Tone & colour",a.grade,"gain",{label:"Gain",min:.5,max:2,step:.01}).number("Tone & colour",a.grade,"dither",{label:"Dither",min:0,max:2,step:.01}),t.number("Lens & sensor",a.lens,"distortion",{label:"Barrel distortion k1",min:-.6,max:.6,step:.005,help:"Negative = barrel (wide/bodycam lenses), positive = pincushion."}).number("Lens & sensor",a.lens,"distortion2",{label:"Distortion k2",min:-.5,max:.5,step:.005}).number("Lens & sensor",a.lens,"fillZoom",{label:"Distortion fill zoom",min:.5,max:2,step:.005}).number("Lens & sensor",a.lens,"chromaticAberration",{label:"Chromatic aberration",min:0,max:3,step:.01}).number("Lens & sensor",a.lens,"naturalVignette",{label:"Natural vignetting (cos\u2074)",min:0,max:1,step:.01}).number("Lens & sensor",a.lens,"vignette",{label:"Artistic vignette",min:0,max:1,step:.01}).number("Lens & sensor",a.lens,"vignetteRoundness",{label:"Vignette roundness",min:0,max:1,step:.01}).number("Lens & sensor",a.lens,"sharpen",{label:"Sharpening",min:0,max:1,step:.01}).bool("Lens & sensor",a.sensor,"enabled",{label:"Sensor noise"}).number("Lens & sensor",a.sensor,"readNoise",{label:"Read noise",min:0,max:.05,step:1e-4}).number("Lens & sensor",a.sensor,"shotNoise",{label:"Photon shot noise",min:0,max:.05,step:1e-4}).number("Lens & sensor",a.sensor,"gain",{label:"Sensor gain",min:0,max:8,step:.01}).bool("Lens & sensor",a.sensor,"isoCoupled",{label:"Noise follows camera ISO"}).bool("Lens & sensor",a.motionBlur,"enabled",{label:"Motion blur"}).number("Lens & sensor",a.motionBlur,"shutterAngle",{label:"Shutter angle",min:0,max:360,step:1,unit:"\xB0",help:"180\xB0 = film look; bodycams shoot ~ 90\u2013180\xB0."}).number("Lens & sensor",a.motionBlur,"maxPixels",{label:"Max blur",min:4,max:128,step:1,unit:"px"}).number("Lens & sensor",a.motionBlur,"samples",{label:"Blur samples",min:4,max:32,step:1}).bool("Lens & sensor",a.dof,"enabled",{label:"Depth of field"}).number("Lens & sensor",a.dof,"apertureMm",{label:"Aperture / pupil",min:0,max:30,step:.1,unit:"mm",help:"Human pupil \u2248 3 mm in daylight (iron sights: target goes soft), 6\u20137 mm at night. Camera: focal length \xF7 f-number. Bodycams \u2248 1 mm (everything sharp)."}).bool("Lens & sensor",a.dof,"autoFocus",{label:"Auto focus (accommodation)"}).number("Lens & sensor",a.dof,"focusDistance",{label:"Manual focus",min:.1,max:500,step:.1,unit:"m"}).number("Lens & sensor",a.dof,"focusSpeed",{label:"Refocus speed",min:.5,max:30,step:.1,unit:"1/s",help:"Eye accommodation \u2248 4\u20138/s."}).number("Lens & sensor",a.dof,"maxBlurPx",{label:"Max blur radius",min:2,max:40,step:1,unit:"px@1080p"}).number("Lens & sensor",a.dof,"quality",{label:"DOF quality",min:.25,max:3,step:.05}).bool("Lens & sensor",a.bloom,"enabled",{label:"Bloom (lens scatter)"}).number("Lens & sensor",a.bloom,"intensity",{label:"Bloom amount",min:0,max:.3,step:.001,help:"Fraction of light scattered by the lens (physical \u2248 0.02\u20130.05)."}).number("Lens & sensor",a.bloom,"radius",{label:"Bloom radius",min:.5,max:3,step:.01});let o=a.shadows;t.bool("Shadows",o,"enabled",{label:"Sun shadows"}).number("Shadows",o,"cascades",{label:"Cascades",min:1,max:4,step:1}).number("Shadows",o,"resolution",{label:"Resolution",min:512,max:8192,step:512,unit:"px"}).number("Shadows",o,"distance",{label:"Distance",min:10,max:600,step:1,unit:"m"}).number("Shadows",o,"splitLambda",{label:"Split lambda",min:0,max:1,step:.01}).number("Shadows",o,"constantBias",{label:"Depth bias",min:0,max:.002,step:1e-5}).number("Shadows",o,"slopeBias",{label:"Slope bias",min:0,max:8,step:.05}).number("Shadows",o,"normalBias",{label:"Normal bias",min:0,max:6,step:.05,unit:"texels"}).number("Shadows",o,"maxPenumbraTexels",{label:"Max penumbra",min:1,max:48,step:1,unit:"texels"}).number("Shadows",o,"blockerSamples",{label:"PCSS blocker taps",min:1,max:16,step:1}).number("Shadows",o,"pcfSamples",{label:"PCF taps",min:1,max:32,step:1}).number("Shadows",o,"blendFraction",{label:"Cascade blend",min:0,max:.5,step:.01}),t.bool("AO & AA",a.gtao,"enabled",{label:"GTAO"}).number("AO & AA",a.gtao,"radius",{label:"AO radius",min:.05,max:4,step:.01,unit:"m"}).number("AO & AA",a.gtao,"falloff",{label:"AO falloff",min:.05,max:1,step:.01}).number("AO & AA",a.gtao,"power",{label:"AO power",min:.5,max:4,step:.01}).number("AO & AA",a.gtao,"strength",{label:"AO strength",min:0,max:1,step:.01}).number("AO & AA",a.gtao,"slices",{label:"AO slices",min:1,max:8,step:1}).number("AO & AA",a.gtao,"steps",{label:"AO steps",min:2,max:16,step:1}).bool("AO & AA",a.taa,"enabled",{label:"TAA"}).number("AO & AA",a.taa,"feedbackMin",{label:"TAA feedback (moving)",min:0,max:.99,step:.005}).number("AO & AA",a.taa,"feedbackMax",{label:"TAA feedback (still)",min:0,max:.99,step:.005}).number("AO & AA",a,"renderScale",{label:"Render scale",min:.25,max:1.5,step:.05}).number("AO & AA",a,"debugView",{label:"Debug view",min:0,max:9,step:1,help:"1 normals, 2 AO, 3 velocity, 4 depth, 5 luminance (cd/m\xB2 false colour), 6 HDR, 7 sky visibility, 8 ambient diffuse, 9 direct only"}),t.number("Atmosphere",a.fog,"density",{label:"Fog density",min:0,max:.02,step:1e-5,unit:"1/m"}).number("Atmosphere",a.fog,"heightFalloff",{label:"Height falloff",min:.001,max:1,step:.001,unit:"1/m"}).number("Atmosphere",a.fog,"baseHeight",{label:"Base height",min:-50,max:200,step:.5,unit:"m"}).number("Atmosphere",a.fog,"startDistance",{label:"Start distance",min:0,max:200,step:.5,unit:"m"}).number("Atmosphere",a.fog,"inscatter",{label:"Inscatter",min:0,max:4,step:.01}).number("Atmosphere",a.fog,"mieG",{label:"Sun glow anisotropy",min:0,max:.99,step:.01})}function $n(n,e){let t=n.scope(gt.vorp),a=(s,i,o,c)=>{i.forEach((l,b)=>t.arrayValue(s,o,b,{key:l.key,label:l.label,min:l.min,max:l.max,step:l.step,unit:l.unit,help:l.help,onChange:()=>e.cmd(c,o)}))};a("Hearing",sa,e.params.hearing,Me.HEARING),a("Master",ia,e.params.master,Me.MASTER),a("Reverb",oa,e.params.reverb,Me.REVERB),a("Ambience",ca,e.params.ambience,Me.AMBIENCE);let r=e.shotWet;t.number("Gunshot wet",r,"recordedSendCutDb",{label:"Recorded shot reverb cut",min:0,max:30,step:.5,unit:"dB",help:"Field recordings carry their own reverb; this much less send for them"}).number("Gunshot wet",r,"tailDb",{label:"Recorded tail layer",min:-40,max:0,step:.5,unit:"dB",help:"Level of the distant tail recording under the report (presets can override)"}).number("Gunshot wet",r,"burstWindowS",{label:"Burst window",min:0,max:1,step:.01,unit:"s",help:"Shots closer than this count as one burst"}).number("Gunshot wet",r,"burstDuckDb",{label:"Duck per burst shot",min:0,max:12,step:.5,unit:"dB"}).number("Gunshot wet",r,"burstDuckMaxDb",{label:"Max burst duck",min:0,max:30,step:.5,unit:"dB"}).number("Gunshot wet",r,"burstChokeMs",{label:"Burst echo choke",min:0,max:2e3,step:10,unit:"ms",help:"In a burst, the previous round's recorded echo fades out over this long (0 = let every tail ring)"})}var ba=class n{constructor(e,t,a,r){this.physics=e;this.workerUrl=t;this.wasmUrl=a;let s=typeof navigator<"u"&&navigator.hardwareConcurrency||4;this.threads=Math.max(1,Math.min(r??s-1,12))}workers=[];ready=null;job=0;pending=new Map;threads;meshCount=-1;busy=!1;static supported(){return typeof Worker<"u"}init(){let e=this.physics.staticMeshes;return this.ready&&this.meshCount===e.length?this.ready:(this.dispose(),this.meshCount=e.length,this.ready=Promise.all(Array.from({length:this.threads},()=>new Promise((t,a)=>{let r=new Worker(this.workerUrl,{type:"module",name:"fondaine-gi"});r.onmessage=s=>{let i=s.data;if(i.type==="ready"){t();return}if(i.type==="error"){a(new Error(i.message));for(let c of this.pending.values())c.reject(new Error(i.message));this.pending.clear();return}let o=this.pending.get(i.job);o&&(this.pending.delete(i.job),o.resolve(i))},r.onerror=s=>{a(s),this.failAll(new Error("GI worker crashed: "+(s.message??s)))},r.postMessage({type:"init",wasm:this.wasmUrl,meshes:e}),this.workers.push(r),setTimeout(()=>a(new Error("GI worker did not start within 30 s")),3e4)}))).then(()=>{}).catch(t=>{throw this.dispose(),this.ready=null,t}),this.ready)}call(e,t,a=[]){let r=++this.job;return new Promise((s,i)=>{let o=setTimeout(()=>{this.pending.delete(r)&&i(new Error(`GI worker job timed out after ${n.jobTimeoutMs/1e3} s`))},n.jobTimeoutMs);this.pending.set(r,{resolve:c=>{clearTimeout(o),s(c)},reject:c=>{clearTimeout(o),i(c)}}),e.postMessage({...t,job:r},a)})}static jobTimeoutMs=18e4;failAll(e){for(let t of this.pending.values())t.reject(e);this.pending.clear()}async runSlabs(e,t,a,r){let s=Math.max(1,Math.ceil(e/(this.threads*4))),i=[];for(let l=0;l<e;l+=s)i.push([l,Math.min(e,l+s)]);let o=i.length,c=0;await Promise.all(this.workers.map(async l=>{for(;i.length;){let[b,d]=i.shift();a(await this.call(l,t(b,d))),r?.(++c/o)}}))}async bake(e,t,a){let r=performance.now();this.busy=!0;try{await this.init();let{nx:s,ny:i,nz:o}=e,c=s*i*o,l=s*i,b=new Float32Array(c*3),d=new Uint8Array(c);await this.runSlabs(o,(y,p)=>({type:"pos",grid:e,z0:y,z1:p}),y=>{b.set(y.pos,y.z0*l*3),d.set(y.valid,y.z0*l)},y=>a?.(y*.05,"placing probes"));for(let y of this.workers)y.postMessage({type:"probes",pos:b,valid:d});let m=null;for(let y=0;y<t;y++){let p=new Float32Array(c*12),w=m;await this.runSlabs(o,(x,M)=>({type:"pass",grid:e,pass:y,prev:w,z0:x,z1:M}),x=>p.set(x.data,x.z0*l*12),x=>a?.(.05+.95*((y+x)/t),`bounce ${y+1} of ${t}`)),ao(p,d,s,i,o),m=p}let u=0;for(let y=0;y<c;y++)d[y]||u++;return{data:m,filled:u,ms:performance.now()-r,threads:this.threads}}finally{this.busy=!1}}dispose(){for(let e of this.workers)e.terminate();this.workers=[],this.ready=null,this.pending.clear()}};function ao(n,e,t,a,r){let s=Uint8Array.from(e);for(let i=0;i<4;i++){let o=!1,c=Uint8Array.from(s),l=n.slice();for(let b=0;b<r;b++)for(let d=0;d<a;d++)for(let m=0;m<t;m++){let u=(b*a+d)*t+m;if(c[u])continue;let y=new Float32Array(12),p=0;for(let w=-1;w<=1;w++)for(let x=-1;x<=1;x++)for(let M=-1;M<=1;M++){let v=m+M,g=d+x,k=b+w;if(v<0||g<0||k<0||v>=t||g>=a||k>=r)continue;let h=(k*a+g)*t+v;if(c[h]){for(let A=0;A<12;A++)y[A]+=l[h*12+A];p++}}if(p){for(let w=0;w<12;w++)n[u*12+w]=y[w]/p;s[u]=1,o=!0}}if(!o)break}}var Ya=Vt("MeshRenderer"),Qa=class n{renderer;scene=new Fa;camera=new Ga;world=new Ba;physics;audio;input;tuning=new Ha;devui;canvas;time=0;fixedDt;maxFrameTime=.1;timeScale=1;paused=!1;frame=0;fps=0;acc=0;last=0;running=!1;fpsAcc=0;fpsFrames=0;onUpdate=[];onFixed=[];onLate=[];giBaker;autoRebakeGI=!0;giLast=null;giChangeT=0;constructor(e,t,a){this.canvas=e.canvas,this.renderer=t,this.physics=a,this.fixedDt=1/(e.fixedHz??120);let r=e.baseUrl??"/";this.audio=new Xa(a,{wasm:e.vorpWasm??`${r}wasm/vorp_dsp.wasm`,worklet:e.vorpWorklet??`${r}vorp/vorp-worklet.js`}),this.input=new Va(e.canvas);let s=i=>new URL(i,typeof location<"u"?location.href:"http://localhost/").href;this.giBaker=ba.supported()&&e.giThreads!==0?new ba(a,s(e.giWorker??`${r}fondaine/gi-worker.js`),s(e.physicsWasm??`${r}wasm/fondaine_physics.wasm`),e.giThreads):null,this.devui=new Wa(this.tuning,e.title??"fondaine"),this.world.onRemoved(Ya,(i,o)=>this.scene.remove(o.object)),this.world.onRemoved(na,(i,o)=>{for(let c of o)c.onDestroy?.()}),Zn(this.tuning,this.renderer),this.renderer.wind.onSettingsChanged=i=>this.audio.setWind(i.speed,i.gustiness,i.gustFrequency),this.audio.setWind(this.renderer.wind.settings.speed,this.renderer.wind.settings.gustiness,this.renderer.wind.settings.gustFrequency),this.devui.statsText=()=>{let i=this.renderer.stats,o=this.audio.vorp?.meters;return`${this.fps.toFixed(0)} fps  ${i.frameMs.toFixed(2)} ms cpu  ${i.drawCalls} draws  ${(i.triangles/1e3).toFixed(0)}k tris
`+(o?`audio: ${o.voices} voices  eardrum ${o.earSpl.toFixed(0)} dB SPL  TTS ${o.tts.toFixed(1)} dB  dsp ${(o.cpu*100).toFixed(1)}%`:"audio: click to start")}}get sky(){return this.renderer.sky}get wind(){return this.renderer.wind}cloud(e){return this.renderer.sky.addCloud(e)}static async create(e){let t=e.baseUrl??"/",[a,r]=await Promise.all([Ca.create(e.canvas,{offscreen:e.offscreen}),qa.load(e.physicsWasm??`${t}wasm/fondaine_physics.wasm`)]);return new n(e,a,r)}async startAudio(){let e=await this.audio.start();return this.tuning.params.some(t=>t.module===gt.vorp)||$n(this.tuning,e),e}async bakeGlobalIllumination(e){let t=e.cell??.5,a=Math.max(1,Math.ceil((e.max[0]-e.min[0])/t)),r=Math.max(1,Math.ceil((e.max[1]-e.min[1])/t)),s=Math.max(1,Math.ceil((e.max[2]-e.min[2])/t)),i=e.rays??256,o=e.passes??3,c=a*r*s,l=await this.giGrid({min:[e.min[0],e.min[1],e.min[2]],cell:t,nx:a,ny:r,nz:s,rays:i,albedo:Array.from(e.albedo)});e.onStatus?.(`Path tracing global illumination \xB7 ${c.toLocaleString()} probes`);let b=await this.runGIBake(l,o,(d,m)=>e.onStatus?.(`Path tracing global illumination \xB7 ${m} \xB7 ${Math.round(d*100)}%`));return console.info(`[fondaineGL] GI bake: ${a}\xD7${r}\xD7${s} probes, ${i} rays, ${o} passes, ${b.filled} filled, ${(b.ms/1e3).toFixed(1)} s on ${b.threads} thread(s)`),{probes:c,ms:b.ms,filled:b.filled}}async giGrid(e){let t=Array.from(await this.renderer.readSkySH());return{...e,sunDir:[...this.renderer.sky.sunDir],sunRGB:[...this.renderer.sky.sunIlluminanceRGB()],skySH:t}}skyKey(){let e=this.renderer.sky.settings;return[e.sunElevation,e.sunAzimuth,e.sunIlluminance,e.turbidity,e.rayleigh,e.ozone,e.groundAlbedo].map(t=>Number(t).toFixed(2)).join("|")}async runGIBake(e,t,a){let r;if(this.giBaker)try{r=await this.giBaker.bake(e,t,a)}catch(s){console.warn("[fondaineGL] worker GI bake failed, using the main thread",s),r=this.bakeGISync(e,t)}else r=this.bakeGISync(e,t);return this.renderer.setProbeVolume(r.data,e.nx,e.ny,e.nz,e.min,e.cell),this.giLast={grid:e,passes:t,key:this.skyKey()},r}bakeGISync(e,t){let a=performance.now(),{data:r,filled:s}=this.physics.bakeGI({...e,passes:t});return{data:r,filled:s,ms:performance.now()-a,threads:1}}watchGI(e){if(!this.autoRebakeGI||!this.giLast||!this.giBaker||this.giBaker.busy)return;if(this.skyKey()===this.giLast.key){this.giChangeT=0;return}if(this.giChangeT+=e,this.giChangeT<.6)return;this.giChangeT=0;let t=this.giLast;this.giLast={...t,key:this.skyKey()},this.giGrid({min:t.grid.min,cell:t.grid.cell,nx:t.grid.nx,ny:t.grid.ny,nz:t.grid.nz,rays:Math.min(t.grid.rays,128),albedo:t.grid.albedo}).then(a=>this.runGIBake(a,t.passes)).then(a=>console.info(`[fondaineGL] GI re-baked for the new sun in ${(a.ms/1e3).toFixed(1)} s`)).catch(a=>console.warn("[fondaineGL] GI re-bake failed",a))}createEntity(e,t,a){let r=this.world.spawn(e);return this.world.add(r,ra,new Da(t,a)),r}transform(e){return this.world.require(e,ra)}addMesh(e,t,a,r={}){let s=t instanceof Ae?t:new Ae(this.renderer.dev,t),i=new Te(s,a);return i.castShadow=r.castShadow??!0,i.viewmodel=r.viewmodel??!1,i.userData=e,this.scene.add(i),this.world.add(e,Ya,{object:i,offset:r.offset??null}),this.syncObject(e),i.resetHistory(),i}addScript(e,t){return t.engine=this,t.entity=e,(this.world.get(e,na)??this.world.add(e,na,[])).push(t),t}destroy(e){this.world.despawn(e)}tmp=U.create();syncObject(e){let t=this.world.get(e,Ya),a=this.world.get(e,ra);!t||!a||(t.offset?t.object.setTransform(U.multiply(this.tmp,a.getWorld(),t.offset)):t.object.setTransform(a.getWorld()))}start(){if(this.running)return;this.running=!0,this.last=performance.now();let e=t=>{if(!this.running)return;let a=Math.max(0,Math.min((t-this.last)/1e3,this.maxFrameTime));this.last=t,this.step(a),requestAnimationFrame(e)};requestAnimationFrame(e)}stop(){this.running=!1}step(e){e=Math.max(0,e);let t=this.paused?0:e*this.timeScale;this.input.poll(),this.input.actionPressed("tuning")&&(this.devui.toggle(),this.devui.visible&&this.input.unlock());let a=[...this.world.query(na)];for(let[,s]of a)for(let i of s)i.enabled&&!i._started&&(i._started=!0,i.onStart?.());this.acc+=t;let r=0;for(;this.acc>=this.fixedDt&&r<12;){for(let[,s]of a)for(let i of s)i.enabled&&i.onFixedUpdate?.(this.fixedDt);for(let s of this.onFixed)s(this.fixedDt);this.physics.step(this.fixedDt),this.acc-=this.fixedDt,this.time+=this.fixedDt,r++}r>=12&&(this.acc=0);for(let[,s]of a)for(let i of s)i.enabled&&i.onUpdate?.(t);for(let s of this.onUpdate)s(t);for(let[,s]of a)for(let i of s)i.enabled&&i.onLateUpdate?.(t);for(let s of this.onLate)s(t);for(let[s]of this.world.query(Ya))this.syncObject(s);this.watchGI(e),this.audio.update(this.camera),this.renderer.render(this.scene,this.camera,Math.max(e,1e-4)),this.devui.update(),this.input.endFrame(),this.frame++,this.fpsAcc+=e,this.fpsFrames++,this.fpsAcc>.5&&(this.fps=this.fpsFrames/this.fpsAcc,this.fpsAcc=0,this.fpsFrames=0)}};var _e={DEFAULT:0,CONCRETE:1,DIRT:2,GRAVEL:3,WOOD:4,STEEL:5,STEEL_TARGET:6,PAPER:7,CARDBOARD:8,GRASS:9,BRASS:10,POLYMER:11},at=(n,e,t)=>({id:n,name:e,friction:.6,restitution:.2,ricochetAngleDeg:0,ricochetEnergyKeep:.3,reflection:.8,reflectionLowpassHz:6e3,impactSound:"dirt",footstepSound:"dirt",decal:null,decalSize:.03,debris:"dust",debrisColor:[.4,.35,.28],hard:!1,albedo:[.25,.25,.25],...t}),tu=[at(_e.DEFAULT,"default",{}),at(_e.CONCRETE,"concrete",{friction:.75,restitution:.35,ricochetAngleDeg:12,ricochetEnergyKeep:.25,reflection:.97,reflectionLowpassHz:9e3,impactSound:"concrete",footstepSound:"concrete",decal:2,decalSize:.05,debris:"dust",debrisColor:[.62,.61,.58],hard:!0,albedo:[.36,.35,.33]}),at(_e.DIRT,"dirt",{friction:.8,restitution:.1,reflection:.65,reflectionLowpassHz:2500,impactSound:"dirt",footstepSound:"dirt",decal:5,decalSize:.12,debris:"dust",debrisColor:[.35,.28,.2],albedo:[.2,.15,.1]}),at(_e.GRAVEL,"gravel",{friction:.85,restitution:.15,ricochetAngleDeg:8,reflection:.75,reflectionLowpassHz:4e3,impactSound:"gravel",footstepSound:"gravel",decal:null,debris:"dust",debrisColor:[.5,.48,.45],hard:!0,albedo:[.3,.29,.27]}),at(_e.WOOD,"wood",{friction:.55,restitution:.3,reflection:.85,reflectionLowpassHz:5e3,impactSound:"wood",footstepSound:"wood",decal:1,decalSize:.035,debris:"splinters",debrisColor:[.6,.48,.32],hard:!0,albedo:[.42,.3,.17]}),at(_e.STEEL,"steel",{friction:.45,restitution:.4,ricochetAngleDeg:25,ricochetEnergyKeep:.4,reflection:.98,reflectionLowpassHz:12e3,impactSound:"concrete",footstepSound:"concrete",decal:0,decalSize:.04,debris:"sparks",debrisColor:[1,.7,.35],hard:!0,albedo:[.3,.3,.3]}),at(_e.STEEL_TARGET,"steel target",{friction:.45,restitution:.4,ricochetAngleDeg:0,reflection:.98,reflectionLowpassHz:12e3,impactSound:"concrete",decal:4,decalSize:.07,debris:"sparks",debrisColor:[1,.7,.35],hard:!0,albedo:[.55,.45,.38]}),at(_e.PAPER,"paper",{reflection:.3,reflectionLowpassHz:2e3,impactSound:"paper",decal:3,decalSize:.012,debris:"none",albedo:[.7,.68,.62]}),at(_e.CARDBOARD,"cardboard",{reflection:.4,reflectionLowpassHz:2500,impactSound:"cardboard",decal:3,decalSize:.014,debris:"none",albedo:[.45,.33,.2]}),at(_e.GRASS,"grass",{friction:.7,reflection:.5,reflectionLowpassHz:1800,impactSound:"dirt",footstepSound:"grass",decal:5,decalSize:.1,debris:"dust",debrisColor:[.3,.3,.18],albedo:[.07,.11,.035]}),at(_e.BRASS,"brass",{friction:.35,restitution:.45,hard:!0,impactSound:"concrete",debris:"none",albedo:[.5,.38,.2]}),at(_e.POLYMER,"polymer",{friction:.6,restitution:.3,hard:!0,impactSound:"wood",debris:"none",albedo:[.04,.04,.04]})];var Za={"5.56x45 M855":{name:"5.56\xD745mm M855 62gr",bulletMassKg:.004018,diameterM:.0057,lengthM:.0233,bcG7:.151,muzzleVelocity:948,referenceBarrelM:.508,velocityPerBarrelM:380,powderMassKg:.00168,gasVelocityFactor:1.7,casing:{lengthM:.0448,diameterM:.0095,massKg:.0063}},"5.56x45 Mk262":{name:"5.56\xD745mm Mk262 77gr",bulletMassKg:.00499,diameterM:.0057,lengthM:.0254,bcG7:.186,muzzleVelocity:850,referenceBarrelM:.457,velocityPerBarrelM:340,powderMassKg:.00162,gasVelocityFactor:1.7,casing:{lengthM:.0448,diameterM:.0095,massKg:.0063}},"7.62x51 M118LR":{name:"7.62\xD751mm M118LR 175gr",bulletMassKg:.01134,diameterM:.00782,lengthM:.0315,bcG7:.243,muzzleVelocity:790,referenceBarrelM:.559,velocityPerBarrelM:230,powderMassKg:.00272,gasVelocityFactor:1.6,casing:{lengthM:.0512,diameterM:.0119,massKg:.0123}},"9x19 124gr":{name:"9\xD719mm 124gr FMJ",bulletMassKg:.00803,diameterM:.00901,lengthM:.0155,bcG7:.072,muzzleVelocity:360,referenceBarrelM:.102,velocityPerBarrelM:300,powderMassKg:36e-5,gasVelocityFactor:1.3,casing:{lengthM:.019,diameterM:.0099,massKg:.0037}}};function At(n,e,t,a={}){let r=e/2,s=n;if(a.straight){let c=r*.955;return t([[0,-s/2],[r*.99,-s/2],[r*.99,-s/2+.0011],[r*.82,-s/2+.0015],[r*.82,-s/2+.0026],[r*.985,-s/2+.0032],[c,s/2],[c*.9,s/2],[c*.9,s/2-.002]],18)}let i=r*.68,o=[[0,-s/2],[r*.98,-s/2],[r*.98,-s/2+.0012],[r*.86,-s/2+.0016],[r*.86,-s/2+.0028],[r,-s/2+.0034],[r*.97,s/2-s*.22],[i,s/2-s*.13],[i,s/2],[i*.85,s/2]];return t(o,16)}var le={BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,UNSIGNED_INT:5125,FLOAT:5126,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,NEAREST:9728,LINEAR:9729,NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987,CLAMP_TO_EDGE:33071,MIRRORED_REPEAT:33648,REPEAT:10497};var ts={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16};function lo(n){switch(n){case le.BYTE:case le.UNSIGNED_BYTE:return 1;case le.SHORT:case le.UNSIGNED_SHORT:return 2;case le.UNSIGNED_INT:case le.FLOAT:return 4;default:throw new Error(`glTF: unknown accessor componentType ${n}`)}}function Ht(n){let e=ts[n.type];if(!e)throw new Error(`glTF: unknown accessor type "${n.type}"`);return e}function bo(n,e){let t,a;switch(n){case"MAT2":t=2,a=2;break;case"MAT3":t=3,a=3;break;case"MAT4":t=4,a=4;break;default:t=ts[n]??1,a=1}let r=t*e,s=a>1?r+3&-4:r;return{rows:t,cols:a,colStride:s,elementSize:s*a}}function uo(n){switch(n){case le.BYTE:return(e,t)=>e.getInt8(t);case le.UNSIGNED_BYTE:return(e,t)=>e.getUint8(t);case le.SHORT:return(e,t)=>e.getInt16(t,!0);case le.UNSIGNED_SHORT:return(e,t)=>e.getUint16(t,!0);case le.UNSIGNED_INT:return(e,t)=>e.getUint32(t,!0);case le.FLOAT:return(e,t)=>e.getFloat32(t,!0);default:throw new Error(`glTF: unknown accessor componentType ${n}`)}}function mo(n,e){switch(n){case le.BYTE:return Math.max(e/127,-1);case le.UNSIGNED_BYTE:return e/255;case le.SHORT:return Math.max(e/32767,-1);case le.UNSIGNED_SHORT:return e/65535;case le.UNSIGNED_INT:return e/4294967295;default:return e}}function ua(n,e){let t=n.json.bufferViews?.[e];if(!t)throw new Error(`glTF: bufferView ${e} does not exist`);let a=n.buffers[t.buffer];if(!a)throw new Error(`glTF: buffer ${t.buffer} (bufferView ${e}) was not loaded`);let r=t.byteOffset??0;if(r+t.byteLength>a.byteLength)throw new Error(`glTF: bufferView ${e} [${r}, ${r+t.byteLength}) overruns buffer ${t.buffer} (${a.byteLength} bytes)`);return{bytes:a.subarray(r,r+t.byteLength),byteStride:t.byteStride??0}}function Er(n,e,t,a,r,s,i,o,c){let l=lo(s),b=bo(r,l),d=t||b.elementSize,m=b.rows*b.cols,u=e+(a>0?(a-1)*d+b.elementSize:0);if(u>n.byteLength)throw new Error(`glTF: accessor data overruns its bufferView (${u} > ${n.byteLength} bytes)`);if(s===le.FLOAT&&o instanceof Float32Array&&d===b.elementSize&&b.cols===1&&(n.byteOffset+e&3)===0){o.set(new Float32Array(n.buffer,n.byteOffset+e,a*m),c);return}let y=new DataView(n.buffer,n.byteOffset,n.byteLength),p=uo(s),w=c;for(let x=0;x<a;x++){let M=e+x*d;for(let v=0;v<b.cols;v++){let g=M+v*b.colStride;for(let k=0;k<b.rows;k++){let h=p(y,g+k*l);o[w++]=i?mo(s,h):h}}}}function as(n,e,t,a){let r=n.json.accessors?.[e];if(!r)throw new Error(`glTF: accessor ${e} does not exist`);let s=Ht(r);if(r.bufferView!==void 0){let{bytes:o,byteStride:c}=ua(n,r.bufferView);Er(o,r.byteOffset??0,c,r.count,r.type,r.componentType,a,t,0)}else t.fill(0);let i=r.sparse;if(i&&i.count>0){let o=new Uint32Array(i.count),c=ua(n,i.indices.bufferView);Er(c.bytes,i.indices.byteOffset??0,0,i.count,"SCALAR",i.indices.componentType,!1,o,0);let l=t instanceof Float32Array?new Float32Array(i.count*s):new Uint32Array(i.count*s),b=ua(n,i.values.bufferView);Er(b.bytes,i.values.byteOffset??0,0,i.count,r.type,r.componentType,a,l,0);for(let d=0;d<i.count;d++){let m=o[d];if(m>=r.count)throw new Error(`glTF: sparse index ${m} out of range in accessor ${e}`);for(let u=0;u<s;u++)t[m*s+u]=l[d*s+u]}}}function Ke(n,e){let t=n.json.accessors?.[e];if(!t)throw new Error(`glTF: accessor ${e} does not exist`);let a=new Float32Array(t.count*Ht(t));return as(n,e,a,!!t.normalized&&t.componentType!==le.FLOAT),a}function Or(n,e){let t=n.json.accessors?.[e];if(!t)throw new Error(`glTF: accessor ${e} does not exist`);if(t.componentType===le.FLOAT)throw new Error(`glTF: accessor ${e} is FLOAT, expected an integer type`);let a=new Uint32Array(t.count*Ht(t));return as(n,e,a,!1),a}function $a(n,e){let t=n.json.accessors?.[e];if(!t)throw new Error(`glTF: accessor ${e} does not exist`);return t}function rs(n,e,t,a,r=!0){let s=Math.floor(n.length/3),i=new Float64Array(s*3),o=new Float64Array(s*3);for(let l=0;l+2<a.length;l+=3){let b=a[l],d=a[l+1],m=a[l+2];if(b>=s||d>=s||m>=s)continue;let u=n[b*3],y=n[b*3+1],p=n[b*3+2],w=n[d*3]-u,x=n[d*3+1]-y,M=n[d*3+2]-p,v=n[m*3]-u,g=n[m*3+1]-y,k=n[m*3+2]-p,h=t[b*2],A=t[b*2+1],P=t[d*2]-h,S=t[d*2+1]-A,T=t[m*2]-h,z=t[m*2+1]-A,L=P*z-T*S;if(!Number.isFinite(L)||Math.abs(L)<1e-12)continue;let I=1/L,G=(w*z-v*S)*I,j=(x*z-g*S)*I,R=(M*z-k*S)*I,F=(v*P-w*T)*I,N=(g*P-x*T)*I,C=(k*P-M*T)*I;if(Number.isFinite(G+j+R+F+N+C))for(let K of[b,d,m])i[K*3]+=G,i[K*3+1]+=j,i[K*3+2]+=R,o[K*3]+=F,o[K*3+1]+=N,o[K*3+2]+=C}let c=new Float32Array(s*4);for(let l=0;l<s;l++){let b=e[l*3],d=e[l*3+1],m=e[l*3+2],u=Math.hypot(b,d,m);u>0?(b/=u,d/=u,m/=u):(b=0,d=0,m=1);let y=i[l*3],p=i[l*3+1],w=i[l*3+2],x=b*y+d*p+m*w;y-=b*x,p-=d*x,w-=m*x;let M=Math.hypot(y,p,w);M<1e-10&&(Math.abs(b)<.9?(y=0,p=m,w=-d):(y=-m,p=0,w=b),M=Math.hypot(y,p,w)),y/=M,p/=M,w/=M;let v=d*w-m*p,g=m*y-b*w,k=b*p-d*y,A=v*o[l*3]+g*o[l*3+1]+k*o[l*3+2]<0?-1:1;r&&(A=-A),c[l*4]=y,c[l*4+1]=p,c[l*4+2]=w,c[l*4+3]=A}return c}function ns(n,e){switch(n){case le.TRIANGLES:{let t=e.length-e.length%3;return{indices:t===e.length?e:e.slice(0,t),topology:"triangle-list"}}case le.TRIANGLE_STRIP:{let t=[];for(let a=0;a+2<e.length;a++){let r=e[a],s=e[a+1+(a&1)],i=e[a+2-(a&1)];r===s||s===i||r===i||t.push(r,s,i)}return{indices:Uint32Array.from(t),topology:"triangle-list"}}case le.TRIANGLE_FAN:{let t=[];for(let a=0;a+2<e.length;a++)t.push(e[a+1],e[a+2],e[0]);return{indices:Uint32Array.from(t),topology:"triangle-list"}}case le.LINES:{let t=e.length-e.length%2;return{indices:t===e.length?e:e.slice(0,t),topology:"line-list"}}case le.LINE_STRIP:case le.LINE_LOOP:{let t=[];for(let a=0;a+1<e.length;a++)t.push(e[a],e[a+1]);return n===le.LINE_LOOP&&e.length>2&&t.push(e[e.length-1],e[0]),{indices:Uint32Array.from(t),topology:"line-list"}}case le.POINTS:return{indices:e,topology:"point-list"};default:throw new Error(`glTF: unknown primitive mode ${n}`)}}function it(n,e,t){let a=n.constructor,r=new a(t.length*e);for(let s=0;s<t.length;s++){let i=t[s]*e,o=s*e;for(let c=0;c<e;c++)r[o+c]=n[i+c]}return r}function ss(n){let e=n.length/3,t=new Float32Array(e*3);for(let a=0;a+2<e;a+=3){let r=a*3,s=n[r+3]-n[r],i=n[r+4]-n[r+1],o=n[r+5]-n[r+2],c=n[r+6]-n[r],l=n[r+7]-n[r+1],b=n[r+8]-n[r+2],d=i*b-o*l,m=o*c-s*b,u=s*l-i*c,y=Math.hypot(d,m,u);y>0?(d/=y,m/=y,u/=y):(d=0,m=1,u=0);for(let p=0;p<3;p++)t[r+p*3]=d,t[r+p*3+1]=m,t[r+p*3+2]=u}return t}function is(n){let e=[1/0,1/0,1/0],t=[-1/0,-1/0,-1/0];for(let a=0;a+2<n.length;a+=3)for(let r=0;r<3;r++){let s=n[a+r];s<e[r]&&(e[r]=s),s>t[r]&&(t[r]=s)}return n.length<3?{min:[0,0,0],max:[0,0,0]}:{min:e,max:t}}var Nr=(function(){var n="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuixkbeeeddddillviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WboY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbrl79IV9Rbwq;X8:kdbk:kYi5ud9:du8Jjjjjbcjq9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxcj;abad9Uc;WFbGcjdadca0EhmaialfgPar9Rgoadfhsavaoadz:jjjjbgzceVhHcbhOdndninaeaO9nmeaPax9RaD6mdamaeaO9RaOamfgoae6EgAcsfglc9WGhCaAcethXaxaDfhiaOaeaoaeao6E9RhQalcl4cifcd4hLazcjdfaAfhKcbhYabaOad2fg8AhEaHh3incbh5dnawTmbaxaYcd4fRbbh5kcbh8Eazcjdfhqinaih8Fdndndndna5a8Ecet4ciGgoc9:fPdebdkaPa8F9RaA6mrazcjdfa8EaA2fa8FaAz:jjjjb8Aa8FaAfhixdkazcjdfa8EaA2fcbaAz:kjjjb8Aa8FhixekaPa8F9RaL6mva8FaLfhidnaCTmbaPai9RcK6mbaocdtc:q:G:cjbfcj:G:cjbawEhaczhrcbhlinargoc9Wfghaqfhrdndndndndndnaaa8Fahco4fRbbalcoG4ciGcdtfydbPDbedvivvvlvkar9cb83bwar9cb83bbxlkarcbaiRbdai8Xbb9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbaqaofgrcGfcbaicdfa8J9c8N1:NfghRbbag9cjjjjjw:dg8J9qE86bbarcVfcbaha8J9c8M1:NfghRbbag9cjjjjjl:dg8J9qE86bbarc7fcbaha8J9c8L1:NfghRbbag9cjjjjjd:dg8J9qE86bbarctfcbaha8J9c8K1:NfghRbbag9cjjjjje:dg8J9qE86bbarc91fcbaha8J9c8J1:NfghRbbag9cjjjj;ab:dg8J9qE86bbarc4fcbaha8J9cg1:NfghRbbag9cjjjja:dg8J9qE86bbarc93fcbaha8J9ch1:NfghRbbag9cjjjjz:dgg9qE86bbarc94fcbahag9ca1:NfghRbbai8Xbe9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbarc95fcbaha8J9c8N1:NfgiRbbag9cjjjjjw:dg8J9qE86bbarc96fcbaia8J9c8M1:NfgiRbbag9cjjjjjl:dg8J9qE86bbarc97fcbaia8J9c8L1:NfgiRbbag9cjjjjjd:dg8J9qE86bbarc98fcbaia8J9c8K1:NfgiRbbag9cjjjjje:dg8J9qE86bbarc99fcbaia8J9c8J1:NfgiRbbag9cjjjj;ab:dg8J9qE86bbarc9:fcbaia8J9cg1:NfgiRbbag9cjjjja:dg8J9qE86bbarcufcbaia8J9ch1:NfgiRbbag9cjjjjz:dgg9qE86bbaiag9ca1:NfhixikaraiRblaiRbbghco4g8Ka8KciSg8KE86bbaqaofgrcGfaiclfa8Kfg8KRbbahcl4ciGg8La8LciSg8LE86bbarcVfa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc7fa8Ka8Lfg8KRbbahciGghahciSghE86bbarctfa8Kahfg8KRbbaiRbeghco4g8La8LciSg8LE86bbarc91fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc4fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc93fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc94fa8Kahfg8KRbbaiRbdghco4g8La8LciSg8LE86bbarc95fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc96fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc97fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc98fa8KahfghRbbaiRbigico4g8Ka8KciSg8KE86bbarc99faha8KfghRbbaicl4ciGg8Ka8KciSg8KE86bbarc9:faha8KfghRbbaicd4ciGg8Ka8KciSg8KE86bbarcufaha8KfgrRbbaiciGgiaiciSgiE86bbaraifhixdkaraiRbwaiRbbghcl4g8Ka8KcsSg8KE86bbaqaofgrcGfaicwfa8Kfg8KRbbahcsGghahcsSghE86bbarcVfa8KahfghRbbaiRbeg8Kcl4g8La8LcsSg8LE86bbarc7faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarctfaha8KfghRbbaiRbdg8Kcl4g8La8LcsSg8LE86bbarc91faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc4faha8KfghRbbaiRbig8Kcl4g8La8LcsSg8LE86bbarc93faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc94faha8KfghRbbaiRblg8Kcl4g8La8LcsSg8LE86bbarc95faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc96faha8KfghRbbaiRbvg8Kcl4g8La8LcsSg8LE86bbarc97faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc98faha8KfghRbbaiRbog8Kcl4g8La8LcsSg8LE86bbarc99faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc9:faha8KfghRbbaiRbrgicl4g8Ka8KcsSg8KE86bbarcufaha8KfgrRbbaicsGgiaicsSgiE86bbaraifhixekarai8Pbw83bwarai8Pbb83bbaiczfhikdnaoaC9pmbalcdfhlaoczfhraPai9RcL0mekkaoaC6moaimexokaCmva8FTmvkaqaAfhqa8Ecefg8Ecl9hmbkdndndndnawTmbasaYcd4fRbbgociGPlbedrbkaATmdazaYfh8Fazcjdfhhcbh8EaEhaina8FRbbhraahocbhlinaoahalfRbbgqce4cbaqceG9R7arfgr86bbaoadfhoaAalcefgl9hmbkaacefhaa8Fcefh8FahaAfhha8Ecefg8Ecl9hmbxikkaATmeazaYfhaazcjdfhhcbhoceh8EaKh8FinaEaofhlaa8Vbbhrcbhoinala8FaofRbbcwtahaofRbbgqVc;:FiGce4cbaqceG9R7arfgr87bbaladfhlaQaocefgofmbka8FaXfh8FcdhoaacdfhaahaXfhha8EceGhlcbh8EalmbxdkkaATmbaocl4h8EazaYfRbbhqcwhoa3hlinalRbbaotaqVhqalcefhlaocwfgoca9hmbkcbhhaEh8FaKhainazcjdfahfRbbhrcwhoaahlinalRbbaotarVhralaAfhlaocwfgoca9hmbkara8E94aq7hqcbhoa8Fhlinalaqao486bbalcefhlaocwfgoca9hmbka8Fadfh8FaacefhaahcefghaA9hmbkkaEclfhEa3clfh3aYclfgYad6mbkaza8AaAcufad2fadz:jjjjb8AaAaOfhOaihxaimbkc9:hoxdkcbc99aPax9RakSEhoxekc9:hokavcjqf8Kjjjjbaok:bsesu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecjez:kjjjb8Aav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhDaicefgiarfhqdndnaeci9pmbaqhexekcmcsawceSEhkcbhxcbhmaqhecbhlcbhoindndnaiRbbgrc;Ve0mbavc;abfaoarcu7gPcl4fcsGcitfgwydlhsawydbhzdndnarcsGgwak9pmbavalaPfcsGcdtfydbaxawEhraxawTgHfhxxekdnaeaD9nmbc9:hoxokdndnawcsSmbcehHamawcetfcWfhrxekaecefhrae8SbbgwcFeGhPdndnawcu9mmbarhexekaecvfheaPcFbGhPcrhwdninar8SbbgHcFbGawtaPVhPaHcu9kmearcefhrawcrfgwc8J9hmbxdkkarcefhekcehHaPce4cbaPceG9R7amfhrkarhmkavc;abfaocitfgwarBdbawasBdlavalcdtfarBdbavc;abfaocefcsGcitfgwazBdbawarBdlaocdfhoaHalfhldnadcd9hmbabar87elabas87edabaz87ebabcofhbxdkabarBdwabasBdlabazBdbabcxfhbxekdnarcpe0mbavalaDarcsGfRbbgwcl4gP9RcsGcdtfydbaxcefgsaPEhravalaw9RcsGcdtfydbasaPTgzfgsawcsGgPEhwaPThPdndnadcd9hmbabaw87elabar87edabax87ebcohHxekabawBdwabarBdlabaxBdbcxhHkavalcdtfaxBdbavc;abfaocitfgOarBdbaOaxBdlavalcefglcsGcdtfarBdbavc;abfaocefcsGcitfgOawBdbaOarBdlavalazfglcsGcdtfawBdbavc;abfaocdfcsGcitfgraxBdbarawBdlaocifhoabaHfhbalaPfhlasaPfhxxekdnaeaD9nmbc9:hoxlkaxcbaeRbbgwEgHarc;:eSgrfhsawcsGhOdndnawcl4gAmbascefhzxekashzavalaA9RcsGcdtfydbhskdndnaOmbazcefhxxekazhxavalaw9RcsGcdtfydbhzkdndnarTmbaecefhrxekaecdfhrae8SbegPcFeGhwdnaPcu9kmbaecofhHawcFbGhwcrhedninar8SbbgPcFbGaetawVhwaPcu9kmearcefhraecrfgec8J9hmbkaHhrxekarcefhrkawce4cbawceG9R7amfgmhHkdndnaAcsSmbarhwxekarcefhwar8SbbgecFeGhPdnaecu9kmbarcvfhsaPcFbGhPcrhedninaw8SbbgrcFbGaetaPVhParcu9kmeawcefhwaecrfgec8J9hmbkashwxekawcefhwkaPce4cbaPceG9R7amfgmhskdndnaOcsSmbawhexekawcefheaw8SbbgrcFeGhPdnarcu9kmbawcvfhzaPcFbGhPcrhrdninae8SbbgwcFbGartaPVhPawcu9kmeaecefhearcrfgrc8J9hmbkazhexekaecefhekaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabaz87elabas87edabaH87ebcohrxekabazBdwabasBdlabaHBdbcxhrkavc;abfaocitfgwasBdbawaHBdlavalcdtfaHBdbavc;abfaocefcsGcitfgwazBdbawasBdlavalcefglcsGcdtfasBdbavc;abfaocdfcsGcitfgwaHBdbawazBdlavalaATaAcsSVfglcsGcdtfazBdbalaOTaOcsSVfhlaocifhoabarfhbkaocsGhoalcsGhlaicefgiaq6mbkkcbc99aeaDSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk:4ioiue99dud99dud99dnaeTmbcbhiabhlindndnal8Uebgv:YgoJ:ji:1Salcof8UebgrciVgw:Y:vgDNJbbbZJbbb:;avcu9kEMgq:lJbbb9p9DTmbaq:Ohkxekcjjjj94hkkalclf8Uebhvalcdf8UebhxalarcefciGcetfak87ebdndnax:YgqaDNJbbbZJbbb:;axcu9kEMgm:lJbbb9p9DTmbam:Ohxxekcjjjj94hxkabaiarciGgkfcd7cetfax87ebdndnav:YgmaDNJbbbZJbbb:;avcu9kEMgP:lJbbb9p9DTmbaP:Ohvxekcjjjj94hvkalarcufciGcetfav87ebdndnawaw2:ZgPaPMaoaoN:taqaqN:tamamN:tgoJbbbbaoJbbbb9GE:raDNJbbbZMgD:lJbbb9p9DTmbaD:Ohrxekcjjjj94hrkalakcetfar87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk:Tvirud99eudndnadcl9hmbaeTmeindndnabRbbgiabcefgl8Sbbgvabcdfgo8Sbbgrf9R:YJbbuJabcifgwRbbgdce4adVgDcd4aDVgDcl4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax86bbdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao86bbdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai86bbdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad86bbabclfhbaecufgembxdkkaeTmbindndnab8Vebgiabcdfgl8Uebgvabclfgo8Uebgrf9R:YJbFu9habcofgw8Vebgdce4adVgDcd4aDVgDcl4aDVgDcw4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax87ebdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao87ebdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai87ebdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad87ebabcwfhbaecufgembkkk9teiucbcbyd:K:G:cjbgeabcifc98GfgbBd:K:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkk83dbcj:Gdk8Kbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbc:K:Gdkl8W:qbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuixkbbebeeddddilve9Weeeviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WbwY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbDl79IV9Rbqq:I9Dklbzik94evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaeai86b:q:W:cjbaecitab8Piw83i:q:G:cjbaecefgecjd9hmbkk:SBlEud97dur978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaialfgxar9RhodnadTgmmbavaoad;8qbbkaicefhPcj;abad9Uc;WFbGcjdadca0EhsdndndnadTmbaoadfhzcbhHinaeaH9nmdaxaP9RaD6miabaHad2fgOavcjdfasaeaH9RaHasfae6EgAaAcsfgoc9WGgCSEhXaPaDfhQaocl4cifcd4hLavcj;cbfaCcetfhKavcj;cbfaCci2fhYavcj;cbfaCfh8AcbhEaoc;ab6h3incbh5dnawTmbaPaEcd4fRbbh5kcbh8Eavcj;cbfh8Findndndndna5a8Ecet4ciGgoc9:fPdebdkaxaQ9RaC6mwdnaCTmbavcj;cbfa8EaC2faQaC;8qbbkaQaAfhQxdkaCTmeavcj;cbfa8EaC2fcbaC;8kbxekaxaQ9RaL6moaoclVcbawEhraQaLfhocbhidna3mbaxao9Rc;Gb6mbcbhlina8FalfhidndndndndndnaQalco4fRbbgqciGarfPDbedibledibkaipxbbbbbbbbbbbbbbbbpklbxlkaiaopbblaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLgacdp:meaapmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9oghpxiiiiiiiiiiiiiiiip8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaoclffa8JRb:q:W:cjbfhoxikaiaopbbwaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLpxssssssssssssssssp9oghpxssssssssssssssssp8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaocwffa8JRb:q:W:cjbfhoxdkaiaopbbbpklbaoczfhoxekaiaopbbdaoRbbggcitpbi:q:G:cjbagRb:q:W:cjbggpsaoRbeg8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbagaocdffa8JRb:q:W:cjbfhokdndndndndndnaqcd4ciGarfPDbedibledibkaiczfpxbbbbbbbbbbbbbbbbpklbxlkaiczfaopbblaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLgacdp:meaapmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9oghpxiiiiiiiiiiiiiiiip8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaoclffa8JRb:q:W:cjbfhoxikaiczfaopbbwaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLpxssssssssssssssssp9oghpxssssssssssssssssp8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaocwffa8JRb:q:W:cjbfhoxdkaiczfaopbbbpklbaoczfhoxekaiczfaopbbdaoRbbggcitpbi:q:G:cjbagRb:q:W:cjbggpsaoRbeg8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbagaocdffa8JRb:q:W:cjbfhokdndndndndndnaqcl4ciGarfPDbedibledibkaicafpxbbbbbbbbbbbbbbbbpklbxlkaicafaopbblaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLgacdp:meaapmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9oghpxiiiiiiiiiiiiiiiip8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaoclffa8JRb:q:W:cjbfhoxikaicafaopbbwaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLpxssssssssssssssssp9oghpxssssssssssssssssp8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaocwffa8JRb:q:W:cjbfhoxdkaicafaopbbbpklbaoczfhoxekaicafaopbbdaoRbbggcitpbi:q:G:cjbagRb:q:W:cjbggpsaoRbeg8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbagaocdffa8JRb:q:W:cjbfhokdndndndndndnaqco4arfPDbedibledibkaic8Wfpxbbbbbbbbbbbbbbbbpklbxlkaic8Wfaopbblaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLgacdp:meaapmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9oghpxiiiiiiiiiiiiiiiip8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsaap5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbaiaoclffaqRb:q:W:cjbfhoxikaic8Wfaopbbwaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLpxssssssssssssssssp9oghpxssssssssssssssssp8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsaap5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbaiaocwffaqRb:q:W:cjbfhoxdkaic8Wfaopbbbpklbaoczfhoxekaic8WfaopbbdaoRbbgicitpbi:q:G:cjbaiRb:q:W:cjbgipsaoRbegqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbaiaocdffaqRb:q:W:cjbfhokalc;abfhialcjefaC0meaihlaxao9Rc;Fb0mbkkdnaiaC9pmbaici4hlinaxao9RcK6mwa8FaifhqdndndndndndnaQaico4fRbbalcoG4ciGarfPDbedibledibkaqpxbbbbbbbbbbbbbbbbpkbbxlkaqaopbblaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLgacdp:meaapmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9oghpxiiiiiiiiiiiiiiiip8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spkbbagaoclffa8JRb:q:W:cjbfhoxikaqaopbbwaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLpxssssssssssssssssp9oghpxssssssssssssssssp8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spkbbagaocwffa8JRb:q:W:cjbfhoxdkaqaopbbbpkbbaoczfhoxekaqaopbbdaoRbbggcitpbi:q:G:cjbagRb:q:W:cjbggpsaoRbeg8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpkbbagaocdffa8JRb:q:W:cjbfhokalcdfhlaiczfgiaC6mbkkaohQaoTmoka8FaCfh8Fa8Ecefg8Ecl9hmbkdndndndnawTmbazaEcd4fRbbglciGPlbedwbkaCTmdaXaEfhlavaEfpbdbh8Kcbhoinalavcj;cbfaofpblbg8La8Aaofpblbg8MpmbzeHdOiAlCvXoQrLg8NaKaofpblbgyaYaofpblbg8PpmbzeHdOiAlCvXoQrLgIpmbezHdiOAlvCXorQLgacep9Taapxeeeeeeeeeeeeeeeeghp9op9Hp9rgaa8Kp9Ug8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp9Ug8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp9Ug8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp9Ug8Kp9Abbbaladfgla8Ka8NaIpmwDKYqk8AExm35Ps8E8Fgacep9Taaahp9op9Hp9rgap9Ug8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp9Ug8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp9Ug8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp9Ug8Kp9Abbbaladfgla8Ka8La8MpmwKDYq8AkEx3m5P8Es8Fg8Laya8PpmwKDYq8AkEx3m5P8Es8Fg8MpmbezHdiOAlvCXorQLgacep9Taaahp9op9Hp9rgap9Ug8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp9Ug8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp9Ug8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp9Ug8Kp9Abbbaladfgla8Ka8La8MpmwDKYqk8AExm35Ps8E8Fgacep9Taaahp9op9Hp9rgap9Ughp9Abbbaladfglahaaaapmlvorlvorlvorlvorp9Ughp9AbbbaladfglahaaaapmwDqkwDqkwDqkwDqkp9Ughp9AbbbaladfglahaaaapmxmPsxmPsxmPsxmPsp9Ug8Kp9AbbbaladfhlaoczfgoaC6mbxikkaCTmeaXaEfhlavaEfpbdbh8Kcbhoinalavcj;cbfaofpblbg8La8Aaofpblbg8MpmbzeHdOiAlCvXoQrLg8NaKaofpblbgyaYaofpblbg8PpmbzeHdOiAlCvXoQrLgIpmbezHdiOAlvCXorQLgacep:neaapxebebebebebebebebghp9op:bep9rgaa8Kp:oeg8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp:oeg8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp:oeg8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp:oeg8Kp9Abbbaladfgla8Ka8NaIpmwDKYqk8AExm35Ps8E8Fgacep:neaaahp9op:bep9rgap:oeg8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp:oeg8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp:oeg8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp:oeg8Kp9Abbbaladfgla8Ka8La8MpmwKDYq8AkEx3m5P8Es8Fg8Laya8PpmwKDYq8AkEx3m5P8Es8Fg8MpmbezHdiOAlvCXorQLgacep:neaaahp9op:bep9rgap:oeg8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp:oeg8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp:oeg8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp:oeg8Kp9Abbbaladfgla8Ka8La8MpmwDKYqk8AExm35Ps8E8Fgacep:neaaahp9op:bep9rgap:oeghp9Abbbaladfglahaaaapmlvorlvorlvorlvorp:oeghp9AbbbaladfglahaaaapmwDqkwDqkwDqkwDqkp:oeghp9AbbbaladfglahaaaapmxmPsxmPsxmPsxmPsp:oeg8Kp9AbbbaladfhlaoczfgoaC6mbxdkkaCTmbaXaEfhrcbhocbalcl4gl9Rc8FGhiavaEfpbdbhhinaravcj;cbfaofpblbg8Ka8Aaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaKaofpblbg8NaYaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLgaaip:Reaaalp:Tep9qgaahp9rghp9Abbbaradfgrahaaaapmlvorlvorlvorlvorp9rghp9AbbbaradfgrahaaaapmwDqkwDqkwDqkwDqkp9rghp9AbbbaradfgrahaaaapmxmPsxmPsxmPsxmPsp9rghp9Abbbaradfgraha8Ma8PpmwDKYqk8AExm35Ps8E8Fgaaip:Reaaalp:Tep9qgap9rghp9Abbbaradfgrahaaaapmlvorlvorlvorlvorp9rghp9AbbbaradfgrahaaaapmwDqkwDqkwDqkwDqkp9rghp9AbbbaradfgrahaaaapmxmPsxmPsxmPsxmPsp9rghp9Abbbaradfgraha8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLgaaip:Reaaalp:Tep9qgap9rghp9Abbbaradfgrahaaaapmlvorlvorlvorlvorp9rghp9AbbbaradfgrahaaaapmwDqkwDqkwDqkwDqkp9rghp9AbbbaradfgrahaaaapmxmPsxmPsxmPsxmPsp9rghp9Abbbaradfgraha8Ka8LpmwDKYqk8AExm35Ps8E8Fgaaip:Reaaalp:Tep9qgap9rghp9Abbbaradfgrahaaaapmlvorlvorlvorlvorp9rghp9AbbbaradfgrahaaaapmwDqkwDqkwDqkwDqkp9rghp9AbbbaradfgrahaaaapmxmPsxmPsxmPsxmPsp9rghp9AbbbaradfhraoczfgoaC6mbkkaEclfgEad6mbkdnaXavcjdf9hmbaAad2goTmbaOavcjdfao;8qbbkdnammbavaXaAcufad2fad;8qbbkaAaHfhHc9:hoaQhPaQmbxlkkaeTmbaDalfhrcbhocuhlinaralaD9RglfaD6mdasaeao9Raoasfae6Eaofgoae6mbkaial9RhPkcbc99axaP9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaokwbz:bjjjbkpPesu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecje;8kbav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhDaicefgiarfhqdndnaeci9pmbaqhexekcmcsawceSEhkcbhxcbhmaqhecbhlcbhoindndnaiRbbgrc;Ve0mbavc;abfaoarcu7gPcl4fcsGcitfgwydlhsawydbhzdndnarcsGgwak9pmbavalaPfcsGcdtfydbaxawEhraxawTgHfhxxekdnaeaD9nmbc9:hoxokdndnawcsSmbcehHamawcetfcWfhrxekaecefhrae8SbbgwcFeGhPdndnawcu9mmbarhexekaecvfheaPcFbGhPcrhwdninar8SbbgHcFbGawtaPVhPaHcu9kmearcefhrawcrfgwc8J9hmbxdkkarcefhekcehHaPce4cbaPceG9R7amfhrkarhmkavc;abfaocitfgwarBdbawasBdlavalcdtfarBdbavc;abfaocefcsGcitfgwazBdbawarBdlaocdfhoaHalfhldnadcd9hmbabar87elabas87edabaz87ebabcofhbxdkabarBdwabasBdlabazBdbabcxfhbxekdnarcpe0mbavalaDarcsGfRbbgwcl4gP9RcsGcdtfydbaxcefgsaPEhravalaw9RcsGcdtfydbasaPTgzfgsawcsGgPEhwaPThPdndnadcd9hmbabaw87elabar87edabax87ebcohHxekabawBdwabarBdlabaxBdbcxhHkavalcdtfaxBdbavc;abfaocitfgOarBdbaOaxBdlavalcefglcsGcdtfarBdbavc;abfaocefcsGcitfgOawBdbaOarBdlavalazfglcsGcdtfawBdbavc;abfaocdfcsGcitfgraxBdbarawBdlaocifhoabaHfhbalaPfhlasaPfhxxekdnaeaD9nmbc9:hoxlkaxcbaeRbbgwEgHarc;:eSgrfhsawcsGhOdndnawcl4gAmbascefhzxekashzavalaA9RcsGcdtfydbhskdndnaOmbazcefhxxekazhxavalaw9RcsGcdtfydbhzkdndnarTmbaecefhrxekaecdfhrae8SbegPcFeGhwdnaPcu9kmbaecofhHawcFbGhwcrhedninar8SbbgPcFbGaetawVhwaPcu9kmearcefhraecrfgec8J9hmbkaHhrxekarcefhrkawce4cbawceG9R7amfgmhHkdndnaAcsSmbarhwxekarcefhwar8SbbgecFeGhPdnaecu9kmbarcvfhsaPcFbGhPcrhedninaw8SbbgrcFbGaetaPVhParcu9kmeawcefhwaecrfgec8J9hmbkashwxekawcefhwkaPce4cbaPceG9R7amfgmhskdndnaOcsSmbawhexekawcefheaw8SbbgrcFeGhPdnarcu9kmbawcvfhzaPcFbGhPcrhrdninae8SbbgwcFbGartaPVhPawcu9kmeaecefhearcrfgrc8J9hmbkazhexekaecefhekaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabaz87elabas87edabaH87ebcohrxekabazBdwabasBdlabaHBdbcxhrkavc;abfaocitfgwasBdbawaHBdlavalcdtfaHBdbavc;abfaocefcsGcitfgwazBdbawasBdlavalcefglcsGcdtfasBdbavc;abfaocdfcsGcitfgwaHBdbawazBdlavalaATaAcsSVfglcsGcdtfazBdbalaOTaOcsSVfhlaocifhoabarfhbkaocsGhoalcsGhlaicefgiaq6mbkkcbc99aeaDSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk;Toio97eue97aec98Ghedndnadcl9hmbaeTmecbhdinababpbbbgicKp:RecKp:Sep;6eglaicwp:RecKp:Sep;6ealp;Geaiczp:RecKp:Sep;6egvp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgwp9op9rp;Keglpxbb;:9cbb;:9cbb;:9cbb;:9calalp;Meaoaop;Meavaravawp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFbbbFbbbFbbbFbbbp9oaipxbbbFbbbFbbbFbbbFp9op9qalavp;Mearp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaoavp;Mearp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgDaDpbbbgipxbbbbbbFFbbbbbbFFgwp9oabpbbbgoaipmbediwDqkzHOAKY8AEgvczp:Reczp:Sep;6eglaoaipmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eavczp:Sep;6egvp;Gealp;Gep;Kep;Legipxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgqp9op9rp;Keglpxb;:FSb;:FSb;:FSb;:FSalalp;Meaiaip;Meavaravaqp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbp9oaiavp;Mearp;Keczp:Rep9qgialavp;Mearp;KepxFFbbFFbbFFbbFFbbp9oglpmwDKYqk8AExm35Ps8E8Fp9qpkbbabaoawp9oaialpmbezHdiOAlvCXorQLp9qpkbbabcafhbadclfgdae6mbkkk;2ileue97euo97dnaec98GgiTmbcbheinabcKfpx:ji:1S:ji:1S:ji:1S:ji:1SabpbbbglabczfgvpbbbgopmlvorxmPsCXQL358E8Fgrczp:Segwpxibbbibbbibbbibbbp9qp;6egDp;NegqaDaDp;MegDaDp;KealaopmbediwDqkzHOAKY8AEgDczp:Reczp:Sep;6eglalp;MeaDczp:Sep;6egoaop;Mearczp:Reczp:Sep;6egrarp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jep;Mepxbbn0bbn0bbn0bbn0gDp;KepxFFbbFFbbFFbbFFbbgkp9oaqaop;MeaDp;Keczp:Rep9qgoaqalp;MeaDp;Keakp9oaqarp;MeaDp;Keczp:Rep9qgDpmwDKYqk8AExm35Ps8E8Fglp5eawclp:RegqpEi:T:j83ibavalp5baqpEd:T:j83ibabcwfaoaDpmbezHdiOAlvCXorQLgDp5eaqpEe:T:j83ibabaDp5baqpEb:T:j83ibabcafhbaeclfgeai6mbkkkuee97dnadcd4ae2c98GgeTmbcbhdinababpbbbgicwp:Recwp:Sep;6eaicep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbabczfhbadclfgdae6mbkkk:Sodw97euaec98Ghedndnadcl9hmbaeTmecbhdinabpxbbuJbbuJbbuJbbuJabpbbbgicKp:TeglaicYp:Tep9qgvcdp:Teavp9qgvclp:Teavp9qgop;6ep;Negvaicwp:RecKp:SegraipxFbbbFbbbFbbbFbbbgwp9ogDp:Uep;6ep;Mepxbbn0bbn0bbn0bbn0gqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9oavaDarp:Xeaiczp:RecKp:Segip:Uep;6ep;Meaqp;Keawp9op9qavaDaraip:Uep:Xep;6ep;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qavaoalcep:Rep9oalpxebbbebbbebbbebbbp9op9qp;6ep;Meaqp;KecKp:Rep9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgkpxbFu9hbFu9hbFu9hbFu9habpbbbglakpbbbgrpmlvorxmPsCXQL358E8Fgvczp:TegqavcHp:Tep9qgicdp:Teaip9qgiclp:Teaip9qgicwp:Teaip9qgop;6ep;NegialarpmbediwDqkzHOAKY8AEgDpxFFbbFFbbFFbbFFbbglp9ograDczp:Segwp:Ueavczp:Reczp:SegDp:Xep;6ep;Mepxbbn0bbn0bbn0bbn0gvp;Kealp9oaiarawaDp:Uep:Xep;6ep;Meavp;Keczp:Rep9qgwaiaoaqcep:Rep9oaqpxebbbebbbebbbebbbp9op9qp;6ep;Meavp;Keczp:ReaiaDarp:Uep;6ep;Meavp;Kealp9op9qgipmwDKYqk8AExm35Ps8E8FpkbbabawaipmbezHdiOAlvCXorQLpkbbabcafhbadclfgdae6mbkkk9teiucbcbydj:G:cjbgeabcifc98GfgbBdj:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkxebcj:Gdklz:zbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),a=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var r=WebAssembly.validate(t)?o(e):o(n),s,i=WebAssembly.instantiate(r,{}).then(function(x){s=x.instance,s.exports.__wasm_call_ctors()});function o(x){for(var M=new Uint8Array(x.length),v=0;v<x.length;++v){var g=x.charCodeAt(v);M[v]=g>96?g-97:g>64?g-39:g+4}for(var k=0,v=0;v<x.length;++v)M[k++]=M[v]<60?a[M[v]]:(M[v]-60)*64+M[++v];return M.buffer.slice(0,k)}function c(x,M,v,g,k,h,A){var P=x.exports.sbrk,S=g+3&-4,T=P(S*k),z=P(h.length),L=new Uint8Array(x.exports.memory.buffer);L.set(h,z);var I=M(T,g,k,z,h.length);if(I==0&&A&&A(T,S,k),v.set(L.subarray(T,T+g*k)),P(T-P(0)),I!=0)throw new Error("Malformed buffer data: "+I)}var l={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp",COLOR:"meshopt_decodeFilterColor"},b={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},d=[],m=0;function u(x){var M={object:new Worker(x),pending:0,requests:{}};return M.object.onmessage=function(v){var g=v.data;M.pending-=g.count,M.requests[g.id][g.action](g.value),delete M.requests[g.id]},M}function y(x){for(var M="self.ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(r)+"]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = "+w.name+";"+c.toString()+w.toString(),v=new Blob([M],{type:"text/javascript"}),g=URL.createObjectURL(v),k=d.length;k<x;++k)d[k]=u(g);for(var k=x;k<d.length;++k)d[k].object.postMessage({});d.length=x,URL.revokeObjectURL(g)}function p(x,M,v,g,k){for(var h=d[0],A=1;A<d.length;++A)d[A].pending<h.pending&&(h=d[A]);return new Promise(function(P,S){var T=new Uint8Array(v),z=++m;h.pending+=x,h.requests[z]={resolve:P,reject:S},h.object.postMessage({id:z,count:x,size:M,source:T,mode:g,filter:k},[T.buffer])})}function w(x){var M=x.data;self.ready.then(function(v){if(!M.id)return self.close();try{var g=new Uint8Array(M.count*M.size);c(v,v.exports[M.mode],g,M.count,M.size,M.source,v.exports[M.filter]),self.postMessage({id:M.id,count:M.count,action:"resolve",value:g},[g.buffer])}catch(k){self.postMessage({id:M.id,count:M.count,action:"reject",value:k})}})}return{ready:i,supported:!0,useWorkers:function(x){y(x)},decodeVertexBuffer:function(x,M,v,g,k){c(s,s.exports.meshopt_decodeVertexBuffer,x,M,v,g,s.exports[l[k]])},decodeIndexBuffer:function(x,M,v,g){c(s,s.exports.meshopt_decodeIndexBuffer,x,M,v,g)},decodeIndexSequence:function(x,M,v,g){c(s,s.exports.meshopt_decodeIndexSequence,x,M,v,g)},decodeGltfBuffer:function(x,M,v,g,k,h){c(s,s.exports[b[k]],x,M,v,g,s.exports[l[h]])},decodeGltfBufferAsync:function(x,M,v,g,k){return d.length>0?p(x,M,v,b[g],l[k]):i.then(function(){var h=new Uint8Array(x*M);return c(s,s.exports[b[g]],h,x,M,v,s.exports[l[k]]),h})}}})();var ho=["KHR_mesh_quantization","KHR_texture_transform","KHR_materials_emissive_strength","KHR_materials_unlit","KHR_lights_punctual","KHR_materials_ior","KHR_materials_specular","KHR_materials_clearcoat","KHR_materials_transmission","EXT_meshopt_compression","KHR_meshopt_compression"],cs=["KHR_draco_mesh_compression","KHR_texture_basisu"],fo=1179937895,po=1313821514,go=5130562;async function er(n,e={}){let t=e.fetch??globalThis.fetch;if(!t)throw new Error("glTF: no fetch implementation available");let a=await t(n);if(!a.ok)throw new Error(`glTF: failed to fetch ${n}: ${a.status} ${a.statusText}`);let r=await a.arrayBuffer();return ko(r,yo(n),e)}function yo(n){let e=n.search(/[?#]/),t=e>=0?n.slice(0,e):n,a=t.lastIndexOf("/");return a>=0?t.slice(0,a+1):""}function vo(n,e){if(/^(data:|blob:|[a-z][a-z0-9+.-]*:\/\/)/i.test(n)||n.startsWith("/")||!e)return n;try{return new URL(n,e).href}catch{return e+n}}function xo(n){let e=n.indexOf(",");if(e<0)throw new Error("glTF: malformed data: URI");let t=n.slice(5,e),a=n.slice(e+1),r=/;base64$/i.test(t),s=t.replace(/;base64$/i,"").split(";")[0]||"application/octet-stream";if(r){let i=atob(a),o=new Uint8Array(i.length);for(let c=0;c<i.length;c++)o[c]=i.charCodeAt(c);return{bytes:o,mimeType:s}}return{bytes:new TextEncoder().encode(decodeURIComponent(a)),mimeType:s}}function wo(n){return n instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&n instanceof SharedArrayBuffer}function Mo(n){if(ArrayBuffer.isView(n)){let r=n;n=r.buffer.slice(r.byteOffset,r.byteOffset+r.byteLength)}if(!wo(n))return{json:n};let e=new Uint8Array(n),t=new DataView(n);if(e.byteLength>=12&&t.getUint32(0,!0)===fo){let r=t.getUint32(4,!0);if(r!==2)throw new Error(`glTF: unsupported GLB version ${r}`);let s=Math.min(t.getUint32(8,!0),e.byteLength),i=12,o,c;for(;i+8<=s;){let l=t.getUint32(i,!0),b=t.getUint32(i+4,!0);if(i+=8,i+l>s)throw new Error("glTF: GLB chunk overruns file");let d=e.subarray(i,i+l);b===po&&!o?o=JSON.parse(new TextDecoder().decode(d)):b===go&&!c&&(c=d),i+=l+(4-l%4)%4}if(!o)throw new Error("glTF: GLB has no JSON chunk");return{json:o,glbBin:c}}let a=new TextDecoder().decode(e);return a.charCodeAt(0)===65279&&(a=a.slice(1)),{json:JSON.parse(a)}}async function ko(n,e,t){let{json:a,glbBin:r}=Mo(n);if(!a||typeof a!="object"||!a.asset)throw new Error('glTF: missing "asset" property \u2014 not a glTF 2.0 file');if(parseInt(String(a.asset.minVersion??a.asset.version??"2"),10)!==2)throw new Error(`glTF: unsupported version ${a.asset.version} (only 2.x)`);let i=a.extensionsUsed??[],o=a.extensionsRequired??[];for(let A of o){if(cs.includes(A))throw new Error(`glTF: required extension "${A}" is not supported by fondaineGL's loader (decompress the asset, e.g. with gltf-transform, first)`);if(!ho.includes(A))throw new Error(`glTF: required extension "${A}" is not supported`)}let c=t.fetch??(typeof globalThis.fetch=="function"?globalThis.fetch.bind(globalThis):void 0),l=async A=>{if(A.startsWith("data:"))return xo(A);if(!c)throw new Error(`glTF: cannot load external resource "${A}" \u2014 no fetch available`);let P=vo(A,e),S=await c(P);if(!S.ok)throw new Error(`glTF: failed to fetch ${P}: ${S.status} ${S.statusText}`);return{bytes:new Uint8Array(await S.arrayBuffer()),mimeType:S.headers.get("content-type")??""}},b=await Promise.all((a.buffers??[]).map(async(A,P)=>{let S=A.extensions?.EXT_meshopt_compression??A.extensions?.KHR_meshopt_compression;if(A.uri===void 0&&S?.fallback)return new Uint8Array(A.byteLength);if(A.uri===void 0){if(P!==0||!r)throw new Error(`glTF: buffer ${P} has no uri and no GLB BIN chunk`);return r}let{bytes:T}=await l(A.uri);if(T.byteLength<A.byteLength)throw new Error(`glTF: buffer ${P} is ${T.byteLength} bytes, expected ${A.byteLength}`);return T})),d=(a.bufferViews??[]).filter(A=>A.extensions?.EXT_meshopt_compression||A.extensions?.KHR_meshopt_compression);if(d.length){await Nr.ready;for(let A of d){let P=A.extensions.EXT_meshopt_compression??A.extensions.KHR_meshopt_compression,S=b[P.buffer].subarray(P.byteOffset??0,(P.byteOffset??0)+P.byteLength),T=new Uint8Array(P.count*P.byteStride);Nr.decodeGltfBuffer(T,P.count,P.byteStride,S,P.mode,P.filter),b.push(T),A.buffer=b.length-1,A.byteOffset=0,A.byteLength=T.byteLength,P.mode==="ATTRIBUTES"&&(A.byteStride=P.byteStride),delete A.extensions.EXT_meshopt_compression,delete A.extensions.KHR_meshopt_compression}}let m={json:a,buffers:b},u=await Promise.all((a.images??[]).map(async(A,P)=>{if(A.bufferView!==void 0){let{bytes:z}=ua(m,A.bufferView);return{name:A.name??`image${P}`,mimeType:A.mimeType??os(z),data:z}}if(A.uri===void 0)throw new Error(`glTF: image ${P} has neither uri nor bufferView`);let{bytes:S,mimeType:T}=await l(A.uri);return{name:A.name??A.uri.slice(0,64),mimeType:A.mimeType??(T.startsWith("image/")?T:os(S)),data:S}})),y=[];if((t.decodeImages??!0)&&typeof globalThis.createImageBitmap=="function"&&typeof Blob<"u"){let A=await Promise.all(u.map(P=>createImageBitmap(new Blob([P.data],{type:P.mimeType}),{colorSpaceConversion:"none",premultiplyAlpha:"none"})));y.push(...A)}let p=Lo(a),w=(a.materials??[]).map((A,P)=>Po(a,P)),x=(a.meshes??[]).map((A,P)=>Ro(m,P,w)),M=jo(a,p),v=(a.skins??[]).map((A,P)=>{let S=A.joints.length,T;if(A.inverseBindMatrices!==void 0){if(T=Ke(m,A.inverseBindMatrices),T.length<S*16)throw new Error(`glTF: skin ${P} inverseBindMatrices has ${T.length/16} matrices for ${S} joints`);T.length>S*16&&(T=T.slice(0,S*16))}else{T=new Float32Array(S*16);for(let z=0;z<S;z++)T[z*16]=T[z*16+5]=T[z*16+10]=T[z*16+15]=1}return{name:A.name??`skin${P}`,joints:A.joints.slice(),inverseBindMatrices:T,skeleton:A.skeleton}}),g=(a.animations??[]).map((A,P)=>Go(m,P)),k=(a.cameras??[]).map((A,P)=>({name:A.name??`camera${P}`,type:A.type==="orthographic"?"orthographic":"perspective",perspective:A.perspective?{...A.perspective}:void 0,orthographic:A.orthographic?{...A.orthographic}:void 0})),h=(a.scenes??[]).map((A,P)=>({name:A.name??`scene${P}`,nodes:(A.nodes??[]).slice()}));return h.length===0&&M.length>0&&(h=[{name:"scene0",nodes:M.map((A,P)=>A.parent<0?P:-1).filter(A=>A>=0)}]),{meshes:x,materials:w,images:y,nodes:M,scenes:h,scene:a.scene??0,skins:v,animations:g,extensionsUsed:i.slice(),imageData:u,cameras:k,lights:p,extensionsRequired:o.slice()}}function os(n){return n[0]===137&&n[1]===80&&n[2]===78&&n[3]===71?"image/png":n[0]===255&&n[1]===216?"image/jpeg":n[0]===82&&n[1]===73&&n[2]===70&&n[3]===70&&n[8]===87&&n[9]===69?"image/webp":n[0]===71&&n[1]===73&&n[2]===70?"image/gif":n[4]===102&&n[5]===116&&n[6]===121&&n[7]===112?"image/avif":"application/octet-stream"}var ue=(n,e)=>typeof n=="number"&&Number.isFinite(n)?n:e,ct=(n,e)=>n?.extensions?.[e];function Ao(n,e){let t=e!==void 0?n.samplers?.[e]:void 0,a=l=>l===le.CLAMP_TO_EDGE?"clamp-to-edge":l===le.MIRRORED_REPEAT?"mirror-repeat":"repeat",r=t?.minFilter,s=t?.magFilter,i=r===void 0||r>=le.NEAREST_MIPMAP_NEAREST,o=r===le.NEAREST||r===le.NEAREST_MIPMAP_NEAREST||r===le.NEAREST_MIPMAP_LINEAR?"nearest":"linear",c=r===le.NEAREST_MIPMAP_NEAREST||r===le.LINEAR_MIPMAP_NEAREST?"nearest":"linear";return{magFilter:s===le.NEAREST?"nearest":"linear",minFilter:o,mipmap:i,mipmapFilter:c,wrapS:a(t?.wrapS),wrapT:a(t?.wrapT)}}function ot(n,e){if(!e)return;let t=n.textures?.[e.index];if(!t)return;if(ct(t,"KHR_texture_basisu")&&t.source===void 0)throw new Error('glTF: extension "KHR_texture_basisu" is not supported (texture has no fallback source)');let a=t.source;if(a===void 0)for(let o of["EXT_texture_webp","EXT_texture_avif"]){let c=ct(t,o);if(c&&typeof c.source=="number"){a=c.source;break}}if(a===void 0)return;let r=e.texCoord??0,s,i=ct(e,"KHR_texture_transform");if(i){let o=i.offset,c=i.scale;s={offset:[ue(o?.[0],0),ue(o?.[1],0)],rotation:ue(i.rotation,0),scale:[ue(c?.[0],1),ue(c?.[1],1)]},typeof i.texCoord=="number"&&(r=i.texCoord)}return{image:a,sampler:Ao(n,t.sampler),texCoord:r,transform:s}}function Po(n,e){let t=n.materials[e],a=t.pbrMetallicRoughness??{},r=a.baseColorFactor??[1,1,1,1],s=t.emissiveFactor??[0,0,0],i=t.alphaMode==="MASK"||t.alphaMode==="BLEND"?t.alphaMode:"OPAQUE",o={name:t.name??`material${e}`,baseColorFactor:[ue(r[0],1),ue(r[1],1),ue(r[2],1),ue(r[3],1)],baseColorTexture:ot(n,a.baseColorTexture),metallicFactor:ue(a.metallicFactor,1),roughnessFactor:ue(a.roughnessFactor,1),metallicRoughnessTexture:ot(n,a.metallicRoughnessTexture),normalTexture:ot(n,t.normalTexture),normalScale:ue(t.normalTexture?.scale,1),occlusionTexture:ot(n,t.occlusionTexture),occlusionStrength:ue(t.occlusionTexture?.strength,1),emissiveTexture:ot(n,t.emissiveTexture),emissiveFactor:[ue(s[0],0),ue(s[1],0),ue(s[2],0)],emissiveStrength:1,alphaMode:i,alphaCutoff:ue(t.alphaCutoff,.5),doubleSided:!!t.doubleSided,unlit:!!ct(t,"KHR_materials_unlit")},c=ct(t,"KHR_materials_emissive_strength");c&&(o.emissiveStrength=ue(c.emissiveStrength,1));let l=ct(t,"KHR_materials_ior");l&&(o.ior=ue(l.ior,1.5));let b=ct(t,"KHR_materials_specular");if(b){o.specularFactor=ue(b.specularFactor,1);let u=b.specularColorFactor;o.specularColorFactor=[ue(u?.[0],1),ue(u?.[1],1),ue(u?.[2],1)],o.specularTexture=ot(n,b.specularTexture),o.specularColorTexture=ot(n,b.specularColorTexture)}let d=ct(t,"KHR_materials_clearcoat");d&&(o.clearcoat={factor:ue(d.clearcoatFactor,0),roughness:ue(d.clearcoatRoughnessFactor,0)},o.clearcoatTexture=ot(n,d.clearcoatTexture),o.clearcoatRoughnessTexture=ot(n,d.clearcoatRoughnessTexture),o.clearcoatNormalTexture=ot(n,d.clearcoatNormalTexture));let m=ct(t,"KHR_materials_transmission");return m&&(o.transmission=ue(m.transmissionFactor,0),o.transmissionTexture=ot(n,m.transmissionTexture)),o}function So(n){for(let e=0;e+3<n.length;e+=4){let t=n[e]+n[e+1]+n[e+2]+n[e+3];if(t>1e-8){let a=1/t;n[e]*=a,n[e+1]*=a,n[e+2]*=a,n[e+3]*=a}else n[e]=1,n[e+1]=0,n[e+2]=0,n[e+3]=0}}function To(n,e,t){if(e===4)return n;let a=new Float32Array(t*4);for(let r=0;r<t;r++)a[r*4]=n[r*3],a[r*4+1]=n[r*3+1],a[r*4+2]=n[r*3+2],a[r*4+3]=1;return a}function zo(n,e,t,a){for(let P of Object.keys(e.extensions??{}))if(cs.includes(P))throw new Error(`glTF: mesh ${t} uses unsupported extension "${P}"`);let r=e.attributes;if(r.POSITION===void 0)throw new Error(`glTF: mesh ${t} primitive has no POSITION attribute`);let s=$a(n,r.POSITION),i=s.count,o=Ke(n,r.POSITION),c=r.NORMAL!==void 0?Ke(n,r.NORMAL):void 0,l=r.TANGENT!==void 0?Ke(n,r.TANGENT):void 0,b=r.TEXCOORD_0!==void 0?Ke(n,r.TEXCOORD_0):void 0,d=r.TEXCOORD_1!==void 0?Ke(n,r.TEXCOORD_1):void 0,m;if(r.COLOR_0!==void 0){let P=$a(n,r.COLOR_0);m=To(Ke(n,r.COLOR_0),Ht(P),P.count)}let u;if(r.JOINTS_0!==void 0){let P=Or(n,r.JOINTS_0);u=new Uint16Array(P.length);for(let S=0;S<P.length;S++)u[S]=P[S]}let y=r.WEIGHTS_0!==void 0?Ke(n,r.WEIGHTS_0):void 0;y&&So(y);let p;e.targets&&e.targets.length&&(p=e.targets.map(P=>({positions:P.POSITION!==void 0?Ke(n,P.POSITION):void 0,normals:P.NORMAL!==void 0?Ke(n,P.NORMAL):void 0,tangents:P.TANGENT!==void 0?Ke(n,P.TANGENT):void 0})));let w;if(e.indices!==void 0)w=Or(n,e.indices);else{w=new Uint32Array(i);for(let P=0;P<i;P++)w[P]=P}for(let P=0;P<w.length;P++)if(w[P]>=i)throw new Error(`glTF: mesh ${t} index ${w[P]} out of range (${i} vertices)`);let x=ns(e.mode??le.TRIANGLES,w),M=x.indices,v=i,g=!1;if(!c&&x.topology==="triangle-list"){if(o=it(o,3,M),l&&(l=it(l,4,M)),b&&(b=it(b,2,M)),d&&(d=it(d,2,M)),m&&(m=it(m,4,M)),u&&(u=it(u,4,M)),y&&(y=it(y,4,M)),p){let P=M;p=p.map(S=>({positions:S.positions?it(S.positions,3,P):void 0,normals:S.normals?it(S.normals,3,P):void 0,tangents:S.tangents?it(S.tangents,3,P):void 0}))}v=M.length,M=new Uint32Array(v);for(let P=0;P<v;P++)M[P]=P;c=ss(o),g=!0}let k=e.material??-1,h=!1;if(!l&&c&&b&&x.topology==="triangle-list"&&k>=0){let P=a[k];if(P?.normalTexture){let S=P.normalTexture.texCoord===1&&d?d:b;l=rs(o,c,S,M),h=!0}}let A;return s.min&&s.max&&s.min.length>=3&&s.max.length>=3&&!s.sparse&&!s.normalized?A={min:[s.min[0],s.min[1],s.min[2]],max:[s.max[0],s.max[1],s.max[2]]}:A=is(o),{positions:o,normals:c,tangents:l,uvs:b,uvs2:d,colors:m,joints:u,weights:y,indices:M,material:k,bounds:A,morphTargets:p,topology:x.topology,vertexCount:v,generatedNormals:g,generatedTangents:h}}function Ro(n,e,t){let a=n.json.meshes[e];return{name:a.name??`mesh${e}`,primitives:a.primitives.map(r=>zo(n,r,e,t)),weights:a.weights?.slice()}}function Lo(n){return(ct(n,"KHR_lights_punctual")?.lights??[]).map(a=>{let r=a.type==="directional"||a.type==="spot"?a.type:"point",s=a.color,i={type:r,color:[ue(s?.[0],1),ue(s?.[1],1),ue(s?.[2],1)],intensity:ue(a.intensity,1)};if(typeof a.name=="string"&&(i.name=a.name),typeof a.range=="number"&&a.range>0&&(i.range=a.range),r==="spot"){let o=a.spot??{};i.innerConeAngle=ue(o.innerConeAngle,0),i.outerConeAngle=ue(o.outerConeAngle,Math.PI/4)}return i})}function Io(n){let e=Math.hypot(n[0],n[1],n[2]),t=Math.hypot(n[4],n[5],n[6]),a=Math.hypot(n[8],n[9],n[10]);n[0]*(n[5]*n[10]-n[6]*n[9])-n[4]*(n[1]*n[10]-n[2]*n[9])+n[8]*(n[1]*n[6]-n[2]*n[5])<0&&(e=-e);let s=e?1/e:0,i=t?1/t:0,o=a?1/a:0,c=n[0]*s,l=n[1]*s,b=n[2]*s,d=n[4]*i,m=n[5]*i,u=n[6]*i,y=n[8]*o,p=n[9]*o,w=n[10]*o,x,M,v,g,k=c+m+w;if(k>0){let A=Math.sqrt(k+1)*2;g=.25*A,x=(u-p)/A,M=(y-b)/A,v=(l-d)/A}else if(c>m&&c>w){let A=Math.sqrt(1+c-m-w)*2;g=(u-p)/A,x=.25*A,M=(l+d)/A,v=(y+b)/A}else if(m>w){let A=Math.sqrt(1+m-c-w)*2;g=(y-b)/A,x=(l+d)/A,M=.25*A,v=(u+p)/A}else{let A=Math.sqrt(1+w-c-m)*2;g=(l-d)/A,x=(y+b)/A,M=(u+p)/A,v=.25*A}let h=Math.hypot(x,M,v,g)||1;return{translation:[n[12],n[13],n[14]],rotation:[x/h,M/h,v/h,g/h],scale:[e,t,a]}}function jo(n,e){let a=(n.nodes??[]).map((r,s)=>{let i=[0,0,0],o=[0,0,0,1],c=[1,1,1];if(r.matrix&&r.matrix.length===16)({translation:i,rotation:o,scale:c}=Io(r.matrix));else{if(r.translation&&(i=[ue(r.translation[0],0),ue(r.translation[1],0),ue(r.translation[2],0)]),r.rotation){let d=r.rotation,m=Math.hypot(d[0],d[1],d[2],d[3])||1;o=[d[0]/m,d[1]/m,d[2]/m,d[3]/m]}r.scale&&(c=[ue(r.scale[0],1),ue(r.scale[1],1),ue(r.scale[2],1)])}let l={name:r.name??`node${s}`,children:(r.children??[]).slice(),parent:-1,mesh:r.mesh,skin:r.skin,camera:r.camera,translation:i,rotation:o,scale:c};r.weights&&(l.weights=r.weights.slice());let b=ct(r,"KHR_lights_punctual");return b&&typeof b.light=="number"&&e[b.light]&&(l.light={...e[b.light]}),l});return a.forEach((r,s)=>{for(let i of r.children){if(!a[i])throw new Error(`glTF: node ${s} references missing child ${i}`);if(a[i].parent>=0)throw new Error(`glTF: node ${i} has multiple parents`);a[i].parent=s}}),a}function Go(n,e){let t=n.json.animations[e],a=0,r=t.samplers.map((i,o)=>{let c=Ke(n,i.input),l=Ke(n,i.output),b=i.interpolation==="STEP"||i.interpolation==="CUBICSPLINE"?i.interpolation:"LINEAR",d=c.length,m=b==="CUBICSPLINE"?3:1,u=d>0?Math.round(l.length/(d*m)):Ht($a(n,i.output));if(d>0&&u*d*m!==l.length)throw new Error(`glTF: animation ${e} sampler ${o}: output length ${l.length} does not match ${d} keys`);return d>0&&(a=Math.max(a,c[d-1])),{input:c,output:l,interpolation:b,components:u}}),s=[];for(let i of t.channels){let o=i.target.path;i.target.node!==void 0&&(o!=="translation"&&o!=="rotation"&&o!=="scale"&&o!=="weights"||s.push({node:i.target.node,path:o,sampler:i.sampler}))}return{name:t.name??`animation${e}`,channels:s,samplers:r,duration:a}}function ls(n){return n+3&-4}function bs(n,e={}){let t=[],a=0,r=[],s=[],i=[],o=[],c=[],l=new Map,b=(g,k)=>{let h=new Uint8Array(g.buffer,g.byteOffset,g.byteLength),A=a,P=ls(h.byteLength),S=new Uint8Array(P);return S.set(h),t.push(S),a+=P,r.push({buffer:0,byteOffset:A,byteLength:h.byteLength,...k?{target:k}:{}}),r.length-1},d=(g,k,h,A,P=!1)=>{let S=b(g,A),T=g.length/h,z={bufferView:S,componentType:g instanceof Float32Array?5126:5125,count:T,type:k};if(P){let L=Array(h).fill(1/0),I=Array(h).fill(-1/0);for(let G=0;G<T;G++)for(let j=0;j<h;j++){let R=g[G*h+j];R<L[j]&&(L[j]=R),R>I[j]&&(I[j]=R)}z.min=L,z.max=I}return s.push(z),s.length-1};for(let g of n){let k=g.object.mesh.source;if(!k)continue;let h=g.object.material,A=l.get(h);A===void 0&&(c.push({name:h.name,pbrMetallicRoughness:{baseColorFactor:Array.from(h.baseColor),metallicFactor:h.metallic,roughnessFactor:h.roughness},doubleSided:h.doubleSided,...h.alphaMode==="mask"?{alphaMode:"MASK",alphaCutoff:h.alphaCutoff}:{}}),A=c.length-1,l.set(h,A));let P={POSITION:d(Float32Array.from(k.positions),"VEC3",3,34962,!0),NORMAL:d(Float32Array.from(k.normals),"VEC3",3,34962)};k.uvs&&(P.TEXCOORD_0=d(Float32Array.from(k.uvs),"VEC2",2,34962)),k.tangents&&(P.TANGENT=d(Float32Array.from(k.tangents),"VEC4",4,34962));let S=d(Uint32Array.from(k.indices),"SCALAR",1,34963);i.push({name:g.name,primitives:[{attributes:P,indices:S,material:A}]}),o.push({name:g.name,mesh:i.length-1,matrix:Array.from(g.object.transform)})}let m={asset:{version:"2.0",generator:e.generator??"fondaine oAxis"},scene:0,scenes:[{nodes:o.map((g,k)=>k)}],nodes:o,meshes:i,materials:c,accessors:s,bufferViews:r,buffers:[{byteLength:a}]},u=new TextEncoder().encode(JSON.stringify(m)),y=ls(u.byteLength),p=20+y+8+a,w=new ArrayBuffer(p),x=new DataView(w),M=new Uint8Array(w);x.setUint32(0,1179937895,!0),x.setUint32(4,2,!0),x.setUint32(8,p,!0),x.setUint32(12,y,!0),x.setUint32(16,1313821514,!0),M.set(u,20);for(let g=u.byteLength;g<y;g++)M[20+g]=32;let v=20+y;x.setUint32(v,a,!0),x.setUint32(v+4,5130562,!0),v+=8;for(let g of t)M.set(g,v),v+=g.byteLength;return w}function Fo(n){return U.fromRotationTranslationScale(U.create(),n.rotation,n.translation,n.scale)}function Cr(n){let e=n.nodes.map(()=>U.create()),t=(a,r)=>{let s=Fo(n.nodes[a]);r?U.multiply(e[a],r,s):U.copy(e[a],s);for(let i of n.nodes[a].children)t(i,e[a])};for(let a=0;a<n.nodes.length;a++)n.nodes[a].parent<0&&t(a,null);return e}function Wt(n,e,t={}){let a=n.textures,r=new Map,s=(u,y,p=!1)=>{if(!u)return null;let w=e.images[u.image];if(!w)return null;let x=`${u.image}|${y?1:0}`,M=r.get(x);return M||(M=a.fromImage(w,{srgb:y,normalMap:p,label:e.imageData[u.image]?.name}),r.set(x,M)),M},i=e.materials.map((u,y)=>{let p=u.metallicRoughnessTexture,w=!!u.occlusionTexture&&!!p&&u.occlusionTexture.image===p.image,x=s(p??u.occlusionTexture,!1),M=u.baseColorTexture?.transform,v=new xe({name:u.name||`gltf-mat-${y}`,baseColorMap:s(u.baseColorTexture,!0),normalMap:s(u.normalTexture,!1,!0),ormMap:x,emissiveMap:s(u.emissiveTexture,!0),baseColor:[...u.baseColorFactor],metallic:u.metallicFactor,roughness:u.roughnessFactor,normalScale:u.normalScale,occlusionStrength:w||!p&&u.occlusionTexture?u.occlusionStrength:0,emissive:u.emissiveFactor,emissiveLuminance:u.emissiveFactor[0]+u.emissiveFactor[1]+u.emissiveFactor[2]>0?100*(u.emissiveStrength??1):0,alphaMode:u.alphaMode==="MASK"?"mask":u.alphaMode==="BLEND"?"blend":"opaque",alphaCutoff:u.alphaCutoff,doubleSided:u.doubleSided,unlit:u.unlit,uvScale:M?M.scale:[1,1],uvOffset:M?M.offset:[0,0],uvRotation:M?M.rotation:0,specular:u.specularFactor!==void 0?.5*u.specularFactor:.5});return p&&!w&&!u.occlusionTexture&&(v.occlusionStrength=0),t.material&&(v=t.material(v,y)),v}),o=new xe({name:"gltf-default",baseColor:[.8,.8,.8,1],roughness:.6,metallic:0}),c=Cr(e),l=[],b=new Map,d=[1/0,1/0,1/0],m=[-1/0,-1/0,-1/0];return e.nodes.forEach((u,y)=>{if(u.mesh!==void 0)for(let p of e.meshes[u.mesh].primitives){if(p.topology!=="triangle-list")continue;let w=b.get(p);if(!w){let M=new we(p.positions,p.normals??new Float32Array(p.positions.length),p.uvs??new Float32Array(p.vertexCount*2),p.indices);p.tangents&&(M.tangents=p.tangents),p.joints&&p.weights&&(M.joints=p.joints,M.weights=p.weights),w=new Ae(n.dev,M.tangents?M:M.computeTangents(),{label:`${e.meshes[u.mesh].name}`,keepSource:t.keepSource}),b.set(p,w)}let x=c[y];l.push({node:y,nodeName:u.name,mesh:w,material:p.material>=0?i[p.material]:o,world:x,skinned:u.skin!==void 0&&!!p.joints,primitive:p});for(let M=0;M<8;M++){let v=[M&1?p.bounds.max[0]:p.bounds.min[0],M&2?p.bounds.max[1]:p.bounds.min[1],M&4?p.bounds.max[2]:p.bounds.min[2]],g=x[0]*v[0]+x[4]*v[1]+x[8]*v[2]+x[12],k=x[1]*v[0]+x[5]*v[1]+x[9]*v[2]+x[13],h=x[2]*v[0]+x[6]*v[1]+x[10]*v[2]+x[14];d[0]=Math.min(d[0],g),d[1]=Math.min(d[1],k),d[2]=Math.min(d[2],h),m[0]=Math.max(m[0],g),m[1]=Math.max(m[1],k),m[2]=Math.max(m[2],h)}}}),{asset:e,drawables:l,materials:i,nodeWorld:c,bounds:{min:d,max:m}}}function us(n,e,t=U.create(),a={}){return e.drawables.map(r=>{let s=new Te(r.mesh,r.material,U.multiply(U.create(),t,r.world));return s.castShadow=a.castShadow??!0,s.viewmodel=a.viewmodel??!1,n.add(s),s})}var Sd=X.create(),Td=X.create(),zd=X.create();var Ld=new Float32Array(64);var Fd=U.create(),Ud=U.create();var Ed={t:new Float32Array(3),r:new Float32Array(4),s:new Float32Array(3)},Od=new Int32Array(1024);var Vd=X.create(),Hd=X.create(),Wd=X.create(),qd=new Float32Array(4),_d=new Float32Array(4);var Xd=U.create(),Yd=U.create(),Qd=U.create(),Zd=f.create(),$d=f.create(),em=f.create(),tm=f.create(),am=f.create(),rm=f.create(),nm=f.create(),sm=f.create(),im=f.create(),om=f.create(),cm=X.create(),lm=X.create(),bm=X.create(),um=X.create(),dm=X.create(),mm=f.create(1,0,0),hm=f.create(0,0,1);var Oo=(n,e)=>Math.floor(Math.log2(Math.max(n,e)))+1,tr=class{tris;cellStart;cellItems;min;dims;cell;triangleCount;constructor(e,t=.0025){let a=0,r=[1/0,1/0,1/0],s=[-1/0,-1/0,-1/0];for(let x of e){a+=x.triangleCount;let M=x.positions;for(let v=0;v<M.length;v+=3)for(let g=0;g<3;g++)M[v+g]<r[g]&&(r[g]=M[v+g]),M[v+g]>s[g]&&(s[g]=M[v+g])}for(let x=0;x<3;x++)r[x]-=.002,s[x]+=.002;let i=t,o=[s[0]-r[0],s[1]-r[1],s[2]-r[2]];for(;(o[0]/i+1)*(o[1]/i+1)*(o[2]/i+1)>3e5;)i*=1.25;let c=[Math.max(1,Math.ceil(o[0]/i)),Math.max(1,Math.ceil(o[1]/i)),Math.max(1,Math.ceil(o[2]/i))],l=new Float32Array(a*9),b=0;for(let x of e){let M=x.positions,v=x.indices;for(let g=0;g<v.length;g+=3)for(let k=0;k<3;k++){let h=v[g+k]*3;l[b++]=M[h],l[b++]=M[h+1],l[b++]=M[h+2]}}let d=c[0]*c[1]*c[2],m=new Uint32Array(d+1),u=(x,M,v)=>[Math.min(c[0]-1,Math.max(0,Math.floor((x-r[0])/i))),Math.min(c[1]-1,Math.max(0,Math.floor((M-r[1])/i))),Math.min(c[2]-1,Math.max(0,Math.floor((v-r[2])/i)))],y=new Int32Array(a*6);for(let x=0;x<a;x++){let M=x*9,v=u(Math.min(l[M],l[M+3],l[M+6]),Math.min(l[M+1],l[M+4],l[M+7]),Math.min(l[M+2],l[M+5],l[M+8])),g=u(Math.max(l[M],l[M+3],l[M+6]),Math.max(l[M+1],l[M+4],l[M+7]),Math.max(l[M+2],l[M+5],l[M+8]));y.set([v[0],v[1],v[2],g[0],g[1],g[2]],x*6);for(let k=v[2];k<=g[2];k++)for(let h=v[1];h<=g[1];h++)for(let A=v[0];A<=g[0];A++)m[(k*c[1]+h)*c[0]+A+1]++}for(let x=1;x<=d;x++)m[x]+=m[x-1];let p=new Uint32Array(m[d]),w=m.slice(0,d);for(let x=0;x<a;x++){let M=y.subarray(x*6,x*6+6);for(let v=M[2];v<=M[5];v++)for(let g=M[1];g<=M[4];g++)for(let k=M[0];k<=M[3];k++){let h=(v*c[1]+g)*c[0]+k;p[w[h]++]=x}}this.tris=l,this.cellStart=m,this.cellItems=p,this.min=r,this.dims=c,this.cell=i,this.triangleCount=a}},No=`
fn pcg(v: u32) -> u32 { let s = v * 747796405u + 2891336453u; let w = ((s >> ((s >> 28u) + 4u)) ^ s) * 277803737u; return (w >> 22u) ^ w; }
fn rnd(seed: u32) -> f32 { return f32(pcg(seed)) / 4294967295.0; }
`,Co=`
struct Params {
  gridMin: vec4f,           // xyz, w = cell size
  gridDims: vec4u,          // xyz, w = ray count
  misc: vec4f,              // range (m), aoW, aoH, bias
};
@group(0) @binding(0) var<uniform> P: Params;
@group(0) @binding(1) var<storage, read> tris: array<f32>;
@group(0) @binding(2) var<storage, read> cellStart: array<u32>;
@group(0) @binding(3) var<storage, read> cellItems: array<u32>;
@group(0) @binding(4) var surfPos: texture_2d<f32>;              // world position, a = coverage
@group(0) @binding(5) var surfNrm: texture_2d<f32>;              // world normal
@group(0) @binding(6) var<storage, read_write> ao: array<f32>;
${No}

fn hitTri(o: vec3f, d: vec3f, t: u32, tMax: f32) -> f32 {
  let b = t * 9u;
  let v0 = vec3f(tris[b], tris[b + 1u], tris[b + 2u]);
  let v1 = vec3f(tris[b + 3u], tris[b + 4u], tris[b + 5u]);
  let v2 = vec3f(tris[b + 6u], tris[b + 7u], tris[b + 8u]);
  let e1 = v1 - v0; let e2 = v2 - v0;
  let p = cross(d, e2);
  let det = dot(e1, p);
  if (abs(det) < 1e-12) { return -1.0; }
  let inv = 1.0 / det;
  let s = o - v0;
  let u = dot(s, p) * inv;
  if (u < 0.0 || u > 1.0) { return -1.0; }
  let q = cross(s, e1);
  let v = dot(d, q) * inv;
  if (v < 0.0 || u + v > 1.0) { return -1.0; }
  let tt = dot(e2, q) * inv;
  if (tt > 1e-5 && tt < tMax) { return tt; }
  return -1.0;
}

/// Nearest hit distance along the ray within range, or -1 (3D-DDA through the uniform grid).
fn trace(o: vec3f, d: vec3f, range: f32) -> f32 {
  let cell = P.gridMin.w;
  let dims = vec3i(P.gridDims.xyz);
  var c = vec3i(floor((o - P.gridMin.xyz) / cell));
  if (any(c < vec3i(0)) || any(c >= dims)) { return -1.0; }
  let step = vec3i(select(vec3i(-1), vec3i(1), d >= vec3f(0.0)));
  let nextB = (vec3f(c) + vec3f(select(vec3f(0.0), vec3f(1.0), d >= vec3f(0.0)))) * cell + P.gridMin.xyz;
  let invD = 1.0 / select(d, vec3f(1e-9), abs(d) < vec3f(1e-9));
  var tMaxV = (nextB - o) * invD;
  let tDelta = abs(cell * invD);
  var best = range;
  var hit = false;
  for (var it = 0; it < 256; it++) {
    let ci = u32((c.z * dims.y + c.y) * dims.x + c.x);
    let s = cellStart[ci]; let e = cellStart[ci + 1u];
    for (var k = s; k < e; k++) {
      let t = hitTri(o, d, cellItems[k], best);
      if (t > 0.0) { best = t; hit = true; }
    }
    // advance; stop once the next cell starts beyond the best hit
    let tNext = min(tMaxV.x, min(tMaxV.y, tMaxV.z));
    if (tNext > best) { break; }
    if (tMaxV.x < tMaxV.y && tMaxV.x < tMaxV.z) { c.x += step.x; tMaxV.x += tDelta.x; }
    else if (tMaxV.y < tMaxV.z) { c.y += step.y; tMaxV.y += tDelta.y; }
    else { c.z += step.z; tMaxV.z += tDelta.z; }
    if (any(c < vec3i(0)) || any(c >= dims)) { break; }
  }
  return select(-1.0, best, hit);
}

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let W = u32(P.misc.y); let H = u32(P.misc.z);
  if (id.x >= W || id.y >= H) { return; }
  let i = id.y * W + id.x;
  let sp = textureLoad(surfPos, vec2i(id.xy), 0);
  if (sp.a < 0.5) { ao[i] = -1.0; return; }
  let pos = sp.xyz;
  let n = normalize(textureLoad(surfNrm, vec2i(id.xy), 0).xyz);
  // tangent frame
  let a = select(vec3f(1.0, 0.0, 0.0), vec3f(0.0, 1.0, 0.0), abs(n.x) > 0.9);
  let t = normalize(cross(a, n));
  let bt = cross(n, t);
  let o = pos + n * P.misc.w;
  let N = P.gridDims.w;
  let rot = rnd(i * 7u + 1u) * 6.2831853;
  var occ = 0.0;
  for (var k = 0u; k < N; k++) {
    // stratified cosine-weighted hemisphere (Fibonacci spiral with a per-texel rotation)
    let fk = (f32(k) + 0.5) / f32(N);
    let r = sqrt(fk);
    let phi = f32(k) * 2.39996323 + rot;
    let x = r * cos(phi); let y = r * sin(phi);
    let z = sqrt(max(0.0, 1.0 - fk));
    let d = normalize(t * x + bt * y + n * z);
    let h = trace(o, d, P.misc.x);
    if (h > 0.0) { occ += 1.0 - h / P.misc.x; }
  }
  ao[i] = 1.0 - occ / f32(N);
}
`,Bo=`
struct Params { atlas: vec4f };   // atlas W (m), H (m), unused, unused
@group(0) @binding(0) var<uniform> P: Params;
struct VOut { @builtin(position) pos: vec4f, @location(0) wpos: vec3f, @location(1) nrm: vec3f };
@vertex fn vs(@location(0) pos: vec3f, @location(1) nrm: vec3f, @location(2) tan: vec4f, @location(3) uv: vec2f) -> VOut {
  var o: VOut;
  o.pos = vec4f(uv.x / P.atlas.x * 2.0 - 1.0, 1.0 - uv.y / P.atlas.y * 2.0, 0.0, 1.0);
  o.wpos = pos; o.nrm = nrm;
  return o;
}
struct FOut { @location(0) pos: vec4f, @location(1) nrm: vec4f };
@fragment fn fs(i: VOut) -> FOut { var o: FOut; o.pos = vec4f(i.wpos, 1.0); o.nrm = vec4f(normalize(i.nrm), 1.0); return o; }
`,Do=`
struct Chart { rect: vec4f, delta: vec4f };   // rect: x0 y0 x1 y1 (atlas metres); delta.xy = atlas uv \u2212 metre uv
struct Params {
  atlas: vec4f,        // atlas W (m), H (m), tex W (px), tex H (px)
  tile: vec4f,         // 1 / tileMeters (u, v), lod, chart count
  ao: vec4f,           // ao W, ao H, strength, grime
};
@group(0) @binding(0) var<uniform> P: Params;
@group(0) @binding(1) var<storage, read> charts: array<Chart>;
@group(0) @binding(2) var<storage, read> ao: array<f32>;
@group(0) @binding(3) var samp: sampler;
@group(0) @binding(4) var srcAlbedo: texture_2d<f32>;
@group(0) @binding(5) var srcNormal: texture_2d<f32>;
@group(0) @binding(6) var srcOrm: texture_2d<f32>;
@group(0) @binding(7) var outAlbedo: texture_storage_2d<rgba8unorm, write>;
@group(0) @binding(8) var outNormal: texture_storage_2d<rgba8unorm, write>;
@group(0) @binding(9) var outOrm: texture_storage_2d<rgba8unorm, write>;

fn srgbEncode(c: vec3f) -> vec3f {
  let lo = c * 12.92;
  let hi = 1.055 * pow(max(c, vec3f(0.0)), vec3f(1.0 / 2.4)) - 0.055;
  return select(hi, lo, c <= vec3f(0.0031308));
}
fn aoAt(x: i32, y: i32) -> f32 {
  let W = i32(P.ao.x); let H = i32(P.ao.y);
  let v = ao[u32(clamp(y, 0, H - 1) * W + clamp(x, 0, W - 1))];
  return v;
}
/// Bilinear AO with dilation: uncovered texels take the mean of covered neighbours (3\xD73, then 5\xD75).
fn aoSample(x: i32, y: i32) -> f32 {
  let v = aoAt(x, y);
  if (v >= 0.0) { return v; }
  for (var r = 1; r <= 3; r++) {
    var sum = 0.0; var n = 0.0;
    for (var dy = -r; dy <= r; dy++) { for (var dx = -r; dx <= r; dx++) { let q = aoAt(x + dx, y + dy); if (q >= 0.0) { sum += q; n += 1.0; } } }
    if (n > 0.0) { return sum / n; }
  }
  return 1.0;
}
fn aoBilinear(uv: vec2f) -> f32 {
  let p = uv * P.ao.xy - 0.5;
  let f = fract(p); let i = vec2i(floor(p));
  let a = aoSample(i.x, i.y); let b = aoSample(i.x + 1, i.y); let c = aoSample(i.x, i.y + 1); let d = aoSample(i.x + 1, i.y + 1);
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let W = u32(P.atlas.z); let H = u32(P.atlas.w);
  if (id.x >= W || id.y >= H) { return; }
  let uv = (vec2f(id.xy) + 0.5) / vec2f(f32(W), f32(H));
  let pm = uv * P.atlas.xy;                      // atlas position in metres
  // chart lookup (nearest chart when outside all: padding)
  var delta = vec2f(0.0);
  var bestD = 1e9;
  let n = u32(P.tile.w);
  for (var k = 0u; k < n; k++) {
    let c = charts[k];
    let dx = max(max(c.rect.x - pm.x, pm.x - c.rect.z), 0.0);
    let dy = max(max(c.rect.y - pm.y, pm.y - c.rect.w), 0.0);
    let d = dx * dx + dy * dy;
    if (d < bestD) { bestD = d; delta = c.delta.xy; }
  }
  let muv = (pm - delta) * P.tile.xy;           // tiled-texture uv (repeats)
  let lod = P.tile.z;
  let alb = textureSampleLevel(srcAlbedo, samp, muv, lod);
  let nrm = textureSampleLevel(srcNormal, samp, muv, lod);
  let orm = textureSampleLevel(srcOrm, samp, muv, lod);
  let a = aoBilinear(uv);
  let k = P.ao.z;
  let occ = mix(1.0, a, k);
  // cavities collect grime: darker, rougher
  let cav = (1.0 - occ) * P.ao.w;
  textureStore(outAlbedo, vec2i(id.xy), vec4f(srgbEncode(alb.rgb * (1.0 - 0.6 * cav)), alb.a));
  textureStore(outNormal, vec2i(id.xy), nrm);
  textureStore(outOrm, vec2i(id.xy), vec4f(orm.r * occ, min(1.0, orm.g + 0.35 * cav), orm.b, orm.a));
}
`,ds=new WeakMap;function Vo(n){let e=ds.get(n);if(!e){let t=n.dev,a=t.shader(Bo,"bake-surf");e={ao:t.device.createComputePipeline({layout:"auto",compute:{module:t.shader(Co,"bake-ao"),entryPoint:"main"}}),compose:t.device.createComputePipeline({layout:"auto",compute:{module:t.shader(Do,"bake-compose"),entryPoint:"main"}}),surf:t.device.createRenderPipeline({layout:"auto",label:"bake-surf",vertex:{module:a,entryPoint:"vs",buffers:[Yt]},fragment:{module:a,entryPoint:"fs",targets:[{format:"rgba32float"},{format:"rgba16float"}]},primitive:{topology:"triangle-list",cullMode:"none"}}),cache:new Map},ds.set(n,e)}return e}function ms(n){let e=1;for(;e<n;)e*=2;return e}function Ho(n){let e=2166136261,t=0;for(let a of n){t+=a.vertexCount;let r=a.positions,s=Math.max(1,Math.floor(r.length/4096));for(let i=0;i<r.length;i+=s)e^=Math.round(r[i]*1e6)&65535,e=Math.imul(e,16777619)>>>0}return`${t}:${e.toString(16)}`}function hs(n,e={}){let t=[];for(let d=0;d<n.length;d++){let m=n[d].uvs,u=1/0,y=1/0,p=-1/0,w=-1/0;for(let x=0;x<m.length;x+=2)m[x]<u&&(u=m[x]),m[x]>p&&(p=m[x]),m[x+1]<y&&(y=m[x+1]),m[x+1]>w&&(w=m[x+1]);Number.isFinite(u)&&t.push({gi:d,u0:u,v0:y,w:Math.max(p-u,1e-5),h:Math.max(w-y,1e-5),x:0,y:0})}if(!t.length)return null;let a=e.maxTexels??2048*2048,r=e.texelM??1e-4,s=4,i=0;for(let d of t)i+=(d.w+2*s*r)*(d.h+2*s*r);r=Math.max(r,Math.sqrt(i*1.25/a));let o=t.slice().sort((d,m)=>m.h-d.h),c=0,l=0;for(let d=0;d<4;d++){let m=s*r,u=Math.max(Math.sqrt(i*1.25),...t.map(v=>v.w+2*m)),y=0,p=0,w=0,x=0;for(let v of o){let g=v.w+2*m,k=v.h+2*m;y+g>u+1e-9&&y>0&&(p+=w,y=0,w=0),v.x=y+m,v.y=p+m,y+=g,w=Math.max(w,k),x=Math.max(x,y)}let M=p+w;if(c=ms(Math.ceil(x/r)),l=ms(Math.ceil(M/r)),c*l<=a*1.05&&c<=4096&&l<=4096)break;r*=Math.max(1.05,Math.sqrt(c*l/a))}let b=Ho(n);for(let d of t){let m=n[d.gi].uvs,u=d.x-d.u0,y=d.y-d.v0;for(let p=0;p<m.length;p+=2)m[p]+=u,m[p+1]+=y}return{charts:t,texel:r,texW:c,texH:l,atlasW:c*r,atlasH:l*r,key:b}}function fs(n,e,t,a,r,s,i={}){if(!a.baseColorMap||!a.normalMap||!a.ormMap)return null;let o=performance.now(),c=n.dev,l=c.device,b=Vo(n),{charts:d,texel:m,texW:u,texH:y,atlasW:p,atlasH:w}=t,x=`${s}|${a.name}|${a.uvScale[0]}|${t.key}|${JSON.stringify(i)}`,M=b.cache.get(x);if(M)return{material:M,atlasM:[p,w],texSize:[u,y],texelM:m,ms:performance.now()-o};let v=Math.min(i.aoScale??.25,1024/Math.max(u,y)),g=Math.max(16,Math.round(u*v)),k=Math.max(16,Math.round(y*v)),h=l.createTexture({size:[g,k],format:"rgba32float",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING,label:"bake.surfPos"}),A=l.createTexture({size:[g,k],format:"rgba16float",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING,label:"bake.surfNrm"}),P=c.createBuffer(16,GPUBufferUsage.UNIFORM,"bake.surfParams",new Float32Array([p,w,0,0])),S=l.createBindGroup({layout:b.surf.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:P}}]}),T=(ne,me)=>c.createBuffer(Math.max(16,ne.byteLength),GPUBufferUsage.STORAGE,me,ne),z=T(r.tris,"bake.tris"),L=T(r.cellStart,"bake.cellStart"),I=T(r.cellItems,"bake.cellItems"),G=c.createBuffer(g*k*4,GPUBufferUsage.STORAGE,"bake.ao"),j=i.rays??32,R=i.range??.025,F=new ArrayBuffer(48);{let ne=new Float32Array(F),me=new Uint32Array(F);ne.set([r.min[0],r.min[1],r.min[2],r.cell],0),me.set([r.dims[0],r.dims[1],r.dims[2],j],4),ne.set([R,g,k,5e-5],8)}let N=c.createBuffer(48,GPUBufferUsage.UNIFORM,"bake.aoParams",new Uint8Array(F)),C=new Float32Array(d.length*8);d.forEach((ne,me)=>C.set([ne.x,ne.y,ne.x+ne.w,ne.y+ne.h,ne.x-ne.u0,ne.y-ne.v0,0,0],me*8));let K=T(C,"bake.charts"),q=new Float32Array(12),O=1/(a.uvScale[0]*a.baseColorMap.width),V=Math.max(0,Math.log2(m/O));q.set([p,w,u,y,a.uvScale[0],a.uvScale[1],V,d.length,g,k,i.strength??1,.5]);let B=c.createBuffer(48,GPUBufferUsage.UNIFORM,"bake.composeParams",q),_=ne=>l.createTexture({size:[u,y],format:"rgba8unorm",usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.COPY_SRC,label:ne}),ee=_("bake.albedo.tmp"),W=_("bake.normal.tmp"),Y=_("bake.orm.tmp"),E=Oo(u,y),D=(ne,me)=>l.createTexture({size:[u,y],format:me,mipLevelCount:E,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT,label:ne}),J=i.label??a.name,$=D(`${J}.baked.albedo`,"rgba8unorm-srgb"),ae=D(`${J}.baked.normal`,"rgba8unorm"),se=D(`${J}.baked.orm`,"rgba8unorm"),de=l.createBindGroup({layout:b.ao.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:N}},{binding:1,resource:{buffer:z}},{binding:2,resource:{buffer:L}},{binding:3,resource:{buffer:I}},{binding:4,resource:h.createView()},{binding:5,resource:A.createView()},{binding:6,resource:{buffer:G}}]}),be=l.createBindGroup({layout:b.compose.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:B}},{binding:1,resource:{buffer:K}},{binding:2,resource:{buffer:G}},{binding:3,resource:n.textures.sampler({address:"repeat",filter:"linear"})},{binding:4,resource:a.baseColorMap.createView()},{binding:5,resource:a.normalMap.createView()},{binding:6,resource:a.ormMap.createView()},{binding:7,resource:ee.createView()},{binding:8,resource:W.createView()},{binding:9,resource:Y.createView()}]}),pe=l.createCommandEncoder({label:`bake ${J}`}),Le=pe.beginRenderPass({label:"bake-surf",colorAttachments:[{view:h.createView(),loadOp:"clear",storeOp:"store",clearValue:[0,0,0,0]},{view:A.createView(),loadOp:"clear",storeOp:"store",clearValue:[0,0,0,0]}]});Le.setPipeline(b.surf),Le.setBindGroup(0,S),Le.setVertexBuffer(0,e.vertexBuffer),Le.setIndexBuffer(e.indexBuffer,"uint32"),Le.drawIndexed(e.indexCount),Le.end();let Re=pe.beginComputePass({label:"bake-ao"});Re.setPipeline(b.ao),Re.setBindGroup(0,de),Re.dispatchWorkgroups(Math.ceil(g/8),Math.ceil(k/8)),Re.end(),Re=pe.beginComputePass({label:"bake-compose"}),Re.setPipeline(b.compose),Re.setBindGroup(0,be),Re.dispatchWorkgroups(Math.ceil(u/8),Math.ceil(y/8)),Re.end(),pe.copyTextureToTexture({texture:ee},{texture:$},[u,y]),pe.copyTextureToTexture({texture:W},{texture:ae},[u,y]),pe.copyTextureToTexture({texture:Y},{texture:se},[u,y]),n.textures.mipgen.generate($,"color",pe),n.textures.mipgen.generate(ae,"normal",pe),n.textures.mipgen.generate(se,"color",pe),l.queue.submit([pe.finish()]),l.queue.onSubmittedWorkDone().then(()=>{ee.destroy(),W.destroy(),Y.destroy(),h.destroy(),A.destroy(),z.destroy(),L.destroy(),I.destroy(),G.destroy(),N.destroy(),P.destroy(),K.destroy(),B.destroy()});let te=new xe({name:`${a.name}-baked`,baseColorMap:$,normalMap:ae,ormMap:se,baseColor:a.baseColor,roughness:a.roughness,metallic:a.metallic,normalScale:a.normalScale,specular:a.specular,occlusionStrength:a.occlusionStrength,edgeWear:a.edgeWear,edgeWearRadius:a.edgeWearRadius,emissive:a.emissive,emissiveLuminance:a.emissiveLuminance,uvScale:[1/p,1/w],uvOffset:[0,0],alphaMode:a.alphaMode,alphaCutoff:a.alphaCutoff,doubleSided:a.doubleSided,sampler:n.textures.sampler({address:"clamp-to-edge",filter:"linear",anisotropy:8})});return b.cache.set(x,te),{material:te,atlasM:[p,w],texSize:[u,y],texelM:m,ms:performance.now()-o}}function ps(n,e,t=.0015,a=[],r=4){return Dt(n,e,{bevel:t,bevelSegments:r,holes:a}).rotateY(Math.PI/2)}function Br(n,e,t,a=8e-4,r=[],s=4){return Dt(n,e,{bevel:a,bevelSegments:s,holes:r}).translate(0,0,t)}function Ve(n,e,t,a=0,r=0,s=64){let i=Math.abs(t-e);return pt(n,n,i,s).rotateX(Math.PI/2).translate(r,a,(e+t)/2)}function ar(n,e,t,a,r,s=32){return pt(n,n,e,s).rotateZ(Math.PI/2).translate(t,a,r)}function Ut(n,e,t,a,r,s=32){return pt(n,n,e,s).translate(t,a,r)}function Fe(n,e,t,a,r,s=48){return pt(n,n,e,s).rotateX(Math.PI/2).translate(t,a,r)}function lt(n,e,t=0,a=64){return Ce(n,a).rotateX(-Math.PI/2).translate(0,t,e)}function da(n,e,t,a,r=48){return Ce(n,r).rotateZ(-Math.PI/2).translate(e,t,a)}function dt(n,e,t,a,r,s="hex",i=40){let o=n*.55,c=[[0,0],[n,0],[n,o*.45]];for(let b=1;b<=6;b++){let d=b/6*(Math.PI/2);c.push([n*Math.cos(d)*.98+n*.02*(1-b/6),o*.45+o*.55*Math.sin(d)])}c.push([0,o]);let l=Ce(c,i,40);if(s==="hex"){let b=n*.5,d=o*.6,m=Array.from({length:6},(u,y)=>[Math.cos(y/6*Math.PI*2)*b,Math.sin(y/6*Math.PI*2)*b]);l=we.merge([l,Dt(m,d,{}).rotateX(-Math.PI/2).translate(0,o-d/2+2e-5,0).flipWinding()])}else s==="slot"&&(l=we.merge([l,Dt([[-n*.8,-n*.12],[n*.8,-n*.12],[n*.8,n*.12],[-n*.8,n*.12]],o*.5,{}).rotateX(-Math.PI/2).translate(0,o-o*.25+2e-5,0).flipWinding()]));return l.rotateZ(r>0?-Math.PI/2:Math.PI/2).translate(e,t,a)}var De=class{pts=[];smooth=[];nrm=[];pt(e,t,a=!1,r=null){return this.pts.push([e,t]),this.smooth.push(a),this.nrm.push(r),this}arc(e,t,a,r,s,i=6){let o=s>=r?1:-1;for(let c=0;c<=i;c++){let l=r+(s-r)*c/i;this.pt(e+Math.cos(l)*a,t+Math.sin(l)*a,!0,[Math.cos(l)*o,Math.sin(l)*o])}return this}corner(e,t,a,r,s,i=4){let o=a[0]*r[1]-a[1]*r[0],c=a[0]*r[0]+a[1]*r[1],l=Math.atan2(Math.abs(o),c);if(l<.02||s<=0)return this.pt(e,t,l<.02);let b=s*Math.tan(l/2),d=[e-a[0]*b,t-a[1]*b],m=o>0,u=m?[-a[1],a[0]]:[a[1],-a[0]],y=[d[0]+u[0]*s,d[1]+u[1]*s],p=Math.atan2(d[1]-y[1],d[0]-y[0]);return this.arc(y[0],y[1],s,p,p+(m?l:-l),i)}append(e){return this.pts.push(...e.pts),this.smooth.push(...e.smooth),this.nrm.push(...e.nrm??e.pts.map(()=>null)),this}done(){return{pts:this.pts,smooth:this.smooth,nrm:this.nrm}}};function Ue(n,e,t,a=6,r=0,s=0){let i=new De,o=Math.min(t,n/2-1e-6,e/2-1e-6),c=r-n/2+o,l=r+n/2-o,b=s-e/2+o,d=s+e/2-o;return i.arc(l,b,o,-Math.PI/2,0,a).arc(l,d,o,0,Math.PI/2,a).arc(c,d,o,Math.PI/2,Math.PI,a).arc(c,b,o,Math.PI,Math.PI*1.5,a),i.done()}function Wo(n,e,t=e,a=0,r=0){return{pts:n.pts.map(([s,i])=>[a+(s-a)*e,r+(i-r)*t]),smooth:n.smooth.slice(),nrm:Math.abs(e-t)<1e-9?n.nrm?.slice():void 0}}function Ee(n,e,t=6){let a=n.slice(),r=0;for(let c=0,l=a.length-1;c<a.length;l=c++)r+=(a[l][0]-a[c][0])*(a[l][1]+a[c][1]);let s=Array.isArray(e)?e.slice():a.map(()=>e);r<0&&(a=a.reverse(),s=s.reverse());let i=a.length,o=new De;for(let c=0;c<i;c++){let l=a[(c+i-1)%i],b=a[c],d=a[(c+1)%i],m=b[0]-l[0],u=b[1]-l[1],y=d[0]-b[0],p=d[1]-b[1],w=Math.hypot(m,u)||1,x=Math.hypot(y,p)||1;m/=w,u/=w,y/=x,p/=x;let M=m*p-u*y,v=m*y+u*p,g=Math.atan2(Math.abs(M),v),k=s[c]??0;if(k<=0||g<.02||g>Math.PI-.02){o.pt(b[0],b[1],g<.02);continue}let h=k*Math.tan(g/2),A=.49*Math.min(w,x),P=h>A?(h=A)/Math.tan(g/2):k,S=[b[0]-m*h,b[1]-u*h],T=M>0,z=T?[-u,m]:[u,-m],L=[S[0]+z[0]*P,S[1]+z[1]*P],I=Math.atan2(S[1]-L[1],S[0]-L[0]),G=I+(T?g:-g);o.arc(L[0],L[1],P,I,G,t)}return o.done()}function qo(n,e){let t=n.pts.length,a=[];for(let r=0;r<t;r++){let s=n.nrm?.[r],i,o;if(s)i=s[0],o=s[1];else{let c=n.pts[(r+t-1)%t],l=n.pts[r],b=n.pts[(r+1)%t],d=l[0]-c[0],m=l[1]-c[1],u=b[0]-l[0],y=b[1]-l[1],p=Math.hypot(d,m)||1,w=Math.hypot(u,y)||1;d/=p,m/=p,u/=w,y/=w;let x=m,M=-d,v=y,g=-u;i=x+v,o=M+g;let k=Math.hypot(i,o)||1;i/=k,o/=k;let h=Math.max(.35,i*x+o*M);i/=h,o/=h}a.push([n.pts[r][0]-i*e,n.pts[r][1]-o*e])}return{pts:a,smooth:n.smooth.slice(),nrm:n.nrm?.slice()}}function bt(n,e,t=.0015,a=4,r={}){let s=e/2,i=Math.min(t,s*.95),o=[],c=b=>{let d=b/a*(Math.PI/2);return{inset:i*(1-Math.sin(d)),dz:i*(1-Math.cos(d))}},l=b=>b>1e-9?qo(n,b):n;if(i>1e-9){for(let b=0;b<=a;b++){let d=c(b);o.push({z:-s+d.dz,prof:l(d.inset),smooth:b>0})}for(let b=a;b>=0;b--){let d=c(b);o.push({z:s-d.dz,prof:l(d.inset),smooth:!0})}}else o.push({z:-s,prof:n},{z:s,prof:n});return Je(o,{capUV:r.uvStack===!1?"planar":"stack",capStart:r.capStart,capEnd:r.capEnd})}function He(n,e,t=.0015,a=4,r={}){return bt(n,e,t,a,r).rotateY(Math.PI/2)}function rr(n,e,t=8){let a=[n[0]];for(let r=1;r<n.length-1;r++){let s=n[r-1],i=n[r],o=n[r+1],c=[i[0]-s[0],i[1]-s[1],i[2]-s[2]],l=[o[0]-i[0],o[1]-i[1],o[2]-i[2]],b=Math.hypot(...c)||1,d=Math.hypot(...l)||1;for(let T=0;T<3;T++)c[T]/=b,l[T]/=d;let m=Math.max(-1,Math.min(1,c[0]*l[0]+c[1]*l[1]+c[2]*l[2])),u=Math.acos(m),y=Array.isArray(e)?e[r]:e;if(u<.02||y<=0){a.push(i);continue}let p=y*Math.tan(u/2),w=.49*Math.min(b,d),x=p>w?(p=w)/Math.tan(u/2):y,M=[i[0]-c[0]*p,i[1]-c[1]*p,i[2]-c[2]*p],v=l[0]-c[0]*m,g=l[1]-c[1]*m,k=l[2]-c[2]*m,h=Math.hypot(v,g,k)||1;v/=h,g/=h,k/=h;let A=[M[0]+v*x,M[1]+g*x,M[2]+k*x],P=[M[0]-A[0],M[1]-A[1],M[2]-A[2]],S=[c[0]*x,c[1]*x,c[2]*x];for(let T=0;T<=t;T++){let z=T/t*u,L=Math.cos(z),I=Math.sin(z);a.push([A[0]+P[0]*L+S[0]*I,A[1]+P[1]*L+S[1]*I,A[2]+P[2]*L+S[2]*I])}}return a.push(n[n.length-1]),a}function nr(n,e,t,a,r=6,s,i={}){let o=Ue(e,t,Math.min(a,e/2-1e-5,t/2-1e-5),r);return Dr(o,n,[1,0,0],s??(()=>[1,1]),{capStart:!0,capEnd:!0,...i})}function $e(n,e,t,a,r,s=32,i=25e-5){let o=Math.min(i,n*.5,e*.25);return da([[0,0],[n-o,0],[n,o],[n,e-o],[n-o,e],[0,e]],t-e/2,a,r,s)}function Je(n,e={}){if(n.length<2)throw new Error("loft needs \u2265 2 stations");let t=0;{let v=n[0].prof.pts;for(let g=0,k=v.length-1;g<v.length;k=g++)t+=(v[k][0]-v[g][0])*(v[k][1]+v[g][1])}t<0&&(n=n.map(v=>({...v,prof:{pts:[...v.prof.pts].reverse(),smooth:[...v.prof.smooth].reverse(),nrm:v.prof.nrm?[...v.prof.nrm].reverse().map(g=>g?[-g[0],-g[1]]:null):void 0}})));let a=n.length,r=n[0].prof.pts.length;for(let v of n)if(v.prof.pts.length!==r)throw new Error(`loft: profile point count mismatch (${v.prof.pts.length} vs ${r})`);let s=n[a-1].z>=n[0].z?1:-1,i=(v,g)=>{let k=n[v],[h,A]=k.prof.pts[g],P=k.z;return k.shear&&(P+=k.shear*(A-(k.shearY0??0))),k.shearX&&(P+=k.shearX*(h-(k.shearX0??0))),[h,A,P]},o=[];for(let v=0;v<a-1;v++){let g=new Float64Array(r*3);for(let k=0;k<r;k++){let h=(k+1)%r,A=i(v,k),P=i(v,h),S=i(v+1,h),T=i(v+1,k),z=[A,P,S,T],L=0,I=0,G=0;for(let R=0;R<4;R++){let F=z[R],N=z[(R+1)%4];L+=(F[1]-N[1])*(F[2]+N[2]),I+=(F[2]-N[2])*(F[0]+N[0]),G+=(F[0]-N[0])*(F[1]+N[1])}let j=Math.hypot(L,I,G);j>1e-14&&(g[k*3]=L/j*s,g[k*3+1]=I/j*s,g[k*3+2]=G/j*s)}o.push(g)}let c=[],l=[],b=[],d=[],m=(v,g,k,h)=>(c.push(v[0],v[1],v[2]),l.push(g[0],g[1],g[2]),b.push(k,h),c.length/3-1),u=(v,g,k,h,A)=>{let P=n[v+g].prof.nrm?.[k];if(P){let j=i(v,k),R=i(v+1,k),F=R[0]-j[0],N=R[1]-j[1],C=R[2]-j[2],K=g===0?v-1:v+1;if((g===0&&n[v].smooth||g===1&&n[v+1]?.smooth)&&K>=0&&K<a-1){let ee=i(K,k),W=i(K+1,k);F+=W[0]-ee[0],N+=W[1]-ee[1],C+=W[2]-ee[2]}let q=Math.hypot(F,N,C),O=P[0],V=P[1],B=0;if(q>1e-12){F/=q,N/=q,C/=q;let ee=O*F+V*N;O-=F*ee,V-=N*ee,B-=C*ee}let _=Math.hypot(O,V,B)||1;return[O/_,V/_,B/_]}let S=0,T=0,z=0,L=(j,R)=>{if(j<0||j>=a-1)return;let F=o[j];S+=F[R*3],T+=F[R*3+1],z+=F[R*3+2]},I=[v];g===0&&n[v].smooth&&I.push(v-1),g===1&&n[v+1]?.smooth&&I.push(v+1);for(let j of I)L(j,h),A&&L(j,h===k?(k+r-1)%r:k);let G=Math.hypot(S,T,z);if(G<1e-9){let j=o[v],R=Math.hypot(j[h*3],j[h*3+1],j[h*3+2])||1;return[j[h*3]/R,j[h*3+1]/R,j[h*3+2]/R]}return[S/G,T/G,z/G]},y=new Float64Array(r+1);for(let v=0;v<r;v++){let g=n[0].prof.pts[v],k=n[0].prof.pts[(v+1)%r];y[v+1]=y[v]+Math.hypot(k[0]-g[0],k[1]-g[1])}let p=e.v0??0;for(let v=0;v<a-1;v++){let g=n[v],k=n[v+1],h=0;for(let P=0;P<r;P++)h+=Math.hypot(k.prof.pts[P][0]-g.prof.pts[P][0],k.prof.pts[P][1]-g.prof.pts[P][1]);let A=Math.max(Math.abs(k.z-g.z),h/r);for(let P=0;P<r;P++){let S=(P+1)%r,T=o[v];if(T[P*3]===0&&T[P*3+1]===0&&T[P*3+2]===0)continue;let z=g.prof.smooth[P],L=g.prof.smooth[S],I=m(i(v,P),u(v,0,P,P,z),y[P],p),G=m(i(v,S),u(v,0,S,P,L),y[P+1],p),j=m(i(v+1,S),u(v,1,S,P,L),y[P+1],p+A),R=m(i(v+1,P),u(v,1,P,P,z),y[P],p+A);s>0?d.push(I,G,j,I,j,R):d.push(I,j,G,I,R,j)}p+=A}let w=e.capUV==="stack",x=p+.002,M=(v,g)=>{let k=n[v].prof.pts,h=wr(k),A=c.length/3,P=1/0,S=1/0,T=-1/0;for(let z of k)P=Math.min(P,z[0]),S=Math.min(S,z[1]),T=Math.max(T,z[1]);for(let z=0;z<r;z++)m(i(v,z),[0,0,g],w?k[z][0]-P:k[z][0],w?x+k[z][1]-S:k[z][1]);w&&(x+=T-S+.002);for(let z=0;z<h.length;z+=3)g>0?d.push(A+h[z],A+h[z+1],A+h[z+2]):d.push(A+h[z],A+h[z+2],A+h[z+1])};return e.capStart!==!1&&M(0,-s),e.capEnd!==!1&&M(a-1,s),new we(c,l,b,d)}function Pt(n,e,t,a={}){return Je([{z:e,prof:n},{z:t,prof:n}],a)}function gs(n,e,t,a,r,s=0,i=0,o={}){let c=a>=t?1:-1,l=r.map(([d,m])=>c>0?[Math.min(d,m),Math.max(d,m)]:[Math.max(d,m),Math.min(d,m)]).sort((d,m)=>(d[0]-m[0])*c),b=[{z:t,prof:n}];for(let[d,m]of l)b.push({z:d,prof:n,shear:s,shearY0:i},{z:d,prof:e,shear:s,shearY0:i},{z:m,prof:e,shear:s,shearY0:i},{z:m,prof:n,shear:s,shearY0:i});return b.push({z:a,prof:n}),Je(b,o)}function Dr(n,e,t=[0,0,-1],a=()=>[1,1],r={}){let s=e.length,i=[0];for(let p=1;p<s;p++)i.push(i[p-1]+Math.hypot(e[p][0]-e[p-1][0],e[p][1]-e[p-1][1],e[p][2]-e[p-1][2]));let o=i[s-1],c=e.map((p,w)=>{let[x,M]=a(i[w]/o);return{z:i[w],prof:Wo(n,x,M),smooth:w>0}}),l=Je(c,r),b=e.map((p,w)=>{let x=e[Math.max(0,w-1)],M=e[Math.min(s-1,w+1)],v=[M[0]-x[0],M[1]-x[1],M[2]-x[2]],g=Math.hypot(v[0],v[1],v[2])||1;v=v.map(T=>T/g);let k=t,h=k[0]*v[0]+k[1]*v[1]+k[2]*v[2],A=[k[0]-v[0]*h,k[1]-v[1]*h,k[2]-v[2]*h],P=Math.hypot(A[0],A[1],A[2])||1;A=A.map(T=>T/P);let S=[A[1]*v[2]-A[2]*v[1],A[2]*v[0]-A[0]*v[2],A[0]*v[1]-A[1]*v[0]];return{p,t:v,x:S,y:A}}),d=(p,w,x)=>{let M=0;for(;M<s-2&&i[M+1]<x-1e-9;)M++;let v=b[M],g=b[Math.min(s-1,M+1)],k=i[M+1]-i[M]||1,h=Math.max(0,Math.min(1,(x-i[M])/k)),A=(z,L)=>[z[0]+(L[0]-z[0])*h,z[1]+(L[1]-z[1])*h,z[2]+(L[2]-z[2])*h],P=A(v.p,g.p),S=A(v.x,g.x),T=A(v.y,g.y);return[P[0]+S[0]*p+T[0]*w,P[1]+S[1]*p+T[1]*w,P[2]+S[2]*p+T[2]*w]},m=p=>{let w=0;for(;w<s-2&&i[w+1]<p-1e-9;)w++;let x=b[w],M=b[Math.min(s-1,w+1)],v=i[w+1]-i[w]||1,g=Math.max(0,Math.min(1,(p-i[w])/v)),k=(h,A)=>[h[0]+(A[0]-h[0])*g,h[1]+(A[1]-h[1])*g,h[2]+(A[2]-h[2])*g];return{x:k(x.x,M.x),y:k(x.y,M.y),t:k(x.t,M.t)}},u=l.positions,y=l.normals;for(let p=0;p<u.length;p+=3){let w=m(u[p+2]),x=d(u[p],u[p+1],u[p+2]),M=y[p],v=y[p+1],g=y[p+2],k=w.x[0]*M+w.y[0]*v+w.t[0]*g,h=w.x[1]*M+w.y[1]*v+w.t[1]*g,A=w.x[2]*M+w.y[2]*v+w.t[2]*g,P=Math.hypot(k,h,A)||1;u[p]=x[0],u[p+1]=x[1],u[p+2]=x[2],y[p]=k/P,y[p+1]=h/P,y[p+2]=A/P}return l}var qt=class{constructor(e){this.renderer=e}buckets=new Map;triangles=0;bakes=[];add(e,t,a={}){let r=`${t.id}|${a.magazine?1:0}${a.bolt?1:0}${a.trigger?1:0}${a.selector?1:0}${a.charge?1:0}${a.round?1:0}`,s=this.buckets.get(r)??{m:t,geoms:[],flags:a};return s.geoms.push(e.tangents?e:e.computeTangents()),this.triangles+=e.triangleCount,this.buckets.set(r,s),this}finish(e={}){let t=[],a=e.bake?typeof e.bake=="object"?e.bake:{}:null,r=null,s="";if(a){let o=[];for(let c of this.buckets.values())c.m.alphaMode==="opaque"&&o.push(...c.geoms);r=new tr(o),s=`${r.triangleCount}`}let i=e.bakeMinTriangles??400;for(let o of this.buckets.values()){let c=o.m,b=!!(r&&a&&c.alphaMode==="opaque"&&c.baseColorMap&&o.geoms.reduce((m,u)=>m+u.triangleCount,0)>=i)?hs(o.geoms,a):null,d=new Ae(this.renderer.dev,we.merge(o.geoms),{label:c.name,keepSource:!0});if(b)try{let m=fs(this.renderer,d,b,c,r,s,a);m&&(c=m.material,this.bakes.push({material:o.m.name,texSize:m.texSize,texelMm:m.texelM*1e3,ms:m.ms}))}catch(m){console.warn(`[oaxis] bake failed for ${c.name}:`,m)}t.push({object:new Te(d,c),local:U.create(),...o.flags})}return t}};var We={textureSize:2048,detail:1.5},ys="fondaine.oaxis.settings";try{let n=typeof localStorage<"u"?localStorage.getItem(ys):null;n&&Object.assign(We,JSON.parse(n))}catch{}function vs(n){let e=n.scope(gt.oaxis),t=()=>{try{localStorage.setItem(ys,JSON.stringify(We))}catch{}};e.number("Models",We,"textureSize",{label:"Texture resolution",min:256,max:4096,step:256,unit:"px",help:"Procedural PBR texture size for weapons/props. Applies on reload (load time grows with it).",onChange:t}).number("Models",We,"detail",{label:"Geometry detail",min:.5,max:3,step:.25,help:"Radial segments and bevel smoothness multiplier. Applies on reload.",onChange:t})}function oe(n){return Math.max(6,Math.round(n*We.detail))}var Vr={A:{w:.6,s:[[[0,0],[.3,1],[.6,0]],[[.12,.38],[.48,.38]]]},B:{w:.6,s:[[[0,0],[0,1],[.42,1],[.56,.88],[.56,.64],[.42,.53],[0,.53]],[[.42,.53],[.6,.4],[.6,.12],[.45,0],[0,0]]]},C:{w:.6,s:[[[.6,.84],[.45,1],[.15,1],[0,.84],[0,.16],[.15,0],[.45,0],[.6,.16]]]},D:{w:.6,s:[[[0,0],[0,1],[.4,1],[.6,.8],[.6,.2],[.4,0],[0,0]]]},E:{w:.55,s:[[[.55,1],[0,1],[0,0],[.55,0]],[[0,.53],[.46,.53]]]},F:{w:.55,s:[[[.55,1],[0,1],[0,0]],[[0,.53],[.46,.53]]]},G:{w:.6,s:[[[.6,.84],[.45,1],[.15,1],[0,.84],[0,.16],[.15,0],[.45,0],[.6,.16],[.6,.46],[.34,.46]]]},H:{w:.6,s:[[[0,0],[0,1]],[[.6,0],[.6,1]],[[0,.53],[.6,.53]]]},I:{w:.2,s:[[[.1,0],[.1,1]]]},J:{w:.55,s:[[[.55,1],[.55,.18],[.4,0],[.15,0],[0,.18]]]},K:{w:.6,s:[[[0,0],[0,1]],[[.58,1],[0,.42]],[[.2,.57],[.6,0]]]},L:{w:.52,s:[[[0,1],[0,0],[.52,0]]]},M:{w:.78,s:[[[0,0],[0,1],[.39,.3],[.78,1],[.78,0]]]},N:{w:.6,s:[[[0,0],[0,1],[.6,0],[.6,1]]]},O:{w:.6,s:[[[.15,0],[0,.16],[0,.84],[.15,1],[.45,1],[.6,.84],[.6,.16],[.45,0],[.15,0]]]},P:{w:.58,s:[[[0,0],[0,1],[.44,1],[.58,.88],[.58,.6],[.44,.48],[0,.48]]]},Q:{w:.6,s:[[[.15,0],[0,.16],[0,.84],[.15,1],[.45,1],[.6,.84],[.6,.16],[.45,0],[.15,0]],[[.38,.24],[.64,-.04]]]},R:{w:.6,s:[[[0,0],[0,1],[.44,1],[.58,.88],[.58,.6],[.44,.48],[0,.48]],[[.3,.48],[.6,0]]]},S:{w:.58,s:[[[.58,.84],[.44,1],[.14,1],[0,.84],[0,.64],[.14,.53],[.44,.47],[.58,.36],[.58,.16],[.44,0],[.14,0],[0,.16]]]},T:{w:.56,s:[[[0,1],[.56,1]],[[.28,1],[.28,0]]]},U:{w:.6,s:[[[0,1],[0,.16],[.15,0],[.45,0],[.6,.16],[.6,1]]]},V:{w:.6,s:[[[0,1],[.3,0],[.6,1]]]},W:{w:.82,s:[[[0,1],[.2,0],[.41,.72],[.62,0],[.82,1]]]},X:{w:.58,s:[[[0,0],[.58,1]],[[0,1],[.58,0]]]},Y:{w:.6,s:[[[0,1],[.3,.5],[.6,1]],[[.3,.5],[.3,0]]]},Z:{w:.56,s:[[[0,1],[.56,1],[0,0],[.56,0]]]},0:{w:.55,s:[[[.14,0],[0,.16],[0,.84],[.14,1],[.41,1],[.55,.84],[.55,.16],[.41,0],[.14,0]]]},1:{w:.36,s:[[[.04,.78],[.26,1],[.26,0]]]},2:{w:.55,s:[[[0,.84],[.14,1],[.41,1],[.55,.84],[.55,.64],[0,.1],[0,0],[.55,0]]]},3:{w:.55,s:[[[0,.84],[.14,1],[.41,1],[.55,.84],[.55,.64],[.41,.53],[.22,.53]],[[.41,.53],[.55,.42],[.55,.16],[.41,0],[.14,0],[0,.16]]]},4:{w:.56,s:[[[.42,0],[.42,1],[0,.3],[.56,.3]]]},5:{w:.55,s:[[[.52,1],[.06,1],[.02,.56],[.16,.63],[.4,.63],[.55,.5],[.55,.16],[.41,0],[.14,0],[0,.16]]]},6:{w:.55,s:[[[.5,1],[.22,1],[.04,.8],[0,.16],[.14,0],[.41,0],[.55,.16],[.55,.42],[.41,.56],[.14,.56],[0,.42]]]},7:{w:.54,s:[[[0,1],[.54,1],[.2,0]]]},8:{w:.55,s:[[[.275,.53],[.12,.63],[.12,.88],[.275,1],[.43,.88],[.43,.63],[.275,.53],[.1,.42],[.1,.12],[.275,0],[.45,.12],[.45,.42],[.275,.53]]]},9:{w:.55,s:[[[.55,.58],[.41,.44],[.14,.44],[0,.58],[0,.84],[.14,1],[.41,1],[.55,.84],[.55,.2],[.35,0],[.05,0]]]},".":{w:.2,s:[[[.1,.03],[.1,.05]]]},",":{w:.2,s:[[[.12,.08],[.06,-.12]]]},"-":{w:.4,s:[[[.06,.46],[.34,.46]]]},"/":{w:.44,s:[[[0,0],[.44,1]]]},":":{w:.2,s:[[[.1,.2],[.1,.22]],[[.1,.66],[.1,.68]]]},x:{w:.46,s:[[[0,0],[.46,.62]],[[0,.62],[.46,0]]]},m:{w:.7,s:[[[0,0],[0,.62]],[[0,.5],[.12,.62],[.26,.62],[.35,.5],[.35,0]],[[.35,.5],[.47,.62],[.61,.62],[.7,.5],[.7,0]]]}," ":{w:.4,s:[]}};function xs(n){return Vr[n]??Vr[n.toUpperCase()]??Vr[" "]}function _o(n,e){try{if(typeof document<"u"){let t=document.createElement("canvas");return t.width=n,t.height=e,t}if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(n,e)}catch{}return null}function Ko(n,e=.08){let t=0;for(let a of n)t+=xs(a).w+e;return t-e}function yt(n,e,t,a,r={}){let s=r.px??2048,i=s,o=Math.max(16,Math.round(s*a/t)),c=_o(i,o);if(!c)return null;let l=c.getContext("2d");if(!l)return null;l.clearRect(0,0,i,o);let b=e.length,d=o/b,m=r.tracking??.08,u=.03*i;l.strokeStyle="#ffffff",l.lineCap="round",l.lineJoin="round";for(let S=0;S<b;S++){let T=e[S],z=d*(r.capHeight??.62),L=Ko(T,m);L*z>i-2*u&&(z=(i-2*u)/L);let I=L*z,G=r.align==="center"?(i-I)/2:r.align==="right"?i-u-I:u,j=d*(S+.5)+z/2;l.lineWidth=Math.max(1,z*(r.weight??.11));let R=G;for(let F of T){let N=xs(F);for(let C of N.s)l.beginPath(),C.forEach(([K,q],O)=>{let V=R+K*z,B=j-q*z;O===0?l.moveTo(V,B):l.lineTo(V,B)}),l.stroke();R+=(N.w+m)*z}}let p=l.getImageData(0,0,i,o).data,w=r.color??[.42,.42,.43],x=S=>Math.round(255*(S<=.0031308?S*12.92:1.055*Math.pow(S,1/2.4)-.055)),M=new Uint8Array(i*o*4),v=new Float32Array(i*o);for(let S=0;S<i*o;S++){let T=p[S*4+3]/255;v[S]=T,M[S*4]=x(w[0]),M[S*4+1]=x(w[1]),M[S*4+2]=x(w[2]),M[S*4+3]=Math.round(T*255)}let g=new Uint8Array(i*o*4),k=1.1;for(let S=0;S<o;S++)for(let T=0;T<i;T++){let z=S*i+T,L=v[S*i+Math.max(0,T-1)],I=v[S*i+Math.min(i-1,T+1)],G=v[Math.max(0,S-1)*i+T],j=v[Math.min(o-1,S+1)*i+T],R=(I-L)*k,F=-(j-G)*k,N=1,C=Math.hypot(R,F,N);R/=C,F/=C,N/=C,g[z*4]=Math.round((R*.5+.5)*255),g[z*4+1]=Math.round((F*.5+.5)*255),g[z*4+2]=Math.round((N*.5+.5)*255),g[z*4+3]=255}let h=n.textures,A=h.fromRGBA8(M,i,o,{srgb:!0,label:"engrave.albedo"}),P=h.fromRGBA8(g,i,o,{normalMap:!0,label:"engrave.normal"});return new xe({name:"engraving",baseColorMap:A,normalMap:P,baseColor:[1,1,1,1],roughness:r.roughness??.6,metallic:r.metallic??1,alphaMode:"mask",alphaCutoff:.35,normalScale:.8,uvScale:[1,1],sampler:h.sampler({address:"clamp-to-edge"})})}function vt(n,e,t,a,r,s){let i=s<0?t-a/2:t+a/2,o=s<0?t+a/2:t-a/2,c=[n,e-r/2,i,n,e-r/2,o,n,e+r/2,o,n,e+r/2,i],l=[s,0,0,s,0,0,s,0,0,s,0,0],b=[0,1,1,1,1,0,0,0];return new we(c,l,b,[0,1,2,0,2,3]).computeTangents()}var ir={slideRear:.088,slideFront:-.0975,slideTop:.0165,slideBottom:-.0115,frameTop:-.0125,slideWidth:.0255,frameWidth:.0265,sightLine:.0225,rearSightZ:.082,frontSightZ:-.088,slideTravel:.034,portZ0:-.003,portZ1:-.04},ws=Math.PI*2;function Et(n){let e=ir,t=n.hw??e.slideWidth/2,a=n.yb??e.slideBottom,r=n.yt??e.slideTop,s=n.chamfer??.0042,i=9e-4,o=5e-4,c=4,l=-.0055,b=.0105,d=n.grooveR??0,m=n.grooveL??0,u=!!n.port,y=n.xin??-t+.0075,p=n.portFloor??-5e-4,w=u?p:b,x=new De;x.arc(t-i,a+i,i,-Math.PI/2,0,c),x.pt(t,l).pt(t-d,l).pt(t-d,w).pt(t,w);let M=o*Math.tan(Math.PI/8),v=Math.SQRT1_2,g=(k,h,A,P)=>{let S=[k-A[0]*M,h-A[1]*M],T=[k+P[0]*M,h+P[1]*M],z=[-A[1],A[0]],L=[S[0]+z[0]*o,S[1]+z[1]*o],I=Math.atan2(S[1]-L[1],S[0]-L[0]),j=Math.atan2(T[1]-L[1],T[0]-L[0])-I;for(;j>Math.PI;)j-=ws;for(;j<-Math.PI;)j+=ws;x.arc(L[0],L[1],o,I,I+j,c)};if(u){for(let k=0;k<=c;k++)x.pt(t,p);for(let k=0;k<=c;k++)x.pt(y,p)}else g(t,r-s,[0,1],[-v,v]),g(t-s,r,[-v,v],[-1,0]);return x.pt(y,r,!u),g(-t+s,r,[-1,0],[-v,-v]),g(-t,r-s,[-v,-v],[0,-1]),x.pt(-t,b).pt(-t+m,b).pt(-t+m,l).pt(-t,l),x.arc(-t+i,a+i,i,Math.PI,Math.PI*1.5,c),x.done()}function sr(n,e=0){let t=(n-.028)/.08850000000000001,a=.0185+.0229*t,r=.0725+.0161*t;a+=7e-4*(Math.exp(-((n-.067)**2)/(2*.006**2))+Math.exp(-((n-.089)**2)/(2*.006**2))),r+=.0016*Math.exp(-((n-.078)**2)/(2*.014**2))-6e-4*Math.exp(-((n-.034)**2)/(2*.008**2));let s=.0128+.0021*Math.sin(Math.PI*Math.min(1,Math.max(0,(n-.03)/.09)))**.7;s+=e,a-=e*.6,r+=e*.8;let i=Math.min(.0098,s-.0012),o=Math.min(.0068,s-.0012),c=new De;return c.arc(s-i,a+i,i,-Math.PI/2,0,12),c.arc(s-o,r-o,o,0,Math.PI/2,9),c.arc(-s+o,r-o,o,Math.PI/2,Math.PI,9),c.arc(-s+i,a+i,i,Math.PI,Math.PI*1.5,12),c.done()}function Ms(n,e={}){let t=performance.now(),a=n.synth,r=e.textureSize??We.textureSize,s=Math.min(r,1024),i=Math.min(r,512),o=ir,c=a.material("brushed",{size:r,tileMeters:.1,color:e.slideColor??[.03,.031,.035],wear:.05,roughness:.36,seed:41,bumpMm:.006,extra:0},{name:"c15-slide-nitride",edgeWear:.7,edgeWearRadius:.0022,specular:.5}),l=a.material("machined",{size:s,tileMeters:.05,color:[.46,.46,.47],wear:.25,roughness:.3,seed:42,extra:1},{name:"c15-barrel",edgeWear:.3}),b=e.frameColor??[.03,.03,.032],d=a.material("polymer",{size:r,tileMeters:.12,color:b,extra:.3,roughness:.5,bumpMm:.1,dirt:.05,seed:43},{name:"c15-frame",edgeWear:.12,edgeWearRadius:.0012,specular:.45}),m=a.material("polymer",{size:r,tileMeters:.216,color:b,extra:.97,roughness:.6,bumpMm:.45,dirt:.4,seed:44},{name:"c15-stipple",edgeWear:.12,edgeWearRadius:.0012,specular:.45}),u=a.material("parkerized",{size:s,tileMeters:.06,color:[.02,.02,.021],wear:.12,seed:45},{name:"c15-steel-black",edgeWear:.5,edgeWearRadius:.002}),y=a.material("parkerized",{size:s,tileMeters:.05,color:[.045,.046,.045],wear:.3,seed:46},{name:"c15-parkerized",edgeWear:.6,edgeWearRadius:.002}),p=a.material("machined",{size:i,tileMeters:.02,color:[.16,.16,.165],wear:.4,roughness:.4,seed:47,extra:.4},{name:"c15-pins"}),w=a.material("brushed",{size:s,tileMeters:.1,color:[.034,.034,.036],wear:.1,roughness:.42,seed:48,bumpMm:.006,extra:0},{name:"c15-mag-body",edgeWear:.75,edgeWearRadius:.0025}),x=a.material("brass",{size:i,tileMeters:.03,seed:49},{name:"c15-brass"}),M=new xe({name:"c15-sight-white",baseColor:[.85,.85,.8,1],roughness:.5,metallic:0}),v=new xe({name:"c15-follower",baseColor:[.75,.22,.03,1],roughness:.6,metallic:0}),g=new xe({name:"c15-cavity",baseColor:[.02,.02,.02,1],roughness:.9,metallic:.3}),k=e.frontSight==="white"?M:new xe({name:"c15-tritium",baseColor:[.75,.9,.72,1],roughness:.3,metallic:0,emissive:[.35,1,.4],emissiveLuminance:40}),h=new qt(n),A={bolt:!0},P={magazine:!0},S=o.slideWidth/2;{let R=Et({}),F=Et({grooveL:9e-4,grooveR:9e-4}),N=Et({port:!0}),C=-.16,K=.0025,q=[];q.push({z:o.slideRear,prof:Et({yt:o.slideTop-.0035,chamfer:.0042})}),q.push({z:o.slideRear-.0035,prof:R});let O=(D,J)=>q.push({z:D,prof:R,shear:C,shearY0:K},{z:D,prof:J,shear:C,shearY0:K},{z:D-.0015,prof:J,shear:C,shearY0:K},{z:D-.0015,prof:R,shear:C,shearY0:K});for(let D=0;D<8;D++)O(.0775-D*.0034,F);q.push({z:o.portZ0+.004,prof:R},{z:o.portZ0+.004,prof:Et({port:!0,portFloor:.0075})}),q.push({z:o.portZ0,prof:Et({port:!0,portFloor:.0075})},{z:o.portZ0,prof:N}),q.push({z:o.portZ1,prof:N},{z:o.portZ1,prof:R});for(let D=0;D<5;D++)O(-.0565-D*.0034,F);let V=D=>Et({yb:o.slideBottom+.003*D,yt:o.slideTop-.0047*D,hw:S-.0022*D,chamfer:.0042});q.push({z:-.0905,prof:R});for(let D=1;D<=5;D++){let J=1-Math.cos(D/5*(Math.PI/2));q.push({z:-.0905-.0058*(D/5),prof:V(J*.85),smooth:!0})}q.push({z:o.slideFront,prof:V(1)}),h.add(Je(q,{capUV:"stack"}),c,A),h.add(Fe(.0082,4e-4,0,0,o.slideFront-15e-5,oe(28)),g,A),h.add(Fe(.0046,6e-4,0,-.0068,o.slideFront-15e-5,oe(20)),g,A),h.add(Fe(.0031,.0012,0,-.0068,o.slideFront-2e-4,oe(16)),y,A),h.add(Fe(.0011,5e-4,6e-4,0,o.portZ0+1e-4,10),g,A),h.add(ye(.0012,.0046,.0205,4e-4,4).translate(S-4e-4,.0048,o.portZ0+.0105),y,A),h.add(ye(9e-4,.0028,.004,3e-4,4).translate(S+3e-4,.0048,o.portZ0+.0185),y,A),h.add(ar(.0029,.0014,-S-1e-4,.004,.074,oe(32)),y,{bolt:!0,selector:!0}),h.add(ye(.0018,.0115,.0046,8e-4,5).translate(-S-.0012,.004+.0058,.074),y,{bolt:!0,selector:!0});for(let D=0;D<4;D++)h.add(je(4e-4,4e-4,.004).translate(-S-.0021,.0065+D*.0022,.074),u,{bolt:!0,selector:!0});h.add(bt(Ue(.0178,.0218,.0018,5,0,.0018),.0012,4e-4,3).translate(0,0,o.slideRear+6e-4),y,A),h.add(Fe(.0028,4e-4,0,6e-4,o.slideRear+.00125,14),g,A),h.add(Fe(.0017,7e-4,0,6e-4,o.slideRear+.0013,12),p,A);let B=o.sightLine,_=o.slideTop-3e-4,ee=.0019,W=.0031,Y=[[-.0105,_],[.0105,_],[.0105,B-.0014],[.0094,B],[ee,B],[ee,B-W],[-ee,B-W],[-ee,B],[-.0094,B],[-.0105,B-.0014]];h.add(bt(Ee(Y,[6e-4,6e-4,3e-4,3e-4,2e-4,2e-4,2e-4,2e-4,3e-4,3e-4],3),.0092,5e-4,3).translate(0,0,o.rearSightZ-.0046),y,A);for(let D=0;D<5;D++)h.add(je(.0186,5e-4,4e-4).translate(0,_+9e-4+D*.001,o.rearSightZ+1e-4),u,A);for(let D of[-1,1])h.add(Fe(.0012,4e-4,D*.0058,B-.0021,o.rearSightZ+2e-4),M,A);h.add(He(Ee([[-o.frontSightZ-.0028,o.slideTop-3e-4],[-o.frontSightZ+.0022,o.slideTop-3e-4],[-o.frontSightZ+.0022,o.sightLine],[-o.frontSightZ-.001,o.sightLine]],[0,0,4e-4,4e-4],3),.0036,3e-4,3),y,A);let E=o.sightLine-.0022;h.add(Fe(.0013,3e-4,0,E,o.frontSightZ+.00235),M,A),h.add(Fe(75e-5,5e-4,0,E,o.frontSightZ+.00245),k,A)}{let R=Ue(.0168,.0246,.0042,4,6e-4,.0035);h.add(Pt(R,o.portZ0-2e-4,o.portZ1-.003),l),h.add(Fe(.0052,4e-4,6e-4,0,o.portZ0+5e-5,oe(20)),g),h.add(lt([[.0071,0],[.0071,.006],[.0082,.009],[.0082,0],[.0071,0]],o.portZ1-.003,0,oe(64)),l),h.add(Ve(.0071,o.portZ1-.003,o.slideFront+6e-4,0,0,oe(64)),l),h.add(lt([[.0046,0],[.0062,0],[.0071,9e-4],[.0071,.0012],[.0046,.0012]],o.slideFront+4e-4,0,oe(64)),l),h.add(Fe(.0046,4e-4,0,0,o.slideFront-4e-4),g)}let T=o.frameWidth;{let R=o.frameTop,F=[[-.094,R],[.0905,R],[.094,R-.0036],[.094,-.0262],[.051,-.0268],[.0485,-.0288],[-.0125,-.0288],[-.0185,-.0335],[-.0185,-.047],[-.0775,-.054],[-.0738,-.0305],[-.0845,-.0228],[-.0915,-.0168],[-.094,R-6e-4]],N=[6e-4,6e-4,.0012,.0028,.0012,.0015,.0012,.002,.003,.004,.003,.002,.0025,6e-4];h.add(He(Ee(F,N,5),T,.0018,5),d),h.add(He(Ee([[-.0915,R-3e-4],[.0905,R-3e-4],[.0905,o.slideBottom+1e-4],[-.0915,o.slideBottom+1e-4]],2e-4,2),T-.0022,2e-4,2),u);for(let _ of[-1,1])h.add(ye(.0012,.0012,.028,3e-4,4).translate(_*(T/2-.0011+3e-4),-.0121,-.055),y),h.add(ye(.0012,.0012,.02,3e-4,4).translate(_*(T/2-.0011+3e-4),-.0121,.065),y);{let _=rr([[0,-.02,-.047],[0,-.0545,-.047],[0,-.0572,-.004],[0,-.0505,.0135],[0,-.0335,.0245]],[0,.0065,.012,.0055,0],10),ee=W=>[1+.18*(W<.3?1:W<.5?1-(W-.3)/.2:0),1];h.add(nr(_,.0056,.0112,.0022,5,ee),d)}let C=[];for(let _=.028;_<=.1125+1e-9;_+=.0021)C.push(_);let K=C.filter(_=>_<=.0455+1e-9),q=C.filter(_=>_>=.0455-1e-9),O=(_,ee=[])=>Je([..._.map((W,Y)=>({z:W,prof:sr(W),smooth:Y>0})),...ee],{capStart:!1,capEnd:!1,capUV:"stack"}).rotateX(Math.PI/2);h.add(O(K),d),h.add(O(q,[{z:.1145,prof:sr(.1145,8e-4),smooth:!0},{z:.1165,prof:sr(.1165,.0016),smooth:!1},{z:.1172,prof:sr(.1165,.0014)}]),m);let V=Pt(Ue(.0236,.0356,.004,4),0,.105,{capEnd:!1}).flipWinding();h.add(V.rotateX(Math.PI/2-Math.atan2(.309,.951)).translate(0,-.0135,.0365),g);for(let _ of[-1,1]){let ee=bt(Ue(.0205,.052,.004,6),.0012,5e-4,3);h.add(ee.rotateY(_*Math.PI/2).transform(Jo(_)),m)}{let _=new De().pt(.0105,-.0262).pt(.0105,-.0278).pt(.0083,-.03).pt(-.0083,-.03).pt(-.0105,-.0278).pt(-.0105,-.0262).done(),ee=new De().pt(.0105,-.0262).pt(.0105,-.0266).pt(.0083,-.0266).pt(-.0083,-.0266).pt(-.0105,-.0266).pt(-.0105,-.0262).done();h.add(gs(_,ee,-.05,-.092,[[-.061,-.0662],[-.075,-.0802]]),d)}h.add($e(.0016,T+6e-4,0,-.0215,-.01),p),h.add($e(.0016,T+6e-4,0,-.018,-.034),p),h.add($e(.0015,T+6e-4,0,-.0215,.072),p);for(let _ of[-1,1]){h.add(ye(.0011,.0028,.0096,5e-4,4).translate(_*(T/2+4e-4),-.0165,-.044),y);for(let ee=0;ee<4;ee++)h.add(je(5e-4,.0032,5e-4).translate(_*(T/2+9e-4),-.0165,-.0405-ee*.0022),u)}let B=[[.004,-.0138],[.0262,-.0138],[.03,-.015],[.032,-.0172],[.0282,-.0188],[.021,-.0176],[.012,-.0165],[.004,-.0162]];if(h.add(He(Ee(B,6e-4,3),.0016,4e-4,3).translate(-T/2-9e-4,0,0),y),h.add(He(Ee([[.018,R],[.026,R],[.0276,R-.0016],[.0176,R-.0028]],5e-4,3),.0024,5e-4,3).translate(-T/2-.0016,0,0),y),h.add(dt(.0017,-T/2-.0018,-.018,-.034,-1,"dome"),p),h.add(ye(.0024,.0098,.0106,.0014,5).translate(-T/2-.0012+6e-4,-.0395,.0135),d),h.add(ye(.0034,.0066,.0074,.0012,5).translate(-T/2-.0022,-.0395,.0135),m),h.add(ye(.0012,.0066,.0074,8e-4,5).translate(T/2+4e-4,-.0395,.0135),y),e.engravings!==!1){let _=yt(n,["C15 COMPACT  9x19"],.054,.0046,{px:2048,tracking:.14});_&&h.add(vt(-S-6e-5,.0032,.0135,.054,.0046,-1),_,A);let ee=yt(n,["FONDAINE ARMS   MOD. C15"],.066,.0034,{px:2048,tracking:.12});ee&&h.add(vt(S+6e-5,-.0062,.012,.066,.0034,1),ee,A);let W=ye(8e-4,.0062,.03,3e-4,4).translate(T/2+15e-5,-.0205,-.07);h.add(W,p);let Y=yt(n,["FA 2209 0417"],.028,.0036,{px:1024,color:[.12,.12,.125],metallic:.9,roughness:.5,tracking:.1});Y&&h.add(vt(T/2+62e-5,-.0205,-.07,.028,.0036,1),Y);let E=yt(n,["C15"],.009,.0045,{px:512,color:[.07,.07,.072],metallic:0,roughness:.7,tracking:.05,align:"center"});E&&h.add(vt(-T/2-6e-5,-.0225,-.075,.009,.0045,-1),E)}}{let R=[[.0098,-.03],[.015,-.03],[.0146,-.035],[.0126,-.042],[.0094,-.0478],[.006,-.05],[.0046,-.049],[.0072,-.044],[.0094,-.0378]];h.add(He(Ee(R,[8e-4,8e-4,.0012,.0012,.0012,.0012,8e-4,8e-4,8e-4],4),.0066,.0012,4),y,{trigger:!0}),h.add(He(Ee([[.0152,-.034],[.0166,-.0345],[.0146,-.047],[.012,-.0478],[.0126,-.042]],4e-4,3),.0022,5e-4,3),u,{trigger:!0})}{let R=Math.PI/2-Math.atan2(.309,.951),F=O=>O.rotateX(R).translate(0,-.0195,.0385),N=Ue(.0222,.0338,.0038,8),C=Ue(.0214,.033,.0036,8);h.add(F(Je([{z:-.001,prof:C},{z:.006,prof:N,smooth:!0},{z:.1005,prof:N}],{capStart:!1,capUV:"stack"})),w,P),h.add(F(Pt(Ue(.0196,.03,.003,3),-.0035,.004)),v,P);let K=Ce([[0,0],[.00495,0],[.00495,.0185],[.0047,.0195],[.004,.0235],[.0026,.0272],[.001,.029],[0,.0293]],oe(40));h.add(K.rotateX(-Math.PI/2).translate(.0025,-.0155,.0535),x,{...P,round:!0});let q=Ue(.0262,.0392,.0032,6);h.add(F(Je([{z:.0995,prof:Ue(.0232,.0348,.003,6)},{z:.1015,prof:q},{z:.1075,prof:q},{z:.1095,prof:Ue(.0242,.0372,.0032,6)}],{capUV:"stack"})),d,P),h.add(F(Fe(.0028,6e-4,0,.004,.1097,12)),p,P);for(let O=0;O<6;O++)h.add(F(Ut(.0011,6e-4,0,.0169,.018+O*.0145,10)),g,P)}let z=Math.min(1,Math.max(.25,r/2048)),L=h.finish({bake:e.bake!==!1&&{rays:Math.round(32*z),aoScale:.25*z}});for(let R of h.bakes)console.info(`[oaxis] bake ${R.material}: ${R.texSize[0]}x${R.texSize[1]} @ ${R.texelMm.toFixed(2)} mm/texel in ${R.ms.toFixed(0)} ms`);let I=new Ae(n.dev,At(.019,.0099,Ce,{straight:!0})),G={parts:L,muzzle:f.create(0,0,o.slideFront-.001),ejectionPort:f.create(.0105,.0125,(o.portZ0+o.portZ1)/2),rearSight:f.create(0,o.sightLine,o.rearSightZ),frontSight:f.create(0,o.sightLine,o.frontSightZ),casingMesh:I,casingMaterial:x,magAxis:f.normalize(f.create(),f.create(0,-.951,.309)),magBox:{center:f.create(0,-.07,.051),half:f.create(.0131,.053,.019)},triggerTravelM:.0045,selector:{pivot:[-o.slideWidth/2-8e-4,.004,.074],axis:[1,0,0],angles:{safe:0,semi:-.9,auto:-1.8}},charge:{grip:f.create(0,o.slideTop+.004,.064),travelM:o.slideTravel,release:"slingshot",pullDir:f.create(0,0,1)}},j={triangles:h.triangles,buildMs:performance.now()-t};return console.info(`[oaxis] C15 Compact: ${j.triangles.toLocaleString()} tris in ${j.buildMs.toFixed(0)} ms`),{model:G,spec:Wr(o.sightLine),grips:Hr,stats:j}}function Jo(n){let t=.576271186440678,a=.0185+.0229*t,r=.0725+.0161*t,s=.0128+.0021*Math.sin(Math.PI*Math.min(1,Math.max(0,(.079-.03)/.09)))**.7,i=Math.atan2(.0229+.0161,2*(.1165-.028)),o=Math.cos(i),c=Math.sin(i);return new Float32Array([1,0,0,0,0,o,-c,0,0,c,o,0,n*(s-1e-4),-.079,(a+r)/2,1])}var Hr={right:{position:[.0285,-.0326,.1253],fingerDir:[0,-.309,-.951],dorsal:[1,0,0],fingers:[{curl:[.5,.7,.3],spread:.1},{curl:[1.25,1.35,.7]},{curl:[1.3,1.35,.7]},{curl:[1.35,1.3,.7]}],thumb:{dir:[-.55,-.55,-.62],bend:[.15,.1]}},indexPressed:{curl:[.55,.95,.45],spread:.08},left:{position:[-.034,-.0325,.0823],fingerDir:[0,-.5,-.866],dorsal:[-1,0,0],fingers:[{curl:[1.15,1.2,.6]},{curl:[1.2,1.2,.6]},{curl:[1.2,1.2,.6]},{curl:[1.2,1.15,.6]}],thumb:{dir:[-.5,-.1,-.86],bend:[.05,.05]}},leftOnMagazine:{position:[0,-.15,.13],fingerDir:[0,.25,-.97],dorsal:[0,-1,0],fingers:[{curl:[.9,.9,.4]},{curl:[.95,.9,.4]},{curl:[.95,.9,.4]},{curl:[.95,.9,.4]}],thumb:{dir:[-.7,.2,-.6],bend:[.2,.1]}}};function Wr(n=ir.sightLine){return{name:"C15 Compact 9mm",caliber:Za["9x19 124gr"],barrelLengthM:.102,massKg:.84,rpm:1100,fireModes:["safe","semi","auto"],magazineCapacity:15,sightHeightM:n,zeroM:23,accuracyMoa:3,recoil:{boreAboveShoulderM:.045,inertia:.075,shoulderMassKg:3.5,holdOmega:15,holdDamping:.55,horizontalRatio:.3,viewCouplingHip:.04,viewCouplingAds:.1,residualRise:.06},reload:{magOut:.45,magIn:.85,boltRelease:.35},audio:_a.pistol9mm,flash:{kelvin:1850,luminance:45e4,sizeM:.07,lightCandela:12e3,sidePorts:!1,smoke:.5},ejection:{speed:3.2,up:2.4,back:1,spinRad:35},hipOffset:[.05,-.118,-.38],eyeRelief:.56,adsTime:.22,action:{travelM:ir.slideTravel,backMs:5,returnMs:8,lockOpenOnEmpty:!0,lockFraction:.93},drawTime:.45}}var Z={seam:-.012,upperHW:.015,lowerHW:.0148,railTop:.0307,railNeck:.0276,upperRear:.115,upperFront:-.118,boltFace:-.054,portZ0:.009,portZ1:-.049,portY0:-.006,portY1:.013,hgZ0:-.122,hgZ1:-.463,barrelLen:.406,tubeR:.0146,slotPitch:.01001,slotW:.00523},St=Math.PI*2;function As(n,e,t,a=Z.railTop,r=Z.railNeck){t?n.pt(e,r).pt(e,r).pt(e,r):n.pt(e,r).pt(e+.0023,r+.0023).pt(e+.0023,a)}function Ps(n,e,t,a=Z.railTop,r=Z.railNeck){t?n.pt(-e,r).pt(-e,r).pt(-e,r):n.pt(-(e+.0023),a).pt(-(e+.0023),r+.0023).pt(-e,r)}function Xo(n={}){let e=Z.upperHW,t=Z.seam,a=.004,r=e,s=.0018,i=5,o=.0105,c=.00783,l=Z.railNeck-.0015,b=.0125,d=.0012,m=Math.acos(o/r),u=new De;u.arc(e-s,t+s,s,-Math.PI/2,0,i);let y=14,p=28;if(u.pt(e,Z.portY0),n.port){let w=Math.sqrt(b*b-(Z.portY0-d)**2),x=Math.sqrt(b*b-(Z.portY1-d)**2);u.pt(w,Z.portY0);let M=Math.atan2(Z.portY0-d,w),v=Math.atan2(Z.portY1-d,x)-St;u.arc(0,d,b,M,v,p-1);let g=Math.sqrt(r*r-(Z.portY1-a)**2);u.pt(g,Z.portY1);let k=Math.asin((Z.portY1-a)/r);for(let h=0;h<=y;h++){let A=k+(m-k)*h/y;u.pt(Math.cos(A)*r,a+Math.sin(A)*r,h>0&&h<y)}}else{for(let w=0;w<=p;w++)u.pt(e,Z.portY0);u.pt(e,a,!0);for(let w=0;w<=y;w++){let x=m*w/y;u.pt(Math.cos(x)*r,a+Math.sin(x)*r,w>0&&w<y)}}u.pt(o,l).pt(c,l),As(u,c,!!n.cut),Ps(u,c,!!n.cut),u.pt(-c,l).pt(-o,l);for(let w=0;w<=y;w++){let x=Math.PI-m+m*w/y;u.pt(Math.cos(x)*r,a+Math.sin(x)*r,w>0&&w<y)}return u.pt(-e,a,!0),u.arc(-e+s,t+s,s,Math.PI,Math.PI*1.5,i),u.done()}function Yo(n={}){let l=Math.SQRT1_2,b=new De,d=!!n.mlok;return b.pt(-.0035,-.0205).pt(-.0035,d?-.0205+.0085:-.0205).pt(.0035,d?-.0205+.0085:-.0205).pt(.0035,-.0205),b.corner(.0195-.0075,-.0205,[1,0],[l,l],.0012),b.corner(.0195,-.0205+.0075,[l,l],[0,1],.0012),b.pt(.0195,-.0035).pt(d?.0195-.0085:.0195,-.0035).pt(d?.0195-.0085:.0195,.0035).pt(.0195,.0035),b.corner(.0195,.0205-.0075,[0,1],[-l,l],.0012),b.corner(.0195-.0075,.0205,[-l,l],[-1,0],.0012),b.pt(.0105,.0205).pt(.0105,Z.railNeck-.0015).pt(.00783,Z.railNeck-.0015),As(b,.00783,!!n.cut),Ps(b,.00783,!!n.cut),b.pt(-.00783,Z.railNeck-.0015).pt(-.0105,Z.railNeck-.0015).pt(-.0105,.0205),b.corner(-(.0195-.0075),.0205,[-1,0],[-l,-l],.0012),b.corner(-.0195,.0205-.0075,[-l,-l],[0,-1],.0012),b.pt(-.0195,.0035).pt(d?-(.0195-.0085):-.0195,.0035).pt(d?-(.0195-.0085):-.0195,-.0035).pt(-.0195,-.0035),b.corner(-.0195,-.0205+.0075,[0,-1],[l,-l],.0012),b.corner(-(.0195-.0075),-.0205,[l,-l],[1,0],.0012),b.done()}function Qo(n){let t=new De,a=96;for(let r=0;r<a;r++){let s=r/a*St,i=Math.abs((s+Math.PI)%St-Math.PI)<.14,o=n&&i?.0124-.0012:.0124;t.pt(Math.cos(s)*o,Math.sin(s)*o,!i)}return t.done()}function qr(n,e,t,a,r){let s=e>=n?1:-1,i=new Set([n,e]),o=p=>[Math.min(p[0],p[1]),Math.max(p[0],p[1])],c=t.map(o),l=a.map(o);for(let p of[...c,...l])for(let w of p)(w-n)*s>1e-9&&(e-w)*s>1e-9&&i.add(w);let b=[...i].sort((p,w)=>(p-w)*s),d=(p,w)=>w.some(([x,M])=>p>x+1e-9&&p<M-1e-9),m=[],u=new Map,y=(p,w)=>{let x=`${p}${w}`,M=u.get(x);return M||(M=r(p,w),u.set(x,M)),M};for(let p=0;p<b.length-1;p++){let w=(b[p]+b[p+1])/2,x=y(d(w,c),d(w,l));m.push({z:b[p],prof:x},{z:b[p+1],prof:x})}return m}function ks(n,e){let t=Math.min(n,e),a=Math.max(n,e),r=[];for(let s=Math.ceil((t+.003)/Z.slotPitch);s*Z.slotPitch<a-.003;s++){let i=s*Z.slotPitch;i-Z.slotW/2>t+.0015&&i+Z.slotW/2<a-.0015&&r.push([i-Z.slotW/2,i+Z.slotW/2])}return r}function Ss(n,e={}){let t=performance.now(),a=n.synth,r=e.textureSize??We.textureSize,s=Math.min(r,1024),i=Math.min(r,512),o=a.material("anodized",{size:r,tileMeters:.2,color:[.03,.031,.033],wear:.025,roughness:.5,seed:11,bumpMm:.025},{name:"anodized",edgeWear:.6,edgeWearRadius:.0022,specular:.5}),c=a.material("anodized",{size:r,tileMeters:.2,color:[.03,.031,.033],wear:.08,roughness:.5,seed:12,bumpMm:.02},{name:"anodized-rail",edgeWear:.85,edgeWearRadius:.002}),l=a.material("anodized",{size:r,tileMeters:.22,color:[.028,.029,.032],wear:.03,roughness:.52,seed:19,bumpMm:.03},{name:"anodized-handguard",edgeWear:.65,edgeWearRadius:.002,specular:.5}),b=a.material("parkerized",{size:r,tileMeters:.16,color:[.05,.052,.05],wear:.2,seed:13},{name:"parkerized",edgeWear:.5,edgeWearRadius:.002}),d=a.material("brushed",{size:s,tileMeters:.1,color:[.04,.041,.043],wear:.12,roughness:.38,seed:20,bumpMm:.006,extra:0},{name:"bcg-nitride",edgeWear:.8,edgeWearRadius:.0025}),m=a.material("polymer",{size:r,tileMeters:.14,color:[.03,.03,.032],extra:.3,roughness:.55,bumpMm:.12,dirt:.15,seed:14},{name:"polymer",edgeWear:.12,edgeWearRadius:.0012,specular:.45}),u=a.material("polymer",{size:r,tileMeters:.216,color:[.03,.03,.032],extra:.95,roughness:.6,bumpMm:.45,dirt:.4,seed:15},{name:"polymer-stipple",edgeWear:.12,edgeWearRadius:.0012,specular:.45}),y=a.material("polymer",{size:r,tileMeters:.14,color:[.034,.034,.036],extra:.5,roughness:.56,bumpMm:.2,dirt:.25,seed:21},{name:"polymer-mag",edgeWear:.15,edgeWearRadius:.0012,specular:.45}),p=a.material("rubber",{size:i,seed:16,extra:1},{name:"rubber"}),w=a.material("brass",{size:i,tileMeters:.03,seed:17},{name:"brass"}),x=a.material("parkerized",{size:s,tileMeters:.08,color:[.022,.022,.023],wear:.08,seed:18},{name:"steel-black",edgeWear:.5,edgeWearRadius:.0018}),M=a.material("machined",{size:s,tileMeters:.05,color:[.4,.4,.41],wear:.35,roughness:.42,seed:22,extra:1},{name:"stainless"}),v=a.material("machined",{size:i,tileMeters:.02,color:[.28,.28,.29],wear:.4,seed:23,extra:.4},{name:"pins"}),g=new xe({name:"cavity",baseColor:[.02,.02,.02,1],roughness:.9,metallic:.3}),k=new xe({name:"sight-white",baseColor:[.85,.85,.8,1],roughness:.5,metallic:0}),h=new qt(n),A={bolt:!0},P={charge:!0},S={magazine:!0},T=Z.upperHW,z=Z.lowerHW;{let C=ks(Z.upperRear-.004,Z.upperFront+.004),K=qr(Z.upperRear,Z.upperFront,C,[[Z.portZ0,Z.portZ1]],(B,_)=>Xo({cut:B,port:_}));h.add(Je(K,{capUV:"stack"}),o),h.add(Ve(.016,Z.upperFront,Z.upperFront-.006,0,0,oe(64)),o),h.add(lt([[.0125,0],[.0168,0],[.0168,.004],[.0158,.0045],[.0158,.0215],[.0125,.0215]],Z.upperFront-.006,0,oe(64)),b),h.add(ye(.0148,.0078,.03,6e-4,4).translate(0,.0235,Z.upperRear-.01),g),h.add(bt(Ee([[T-.004,.0105],[T+.0068,.0235],[T+.0068,.0305],[T-.004,.0305]],[.001,.0012,.0012,.001],4),.017,.0015,4).rotateX(Math.PI/2).translate(0,.0045,0),o);let q=T+.0042,O=.009;h.add(Ve(.0068,.03,.062,O,q,oe(48)),o),h.add(lt([[0,0],[.0052,0],[.0062,.0015],[.0062,.009],[.0058,.0105],[.0049,.011],[0,.011]],.073,O,oe(48)).translate(q,0,0),b);for(let B=0;B<12;B++){let _=B/12*St;h.add(je(7e-4,.0028,.006).translate(0,.0063,0).rotateZ(_).translate(q,O,.068),x)}let V=ye(.0012,.0186,.0585,5e-4,4);h.add(V.translate(0,-.0093,0).rotateZ(.35).translate(T+.0012,Z.portY0-5e-4,(Z.portZ0+Z.portZ1)/2),b),h.add(Ve(.0014,Z.portZ0+.004,Z.portZ1-.004,Z.portY0-8e-4,T+.0012,24),v);for(let B of[-1,1])h.add(dt(.0038,B*(z+3e-4),Z.seam-.0085,.0735,B,"dome"),v),h.add(dt(.0038,B*(z+3e-4),Z.seam-.0085,-.0655,B,"dome"),v)}{let C=[];for(let V=0;V<9;V++)C.push([-.034+V*.0045,-.034+V*.0045+.0018]);let K=Z.boltFace+.012,q=Z.upperRear+.03;h.add(Je(qr(K,q,C,[],V=>Qo(V)),{capUV:"stack"}),d,A),h.add(Ve(.0124,Z.boltFace-.012,K-6e-4,0,0,oe(64)),b),h.add(Ve(.0094,Z.boltFace,K+5e-4,0,0,oe(48)),d,A),h.add(Fe(.0094,4e-4,0,0,Z.boltFace-2e-4,oe(48)),x,A),h.add(ye(.0062,.0036,.0082,.001,4).translate(.0072,.0108,K+.013),d,A),h.add(ye(.0068,.0046,.018,.0012,4).translate(0,.0128,K+.052),d,A),h.add(dt(.0021,0,0,0,1,"hex",12).rotateZ(Math.PI/2).translate(0,.0151,K+.046),x,A);let O=.0235;h.add(ye(.0128,.0058,.105,.0012,4).translate(0,O,Z.upperRear-.045),o,P),h.add(ye(.051,.0075,.019,.0022,5).translate(.002,O,Z.upperRear+.011),o,P);for(let V=0;V<6;V++)h.add(je(.0038,.0012,.009).translate(-.0205+V*.0082,O+.0042,Z.upperRear+.012),x,P);h.add(ye(.0096,.0064,.021,.0014,5).translate(-.0302,O,Z.upperRear+.0105),b,P),h.add(Ut(.0013,.009,-.0245,O,Z.upperRear+.016,24),v,P)}{let C=Z.seam,K=[[-.1145,C+5e-4],[.0705,C+5e-4],[.0705,-.038],[.012,-.04],[-.03,-.04],[-.04,-.044],[-.06,-.0585],[-.072,-.052],[-.08,-.03],[-.1145,-.026]];h.add(He(Ee(K,[8e-4,8e-4,.0025,.0025,.002,.003,.004,.004,.0035,.0012],5),z*2,.0022,5),o),h.add(Ve(.0185,.0985,Z.upperRear+5e-4,0,0,oe(64)),o);let q=[[.0705,C],[.0705,-.07],[.0725,-.0745],[.0105,-.0745],[.0125,-.07],[.0125,C]];h.add(He(Ee(q,[8e-4,.0025,.002,.002,.0025,8e-4],5),z*2+4e-4,.0025,5),o),h.add(Pt(Ue(.0238,.0565,.003,5),0,.064).rotateX(Math.PI/2+.17).flipWinding().translate(0,C,-.0415+.011),g),h.add(nr(rr([[0,-.036,-.012],[0,-.055,-.012],[0,-.055,.0275],[0,-.036,.0275]],[0,.004,.004,0],8),.005,.0088,.0018,5),o),h.add($e(.0013,.0115,0,-.043,-.0095),v),h.add($e(.0013,.0115,0,-.043,.0275),v),h.add(He(Ee([[-.012,-.04],[-.0155,-.04],[-.0195,-.047],[-.0185,-.0535],[-.0135,-.0525],[-.0105,-.046]],[5e-4,5e-4,.0012,.0012,.0012,.0012],4),.0062,.001,4),b,{trigger:!0});let O=[-(z+.0016),C-.0092,.03];h.add(ar(.0045,.0028,O[0],O[1],O[2],oe(40)),b,{selector:!0}),h.add(ye(.0036,.0046,.0195,.0014,5).translate(O[0]-.0012,O[1],O[2]-.0085),b,{selector:!0});for(let V=0;V<5;V++)h.add(je(6e-4,.0052,6e-4).translate(O[0]-.0031,O[1],O[2]-.0135-V*.0015),x,{selector:!0});if(e.engravings!==!1){let V=yt(n,["SAFE   SEMI   AUTO"],.028,.0028,{px:1024,color:[.8,.8,.78],metallic:0,roughness:.6,tracking:.08,align:"center"});V&&h.add(vt(-(z+8e-5),C-.0028,.021,.028,.0028,-1),V);let B=yt(n,["FONDAINE ARMS","MOD. FA-15   CAL. 5.56 NATO"],.046,.009,{px:2048,color:[.75,.75,.74],metallic:0,roughness:.6,tracking:.1,align:"left"});B&&h.add(vt(-(.0146+8e-5),-.03,-.0415,.046,.009,-1),B);let _=yt(n,["FA15-0042117"],.028,.0034,{px:1024,color:[.78,.78,.77],metallic:0,roughness:.6,tracking:.1,align:"left"});_&&h.add(vt(.0146+8e-5,-.03,-.0415,.028,.0034,1),_)}h.add(He(Ee([[.004,C-.004],[.004,C-.0185],[.009,C-.0225],[.0205,C-.0225],[.0205,C-.004]],.0012,4),.0036,.0012,4).translate(z+.0015,0,0),o),h.add(da([[0,0],[.0046,0],[.0046,.0024],[.0038,.0032],[0,.0032]],z+5e-4,C-.0145,-.0125,oe(40)),b),h.add(He(Ee([[.012,C-.004],[.012,C-.0165],[-.002,C-.0165],[-.002,C-.004]],.001,4),.0032,.001,4).translate(-(z+.0012),0,0),o),h.add(ye(.0022,.0105,.0078,8e-4,4).translate(-(z+.0028),C-.0075,5e-4),b),h.add(ye(.0022,.0062,.0062,8e-4,4).translate(-(z+.0028),C-.0118,-.0085),b),h.add($e(.0011,.0036,-(z+.0014),C-.0098,-.0038),v);{let V=[];for(let E=0;E<=30;E++){let D=E/30,J=.0292+.004*Math.sin(Math.PI*D)**.8+.001*D,$=.0335+.012*D+.002*Math.sin(Math.PI*D),ae=Ue(J,$,Math.min(.009,J/2-.001),8,0,0);V.push({z:D*.088,prof:ae,smooth:E>0})}let B=Je(V,{capStart:!1,capUV:"stack"});B=we.merge([B,ye(.026,.009,.012,.003,5).translate(0,-.0198,.007)]);let _=.52,ee=-.036,W=.06,Y=.088;h.add(B.rotateX(Math.PI/2-_).translate(0,ee,W),u),h.add(dt(.0035,0,0,0,1,"hex").rotateZ(-Math.PI/2).translate(0,ee-Y*Math.cos(_)+6e-4,W+Y*Math.sin(_)),v)}h.add(lt([[.0147,0],[.0196,0],[.0196,.0085],[.0188,.0092],[.0147,.0092]],.1275,0,oe(64)),o);for(let V=0;V<6;V++){let B=V/6*St;h.add(je(.0035,.0032,.0036).translate(0,.0185,0).rotateZ(B).translate(0,0,.1275-.0018),g)}h.add(Fe(.0205,.0022,0,0,Z.upperRear+.0016,oe(64)),b),h.add(Ve(Z.tubeR,Z.upperRear,.335,0,0,oe(64)),o),h.add(lt([[0,0],[.0135,0],[Z.tubeR,5e-4],[Z.tubeR,.002],[0,.002]],.335,0,oe(64)).translate(0,0,.002),o);for(let V=0;V<6;V++)h.add(Ut(.0032,.004,0,-Z.tubeR+4e-4,.165+V*.019,24),g);h.add(je(.006,.0025,.19).translate(0,-Z.tubeR+.0012,.235),o)}{let C=[[-.205,.0185],[-.33,.0215],[-.342,.016],[-.345,0],[-.345,-.088],[-.332,-.095],[-.3,-.088],[-.262,-.052],[-.236,-.018],[-.205,-.0185]],K=[[-.318,-.045],[-.318,-.067],[-.324,-.07],[-.33,-.067],[-.33,-.045],[-.324,-.042]];h.add(ps(C,.04,.004,[K],6),m),h.add(Ve(Z.tubeR+.0025,.203,.236,0,0,oe(64)),m),h.add(ye(.012,.0035,.032,.0012,4).translate(0,-Z.tubeR-.006,.224),m),h.add(ye(.009,.006,.0085,.0015,4).translate(0,-Z.tubeR-.0035,.2075),m),h.add($e(.0015,.0145,0,-Z.tubeR-.0075,.238),v),h.add(He(Ee([[-.345,0],[-.356,0],[-.357,-.09],[-.345,-.092]],.003,4),.042,.0035,4),p);for(let q=0;q<9;q++)h.add(je(.034,.0022,8e-4).translate(0,-.0835+q*.0095,.3568),p);h.add(da([[0,0],[.0062,0],[.0062,8e-4],[.0035,8e-4],[.0035,0],[0,0]],-.0201,-.0045,.2255,oe(40)),b),h.add($e(.0012,.0404,0,-.056,.324),v)}{let C=ks(Z.hgZ0-.002,Z.hgZ1+.002),K=[];for(let O=0;O<8;O++){let V=Z.hgZ0-.03-O*.04;K.push([V-.016,V+.016])}let q=qr(Z.hgZ0,Z.hgZ1,C,K,(O,V)=>Yo({cut:O,mlok:V}));h.add(Je(q,{capStart:!0,capEnd:!0,capUV:"stack"}),l),h.add(Ve(.0163,Z.hgZ0,Z.hgZ1,0,0,oe(48)).flipWinding(),g);for(let O of[-1,1])h.add(dt(.0028,O*.0196,-.0155,Z.hgZ0-.012,O,"hex"),x),h.add(dt(.0028,O*.0196,-.0155,Z.hgZ0-.022,O,"hex"),x);h.add(Fe(.0165,.001,0,0,Z.hgZ1-4e-4,oe(64)),g)}let L=Z.boltFace-Z.barrelLen-.054;{let C=Z.upperFront-.006;h.add(Ve(.0095,C,-.35,0,0,oe(64)),b),h.add(lt([[.0095,0],[.0095,.012],[.0089,.013],[.0089,.054],[.0062,.0545],[.0062,.062]],-.35-.045,0,oe(64)),b),h.add(Ve(.0089,-.395,Z.boltFace-Z.barrelLen+.001,0,0,oe(64)),b);let K=Z.boltFace-Z.barrelLen+5e-4;h.add(lt([[.0062,0],[.011,0],[.011,.0022],[.0062,.0022]],K+.0022,0,oe(64)),M);let q=lt([[.0075,0],[.011,.0025],[.0112,.012],[.0112,.048],[.0104,.0525],[.0066,.0545],[.0062,.0545],[.0062,0]],K,0,oe(72));h.add(q,b);for(let V=0;V<5;V++){let B=(V-2)*(St/7.2);h.add(ye(.0032,.006,.03,8e-4,4).translate(0,.0098,0).rotateZ(B).translate(0,0,K-.034),g)}h.add(Fe(.0062,6e-4,0,0,K-.044,oe(48)),b),h.add(Fe(.0029,8e-4,0,0,K-.0443,oe(32)),g);let O=-.372;h.add(bt(Ue(.023,.0253,.0025,6,0,85e-5),.03,.0012,4).translate(0,0,O),b);for(let V=0;V<2;V++)h.add(dt(.0022,0,0,0,1,"hex").rotateZ(-Math.PI/2).translate(0,-.0118,O-.007+V*.014),x);h.add(Ve(.0024,O-.012,Z.upperFront+.012,.0138,0,24),M),h.add($e(.0011,.0245,0,.0138,O+.003),v)}let I=.064,G=-.447;{h.add(bt(Ue(.025,.0121,.0018,5,0,Z.railTop+.00245),.034,8e-4,3).translate(0,0,.046+.001),o),h.add($e(.0022,.0252,0,Z.railTop+.0105,.046+.012),b);let K=[[-.0118,Z.railTop+.0085],[.0118,Z.railTop+.0085],[.0118,I+.0075],[.0085,I+.0098],[-.0085,I+.0098],[-.0118,I+.0075]];h.add(Br(K,.0042,.046,6e-4,[Mr(0,I,.0036,oe(20))]),b),h.add(Br(un(-.0068,-.0068,.0068,.0068,.0025,3),.0012,0,3e-4,[Mr(0,0,.0011,12)]).rotateX(-Math.PI/2).translate(0,Z.railTop+.0091,.046-.0095),b),h.add(da([[0,0],[.0062,0],[.0062,.012],[.0048,.0125],[0,.0125]],.0118,I-.001,.046,oe(40)),b);for(let V=0;V<10;V++){let B=V/10*St;h.add(je(.012,8e-4,.0025).translate(0,.0062,0).rotateX(B).translate(.0118+.006,I-.001,.046),x)}h.add(bt(Ue(.025,.0121,.0018,5,0,Z.railTop+.00245),.032,8e-4,3).translate(0,0,G),o),h.add($e(.0022,.0252,0,Z.railTop+.0105,G-.011),b);let q=Z.railTop+.0085,O=[[-.0112,q],[.0112,q],[.0112,I-.004],[.0062,I+.0075],[.004,I+.0075],[.0062,q+.004],[-.0062,q+.004],[-.004,I+.0075],[-.0062,I+.0075],[-.0112,I-.004]];h.add(bt(Ee(O,5e-4,3),.0046,6e-4,3).translate(0,0,G),b),h.add(Ut(.0046,.0052,0,q+.004+.0026,G,oe(40)),b);for(let V=0;V<12;V++){let B=V/12*St;h.add(je(7e-4,.0054,7e-4).translate(.0046,0,0).rotateY(B).translate(0,q+.004+.0026,G),x)}h.add(je(.0018,I-(q+.0092),.0018).translate(0,(I+q+.0092)/2,G),x),h.add(je(.0018,.0012,.0019).translate(0,I+6e-4,G),k)}{let C=[],K=[0,Z.seam+.004,-.039715],q=48,O=.205;for(let W=0;W<=q;W++){let Y=W/q*O,D=.17+Math.max(0,Y-.055)*2.1;if(W===0)C.push(K);else{let J=C[W-1],$=O/q;C.push([0,J[1]-Math.cos(D)*$,J[2]-Math.sin(D)*$])}}let V=(()=>{let W=new De,Y=.0114,E=.0282,D=.0038;return W.arc(Y-D,-E+D,D,-Math.PI/2,0,6),W.pt(Y,-.012).pt(Y+7e-4,-.0105,!0).pt(Y,-.009).pt(Y,.006).pt(Y+7e-4,.0075,!0).pt(Y,.009),W.arc(Y-D,E-D,D,0,Math.PI/2,6).arc(-Y+D,E-D,D,Math.PI/2,Math.PI,6),W.pt(-Y,.009).pt(-Y-7e-4,.0075,!0).pt(-Y,.006).pt(-Y,-.009).pt(-Y-7e-4,-.0105,!0).pt(-Y,-.012),W.arc(-Y+D,-E+D,D,Math.PI,Math.PI*1.5,6),W.done()})(),B=Dr(V,C,[0,0,1],W=>W>.955?[1.1,1.08]:W>.935?[1+(W-.935)*5,1+(W-.935)*4]:[1,1],{capStart:!1,capEnd:!0,capUV:"stack"});h.add(B,y,S),h.add(Pt(Ue(.0208,.05,.003,5),-.003,.004).rotateX(Math.PI/2+.17).translate(0,K[1]-.001,K[2]),new xe({name:"follower",baseColor:[.75,.22,.03,1],roughness:.6}),S);let _=At(.0448,.0095,Ce);h.add(_.rotateX(-Math.PI/2).translate(.0045,K[1]+.003,K[2]+.027),w,{...S,round:!0});let ee=C[C.length-1];h.add(Ut(.0032,.0012,0,ee[1]-4e-4,ee[2],24),y,S)}let j=Math.min(1,Math.max(.25,r/2048)),R=h.finish({bake:e.bake!==!1&&{rays:Math.round(32*j),aoScale:.25*j}});for(let C of h.bakes)console.info(`[oaxis] bake ${C.material}: ${C.texSize[0]}x${C.texSize[1]} @ ${C.texelMm.toFixed(2)} mm/texel in ${C.ms.toFixed(0)} ms`);let F=new Ae(n.dev,At(.0448,.0095,Ce)),N={triangles:h.triangles,buildMs:performance.now()-t};return console.info(`[oaxis] AR carbine: ${N.triangles.toLocaleString()} tris in ${N.buildMs.toFixed(0)} ms`),{model:{parts:R,muzzle:f.create(0,0,L),ejectionPort:f.create(.016,.012,-.02),rearSight:f.create(0,I,.046),frontSight:f.create(0,I,G),casingMesh:F,casingMaterial:w,magAxis:f.normalize(f.create(),f.create(0,-.985,-.17)),magBox:{center:f.create(0,-.145,-.07),half:f.create(.0125,.085,.032)},triggerTravelM:.003,selector:{pivot:[-(Z.lowerHW+.0016),Z.seam-.0092,.03],axis:[1,0,0],angles:{safe:0,semi:Math.PI/2,auto:Math.PI}},charge:{grip:f.create(-.03,.0235,Z.upperRear+.0105),travelM:.085,release:"boltRelease",pullDir:f.create(0,0,1)}},spec:Kr(I),grips:_r,stats:N}}var _r={right:{position:[.0305,-.049,.155],fingerDir:[0,-.33,-.94],dorsal:[1,0,0],fingers:[{curl:[.25,.55,.3],spread:.08},{curl:[1.3,1.3,.7]},{curl:[1.3,1.3,.7]},{curl:[1.3,1.25,.7]}],thumb:{dir:[-.6,-.6,-.5],bend:[.25,.15]}},indexPressed:{curl:[.35,.8,.45],spread:.06},left:{position:[-.064,-.047,-.278],fingerDir:[.8,.15,-.55],dorsal:[0,-1,0],fingers:[{curl:[1.1,1.15,.6]},{curl:[1.1,1.2,.6]},{curl:[1.1,1.2,.6]},{curl:[1.1,1.15,.6]}],thumb:{dir:[-.3,.7,-.6],bend:[.15,.1]}},leftOnMagazine:{position:[-.02,-.25,-.02],fingerDir:[.3,.3,-.9],dorsal:[-.2,-1,0],fingers:[{curl:[.9,.9,.4]},{curl:[.95,.9,.4]},{curl:[.95,.9,.4]},{curl:[.95,.9,.4]}],thumb:{dir:[-.7,.3,-.6],bend:[.2,.1]}}};function Kr(n=.064){return{name:"AR carbine 16in",caliber:Za["5.56x45 M855"],barrelLengthM:.406,massKg:3.3,rpm:760,fireModes:["safe","semi","auto"],magazineCapacity:30,sightHeightM:n,zeroM:50,accuracyMoa:1.5,recoil:{boreAboveShoulderM:.035,inertia:.24,shoulderMassKg:12,holdOmega:13,holdDamping:.72,horizontalRatio:.35,viewCouplingHip:.45,viewCouplingAds:.88,residualRise:.16},reload:{magOut:.55,magIn:.95,boltRelease:.35},audio:_a.rifle556_16in,flash:{kelvin:1900,luminance:6e5,sizeM:.15,lightCandela:25e3,sidePorts:!0,smoke:1},ejection:{speed:4.2,up:1.4,back:1.2,spinRad:28},hipOffset:[.12,-.135,-.34],eyeRelief:.075,adsTime:.26,drawTime:.6,action:{travelM:.089,backMs:9,returnMs:14,lockOpenOnEmpty:!0,lockFraction:.9}}}var Ts={"+x":[1,0,0],"-x":[-1,0,0],"+y":[0,1,0],"-y":[0,-1,0],"+z":[0,0,1],"-z":[0,0,-1]},Zo={slide:"slide|\\bbolt\\b|carrier",magazine:"\\bmag(azine)?\\b|mag_|magazine",trigger:"trigger",selector:"selector|safety|fire_?mode",charge:"charg(e|ing)",muzzle:"muzzle",ejectionPort:"eject|port",rearSight:"rear_?sight|sight_?rear|notch",frontSight:"front_?sight|sight_?front|post"},ma={pistol:{lengthM:.19,triggerZ:-.01,portBack:.012,triggerTravelM:.0045},carbine:{lengthM:.85,triggerZ:.015,portBack:.035,triggerTravelM:.003,chargeTravelM:.085},rifle:{lengthM:1,triggerZ:.015,portBack:.035,triggerTravelM:.003,chargeTravelM:.085}},$o=(n,e)=>[n[0]-e[0],n[1]-e[1],n[2]-e[2]],Tt=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],_t=(n,e)=>n[0]*e[0]+n[1]*e[1]+n[2]*e[2],zt=n=>{let e=Math.hypot(n[0],n[1],n[2])||1;return[n[0]/e,n[1]/e,n[2]/e]},zs=(n,e)=>[n[0]*e[0]+n[4]*e[1]+n[8]*e[2]+n[12],n[1]*e[0]+n[5]*e[1]+n[9]*e[2]+n[13],n[2]*e[0]+n[6]*e[1]+n[10]*e[2]+n[14]];function js(n){let e=n.slice(),t=[1,0,0,0,1,0,0,0,1];for(let r=0;r<48;r++){let s=0,i=1,o=Math.abs(e[1]);if(Math.abs(e[2])>o&&(s=0,i=2,o=Math.abs(e[2])),Math.abs(e[5])>o&&(s=1,i=2,o=Math.abs(e[5])),o<1e-14*(Math.abs(e[0])+Math.abs(e[4])+Math.abs(e[8])+1e-30))break;let c=.5*Math.atan2(2*e[s*3+i],e[i*3+i]-e[s*3+s]),l=Math.cos(c),b=Math.sin(c);for(let d=0;d<3;d++){let m=e[d*3+s],u=e[d*3+i];e[d*3+s]=l*m-b*u,e[d*3+i]=b*m+l*u}for(let d=0;d<3;d++){let m=e[s*3+d],u=e[i*3+d];e[s*3+d]=l*m-b*u,e[i*3+d]=b*m+l*u}for(let d=0;d<3;d++){let m=t[d*3+s],u=t[d*3+i];t[d*3+s]=l*m-b*u,t[d*3+i]=b*m+l*u}}return[0,1,2].sort((r,s)=>e[s*3+s]-e[r*3+r]).map(r=>zt([t[r],t[3+r],t[6+r]]))}function ec(n,e){let t=e?e.length/3:n.length/9,a=new Float32Array(t*3),r=new Float32Array(t);for(let s=0;s<t;s++){let i=(e?e[s*3]:s*3)*3,o=(e?e[s*3+1]:s*3+1)*3,c=(e?e[s*3+2]:s*3+2)*3,l=[n[o]-n[i],n[o+1]-n[i+1],n[o+2]-n[i+2]],b=[n[c]-n[i],n[c+1]-n[i+1],n[c+2]-n[i+2]],d=Tt(l,b);r[s]=.5*Math.hypot(d[0],d[1],d[2]),a[s*3]=(n[i]+n[o]+n[c])/3,a[s*3+1]=(n[i+1]+n[o+1]+n[c+1])/3,a[s*3+2]=(n[i+2]+n[o+2]+n[c+2])/3}return{c:a,w:r}}function tc(n,e){let t=e.length,a=0,r=[0,0,0];for(let te=0;te<t;te++)a+=e[te],r[0]+=n[te*3]*e[te],r[1]+=n[te*3+1]*e[te],r[2]+=n[te*3+2]*e[te];a=a||1,r[0]/=a,r[1]/=a,r[2]/=a;let s=[0,0,0,0,0,0,0,0,0];for(let te=0;te<t;te++){let ne=n[te*3]-r[0],me=n[te*3+1]-r[1],ve=n[te*3+2]-r[2],ge=e[te]/a;s[0]+=ne*ne*ge,s[1]+=ne*me*ge,s[2]+=ne*ve*ge,s[4]+=me*me*ge,s[5]+=me*ve*ge,s[8]+=ve*ve*ge}s[3]=s[1],s[6]=s[2],s[7]=s[5];let i=js(s)[2],o=!1,c=te=>{let ne=[0,1,2].reduce((me,ve)=>Math.abs(te[ve])>Math.abs(te[me])?ve:me,0);if(Math.abs(te[ne])>.985){o=!0;let me=[0,0,0];return me[ne]=Math.sign(te[ne]),me}return te};i=c(i);let l=Math.abs(i[0])<.9?[1,0,0]:[0,1,0],b=zt(Tt(i,l)),d=zt(Tt(i,b)),m=Math.max(1,Math.ceil(t/6e4)),u=[],y=[];for(let te=0;te<t;te+=m){let ne=[n[te*3],n[te*3+1],n[te*3+2]];u.push(_t(ne,b)),y.push(_t(ne,d))}let p=te=>{let ne=Math.cos(te),me=Math.sin(te),ve=1/0,ge=-1/0,Oe=1/0,Be=-1/0;for(let tt=0;tt<u.length;tt++){let Qe=ne*u[tt]+me*y[tt],Se=-me*u[tt]+ne*y[tt];Qe<ve&&(ve=Qe),Qe>ge&&(ge=Qe),Se<Oe&&(Oe=Se),Se>Be&&(Be=Se)}return{area:(ge-ve)*(Be-Oe),du:ge-ve,dv:Be-Oe}},w={th:0,...p(0)};for(let te=1;te<180;te++){let ne=te*Math.PI/180,me=p(ne);me.area<w.area&&(w={th:ne,...me})}for(let te=-9;te<=9;te++){let ne=w.th+te*Math.PI/1800,me=p(ne);me.area<w.area&&(w={th:ne,...me})}let x=Math.cos(w.th),M=Math.sin(w.th),v=[x*b[0]+M*d[0],x*b[1]+M*d[1],x*b[2]+M*d[2]],g=[-M*b[0]+x*d[0],-M*b[1]+x*d[1],-M*b[2]+x*d[2]],k=w.du>=w.dv?v:g,h=w.du>=w.dv?g:v;k=c(k),h=zt(Tt(i,k)),h=c(h),k=zt(Tt(h,i));let A=new Float32Array(t),P=new Float32Array(t),S=1/0,T=-1/0,z=1/0,L=-1/0;for(let te=0;te<t;te++){let ne=[n[te*3],n[te*3+1],n[te*3+2]];A[te]=_t(ne,k),P[te]=_t(ne,h),S=Math.min(S,A[te]),T=Math.max(T,A[te]),z=Math.min(z,P[te]),L=Math.max(L,P[te])}let I=20,G=new Float32Array(I).fill(1/0),j=new Float32Array(I).fill(-1/0);for(let te=0;te<t;te++){let ne=Math.min(I-1,Math.floor((P[te]-z)/(L-z||1)*I));G[ne]=Math.min(G[ne],A[te]),j[ne]=Math.max(j[ne],A[te])}let R=(te,ne)=>{let me=0,ve=0;for(let ge=te;ge<ne;ge++)j[ge]>G[ge]&&(me+=j[ge]-G[ge],ve++);return ve?me/ve:0};R(0,6)>R(I-6,I)&&(h=[-h[0],-h[1],-h[2]]);let F=T-S,N=1/0,C=-1/0,K=1/0,q=-1/0;for(let te=0;te<t;te++)A[te]<S+.2*F&&(N=Math.min(N,P[te]),C=Math.max(C,P[te])),A[te]>T-.2*F&&(K=Math.min(K,P[te]),q=Math.max(q,P[te]));let O=0,V=0,B=z+.22*(L-z),_=R(0,6)<=R(I-6,I);for(let te=0;te<t;te++)(_?P[te]<B:P[te]>L-.22*(L-z))&&(O+=A[te],V++);let ee=V?O/V:(S+T)/2,W=ee-S,Y=T-ee,E=0,D=0;for(let te=0;te<t;te++)A[te]<S+.08*F?E+=e[te]:A[te]>T-.08*F&&(D+=e[te]);let J=Math.max(1e-12,E),$=Math.max(1e-12,D),ae=Math.max(J,$)/Math.min(J,$),se,de,be=te=>`${Math.round(te/F*100)}%`;ae>=1.35?(se=J<$,de=`the butt end has ${ae.toFixed(1)}\xD7 the surface of the muzzle end`):Math.abs(W-Y)>.06*F?(se=W>Y,de=`grip/magazine ${be(Math.min(W,Y))} from the rear, ${be(Math.max(W,Y))} from the muzzle`):(se=C-N<q-K,de="thinner end (weak cue)"),se&&(k=[-k[0],-k[1],-k[2]]),de+=` [end surface ratio ${($/J).toFixed(2)}, grip ${be(W)}/${be(Y)}, 20% ends ${((C-N)/F).toFixed(2)}/${((q-K)/F).toFixed(2)} L]`;let pe=[-k[0],-k[1],-k[2]],Le=h;return{ex:zt(Tt(Le,pe)),ey:Le,ez:pe,snapped:o,why:de}}function Gs(n){let e=[1/0,1/0,1/0],t=[-1/0,-1/0,-1/0];for(let a=0;a<n.length;a+=3)for(let r=0;r<3;r++){let s=n[a+r];s<e[r]&&(e[r]=s),s>t[r]&&(t[r]=s)}return{min:e,max:t}}function ac(n){let e=n.length/3,t=[0,0,0];for(let s=0;s<n.length;s+=3)t[0]+=n[s],t[1]+=n[s+1],t[2]+=n[s+2];t[0]/=e||1,t[1]/=e||1,t[2]/=e||1;let a=[0,0,0,0,0,0,0,0,0];for(let s=0;s<n.length;s+=3){let i=n[s]-t[0],o=n[s+1]-t[1],c=n[s+2]-t[2];a[0]+=i*i,a[1]+=i*o,a[2]+=i*c,a[4]+=o*o,a[5]+=o*c,a[8]+=c*c}a[3]=a[1],a[6]=a[2],a[7]=a[5];let r=js(a)[0];return r[1]>0?[-r[0],-r[1],-r[2]]:r}function Fs(n,e){for(let t of n){let a=t.pos,r=t.idx?t.idx.length:a.length/3;for(let s=0;s+2<r;s+=3){let i=(t.idx?t.idx[s]:s)*3,o=(t.idx?t.idx[s+1]:s+1)*3,c=(t.idx?t.idx[s+2]:s+2)*3;e(a[i],a[i+1],a[i+2],a[o],a[o+1],a[o+2]),e(a[o],a[o+1],a[o+2],a[c],a[c+1],a[c+2]),e(a[c],a[c+1],a[c+2],a[i],a[i+1],a[i+2])}}}function Jr(n,e,t,a,r){let s=-1/0,i=1/0,o=0;return Fs(n,(c,l,b,d,m,u)=>{if((l-e)*(m-e)>0||l===m)return;let y=(e-l)/(m-l),p=b+(u-b)*y;if(p<t||p>a)return;let w=Math.abs(c+(d-c)*y-r);p>s&&(s=p),p<i&&(i=p),w>o&&(o=w)}),{back:s,front:i,hw:o}}function Rs(n,e,t={}){let a=n.reduce((O,V)=>O+V.pos.length,0),r=new Float32Array(a);{let O=0;for(let V of n)r.set(V.pos,O),O+=V.pos.length}let{min:s,max:i}=Gs(r),o=i[2]-s[2],c=i[1]-s[1],l=0,b=0,d=0;for(let O=0;O<r.length;O+=3)r[O+2]<s[2]+.04*o&&(l+=r[O],b+=r[O+1],d++);l/=d||1,b/=d||1;let m=e??(o/c>2.2?"carbine":"pistol"),u=m!=="pistol",y=60,p=o/y,w=new Float32Array(y).fill(1/0),x=new Float32Array(y).fill(-1/0),M=new Float32Array(y),v=O=>s[2]+(O+.5)*p,g=O=>Math.max(0,Math.min(y-1,Math.floor((O-s[2])/p))),k=(O,V,B)=>{V-=b,B=Math.abs(B-l),V<w[O]&&(w[O]=V),V>x[O]&&(x[O]=V),B>M[O]&&(M[O]=B)};Fs(n,(O,V,B,_,ee,W)=>{let Y=g(B),E=g(W);if(k(Y,V,O),k(E,ee,_),Math.abs(Y-E)<2)return;let D=Math.min(Y,E),J=Math.max(Y,E);for(let $=D+1;$<J;$++){let ae=(v($)-B)/(W-B);k($,V+(ee-V)*ae,O+(_-O)*ae)}});let h=s[1]-b,A=[];for(let O=0;O<y;O++){if(!(w[O]<.5*h))continue;let V=A[A.length-1];V&&O-V.b1<=2?V.b1=O:A.push({b0:O,b1:O})}let P=null,S=null;if(A.length){let O=A[A.length-1];(O.b1-O.b0+1)*p>.12&&(O={b0:O.b0,b1:O.b0+Math.ceil(.06/p)});let V=s[2]+O.b0*p,B=s[2]+(O.b1+1)*p,_=1/0;for(let ge=O.b0;ge<=O.b1;ge++)_=Math.min(_,w[ge]);let ee=Math.min(_+.088,.2*h-.005),W=12,Y=_+.012,E=ee-.004,D=0,J=0,$=0,ae=0,se=0;for(let ge=0;ge<W;ge++){let Oe=Y+(ge+.5)/W*(E-Y),Be=Jr(n,Oe+b,V-.015,B+.03,l);isFinite(Be.back)&&(D++,J+=Oe,$+=Be.back,ae+=Oe*Oe,se+=Oe*Be.back)}let de=D*ae-J*J,be=D>=4&&Math.abs(de)>1e-12?Math.atan(-(D*se-J*$)/de):.3;be=Math.max(0,Math.min(.6,be));let pe=Jr(n,ee+b,V-.015,B+.03,l),Le=isFinite(pe.back)?pe.back:B,Re=isFinite(pe.front)?pe.front:V,te=pe.hw>0?pe.hw:.015,ne=Jr(n,ee-.085*Math.sin(be)+b,V-.005,B+.03,l),me=isFinite(ne.front)?ne.front:Re;P={z0:V,z1:B,bottom:_,top:.2*h,yWrist:ee,zBack:Le,zFront:Re,zFrontKnuckle:me,halfWidth:te,rake:be};let ve=A.length>1?A[A.length-2]:null;if(ve&&u){let ge=s[2]+ve.b0*p,Oe=s[2]+(ve.b1+1)*p,Be=1/0;for(let Se=ve.b0;Se<=ve.b1;Se++)Be=Math.min(Be,w[Se]);let tt=0,Qe=0;for(let Se=0;Se<r.length;Se+=3)r[Se+2]>=ge&&r[Se+2]<=Oe&&r[Se+1]-b<Be+.015&&(tt+=r[Se+2],Qe++);S={z0:ge,z1:Oe,bottom:Be,zBottom:Qe?tt/Qe:(ge+Oe)/2}}}if(t.magazine){let O=t.magazine,V=0,B=0;for(let _=0;_<O.pos.length;_+=3)O.pos[_+1]<O.min[1]+.015&&(V+=O.pos[_+2],B++);S={z0:O.min[2],z1:O.max[2],bottom:O.min[1]-b,zBottom:B?V/B:O.center[2]}}let T=P?P.z0:s[2]+.6*o,z=t.trigger?[t.trigger[0],t.trigger[1]-b,t.trigger[2]]:[l,-.04,T-(u?.055:.04)],L=1/0;for(let O=0;O<r.length;O+=3)Math.abs(r[O]-l)<.012&&Math.abs(r[O+1]-b)<.012&&r[O+2]<L&&(L=r[O+2]);let I=[l,b,isFinite(L)?L:s[2]],G=(s[2]+i[2])/2,j=(O,V,B)=>{let _=g(O),ee=g(V),W=-1/0;for(let E=_;E<=ee;E++)W=Math.max(W,x[E]);let Y=B?_:ee;if(B){for(let E=ee;E>=_;E--)if(x[E]>=W-.002){Y=E;break}}else for(let E=_;E<=ee;E++)if(x[E]>=W-.002){Y=E;break}return[l,b+W,v(Y)]},R=u?j(G-.1*o,i[2]-.25*o,!0):j(G,i[2],!0),F=j(s[2],s[2]+.25*o,!1);u||(R=[R[0],R[1]-.0015,R[2]],F=[F[0],F[1]-.001,F[2]]);let N=null;if(u){let O=[];for(let W=0;W<y;W++)isFinite(x[W])&&x[W]>0&&O.push(x[W]);O.sort((W,Y)=>W-Y);let V=O.length?O[Math.floor(O.length*.3)]:0,B=[];for(let W=0;W<y;W++)x[W]-V>.028&&B.push(W);let _=null,ee=-1;for(let W=0;W<=B.length;W++){if(W<B.length&&(W===0||B[W]===B[W-1]+1)){ee<0&&(ee=B[W]);continue}if(ee>=0){let Y=B[W-1];(!_||Y-ee>_[1]-_[0])&&(_=[ee,Y])}ee=W<B.length?B[W]:-1}if(_&&(_[1]-_[0]+1)*p>.08){let W=D=>x[D]-Math.min(M[D],.6*(x[D]-V)),Y=_[1],E=_[0];R=[l,b+W(Y),v(Y)+p*.5],F=[l,b+W(E),v(E)-p*.5],N={z0:v(E),z1:v(Y),railY:V}}}let C=z[2]-ma[m].portBack,K=[l+Math.max(.008,M[g(C)]-.003),b+.012,C],q=null;if(u){let O=S?S.z0:T-.1,V=Math.max(s[2]+.12,Math.min(O-.06,O-.145)),B=g(V),_=1/0,ee=0;for(let W=Math.max(0,B-1);W<=Math.min(y-1,B+1);W++)_=Math.min(_,w[W]),ee=Math.max(ee,M[W]);q={z:V,floor:isFinite(_)?_:-.02,halfWidth:ee||.02}}return t.charge,{kind:m,min:s,max:i,bore:[l,b],muzzle:I,rearSight:R,frontSight:F,ejectionPort:K,grip:P,mag:S,trigger:z,handguard:q,optic:N,length:o,height:c}}var rc=[{curl:[.5,.7,.3],spread:.1},{curl:[1.25,1.35,.7]},{curl:[1.3,1.35,.7]},{curl:[1.35,1.3,.7]}],nc=[{curl:[.25,.55,.3],spread:.08},{curl:[1.3,1.3,.7]},{curl:[1.3,1.3,.7]},{curl:[1.3,1.25,.7]}],Ls=[{curl:[1.15,1.2,.6]},{curl:[1.2,1.2,.6]},{curl:[1.2,1.2,.6]},{curl:[1.2,1.15,.6]}],sc=[{curl:[.9,.9,.4]},{curl:[.95,.9,.4]},{curl:[.95,.9,.4]},{curl:[.95,.9,.4]}],or=n=>n.map(e=>({...e,curl:[...e.curl]}));function ic(n){let e=n.grip;if(!e)return null;let t=n.kind!=="pistol",a=e.rake,r={position:[e.halfWidth+.013,e.yWrist,e.zFrontKnuckle+.013+.085*Math.cos(a)],fingerDir:[0,-Math.sin(a),-Math.cos(a)],dorsal:[1,0,0],fingers:or(t?nc:rc),thumb:t?{dir:[-.6,-.6,-.5],bend:[.25,.15]}:{dir:[-.55,-.55,-.62],bend:[.15,.1]}},s;if(t&&n.handguard){let l=n.handguard;s={position:[-(l.halfWidth+.044),l.floor-.026,l.z],fingerDir:[.8,.15,-.55],dorsal:[0,-1,0],fingers:or(Ls),thumb:{dir:[-.3,.7,-.6],bend:[.15,.1]}}}else{let l=a+.21;s={position:[-(e.halfWidth+.018),e.yWrist,r.position[2]-.043],fingerDir:[0,-Math.sin(l),-Math.cos(l)],dorsal:[-1,0,0],fingers:or(Ls),thumb:{dir:[-.5,-.1,-.86],bend:[.05,.05]}}}let i=n.mag?n.mag.bottom:e.bottom,o;n.mag?o=n.mag.zBottom:o=(e.zFront+e.zBack)/2+Math.tan(a)*(e.yWrist-e.bottom)*.5;let c={position:[-.01,i-.027,o+.055],fingerDir:[.15,.27,-.95],dorsal:[-.1,-1,0],fingers:or(sc),thumb:{dir:[-.7,.25,-.6],bend:[.2,.1]}};return{right:r,left:s,indexPressed:t?{curl:[.35,.8,.45],spread:.06}:{curl:[.55,.95,.45],spread:.08},leftOnMagazine:c}}function Xr(n,e,t={},a){let r=[],s=[],i=E=>new RegExp(t[E]??Zo[E],"i"),o=E=>{let D=e.drawables[E],J=e.asset.nodes[D.node];return`${J.name} ${J.mesh!==void 0?e.asset.meshes[J.mesh].name:""} ${D.material.name}`},c=E=>/(^|\s)(muzzle|ejection|rear_?sight_?marker|front_?sight_?marker|socket)/i.test(e.asset.nodes[e.drawables[E].node].name)&&e.drawables[E].mesh.indexCount<=36,l=e.drawables.map((E,D)=>{if(c(D))return null;let J=E.primitive.positions,$=new Float32Array(J.length);for(let ae=0;ae<J.length;ae+=3){let se=zs(E.world,[J[ae],J[ae+1],J[ae+2]]);$[ae]=se[0],$[ae+1]=se[1],$[ae+2]=se[2]}return $}),b=l.reduce((E,D)=>E+(D?D.length:0),0),d=new Float32Array(b);{let E=0;for(let D of l)D&&(d.set(D,E),E+=D.length)}let m,u,y;if(t.forward||t.up||!t.autoOrient){let E=Ts[t.forward??"-z"],D=Ts[t.up??"+y"];y=[-E[0],-E[1],-E[2]],u=[D[0],D[1],D[2]],m=zt(Tt(u,y))}else{let E=[],D=[];l.forEach((se,de)=>{if(!se)return;let{c:be,w:pe}=ec(se,e.drawables[de].primitive.indices??null);E.push(be),D.push(pe)});let J=new Float32Array(E.reduce((se,de)=>se+de.length,0)),$=new Float32Array(D.reduce((se,de)=>se+de.length,0));{let se=0,de=0;for(let be=0;be<E.length;be++)J.set(E[be],se),se+=E[be].length,$.set(D[be],de),de+=D[be].length}let ae=tc(J,$);m=ae.ex,u=ae.ey,y=ae.ez,s.push(`orientation from principal axes (forward ${Is([-y[0],-y[1],-y[2]])}, up ${Is(u)}${ae.snapped?"":", not axis-aligned"}; muzzle end from: ${ae.why})${t.reverse?" \u2014 reversed by the mapping":""}`)}t.reverse&&(y=[-y[0],-y[1],-y[2]],m=zt(Tt(u,y)));let p=U.create();p[0]=m[0],p[4]=m[1],p[8]=m[2],p[1]=u[0],p[5]=u[1],p[9]=u[2],p[2]=y[0],p[6]=y[1],p[10]=y[2];let w=(()=>{let E=1/0,D=-1/0;for(let J=0;J<d.length;J+=3){let $=_t([d[J],d[J+1],d[J+2]],y);E=Math.min(E,$),D=Math.max(D,$)}return Math.max(D-E,1e-6)})(),x=t.kind,M=t.scale??1;if(t.lengthM)M=t.lengthM/w;else if(t.scale===void 0&&t.autoOrient){if(!x){let $=1/0,ae=-1/0;for(let se=0;se<d.length;se+=3){let de=_t([d[se],d[se+1],d[se+2]],u);$=Math.min($,de),ae=Math.max(ae,de)}x=w/Math.max(ae-$,1e-6)>2.2?"carbine":"pistol",s.push(`kind "${x}" from the proportions`)}let E=x==="pistol"?[.13,.32]:x==="carbine"?[.6,1.25]:[.75,1.6],J=[[1,"m"],[.01,"cm"],[.001,"mm"],[.0254,"in"],[.1,"dm"]].find(([$])=>w*$>=E[0]&&w*$<=E[1]);if(J)M=J[0],s.push(`units ${J[1]} (overall length ${(w*M).toFixed(3)} m)`);else{let $=t.nominalLengthM??ma[x].lengthM;M=$/w,s.push(`scale ${M.toPrecision(4)} (units not recognised; fitted to ${$} m for a ${x})`)}}let v=U.multiply(U.create(),p,U.fromScaling(U.create(),[M,M,M])),g=[],k=new Float32Array(b);{let E=0;l.forEach((D,J)=>{if(!D)return;let $=new Float32Array(D.length);for(let se=0;se<D.length;se+=3){let de=zs(v,[D[se],D[se+1],D[se+2]]);$[se]=de[0],$[se+1]=de[1],$[se+2]=de[2]}k.set($,E),E+=$.length;let ae=Gs($);g.push({i:J,...ae,size:$o(ae.max,ae.min),center:[(ae.min[0]+ae.max[0])/2,(ae.min[1]+ae.max[1])/2,(ae.min[2]+ae.max[2])/2],tris:e.drawables[J].mesh.indexCount/3,name:o(J),pos:$,idx:e.drawables[J].primitive.indices??null})})}let h=g.map(E=>({bolt:i("slide").test(E.name),magazine:i("magazine").test(E.name),trigger:i("trigger").test(E.name),selector:i("selector").test(E.name),charge:i("charge").test(E.name)})),A=E=>h.some(D=>D[E]),P=Rs(g,x,{});x=P.kind;let[S,T]=P.bore,z=P.length,L=P.min[1]-T,I=x!=="pistol",G=g.reduce((E,D)=>D.tris>(E?.tris??-1)?D:E,null);if(!A("bolt")&&!I&&g.length>1){let D=g.filter(J=>J.center[1]>T-.004&&J.min[1]>T-.03&&J.size[2]>.5*z).sort((J,$)=>$.size[2]-J.size[2])[0];if(D){h[g.indexOf(D)].bolt=!0;for(let J of g)J!==D&&J.size[2]<.12*z&&J.min[1]>D.center[1]&&J.min[2]>D.min[2]-.005&&J.max[2]<D.max[2]+.005&&(h[g.indexOf(J)].bolt=!0);s.push(`slide = "${D.name.trim()}" (+ ${h.filter(J=>J.bolt).length-1} small meshes riding on it)`)}}if(!A("charge")&&I&&g.length>1){let E=(P.min[2]+P.max[2])/2,J=g.filter($=>$.min[1]>T+.01&&$.center[2]>E&&$.size[2]>.05*z&&$.size[2]<.2*z&&$.size[1]<.025&&$.size[0]<.08).sort(($,ae)=>ae.max[2]-$.max[2])[0];J&&(h[g.indexOf(J)].charge=!0,s.push(`charging handle = "${J.name.trim()}"`))}if(!A("magazine")&&g.length>1){let D=g.filter(J=>J!==G&&J.max[1]<T+.005&&J.size[1]>.35*-L&&J.size[2]<.3*z&&J.size[1]/Math.max(J.size[2],1e-6)>1.2).sort((J,$)=>J.min[1]-$.min[1])[0];D&&(h[g.indexOf(D)].magazine=!0,s.push(`magazine = "${D.name.trim()}"`))}if(!A("trigger")&&g.length>1&&P.grip){let E=P.grip.z0,J=g.filter($=>$.size[0]<.035&&$.size[1]<.035&&$.size[2]<.035&&$.size[1]>.008&&$.center[1]-T>-.07&&$.center[1]-T<-.02&&$.center[2]>E-.075&&$.center[2]<E).sort(($,ae)=>ae.size[1]-$.size[1])[0];J&&(h[g.indexOf(J)].trigger=!0,s.push(`trigger = "${J.name.trim()}"`))}let j=g.find(E=>h[g.indexOf(E)].magazine)??null,R=g.find(E=>h[g.indexOf(E)].trigger)??null,F=g.find(E=>h[g.indexOf(E)].charge)??null,N=Rs(g,x,{trigger:R?R.center:null,magazine:j,charge:F}),C=[-S,-T,ma[x].triggerZ-N.trigger[2]],K=U.multiply(U.create(),U.fromTranslation(U.create(),C),v),q=E=>f.create(E[0]+C[0],E[1]+C[1],E[2]+C[2]),O=E=>[E[0]+C[0],E[1]+C[1],E[2]+C[2]];N.muzzle=O(N.muzzle),N.rearSight=O(N.rearSight),N.frontSight=O(N.frontSight),N.ejectionPort=O(N.ejectionPort),N.min=O(N.min),N.max=O(N.max),N.trigger=[N.trigger[0]+C[0],N.trigger[1],N.trigger[2]+C[2]],N.grip&&(N.grip.z0+=C[2],N.grip.z1+=C[2],N.grip.zBack+=C[2],N.grip.zFront+=C[2],N.grip.zFrontKnuckle+=C[2]),N.mag&&(N.mag.z0+=C[2],N.mag.z1+=C[2],N.mag.zBottom+=C[2]),N.handguard&&(N.handguard.z+=C[2]),N.bore=[0,0];let V=g.map((E,D)=>{let J=e.drawables[E.i],$=U.multiply(U.create(),K,J.world),ae=h[D];return{object:new Te(J.mesh,J.material),local:$,bolt:ae.bolt||void 0,magazine:ae.magazine||void 0,trigger:ae.trigger||void 0,selector:ae.selector||void 0,charge:ae.charge||void 0}}),B=E=>{let D=t.sockets?.[E];if(D)return f.create(D[0],D[1],D[2]);let J=i(E),$=e.asset.nodes.findIndex(ae=>J.test(ae.name));if($>=0){let ae=e.nodeWorld[$];return f.transformMat4(f.create(),[ae[12],ae[13],ae[14]],K)}return s.push(`${E} socket from the geometry`),f.create(N[E][0],N[E][1],N[E][2])},_=t.casing?.lengthM??(I?.0448:.019),ee=t.casing?.diameterM??(I?.0095:.0099),W={parts:V,muzzle:B("muzzle"),ejectionPort:B("ejectionPort"),rearSight:B("rearSight"),frontSight:B("frontSight"),casingMesh:new Ae(n.dev,At(_,ee,Ce,{straight:t.casing?.straight??!I})),casingMaterial:n.synth.material("brass",{size:512,tileMeters:.03,seed:5},{name:"brass"})};if(t.magAxis)W.magAxis=f.normalize(f.create(),f.create(...t.magAxis));else if(j){let E=ac(j.pos);E[1]<-.7&&(W.magAxis=f.create(E[0],E[1],E[2]),s.push("magAxis from the magazine's long axis"))}if(!W.magAxis){let E=N.grip?.rake??.3;W.magAxis=I?f.create(0,-.985,-.17):f.create(0,-Math.cos(E),Math.sin(E))}if(t.magBox?W.magBox={center:f.create(...t.magBox.center),half:f.create(...t.magBox.half)}:j?W.magBox={center:q(j.center),half:f.create(j.size[0]/2,j.size[1]/2,j.size[2]/2)}:N.mag&&(W.magBox={center:f.create(0,(N.mag.bottom+.4*L)/2,(N.mag.z0+N.mag.z1)/2),half:f.create(.013,(.4*L-N.mag.bottom)/2,(N.mag.z1-N.mag.z0)/2)}),t.triggerTravelM!==void 0?W.triggerTravelM=t.triggerTravelM:R&&(W.triggerTravelM=ma[x].triggerTravelM),t.chargeContract){let E=t.chargeContract;W.charge={grip:f.create(...E.grip),travelM:E.travelM,release:E.release,pullDir:E.pullDir?f.create(...E.pullDir):void 0}}else if(t.chargeContract!==!1&&I){let E=ma[x].chargeTravelM;if(F)W.charge={grip:q([F.min[0]+.005,F.center[1],F.max[2]-.011]),travelM:E,release:"boltRelease",pullDir:f.create(0,0,1)};else if(N.grip){let D=N.grip.zBack,J=-1/0;for(let $=0;$<k.length;$+=3)Math.abs(k[$+2]+C[2]-D)<.01&&(J=Math.max(J,k[$+1]-T));W.charge={grip:f.create(-.03,(isFinite(J)?J:N.rearSight[1])-.007,D+.002),travelM:E,release:"boltRelease",pullDir:f.create(0,0,1)},s.push("charging handle position (rear of the receiver)")}}let Y=a??t.grips;if(!Y&&t.autoGrips!==!1){let E=ic(N);E?(Y=E,s.push("grips from the grip column"+(I?" and handguard":""))):r.push("no pistol grip found below the bore \u2014 pass mapping.grips")}return s.length&&r.push(`guessed: ${s.join("; ")}`),!V.some(E=>E.bolt)&&!I&&r.push('no slide part (one mesh?) \u2014 the action will not animate; name it "slide" or split the mesh'),V.some(E=>E.magazine)||r.push("no magazine part \u2014 reloads will not show the magazine"),V.some(E=>E.trigger)||r.push("no trigger part \u2014 the trigger will not move"),{model:W,grips:Y,warnings:r,analysis:N,kind:x}}function Is(n){let e=[0,1,2].reduce((a,r)=>Math.abs(n[r])>Math.abs(n[a])?r:a,0),t=(n[e]>=0?"+":"-")+"xyz"[e];return Math.abs(n[e])>.985?t:`\u2248${t} [${n.map(a=>a.toFixed(2)).join(", ")}]`}function Us(n){if(/pistol|handgun|sidearm|9mm/i.test(n))return"pistol";if(/carbine|rifle|\bar-?15\b|\bm4\b|\bak\b/i.test(n))return"carbine"}function Es(n,e){return n==="pistol"?Wr(e):Kr(e)}async function Os(n,e,t,a={}){if(!e?.hasModel(t))return null;let r=await e.model(t,!0);if(!r)return null;let s={kind:Us(t),autoOrient:!0,...await e.weaponMapping(t),...a},i=Xr(n,r,s),o=e.modelEntry(t),c=Es(i.kind,i.model.rearSight[1]);return o?.title&&(c.name=o.title),{model:i.model,spec:c,grips:i.grips,warnings:i.warnings,kind:i.kind,slot:t,title:o?.title??t,analysis:i.analysis}}async function Ns(n,e,t={}){let a=await er(e),r=Wt(n,a,{keepSource:!0}),s=Xr(n,r,{kind:Us(e),autoOrient:!0,...t}),i=e.split("/").pop()??e,o=Es(s.kind,s.model.rearSight[1]);return o.name=i,{model:s.model,spec:o,grips:s.grips,warnings:s.warnings,kind:s.kind,slot:e,title:i,analysis:s.analysis}}var Xe=[{base:[-.029,.003,-.089],len:[.044,.026,.023],r:[.0092,.0083,.0076]},{base:[-.009,.004,-.092],len:[.048,.029,.024],r:[.0094,.0085,.0078]},{base:[.011,.003,-.089],len:[.045,.028,.023],r:[.009,.0082,.0075]},{base:[.029,.001,-.08],len:[.036,.02,.021],r:[.008,.0073,.0068]}],ze={base:[-.03,-.006,-.022],len:[.044,.032,.027],r:[.0115,.01,.009]},Yr=[[-.016,.003,-.03],[-.004,.004,-.032],[.008,.003,-.03],[.018,.001,-.028]],Pe={z0:-.012,z1:-.08,w0:.028,w1:.041,t0:.013,t1:.0105,cup:.003},Qr=[[-.07,.026,.009],[-.035,.029,.015],[0,.029,.0185],[.04,.031,.023],[.1,.036,.03],[.18,.044,.04],[.24,.042,.039],[.3,.038,.036]],_s=[{curl:[.18,.22,.12],spread:.12},{curl:[.2,.25,.12],spread:.03},{curl:[.22,.27,.14],spread:-.06},{curl:[.25,.3,.15],spread:-.14}],lr={dir:[-.45,-.33,-.83],bend:[.2,.15]},ie={root:0,finger:(n,e)=>1+n*3+e,thumb:n=>13+n,foreA:16,foreB:17,count:18};function et(n,e,t=X.create()){let a=f.normalize(f.create(),f.set(f.create(),-n[0],-n[1],-n[2])),r=f.set(f.create(),e[0],e[1],e[2]),s=f.normalize(f.create(),f.scaleAndAdd(f.create(),r,a,-f.dot(r,a))),i=f.cross(f.create(),s,a),o=U.create();return o[0]=i[0],o[1]=i[1],o[2]=i[2],o[4]=s[0],o[5]=s[1],o[6]=s[2],o[8]=a[0],o[9]=a[1],o[10]=a[2],U.getRotation(t,o)}function mt(n,e,t,a){let r=a??Array.from({length:ie.count},()=>({p:f.create(),q:X.create()}));f.set(r[0].p,0,0,0),X.identity(r[0].q);let s=f.create(),i=X.create();Xe.forEach((b,d)=>{let m=n[d],u=f.set(f.create(),b.base[0]*t,b.base[1],b.base[2]),y=X.fromEuler(X.create(),0,(m.spread??0)*t,0);for(let p=0;p<3;p++){X.multiply(y,y,X.fromEuler(i,-m.curl[p],0,0));let w=r[ie.finger(d,p)];f.copy(w.p,u),X.copy(w.q,y),f.add(u,u,f.transformQuat(s,[0,0,-b.len[p]],y))}});let o=f.normalize(f.create(),f.set(f.create(),e.dir[0]*t,e.dir[1],e.dir[2])),c=et(o,[0,1,0]);e.twist&&X.multiply(c,c,X.setAxisAngle(i,[0,0,1],e.twist*t));let l=f.set(f.create(),ze.base[0]*t,ze.base[1],ze.base[2]);for(let b=0;b<3;b++){b>0&&X.multiply(c,c,X.fromEuler(i,-e.bend[b-1],0,0));let d=r[ie.thumb(b)];f.copy(d.p,l),X.copy(d.q,c),f.add(l,l,f.transformQuat(s,[0,0,-ze.len[b]],c))}return r}var Cs=0,Bs=1,Ds=2,oc=3,Vs=4,Hs=20,Zr=class{kind=[];k=[];prm=[];bmin=[];bmax=[];clipZ=1/0;n=0;push(e,t,a,r,s){this.kind.push(e),this.k.push(t);for(let i=0;i<Hs;i++)this.prm.push(a[i]??0);this.bmin.push(...r),this.bmax.push(...s),this.n++}roundCone(e,t,a,r,s){let i=[t[0]-e[0],t[1]-e[1],t[2]-e[2]],o=i[0]*i[0]+i[1]*i[1]+i[2]*i[2],c=a-r,l=o-c*c,b=1/o,d=Math.max(a,r);this.push(Cs,s,[e[0],e[1],e[2],t[0],t[1],t[2],a,r,i[0],i[1],i[2],o,c,l,b],[Math.min(e[0],t[0])-d,Math.min(e[1],t[1])-d,Math.min(e[2],t[2])-d],[Math.max(e[0],t[0])+d,Math.max(e[1],t[1])+d,Math.max(e[2],t[2])+d])}sphere(e,t,a){this.push(Vs,a,[e[0],e[1],e[2],t],[e[0]-t,e[1]-t,e[2]-t],[e[0]+t,e[1]+t,e[2]+t])}ellipsoid(e,t,a,r=[0,0,-1],s=[0,1,0]){let i=et(r,s),o=U.fromQuat(U.create(),i),c=Math.max(...t);this.push(Bs,a,[e[0],e[1],e[2],t[0],t[1],t[2],o[0],o[1],o[2],o[4],o[5],o[6],o[8],o[9],o[10]],[e[0]-c,e[1]-c,e[2]-c],[e[0]+c,e[1]+c,e[2]+c])}palm(e){let t=Pe,a=Math.max(t.w0,t.w1),r=Math.max(t.t0,t.t1)+t.cup;this.push(Ds,e,[],[-a,-r,t.z1-.01],[a,r,t.z0+.01])}forearm(e){let t=Qr;this.push(oc,e,[],[-.05,-.045,t[0][0]-.01],[.05,.045,t[t.length-1][0]+.01])}bounds(){let e=f.set(f.create(),1/0,1/0,1/0),t=f.set(f.create(),-1/0,-1/0,-1/0);for(let a=0;a<this.n;a++)for(let r=0;r<3;r++)e[r]=Math.min(e[r],this.bmin[a*3+r]),t[r]=Math.max(t[r],this.bmax[a*3+r]);return t[2]=Math.min(t[2],this.clipZ),{min:e,max:t}}bk={o:[0,0,0],size:.02,nx:0,ny:0,nz:0,start:new Int32Array(0),list:new Int32Array(0),margin:0};finalize(e){let{min:t,max:a}=this.bounds(),r=this.bk;r.margin=e,r.o=[t[0]-.005,t[1]-.005,t[2]-.005],r.nx=Math.ceil((a[0]-r.o[0]+.01)/r.size),r.ny=Math.ceil((a[1]-r.o[1]+.01)/r.size),r.nz=Math.ceil((a[2]-r.o[2]+.01)/r.size);let s=Array.from({length:r.nx*r.ny*r.nz},()=>[]);for(let o=0;o<this.n;o++){let c=e+this.k[o],l=[0,1,2].map(d=>Math.max(0,Math.floor((this.bmin[o*3+d]-c-r.o[d])/r.size))),b=[0,1,2].map(d=>Math.min([r.nx,r.ny,r.nz][d]-1,Math.floor((this.bmax[o*3+d]+c-r.o[d])/r.size)));for(let d=l[0];d<=b[0];d++)for(let m=l[1];m<=b[1];m++)for(let u=l[2];u<=b[2];u++)s[(d*r.ny+m)*r.nz+u].push(o)}r.start=new Int32Array(s.length+1);let i=0;s.forEach((o,c)=>{r.start[c]=i,i+=o.length}),r.start[s.length]=i,r.list=new Int32Array(i),s.forEach((o,c)=>r.list.set(o,r.start[c]))}evals=0;eval(e,t,a){this.evals++;let r=1e9,s=this.prm,i=this.bmin,o=this.bmax,c=this.bk,l=0,b=this.n,d=!1;if(c.nx>0){let m=Math.floor((e-c.o[0])/c.size),u=Math.floor((t-c.o[1])/c.size),y=Math.floor((a-c.o[2])/c.size);if(m<0||u<0||y<0||m>=c.nx||u>=c.ny||y>=c.nz)l=b=0,r=c.margin;else{let p=(m*c.ny+u)*c.nz+y;l=c.start[p],b=c.start[p+1],d=!0}}for(let m=l;m<b;m++){let u=d?c.list[m]:m,y=this.k[u],p=u*3,w=Math.max(i[p]-e,0,e-o[p]),x=Math.max(i[p+1]-t,0,t-o[p+1]),M=Math.max(i[p+2]-a,0,a-o[p+2]);if(w*w+x*x+M*M>=(r+y)*(r+y))continue;let v=u*Hs,g;switch(this.kind[u]){case Cs:{let h=e-s[v],A=t-s[v+1],P=a-s[v+2],S=s[v+8],T=s[v+9],z=s[v+10],L=s[v+11],I=s[v+12],G=s[v+13],j=s[v+14],R=s[v+6],F=s[v+7],N=h*S+A*T+P*z,C=N-L,K=h*L-S*N,q=A*L-T*N,O=P*L-z*N,V=K*K+q*q+O*O,B=N*N*L,_=C*C*L,ee=(I<0?-1:1)*I*I*V;(C<0?-1:1)*G*_>ee?g=Math.sqrt(V+_)*j-F:(N<0?-1:1)*G*B<ee?g=Math.sqrt(V+B)*j-R:g=(Math.sqrt(V*G*j)+N*I)*j-R;break}case Bs:{let h=e-s[v],A=t-s[v+1],P=a-s[v+2],S=s[v+6]*h+s[v+7]*A+s[v+8]*P,T=s[v+9]*h+s[v+10]*A+s[v+11]*P,z=s[v+12]*h+s[v+13]*A+s[v+14]*P,L=s[v+3],I=s[v+4],G=s[v+5],j=S/L,R=T/I,F=z/G,N=Math.sqrt(j*j+R*R+F*F),C=Math.sqrt(j/L*(j/L)+R/I*(R/I)+F/G*(F/G));g=C>1e-12?N*(N-1)/C:-Math.min(L,I,G);break}case Vs:{let h=e-s[v],A=t-s[v+1],P=a-s[v+2];g=Math.sqrt(h*h+A*A+P*P)-s[v+3];break}case Ds:{let h=Pe,A=Math.min(1,Math.max(0,(h.z0-a)/(h.z0-h.z1))),P=A*A*(3-2*A),S=h.w0+(h.w1-h.w0)*P,T=h.t0+(h.t1-h.t0)*A,z=e/S,L=t+h.cup*z*z,I=Math.abs(e)-(S-T),G=Math.abs(L),j=Math.max(I,0),R=Math.max(G,0),F=Math.sqrt(j*j+R*R)-T+Math.min(Math.max(I,G-T),0),N=(h.z0+h.z1)/2,C=(h.z0-h.z1)/2,K=Math.abs(a-N)-C,q=Math.max(F,0),O=Math.max(K,0);g=Math.sqrt(q*q+O*O)+Math.min(Math.max(F,K),0);break}default:{let h=Math.min(br-1,Math.max(0,Math.round((a-Ks)/Js))),A=Xs[h],P=Ys[h],S=Math.sqrt(e*e+t*t),T;if(S<1e-9)T=-Math.min(A,P);else{let j=e/(S*A),R=t/(S*P);T=S-1/Math.sqrt(j*j+R*R)}let L=Qr[0][0]-a,I=Math.max(T,0),G=Math.max(L,0);g=Math.sqrt(I*I+G*G)+Math.min(Math.max(T,L),0);break}}let k=Math.max(y-Math.abs(r-g),0)/y;r=Math.min(r,g)-k*k*y*.25}return d&&r>c.margin&&(r=c.margin),this.clipZ<1/0&&(r=Math.max(r,a-this.clipZ)),r}grad(e,t,a,r,s=4e-4){r[0]=this.eval(e+s,t,a)-this.eval(e-s,t,a),r[1]=this.eval(e,t+s,a)-this.eval(e,t-s,a),r[2]=this.eval(e,t,a+s)-this.eval(e,t,a-s);let i=Math.hypot(r[0],r[1],r[2])||1;return r[0]/=i,r[1]/=i,r[2]/=i,r}evalGrad(e,t,a,r,s=3e-4){let i=this.eval(e,t,a);r[0]=this.eval(e+s,t,a)-i,r[1]=this.eval(e,t+s,a)-i,r[2]=this.eval(e,t,a+s)-i;let o=Math.sqrt(r[0]*r[0]+r[1]*r[1]+r[2]*r[2])||1;return r[0]/=o,r[1]/=o,r[2]/=o,i}},Ks=-.25,Js=5e-4,br=1200,Xs=new Float32Array(br),Ys=new Float32Array(br);for(let n=0;n<br;n++){let[e,t]=Qs(Ks+n*Js);Xs[n]=e,Ys[n]=t}function Qs(n){let e=Qr;if(n<=e[0][0])return[e[0][1],e[0][2]];for(let t=0;t<e.length-1;t++){let a=e[t],r=e[t+1];if(n<=r[0]){let s=(n-a[0])/(r[0]-a[0]),i=s*s*(3-2*s);return[a[1]+(r[1]-a[1])*i,a[2]+(r[2]-a[2])*i]}}return[e[e.length-1][1],e[e.length-1][2]]}function Zs(n){let e=n.len[2],t=n.r[2],a=t*.72,r=Math.atan2(t-a,e-a),s=.56;return{centre:[0,t+(a-t)*Math.min(1,e*s/(e-a))-.0016,-e*s],radii:[t*.58,.0014,e*.3],tilt:r,r:t,L:e}}function cc(n,e){let t=new Zr;t.clipZ=e;let a=(m,u)=>f.transformQuat(f.create(),m,u),r=(m,u,y=1)=>f.set(f.create(),m[0]+u[0]*y,m[1]+u[1]*y,m[2]+u[2]*y),s=(m,u)=>f.set(f.create(),(m[0]+u[0])/2,(m[1]+u[1])/2,(m[2]+u[2])/2);t.forearm(.016),t.palm(.009),Xe.forEach((m,u)=>{let y=n[ie.finger(u,0)];t.roundCone(Yr[u],r(y.p,a([0,0,1],y.q),.003),.007,.009,.008)});let i=n[ie.thumb(0)],o=a([0,0,-1],i.q),c=r(i.p,o,ze.len[0]),l=n[ie.finger(0,0)];t.ellipsoid(r(r(i.p,o,.024),[.005,-.008,-.002]),[.019,.01,.031],.012,o,[0,1,0]);{let m=r(l.p,[0,-.002,.014]),u=f.normalize(f.create(),f.sub(f.create(),m,c)),y=f.distance(m,c)/2,p=f.cross(f.create(),o,u);t.ellipsoid(r(s(c,m),[0,-.002,.004]),[y+.004,.004,.014],.009,o,p)}t.ellipsoid([.026,-.007,-.048],[.012,.0095,.034],.012,[.1,0,-1]);let b=f.normalize(f.create(),f.sub(f.create(),n[ie.finger(3,0)].p,l.p));t.ellipsoid([0,-.0075,-.079],[.016,.0065,.036],.01,b),t.sphere([.026,.006,.012],.006,.01),Xe.forEach((m,u)=>{let y=n[ie.finger(u,0)],p=Yr[u][0]*1.2,w=.0125-Pe.cup*(p/.033)**2;t.roundCone([p,w-5e-4,-.038],r(y.p,[0,m.r[0]*.9,.01]),.0016,.0019,.007)});let d=(m,u,y)=>{for(let p=0;p<3;p++){let w=n[u(p)],x=a([0,0,-1],w.q),M=a([0,1,0],w.q),v=m.r[p];if(p<2){let g=r(w.p,x,m.len[p]);t.roundCone(w.p,g,v*.95,m.r[p+1]*.95,p===0?y:.005),t.ellipsoid(r(w.p,x,m.len[p]*.5),[v*1,v*.8,m.len[p]*.46],.004,x,M),t.ellipsoid(r(r(w.p,x,m.len[p]*.5),M,-v*.3),[v*.86,v*.8,m.len[p]*.38],.004,x,M),t.sphere(r(g,M,5e-4),m.r[p+1]*1.03,.008)}else{let g=v*.72;t.roundCone(w.p,r(r(w.p,x,m.len[p]-g),M,-v*.12),v*.97,g,.005),t.ellipsoid(r(r(w.p,x,m.len[p]*.5),M,-v*.25),[v*.92,v*.9,m.len[p]*.42],.004,x,M);let k=Zs(m),h=X.multiply(X.create(),w.q,X.fromEuler(X.create(),k.tilt,0,0));t.ellipsoid(f.add(f.create(),w.p,a(k.centre,w.q)),k.radii,.0015,a([0,0,-1],h),a([0,1,0],h))}p===0&&t.sphere(r(w.p,M,.0015),v*1.1,.007)}};Xe.forEach((m,u)=>d(m,y=>ie.finger(u,y),.0065)),d(ze,m=>ie.thumb(m),.012);for(let m=0;m<3;m++){let u=n[ie.finger(m,0)],y=n[ie.finger(m+1,0)],p=a([0,0,-1],u.q),w=a([0,0,-1],y.q),x=r(u.p,p,.006),M=r(y.p,w,.006),v=f.normalize(f.create(),f.add(f.create(),p,w));t.ellipsoid(r(s(x,M),[0,-.0015,0]),[f.distance(x,M)/2+.002,.0055,.007],.008,v,[0,1,0])}return t}function lc(n,e){let{min:t,max:a}=n.bounds(),r=t[0]-e,s=t[1]-e,i=t[2]-e,o=Math.ceil((a[0]-t[0])/e)+3,c=Math.ceil((a[1]-t[1])/e)+3,l=Math.ceil((a[2]-t[2])/e)+3,b=new Float32Array(o*c*l),d=(j,R,F)=>(j*c+R)*l+F,m=2,u=m*e*Math.sqrt(3)*1.05+e,y=Math.ceil((o-1)/m),p=Math.ceil((c-1)/m),w=Math.ceil((l-1)/m),x=new Float32Array((y+1)*(p+1)*(w+1)),M=(j,R,F)=>(j*(p+1)+R)*(w+1)+F;for(let j=0;j<=y;j++)for(let R=0;R<=p;R++)for(let F=0;F<=w;F++)x[M(j,R,F)]=n.eval(r+Math.min(j*m,o-1)*e,s+Math.min(R*m,c-1)*e,i+Math.min(F*m,l-1)*e);let v=new Float32Array(8);for(let j=0;j<y;j++)for(let R=0;R<p;R++)for(let F=0;F<w;F++){let N=!1;for(let Y=0;Y<8;Y++)v[Y]=x[M(j+(Y&1),R+(Y>>1&1),F+(Y>>2))],Math.abs(v[Y])<u&&(N=!0);let C=j*m,K=R*m,q=F*m,O=Math.min(C+m,o-1),V=Math.min(K+m,c-1),B=Math.min(q+m,l-1),_=O===o-1?O:O-1,ee=V===c-1?V:V-1,W=B===l-1?B:B-1;for(let Y=C;Y<=_;Y++)for(let E=K;E<=ee;E++){let D=r+Y*e,J=s+E*e,$=(Y*c+E)*l;if(N)for(let ae=q;ae<=W;ae++)b[$+ae]=n.eval(D,J,i+ae*e);else{let ae=(Y-C)/(O-C||1),se=(E-K)/(V-K||1),de=v[0]+(v[1]-v[0])*ae,be=v[2]+(v[3]-v[2])*ae,pe=v[4]+(v[5]-v[4])*ae,Le=v[6]+(v[7]-v[6])*ae,Re=de+(be-de)*se,te=pe+(Le-pe)*se;for(let ne=q;ne<=W;ne++)b[$+ne]=Re+(te-Re)*((ne-q)/(B-q||1))}}}let g=o-1,k=c-1,h=l-1,A=new Int32Array(g*k*h).fill(-1),P=[],S=0,T=[[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]],z=new Float32Array(8);for(let j=0;j<g;j++)for(let R=0;R<k;R++)for(let F=0;F<h;F++){let N=0;for(let V=0;V<8;V++){let B=b[d(j+(V&1),R+(V>>1&1),F+(V>>2))];z[V]=B,B<=0&&(N|=1<<V)}if(N===0||N===255)continue;let C=0,K=0,q=0,O=0;for(let[V,B]of T){let _=N>>V&1,ee=N>>B&1;if(_===ee)continue;let W=z[V],Y=z[B],E=W/(W-Y);C+=(V&1)+((B&1)-(V&1))*E,K+=(V>>1&1)+((B>>1&1)-(V>>1&1))*E,q+=(V>>2)+((B>>2)-(V>>2))*E,O++}P.push(r+(j+C/O)*e,s+(R+K/O)*e,i+(F+q/O)*e),A[(j*k+R)*h+F]=S++}let L=[],I=(j,R,F)=>A[(j*k+R)*h+F],G=(j,R,F,N,C)=>{j<0||R<0||F<0||N<0||(C?L.push(j,N,F,j,F,R):L.push(j,R,F,j,F,N))};for(let j=0;j<o;j++)for(let R=0;R<c;R++)for(let F=0;F<l;F++){let N=b[d(j,R,F)]<=0;if(j<g&&R>0&&F>0&&R<k&&F<h){let C=b[d(j+1,R,F)]<=0;N!==C&&G(I(j,R-1,F-1),I(j,R,F-1),I(j,R,F),I(j,R-1,F),N)}if(R<k&&j>0&&F>0&&j<g&&F<h){let C=b[d(j,R+1,F)]<=0;N!==C&&G(I(j-1,R,F-1),I(j,R,F-1),I(j,R,F),I(j-1,R,F),!N)}if(F<h&&j>0&&R>0&&j<g&&R<k){let C=b[d(j,R,F+1)]<=0;N!==C&&G(I(j-1,R-1,F),I(j,R-1,F),I(j,R,F),I(j-1,R,F),N)}}return{pos:Float32Array.from(P),tris:Uint32Array.from(L)}}function bc(n,e,t,a){let r=e.pos.length/3,s=e.pos,i=f.create(),o=(d,m)=>{for(let u=0;u<m;u++){let y=s[d*3],p=s[d*3+1],w=s[d*3+2],x=n.evalGrad(y,p,w,i),M=Math.max(-.0015,Math.min(.0015,x));s[d*3]-=i[0]*M,s[d*3+1]-=i[1]*M,s[d*3+2]-=i[2]*M}};for(let d=0;d<r;d++)o(d,1);let c=Array.from({length:r},()=>[]),l=e.tris;for(let d=0;d<l.length;d+=3){let m=l[d],u=l[d+1],y=l[d+2];c[m].includes(u)||c[m].push(u),c[m].includes(y)||c[m].push(y),c[u].includes(m)||c[u].push(m),c[u].includes(y)||c[u].push(y),c[y].includes(m)||c[y].push(m),c[y].includes(u)||c[y].push(u)}let b=new Float32Array(s.length);for(let d=0;d<t;d++){for(let m=0;m<r;m++){let u=c[m];if(!u.length){b[m*3]=s[m*3],b[m*3+1]=s[m*3+1],b[m*3+2]=s[m*3+2];continue}let y=0,p=0,w=0;for(let v of u)y+=s[v*3],p+=s[v*3+1],w+=s[v*3+2];y=y/u.length-s[m*3],p=p/u.length-s[m*3+1],w=w/u.length-s[m*3+2];let x=n.evalGrad(s[m*3],s[m*3+1],s[m*3+2],i),M=y*i[0]+p*i[1]+w*i[2]+Math.max(-.0015,Math.min(.0015,x));b[m*3]=s[m*3]+.6*y-i[0]*M,b[m*3+1]=s[m*3+1]+.6*p-i[1]*M,b[m*3+2]=s[m*3+2]+.6*w-i[2]*M}s.set(b)}for(let d=0;d<r;d++)n.grad(s[d*3],s[d*3+1],s[d*3+2],i),a[d*3]=i[0],a[d*3+1]=i[1],a[d*3+2]=i[2];for(let d=0;d<l.length;d+=3){let m=l[d]*3,u=l[d+1]*3,y=l[d+2]*3,p=s[u]-s[m],w=s[u+1]-s[m+1],x=s[u+2]-s[m+2],M=s[y]-s[m],v=s[y+1]-s[m+1],g=s[y+2]-s[m+2],k=w*g-x*v,h=x*M-p*g,A=p*v-w*M,P=a[m]+a[u]+a[y],S=a[m+1]+a[u+1]+a[y+1],T=a[m+2]+a[u+2]+a[y+2];if(k*P+h*S+A*T<0){let z=l[d+1];l[d+1]=l[d+2],l[d+2]=z}}}var cr={membershipPower:7,fingerGates:[.008,.005,.0045],thumbGates:[.024,.0065,.005],wristGate:.012};function uc(n,e,t){let a=t[0]-e[0],r=t[1]-e[1],s=t[2]-e[2],i=n[0]-e[0],o=n[1]-e[1],c=n[2]-e[2],l=a*a+r*r+s*s,b=l>0?Math.min(1,Math.max(0,(i*a+o*r+c*s)/l)):0;return Math.hypot(i-a*b,o-r*b,c-s*b)}var dc=(n,e,t)=>{let a=Math.min(1,Math.max(0,(t-n)/(e-n)));return a*a*(3-2*a)};function mc(n,e){let t=(i,o)=>f.transformQuat(f.create(),i,o),a=[],r=(i,o,c,l)=>{let b={bones:[],segs:[],gates:[],island:l},d=null;for(let m=0;m<3;m++){let u=n[o(m)],y=t([0,0,-1],u.q);b.bones.push(o(m)),b.segs.push({a:f.clone(u.p),b:f.scaleAndAdd(f.create(),u.p,y,i.len[m]),r:i.r[m]});let p=d?f.normalize(f.create(),f.add(f.create(),d,y)):f.clone(y);b.gates.push({p:m===0?f.scaleAndAdd(f.create(),u.p,y,c[m]*.5):f.clone(u.p),axis:p,h:c[m]}),d=y}a.push(b)};Xe.forEach((i,o)=>r(i,c=>ie.finger(o,c),cr.fingerGates,1+o)),r(ze,i=>ie.thumb(i),cr.thumbGates,5),a.push({bones:[ie.foreA,ie.foreB],segs:[{a:f.create(0,0,-.02),b:f.create(0,0,e),r:.03}],gates:[{p:f.create(0,0,.006),axis:f.create(0,0,1),h:cr.wristGate},{p:f.create(0,0,.03),axis:f.create(0,0,1),h:0,linearTo:e}],island:0});let s={bones:[],segs:[],gates:[],island:0};return Xe.forEach((i,o)=>s.segs.push({a:f.clone(Yr[o]),b:f.clone(n[ie.finger(o,0)].p),r:.0095})),s.segs.push({a:f.create(0,0,-.035),b:f.create(0,0,-.005),r:.02}),a.push(s),a}function hc(n,e,t,a){let r=0;for(let s=0;s<e.length;s++){let i=e[s],o=1/0;for(let l of i.segs)o=Math.min(o,uc(n,l.a,l.b)/l.r);let c=Math.pow(o+.05,-cr.membershipPower);a[s]=c,r+=c}t.fill(0);for(let s=0;s<e.length;s++){let i=e[s],o=a[s]/r;if(a[s]=o,o<1e-5)continue;let c=1,l=1;for(let b=0;b<i.bones.length;b++){let d=i.gates[b],m=(n[0]-d.p[0])*d.axis[0]+(n[1]-d.p[1])*d.axis[1]+(n[2]-d.p[2])*d.axis[2],u=d.linearTo!==void 0?Math.min(1,Math.max(0,m/(d.linearTo-d.p[2]))):dc(-d.h,d.h,m);b===0&&(l=1-u),b>0&&(t[i.bones[b-1]]+=o*c*(1-u)),c*=u}i.bones.length&&(t[i.bones[i.bones.length-1]]+=o*c),t[ie.root]+=o*(i.bones.length?l:1)}}function Ws(n,e,t){let r=t/24,s=0;for(let i=0;i<24;i++){let o=(i+.5)*r;s+=Math.hypot(n*Math.sin(o),e*Math.cos(o))}return s*r}function fc(n){let e=[];e.push({uv(a){let[r,s]=Qs(a[2]),i=Math.atan2(a[1]/s,-a[0]/r),o=Ws(r,s,Math.PI*2);return[Ws(r,s,i),a[2],o]}});let t=(a,r)=>{let s=[0,1,2].map(l=>{let b=n[r(l)];return{p:b.p,q:X.invert(X.create(),b.q),len:a.len[l]}}),i=(a.r[0]+a.r[1]+a.r[2])/3,o=Math.PI*2*i,c=f.create();return{uv(l){let b=1/0,d=0,m=0,u=0;for(let y=0;y<3;y++){let p=s[y];f.transformQuat(c,f.set(c,l[0]-p.p[0],l[1]-p.p[1],l[2]-p.p[2]),p.q);let w=Math.min(0,Math.max(-p.len,c[2])),x=Math.hypot(c[0],c[1],c[2]-w);x<b&&(b=x,d=Math.atan2(c[1],-c[0])*i,m=u-c[2]),u+=p.len}return[d,m,o]}}};return Xe.forEach((a,r)=>e.push(t(a,s=>ie.finger(r,s)))),e.push(t(ze,a=>ie.thumb(a))),e}function $r(n,e){let t=mt(_s,lr,n),a=[];for(let r=0;r<ie.count;r++){let s=U.create();r===ie.foreA||(r===ie.foreB?U.fromTranslation(s,[0,0,e]):U.fromRotationTranslation(s,t[r].q,t[r].p)),a.push(U.invert(U.create(),s))}return a}var qs=new Map;function $s(n={}){let e=n.cell??.0022,t=n.forearmLength??.27,a=n.skinnedForearm??.12,r=n.smoothIterations??2,s=JSON.stringify([e,t,a,r]),i=qs.get(s);if(i)return i;let o=performance.now(),c=mt(_s,lr,1),l=cc(c,a);l.finalize(e*10);let b=lc(l,e),d=performance.now(),m=b.pos.length/3,u=new Float32Array(m*3);bc(l,b,r,u);let y=performance.now(),{min:p,max:w}=l.bounds(),x=Math.ceil((w[0]-p[0])/e+3)*Math.ceil((w[1]-p[1])/e+3)*Math.ceil((w[2]-p[2])/e+3),M=mc(c,t),v=fc(c),g=new Uint16Array(m*4),k=new Float32Array(m*4),h=new Uint8Array(m),A=new Float64Array(ie.count),P=new Float64Array(M.length),S=f.create();for(let B=0;B<m;B++){f.set(S,b.pos[B*3],b.pos[B*3+1],b.pos[B*3+2]),hc(S,M,A,P);let _=0;for(let W=1;W<P.length;W++)P[W]>P[_]&&(_=W);h[B]=M[_].island;let ee=0;for(let W=0;W<4;W++){let Y=-1,E=1e-7;for(let D=0;D<ie.count;D++)A[D]>E&&(E=A[D],Y=D);if(Y<0){g[B*4+W]=0,k[B*4+W]=0;continue}g[B*4+W]=Y,k[B*4+W]=E,ee+=E,A[Y]=0}for(let W=0;W<4;W++)k[B*4+W]/=ee||1}let T=[],z=[],L=[],I=[],G=[],j=[],R=new Map,F=new Map,N=(B,_)=>{let ee=B*8+_,W=F.get(ee);return W||(W=v[_].uv(b.pos.subarray(B*3,B*3+3)),F.set(ee,W)),W},C=(B,_,ee,W,Y)=>{let E=(B*8+_)*2+(Y?1:0),D=R.get(E);if(D===void 0){D=T.length/3,R.set(E,D),T.push(b.pos[B*3],b.pos[B*3+1],b.pos[B*3+2]),z.push(u[B*3],u[B*3+1],u[B*3+2]),L.push(ee,W);for(let J=0;J<4;J++)I.push(g[B*4+J]),G.push(k[B*4+J])}return D},K=b.tris;for(let B=0;B<K.length;B+=3){let _=K[B],ee=K[B+1],W=K[B+2],Y=h[_],E=h[ee],D=h[W],J=Y===E||Y===D?Y:E===D?E:Y,$=N(_,J),ae=N(ee,J),se=N(W,J),de=$[2],be=[$[0],ae[0],se[0]],pe=[!1,!1,!1],Le=Math.min(be[0],be[1],be[2]);if(Math.max(be[0],be[1],be[2])-Le>de/2)for(let te=0;te<3;te++)be[te]-Le<=de/2&&(be[te]+=de,pe[te]=!0);j.push(C(_,J,be[0],$[1],pe[0]),C(ee,J,be[1],ae[1],pe[1]),C(W,J,be[2],se[1],pe[2]))}let q=new we(T,z,L,j);q.joints=Uint16Array.from(I),q.weights=Float32Array.from(G),q.computeTangents();let O=pc(c),V={geometry:q,nails:O,bindInverse:$r(1,t),bindFrames:c,forearmLength:t,stats:{vertices:q.vertexCount,triangles:q.triangleCount,cell:e,ms:performance.now()-o,gridSamples:x,phases:{grid:d-o,relax:y-d,skin:performance.now()-y},sdfEvals:l.evals}};return qs.set(s,V),V}function pc(n){let e=[],t=[],a=[],r=(i,o)=>{let c=Zs(i),l=n[o],b=bn(1,20,12).scale(c.radii[0]*.95,c.radii[1]*.9,c.radii[2]*.95).rotateX(c.tilt).translate(c.centre[0],c.centre[1]+5e-4,c.centre[2]);b.transform(U.fromRotationTranslation(U.create(),l.q,l.p)),b.scaleUVs(.004);for(let d=0;d<b.vertexCount;d++)t.push(o,0,0,0),a.push(1,0,0,0);e.push(b)};Xe.forEach((i,o)=>r(i,ie.finger(o,2))),r(ze,ie.thumb(2));let s=we.merge(e);return s.joints=Uint16Array.from(t),s.weights=Float32Array.from(a),s.computeTangents()}function ha(n){let e=n.clone();for(let t=0;t<e.positions.length;t+=3)e.positions[t]=-e.positions[t],e.normals[t]=-e.normals[t];return e.flipWinding(),e.tangents=null,e.computeTangents()}var ei=.1,gc=.12,ur=class{constructor(e,t={}){this.renderer=e;this.options={skin:t.skin??"bare",skinColor:t.skinColor??[.56,.36,.27],gloveColor:t.gloveColor??[.085,.08,.072],palmColor:t.palmColor??[.06,.05,.04],sleeveColor:t.sleeveColor??[.075,.08,.065],shoulderRight:t.shoulderRight??[.2,-.31,.1],shoulderLeft:t.shoulderLeft??[-.2,-.31,.1],forearmLength:t.forearmLength??.27,upperArmLength:t.upperArmLength??.31,viewmodel:t.viewmodel??!0,meshCell:t.meshCell??Math.min(.0035,Math.max(.0016,.0033/We.detail))};let a=e.synth,r=Math.min(We.textureSize,2048),s=this.options.skin==="bare",i=s?a.material("skin",{size:r,tileMeters:.05,color:this.options.skinColor,seed:71},{name:"skin",specular:.35,normalScale:.85}):a.material("glove",{size:r,tileMeters:.04,color:this.options.gloveColor,seed:61},{name:"glove-knit",specular:.3,normalScale:.9}),o=a.material("glove",{size:1024,tileMeters:.05,color:this.options.palmColor,extra:1,seed:64},{name:"glove-leather",specular:.4}),c=a.material("skin",{size:512,tileMeters:.02,color:this.options.skinColor,extra:1,seed:72},{name:"nail",specular:.6,normalScale:.5}),l=a.material("webbing",{size:r,tileMeters:.06,color:this.options.sleeveColor,seed:63},{name:"sleeve"}),b=e.dev,d=(v,g,k)=>{let h=new Te(new Ae(b,v,{label:k}),g);return h.viewmodel=this.options.viewmodel,h.castShadow=!this.options.viewmodel,this.objects.push(h),h},m=this.options.forearmLength,u=$s({cell:this.options.meshCell,forearmLength:m,skinnedForearm:gc});this.meshStats=u.stats,this.sleeveLength=m-ei+.03;let y=xc(this.sleeveLength),p=this.options.upperArmLength+.42,w=pt(.04,.05,p,oe(20)).rotateX(Math.PI/2).translate(0,0,-p/2).scale(1,.86,1);this.upperLength=p;let x=yc(),M=vc();for(let v of[1,-1]){let g=v===1?u.geometry:ha(u.geometry),k=v===1?u.nails:ha(u.nails),h=new Float32Array(ie.count*16);for(let T=0;T<ie.count;T++)U.identity(h.subarray(T*16,T*16+16));let A=d(g,i,`hand-${v}`),P=d(k,c,`nails-${v}`);A.joints=h,P.joints=h,P.visible=s;let S=[];s||(S.push(d(v===1?x:ha(x),o,`cuff-${v}`)),S.push(d(v===1?M:ha(M),o,`knuckles-${v}`))),this.sides.push({side:v,hand:A,nails:P,joints:h,trim:S,sleeve:d(y,l,`sleeve-${v}`),upper:d(w,l,`upper-${v}`),bindInv:v===1?u.bindInverse:$r(-1,m),frames:Array.from({length:ie.count},()=>({p:f.create(),q:X.create()}))})}}objects=[];options;visible=!0;meshStats;sides=[];sleeveLength;upperLength=1;tmp=U.create();tmp2=U.create();addTo(e){for(let t of this.objects)e.add(t);return this}setVisible(e){this.visible=e;for(let t of this.objects)t.visible=e;if(e&&this.options.skin!=="bare")for(let t of this.sides)t.nails.visible=!1}update(e,t,a,r={}){if(!this.visible)return;let s=t.right,i=t.indexPressed&&(r.trigger??0)>0?ti(s.fingers[0],t.indexPressed,r.trigger??0):s.fingers[0],o=s.thumb;if(r.rightThumb&&r.rightThumb.weight>0){let m=Math.min(1,r.rightThumb.weight),u=r.rightThumb.thumb;o={dir:fa(s.thumb.dir,u.dir,m),bend:[s.thumb.bend[0]+(u.bend[0]-s.thumb.bend[0])*m,s.thumb.bend[1]+(u.bend[1]-s.thumb.bend[1])*m],twist:(s.thumb.twist??0)+((u.twist??0)-(s.thumb.twist??0))*m}}let c={...s,fingers:[i,s.fingers[1],s.fingers[2],s.fingers[3]],thumb:o};this.poseHand(this.sides[0],e,c,a,this.options.shoulderRight);let l=t.left??null;r.leftOverride&&l?l=en(l,r.leftOverride,r.leftWeight??1):r.leftOverride&&(l=r.leftOverride);let b=this.sides[1],d=!!l;b.hand.visible=b.sleeve.visible=b.upper.visible=d;for(let m of b.trim)m.visible=d;b.nails.visible=d&&this.options.skin==="bare",l&&this.poseHand(b,e,l,a,this.options.shoulderLeft)}poseHand(e,t,a,r,s){let i=e.side,o=et(a.fingerDir,a.dorsal),c=U.fromRotationTranslation(U.create(),o,a.position),l=U.multiply(U.create(),t,c);for(let R of e.trim)R.setTransform(l);let b=mt(a.fingers,a.thumb,i,e.frames),d=e.joints,m=this.tmp,u=this.tmp2;for(let R=0;R<ie.foreA;R++)U.fromRotationTranslation(m,b[R].q,b[R].p),U.multiply(u,l,m),U.multiply(m,u,e.bindInv[R]),d.set(m,R*16);let y=f.transformMat4(f.create(),[0,0,0],l),p=U.getRotation(X.create(),l),w=f.normalize(f.create(),f.transformQuat(f.create(),[0,0,1],p)),x=f.transformQuat(f.create(),[0,1,0],p),M=this.options.forearmLength,v=this.options.upperArmLength,g,k;if(r){k=f.add(f.create(),f.set(f.create(),r.position[0],r.position[1],r.position[2]),f.transformQuat(f.create(),s,r.rotation));let R=(v+M)*.995;f.distance(k,y)>R&&(k=f.scaleAndAdd(f.create(),y,f.normalize(f.create(),f.sub(f.create(),k,y)),R));let N=f.transformQuat(f.create(),[i*.7,-1,.15],r.rotation);g=wc(k,y,v,M,N,w)}else g=f.scaleAndAdd(f.create(),y,w,M),k=f.scaleAndAdd(f.create(),g,w,v);let h=f.sub(f.create(),g,y),A=f.length(h),P=f.scale(f.create(),h,1/Math.max(A,1e-6)),S=f.negate(f.create(),P),T=f.sub(f.create(),k,g),z=f.scaleAndAdd(f.create(),T,P,-f.dot(T,P)),L=f.normalize(f.create(),f.scaleAndAdd(f.create(),x,z,-1/v*1.4));U.fromRotationTranslation(m,et(S,x),y),d.set(m,ie.foreA*16),U.fromRotationTranslation(u,et(S,L),g),U.multiply(m,u,e.bindInv[ie.foreB]),d.set(m,ie.foreB*16);let I=(R,F,N,C,K)=>{let q=f.sub(f.create(),N,F),O=f.length(q),V=f.scale(f.create(),q,1/Math.max(O,1e-6)),B=U.fromRotationTranslation(this.tmp,et(V,C),F),_=O/K;B[8]*=_,B[9]*=_,B[10]*=_,R.setTransform(B)},G=f.normalize(f.create(),f.lerp(f.create(),x,L,.4));I(e.sleeve,f.scaleAndAdd(f.create(),y,P,ei*(A/M)),f.scaleAndAdd(f.create(),g,P,.03),G,this.sleeveLength);let j=f.normalize(f.create(),T);I(e.upper,f.scaleAndAdd(f.create(),g,j,-.02),f.scaleAndAdd(f.create(),k,j,.4),L,this.upperLength)}};function yc(){let n=Ce([[.0295,-.006],[.0315,-.004],[.0325,0],[.0335,.014],[.0345,.03],[.0335,.038],[.031,.04],[.0295,.038]],oe(26)).rotateX(-Math.PI/2).scale(1,.66,1),e=ye(.056,.0024,.016,9e-4).translate(.002,.0238,.021),t=ye(.011,.003,.012,.001).translate(.0335,.023,.021);return we.merge([n,e,t]).computeTangents()}function vc(){let n=ye(.064,.0055,.028,.0026,4).translate(0,.0205,-.071);{let e=n.positions;for(let t=0;t<e.length;t+=3){let a=e[t]/.033;e[t+1]-=.0032*a*a}}return n.computeNormals().computeTangents()}function xc(n){let e=[[.034,.006],[.036,0],[.0395,.003],[.0415,.009],[.042,.016],[.0405,.024],[.0385,.032],[.0385,n*.4],[.0405,n*.7],[.0435,n*.9],[.0445,n],[.037,n+.004],[0,n+.004]];return Ce(e,oe(22)).rotateX(-Math.PI/2).scale(1,.84,1)}function wc(n,e,t,a,r,s){let i=f.sub(f.create(),e,n),o=f.length(i);if(o<1e-5)return f.scaleAndAdd(f.create(),e,s,a);let c=f.scale(f.create(),i,1/o);o=Math.min(o,(t+a)*.9995);let l=(t*t-a*a+o*o)/(2*o),b=Math.sqrt(Math.max(0,t*t-l*l)),d=f.scaleAndAdd(f.create(),r,c,-f.dot(r,c)),m=f.length(d)>1e-6?f.normalize(d,d):f.normalize(f.create(),f.cross(f.create(),c,f.create(0,1,0))),u=f.scaleAndAdd(f.create(),n,c,l);return f.scaleAndAdd(u,u,m,b)}function ti(n,e,t){return{curl:[n.curl[0]+(e.curl[0]-n.curl[0])*t,n.curl[1]+(e.curl[1]-n.curl[1])*t,n.curl[2]+(e.curl[2]-n.curl[2])*t],spread:(n.spread??0)+((e.spread??0)-(n.spread??0))*t}}function fa(n,e,t){return[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t,n[2]+(e[2]-n[2])*t]}function en(n,e,t){return{position:fa(n.position,e.position,t),fingerDir:fa(n.fingerDir,e.fingerDir,t),dorsal:fa(n.dorsal,e.dorsal,t),fingers:[0,1,2,3].map(a=>ti(n.fingers[a],e.fingers[a],t)),thumb:{dir:fa(n.thumb.dir,e.thumb.dir,t),bend:[n.thumb.bend[0]+(e.thumb.bend[0]-n.thumb.bend[0])*t,n.thumb.bend[1]+(e.thumb.bend[1]-n.thumb.bend[1])*t],twist:(n.thumb.twist??0)+((e.thumb.twist??0)-(n.thumb.twist??0))*t}}}function Mc(n,e){let t=0;for(let a=0;a+2<e.length;a+=3){let r=e[a]*3,s=e[a+1]*3,i=e[a+2]*3;t+=n[r]*(n[s+1]*n[i+2]-n[s+2]*n[i+1])-n[r+1]*(n[s]*n[i+2]-n[s+2]*n[i])+n[r+2]*(n[s]*n[i+1]-n[s+1]*n[i])}return t/6}function tn(n){let e=[],t=[],a=f.create();for(let m of n.parts){let u=m.object.mesh.source;if(!u||Mc(u.positions,u.indices)<0)continue;let y=e.length/3,p=u.positions.length/3;for(let w=0;w<p;w++)f.transformMat4(a,[u.positions[w*3],u.positions[w*3+1],u.positions[w*3+2]],m.local),e.push(a[0],a[1],a[2]);for(let w=0;w<u.indices.length;w++)t.push(y+u.indices[w])}if(!t.length)return null;let r=new Float32Array(e),s=new Uint32Array(t),i=s.length/3,o=new Float32Array(i*3),c=f.create(1/0,1/0,1/0);for(let m=0;m<r.length;m+=3)c[0]=Math.min(c[0],r[m]),c[1]=Math.min(c[1],r[m+1]),c[2]=Math.min(c[2],r[m+2]);let l=.012,b=new Map,d=(m,u,y)=>(m&1023)<<20|(u&1023)<<10|y&1023;for(let m=0;m<i;m++){let u=s[m*3]*3,y=s[m*3+1]*3,p=s[m*3+2]*3,w=f.create(r[y]-r[u],r[y+1]-r[u+1],r[y+2]-r[u+2]),x=f.create(r[p]-r[u],r[p+1]-r[u+1],r[p+2]-r[u+2]),M=f.cross(f.create(),w,x),v=f.length(M)||1;o[m*3]=M[0]/v,o[m*3+1]=M[1]/v,o[m*3+2]=M[2]/v;let g=[1/0,1/0,1/0],k=[-1/0,-1/0,-1/0];for(let P of[u,y,p])for(let S=0;S<3;S++)g[S]=Math.min(g[S],r[P+S]),k[S]=Math.max(k[S],r[P+S]);let h=g.map((P,S)=>Math.floor((P-c[S])/l)),A=k.map((P,S)=>Math.floor((P-c[S])/l));for(let P=h[0];P<=A[0];P++)for(let S=h[1];S<=A[1];S++)for(let T=h[2];T<=A[2];T++){let z=d(P,S,T),L=b.get(z);L||b.set(z,L=[]),L.push(m)}}return{pos:r,tri:s,nrm:o,grid:b,cell:l,min:c}}function kc(n,e,t,a,r){let s=f.sub(f.create(),t,e),i=f.sub(f.create(),a,e),o=f.sub(f.create(),n,e),c=f.dot(s,o),l=f.dot(i,o);if(c<=0&&l<=0)return f.copy(r,e);let b=f.sub(f.create(),n,t),d=f.dot(s,b),m=f.dot(i,b);if(d>=0&&m<=d)return f.copy(r,t);let u=c*m-d*l;if(u<=0&&c>=0&&d<=0){let h=c/(c-d);return f.scaleAndAdd(r,e,s,h)}let y=f.sub(f.create(),n,a),p=f.dot(s,y),w=f.dot(i,y);if(w>=0&&p<=w)return f.copy(r,a);let x=p*l-c*w;if(x<=0&&l>=0&&w<=0){let h=l/(l-w);return f.scaleAndAdd(r,e,i,h)}let M=d*w-p*m;if(M<=0&&m-d>=0&&p-w>=0){let h=(m-d)/(m-d+(p-w));return f.sub(r,a,t),f.scaleAndAdd(r,t,r,h)}let v=1/(M+x+u),g=x*v,k=u*v;return f.scaleAndAdd(r,e,s,g),f.scaleAndAdd(r,r,i,k)}function ga(n,e,t){let a=Math.floor((e[0]-n.min[0])/n.cell),r=Math.floor((e[1]-n.min[1])/n.cell),s=Math.floor((e[2]-n.min[2])/n.cell),i=Math.ceil(t/n.cell),o=1/0,c=-1,l=1/0,b=f.create(),d=f.create(),m=f.create(),u=f.create(),y=(w,x,M)=>(w&1023)<<20|(x&1023)<<10|M&1023,p=new Set;for(let w=0;w<=i;w++){for(let x=a-w;x<=a+w;x++)for(let M=r-w;M<=r+w;M++)for(let v=s-w;v<=s+w;v++){if(Math.max(Math.abs(x-a),Math.abs(M-r),Math.abs(v-s))!==w)continue;let g=n.grid.get(y(x,M,v));if(g)for(let k of g){if(p.has(k))continue;p.add(k);let h=n.tri[k*3]*3,A=n.tri[k*3+1]*3,P=n.tri[k*3+2]*3;f.set(d,n.pos[h],n.pos[h+1],n.pos[h+2]),f.set(m,n.pos[A],n.pos[A+1],n.pos[A+2]),f.set(u,n.pos[P],n.pos[P+1],n.pos[P+2]),kc(e,d,m,u,b);let S=f.distance(e,b);S<o&&(o=S,c=k),S<l&&(e[0]-n.pos[h])*n.nrm[k*3]+(e[1]-n.pos[h+1])*n.nrm[k*3+1]+(e[2]-n.pos[h+2])*n.nrm[k*3+2]>=0&&(l=S)}}if(c>=0&&o<w*n.cell)break}return c<0?t:l<=o+.0015?l:o<.025?-o:o}var Ac=[1.65,1.95,1.25],Pc=[1,1.3],Sc=[.0035,.002,.002],Tc=[[0,0,0],[80,0,-80],[-80,0,80],[80,0,80],[-80,0,-80]];function dr(n){return U.fromRotationTranslation(U.create(),et(n.fingerDir,n.dorsal),n.position)}function pa(n,e,t,a,r,s,i,o,c=5){let b=mt(t,a,r)[s],d=f.transformQuat(f.create(),[0,0,-1],b.q),m=1/0,u=f.create(),y=f.create();for(let p=0;p<=c;p++){f.scaleAndAdd(u,b.p,d,i*(.3+.7*(p/c))),f.transformMat4(y,u,e);let w=ga(n,y,.06)-o;w<m&&(m=w)}return m}function ai(n,e,t,a){if(n(t)>=a)return t;if(n(e)<a)return e;for(let r=0;r<14;r++){let s=(e+t)/2;n(s)>=a?e=s:t=s}return e}function zc(n,e,t,a={}){let r=a.clearance??8e-4,s=a.maxCurl??Ac,i=a.maxThumbBend??Pc,o={...n,position:[...n.position],fingers:n.fingers.map(u=>({...u,curl:[...u.curl]})),thumb:{dir:[...n.thumb.dir],bend:[...n.thumb.bend],twist:n.thumb.twist}},c={changed:0,palmPush:0,fingers:[]},l=dr(o),b=a.lockIndex??!1,d=u=>!(o.fingers[u].lock||u===0&&b),m=o.fingers.map((u,y)=>d(y)?{...u,curl:[0,0,0]}:u);if(a.fixPalm!==!1){let u=f.normalize(f.create(),f.set(f.create(),n.dorsal[0],n.dorsal[1],n.dorsal[2])),y=f.normalize(f.create(),f.set(f.create(),n.fingerDir[0],n.fingerDir[1],n.fingerDir[2])),p=[...o.position],w=f.create(),x=()=>{let v=1/0;for(let g=0;g<=3;g++)for(let k=-1;k<=1;k++){let h=Pe.z0+(Pe.z1-Pe.z0)*(g/3),A=Pe.t0+(Pe.t1-Pe.t0)*(g/3),P=(Pe.w0+(Pe.w1-Pe.w0)*(g/3))*.8;f.transformMat4(w,[k*P*t,-A,h],l),v=Math.min(v,ga(e,w,.05))}return o.fingers.forEach((g,k)=>{d(k)&&(v=Math.min(v,pa(e,l,m,o.thumb,t,ie.finger(k,0),Xe[k].len[0],Xe[k].r[0])))}),Math.max(0,-v)},M={score:x()*1e3,a:0,b:0};if(M.score>0){for(let v=0;v<=16;v+=2)for(let g=-16;g<=16;g+=2){if(v===0&&g===0)continue;for(let h=0;h<3;h++)o.position[h]=p[h]+u[h]*v*.001+y[h]*g*.001;l=dr(o);let k=x()*1e3+.12*Math.hypot(v,g);k<M.score&&(M={score:k,a:v,b:g})}for(let v=0;v<3;v++)o.position[v]=p[v]+u[v]*M.a*.001+y[v]*M.b*.001;l=dr(o),c.palmPush=Math.hypot(M.a,M.b)*.001,c.offset=[M.a*.001,M.b*.001]}}if(o.fingers.forEach((u,y)=>{if(!d(y))return;let p=[...u.curl],w=Xe[y];for(let x=0;x<3;x++){let M=v=>{let g=o.fingers.map((h,A)=>A===y?{...h,curl:h.curl.map((P,S)=>S===x?v:S>x?0:P)}:h),k=1/0;for(let h=x;h<3;h++)k=Math.min(k,pa(e,l,g,o.thumb,t,ie.finger(y,h),w.len[h],w.r[h]));return k};u.curl[x]=ai(M,0,Math.min(s[x],p[x]+.4),r)}p.some((x,M)=>Math.abs(x-u.curl[M])>.001)&&(c.changed++,c.fingers.push({finger:y,from:p,to:[...u.curl]}))}),a.fitThumb!==!1){let u=[...o.thumb.bend],y=[...o.thumb.dir],p=k=>{let h=1/0;for(let A=0;A<3;A++)h=Math.min(h,pa(e,l,o.fingers,{dir:k,bend:[0,0]},t,ie.thumb(A),ze.len[A],ze.r[A]));return h},w=a.thumbLimit,x=f.create(),M=f.create(),v=(k,h=[0,0])=>{if(!w)return 0;let A=mt(o.fingers,{dir:k,bend:h},t),P=0;for(let S=0;S<3;S++){let T=A[ie.thumb(S)];f.scaleAndAdd(M,T.p,f.transformQuat(x,[0,0,-1],T.q),ze.len[S]),f.transformMat4(x,M,l),P+=Math.max(0,x[1]-w.maxY),S===2&&w.maxX!==void 0&&(P+=Math.max(0,x[0]-w.maxX))}return P},g=(k,h)=>{let A=X.multiply(X.create(),X.setAxisAngle(X.create(),[0,0,1],k*Math.PI/180),X.setAxisAngle(X.create(),[1,0,0],h*Math.PI/180)),P=f.transformQuat(f.create(),y,A);return[P[0],P[1],P[2]]};if(w){let k=T=>{let z=-1/0;for(let L=0;L<3;L++)z=Math.max(z,-pa(e,l,o.fingers,T,t,ie.thumb(L),ze.len[L],ze.r[L],3)-Sc[L]);return z},h=mt(o.fingers,lr,t),A=T=>({dir:g(T[0],T[1]),bend:[T[3],T[4]],twist:T[2]*Math.PI/180}),P=T=>{if(T[3]<0||T[4]<0||T[3]>i[0]||T[4]>i[1])return 1/0;let z=A(T);mt(o.fingers,z,t,h);let L=0,I=0;for(let R=0;R<3;R++){let F=h[ie.thumb(R)];f.scaleAndAdd(M,F.p,f.transformQuat(x,[0,0,-1],F.q),ze.len[R]),f.transformMat4(x,M,l),L+=Math.max(0,x[1]-w.maxY),R>0&&(I+=Math.abs(x[1]-(w.maxY-.012))),R===2&&w.maxX!==void 0&&(L+=Math.max(0,x[0]-w.maxX))}let G=x[2]*1e3+I*300;if(L>0)return 1e9+L*1e6+G;let j=Math.max(0,k(z));return j>0?1e6+j*1e6+G:G},S={c:1/0,x:[0,0,0,u[0],u[1]]};for(let T of Tc){let z=[T[0],T[1],T[2],.3,.2],L=P(z),I=[30,30,45,.4,.4];for(let G=0;G<400&&I[0]>1.5;G++){let j=!1;for(let R=0;R<5;R++)for(let F of[1,-1]){let N=[...z];N[R]+=F*I[R];let C=P(N);C<L&&(z=N,L=C,j=!0)}if(!j)for(let R=0;R<5;R++)I[R]*=.5}L<S.c&&(S={c:L,x:z})}if(S.c<1e6){let T=A(S.x);o.thumb.dir=T.dir,o.thumb.bend=T.bend,o.thumb.twist=T.twist,c.thumbTurnDeg=Math.round(S.x[0])}}else{if(p(y)<0){let k={pen:-p(y)*1e3,az:0,ax:0};for(let h=-60;h<=60;h+=5)for(let A=-30;A<=30;A+=5){if(!h&&!A)continue;let P=Math.max(0,-p(g(h,A)))*1e3+(Math.abs(h)+Math.abs(A))*.03;P<k.pen&&(k={pen:P,az:h,ax:A})}(k.az||k.ax)&&(o.thumb.dir=g(k.az,k.ax),c.thumbTurnDeg=k.az)}for(let k=0;k<2;k++){let h=A=>{let P={dir:o.thumb.dir,bend:o.thumb.bend.map((T,z)=>z===k?A:z>k?0:T)},S=1/0;for(let T=k+1;T<3;T++)S=Math.min(S,pa(e,l,o.fingers,P,t,ie.thumb(T),ze.len[T],ze.r[T]));return S};o.thumb.bend[k]=ai(h,0,Math.min(i[k],u[k]+.4),r)}}u.some((k,h)=>Math.abs(k-o.thumb.bend[h])>.001)&&(c.changed++,c.fingers.push({finger:4,from:u,to:[...o.thumb.bend]}))}return{pose:o,report:c}}function an(n,e,t={}){let a=tn(e);if(!a)return{grips:n,reports:{}};let r={},s=t.thumbLimit??{maxY:e.muzzle[1]-.002,maxX:.004},i=(c,l,b,d,m=!0)=>{if(!l)return l;let u=zc(l,a,b,{...t,lockIndex:d,fitThumb:m,thumbLimit:b===1?s:void 0});return r[c]=u.report,u.pose},o={...n,right:i("right",n.right,1,!1),left:i("left",n.left,-1,!1),leftOnMagazine:i("leftOnMagazine",n.leftOnMagazine,-1,!1)};if(n.indexPressed){let c=i("indexPressed",{...o.right,fingers:[n.indexPressed,o.right.fingers[1],o.right.fingers[2],o.right.fingers[3]]},1,!1,!1);o.indexPressed=c.fingers[0]}for(let c of Object.keys(n)){if(c==="right"||c==="left"||c==="leftOnMagazine"||c==="indexPressed")continue;let l=n[c];l&&typeof l=="object"&&"fingers"in l&&(o[c]=i(c,l,-1,!1))}return{grips:o,reports:r}}function ri(n,e,t=.1){let a=tn(n);return a?ga(a,f.create(e[0],e[1],e[2]),t):t}function ni(n,e,t){let a=tn(e);if(!a)return null;let r=dr(n),s=mt(n.fingers,n.thumb,t),i={},o=f.create(),c=f.create(),l=(u,y,p,w)=>{let x=s[y],M=f.transformQuat(f.create(),[0,0,-1],x.q),v=[];for(let g=0;g<=5;g++)f.scaleAndAdd(o,x.p,M,p*(g+.5)/6),f.transformMat4(c,o,r),v.push(Math.round((ga(a,c,.06)-w)*1e4)/10);i[u]=v};Xe.forEach((u,y)=>{for(let p=0;p<3;p++)l(`f${y}${p}`,ie.finger(y,p),u.len[p],u.r[p])});for(let u=0;u<3;u++)l(`t${u}`,ie.thumb(u),ze.len[u],ze.r[u]);let b=[];for(let u=0;u<=3;u++)for(let y=-1;y<=1;y++){let p=Pe.z0+(Pe.z1-Pe.z0)*(u/3),w=Pe.t0+(Pe.t1-Pe.t0)*(u/3),x=(Pe.w0+(Pe.w1-Pe.w0)*(u/3))*.8;f.transformMat4(c,[y*x*t,-w,p],r),b.push(Math.round(ga(a,c,.05)*1e4)/10)}i.palm=b;let d=f.transformMat4(f.create(),[0,0,0],r),m=f.transformMat4(f.create(),s[ie.finger(1,0)].p,r);for(let u=0;u<3;u++){let y=s[ie.finger(0,u)],p=f.transformQuat(f.create(),[0,0,-1],y.q),w=[];for(let x=0;x<=2;x++)f.scaleAndAdd(o,y.p,p,Xe[0].len[u]*(.3+.7*(x/2))),f.transformMat4(c,o,r),w.push(...Array.from(c).map(M=>Math.round(M*1e4)/1e4));i[`f0${u}_pos`]=w}for(let u=0;u<3;u++){let y=s[ie.thumb(u)],p=f.transformQuat(f.create(),[0,0,-1],y.q);f.scaleAndAdd(o,y.p,p,ze.len[u]),f.transformMat4(c,o,r),i[`t${u}_pos`]=Array.from(c).map(w=>Math.round(w*1e4)/1e4)}return i.wristW=Array.from(d).map(u=>Math.round(u*1e4)/1e4),i.middleKnuckleW=Array.from(m).map(u=>Math.round(u*1e4)/1e4),i}var si=["Index","Middle","Ring","Pinky"],ii=n=>n.replace(/^.*[:|]/,"").replace(/^mixamorig\d*_?/i,""),mr=class n{objects=[];asset;inst;skin;restLocal;restWorld;parent;order;sides;keepSet;jointData;rigScale=1;visible=!0;opts;constructor(e,t,a={}){this.inst=t,this.asset=t.asset,this.opts={shoulderRight:a.shoulderRight??[.19,-.3,.1],shoulderLeft:a.shoulderLeft??[-.19,-.3,.1],keep:a.keep??[],viewmodel:a.viewmodel??!0};let r=this.asset;if(!r.skins.length)throw new Error("SkinnedArms: the model has no skin");this.skin={joints:r.skins[0].joints,ibm:r.skins[0].inverseBindMatrices},this.parent=r.nodes.map(b=>b.parent),this.restLocal=r.nodes.map(b=>({t:f.create(...b.translation),r:X.fromValues(...b.rotation),s:f.create(...b.scale)})),this.restWorld=Cr(r),this.order=[];let s=b=>{this.order.push(b);for(let d of r.nodes[b].children)s(d)};r.nodes.forEach((b,d)=>{b.parent<0&&s(d)});let i=b=>r.nodes.findIndex(d=>ii(d.name)===b),o=b=>{let d=i(b);if(d<0)throw new Error(`SkinnedArms: bone "${b}" not found (Mixamo naming expected)`);return d},c=b=>f.create(this.restWorld[b][12],this.restWorld[b][13],this.restWorld[b][14]);this.sides=["Right","Left"].map((b,d)=>{let m=d===0?1:-1,u=o(`${b}Arm`),y=o(`${b}ForeArm`),p=o(`${b}Hand`),w=si.map(T=>[1,2,3].map(z=>i(`${b}Hand${T}${z}`))),x=[1,2,3].map(T=>i(`${b}HandThumb${T}`)),M=c(p),v=w[1][0]>=0?c(w[1][0]):f.add(f.create(),M,f.sub(f.create(),M,c(y))),g=f.normalize(f.create(),f.sub(f.create(),v,M)),k=w[0][0]>=0&&w[3][0]>=0?f.normalize(f.create(),f.sub(f.create(),c(w[0][0]),c(w[3][0]))):f.create(0,0,1),h=f.normalize(f.create(),f.cross(f.create(),k,g));x[0]>=0&&f.dot(f.sub(f.create(),c(x[0]),M),h)>0&&f.scale(h,h,-1);let A={s:m,shoulder:i(`${b}Shoulder`),arm:u,fore:y,hand:p,fingers:w,thumb:x,armLen:f.distance(c(u),c(y)),foreLen:f.distance(c(y),M),restFinger:g,restDorsal:h,restHandQ:U.getRotation(X.create(),this.restWorld[p]),flexLocal:new Map},P=f.scale(f.create(),h,-1),S=f.normalize(f.create(),f.cross(f.create(),g,P));for(let T of[...w.flat(),x[1],x[2]]){if(T<0)continue;let z=U.getRotation(X.create(),this.restWorld[T]),L=X.invert(X.create(),z);A.flexLocal.set(T,f.normalize(f.create(),f.transformQuat(f.create(),S,L)))}return A}),this.rigScale=Math.hypot(this.restWorld[this.sides[0].arm][0],this.restWorld[this.sides[0].arm][1],this.restWorld[this.sides[0].arm][2]),this.keepSet=new Set;let l=/^(Right|Left)(Shoulder|Arm|ForeArm|Hand.*)$/;r.nodes.forEach((b,d)=>{let m=ii(b.name);(l.test(m)||this.opts.keep.includes(m))&&this.keepSet.add(d)}),this.jointData=new Float32Array(this.skin.joints.length*16);for(let b of t.drawables){if(!b.skinned)continue;let d=new Te(b.mesh,b.material);d.viewmodel=this.opts.viewmodel,d.castShadow=!this.opts.viewmodel,d.joints=this.jointData,this.objects.push(d)}}static async fromAsset(e,t,a={}){return new n(e,Wt(e,t),a)}addTo(e){for(let t of this.objects)e.add(t);return this}setVisible(e){this.visible=e;for(let t of this.objects)t.visible=e}update(e,t,a,r={}){if(!this.visible||!a)return;let s=this.asset.nodes.length,i=this.restLocal.map(L=>({t:f.clone(L.t),r:X.copy(X.create(),L.r),s:f.clone(L.s)})),o=f.transformQuat(f.create(),[0,0,-1],a.rotation),c=Math.atan2(-o[0],-o[2]),l=X.fromEuler(X.create(),0,c,0),b=this.restWorld[this.sides[0].arm],d=this.restWorld[this.sides[1].arm],m=f.create((b[12]+d[12])/2,(b[13]+d[13])/2,(b[14]+d[14])/2),u=f.create((this.opts.shoulderRight[0]+this.opts.shoulderLeft[0])/2,(this.opts.shoulderRight[1]+this.opts.shoulderLeft[1])/2,(this.opts.shoulderRight[2]+this.opts.shoulderLeft[2])/2),y=f.add(f.create(),f.create(a.position[0],a.position[1],a.position[2]),f.transformQuat(f.create(),u,a.rotation)),p=X.multiply(X.create(),l,X.fromEuler(X.create(),0,Math.PI,0)),w=U.fromRotationTranslation(U.create(),p,y);U.translate(w,w,[-m[0],-m[1],-m[2]]);let x=new Array(s),M=new Array(s),v=(L=0)=>{for(let I=L;I<this.order.length;I++){let G=this.order[I],j=U.fromRotationTranslationScale(U.create(),i[G].r,i[G].t,i[G].s),R=this.parent[G];x[G]=R>=0?U.multiply(U.create(),x[R],j):U.multiply(U.create(),w,j),M[G]=U.getRotation(X.create(),x[G])}};v();let g=L=>f.create(x[L][12],x[L][13],x[L][14]),k=(L,I)=>{let G=this.parent[L],j=G>=0?M[G]:U.getRotation(X.create(),w);X.multiply(i[L].r,X.invert(X.create(),j),I)},h=(L,I,G)=>{let j=f.normalize(f.create(),f.sub(f.create(),g(I),g(L))),R=f.normalize(f.create(),f.sub(f.create(),G,g(L))),F=X.rotationTo(X.create(),j,R);k(L,X.multiply(X.create(),F,M[L]))},A=t.right,P=t.indexPressed&&(r.trigger??0)>0?Rc(A.fingers[0],t.indexPressed,r.trigger??0):A.fingers[0],S=t.left??null;r.leftOverride&&S?S=en(S,r.leftOverride,r.leftWeight??1):r.leftOverride&&(S=r.leftOverride);let T=[{...A,fingers:[P,A.fingers[1],A.fingers[2],A.fingers[3]]},S];this.sides.forEach((L,I)=>{let G=T[I];if(!G)return;let j=X.multiply(X.create(),U.getRotation(X.create(),e),et(G.fingerDir,G.dorsal)),R=f.transformMat4(f.create(),G.position,e),F=g(L.arm),N=L.armLen*this.rigScaleAt(L.arm,x),C=L.foreLen*this.rigScaleAt(L.arm,x),K=(N+C)*.995,q=f.distance(F,R),O=q>K?f.scaleAndAdd(f.create(),R,f.normalize(f.create(),f.sub(f.create(),F,R)),K):F;if(L.shoulder>=0&&q>K){let E=this.parent[L.shoulder],D=E>=0?Math.hypot(x[E][0],x[E][1],x[E][2]):1,J=f.transformQuat(f.create(),f.sub(f.create(),O,F),X.invert(X.create(),M[E]));i[L.shoulder].t=f.scaleAndAdd(i[L.shoulder].t,i[L.shoulder].t,J,1/Math.max(D,1e-9)),v()}let V=f.transformQuat(f.create(),[L.s*.7,-1,.15],a.rotation),B=Lc(g(L.arm),R,N,C,V);h(L.arm,L.fore,B),v(),h(L.fore,L.hand,R),v();let _=et(L.restFinger,L.restDorsal),ee=X.multiply(X.create(),U.getRotation(X.create(),w),_),W=X.multiply(X.create(),U.getRotation(X.create(),w),L.restHandQ),Y=X.multiply(X.create(),j,X.invert(X.create(),ee));k(L.hand,X.multiply(X.create(),Y,W)),si.forEach((E,D)=>{let J=G.fingers[D];L.fingers[D].forEach(($,ae)=>{if($<0)return;let se=L.flexLocal.get($);se&&(i[$].r=X.multiply(X.create(),this.restLocal[$].r,X.setAxisAngle(X.create(),se,J.curl[ae])))})});for(let E=1;E<3;E++){let D=L.thumb[E],J=D>=0?L.flexLocal.get(D):void 0;J&&(i[D].r=X.multiply(X.create(),this.restLocal[D].r,X.setAxisAngle(X.create(),J,G.thumb.bend[E-1]*.8)))}v()});let z=U.fromRotationTranslationScale(U.create(),X.create(),f.scaleAndAdd(f.create(),y,o,-.25),[1e-4,1e-4,1e-4]);this.skin.joints.forEach((L,I)=>{let G=this.skin.ibm.subarray(I*16,I*16+16),j=this.keepSet.has(L)?U.multiply(U.create(),x[L],G):z;this.jointData.set(j,I*16)})}rigScaleAt(e,t){let a=t[e];return Math.hypot(a[0],a[1],a[2])/Math.max(this.rigScale,1e-9)*this.rigScale/Math.max(Math.hypot(this.restWorld[e][0],this.restWorld[e][1],this.restWorld[e][2]),1e-9)}};function Rc(n,e,t){return{curl:[n.curl[0]+(e.curl[0]-n.curl[0])*t,n.curl[1]+(e.curl[1]-n.curl[1])*t,n.curl[2]+(e.curl[2]-n.curl[2])*t],spread:n.spread}}function Lc(n,e,t,a,r){let s=f.sub(f.create(),e,n),i=f.length(s),o=f.scale(f.create(),s,1/Math.max(i,1e-6));i=Math.min(i,(t+a)*.9995);let c=(t*t-a*a+i*i)/(2*i),l=Math.sqrt(Math.max(0,t*t-c*c)),b=f.scaleAndAdd(f.create(),r,o,-f.dot(r,o));f.normalize(b,b);let d=f.scaleAndAdd(f.create(),n,o,c);return f.scaleAndAdd(d,d,b,l)}var Ic=(function(){var n="b9H79Tebbbe;veC9Geueu9Geub9Gbb9Gsuuuuuuuuuuuu99uueu9Gvuuuuub9Gruuuuuuub9Gouuuuuue999Gvuuuuueu9Gzuuuuuuuuuuu99uuuub9Gquuuuuuu99uueu9GPuuuuuuuuuuu99uueu9Gquuuuuuuu99ueu9Gruuuuuu99eu9Gwuuuuuu99ueu9Giuuue999GDuuuuuuuuueu9Gkuuuuuuuu99uub9Gluuuueu9Gluuuub9Giuuueui3EdilvorlwDiqkrxmPszdHObAAbeAlve9Weiiviebeoweuecj:Gdkr:Sdmo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bbz9TW79O9V9Wt9F79P9T9W29P9M95bw8E9TW79O9V9Wt9F79P9T9W29P9M959x9Pt9OcttV9P9I91tW7bD8A9TW79O9V9Wt9F79P9T9W29P9M959x9Pt9O9v9W9K9HtWbqQ9TW79O9V9Wt9F79P9T9W29P9M959t29V9W9W95bkX9TW79O9V9Wt9F79P9T9W29P9M959qV919UWbmQ9TW79O9V9Wt9F79P9T9W29P9M959q9V9P9Ut7bPX9TW79O9V9Wt9F79P9T9W29P9M959t9J9H2WbsP9TW79O9V9Wt9FVW9TW79Obza9TW79O9V9Wt9F9V9Wt9P9T9P96W9wWVtW94SWt9J9O9sW9T9H9WbA59TW79O9V9Wt9F9NW9UWV9HtW9q9V79Pt9P9V9U9sW9T9H9WbCl79IV9RbXDwebcekdKYq:p:1dElbzOk:Q:tekYue99iuQ99eui99Due99xue9:w998Jjjjjbcj;sb9Rgs8Kjjjjbcbhzasc:Cefcbc;Kbz:xjjjb8AdnabaeSmbabaeadcdtz:wjjjb8AkdnamcdGTmbalcrfci4cbyd;y:L:cjbHjjjjbbhHasc:Cefasyd;8egecdtfaHBdbasaecefBd;8ecbhlcbhednadTmbabheadhOinaHaeydbci4fcb86bbaeclfheaOcufgOmbkcbhlabheadhOinaHaeydbgAci4fgCaCRbbgCceaAcrGgAtV86bbaCcu7aA4ceGalfhlaeclfheaOcufgOmbkcualcdtalcFFFFi0Ehekaecbyd;y:L:cjbHjjjjbbhzasc:Cefasyd;8egecdtfazBdbasaecefBd;8ealcd4alfhOcehHinaHgecethHaeaO6mbkcbhXcuaecdtgOaecFFFFi0Ecbyd;y:L:cjbHjjjjbbhHasc:Cefasyd;8egAcdtfaHBdbasaAcefBd;8eaHcFeaOz:xjjjbhQdnadTmbaecufhLcbhKindndnaQabaKcdtfgYydbgAc:v;t;h;Ev2aLGgOcdtfgCydbgHcuSmbceheinazaHcdtfydbaASmdaOaefhHaecefheaQaHaLGgOcdtfgCydbgHcu9hmbkkazaXcdtfaABdbaCaXBdbaXhHaXcefhXkaYaHBdbaKcefgKad9hmbkkaQcbyd;C:L:cjbH:bjjjbbasasyd;8ecufBd;8ekcbh8AcualcefgecdtaecFFFFi0Ecbyd;y:L:cjbHjjjjbbhKasc:Cefasyd;8egecdtfaKBdbasaKBdNeasaecefBd;8ecuadcitadcFFFFe0Ecbyd;y:L:cjbHjjjjbbhEasc:Cefasyd;8egecdtfaEBdbasaEBd:yeasaecefBd;8eascNefabadalcbz:cjjjbcualcdtgealcFFFFi0Eg3cbyd;y:L:cjbHjjjjbbhHasc:Cefasyd;8egOcdtfaHBdbasaOcefBd;8ea3cbyd;y:L:cjbHjjjjbbhXasc:Cefasyd;8egOcdtfaXBdbasaOcefBd;8eaHaXaialavazasc:Cefz:djjjbalcbyd;y:L:cjbHjjjjbbh5asc:Cefasyd;8egOcdtfa5BdbasaOcefBd;8ea3cbyd;y:L:cjbHjjjjbbhOasc:Cefasyd;8egAcdtfaOBdbasaAcefBd;8ea3cbyd;y:L:cjbHjjjjbbhAasc:Cefasyd;8egCcdtfaABdbasaCcefBd;8eaOcFeaez:xjjjbh8EaAcFeaez:xjjjbh8FdnalTmbindnaKa8AgAcefg8AcdtfydbgCaKaAcdtgefydbgOSmbaCaO9RhYaEaOcitfhaa8Faefhha8EaefhLcbhCindndnaaaCcitfydbgQaA9hmbaLaABdbahaABdbxekdnaKaQcdtggfgeclfydbgOaeydbgeSmbaOae9RhOaEaecitfheinaeydbaASmdaecwfheaOcufgOmbkka8FagfgeaAaQaeydbcuSEBdbaLaQaAaLydbcuSEBdbkaCcefgCaY9hmbkka8Aal9hmbkaHhOaXhAa8EhQa8FhCcbheindndnaeaOydbgL9hmbdnaeaAydbgL9hmbaQydbhLdnaCydbgYcu9hmbaLcu9hmba5aefcb86bbxikdnaYcuSmbaLcuSmbaeaYSmbaHaYcdtfydbaHaLcdtfydb9hmba5aefcd86bbxika5aefhadnaeaYSmbaeaLSmbaace86bbxikaacv86bbxdkdnaeaXaLcdtgYfydb9hmbdnaCydbgacuSmbaeaaSmbaQydbggcuSmbaeagSmba8FaYfydbghcuSmbahaLSmba8EaYfydbgYcuSmbaYaLSmbaHaacdtfydbgLaHaYcdtfydb9hmbaLaHagcdtfydbgYSmbaYaHahcdtfydb9hmba5aefcd86bbxika5aefcv86bbxdka5aefcv86bbxeka5aefa5aLfRbb86bbkaOclfhOaAclfhAaQclfhQaCclfhCalaecefge9hmbkdnamcaGTmbcbh8Jindndna5a8Jfg8KRbbg8Lc9:fPlbeebekdndndnaHa8Jcdtfydbgea8J9hmbcbhYcbh8MaqTmednazTmbcbh8Ma8JheinaqazaecdtgefydbfRbbce4a8MVceGh8MaXaefydbgea8J9hmbxikkcbh8Ma8JheinaqaefRbbce4a8MVceGh8MaXaecdtfydbgea8J9hmbxdkka5aefRbbhexeka8JheindnaKaecdtg8AfgeclfydbgOaeydbgeSmbaOae9RhgaEaecitfhhaHa8AfhacbhLinahaLcitfydbgQhednindnaKaecdtgCfgeclfydbgOaeydbgeSmbaOae9RhOaEaecitfheaaydbhAdninaHaeydbcdtfydbaASmeaecwfheaOcufgOTmdxbkkcbhexdkaXaCfydbgeaQ9hmbkcehekaYaeVhYaLcefgLag9hmbkkaXa8Afydbgea8J9hmbka8LclciaYceGEa8MEheka8Kae86bbka8Jcefg8Jal9hmbkkdnaqTmbdndnazTmbazheaHhOalhAindnaqaeydbfRbbceGTmba5aOydbfcv86bbkaeclfheaOclfhOaAcufgAmbxdkkaqheaHhOalhAindnaeRbbceGTmba5aOydbfcv86bbkaecefheaOclfhOaAcufgAmbkkaHhealhAa5hOindna5aeydbfRbbcv9hmbaOcv86bbkaeclfheaOcefhOaAcufgAmbkkamceGTmba5healhOindndnaeRbbcufPlbeebekaecv86bbkaecefheaOcufgOmbkkcbh8Ncualcx2alc;v:Q;v:Qe0Ecbyd;y:L:cjbHjjjjbbh8Kasc:Cefasyd;8egecdtfa8KBdbasaecefBd;8eascbBd:qeas9cb83i1ea8Kaialavazasc1efz:ejjjbhydndnaDmbcbh8PcbhaxekcbhaawhecbhOindnaeIdbJbbbb9ETmbasaacdtfaOBdbaacefhakaeclfheaDaOcefgO9hmbkcuaaal2gecdtaecFFFFi0Ecbyd;y:L:cjbHjjjjbbh8Pasc:Cefasyd;8egecdtfa8PBdbasaecefBd;8ealTmbdnaambcbhaxekarcd4hgdnazTmbaacdthhcbhLa8PhYinaoazaLcdtfydbag2cdtfhQasheaYhOaahAinaOaQaeydbcdtgCfIdbawaCfIdbNUdbaeclfheaOclfhOaAcufgAmbkaYahfhYaLcefgLal9hmbxdkkaacdthhcbhLa8PhYinaoaLag2cdtfhQasheaYhOaahAinaOaQaeydbcdtgCfIdbawaCfIdbNUdbaeclfheaOclfhOaAcufgAmbkaYahfhYaLcefgLal9hmbkkcualc8S2gOalc;D;O;f8U0EgCcbyd;y:L:cjbHjjjjbbheasc:Cefasyd;8egAcdtfaeBdbasaAcefBd;8eaecbaOz:xjjjbhIcbh8RcbhgdnaaTmbcbh8NaCcbyd;y:L:cjbHjjjjbbhgasc:Cefasyd;8egecdtfagBdbasaecefBd;8eagcbaOz:xjjjb8Acuaaal2gecltgOaecFFFFb0Ecbyd;y:L:cjbHjjjjbbh8Rasc:Cefasyd;8egecdtfa8RBdbasaecefBd;8ea8RcbaOz:xjjjb8AamcjjjjdGTmbcualcltgealcFFFFb0Ecbyd;y:L:cjbHjjjjbbh8Nasc:Cefasyd;8egOcdtfa8NBdbasaOcefBd;8ea8Ncbaez:xjjjb8AkdnadTmbcbhQabhOina8KaOclfydbgLcx2fgeIdba8KaOydbgYcx2fgAIdbg8S:tgRa8KaOcwfydbghcx2fgCIdlaAIdlg8U:tg8VNaeIdla8U:tg8WaCIdba8S:tg8XN:tg8Ya8YNa8WaCIdwaAIdwg8Z:tg80NaeIdwa8Z:tg8Wa8VN:tg81a81Na8Wa8XNaRa80N:tg80a80NMMg8V:rhBa8Yh8Xa80h8Wa81hRdna8VJbbbb9EgATmba8YaB:vh8Xa80aB:vh8Wa81aB:vhRkaIaHaYcdtfydbgCc8S2fgeaRaB:rg8VaRNNg83aeIdbMUdbaea8Wa8Va8WNgUNg85aeIdlMUdlaea8Xa8Va8XNg86Ng87aeIdwMUdwaeaRaUNgUaeIdxMUdxaea86aRNg88aeIdzMUdzaea8Wa86Ng89aeIdCMUdCaeaRa8Va8Xa8ZNaRa8SNa8Ua8WNMM:mg8:Ng86NgRaeIdKMUdKaea8Wa86Ng8WaeId3MUd3aea8Xa86Ng8XaeIdaMUdaaea86a8:Ng86aeId8KMUd8Kaea8VaeIdyMUdyaIaHaLcdtfydbgLc8S2fgea83aeIdbMUdbaea85aeIdlMUdlaea87aeIdwMUdwaeaUaeIdxMUdxaea88aeIdzMUdzaea89aeIdCMUdCaeaRaeIdKMUdKaea8WaeId3MUd3aea8XaeIdaMUdaaea86aeId8KMUd8Kaea8VaeIdyMUdyaIaHahcdtfydbgYc8S2fgea83aeIdbMUdbaea85aeIdlMUdlaea87aeIdwMUdwaeaUaeIdxMUdxaea88aeIdzMUdzaea89aeIdCMUdCaeaRaeIdKMUdKaea8WaeId3MUd3aea8XaeIdaMUdaaea86aeId8KMUd8Kaea8VaeIdyMUdydna8NTmbdnaATmba8YaB:vh8Ya80aB:vh80a81aB:vh81ka8NaCcltfgeaBJbbbZNgRa80Ng8VaeIdlMUdlaeaRa8YNg8WaeIdwMUdwaeaRa81Ng8XaeIdbMUdbaeaRa8S:ma81Na8Ua80N:ta8Za8YN:tNgRaeIdxMUdxa8NaLcltfgea8VaeIdlMUdlaea8WaeIdwMUdwaea8XaeIdbMUdbaeaRaeIdxMUdxa8NaYcltfgea8VaeIdlMUdlaea8WaeIdwMUdwaea8XaeIdbMUdbaeaRaeIdxMUdxkaOcxfhOaQcifgQad6mbkkdnalTmbJq;x8J88J;n;m;m89J:v:;;w8ZamczGEamc;abGEh80cbhOaHhCazhQaIhea8KhAindnaOaCydb9hmbaOhLdnazTmbaQydbhLka80hRdnaqTmbJbbjZa80aqaLfRbbclGEhRkaecxfgLaLIdbJbbbbMUdbaeczfgLaLIdbJbbbbMUdbaecCfgLaLIdbJbbbbMUdbaeaRaecyfgLIdbg8YNgRaeIdbMUdbaeclfgYaRaYIdbMUdbaecwfgYaRaYIdbMUdbaecKfgYaYIdbaAIdbg8WaRN:tUdbaAcwfIdbh8Vaec3fgYaYIdbaRaAclfIdbg8XN:tUdbaecafgYaYIdbaRa8VN:tUdbaec8KfgYIdbh81aLa8YaRMUdbaYa81aRa8Va8VNa8Wa8WNa8Xa8XNMMNMUdbkaCclfhCaQclfhQaec8SfheaAcxfhAalaOcefgO9hmbkkdnadTmbcbh8AabhLinaba8AcdtfhYcbheindna5aLaefydbgCfRbbgOTmba5aYaec:G:G:cjbfydbcdtfydbgQfRbbcFeGgATmbdnaOclSghmbaOci6mbaAclSmbaAcd0mekdnaOcd0mba8EaCcdtfydbaQ9hmekdnaAcd0mba8FaQcdtfydbaC9hmekdndnahmbaAcl9hmekaOciSmeaAciSmekJbbbZJbbbZJbbacaAcdSEaOcdSEhUdna8KaYaec:K:G:cjbfydbcdtfydbcx2fgOIdwa8KaCcx2fgAIdwg86:tg8Sa8KaQcx2fghIdwa86:tg8Xa8XNahIdbaAIdbg8U:tg80a80NahIdlaAIdlg8Z:tg8Va8VNMMg81Na8Xa8Sa8XNaOIdba8U:tg83a80Na8VaOIdla8Z:tg85NMMg8WN:tg8Ya8YNa83a81Na80a8WN:tgRaRNa85a81Na8Va8WN:tg8Wa8WNMMgBJbbbb9ETmba8YaB:rgB:vh8Ya8WaB:vh8WaRaB:vhRkaUa81:rNgBa8Ya86NaRa8UNa8Za8WNMM:mg81Ng87a81Nh88a80a85Na8Va83N:tg81a81Na8Va8SNa8Xa85N:tg8Va8VNa8Xa83Na80a8SN:tg8Xa8XNMMg83:rh80a8Ya87Nh85a8Wa87Nh89aRa87Nh87a8WaBa8YNg8SNh8:a8SaRNhZaRaBa8WNgnNhca8Ya8SNh8Ya8WanNh8WaRaBaRNNh8Sdna83Jbbbb9ETmba81a80:vh81a8Xa80:vh8Xa8Va80:vh8VkaIaHaCcdtfydbc8S2fgOaOIdba8Sa8VaUa80:rNgRa8VNNMg80MUdbaOa8Wa8XaRa8XNg8SNMg83aOIdlMUdlaOa8Ya81aRa81Ng8WNMg8YaOIdwMUdwaOaca8Va8SNMg8SaOIdxMUdxaOaZa8Wa8VNMgUaOIdzMUdzaOa8:a8Xa8WNMg8WaOIdCMUdCaOa87a8VaRa81a86Na8Va8UNa8Za8XNMMg86:mNgRNMg8VaOIdKMUdKaOa89a8XaRNMg8XaOId3MUd3aOa85a81aRNMg81aOIdaMUdaaOa88a86aRN:tgRaOId8KMUd8KaOaBaOIdyMUdyaIaHaQcdtfydbc8S2fgOa80aOIdbMUdbaOa83aOIdlMUdlaOa8YaOIdwMUdwaOa8SaOIdxMUdxaOaUaOIdzMUdzaOa8WaOIdCMUdCaOa8VaOIdKMUdKaOa8XaOId3MUd3aOa81aOIdaMUdaaOaRaOId8KMUd8KaOaBaOIdyMUdykaeclfgecx9hmbkaLcxfhLa8Acifg8Aad6mbkkdnamcjeGTmbalTmbcbh9cindnaKa9cgecdtgOfydbghaKaecefg9ccdtfydbg8M9pmba8Kaecx2fhDaIaHaOfydbgCc8S2fh8AindnaHaEahcitfgeydbgLcdtfydbg8JaC0mbaeydlh8LcuhAaLheindnaKaecdtgYfgeclfydbgOaeydbgeSmbaOae9RhOaEaecitfheindnaHaeydbcdtfydbaC9hmbaAcu9hhQaLhAaQmbaeclfydbhAkaecwfheaOcufgOmbkkaXaYfydbgeaL9hmbkaAaLSmbaAcuSmba8KaLcx2fgeIdbaDIdbg81:tgRa8Ka8Lcx2fgOIdlaDIdlg80:tg8XNaeIdla80:tg8VaOIdba81:tg8YN:tg86a8KaAcx2fgAIdba81:tg8Za8VNaAIdla80:tg83aRN:tg8SNa8VaOIdwaDIdwgB:tg8UNaeIdwaB:tg8Wa8XN:tg85a83a8WNaAIdwaB:tg87a8VN:tgUNa8Wa8YNaRa8UN:tg88a87aRNa8Za8WN:tg89NMMa86a86Na85a85Na88a88NMM:rJ:A:z9z:;Na8Sa8SNaUaUNa89a89NMM:rN9Gmbdna8Ua8Wa8WNaRaRNa8Va8VNMMg8SNa8Wa8Ua8WNa8YaRNa8Va8XNMMg86N:tg8Ua8UNa8Ya8SNaRa86N:tg8Ya8YNa8Xa8SNa8Va86N:tg86a86NMMg8XJbbbb9ETmba8Ua8X:rg8X:vh8Ua86a8X:vh86a8Ya8X:vh8Yka8S:rg8Xa8UaBNa8Ya81Na80a86NMM:mgUNg85aUNhUa8Ua85Nh88a86a85Nh89a8Ya85Nh8:a86a8Xa8UNg85NhZa85a8YNhna8Ya8Xa86NgcNhJa8Ua85Nh8Ua86acNh86a8Ya8Xa8YNNh85dna87a8SNa8Wa87a8WNa8ZaRNa8Va83NMMg8YN:tg8Wa8WNa8Za8SNaRa8YN:tgRaRNa83a8SNa8Va8YN:tg8Va8VNMMg8YJbbbb9ETmba8Wa8Y:rg8Y:vh8Wa8Va8Y:vh8VaRa8Y:vhRka8Aa8AIdba85aRa8XaRNNMg8SMUdba8Aa86a8Va8Xa8VNg8ZNMg86a8AIdlMUdla8Aa8Ua8Wa8Xa8WNg8YNMg8Ua8AIdwMUdwa8AaJaRa8ZNMg8Za8AIdxMUdxa8Aana8YaRNMg83a8AIdzMUdza8AaZa8Va8YNMg85a8AIdCMUdCa8Aa8:aRa8Xa8WaBNaRa81Na80a8VNMMg81:mNg8YNMgRa8AIdKMUdKa8Aa89a8Va8YNMg8Va8AId3MUd3a8Aa88a8Wa8YNMg8Wa8AIdaMUdaa8AaUa81a8YN:tg8Ya8AId8KMUd8Ka8Aa8Xa8XMg8Xa8AIdyMUdyaIa8Jc8S2fgea8SaeIdbMUdbaea86aeIdlMUdlaea8UaeIdwMUdwaea8ZaeIdxMUdxaea83aeIdzMUdzaea85aeIdCMUdCaeaRaeIdKMUdKaea8VaeId3MUd3aea8WaeIdaMUdaaea8YaeId8KMUd8Kaea8XaeIdyMUdykahcefgha8M9hmbkka9cal9hmbkkdnadTmbaaTmbcbhYinJbbbbh80a8KabaYcdtfgeclfydbgLcx2fgOIdwa8Kaeydbghcx2fgAIdwg8Z:tg8Va8VNaOIdbaAIdbg83:tg8Wa8WNaOIdlaAIdlg85:tg8Xa8XNMMg8Sa8Kaecwfydbg8Acx2fgeIdwa8Z:tg8YNa8Va8YNa8WaeIdba83:tg81Na8XaeIdla85:tgBNMMgRa8VN:tJbbbbJbbjZa8Sa8Ya8YNa81a81NaBaBNMMg8UNaRaRN:tg86:va86Jbbbb9BEg86Nh88a8Ua8VNaRa8YN:ta86Nh89a8SaBNaRa8XN:ta86Nh8:a8Ua8XNaRaBN:ta86NhZa8Sa81NaRa8WN:ta86Nhna8Ua8WNaRa81N:ta86Nhca8WaBNa8Xa81N:tgRaRNa8Xa8YNa8VaBN:tgRaRNa8Va81Na8Wa8YN:tgRaRNMM:rJbbbZNhRa8Pahaa2g8JcdtfhOa8Pa8Aaa2g8McdtfhAa8PaLaa2gDcdtfhCa8Z:mhJa85:mh9ea83:mhTascjdfheaahQJbbbbhBJbbbbh86Jbbbbh8SJbbbbh8UJbbbbh8ZJbbbbh83Jbbbbh85Jbbbbh87JbbbbhUinaecwfaRa89aCIdbaOIdbg8Y:tg8XNa88aAIdba8Y:tg81NMg8VNUdbaeclfaRaZa8XNa8:a81NMg8WNUdbaeaRaca8XNana81NMg8XNUdbaecxfaRaJa8VNa9ea8WNa8YaTa8XNMMMg8YNUdbaRa8Va8WNNa8ZMh8ZaRa8Va8XNNa8UMh8UaRa8Wa8XNNa8SMh8SaRa8Ya8YNNaUMhUaRa8Va8YNNa87Mh87aRa8Wa8YNNa85Mh85aRa8Xa8YNNa83Mh83aRa8Va8VNNa86Mh86aRa8Wa8WNNaBMhBaRa8Xa8XNNa80Mh80aOclfhOaCclfhCaAclfhAaeczfheaQcufgQmbkagahc8S2fgea80aeIdbMUdbaeaBaeIdlMUdlaea86aeIdwMUdwaea8SaeIdxMUdxaea8UaeIdzMUdzaea8ZaeIdCMUdCaea83aeIdKMUdKaea85aeId3MUd3aea87aeIdaMUdaaeaUaeId8KMUd8KaeaRaeIdyMUdyagaLc8S2fgea80aeIdbMUdbaeaBaeIdlMUdlaea86aeIdwMUdwaea8SaeIdxMUdxaea8UaeIdzMUdzaea8ZaeIdCMUdCaea83aeIdKMUdKaea85aeId3MUd3aea87aeIdaMUdaaeaUaeId8KMUd8KaeaRaeIdyMUdyaga8Ac8S2fgea80aeIdbMUdbaeaBaeIdlMUdlaea86aeIdwMUdwaea8SaeIdxMUdxaea8UaeIdzMUdzaea8ZaeIdCMUdCaea83aeIdKMUdKaea85aeId3MUd3aea87aeIdaMUdaaeaUaeId8KMUd8KaeaRaeIdyMUdya8Ra8JcltfhLcbhOaahCinaLaOfgeascjdfaOfgAIdbaeIdbMUdbaeclfgQaAclfIdbaQIdbMUdbaecwfgQaAcwfIdbaQIdbMUdbaecxfgeaAcxfIdbaeIdbMUdbaOczfhOaCcufgCmbka8RaDcltfhLcbhOaahCinaLaOfgeascjdfaOfgAIdbaeIdbMUdbaeclfgQaAclfIdbaQIdbMUdbaecwfgQaAcwfIdbaQIdbMUdbaecxfgeaAcxfIdbaeIdbMUdbaOczfhOaCcufgCmbka8Ra8McltfhLcbhOaahCinaLaOfgeascjdfaOfgAIdbaeIdbMUdbaeclfgQaAclfIdbaQIdbMUdbaecwfgQaAcwfIdbaQIdbMUdbaecxfgeaAcxfIdbaeIdbMUdbaOczfhOaCcufgCmbkaYcifgYad6mbkkcbhAdndnamcwGgSmbJbbbbh86cbh9hcbh9icbh6xekcbh9ha3cbyd;y:L:cjbHjjjjbbh6asc:Cefasyd;8egecdtfa6BdbasaecefBd;8ecua6alabadaHz:fjjjbgCcltaCcjjjjiGEcbyd;y:L:cjbHjjjjbbh9iasc:Cefasyd;8egecdtfa9iBdbasaecefBd;8ea9iaCa6a8Kalz:gjjjbJFFuuh86aCTmba9iheaChOinaeIdbgRa86a86aR9EEh86aeclfheaOcufgOmbkaCh9hkdnalTmbaKclfheaKydbhCa5hOalhQcbhAincbaeydbgLaC9RaORbbcpeGEaAfhAaOcefhOaeclfheaLhCaQcufgQmbkaAce4hAkcuadaA9Rcifg9kcx2a9kc;v:Q;v:Qe0Ecbyd;y:L:cjbHjjjjbbh0asc:Cefasyd;8egecdtfa0BdbasaecefBd;8ecua9kcdta9kcFFFFi0Ecbyd;y:L:cjbHjjjjbbh9masc:Cefasyd;8egecdtfa9mBdbasaecefBd;8ea3cbyd;y:L:cjbHjjjjbbh9nasc:Cefasyd;8egecdtfa9nBdbasaecefBd;8ealcbyd;y:L:cjbHjjjjbbh9oasc:Cefasyd;8egecdtfa9oBdbasaecefBd;8eaxaxNayJbbjZamclGEg9pa9pN:vh87JbbbbhUdnadak9nmbdna9kci6mbamcjdGh9qaaclth9ra0cwfh9sJbbbbh85JbbbbhUinascNefabadalaHz:cjjjbabh8Acbh3cbh9tinaba9tcdtfh8McbheindnaHa8AaefydbgAcdtghfydbgCaHa8Maec:W:G:cjbfydbcdtfydbgOcdtg8JfydbgQSmba5aOfRbbgYco2a5aAfRbbgLfRb;a:G:cjbg8LaLco2aYfgDRb;a:G:cjbg9cVcFeGTmbdnaQaC9nmbaDRb;W:G:cjbcFeGmekdnaLcufcFeGce0mbaYTmba8EahfydbaO9hmekdnaLTmbaYcufcFeGce0mba8Fa8JfydbaA9hmeka0a3cx2fgCaOaAa9ccFeGgQEBdlaCaAaOaQEBdbaCaQa8LGcb9hBdwa3cefh3kaeclfgecx9hmbkdna9tcifg9tad9pmba8Acxfh8Aa3cifa9k9nmekka3TmdcbhDinaIaHa0aDcx2fghydbgLcdtgCfydbg8Jc8S2fgeIdwa8KahydlgYcx2fgOIdwg8WNaeIdzaOIdbg8XNaeIdaMgRaRMMa8WNaeIdlaOIdlg8YNaeIdCa8WNaeId3MgRaRMMa8YNaeIdba8XNaeIdxa8YNaeIdKMgRaRMMa8XNaeId8KMMM:lhRJbbbbJbbjZaeIdyg8V:va8VJbbbb9BEh8Vdndnahydwg8MmbJFFuuhBxekJbbbbJbbjZaIaHaYcdtfydbc8S2fgeIdyg81:va81Jbbbb9BEaeIdwa8KaLcx2fgOIdwg81NaeIdzaOIdbg80NaeIdaMgBaBMMa81NaeIdlaOIdlgBNaeIdCa81NaeId3Mg81a81MMaBNaeIdba80NaeIdxaBNaeIdKMg81a81MMa80NaeId8KMMM:lNhBka8VaRNh80dnaaTmbagaLc8S2fgAIdwa8WNaAIdza8XNaAIdaMgRaRMMa8WNaAIdla8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8PaYaa2gQcdtfhOa8RaLaa2g8AcltfheaAIdyh81aahAinaOIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaOclfhOaeczfheaAcufgAmbkaR:lgRa81aRa819DEaRa9qEh8Sdndna8MmbJbbbbhRxekagaYc8S2fgAIdwa8KaLcx2fgeIdwg8WNaAIdzaeIdbg8XNaAIdaMgRaRMMa8WNaAIdlaeIdlg8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8Pa8AcdtfhOa8RaQcltfheaAIdyh81aahAinaOIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaOclfhOaeczfheaAcufgAmbkaR:lgRa81aRa819DEaRa9qEhRka80a8SMh80aBaRMhBdndndna5aLfRbbc9:fPibeedkdna8Fa8Ea8EaCfydbaYSEaXaCfydbgQcdtfydbgCcu9hmbaXaYcdtfydbhCkagaQc8S2fgAIdwa8KaCcx2fgeIdwg8WNaAIdzaeIdbg8XNaAIdaMgRaRMMa8WNaAIdlaeIdlg8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8PaCaa2g8AcdtfhOa8RaQaa2g8JcltfheaAIdyh81aahAinaOIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaOclfhOaeczfheaAcufgAmbkaR:lgRa81aRa819DEaRa9qEh8Sdndna8MmbJbbbbhRxekagaCc8S2fgAIdwa8KaQcx2fgeIdwg8WNaAIdzaeIdbg8XNaAIdaMgRaRMMa8WNaAIdlaeIdlg8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8Pa8JcdtfhOa8Ra8AcltfheaAIdyh81aahAinaOIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaOclfhOaeczfheaAcufgAmbkaR:lgRa81aRa819DEaRa9qEhRka80a8SMh80aBaRMhBxdkaXaCfydbgCaLSmbaHaYcdtfydbh8Aindndna8EaCcdtgQfydbgecuSmbaHaecdtfydba8ASmekdna8FaQfydbgecuSmbaHaecdtfydba8ASmekaYhekagaCc8S2fgAIdwa8Kaecx2fgOIdwg8WNaAIdzaOIdbg8XNaAIdaMgRaRMMa8WNaAIdlaOIdlg8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8Paeaa2cdtfhOa8RaCaa2cltfheaAIdyh81aahAinaOIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaOclfhOaeczfheaAcufgAmbka80aR:lgRa81aRa819DEaRa9qEMh80aXaQfydbgCaL9hmbkkdna5aYfRbbgeciSmbaecl9hmeka8MTmbaXaYcdtfydbgCaYSmbindndna8EaCcdtgQfydbgecuSmbaHaecdtfydba8JSmekdna8FaQfydbgecuSmbaHaecdtfydba8JSmekaLhekagaCc8S2fgAIdwa8Kaecx2fgOIdwg8WNaAIdzaOIdbg8XNaAIdaMgRaRMMa8WNaAIdlaOIdlg8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8Paeaa2cdtfhOa8RaCaa2cltfheaAIdyh81aahAinaOIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaOclfhOaeczfheaAcufgAmbkaBaR:lgRa81aRa819DEaRa9qEMhBaXaQfydbgCaY9hmbkkahaBa80aBa809DgeEUdwahaLaYaea8Mcb9hGgeEBdlahaYaLaeEBdbaDcefgDa39hmbkascjdfcbcj;qbz:xjjjb8Aa9shea3hOinascjdfaeydbcA4cF8FGgAcFAaAcFA6EcdtfgAaAydbcefBdbaecxfheaOcufgOmbkcbhecbhOinascjdfaefgAydbhCaAaOBdbaCaOfhOaeclfgecj;qb9hmbkcbhea9shOinascjdfaOydbcA4cF8FGgAcFAaAcFA6EcdtfgAaAydbgAcefBdba9maAcdtfaeBdbaOcxfhOa3aecefge9hmbkadak9RgAci9Uh9udnalTmbcbhea9nhOinaOaeBdbaOclfhOalaecefge9hmbkkcbh9va9ocbalz:xjjjbh9caAcO9Uh9wa9uce4h9tcbh8Lcbh8Mdnina0a9ma8Mcdtfydbcx2fg8JIdwgRa879Emea8La9u9pmeJFFuuh8Vdna9ta39pmba0a9ma9tcdtfydbcx2fIdwJbb;aZNh8VkdnaRa8V9ETmbaRaU9ETmba8La9w0mdkdna9caHa8JydlgDcdtg9xfg8AydbgAfg9yRbba9caHa8Jydbghcdtg9zfydbgefg9ARbbVmba5ahfRbbh9BdndnaKaecdtfgOclfydbgCaOydbgOSmbaCaO9RhCa8KaAcx2fhLa8Kaecx2fhYaEaOcitfheindna9naeydbcdtfydbgOaASmba9naeclfydbcdtfydbgQaASmbaOaQSmba8KaQcx2fgQIdba8KaOcx2fgOIdbg8W:tgRaYIdlaOIdlg8X:tg80NaQIdla8X:tg8VaYIdba8W:tgBN:tg8YaRaLIdla8X:tg8SNa8VaLIdba8W:tg8UN:tg8XNa8VaYIdwaOIdwg81:tg8ZNaQIdwa81:tg8Wa80N:tg80a8VaLIdwa81:tg83Na8Wa8SN:tg8VNa8WaBNaRa8ZN:tg81a8Wa8UNaRa83N:tgRNMMa8Ya8YNa80a80Na81a81NMMa8Xa8XNa8Va8VNaRaRNMMN:rJbbj8:N9FmikaecwfheaCcufgCmbkkdndna9Bc99fcFeGce0mba9na9zfaDBdbaXa9zfydbgeahSmeina8AydbhAdndna8EaecdtgOfydbgecuSmbaHaecdtfydbaASmekdna8FaOfydbgecuSmbaHaecdtfydbaASmekaDheka9naOfaeBdbaXaOfydbgeah9hmbxdkkdndna9BcFeGcdSmbaDhexekdna8Fa8Ea8Ea9zfydbaDSEaXa9zfydbghcdtfydbgecu9hmbaXa9xfydbheka9na9zfaDBdbka9nahcdtfaeBdbka9Ace86bba9yce86bba8JIdwgRaUaUaR9DEhUa9vcefh9vcecda9BcFeGceSEa8Lfh8Lxeka9tcefh9tka8Mcefg8Ma39hmbkka9vTmddnalTmbcbhLcbhhindna9nahcdtgefydbgAahSmbaHaAcdtfydbh8AdnahaHaefydb9hg8JmbaIa8Ac8S2fgeaIahc8S2fgOIdbaeIdbMUdbaeaOIdlaeIdlMUdlaeaOIdwaeIdwMUdwaeaOIdxaeIdxMUdxaeaOIdzaeIdzMUdzaeaOIdCaeIdCMUdCaeaOIdKaeIdKMUdKaeaOId3aeId3MUd3aeaOIdaaeIdaMUdaaeaOId8KaeId8KMUd8KaeaOIdyaeIdyMUdya8NTmba8Na8Acltfgea8NahcltfgOIdbaeIdbMUdbaeaOIdlaeIdlMUdlaeaOIdwaeIdwMUdwaeaOIdxaeIdxMUdxkaaTmbagaAc8S2fgeagahc8S2g8MfgOIdbaeIdbMUdbaeaOIdlaeIdlMUdlaeaOIdwaeIdwMUdwaeaOIdxaeIdxMUdxaeaOIdzaeIdzMUdzaeaOIdCaeIdCMUdCaeaOIdKaeIdKMUdKaeaOId3aeId3MUd3aeaOIdaaeIdaMUdaaeaOId8KaeId8KMUd8KaeaOIdyaeIdyMUdya9raA2hYa8RhOaahCinaOaYfgeaOaLfgAIdbaeIdbMUdbaeclfgQaAclfIdbaQIdbMUdbaecwfgQaAcwfIdbaQIdbMUdbaecxfgeaAcxfIdbaeIdbMUdbaOczfhOaCcufgCmbka8JmbJbbbbJbbjZaIa8MfgeIdygR:vaRJbbbb9BEaeIdwa8Ka8Acx2fgOIdwgRNaeIdzaOIdbg8VNaeIdaMg8Wa8WMMaRNaeIdlaOIdlg8WNaeIdCaRNaeId3MgRaRMMa8WNaeIdba8VNaeIdxa8WNaeIdKMgRaRMMa8VNaeId8KMMM:lNgRa85a85aR9DEh85kaLa9rfhLahcefghal9hmbkcbhOa8EheindnaeydbgAcuSmbdnaOa9naAcdtgCfydbgA9hmbcuhAa8EaCfydbgCcuSmba9naCcdtfydbhAkaeaABdbkaeclfhealaOcefgO9hmbkcbhOa8FheindnaeydbgAcuSmbdnaOa9naAcdtgCfydbgA9hmbcuhAa8FaCfydbgCcuSmba9naCcdtfydbhAkaeaABdbkaeclfhealaOcefgO9hmbkka85aUaaEh85cbhOabhecbhAindnaHa9naeydbcdtfydbgLcdtfydbgCaHa9naeclfydbcdtfydbgYcdtfydbgQSmbaCaHa9naecwfydbcdtfydbg8AcdtfydbghSmbaQahSmbabaOcdtfgCaLBdbaCcwfa8ABdbaCclfaYBdbaOcifhOkaecxfheaAcifgAad6mbkdndnaSmbaOhdxekdnaOak0mbaOhdxekdna86a859FmbaOhdxekJFFuuh86cbhdabhecbhAindna9ia6aeydbgCcdtfydbcdtfIdbgRa859ETmbaeclf8Pdbh9CabadcdtfgQaCBdbaQclfa9C83dbaRa86a86aR9EEh86adcifhdkaecxfheaAcifgAaO6mbkkadak0mbxdkkascNefabadalaHz:cjjjbkdndnadak0mbadhYxekdnaSmbadhYxekdna86a879FmbadhYxekcehQina86Jbb;aZNgRa87aRa879DEh8WJbbbbhRdna9hTmba9ihea9hhOinaeIdbg8VaRa8Va8W9FEaRa8VaR9EEhRaeclfheaOcufgOmbkkJFFuuh86cbhYabhecbhOindna9ia6aeydbgAcdtfydbcdtfIdbg8Va8W9ETmbaeclf8Pdbh9CabaYcdtfgCaABdbaCclfa9C83dba8Va86a86a8V9EEh86aYcifhYkaecxfheaOcifgOad6mbkdnaQaYad9hVceGmbadhYxdkaRaUaUaR9DEhUaYak9nmecbhQaYhda86a879FmbkkdnamcjjjjdGTmba9ocbalz:xjjjbh8AdnaYTmbabheaYhOina8AaeydbgAfce86bba8AaHaAcdtfydbfce86bbaeclfheaOcufgOmbkkascNefabaYalaHz:cjjjbdndnalTmbcbhCindna8AaCfRbbTmbdna5aCfRbbPlbeebekdnaHaCcdtgLfydbgeaCSmba8KaCcx2fgOa8Kaecx2fgeydwBdwaOae8Pdb83dbxekaIaCc8S2fgQIdygnanJL:3;rUNgRMh87aQIdwgxaRMh8SaQIdlg9DaRMh8UaQIdbg9EaRMh81aQIdag9FaRa8KaCcx2fg8JIdwg88N:th8ZaQId3g9GaRa8JIdlg89N:th83aQIdKg9Ha8JIdbg8:aRN:th80JbbbbhZaQIdCg9IJbbbbMh85aQIdzg9JJbbbbMhBaQIdxg9KJbbbbMh86dndnaaTmbaChAinJbbbba87agaAc8S2fgOIdygR:vaRJbbbb9BEhRa8RaAaa2cltfheaOIdaa87Na8ZMh8ZaOId3a87Na83Mh83aOIdKa87Na80Mh80aOIdCa87Na85Mh85aOIdza87NaBMhBaOIdxa87Na86Mh86aOIdwa87Na8SMh8SaOIdla87Na8UMh8UaOIdba87Na81Mh81aahOina8ZaecwfIdbg8VaecxfIdbg8YNaRN:th8Za83aeclfIdbg8Wa8YNaRN:th83a85a8Wa8VNaRN:th85a81aeIdbg8Xa8XNaRN:th81a80a8Xa8YNaRN:th80aBa8Xa8VNaRN:thBa86a8Xa8WNaRN:th86a8Sa8Va8VNaRN:th8Sa8Ua8Wa8WNaRN:th8UaeczfheaOcufgOmbkaXaAcdtfydbgAaC9hmbka8NTmba8NaCcltfgeIdxhTaeIdwhcaeIdlhJaeIdbhRxekJbbbbhTJbbbbhcJbbbbhJJbbbbhRkaBa81:vg8Wa80Na8Z:ta85aBa86a81:vg8VN:tg8Za8Ua86a8VN:tg8Y:vg8Xa8Va80Na83:tg8UN:th83acaRa8WN:taJaRa8VN:tg86a8XN:tg85a8SaBa8WN:ta8Za8XN:tgB:vg8S:mh8Za86a8Y:vgc:mhJdnJbbbbaRaRa81:vg9eN:ta86acN:ta85a8SN:tg86:la87J:983:g81NgR9ETmba8Za83NaJa8UNa9ea80NaT:tMMa86:vhZka81:laR9ETmba8Y:laR9ETmbaB:laR9ETmba9e:maZNa8W:ma8ZaZNa83aB:vMgBNa8V:maJaZNa8X:maBNa8Ua8Y:vMMg85Na80:ma81:vMMMh87aKaLfgeclfydbgOaeydbge9RhhaEaecitfhLJbbbbhRdnaOaeSg8MmbJbbbbhRaLheahhAina8Kaeclfydbcx2fgOIdwa88:tg8Va8VNaOIdba8::tg8Va8VNaOIdla89:tg8Va8VNMMg8Va8Kaeydbcx2fgOIdwa88:tg8Wa8WNaOIdba8::tg8Wa8WNaOIdla89:tg8Wa8WNMMg8WaRaRa8W9DEgRaRa8V9DEhRaecwfheaAcufgAmbkaR:rgRaRNhRkaBa88:tg8Va8VNa87a8::tg8Va8VNa85a89:tg8Va8VNMMaR9EmbaQId8KhZdna8Mmbina8KaLclfydbcx2fgeIdba8KaLydbcx2fgOIdbg8W:tgRa89aOIdlg8X:tg80NaeIdla8X:tg8Va8:a8W:tg86N:tg8YaRa85a8X:tg8SNa8Va87a8W:tg8UN:tg8XNa8Va88aOIdwg81:tg8ZNaeIdwa81:tg8Wa80N:tg80a8VaBa81:tg83Na8Wa8SN:tg8VNa8Wa86NaRa8ZN:tg81a8Wa8UNaRa83N:tgRNMMa8Ya8YNa80a80Na81a81NMMa8Xa8XNa8Va8VNaRaRNMMN:rJbbj8:N9FmdaLcwfhLahcufghmbkkJbbbbJbbjZan:vanJbbbb9BEgRaxaBNa9Ja87Na9FMg8Va8VMMaBNa9Da85Na9IaBNa9GMg8Va8VMMa85Na9Ea87Na9Ka85Na9HMg8Va8VMMa87NaZMMM:lNaRaxa88Na9Ja8:Na9FMg8Va8VMMa88Na9Da89Na9Ia88Na9GMg8Va8VMMa89Na9Ea8:Na9Ka89Na9HMg8Va8VMMa8:NaZMMM:lNJbb;aZNJ:983:g81M9Emba8JaBUdwa8Ja85Udla8Ja87UdbkaCcefgCal9hmbkdnaambcbhaxdkcbhQindna8AaQfRbbTmbaHaQcdtgefydbaQ9hmba5aQfhhaXaefh8Ja8KaQcx2fhAa8PaQaa2cdtfh8McbhEincuhCdnahRbbc99fcFeGce0mbaQhCa8JydbgeaQSmba8PaEcdtgOfhLa8MaOfIdbhRaQhCinaChOcuhCdnaLaeaa2cdtfIdbaR9CmbaOcuSmbaOhCagaec8S2fIdyagaOc8S2fIdy9ETmbaehCkaXaecdtfydbgeaQ9hmbkka8PaEcdtfhLa8RaEcltfhKaQheinaLaeaa2cdtfJbbbbJbbjZagaeaCaCcuSEgOc8S2fIdygR:vaRJbbbb9BEaKaOaa2cltfgOIdwaAIdwNaOIdbaAIdbNaOIdlaAIdlNMMaOIdxMNUdbaXaecdtfydbgeaQ9hmbkaEcefgEaa9hmbkkaQcefgQal9hmbxdkkaambcbhakaiavaoarawaaala8Ka8Pazasayasc1efa5a8Aaqz:hjjjbkdnamcjjjjlGTmbazmbaYTmbabhecbhLina5aeydbgAfRbbc3thQaecwfgXydbhHcjjjj94hCdna8EaAcdtgEfydbaeclfgKydbgOSmbcjjjj94cba8FaOcdtfydbaASEhCkaeaQaCVaAVBdba5aOfRbbc3thacjjjj94hCcjjjj94hQdna8EaOcdtfydbaHSmbcjjjj94cba8FaHcdtfydbaOSEhQkaKaaaQVaOVBdba5aHfRbbc3thOdna8EaHcdtfydbaASmbcjjjj94cba8FaEfydbaHSEhCkaXaOaCVaHVBdbaecxfheaLcifgLaY6mbkkdnazTmbaYTmbaYheinabazabydbcdtfydbBdbabclfhbaecufgembkkdnaPTmbaPa9paU:rNUdbkdnasyd;8egHTmbaHcdtasc:Ceffc98fheinaeydbcbyd;C:L:cjbH:bjjjbbaec98fheaHcufgHmbkkascj;sbf8KjjjjbaYk;Yieouabydlhvabydbclfcbaicdtz:xjjjbhoadci9UhrdnadTmbdnalTmbaehwadhDinaoalawydbcdtfydbcdtfgqaqydbcefBdbawclfhwaDcufgDmbxdkkaehwadhDinaoawydbcdtfgqaqydbcefBdbawclfhwaDcufgDmbkkdnaiTmbcbhDaohwinawydbhqawaDBdbawclfhwaqaDfhDaicufgimbkkdnadci6mbinaecwfydbhwaeclfydbhDaeydbhidnalTmbalawcdtfydbhwalaDcdtfydbhDalaicdtfydbhikavaoaicdtfgqydbcitfaDBdbavaqydbcitfawBdlaqaqydbcefBdbavaoaDcdtfgqydbcitfawBdbavaqydbcitfaiBdlaqaqydbcefBdbavaoawcdtfgwydbcitfaiBdbavawydbcitfaDBdlawawydbcefBdbaecxfhearcufgrmbkkabydbcbBdbk:todDue99aicd4aifhrcehwinawgDcethwaDar6mbkcuaDcdtgraDcFFFFi0Ecbyd;y:L:cjbHjjjjbbhwaoaoyd9GgqcefBd9GaoaqcdtfawBdbawcFearz:xjjjbhkdnaiTmbalcd4hlaDcufhxcbhminamhDdnavTmbavamcdtfydbhDkcbadaDal2cdtfgDydlgwawcjjjj94SEgwcH4aw7c:F:b:DD2cbaDydbgwawcjjjj94SEgwcH4aw7c;D;O:B8J27cbaDydwgDaDcjjjj94SEgDcH4aD7c:3F;N8N27axGhwamcdthPdndndnavTmbakawcdtfgrydbgDcuSmeadavaPfydbal2cdtfgsIdbhzcehqinaqhrdnadavaDcdtfydbal2cdtfgqIdbaz9CmbaqIdlasIdl9CmbaqIdwasIdw9BmlkarcefhqakawarfaxGgwcdtfgrydbgDcu9hmbxdkkakawcdtfgrydbgDcuSmbadamal2cdtfgsIdbhzcehqinaqhrdnadaDal2cdtfgqIdbaz9CmbaqIdlasIdl9CmbaqIdwasIdw9BmikarcefhqakawarfaxGgwcdtfgrydbgDcu9hmbkkaramBdbamhDkabaPfaDBdbamcefgmai9hmbkkakcbyd;C:L:cjbH:bjjjbbaoaoyd9GcufBd9GdnaeTmbaiTmbcbhDaehwinawaDBdbawclfhwaiaDcefgD9hmbkcbhDaehwindnaDabydbgrSmbawaearcdtfgrydbBdbaraDBdbkabclfhbawclfhwaiaDcefgD9hmbkkk;:odvuv998Jjjjjbca9Rgocbyd1:G:cjbBdKaocb8Pdj:G:cjb83izaocbydN:G:cjbBdwaocb8Pd:m:G:cjb83ibdnadTmbaicd4hrdnabmbdnalTmbcbhwinaealawcdtfydbar2cdtfhDcbhiinaoczfaifgqaDaifIdbgkaqIdbgxaxak9EEUdbaoaifgqakaqIdbgxaxak9DEUdbaiclfgicx9hmbkawcefgwad9hmbxikkarcdthwcbhDincbhiinaoczfaifgqaeaifIdbgkaqIdbgxaxak9EEUdbaoaifgqakaqIdbgxaxak9DEUdbaiclfgicx9hmbkaeawfheaDcefgDad9hmbxdkkdnalTmbcbhwinabawcx2fgiaealawcdtfydbar2cdtfgDIdbUdbaiaDIdlUdlaiaDIdwUdwcbhiinaoczfaifgqaDaifIdbgkaqIdbgxaxak9EEUdbaoaifgqakaqIdbgxaxak9DEUdbaiclfgicx9hmbkawcefgwad9hmbxdkkarcdthlcbhwaehDinabawcx2fgiaeawar2cdtfgqIdbUdbaiaqIdlUdlaiaqIdwUdwcbhiinaoczfaifgqaDaifIdbgkaqIdbgxaxak9EEUdbaoaifgqakaqIdbgxaxak9DEUdbaiclfgicx9hmbkaDalfhDawcefgwad9hmbkkJbbbbaoIdbaoIdzgx:tgkakJbbbb9DEgkaoIdlaoIdCgm:tgPaPak9DEgkaoIdwaoIdKgP:tgsasak9DEhsdnabTmbadTmbJbbbbJbbjZas:vasJbbbb9BEhkinabakabIdbax:tNUdbabclfgoakaoIdbam:tNUdbabcwfgoakaoIdbaP:tNUdbabcxfhbadcufgdmbkkdnavTmbavaPUdwavamUdlavaxUdbkask:WlewudnaeTmbcbhvabhoinaoavBdbaoclfhoaeavcefgv9hmbkkdnaiTmbcbhrinadarcdtfhwcbhDinalawaDcdtgvyd:G:G:cjbcdtfydbcdtfydbhodnalawavfydbcdtfydbgqabaqcdtfgkydbgvSmbinakabavgqcdtfgxydbgvBdbaxhkaqav9hmbkkdnaoabaocdtfgkydbgvSmbinakabavgocdtfgxydbgvBdbaxhkaoav9hmbkkdnaqaoSmbabaqaoaqao0Ecdtfaqaoaqao6EBdbkaDcefgDci9hmbkarcifgrai6mbkkdnaembcbskcbhxindnalaxcdtgvfydbax9hmbaxhodnaxabavfgDydbgvSmbaDhqinaqabavgocdtfgkydbgvBdbakhqaoav9hmbkkaDaoBdbkaxcefgxae9hmbkcbhkabhvcbhoindndnaoalydbgq9hmbdnaoavydbgq9hmbavakBdbakcefhkxdkavabaqcdtfydbBdbxekavabaqcdtfydbBdbkalclfhlavclfhvaeaocefgo9hmbkakk;jiilud99euabcbaecltz:xjjjbhvdnalTmbadhoaihralhwinarcwfIdbhDarclfIdbhqavaoydbcltfgkarIdbakIdbMUdbakaqakIdlMUdlakaDakIdwMUdwakakIdxJbbjZMUdxaoclfhoarcxfhrawcufgwmbkkdnaeTmbavhkaehrinakcxfgoIdbhDaocbBdbakakIdbJbbbbJbbjZaD:vaDJbbbb9BEgDNUdbakclfgoaDaoIdbNUdbakcwfgoaDaoIdbNUdbakczfhkarcufgrmbkkdnalTmbinavadydbcltfgkaicwfIdbakIdw:tgDaDNaiIdbakIdb:tgDaDNaiclfIdbakIdl:tgDaDNMMgDakIdxgqaqaD9DEUdxadclfhdaicxfhialcufglmbkkdnaeTmbavcxfhkinabakIdbUdbakczfhkabclfhbaecufgembkkk:moerudnaoTmbaecd4hzdnavTmbaicd4hHavcdthOcbhAindnaPaAfRbbTmbaAhednaDTmbaDaAcdtfydbhekdnasTmbasaefRbbceGmekdnamaAfRbbcvSmbabaeaz2cdtfgiaraAcx2fgCIdbakNaxIdbMUdbaiaCIdlakNaxIdlMUdlaiaCIdwakNaxIdwMUdwkadaeaH2cdtfhXaqheawhiavhCinaXaeydbcdtgQfaiIdbalaQfIdb:vUdbaeclfheaiclfhiaCcufgCmbkkawaOfhwaAcefgAao9hmbxdkkdnasmbcbheaDhiindnaPaefRbbTmbaehCdnaDTmbaiydbhCkamaefRbbcvSmbabaCaz2cdtfgCarIdbakNaxIdbMUdbaCarclfIdbakNaxIdlMUdlaCarcwfIdbakNaxIdwMUdwkaiclfhiarcxfhraoaecefge9hmbxdkkdnaDTmbindnaPRbbTmbasaDydbgefRbbceGmbamRbbcvSmbabaeaz2cdtfgearIdbakNaxIdbMUdbaearclfIdbakNaxIdlMUdlaearcwfIdbakNaxIdwMUdwkaPcefhPaDclfhDamcefhmarcxfhraocufgombxdkkazcdthicbheindnaPaefRbbTmbasaefRbbceGmbamaefRbbcvSmbabarIdbakNaxIdbMUdbabclfarclfIdbakNaxIdlMUdbabcwfarcwfIdbakNaxIdwMUdbkarcxfhrabaifhbaoaecefge9hmbkkk8MbabaeadaialavcbcbcbcbcbaoarawaDz:bjjjbk8MbabaeadaialavaoarawaDaqakaxamaPz:bjjjbkRbababaeadaialavaoarawaDaqakaxcjjjjdVamz:bjjjbk:vgoque99due99duq998Jjjjjbc;Wb9Rgq8Kjjjjbcbhkaqcxfcbc;Kbz:xjjjb8Aaqcualcx2alc;v:Q;v:Qe0Ecbyd;y:L:cjbHjjjjbbgxBdxaqceBd2axaialavcbcbz:ejjjb8AaqcualcdtalcFFFFi0Egmcbyd;y:L:cjbHjjjjbbgiBdzaqcdBd2dndnJFF959eJbbjZawJbbjZawJbbjZ9DE:vawJ9VO:d869DEgw:lJbbb9p9DTmbaw:OhPxekcjjjj94hPkadci9Uhsarco9UhzdndnaombaPcd9imekdnalTmbaPcuf:YhwdnaoTmbcbhvaihHaxhOindndnaoavfRbbceGTmbavcjjjjlVhAxekdndnaOclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhAxekcjjjj94hAkaAcqthAdndnaOcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaAaXVhAdndnaOIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaAaXcCtVhAkaHaABdbaHclfhHaOcxfhOalavcefgv9hmbxdkkaxhvaihOalhHindndnavIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhAxekcjjjj94hAkaAcCthAdndnavclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaXcqtaAVhAdndnavcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaOaAaXVBdbavcxfhvaOclfhOaHcufgHmbkkadTmbcbhkaehvcbhOinakaiavclfydbcdtfydbgHaiavcwfydbcdtfydbgA9haiavydbcdtfydbgXaH9haXaA9hGGfhkavcxfhvaOcifgOad6mbkkarci9UhQdndnaz:Z:rJbbbZMgw:lJbbb9p9DTmbaw:Ohvxekcjjjj94hvkaQ:ZhLcbhKc:bwhzdninakaQ9pmeazaP9Rcd9imeavazcufgOavaO9iEaPcefavaP9kEhYdnalTmbaYcuf:YhwdnaoTmbcbhOaihHaxhvindndnaoaOfRbbceGTmbaOcjjjjlVhAxekdndnavclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhAxekcjjjj94hAkaAcqthAdndnavcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaAaXVhAdndnavIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaAaXcCtVhAkaHaABdbaHclfhHavcxfhvalaOcefgO9hmbxdkkaxhvaihOalhHindndnavIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhAxekcjjjj94hAkaAcCthAdndnavclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaXcqtaAVhAdndnavcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaOaAaXVBdbavcxfhvaOclfhOaHcufgHmbkkcbhOdnadTmbaehvcbhHinaOaiavclfydbcdtfydbgAaiavcwfydbcdtfydbgX9haiavydbcdtfydbgraA9haraX9hGGfhOavcxfhvaHcifgHad6mbkkdnas:ZgCaL:taY:Ygwaz:Y:tg8ANak:ZgEaO:Zg3:tNaEaL:tawaP:Y:tg5Na3aC:tNMg8EJbbbb9BmbaCaE:ta5a8Aa3aL:tNNNa8E:vawMhwkdndnaOaQ0mbaOhkaYhPxekaOhsaYhzkdndnaKcl0mbdnawJbbbZMgw:lJbbb9p9DTmbaw:Ohvxdkcjjjj94hvxekaPazfcd9ThvkaKcefgKcs9hmbkkdndndnakmbJbbjZhwcbhOcdhvaDmexdkalcd4alfhHcehOinaOgvcethOavaH6mbkaqcuavcdtavcFFFFi0Ecbyd;y:L:cjbHjjjjbbgYBdCaqciBd2aqamcbyd;y:L:cjbHjjjjbbgzBdKaqclBd2dnalTmbaPcuf:YhwdnaoTmbcbhOaihAaxhHindndnaoaOfRbbceGTmbaOcjjjjlVhXxekdndnaHclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaXcqthXdndnaHcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:Ohrxekcjjjj94hrkaXarVhXdndnaHIdbawNJbbbZMgC:lJbbb9p9DTmbaC:Ohrxekcjjjj94hrkaXarcCtVhXkaAaXBdbaAclfhAaHcxfhHalaOcefgO9hmbxdkkaxhOaihHalhAindndnaOIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaXcCthXdndnaOclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:Ohrxekcjjjj94hrkarcqtaXVhXdndnaOcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:Ohrxekcjjjj94hrkaHaXarVBdbaOcxfhOaHclfhHaAcufgAmbkkaqcuaYavazaialz:mjjjbgXc8S2gvaXc;D;O;f8U0Ecbyd;y:L:cjbHjjjjbbgiBd3aqcvBd2aicbavz:xjjjbhOdnadTmbcbhraehiinaxaiclfydbgocx2fgvIdbaxaiydbgPcx2fgHIdbg3:tgCaxaicwfydbgYcx2fgAIdlaHIdlg8A:tgwNavIdla8A:tgEaAIdba3:tg8EN:tgLaLNaEaAIdwaHIdwg5:tg8FNavIdwa5:tgEawN:tgwawNaEa8ENaCa8FN:tgCaCNMMg8E:rhEJbbnnJbbjZazaPcdtfydbgvazaocdtfydbgASavazaYcdtfydbgoSGgHEh8Fdna8EJbbbb9ETmbaLaE:vhLaCaE:vhCawaE:vhwkaOavc8S2fgvavIdbawa8FaE:rNgEawNNg8FMUdbavaCaEaCNgaNghavIdlMUdlavaLaEaLNg8ENggavIdwMUdwavawaaNgaavIdxMUdxava8EawNg8JavIdzMUdzavaCa8ENg8EavIdCMUdCavawaEaLa5Nawa3Na8AaCNMM:mg8ANg3NgwavIdKMUdKavaCa3NgCavId3MUd3avaLa3NgLavIdaMUdaava3a8ANg3avId8KMUd8KavaEavIdyMUdydnaHmbaOaAc8S2fgva8FavIdbMUdbavahavIdlMUdlavagavIdwMUdwavaaavIdxMUdxava8JavIdzMUdzava8EavIdCMUdCavawavIdKMUdKavaCavId3MUd3avaLavIdaMUdaava3avId8KMUd8KavaEavIdyMUdyaOaoc8S2fgva8FavIdbMUdbavahavIdlMUdlavagavIdwMUdwavaaavIdxMUdxava8JavIdzMUdzava8EavIdCMUdCavawavIdKMUdKavaCavId3MUd3avaLavIdaMUdaava3avId8KMUd8KavaEavIdyMUdykaicxfhiarcifgrad6mbkkcbhAaqcuaXcdtgvaXcFFFFi0Egicbyd;y:L:cjbHjjjjbbgHBdaaqcoBd2aqaicbyd;y:L:cjbHjjjjbbgiBd8KaqcrBd2aHcFeavz:xjjjbhPdnalTmbazhHinJbbbbJbbjZaOaHydbgrc8S2fgvIdygw:vawJbbbb9BEavIdwaxcwfIdbgwNavIdzaxIdbgCNavIdaMgLaLMMawNavIdlaxclfIdbgLNavIdCawNavId3MgwawMMaLNavIdbaCNavIdxaLNavIdKMgwawMMaCNavId8KMMM:lNhwdndnaParcdtgvfgrydbcuSmbaiavfIdbaw9ETmekaraABdbaiavfawUdbkaHclfhHaxcxfhxalaAcefgA9hmbkkdndnaXmbJbbbbhwxekJbbbbhwinaiIdbgCawawaC9DEhwaiclfhiaXcufgXmbkaw:rhwkakcd4akfhOcehiinaigvcethiavaO6mbkcbhOaqcuavcdtgiavcFFFFi0Ecbyd;y:L:cjbHjjjjbbgHBdyaHcFeaiz:xjjjbhXdnadTmbavcufhrcbhkcbhxindnazaeaxcdtfgvydbcdtfydbgiazavclfydbcdtfydbgOSmbaiazavcwfydbcdtfydbgvSmbaOavSmbaPavcdtfydbhAdndnaPaOcdtfydbgvaPaicdtfydbgi9pmbavaA9pmbaAhlaihoavhAxekdnaAai9pmbaAav9pmbaihlavhoxekavhlaAhoaihAkabakcx2fgvaABdbavcwfaoBdbavclfalBdbdnaXaoc:3F;N8N2alc:F:b:DD27aAc;D;O:B8J27arGgOcdtfgvydbgicuSmbcehHinaHhvdnabaicx2fgiydbaA9hmbaiydlal9hmbaiydwaoSmikavcefhHaXaOavfarGgOcdtfgvydbgicu9hmbkkavakBdbakcefhkkaxcifgxad6mbkakci2hOkcwhvaDTmekaDawUdbkavcdthvaqcxfc98fhiinaiavfydbcbyd;C:L:cjbH:bjjjbbavc98fgvmbkaqc;Wbf8KjjjjbaOk:0iewuabcFeaecdtz:xjjjbhbdnalmbcbskaecufhvdndnaiTmbcbhocbhrindndndnabaiarcdtgwfydbgDcm4aD7c:v;t;h;Ev2gecs4ae7avGgqcdtfgkydbgxcuSmbceheinaiaxcdtgxfydbaDSmdaqaefhxaecefheabaxavGgqcdtfgkydbgxcu9hmbkkakarBdbaoheaocefhoxekadaxfydbhekadawfaeBdbarcefgral9hmbxdkkcbhocbhDindnabaDcm4aD7c:v;t;h;Ev2gecs4ae7avGgqcdtfgkydbgxcuSmbaxaDSmbceheinabaqaefavGgqcdtfgkydbgxcuSmeaecefheaxaD9hmbkkdndnaxcu9hmbakaDBdbaoheaocefhoxekadaxcdtfydbhekadaDcdtfaeBdbaDcefgDal9hmbkkaok:3ldrue9:8Jjjjjbc;Wb9Rgr8Kjjjjbcbhwarcxfcbc;Kbz:xjjjb8AdnabaeSmbabaeadcdtz:wjjjb8AkarcualcdtalcFFFFi0EgDcbyd;y:L:cjbHjjjjbbgqBdxarceBd2aqcbaialavcbarcxfz:djjjbcualcx2alc;v:Q;v:Qe0Ecbyd;y:L:cjbHjjjjbbhkarcxfaryd2gxcdtfakBdbaraxcefgmBd2akaialavcbcbz:ejjjb8AarcxfamcdtfaDcbyd;y:L:cjbHjjjjbbgiBdbaraxcdfgvBd2arcxfavcdtfcuaialaeadaqz:fjjjbgecltaecjjjjiGEcbyd;y:L:cjbHjjjjbbgqBdbaqaeaiakalz:gjjjbaxcifhkdnadTmbaoaoNhocbhwabhlcbheindnaqaialydbgvcdtfydbcdtfIdbao9ETmbalclf8PdbhPabawcdtfgDavBdbaDclfaP83dbawcifhwkalcxfhlaecifgead6mbkkdnakTmbaxcdtarcxffcwfhlinalydbcbyd;C:L:cjbH:bjjjbbalc98fhlakcufgkmbkkarc;Wbf8Kjjjjbawk;lOoDud99oue99vuv998Jjjjjbc;Wb9Rgw8KjjjjbdndnarmbcbhDxekawcxfcbc;Kbz:xjjjb8Aawcuadcx2adc;v:Q;v:Qe0Ecbyd;y:L:cjbHjjjjbbgqBdxawceBd2aqaeadaicbcbz:ejjjb8AawcuadcdtadcFFFFi0Egkcbyd;y:L:cjbHjjjjbbgxBdzawcdBd2adcd4adfhecehiinaigmcethiamae6mbkcbhPawcuamcdtgsamcFFFFi0Ecbyd;y:L:cjbHjjjjbbgzBdCawciBd2dndnar:ZgH:rJbbbZMgO:lJbbb9p9DTmbaO:Ohixekcjjjj94hikamcufhAc:bwhCcbhXadhQcbhLinaiaCcufgeaiae9iEaPcefaiaP9kEhDdndnadTmbaDcuf:YhOaqhiaxheadhKindndnaiIdbaONJbbbZMgY:lJbbb9p9DTmbaY:Oh8Axekcjjjj94h8Aka8AcCth8AdndnaiclfIdbaONJbbbZMgY:lJbbb9p9DTmbaY:OhExekcjjjj94hEkaEcqta8AVh8AdndnaicwfIdbaONJbbbZMgY:lJbbb9p9DTmbaY:OhExekcjjjj94hEkaea8AaEVBdbaicxfhiaeclfheaKcufgKmbkazcFeasz:xjjjbh3cbh5cbh8Eindna3axa8Ecdtfydbg8Acm4a8A7c:v;t;h;Ev2gics4ai7aAGgKcdtfgEydbgecuSmbaea8ASmbcehiina3aKaifaAGgKcdtfgEydbgecuSmeaicefhiaea8A9hmbkkaEa8ABdba5aecuSfh5a8Ecefg8Ead9hmbxdkkazcFeasz:xjjjb8Acbh5kdnaQ:ZgYaH:taD:YgOaC:Y:tg8FNaX:Zgaa5:Zgh:tNaaaH:taOaP:Y:tggNahaY:tNMg8JJbbbb9BmbaYaa:taga8FahaH:tNNNa8J:vaOMhOkaPaDa5ar0geEhPaXa5aeEhXdna5arSmbaDaCaeEgCaP9Rcd9imbdndnaLcl0mbdnaOJbbbZMgO:lJbbb9p9DTmbaO:Ohixdkcjjjj94hixekaPaCfcd9Thika5aQaeEhQaLcefgLcs9hmekkdndnaXmbcihicbhDxekawakcbyd;y:L:cjbHjjjjbbg8ABdKawclBd2aPcuf:YhYdnadTmbaqhiaxheadhKindndnaiIdbaYNJbbbZMgO:lJbbb9p9DTmbaO:OhExekcjjjj94hEkaEcCthEdndnaiclfIdbaYNJbbbZMgO:lJbbb9p9DTmbaO:Oh3xekcjjjj94h3ka3cqtaEVhEdndnaicwfIdbaYNJbbbZMgO:lJbbb9p9DTmbaO:Oh3xekcjjjj94h3kaeaEa3VBdbaicxfhiaeclfheaKcufgKmbkkawcuazama8Aaxadz:mjjjbgDc32giaDc;j:KM;jb0Ecbyd;y:L:cjbHjjjjbbgeBd3awcvBd2aecbaiz:xjjjbh3avcd4hxdnadTmbdnalTmbaxcdth8Ea8AhEaqhealhKadhAina3aEydbc32fgiaeIdbaiIdbMUdbaiaeclfIdbaiIdlMUdlaiaecwfIdbaiIdwMUdwaiaKIdbaiIdxMUdxaiaKclfIdbaiIdzMUdzaiaKcwfIdbaiIdCMUdCaiaiIdKJbbjZMUdKaEclfhEaecxfheaKa8EfhKaAcufgAmbxdkka8AhKaqheadhEina3aKydbc32fgiaeIdbaiIdbMUdbaiaeclfIdbaiIdlMUdlaiaecwfIdbaiIdwMUdwaiaiIdxJbbbbMUdxaiaiIdzJbbbbMUdzaiaiIdCJbbbbMUdCaiaiIdKJbbjZMUdKaKclfhKaecxfheaEcufgEmbkkdnaDTmba3hiaDheinaiaiIdbJbbbbJbbjZaicKfIdbgO:vaOJbbbb9BEgONUdbaiclfgKaOaKIdbNUdbaicwfgKaOaKIdbNUdbaicxfgKaOaKIdbNUdbaiczfgKaOaKIdbNUdbaicCfgKaOaKIdbNUdbaic3fhiaecufgembkkcbhEawcuaDcdtgCaDcFFFFi0Egicbyd;y:L:cjbHjjjjbbgeBdaawcoBd2awaicbyd;y:L:cjbHjjjjbbg8EBd8KaecFeaCz:xjjjbh5dnadTmbaoJbbjZJbbjZaY:vaPceSENgOaONhYaxcdthxalheinaYaecN:H:cjbalEgKIdwa3a8AydbgAc32fgiIdC:tgOaONaKIdbaiIdx:tgOaONaKIdlaiIdz:tgOaONMMNaqcwfIdbaiIdw:tgOaONaqIdbaiIdb:tgOaONaqclfIdbaiIdl:tgOaONMMMhOdndna5aAcdtgifgKydbcuSmba8EaifIdbaO9ETmekaKaEBdba8EaifaOUdbka8Aclfh8AaqcxfhqaeaxfheadaEcefgE9hmbkkaba5aCz:wjjjb8Acrhikaicdthiawcxfc98fheinaeaifydbcbyd;C:L:cjbH:bjjjbbaic98fgimbkkawc;Wbf8KjjjjbaDk:Pdidui99ducbhi8Jjjjjbca9Rglcbyd1:G:cjbBdKalcb8Pdj:G:cjb83izalcbydN:G:cjbBdwalcb8Pd:m:G:cjb83ibdndnaembJbbjFhvJbbjFhoJbbjFhrxekadcd4cdthwincbhdinalczfadfgDabadfIdbgvaDIdbgoaoav9EEUdbaladfgDavaDIdbgoaoav9DEUdbadclfgdcx9hmbkabawfhbaicefgiae9hmbkalIdwalIdK:thralIdlalIdC:thoalIdbalIdz:thvkJbbbbavavJbbbb9DEgvaoaoav9DEgvararav9DEk:H8Modui99lud99Aus998Jjjjjbcji9RgD8KjjjjbcbhqaDcxfcbc;Kbz:xjjjb8AaDcbBdwaD9cb83ibaDcbyd;i:L:cjbBd1eaDcb8Pd;a:L:cjb83ijeaDcbyd;u:L:cjbBd94aDcb8Pd;m:L:cjb83i9WdndnavmbJbbjFhkJbbjFhxJbbjFhmxekaocd4cdthPalhsincbhzinaDcjefazfgHasazfIdbgkaHIdbgxaxak9EEUdbaDc;WbfazfgHakaHIdbgxaxak9DEUdbazclfgzcx9hmbkasaPfhsaqcefgqav9hmbkaDId94aDId1e:thmaDIdtaDId:ee:thxaDId9WaDIdje:thkkJbbbbhOdnar:YgAJq;x8J88MaA:vJbbbbakakJbbbb9DEgkaxaxak9DEgkamamak9DENgxJbbbb9Bmbarc9:f:Yax:vhOkaDcCfhCaDcxfcxfhXcbhzinaDazfaDcjefazfIdbgkaxaDc;WbfazfIdbak:t:tJbbb:;NMUdbazclfgzcx9hmbkcbhQaDarar2gLar2gzcbyd;y:L:cjbHjjjjbbgHBdxaDceBd2aHcbazz:xjjjbgKcbcbadaialaoaraOaDawz:rjjjbcdhYaDcuaLcdtaLcFFFFi0Eg8Acbyd;y:L:cjbHjjjjbbgEBdzaDcdBd2aDcjefcbarz:xjjjb8Acbh3dnaLTmbdnarcb9kmbaKhzaEhHaLhsincbh3aHcbcuazaDcjefarz:AjjjbEBdbazarfhzaHclfhHascufgsmbxdkkaKhPcbh3cbhvindndnaKavar2faDcjefarz:AjjjbTmbcbhHaPhzarhsinazaHazRbbgqfgHcbaqE86bbazcefhzascufgsmbkaEavcdtfa3BdbaHa3fh3xekaEavcdtfcuBdbkaParfhPavcefgvaL9hmbkkdnabTmbaDcua3cotgza3cFFF8F0Ecbyd;y:L:cjbHjjjjbbgQBdCcihYaDciBd2aQcbazz:xjjjb8AaXhCkdnawceGmbaCa8Acbyd;y:L:cjbHjjjjbbg5BdbaDaYcefgzBd2aDcxfazcdtfaLcbyd;y:L:cjbHjjjjbbgzBdbaDaYcdfgYBd2azcbaLz:xjjjbh8EarcufhXdnarci9imbarc9:fhCararcef2aKfcefh8Aceh8Fina8Far2hPa8AhvcehqindnaEaqaPfcdtfydbcuSmbavhzaChHinazazRbbgscuasE86bbazcefhzaHcufgHmbkkavarfhvaqcefgqaX9hmbka8AaLfh8Aa8Fcefg8FaX9hmbkkarce9imbcbh8Acbhqcbhvina8EaqfhscbhzindnasazfgHRbbmbaHce86bba5a8AcdtfaqazfBdba8Acefh8Akarazcefgz9hmbkaqarfhqavcefgvar9hmbka8ATmbaKcefhaaKc9:fhharc9:fhgarci9ih8Jina8Ea5a8Acufg8Acdtfydbgvfcb86bbavar2hPdna8JmbaEavcdtfydbcuSmbaKaPfhHaghqindnaHcefgzRbbgscFe9hmbaHRbbmbcbhskazas86bbazhHaqcufgqmbkaharavcef2fhzaXhsindnazRbbgHcFe9hmbazcefRbbmbcbhHkazaH86bbazcufhzascufgsce9kmbkkaaaPfh8Kavavar9Ug8Lar29Rh8FcbhCindnaCceScuaCEa8Ffgzce9imbazaX9ombcuaCciSaCcdSEa8LfgHce9imbaHaX9ombaEaHar2azfg8McdtfydbcuSmba8Jmbaaa8Mar2fhzcbhqa8KhsaghvinazazRbbgHcbaHaHcFeSEasRbbEgP86bbascefhsazcefhzaPaH7aqVhqavcufgvmbkaqcFeGTmba8Ea8MfgzRbbmbazce86bba5a8Acdtfa8MBdba8Acefh8AkaCcefgCcl9hmbka8AmbkkdnaQTmbaKaEaQadaialaoaraOaDawz:rjjjba3TmbJbbjZaO:vhkawcjjjjlGhPdnawcdGTmbJbbnnaOaON:vh8NakJbbbZNhyaQhzinazczfgsIdbg8PazcCfIdbgx:vhmazcxfgqIdbgIax:vhAazcwfgvIdbg8Rax:vh8SakazydbgHcFrG:ZNhRakaHcq4cFrG:ZNh8UakaHcC4cFrG:ZNh8VdnaxJ:p;c;188Ng8WazcKfIdbMg8X:laxJ:983:g81Ngx9ETmba8Wazc3fIdbMazc8KfIdbg8Ya8Ya8X:vg8YN:tg8Z:lax9ETmba8WazcafIdbMazcyfIdbg8Wa8Wa8X:vg80N:tazc8SfIdba8Wa8YN:tg8Wa8Wa8Z:vg8WN:tg81:lax9ETmba8PJ:p;c;188NazcUfIdb:ta80a8RJ:p;c;188Nazc8WfIdb:tg8PN:ta8WaIJ:p;c;188Nazc80fIdb:ta8Ya8PN:tgIN:ta81:vgxam:tg8Ra8RNa8Pa8X:va8YaIa8Z:va8WaxN:tg8XN:ta80axN:tg8Wa8S:tg8Ya8YNa8XaA:tg8Ya8YNMMa8N9DTmbaxaRaxaR9EEgxakaRMgmaxam9DEhma8Xa8Ua8Xa8U9EEgxaka8UMgAaxaA9DEhAa8Wa8Va8Wa8V9EEgxaka8VMg8Saxa8S9DEh8SkdnaPTmbayaRMhmaya8UMhAaya8VMh8SkasamUdbaqaAUdbava8SUdbazc;abfhza3cufg3mbxdkkdnaPTmbakJbbbZNhxaQhzinazczfaxakazydbgHcFrG:ZNMUdbazcxfaxakaHcq4cFrG:ZNMUdbazcwfaxakaHcC4cFrG:ZNMUdbazc;abfhza3cufg3mbxdkkaQcCfhzinazc98fgHaHIdbazIdbgk:vUdbazc94fgHaHIdbak:vUdbazctfgHaHIdbak:vUdbazc;abfhza3cufg3mbkkcbhsdndnarcd9imbarcufh3aEarcdtfhadnabmbaKcefg8Mararcefgz2fh8JaKazfhba8MaLfh8Ecbhscbh8Kina8Kar2h8La8Mheabh8Aa8Eh8Fa8Jh5cbhXindnaEaXa8LfgqcdtgzfgHclfydbaHydbGaaazfgzydbGazclfydbGcuSmbclcbaKaqar2fgzarfRbbEazRbbcb9hVczcbazaLfgzRbbEVc;abcbazarfRbbEVhPaehza8AhHa8Fhqa5hva3hQindnaPclcbaHRbbEazRbbcb9hVczcbaqRbbEVc;abcbavRbbEVgPcetVgCTmbaCcFeSmbasaCRb;W;p:cjbfhskazcefhzaHcefhHaqcefhqavcefhvaQcufgQmbkkaearfhea8Aarfh8Aa8Farfh8Fa5arfh5aXcefgXa39hmbka8MaLfh8MabaLfhba8EaLfh8Ea8JaLfh8Ja8Kcefg8Ka39hmbxdkkJbbjZaO:vgkakJk;x8J88NNh8RawcdGh8EaDIdwhkaDIdlhxaDIdbhmcbhscbhPinaPar2h8KcbhvindnaEava8KfgqcdtgzfgHclfydbaHydbGaaazfgzydbGazclfydbGcuSmbcbh8AclcbaKaqar2fgYarfRbbEaYRbbcb9hVczcbaYaLfg8JRbbEVc;abcba8JarfRbbEVh8Lindna8LclcbaYa8Ag8Mcefg8AfgzarfRbbEazRbbcb9hVczcba8Ja8AfgzRbbEVc;abcbazarfRbbEVg8LcetVgCTmbaCcFeSmbcbhqdndndnaCRb;W;n:cjbcufPdebdka8ETmeaCcC2gz8Ve;W:L:cjbcltaz8Ve;Y:L:cjbcsGVh8FaKa8Mfh5cxhzaDcjefhHinaHaQaEa8Faz4gqce4ceGavfaqcd4ceGaPfar2fgXcdtfydbcotfa5aqceGfaXar2fRbbcotfcnfBdbaHclfhHazc98fgzc989hmbkaDydjegzIdyaDyd:megHIdyMaDyd:eegqIdyaDyd1egXIdyMMg8XaqIdwaXIdwMJbbbZNgANazIdUaHIdUMaqIdUaXIdUMMg8WMg8Sa8SMazIdaaHIdaMaqIdaaXIdaMMg8YaqIdzaXIdzMJbbbZNg8SNMa8SNazId8SaHId8SMaqId8SaXId8SMMgRa8SNazId80aHId80MaqId80aXId80MMg8UMg8Sa8SMazId3aHId3MaqId3aXId3MMg8VaqIdxaXIdxMJbbbZNg8SNMa8SNazId8KaHId8KMaqId8KaXId8KMMg8Za8SNazId8WaHId8WMaqId8WaXId8WMMg80Mg8Sa8SMazIdKaHIdKMaqIdKaXIdKMMgyaANMaANazId88aHId88MaqId88aXId88MMg8PMMM:lgIa8RazIdCaHIdCMaqIdCaXIdCMMN9Ea8XazIdwaHIdwMJbbbZNgANa8WMg8Sa8SMa8YazIdzaHIdzMJbbbZNg8SNMa8SNaRa8SNa8UMg8Sa8SMa8VazIdxaHIdxMJbbbZNg8SNMa8SNa8Za8SNa80Mg8Sa8SMayaANMaANa8PMMM:laIJ;d;1UZN9DGhqxekaKa8Mfh8FcbhzcrhHindnaCaz4ceGTmba8FazceGfazce4ceGavfazcd4aPfar2fgqar2fRbbgXcFeSmbaQaEaqcdtfydbcotfaXcotfc9efRbbaH4ceGTmbcbhqxdkaHcufhHcehqazcefgzcw9hmbkkaCcC2aqcq2fgH8Ve;W:L:cjbgzTmbaHc;Y:L:cjbfhqaKa8MfhCabasc8K2fhHindnasae9pmbaHaQaEazcD4ceGavfazcq4ceGaPfar2fgXcdtfydbcotfaCazcw4ceGfaXar2fRbbcotfgXc9ifIdbamMUdbaHclfaXc9mfIdbaxMUdbaHcwfaXc9qfIdbakMUdbaHcxfamaQaEazcv4ceGavfazco4ceGaPfar2fgXcdtfydbcotfaCazcl4ceGfaXar2fRbbcotfgXc9ifIdbMUdbaHczfaxaXc9mfIdbMUdbaHcCfakaXc9qfIdbMUdbaHcKfamaQaEazce4ceGavfazcd4ceGaPfar2fgXcdtfydbcotfaCazceGfaXar2fRbbcotfgzc9ifIdbMUdbaHc3faxazc9mfIdbMUdbaHcafakazc9qfIdbMUdbkaHc8KfhHascefhsaq8Vebhzaqcdfhqazmbkka8Aa39hmbkkavcefgva39hmbkaPcefgPa39hmbkaDyd2gYTmekaYcdtaDcxffc98fhzinazydbcbyd;C:L:cjbH:bjjjbbazc98fhzaYcufgYmbkkaDcjif8Kjjjjbask;Kxmiue99due99euz99eui99eud99dud99oudnalTmbaocd4hkaqcdGhxarc99fhqarcethmawawMhPcbhsindndnawavaiascdtfgoclfydbak2cdtfgzIdwgHavaoydbak2cdtfgOIdwgA:tgCaCNazIdbgXaOIdbgQ:tgLaLNazIdlgKaOIdlgY:tg8Aa8ANMMgEavaocwfydbak2cdtfgoIdwg3aA:tg5a5NaoIdbg8EaQ:tg8Fa8FNaoIdlgaaY:tghahNMMggaEag9EEgEa3aH:tgHaHNa8EaX:tgHaHNaaaK:tgHaHNMMgHaEaH9EE:rNgHaHMgH:lJbbb9p9DTmbaH:Ohoxekcjjjj94hokdnaLahNa8Aa8FN:tgHaHNa8Aa5NaCahN:tgXaXNaCa8FNaLa5N:tgKaKNMMg3Jbbbb9BmbJbbjZhEdnaoceaoce9kEgoamaoam9iEg8Jcd9imbJbbjZa8J:Z:vhEkarcb9imbaAaDIdw:th8KaYaDIdl:th8LaQaDIdb:th8Ma8Jcba8Jcb9kEh8NdnadTmbaHJbbjZa3:rgA:vgQNg3aAa8Jcefa8Jcdf2:Y:vgANh8EaKaQNgKaANhyaXaQNgXaXaANNh8PcbhIina8Jcba8Jcb9kEcefh8RaEaI:ZNgQaCNa8KMhgaQa8ANa8LMh8SaQaLNa8MMhRcbhzindndnaPaEaz:ZNgQahNa8SMgYNgH:lJbbb9p9DTmbaH:OhOxekcjjjj94hOkaOce91goaqaoaq6Eh8UdndnaPaQa5NagMgHNga:lJbbb9p9DTmbaa:Oh8Vxekcjjjj94h8Vka8Ua8Vce91goaqaoaq6Eg8Wcefar2fcefgoar2h8XdndnaPaQa8FNaRMgQNga:lJbbb9p9DTmbaa:Oh8Yxekcjjjj94h8Ykadaeaocdtfydbcotfaba8Yce91goaqaoaq6Eg8Zfa8XfcefRbbcotfgocnfa8Ucqta8ZcCtVa8WVBdbaoc9efg8Ua8URbbcea8YceGaOcetcdGVa8VcdtclGVtV86bbaoc9ifgOaQaANaOIdbMUdbaoc9mfgOaYaANaOIdbMUdbaoc9qfgOaHaANaOIdbMUdbaoc9ufgOaAaOIdbMUdbdnaxTmbaoc9yfgOa8PaOIdbMUdbaoc9CfgOaKayNaOIdbMUdbaoc9GfgOa3a8ENaOIdbMUdbaoc9KfgOaXayNaOIdbMUdbaoc9OfgOaXa8ENaOIdbMUdbaoc2fgOaKa8ENaOIdbMUdbaoc9WfgOaXaAa3aHNaXaQNaKaYNMMgY:mNgQNaOIdbMUdbaoctfgOaKaQNaOIdbMUdbaoc94fgOa3aQNaOIdbMUdbaoc98fgoaoIdbaYaQN:tUdbka8Razcefgz9hmbka8Jcufh8JaIa8NShoaIcefhIaoTmbxdkkcbh8Vina8Jcba8Jcb9kEcefh8UaEa8V:ZNgAaCNa8KMhYaAa8ANa8LMhHaAaLNa8MMhXcbhoindndnaPaEao:ZNgAahNaHMNgQ:lJbbb9p9DTmbaQ:Ohzxekcjjjj94hzkazce91gzaqazaq6EhzdndnaPaAa5NaYMNgQ:lJbbb9p9DTmbaQ:OhOxekcjjjj94hOkazaOce91gOaqaOaq6Ecefar2fcefar2hzdndnaPaAa8FNaXMNgA:lJbbb9p9DTmbaA:OhOxekcjjjj94hOkabaOce91gOaqaOaq6Efazfcefce86bba8Uaocefgo9hmbka8Jcufh8Ja8Va8NShoa8Vcefh8VaoTmbkkascifgsal6mbkkk:Nvezu8Jjjjjbcjd9Rgb8Kjjjjbcbheabcbcjdz:xjjjbhdc:W:H:cjbhbinabRbbgicC2glabcqf8Veb87e;4:L:cjbalabcdfgv8Peb83e;W:L:cjbaiabcefRbb86b;W;n:cjbadaifce86bbalavabcxfceaetc:F:d;avGEgi8Peb83e;6:L:cjbalai8Vew87e:c:M:cjbabcQfhbaecefgecK9hmbkcbhoinc;Y:L:cjbhrcbhvindnadavfgwRbbce9hmbavcC2c;W:L:cjbfhDcbhbcehqavc;W;n:cjbfhkinabcitc:G:H:cjbfhlcbhbcbheinaeavab4ceGalabfRbbtVheabcefgbcw9hmbkdnadaecFeGgxfgmRbbmbaxcC2c;W:L:cjbfhPcbhbcehsindnaDabcq2gif8VebgbTmbaraifheaPaifhiinaialabcl4csGfRbbcltalabcw4csGfRbbcwtValabcsGfRbbV87ebaicdfhiae8VebhbaecdfheabmbkkcehbasceGhecbhsaembkamce86bbaxakRbb86b;W;n:cjbkcehbaqceGhlcbhqalmbkawcd86bbkarcCfhravcefgvcjd9hmbkaocefgoci9hmbkcbhic;W:L:cjbhvincuhlavhbinalcefhlab8Vebheabcdfhbaembkaial86b;W;p:cjbavcCfhvaicefgicjd9hmbkadcjdf8Kjjjjbk9DeeuabcFeaicdtz:xjjjbhlcbhbdnadTmbindnalaeydbcdtfgiydbcu9hmbaiabBdbabcefhbkaeclfheadcufgdmbkkabk;Bidqui998Jjjjjbc;Wb9Rgl8Kjjjjbalcxfcbc;Kbz:xjjjb8Aadcd4adfhvcehoinaogrcethoarav6mbkalcuarcdtgoarcFFFFi0Ecbyd;y:L:cjbHjjjjbbgvBdxavcFeaoz:xjjjbhwdnadTmbaicd4hDarcufhqcbhkindndnawcbaeakaD2cdtfgrydlgiaicjjjj94SEgocH4ao7c:F:b:DD2cbarydbgxaxcjjjj94SEgocH4ao7c;D;O:B8J27cbarydwgmamcjjjj94SEgrcH4ar7c:3F;N8N27aqGgvcdtfgrydbgocuSmbam::hPai::hsax::hzcehiinaihrdnaeaoaD2cdtfgiIdbaz9CmbaiIdlas9CmbaiIdwaP9BmikarcefhiawavarfaqGgvcdtfgrydbgocu9hmbkkarakBdbakhokabakcdtfaoBdbakcefgkad9hmbkkalydxcbyd;C:L:cjbH:bjjjbbalc;Wbf8Kjjjjbk9teiucbcbyd;G:L:cjbgeabcifc98GfgbBd;G:L:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabk9teiucbcbyd;G:L:cjbgeabcrfc94GfgbBd;G:L:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikTeeucbabcbyd;G:L:cjbge9Rcifc98GaefgbBd;G:L:cjbdnabZbcztge9nmbabae9RcFFifcz4nb8Akk6eiucbhidnadTmbdninabRbbglaeRbbgv9hmeaecefheabcefhbadcufgdmbxdkkalav9Rhikaikk;0vdbcj:Gdk;yvFFuuFFuuFFuuFFuFFFuFFFuFbbbbbbbbebbbdbbbbbbbebbbebbbdbbbbbbbbbbbeeeeeebebbeebbebbebbbeeebbbbebbbbbbbbbbbbbbbbbbbeeeeeeebebbbeeebbeebbbbbebbbbbebebbbbbbbbbbbbbbbdiorbelvlbodveribbbbbbbbbbbbbbbbbbbbbbebbbbbbbbbbbbbbbbbbbbbibbbbbbbbbbbbbbbbbbbbbobbbbbbbbbbbbbbbbbbbbbrbaebbbbbbbbbbbbbbbbbbsd8We8YbbbbbbbhiaebbbbbbQe8Ke9cebbbbbbbbbbbbbbbbLb8KebbbbbbbbbbbbbbbbbbKbbbbbbbbbbbbbbbbbbbbbYeJbilbbbbbbbbbbbbbbbbEe80e8WlbbbbbbzlAbbbbbbb5eJdnibbbbbbai8Kbbbbbbb8Ee9ce8Ylcibbbb8Yebbbbbbbb8FdOlAdbbbbbb80e8Ylbbbbbb88eTi8KiJv8Jlbbbbbbbbbbbb89e9td8Kv9qibbbbndlvaibbbbZd8Li8KvbbbbbbJdTibbbbbb9Pe81b9GvoiBvbbbbbbbbbbbb9Re9JbvoWibbbbvibbbbbbbb9VeWi9Gvbbbbbb8WvBbbbbbbb9:b9ceBvbbbbbbbbbbbbbbbbubWibbbbbbbbbbbbbbbbbb;Wd9hvSrbbbbbbWl9NvbbbbbbFbbbbbbbbbbbbbbbbbbbbbFFuuFFuuFFuuFFuFFFuFFFuFbc;y:Ldkxebbbdbbb;W:Obb",e=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var t,a=WebAssembly.instantiate(r(n),{}).then(function(g){t=g.instance,t.exports.__wasm_call_ctors()});function r(g){for(var k=new Uint8Array(g.length),h=0;h<g.length;++h){var A=g.charCodeAt(h);k[h]=A>96?A-97:A>64?A-39:A+4}for(var P=0,h=0;h<g.length;++h)k[P++]=k[h]<60?e[k[h]]:(k[h]-60)*64+k[++h];return k.buffer.slice(0,P)}function s(g){if(!g)throw new Error("Assertion failed")}function i(g){return new Uint8Array(g.buffer,g.byteOffset,g.byteLength)}function o(g,k,h,A){var P=t.exports.sbrk,S=P(h*4),T=P(h*A*4),z=new Uint8Array(t.exports.memory.buffer);z.set(i(k),T),g(S,T,h,A*4),z=new Uint8Array(t.exports.memory.buffer);var L=new Uint32Array(h);return new Uint8Array(L.buffer).set(z.subarray(S,S+h*4)),P(S-P(0)),L}function c(g,k,h){var A=t.exports.sbrk,P=A(k.length*4),S=A(h*4),T=new Uint8Array(t.exports.memory.buffer),z=i(k);T.set(z,P);var L=g(S,P,k.length,h);T=new Uint8Array(t.exports.memory.buffer);var I=new Uint32Array(h);new Uint8Array(I.buffer).set(T.subarray(S,S+h*4)),A(P-A(0));for(var G=0;G<k.length;++G)k[G]=I[k[G]];return[I,L]}function l(g){for(var k=0,h=0;h<g.length;++h){var A=g[h];k=k<A?A:k}return k}function b(g,k,h,A,P,S,T,z,L){var I=t.exports.sbrk,G=I(4),j=I(h*4),R=I(P*S),F=I(h*4),N=new Uint8Array(t.exports.memory.buffer);N.set(i(A),R),N.set(i(k),F);var C=g(j,F,h,R,P,S,T,z,L,G);N=new Uint8Array(t.exports.memory.buffer);var K=new Uint32Array(C);i(K).set(N.subarray(j,j+C*4));var q=new Float32Array(1);return i(q).set(N.subarray(G,G+4)),I(G-I(0)),[K,q[0]]}function d(g,k,h,A,P,S,T,z,L,I,G,j,R){var F=t.exports.sbrk,N=F(4),C=F(h*4),K=F(P*S),q=F(P*z),O=F(L.length*4),V=F(h*4),B=I?F(P):0,_=new Uint8Array(t.exports.memory.buffer);_.set(i(A),K),_.set(i(T),q),_.set(i(L),O),_.set(i(k),V),I&&_.set(i(I),B);var ee=g(C,V,h,K,P,S,q,z,O,L.length,B,G,j,R,N);_=new Uint8Array(t.exports.memory.buffer);var W=new Uint32Array(ee);i(W).set(_.subarray(C,C+ee*4));var Y=new Float32Array(1);return i(Y).set(_.subarray(N,N+4)),F(N-F(0)),[W,Y[0]]}function m(g,k,h,A,P,S,T,z,L,I,G,j,R){var F=t.exports.sbrk,N=F(4),C=F(P*S),K=F(P*z),q=F(L.length*4),O=F(h*4),V=I?F(P):0,B=new Uint8Array(t.exports.memory.buffer);B.set(i(A),C),B.set(i(T),K),B.set(i(L),q),B.set(i(k),O),I&&B.set(i(I),V);var _=g(O,h,C,P,S,K,z,q,L.length,V,G,j,R,N);B=new Uint8Array(t.exports.memory.buffer),i(k).set(B.subarray(O,O+_*4)),i(A).set(B.subarray(C,C+P*S)),i(T).set(B.subarray(K,K+P*z));var ee=new Float32Array(1);return i(ee).set(B.subarray(N,N+4)),F(N-F(0)),[_,ee[0]]}function u(g,k,h,A){var P=t.exports.sbrk,S=P(h*A),T=new Uint8Array(t.exports.memory.buffer);T.set(i(k),S);var z=g(S,h,A);return P(S-P(0)),z}function y(g,k,h,A,P,S,T,z){var L=t.exports.sbrk,I=L(z*4),G=L(h*A),j=P?L(h*S):0,R=new Uint8Array(t.exports.memory.buffer);R.set(i(k),G),P&&R.set(i(P),j);var F=g(I,G,h,A,j,S,T,z);R=new Uint8Array(t.exports.memory.buffer);var N=new Uint32Array(F);return i(N).set(R.subarray(I,I+F*4)),L(I-L(0)),N}function p(g,k,h,A,P,S,T,z,L){var I=t.exports.sbrk,G=I(4),j=I(h*4),R=I(P*S),F=I(h*4),N=T?I(P):0,C=new Uint8Array(t.exports.memory.buffer);C.set(i(A),R),C.set(i(k),F),T&&C.set(i(T),N);var K=g(j,F,h,R,P,S,N,z,L,G);C=new Uint8Array(t.exports.memory.buffer);var q=new Uint32Array(K);i(q).set(C.subarray(j,j+K*4));var O=new Float32Array(1);return i(O).set(C.subarray(G,G+4)),I(G-I(0)),[q,O[0]]}function w(g,k,h,A,P,S,T){var z=t.exports.sbrk,L=z(h*4),I=z(P*S),G=z(h*4),j=new Uint8Array(t.exports.memory.buffer);j.set(i(A),I),j.set(i(k),G);var R=g(L,G,h,I,P,S,T);j=new Uint8Array(t.exports.memory.buffer);var F=new Uint32Array(R);return i(F).set(j.subarray(L,L+R*4)),z(L-z(0)),F}function x(g,k,h,A,P,S){var T=t.exports.sbrk,z=T(h.byteLength),L=T(k.byteLength),I=new Uint8Array(t.exports.memory.buffer);I.set(i(h),z),I.set(i(k),L);var G=h.byteLength/A,j=g(0,0,L,k.length,z,G,A,P,S),R=T(j*9*4),F=g(R,j,L,k.length,z,G,A,P,S);s(F<=j),I=new Uint8Array(t.exports.memory.buffer);var N=new Float32Array(F*9);return i(N).set(I.subarray(R,R+N.byteLength)),T(z-T(0)),N}var M={LockBorder:1,Sparse:2,ErrorAbsolute:4,Prune:8,Regularize:16,Permissive:32,RegularizeLight:64,PreserveFolds:128,ErrorClamped:256,_InternalDebug:1<<30},v={Shell:1,Solve:2,Thicken:0,_InternalDebug:1<<30};return{ready:a,supported:!0,compactMesh:function(g){s(g instanceof Uint32Array||g instanceof Int32Array||g instanceof Uint16Array||g instanceof Int16Array),s(g.length%3==0);var k=g.BYTES_PER_ELEMENT==4?g:new Uint32Array(g),h=c(t.exports.meshopt_optimizeVertexFetchRemap,k,l(g)+1);if(g!==k)for(var A=0;A<k.length;++A)g[A]=k[A];return h},generatePositionRemap:function(g,k){return s(g instanceof Float32Array),s(g.length%k==0),s(k>=3),o(t.exports.meshopt_generatePositionRemap,g,g.length/k,k)},simplify:function(g,k,h,A,P,S){s(g instanceof Uint32Array||g instanceof Int32Array||g instanceof Uint16Array||g instanceof Int16Array),s(g.length%3==0),s(k instanceof Float32Array),s(k.length%h==0),s(h>=3),s(A>=0&&A<=g.length),s(A%3==0),s(P>=0);for(var T=0,z=0;z<(S?S.length:0);++z)s(S[z]in M),T|=M[S[z]];var L=g.BYTES_PER_ELEMENT==4?g:new Uint32Array(g),I=b(t.exports.meshopt_simplify,L,g.length,k,k.length/h,h*4,A,P,T);return I[0]=g instanceof Uint32Array?I[0]:new g.constructor(I[0]),I},simplifyWithAttributes:function(g,k,h,A,P,S,T,z,L,I){s(g instanceof Uint32Array||g instanceof Int32Array||g instanceof Uint16Array||g instanceof Int16Array),s(g.length%3==0),s(k instanceof Float32Array),s(k.length%h==0),s(h>=3),s(A instanceof Float32Array),s(A.length==P*(k.length/h)),s(P>=0),s(T==null||T instanceof Uint8Array),s(T==null||T.length==k.length/h),s(z>=0&&z<=g.length),s(z%3==0),s(L>=0),s(Array.isArray(S)),s(P>=S.length),s(S.length<=32);for(var G=0;G<S.length;++G)s(S[G]>=0);for(var j=0,G=0;G<(I?I.length:0);++G)s(I[G]in M),j|=M[I[G]];var R=g.BYTES_PER_ELEMENT==4?g:new Uint32Array(g),F=d(t.exports.meshopt_simplifyWithAttributes,R,g.length,k,k.length/h,h*4,A,P*4,new Float32Array(S),T,z,L,j);return F[0]=g instanceof Uint32Array?F[0]:new g.constructor(F[0]),F},simplifyWithUpdate:function(g,k,h,A,P,S,T,z,L,I){s(g instanceof Uint32Array||g instanceof Int32Array||g instanceof Uint16Array||g instanceof Int16Array),s(g.length%3==0),s(k instanceof Float32Array),s(k.length%h==0),s(h>=3),s(A instanceof Float32Array),s(A.length==P*(k.length/h)),s(P>=0),s(T==null||T instanceof Uint8Array),s(T==null||T.length==k.length/h),s(z>=0&&z<=g.length),s(z%3==0),s(L>=0),s(Array.isArray(S)),s(P>=S.length),s(S.length<=32);for(var G=0;G<S.length;++G)s(S[G]>=0);for(var j=0,G=0;G<(I?I.length:0);++G)s(I[G]in M),j|=M[I[G]];var R=g.BYTES_PER_ELEMENT==4?g:new Uint32Array(g),F=m(t.exports.meshopt_simplifyWithUpdate,R,g.length,k,k.length/h,h*4,A,P*4,new Float32Array(S),T,z,L,j);if(g!==R)for(var G=0;G<F[0];++G)g[G]=R[G];return F},getScale:function(g,k){return s(g instanceof Float32Array),s(g.length%k==0),s(k>=3),u(t.exports.meshopt_simplifyScale,g,g.length/k,k*4)},simplifyPoints:function(g,k,h,A,P,S){return s(g instanceof Float32Array),s(g.length%k==0),s(k>=3),s(h>=0&&h<=g.length/k),A?(s(A instanceof Float32Array),s(A.length%P==0),s(P>=3),s(g.length/k==A.length/P),y(t.exports.meshopt_simplifyPoints,g,g.length/k,k*4,A,P*4,S||0,h)):y(t.exports.meshopt_simplifyPoints,g,g.length/k,k*4,void 0,0,0,h)},simplifySloppy:function(g,k,h,A,P,S){s(g instanceof Uint32Array||g instanceof Int32Array||g instanceof Uint16Array||g instanceof Int16Array),s(g.length%3==0),s(k instanceof Float32Array),s(k.length%h==0),s(h>=3),s(A==null||A instanceof Uint8Array),s(A==null||A.length==k.length/h),s(P>=0&&P<=g.length),s(P%3==0),s(S>=0);var T=g.BYTES_PER_ELEMENT==4?g:new Uint32Array(g),z=p(t.exports.meshopt_simplifySloppy,T,g.length,k,k.length/h,h*4,A,P,S);return z[0]=g instanceof Uint32Array?z[0]:new g.constructor(z[0]),z},simplifyPrune:function(g,k,h,A){s(g instanceof Uint32Array||g instanceof Int32Array||g instanceof Uint16Array||g instanceof Int16Array),s(g.length%3==0),s(k instanceof Float32Array),s(k.length%h==0),s(h>=3),s(A>=0);var P=g.BYTES_PER_ELEMENT==4?g:new Uint32Array(g),S=w(t.exports.meshopt_simplifyPrune,P,g.length,k,k.length/h,h*4,A);return S=g instanceof Uint32Array?S:new g.constructor(S),S},remesh:function(g,k,h,A,P){s(g instanceof Uint32Array||g instanceof Int32Array||g instanceof Uint16Array||g instanceof Int16Array),s(g.length%3==0),s(k instanceof Float32Array),s(k.length%h==0),s(h>=3),s(A>=4&&A<=256);for(var S=0,T=0;T<(P?P.length:0);++T)s(P[T]in v),S|=v[P[T]];var z=g.BYTES_PER_ELEMENT==4?g:new Uint32Array(g);return x(t.exports.meshopt_remesh,z,k,h*4,A,S)}}})();var Kt=class n{constructor(e,t,a){this.renderer=e;this.baseUrl=t;this.manifest=a}models=new Map;materials=new Map;static async load(e,t="../../assets/"){let a=t.endsWith("/")?t:t+"/",r={version:1,textures:{},models:{}};try{let s=await fetch(a+"manifest.json",{cache:"no-cache"});s.ok&&(r={textures:{},models:{},...await s.json()})}catch{}return new n(e,a,r)}get empty(){return!Object.keys(this.manifest.textures).length&&!Object.keys(this.manifest.models).length}hasModel(e){return e in this.manifest.models}hasTexture(e){return e in this.manifest.textures}modelSlots(e){return Object.keys(this.manifest.models).filter(t=>t.startsWith(e))}model(e,t=!0){let a=this.models.get(e);if(!a){let r=this.manifest.models[e];a=r?er(this.baseUrl+r.file).then(s=>Wt(this.renderer,s,{keepSource:t})).catch(s=>(console.warn(`[oAxis] model ${e} failed to load`,s),null)):Promise.resolve(null),this.models.set(e,a)}return a}modelEntry(e){return this.manifest.models[e]}async weaponMapping(e){let t=r=>{if(r.autoOrient&&(r.lengthM===.85||r.lengthM===.19)){let{lengthM:s,...i}=r;return{...i,nominalLengthM:s}}return r},a=t({...this.manifest.models[e]?.hints?.weapon??{}});try{let r=await fetch(`${this.baseUrl}weapons/${e}.mapping.json`,{cache:"no-cache"});if(r.ok)return t({...a,...await r.json()})}catch{}return a}texture(e,t={}){let a=this.materials.get(e);if(!a){let r=this.manifest.textures[e];a=r?this.buildMaterial(e,r,t).catch(s=>(console.warn(`[oAxis] texture ${e} failed`,s),null)):Promise.resolve(null),this.materials.set(e,a)}return a}async buildMaterial(e,t,a){let r=this.renderer.textures,s=(b,d,m=!1)=>r.fromURL(this.baseUrl+b,{srgb:d,normalMap:m}),[i,o,c]=await Promise.all([s(t.diff,!0),t.nor?s(t.nor,!1,!0):null,t.arm?s(t.arm,!1):null]),l=1/(t.tileMeters??2);return new xe({name:a.name??e,baseColorMap:i,normalMap:o,ormMap:c,baseColor:[1,1,1,1],metallic:c?1:0,roughness:a.roughness??1,occlusionStrength:c?1:0,uvScale:[l,l],worldUV:a.worldUV??!1,edgeWear:a.edgeWear??0})}credits(){let e=[];for(let[t,a]of Object.entries(this.manifest.textures))e.push({...a,slot:t});for(let[t,a]of Object.entries(this.manifest.models))e.push({...a,slot:t});for(let[t,a]of Object.entries(this.manifest.sounds??{}))e.push({...a,slot:t});return e}};var qe=new URLSearchParams(location.search),Ye=(n,e)=>qe.has(n)?Number(qe.get(n)):e,Xt=document.getElementById("view"),Lt=document.getElementById("status"),oi=qe.get("offscreen")==="1";qe.get("tex")&&(We.textureSize=Ye("tex",2048));var he=await Qa.create({canvas:Xt,baseUrl:"../../",title:"oAxis viewer",offscreen:oi});vs(he.tuning);var Jt={frames:0,errors:[],done:!1};window.__test=Jt;he.renderer.dev.onError=n=>{Jt.errors.push(n),console.error(n)};var ci=he.renderer.sky.settings;ci.sunElevation=Ye("sun",32);ci.sunAzimuth=Ye("az",130);var jc=he.renderer.settings;jc.exposure.compensation=Ye("ev",.3);var Gc=he.renderer.synth.material("concrete",{size:1024,tileMeters:1,seed:3,dirt:.2},{name:"table"}),Fc=new Te(new Ae(he.renderer.dev,je(1.6,.04,1).computeTangents()),Gc,U.fromTranslation(U.create(),[0,-.02,0]));he.scene.add(Fc);Lt.textContent="Building models\u2026";var Ne={pistol:Ms(he.renderer),carbine:Ss(he.renderer)},sn={};if(qe.get("fit")!=="0"){for(let[n,e]of Object.entries(Ne))if(e.grips){let t=an(e.grips,e.model);e.grips=t.grips,sn[n]=t.reports}}window.__fit=sn;window.__builds=Ne;window.__clear=(n,e,t)=>{let a=t?Ne[n].grips:n==="pistol"?Hr:_r;return ni(a[e],Ne[n].model,e==="right"?1:-1)};window.__sd=(n,e)=>ri(Ne[n].model,e);var ht=(qe.get("model")??"")in Ne?qe.get("model"):"pistol",li=n=>n==="carbine"||Ne[n].kind==="carbine",Uc=n=>{let e=0,t=f.create();for(let a of n.parts){let r=a.object.mesh.bounds;if(r)for(let s=0;s<8;s++)f.transformMat4(t,[s&1?r.max[0]:r.min[0],s&2?r.max[1]:r.min[1],s&4?r.max[2]:r.min[2]],a.local),e=Math.min(e,t[1])}return U.fromRotationTranslation(U.create(),X.create(),[0,-e+.001,0])},Rt={slide:Ye("slide",0),mag:Ye("mag",0),trigger:Ye("trigger",0)},rn=qe.get("hands")==="1"?new ur(he.renderer,{viewmodel:!1,skin:qe.get("glove")==="1"?"glove":"bare"}).addTo(he.scene):null;if(qe.get("rig")==="1"){let e=await(await Kt.load(he.renderer,"../../assets/")).model("arms",!1);e?rn=new mr(he.renderer,e,{viewmodel:!1}).addTo(he.scene):Lt.textContent='no "arms" slot in assets/manifest.json'}function nn(n){for(let e of Object.values(Ne))for(let t of e.model.parts)he.scene.remove(t.object);ht=n;for(let e of Ne[n].model.parts)he.scene.add(e.object)}var Ot=qe.get("weapon");if(Ot){Lt.textContent=`Loading ${Ot}\u2026`;try{let n=await Kt.load(he.renderer,"../../assets/"),e=/\.(glb|gltf)(\?|$)/i.test(Ot)?await Ns(he.renderer,n.baseUrl+Ot):await Os(he.renderer,n,Ot);if(e){for(let t of e.warnings)console.warn("[viewer] scanned weapon:",t);if(qe.get("fit")!=="0"&&e.grips){let t=an(e.grips,e.model);e.grips=t.grips,sn.scanned=t.reports}Ne.scanned=e,ht="scanned",window.__scanned=e,console.info(`[viewer] scanned weapon "${e.title}": ${e.kind}, ${e.model.parts.length} parts, ${e.model.parts.filter(t=>t.bolt).length} slide/bolt, ${e.model.parts.filter(t=>t.magazine).length} magazine, ${e.model.parts.filter(t=>t.trigger).length} trigger`)}else Lt.textContent=`weapon ${Ot} is not in assets/manifest.json`}catch(n){Lt.textContent=`weapon ${Ot} failed: ${n.message}`,console.error(n)}}nn(ht);var hr=qe.get("asset");if(hr){Lt.textContent=`Loading ${hr}\u2026`;let e=await(await Kt.load(he.renderer,"../../assets/")).model(hr,!1);if(e){for(let i of Object.values(Ne))for(let o of i.model.parts)he.scene.remove(o.object);let t=e.bounds,a=Math.max(t.max[0]-t.min[0],t.max[1]-t.min[1],t.max[2]-t.min[2]),r=Ye("assetScale",.3/a),s=U.fromRotationTranslationScale(U.create(),X.fromEuler(X.create(),0,Ye("assetYaw",0)*ut,0),[-(t.min[0]+t.max[0])/2*r,-t.min[1]*r+.001,-(t.min[2]+t.max[2])/2*r],[r,r,r]);us(he.scene,e,s),Ne.pistol.model.parts.length=0,Ne.carbine.model.parts.length=0}else Lt.textContent=`asset ${hr} not found in assets/manifest.json`}var fr=Ye("yaw",35)*ut,ya=Ye("pitch",12)*ut,Nt=Ye("dist",li(ht)?1.1:.38);he.camera.fovY=Ye("fov",30)*ut;he.camera.near=.01;var on=!1;Xt.addEventListener("pointerdown",n=>{on=!0,Xt.setPointerCapture(n.pointerId)});Xt.addEventListener("pointerup",()=>{on=!1});Xt.addEventListener("pointermove",n=>{on&&(fr-=n.movementX*.005,ya=Math.max(-1.4,Math.min(1.4,ya+n.movementY*.005)))});Xt.addEventListener("wheel",n=>{Nt=Math.max(.08,Math.min(5,Nt*Math.exp(n.deltaY*.001))),n.preventDefault()},{passive:!1});window.addEventListener("keydown",n=>{if(n.code==="Digit1"&&(nn("carbine"),Nt=1.1),n.code==="Digit2"&&(nn("pistol"),Nt=.38),n.code==="KeyG"){let e=Ne[ht],t=bs(e.model.parts.map((r,s)=>({name:`${ht}-${r.bolt?"slide":r.magazine?"magazine":r.trigger?"trigger":"part"}-${s}`,object:r.object}))),a=document.createElement("a");a.href=URL.createObjectURL(new Blob([t],{type:"model/gltf-binary"})),a.download=`${ht}.glb`,a.click()}n.code==="Space"&&(Rt.slide=Rt.slide>0?0:Ne.pistol.spec.action?.travelM??.03)});he.onUpdate.push(()=>{let n=Ne[ht].model,e=Uc(n),t=f.create(0,.06,li(ht)?-.1:0),a=Math.cos(ya);he.camera.position.set([t[0]+Math.sin(fr)*a*Nt,t[1]+Math.sin(ya)*Nt,t[2]+Math.cos(fr)*a*Nt]),X.fromEuler(he.camera.rotation,-ya,fr,0);let r=n.magAxis;for(let s of n.parts){let i=s.object.transform;s.bolt?U.translate(i,e,[0,0,Rt.slide]):s.magazine&&r?U.translate(i,e,[r[0]*Rt.mag,r[1]*Rt.mag,r[2]*Rt.mag]):s.trigger?U.translate(i,e,[0,0,(n.triggerTravelM??0)*Rt.trigger]):U.copy(i,e),U.multiply(i,i,s.local)}if(rn){let s=Ne[ht],i=null;if(qe.get("eye")==="1"){let o=f.transformMat4(f.create(),[n.rearSight[0],n.rearSight[1],n.rearSight[2]+s.spec.eyeRelief],e);i={position:o,rotation:X.create()},qe.get("pov")==="1"&&(he.camera.position.set(o),X.identity(he.camera.rotation))}s.grips&&rn.update(e,s.grips,i,{trigger:Rt.trigger})}Jt.frames=he.frame});Lt.textContent="";if(oi){let n=Ye("frames",12);he.onUpdate.push(()=>{he.frame>=n&&!Jt.done&&(Jt.done=!0,he.stop(),he.renderer.readback().then(({width:e,height:t,data:a})=>{let r=document.createElement("canvas");r.width=e,r.height=t,r.style.cssText="position:fixed;inset:0;width:100%;height:100%;z-index:5",r.getContext("2d").putImageData(new ImageData(new Uint8ClampedArray(a.buffer),e,t),0,0),document.body.appendChild(r),Jt.captured=!0}))})}he.start();
//# sourceMappingURL=main.js.map
