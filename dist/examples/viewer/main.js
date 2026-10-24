var Ye=Math.PI/180,$i=180/Math.PI;var u={create(n=0,e=0,t=0){let a=new Float32Array(3);return a[0]=n,a[1]=e,a[2]=t,a},clone(n){return u.create(n[0],n[1],n[2])},set(n,e,t,a){return n[0]=e,n[1]=t,n[2]=a,n},copy(n,e){return n[0]=e[0],n[1]=e[1],n[2]=e[2],n},add(n,e,t){return n[0]=e[0]+t[0],n[1]=e[1]+t[1],n[2]=e[2]+t[2],n},sub(n,e,t){return n[0]=e[0]-t[0],n[1]=e[1]-t[1],n[2]=e[2]-t[2],n},mul(n,e,t){return n[0]=e[0]*t[0],n[1]=e[1]*t[1],n[2]=e[2]*t[2],n},scale(n,e,t){return n[0]=e[0]*t,n[1]=e[1]*t,n[2]=e[2]*t,n},scaleAndAdd(n,e,t,a){return n[0]=e[0]+t[0]*a,n[1]=e[1]+t[1]*a,n[2]=e[2]+t[2]*a,n},dot(n,e){return n[0]*e[0]+n[1]*e[1]+n[2]*e[2]},cross(n,e,t){let a=e[0],r=e[1],s=e[2],i=t[0],o=t[1],c=t[2];return n[0]=r*c-s*o,n[1]=s*i-a*c,n[2]=a*o-r*i,n},length(n){return Math.hypot(n[0],n[1],n[2])},lengthSq(n){return n[0]*n[0]+n[1]*n[1]+n[2]*n[2]},distance(n,e){return Math.hypot(n[0]-e[0],n[1]-e[1],n[2]-e[2])},normalize(n,e){let t=Math.hypot(e[0],e[1],e[2]),a=t>0?1/t:0;return n[0]=e[0]*a,n[1]=e[1]*a,n[2]=e[2]*a,n},negate(n,e){return n[0]=-e[0],n[1]=-e[1],n[2]=-e[2],n},lerp(n,e,t,a){return n[0]=e[0]+(t[0]-e[0])*a,n[1]=e[1]+(t[1]-e[1])*a,n[2]=e[2]+(t[2]-e[2])*a,n},min(n,e,t){return n[0]=Math.min(e[0],t[0]),n[1]=Math.min(e[1],t[1]),n[2]=Math.min(e[2],t[2]),n},max(n,e,t){return n[0]=Math.max(e[0],t[0]),n[1]=Math.max(e[1],t[1]),n[2]=Math.max(e[2],t[2]),n},transformMat4(n,e,t){let a=e[0],r=e[1],s=e[2],i=t[3]*a+t[7]*r+t[11]*s+t[15];return i=i||1,n[0]=(t[0]*a+t[4]*r+t[8]*s+t[12])/i,n[1]=(t[1]*a+t[5]*r+t[9]*s+t[13])/i,n[2]=(t[2]*a+t[6]*r+t[10]*s+t[14])/i,n},transformDirMat4(n,e,t){let a=e[0],r=e[1],s=e[2];return n[0]=t[0]*a+t[4]*r+t[8]*s,n[1]=t[1]*a+t[5]*r+t[9]*s,n[2]=t[2]*a+t[6]*r+t[10]*s,n},transformQuat(n,e,t){let a=t[0],r=t[1],s=t[2],i=t[3],o=e[0],c=e[1],d=e[2],l=r*d-s*c,m=s*o-a*d,h=a*c-r*o,b=r*h-s*m,v=s*l-a*h,p=a*m-r*l,M=i*2;return l*=M,m*=M,h*=M,b*=2,v*=2,p*=2,n[0]=o+l+b,n[1]=c+m+v,n[2]=d+h+p,n}};var D={create(){let n=new Float32Array(4);return n[3]=1,n},fromValues(n,e,t,a){let r=new Float32Array(4);return r[0]=n,r[1]=e,r[2]=t,r[3]=a,r},identity(n){return n[0]=0,n[1]=0,n[2]=0,n[3]=1,n},copy(n,e){return n[0]=e[0],n[1]=e[1],n[2]=e[2],n[3]=e[3],n},setAxisAngle(n,e,t){let a=t*.5,r=Math.sin(a);return n[0]=r*e[0],n[1]=r*e[1],n[2]=r*e[2],n[3]=Math.cos(a),n},multiply(n,e,t){let a=e[0],r=e[1],s=e[2],i=e[3],o=t[0],c=t[1],d=t[2],l=t[3];return n[0]=a*l+i*o+r*d-s*c,n[1]=r*l+i*c+s*o-a*d,n[2]=s*l+i*d+a*c-r*o,n[3]=i*l-a*o-r*c-s*d,n},rotateX(n,e,t){let a=t*.5,r=Math.sin(a),s=Math.cos(a),i=e[0],o=e[1],c=e[2],d=e[3];return n[0]=i*s+d*r,n[1]=o*s+c*r,n[2]=c*s-o*r,n[3]=d*s-i*r,n},rotateY(n,e,t){let a=t*.5,r=Math.sin(a),s=Math.cos(a),i=e[0],o=e[1],c=e[2],d=e[3];return n[0]=i*s-c*r,n[1]=o*s+d*r,n[2]=c*s+i*r,n[3]=d*s-o*r,n},rotateZ(n,e,t){let a=t*.5,r=Math.sin(a),s=Math.cos(a),i=e[0],o=e[1],c=e[2],d=e[3];return n[0]=i*s+o*r,n[1]=o*s-i*r,n[2]=c*s+d*r,n[3]=d*s-c*r,n},fromEuler(n,e,t,a){return D.identity(n),D.rotateY(n,n,t),D.rotateX(n,n,e),D.rotateZ(n,n,a),n},normalize(n,e){let t=Math.hypot(e[0],e[1],e[2],e[3]),a=t>0?1/t:0;return n[0]=e[0]*a,n[1]=e[1]*a,n[2]=e[2]*a,n[3]=e[3]*a,n},conjugate(n,e){return n[0]=-e[0],n[1]=-e[1],n[2]=-e[2],n[3]=e[3],n},invert(n,e){let t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2]+e[3]*e[3],a=t?1/t:0;return n[0]=-e[0]*a,n[1]=-e[1]*a,n[2]=-e[2]*a,n[3]=e[3]*a,n},dot(n,e){return n[0]*e[0]+n[1]*e[1]+n[2]*e[2]+n[3]*e[3]},slerp(n,e,t,a){let r=e[0],s=e[1],i=e[2],o=e[3],c=t[0],d=t[1],l=t[2],m=t[3],h=r*c+s*d+i*l+o*m;h<0&&(h=-h,c=-c,d=-d,l=-l,m=-m);let b,v;if(1-h>1e-6){let p=Math.acos(h),M=Math.sin(p);b=Math.sin((1-a)*p)/M,v=Math.sin(a*p)/M}else b=1-a,v=a;return n[0]=b*r+v*c,n[1]=b*s+v*d,n[2]=b*i+v*l,n[3]=b*o+v*m,n},rotationTo(n,e,t){let a=u.dot(e,t);if(a<-.999999){let s=u.create();return u.cross(s,u.create(1,0,0),e),u.length(s)<1e-6&&u.cross(s,u.create(0,1,0),e),u.normalize(s,s),D.setAxisAngle(n,s,Math.PI)}if(a>.999999)return D.identity(n);let r=u.cross(u.create(),e,t);return n[0]=r[0],n[1]=r[1],n[2]=r[2],n[3]=1+a,D.normalize(n,n)},lookRotation(n,e,t){let a=F.create(),r=u.normalize(u.create(),u.negate(u.create(),e)),s=u.normalize(u.create(),u.cross(u.create(),t,r)),i=u.cross(u.create(),r,s);return a[0]=s[0],a[1]=s[1],a[2]=s[2],a[4]=i[0],a[5]=i[1],a[6]=i[2],a[8]=r[0],a[9]=r[1],a[10]=r[2],F.getRotation(n,a)}},F={create(){let n=new Float32Array(16);return n[0]=n[5]=n[10]=n[15]=1,n},clone(n){return new Float32Array(n)},copy(n,e){for(let t=0;t<16;t++)n[t]=e[t];return n},identity(n){return n.fill(0),n[0]=n[5]=n[10]=n[15]=1,n},multiply(n,e,t){let a=e[0],r=e[1],s=e[2],i=e[3],o=e[4],c=e[5],d=e[6],l=e[7],m=e[8],h=e[9],b=e[10],v=e[11],p=e[12],M=e[13],y=e[14],x=e[15];for(let w=0;w<4;w++){let g=t[w*4],k=t[w*4+1],f=t[w*4+2],A=t[w*4+3];n[w*4]=g*a+k*o+f*m+A*p,n[w*4+1]=g*r+k*c+f*h+A*M,n[w*4+2]=g*s+k*d+f*b+A*y,n[w*4+3]=g*i+k*l+f*v+A*x}return n},invert(n,e){let t=e[0],a=e[1],r=e[2],s=e[3],i=e[4],o=e[5],c=e[6],d=e[7],l=e[8],m=e[9],h=e[10],b=e[11],v=e[12],p=e[13],M=e[14],y=e[15],x=t*o-a*i,w=t*c-r*i,g=t*d-s*i,k=a*c-r*o,f=a*d-s*o,A=r*d-s*c,P=l*p-m*v,S=l*M-h*v,T=l*y-b*v,j=m*M-h*p,z=m*y-b*p,R=h*y-b*M,I=x*R-w*z+g*j+k*T-f*S+A*P;return I?(I=1/I,n[0]=(o*R-c*z+d*j)*I,n[1]=(r*z-a*R-s*j)*I,n[2]=(p*A-M*f+y*k)*I,n[3]=(h*f-m*A-b*k)*I,n[4]=(c*T-i*R-d*S)*I,n[5]=(t*R-r*T+s*S)*I,n[6]=(M*g-v*A-y*w)*I,n[7]=(l*A-h*g+b*w)*I,n[8]=(i*z-o*T+d*P)*I,n[9]=(a*T-t*z-s*P)*I,n[10]=(v*f-p*g+y*x)*I,n[11]=(m*g-l*f-b*x)*I,n[12]=(o*S-i*j-c*P)*I,n[13]=(t*j-a*S+r*P)*I,n[14]=(p*w-v*k-M*x)*I,n[15]=(l*k-m*w+h*x)*I,n):null},transpose(n,e){if(n===e){let t=e[1],a=e[2],r=e[3],s=e[6],i=e[7],o=e[11];return n[1]=e[4],n[2]=e[8],n[3]=e[12],n[4]=t,n[6]=e[9],n[7]=e[13],n[8]=a,n[9]=s,n[11]=e[14],n[12]=r,n[13]=i,n[14]=o,n}for(let t=0;t<4;t++)for(let a=0;a<4;a++)n[a*4+t]=e[t*4+a];return n},fromRotationTranslationScale(n,e,t,a){let r=e[0],s=e[1],i=e[2],o=e[3],c=r+r,d=s+s,l=i+i,m=r*c,h=r*d,b=r*l,v=s*d,p=s*l,M=i*l,y=o*c,x=o*d,w=o*l,g=a[0],k=a[1],f=a[2];return n[0]=(1-(v+M))*g,n[1]=(h+w)*g,n[2]=(b-x)*g,n[3]=0,n[4]=(h-w)*k,n[5]=(1-(m+M))*k,n[6]=(p+y)*k,n[7]=0,n[8]=(b+x)*f,n[9]=(p-y)*f,n[10]=(1-(m+v))*f,n[11]=0,n[12]=t[0],n[13]=t[1],n[14]=t[2],n[15]=1,n},fromRotationTranslation(n,e,t){return F.fromRotationTranslationScale(n,e,t,Ar)},translate(n,e,t){let a=t[0],r=t[1],s=t[2];if(n!==e)for(let i=0;i<12;i++)n[i]=e[i];return n[12]=e[0]*a+e[4]*r+e[8]*s+e[12],n[13]=e[1]*a+e[5]*r+e[9]*s+e[13],n[14]=e[2]*a+e[6]*r+e[10]*s+e[14],n[15]=e[3]*a+e[7]*r+e[11]*s+e[15],n},fromTranslation(n,e){return F.identity(n),n[12]=e[0],n[13]=e[1],n[14]=e[2],n},fromScaling(n,e){return F.identity(n),n[0]=e[0],n[5]=e[1],n[10]=e[2],n},fromQuat(n,e){return F.fromRotationTranslationScale(n,e,cs,Ar)},getTranslation(n,e){return n[0]=e[12],n[1]=e[13],n[2]=e[14],n},getScaling(n,e){return n[0]=Math.hypot(e[0],e[1],e[2]),n[1]=Math.hypot(e[4],e[5],e[6]),n[2]=Math.hypot(e[8],e[9],e[10]),n},getRotation(n,e){let t=Math.hypot(e[0],e[1],e[2])||1,a=Math.hypot(e[4],e[5],e[6])||1,r=Math.hypot(e[8],e[9],e[10])||1,s=e[0]/t,i=e[1]/t,o=e[2]/t,c=e[4]/a,d=e[5]/a,l=e[6]/a,m=e[8]/r,h=e[9]/r,b=e[10]/r,v=s+d+b;if(v>0){let p=Math.sqrt(v+1)*2;n[3]=.25*p,n[0]=(l-h)/p,n[1]=(m-o)/p,n[2]=(i-c)/p}else if(s>d&&s>b){let p=Math.sqrt(1+s-d-b)*2;n[3]=(l-h)/p,n[0]=.25*p,n[1]=(i+c)/p,n[2]=(m+o)/p}else if(d>b){let p=Math.sqrt(1+d-s-b)*2;n[3]=(m-o)/p,n[0]=(i+c)/p,n[1]=.25*p,n[2]=(l+h)/p}else{let p=Math.sqrt(1+b-s-d)*2;n[3]=(i-c)/p,n[0]=(m+o)/p,n[1]=(l+h)/p,n[2]=.25*p}return n},lookAt(n,e,t,a){let r=e[0]-t[0],s=e[1]-t[1],i=e[2]-t[2],o=Math.hypot(r,s,i)||1;r/=o,s/=o,i/=o;let c=a[1]*i-a[2]*s,d=a[2]*r-a[0]*i,l=a[0]*s-a[1]*r;o=Math.hypot(c,d,l)||1,c/=o,d/=o,l/=o;let m=s*l-i*d,h=i*c-r*l,b=r*d-s*c;return n[0]=c,n[1]=m,n[2]=r,n[3]=0,n[4]=d,n[5]=h,n[6]=s,n[7]=0,n[8]=l,n[9]=b,n[10]=i,n[11]=0,n[12]=-(c*e[0]+d*e[1]+l*e[2]),n[13]=-(m*e[0]+h*e[1]+b*e[2]),n[14]=-(r*e[0]+s*e[1]+i*e[2]),n[15]=1,n},perspectiveReversedInfinite(n,e,t,a,r=0,s=0){let i=1/Math.tan(e/2);return n.fill(0),n[0]=i/t,n[5]=i,n[8]=-r,n[9]=-s,n[11]=-1,n[14]=a,n},perspectiveZO(n,e,t,a,r){let s=1/Math.tan(e/2);n.fill(0),n[0]=s/t,n[5]=s,n[11]=-1;let i=1/(a-r);return n[10]=r*i,n[14]=r*a*i,n},orthoZO(n,e,t,a,r,s,i){let o=1/(e-t),c=1/(a-r),d=1/(s-i);return n.fill(0),n[0]=-2*o,n[5]=-2*c,n[10]=d,n[15]=1,n[12]=(e+t)*o,n[13]=(r+a)*c,n[14]=s*d,n},normalMatrix12(n,e,t=0){let a=e[0],r=e[1],s=e[2],i=e[4],o=e[5],c=e[6],d=e[8],l=e[9],m=e[10],h=m*o-c*l,b=-m*i+c*d,v=l*i-o*d,p=a*h+r*b+s*v;p=p?1/p:0;let M=h*p,y=(-m*r+s*l)*p,x=(c*r-s*o)*p,w=b*p,g=(m*a-s*d)*p,k=(-c*a+s*i)*p,f=v*p,A=(-l*a+r*d)*p,P=(o*a-r*i)*p;return n[t+0]=M,n[t+1]=w,n[t+2]=f,n[t+3]=0,n[t+4]=y,n[t+5]=g,n[t+6]=A,n[t+7]=0,n[t+8]=x,n[t+9]=k,n[t+10]=P,n[t+11]=0,n}},Ar=new Float32Array([1,1,1]),cs=new Float32Array([0,0,0]),He={create(){return{min:u.create(1/0,1/0,1/0),max:u.create(-1/0,-1/0,-1/0)}},fromPositions(n){let e=He.create();for(let t=0;t<n.length;t+=3){let a=n[t],r=n[t+1],s=n[t+2];a<e.min[0]&&(e.min[0]=a),r<e.min[1]&&(e.min[1]=r),s<e.min[2]&&(e.min[2]=s),a>e.max[0]&&(e.max[0]=a),r>e.max[1]&&(e.max[1]=r),s>e.max[2]&&(e.max[2]=s)}return e},transform(n,e,t){for(let a=0;a<3;a++){let r=t[12+a],s=t[12+a];for(let i=0;i<3;i++){let o=t[i*4+a],c=o*e.min[i],d=o*e.max[i];c<d?(r+=c,s+=d):(r+=d,s+=c)}n.min[a]=r,n.max[a]=s}return n}};function Ha(n,e=new Float32Array(20)){let t=c=>[n[c],n[4+c],n[8+c],n[12+c]],a=t(0),r=t(1),s=t(2),i=t(3),o=[[i[0]+a[0],i[1]+a[1],i[2]+a[2],i[3]+a[3]],[i[0]-a[0],i[1]-a[1],i[2]-a[2],i[3]-a[3]],[i[0]+r[0],i[1]+r[1],i[2]+r[2],i[3]+r[3]],[i[0]-r[0],i[1]-r[1],i[2]-r[2],i[3]-r[3]],[i[0]-s[0],i[1]-s[1],i[2]-s[2],i[3]-s[3]]];for(let c=0;c<5;c++){let d=Math.hypot(o[c][0],o[c][1],o[c][2])||1;for(let l=0;l<4;l++)e[c*4+l]=o[c][l]/d}return e}function qa(n,e){for(let t=0;t<5;t++){let a=n[t*4],r=n[t*4+1],s=n[t*4+2],i=n[t*4+3],o=a>=0?e.max[0]:e.min[0],c=r>=0?e.max[1]:e.min[1],d=s>=0?e.max[2]:e.min[2];if(a*o+r*c+s*d+i<0)return!1}return!0}function et(n=2654435769){let e=n>>>0,t=()=>{e=e+1831565813>>>0;let a=e;return a=Math.imul(a^a>>>15,a|1),a^=a+Math.imul(a^a>>>7,a|61),((a^a>>>14)>>>0)/4294967296};return{next:t,range:(a,r)=>a+(r-a)*t(),gauss:()=>{let a=Math.max(t(),1e-12),r=t();return Math.sqrt(-2*Math.log(a))*Math.cos(2*Math.PI*r)},sign:()=>t()<.5?-1:1}}function Wa(n,e){let t=1,a=0,r=n;for(;r>0;)t/=e,a+=t*(r%e),r=Math.floor(r/e);return a}var ea=class n{adapter;device;context;canvas;presentationFormat;features;onError=e=>console.error("[fondaineGL]",e);offscreen;constructor(e,t,a,r){this.adapter=e,this.device=t,this.canvas=a,this.offscreen=r,this.presentationFormat=r?"rgba8unorm":navigator.gpu.getPreferredCanvasFormat();let s=r?null:a.getContext("webgpu");if(!r&&!s)throw new Error("fondaineGL: could not get a WebGPU canvas context");this.context=s,r||this.context.configure({device:t,format:this.presentationFormat,alphaMode:"opaque"}),this.features=new Set([...t.features]),t.addEventListener("uncapturederror",i=>this.onError(i.error.message)),t.lost.then(i=>this.onError(`device lost (${i.reason}): ${i.message}`))}static async create(e){if(!("gpu"in navigator))throw new Error("fondaineGL requires WebGPU (Chrome/Edge 113+, Safari 26+, Firefox 141+).");let t=await navigator.gpu.requestAdapter({powerPreference:e.powerPreference??"high-performance"});if(!t)throw new Error("fondaineGL: no WebGPU adapter available");let r=["float32-filterable","rg11b10ufloat-renderable","texture-compression-bc","texture-compression-astc","texture-compression-etc2",...e.optionalFeatures??[]].filter(o=>t.features.has(o)),s=t.limits,i=await t.requestDevice({requiredFeatures:r,requiredLimits:{maxTextureDimension2D:s.maxTextureDimension2D,maxTextureArrayLayers:s.maxTextureArrayLayers,maxStorageBufferBindingSize:s.maxStorageBufferBindingSize,maxBufferSize:s.maxBufferSize,maxComputeWorkgroupStorageSize:s.maxComputeWorkgroupStorageSize,maxComputeInvocationsPerWorkgroup:s.maxComputeInvocationsPerWorkgroup,maxStorageTexturesPerShaderStage:s.maxStorageTexturesPerShaderStage,maxSampledTexturesPerShaderStage:s.maxSampledTexturesPerShaderStage,maxColorAttachmentBytesPerSample:s.maxColorAttachmentBytesPerSample}});return new n(t,i,e.canvas,!!e.offscreen)}get floatFilterable(){return this.features.has("float32-filterable")}createBuffer(e,t,a,r){let s=Math.max(16,Math.ceil(e/16)*16),i=this.device.createBuffer({size:s,usage:t|GPUBufferUsage.COPY_DST,label:a});return r&&this.device.queue.writeBuffer(i,0,r.buffer,r.byteOffset,r.byteLength),i}createTexture(e){return this.device.createTexture(e)}shader(e,t){let a=this.device.createShaderModule({code:e,label:t});return a.getCompilationInfo?.().then(r=>{for(let s of r.messages){if(s.type!=="error")continue;let o=e.split(`
`).slice(Math.max(0,s.lineNum-3),s.lineNum+1).join(`
`);this.onError(`WGSL error in ${t??"shader"} @${s.lineNum}:${s.linePos}: ${s.message}
${o}`)}}),a}},ta=class{f32;u32;buffer;constructor(e){this.buffer=new ArrayBuffer(Math.ceil(e/16)*16),this.f32=new Float32Array(this.buffer),this.u32=new Uint32Array(this.buffer)}mat4(e,t){this.f32.set(t,e/4)}vec4(e,t,a=0,r=0,s=0){let i=e/4;this.f32[i]=t,this.f32[i+1]=a,this.f32[i+2]=r,this.f32[i+3]=s}uvec4(e,t,a=0,r=0,s=0){let i=e/4;this.u32[i]=t,this.u32[i+1]=a,this.u32[i+2]=r,this.u32[i+3]=s}f(e,t){this.f32[e/4]=t}};function qe(n,e=n){return Math.floor(Math.log2(Math.max(n,e)))+1}function Pr(n,e,t){return Math.log2(n*n/e*(100/t))}var de=class n{positions;normals;uvs;tangents=null;indices;joints=null;weights=null;constructor(e,t,a,r){this.positions=Float32Array.from(e),this.normals=Float32Array.from(t),this.uvs=Float32Array.from(a),this.indices=Uint32Array.from(r)}get vertexCount(){return this.positions.length/3}get triangleCount(){return this.indices.length/3}clone(){let e=new n(this.positions,this.normals,this.uvs,this.indices);return this.tangents&&(e.tangents=Float32Array.from(this.tangents)),this.joints&&(e.joints=Uint16Array.from(this.joints)),this.weights&&(e.weights=Float32Array.from(this.weights)),e}bounds(){return He.fromPositions(this.positions)}transform(e){let t=u.create(),a=u.create(),r=F.invert(F.create(),e);F.transpose(r,r);for(let i=0;i<this.positions.length;i+=3)u.transformMat4(t,this.positions.subarray(i,i+3),e),this.positions.set(t,i),u.transformDirMat4(a,this.normals.subarray(i,i+3),r),u.normalize(a,a),this.normals.set(a,i);if(this.tangents){let i=u.create();for(let o=0;o<this.tangents.length;o+=4)u.transformDirMat4(i,this.tangents.subarray(o,o+3),e),u.normalize(i,i),this.tangents.set(i,o)}return e[0]*(e[5]*e[10]-e[6]*e[9])-e[4]*(e[1]*e[10]-e[2]*e[9])+e[8]*(e[1]*e[6]-e[2]*e[5])<0&&this.flipWinding(),this}translate(e,t,a){return this.transform(F.fromTranslation(F.create(),[e,t,a]))}rotateX(e){let t=F.create();return t[5]=Math.cos(e),t[6]=Math.sin(e),t[9]=-Math.sin(e),t[10]=Math.cos(e),this.transform(t)}rotateY(e){let t=F.create();return t[0]=Math.cos(e),t[2]=-Math.sin(e),t[8]=Math.sin(e),t[10]=Math.cos(e),this.transform(t)}rotateZ(e){let t=F.create();return t[0]=Math.cos(e),t[1]=Math.sin(e),t[4]=-Math.sin(e),t[5]=Math.cos(e),this.transform(t)}scale(e,t=e,a=e){return this.transform(F.fromScaling(F.create(),[e,t,a]))}flipWinding(){let e=this.indices;for(let t=0;t<e.length;t+=3){let a=e[t+1];e[t+1]=e[t+2],e[t+2]=a}return this}scaleUVs(e,t=e){for(let a=0;a<this.uvs.length;a+=2)this.uvs[a]*=e,this.uvs[a+1]*=t;return this}displace(e){for(let t=0;t<this.positions.length;t+=3){let a=e([this.positions[t],this.positions[t+1],this.positions[t+2]]);this.positions[t]=a[0],this.positions[t+1]=a[1],this.positions[t+2]=a[2]}return this.computeNormals()}computeNormals(){let e=new Float32Array(this.positions.length),t=this.positions,a=this.indices;for(let r=0;r<a.length;r+=3){let s=a[r]*3,i=a[r+1]*3,o=a[r+2]*3,c=t[i]-t[s],d=t[i+1]-t[s+1],l=t[i+2]-t[s+2],m=t[o]-t[s],h=t[o+1]-t[s+1],b=t[o+2]-t[s+2],v=d*b-l*h,p=l*m-c*b,M=c*h-d*m;for(let y of[s,i,o])e[y]+=v,e[y+1]+=p,e[y+2]+=M}for(let r=0;r<e.length;r+=3){let s=Math.hypot(e[r],e[r+1],e[r+2])||1;e[r]/=s,e[r+1]/=s,e[r+2]/=s}return this.normals=e,this}computeTangents(){return this.tangents=_a(this.positions,this.normals,this.uvs,this.indices),this}toFlat(){let e=this.indices,t=new Float32Array(e.length*3),a=new Float32Array(e.length*2);for(let s=0;s<e.length;s++)t.set(this.positions.subarray(e[s]*3,e[s]*3+3),s*3),a.set(this.uvs.subarray(e[s]*2,e[s]*2+2),s*2);return new n(t,new Float32Array(t.length),a,Array.from({length:e.length},(s,i)=>i)).computeNormals()}static merge(e){let t=0,a=0;for(let b of e)t+=b.vertexCount,a+=b.indices.length;let r=new Float32Array(t*3),s=new Float32Array(t*3),i=new Float32Array(t*2),o=new Uint32Array(a),d=e.some(b=>b.tangents)?new Float32Array(t*4):null,l=0,m=0;for(let b of e){r.set(b.positions,l*3),s.set(b.normals,l*3),i.set(b.uvs,l*2),d&&b.tangents&&d.set(b.tangents,l*4);for(let v=0;v<b.indices.length;v++)o[m+v]=b.indices[v]+l;l+=b.vertexCount,m+=b.indices.length}let h=new n(r,s,i,o);return h.tangents=d,h}};function _a(n,e,t,a){let r=n.length/3,s=new Float32Array(r*3),i=new Float32Array(r*3);for(let c=0;c<a.length;c+=3){let d=a[c],l=a[c+1],m=a[c+2],h=n[l*3]-n[d*3],b=n[l*3+1]-n[d*3+1],v=n[l*3+2]-n[d*3+2],p=n[m*3]-n[d*3],M=n[m*3+1]-n[d*3+1],y=n[m*3+2]-n[d*3+2],x=t[l*2]-t[d*2],w=t[l*2+1]-t[d*2+1],g=t[m*2]-t[d*2],k=t[m*2+1]-t[d*2+1],f=x*k-g*w;if(Math.abs(f)<1e-12)continue;let A=1/f,P=(k*h-w*p)*A,S=(k*b-w*M)*A,T=(k*v-w*y)*A,j=(x*p-g*h)*A,z=(x*M-g*b)*A,R=(x*y-g*v)*A;for(let I of[d,l,m])s[I*3]+=P,s[I*3+1]+=S,s[I*3+2]+=T,i[I*3]+=j,i[I*3+1]+=z,i[I*3+2]+=R}let o=new Float32Array(r*4);for(let c=0;c<r;c++){let d=e[c*3],l=e[c*3+1],m=e[c*3+2],h=s[c*3],b=s[c*3+1],v=s[c*3+2],p=d*h+l*b+m*v;h-=d*p,b-=l*p,v-=m*p;let M=Math.hypot(h,b,v);if(M<1e-8){let k=Math.abs(d)<.9?1:0,f=k?0:1;h=f*m-0*l,b=0*d-k*m,v=k*l-f*d,M=Math.hypot(h,b,v)||1}h/=M,b/=M,v/=M;let y=l*v-m*b,x=m*h-d*v,w=d*b-l*h,g=y*i[c*3]+x*i[c*3+1]+w*i[c*3+2]<0?-1:1;o[c*4]=h,o[c*4+1]=b,o[c*4+2]=v,o[c*4+3]=g}return o}var lt=class{pos=[];nrm=[];uv=[];ix=[];v(e,t,a,r,s,i,o,c){return this.pos.push(e,t,a),this.nrm.push(r,s,i),this.uv.push(o,c),this.pos.length/3-1}tri(e,t,a){this.ix.push(e,t,a)}quad(e,t,a,r){this.ix.push(e,t,a,e,a,r)}build(){return new de(this.pos,this.nrm,this.uv,this.ix)}};function fe(n,e,t,a=1){let r=new lt,s=n/2,i=e/2,o=t/2,c=[[[1,0,0],[0,0,-1],[0,1,0],t,e],[[-1,0,0],[0,0,1],[0,1,0],t,e],[[0,1,0],[1,0,0],[0,0,-1],n,t],[[0,-1,0],[1,0,0],[0,0,1],n,t],[[0,0,1],[1,0,0],[0,1,0],n,e],[[0,0,-1],[-1,0,0],[0,1,0],n,e]],d=[s,i,o];for(let[l,m,h,b,v]of c){let p=r.pos.length/3;for(let M=0;M<=a;M++)for(let y=0;y<=a;y++){let x=(y/a-.5)*b,w=(M/a-.5)*v,g=l[0]*d[0]+m[0]*x+h[0]*w,k=l[1]*d[1]+m[1]*x+h[1]*w,f=l[2]*d[2]+m[2]*x+h[2]*w;r.v(g,k,f,l[0],l[1],l[2],x+b/2,w+v/2)}for(let M=0;M<a;M++)for(let y=0;y<a;y++){let x=p+M*(a+1)+y;r.quad(x,x+1,x+a+2,x+a+1)}}return r.build()}function ce(n,e,t,a,r=3){let s=Math.min(a,n/2,e/2,t/2)*.999,i=fe(n,e,t,1),o=[n/2-s,e/2-s,t/2-s],c=new lt,d=[[[1,0,0],[0,0,-1],[0,1,0]],[[-1,0,0],[0,0,1],[0,1,0]],[[0,1,0],[1,0,0],[0,0,-1]],[[0,-1,0],[1,0,0],[0,0,1]],[[0,0,1],[1,0,0],[0,1,0]],[[0,0,-1],[-1,0,0],[0,1,0]]],l=[n/2,e/2,t/2],m=h=>h[0]!==0?0:h[1]!==0?1:2;for(let[h,b,v]of d){let p=m(b),M=m(v),y=m(h),x=A=>{let P=[],S=l[A],T=o[A];for(let j=0;j<=r;j++)P.push(-S+j/r*(S-T));T>1e-6&&P.push(T);for(let j=1;j<=r;j++)P.push(T+j/r*(S-T));return P},w=x(p),g=x(M),k=c.pos.length/3;for(let A=0;A<g.length;A++)for(let P=0;P<w.length;P++){let S=[0,0,0];S[y]=h[y]*l[y],S[p]=w[P]*Math.sign(b[p]),S[M]=g[A]*Math.sign(v[M]);let T=[Math.max(-o[0],Math.min(o[0],S[0])),Math.max(-o[1],Math.min(o[1],S[1])),Math.max(-o[2],Math.min(o[2],S[2]))],j=S[0]-T[0],z=S[1]-T[1],R=S[2]-T[2],I=Math.hypot(j,z,R)||1;j/=I,z/=I,R/=I;let L=[T[0]+j*s,T[1]+z*s,T[2]+R*s];c.v(L[0],L[1],L[2],j,z,R,w[P]+l[p],g[A]+l[M])}let f=w.length;for(let A=0;A<g.length-1;A++)for(let P=0;P<f-1;P++){let S=k+A*f+P;c.quad(S,S+1,S+f+1,S+f)}}return c.build()}function tt(n,e,t,a=24,r={}){let s=new lt,i=r.heightSegments??1,o=r.thetaStart??0,c=r.thetaLength??Math.PI*2,d=(e-n)/t,l=Math.max(n,e);for(let h=0;h<=i;h++){let b=h/i,v=e+(n-e)*b,p=-t/2+b*t;for(let M=0;M<=a;M++){let y=o+M/a*c,x=Math.sin(y),w=Math.cos(y),g=Math.hypot(1,d);s.v(v*x,p,v*w,x/g,d/g,w/g,M/a*c*l,p+t/2)}}for(let h=0;h<i;h++)for(let b=0;b<a;b++){let v=h*(a+1)+b;s.quad(v,v+1,v+a+2,v+a+1)}let m=h=>{let b=h?n:e;if(b<=0)return;let v=h?t/2:-t/2,p=h?1:-1,M=s.v(0,v,0,0,p,0,0,0),y=s.pos.length/3;for(let x=0;x<=a;x++){let w=o+x/a*c;s.v(b*Math.sin(w),v,b*Math.cos(w),0,p,0,b*Math.sin(w),b*Math.cos(w))}for(let x=0;x<a;x++)h?s.tri(M,y+x,y+x+1):s.tri(M,y+x+1,y+x)};return r.capTop!==!1&&m(!0),r.capBottom!==!1&&m(!1),s.build()}function Pe(n,e=32,t=35){let a=new lt,r=[],s=0;for(let c=0;c<n.length;c++){let[d,l]=n[c];c>0&&(s+=Math.hypot(d-n[c-1][0],l-n[c-1][1]));let m=n[Math.max(0,c-1)],h=n[Math.min(n.length-1,c+1)],b=c>0?[d-m[0],l-m[1]]:null,v=c<n.length-1?[h[0]-d,h[1]-l]:null,p=M=>{let y=Math.hypot(M[0],M[1])||1;return[M[1]/y,-M[0]/y]};if(b&&v){let M=Math.atan2(b[1],b[0]),y=Math.atan2(v[1],v[0]),x=Math.abs(M-y);if(x>Math.PI&&(x=2*Math.PI-x),x>t*Math.PI/180){let k=p(b),f=p(v);r.push({r:d,y:l,nr:k[0],ny:k[1],s}),r.push({r:d,y:l,nr:f[0],ny:f[1],s});continue}let w=[b[0]/(Math.hypot(b[0],b[1])||1)+v[0]/(Math.hypot(v[0],v[1])||1),b[1]/(Math.hypot(b[0],b[1])||1)+v[1]/(Math.hypot(v[0],v[1])||1)],g=p(w);r.push({r:d,y:l,nr:g[0],ny:g[1],s})}else{let M=p(b??v);r.push({r:d,y:l,nr:M[0],ny:M[1],s})}}let i=Math.max(...n.map(c=>c[0]),1e-4),o=e+1;for(let c of r)for(let d=0;d<=e;d++){let l=d/e*Math.PI*2,m=Math.sin(l),h=Math.cos(l);a.v(c.r*m,c.y,c.r*h,c.nr*m,c.ny,c.nr*h,d/e*Math.PI*2*i,c.s)}for(let c=0;c<r.length-1;c++)if(!(r[c].r===r[c+1].r&&r[c].y===r[c+1].y))for(let d=0;d<e;d++){let l=c*o+d;a.quad(l,l+1,l+o+1,l+o)}return a.build()}function Sr(n,e=24,t=16){let a=new lt;for(let r=0;r<=t;r++){let s=r/t,i=s*Math.PI;for(let o=0;o<=e;o++){let c=o/e,d=c*Math.PI*2,l=-Math.cos(d)*Math.sin(i),m=Math.cos(i),h=Math.sin(d)*Math.sin(i);a.v(l*n,m*n,h*n,l,m,h,c*Math.PI*2*n,s*Math.PI*n)}}for(let r=0;r<t;r++)for(let s=0;s<e;s++){let i=r*(e+1)+s;r!==0&&a.tri(i,i+e+1,i+1),r!==t-1&&a.tri(i+1,i+e+1,i+e+2)}return a.build()}function St(n){let e=0;for(let t=0,a=n.length-1;t<n.length;a=t++)e+=(n[a][0]-n[t][0])*(n[a][1]+n[t][1]);return e/2}function Ja(n){let e=n.length;if(e<3)return[];let t=Array.from({length:e},(o,c)=>c);St(n)<0&&t.reverse();let a=[],r=(o,c,d)=>(c[0]-o[0])*(d[1]-o[1])-(c[1]-o[1])*(d[0]-o[0]),s=(o,c,d,l)=>r(c,d,o)>=0&&r(d,l,o)>=0&&r(l,c,o)>=0,i=0;for(;t.length>3&&i++<1e4;){let o=!1;for(let c=0;c<t.length;c++){let d=t[(c+t.length-1)%t.length],l=t[c],m=t[(c+1)%t.length],h=n[d],b=n[l],v=n[m];if(r(h,b,v)<=1e-12)continue;let p=!0;for(let M of t){if(M===d||M===l||M===m)continue;let y=n[M];if(!(y[0]===h[0]&&y[1]===h[1]||y[0]===b[0]&&y[1]===b[1]||y[0]===v[0]&&y[1]===v[1])&&s(y,h,b,v)){p=!1;break}}if(p){a.push(d,l,m),t.splice(c,1),o=!0;break}}if(!o){for(let c=1;c<t.length-1;c++)a.push(t[0],t[c],t[c+1]);return a}}return t.length===3&&a.push(t[0],t[1],t[2]),a}function ls(n,e){let t=St(n)<0?[...n].reverse():[...n],a=e.map(r=>St(r)>0?[...r].reverse():[...r]).sort((r,s)=>Math.max(...s.map(i=>i[0]))-Math.max(...r.map(i=>i[0])));for(let r of a){let s=0;for(let l=1;l<r.length;l++)r[l][0]>r[s][0]&&(s=l);let i=r[s],o=-1,c=1/0;for(let l=0;l<t.length;l++){let m=t[l];if(m[0]<i[0])continue;let h=Math.hypot(m[0]-i[0],m[1]-i[1]);h<c&&(c=h,o=l)}o<0&&(o=0);let d=[...r.slice(s),...r.slice(0,s+1)];t=[...t.slice(0,o+1),...d,t[o],...t.slice(o+1)]}return t}function Ka(n,e){let a=St(n)>0?1:-1;return n.map((r,s)=>{let i=n[(s+n.length-1)%n.length],o=n[(s+1)%n.length],c=[r[0]-i[0],r[1]-i[1]],d=[o[0]-r[0],o[1]-r[1]],l=Math.hypot(c[0],c[1])||1,m=Math.hypot(d[0],d[1])||1,h=[-c[1]/l*a,c[0]/l*a],b=[-d[1]/m*a,d[0]/m*a],v=h[0]+b[0],p=h[1]+b[1],M=Math.hypot(v,p)||1;v/=M,p/=M;let y=Math.max(.35,v*h[0]+p*h[1]);return[r[0]+v*e/y,r[1]+p*e/y]})}function at(n,e,t={}){let a=new lt,r=Math.min(t.bevel??0,e*.45),s=r>0?Math.max(1,t.bevelSegments??2):0,i=St(n)>0?n:[...n].reverse(),o=(t.holes??[]).map(p=>St(p)<0?p:[...p].reverse()),c=[i,...o],d=[],l=e/2;if(s>0){for(let p=0;p<=s;p++){let M=p/s*(Math.PI/2);d.push({off:r*(1-Math.sin(M)),z:-l+r*(1-Math.cos(M)),nz:-Math.cos(M),nxy:Math.sin(M)})}for(let p=0;p<=s;p++){let M=p/s*(Math.PI/2);d.push({off:r*(1-Math.cos(M)),z:l-r+r*Math.sin(M),nz:Math.sin(M),nxy:Math.cos(M)})}}else d.push({off:0,z:-l,nz:0,nxy:1},{off:0,z:l,nz:0,nxy:1});for(let p of c){let M=p!==i,y=d.map(w=>w.off>0?Ka(p,M?-w.off:w.off):p),x=0;for(let w=0;w<p.length;w++){let g=p[w],k=p[(w+1)%p.length],f=Math.hypot(k[0]-g[0],k[1]-g[1]),A=k[0]-g[0],P=k[1]-g[1],S=Math.hypot(A,P)||1;A/=S,P/=S;let T=P,j=-A,z=a.pos.length/3;for(let R=0;R<d.length;R++){let I=d[R],L=y[R],E=L[w],N=L[(w+1)%L.length],O=[T*I.nxy,j*I.nxy,I.nz];a.v(E[0],E[1],I.z,O[0],O[1],O[2],x,I.z+l),a.v(N[0],N[1],I.z,O[0],O[1],O[2],x+f,I.z+l)}for(let R=0;R<d.length-1;R++){let I=z+R*2;a.quad(I,I+1,I+3,I+2)}x+=f}}let m=s>0?Ka(i,r):i,h=o.map(p=>s>0?Ka(p,-r):p),b=h.length?ls(m,h):m,v=Ja(b);for(let[p,M]of[[-l,-1],[l,1]]){let y=a.pos.length/3;for(let x of b)a.v(x[0],x[1],p,0,0,M,x[0],x[1]);for(let x=0;x<v.length;x+=3)M>0?a.tri(y+v[x],y+v[x+1],y+v[x+2]):a.tri(y+v[x],y+v[x+2],y+v[x+1])}return a.build()}function Xa(n,e,t,a=24){return Array.from({length:a},(r,s)=>[n+Math.cos(s/a*Math.PI*2)*t,e+Math.sin(s/a*Math.PI*2)*t])}function Ft(n,e,t,a,r,s=4){let i=[],o=[[t-r,e+r,-Math.PI/2],[t-r,a-r,0],[n+r,a-r,Math.PI/2],[n+r,e+r,Math.PI]];for(let[c,d,l]of o)for(let m=0;m<=s;m++){let h=l+m/s*(Math.PI/2);i.push([c+Math.cos(h)*r,d+Math.sin(h)*r])}return i}var Tr=48,aa=24,Ya={arrayStride:Tr,attributes:[{shaderLocation:0,offset:0,format:"float32x3"},{shaderLocation:1,offset:12,format:"float32x3"},{shaderLocation:2,offset:24,format:"float32x4"},{shaderLocation:3,offset:40,format:"float32x2"}]},Rr={arrayStride:aa,attributes:[{shaderLocation:4,offset:0,format:"uint16x4"},{shaderLocation:5,offset:8,format:"float32x4"}]},me=class{vertexBuffer;indexBuffer;skinBuffer;indexCount;vertexCount;bounds;skinned;source;label;constructor(e,t,a={}){let r=t,s=r.positions.length/3,i=r.uvs??new Float32Array(s*2),o=r.tangents??_a(r.positions,r.normals,i,r.indices),c=new Float32Array(s*(Tr/4));for(let d=0;d<s;d++){let l=d*12;c[l]=r.positions[d*3],c[l+1]=r.positions[d*3+1],c[l+2]=r.positions[d*3+2],c[l+3]=r.normals[d*3],c[l+4]=r.normals[d*3+1],c[l+5]=r.normals[d*3+2],c[l+6]=o[d*4],c[l+7]=o[d*4+1],c[l+8]=o[d*4+2],c[l+9]=o[d*4+3],c[l+10]=i[d*2],c[l+11]=i[d*2+1]}if(this.label=a.label??"mesh",this.vertexBuffer=e.createBuffer(c.byteLength,GPUBufferUsage.VERTEX,`${this.label}.vb`,c),this.indexBuffer=e.createBuffer(r.indices.byteLength,GPUBufferUsage.INDEX,`${this.label}.ib`,r.indices),this.indexCount=r.indices.length,this.vertexCount=s,this.bounds=He.fromPositions(r.positions),this.skinned=!!(r.joints&&r.weights),this.skinned){let d=new ArrayBuffer(s*aa),l=new Uint16Array(d),m=new Float32Array(d);for(let h=0;h<s;h++){for(let b=0;b<4;b++)l[h*aa/2+b]=r.joints[h*4+b];for(let b=0;b<4;b++)m[(h*aa+8)/4+b]=r.weights[h*4+b]}this.skinBuffer=e.createBuffer(d.byteLength,GPUBufferUsage.VERTEX,`${this.label}.skin`,new Uint8Array(d))}else this.skinBuffer=null;this.source=a.keepSource?r:null}destroy(){this.vertexBuffer.destroy(),this.indexBuffer.destroy(),this.skinBuffer?.destroy()}};var bs=`
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
`,Qa=class{constructor(e){this.dev=e;this.sampler=e.device.createSampler({minFilter:"linear",magFilter:"linear"}),this.module=e.shader(bs,"mipgen")}pipelines=new Map;sampler;module;pipeline(e,t){let a=`${e}:${t}`,r=this.pipelines.get(a);return r||(r=this.dev.device.createRenderPipeline({layout:"auto",vertex:{module:this.module,entryPoint:"vs"},fragment:{module:this.module,entryPoint:t==="normal"?"fsNormal":"fs",targets:[{format:e}]},primitive:{topology:"triangle-list"}}),this.pipelines.set(a,r)),r}generate(e,t="color",a){let r=a??this.dev.device.createCommandEncoder({label:"mipgen"}),s=this.pipeline(e.format,t),i=e.depthOrArrayLayers;for(let o=0;o<i;o++)for(let c=1;c<e.mipLevelCount;c++){let d=this.dev.device.createBindGroup({layout:s.getBindGroupLayout(0),entries:[{binding:0,resource:e.createView({dimension:"2d",baseMipLevel:c-1,mipLevelCount:1,baseArrayLayer:o,arrayLayerCount:1})},{binding:1,resource:this.sampler}]}),l=r.beginRenderPass({colorAttachments:[{view:e.createView({dimension:"2d",baseMipLevel:c,mipLevelCount:1,baseArrayLayer:o,arrayLayerCount:1}),loadOp:"clear",storeOp:"store",clearValue:[0,0,0,0]}]});l.setPipeline(s),l.setBindGroup(0,d),l.draw(3),l.end()}a||this.dev.device.queue.submit([r.finish()])}},ra=class{constructor(e){this.dev=e;this.mipgen=new Qa(e),this.white=this.solid([255,255,255,255],"rgba8unorm-srgb","white"),this.black=this.solid([0,0,0,255],"rgba8unorm-srgb","black"),this.flatNormal=this.solid([128,128,255,255],"rgba8unorm","flatNormal"),this.defaultOrm=this.solid([255,255,255,255],"rgba8unorm","orm"),this.white3d=e.device.createTexture({size:[1,1,1],dimension:"3d",format:"r16float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),e.device.queue.writeTexture({texture:this.white3d},new Uint16Array([15360]),{bytesPerRow:2},[1,1,1])}mipgen;white;black;flatNormal;defaultOrm;white3d;samplers=new Map;solid(e,t,a){let r=this.dev.device.createTexture({size:[1,1],format:t,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:a});return this.dev.device.queue.writeTexture({texture:r},new Uint8Array(e),{bytesPerRow:4},[1,1]),r}fromImage(e,t={}){let a=t.srgb?"rgba8unorm-srgb":"rgba8unorm",r=t.mips!==!1?qe(e.width,e.height):1,s=this.dev.device.createTexture({size:[e.width,e.height],format:a,mipLevelCount:r,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT,label:t.label});return this.dev.device.queue.copyExternalImageToTexture({source:e},{texture:s},[e.width,e.height]),r>1&&this.mipgen.generate(s,t.normalMap?"normal":"color"),s}fromRGBA8(e,t,a,r={}){let s=r.srgb?"rgba8unorm-srgb":"rgba8unorm",i=r.mips!==!1?qe(t,a):1,o=this.dev.device.createTexture({size:[t,a],format:s,mipLevelCount:i,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT,label:r.label});return this.dev.device.queue.writeTexture({texture:o},e,{bytesPerRow:t*4},[t,a]),i>1&&this.mipgen.generate(o,r.normalMap?"normal":"color"),o}async fromURL(e,t={}){let a=await(await fetch(e)).blob(),r=await createImageBitmap(a,{colorSpaceConversion:"none",premultiplyAlpha:"none"});return this.fromImage(r,{label:e,...t})}sampler(e={}){let t=e.address??"repeat",a=e.addressV??t,r=e.filter??"linear",s=e.anisotropy??16,i=`${t}|${a}|${r}|${s}`,o=this.samplers.get(i);return o||(o=this.dev.device.createSampler({addressModeU:t,addressModeV:a,addressModeW:t,magFilter:r,minFilter:r,mipmapFilter:r,maxAnisotropy:r==="linear"?s:1}),this.samplers.set(i,o)),o}};var jr=96,Gt={ALPHA_MASK:1,UNLIT:2,WORLD_UV:4,FOLIAGE:8,WIND:16},ds=0,ue=class{id=++ds;name;baseColor;emissive;emissiveLuminance;metallic;roughness;normalScale;occlusionStrength;specular;edgeWear;edgeWearRadius;uvScale;uvOffset;uvRotation;alphaMode;alphaCutoff;doubleSided;unlit;worldUV;foliage;wind;baseColorMap;normalMap;ormMap;emissiveMap;sampler;buffer=null;bindGroup=null;dirtyUniform=!0;dirtyBinding=!0;constructor(e={}){this.name=e.name??`material${this.id}`,this.baseColor=e.baseColor??[.8,.8,.8,1],this.emissive=e.emissive??[0,0,0],this.emissiveLuminance=e.emissiveLuminance??0,this.metallic=e.metallic??0,this.roughness=e.roughness??.6,this.normalScale=e.normalScale??1,this.occlusionStrength=e.occlusionStrength??1,this.specular=e.specular??.5,this.edgeWear=e.edgeWear??0,this.edgeWearRadius=e.edgeWearRadius??.003,this.uvScale=e.uvScale??[1,1],this.uvOffset=e.uvOffset??[0,0],this.uvRotation=e.uvRotation??0,this.alphaMode=e.alphaMode??"opaque",this.alphaCutoff=e.alphaCutoff??.5,this.doubleSided=e.doubleSided??!1,this.unlit=e.unlit??!1,this.worldUV=e.worldUV??!1,this.foliage=e.foliage??!1,this.wind=e.wind??!1,this.baseColorMap=e.baseColorMap??null,this.normalMap=e.normalMap??null,this.ormMap=e.ormMap??null,this.emissiveMap=e.emissiveMap??null,this.sampler=e.sampler??null}markDirty(){this.dirtyUniform=!0}markBindingsDirty(){this.dirtyBinding=!0,this.dirtyUniform=!0}get flags(){let e=0;return this.alphaMode==="mask"&&(e|=Gt.ALPHA_MASK),this.unlit&&(e|=Gt.UNLIT),this.worldUV&&(e|=Gt.WORLD_UV),this.foliage&&(e|=Gt.FOLIAGE),this.wind&&(e|=Gt.WIND),e}get variantKey(){return`${this.alphaMode}|${this.doubleSided?2:1}`}getBindGroup(e,t,a){if(this.buffer||(this.buffer=e.createBuffer(jr,GPUBufferUsage.UNIFORM,`${this.name}.ub`)),this.dirtyUniform){let r=new Float32Array(jr/4);r.set(this.baseColor,0),r.set(this.emissive,4),r[7]=this.emissiveLuminance,r[8]=this.metallic,r[9]=this.roughness,r[10]=this.normalScale,r[11]=this.occlusionStrength,r[12]=this.uvScale[0],r[13]=this.uvScale[1],r[14]=this.uvOffset[0],r[15]=this.uvOffset[1],r[16]=this.alphaCutoff,r[17]=this.specular,r[18]=this.uvRotation,r[19]=this.flags,r[20]=this.edgeWear,r[21]=this.edgeWearRadius,e.device.queue.writeBuffer(this.buffer,0,r),this.dirtyUniform=!1}return(this.dirtyBinding||!this.bindGroup)&&(this.bindGroup=e.device.createBindGroup({layout:a,label:this.name,entries:[{binding:0,resource:{buffer:this.buffer}},{binding:1,resource:this.sampler??t.sampler()},{binding:2,resource:(this.baseColorMap??t.white).createView()},{binding:3,resource:(this.normalMap??t.flatNormal).createView()},{binding:4,resource:(this.ormMap??t.defaultOrm).createView()},{binding:5,resource:(this.emissiveMap??t.white).createView()}]}),this.dirtyBinding=!1),this.bindGroup}},Za=`
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
`;var us={concrete:0,wood:1,anodized:2,parkerized:3,polymer:4,paintedSteel:5,ground:6,gravel:7,brass:8,paperTarget:9,rubber:10,webbing:11,cardboard:12,bareSteel:13,grass:14,nitride:15,machined:16,skin:17,glove:18},ms=`
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
`,hs={concrete:{tileMeters:2,color:[.42,.41,.39],color2:[0,0,0],wear:.3,dirt:.5,roughness:-1,bumpMm:1.2,extra:0},wood:{tileMeters:1,color:[.52,.34,.18],color2:[.32,.19,.09],wear:.4,dirt:.2,roughness:-1,bumpMm:.6,extra:0},anodized:{tileMeters:.25,color:[.035,.036,.038],color2:[0,0,0],wear:.25,dirt:0,roughness:.42,bumpMm:.02,extra:0},parkerized:{tileMeters:.25,color:[.055,.058,.056],color2:[0,0,0],wear:.2,dirt:0,roughness:-1,bumpMm:.03,extra:0},polymer:{tileMeters:.2,color:[.03,.03,.032],color2:[0,0,0],wear:0,dirt:.2,roughness:.62,bumpMm:.15,extra:0},paintedSteel:{tileMeters:.5,color:[.8,.8,.78],color2:[0,0,0],wear:.35,dirt:0,roughness:-1,bumpMm:.3,extra:0},ground:{tileMeters:4,color:[.24,.18,.12],color2:[.09,.11,.04],wear:0,dirt:0,roughness:-1,bumpMm:8,extra:0},gravel:{tileMeters:1.5,color:[.5,.48,.45],color2:[.32,.3,.28],wear:0,dirt:0,roughness:-1,bumpMm:12,extra:0},brass:{tileMeters:.05,color:[.95,.73,.38],color2:[0,0,0],wear:.2,dirt:0,roughness:-1,bumpMm:.01,extra:0},paperTarget:{tileMeters:.45,color:[.75,.05,.03],color2:[0,0,0],wear:0,dirt:0,roughness:-1,bumpMm:.05,extra:0},rubber:{tileMeters:.1,color:[.025,.025,.025],color2:[0,0,0],wear:0,dirt:0,roughness:-1,bumpMm:.4,extra:1},webbing:{tileMeters:.05,color:[.12,.13,.1],color2:[0,0,0],wear:0,dirt:0,roughness:-1,bumpMm:.25,extra:0},cardboard:{tileMeters:.6,color:[.55,.4,.25],color2:[0,0,0],wear:0,dirt:.3,roughness:-1,bumpMm:.2,extra:0},bareSteel:{tileMeters:.5,color:[0,0,0],color2:[0,0,0],wear:.3,dirt:0,roughness:-1,bumpMm:.2,extra:0},grass:{tileMeters:1.5,color:[.055,.085,.022],color2:[.2,.17,.085],wear:0,dirt:0,roughness:-1,bumpMm:10,extra:0},nitride:{tileMeters:.12,color:[.028,.029,.032],color2:[0,0,0],wear:.2,dirt:0,roughness:-1,bumpMm:.015,extra:0},machined:{tileMeters:.06,color:[.62,.62,.63],color2:[0,0,0],wear:.15,dirt:0,roughness:-1,bumpMm:.01,extra:1},skin:{tileMeters:.05,color:[.56,.33,.24],color2:[0,0,0],wear:0,dirt:0,roughness:-1,bumpMm:.12,extra:0},glove:{tileMeters:.04,color:[.045,.043,.04],color2:[0,0,0],wear:.35,dirt:.1,roughness:-1,bumpMm:.12,extra:0}},na=class{constructor(e,t){this.dev=e;this.tex=t;this.pipeline=e.device.createComputePipeline({layout:"auto",compute:{module:e.shader(ms,"material-synth"),entryPoint:"main"}})}pipeline;cache=new Map;generate(e,t={}){let r={...hs[e],...t,size:t.size??1024,seed:t.seed??1},s=JSON.stringify([e,r]),i=this.cache.get(s);if(i)return i;let o=this.dev.device,c=r.size,d=T=>o.createTexture({size:[c,c],format:"rgba8unorm",usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.COPY_SRC,label:T}),l=d(`${e}.albedo.tmp`),m=d(`${e}.normal.tmp`),h=d(`${e}.orm.tmp`),b=new ArrayBuffer(64),v=new Uint32Array(b),p=new Float32Array(b);v[0]=us[e],v[1]=r.seed>>>0,v[2]=c,p.set([...r.color,r.wear],4),p.set([...r.color2,r.dirt],8),p.set([r.tileMeters,r.roughness,r.bumpMm,r.extra],12);let M=this.dev.createBuffer(64,GPUBufferUsage.UNIFORM,"synth.params",new Uint8Array(b)),y=o.createBindGroup({layout:this.pipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:M}},{binding:1,resource:l.createView()},{binding:2,resource:m.createView()},{binding:3,resource:h.createView()}]}),x=qe(c),w=(T,j)=>o.createTexture({size:[c,c],format:j,mipLevelCount:x,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT,label:T}),g=w(`${e}.albedo`,"rgba8unorm-srgb"),k=w(`${e}.normal`,"rgba8unorm"),f=w(`${e}.orm`,"rgba8unorm"),A=o.createCommandEncoder({label:`synth ${e}`}),P=A.beginComputePass();P.setPipeline(this.pipeline),P.setBindGroup(0,y),P.dispatchWorkgroups(Math.ceil(c/8),Math.ceil(c/8)),P.end(),A.copyTextureToTexture({texture:l},{texture:g},[c,c]),A.copyTextureToTexture({texture:m},{texture:k},[c,c]),A.copyTextureToTexture({texture:h},{texture:f},[c,c]),this.tex.mipgen.generate(g,"color",A),this.tex.mipgen.generate(k,"normal",A),this.tex.mipgen.generate(f,"color",A),o.queue.submit([A.finish()]),o.queue.onSubmittedWorkDone().then(()=>{l.destroy(),m.destroy(),h.destroy(),M.destroy()});let S={albedo:g,normal:k,orm:f,tileMeters:r.tileMeters};return this.cache.set(s,S),S}material(e,t={},a={}){let r=this.generate(e,t),s=1/r.tileMeters;return new ue({name:a.name??e,baseColorMap:r.albedo,normalMap:r.normal,ormMap:r.orm,baseColor:[1,1,1,1],roughness:1,metallic:1,uvScale:[s,s],...a})}};var fs={sunElevation:38,sunAzimuth:130,sunIlluminance:128e3,sunAngularDiameter:.53,turbidity:1,rayleigh:1,ozone:1,mieG:.8,groundAlbedo:.18,altitude:100,multiScatter:1.25},sa=636e4,ps=646e4,gs=[5802e-9,13558e-9,331e-7];var ys=44e-7,vs=[65e-8,1881e-9,85e-9],xs=8e3,ws=1200;function zr(n){let e=n.sunElevation*Math.PI/180,t=n.sunAzimuth*Math.PI/180;return[Math.cos(e)*Math.sin(t),Math.sin(e),-Math.cos(e)*Math.cos(t)]}function Ms(n,e,t,a){let r=n*e,s=n*n-a*a,i=r*r-s;return i<0?-1:-r+Math.sqrt(i)}function ks(n){let e=zr(n),t=sa+n.altitude;if((()=>{let l=t*e[1],m=t*t-sa*sa,h=l*l-m;if(h<0)return-1;let b=-l-Math.sqrt(h);return b>0?b:-1})()>0)return[0,0,0];let r=Ms(t,e[1],0,ps),s=64,i=r/s,o=0,c=0,d=0;for(let l=0;l<s;l++){let m=(l+.5)*i,h=e[0]*m,b=t+e[1]*m,v=e[2]*m,p=Math.hypot(h,b,v)-sa;o+=Math.exp(-p/xs)*i,c+=Math.exp(-p/ws)*i,d+=Math.max(0,1-Math.abs(p-25e3)/15e3)*i}return[0,1,2].map(l=>Math.exp(-(gs[l]*n.rayleigh*o+ys*n.turbidity*c+vs[l]*n.ozone*d)))}var As=`
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
`,ia=class{constructor(e,t,a=128){this.dev=e;this.tex=t;this.size=a,this.pipeline=e.device.createComputePipeline({layout:"auto",compute:{module:e.shader(As,"sky"),entryPoint:"main"}}),this.ubuf=e.createBuffer(64,GPUBufferUsage.UNIFORM,"sky.u"),this.cube=e.device.createTexture({size:[a,a,6],format:"rgba16float",mipLevelCount:qe(a),usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.RENDER_ATTACHMENT,label:"sky.cube"}),this.bg=e.device.createBindGroup({layout:this.pipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.ubuf}},{binding:1,resource:this.cube.createView({dimension:"2d-array",baseMipLevel:0,mipLevelCount:1})}]})}settings={...fs};cube;size;pipeline;ubuf;bg;version=0;lastKey="";get sunDir(){return zr(this.settings)}sunIlluminanceRGB(){let e=ks(this.settings),t=this.settings.sunIlluminance;return[e[0]*t,e[1]*t,e[2]*t]}update(e){let t=JSON.stringify(this.settings);if(t===this.lastKey)return!1;this.lastKey=t;let a=this.settings,r=this.sunDir,s=this.sunIlluminanceRGB(),i=Math.max(0,r[1]),o=.12*a.sunIlluminance*Math.max(.02,Math.sin(Math.max(r[1],.02)))*(.8+.2*a.turbidity),c=[s[0]*i+o*.85,s[1]*i+o*.95,s[2]*i+o*1.15],d=new Float32Array([r[0],r[1],r[2],a.sunIlluminance,a.rayleigh,a.turbidity,a.ozone,a.mieG,a.groundAlbedo,a.altitude,a.multiScatter,this.size,c[0],c[1],c[2],0]);this.dev.device.queue.writeBuffer(this.ubuf,0,d);let l=e??this.dev.device.createCommandEncoder({label:"sky"}),m=l.beginComputePass({label:"sky bake"});return m.setPipeline(this.pipeline),m.setBindGroup(0,this.bg),m.dispatchWorkgroups(Math.ceil(this.size/8),Math.ceil(this.size/8),6),m.end(),this.tex.mipgen.generate(this.cube,"color",l),e||this.dev.device.queue.submit([l.finish()]),this.version++,!0}};var $a=`
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
`,Ps=$a+`
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
`,Ss=$a+`
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
`,Ts=$a+`
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
`,oa=class{constructor(e,t=128,a=96){this.dev=e;this.size=t;let r=e.device;this.mips=Math.min(qe(t),6),this.specular=r.createTexture({size:[t,t,6],format:"rgba16float",mipLevelCount:this.mips,usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING,label:"ibl.specular"}),this.sh=e.createBuffer(144,GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC,"ibl.sh"),this.brdfLut=r.createTexture({size:[128,128],format:"rgba16float",usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING,label:"brdf.lut"}),this.sampler=r.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"linear"}),this.prefilter=r.createComputePipeline({layout:"auto",compute:{module:e.shader(Ps,"ibl-prefilter"),entryPoint:"main"}}),this.shPipe=r.createComputePipeline({layout:"auto",compute:{module:e.shader(Ss,"ibl-sh"),entryPoint:"main"}});for(let c=0;c<this.mips;c++){let d=c/(this.mips-1),l=Math.max(1,t>>c);this.uniforms.push(e.createBuffer(16,GPUBufferUsage.UNIFORM,`ibl.u${c}`,new Float32Array([d,l,t,c===0?1:a])))}let s=r.createComputePipeline({layout:"auto",compute:{module:e.shader(Ts,"dfg"),entryPoint:"main"}}),i=r.createCommandEncoder({label:"dfg"}),o=i.beginComputePass();o.setPipeline(s),o.setBindGroup(0,r.createBindGroup({layout:s.getBindGroupLayout(0),entries:[{binding:0,resource:this.brdfLut.createView()}]})),o.dispatchWorkgroups(16,16),o.end(),r.queue.submit([i.finish()])}specular;sh;brdfLut;mips;prefilter;shPipe;sampler;uniforms=[];update(e,t){let a=this.dev.device,r=e.createView({dimension:"cube"}),s=t.beginComputePass({label:"ibl"});s.setPipeline(this.prefilter);for(let i=0;i<this.mips;i++){let o=Math.max(1,this.size>>i);s.setBindGroup(0,a.createBindGroup({layout:this.prefilter.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniforms[i]}},{binding:1,resource:r},{binding:2,resource:this.sampler},{binding:3,resource:this.specular.createView({dimension:"2d-array",baseMipLevel:i,mipLevelCount:1})}]})),s.dispatchWorkgroups(Math.ceil(o/8),Math.ceil(o/8),6)}s.setPipeline(this.shPipe),s.setBindGroup(0,a.createBindGroup({layout:this.shPipe.getBindGroupLayout(0),entries:[{binding:0,resource:r},{binding:1,resource:this.sampler},{binding:2,resource:{buffer:this.sh}}]})),s.dispatchWorkgroups(1),s.end()}};var Ir={enabled:!0,cascades:4,resolution:2048,distance:160,splitLambda:.82,casterExtent:120,constantBias:8e-5,slopeBias:1.6,normalBias:1.4,maxPenumbraTexels:14,blockerSamples:12,pcfSamples:20,blendFraction:.12},Ot=u.create();function Lr(n,e,t,a){let r=Math.max(1,Math.min(4,a.cascades)),s=Math.max(n.near,.05),i=a.distance,o=[];for(let y=1;y<=r;y++){let x=y/r,w=s*Math.pow(i/s,x),g=s+(i-s)*x;o.push(a.splitLambda*w+(1-a.splitLambda)*g)}let c=Math.tan(n.fovY/2),d=c*e,l={viewProj:[],splits:o,texelWorld:[],depthRange:[]},m=n.forward(),h=n.up(),b=n.right(),v=u.normalize(u.create(),t),p=Math.abs(v[1])>.99?u.create(0,0,1):u.create(0,1,0),M=s;for(let y=0;y<r;y++){let x=M,w=o[y];M=w;let g=d*d+c*c,k=.5*(x+w)*(1+g);k=Math.min(k,w);let f=Math.hypot(k-x,x*Math.sqrt(g)),A=Math.hypot(w-k,w*Math.sqrt(g)),P=Math.max(f,A)*1.02,S=u.scaleAndAdd(u.create(),n.position,m,k),T=a.resolution,j=2*P/T,z=F.lookAt(F.create(),v,[0,0,0],p);u.transformMat4(Ot,S,z);let R=Math.round(Ot[0]/j)*j,I=Math.round(Ot[1]/j)*j,L=-Ot[2]-P-a.casterExtent,E=-Ot[2]+P,N=E-L,O=F.orthoZO(F.create(),R-P,R+P,I-P,I+P,L,E),C=F.multiply(F.create(),O,z);l.viewProj.push(C),l.texelWorld.push(j),l.depthRange.push(N)}return l}var Rs=0,ge=class{id=++Rs;mesh;material;transform=F.create();prevTransform=F.create();visible=!0;castShadow=!0;viewmodel=!1;joints=null;_skin=null;instances=null;instanceCount=0;instancesDirty=!1;_inst=null;instBounds=null;worldBounds=He.create();first=!0;userData=null;constructor(e,t,a){this.mesh=e,this.material=t,a&&(F.copy(this.transform,a),F.copy(this.prevTransform,a))}setTransform(e){F.copy(this.transform,e)}setInstances(e,t=e.length/16){this.instances=e,this.instanceCount=t,this.instancesDirty=!0;let a=He.create(),r=He.create();for(let s=0;s<t;s++){He.transform(r,this.mesh.bounds,e.subarray(s*16,s*16+16));for(let i=0;i<3;i++)a.min[i]=Math.min(a.min[i],r.min[i]),a.max[i]=Math.max(a.max[i],r.max[i])}this.instBounds=a}_endFrame(){F.copy(this.prevTransform,this.transform),this.first=!1}_beginFrame(){this.first&&F.copy(this.prevTransform,this.transform),He.transform(this.worldBounds,this.instances&&this.instBounds?this.instBounds:this.mesh.bounds,this.transform)}resetHistory(){this.first=!0}};var ca=class{position=u.create(0,1.7,0);rotation=D.create();fovY=70*Ye;viewmodelFovY=55*Ye;near=.04;aperture=8;shutter=1/250;iso=100;view=F.create();world=F.create();updateMatrices(){F.fromRotationTranslation(this.world,this.rotation,this.position),F.invert(this.view,this.world)}forward(e=u.create()){return u.transformQuat(e,[0,0,-1],this.rotation)}up(e=u.create()){return u.transformQuat(e,[0,1,0],this.rotation)}right(e=u.create()){return u.transformQuat(e,[1,0,0],this.rotation)}setFocalLength(e,t=24){this.fovY=2*Math.atan(t/(2*e))}},la=class{objects=new Set;lights=new Set;add(e){return this.objects.add(e),e}remove(e){this.objects.delete(e)}addLight(e){return this.lights.add(e),e}removeLight(e){this.lights.delete(e)}};var ft=`
const PI: f32 = 3.14159265359;
const INV_PI: f32 = 0.31830988618;
const HALF_MAX: f32 = 60000.0;
`,pt=`
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
`,bt=`
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
`,Nt=`
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
`,ba=`
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
`,Ut=`
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
`,da=`
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
`,Er=`
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
`;var js=ft+pt+bt+Nt+Ut+`
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
`;function zs(n){let t=new Uint8Array(n*n*4*4),a=et(1234),r=new Float32Array(4096).map(()=>a.next()),s=(o,c)=>{let d=Math.floor(o),l=Math.floor(c),m=o-d,h=c-l,b=(M,y)=>r[(y&63)*64+(M&63)],v=m*m*(3-2*m),p=h*h*(3-2*h);return(b(d,l)*(1-v)+b(d+1,l)*v)*(1-p)+(b(d,l+1)*(1-v)+b(d+1,l+1)*v)*p},i=(o,c)=>{let d=0,l=.5,m=1;for(let h=0;h<5;h++)d+=l*s(o*m,c*m),l*=.5,m*=2;return d};for(let o=0;o<4;o++)for(let c=0;c<n;c++)for(let d=0;d<n;d++){let l=(d+.5)/n*2-1,m=(c+.5)/n*2-1,h=Math.hypot(l,m),b=0,v=255;if(o===0){let M=i(l*2.2+5,m*2.2+3);b=Math.max(0,Math.min(1,(1-h*h)*1.2))*Math.max(0,Math.min(1,M*1.8-.25)),v=Math.round(200+55*M)}else if(o===1){let M=Math.atan2(m,l),y=Math.pow(Math.abs(Math.cos(M*2.5)),6)*.6+Math.pow(Math.abs(Math.cos(M*4+.6)),10)*.4,x=i(l*4+11,m*4+7),w=.25+.75*y*(.6+.6*x);b=Math.max(0,1-h/w)**1.5+Math.max(0,1-h/.25)**2,b=Math.min(1,b),v=255}else if(o===2)b=Math.exp(-(m*m)*40)*Math.max(0,1-Math.abs(l)),v=255;else{let M=i(l*5+21,m*5+13);b=Math.max(0,1-h)**1.4*Math.max(0,M*1.6-.35),v=Math.round(180+75*M)}let p=((o*n+c)*n+d)*4;t[p]=v,t[p+1]=v,t[p+2]=v,t[p+3]=Math.round(Math.max(0,Math.min(1,b))*255)}return t}var ua=class{constructor(e){this.dev=e;this.instanceBuffer=e.createBuffer(this.capacity*64,GPUBufferUsage.VERTEX,"particles.inst");let t=128;this.atlas=e.device.createTexture({size:[t,t,4],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:"particle.atlas"}),e.device.queue.writeTexture({texture:this.atlas},zs(t),{bytesPerRow:t*4,rowsPerImage:t},[t,t,4]),this.sampler=e.device.createSampler({magFilter:"linear",minFilter:"linear"})}particles=[];maxParticles=4096;wind=u.create(1.5,0,.5);instanceBuffer;capacity=1024;data=new Float32Array(1024*16);atlas;sampler;pipeline=null;bg=null;bgDepth=null;random=et(77);count=0;get random01(){return this.random.next()}spawn(e){this.particles.length>=this.maxParticles&&this.particles.shift(),this.particles.push({kind:e.kind,pos:Float32Array.from(e.position),vel:Float32Array.from(e.velocity??[0,0,0]),life:e.life,size0:e.size0,size1:e.size1,color:e.color??[1,1,1],alpha0:e.alpha0??1,alpha1:e.alpha1??0,luminance:e.luminance??0,rotation:e.rotation??this.random.next()*Math.PI*2,spin:e.spin??0,drag:e.drag??0,gravity:e.gravity??0,buoyancy:e.buoyancy??0,stretch:e.stretch??0,layer:e.layer??(e.kind===2?2:e.kind),fadeIn:e.fadeIn??.05,age:0,fresh:!0})}update(e){let t=this.particles,a=0;for(let r=0;r<t.length;r++){let s=t[r];if(s.fresh){s.fresh=!1,t[a++]=s;continue}if(s.age+=e,s.age>=s.life)continue;let i=s.kind===0||s.kind===3?1:0;for(let o=0;o<3;o++){let c=s.vel[o]-this.wind[o]*i;s.vel[o]-=c*Math.min(1,s.drag*e)}s.vel[1]+=(s.buoyancy-s.gravity)*e,s.pos[0]+=s.vel[0]*e,s.pos[1]+=s.vel[1]*e,s.pos[2]+=s.vel[2]*e,s.rotation+=s.spin*e,t[a++]=s}t.length=a}upload(e){let t=this.particles,a=t.length;a>this.capacity&&(this.capacity=Math.ceil(a*1.5),this.instanceBuffer.destroy(),this.instanceBuffer=this.dev.createBuffer(this.capacity*64,GPUBufferUsage.VERTEX,"particles.inst"),this.data=new Float32Array(this.capacity*16));let r=i=>(i.pos[0]-e[0])**2+(i.pos[1]-e[1])**2+(i.pos[2]-e[2])**2;t.sort((i,o)=>r(o)-r(i));let s=this.data;for(let i=0;i<a;i++){let o=t[i],c=i*16,d=o.age/o.life,l=Math.min(1,d/Math.max(o.fadeIn,.001)),m=o.size0+(o.size1-o.size0)*Math.sqrt(d),h=(o.alpha0+(o.alpha1-o.alpha0)*d)*l;s[c]=o.pos[0],s[c+1]=o.pos[1],s[c+2]=o.pos[2],s[c+3]=m,s[c+4]=o.color[0],s[c+5]=o.color[1],s[c+6]=o.color[2],s[c+7]=h,s[c+8]=o.rotation,s[c+9]=o.kind,s[c+10]=o.luminance*(1-d)*(1-d),s[c+11]=o.stretch,s[c+12]=o.vel[0],s[c+13]=o.vel[1],s[c+14]=o.vel[2],s[c+15]=o.layer}return a&&this.dev.device.queue.writeBuffer(this.instanceBuffer,0,s,0,a*16),this.count=a,a}createPipeline(e,t){let a=this.dev.device,r=this.dev.shader(js,"particles"),s=a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d-array"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"depth"}}]});return this.pipeline=a.createRenderPipeline({label:"particles",layout:a.createPipelineLayout({bindGroupLayouts:[e,s]}),vertex:{module:r,entryPoint:"vs",buffers:[{arrayStride:64,stepMode:"instance",attributes:[{shaderLocation:0,offset:0,format:"float32x4"},{shaderLocation:1,offset:16,format:"float32x4"},{shaderLocation:2,offset:32,format:"float32x4"},{shaderLocation:3,offset:48,format:"float32x4"}]}]},fragment:{module:r,entryPoint:"fs",targets:[{format:t,blend:{color:{srcFactor:"one",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"triangle-strip"},depthStencil:{format:"depth32float",depthWriteEnabled:!1,depthCompare:"greater-equal"}}),this.bg=null,s}draw(e,t){!this.pipeline||this.count===0||((!this.bg||this.bgDepth!==t)&&(this.bg=this.dev.device.createBindGroup({layout:this.pipeline.getBindGroupLayout(1),entries:[{binding:0,resource:this.atlas.createView({dimension:"2d-array"})},{binding:1,resource:this.sampler},{binding:2,resource:t.createView()}]}),this.bgDepth=t),e.setPipeline(this.pipeline),e.setBindGroup(1,this.bg),e.setVertexBuffer(0,this.instanceBuffer),e.draw(4,this.count))}};var Is=ft+pt+bt+Nt+ba+Ut+`
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
`;function Ls(n){let t=new Uint8Array(n*n*4*6),a=new Uint8Array(n*n*4*6),r=et(99),s=Array.from({length:64},()=>r.next());for(let i=0;i<6;i++){let o=new Float32Array(n*n);for(let d=0;d<n;d++)for(let l=0;l<n;l++){let m=(l+.5)/n*2-1,h=(d+.5)/n*2-1,b=Math.hypot(m,h),v=Math.atan2(h,m),p=1+.18*(s[Math.floor((v+Math.PI)/(2*Math.PI)*63)]-.5)*2,M=[0,0,0],y=0,x=0,w=.6;switch(i){case 0:{let k=b<.14*p,f=b<.32*p,A=b<.62*p;k?(M=[.16,.16,.17],y=1,x=-.6,w=.55):f?(M=[.78,.79,.8],y=1,x=-.15+.15*Math.cos(b*30),w=.22):A&&(M=[.22,.21,.2],y=Math.min(1,(.62*p-b)*12),x=-.05,w=.5);break}case 1:{let k=b<.12*p,f=Math.abs(Math.sin(v*7+s[3]*6))>.6&&b<.45*p;k?(M=[.02,.015,.01],y=1,x=-1,w=.95):f?(M=[.75,.6,.42],y=Math.min(1,(.45*p-b)*6),x=.2,w=.75):b<.25*p&&(M=[.3,.2,.12],y=.8,x=-.2,w=.8);break}case 2:{b<.3*p?(M=[.62,.61,.58],y=1,x=-.8*(1-b/(.3*p)),w=.95):b<.75&&(M=[.58,.57,.54],y=Math.max(0,.6*(1-(b-.3)/.45)),x=0,w=.95);break}case 3:{b<.2?(M=[.01,.01,.01],y=1,x=-1,w=1):b<.27&&(M=[.25,.25,.26],y=.85,x=0,w=.8);break}case 4:{let k=Math.pow(Math.abs(Math.cos(v*9+s[7]*5)),4);b<.18?(M=[.55,.55,.57],y=1,x=.2,w=.35):b<(.3+.6*k)*p&&(M=[.5,.5,.52],y=Math.max(0,1-b)*.9,x=.05,w=.4);break}default:b<.7*p&&(M=[.12,.09,.06],y=Math.max(0,1-b/(.7*p))*.9,x=-.3*(1-b),w=1)}o[d*n+l]=x;let g=((i*n+d)*n+l)*4;t[g]=Math.round(Math.pow(M[0],1/2.2)*255),t[g+1]=Math.round(Math.pow(M[1],1/2.2)*255),t[g+2]=Math.round(Math.pow(M[2],1/2.2)*255),t[g+3]=Math.round(Math.max(0,Math.min(1,y))*255),a[g+3]=Math.round(w*255)}let c=6;for(let d=0;d<n;d++)for(let l=0;l<n;l++){let m=o[d*n+Math.min(n-1,l+1)]-o[d*n+Math.max(0,l-1)],h=o[Math.min(n-1,d+1)*n+l]-o[Math.max(0,d-1)*n+l],b=-m*c,v=h*c,p=1,M=Math.hypot(b,v,p);b/=M,v/=M,p/=M;let y=((i*n+d)*n+l)*4;a[y]=Math.round((b*.5+.5)*255),a[y+1]=Math.round((v*.5+.5)*255),a[y+2]=Math.round((p*.5+.5)*255)}}return{albedo:t,normal:a,layers:6}}var ma=class{constructor(e){this.dev=e;this.buffer=e.createBuffer(this.capacity*80,GPUBufferUsage.VERTEX,"decals.inst");let t=128,a=Ls(t),r=(s,i,o)=>{let c=e.device.createTexture({size:[t,t,a.layers],format:s,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:o});return e.device.queue.writeTexture({texture:c},i,{bytesPerRow:t*4,rowsPerImage:t},[t,t,a.layers]),c};this.albedo=r("rgba8unorm-srgb",a.albedo,"decal.albedo"),this.normal=r("rgba8unorm",a.normal,"decal.normal"),this.sampler=e.device.createSampler({magFilter:"linear",minFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"})}decals=[];maxDecals=512;buffer;capacity=512;data=new Float32Array(512*20);albedo;normal;sampler;pipeline=null;bg=null;count=0;tmp=F.create();add(e,t,a,r,s=null,i=[1,1,1],o=Math.random()*Math.PI*2){let c=u.normalize(u.create(),u.clone(a)),d=Math.abs(c[1])>.95?u.create(1,0,0):u.create(0,1,0),l=u.normalize(u.create(),u.cross(u.create(),d,c)),m=u.cross(u.create(),c,l),h=Math.cos(o),b=Math.sin(o),v=u.create(l[0]*h+m[0]*b,l[1]*h+m[1]*b,l[2]*h+m[2]*b),p=u.cross(u.create(),c,v),M=.0015,y=F.create();y[0]=v[0]*r,y[1]=v[1]*r,y[2]=v[2]*r,y[4]=p[0]*r,y[5]=p[1]*r,y[6]=p[2]*r,y[8]=c[0],y[9]=c[1],y[10]=c[2],y[12]=t[0]+c[0]*M,y[13]=t[1]+c[1]*M,y[14]=t[2]+c[2]*M;let x=y;if(s){let w=F.invert(F.create(),s.transform);x=F.multiply(F.create(),w,y)}this.decals.length>=this.maxDecals&&this.decals.shift(),this.decals.push({local:x,parent:s,kind:e,tint:i,age:0})}clear(){this.decals.length=0}upload(){let e=this.decals.length;e>this.capacity&&(this.capacity=Math.ceil(e*1.5),this.buffer.destroy(),this.buffer=this.dev.createBuffer(this.capacity*80,GPUBufferUsage.VERTEX,"decals.inst"),this.data=new Float32Array(this.capacity*20));for(let t=0;t<e;t++){let a=this.decals[t],r=a.parent?F.multiply(this.tmp,a.parent.transform,a.local):a.local;this.data.set(r,t*20),this.data[t*20+16]=a.kind,this.data[t*20+17]=a.tint[0],this.data[t*20+18]=a.tint[1],this.data[t*20+19]=a.tint[2]}return e&&this.dev.device.queue.writeBuffer(this.buffer,0,this.data,0,e*20),this.count=e,e}createPipeline(e,t){let a=this.dev.device,r=this.dev.shader(Is,"decals"),s=a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d-array"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d-array"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,sampler:{}}]});this.pipeline=a.createRenderPipeline({label:"decals",layout:a.createPipelineLayout({bindGroupLayouts:[e,s]}),vertex:{module:r,entryPoint:"vs",buffers:[{arrayStride:80,stepMode:"instance",attributes:[0,1,2,3,4].map(i=>({shaderLocation:i,offset:i*16,format:"float32x4"}))}]},fragment:{module:r,entryPoint:"fs",targets:[{format:t,blend:{color:{srcFactor:"one",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"triangle-strip"},depthStencil:{format:"depth32float",depthWriteEnabled:!1,depthCompare:"greater-equal",depthBias:2,depthBiasSlopeScale:2}}),this.bg=a.createBindGroup({layout:s,entries:[{binding:0,resource:this.albedo.createView({dimension:"2d-array"})},{binding:1,resource:this.normal.createView({dimension:"2d-array"})},{binding:2,resource:this.sampler}]})}draw(e){!this.pipeline||!this.bg||this.count===0||(e.setPipeline(this.pipeline),e.setBindGroup(1,this.bg),e.setVertexBuffer(0,this.buffer),e.draw(4,this.count))}};var dt=256,Fr=`
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
`,Es=`
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
`,Gr=ft+pt+bt+Nt+ba+Ut+Er+da+Fr+Za+Es+`
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
`,Or=Fr+Za+`
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
`;var Nr=`
struct FOut { @builtin(position) pos: vec4f, @location(0) uv: vec2f };
@vertex fn vsFull(@builtin(vertex_index) i: u32) -> FOut {
  let p = vec2f(f32((i << 1u) & 2u), f32(i & 2u));
  var o: FOut;
  o.pos = vec4f(p * 2.0 - 1.0, 0.0, 1.0);
  o.uv = vec2f(p.x, 1.0 - p.y);
  return o;
}
`,Ur=ft+pt+bt+da+Nr+`
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
`,Cr=`
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
`,Br=`
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
`,Dr=`
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
`,Vr=`
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
`,Hr=`
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
`,qr=`
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
`,Wr=`
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
`,Kr=`
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
`,_r=bt+Nr+`
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
`;var Jr=`
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
`;var Xr=`
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
`,Yr=Xr+`
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
`,Qr=Xr+`
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
`;function Gs(){return{renderScale:1,maxDevicePixelRatio:2,taa:{enabled:!0,feedbackMin:.82,feedbackMax:.94,velocityWeight:.06,jitterSamples:16},exposure:{mode:"auto",ev100:14,compensation:0,minEv100:-2,maxEv100:17,speedUp:2.2,speedDown:1.4,lowPercent:.45,highPercent:.96,centerWeight:.6},bloom:{enabled:!0,intensity:.035,radius:1,clamp:6e4},gtao:{enabled:!0,radius:.9,falloff:.4,power:1.25,strength:1,slices:2,steps:6,blur:!0},motionBlur:{enabled:!0,shutterAngle:180,maxPixels:48,samples:10},dof:{enabled:!0,apertureMm:3.2,autoFocus:!0,focusDistance:10,focusSpeed:6,maxBlurPx:14,overrideDistance:.6,overrideWeight:0,minFocus:.12,quality:1},lens:{distortion:0,distortion2:0,chromaticAberration:.15,naturalVignette:.6,vignette:.12,vignetteRoundness:.6,sharpen:.25,fillZoom:1},sensor:{enabled:!0,readNoise:.0025,shotNoise:.0018,isoCoupled:!0,gain:1},grade:{tonemapper:"agx",contrast:1.04,saturation:1.02,temperature:0,tint:0,lift:0,gamma:1,gain:1,exposureBias:0,dither:1},fog:{density:35e-5,heightFalloff:.045,baseHeight:0,startDistance:15,inscatter:1,mieG:.72},ibl:{intensity:1,specularOcclusion:1,occludedAmbient:.15,groundBounce:.6},gi:{enabled:!0,intensity:1},wind:{direction:[.94,.35],speed:1.7,bend:.045,turbulence:.25},clouds:{enabled:!0,coverage:.42,density:1.6,altitude:1800,scale:2600,windSpeed:9,windDirDeg:25,shadowStrength:.88},shadows:{...Ir},viewmodelDepthSqueeze:.5,debugView:0}}var Os={agx:0,aces:1,neutral:2,none:3};function $r(n){let e=new Float32Array(1),t=new Uint32Array(e.buffer);e[0]=n;let a=t[0],r=a>>>16&32768,s=(a>>>23&255)-127+15,i=a&8388607;return s<=0?s<-10?r:(i=(i|8388608)>>1-s,r|i>>13):s>=31?r|31744:r|s<<10|i>>13}var ha=class n{dev;device;settings;textures;synth;sky;ibl;particles;decals;stats={drawCalls:0,triangles:0,objects:0,culled:0,frameMs:0,gpuInfo:""};frameLayout;objectLayout;materialLayout;shadowLayout;frameBuf;lightBuf;exposureBuf;histBuf;objBuf;objCapacity=0;objData=new Float32Array(0);cascadeBuf;dummyJoints;staticObjectBG;frameBG=null;frameBGKey="";shadowMap;shadowRes=0;shadowCount=0;skyVis;skyVisParams={min:[0,0,0],cell:1,size:[1,1,1],enabled:!1};probes=[];cloudDrift=[0,0];probeParams={min:[0,0,0],cell:1,size:[1,1,1],enabled:!1};targets=null;linearClamp;shadowSampler;meshModule;shadowModule;pipelines=new Map;skyPipe;gtaoPipe;aoBlurPipe;taaPipe;mbPipe;dofFocusPipe;dofGatherPipe;dofState;bloomDownPipe;bloomUpPipe;histPipe;exposurePipe;compositePipe;debugPipe;postUniforms=new Map;frameIndex=0;prevViewProj=F.create();prevVmViewProj=F.create();historyValid=!1;time=0;lastSkyVersion=-1;fw=new ta(1344);constructor(e){this.dev=e,this.device=e.device;let t=this.device;this.settings=Gs(),this.textures=new ra(e),this.synth=new na(e,this.textures),this.sky=new ia(e,this.textures,128),this.ibl=new oa(e,128),this.particles=new ua(e),this.decals=new ma(e);let a=GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT;this.frameLayout=t.createBindGroupLayout({label:"frame",entries:[{binding:0,visibility:a,buffer:{type:"uniform"}},{binding:1,visibility:a,buffer:{type:"read-only-storage"}},{binding:2,visibility:a,buffer:{type:"read-only-storage"}},{binding:3,visibility:a,buffer:{type:"read-only-storage"}},{binding:4,visibility:a,texture:{viewDimension:"cube"}},{binding:5,visibility:a,texture:{}},{binding:6,visibility:a,texture:{sampleType:"depth",viewDimension:"2d-array"}},{binding:7,visibility:a,sampler:{type:"comparison"}},{binding:8,visibility:a,sampler:{}},{binding:9,visibility:a,texture:{sampleType:"unfilterable-float"}},{binding:10,visibility:a,texture:{viewDimension:"3d"}},{binding:11,visibility:a,texture:{viewDimension:"cube"}},{binding:12,visibility:a,texture:{viewDimension:"3d"}},{binding:13,visibility:a,texture:{viewDimension:"3d"}},{binding:14,visibility:a,texture:{viewDimension:"3d"}}]}),this.objectLayout=t.createBindGroupLayout({label:"object",entries:[{binding:0,visibility:a,buffer:{type:"uniform",hasDynamicOffset:!0,minBindingSize:dt}},{binding:1,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}},{binding:2,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}}]}),this.materialLayout=t.createBindGroupLayout({label:"material",entries:[{binding:0,visibility:a,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:3,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:4,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:5,visibility:GPUShaderStage.FRAGMENT,texture:{}}]}),this.shadowLayout=t.createBindGroupLayout({label:"shadow",entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform",hasDynamicOffset:!0,minBindingSize:64}}]}),this.frameBuf=e.createBuffer(1344,GPUBufferUsage.UNIFORM,"frame"),this.lightBuf=e.createBuffer(4096,GPUBufferUsage.STORAGE,"lights"),this.exposureBuf=e.createBuffer(16,GPUBufferUsage.STORAGE,"exposure",new Float32Array([1/(1.2*2**14),14,14,1/(1.2*2**14)])),this.histBuf=e.createBuffer(256*4,GPUBufferUsage.STORAGE,"histogram"),this.cascadeBuf=e.createBuffer(256*4,GPUBufferUsage.UNIFORM,"cascades"),this.dummyJoints=e.createBuffer(64,GPUBufferUsage.STORAGE,"dummyJoints",F.create()),this.objBuf=this.ensureObjectCapacity(256),this.linearClamp=t.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",addressModeW:"clamp-to-edge"}),this.shadowSampler=t.createSampler({compare:"less",magFilter:"linear",minFilter:"linear"}),this.skyVis=this.textures.white3d,this.probes=[this.textures.white3d,this.textures.white3d,this.textures.white3d],this.createShadowMap(),this.meshModule=e.shader(Gr,"mesh"),this.shadowModule=e.shader(Or,"shadow");let r="rgba16float",s=e.shader(Ur,"skypass");this.skyPipe=t.createRenderPipeline({label:"sky",layout:t.createPipelineLayout({bindGroupLayouts:[this.frameLayout]}),vertex:{module:s,entryPoint:"vsFull"},fragment:{module:s,entryPoint:"fsSky",targets:[{format:r}]},depthStencil:{format:"depth32float",depthWriteEnabled:!1,depthCompare:"greater-equal"}});let i=(c,d)=>t.createComputePipeline({label:d,layout:"auto",compute:{module:e.shader(c,d),entryPoint:"main"}});this.gtaoPipe=i(Cr,"gtao"),this.aoBlurPipe=i(Br,"aoblur"),this.taaPipe=i(Dr,"taa"),this.mbPipe=i(Vr,"motionblur"),this.dofFocusPipe=i(Yr,"dof-focus"),this.dofGatherPipe=i(Qr,"dof-gather"),this.dofState=e.createBuffer(16,GPUBufferUsage.STORAGE,"dof.state",new Float32Array([0,0,0,0])),this.bloomDownPipe=i(Hr,"bloomdown"),this.bloomUpPipe=i(qr,"bloomup"),this.histPipe=i(Wr,"histogram"),this.exposurePipe=i(Kr,"exposure"),this.debugPipe=i(Jr,"debug");let o=e.shader(_r,"composite");this.compositePipe=t.createRenderPipeline({label:"composite",layout:"auto",vertex:{module:o,entryPoint:"vsFull"},fragment:{module:o,entryPoint:"fsComposite",targets:[{format:e.presentationFormat}]}}),this.particles.createPipeline(this.frameLayout,r),this.decals.createPipeline(this.frameLayout,r),this.staticObjectBG=this.makeObjectBG(this.dummyJoints,this.dummyJoints)}static async create(e,t={}){let a=await ea.create({canvas:e,powerPreference:t.powerPreference,offscreen:t.offscreen});return new n(a)}get materialBindGroupLayout(){return this.materialLayout}ensureObjectCapacity(e){if(e<=this.objCapacity)return this.objBuf;let t=Math.max(e,Math.ceil(this.objCapacity*1.5),256);this.objBuf?.destroy?.(),this.objBuf=this.dev.createBuffer(t*dt,GPUBufferUsage.UNIFORM,"objects"),this.objData=new Float32Array(t*dt/4),this.objCapacity=t,this.dummyJoints&&(this.staticObjectBG=this.makeObjectBG(this.dummyJoints,this.dummyJoints));for(let a of this.skinnedObjects)a._skin&&(a._skin.bg=null);return this.objBuf}skinnedObjects=new Set;makeObjectBG(e,t){return this.device.createBindGroup({layout:this.objectLayout,entries:[{binding:0,resource:{buffer:this.objBuf,size:dt}},{binding:1,resource:{buffer:e}},{binding:2,resource:{buffer:t}}]})}createShadowMap(){let e=this.settings.shadows,t=Math.max(256,Math.min(8192,e.resolution|0)),a=Math.max(1,Math.min(4,e.cascades|0));this.shadowMap&&t===this.shadowRes&&a===this.shadowCount||(this.shadowMap?.destroy(),this.shadowMap=this.device.createTexture({size:[t,t,4],format:"depth32float",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING,label:"shadowmap"}),this.shadowRes=t,this.shadowCount=a,this.frameBG=null)}setSkyVisibility(e,t,a,r,s,i){let o=new Uint16Array(e.length);for(let d=0;d<e.length;d++)o[d]=$r(e[d]);let c=this.device.createTexture({size:[t,a,r],dimension:"3d",format:"r16float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:"skyvis"});this.device.queue.writeTexture({texture:c},o,{bytesPerRow:t*2,rowsPerImage:a},[t,a,r]),this.skyVis!==this.textures.white3d&&this.skyVis.destroy(),this.skyVis=c,this.skyVisParams={min:[...s],cell:i,size:[t,a,r],enabled:!0},this.frameBG=null}setProbeVolume(e,t,a,r,s,i){let o=t*a*r;for(let c=0;c<3;c++){let d=new Uint16Array(o*4);for(let m=0;m<o;m++)for(let h=0;h<4;h++)d[m*4+h]=$r(e[m*12+c*4+h]);let l=this.device.createTexture({size:[t,a,r],dimension:"3d",format:"rgba16float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:`gi.probes.${"rgb"[c]}`});this.device.queue.writeTexture({texture:l},d,{bytesPerRow:t*8,rowsPerImage:a},[t,a,r]),this.probes[c]!==this.textures.white3d&&this.probes[c].destroy(),this.probes[c]=l}this.probeParams={min:[s[0],s[1],s[2]],cell:i,size:[t,a,r],enabled:!0},this.frameBG=null}async readSkySH(){let e=this.device,t=e.createCommandEncoder({label:"sky-sh-readback"});this.sky.update(t),this.sky.version!==this.lastSkyVersion&&(this.ibl.update(this.sky.cube,t),this.lastSkyVersion=this.sky.version);let a=e.createBuffer({size:144,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST,label:"sh-readback"});t.copyBufferToBuffer(this.ibl.sh,0,a,0,144),e.queue.submit([t.finish()]),await a.mapAsync(GPUMapMode.READ);let r=new Float32Array(a.getMappedRange().slice(0));a.unmap(),a.destroy();let s=new Float32Array(27);for(let i=0;i<9;i++)for(let o=0;o<3;o++)s[i*3+o]=r[i*4+o];return s}makeTargets(e,t){let a=this.device,r=(l,m,h,b=[e,t])=>a.createTexture({label:l,size:b,format:m,usage:h}),s=GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING,i=GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING,o=[],c=[],d=Math.min(6,qe(e,t)-2);for(let l=0;l<d;l++){let m=Math.max(1,e>>l+1),h=Math.max(1,t>>l+1);o.push(r(`bloom.down${l}`,"rgba16float",i,[m,h])),c.push(r(`bloom.up${l}`,"rgba16float",i,[m,h]))}return{w:e,h:t,depth:r("depth","depth32float",s),normal:r("normal","rgba16float",s),velocity:r("velocity","rg16float",s),hdr:r("hdr","rgba16float",s),aoRaw:r("ao.raw","r32float",i),ao:r("ao","r32float",i),history:[r("taa.a","rgba16float",i),r("taa.b","rgba16float",i)],mb:r("motionblur","rgba16float",i),dof:r("dof","rgba16float",i),debug:r("debug","rgba16float",i),bloomDown:o,bloomUp:c}}destroyTargets(e){for(let t of[e.depth,e.normal,e.velocity,e.hdr,e.aoRaw,e.ao,e.history[0],e.history[1],e.mb,e.dof,e.debug,...e.bloomDown,...e.bloomUp])t.destroy()}uniform(e,t){let a=this.postUniforms.get(e);return a||(a=this.dev.createBuffer(Math.max(16,t.byteLength),GPUBufferUsage.UNIFORM,e),this.postUniforms.set(e,a)),this.device.queue.writeBuffer(a,0,t.buffer,t.byteOffset,t.byteLength),a}getFrameBG(e){let t=`${e.w}x${e.h}`;return this.frameBG&&this.frameBGKey===t?this.frameBG:(this.frameBG=this.device.createBindGroup({layout:this.frameLayout,label:"frame",entries:[{binding:0,resource:{buffer:this.frameBuf}},{binding:1,resource:{buffer:this.lightBuf}},{binding:2,resource:{buffer:this.ibl.sh}},{binding:3,resource:{buffer:this.exposureBuf}},{binding:4,resource:this.ibl.specular.createView({dimension:"cube"})},{binding:5,resource:this.ibl.brdfLut.createView()},{binding:6,resource:this.shadowMap.createView({dimension:"2d-array"})},{binding:7,resource:this.shadowSampler},{binding:8,resource:this.linearClamp},{binding:9,resource:e.ao.createView()},{binding:10,resource:this.skyVis.createView()},{binding:11,resource:this.sky.cube.createView({dimension:"cube"})},{binding:12,resource:this.probes[0].createView()},{binding:13,resource:this.probes[1].createView()},{binding:14,resource:this.probes[2].createView()}]}),this.frameBGKey=t,this.frameBG)}getPipelines(e,t){let a=`${e?1:0}|${t.variantKey}`,r=this.pipelines.get(a);if(r)return r;let s=this.device,i=s.createPipelineLayout({bindGroupLayouts:[this.frameLayout,this.objectLayout,this.materialLayout]}),o=e?[Ya,Rr]:[Ya],c={module:this.meshModule,entryPoint:e?"vsSkinned":"vsStatic",buffers:o},d=t.doubleSided?"none":"back",l=s.createRenderPipeline({label:`prepass ${a}`,layout:i,vertex:c,fragment:{module:this.meshModule,entryPoint:"fsPrepass",targets:[{format:"rgba16float"},{format:"rg16float"}]},primitive:{topology:"triangle-list",cullMode:d},depthStencil:{format:"depth32float",depthWriteEnabled:!0,depthCompare:"greater"}}),m=s.createRenderPipeline({label:`main ${a}`,layout:i,vertex:c,fragment:{module:this.meshModule,entryPoint:"fsMain",targets:[{format:"rgba16float"}]},primitive:{topology:"triangle-list",cullMode:d},depthStencil:{format:"depth32float",depthWriteEnabled:!1,depthCompare:"equal"}}),h=s.createRenderPipeline({label:`transparent ${a}`,layout:i,vertex:c,fragment:{module:this.meshModule,entryPoint:"fsTransparent",targets:[{format:"rgba16float",blend:{color:{srcFactor:"one",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"triangle-list",cullMode:d},depthStencil:{format:"depth32float",depthWriteEnabled:!1,depthCompare:"greater"}}),b=this.settings.shadows,v=s.createRenderPipeline({label:`shadow ${a}`,layout:s.createPipelineLayout({bindGroupLayouts:[this.shadowLayout,this.objectLayout,this.materialLayout]}),vertex:{module:this.shadowModule,entryPoint:e?"vsShadowSkinned":"vsShadow",buffers:o},fragment:t.alphaMode==="mask"?{module:this.shadowModule,entryPoint:"fsShadowMask",targets:[]}:void 0,primitive:{topology:"triangle-list",cullMode:"none"},depthStencil:{format:"depth32float",depthWriteEnabled:!0,depthCompare:"less",depthBias:1,depthBiasSlopeScale:b.slopeBias,depthBiasClamp:.01}});return r={prepass:l,main:m,transparent:h,shadow:v},this.pipelines.set(a,r),r}render(e,t,a){let r=performance.now(),s=this.settings,i=this.device,o=this.dev.canvas,c=Math.min(globalThis.devicePixelRatio??1,s.maxDevicePixelRatio),d=Math.max(1,Math.floor((o.clientWidth||o.width)*c)),l=Math.max(1,Math.floor((o.clientHeight||o.height)*c));(o.width!==d||o.height!==l)&&(o.width=d,o.height=l);let m=Math.max(16,Math.round(d*s.renderScale)),h=Math.max(16,Math.round(l*s.renderScale));(!this.targets||this.targets.w!==m||this.targets.h!==h)&&(this.targets&&this.destroyTargets(this.targets),this.targets=this.makeTargets(m,h),this.frameBG=null,this.historyValid=!1);let b=this.targets;this.createShadowMap(),this.time+=a;let v=i.createCommandEncoder({label:"frame"});this.sky.update(v),this.sky.version!==this.lastSkyVersion&&(this.ibl.update(this.sky.cube,v),this.lastSkyVersion=this.sky.version),t.updateMatrices();let p=m/h,M=s.taa.enabled?Math.max(1,s.taa.jitterSamples):1,y=this.frameIndex%M+1,x=s.taa.enabled?(Wa(y,2)-.5)*2/m:0,w=s.taa.enabled?(Wa(y,3)-.5)*2/h:0,g=F.perspectiveReversedInfinite(F.create(),t.fovY,p,t.near,x,w),k=F.perspectiveReversedInfinite(F.create(),t.fovY,p,t.near),f=F.perspectiveReversedInfinite(F.create(),t.viewmodelFovY,p,t.near*.25,x,w),A=F.perspectiveReversedInfinite(F.create(),t.viewmodelFovY,p,t.near*.25),P=F.multiply(F.create(),g,t.view),S=F.multiply(F.create(),k,t.view),T=F.multiply(F.create(),f,t.view),j=F.multiply(F.create(),A,t.view);this.historyValid||(F.copy(this.prevViewProj,S),F.copy(this.prevVmViewProj,j));let z=F.invert(F.create(),g),R=F.invert(F.create(),P),I=F.invert(F.create(),S),L=this.sky.sunDir,E=this.sky.sunIlluminanceRGB(),N=this.sky.settings.sunAngularDiameter*Math.PI/360,O=s.shadows,C=O.enabled?Lr(t,p,u.clone(L),O):null,U=this.fw;U.mat4(0,P),U.mat4(64,S),U.mat4(128,this.prevViewProj),U.mat4(192,T),U.mat4(256,j),U.mat4(320,this.prevVmViewProj),U.mat4(384,t.view),U.mat4(448,t.world),U.mat4(512,z),U.mat4(576,R),U.mat4(640,g),U.vec4(704,t.position[0],t.position[1],t.position[2],t.near),U.vec4(720,L[0],L[1],L[2],Math.cos(N)),U.vec4(736,E[0],E[1],E[2],1),U.vec4(752,m,h,1/m,1/h),U.vec4(768,x,w,0,0);let q=.06*this.sky.settings.sunIlluminance/Math.PI*Math.max(.05,Math.sin(Math.max(.03,L[1])))*s.fog.inscatter;if(U.vec4(784,s.fog.density,s.fog.heightFalloff,s.fog.baseHeight,s.fog.startDistance),U.vec4(800,q*.62,q*.75,q,s.fog.mieG),U.vec4(816,this.time,a,this.frameIndex,s.ibl.intensity),U.vec4(832,C?C.viewProj.length:0,O.maxPenumbraTexels,Math.tan(N),O.blendFraction),C){U.vec4(848,C.splits[0]??1e9,C.splits[1]??1e9,C.splits[2]??1e9,C.splits[3]??1e9);for(let G=0;G<4;G++)U.mat4(864+G*64,C.viewProj[G]??F.create());U.vec4(1120,C.texelWorld[0]??1,C.texelWorld[1]??1,C.texelWorld[2]??1,C.texelWorld[3]??1),U.vec4(1216,C.depthRange[0]??1,C.depthRange[1]??1,C.depthRange[2]??1,C.depthRange[3]??1)}let V=this.skyVisParams;U.vec4(1136,V.min[0],V.min[1],V.min[2],V.cell),U.vec4(1152,V.size[0],V.size[1],V.size[2],V.enabled?1:0);let K=new Float32Array(1024),B=0;for(let G of e.lights){if(!G.enabled||B>=64||G.intensity<=0)continue;let _=B*16;K.set([G.position[0],G.position[1],G.position[2],G.range],_),K.set([G.color[0]*G.intensity,G.color[1]*G.intensity,G.color[2]*G.intensity,0],_+4);let te=G.spotOuter>0,se=u.normalize(u.create(),G.direction);K.set([se[0],se[1],se[2],Math.cos(G.spotOuter*Math.PI/180)],_+8),K.set([Math.cos(Math.min(G.spotInner,G.spotOuter)*Math.PI/180),G.radius,te?1:0,0],_+12),B++}i.queue.writeBuffer(this.lightBuf,0,K,0,Math.max(16,B*16)),U.vec4(1168,B,s.ibl.specularOcclusion,s.gtao.enabled?s.gtao.strength:0,O.normalBias),U.vec4(1184,this.ibl.mips-1,1,this.sky.settings.groundAlbedo,s.debugView),U.vec4(1200,s.viewmodelDepthSqueeze,0,0,0),U.vec4(1232,O.constantBias,O.slopeBias,Math.min(16,O.blockerSamples),Math.min(32,O.pcfSamples)),U.vec4(1248,s.ibl.occludedAmbient,s.ibl.groundBounce,0,0),U.vec4(1264,s.wind.direction[0]*s.wind.speed,s.wind.direction[1]*s.wind.speed,s.wind.bend,s.wind.turbulence);let J=s.clouds;this.cloudDrift[0]+=Math.cos(J.windDirDeg*Math.PI/180)*J.windSpeed*a,this.cloudDrift[1]+=Math.sin(J.windDirDeg*Math.PI/180)*J.windSpeed*a,U.vec4(1312,J.coverage,J.density,J.altitude,J.scale),U.vec4(1328,this.cloudDrift[0]%1e6,this.cloudDrift[1]%1e6,J.shadowStrength,J.enabled?1:0);let Q=this.probeParams;U.vec4(1280,Q.min[0],Q.min[1],Q.min[2],Q.cell),U.vec4(1296,Q.size[0],Q.size[1],Q.size[2],Q.enabled&&s.gi.enabled?s.gi.intensity:0),i.queue.writeBuffer(this.frameBuf,0,U.buffer);let Y=Ha(P),X=[],Z=[],ne=0,oe=[...e.objects];this.ensureObjectCapacity(oe.length+1);let pe=this.objData,we=new Map,Ie=0,$e=new Float32Array(12);for(let G of oe){if(!G.visible)continue;G._beginFrame();let _=Ie*dt/4;if(pe.set(G.transform,_),pe.set(G.prevTransform,_+16),F.normalMatrix12($e,G.transform),pe.set($e,_+32),pe[_+44]=(G.viewmodel?1:0)+(G.instances?4:0),pe[_+45]=G.id,we.set(G,Ie++),G.joints&&G.mesh.skinned&&this.updateSkin(G),G.instances&&(this.updateInstances(G),G.instanceCount===0)){Ie--,we.delete(G);continue}G.castShadow&&!G.viewmodel&&Z.push(G),G.viewmodel||qa(Y,G.worldBounds)?X.push(G):ne++}Ie&&i.queue.writeBuffer(this.objBuf,0,pe,0,Ie*dt/4),this.stats.objects=X.length,this.stats.culled=ne;let ke=0,Xe=0,At=G=>G._skin?this.skinBG(G):G._inst?this.instBG(G):this.staticObjectBG,ot=(G,_)=>{G.setBindGroup(1,At(_),[we.get(_)*dt]),G.setBindGroup(2,_.material.getBindGroup(this.dev,this.textures,this.materialLayout)),G.setVertexBuffer(0,_.mesh.vertexBuffer),_.mesh.skinBuffer&&_._skin&&G.setVertexBuffer(1,_.mesh.skinBuffer),G.setIndexBuffer(_.mesh.indexBuffer,"uint32");let te=_.instances?_.instanceCount:1;G.drawIndexed(_.mesh.indexCount,te),ke++,Xe+=_.mesh.indexCount/3*te};if(C){let G=new Float32Array(256);for(let te=0;te<C.viewProj.length;te++)G.set(C.viewProj[te],te*64);i.queue.writeBuffer(this.cascadeBuf,0,G);let _=i.createBindGroup({layout:this.shadowLayout,entries:[{binding:0,resource:{buffer:this.cascadeBuf,size:64}}]});for(let te=0;te<C.viewProj.length;te++){let se=v.beginRenderPass({label:`shadow ${te}`,colorAttachments:[],depthStencilAttachment:{view:this.shadowMap.createView({dimension:"2d",baseArrayLayer:te,arrayLayerCount:1}),depthLoadOp:"clear",depthStoreOp:"store",depthClearValue:1}});se.setBindGroup(0,_,[te*256]);let be=Ha(C.viewProj[te]);for(let ye of Z)ye.material.alphaMode!=="blend"&&qa(be,ye.worldBounds)&&(se.setPipeline(this.getPipelines(!!ye._skin,ye.material).shadow),ot(se,ye));se.end()}}let Ve=this.getFrameBG(b),ct=X.filter(G=>G.material.alphaMode!=="blend"),wr=X.filter(G=>G.material.alphaMode==="blend");ct.sort((G,_)=>Number(_.viewmodel)-Number(G.viewmodel)||G.material.id-_.material.id);let Mr=t.position;wr.sort((G,_)=>u.distance(F.getTranslation(u.create(),_.transform),Mr)-u.distance(F.getTranslation(u.create(),G.transform),Mr));{let G=v.beginRenderPass({label:"prepass",colorAttachments:[{view:b.normal.createView(),loadOp:"clear",storeOp:"store",clearValue:[0,1,0,1]},{view:b.velocity.createView(),loadOp:"clear",storeOp:"store",clearValue:[0,0,0,0]}],depthStencilAttachment:{view:b.depth.createView(),depthLoadOp:"clear",depthStoreOp:"store",depthClearValue:0}});G.setBindGroup(0,Ve);for(let _ of ct)G.setPipeline(this.getPipelines(!!_._skin,_.material).prepass),ot(G,_);G.end()}if(s.gtao.enabled){let G=s.gtao,_=new Float32Array(44);_.set(z,0),_.set(t.view,16),_.set([m,h,1/m,1/h],32),_.set([G.radius,G.falloff,G.power,this.frameIndex],36),_.set([k[0],k[5],G.steps,G.slices],40);let te=v.beginComputePass({label:"gtao"});te.setPipeline(this.gtaoPipe),te.setBindGroup(0,i.createBindGroup({layout:this.gtaoPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("gtao",_)}},{binding:1,resource:b.depth.createView()},{binding:2,resource:b.normal.createView()},{binding:3,resource:(G.blur?b.aoRaw:b.ao).createView()}]})),te.dispatchWorkgroups(Math.ceil(m/8),Math.ceil(h/8)),G.blur&&(te.setPipeline(this.aoBlurPipe),te.setBindGroup(0,i.createBindGroup({layout:this.aoBlurPipe.getBindGroupLayout(0),entries:[{binding:0,resource:b.aoRaw.createView()},{binding:1,resource:b.depth.createView()},{binding:2,resource:b.ao.createView()}]})),te.dispatchWorkgroups(Math.ceil(m/8),Math.ceil(h/8))),te.end()}this.decals.upload(),this.particles.update(a),this.particles.upload(t.position);{let G=v.beginRenderPass({label:"main",colorAttachments:[{view:b.hdr.createView(),loadOp:"clear",storeOp:"store",clearValue:[0,0,0,1]}],depthStencilAttachment:{view:b.depth.createView(),depthReadOnly:!0}});G.setBindGroup(0,Ve);for(let _ of ct)G.setPipeline(this.getPipelines(!!_._skin,_.material).main),ot(G,_);G.setPipeline(this.skyPipe),G.draw(3),this.decals.draw(G),G.setBindGroup(0,Ve);for(let _ of wr)G.setPipeline(this.getPipelines(!!_._skin,_.material).transparent),ot(G,_);this.particles.draw(G,b.depth),G.end()}let os=b.history[this.frameIndex&1],kr=b.history[this.frameIndex+1&1],Zt=b.hdr;if(s.taa.enabled){let G=new Float32Array(44);G.set(I,0),G.set(this.prevViewProj,16),G.set([m,h,1/m,1/h],32),G.set([s.taa.feedbackMin,s.taa.feedbackMax,s.taa.velocityWeight,this.historyValid?0:1],36),G.set([x*.5,-w*.5,0,0],40);let _=v.beginComputePass({label:"taa"});_.setPipeline(this.taaPipe),_.setBindGroup(0,i.createBindGroup({layout:this.taaPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("taa",G)}},{binding:1,resource:b.hdr.createView()},{binding:2,resource:os.createView()},{binding:3,resource:b.velocity.createView()},{binding:4,resource:b.depth.createView()},{binding:5,resource:this.linearClamp},{binding:6,resource:kr.createView()},{binding:7,resource:{buffer:this.exposureBuf}}]})),_.dispatchWorkgroups(Math.ceil(m/8),Math.ceil(h/8)),_.end(),Zt=kr}if(s.dof.enabled&&s.debugView===0){let G=s.dof,_=h/(2*Math.tan(t.fovY/2)),te=h/(2*Math.tan(t.viewmodelFovY/2)),se=new Float32Array([m,h,1/m,1/h,G.apertureMm/1e3,_,te,G.maxBlurPx*(h/1080),t.near,t.near*.25,s.viewmodelDepthSqueeze,1,G.focusDistance,G.autoFocus?1:0,G.overrideDistance,G.overrideWeight,Math.min(a,.1),G.focusSpeed,G.minFocus,1.6/Math.max(.25,G.quality)]),be=this.uniform("dof",se),ye=v.beginComputePass({label:"dof"});ye.setPipeline(this.dofFocusPipe),ye.setBindGroup(0,i.createBindGroup({layout:this.dofFocusPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:be}},{binding:1,resource:b.depth.createView()},{binding:2,resource:{buffer:this.dofState}}]})),ye.dispatchWorkgroups(1),ye.setPipeline(this.dofGatherPipe),ye.setBindGroup(0,i.createBindGroup({layout:this.dofGatherPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:be}},{binding:1,resource:Zt.createView()},{binding:2,resource:b.depth.createView()},{binding:3,resource:{buffer:this.dofState}},{binding:4,resource:b.dof.createView()}]})),ye.dispatchWorkgroups(Math.ceil(m/8),Math.ceil(h/8)),ye.end(),Zt=b.dof}{let G=s.motionBlur,_=G.shutterAngle/360,te=new Float32Array([m,h,1/m,1/h,_,G.maxPixels,G.samples,G.enabled?1:0]),se=v.beginComputePass({label:"motionblur"});se.setPipeline(this.mbPipe),se.setBindGroup(0,i.createBindGroup({layout:this.mbPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("mb",te)}},{binding:1,resource:Zt.createView()},{binding:2,resource:b.velocity.createView()},{binding:3,resource:b.depth.createView()},{binding:4,resource:this.linearClamp},{binding:5,resource:b.mb.createView()}]})),se.dispatchWorkgroups(Math.ceil(m/8),Math.ceil(h/8)),se.end()}let Et=b.mb;{let G=s.exposure,_=-10,te=40,se=G.ev100;G.mode==="camera"&&(se=Pr(t.aperture,t.shutter,t.iso));let be=v.beginComputePass({label:"exposure"});be.setPipeline(this.histPipe),be.setBindGroup(0,i.createBindGroup({layout:this.histPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("hist",new Float32Array([m,h,1/m,1/h,_,te,G.centerWeight,0]))}},{binding:1,resource:Et.createView()},{binding:2,resource:{buffer:this.histBuf}},{binding:3,resource:{buffer:this.exposureBuf}}]})),be.dispatchWorkgroups(Math.ceil(m/32),Math.ceil(h/32)),be.setPipeline(this.exposurePipe),be.setBindGroup(0,i.createBindGroup({layout:this.exposurePipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("expo",new Float32Array([G.mode==="auto"?0:1,se,G.compensation,Math.min(a,.1),G.minEv100,G.maxEv100,G.speedUp,G.speedDown,G.lowPercent,G.highPercent,_,te]))}},{binding:1,resource:{buffer:this.histBuf}},{binding:2,resource:{buffer:this.exposureBuf}}]})),be.dispatchWorkgroups(1),be.end()}let Pt=s.bloom;if(Pt.enabled&&b.bloomDown.length>1){let G=v.beginComputePass({label:"bloom"});G.setPipeline(this.bloomDownPipe);let _=Et;for(let se=0;se<b.bloomDown.length;se++){let be=b.bloomDown[se];G.setBindGroup(0,i.createBindGroup({layout:this.bloomDownPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform(`bd${se}`,new Float32Array([1/_.width,1/_.height,0,0,se===0?1:0,Pt.clamp,0,0]))}},{binding:1,resource:_.createView()},{binding:2,resource:this.linearClamp},{binding:3,resource:be.createView()}]})),G.dispatchWorkgroups(Math.ceil(be.width/8),Math.ceil(be.height/8)),_=be}G.setPipeline(this.bloomUpPipe);let te=b.bloomDown.length;for(let se=te-2;se>=0;se--){let be=se===te-2?b.bloomDown[te-1]:b.bloomUp[se+1],ye=b.bloomUp[se];G.setBindGroup(0,i.createBindGroup({layout:this.bloomUpPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform(`bu${se}`,new Float32Array([1/be.width,1/be.height,0,0,Pt.radius,0,0,0]))}},{binding:1,resource:be.createView()},{binding:2,resource:b.bloomDown[se].createView()},{binding:3,resource:this.linearClamp},{binding:4,resource:ye.createView()}]})),G.dispatchWorkgroups(Math.ceil(ye.width/8),Math.ceil(ye.height/8))}G.end()}if(s.debugView>0){let G=v.beginComputePass({label:"debug"});G.setPipeline(this.debugPipe),G.setBindGroup(0,i.createBindGroup({layout:this.debugPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("dbg",new Float32Array([s.debugView,t.near,m,h]))}},{binding:1,resource:b.normal.createView()},{binding:2,resource:b.ao.createView()},{binding:3,resource:b.velocity.createView()},{binding:4,resource:b.depth.createView()},{binding:5,resource:Et.createView()},{binding:6,resource:{buffer:this.exposureBuf}},{binding:7,resource:b.debug.createView()}]})),G.dispatchWorkgroups(Math.ceil(m/8),Math.ceil(h/8)),G.end()}{let G=s.lens,_=s.grade,te=s.sensor,se=te.isoCoupled?Math.pow(Math.max(t.iso,50)/100,.25):1,be=new Float32Array([d,l,1/d,1/l,G.distortion,G.distortion2,G.chromaticAberration,G.fillZoom,G.naturalVignette,G.vignette,G.vignetteRoundness,t.fovY,Pt.enabled?Pt.intensity:0,0,0,0,te.readNoise,te.shotNoise,te.enabled?se*te.gain:0,this.frameIndex%1024,_.contrast,_.saturation,_.temperature,_.tint,_.lift,_.gamma,_.gain,Os[_.tonemapper],G.sharpen,_.dither,s.debugView,_.exposureBias]),ye=Pt.enabled&&b.bloomUp.length>1?b.bloomUp[0]:Et,$t=v.beginRenderPass({label:"composite",colorAttachments:[{view:this.outputView(d,l),loadOp:"clear",storeOp:"store",clearValue:[0,0,0,1]}]});$t.setPipeline(this.compositePipe),$t.setBindGroup(0,i.createBindGroup({layout:this.compositePipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("composite",be)}},{binding:1,resource:Et.createView()},{binding:2,resource:ye.createView()},{binding:3,resource:this.linearClamp},{binding:5,resource:b.debug.createView()}]})),$t.draw(3),$t.end()}i.queue.submit([v.finish()]),F.copy(this.prevViewProj,S),F.copy(this.prevVmViewProj,j);for(let G of oe)G.visible&&G._endFrame();for(let G of this.skinnedObjects)this.rotateSkin(G);this.historyValid=!0,this.frameIndex++,this.stats.drawCalls=ke,this.stats.triangles=Xe,this.stats.frameMs=performance.now()-r}offscreenOut=null;outputView(e,t){return this.dev.offscreen?((!this.offscreenOut||this.offscreenOut.width!==e||this.offscreenOut.height!==t)&&(this.offscreenOut?.destroy(),this.offscreenOut=this.device.createTexture({size:[e,t],format:"rgba8unorm",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC,label:"offscreen.out"})),this.offscreenOut.createView()):this.dev.context.getCurrentTexture().createView()}async readback(){let e=this.offscreenOut;if(!e)throw new Error("readback requires Renderer.create(canvas, { offscreen: true })");let t=Math.ceil(e.width*4/256)*256,a=this.device.createBuffer({size:t*e.height,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),r=this.device.createCommandEncoder();r.copyTextureToBuffer({texture:e},{buffer:a,bytesPerRow:t},[e.width,e.height]),this.device.queue.submit([r.finish()]),await a.mapAsync(GPUMapMode.READ);let s=new Uint8Array(a.getMappedRange()),i=new Uint8Array(e.width*e.height*4);for(let o=0;o<e.height;o++)i.set(s.subarray(o*t,o*t+e.width*4),o*e.width*4);return a.unmap(),a.destroy(),{width:e.width,height:e.height,data:i}}resetHistory(){this.historyValid=!1}updateSkin(e){let t=e.joints,a=t.length/16;if(!e._skin||e._skin.count!==a){let r=Math.max(64,t.byteLength);e._skin?.cur.destroy(),e._skin?.prev.destroy();let s=this.dev.createBuffer(r,GPUBufferUsage.STORAGE,"joints"),i=this.dev.createBuffer(r,GPUBufferUsage.STORAGE,"joints.prev",t);e._skin={cur:s,prev:i,bg:null,count:a},this.skinnedObjects.add(e)}this.device.queue.writeBuffer(e._skin.cur,0,t)}updateInstances(e){let t=e.instances,a=Math.max(64,e.instanceCount*64);if(!e._inst||e._inst.cap<a){e._inst?.buf.destroy();let r=Math.max(a,(e._inst?.cap??0)*2);e._inst={buf:this.dev.createBuffer(r,GPUBufferUsage.STORAGE,"instances"),bg:null,cap:r},e.instancesDirty=!0}e.instancesDirty&&e.instanceCount>0&&(this.device.queue.writeBuffer(e._inst.buf,0,t,0,e.instanceCount*16),e.instancesDirty=!1)}instBG(e){let t=e._inst;return t.bg||(t.bg=this.makeObjectBG(t.buf,t.buf)),t.bg}skinBG(e){let t=e._skin;return t.bg||(t.bg=this.makeObjectBG(t.cur,t.prev)),t.bg}rotateSkin(e){!e._skin||!e.joints||this.device.queue.writeBuffer(e._skin.prev,0,e.joints)}};var Ns=1;function Tt(n){return{id:Ns++,name:n}}var fa=class{nextEntity=1;alive=new Set;stores=new Map;names=new Map;onDespawn=[];onRemove=new Map;spawn(e){let t=this.nextEntity++;return this.alive.add(t),e&&this.names.set(t,e),t}despawn(e){if(this.alive.has(e)){for(let t of this.onDespawn)t(e);for(let[t,a]of this.stores)if(a.has(e)){let r=a.get(e);a.delete(e);for(let s of this.onRemove.get(t)??[])s(e,r)}this.alive.delete(e),this.names.delete(e)}}isAlive(e){return this.alive.has(e)}nameOf(e){return this.names.get(e)??`entity#${e}`}get entityCount(){return this.alive.size}add(e,t,a){let r=this.stores.get(t.id);return r||(r=new Map,this.stores.set(t.id,r)),r.set(e,a),a}get(e,t){return this.stores.get(t.id)?.get(e)}require(e,t){let a=this.get(e,t);if(a===void 0)throw new Error(`${this.nameOf(e)} has no ${t.name}`);return a}has(e,t){return this.stores.get(t.id)?.has(e)??!1}remove(e,t){let a=this.stores.get(t.id);if(!a?.has(e))return;let r=a.get(e);a.delete(e);for(let s of this.onRemove.get(t.id)??[])s(e,r)}onRemoved(e,t){let a=this.onRemove.get(e.id)??[];a.push(t),this.onRemove.set(e.id,a)}*query(...e){let t=e.map(r=>this.stores.get(r.id));if(t.some(r=>!r))return;let a=0;for(let r=1;r<t.length;r++)t[r].size<t[a].size&&(a=r);for(let r of[...t[a].keys()]){let s=[r],i=!0;for(let o of t){if(!o.has(r)){i=!1;break}s.push(o.get(r))}i&&(yield s)}}entities(){return this.alive.values()}};var pa=class{position=u.create();rotation=D.create();scale=u.create(1,1,1);parent=null;local=F.create();world=F.create();version=0;worldVersion=-1;parentVersion=-1;constructor(e,t,a){e&&u.copy(this.position,e),t&&D.copy(this.rotation,t),a&&u.copy(this.scale,a)}touch(){this.version++}setPosition(e,t,a){return u.set(this.position,e,t,a),this.version++,this}setRotation(e){return D.copy(this.rotation,e),this.version++,this}setEuler(e,t,a=0){return D.fromEuler(this.rotation,e,t,a),this.version++,this}get stamp(){return this.version+(this.parent?this.parent.stamp*31:0)}getWorld(){let e=this.parent?this.parent.stamp:0;return(this.worldVersion!==this.version||this.parentVersion!==e)&&(F.fromRotationTranslationScale(this.local,this.rotation,this.position,this.scale),this.parent?F.multiply(this.world,this.parent.getWorld(),this.local):F.copy(this.world,this.local),this.worldVersion=this.version,this.parentVersion=e),this.world}worldPosition(e=u.create()){return F.getTranslation(e,this.getWorld())}worldRotation(e=D.create()){return F.getRotation(e,this.getWorld())}forward(e=u.create()){let t=this.getWorld();return u.normalize(e,u.set(e,-t[8],-t[9],-t[10]))}right(e=u.create()){let t=this.getWorld();return u.normalize(e,u.set(e,t[0],t[1],t[2]))}up(e=u.create()){let t=this.getWorld();return u.normalize(e,u.set(e,t[4],t[5],t[6]))}transformPoint(e,t=u.create()){return u.transformMat4(t,e,this.getWorld())}},Ct=Tt("Transform");var Bt=Tt("Scripts");var ga=class{down=new Set;pressed=new Set;released=new Set;mouseDown=new Set;mousePressed=new Set;mouseReleased=new Set;padPrev=[];mouseDX=0;mouseDY=0;wheel=0;sensitivity=.075;invertY=!1;bindings=new Map;locked=!1;gamepad=null;padLookSpeed=160;deadzone=.12;target;constructor(e){this.target=e,addEventListener("keydown",t=>{t.repeat||(this.down.add(t.code),this.pressed.add(t.code),this.locked&&["Tab","Space","KeyF","Backquote"].includes(t.code)&&t.preventDefault())}),addEventListener("keyup",t=>{this.down.delete(t.code),this.released.add(t.code)}),addEventListener("blur",()=>{this.down.clear(),this.mouseDown.clear()}),e.addEventListener("mousedown",t=>{this.mouseDown.add(t.button),this.mousePressed.add(t.button)}),addEventListener("mouseup",t=>{this.mouseDown.delete(t.button),this.mouseReleased.add(t.button)}),addEventListener("mousemove",t=>{this.locked&&(this.mouseDX+=t.movementX,this.mouseDY+=t.movementY)}),addEventListener("wheel",t=>{this.wheel+=Math.sign(t.deltaY)},{passive:!0}),e.addEventListener("contextmenu",t=>t.preventDefault()),document.addEventListener("pointerlockchange",()=>{this.locked=document.pointerLockElement===this.target}),this.defaultBindings()}async lock(){try{await this.target.requestPointerLock.call(this.target,{unadjustedMovement:!0})}catch{try{await this.target.requestPointerLock()}catch{}}}unlock(){document.exitPointerLock()}defaultBindings(){let e=(t,a)=>this.bindings.set(t,a);e("forward",{keys:["KeyW"]}),e("back",{keys:["KeyS"]}),e("left",{keys:["KeyA"]}),e("right",{keys:["KeyD"]}),e("sprint",{keys:["ShiftLeft"],gamepadButtons:[10]}),e("crouch",{keys:["KeyC","ControlLeft"],gamepadButtons:[1]}),e("jump",{keys:["Space"],gamepadButtons:[0]}),e("fire",{mouse:[0],gamepadButtons:[7]}),e("aim",{mouse:[2],gamepadButtons:[6]}),e("reload",{keys:["KeyR"],gamepadButtons:[2]}),e("fireMode",{keys:["KeyX"],gamepadButtons:[12]}),e("leanLeft",{keys:["KeyQ"],gamepadButtons:[4]}),e("leanRight",{keys:["KeyE"],gamepadButtons:[5]}),e("earpro",{keys:["KeyV"]}),e("camera",{keys:["KeyH"]}),e("tuning",{keys:["F1","Backquote"]}),e("holdBreath",{keys:["AltLeft"],gamepadButtons:[11]})}padButton(e){return!!this.gamepad?.buttons[e]?.pressed}action(e){let t=this.bindings.get(e);return t?(t.keys?.some(a=>this.down.has(a))??!1)||(t.mouse?.some(a=>this.mouseDown.has(a))??!1)||(t.gamepadButtons?.some(a=>this.padButton(a))??!1):!1}actionPressed(e){let t=this.bindings.get(e);return t?(t.keys?.some(a=>this.pressed.has(a))??!1)||(t.mouse?.some(a=>this.mousePressed.has(a))??!1)||(t.gamepadButtons?.some(a=>this.padButton(a)&&!this.padPrev[a])??!1):!1}actionReleased(e){let t=this.bindings.get(e);return t?(t.keys?.some(a=>this.released.has(a))??!1)||(t.mouse?.some(a=>this.mouseReleased.has(a))??!1):!1}key(e){return this.down.has(e)}keyPressed(e){return this.pressed.has(e)}moveAxis(){let e=(this.action("right")?1:0)-(this.action("left")?1:0),t=(this.action("forward")?1:0)-(this.action("back")?1:0);if(this.gamepad){let r=this.gamepad.axes[0]??0,s=this.gamepad.axes[1]??0;Math.hypot(r,s)>this.deadzone&&(e+=r,t-=s)}let a=Math.hypot(e,t);return a>1&&(e/=a,t/=a),{x:e,y:t}}lookDelta(e){let t=this.sensitivity*Math.PI/180,a=-this.mouseDX*t,r=-this.mouseDY*t*(this.invertY?-1:1);if(this.gamepad){let s=this.gamepad.axes[2]??0,i=this.gamepad.axes[3]??0,o=this.padLookSpeed*Math.PI/180*e;Math.abs(s)>this.deadzone&&(a-=Math.sign(s)*(Math.abs(s)-this.deadzone)/(1-this.deadzone)*o),Math.abs(i)>this.deadzone&&(r-=Math.sign(i)*(Math.abs(i)-this.deadzone)/(1-this.deadzone)*o)}return{yaw:a,pitch:r}}rumble(e,t,a){this.gamepad?.vibrationActuator?.playEffect?.("dual-rumble",{duration:a,strongMagnitude:Math.min(1,e),weakMagnitude:Math.min(1,t)})}poll(){let e=navigator.getGamepads?.()??[];this.gamepad=e.find(t=>t&&t.connected)??null}endFrame(){this.pressed.clear(),this.released.clear(),this.mousePressed.clear(),this.mouseReleased.clear(),this.mouseDX=0,this.mouseDY=0,this.wheel=0,this.gamepad&&(this.padPrev=this.gamepad.buttons.map(e=>e.pressed))}};var rt={gl:"fondaineGL",vorp:"vorp",oaxis:"oAxis"},ya=class n{hub;storageKey;module;constructor(e="fondaine.tuning",t=rt.gl,a){this.storageKey=e,this.module=t,this.hub=a??{params:[],listeners:[]}}get params(){return this.hub.params}scope(e){return new n(this.storageKey,e,this.hub)}get modules(){return[...new Set(this.hub.params.map(e=>e.module))]}k(e,t){return`${this.module}:${e}.${t}`}number(e,t,a,r){return this.hub.params.push({module:this.module,group:e,key:this.k(e,a),label:r.label??a,kind:"number",min:r.min,max:r.max,step:r.step??(r.max-r.min)/200,unit:r.unit,help:r.help,get:()=>t[a],set:s=>{t[a]=Number(s),r.onChange?.(Number(s)),this.emit()}}),this}bool(e,t,a,r={}){return this.hub.params.push({module:this.module,group:e,key:this.k(e,a),label:r.label??a,kind:"bool",help:r.help,get:()=>t[a],set:s=>{t[a]=!!s,r.onChange?.(!!s),this.emit()}}),this}choice(e,t,a,r,s={}){return this.hub.params.push({module:this.module,group:e,key:this.k(e,a),label:s.label??a,kind:"enum",options:r,help:s.help,get:()=>t[a],set:i=>{t[a]=String(i),s.onChange?.(String(i)),this.emit()}}),this}arrayValue(e,t,a,r){return this.hub.params.push({module:this.module,group:e,key:this.k(e,r.key),label:r.label,kind:"number",min:r.min,max:r.max,step:r.step??(r.max-r.min)/200,unit:r.unit,help:r.help,get:()=>t[a],set:s=>{t[a]=Number(s),r.onChange?.(),this.emit()}}),this}groups(e=this.module){return[...new Set(this.hub.params.filter(t=>t.module===e).map(t=>t.group))]}unregister(e,t=this.module){for(let a=this.hub.params.length-1;a>=0;a--)this.hub.params[a].module===t&&this.hub.params[a].group===e&&this.hub.params.splice(a,1)}onChange(e){this.hub.listeners.push(e)}emit(){for(let e of this.hub.listeners)e()}snapshot(e=this.module){let t={};for(let a of this.hub.params)(e==="*"||a.module===e)&&(t[a.key]=a.get());return t}apply(e){for(let t of this.hub.params)t.key in e&&t.set(e[t.key])}save(e="default",t=this.module){try{localStorage.setItem(`${this.storageKey}.${t}.${e}`,JSON.stringify(this.snapshot(t)))}catch{}}load(e="default",t=this.module){try{let a=localStorage.getItem(`${this.storageKey}.${t}.${e}`);return a?(this.apply(JSON.parse(a)),!0):!1}catch{return!1}}exportJSON(e=this.module){return JSON.stringify(this.snapshot(e),null,2)}};var Us=`
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
`,va=class{constructor(e,t="fondaine"){this.tuning=e;if(!document.getElementById("fdui-css")){let s=document.createElement("style");s.id="fdui-css",s.textContent=Us,document.head.appendChild(s)}this.root=document.createElement("div"),this.root.className="fdui",this.root.style.display="none",this.root.innerHTML=`<header><span class="logo">/f</span><b>${t}</b><span style="margin-left:auto;color:#6f747d">F1 to close</span></header>`,this.statsEl=document.createElement("div"),this.statsEl.className="stats",this.mods=document.createElement("div"),this.mods.className="mods",this.tabs=document.createElement("div"),this.tabs.className="tabs",this.body=document.createElement("div"),this.body.className="body";let a=document.createElement("footer"),r=(s,i)=>{let o=document.createElement("button");o.textContent=s,o.onclick=i,a.appendChild(o)};r("Save",()=>e.save("default",this.module)),r("Load",()=>{e.load("default",this.module),this.refresh()}),r("Export JSON",()=>{let s=new Blob([e.exportJSON(this.module)],{type:"application/json"}),i=document.createElement("a");i.href=URL.createObjectURL(s),i.download=`${this.module}-tuning.json`,i.click()}),r("Import JSON",()=>{let s=document.createElement("input");s.type="file",s.accept=".json",s.onchange=async()=>{let i=s.files?.[0];i&&(e.apply(JSON.parse(await i.text())),this.refresh())},s.click()}),this.root.append(this.statsEl,this.mods,this.tabs,this.body,a),document.body.appendChild(this.root);for(let s of["keydown","mousedown","wheel"])this.root.addEventListener(s,i=>i.stopPropagation())}root;body;statsEl;tabs;mods;module="";group="";inputs=new Map;visible=!1;statsText=()=>"";toggle(e=!this.visible){this.visible=e,this.root.style.display=e?"flex":"none",e&&this.rebuild()}rebuild(){let e=this.tuning.modules;(!this.module||!e.includes(this.module))&&(this.module=e[0]??""),this.mods.innerHTML="";for(let a of e){let r=document.createElement("button");r.textContent=a,a===this.module&&(r.className="on"),r.onclick=()=>{this.module=a,this.group="",this.rebuild()},this.mods.appendChild(r)}let t=this.tuning.groups(this.module);(!this.group||!t.includes(this.group))&&(this.group=t[0]??""),this.tabs.innerHTML="";for(let a of t){let r=document.createElement("button");r.textContent=a,a===this.group&&(r.className="on"),r.onclick=()=>{this.group=a,this.rebuild()},this.tabs.appendChild(r)}this.body.innerHTML="",this.inputs.clear();for(let a of this.tuning.params.filter(r=>r.module===this.module&&r.group===this.group))this.body.appendChild(this.row(a))}row(e){let t=document.createElement("div");t.className="row";let a=document.createElement("label");if(a.textContent=e.unit?`${e.label} (${e.unit})`:e.label,a.title=e.help??e.key,t.appendChild(a),e.kind==="number"){let r=document.createElement("input");r.type="range",r.min=String(e.min),r.max=String(e.max),r.step=String(e.step??.01);let s=document.createElement("input");s.type="number",s.step=String(e.step??.01);let i=()=>{let o=Number(e.get());r.value=String(o),s.value=String(+o.toPrecision(5))};r.oninput=()=>{e.set(Number(r.value)),s.value=String(+Number(r.value).toPrecision(5))},s.onchange=()=>{e.set(Number(s.value)),r.value=s.value},i(),this.inputs.set(e.key,i),t.append(r,s)}else if(e.kind==="bool"){let r=document.createElement("input");r.type="checkbox",r.checked=!!e.get(),r.onchange=()=>e.set(r.checked),this.inputs.set(e.key,()=>{r.checked=!!e.get()}),t.append(r,document.createElement("span"))}else{let r=document.createElement("select");for(let s of e.options??[]){let i=document.createElement("option");i.value=s,i.textContent=s,r.appendChild(i)}r.value=String(e.get()),r.onchange=()=>e.set(r.value),this.inputs.set(e.key,()=>{r.value=String(e.get())}),t.append(r,document.createElement("span"))}if(e.help){let r=document.createElement("div");r.className="help",r.textContent=e.help,t.appendChild(r)}return t}refresh(){for(let e of this.inputs.values())e()}update(){this.visible&&(this.statsEl.textContent=this.statsText())}};var tr=class{constructor(e,t,a,r){this.p=e;this.id=t;this.radius=a;this.height=r}setPosition(e,t,a){this.p.ex.fp_character_set_position(this.id,e,t,a)}move(e,t,a){let r=this.p.ex.fp_character_move(this.id,e,t,a),s=this.p.result(8);return{position:u.create(s[0],s[1],s[2]),grounded:(r&1)!==0,ceiling:(r&2)!==0,wall:(r&4)!==0,groundNormal:u.create(s[3],s[4],s[5]),groundMaterial:s[6]}}setHeight(e){let t=this.p.ex.fp_character_set_height(this.id,e)===1;return t&&(this.height=e),t}remove(){this.p.ex.fp_character_remove(this.id)}},ar=class{constructor(e,t){this.p=e;this.id=t}setTransform(e,t=[0,0,0,1]){this.p.ex.fp_body_set_transform(this.id,e[0],e[1],e[2],t[0],t[1],t[2],t[3])}setVelocity(e,t=[0,0,0]){this.p.ex.fp_body_set_velocity(this.id,e[0],e[1],e[2],t[0],t[1],t[2])}applyImpulse(e,t){this.p.ex.fp_body_apply_impulse(this.id,e[0],e[1],e[2],t[0],t[1],t[2])}remove(){this.p.ex.fp_body_remove(this.id)}state(){return this.p.bodyState(this.id)}get alive(){return this.state()[0]>.5}},xa=class n{ex;stride=15;onProjectileHit=[];onContact=[];constructor(e){this.ex=e,this.stride=e.fp_body_stride?.()??15}static async load(e){let t=await(await fetch(e)).arrayBuffer();return n.fromBytes(t)}static async fromBytes(e){let t=await WebAssembly.compile(e),a={};for(let s of WebAssembly.Module.imports(t))a[s.module]??={},a[s.module][s.name]=s.kind==="function"?()=>0:void 0;let r=await WebAssembly.instantiate(t,a);return new n(r.exports)}f32(e,t){return new Float32Array(this.ex.memory.buffer,e,t)}result(e){return this.f32(this.ex.fp_result_ptr(),e)}withF32(e,t){let a=e.length*4,r=this.ex.fp_alloc(a);this.f32(r,e.length).set(e);try{return t(r)}finally{this.ex.fp_free(r,a)}}setMaterial(e,t){this.ex.fp_set_material(e,t.friction??.6,t.restitution??.2,t.ricochetAngleDeg??0,t.ricochetEnergyKeep??.3)}reset(){this.ex.fp_world_reset()}staticMeshes=[];addStaticMesh(e,t,a){this.staticMeshes.push({positions:Float32Array.from(e),indices:Uint32Array.from(t),material:a});let r=e.length/3,s=t.length,i=r*12,o=s*4,c=this.ex.fp_alloc(i),d=this.ex.fp_alloc(o);this.f32(c,e.length).set(e),new Uint32Array(this.ex.memory.buffer,d,s).set(t);let l=this.ex.fp_add_static_mesh(c,r,d,s,a);return this.ex.fp_free(c,i),this.ex.fp_free(d,o),l}addGeometry(e,t,a){let r=e.positions,s=new Float32Array(r.length),i=u.create();for(let o=0;o<r.length;o+=3)u.transformMat4(i,r.subarray(o,o+3),t),s.set(i,o);return this.addStaticMesh(s,e.indices,a)}build(){this.ex.fp_build()}raycast(e,t,a,r=!0){if(!this.ex.fp_raycast(e[0],e[1],e[2],t[0],t[1],t[2],a,r?1:0))return null;let i=this.result(10);return{t:i[0],point:u.create(i[1],i[2],i[3]),normal:u.create(i[4],i[5],i[6]),material:i[7],triangle:i[8],body:i[9]}}raycastBatch(e,t){let a=e.length/6,r=this.ex.fp_alloc(a*4),s=this.withF32(e,i=>(this.ex.fp_raycast_batch(i,a,t,r),this.f32(r,a).slice()));return this.ex.fp_free(r,a*4),s}bakeSkyVisibility(e,t,a,r,s,i=48,o=60){let c=a*r*s,d=this.ex.fp_alloc(c*4);this.ex.fp_bake_sky_visibility(e[0],e[1],e[2],t,a,r,s,i,o,d);let l=this.f32(d,c).slice();return this.ex.fp_free(d,c*4),l}bakeGI(e){let t=e.nx*e.ny*e.nz,a=t*12*4,r=108,s=Math.max(4,e.albedo.length*4),i=this.ex.fp_alloc(a),o=this.ex.fp_alloc(r),c=this.ex.fp_alloc(s);this.f32(o,27).set(Array.from(e.skySH).slice(0,27)),this.f32(c,e.albedo.length).set(e.albedo);let d=this.ex.fp_bake_gi(e.min[0],e.min[1],e.min[2],e.cell,e.nx,e.ny,e.nz,e.rays??192,e.passes??3,e.sunDir[0],e.sunDir[1],e.sunDir[2],e.sunRGB[0],e.sunRGB[1],e.sunRGB[2],o,c,Math.floor(e.albedo.length/3),e.maxDist??400,i),l=this.f32(i,t*12).slice();return this.ex.fp_free(i,a),this.ex.fp_free(o,r),this.ex.fp_free(c,s),{data:l,filled:d}}giPositions(e,t,a,r,s){let i=e.nx*e.ny*e.nz,o=this.ex.fp_alloc(i*12),c=this.ex.fp_alloc(Math.max(4,i));this.ex.fp_gi_positions(e.min[0],e.min[1],e.min[2],e.cell,e.nx,e.ny,e.nz,e.rays,t,a,o,c);let d=t*e.nx*e.ny,l=Math.min(e.nz,a)*e.nx*e.ny;r.set(this.f32(o+d*12,(l-d)*3),d*3),s.set(new Uint8Array(this.ex.memory.buffer,c+d,l-d),d),this.ex.fp_free(o,i*12),this.ex.fp_free(c,Math.max(4,i))}giPass(e,t,a,r,s,i,o,c){let d=e.nx*e.ny*e.nz,l={pos:d*12,valid:Math.max(4,d),prev:d*48,out:d*48,sh:108,al:Math.max(4,e.albedo.length*4)},m=this.ex.fp_alloc(l.pos),h=this.ex.fp_alloc(l.valid),b=this.ex.fp_alloc(l.out),v=this.ex.fp_alloc(l.sh),p=this.ex.fp_alloc(l.al),M=s?this.ex.fp_alloc(l.prev):0;this.f32(m,d*3).set(a),new Uint8Array(this.ex.memory.buffer,h,d).set(r),s&&this.f32(M,d*12).set(s),this.f32(v,27).set(Array.from(e.skySH).slice(0,27)),this.f32(p,e.albedo.length).set(e.albedo),this.ex.fp_gi_pass(e.min[0],e.min[1],e.min[2],e.cell,e.nx,e.ny,e.nz,e.rays,t,e.sunDir[0],e.sunDir[1],e.sunDir[2],e.sunRGB[0],e.sunRGB[1],e.sunRGB[2],v,p,Math.floor(e.albedo.length/3),e.maxDist??400,m,h,M,i,o,b);let y=i*e.nx*e.ny,x=Math.min(e.nz,o)*e.nx*e.ny;c.set(this.f32(b+y*48,(x-y)*12),y*12),this.ex.fp_free(m,l.pos),this.ex.fp_free(h,l.valid),this.ex.fp_free(b,l.out),this.ex.fp_free(v,l.sh),this.ex.fp_free(p,l.al),s&&this.ex.fp_free(M,l.prev)}createCharacter(e,t,a=.35,r=50){return new tr(this,this.ex.fp_character_create(e,t,a,r),e,t)}createBody(e,t,a,r){return new ar(this,this.ex.fp_body_create(e,t[0],t[1],t[2],a,r))}bodyState(e){let t=this.ex.fp_bodies_ptr();return this.f32(t+e*this.stride*4,this.stride)}setGravity(e,t,a){this.ex.fp_set_gravity(e,t,a)}setAtmosphere(e,t,a,r){this.ex.fp_set_atmosphere(e,t,a,r[0],r[1],r[2])}spawnProjectile(e,t,a){return this.ex.fp_projectile_spawn(e[0],e[1],e[2],t[0],t[1],t[2],a.bcG7,a.massKg,a.diameterM,a.maxTime??6,a.userId??0)}projectiles(){let e=this.ex.fp_projectile_count();if(!e)return[];let t=this.f32(this.ex.fp_projectiles_ptr(),e*8),a=[];for(let r=0;r<e;r++){let s=r*8;a.push({id:t[s],userId:t[s+1],position:u.create(t[s+2],t[s+3],t[s+4]),velocity:u.create(t[s+5],t[s+6],t[s+7])})}return a}step(e){this.ex.fp_step(e);let t=this.ex.fp_projectile_hit_count();if(t&&this.onProjectileHit.length){let r=this.f32(this.ex.fp_projectile_hits_ptr(),t*16).slice();for(let s=0;s<t;s++){let i=s*16,o={userId:r[i],point:u.create(r[i+1],r[i+2],r[i+3]),normal:u.create(r[i+4],r[i+5],r[i+6]),velocity:u.create(r[i+7],r[i+8],r[i+9]),material:r[i+10],distance:r[i+11],timeOfFlight:r[i+12],body:r[i+13],ricochet:r[i+14]>.5,projectileId:r[i+15]};for(let c of this.onProjectileHit)c(o)}}let a=this.ex.fp_contact_count();if(a&&this.onContact.length){let r=this.f32(this.ex.fp_contacts_ptr(),a*10).slice();for(let s=0;s<a;s++){let i=s*10,o={body:r[i],point:u.create(r[i+1],r[i+2],r[i+3]),normal:u.create(r[i+4],r[i+5],r[i+6]),impulse:r[i+7],speed:r[i+8],otherMaterial:r[i+9]};for(let c of this.onContact)c(o)}}}};var W=(n,e,t,a,r,s="",i="",o)=>({key:n,label:e,def:t,min:a,max:r,unit:s,help:i,step:o}),en=[W("peakSpl","Peak SPL @1 m",158,120,180,"dB","Muzzle-blast peak sound pressure level 1 m from the muzzle, on axis. Rifles \u2248 155\u2013165, pistols \u2248 150\u2013160."),W("positiveMs","Positive phase",1,.1,5,"ms","Friedlander positive-phase duration at 1 m. Longer = bigger charge / longer barrel gas release.",.01),W("decayB","Blast decay (b)",1.4,.3,5,"","Friedlander waveform decay constant. Higher = sharper, smaller negative phase.",.01),W("precursorDb","Precursor",-14,-60,0,"dB","Level of the precursor shock (air column ahead of the bullet) relative to the main blast."),W("precursorLeadMs","Precursor lead",.35,0,2,"ms","How far the precursor leads the main blast.",.01),W("turbDb","Gas plume roar",-5,-60,0,"dB","Turbulent propellant-gas noise relative to the blast peak."),W("turbMs","Roar decay (T60)",140,2,400,"ms","Time for the gas roar to fall 60 dB."),W("turbHp","Roar highpass",180,20,2e3,"Hz"),W("turbLp","Roar lowpass",4500,500,16e3,"Hz"),W("bodyDb","Body (perceived boom)",-6,-60,0,"dB",'Low-frequency chest/room "boom". \u221260 for a purely measured (thin) signature.'),W("bodyHz","Body frequency",62,20,400,"Hz"),W("bodyMs","Body decay (T60)",160,5,1e3,"ms"),W("bodyDrop","Body pitch drop",.35,0,2,"","Initial pitch overshoot that glides down to the body frequency.",.01),W("suppress","Suppressor",0,0,1,"","Suppressor amount (0 none \u2026 1 full can).",.01),W("suppRedDb","Suppressor reduction",28,0,45,"dB","Peak reduction a full suppressor provides (good cans: 25\u201335 dB)."),W("firstPopDb","First-round pop",0,0,10,"dB","Extra level on the first suppressed shot (oxygen in the can). Set by the weapon at runtime."),W("variation","Shot-to-shot variation",.5,0,1,"","Random variation of level, duration and spectrum per shot.",.01),W("seed","Seed",0,0,1e5,"","Randomised per shot by the host.",1),W("brightHz","Brightness",16e3,1e3,2e4,"Hz","Final band-limit (anti-alias / mic bandwidth)."),W("directivityDb","Directivity (front\u2212rear)",9,0,20,"dB","How much louder the blast is in front of the muzzle than behind it."),W("rearLpHz","Rear darkening",4500,200,2e4,"Hz","Lowpass applied towards the rear of the muzzle (shooter\u2019s own ears are rear-ish)."),W("tailSendDb","Environment send",0,-40,12,"dB","Adjusts how much this weapon excites reflections / reverb."),W("crackDb","Report (snap)",-4,-90,6,"dB","Sharp band-limited report burst that gives each gun its character (relative to the blast peak)."),W("crackHz","Report pitch",2600,300,9e3,"Hz","Pistols \u2248 1.5\u20132 kHz (pop), 5.56 \u2248 3\u20133.5 kHz (crack), big rifles \u2248 2 kHz."),W("crackMs","Report decay (T60)",18,1,200,"ms"),W("subDb","Sub thump",-9,-90,6,"dB","Sub-bass pressure pulse you feel in your chest (relative to the blast peak)."),W("subHz","Sub frequency",40,15,150,"Hz"),W("subMs","Sub decay (T60)",150,5,1e3,"ms"),W("driveDb","Spike compaction",10,0,30,"dB","Soft-clips the instantaneous blast spike this far below its peak so the 50\u2013300 ms body carries the loudness (how a shot feels, not how a microphone peaks).")],tn=[W("levelSpl","Peak SPL @1 m",120,60,170,"dB"),W("attackMs","Attack",.5,.01,50,"ms","",.01),W("decayMs","Decay (T60)",120,1,3e3,"ms"),W("hpHz","Highpass",200,20,8e3,"Hz"),W("lpHz","Lowpass",5e3,200,2e4,"Hz"),W("thumpHz","Thump frequency",90,20,400,"Hz"),W("thumpDb","Thump level",-6,-60,12,"dB"),W("thumpMs","Thump decay",60,2,1e3,"ms"),W("grainsPerS","Grain density",0,0,3e3,"/s","Granular crackle (gravel, dry grass, debris)."),W("grainDb","Grain level",-10,-60,6,"dB"),W("seed","Seed",0,0,1e5,"","",1),W("resonance","Filter Q",.7,.3,8,"","",.01)],Dt=[W("protection","Hearing protection",0,0,2,"","0 none, 1 passive earmuffs, 2 electronic earmuffs",1),W("passiveAttenDb","Passive attenuation",25,0,40,"dB","Real-world muff/plug attenuation (\u2248 NRR \u2212 7)."),W("passiveHfExtraDb","Extra HF attenuation",10,0,30,"dB"),W("elecGainDb","Electronic gain",6,0,24,"dB","Ambient amplification of electronic muffs."),W("elecLimitSpl","Electronic limit",82,70,95,"dB SPL","Output limit of electronic muffs (most cut at ~82 dB)."),W("ttsThresholdSpl","Damage threshold (peak)",130,110,150,"dB SPL","Impulses above this cause a temporary threshold shift."),W("ttsRate","TTS rate",.15,0,2,"dB/dB","dB of threshold shift per dB above threshold per impulse.",.01),W("ttsMaxDb","Max TTS",18,0,60,"dB"),W("ttsRecoveryS","Recovery time constant",25,.5,600,"s","Real-world recovery takes hours; games use 10\u201360 s."),W("tinnitusHz","Tinnitus frequency",4200,1e3,12e3,"Hz"),W("tinnitusDb","Tinnitus level",-80,-80,-6,"dBFS","Ear ringing after loud exposure. \u221280 = off (default). \u2248 \u221240 is a realistic ring."),W("tinnitusTtsDb","Tinnitus full at TTS",12,1,40,"dB"),W("reflexThresholdSpl","Acoustic reflex threshold",95,70,120,"dB SPL"),W("reflexMaxDb","Reflex max attenuation",5,0,30,"dB"),W("reflexAttackMs","Reflex latency",90,5,300,"ms"),W("reflexReleaseMs","Reflex release",600,50,5e3,"ms"),W("muffle","Muffling amount",.6,0,2,"","How strongly TTS dulls and quiets hearing.",.01),W("enable","Hearing model",1,0,1,"","",1)],Vt=[W("calibrationSpl","Calibration (SPL @ 0 dBFS)",100,70,140,"dB SPL","Acoustic level that maps to digital full scale before dynamics. Lower = everything louder."),W("compThresholdDb","Loudness threshold",-20,-60,0,"dBFS"),W("compRatio","Loudness ratio",3.2,1,20,":1","Perceptual compression of the 110+ dB real-world range into a playable range.",.1),W("compKneeDb","Knee",8,0,24,"dB"),W("compAttackMs","Attack",5,.1,100,"ms","",.1),W("compReleaseMs","Release",180,10,3e3,"ms","How long the world stays ducked after a shot."),W("limitCeilingDb","Limiter ceiling",-.5,-12,0,"dBFS","",.1),W("limitReleaseMs","Limiter release",30,1,500,"ms"),W("masterDb","Master volume",0,-60,12,"dB"),W("busWeaponsDb","Weapons bus",0,-60,12,"dB"),W("busImpactsDb","Impacts bus",0,-60,12,"dB"),W("busEnvDb","Environment bus",0,-60,12,"dB"),W("busUiDb","UI bus",0,-60,12,"dB"),W("erLevelDb","Early reflections",0,-40,12,"dB"),W("reverbLevelDb","Late reverb",0,-40,12,"dB"),W("convMix","Convolution mix",0,0,1,"","0 = algorithmic FDN, 1 = convolution IR",.01),W("headRadiusM","Head radius",.0875,.06,.12,"m","",5e-4),W("spatialEnable","Binaural",1,0,1,"","",1),W("compDetectorMs","Loudness integration",15,0,100,"ms","RMS window of the loudness detector (0 = peak)."),W("clipKneeDb","Saturation knee",-5,-24,-.1,"dBFS","Above this, the output saturates smoothly towards full scale: density instead of a 1 ms tick under a limiter.",.1),W("makeupDb","Make-up gain",0,-12,24,"dB","Overall loudness after the perceptual compressor. Raise for an even louder mix.")],Ht=[W("rt60Low","RT60 low",1.2,.05,12,"s","",.01),W("rt60Mid","RT60 mid",1,.05,12,"s","",.01),W("rt60High","RT60 high",.5,.05,12,"s","",.01),W("xoverLow","Low crossover",250,50,1e3,"Hz"),W("xoverHigh","High crossover",4e3,1e3,12e3,"Hz"),W("size","Size",1,.1,8,"","Delay scale \u2248 room dimensions.",.01),W("diffusion","Diffusion",.7,0,1,"","",.01),W("predelayMs","Predelay",12,0,240,"ms"),W("modDepthMs","Modulation depth",.35,0,3,"ms","",.01),W("modRateHz","Modulation rate",.6,.05,5,"Hz","",.01),W("levelDb","Level",0,-40,12,"dB"),W("toneHz","Tone",9e3,1e3,2e4,"Hz")],qt=[W("windSpl","Wind level",48,0,90,"dB SPL"),W("windGust","Gustiness",.5,0,1,"","",.01),W("windGustRate","Gust rate",.15,.01,2,"Hz","",.01),W("windToneHz","Wind tone",600,100,3e3,"Hz"),W("rumbleSpl","Distant rumble",38,0,80,"dB SPL"),W("enable","Ambience",1,0,1,"","",1)],le={LISTENER:1,SPAWN:2,VOICE_POS:3,VOICE_TAPS:4,VOICE_OCCLUSION:5,VOICE_STOP:6,ATMOSPHERE:7,REVERB:8,HEARING:9,MASTER:10,AMBIENCE:11,VOICE_SEND:12,RESET_HEARING:13},Rt={GUNSHOT:1,NWAVE:2,MODAL:3,NOISE:4,SAMPLE:5},ve={VOICE_ID:0,KIND:1,BUS:2,PX:3,DX:6,DIRECTIVITY_DB:9,REAR_LP_HZ:10,DISTANCE_MODE:11,MIN_DIST:12,REVERB_SEND_DB:13,SPATIAL:14,DELAY_MS:15,HEADER:16},ut={WEAPONS:0,IMPACTS:1,ENV:2,UI:3},Oe={PEAK_L:0,PEAK_R:1,SCENE_SPL:2,TTS:3,COMP_GR:4,LIMIT_GR:5,VOICES:6,REFLEX_GR:7,TINNITUS:8,EAR_SPL:9,SPEED_OF_SOUND:10,TIME:11,MAX_EAR_SPL:12};function gt(n,e={}){let t=new Float32Array(n.length);return n.forEach((a,r)=>{t[r]=e[a.key]??a.def}),t}var an=n=>331.3*Math.sqrt(1+n/273.15);function rn(n){let e=Math.max(n.mach,1.0001),t=Math.max(n.missDistance,.05),a=n.ambientPa??101325,r=n.c??343,s=Math.pow(e*e-1,.125),i=a*.53*s*n.diameter/(Math.pow(t,.75)*Math.pow(n.length,.25)),o=1.82*e*Math.pow(t,.25)*n.diameter/(r*Math.pow(e*e-1,.375)*Math.pow(n.length,.25));return{peakPa:i,duration:o}}function wa(n=1){let e=[1180,2230,3410,4870,6620,8900,11200],t=[.06,.05,.04,.032,.025,.018,.012],a=[.55,.6,.5,.36,.27,.18,.1];return e.map((r,s)=>({freq:r*n,t60:t[s],amp:a[s]}))}function nn(n,e,t=1,a=0){let r=n.slice(0,48),s=e.slice(0,8),i=new Float32Array(4+r.length*3+s.length*4);i[0]=t,i[1]=r.length,i[2]=s.length,i[3]=a,r.forEach((c,d)=>{i[4+d*3]=c.freq,i[5+d*3]=c.t60,i[6+d*3]=c.amp});let o=4+r.length*3;return s.forEach((c,d)=>{i[o+d*4]=c.timeMs,i[o+d*4+1]=c.amp,i[o+d*4+2]=c.contactMs,i[o+d*4+3]=c.noiseDb??-200}),i}var sn=n=>-20*Math.log10(Math.max(n,.1)),on=(n,e)=>.057*Math.sqrt(n/Math.max(e,.05));var Ma={rifle556_16in:{name:'5.56\xD745 \u2014 16" carbine',params:{peakSpl:160,positiveMs:.9,decayB:1.6,crackDb:-3,crackHz:3300,crackMs:14,turbDb:-5,turbMs:120,turbLp:6e3,bodyDb:-7,bodyHz:72,bodyMs:150,subDb:-10,subHz:46,subMs:140,driveDb:12,directivityDb:9,rearLpHz:4500,tailSendDb:4},action:{brightness:1.35,level:1.4,hits:[{timeMs:-3,amp:.3,contactMs:.05,noiseDb:-12},{timeMs:3,amp:1.1,contactMs:.12,noiseDb:-6},{timeMs:40,amp:.5,contactMs:.3,noiseDb:-14},{timeMs:72,amp:1.5,contactMs:.09,noiseDb:-3}]}},rifle556_10in:{name:'5.56\xD745 \u2014 10.3" SBR',params:{peakSpl:163,positiveMs:1.1,decayB:1.5,crackDb:-2,crackHz:2900,crackMs:20,turbDb:-3,turbMs:190,turbLp:5e3,bodyDb:-5,bodyHz:60,bodyMs:200,subDb:-7,subHz:42,subMs:170,driveDb:14,directivityDb:7,rearLpHz:6e3,tailSendDb:5},action:{brightness:1.3,level:1.4,hits:[{timeMs:-3,amp:.3,contactMs:.05,noiseDb:-12},{timeMs:2.5,amp:1.2,contactMs:.12,noiseDb:-6},{timeMs:36,amp:.5,contactMs:.3,noiseDb:-14},{timeMs:64,amp:1.6,contactMs:.09,noiseDb:-3}]}},rifle308_bolt:{name:'.308 Win \u2014 20" bolt action',params:{peakSpl:163,positiveMs:1.4,decayB:1.3,crackDb:-6,crackHz:2200,crackMs:22,turbDb:-6,turbMs:160,turbLp:4200,bodyDb:-4,bodyHz:50,bodyMs:260,subDb:-5,subHz:35,subMs:220,driveDb:13,directivityDb:10,rearLpHz:4e3,tailSendDb:6},action:{brightness:.85,level:.6,hits:[{timeMs:-4,amp:.45,contactMs:.06,noiseDb:-10}]}},pistol9mm:{name:'9\xD719 \u2014 4" pistol',params:{peakSpl:157,positiveMs:.6,decayB:1.6,crackDb:-2,crackHz:1800,crackMs:26,turbDb:-7,turbMs:90,turbLp:4500,bodyDb:-6,bodyHz:95,bodyMs:110,subDb:-14,subHz:55,subMs:90,driveDb:11,directivityDb:6,rearLpHz:6500,precursorDb:-20,tailSendDb:3},action:{brightness:.95,level:1.3,hits:[{timeMs:-2,amp:.25,contactMs:.05,noiseDb:-12},{timeMs:4,amp:.9,contactMs:.1,noiseDb:-6},{timeMs:14,amp:1.1,contactMs:.09,noiseDb:-4}]}},pistol9mm_auto:{name:'9\xD719 \u2014 4" select-fire pistol',params:{peakSpl:157,positiveMs:.6,decayB:1.6,crackDb:-2,crackHz:1900,crackMs:22,turbDb:-6,turbMs:80,turbLp:4800,bodyDb:-6,bodyHz:100,bodyMs:90,subDb:-13,subHz:58,subMs:80,driveDb:11,directivityDb:6,rearLpHz:6500,precursorDb:-20,tailSendDb:3},action:{brightness:1,level:1.3,hits:[{timeMs:-2,amp:.25,contactMs:.05,noiseDb:-12},{timeMs:4,amp:.9,contactMs:.1,noiseDb:-6},{timeMs:12,amp:1,contactMs:.09,noiseDb:-4}]}}},e0={outdoorRange:{name:"Outdoor range (open field, berms)",reverb:{rt60Low:1.6,rt60Mid:1.1,rt60High:.35,xoverLow:300,xoverHigh:2500,size:2.6,diffusion:.75,predelayMs:20,modDepthMs:.4,modRateHz:.4,levelDb:0,toneHz:5e3},criticalDistance:32,ambience:{windSpl:46,windGust:.55,windGustRate:.12,windToneHz:520,rumbleSpl:36,enable:1},farReflectors:[{azimuth:0,distance:140,reflectivity:.35,lowpassHz:2200},{azimuth:75,distance:230,reflectivity:.25,lowpassHz:1800},{azimuth:-80,distance:190,reflectivity:.28,lowpassHz:1800},{azimuth:180,distance:300,reflectivity:.2,lowpassHz:1500}]},indoorRange:{name:"Indoor range (concrete, baffles)",reverb:{rt60Low:1.4,rt60Mid:1.1,rt60High:.6,xoverLow:250,xoverHigh:4e3,size:1.2,diffusion:.8,predelayMs:8,modDepthMs:.3,modRateHz:.6,levelDb:0,toneHz:8e3},criticalDistance:on(200*3.5,1.1),ambience:{windSpl:0,windGust:0,windGustRate:.1,windToneHz:500,rumbleSpl:42,enable:1}},forest:{name:"Forest",reverb:{rt60Low:1.8,rt60Mid:1.5,rt60High:.6,xoverLow:300,xoverHigh:3e3,size:4,diffusion:.9,predelayMs:25,modDepthMs:.5,modRateHz:.3,levelDb:0,toneHz:4500},criticalDistance:18,ambience:{windSpl:50,windGust:.7,windGustRate:.18,windToneHz:900,rumbleSpl:30,enable:1}}},cn=n=>sn(n.criticalDistance),ka={dirt:{levelSpl:112,attackMs:.3,decayMs:90,hpHz:80,lpHz:2500,thumpHz:70,thumpDb:0,thumpMs:70,grainsPerS:900,grainDb:-14,resonance:.7},gravel:{levelSpl:116,attackMs:.2,decayMs:110,hpHz:300,lpHz:7e3,thumpHz:90,thumpDb:-8,thumpMs:40,grainsPerS:2200,grainDb:-6,resonance:.8},concrete:{levelSpl:124,attackMs:.05,decayMs:45,hpHz:900,lpHz:11e3,thumpHz:140,thumpDb:-10,thumpMs:20,grainsPerS:1500,grainDb:-10,resonance:1.1},wood:{levelSpl:118,attackMs:.1,decayMs:70,hpHz:250,lpHz:5e3,thumpHz:180,thumpDb:-2,thumpMs:50,grainsPerS:300,grainDb:-14,resonance:1.6},paper:{levelSpl:98,attackMs:.05,decayMs:25,hpHz:1500,lpHz:9e3,thumpHz:200,thumpDb:-30,thumpMs:10,grainsPerS:0,grainDb:-30,resonance:.7},cardboard:{levelSpl:104,attackMs:.08,decayMs:40,hpHz:400,lpHz:5e3,thumpHz:120,thumpDb:-6,thumpMs:30,grainsPerS:0,grainDb:-30,resonance:1.2}};var rr=class{buf=new Float32Array(4096);len=0;push(e,t){let a=this.len+2+t.length;if(a>this.buf.length){let r=new Float32Array(Math.max(a,this.buf.length*2));r.set(this.buf.subarray(0,this.len)),this.buf=r}this.buf[this.len++]=e,this.buf[this.len++]=t.length;for(let r=0;r<t.length;r++)this.buf[this.len++]=t[r]}take(){if(!this.len)return null;let e=this.buf.slice(0,this.len);return this.len=0,e}},nr=class{constructor(e,t){this.v=e;this.id=t}setPosition(e,t){this.v.cmd(le.VOICE_POS,t?[this.id,e[0],e[1],e[2],t[0],t[1],t[2]]:[this.id,e[0],e[1],e[2]])}setTaps(e){this.v.setTaps(this.id,e)}setOcclusion(e,t){this.v.cmd(le.VOICE_OCCLUSION,[this.id,e,t])}setSend(e){this.v.cmd(le.VOICE_SEND,[this.id,e])}stop(e=30){this.v.cmd(le.VOICE_STOP,[this.id,e])}},Aa=class n{ctx;node;module;params={hearing:gt(Dt),master:gt(Vt),reverb:gt(Ht),ambience:gt(qt)};meters={peakL:-120,peakR:-120,sceneSpl:0,tts:0,compGr:0,limitGr:0,voices:0,reflexGr:0,tinnitus:0,earSpl:0,speedOfSound:343,time:0,cpu:0};zoneSendDb=-30;zone=null;atmosphere={tempC:15,humidity:.6,pressureKpa:101.325};cmdb=new rr;nextId=1;onError=e=>console.error("[vorp]",e);constructor(e,t,a){this.ctx=e,this.node=t,this.module=a,t.port.onmessage=r=>{let s=r.data;if(s.type==="meters"){let i=s.meters;Object.assign(this.meters,{peakL:i[Oe.PEAK_L],peakR:i[Oe.PEAK_R],sceneSpl:i[Oe.SCENE_SPL],tts:i[Oe.TTS],compGr:i[Oe.COMP_GR],limitGr:i[Oe.LIMIT_GR],voices:i[Oe.VOICES],reflexGr:i[Oe.REFLEX_GR],tinnitus:i[Oe.TINNITUS],earSpl:i[Oe.EAR_SPL],speedOfSound:i[Oe.SPEED_OF_SOUND],time:i[Oe.TIME],cpu:s.cpu})}else s.type==="error"&&this.onError(s.message)}}static async create(e){let t=e.context??new AudioContext({latencyHint:e.latencyHint??"interactive"}),[a]=await Promise.all([WebAssembly.compileStreaming(fetch(e.wasmUrl)).catch(async()=>WebAssembly.compile(await(await fetch(e.wasmUrl)).arrayBuffer())),t.audioWorklet.addModule(e.workletUrl)]),r=new AudioWorkletNode(t,"vorp",{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[2],processorOptions:{module:a}});r.connect(t.destination);let s=new n(t,r,a);return s.applyAll(),s}async resume(){this.ctx.state!=="running"&&await this.ctx.resume()}cmd(e,t){this.cmdb.push(e,t)}flush(){let e=this.cmdb.take();e&&this.node.port.postMessage({type:"cmd",data:e},[e.buffer])}setListener(e,t,a){this.cmd(le.LISTENER,[e[0],e[1],e[2],t[0],t[1],t[2],a[0],a[1],a[2]])}setAtmosphere(e,t,a=101.325){this.atmosphere={tempC:e,humidity:t,pressureKpa:a},this.cmd(le.ATMOSPHERE,[e,t,a])}setHearing(e){this.setGroup(Dt,this.params.hearing,e,le.HEARING)}setMaster(e){this.setGroup(Vt,this.params.master,e,le.MASTER)}setReverb(e){this.setGroup(Ht,this.params.reverb,e,le.REVERB)}setAmbience(e){this.setGroup(qt,this.params.ambience,e,le.AMBIENCE)}resetHearing(){this.cmd(le.RESET_HEARING,[])}setZone(e){this.zone=e,this.zoneSendDb=cn(e),this.setReverb(e.reverb),this.setAmbience(e.ambience)}applyAll(){this.cmd(le.HEARING,this.params.hearing),this.cmd(le.MASTER,this.params.master),this.cmd(le.REVERB,this.params.reverb),this.cmd(le.AMBIENCE,this.params.ambience),this.cmd(le.ATMOSPHERE,[this.atmosphere.tempC,this.atmosphere.humidity,this.atmosphere.pressureKpa])}setGroup(e,t,a,r){e.forEach((s,i)=>{a[s.key]!==void 0&&(t[i]=a[s.key])}),this.cmd(r,t)}spawn(e,t,a,r={}){let s=this.nextId++;this.nextId>16e6&&(this.nextId=1);let i=new Float32Array(ve.HEADER+a.length);i[ve.VOICE_ID]=s,i[ve.KIND]=e,i[ve.BUS]=r.bus??ut.WEAPONS,i[ve.PX]=t[0],i[ve.PX+1]=t[1],i[ve.PX+2]=t[2];let o=r.dir??[0,0,-1];return i[ve.DX]=o[0],i[ve.DX+1]=o[1],i[ve.DX+2]=o[2],i[ve.DIRECTIVITY_DB]=r.directivityDb??0,i[ve.REAR_LP_HZ]=r.rearLpHz??2e4,i[ve.DISTANCE_MODE]=r.distanceMode??0,i[ve.MIN_DIST]=r.minDistance??.1,i[ve.REVERB_SEND_DB]=r.reverbSendDb??this.zoneSendDb,i[ve.SPATIAL]=r.spatial===!1?0:1,i[ve.DELAY_MS]=r.delayMs??0,i.set(a,ve.HEADER),this.cmd(le.SPAWN,i),new nr(this,s)}gunshot(e,t,a,r,s={},i={}){let o={...e.params,seed:Math.random()*1e5|0,...s},c=gt(en,o),l=-Math.min(0,...e.action.hits.map(v=>v.timeMs)),m=o.tailSendDb??0,h=this.spawn(Rt.GUNSHOT,t,c,{...i,dir:a,directivityDb:o.directivityDb,rearLpHz:o.rearLpHz,delayMs:(i.delayMs??0)+l,reverbSendDb:(i.reverbSendDb??this.zoneSendDb)+m}),b=null;if(r&&e.action.hits.length){let v=wa(e.action.brightness),p=e.action.hits.map(M=>({...M,timeMs:M.timeMs+l}));b=this.modal(v,p,r,e.action.level,{...i,delayMs:i.delayMs??0})}return{blast:h,action:b}}modal(e,t,a,r=1,s={}){return this.spawn(Rt.MODAL,a,nn(e,t,r,Math.random()*1e5|0),{bus:ut.IMPACTS,...s})}noise(e,t,a={}){return this.spawn(Rt.NOISE,t,gt(tn,{seed:Math.random()*1e5|0,...e}),{bus:ut.IMPACTS,...a})}crack(e,t,a,r={}){return this.spawn(Rt.NWAVE,a,[e,t,20],{distanceMode:1,...r})}sample(e,t,a,r={}){return this.spawn(Rt.SAMPLE,t,[e,r.rate??1,a,r.loop?1:0,r.offsetS??0],r)}setTaps(e,t){let a=Math.min(t.length,10),r=new Float32Array(2+a*6);r[0]=e,r[1]=a;for(let s=0;s<a;s++){let i=t[s],o=2+s*6;r[o]=i.path,r[o+1]=i.gain,r[o+2]=i.lowpassHz,r[o+3]=i.dir[0],r[o+4]=i.dir[1],r[o+5]=i.dir[2]}this.cmd(le.VOICE_TAPS,r)}async loadSample(e,t){let a=await this.ctx.decodeAudioData(await(await fetch(t)).arrayBuffer()),r=new Float32Array(a.length);for(let s=0;s<a.numberOfChannels;s++){let i=a.getChannelData(s);for(let o=0;o<i.length;o++)r[o]+=i[o]/a.numberOfChannels}this.node.port.postMessage({type:"sample",id:e,data:r},[r.buffer])}async loadImpulseResponse(e,t=1){let a=await this.ctx.decodeAudioData(await(await fetch(e)).arrayBuffer()),r=a.getChannelData(0).slice(),s=a.numberOfChannels>1?a.getChannelData(1).slice():null;this.node.port.postMessage({type:"ir",left:r,right:s},s?[r.buffer,s.buffer]:[r.buffer]),this.setMaster({convMix:t})}};var Pa=class{constructor(e,t){this.physics=e;this.urls=t}vorp=null;settings={reflections:!0,probeRays:14,probeDistance:45,occlusion:!0,occlusionDb:-14,occlusionLowpassHz:1100,cracks:!0};surfaces=new Map;listener={position:u.create(),forward:u.create(0,0,-1),up:u.create(0,1,0)};zone=null;zoneOrigin=u.create();pending=[];creating=null;crackDone=new Set;prevProj=new Map;tempC=18;async start(){if(this.vorp)return await this.vorp.resume(),this.vorp;this.creating||(this.creating=Aa.create({wasmUrl:this.urls.wasm,workletUrl:this.urls.worklet}).then(t=>{this.vorp=t,this.zone&&t.setZone(this.zone),t.setAtmosphere(this.tempC,.55);for(let a of this.pending)a();return this.pending=[],t}));let e=await this.creating;return await e.resume(),e}whenReady(e){this.vorp?e():this.pending.push(e)}setZone(e){this.zone=e,this.vorp?.setZone(e)}surface(e){return this.surfaces.get(e)??{reflection:.8,lowpassHz:6e3}}update(e){e.forward(this.listener.forward),e.up(this.listener.up),u.copy(this.listener.position,e.position);let t=this.vorp;t&&(t.setListener(this.listener.position,this.listener.forward,this.listener.up),this.settings.cracks&&this.physics&&this.trackCracks(t),t.flush())}computeTaps(e,t,a=0){let r=this.physics,s=this.listener.position,i=[],o=u.clone(e),c=t?u.normalize(u.create(),u.clone(t)):null,d=m=>{if(!c||a<=0)return 1;let h=u.dot(c,m);return Math.pow(10,-a*(1-h)*.5/20)},l=(m,h,b,v)=>{let p=u.sub(u.create(),s,m),M=u.length(p);if(M<.2)return;let y=u.dot(p,b);if(Math.abs(y)<1e-5)return;let x=u.dot(u.sub(u.create(),h,m),b)/y;if(x<=0||x>=1)return;let w=u.scaleAndAdd(u.create(),m,p,x),g=u.normalize(u.create(),u.sub(u.create(),w,o)),k=u.normalize(u.create(),u.sub(u.create(),w,s)),f=this.surface(v),A=f.reflection*d(g)/M;i.push({path:M,gain:A,lowpassHz:f.lowpassHz,dir:k,energy:A*A})};if(r&&this.settings.reflections){let m=r.raycast(o,[0,-1,0],50,!1);m&&l(u.scaleAndAdd(u.create(),o,m.normal,-2*u.dot(u.sub(u.create(),o,m.point),m.normal)),m.point,m.normal,m.material);let h=this.settings.probeRays;for(let b=0;b<h;b++){let v=2.399963*b,p=b===h-1?1:b/(h-1)*.9-.25,M=Math.sqrt(Math.max(0,1-p*p)),y=u.create(Math.cos(v)*M,p,Math.sin(v)*M),x=r.raycast(s,y,this.settings.probeDistance,!1);if(!x||x.t<.3)continue;let w=x.normal,g=u.dot(u.sub(u.create(),o,x.point),w);if(g<=0)continue;let k=u.scaleAndAdd(u.create(),o,w,-2*g);l(k,x.point,w,x.material)}}for(let m of this.zone?.farReflectors??[]){let h=m.azimuth*Math.PI/180,b=u.create(this.zoneOrigin[0]+Math.sin(h)*m.distance,o[1],this.zoneOrigin[2]-Math.cos(h)*m.distance),v=u.distance(o,b)+u.distance(b,s),p=u.normalize(u.create(),u.sub(u.create(),b,o)),M=u.normalize(u.create(),u.sub(u.create(),b,s)),y=m.reflectivity*d(p)/v;i.push({path:v,gain:y,lowpassHz:m.lowpassHz,dir:M,energy:y*y})}return i.sort((m,h)=>h.energy-m.energy),i.slice(0,10)}occlusionOf(e){if(!this.physics||!this.settings.occlusion)return null;let t=u.sub(u.create(),this.listener.position,u.clone(e)),a=u.length(t);if(a<.3)return null;u.scale(t,t,1/a);let r=u.scaleAndAdd(u.create(),u.clone(e),t,.05);return this.physics.raycast(r,t,a-.15,!1)?{db:this.settings.occlusionDb,lowpass:this.settings.occlusionLowpassHz}:null}finish(e,t,a,r){e.setTaps(this.computeTaps(t,a,r));let s=this.occlusionOf(t);s&&e.setOcclusion(s.db,s.lowpass)}gunshot(e,t,a,r,s={}){let i=this.vorp;if(!i)return null;let o=i.gunshot(e,t,a,r,s);return this.finish(o.blast,t,a,e.params.directivityDb??9),o.action&&r&&o.action.setTaps(this.computeTaps(r,null,0).slice(0,4)),o}impact(e,t,a=0){let r=this.vorp;if(!r)return null;let s={...ka[e]??ka.dirt};s.levelSpl=(s.levelSpl??110)+a;let i=r.noise(s,t,{bus:ut.IMPACTS});return this.finish(i,t,null,0),i}modal(e,t,a,r=1,s={}){let i=this.vorp;if(!i)return null;let o=i.modal(e,t,a,r,s);return this.finish(o,a,null,0),o}footstep(e,t){let a=this.vorp;return a?a.noise(e,t,{bus:ut.ENV,reverbSendDb:a.zoneSendDb}):null}projectileInfo=new Map;trackCracks(e){let t=this.physics,a=this.listener.position,r=an(this.tempC),s=t.projectiles(),i=new Set;for(let o of s){i.add(o.id);let c=this.prevProj.get(o.id);if(this.prevProj.set(o.id,u.clone(o.position)),!c||this.crackDone.has(o.id))continue;let d=u.length(o.velocity);if(d<=r*1.01)continue;let l=u.sub(u.create(),o.position,c),m=u.lengthSq(l);if(m<1e-8)continue;let h=u.dot(u.sub(u.create(),a,c),l)/m;if(h<0||h>1)continue;let b=u.scaleAndAdd(u.create(),c,l,h),v=u.distance(b,a);if(v>60||v<.02)continue;let p=u.distance(b,c),M=this.projectileInfo.get(o.userId)??{diameter:.0057,length:.023},y=rn({mach:d/r,diameter:M.diameter,length:M.length,missDistance:v,c:r}),x=u.normalize(u.create(),l),w=r/d,g=u.scaleAndAdd(u.create(),b,x,-v*Math.sqrt(1-w*w)/Math.max(w,.001));e.crack(y.peakPa,y.duration,g,{bus:ut.WEAPONS}).setTaps(this.computeTaps(g,null,0)),this.crackDone.add(o.id)}for(let o of[...this.prevProj.keys()])i.has(o)||(this.prevProj.delete(o),this.crackDone.delete(o))}};function ln(n,e){let t=n.scope(rt.gl),a=e.settings,r=e.sky.settings;t.number("Sky",r,"sunElevation",{label:"Sun elevation",min:-10,max:90,step:.1,unit:"\xB0"}).number("Sky",r,"sunAzimuth",{label:"Sun azimuth",min:0,max:360,step:.5,unit:"\xB0"}).number("Sky",r,"sunIlluminance",{label:"Solar illuminance (TOA)",min:1e3,max:14e4,step:100,unit:"lux",help:"Extraterrestrial sun illuminance \u2248 128 000 lux. Everything else is derived from this."}).number("Sky",r,"sunAngularDiameter",{label:"Sun angular diameter",min:.1,max:5,step:.01,unit:"\xB0",help:"Real sun: 0.53\xB0. Sets penumbra width of all sun shadows (PCSS) and sun specular size."}).number("Sky",r,"turbidity",{label:"Aerosol (haze)",min:0,max:10,step:.05,help:"Mie density. Hazy/humid days \u2248 2\u20134."}).number("Sky",r,"rayleigh",{label:"Rayleigh density",min:0,max:4,step:.01}).number("Sky",r,"ozone",{label:"Ozone",min:0,max:4,step:.01}).number("Sky",r,"mieG",{label:"Mie anisotropy",min:0,max:.99,step:.01}).number("Sky",r,"groundAlbedo",{label:"Ground albedo (env)",min:0,max:1,step:.01}).number("Sky",r,"multiScatter",{label:"Multiple scattering",min:.5,max:2.5,step:.01}).number("Sky",a.ibl,"intensity",{label:"IBL intensity",min:0,max:3,step:.01,help:"Keep at 1 for physical correctness."}).number("Sky",a.ibl,"specularOcclusion",{label:"Specular occlusion",min:0,max:1,step:.01}).number("Sky",a.ibl,"occludedAmbient",{label:"Bounce fill (occluded sky)",min:0,max:1,step:.01,help:"Fraction of sky ambient still arriving from occluded sky directions. \u22480.1\u20130.2."}).number("Sky",a.ibl,"groundBounce",{label:"Sun ground bounce",min:0,max:2,step:.01,help:"One-bounce sunlight (sun lux \xD7 ground albedo / \u03C0) received where the sky is blocked \u2014 lights pavilion/porch interiors. No real-time GI: \u22480.4\u20130.8 on sunny days."}),t.bool("Global illumination",a.gi,"enabled",{label:"Baked GI probes",help:"Path-traced at load: sky occlusion + multi-bounce sun/sky light. Replaces the analytic fill inside the probe volume."}).number("Global illumination",a.gi,"intensity",{label:"GI intensity",min:0,max:3,step:.01,help:"Keep at 1 for physical correctness."}),t.number("Atmosphere",a.wind,"speed",{label:"Wind speed",min:0,max:20,step:.1,unit:"m/s",help:"Drives foliage sway (and should match the physics/particle wind)."}).number("Atmosphere",a.wind,"bend",{label:"Foliage bend",min:0,max:.2,step:.001,unit:"m per m/s",help:"Tip displacement of a 1 m blade per m/s of wind."}).number("Atmosphere",a.wind,"turbulence",{label:"Foliage flutter",min:0,max:1,step:.01}),t.bool("Clouds",a.clouds,"enabled",{label:"Cloud deck"}).number("Clouds",a.clouds,"coverage",{label:"Coverage",min:0,max:1,step:.01,help:"Fraction of sky covered (scattered \u2248 0.3\u20130.5, broken \u2248 0.6\u20130.85, overcast 1). For overcast also lower the sun illuminance."}).number("Clouds",a.clouds,"density",{label:"Optical density",min:0,max:6,step:.01}).number("Clouds",a.clouds,"altitude",{label:"Altitude",min:300,max:9e3,step:10,unit:"m",help:"Cumulus base \u2248 1\u20132 km."}).number("Clouds",a.clouds,"scale",{label:"Feature size",min:200,max:12e3,step:10,unit:"m"}).number("Clouds",a.clouds,"windSpeed",{label:"Wind aloft",min:0,max:60,step:.1,unit:"m/s"}).number("Clouds",a.clouds,"windDirDeg",{label:"Wind direction",min:0,max:360,step:1,unit:"\xB0"}).number("Clouds",a.clouds,"shadowStrength",{label:"Cloud shadows",min:0,max:1,step:.01,help:"How much a thick cloud dims direct sunlight on the ground."}),t.choice("Exposure",a.exposure,"mode",["auto","manual","camera"],{label:"Mode",help:"auto = eye/camera metering; manual = EV100; camera = aperture/shutter/ISO of the Camera."}).number("Exposure",a.exposure,"ev100",{label:"Manual EV100",min:-6,max:20,step:.1,help:"Sunny 16 \u2248 15, overcast \u2248 12, indoor \u2248 7, night \u2248 0."}).number("Exposure",a.exposure,"compensation",{label:"Compensation",min:-5,max:5,step:.05,unit:"EV"}).number("Exposure",a.exposure,"minEv100",{label:"Min EV100",min:-10,max:20,step:.1}).number("Exposure",a.exposure,"maxEv100",{label:"Max EV100",min:-10,max:22,step:.1}).number("Exposure",a.exposure,"speedUp",{label:"Adapt to bright",min:.05,max:20,step:.05,unit:"EV/s"}).number("Exposure",a.exposure,"speedDown",{label:"Adapt to dark",min:.05,max:20,step:.05,unit:"EV/s"}).number("Exposure",a.exposure,"lowPercent",{label:"Metering low %",min:0,max:.99,step:.01}).number("Exposure",a.exposure,"highPercent",{label:"Metering high %",min:.01,max:1,step:.01}).number("Exposure",a.exposure,"centerWeight",{label:"Centre weighting",min:0,max:1,step:.01}),t.choice("Tone & colour",a.grade,"tonemapper",["agx","aces","neutral","none"],{label:"Tonemapper"}).number("Tone & colour",a.grade,"exposureBias",{label:"Exposure bias",min:-4,max:4,step:.05,unit:"EV"}).number("Tone & colour",a.grade,"contrast",{label:"Contrast",min:.5,max:1.6,step:.01}).number("Tone & colour",a.grade,"saturation",{label:"Saturation",min:0,max:2,step:.01}).number("Tone & colour",a.grade,"temperature",{label:"White balance temp",min:-1,max:1,step:.01}).number("Tone & colour",a.grade,"tint",{label:"White balance tint",min:-1,max:1,step:.01}).number("Tone & colour",a.grade,"lift",{label:"Lift",min:-.2,max:.2,step:.001}).number("Tone & colour",a.grade,"gamma",{label:"Gamma",min:.5,max:2,step:.01}).number("Tone & colour",a.grade,"gain",{label:"Gain",min:.5,max:2,step:.01}).number("Tone & colour",a.grade,"dither",{label:"Dither",min:0,max:2,step:.01}),t.number("Lens & sensor",a.lens,"distortion",{label:"Barrel distortion k1",min:-.6,max:.6,step:.005,help:"Negative = barrel (wide/bodycam lenses), positive = pincushion."}).number("Lens & sensor",a.lens,"distortion2",{label:"Distortion k2",min:-.5,max:.5,step:.005}).number("Lens & sensor",a.lens,"fillZoom",{label:"Distortion fill zoom",min:.5,max:2,step:.005}).number("Lens & sensor",a.lens,"chromaticAberration",{label:"Chromatic aberration",min:0,max:3,step:.01}).number("Lens & sensor",a.lens,"naturalVignette",{label:"Natural vignetting (cos\u2074)",min:0,max:1,step:.01}).number("Lens & sensor",a.lens,"vignette",{label:"Artistic vignette",min:0,max:1,step:.01}).number("Lens & sensor",a.lens,"vignetteRoundness",{label:"Vignette roundness",min:0,max:1,step:.01}).number("Lens & sensor",a.lens,"sharpen",{label:"Sharpening",min:0,max:1,step:.01}).bool("Lens & sensor",a.sensor,"enabled",{label:"Sensor noise"}).number("Lens & sensor",a.sensor,"readNoise",{label:"Read noise",min:0,max:.05,step:1e-4}).number("Lens & sensor",a.sensor,"shotNoise",{label:"Photon shot noise",min:0,max:.05,step:1e-4}).number("Lens & sensor",a.sensor,"gain",{label:"Sensor gain",min:0,max:8,step:.01}).bool("Lens & sensor",a.sensor,"isoCoupled",{label:"Noise follows camera ISO"}).bool("Lens & sensor",a.motionBlur,"enabled",{label:"Motion blur"}).number("Lens & sensor",a.motionBlur,"shutterAngle",{label:"Shutter angle",min:0,max:360,step:1,unit:"\xB0",help:"180\xB0 = film look; bodycams shoot ~ 90\u2013180\xB0."}).number("Lens & sensor",a.motionBlur,"maxPixels",{label:"Max blur",min:4,max:128,step:1,unit:"px"}).number("Lens & sensor",a.motionBlur,"samples",{label:"Blur samples",min:4,max:32,step:1}).bool("Lens & sensor",a.dof,"enabled",{label:"Depth of field"}).number("Lens & sensor",a.dof,"apertureMm",{label:"Aperture / pupil",min:0,max:30,step:.1,unit:"mm",help:"Human pupil \u2248 3 mm in daylight (iron sights: target goes soft), 6\u20137 mm at night. Camera: focal length \xF7 f-number. Bodycams \u2248 1 mm (everything sharp)."}).bool("Lens & sensor",a.dof,"autoFocus",{label:"Auto focus (accommodation)"}).number("Lens & sensor",a.dof,"focusDistance",{label:"Manual focus",min:.1,max:500,step:.1,unit:"m"}).number("Lens & sensor",a.dof,"focusSpeed",{label:"Refocus speed",min:.5,max:30,step:.1,unit:"1/s",help:"Eye accommodation \u2248 4\u20138/s."}).number("Lens & sensor",a.dof,"maxBlurPx",{label:"Max blur radius",min:2,max:40,step:1,unit:"px@1080p"}).number("Lens & sensor",a.dof,"quality",{label:"DOF quality",min:.25,max:3,step:.05}).bool("Lens & sensor",a.bloom,"enabled",{label:"Bloom (lens scatter)"}).number("Lens & sensor",a.bloom,"intensity",{label:"Bloom amount",min:0,max:.3,step:.001,help:"Fraction of light scattered by the lens (physical \u2248 0.02\u20130.05)."}).number("Lens & sensor",a.bloom,"radius",{label:"Bloom radius",min:.5,max:3,step:.01});let s=a.shadows;t.bool("Shadows",s,"enabled",{label:"Sun shadows"}).number("Shadows",s,"cascades",{label:"Cascades",min:1,max:4,step:1}).number("Shadows",s,"resolution",{label:"Resolution",min:512,max:8192,step:512,unit:"px"}).number("Shadows",s,"distance",{label:"Distance",min:10,max:600,step:1,unit:"m"}).number("Shadows",s,"splitLambda",{label:"Split lambda",min:0,max:1,step:.01}).number("Shadows",s,"constantBias",{label:"Depth bias",min:0,max:.002,step:1e-5}).number("Shadows",s,"slopeBias",{label:"Slope bias",min:0,max:8,step:.05}).number("Shadows",s,"normalBias",{label:"Normal bias",min:0,max:6,step:.05,unit:"texels"}).number("Shadows",s,"maxPenumbraTexels",{label:"Max penumbra",min:1,max:48,step:1,unit:"texels"}).number("Shadows",s,"blockerSamples",{label:"PCSS blocker taps",min:1,max:16,step:1}).number("Shadows",s,"pcfSamples",{label:"PCF taps",min:1,max:32,step:1}).number("Shadows",s,"blendFraction",{label:"Cascade blend",min:0,max:.5,step:.01}),t.bool("AO & AA",a.gtao,"enabled",{label:"GTAO"}).number("AO & AA",a.gtao,"radius",{label:"AO radius",min:.05,max:4,step:.01,unit:"m"}).number("AO & AA",a.gtao,"falloff",{label:"AO falloff",min:.05,max:1,step:.01}).number("AO & AA",a.gtao,"power",{label:"AO power",min:.5,max:4,step:.01}).number("AO & AA",a.gtao,"strength",{label:"AO strength",min:0,max:1,step:.01}).number("AO & AA",a.gtao,"slices",{label:"AO slices",min:1,max:8,step:1}).number("AO & AA",a.gtao,"steps",{label:"AO steps",min:2,max:16,step:1}).bool("AO & AA",a.taa,"enabled",{label:"TAA"}).number("AO & AA",a.taa,"feedbackMin",{label:"TAA feedback (moving)",min:0,max:.99,step:.005}).number("AO & AA",a.taa,"feedbackMax",{label:"TAA feedback (still)",min:0,max:.99,step:.005}).number("AO & AA",a,"renderScale",{label:"Render scale",min:.25,max:1.5,step:.05}).number("AO & AA",a,"debugView",{label:"Debug view",min:0,max:9,step:1,help:"1 normals, 2 AO, 3 velocity, 4 depth, 5 luminance (cd/m\xB2 false colour), 6 HDR, 7 sky visibility, 8 ambient diffuse, 9 direct only"}),t.number("Atmosphere",a.fog,"density",{label:"Fog density",min:0,max:.02,step:1e-5,unit:"1/m"}).number("Atmosphere",a.fog,"heightFalloff",{label:"Height falloff",min:.001,max:1,step:.001,unit:"1/m"}).number("Atmosphere",a.fog,"baseHeight",{label:"Base height",min:-50,max:200,step:.5,unit:"m"}).number("Atmosphere",a.fog,"startDistance",{label:"Start distance",min:0,max:200,step:.5,unit:"m"}).number("Atmosphere",a.fog,"inscatter",{label:"Inscatter",min:0,max:4,step:.01}).number("Atmosphere",a.fog,"mieG",{label:"Sun glow anisotropy",min:0,max:.99,step:.01})}function bn(n,e){let t=n.scope(rt.vorp),a=(r,s,i,o)=>{s.forEach((c,d)=>t.arrayValue(r,i,d,{key:c.key,label:c.label,min:c.min,max:c.max,step:c.step,unit:c.unit,help:c.help,onChange:()=>e.cmd(o,i)}))};a("Hearing",Dt,e.params.hearing,le.HEARING),a("Master",Vt,e.params.master,le.MASTER),a("Reverb",Ht,e.params.reverb,le.REVERB),a("Ambience",qt,e.params.ambience,le.AMBIENCE)}var Wt=class n{constructor(e,t,a,r){this.physics=e;this.workerUrl=t;this.wasmUrl=a;let s=typeof navigator<"u"&&navigator.hardwareConcurrency||4;this.threads=Math.max(1,Math.min(r??s-1,12))}workers=[];ready=null;job=0;pending=new Map;threads;meshCount=-1;busy=!1;static supported(){return typeof Worker<"u"}init(){let e=this.physics.staticMeshes;return this.ready&&this.meshCount===e.length?this.ready:(this.dispose(),this.meshCount=e.length,this.ready=Promise.all(Array.from({length:this.threads},()=>new Promise((t,a)=>{let r=new Worker(this.workerUrl,{type:"module",name:"fondaine-gi"});r.onmessage=s=>{let i=s.data;if(i.type==="ready"){t();return}if(i.type==="error"){a(new Error(i.message));for(let c of this.pending.values())c.reject(new Error(i.message));this.pending.clear();return}let o=this.pending.get(i.job);o&&(this.pending.delete(i.job),o.resolve(i))},r.onerror=s=>{a(s),this.failAll(new Error("GI worker crashed: "+(s.message??s)))},r.postMessage({type:"init",wasm:this.wasmUrl,meshes:e}),this.workers.push(r),setTimeout(()=>a(new Error("GI worker did not start within 30 s")),3e4)}))).then(()=>{}).catch(t=>{throw this.dispose(),this.ready=null,t}),this.ready)}call(e,t,a=[]){let r=++this.job;return new Promise((s,i)=>{let o=setTimeout(()=>{this.pending.delete(r)&&i(new Error(`GI worker job timed out after ${n.jobTimeoutMs/1e3} s`))},n.jobTimeoutMs);this.pending.set(r,{resolve:c=>{clearTimeout(o),s(c)},reject:c=>{clearTimeout(o),i(c)}}),e.postMessage({...t,job:r},a)})}static jobTimeoutMs=18e4;failAll(e){for(let t of this.pending.values())t.reject(e);this.pending.clear()}async runSlabs(e,t,a,r){let s=Math.max(1,Math.ceil(e/(this.threads*4))),i=[];for(let d=0;d<e;d+=s)i.push([d,Math.min(e,d+s)]);let o=i.length,c=0;await Promise.all(this.workers.map(async d=>{for(;i.length;){let[l,m]=i.shift();a(await this.call(d,t(l,m))),r?.(++c/o)}}))}async bake(e,t,a){let r=performance.now();this.busy=!0;try{await this.init();let{nx:s,ny:i,nz:o}=e,c=s*i*o,d=s*i,l=new Float32Array(c*3),m=new Uint8Array(c);await this.runSlabs(o,(v,p)=>({type:"pos",grid:e,z0:v,z1:p}),v=>{l.set(v.pos,v.z0*d*3),m.set(v.valid,v.z0*d)},v=>a?.(v*.05,"placing probes"));for(let v of this.workers)v.postMessage({type:"probes",pos:l,valid:m});let h=null;for(let v=0;v<t;v++){let p=new Float32Array(c*12),M=h;await this.runSlabs(o,(y,x)=>({type:"pass",grid:e,pass:v,prev:M,z0:y,z1:x}),y=>p.set(y.data,y.z0*d*12),y=>a?.(.05+.95*((v+y)/t),`bounce ${v+1} of ${t}`)),Cs(p,m,s,i,o),h=p}let b=0;for(let v=0;v<c;v++)m[v]||b++;return{data:h,filled:b,ms:performance.now()-r,threads:this.threads}}finally{this.busy=!1}}dispose(){for(let e of this.workers)e.terminate();this.workers=[],this.ready=null,this.pending.clear()}};function Cs(n,e,t,a,r){let s=Uint8Array.from(e);for(let i=0;i<4;i++){let o=!1,c=Uint8Array.from(s),d=n.slice();for(let l=0;l<r;l++)for(let m=0;m<a;m++)for(let h=0;h<t;h++){let b=(l*a+m)*t+h;if(c[b])continue;let v=new Float32Array(12),p=0;for(let M=-1;M<=1;M++)for(let y=-1;y<=1;y++)for(let x=-1;x<=1;x++){let w=h+x,g=m+y,k=l+M;if(w<0||g<0||k<0||w>=t||g>=a||k>=r)continue;let f=(k*a+g)*t+w;if(c[f]){for(let A=0;A<12;A++)v[A]+=d[f*12+A];p++}}if(p){for(let M=0;M<12;M++)n[b*12+M]=v[M]/p;s[b]=1,o=!0}}if(!o)break}}var Sa=Tt("MeshRenderer"),Ta=class n{renderer;scene=new la;camera=new ca;world=new fa;physics;audio;input;tuning=new ya;devui;canvas;time=0;fixedDt;maxFrameTime=.1;timeScale=1;paused=!1;frame=0;fps=0;acc=0;last=0;running=!1;fpsAcc=0;fpsFrames=0;onUpdate=[];onFixed=[];onLate=[];giBaker;autoRebakeGI=!0;giLast=null;giChangeT=0;constructor(e,t,a){this.canvas=e.canvas,this.renderer=t,this.physics=a,this.fixedDt=1/(e.fixedHz??120);let r=e.baseUrl??"/";this.audio=new Pa(a,{wasm:e.vorpWasm??`${r}wasm/vorp_dsp.wasm`,worklet:e.vorpWorklet??`${r}vorp/vorp-worklet.js`}),this.input=new ga(e.canvas);let s=i=>new URL(i,typeof location<"u"?location.href:"http://localhost/").href;this.giBaker=Wt.supported()&&e.giThreads!==0?new Wt(a,s(e.giWorker??`${r}fondaine/gi-worker.js`),s(e.physicsWasm??`${r}wasm/fondaine_physics.wasm`),e.giThreads):null,this.devui=new va(this.tuning,e.title??"fondaine"),this.world.onRemoved(Sa,(i,o)=>this.scene.remove(o.object)),this.world.onRemoved(Bt,(i,o)=>{for(let c of o)c.onDestroy?.()}),ln(this.tuning,this.renderer),this.devui.statsText=()=>{let i=this.renderer.stats,o=this.audio.vorp?.meters;return`${this.fps.toFixed(0)} fps  ${i.frameMs.toFixed(2)} ms cpu  ${i.drawCalls} draws  ${(i.triangles/1e3).toFixed(0)}k tris
`+(o?`audio: ${o.voices} voices  eardrum ${o.earSpl.toFixed(0)} dB SPL  TTS ${o.tts.toFixed(1)} dB  dsp ${(o.cpu*100).toFixed(1)}%`:"audio: click to start")}}static async create(e){let t=e.baseUrl??"/",[a,r]=await Promise.all([ha.create(e.canvas,{offscreen:e.offscreen}),xa.load(e.physicsWasm??`${t}wasm/fondaine_physics.wasm`)]);return new n(e,a,r)}async startAudio(){let e=await this.audio.start();return this.tuning.params.some(t=>t.module===rt.vorp)||bn(this.tuning,e),e}async bakeGlobalIllumination(e){let t=e.cell??.5,a=Math.max(1,Math.ceil((e.max[0]-e.min[0])/t)),r=Math.max(1,Math.ceil((e.max[1]-e.min[1])/t)),s=Math.max(1,Math.ceil((e.max[2]-e.min[2])/t)),i=e.rays??256,o=e.passes??3,c=a*r*s,d=await this.giGrid({min:[e.min[0],e.min[1],e.min[2]],cell:t,nx:a,ny:r,nz:s,rays:i,albedo:Array.from(e.albedo)});e.onStatus?.(`Path tracing global illumination \xB7 ${c.toLocaleString()} probes`);let l=await this.runGIBake(d,o,(m,h)=>e.onStatus?.(`Path tracing global illumination \xB7 ${h} \xB7 ${Math.round(m*100)}%`));return console.info(`[fondaineGL] GI bake: ${a}\xD7${r}\xD7${s} probes, ${i} rays, ${o} passes, ${l.filled} filled, ${(l.ms/1e3).toFixed(1)} s on ${l.threads} thread(s)`),{probes:c,ms:l.ms,filled:l.filled}}async giGrid(e){let t=Array.from(await this.renderer.readSkySH());return{...e,sunDir:[...this.renderer.sky.sunDir],sunRGB:[...this.renderer.sky.sunIlluminanceRGB()],skySH:t}}skyKey(){let e=this.renderer.sky.settings;return[e.sunElevation,e.sunAzimuth,e.sunIlluminance,e.turbidity,e.rayleigh,e.ozone,e.groundAlbedo].map(t=>Number(t).toFixed(2)).join("|")}async runGIBake(e,t,a){let r;if(this.giBaker)try{r=await this.giBaker.bake(e,t,a)}catch(s){console.warn("[fondaineGL] worker GI bake failed, using the main thread",s),r=this.bakeGISync(e,t)}else r=this.bakeGISync(e,t);return this.renderer.setProbeVolume(r.data,e.nx,e.ny,e.nz,e.min,e.cell),this.giLast={grid:e,passes:t,key:this.skyKey()},r}bakeGISync(e,t){let a=performance.now(),{data:r,filled:s}=this.physics.bakeGI({...e,passes:t});return{data:r,filled:s,ms:performance.now()-a,threads:1}}watchGI(e){if(!this.autoRebakeGI||!this.giLast||!this.giBaker||this.giBaker.busy)return;if(this.skyKey()===this.giLast.key){this.giChangeT=0;return}if(this.giChangeT+=e,this.giChangeT<.6)return;this.giChangeT=0;let t=this.giLast;this.giLast={...t,key:this.skyKey()},this.giGrid({min:t.grid.min,cell:t.grid.cell,nx:t.grid.nx,ny:t.grid.ny,nz:t.grid.nz,rays:Math.min(t.grid.rays,128),albedo:t.grid.albedo}).then(a=>this.runGIBake(a,t.passes)).then(a=>console.info(`[fondaineGL] GI re-baked for the new sun in ${(a.ms/1e3).toFixed(1)} s`)).catch(a=>console.warn("[fondaineGL] GI re-bake failed",a))}createEntity(e,t,a){let r=this.world.spawn(e);return this.world.add(r,Ct,new pa(t,a)),r}transform(e){return this.world.require(e,Ct)}addMesh(e,t,a,r={}){let s=t instanceof me?t:new me(this.renderer.dev,t),i=new ge(s,a);return i.castShadow=r.castShadow??!0,i.viewmodel=r.viewmodel??!1,i.userData=e,this.scene.add(i),this.world.add(e,Sa,{object:i,offset:r.offset??null}),this.syncObject(e),i.resetHistory(),i}addScript(e,t){return t.engine=this,t.entity=e,(this.world.get(e,Bt)??this.world.add(e,Bt,[])).push(t),t}destroy(e){this.world.despawn(e)}tmp=F.create();syncObject(e){let t=this.world.get(e,Sa),a=this.world.get(e,Ct);!t||!a||(t.offset?t.object.setTransform(F.multiply(this.tmp,a.getWorld(),t.offset)):t.object.setTransform(a.getWorld()))}start(){if(this.running)return;this.running=!0,this.last=performance.now();let e=t=>{if(!this.running)return;let a=Math.max(0,Math.min((t-this.last)/1e3,this.maxFrameTime));this.last=t,this.step(a),requestAnimationFrame(e)};requestAnimationFrame(e)}stop(){this.running=!1}step(e){e=Math.max(0,e);let t=this.paused?0:e*this.timeScale;this.input.poll(),this.input.actionPressed("tuning")&&(this.devui.toggle(),this.devui.visible&&this.input.unlock());let a=[...this.world.query(Bt)];for(let[,s]of a)for(let i of s)i.enabled&&!i._started&&(i._started=!0,i.onStart?.());this.acc+=t;let r=0;for(;this.acc>=this.fixedDt&&r<12;){for(let[,s]of a)for(let i of s)i.enabled&&i.onFixedUpdate?.(this.fixedDt);for(let s of this.onFixed)s(this.fixedDt);this.physics.step(this.fixedDt),this.acc-=this.fixedDt,this.time+=this.fixedDt,r++}r>=12&&(this.acc=0);for(let[,s]of a)for(let i of s)i.enabled&&i.onUpdate?.(t);for(let s of this.onUpdate)s(t);for(let[,s]of a)for(let i of s)i.enabled&&i.onLateUpdate?.(t);for(let s of this.onLate)s(t);for(let[s]of this.world.query(Sa))this.syncObject(s);this.watchGI(e),this.audio.update(this.camera),this.renderer.render(this.scene,this.camera,Math.max(e,1e-4)),this.devui.update(),this.input.endFrame(),this.frame++,this.fpsAcc+=e,this.fpsFrames++,this.fpsAcc>.5&&(this.fps=this.fpsFrames/this.fpsAcc,this.fpsAcc=0,this.fpsFrames=0)}};var Le={DEFAULT:0,CONCRETE:1,DIRT:2,GRAVEL:3,WOOD:4,STEEL:5,STEEL_TARGET:6,PAPER:7,CARDBOARD:8,GRASS:9,BRASS:10,POLYMER:11},De=(n,e,t)=>({id:n,name:e,friction:.6,restitution:.2,ricochetAngleDeg:0,ricochetEnergyKeep:.3,reflection:.8,reflectionLowpassHz:6e3,impactSound:"dirt",footstepSound:"dirt",decal:null,decalSize:.03,debris:"dust",debrisColor:[.4,.35,.28],hard:!1,albedo:[.25,.25,.25],...t}),Y0=[De(Le.DEFAULT,"default",{}),De(Le.CONCRETE,"concrete",{friction:.75,restitution:.35,ricochetAngleDeg:12,ricochetEnergyKeep:.25,reflection:.97,reflectionLowpassHz:9e3,impactSound:"concrete",footstepSound:"concrete",decal:2,decalSize:.05,debris:"dust",debrisColor:[.62,.61,.58],hard:!0,albedo:[.36,.35,.33]}),De(Le.DIRT,"dirt",{friction:.8,restitution:.1,reflection:.65,reflectionLowpassHz:2500,impactSound:"dirt",footstepSound:"dirt",decal:5,decalSize:.12,debris:"dust",debrisColor:[.35,.28,.2],albedo:[.2,.15,.1]}),De(Le.GRAVEL,"gravel",{friction:.85,restitution:.15,ricochetAngleDeg:8,reflection:.75,reflectionLowpassHz:4e3,impactSound:"gravel",footstepSound:"gravel",decal:null,debris:"dust",debrisColor:[.5,.48,.45],hard:!0,albedo:[.3,.29,.27]}),De(Le.WOOD,"wood",{friction:.55,restitution:.3,reflection:.85,reflectionLowpassHz:5e3,impactSound:"wood",footstepSound:"wood",decal:1,decalSize:.035,debris:"splinters",debrisColor:[.6,.48,.32],hard:!0,albedo:[.42,.3,.17]}),De(Le.STEEL,"steel",{friction:.45,restitution:.4,ricochetAngleDeg:25,ricochetEnergyKeep:.4,reflection:.98,reflectionLowpassHz:12e3,impactSound:"concrete",footstepSound:"concrete",decal:0,decalSize:.04,debris:"sparks",debrisColor:[1,.7,.35],hard:!0,albedo:[.3,.3,.3]}),De(Le.STEEL_TARGET,"steel target",{friction:.45,restitution:.4,ricochetAngleDeg:0,reflection:.98,reflectionLowpassHz:12e3,impactSound:"concrete",decal:4,decalSize:.07,debris:"sparks",debrisColor:[1,.7,.35],hard:!0,albedo:[.55,.45,.38]}),De(Le.PAPER,"paper",{reflection:.3,reflectionLowpassHz:2e3,impactSound:"paper",decal:3,decalSize:.012,debris:"none",albedo:[.7,.68,.62]}),De(Le.CARDBOARD,"cardboard",{reflection:.4,reflectionLowpassHz:2500,impactSound:"cardboard",decal:3,decalSize:.014,debris:"none",albedo:[.45,.33,.2]}),De(Le.GRASS,"grass",{friction:.7,reflection:.5,reflectionLowpassHz:1800,impactSound:"dirt",footstepSound:"grass",decal:5,decalSize:.1,debris:"dust",debrisColor:[.3,.3,.18],albedo:[.07,.11,.035]}),De(Le.BRASS,"brass",{friction:.35,restitution:.45,hard:!0,impactSound:"concrete",debris:"none",albedo:[.5,.38,.2]}),De(Le.POLYMER,"polymer",{friction:.6,restitution:.3,hard:!0,impactSound:"wood",debris:"none",albedo:[.04,.04,.04]})];var Ra={"5.56x45 M855":{name:"5.56\xD745mm M855 62gr",bulletMassKg:.004018,diameterM:.0057,lengthM:.0233,bcG7:.151,muzzleVelocity:948,referenceBarrelM:.508,velocityPerBarrelM:380,powderMassKg:.00168,gasVelocityFactor:1.7,casing:{lengthM:.0448,diameterM:.0095,massKg:.0063}},"5.56x45 Mk262":{name:"5.56\xD745mm Mk262 77gr",bulletMassKg:.00499,diameterM:.0057,lengthM:.0254,bcG7:.186,muzzleVelocity:850,referenceBarrelM:.457,velocityPerBarrelM:340,powderMassKg:.00162,gasVelocityFactor:1.7,casing:{lengthM:.0448,diameterM:.0095,massKg:.0063}},"7.62x51 M118LR":{name:"7.62\xD751mm M118LR 175gr",bulletMassKg:.01134,diameterM:.00782,lengthM:.0315,bcG7:.243,muzzleVelocity:790,referenceBarrelM:.559,velocityPerBarrelM:230,powderMassKg:.00272,gasVelocityFactor:1.6,casing:{lengthM:.0512,diameterM:.0119,massKg:.0123}},"9x19 124gr":{name:"9\xD719mm 124gr FMJ",bulletMassKg:.00803,diameterM:.00901,lengthM:.0155,bcG7:.072,muzzleVelocity:360,referenceBarrelM:.102,velocityPerBarrelM:300,powderMassKg:36e-5,gasVelocityFactor:1.3,casing:{lengthM:.019,diameterM:.0099,massKg:.0037}}};function yt(n,e,t,a={}){let r=e/2,s=n;if(a.straight){let c=r*.955;return t([[0,-s/2],[r*.99,-s/2],[r*.99,-s/2+.0011],[r*.82,-s/2+.0015],[r*.82,-s/2+.0026],[r*.985,-s/2+.0032],[c,s/2],[c*.9,s/2],[c*.9,s/2-.002]],18)}let i=r*.68,o=[[0,-s/2],[r*.98,-s/2],[r*.98,-s/2+.0012],[r*.86,-s/2+.0016],[r*.86,-s/2+.0028],[r,-s/2+.0034],[r*.97,s/2-s*.22],[i,s/2-s*.13],[i,s/2],[i*.85,s/2]];return t(o,16)}var ae={BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,UNSIGNED_INT:5125,FLOAT:5126,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,NEAREST:9728,LINEAR:9729,NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987,CLAMP_TO_EDGE:33071,MIRRORED_REPEAT:33648,REPEAT:10497};var un={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16};function Ks(n){switch(n){case ae.BYTE:case ae.UNSIGNED_BYTE:return 1;case ae.SHORT:case ae.UNSIGNED_SHORT:return 2;case ae.UNSIGNED_INT:case ae.FLOAT:return 4;default:throw new Error(`glTF: unknown accessor componentType ${n}`)}}function jt(n){let e=un[n.type];if(!e)throw new Error(`glTF: unknown accessor type "${n.type}"`);return e}function _s(n,e){let t,a;switch(n){case"MAT2":t=2,a=2;break;case"MAT3":t=3,a=3;break;case"MAT4":t=4,a=4;break;default:t=un[n]??1,a=1}let r=t*e,s=a>1?r+3&-4:r;return{rows:t,cols:a,colStride:s,elementSize:s*a}}function Js(n){switch(n){case ae.BYTE:return(e,t)=>e.getInt8(t);case ae.UNSIGNED_BYTE:return(e,t)=>e.getUint8(t);case ae.SHORT:return(e,t)=>e.getInt16(t,!0);case ae.UNSIGNED_SHORT:return(e,t)=>e.getUint16(t,!0);case ae.UNSIGNED_INT:return(e,t)=>e.getUint32(t,!0);case ae.FLOAT:return(e,t)=>e.getFloat32(t,!0);default:throw new Error(`glTF: unknown accessor componentType ${n}`)}}function Xs(n,e){switch(n){case ae.BYTE:return Math.max(e/127,-1);case ae.UNSIGNED_BYTE:return e/255;case ae.SHORT:return Math.max(e/32767,-1);case ae.UNSIGNED_SHORT:return e/65535;case ae.UNSIGNED_INT:return e/4294967295;default:return e}}function Kt(n,e){let t=n.json.bufferViews?.[e];if(!t)throw new Error(`glTF: bufferView ${e} does not exist`);let a=n.buffers[t.buffer];if(!a)throw new Error(`glTF: buffer ${t.buffer} (bufferView ${e}) was not loaded`);let r=t.byteOffset??0;if(r+t.byteLength>a.byteLength)throw new Error(`glTF: bufferView ${e} [${r}, ${r+t.byteLength}) overruns buffer ${t.buffer} (${a.byteLength} bytes)`);return{bytes:a.subarray(r,r+t.byteLength),byteStride:t.byteStride??0}}function sr(n,e,t,a,r,s,i,o,c){let d=Ks(s),l=_s(r,d),m=t||l.elementSize,h=l.rows*l.cols,b=e+(a>0?(a-1)*m+l.elementSize:0);if(b>n.byteLength)throw new Error(`glTF: accessor data overruns its bufferView (${b} > ${n.byteLength} bytes)`);if(s===ae.FLOAT&&o instanceof Float32Array&&m===l.elementSize&&l.cols===1&&(n.byteOffset+e&3)===0){o.set(new Float32Array(n.buffer,n.byteOffset+e,a*h),c);return}let v=new DataView(n.buffer,n.byteOffset,n.byteLength),p=Js(s),M=c;for(let y=0;y<a;y++){let x=e+y*m;for(let w=0;w<l.cols;w++){let g=x+w*l.colStride;for(let k=0;k<l.rows;k++){let f=p(v,g+k*d);o[M++]=i?Xs(s,f):f}}}}function mn(n,e,t,a){let r=n.json.accessors?.[e];if(!r)throw new Error(`glTF: accessor ${e} does not exist`);let s=jt(r);if(r.bufferView!==void 0){let{bytes:o,byteStride:c}=Kt(n,r.bufferView);sr(o,r.byteOffset??0,c,r.count,r.type,r.componentType,a,t,0)}else t.fill(0);let i=r.sparse;if(i&&i.count>0){let o=new Uint32Array(i.count),c=Kt(n,i.indices.bufferView);sr(c.bytes,i.indices.byteOffset??0,0,i.count,"SCALAR",i.indices.componentType,!1,o,0);let d=t instanceof Float32Array?new Float32Array(i.count*s):new Uint32Array(i.count*s),l=Kt(n,i.values.bufferView);sr(l.bytes,i.values.byteOffset??0,0,i.count,r.type,r.componentType,a,d,0);for(let m=0;m<i.count;m++){let h=o[m];if(h>=r.count)throw new Error(`glTF: sparse index ${h} out of range in accessor ${e}`);for(let b=0;b<s;b++)t[h*s+b]=d[m*s+b]}}}function Ee(n,e){let t=n.json.accessors?.[e];if(!t)throw new Error(`glTF: accessor ${e} does not exist`);let a=new Float32Array(t.count*jt(t));return mn(n,e,a,!!t.normalized&&t.componentType!==ae.FLOAT),a}function ir(n,e){let t=n.json.accessors?.[e];if(!t)throw new Error(`glTF: accessor ${e} does not exist`);if(t.componentType===ae.FLOAT)throw new Error(`glTF: accessor ${e} is FLOAT, expected an integer type`);let a=new Uint32Array(t.count*jt(t));return mn(n,e,a,!1),a}function ja(n,e){let t=n.json.accessors?.[e];if(!t)throw new Error(`glTF: accessor ${e} does not exist`);return t}function hn(n,e,t,a,r=!0){let s=Math.floor(n.length/3),i=new Float64Array(s*3),o=new Float64Array(s*3);for(let d=0;d+2<a.length;d+=3){let l=a[d],m=a[d+1],h=a[d+2];if(l>=s||m>=s||h>=s)continue;let b=n[l*3],v=n[l*3+1],p=n[l*3+2],M=n[m*3]-b,y=n[m*3+1]-v,x=n[m*3+2]-p,w=n[h*3]-b,g=n[h*3+1]-v,k=n[h*3+2]-p,f=t[l*2],A=t[l*2+1],P=t[m*2]-f,S=t[m*2+1]-A,T=t[h*2]-f,j=t[h*2+1]-A,z=P*j-T*S;if(!Number.isFinite(z)||Math.abs(z)<1e-12)continue;let R=1/z,I=(M*j-w*S)*R,L=(y*j-g*S)*R,E=(x*j-k*S)*R,N=(w*P-M*T)*R,O=(g*P-y*T)*R,C=(k*P-x*T)*R;if(Number.isFinite(I+L+E+N+O+C))for(let U of[l,m,h])i[U*3]+=I,i[U*3+1]+=L,i[U*3+2]+=E,o[U*3]+=N,o[U*3+1]+=O,o[U*3+2]+=C}let c=new Float32Array(s*4);for(let d=0;d<s;d++){let l=e[d*3],m=e[d*3+1],h=e[d*3+2],b=Math.hypot(l,m,h);b>0?(l/=b,m/=b,h/=b):(l=0,m=0,h=1);let v=i[d*3],p=i[d*3+1],M=i[d*3+2],y=l*v+m*p+h*M;v-=l*y,p-=m*y,M-=h*y;let x=Math.hypot(v,p,M);x<1e-10&&(Math.abs(l)<.9?(v=0,p=h,M=-m):(v=-h,p=0,M=l),x=Math.hypot(v,p,M)),v/=x,p/=x,M/=x;let w=m*M-h*p,g=h*v-l*M,k=l*p-m*v,A=w*o[d*3]+g*o[d*3+1]+k*o[d*3+2]<0?-1:1;r&&(A=-A),c[d*4]=v,c[d*4+1]=p,c[d*4+2]=M,c[d*4+3]=A}return c}function fn(n,e){switch(n){case ae.TRIANGLES:{let t=e.length-e.length%3;return{indices:t===e.length?e:e.slice(0,t),topology:"triangle-list"}}case ae.TRIANGLE_STRIP:{let t=[];for(let a=0;a+2<e.length;a++){let r=e[a],s=e[a+1+(a&1)],i=e[a+2-(a&1)];r===s||s===i||r===i||t.push(r,s,i)}return{indices:Uint32Array.from(t),topology:"triangle-list"}}case ae.TRIANGLE_FAN:{let t=[];for(let a=0;a+2<e.length;a++)t.push(e[a+1],e[a+2],e[0]);return{indices:Uint32Array.from(t),topology:"triangle-list"}}case ae.LINES:{let t=e.length-e.length%2;return{indices:t===e.length?e:e.slice(0,t),topology:"line-list"}}case ae.LINE_STRIP:case ae.LINE_LOOP:{let t=[];for(let a=0;a+1<e.length;a++)t.push(e[a],e[a+1]);return n===ae.LINE_LOOP&&e.length>2&&t.push(e[e.length-1],e[0]),{indices:Uint32Array.from(t),topology:"line-list"}}case ae.POINTS:return{indices:e,topology:"point-list"};default:throw new Error(`glTF: unknown primitive mode ${n}`)}}function We(n,e,t){let a=n.constructor,r=new a(t.length*e);for(let s=0;s<t.length;s++){let i=t[s]*e,o=s*e;for(let c=0;c<e;c++)r[o+c]=n[i+c]}return r}function pn(n){let e=n.length/3,t=new Float32Array(e*3);for(let a=0;a+2<e;a+=3){let r=a*3,s=n[r+3]-n[r],i=n[r+4]-n[r+1],o=n[r+5]-n[r+2],c=n[r+6]-n[r],d=n[r+7]-n[r+1],l=n[r+8]-n[r+2],m=i*l-o*d,h=o*c-s*l,b=s*d-i*c,v=Math.hypot(m,h,b);v>0?(m/=v,h/=v,b/=v):(m=0,h=1,b=0);for(let p=0;p<3;p++)t[r+p*3]=m,t[r+p*3+1]=h,t[r+p*3+2]=b}return t}function gn(n){let e=[1/0,1/0,1/0],t=[-1/0,-1/0,-1/0];for(let a=0;a+2<n.length;a+=3)for(let r=0;r<3;r++){let s=n[a+r];s<e[r]&&(e[r]=s),s>t[r]&&(t[r]=s)}return n.length<3?{min:[0,0,0],max:[0,0,0]}:{min:e,max:t}}var or=(function(){var n="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuixkbeeeddddillviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WboY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbrl79IV9Rbwq;X8:kdbk:kYi5ud9:du8Jjjjjbcjq9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxcj;abad9Uc;WFbGcjdadca0EhmaialfgPar9Rgoadfhsavaoadz:jjjjbgzceVhHcbhOdndninaeaO9nmeaPax9RaD6mdamaeaO9RaOamfgoae6EgAcsfglc9WGhCaAcethXaxaDfhiaOaeaoaeao6E9RhQalcl4cifcd4hLazcjdfaAfhKcbhYabaOad2fg8AhEaHh3incbh5dnawTmbaxaYcd4fRbbh5kcbh8Eazcjdfhqinaih8Fdndndndna5a8Ecet4ciGgoc9:fPdebdkaPa8F9RaA6mrazcjdfa8EaA2fa8FaAz:jjjjb8Aa8FaAfhixdkazcjdfa8EaA2fcbaAz:kjjjb8Aa8FhixekaPa8F9RaL6mva8FaLfhidnaCTmbaPai9RcK6mbaocdtc:q:G:cjbfcj:G:cjbawEhaczhrcbhlinargoc9Wfghaqfhrdndndndndndnaaa8Fahco4fRbbalcoG4ciGcdtfydbPDbedvivvvlvkar9cb83bwar9cb83bbxlkarcbaiRbdai8Xbb9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbaqaofgrcGfcbaicdfa8J9c8N1:NfghRbbag9cjjjjjw:dg8J9qE86bbarcVfcbaha8J9c8M1:NfghRbbag9cjjjjjl:dg8J9qE86bbarc7fcbaha8J9c8L1:NfghRbbag9cjjjjjd:dg8J9qE86bbarctfcbaha8J9c8K1:NfghRbbag9cjjjjje:dg8J9qE86bbarc91fcbaha8J9c8J1:NfghRbbag9cjjjj;ab:dg8J9qE86bbarc4fcbaha8J9cg1:NfghRbbag9cjjjja:dg8J9qE86bbarc93fcbaha8J9ch1:NfghRbbag9cjjjjz:dgg9qE86bbarc94fcbahag9ca1:NfghRbbai8Xbe9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbarc95fcbaha8J9c8N1:NfgiRbbag9cjjjjjw:dg8J9qE86bbarc96fcbaia8J9c8M1:NfgiRbbag9cjjjjjl:dg8J9qE86bbarc97fcbaia8J9c8L1:NfgiRbbag9cjjjjjd:dg8J9qE86bbarc98fcbaia8J9c8K1:NfgiRbbag9cjjjjje:dg8J9qE86bbarc99fcbaia8J9c8J1:NfgiRbbag9cjjjj;ab:dg8J9qE86bbarc9:fcbaia8J9cg1:NfgiRbbag9cjjjja:dg8J9qE86bbarcufcbaia8J9ch1:NfgiRbbag9cjjjjz:dgg9qE86bbaiag9ca1:NfhixikaraiRblaiRbbghco4g8Ka8KciSg8KE86bbaqaofgrcGfaiclfa8Kfg8KRbbahcl4ciGg8La8LciSg8LE86bbarcVfa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc7fa8Ka8Lfg8KRbbahciGghahciSghE86bbarctfa8Kahfg8KRbbaiRbeghco4g8La8LciSg8LE86bbarc91fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc4fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc93fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc94fa8Kahfg8KRbbaiRbdghco4g8La8LciSg8LE86bbarc95fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc96fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc97fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc98fa8KahfghRbbaiRbigico4g8Ka8KciSg8KE86bbarc99faha8KfghRbbaicl4ciGg8Ka8KciSg8KE86bbarc9:faha8KfghRbbaicd4ciGg8Ka8KciSg8KE86bbarcufaha8KfgrRbbaiciGgiaiciSgiE86bbaraifhixdkaraiRbwaiRbbghcl4g8Ka8KcsSg8KE86bbaqaofgrcGfaicwfa8Kfg8KRbbahcsGghahcsSghE86bbarcVfa8KahfghRbbaiRbeg8Kcl4g8La8LcsSg8LE86bbarc7faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarctfaha8KfghRbbaiRbdg8Kcl4g8La8LcsSg8LE86bbarc91faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc4faha8KfghRbbaiRbig8Kcl4g8La8LcsSg8LE86bbarc93faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc94faha8KfghRbbaiRblg8Kcl4g8La8LcsSg8LE86bbarc95faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc96faha8KfghRbbaiRbvg8Kcl4g8La8LcsSg8LE86bbarc97faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc98faha8KfghRbbaiRbog8Kcl4g8La8LcsSg8LE86bbarc99faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc9:faha8KfghRbbaiRbrgicl4g8Ka8KcsSg8KE86bbarcufaha8KfgrRbbaicsGgiaicsSgiE86bbaraifhixekarai8Pbw83bwarai8Pbb83bbaiczfhikdnaoaC9pmbalcdfhlaoczfhraPai9RcL0mekkaoaC6moaimexokaCmva8FTmvkaqaAfhqa8Ecefg8Ecl9hmbkdndndndnawTmbasaYcd4fRbbgociGPlbedrbkaATmdazaYfh8Fazcjdfhhcbh8EaEhaina8FRbbhraahocbhlinaoahalfRbbgqce4cbaqceG9R7arfgr86bbaoadfhoaAalcefgl9hmbkaacefhaa8Fcefh8FahaAfhha8Ecefg8Ecl9hmbxikkaATmeazaYfhaazcjdfhhcbhoceh8EaKh8FinaEaofhlaa8Vbbhrcbhoinala8FaofRbbcwtahaofRbbgqVc;:FiGce4cbaqceG9R7arfgr87bbaladfhlaQaocefgofmbka8FaXfh8FcdhoaacdfhaahaXfhha8EceGhlcbh8EalmbxdkkaATmbaocl4h8EazaYfRbbhqcwhoa3hlinalRbbaotaqVhqalcefhlaocwfgoca9hmbkcbhhaEh8FaKhainazcjdfahfRbbhrcwhoaahlinalRbbaotarVhralaAfhlaocwfgoca9hmbkara8E94aq7hqcbhoa8Fhlinalaqao486bbalcefhlaocwfgoca9hmbka8Fadfh8FaacefhaahcefghaA9hmbkkaEclfhEa3clfh3aYclfgYad6mbkaza8AaAcufad2fadz:jjjjb8AaAaOfhOaihxaimbkc9:hoxdkcbc99aPax9RakSEhoxekc9:hokavcjqf8Kjjjjbaok:bsesu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecjez:kjjjb8Aav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhDaicefgiarfhqdndnaeci9pmbaqhexekcmcsawceSEhkcbhxcbhmaqhecbhlcbhoindndnaiRbbgrc;Ve0mbavc;abfaoarcu7gPcl4fcsGcitfgwydlhsawydbhzdndnarcsGgwak9pmbavalaPfcsGcdtfydbaxawEhraxawTgHfhxxekdnaeaD9nmbc9:hoxokdndnawcsSmbcehHamawcetfcWfhrxekaecefhrae8SbbgwcFeGhPdndnawcu9mmbarhexekaecvfheaPcFbGhPcrhwdninar8SbbgHcFbGawtaPVhPaHcu9kmearcefhrawcrfgwc8J9hmbxdkkarcefhekcehHaPce4cbaPceG9R7amfhrkarhmkavc;abfaocitfgwarBdbawasBdlavalcdtfarBdbavc;abfaocefcsGcitfgwazBdbawarBdlaocdfhoaHalfhldnadcd9hmbabar87elabas87edabaz87ebabcofhbxdkabarBdwabasBdlabazBdbabcxfhbxekdnarcpe0mbavalaDarcsGfRbbgwcl4gP9RcsGcdtfydbaxcefgsaPEhravalaw9RcsGcdtfydbasaPTgzfgsawcsGgPEhwaPThPdndnadcd9hmbabaw87elabar87edabax87ebcohHxekabawBdwabarBdlabaxBdbcxhHkavalcdtfaxBdbavc;abfaocitfgOarBdbaOaxBdlavalcefglcsGcdtfarBdbavc;abfaocefcsGcitfgOawBdbaOarBdlavalazfglcsGcdtfawBdbavc;abfaocdfcsGcitfgraxBdbarawBdlaocifhoabaHfhbalaPfhlasaPfhxxekdnaeaD9nmbc9:hoxlkaxcbaeRbbgwEgHarc;:eSgrfhsawcsGhOdndnawcl4gAmbascefhzxekashzavalaA9RcsGcdtfydbhskdndnaOmbazcefhxxekazhxavalaw9RcsGcdtfydbhzkdndnarTmbaecefhrxekaecdfhrae8SbegPcFeGhwdnaPcu9kmbaecofhHawcFbGhwcrhedninar8SbbgPcFbGaetawVhwaPcu9kmearcefhraecrfgec8J9hmbkaHhrxekarcefhrkawce4cbawceG9R7amfgmhHkdndnaAcsSmbarhwxekarcefhwar8SbbgecFeGhPdnaecu9kmbarcvfhsaPcFbGhPcrhedninaw8SbbgrcFbGaetaPVhParcu9kmeawcefhwaecrfgec8J9hmbkashwxekawcefhwkaPce4cbaPceG9R7amfgmhskdndnaOcsSmbawhexekawcefheaw8SbbgrcFeGhPdnarcu9kmbawcvfhzaPcFbGhPcrhrdninae8SbbgwcFbGartaPVhPawcu9kmeaecefhearcrfgrc8J9hmbkazhexekaecefhekaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabaz87elabas87edabaH87ebcohrxekabazBdwabasBdlabaHBdbcxhrkavc;abfaocitfgwasBdbawaHBdlavalcdtfaHBdbavc;abfaocefcsGcitfgwazBdbawasBdlavalcefglcsGcdtfasBdbavc;abfaocdfcsGcitfgwaHBdbawazBdlavalaATaAcsSVfglcsGcdtfazBdbalaOTaOcsSVfhlaocifhoabarfhbkaocsGhoalcsGhlaicefgiaq6mbkkcbc99aeaDSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk:4ioiue99dud99dud99dnaeTmbcbhiabhlindndnal8Uebgv:YgoJ:ji:1Salcof8UebgrciVgw:Y:vgDNJbbbZJbbb:;avcu9kEMgq:lJbbb9p9DTmbaq:Ohkxekcjjjj94hkkalclf8Uebhvalcdf8UebhxalarcefciGcetfak87ebdndnax:YgqaDNJbbbZJbbb:;axcu9kEMgm:lJbbb9p9DTmbam:Ohxxekcjjjj94hxkabaiarciGgkfcd7cetfax87ebdndnav:YgmaDNJbbbZJbbb:;avcu9kEMgP:lJbbb9p9DTmbaP:Ohvxekcjjjj94hvkalarcufciGcetfav87ebdndnawaw2:ZgPaPMaoaoN:taqaqN:tamamN:tgoJbbbbaoJbbbb9GE:raDNJbbbZMgD:lJbbb9p9DTmbaD:Ohrxekcjjjj94hrkalakcetfar87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk:Tvirud99eudndnadcl9hmbaeTmeindndnabRbbgiabcefgl8Sbbgvabcdfgo8Sbbgrf9R:YJbbuJabcifgwRbbgdce4adVgDcd4aDVgDcl4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax86bbdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao86bbdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai86bbdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad86bbabclfhbaecufgembxdkkaeTmbindndnab8Vebgiabcdfgl8Uebgvabclfgo8Uebgrf9R:YJbFu9habcofgw8Vebgdce4adVgDcd4aDVgDcl4aDVgDcw4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax87ebdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao87ebdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai87ebdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad87ebabcwfhbaecufgembkkk9teiucbcbyd:K:G:cjbgeabcifc98GfgbBd:K:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkk83dbcj:Gdk8Kbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbc:K:Gdkl8W:qbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuixkbbebeeddddilve9Weeeviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WbwY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbDl79IV9Rbqq:I9Dklbzik94evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaeai86b:q:W:cjbaecitab8Piw83i:q:G:cjbaecefgecjd9hmbkk:SBlEud97dur978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaialfgxar9RhodnadTgmmbavaoad;8qbbkaicefhPcj;abad9Uc;WFbGcjdadca0EhsdndndnadTmbaoadfhzcbhHinaeaH9nmdaxaP9RaD6miabaHad2fgOavcjdfasaeaH9RaHasfae6EgAaAcsfgoc9WGgCSEhXaPaDfhQaocl4cifcd4hLavcj;cbfaCcetfhKavcj;cbfaCci2fhYavcj;cbfaCfh8AcbhEaoc;ab6h3incbh5dnawTmbaPaEcd4fRbbh5kcbh8Eavcj;cbfh8Findndndndna5a8Ecet4ciGgoc9:fPdebdkaxaQ9RaC6mwdnaCTmbavcj;cbfa8EaC2faQaC;8qbbkaQaAfhQxdkaCTmeavcj;cbfa8EaC2fcbaC;8kbxekaxaQ9RaL6moaoclVcbawEhraQaLfhocbhidna3mbaxao9Rc;Gb6mbcbhlina8FalfhidndndndndndnaQalco4fRbbgqciGarfPDbedibledibkaipxbbbbbbbbbbbbbbbbpklbxlkaiaopbblaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLgacdp:meaapmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9oghpxiiiiiiiiiiiiiiiip8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaoclffa8JRb:q:W:cjbfhoxikaiaopbbwaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLpxssssssssssssssssp9oghpxssssssssssssssssp8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaocwffa8JRb:q:W:cjbfhoxdkaiaopbbbpklbaoczfhoxekaiaopbbdaoRbbggcitpbi:q:G:cjbagRb:q:W:cjbggpsaoRbeg8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbagaocdffa8JRb:q:W:cjbfhokdndndndndndnaqcd4ciGarfPDbedibledibkaiczfpxbbbbbbbbbbbbbbbbpklbxlkaiczfaopbblaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLgacdp:meaapmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9oghpxiiiiiiiiiiiiiiiip8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaoclffa8JRb:q:W:cjbfhoxikaiczfaopbbwaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLpxssssssssssssssssp9oghpxssssssssssssssssp8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaocwffa8JRb:q:W:cjbfhoxdkaiczfaopbbbpklbaoczfhoxekaiczfaopbbdaoRbbggcitpbi:q:G:cjbagRb:q:W:cjbggpsaoRbeg8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbagaocdffa8JRb:q:W:cjbfhokdndndndndndnaqcl4ciGarfPDbedibledibkaicafpxbbbbbbbbbbbbbbbbpklbxlkaicafaopbblaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLgacdp:meaapmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9oghpxiiiiiiiiiiiiiiiip8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaoclffa8JRb:q:W:cjbfhoxikaicafaopbbwaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLpxssssssssssssssssp9oghpxssssssssssssssssp8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaocwffa8JRb:q:W:cjbfhoxdkaicafaopbbbpklbaoczfhoxekaicafaopbbdaoRbbggcitpbi:q:G:cjbagRb:q:W:cjbggpsaoRbeg8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbagaocdffa8JRb:q:W:cjbfhokdndndndndndnaqco4arfPDbedibledibkaic8Wfpxbbbbbbbbbbbbbbbbpklbxlkaic8Wfaopbblaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLgacdp:meaapmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9oghpxiiiiiiiiiiiiiiiip8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsaap5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbaiaoclffaqRb:q:W:cjbfhoxikaic8Wfaopbbwaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLpxssssssssssssssssp9oghpxssssssssssssssssp8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsaap5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbaiaocwffaqRb:q:W:cjbfhoxdkaic8Wfaopbbbpklbaoczfhoxekaic8WfaopbbdaoRbbgicitpbi:q:G:cjbaiRb:q:W:cjbgipsaoRbegqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbaiaocdffaqRb:q:W:cjbfhokalc;abfhialcjefaC0meaihlaxao9Rc;Fb0mbkkdnaiaC9pmbaici4hlinaxao9RcK6mwa8FaifhqdndndndndndnaQaico4fRbbalcoG4ciGarfPDbedibledibkaqpxbbbbbbbbbbbbbbbbpkbbxlkaqaopbblaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLgacdp:meaapmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9oghpxiiiiiiiiiiiiiiiip8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spkbbagaoclffa8JRb:q:W:cjbfhoxikaqaopbbwaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLpxssssssssssssssssp9oghpxssssssssssssssssp8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spkbbagaocwffa8JRb:q:W:cjbfhoxdkaqaopbbbpkbbaoczfhoxekaqaopbbdaoRbbggcitpbi:q:G:cjbagRb:q:W:cjbggpsaoRbeg8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpkbbagaocdffa8JRb:q:W:cjbfhokalcdfhlaiczfgiaC6mbkkaohQaoTmoka8FaCfh8Fa8Ecefg8Ecl9hmbkdndndndnawTmbazaEcd4fRbbglciGPlbedwbkaCTmdaXaEfhlavaEfpbdbh8Kcbhoinalavcj;cbfaofpblbg8La8Aaofpblbg8MpmbzeHdOiAlCvXoQrLg8NaKaofpblbgyaYaofpblbg8PpmbzeHdOiAlCvXoQrLgIpmbezHdiOAlvCXorQLgacep9Taapxeeeeeeeeeeeeeeeeghp9op9Hp9rgaa8Kp9Ug8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp9Ug8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp9Ug8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp9Ug8Kp9Abbbaladfgla8Ka8NaIpmwDKYqk8AExm35Ps8E8Fgacep9Taaahp9op9Hp9rgap9Ug8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp9Ug8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp9Ug8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp9Ug8Kp9Abbbaladfgla8Ka8La8MpmwKDYq8AkEx3m5P8Es8Fg8Laya8PpmwKDYq8AkEx3m5P8Es8Fg8MpmbezHdiOAlvCXorQLgacep9Taaahp9op9Hp9rgap9Ug8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp9Ug8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp9Ug8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp9Ug8Kp9Abbbaladfgla8Ka8La8MpmwDKYqk8AExm35Ps8E8Fgacep9Taaahp9op9Hp9rgap9Ughp9Abbbaladfglahaaaapmlvorlvorlvorlvorp9Ughp9AbbbaladfglahaaaapmwDqkwDqkwDqkwDqkp9Ughp9AbbbaladfglahaaaapmxmPsxmPsxmPsxmPsp9Ug8Kp9AbbbaladfhlaoczfgoaC6mbxikkaCTmeaXaEfhlavaEfpbdbh8Kcbhoinalavcj;cbfaofpblbg8La8Aaofpblbg8MpmbzeHdOiAlCvXoQrLg8NaKaofpblbgyaYaofpblbg8PpmbzeHdOiAlCvXoQrLgIpmbezHdiOAlvCXorQLgacep:neaapxebebebebebebebebghp9op:bep9rgaa8Kp:oeg8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp:oeg8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp:oeg8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp:oeg8Kp9Abbbaladfgla8Ka8NaIpmwDKYqk8AExm35Ps8E8Fgacep:neaaahp9op:bep9rgap:oeg8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp:oeg8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp:oeg8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp:oeg8Kp9Abbbaladfgla8Ka8La8MpmwKDYq8AkEx3m5P8Es8Fg8Laya8PpmwKDYq8AkEx3m5P8Es8Fg8MpmbezHdiOAlvCXorQLgacep:neaaahp9op:bep9rgap:oeg8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp:oeg8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp:oeg8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp:oeg8Kp9Abbbaladfgla8Ka8La8MpmwDKYqk8AExm35Ps8E8Fgacep:neaaahp9op:bep9rgap:oeghp9Abbbaladfglahaaaapmlvorlvorlvorlvorp:oeghp9AbbbaladfglahaaaapmwDqkwDqkwDqkwDqkp:oeghp9AbbbaladfglahaaaapmxmPsxmPsxmPsxmPsp:oeg8Kp9AbbbaladfhlaoczfgoaC6mbxdkkaCTmbaXaEfhrcbhocbalcl4gl9Rc8FGhiavaEfpbdbhhinaravcj;cbfaofpblbg8Ka8Aaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaKaofpblbg8NaYaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLgaaip:Reaaalp:Tep9qgaahp9rghp9Abbbaradfgrahaaaapmlvorlvorlvorlvorp9rghp9AbbbaradfgrahaaaapmwDqkwDqkwDqkwDqkp9rghp9AbbbaradfgrahaaaapmxmPsxmPsxmPsxmPsp9rghp9Abbbaradfgraha8Ma8PpmwDKYqk8AExm35Ps8E8Fgaaip:Reaaalp:Tep9qgap9rghp9Abbbaradfgrahaaaapmlvorlvorlvorlvorp9rghp9AbbbaradfgrahaaaapmwDqkwDqkwDqkwDqkp9rghp9AbbbaradfgrahaaaapmxmPsxmPsxmPsxmPsp9rghp9Abbbaradfgraha8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLgaaip:Reaaalp:Tep9qgap9rghp9Abbbaradfgrahaaaapmlvorlvorlvorlvorp9rghp9AbbbaradfgrahaaaapmwDqkwDqkwDqkwDqkp9rghp9AbbbaradfgrahaaaapmxmPsxmPsxmPsxmPsp9rghp9Abbbaradfgraha8Ka8LpmwDKYqk8AExm35Ps8E8Fgaaip:Reaaalp:Tep9qgap9rghp9Abbbaradfgrahaaaapmlvorlvorlvorlvorp9rghp9AbbbaradfgrahaaaapmwDqkwDqkwDqkwDqkp9rghp9AbbbaradfgrahaaaapmxmPsxmPsxmPsxmPsp9rghp9AbbbaradfhraoczfgoaC6mbkkaEclfgEad6mbkdnaXavcjdf9hmbaAad2goTmbaOavcjdfao;8qbbkdnammbavaXaAcufad2fad;8qbbkaAaHfhHc9:hoaQhPaQmbxlkkaeTmbaDalfhrcbhocuhlinaralaD9RglfaD6mdasaeao9Raoasfae6Eaofgoae6mbkaial9RhPkcbc99axaP9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaokwbz:bjjjbkpPesu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecje;8kbav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhDaicefgiarfhqdndnaeci9pmbaqhexekcmcsawceSEhkcbhxcbhmaqhecbhlcbhoindndnaiRbbgrc;Ve0mbavc;abfaoarcu7gPcl4fcsGcitfgwydlhsawydbhzdndnarcsGgwak9pmbavalaPfcsGcdtfydbaxawEhraxawTgHfhxxekdnaeaD9nmbc9:hoxokdndnawcsSmbcehHamawcetfcWfhrxekaecefhrae8SbbgwcFeGhPdndnawcu9mmbarhexekaecvfheaPcFbGhPcrhwdninar8SbbgHcFbGawtaPVhPaHcu9kmearcefhrawcrfgwc8J9hmbxdkkarcefhekcehHaPce4cbaPceG9R7amfhrkarhmkavc;abfaocitfgwarBdbawasBdlavalcdtfarBdbavc;abfaocefcsGcitfgwazBdbawarBdlaocdfhoaHalfhldnadcd9hmbabar87elabas87edabaz87ebabcofhbxdkabarBdwabasBdlabazBdbabcxfhbxekdnarcpe0mbavalaDarcsGfRbbgwcl4gP9RcsGcdtfydbaxcefgsaPEhravalaw9RcsGcdtfydbasaPTgzfgsawcsGgPEhwaPThPdndnadcd9hmbabaw87elabar87edabax87ebcohHxekabawBdwabarBdlabaxBdbcxhHkavalcdtfaxBdbavc;abfaocitfgOarBdbaOaxBdlavalcefglcsGcdtfarBdbavc;abfaocefcsGcitfgOawBdbaOarBdlavalazfglcsGcdtfawBdbavc;abfaocdfcsGcitfgraxBdbarawBdlaocifhoabaHfhbalaPfhlasaPfhxxekdnaeaD9nmbc9:hoxlkaxcbaeRbbgwEgHarc;:eSgrfhsawcsGhOdndnawcl4gAmbascefhzxekashzavalaA9RcsGcdtfydbhskdndnaOmbazcefhxxekazhxavalaw9RcsGcdtfydbhzkdndnarTmbaecefhrxekaecdfhrae8SbegPcFeGhwdnaPcu9kmbaecofhHawcFbGhwcrhedninar8SbbgPcFbGaetawVhwaPcu9kmearcefhraecrfgec8J9hmbkaHhrxekarcefhrkawce4cbawceG9R7amfgmhHkdndnaAcsSmbarhwxekarcefhwar8SbbgecFeGhPdnaecu9kmbarcvfhsaPcFbGhPcrhedninaw8SbbgrcFbGaetaPVhParcu9kmeawcefhwaecrfgec8J9hmbkashwxekawcefhwkaPce4cbaPceG9R7amfgmhskdndnaOcsSmbawhexekawcefheaw8SbbgrcFeGhPdnarcu9kmbawcvfhzaPcFbGhPcrhrdninae8SbbgwcFbGartaPVhPawcu9kmeaecefhearcrfgrc8J9hmbkazhexekaecefhekaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabaz87elabas87edabaH87ebcohrxekabazBdwabasBdlabaHBdbcxhrkavc;abfaocitfgwasBdbawaHBdlavalcdtfaHBdbavc;abfaocefcsGcitfgwazBdbawasBdlavalcefglcsGcdtfasBdbavc;abfaocdfcsGcitfgwaHBdbawazBdlavalaATaAcsSVfglcsGcdtfazBdbalaOTaOcsSVfhlaocifhoabarfhbkaocsGhoalcsGhlaicefgiaq6mbkkcbc99aeaDSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk;Toio97eue97aec98Ghedndnadcl9hmbaeTmecbhdinababpbbbgicKp:RecKp:Sep;6eglaicwp:RecKp:Sep;6ealp;Geaiczp:RecKp:Sep;6egvp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgwp9op9rp;Keglpxbb;:9cbb;:9cbb;:9cbb;:9calalp;Meaoaop;Meavaravawp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFbbbFbbbFbbbFbbbp9oaipxbbbFbbbFbbbFbbbFp9op9qalavp;Mearp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaoavp;Mearp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgDaDpbbbgipxbbbbbbFFbbbbbbFFgwp9oabpbbbgoaipmbediwDqkzHOAKY8AEgvczp:Reczp:Sep;6eglaoaipmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eavczp:Sep;6egvp;Gealp;Gep;Kep;Legipxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgqp9op9rp;Keglpxb;:FSb;:FSb;:FSb;:FSalalp;Meaiaip;Meavaravaqp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbp9oaiavp;Mearp;Keczp:Rep9qgialavp;Mearp;KepxFFbbFFbbFFbbFFbbp9oglpmwDKYqk8AExm35Ps8E8Fp9qpkbbabaoawp9oaialpmbezHdiOAlvCXorQLp9qpkbbabcafhbadclfgdae6mbkkk;2ileue97euo97dnaec98GgiTmbcbheinabcKfpx:ji:1S:ji:1S:ji:1S:ji:1SabpbbbglabczfgvpbbbgopmlvorxmPsCXQL358E8Fgrczp:Segwpxibbbibbbibbbibbbp9qp;6egDp;NegqaDaDp;MegDaDp;KealaopmbediwDqkzHOAKY8AEgDczp:Reczp:Sep;6eglalp;MeaDczp:Sep;6egoaop;Mearczp:Reczp:Sep;6egrarp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jep;Mepxbbn0bbn0bbn0bbn0gDp;KepxFFbbFFbbFFbbFFbbgkp9oaqaop;MeaDp;Keczp:Rep9qgoaqalp;MeaDp;Keakp9oaqarp;MeaDp;Keczp:Rep9qgDpmwDKYqk8AExm35Ps8E8Fglp5eawclp:RegqpEi:T:j83ibavalp5baqpEd:T:j83ibabcwfaoaDpmbezHdiOAlvCXorQLgDp5eaqpEe:T:j83ibabaDp5baqpEb:T:j83ibabcafhbaeclfgeai6mbkkkuee97dnadcd4ae2c98GgeTmbcbhdinababpbbbgicwp:Recwp:Sep;6eaicep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbabczfhbadclfgdae6mbkkk:Sodw97euaec98Ghedndnadcl9hmbaeTmecbhdinabpxbbuJbbuJbbuJbbuJabpbbbgicKp:TeglaicYp:Tep9qgvcdp:Teavp9qgvclp:Teavp9qgop;6ep;Negvaicwp:RecKp:SegraipxFbbbFbbbFbbbFbbbgwp9ogDp:Uep;6ep;Mepxbbn0bbn0bbn0bbn0gqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9oavaDarp:Xeaiczp:RecKp:Segip:Uep;6ep;Meaqp;Keawp9op9qavaDaraip:Uep:Xep;6ep;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qavaoalcep:Rep9oalpxebbbebbbebbbebbbp9op9qp;6ep;Meaqp;KecKp:Rep9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgkpxbFu9hbFu9hbFu9hbFu9habpbbbglakpbbbgrpmlvorxmPsCXQL358E8Fgvczp:TegqavcHp:Tep9qgicdp:Teaip9qgiclp:Teaip9qgicwp:Teaip9qgop;6ep;NegialarpmbediwDqkzHOAKY8AEgDpxFFbbFFbbFFbbFFbbglp9ograDczp:Segwp:Ueavczp:Reczp:SegDp:Xep;6ep;Mepxbbn0bbn0bbn0bbn0gvp;Kealp9oaiarawaDp:Uep:Xep;6ep;Meavp;Keczp:Rep9qgwaiaoaqcep:Rep9oaqpxebbbebbbebbbebbbp9op9qp;6ep;Meavp;Keczp:ReaiaDarp:Uep;6ep;Meavp;Kealp9op9qgipmwDKYqk8AExm35Ps8E8FpkbbabawaipmbezHdiOAlvCXorQLpkbbabcafhbadclfgdae6mbkkk9teiucbcbydj:G:cjbgeabcifc98GfgbBdj:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkxebcj:Gdklz:zbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),a=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var r=WebAssembly.validate(t)?o(e):o(n),s,i=WebAssembly.instantiate(r,{}).then(function(y){s=y.instance,s.exports.__wasm_call_ctors()});function o(y){for(var x=new Uint8Array(y.length),w=0;w<y.length;++w){var g=y.charCodeAt(w);x[w]=g>96?g-97:g>64?g-39:g+4}for(var k=0,w=0;w<y.length;++w)x[k++]=x[w]<60?a[x[w]]:(x[w]-60)*64+x[++w];return x.buffer.slice(0,k)}function c(y,x,w,g,k,f,A){var P=y.exports.sbrk,S=g+3&-4,T=P(S*k),j=P(f.length),z=new Uint8Array(y.exports.memory.buffer);z.set(f,j);var R=x(T,g,k,j,f.length);if(R==0&&A&&A(T,S,k),w.set(z.subarray(T,T+g*k)),P(T-P(0)),R!=0)throw new Error("Malformed buffer data: "+R)}var d={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp",COLOR:"meshopt_decodeFilterColor"},l={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},m=[],h=0;function b(y){var x={object:new Worker(y),pending:0,requests:{}};return x.object.onmessage=function(w){var g=w.data;x.pending-=g.count,x.requests[g.id][g.action](g.value),delete x.requests[g.id]},x}function v(y){for(var x="self.ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(r)+"]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = "+M.name+";"+c.toString()+M.toString(),w=new Blob([x],{type:"text/javascript"}),g=URL.createObjectURL(w),k=m.length;k<y;++k)m[k]=b(g);for(var k=y;k<m.length;++k)m[k].object.postMessage({});m.length=y,URL.revokeObjectURL(g)}function p(y,x,w,g,k){for(var f=m[0],A=1;A<m.length;++A)m[A].pending<f.pending&&(f=m[A]);return new Promise(function(P,S){var T=new Uint8Array(w),j=++h;f.pending+=y,f.requests[j]={resolve:P,reject:S},f.object.postMessage({id:j,count:y,size:x,source:T,mode:g,filter:k},[T.buffer])})}function M(y){var x=y.data;self.ready.then(function(w){if(!x.id)return self.close();try{var g=new Uint8Array(x.count*x.size);c(w,w.exports[x.mode],g,x.count,x.size,x.source,w.exports[x.filter]),self.postMessage({id:x.id,count:x.count,action:"resolve",value:g},[g.buffer])}catch(k){self.postMessage({id:x.id,count:x.count,action:"reject",value:k})}})}return{ready:i,supported:!0,useWorkers:function(y){v(y)},decodeVertexBuffer:function(y,x,w,g,k){c(s,s.exports.meshopt_decodeVertexBuffer,y,x,w,g,s.exports[d[k]])},decodeIndexBuffer:function(y,x,w,g){c(s,s.exports.meshopt_decodeIndexBuffer,y,x,w,g)},decodeIndexSequence:function(y,x,w,g){c(s,s.exports.meshopt_decodeIndexSequence,y,x,w,g)},decodeGltfBuffer:function(y,x,w,g,k,f){c(s,s.exports[l[k]],y,x,w,g,s.exports[d[f]])},decodeGltfBufferAsync:function(y,x,w,g,k){return m.length>0?p(y,x,w,l[g],d[k]):i.then(function(){var f=new Uint8Array(y*x);return c(s,s.exports[l[g]],f,y,x,w,s.exports[d[k]]),f})}}})();var Ys=["KHR_mesh_quantization","KHR_texture_transform","KHR_materials_emissive_strength","KHR_materials_unlit","KHR_lights_punctual","KHR_materials_ior","KHR_materials_specular","KHR_materials_clearcoat","KHR_materials_transmission","EXT_meshopt_compression","KHR_meshopt_compression"],vn=["KHR_draco_mesh_compression","KHR_texture_basisu"],Qs=1179937895,Zs=1313821514,$s=5130562;async function xn(n,e={}){let t=e.fetch??globalThis.fetch;if(!t)throw new Error("glTF: no fetch implementation available");let a=await t(n);if(!a.ok)throw new Error(`glTF: failed to fetch ${n}: ${a.status} ${a.statusText}`);let r=await a.arrayBuffer();return si(r,ei(n),e)}function ei(n){let e=n.search(/[?#]/),t=e>=0?n.slice(0,e):n,a=t.lastIndexOf("/");return a>=0?t.slice(0,a+1):""}function ti(n,e){if(/^(data:|blob:|[a-z][a-z0-9+.-]*:\/\/)/i.test(n)||n.startsWith("/")||!e)return n;try{return new URL(n,e).href}catch{return e+n}}function ai(n){let e=n.indexOf(",");if(e<0)throw new Error("glTF: malformed data: URI");let t=n.slice(5,e),a=n.slice(e+1),r=/;base64$/i.test(t),s=t.replace(/;base64$/i,"").split(";")[0]||"application/octet-stream";if(r){let i=atob(a),o=new Uint8Array(i.length);for(let c=0;c<i.length;c++)o[c]=i.charCodeAt(c);return{bytes:o,mimeType:s}}return{bytes:new TextEncoder().encode(decodeURIComponent(a)),mimeType:s}}function ri(n){return n instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&n instanceof SharedArrayBuffer}function ni(n){if(ArrayBuffer.isView(n)){let r=n;n=r.buffer.slice(r.byteOffset,r.byteOffset+r.byteLength)}if(!ri(n))return{json:n};let e=new Uint8Array(n),t=new DataView(n);if(e.byteLength>=12&&t.getUint32(0,!0)===Qs){let r=t.getUint32(4,!0);if(r!==2)throw new Error(`glTF: unsupported GLB version ${r}`);let s=Math.min(t.getUint32(8,!0),e.byteLength),i=12,o,c;for(;i+8<=s;){let d=t.getUint32(i,!0),l=t.getUint32(i+4,!0);if(i+=8,i+d>s)throw new Error("glTF: GLB chunk overruns file");let m=e.subarray(i,i+d);l===Zs&&!o?o=JSON.parse(new TextDecoder().decode(m)):l===$s&&!c&&(c=m),i+=d+(4-d%4)%4}if(!o)throw new Error("glTF: GLB has no JSON chunk");return{json:o,glbBin:c}}let a=new TextDecoder().decode(e);return a.charCodeAt(0)===65279&&(a=a.slice(1)),{json:JSON.parse(a)}}async function si(n,e,t){let{json:a,glbBin:r}=ni(n);if(!a||typeof a!="object"||!a.asset)throw new Error('glTF: missing "asset" property \u2014 not a glTF 2.0 file');if(parseInt(String(a.asset.minVersion??a.asset.version??"2"),10)!==2)throw new Error(`glTF: unsupported version ${a.asset.version} (only 2.x)`);let i=a.extensionsUsed??[],o=a.extensionsRequired??[];for(let A of o){if(vn.includes(A))throw new Error(`glTF: required extension "${A}" is not supported by fondaineGL's loader (decompress the asset, e.g. with gltf-transform, first)`);if(!Ys.includes(A))throw new Error(`glTF: required extension "${A}" is not supported`)}let c=t.fetch??(typeof globalThis.fetch=="function"?globalThis.fetch.bind(globalThis):void 0),d=async A=>{if(A.startsWith("data:"))return ai(A);if(!c)throw new Error(`glTF: cannot load external resource "${A}" \u2014 no fetch available`);let P=ti(A,e),S=await c(P);if(!S.ok)throw new Error(`glTF: failed to fetch ${P}: ${S.status} ${S.statusText}`);return{bytes:new Uint8Array(await S.arrayBuffer()),mimeType:S.headers.get("content-type")??""}},l=await Promise.all((a.buffers??[]).map(async(A,P)=>{let S=A.extensions?.EXT_meshopt_compression??A.extensions?.KHR_meshopt_compression;if(A.uri===void 0&&S?.fallback)return new Uint8Array(A.byteLength);if(A.uri===void 0){if(P!==0||!r)throw new Error(`glTF: buffer ${P} has no uri and no GLB BIN chunk`);return r}let{bytes:T}=await d(A.uri);if(T.byteLength<A.byteLength)throw new Error(`glTF: buffer ${P} is ${T.byteLength} bytes, expected ${A.byteLength}`);return T})),m=(a.bufferViews??[]).filter(A=>A.extensions?.EXT_meshopt_compression||A.extensions?.KHR_meshopt_compression);if(m.length){await or.ready;for(let A of m){let P=A.extensions.EXT_meshopt_compression??A.extensions.KHR_meshopt_compression,S=l[P.buffer].subarray(P.byteOffset??0,(P.byteOffset??0)+P.byteLength),T=new Uint8Array(P.count*P.byteStride);or.decodeGltfBuffer(T,P.count,P.byteStride,S,P.mode,P.filter),l.push(T),A.buffer=l.length-1,A.byteOffset=0,A.byteLength=T.byteLength,P.mode==="ATTRIBUTES"&&(A.byteStride=P.byteStride),delete A.extensions.EXT_meshopt_compression,delete A.extensions.KHR_meshopt_compression}}let h={json:a,buffers:l},b=await Promise.all((a.images??[]).map(async(A,P)=>{if(A.bufferView!==void 0){let{bytes:j}=Kt(h,A.bufferView);return{name:A.name??`image${P}`,mimeType:A.mimeType??yn(j),data:j}}if(A.uri===void 0)throw new Error(`glTF: image ${P} has neither uri nor bufferView`);let{bytes:S,mimeType:T}=await d(A.uri);return{name:A.name??A.uri.slice(0,64),mimeType:A.mimeType??(T.startsWith("image/")?T:yn(S)),data:S}})),v=[];if((t.decodeImages??!0)&&typeof globalThis.createImageBitmap=="function"&&typeof Blob<"u"){let A=await Promise.all(b.map(P=>createImageBitmap(new Blob([P.data],{type:P.mimeType}),{colorSpaceConversion:"none",premultiplyAlpha:"none"})));v.push(...A)}let p=ui(a),M=(a.materials??[]).map((A,P)=>oi(a,P)),y=(a.meshes??[]).map((A,P)=>di(h,P,M)),x=hi(a,p),w=(a.skins??[]).map((A,P)=>{let S=A.joints.length,T;if(A.inverseBindMatrices!==void 0){if(T=Ee(h,A.inverseBindMatrices),T.length<S*16)throw new Error(`glTF: skin ${P} inverseBindMatrices has ${T.length/16} matrices for ${S} joints`);T.length>S*16&&(T=T.slice(0,S*16))}else{T=new Float32Array(S*16);for(let j=0;j<S;j++)T[j*16]=T[j*16+5]=T[j*16+10]=T[j*16+15]=1}return{name:A.name??`skin${P}`,joints:A.joints.slice(),inverseBindMatrices:T,skeleton:A.skeleton}}),g=(a.animations??[]).map((A,P)=>fi(h,P)),k=(a.cameras??[]).map((A,P)=>({name:A.name??`camera${P}`,type:A.type==="orthographic"?"orthographic":"perspective",perspective:A.perspective?{...A.perspective}:void 0,orthographic:A.orthographic?{...A.orthographic}:void 0})),f=(a.scenes??[]).map((A,P)=>({name:A.name??`scene${P}`,nodes:(A.nodes??[]).slice()}));return f.length===0&&x.length>0&&(f=[{name:"scene0",nodes:x.map((A,P)=>A.parent<0?P:-1).filter(A=>A>=0)}]),{meshes:y,materials:M,images:v,nodes:x,scenes:f,scene:a.scene??0,skins:w,animations:g,extensionsUsed:i.slice(),imageData:b,cameras:k,lights:p,extensionsRequired:o.slice()}}function yn(n){return n[0]===137&&n[1]===80&&n[2]===78&&n[3]===71?"image/png":n[0]===255&&n[1]===216?"image/jpeg":n[0]===82&&n[1]===73&&n[2]===70&&n[3]===70&&n[8]===87&&n[9]===69?"image/webp":n[0]===71&&n[1]===73&&n[2]===70?"image/gif":n[4]===102&&n[5]===116&&n[6]===121&&n[7]===112?"image/avif":"application/octet-stream"}var re=(n,e)=>typeof n=="number"&&Number.isFinite(n)?n:e,_e=(n,e)=>n?.extensions?.[e];function ii(n,e){let t=e!==void 0?n.samplers?.[e]:void 0,a=d=>d===ae.CLAMP_TO_EDGE?"clamp-to-edge":d===ae.MIRRORED_REPEAT?"mirror-repeat":"repeat",r=t?.minFilter,s=t?.magFilter,i=r===void 0||r>=ae.NEAREST_MIPMAP_NEAREST,o=r===ae.NEAREST||r===ae.NEAREST_MIPMAP_NEAREST||r===ae.NEAREST_MIPMAP_LINEAR?"nearest":"linear",c=r===ae.NEAREST_MIPMAP_NEAREST||r===ae.LINEAR_MIPMAP_NEAREST?"nearest":"linear";return{magFilter:s===ae.NEAREST?"nearest":"linear",minFilter:o,mipmap:i,mipmapFilter:c,wrapS:a(t?.wrapS),wrapT:a(t?.wrapT)}}function Ke(n,e){if(!e)return;let t=n.textures?.[e.index];if(!t)return;if(_e(t,"KHR_texture_basisu")&&t.source===void 0)throw new Error('glTF: extension "KHR_texture_basisu" is not supported (texture has no fallback source)');let a=t.source;if(a===void 0)for(let o of["EXT_texture_webp","EXT_texture_avif"]){let c=_e(t,o);if(c&&typeof c.source=="number"){a=c.source;break}}if(a===void 0)return;let r=e.texCoord??0,s,i=_e(e,"KHR_texture_transform");if(i){let o=i.offset,c=i.scale;s={offset:[re(o?.[0],0),re(o?.[1],0)],rotation:re(i.rotation,0),scale:[re(c?.[0],1),re(c?.[1],1)]},typeof i.texCoord=="number"&&(r=i.texCoord)}return{image:a,sampler:ii(n,t.sampler),texCoord:r,transform:s}}function oi(n,e){let t=n.materials[e],a=t.pbrMetallicRoughness??{},r=a.baseColorFactor??[1,1,1,1],s=t.emissiveFactor??[0,0,0],i=t.alphaMode==="MASK"||t.alphaMode==="BLEND"?t.alphaMode:"OPAQUE",o={name:t.name??`material${e}`,baseColorFactor:[re(r[0],1),re(r[1],1),re(r[2],1),re(r[3],1)],baseColorTexture:Ke(n,a.baseColorTexture),metallicFactor:re(a.metallicFactor,1),roughnessFactor:re(a.roughnessFactor,1),metallicRoughnessTexture:Ke(n,a.metallicRoughnessTexture),normalTexture:Ke(n,t.normalTexture),normalScale:re(t.normalTexture?.scale,1),occlusionTexture:Ke(n,t.occlusionTexture),occlusionStrength:re(t.occlusionTexture?.strength,1),emissiveTexture:Ke(n,t.emissiveTexture),emissiveFactor:[re(s[0],0),re(s[1],0),re(s[2],0)],emissiveStrength:1,alphaMode:i,alphaCutoff:re(t.alphaCutoff,.5),doubleSided:!!t.doubleSided,unlit:!!_e(t,"KHR_materials_unlit")},c=_e(t,"KHR_materials_emissive_strength");c&&(o.emissiveStrength=re(c.emissiveStrength,1));let d=_e(t,"KHR_materials_ior");d&&(o.ior=re(d.ior,1.5));let l=_e(t,"KHR_materials_specular");if(l){o.specularFactor=re(l.specularFactor,1);let b=l.specularColorFactor;o.specularColorFactor=[re(b?.[0],1),re(b?.[1],1),re(b?.[2],1)],o.specularTexture=Ke(n,l.specularTexture),o.specularColorTexture=Ke(n,l.specularColorTexture)}let m=_e(t,"KHR_materials_clearcoat");m&&(o.clearcoat={factor:re(m.clearcoatFactor,0),roughness:re(m.clearcoatRoughnessFactor,0)},o.clearcoatTexture=Ke(n,m.clearcoatTexture),o.clearcoatRoughnessTexture=Ke(n,m.clearcoatRoughnessTexture),o.clearcoatNormalTexture=Ke(n,m.clearcoatNormalTexture));let h=_e(t,"KHR_materials_transmission");return h&&(o.transmission=re(h.transmissionFactor,0),o.transmissionTexture=Ke(n,h.transmissionTexture)),o}function ci(n){for(let e=0;e+3<n.length;e+=4){let t=n[e]+n[e+1]+n[e+2]+n[e+3];if(t>1e-8){let a=1/t;n[e]*=a,n[e+1]*=a,n[e+2]*=a,n[e+3]*=a}else n[e]=1,n[e+1]=0,n[e+2]=0,n[e+3]=0}}function li(n,e,t){if(e===4)return n;let a=new Float32Array(t*4);for(let r=0;r<t;r++)a[r*4]=n[r*3],a[r*4+1]=n[r*3+1],a[r*4+2]=n[r*3+2],a[r*4+3]=1;return a}function bi(n,e,t,a){for(let P of Object.keys(e.extensions??{}))if(vn.includes(P))throw new Error(`glTF: mesh ${t} uses unsupported extension "${P}"`);let r=e.attributes;if(r.POSITION===void 0)throw new Error(`glTF: mesh ${t} primitive has no POSITION attribute`);let s=ja(n,r.POSITION),i=s.count,o=Ee(n,r.POSITION),c=r.NORMAL!==void 0?Ee(n,r.NORMAL):void 0,d=r.TANGENT!==void 0?Ee(n,r.TANGENT):void 0,l=r.TEXCOORD_0!==void 0?Ee(n,r.TEXCOORD_0):void 0,m=r.TEXCOORD_1!==void 0?Ee(n,r.TEXCOORD_1):void 0,h;if(r.COLOR_0!==void 0){let P=ja(n,r.COLOR_0);h=li(Ee(n,r.COLOR_0),jt(P),P.count)}let b;if(r.JOINTS_0!==void 0){let P=ir(n,r.JOINTS_0);b=new Uint16Array(P.length);for(let S=0;S<P.length;S++)b[S]=P[S]}let v=r.WEIGHTS_0!==void 0?Ee(n,r.WEIGHTS_0):void 0;v&&ci(v);let p;e.targets&&e.targets.length&&(p=e.targets.map(P=>({positions:P.POSITION!==void 0?Ee(n,P.POSITION):void 0,normals:P.NORMAL!==void 0?Ee(n,P.NORMAL):void 0,tangents:P.TANGENT!==void 0?Ee(n,P.TANGENT):void 0})));let M;if(e.indices!==void 0)M=ir(n,e.indices);else{M=new Uint32Array(i);for(let P=0;P<i;P++)M[P]=P}for(let P=0;P<M.length;P++)if(M[P]>=i)throw new Error(`glTF: mesh ${t} index ${M[P]} out of range (${i} vertices)`);let y=fn(e.mode??ae.TRIANGLES,M),x=y.indices,w=i,g=!1;if(!c&&y.topology==="triangle-list"){if(o=We(o,3,x),d&&(d=We(d,4,x)),l&&(l=We(l,2,x)),m&&(m=We(m,2,x)),h&&(h=We(h,4,x)),b&&(b=We(b,4,x)),v&&(v=We(v,4,x)),p){let P=x;p=p.map(S=>({positions:S.positions?We(S.positions,3,P):void 0,normals:S.normals?We(S.normals,3,P):void 0,tangents:S.tangents?We(S.tangents,3,P):void 0}))}w=x.length,x=new Uint32Array(w);for(let P=0;P<w;P++)x[P]=P;c=pn(o),g=!0}let k=e.material??-1,f=!1;if(!d&&c&&l&&y.topology==="triangle-list"&&k>=0){let P=a[k];if(P?.normalTexture){let S=P.normalTexture.texCoord===1&&m?m:l;d=hn(o,c,S,x),f=!0}}let A;return s.min&&s.max&&s.min.length>=3&&s.max.length>=3&&!s.sparse&&!s.normalized?A={min:[s.min[0],s.min[1],s.min[2]],max:[s.max[0],s.max[1],s.max[2]]}:A=gn(o),{positions:o,normals:c,tangents:d,uvs:l,uvs2:m,colors:h,joints:b,weights:v,indices:x,material:k,bounds:A,morphTargets:p,topology:y.topology,vertexCount:w,generatedNormals:g,generatedTangents:f}}function di(n,e,t){let a=n.json.meshes[e];return{name:a.name??`mesh${e}`,primitives:a.primitives.map(r=>bi(n,r,e,t)),weights:a.weights?.slice()}}function ui(n){return(_e(n,"KHR_lights_punctual")?.lights??[]).map(a=>{let r=a.type==="directional"||a.type==="spot"?a.type:"point",s=a.color,i={type:r,color:[re(s?.[0],1),re(s?.[1],1),re(s?.[2],1)],intensity:re(a.intensity,1)};if(typeof a.name=="string"&&(i.name=a.name),typeof a.range=="number"&&a.range>0&&(i.range=a.range),r==="spot"){let o=a.spot??{};i.innerConeAngle=re(o.innerConeAngle,0),i.outerConeAngle=re(o.outerConeAngle,Math.PI/4)}return i})}function mi(n){let e=Math.hypot(n[0],n[1],n[2]),t=Math.hypot(n[4],n[5],n[6]),a=Math.hypot(n[8],n[9],n[10]);n[0]*(n[5]*n[10]-n[6]*n[9])-n[4]*(n[1]*n[10]-n[2]*n[9])+n[8]*(n[1]*n[6]-n[2]*n[5])<0&&(e=-e);let s=e?1/e:0,i=t?1/t:0,o=a?1/a:0,c=n[0]*s,d=n[1]*s,l=n[2]*s,m=n[4]*i,h=n[5]*i,b=n[6]*i,v=n[8]*o,p=n[9]*o,M=n[10]*o,y,x,w,g,k=c+h+M;if(k>0){let A=Math.sqrt(k+1)*2;g=.25*A,y=(b-p)/A,x=(v-l)/A,w=(d-m)/A}else if(c>h&&c>M){let A=Math.sqrt(1+c-h-M)*2;g=(b-p)/A,y=.25*A,x=(d+m)/A,w=(v+l)/A}else if(h>M){let A=Math.sqrt(1+h-c-M)*2;g=(v-l)/A,y=(d+m)/A,x=.25*A,w=(b+p)/A}else{let A=Math.sqrt(1+M-c-h)*2;g=(d-m)/A,y=(v+l)/A,x=(b+p)/A,w=.25*A}let f=Math.hypot(y,x,w,g)||1;return{translation:[n[12],n[13],n[14]],rotation:[y/f,x/f,w/f,g/f],scale:[e,t,a]}}function hi(n,e){let a=(n.nodes??[]).map((r,s)=>{let i=[0,0,0],o=[0,0,0,1],c=[1,1,1];if(r.matrix&&r.matrix.length===16)({translation:i,rotation:o,scale:c}=mi(r.matrix));else{if(r.translation&&(i=[re(r.translation[0],0),re(r.translation[1],0),re(r.translation[2],0)]),r.rotation){let m=r.rotation,h=Math.hypot(m[0],m[1],m[2],m[3])||1;o=[m[0]/h,m[1]/h,m[2]/h,m[3]/h]}r.scale&&(c=[re(r.scale[0],1),re(r.scale[1],1),re(r.scale[2],1)])}let d={name:r.name??`node${s}`,children:(r.children??[]).slice(),parent:-1,mesh:r.mesh,skin:r.skin,camera:r.camera,translation:i,rotation:o,scale:c};r.weights&&(d.weights=r.weights.slice());let l=_e(r,"KHR_lights_punctual");return l&&typeof l.light=="number"&&e[l.light]&&(d.light={...e[l.light]}),d});return a.forEach((r,s)=>{for(let i of r.children){if(!a[i])throw new Error(`glTF: node ${s} references missing child ${i}`);if(a[i].parent>=0)throw new Error(`glTF: node ${i} has multiple parents`);a[i].parent=s}}),a}function fi(n,e){let t=n.json.animations[e],a=0,r=t.samplers.map((i,o)=>{let c=Ee(n,i.input),d=Ee(n,i.output),l=i.interpolation==="STEP"||i.interpolation==="CUBICSPLINE"?i.interpolation:"LINEAR",m=c.length,h=l==="CUBICSPLINE"?3:1,b=m>0?Math.round(d.length/(m*h)):jt(ja(n,i.output));if(m>0&&b*m*h!==d.length)throw new Error(`glTF: animation ${e} sampler ${o}: output length ${d.length} does not match ${m} keys`);return m>0&&(a=Math.max(a,c[m-1])),{input:c,output:d,interpolation:l,components:b}}),s=[];for(let i of t.channels){let o=i.target.path;i.target.node!==void 0&&(o!=="translation"&&o!=="rotation"&&o!=="scale"&&o!=="weights"||s.push({node:i.target.node,path:o,sampler:i.sampler}))}return{name:t.name??`animation${e}`,channels:s,samplers:r,duration:a}}function wn(n){return n+3&-4}function Mn(n,e={}){let t=[],a=0,r=[],s=[],i=[],o=[],c=[],d=new Map,l=(g,k)=>{let f=new Uint8Array(g.buffer,g.byteOffset,g.byteLength),A=a,P=wn(f.byteLength),S=new Uint8Array(P);return S.set(f),t.push(S),a+=P,r.push({buffer:0,byteOffset:A,byteLength:f.byteLength,...k?{target:k}:{}}),r.length-1},m=(g,k,f,A,P=!1)=>{let S=l(g,A),T=g.length/f,j={bufferView:S,componentType:g instanceof Float32Array?5126:5125,count:T,type:k};if(P){let z=Array(f).fill(1/0),R=Array(f).fill(-1/0);for(let I=0;I<T;I++)for(let L=0;L<f;L++){let E=g[I*f+L];E<z[L]&&(z[L]=E),E>R[L]&&(R[L]=E)}j.min=z,j.max=R}return s.push(j),s.length-1};for(let g of n){let k=g.object.mesh.source;if(!k)continue;let f=g.object.material,A=d.get(f);A===void 0&&(c.push({name:f.name,pbrMetallicRoughness:{baseColorFactor:Array.from(f.baseColor),metallicFactor:f.metallic,roughnessFactor:f.roughness},doubleSided:f.doubleSided,...f.alphaMode==="mask"?{alphaMode:"MASK",alphaCutoff:f.alphaCutoff}:{}}),A=c.length-1,d.set(f,A));let P={POSITION:m(Float32Array.from(k.positions),"VEC3",3,34962,!0),NORMAL:m(Float32Array.from(k.normals),"VEC3",3,34962)};k.uvs&&(P.TEXCOORD_0=m(Float32Array.from(k.uvs),"VEC2",2,34962)),k.tangents&&(P.TANGENT=m(Float32Array.from(k.tangents),"VEC4",4,34962));let S=m(Uint32Array.from(k.indices),"SCALAR",1,34963);i.push({name:g.name,primitives:[{attributes:P,indices:S,material:A}]}),o.push({name:g.name,mesh:i.length-1,matrix:Array.from(g.object.transform)})}let h={asset:{version:"2.0",generator:e.generator??"fondaine oAxis"},scene:0,scenes:[{nodes:o.map((g,k)=>k)}],nodes:o,meshes:i,materials:c,accessors:s,bufferViews:r,buffers:[{byteLength:a}]},b=new TextEncoder().encode(JSON.stringify(h)),v=wn(b.byteLength),p=20+v+8+a,M=new ArrayBuffer(p),y=new DataView(M),x=new Uint8Array(M);y.setUint32(0,1179937895,!0),y.setUint32(4,2,!0),y.setUint32(8,p,!0),y.setUint32(12,v,!0),y.setUint32(16,1313821514,!0),x.set(b,20);for(let g=b.byteLength;g<v;g++)x[20+g]=32;let w=20+v;y.setUint32(w,a,!0),y.setUint32(w+4,5130562,!0),w+=8;for(let g of t)x.set(g,w),w+=g.byteLength;return M}function pi(n){return F.fromRotationTranslationScale(F.create(),n.rotation,n.translation,n.scale)}function cr(n){let e=n.nodes.map(()=>F.create()),t=(a,r)=>{let s=pi(n.nodes[a]);r?F.multiply(e[a],r,s):F.copy(e[a],s);for(let i of n.nodes[a].children)t(i,e[a])};for(let a=0;a<n.nodes.length;a++)n.nodes[a].parent<0&&t(a,null);return e}function za(n,e,t={}){let a=n.textures,r=new Map,s=(b,v,p=!1)=>{if(!b)return null;let M=e.images[b.image];if(!M)return null;let y=`${b.image}|${v?1:0}`,x=r.get(y);return x||(x=a.fromImage(M,{srgb:v,normalMap:p,label:e.imageData[b.image]?.name}),r.set(y,x)),x},i=e.materials.map((b,v)=>{let p=b.metallicRoughnessTexture,M=!!b.occlusionTexture&&!!p&&b.occlusionTexture.image===p.image,y=s(p??b.occlusionTexture,!1),x=b.baseColorTexture?.transform,w=new ue({name:b.name||`gltf-mat-${v}`,baseColorMap:s(b.baseColorTexture,!0),normalMap:s(b.normalTexture,!1,!0),ormMap:y,emissiveMap:s(b.emissiveTexture,!0),baseColor:[...b.baseColorFactor],metallic:b.metallicFactor,roughness:b.roughnessFactor,normalScale:b.normalScale,occlusionStrength:M||!p&&b.occlusionTexture?b.occlusionStrength:0,emissive:b.emissiveFactor,emissiveLuminance:b.emissiveFactor[0]+b.emissiveFactor[1]+b.emissiveFactor[2]>0?100*(b.emissiveStrength??1):0,alphaMode:b.alphaMode==="MASK"?"mask":b.alphaMode==="BLEND"?"blend":"opaque",alphaCutoff:b.alphaCutoff,doubleSided:b.doubleSided,unlit:b.unlit,uvScale:x?x.scale:[1,1],uvOffset:x?x.offset:[0,0],uvRotation:x?x.rotation:0,specular:b.specularFactor!==void 0?.5*b.specularFactor:.5});return p&&!M&&!b.occlusionTexture&&(w.occlusionStrength=0),t.material&&(w=t.material(w,v)),w}),o=new ue({name:"gltf-default",baseColor:[.8,.8,.8,1],roughness:.6,metallic:0}),c=cr(e),d=[],l=new Map,m=[1/0,1/0,1/0],h=[-1/0,-1/0,-1/0];return e.nodes.forEach((b,v)=>{if(b.mesh!==void 0)for(let p of e.meshes[b.mesh].primitives){if(p.topology!=="triangle-list")continue;let M=l.get(p);if(!M){let x=new de(p.positions,p.normals??new Float32Array(p.positions.length),p.uvs??new Float32Array(p.vertexCount*2),p.indices);p.tangents&&(x.tangents=p.tangents),p.joints&&p.weights&&(x.joints=p.joints,x.weights=p.weights),M=new me(n.dev,x.tangents?x:x.computeTangents(),{label:`${e.meshes[b.mesh].name}`,keepSource:t.keepSource}),l.set(p,M)}let y=c[v];d.push({node:v,nodeName:b.name,mesh:M,material:p.material>=0?i[p.material]:o,world:y,skinned:b.skin!==void 0&&!!p.joints,primitive:p});for(let x=0;x<8;x++){let w=[x&1?p.bounds.max[0]:p.bounds.min[0],x&2?p.bounds.max[1]:p.bounds.min[1],x&4?p.bounds.max[2]:p.bounds.min[2]],g=y[0]*w[0]+y[4]*w[1]+y[8]*w[2]+y[12],k=y[1]*w[0]+y[5]*w[1]+y[9]*w[2]+y[13],f=y[2]*w[0]+y[6]*w[1]+y[10]*w[2]+y[14];m[0]=Math.min(m[0],g),m[1]=Math.min(m[1],k),m[2]=Math.min(m[2],f),h[0]=Math.max(h[0],g),h[1]=Math.max(h[1],k),h[2]=Math.max(h[2],f)}}}),{asset:e,drawables:d,materials:i,nodeWorld:c,bounds:{min:m,max:h}}}function kn(n,e,t=F.create(),a={}){return e.drawables.map(r=>{let s=new ge(r.mesh,r.material,F.multiply(F.create(),t,r.world));return s.castShadow=a.castShadow??!0,s.viewmodel=a.viewmodel??!1,n.add(s),s})}var wb=D.create(),Mb=D.create(),kb=D.create();var Pb=new Float32Array(64);var jb=F.create(),zb=F.create();var Ib={t:new Float32Array(3),r:new Float32Array(4),s:new Float32Array(3)},Lb=new Int32Array(1024);var Nb=D.create(),Ub=D.create(),Cb=D.create(),Bb=new Float32Array(4),Db=new Float32Array(4);var qb=F.create(),Wb=F.create(),Kb=F.create(),_b=u.create(),Jb=u.create(),Xb=u.create(),Yb=u.create(),Qb=u.create(),Zb=u.create(),$b=u.create(),ed=u.create(),td=u.create(),ad=u.create(),rd=D.create(),nd=D.create(),sd=D.create(),id=D.create(),od=D.create(),cd=u.create(1,0,0),ld=u.create(0,0,1);function Me(n,e,t=.0015,a=[]){return at(n,e,{bevel:t,bevelSegments:2,holes:a}).rotateY(Math.PI/2)}function Qe(n,e,t,a=8e-4,r=[]){return at(n,e,{bevel:a,bevelSegments:2,holes:r}).translate(0,0,t)}function Se(n,e,t,a=0,r=0,s=28){let i=Math.abs(t-e);return tt(n,n,i,s).rotateX(Math.PI/2).translate(r,a,(e+t)/2)}function Te(n,e,t,a,r,s=16){return tt(n,n,e,s).rotateZ(Math.PI/2).translate(t,a,r)}function vt(n,e,t,a,r,s=16){return tt(n,n,e,s).translate(t,a,r)}function xe(n,e,t,a,r,s=20){return tt(n,n,e,s).rotateX(Math.PI/2).translate(t,a,r)}function Je(n,e,t=0,a=32){return Pe(n,a).rotateX(-Math.PI/2).translate(0,t,e)}function Ia(n,e,t,a,r=24){return Pe(n,r).rotateZ(-Math.PI/2).translate(e,t,a)}function Ze(n,e,t,a,r,s="hex",i=16){let o=n*.55,c=[[0,0],[n,0],[n,o*.5],[n*.82,o*.9],[n*.45,o],[0,o]],d=Pe(c,i,40);if(s==="hex"){let l=n*.5,m=o*.6,h=Array.from({length:6},(b,v)=>[Math.cos(v/6*Math.PI*2)*l,Math.sin(v/6*Math.PI*2)*l]);d=de.merge([d,at(h,m,{}).rotateX(-Math.PI/2).translate(0,o-m/2+2e-5,0).flipWinding()])}else s==="slot"&&(d=de.merge([d,at([[-n*.8,-n*.12],[n*.8,-n*.12],[n*.8,n*.12],[-n*.8,n*.12]],o*.5,{}).rotateX(-Math.PI/2).translate(0,o-o*.25+2e-5,0).flipWinding()]));return d.rotateZ(r>0?-Math.PI/2:Math.PI/2).translate(e,t,a)}var Ne=class{pts=[];smooth=[];nrm=[];pt(e,t,a=!1,r=null){return this.pts.push([e,t]),this.smooth.push(a),this.nrm.push(r),this}arc(e,t,a,r,s,i=3){let o=s>=r?1:-1;for(let c=0;c<=i;c++){let d=r+(s-r)*c/i;this.pt(e+Math.cos(d)*a,t+Math.sin(d)*a,!0,[Math.cos(d)*o,Math.sin(d)*o])}return this}append(e){return this.pts.push(...e.pts),this.smooth.push(...e.smooth),this.nrm.push(...e.nrm??e.pts.map(()=>null)),this}done(){return{pts:this.pts,smooth:this.smooth,nrm:this.nrm}}};function Re(n,e,t,a=3,r=0,s=0){let i=new Ne,o=Math.min(t,n/2-1e-6,e/2-1e-6),c=r-n/2+o,d=r+n/2-o,l=s-e/2+o,m=s+e/2-o;return i.arc(d,l,o,-Math.PI/2,0,a).arc(d,m,o,0,Math.PI/2,a).arc(c,m,o,Math.PI/2,Math.PI,a).arc(c,l,o,Math.PI,Math.PI*1.5,a),i.done()}function vi(n,e,t=e,a=0,r=0){return{pts:n.pts.map(([s,i])=>[a+(s-a)*e,r+(i-r)*t]),smooth:n.smooth.slice(),nrm:Math.abs(e-t)<1e-9?n.nrm?.slice():void 0}}function Ue(n,e={}){if(n.length<2)throw new Error("loft needs \u2265 2 stations");let t=0;{let y=n[0].prof.pts;for(let x=0,w=y.length-1;x<y.length;w=x++)t+=(y[w][0]-y[x][0])*(y[w][1]+y[x][1])}t<0&&(n=n.map(y=>({...y,prof:{pts:[...y.prof.pts].reverse(),smooth:[...y.prof.smooth].reverse(),nrm:y.prof.nrm?[...y.prof.nrm].reverse().map(x=>x?[-x[0],-x[1]]:null):void 0}})));let a=n.length,r=n[0].prof.pts.length;for(let y of n)if(y.prof.pts.length!==r)throw new Error(`loft: profile point count mismatch (${y.prof.pts.length} vs ${r})`);let s=n[a-1].z>=n[0].z?1:-1,i=(y,x)=>{let w=n[y],[g,k]=w.prof.pts[x],f=w.z;return w.shear&&(f+=w.shear*(k-(w.shearY0??0))),w.shearX&&(f+=w.shearX*(g-(w.shearX0??0))),[g,k,f]},o=[];for(let y=0;y<a-1;y++){let x=new Float64Array(r*3);for(let w=0;w<r;w++){let g=(w+1)%r,k=i(y,w),f=i(y,g),A=i(y+1,g),P=i(y+1,w),S=[k,f,A,P],T=0,j=0,z=0;for(let I=0;I<4;I++){let L=S[I],E=S[(I+1)%4];T+=(L[1]-E[1])*(L[2]+E[2]),j+=(L[2]-E[2])*(L[0]+E[0]),z+=(L[0]-E[0])*(L[1]+E[1])}let R=Math.hypot(T,j,z);R>1e-14&&(x[w*3]=T/R*s,x[w*3+1]=j/R*s,x[w*3+2]=z/R*s)}o.push(x)}let c=[],d=[],l=[],m=[],h=(y,x,w,g)=>(c.push(y[0],y[1],y[2]),d.push(x[0],x[1],x[2]),l.push(w,g),c.length/3-1),b=(y,x,w,g,k)=>{let f=n[y+x].prof.nrm?.[w];if(f){let R=i(y,w),I=i(y+1,w),L=I[0]-R[0],E=I[1]-R[1],N=I[2]-R[2],O=x===0?y-1:y+1;if((x===0&&n[y].smooth||x===1&&n[y+1]?.smooth)&&O>=0&&O<a-1){let B=i(O,w),J=i(O+1,w);L+=J[0]-B[0],E+=J[1]-B[1],N+=J[2]-B[2]}let C=Math.hypot(L,E,N),U=f[0],q=f[1],V=0;if(C>1e-12){L/=C,E/=C,N/=C;let B=U*L+q*E;U-=L*B,q-=E*B,V-=N*B}let K=Math.hypot(U,q,V)||1;return[U/K,q/K,V/K]}let A=0,P=0,S=0,T=(R,I)=>{if(R<0||R>=a-1)return;let L=o[R];A+=L[I*3],P+=L[I*3+1],S+=L[I*3+2]},j=[y];x===0&&n[y].smooth&&j.push(y-1),x===1&&n[y+1]?.smooth&&j.push(y+1);for(let R of j)T(R,g),k&&T(R,g===w?(w+r-1)%r:w);let z=Math.hypot(A,P,S);if(z<1e-9){let R=o[y],I=Math.hypot(R[g*3],R[g*3+1],R[g*3+2])||1;return[R[g*3]/I,R[g*3+1]/I,R[g*3+2]/I]}return[A/z,P/z,S/z]},v=new Float64Array(r+1);for(let y=0;y<r;y++){let x=n[0].prof.pts[y],w=n[0].prof.pts[(y+1)%r];v[y+1]=v[y]+Math.hypot(w[0]-x[0],w[1]-x[1])}let p=e.v0??0;for(let y=0;y<a-1;y++){let x=n[y],w=n[y+1],g=Math.abs(w.z-x.z);for(let k=0;k<r;k++){let f=(k+1)%r,A=o[y];if(A[k*3]===0&&A[k*3+1]===0&&A[k*3+2]===0)continue;let P=x.prof.smooth[k],S=x.prof.smooth[f],T=h(i(y,k),b(y,0,k,k,P),v[k],p),j=h(i(y,f),b(y,0,f,k,S),v[k+1],p),z=h(i(y+1,f),b(y,1,f,k,S),v[k+1],p+g),R=h(i(y+1,k),b(y,1,k,k,P),v[k],p+g);s>0?m.push(T,j,z,T,z,R):m.push(T,z,j,T,R,z)}p+=g}let M=(y,x)=>{let w=n[y].prof.pts,g=Ja(w),k=c.length/3;for(let f=0;f<r;f++)h(i(y,f),[0,0,x],w[f][0],w[f][1]);for(let f=0;f<g.length;f+=3)x>0?m.push(k+g[f],k+g[f+1],k+g[f+2]):m.push(k+g[f],k+g[f+2],k+g[f+1])};return e.capStart!==!1&&M(0,-s),e.capEnd!==!1&&M(a-1,s),new de(c,d,l,m)}function xt(n,e,t,a={}){return Ue([{z:e,prof:n},{z:t,prof:n}],a)}function An(n,e,t,a,r,s=0,i=0,o={}){let c=a>=t?1:-1,d=r.map(([m,h])=>c>0?[Math.min(m,h),Math.max(m,h)]:[Math.max(m,h),Math.min(m,h)]).sort((m,h)=>(m[0]-h[0])*c),l=[{z:t,prof:n}];for(let[m,h]of d)l.push({z:m,prof:n,shear:s,shearY0:i},{z:m,prof:e,shear:s,shearY0:i},{z:h,prof:e,shear:s,shearY0:i},{z:h,prof:n,shear:s,shearY0:i});return l.push({z:a,prof:n}),Ue(l,o)}function Pn(n,e,t=[0,0,-1],a=()=>[1,1],r={}){let s=e.length,i=[0];for(let p=1;p<s;p++)i.push(i[p-1]+Math.hypot(e[p][0]-e[p-1][0],e[p][1]-e[p-1][1],e[p][2]-e[p-1][2]));let o=i[s-1],c=e.map((p,M)=>{let[y,x]=a(i[M]/o);return{z:i[M],prof:vi(n,y,x),smooth:M>0}}),d=Ue(c,r),l=e.map((p,M)=>{let y=e[Math.max(0,M-1)],x=e[Math.min(s-1,M+1)],w=[x[0]-y[0],x[1]-y[1],x[2]-y[2]],g=Math.hypot(w[0],w[1],w[2])||1;w=w.map(T=>T/g);let k=t,f=k[0]*w[0]+k[1]*w[1]+k[2]*w[2],A=[k[0]-w[0]*f,k[1]-w[1]*f,k[2]-w[2]*f],P=Math.hypot(A[0],A[1],A[2])||1;A=A.map(T=>T/P);let S=[A[1]*w[2]-A[2]*w[1],A[2]*w[0]-A[0]*w[2],A[0]*w[1]-A[1]*w[0]];return{p,t:w,x:S,y:A}}),m=(p,M,y)=>{let x=0;for(;x<s-2&&i[x+1]<y-1e-9;)x++;let w=l[x],g=l[Math.min(s-1,x+1)],k=i[x+1]-i[x]||1,f=Math.max(0,Math.min(1,(y-i[x])/k)),A=(j,z)=>[j[0]+(z[0]-j[0])*f,j[1]+(z[1]-j[1])*f,j[2]+(z[2]-j[2])*f],P=A(w.p,g.p),S=A(w.x,g.x),T=A(w.y,g.y);return[P[0]+S[0]*p+T[0]*M,P[1]+S[1]*p+T[1]*M,P[2]+S[2]*p+T[2]*M]},h=p=>{let M=0;for(;M<s-2&&i[M+1]<p-1e-9;)M++;let y=l[M],x=l[Math.min(s-1,M+1)],w=i[M+1]-i[M]||1,g=Math.max(0,Math.min(1,(p-i[M])/w)),k=(f,A)=>[f[0]+(A[0]-f[0])*g,f[1]+(A[1]-f[1])*g,f[2]+(A[2]-f[2])*g];return{x:k(y.x,x.x),y:k(y.y,x.y),t:k(y.t,x.t)}},b=d.positions,v=d.normals;for(let p=0;p<b.length;p+=3){let M=h(b[p+2]),y=m(b[p],b[p+1],b[p+2]),x=v[p],w=v[p+1],g=v[p+2],k=M.x[0]*x+M.y[0]*w+M.t[0]*g,f=M.x[1]*x+M.y[1]*w+M.t[1]*g,A=M.x[2]*x+M.y[2]*w+M.t[2]*g,P=Math.hypot(k,f,A)||1;b[p]=y[0],b[p+1]=y[1],b[p+2]=y[2],v[p]=k/P,v[p+1]=f/P,v[p+2]=A/P}return d}var zt=class{constructor(e){this.renderer=e}buckets=new Map;triangles=0;add(e,t,a={}){let r=`${t.id}|${a.magazine?1:0}${a.bolt?1:0}${a.trigger?1:0}${a.selector?1:0}${a.charge?1:0}`,s=this.buckets.get(r)??{m:t,geoms:[],flags:a};return s.geoms.push(e.tangents?e:e.computeTangents()),this.triangles+=e.triangleCount,this.buckets.set(r,s),this}finish(){let e=[];for(let t of this.buckets.values()){let a=new ge(new me(this.renderer.dev,de.merge(t.geoms),{label:t.m.name,keepSource:!0}),t.m);e.push({object:a,local:F.create(),...t.flags})}return e}};var je={textureSize:2048,detail:1.5},Sn="fondaine.oaxis.settings";try{let n=typeof localStorage<"u"?localStorage.getItem(Sn):null;n&&Object.assign(je,JSON.parse(n))}catch{}function Tn(n){let e=n.scope(rt.oaxis),t=()=>{try{localStorage.setItem(Sn,JSON.stringify(je))}catch{}};e.number("Models",je,"textureSize",{label:"Texture resolution",min:256,max:4096,step:256,unit:"px",help:"Procedural PBR texture size for weapons/props. Applies on reload (load time grows with it).",onChange:t}).number("Models",je,"detail",{label:"Geometry detail",min:.5,max:3,step:.25,help:"Radial segments and bevel smoothness multiplier. Applies on reload.",onChange:t})}function ee(n){return Math.max(6,Math.round(n*je.detail))}function xi(n,e){try{if(typeof document<"u"){let t=document.createElement("canvas");return t.width=n,t.height=e,t}if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(n,e)}catch{}return null}function nt(n,e,t,a,r={}){let s=r.px??1024,i=s,o=Math.max(16,Math.round(s*a/t)),c=xi(i,o);if(!c)return null;let d=c.getContext("2d");if(!d)return null;d.clearRect(0,0,i,o);let l=e.length,m=o/l,h=Math.floor(m*.62);d.fillStyle="#ffffff",d.strokeStyle="#ffffff",d.textBaseline="middle",d.textAlign=r.align??"left",d.font=`${r.font??"bold"} ${h}px "Arial Narrow", "DejaVu Sans Condensed", "Liberation Sans Narrow", Arial, sans-serif`;let b=(r.tracking??.08)*h,v=r.align==="center"?i/2:r.align==="right"?i-h*.3:h*.3;for(let T=0;T<l;T++){let j=m*(T+.5),z=e[T],R=[...z].map(E=>d.measureText(E).width),I=R.reduce((E,N)=>E+N,0)+b*(z.length-1),L=r.align==="center"?v-I/2:r.align==="right"?v-I:v;d.textAlign="left";for(let E=0;E<z.length;E++)d.fillText(z[E],L,j),(r.weight??.08)>0&&(d.lineWidth=Math.max(1,h*(r.weight??.08)*.5),d.strokeText(z[E],L,j)),L+=R[E]+b}let M=d.getImageData(0,0,i,o).data,y=r.color??[.42,.42,.43],x=T=>Math.round(255*(T<=.0031308?T*12.92:1.055*Math.pow(T,1/2.4)-.055)),w=new Uint8Array(i*o*4),g=new Float32Array(i*o);for(let T=0;T<i*o;T++){let j=M[T*4+3]/255;g[T]=j,w[T*4]=x(y[0]),w[T*4+1]=x(y[1]),w[T*4+2]=x(y[2]),w[T*4+3]=Math.round(j*255)}let k=new Uint8Array(i*o*4),f=2.2;for(let T=0;T<o;T++)for(let j=0;j<i;j++){let z=T*i+j,R=g[T*i+Math.max(0,j-1)],I=g[T*i+Math.min(i-1,j+1)],L=g[Math.max(0,T-1)*i+j],E=g[Math.min(o-1,T+1)*i+j],N=(I-R)*f,O=-(E-L)*f,C=1,U=Math.hypot(N,O,C);N/=U,O/=U,C/=U,k[z*4]=Math.round((N*.5+.5)*255),k[z*4+1]=Math.round((O*.5+.5)*255),k[z*4+2]=Math.round((C*.5+.5)*255),k[z*4+3]=255}let A=n.textures,P=A.fromRGBA8(w,i,o,{srgb:!0,label:"engrave.albedo"}),S=A.fromRGBA8(k,i,o,{normalMap:!0,label:"engrave.normal"});return new ue({name:"engraving",baseColorMap:P,normalMap:S,baseColor:[1,1,1,1],roughness:r.roughness??.6,metallic:r.metallic??1,alphaMode:"mask",alphaCutoff:.35,normalScale:.8,uvScale:[1,1],sampler:A.sampler({address:"clamp-to-edge"})})}function st(n,e,t,a,r,s){let i=s<0?t-a/2:t+a/2,o=s<0?t+a/2:t-a/2,c=[n,e-r/2,i,n,e-r/2,o,n,e+r/2,o,n,e+r/2,i],d=[s,0,0,s,0,0,s,0,0,s,0,0],l=[0,1,1,1,1,0,0,0];return new de(c,d,l,[0,1,2,0,2,3]).computeTangents()}var Ea={slideRear:.088,slideFront:-.0975,slideTop:.0165,slideBottom:-.0115,slideWidth:.0255,frameWidth:.0265,sightLine:.0225,rearSightZ:.082,frontSightZ:-.088,slideTravel:.034,portZ0:-.003,portZ1:-.04},Rn=Math.PI*2;function wt(n){let e=Ea,t=n.hw??e.slideWidth/2,a=n.yb??e.slideBottom,r=n.yt??e.slideTop,s=n.chamfer??.0042,i=7e-4,o=5e-4,c=2,d=-.0055,l=.0105,m=n.grooveR??0,h=n.grooveL??0,b=!!n.port,v=n.xin??-t+.0075,p=n.portFloor??-5e-4,M=b?p:l,y=new Ne;y.arc(t-i,a+i,i,-Math.PI/2,0,c),y.pt(t,d).pt(t-m,d).pt(t-m,M).pt(t,M);let x=o*Math.tan(Math.PI/8),w=Math.SQRT1_2,g=(k,f,A,P)=>{let S=[k-A[0]*x,f-A[1]*x],T=[k+P[0]*x,f+P[1]*x],j=[-A[1],A[0]],z=[S[0]+j[0]*o,S[1]+j[1]*o],R=Math.atan2(S[1]-z[1],S[0]-z[0]),L=Math.atan2(T[1]-z[1],T[0]-z[0])-R;for(;L>Math.PI;)L-=Rn;for(;L<-Math.PI;)L+=Rn;y.arc(z[0],z[1],o,R,R+L,c)};if(b){for(let k=0;k<=c;k++)y.pt(t,p);for(let k=0;k<=c;k++)y.pt(v,p)}else g(t,r-s,[0,1],[-w,w]),g(t-s,r,[-w,w],[-1,0]);return y.pt(v,r,!b),g(-t+s,r,[-1,0],[-w,-w]),g(-t,r-s,[-w,-w],[0,-1]),y.pt(-t,l).pt(-t+h,l).pt(-t+h,d).pt(-t,d),y.arc(-t+i,a+i,i,Math.PI,Math.PI*1.5,c),y.done()}function La(n,e=0){let t=(n-.028)/.08850000000000001,a=.0185+.0229*t,r=.0725+.0161*t;a+=7e-4*(Math.exp(-((n-.067)**2)/(2*.006**2))+Math.exp(-((n-.089)**2)/(2*.006**2))),r+=.0016*Math.exp(-((n-.078)**2)/(2*.014**2))-6e-4*Math.exp(-((n-.034)**2)/(2*.008**2));let s=.0128+.0021*Math.sin(Math.PI*Math.min(1,Math.max(0,(n-.03)/.09)))**.7;s+=e,a-=e*.6,r+=e*.8;let i=Math.min(.0098,s-.0012),o=Math.min(.0068,s-.0012),c=new Ne;return c.arc(s-i,a+i,i,-Math.PI/2,0,5),c.arc(s-o,r-o,o,0,Math.PI/2,4),c.arc(-s+o,r-o,o,Math.PI/2,Math.PI,4),c.arc(-s+i,a+i,i,Math.PI,Math.PI*1.5,5),c.done()}function jn(n,e={}){let t=performance.now(),a=n.synth,r=e.textureSize??je.textureSize,s=Math.min(r,1024),i=Math.min(r,512),o=Ea,c=a.material("nitride",{size:r,tileMeters:.12,color:e.slideColor??[.036,.037,.04],wear:.18,roughness:.4,seed:41,bumpMm:.004},{name:"c15-slide-nitride",edgeWear:.75,edgeWearRadius:.0028}),d=a.material("machined",{size:s,tileMeters:.05,color:[.4,.4,.41],wear:.3,roughness:.42,seed:42,extra:1},{name:"c15-barrel",edgeWear:.3}),l=e.frameColor??[.03,.03,.032],m=a.material("polymer",{size:r,tileMeters:.12,color:l,extra:.35,roughness:.56,bumpMm:.12,seed:43},{name:"c15-frame",edgeWear:.3,edgeWearRadius:.0025}),h=a.material("polymer",{size:r,tileMeters:.16,color:l,extra:.97,roughness:.62,bumpMm:.4,seed:44},{name:"c15-stipple",edgeWear:.2}),b=a.material("parkerized",{size:s,tileMeters:.06,color:[.02,.02,.021],wear:.12,seed:45},{name:"c15-steel-black",edgeWear:.5,edgeWearRadius:.002}),v=a.material("parkerized",{size:s,tileMeters:.05,color:[.045,.046,.045],wear:.3,seed:46},{name:"c15-parkerized",edgeWear:.6,edgeWearRadius:.002}),p=a.material("machined",{size:i,tileMeters:.02,color:[.3,.3,.31],wear:.4,seed:47,extra:.4},{name:"c15-pins"}),M=a.material("nitride",{size:s,tileMeters:.1,color:[.034,.034,.036],wear:.3,roughness:.45,seed:48},{name:"c15-mag-body",edgeWear:.75,edgeWearRadius:.0025}),y=a.material("brass",{size:i,tileMeters:.03,seed:49},{name:"c15-brass"}),x=new ue({name:"c15-sight-white",baseColor:[.85,.85,.8,1],roughness:.5,metallic:0}),w=new ue({name:"c15-follower",baseColor:[.75,.22,.03,1],roughness:.6,metallic:0}),g=new ue({name:"c15-cavity",baseColor:[.02,.02,.02,1],roughness:.9,metallic:.3}),k=e.frontSight==="white"?x:new ue({name:"c15-tritium",baseColor:[.75,.9,.72,1],roughness:.3,metallic:0,emissive:[.35,1,.4],emissiveLuminance:40}),f=new zt(n),A={bolt:!0},P={magazine:!0},S=o.slideWidth/2;{let L=wt({}),E=wt({grooveL:6e-4,grooveR:6e-4}),N=wt({port:!0}),O=-.16,C=.0025,U=[];U.push({z:o.slideRear,prof:wt({yt:o.slideTop-.0035,chamfer:.0042})}),U.push({z:o.slideRear-.0035,prof:L});let q=(X,Z)=>U.push({z:X,prof:L,shear:O,shearY0:C},{z:X,prof:Z,shear:O,shearY0:C},{z:X-.0015,prof:Z,shear:O,shearY0:C},{z:X-.0015,prof:L,shear:O,shearY0:C});for(let X=0;X<8;X++)q(.0775-X*.0034,E);U.push({z:o.portZ0+.004,prof:L},{z:o.portZ0+.004,prof:wt({port:!0,portFloor:.0075})}),U.push({z:o.portZ0,prof:wt({port:!0,portFloor:.0075})},{z:o.portZ0,prof:N}),U.push({z:o.portZ1,prof:N},{z:o.portZ1,prof:L});for(let X=0;X<5;X++)q(-.0565-X*.0034,E);U.push({z:-.0905,prof:L}),U.push({z:o.slideFront,prof:wt({yb:-.0085,yt:.0118,hw:S-.0022,chamfer:.0042})}),f.add(Ue(U),c,A),f.add(xe(.0082,4e-4,0,0,o.slideFront-15e-5,ee(28)),g,A),f.add(xe(.0046,6e-4,0,-.0068,o.slideFront-15e-5,ee(20)),g,A),f.add(xe(.0031,.0012,0,-.0068,o.slideFront-2e-4,ee(16)),v,A),f.add(xe(.0011,5e-4,6e-4,0,o.portZ0+1e-4,10),g,A),f.add(ce(.0012,.0046,.0205,4e-4).translate(S-4e-4,.0048,o.portZ0+.0105),v,A),f.add(ce(9e-4,.0028,.004,3e-4).translate(S+3e-4,.0048,o.portZ0+.0185),v,A),f.add(Te(.0029,.0014,-S-1e-4,.004,.074,ee(16)),v,{bolt:!0,selector:!0}),f.add(ce(.0018,.0115,.0046,8e-4).translate(-S-.0012,.004+.0058,.074),v,{bolt:!0,selector:!0});for(let X=0;X<4;X++)f.add(fe(4e-4,4e-4,.004).translate(-S-.0021,.0065+X*.0022,.074),b,{bolt:!0,selector:!0});f.add(Qe(Re(.0178,.0218,.0018,3,0,.0018).pts,.0012,o.slideRear+6e-4,4e-4),v,A),f.add(xe(.0028,4e-4,0,6e-4,o.slideRear+.00125,14),g,A),f.add(xe(.0017,7e-4,0,6e-4,o.slideRear+.0013,12),p,A);let V=o.sightLine,K=o.slideTop-3e-4,B=.0019,J=.0031,Q=[[-.0105,K],[.0105,K],[.0105,V-.0014],[.0094,V],[B,V],[B,V-J],[-B,V-J],[-B,V],[-.0094,V],[-.0105,V-.0014]];f.add(Qe(Q,.0092,o.rearSightZ-.0046,5e-4),v,A);for(let X=0;X<5;X++)f.add(fe(.0186,5e-4,4e-4).translate(0,K+9e-4+X*.001,o.rearSightZ+1e-4),b,A);for(let X of[-1,1])f.add(xe(.0012,4e-4,X*.0058,V-.0021,o.rearSightZ+2e-4),x,A);f.add(Me([[-o.frontSightZ-.0028,o.slideTop-3e-4],[-o.frontSightZ+.0022,o.slideTop-3e-4],[-o.frontSightZ+.0022,o.sightLine],[-o.frontSightZ-.001,o.sightLine]],.0036,3e-4),v,A);let Y=o.sightLine-.0022;f.add(xe(.0013,3e-4,0,Y,o.frontSightZ+.00235),x,A),f.add(xe(75e-5,5e-4,0,Y,o.frontSightZ+.00245),k,A)}{let L=Re(.0168,.0246,.0042,4,6e-4,.0035);f.add(xt(L,o.portZ0-2e-4,o.portZ1-.003),d),f.add(xe(.0052,4e-4,6e-4,0,o.portZ0+5e-5,ee(20)),g),f.add(Je([[.0071,0],[.0071,.006],[.0082,.009],[.0082,0],[.0071,0]],o.portZ1-.003,0,ee(28)),d),f.add(Se(.0071,o.portZ1-.003,o.slideFront+6e-4,0,0,ee(32)),d),f.add(Je([[.0046,0],[.0062,0],[.0071,9e-4],[.0071,.0012],[.0046,.0012]],o.slideFront+4e-4,0,ee(32)),d),f.add(xe(.0046,4e-4,0,0,o.slideFront-4e-4),g)}let T=o.frameWidth;{let L=[[-.094,-.0132],[.0905,-.0132],[.094,-.0168],[.094,-.0262],[.051,-.0268],[.0485,-.0288],[-.0125,-.0288],[-.0185,-.0335],[-.0185,-.047],[-.0775,-.054],[-.0738,-.0305],[-.0845,-.0228],[-.0915,-.0168],[-.094,-.0138]];f.add(Me(L,T,.0022),m),f.add(Me([[-.0915,-.0133],[.0905,-.0133],[.0905,-.0117],[-.0915,-.0117]],T-.0028,4e-4),b);for(let B of[-1,1])f.add(fe(.0012,.0014,.028).translate(B*(T/2-.0014+3e-4),-.0125,-.055),p),f.add(fe(.0012,.0014,.02).translate(B*(T/2-.0014+3e-4),-.0125,.065),p);let E=[[.051,-.0262],[.0498,-.03],[.0485,-.036],[.0472,-.0532],[.0415,-.0588],[.03,-.06],[-.004,-.059],[-.013,-.052],[-.0188,-.0455],[-.0188,-.0262]],N=[[.0405,-.0315],[.0405,-.0495],[.037,-.0528],[-.0035,-.0528],[-.0102,-.047],[-.013,-.0315]];f.add(Me(E,.0112,.0032,[N]),m);let O=[];for(let B=.028;B<=.1125+1e-9;B+=.0035)O.push(B);let C=O.filter(B=>B<=.0455+1e-9),U=O.filter(B=>B>=.0455-1e-9),q=(B,J=[])=>Ue([...B.map((Q,Y)=>({z:Q,prof:La(Q),smooth:Y>0})),...J],{capStart:!1,capEnd:!1}).rotateX(Math.PI/2);f.add(q(C),m),f.add(q(U,[{z:.1145,prof:La(.1145,8e-4),smooth:!0},{z:.1165,prof:La(.1165,.0016),smooth:!1},{z:.1172,prof:La(.1165,.0014)}]),h);let V=xt(Re(.0236,.0356,.004,4),0,.105,{capEnd:!1}).flipWinding();f.add(V.rotateX(Math.PI/2-Math.atan2(.309,.951)).translate(0,-.0135,.0365),g);for(let B of[-1,1]){let J=at(Re(.0205,.052,.004,4).pts,.0012,{bevel:5e-4,bevelSegments:2});f.add(J.rotateY(B*Math.PI/2).transform(wi(B)),h)}{let B=new Ne().pt(.0105,-.0262).pt(.0105,-.0278).pt(.0083,-.03).pt(-.0083,-.03).pt(-.0105,-.0278).pt(-.0105,-.0262).done(),J=new Ne().pt(.0105,-.0262).pt(.0105,-.0266).pt(.0083,-.0266).pt(-.0083,-.0266).pt(-.0105,-.0266).pt(-.0105,-.0262).done();f.add(An(B,J,-.05,-.092,[[-.061,-.0662],[-.075,-.0802]]),m)}f.add(Te(.0016,T+6e-4,0,-.0215,-.01,14),p),f.add(Te(.0016,T+6e-4,0,-.018,-.034,14),p),f.add(Te(.0015,T+6e-4,0,-.0215,.072,14),p);for(let B of[-1,1]){f.add(ce(.0011,.0028,.0096,5e-4).translate(B*(T/2+4e-4),-.0165,-.044),v);for(let J=0;J<4;J++)f.add(fe(5e-4,.0032,5e-4).translate(B*(T/2+9e-4),-.0165,-.0405-J*.0022),b)}let K=[[.004,-.0138],[.0262,-.0138],[.03,-.015],[.032,-.0172],[.0282,-.0188],[.021,-.0176],[.012,-.0165],[.004,-.0162]];if(f.add(Me(K,.0016,4e-4).translate(-T/2-9e-4,0,0),v),f.add(Me([[.018,-.0132],[.026,-.0132],[.0276,-.0148],[.0176,-.016]],.0024,5e-4).translate(-T/2-.0016,0,0),v),f.add(Ze(.0017,-T/2-.0018,-.018,-.034,-1,"dome",12),p),f.add(ce(.0024,.0098,.0106,.0014).translate(-T/2-.0012+6e-4,-.0395,.0135),m),f.add(ce(.0034,.0066,.0074,.0012).translate(-T/2-.0022,-.0395,.0135),h),f.add(ce(.0012,.0066,.0074,8e-4).translate(T/2+4e-4,-.0395,.0135),v),e.engravings!==!1){let B=nt(n,["C15 COMPACT  9x19"],.054,.0046,{px:1024,tracking:.12});B&&f.add(st(-S-6e-5,.0032,.0135,.054,.0046,-1),B,A);let J=nt(n,["FONDAINE ARMS   MOD. C15"],.066,.0034,{px:1024,tracking:.1});J&&f.add(st(S+6e-5,-.0062,.012,.066,.0034,1),J,A);let Q=ce(8e-4,.0062,.03,3e-4).translate(T/2+15e-5,-.0205,-.07);f.add(Q,p);let Y=nt(n,["FA 2209 0417"],.028,.0036,{px:512,color:[.12,.12,.125],metallic:.9,roughness:.5,tracking:.1});Y&&f.add(st(T/2+62e-5,-.0205,-.07,.028,.0036,1),Y);let X=nt(n,["C15"],.009,.0045,{px:256,color:[.07,.07,.072],metallic:0,roughness:.7,tracking:.05,align:"center"});X&&f.add(st(-T/2-6e-5,-.0225,-.075,.009,.0045,-1),X)}}{let L=[[.0098,-.03],[.015,-.03],[.0146,-.035],[.0126,-.042],[.0094,-.0478],[.006,-.05],[.0046,-.049],[.0072,-.044],[.0094,-.0378]];f.add(Me(L,.0066,.001),v,{trigger:!0}),f.add(Me([[.0152,-.034],[.0166,-.0345],[.0146,-.047],[.012,-.0478],[.0126,-.042]],.0022,5e-4),b,{trigger:!0})}{let L=Math.PI/2-Math.atan2(.309,.951),E=q=>q.rotateX(L).translate(0,-.0195,.0385),N=Re(.0222,.0338,.0038,4),O=Re(.0214,.033,.0036,4);f.add(E(Ue([{z:-.001,prof:O},{z:.006,prof:N,smooth:!0},{z:.1005,prof:N}],{capStart:!1})),M,P),f.add(E(xt(Re(.0196,.03,.003,3),-.0035,.004)),w,P);let C=Pe([[0,0],[.00495,0],[.00495,.0185],[.0047,.0195],[.004,.0235],[.0026,.0272],[.001,.029],[0,.0293]],ee(20));f.add(C.rotateX(-Math.PI/2).translate(.0025,-.0155,.0535),y,P);let U=Re(.0262,.0392,.0032,3);f.add(E(Ue([{z:.0995,prof:Re(.0232,.0348,.003,3)},{z:.1015,prof:U},{z:.1075,prof:U},{z:.1095,prof:Re(.0242,.0372,.0032,3)}])),m,P),f.add(E(xe(.0028,6e-4,0,.004,.1097,12)),p,P);for(let q=0;q<6;q++)f.add(E(vt(.0011,6e-4,0,.0169,.018+q*.0145,10)),g,P)}let j=f.finish(),z=new me(n.dev,yt(.019,.0099,Pe,{straight:!0})),R={parts:j,muzzle:u.create(0,0,o.slideFront-.001),ejectionPort:u.create(.0105,.0125,(o.portZ0+o.portZ1)/2),rearSight:u.create(0,o.sightLine,o.rearSightZ),frontSight:u.create(0,o.sightLine,o.frontSightZ),casingMesh:z,casingMaterial:y,magAxis:u.normalize(u.create(),u.create(0,-.951,.309)),magBox:{center:u.create(0,-.07,.051),half:u.create(.0131,.053,.019)},triggerTravelM:.0045,selector:{pivot:[-o.slideWidth/2-8e-4,.004,.074],axis:[1,0,0],angles:{safe:0,semi:-.9,auto:-1.8}},charge:{grip:u.create(0,o.slideTop+.004,.064),travelM:o.slideTravel,release:"slingshot",pullDir:u.create(0,0,1)}},I={triangles:f.triangles,buildMs:performance.now()-t};return console.info(`[oaxis] C15 Compact: ${I.triangles.toLocaleString()} tris in ${I.buildMs.toFixed(0)} ms`),{model:R,spec:Mi(o.sightLine),grips:lr,stats:I}}function wi(n){let t=.576271186440678,a=.0185+.0229*t,r=.0725+.0161*t,s=.0128+.0021*Math.sin(Math.PI*Math.min(1,Math.max(0,(.079-.03)/.09)))**.7,i=Math.atan2(.0229+.0161,2*(.1165-.028)),o=Math.cos(i),c=Math.sin(i);return new Float32Array([1,0,0,0,0,o,-c,0,0,c,o,0,n*(s-1e-4),-.079,(a+r)/2,1])}var lr={right:{position:[.0285,-.0326,.1253],fingerDir:[0,-.309,-.951],dorsal:[1,0,0],fingers:[{curl:[.5,.7,.3],spread:.42},{curl:[1.25,1.35,.7]},{curl:[1.3,1.35,.7]},{curl:[1.35,1.3,.7]}],thumb:{dir:[-.55,-.55,-.62],bend:[.15,.1]}},indexPressed:{curl:[.55,.95,.45],spread:.42},left:{position:[-.034,-.0325,.0823],fingerDir:[0,-.5,-.866],dorsal:[-1,0,0],fingers:[{curl:[1.15,1.2,.6]},{curl:[1.2,1.2,.6]},{curl:[1.2,1.2,.6]},{curl:[1.2,1.15,.6]}],thumb:{dir:[-.5,-.1,-.86],bend:[.05,.05]}},leftOnMagazine:{position:[0,-.15,.13],fingerDir:[0,.25,-.97],dorsal:[0,-1,0],fingers:[{curl:[.9,.9,.4]},{curl:[.95,.9,.4]},{curl:[.95,.9,.4]},{curl:[.95,.9,.4]}],thumb:{dir:[-.7,.2,-.6],bend:[.2,.1]}}};function Mi(n=Ea.sightLine){return{name:"C15 Compact 9mm",caliber:Ra["9x19 124gr"],barrelLengthM:.102,massKg:.84,rpm:1100,fireModes:["safe","semi","auto"],magazineCapacity:15,sightHeightM:n,zeroM:23,accuracyMoa:3,recoil:{boreAboveShoulderM:.045,inertia:.075,shoulderMassKg:3.5,holdOmega:15,holdDamping:.55,horizontalRatio:.3,viewCouplingHip:.04,viewCouplingAds:.1,residualRise:.06},reload:{magOut:.45,magIn:.85,boltRelease:.35},audio:Ma.pistol9mm,flash:{kelvin:1850,luminance:45e4,sizeM:.07,lightCandela:12e3,sidePorts:!1,smoke:.5},ejection:{speed:3.2,up:2.4,back:1,spinRad:35},hipOffset:[.05,-.118,-.38],eyeRelief:.56,adsTime:.22,action:{travelM:Ea.slideTravel,backMs:5,returnMs:8,lockOpenOnEmpty:!0,lockFraction:.93},drawTime:.45}}var H={seam:-.012,upperHW:.015,lowerHW:.0148,railTop:.0307,railNeck:.0276,upperRear:.115,upperFront:-.118,boltFace:-.054,portZ0:.009,portZ1:-.049,portY0:-.006,portY1:.013,hgZ0:-.122,hgZ1:-.463,barrelLen:.406,tubeR:.0146,slotPitch:.01001,slotW:.00523},mt=Math.PI*2;function In(n,e,t,a=H.railTop,r=H.railNeck){t?n.pt(e,r).pt(e,r).pt(e,r):n.pt(e,r).pt(e+.0023,r+.0023).pt(e+.0023,a)}function Ln(n,e,t,a=H.railTop,r=H.railNeck){t?n.pt(-e,r).pt(-e,r).pt(-e,r):n.pt(-(e+.0023),a).pt(-(e+.0023),r+.0023).pt(-e,r)}function ki(n={}){let e=H.upperHW,t=H.seam,a=.004,r=e,s=.0018,i=2,o=.0105,c=.00783,d=H.railNeck-.0015,l=.0125,m=.0012,h=Math.acos(o/r),b=new Ne;b.arc(e-s,t+s,s,-Math.PI/2,0,i);let v=6,p=14;if(b.pt(e,H.portY0),n.port){let M=Math.sqrt(l*l-(H.portY0-m)**2),y=Math.sqrt(l*l-(H.portY1-m)**2);b.pt(M,H.portY0);let x=Math.atan2(H.portY0-m,M),w=Math.atan2(H.portY1-m,y)-mt;b.arc(0,m,l,x,w,p-1);let g=Math.sqrt(r*r-(H.portY1-a)**2);b.pt(g,H.portY1);let k=Math.asin((H.portY1-a)/r);for(let f=0;f<=v;f++){let A=k+(h-k)*f/v;b.pt(Math.cos(A)*r,a+Math.sin(A)*r,f>0&&f<v)}}else{for(let M=0;M<=p;M++)b.pt(e,H.portY0);b.pt(e,a,!0);for(let M=0;M<=v;M++){let y=h*M/v;b.pt(Math.cos(y)*r,a+Math.sin(y)*r,M>0&&M<v)}}b.pt(o,d).pt(c,d),In(b,c,!!n.cut),Ln(b,c,!!n.cut),b.pt(-c,d).pt(-o,d);for(let M=0;M<=v;M++){let y=Math.PI-h+h*M/v;b.pt(Math.cos(y)*r,a+Math.sin(y)*r,M>0&&M<v)}return b.pt(-e,a,!0),b.arc(-e+s,t+s,s,Math.PI,Math.PI*1.5,i),b.done()}function Ai(n={}){let c=new Ne,d=!!n.mlok;return c.pt(-.0035,-.0205).pt(-.0035,d?-.0205+.0085:-.0205).pt(.0035,d?-.0205+.0085:-.0205).pt(.0035,-.0205),c.pt(.0195-.0075,-.0205),c.pt(.0195,-.0205+.0075),c.pt(.0195,-.0035).pt(d?.0195-.0085:.0195,-.0035).pt(d?.0195-.0085:.0195,.0035).pt(.0195,.0035),c.pt(.0195,.0205-.0075),c.pt(.0195-.0075,.0205),c.pt(.0105,.0205).pt(.0105,H.railNeck-.0015).pt(.00783,H.railNeck-.0015),In(c,.00783,!!n.cut),Ln(c,.00783,!!n.cut),c.pt(-.00783,H.railNeck-.0015).pt(-.0105,H.railNeck-.0015).pt(-.0105,.0205),c.pt(-(.0195-.0075),.0205),c.pt(-.0195,.0205-.0075),c.pt(-.0195,.0035).pt(d?-(.0195-.0085):-.0195,.0035).pt(d?-(.0195-.0085):-.0195,-.0035).pt(-.0195,-.0035),c.pt(-.0195,-.0205+.0075),c.pt(-(.0195-.0075),-.0205),c.done()}function Pi(n){let t=new Ne,a=36;for(let r=0;r<a;r++){let s=r/a*mt,i=Math.abs((s+Math.PI)%mt-Math.PI)<.14,o=n&&i?.0124-.0012:.0124;t.pt(Math.cos(s)*o,Math.sin(s)*o,!i)}return t.done()}function br(n,e,t,a,r){let s=e>=n?1:-1,i=new Set([n,e]),o=p=>[Math.min(p[0],p[1]),Math.max(p[0],p[1])],c=t.map(o),d=a.map(o);for(let p of[...c,...d])for(let M of p)(M-n)*s>1e-9&&(e-M)*s>1e-9&&i.add(M);let l=[...i].sort((p,M)=>(p-M)*s),m=(p,M)=>M.some(([y,x])=>p>y+1e-9&&p<x-1e-9),h=[],b=new Map,v=(p,M)=>{let y=`${p}${M}`,x=b.get(y);return x||(x=r(p,M),b.set(y,x)),x};for(let p=0;p<l.length-1;p++){let M=(l[p]+l[p+1])/2,y=v(m(M,c),m(M,d));h.push({z:l[p],prof:y},{z:l[p+1],prof:y})}return h}function zn(n,e){let t=Math.min(n,e),a=Math.max(n,e),r=[];for(let s=Math.ceil((t+.003)/H.slotPitch);s*H.slotPitch<a-.003;s++){let i=s*H.slotPitch;i-H.slotW/2>t+.0015&&i+H.slotW/2<a-.0015&&r.push([i-H.slotW/2,i+H.slotW/2])}return r}function En(n,e={}){let t=performance.now(),a=n.synth,r=e.textureSize??je.textureSize,s=Math.min(r,1024),i=Math.min(r,512),o=a.material("anodized",{size:r,tileMeters:.22,color:[.03,.031,.033],wear:.06,roughness:.52,seed:11,bumpMm:.02},{name:"anodized",edgeWear:.6,edgeWearRadius:.0025}),c=a.material("anodized",{size:r,tileMeters:.22,color:[.03,.031,.033],wear:.12,roughness:.5,seed:12,bumpMm:.02},{name:"anodized-rail",edgeWear:.85,edgeWearRadius:.002}),d=a.material("anodized",{size:r,tileMeters:.25,color:[.028,.029,.032],wear:.07,roughness:.54,seed:19,bumpMm:.025},{name:"anodized-handguard",edgeWear:.65,edgeWearRadius:.0022}),l=a.material("parkerized",{size:r,tileMeters:.16,color:[.05,.052,.05],wear:.2,seed:13},{name:"parkerized",edgeWear:.5,edgeWearRadius:.002}),m=a.material("nitride",{size:s,tileMeters:.1,color:[.04,.041,.043],wear:.35,roughness:.42,seed:20},{name:"bcg-nitride",edgeWear:.8,edgeWearRadius:.0025}),h=a.material("polymer",{size:r,tileMeters:.14,color:[.03,.03,.032],extra:.3,roughness:.6,bumpMm:.12,seed:14},{name:"polymer",edgeWear:.25}),b=a.material("polymer",{size:r,tileMeters:.16,color:[.03,.03,.032],extra:.95,roughness:.64,bumpMm:.4,seed:15},{name:"polymer-stipple",edgeWear:.2}),v=a.material("polymer",{size:r,tileMeters:.14,color:[.034,.034,.036],extra:.5,roughness:.58,bumpMm:.2,seed:21},{name:"polymer-mag",edgeWear:.3}),p=a.material("rubber",{size:i,seed:16,extra:1},{name:"rubber"}),M=a.material("brass",{size:i,tileMeters:.03,seed:17},{name:"brass"}),y=a.material("parkerized",{size:s,tileMeters:.08,color:[.022,.022,.023],wear:.08,seed:18},{name:"steel-black",edgeWear:.5,edgeWearRadius:.0018}),x=a.material("machined",{size:s,tileMeters:.05,color:[.4,.4,.41],wear:.35,roughness:.42,seed:22,extra:1},{name:"stainless"}),w=a.material("machined",{size:i,tileMeters:.02,color:[.28,.28,.29],wear:.4,seed:23,extra:.4},{name:"pins"}),g=new ue({name:"cavity",baseColor:[.02,.02,.02,1],roughness:.9,metallic:.3}),k=new ue({name:"sight-white",baseColor:[.85,.85,.8,1],roughness:.5,metallic:0}),f=new zt(n),A={bolt:!0},P={charge:!0},S={magazine:!0},T=H.upperHW,j=H.lowerHW;{let O=zn(H.upperRear-.004,H.upperFront+.004),C=br(H.upperRear,H.upperFront,O,[[H.portZ0,H.portZ1]],(K,B)=>ki({cut:K,port:B}));f.add(Ue(C),o),f.add(Se(.016,H.upperFront,H.upperFront-.006,0,0,ee(28)),o),f.add(Je([[.0125,0],[.0168,0],[.0168,.004],[.0158,.0045],[.0158,.0215],[.0125,.0215]],H.upperFront-.006,0,ee(24)),l),f.add(ce(.0148,.0078,.03,6e-4).translate(0,.0235,H.upperRear-.01),g),f.add(at([[T-.004,.0105],[T+.0068,.0235],[T+.0068,.0305],[T-.004,.0305]],.017,{bevel:.0015,bevelSegments:2}).rotateX(Math.PI/2).translate(0,.0045,0),o);let U=T+.0042,q=.009;f.add(Se(.0068,.03,.062,q,U,ee(18)),o),f.add(Je([[0,0],[.0052,0],[.0062,.0015],[.0062,.009],[.0058,.0105],[.0049,.011],[0,.011]],.073,q,ee(20)).translate(U,0,0),l);for(let K=0;K<12;K++){let B=K/12*mt;f.add(fe(7e-4,.0028,.006).translate(0,.0063,0).rotateZ(B).translate(U,q,.068),y)}let V=ce(.0012,.0186,.0585,5e-4);f.add(V.translate(0,-.0093,0).rotateZ(.35).translate(T+.0012,H.portY0-5e-4,(H.portZ0+H.portZ1)/2),l),f.add(Se(.0014,H.portZ0+.004,H.portZ1-.004,H.portY0-8e-4,T+.0012,10),w);for(let K of[-1,1])f.add(Ze(.0038,K*(j+3e-4),H.seam-.0085,.0735,K,"dome",16),w),f.add(Ze(.0038,K*(j+3e-4),H.seam-.0085,-.0655,K,"dome",16),w)}{let O=[];for(let V=0;V<9;V++)O.push([-.034+V*.0045,-.034+V*.0045+.0018]);let C=H.boltFace+.012,U=H.upperRear+.03;f.add(Ue(br(C,U,O,[],V=>Pi(V))),m,A),f.add(Se(.0124,H.boltFace-.012,C-6e-4,0,0,ee(28)),l),f.add(Se(.0094,H.boltFace,C+5e-4,0,0,ee(24)),m,A),f.add(xe(.0094,4e-4,0,0,H.boltFace-2e-4,ee(24)),y,A),f.add(ce(.0062,.0036,.0082,.001).translate(.0072,.0108,C+.013),m,A),f.add(ce(.0068,.0046,.018,.0012).translate(0,.0128,C+.052),m,A),f.add(Ze(.0021,0,0,0,1,"hex",12).rotateZ(Math.PI/2).translate(0,.0151,C+.046),y,A);let q=.0235;f.add(ce(.0128,.0058,.105,.0012).translate(0,q,H.upperRear-.045),o,P),f.add(ce(.051,.0075,.019,.0022).translate(.002,q,H.upperRear+.011),o,P);for(let V=0;V<6;V++)f.add(fe(.0038,.0012,.009).translate(-.0205+V*.0082,q+.0042,H.upperRear+.012),y,P);f.add(ce(.0096,.0064,.021,.0014).translate(-.0302,q,H.upperRear+.0105),l,P),f.add(vt(.0013,.009,-.0245,q,H.upperRear+.016,10),w,P)}{let O=H.seam,C=[[-.1145,O+5e-4],[.0705,O+5e-4],[.0705,-.038],[.012,-.04],[-.03,-.04],[-.04,-.044],[-.06,-.0585],[-.072,-.052],[-.08,-.03],[-.1145,-.026]];f.add(Me(C,j*2,.002),o),f.add(Se(.0185,.0985,H.upperRear+5e-4,0,0,ee(28)),o);let U=[[.0705,O],[.0705,-.07],[.0725,-.0745],[.0105,-.0745],[.0125,-.07],[.0125,O]];f.add(Me(U,j*2+4e-4,.0025),o),f.add(xt(Re(.0238,.0565,.003,3),0,.064).rotateX(Math.PI/2+.17).flipWinding().translate(0,O,-.0415+.011),g),f.add(Me([[.012,-.04],[.012,-.0545],[.0085,-.0575],[-.0265,-.0575],[-.03,-.0545],[-.03,-.04],[-.0255,-.04],[-.0255,-.0525],[.0075,-.0525],[.0075,-.04]],.0088,.0016),o),f.add(Te(.0013,.0115,0,-.043,-.0095,10),w),f.add(Te(.0013,.0115,0,-.043,.0275,10),w),f.add(Me([[-.012,-.04],[-.0155,-.04],[-.0195,-.047],[-.0185,-.0535],[-.0135,-.0525],[-.0105,-.046]],.0062,8e-4),l,{trigger:!0});let q=[-(j+.0016),O-.0092,.03];f.add(Te(.0045,.0028,q[0],q[1],q[2],ee(16)),l,{selector:!0}),f.add(ce(.0036,.0046,.0195,.0014).translate(q[0]-.0012,q[1],q[2]-.0085),l,{selector:!0});for(let V=0;V<5;V++)f.add(fe(6e-4,.0052,6e-4).translate(q[0]-.0031,q[1],q[2]-.0135-V*.0015),y,{selector:!0});if(e.engravings!==!1){let V=nt(n,["SAFE   SEMI   AUTO"],.028,.0028,{px:512,color:[.8,.8,.78],metallic:0,roughness:.6,tracking:.05,align:"center"});V&&f.add(st(-(j+8e-5),O-.0028,.021,.028,.0028,-1),V);let K=nt(n,["FONDAINE ARMS","MOD. FA-15   CAL. 5.56 NATO"],.046,.009,{px:1024,color:[.75,.75,.74],metallic:0,roughness:.6,tracking:.08,align:"left"});K&&f.add(st(-(.0146+8e-5),-.03,-.0415,.046,.009,-1),K);let B=nt(n,["FA15-0042117"],.028,.0034,{px:512,color:[.78,.78,.77],metallic:0,roughness:.6,tracking:.08,align:"left"});B&&f.add(st(.0146+8e-5,-.03,-.0415,.028,.0034,1),B)}f.add(Me([[.004,O-.004],[.004,O-.0185],[.009,O-.0225],[.0205,O-.0225],[.0205,O-.004]],.0036,.0012).translate(j+.0015,0,0),o),f.add(Ia([[0,0],[.0046,0],[.0046,.0024],[.0038,.0032],[0,.0032]],j+5e-4,O-.0145,-.0125,ee(16)),l),f.add(Me([[.012,O-.004],[.012,O-.0165],[-.002,O-.0165],[-.002,O-.004]],.0032,.001).translate(-(j+.0012),0,0),o),f.add(ce(.0022,.0105,.0078,8e-4).translate(-(j+.0028),O-.0075,5e-4),l),f.add(ce(.0022,.0062,.0062,8e-4).translate(-(j+.0028),O-.0118,-.0085),l),f.add(Te(.0011,.0036,-(j+.0014),O-.0098,-.0038,8),w);{let V=[];for(let X=0;X<=14;X++){let Z=X/14,ne=.0292+.004*Math.sin(Math.PI*Z)**.8+.001*Z,oe=.0335+.012*Z+.002*Math.sin(Math.PI*Z),pe=Re(ne,oe,Math.min(.009,ne/2-.001),4,0,0);V.push({z:Z*.088,prof:pe,smooth:X>0})}let K=Ue(V,{capStart:!1});K=de.merge([K,ce(.026,.009,.012,.003).translate(0,-.0198,.007)]);let B=.52,J=-.036,Q=.06,Y=.088;f.add(K.rotateX(Math.PI/2-B).translate(0,J,Q),b),f.add(Ze(.0035,0,0,0,1,"hex",14).rotateZ(-Math.PI/2).translate(0,J-Y*Math.cos(B)+6e-4,Q+Y*Math.sin(B)),w)}f.add(Je([[.0147,0],[.0196,0],[.0196,.0085],[.0188,.0092],[.0147,.0092]],.1275,0,ee(28)),o);for(let V=0;V<6;V++){let K=V/6*mt;f.add(fe(.0035,.0032,.0036).translate(0,.0185,0).rotateZ(K).translate(0,0,.1275-.0018),g)}f.add(xe(.0205,.0022,0,0,H.upperRear+.0016,ee(28)),l),f.add(Se(H.tubeR,H.upperRear,.335,0,0,ee(32)),o),f.add(Je([[0,0],[.0135,0],[H.tubeR,5e-4],[H.tubeR,.002],[0,.002]],.335,0,ee(32)).translate(0,0,.002),o);for(let V=0;V<6;V++)f.add(vt(.0032,.004,0,-H.tubeR+4e-4,.165+V*.019,12),g);f.add(fe(.006,.0025,.19).translate(0,-H.tubeR+.0012,.235),o)}{let O=[[-.205,.0185],[-.33,.0215],[-.342,.016],[-.345,0],[-.345,-.088],[-.332,-.095],[-.3,-.088],[-.262,-.052],[-.236,-.018],[-.205,-.0185]],C=[[-.318,-.045],[-.318,-.067],[-.324,-.07],[-.33,-.067],[-.33,-.045],[-.324,-.042]];f.add(Me(O,.04,.004,[C]),h),f.add(Se(H.tubeR+.0025,.203,.236,0,0,ee(28)),h),f.add(ce(.012,.0035,.032,.0012).translate(0,-H.tubeR-.006,.224),h),f.add(ce(.009,.006,.0085,.0015).translate(0,-H.tubeR-.0035,.2075),h),f.add(Te(.0015,.0145,0,-H.tubeR-.0075,.238,8),w),f.add(Me([[-.345,0],[-.356,0],[-.357,-.09],[-.345,-.092]],.042,.0035),p);for(let U=0;U<9;U++)f.add(fe(.034,.0022,8e-4).translate(0,-.0835+U*.0095,.3568),p);f.add(Ia([[0,0],[.0062,0],[.0062,8e-4],[.0035,8e-4],[.0035,0],[0,0]],-.0201,-.0045,.2255,ee(16)),l),f.add(Te(.0012,.0404,0,-.056,.324,8),w)}{let O=zn(H.hgZ0-.002,H.hgZ1+.002),C=[];for(let q=0;q<8;q++){let V=H.hgZ0-.03-q*.04;C.push([V-.016,V+.016])}let U=br(H.hgZ0,H.hgZ1,O,C,(q,V)=>Ai({cut:q,mlok:V}));f.add(Ue(U,{capStart:!0,capEnd:!0}),d),f.add(Se(.0163,H.hgZ0,H.hgZ1,0,0,ee(28)).flipWinding(),g);for(let q of[-1,1])f.add(Ze(.0028,q*.0196,-.0155,H.hgZ0-.012,q,"hex",12),y),f.add(Ze(.0028,q*.0196,-.0155,H.hgZ0-.022,q,"hex",12),y);f.add(xe(.0165,.001,0,0,H.hgZ1-4e-4,ee(28)),g)}let z=H.boltFace-H.barrelLen-.054;{let O=H.upperFront-.006;f.add(Se(.0095,O,-.35,0,0,ee(28)),l),f.add(Je([[.0095,0],[.0095,.012],[.0089,.013],[.0089,.054],[.0062,.0545],[.0062,.062]],-.35-.045,0,ee(28)),l),f.add(Se(.0089,-.395,H.boltFace-H.barrelLen+.001,0,0,ee(28)),l);let C=H.boltFace-H.barrelLen+5e-4;f.add(Je([[.0062,0],[.011,0],[.011,.0022],[.0062,.0022]],C+.0022,0,ee(24)),x);let U=Je([[.0075,0],[.011,.0025],[.0112,.012],[.0112,.048],[.0104,.0525],[.0066,.0545],[.0062,.0545],[.0062,0]],C,0,ee(36));f.add(U,l);for(let V=0;V<5;V++){let K=(V-2)*(mt/7.2);f.add(ce(.0032,.006,.03,8e-4).translate(0,.0098,0).rotateZ(K).translate(0,0,C-.034),g)}f.add(xe(.0062,6e-4,0,0,C-.044,ee(20)),l),f.add(xe(.0029,8e-4,0,0,C-.0443,ee(16)),g);let q=-.372;f.add(Qe(Ft(-.0115,-.0118,.0115,.0135,.0025,4),.03,q,.0012),l);for(let V=0;V<2;V++)f.add(Ze(.0022,0,0,0,1,"hex",10).rotateZ(-Math.PI/2).translate(0,-.0118,q-.007+V*.014),y);f.add(Se(.0024,q-.012,H.upperFront+.012,.0138,0,12),x),f.add(Te(.0011,.0245,0,.0138,q+.003,8),w)}let R=.064,I=-.447;{f.add(Qe(Ft(-.0125,H.railTop-.0036,.0125,H.railTop+.0085,.0018,3),.034,.046+.001,8e-4),o),f.add(Te(.0022,.0252,0,H.railTop+.0105,.046+.012,12),l);let C=[[-.0118,H.railTop+.0085],[.0118,H.railTop+.0085],[.0118,R+.0075],[.0085,R+.0098],[-.0085,R+.0098],[-.0118,R+.0075]];f.add(Qe(C,.0042,.046,6e-4,[Xa(0,R,.0036,ee(20))]),l),f.add(Qe(Ft(-.0068,-.0068,.0068,.0068,.0025,3),.0012,0,3e-4,[Xa(0,0,.0011,12)]).rotateX(-Math.PI/2).translate(0,H.railTop+.0091,.046-.0095),l),f.add(Ia([[0,0],[.0062,0],[.0062,.012],[.0048,.0125],[0,.0125]],.0118,R-.001,.046,ee(16)),l);for(let V=0;V<10;V++){let K=V/10*mt;f.add(fe(.012,8e-4,.0025).translate(0,.0062,0).rotateX(K).translate(.0118+.006,R-.001,.046),y)}f.add(Qe(Ft(-.0125,H.railTop-.0036,.0125,H.railTop+.0085,.0018,3),.032,I,8e-4),o),f.add(Te(.0022,.0252,0,H.railTop+.0105,I-.011,12),l);let U=H.railTop+.0085,q=[[-.0112,U],[.0112,U],[.0112,R-.004],[.0062,R+.0075],[.004,R+.0075],[.0062,U+.004],[-.0062,U+.004],[-.004,R+.0075],[-.0062,R+.0075],[-.0112,R-.004]];f.add(Qe(q,.0046,I,6e-4),l),f.add(vt(.0046,.0052,0,U+.004+.0026,I,ee(18)),l);for(let V=0;V<12;V++){let K=V/12*mt;f.add(fe(7e-4,.0054,7e-4).translate(.0046,0,0).rotateY(K).translate(0,U+.004+.0026,I),y)}f.add(fe(.0018,R-(U+.0092),.0018).translate(0,(R+U+.0092)/2,I),y),f.add(fe(.0018,.0012,.0019).translate(0,R+6e-4,I),k)}{let O=[],C=[0,H.seam+.004,-.039715],U=16,q=.205;for(let Q=0;Q<=U;Q++){let Y=Q/U*q,Z=.17+Math.max(0,Y-.055)*2.1;if(Q===0)O.push(C);else{let ne=O[Q-1],oe=q/U;O.push([0,ne[1]-Math.cos(Z)*oe,ne[2]-Math.sin(Z)*oe])}}let V=(()=>{let Q=new Ne,Y=.0114,X=.0282,Z=.0038;return Q.arc(Y-Z,-X+Z,Z,-Math.PI/2,0,3),Q.pt(Y,-.012).pt(Y+7e-4,-.0105,!0).pt(Y,-.009).pt(Y,.006).pt(Y+7e-4,.0075,!0).pt(Y,.009),Q.arc(Y-Z,X-Z,Z,0,Math.PI/2,3).arc(-Y+Z,X-Z,Z,Math.PI/2,Math.PI,3),Q.pt(-Y,.009).pt(-Y-7e-4,.0075,!0).pt(-Y,.006).pt(-Y,-.009).pt(-Y-7e-4,-.0105,!0).pt(-Y,-.012),Q.arc(-Y+Z,-X+Z,Z,Math.PI,Math.PI*1.5,3),Q.done()})(),K=Pn(V,O,[0,0,1],Q=>Q>.955?[1.1,1.08]:Q>.935?[1+(Q-.935)*5,1+(Q-.935)*4]:[1,1],{capStart:!1,capEnd:!0});f.add(K,v,S),f.add(xt(Re(.0208,.05,.003,3),-.003,.004).rotateX(Math.PI/2+.17).translate(0,C[1]-.001,C[2]),new ue({name:"follower",baseColor:[.75,.22,.03,1],roughness:.6}),S);let B=yt(.0448,.0095,Pe);f.add(B.rotateX(-Math.PI/2).translate(.0045,C[1]+.003,C[2]+.027),M,S);let J=O[O.length-1];f.add(vt(.0032,.0012,0,J[1]-4e-4,J[2],12),v,S)}let L=f.finish(),E=new me(n.dev,yt(.0448,.0095,Pe)),N={triangles:f.triangles,buildMs:performance.now()-t};return console.info(`[oaxis] AR carbine: ${N.triangles.toLocaleString()} tris in ${N.buildMs.toFixed(0)} ms`),{model:{parts:L,muzzle:u.create(0,0,z),ejectionPort:u.create(.016,.012,-.02),rearSight:u.create(0,R,.046),frontSight:u.create(0,R,I),casingMesh:E,casingMaterial:M,magAxis:u.normalize(u.create(),u.create(0,-.985,-.17)),magBox:{center:u.create(0,-.145,-.07),half:u.create(.0125,.085,.032)},triggerTravelM:.003,selector:{pivot:[-(H.lowerHW+.0016),H.seam-.0092,.03],axis:[1,0,0],angles:{safe:0,semi:Math.PI/2,auto:Math.PI}},charge:{grip:u.create(-.03,.0235,H.upperRear+.0105),travelM:.085,release:"boltRelease",pullDir:u.create(0,0,1)}},spec:Si(R),grips:dr,stats:N}}var dr={right:{position:[.0305,-.049,.155],fingerDir:[0,-.33,-.94],dorsal:[1,0,0],fingers:[{curl:[.25,.55,.3],spread:.35},{curl:[1.3,1.3,.7]},{curl:[1.3,1.3,.7]},{curl:[1.3,1.25,.7]}],thumb:{dir:[-.6,-.6,-.5],bend:[.25,.15]}},indexPressed:{curl:[.35,.8,.45],spread:.35},left:{position:[-.064,-.047,-.278],fingerDir:[.8,.15,-.55],dorsal:[0,-1,0],fingers:[{curl:[1.1,1.15,.6]},{curl:[1.1,1.2,.6]},{curl:[1.1,1.2,.6]},{curl:[1.1,1.15,.6]}],thumb:{dir:[-.3,.7,-.6],bend:[.15,.1]}},leftOnMagazine:{position:[-.02,-.25,-.02],fingerDir:[.3,.3,-.9],dorsal:[-.2,-1,0],fingers:[{curl:[.9,.9,.4]},{curl:[.95,.9,.4]},{curl:[.95,.9,.4]},{curl:[.95,.9,.4]}],thumb:{dir:[-.7,.3,-.6],bend:[.2,.1]}}};function Si(n=.064){return{name:"AR carbine 16in",caliber:Ra["5.56x45 M855"],barrelLengthM:.406,massKg:3.3,rpm:760,fireModes:["safe","semi","auto"],magazineCapacity:30,sightHeightM:n,zeroM:50,accuracyMoa:1.5,recoil:{boreAboveShoulderM:.035,inertia:.24,shoulderMassKg:12,holdOmega:13,holdDamping:.72,horizontalRatio:.35,viewCouplingHip:.45,viewCouplingAds:.88,residualRise:.16},reload:{magOut:.55,magIn:.95,boltRelease:.35},audio:Ma.rifle556_16in,flash:{kelvin:1900,luminance:6e5,sizeM:.15,lightCandela:25e3,sidePorts:!0,smoke:1},ejection:{speed:4.2,up:1.4,back:1.2,spinRad:28},hipOffset:[.12,-.135,-.34],eyeRelief:.075,adsTime:.26,drawTime:.6,action:{travelM:.089,backMs:9,returnMs:14,lockOpenOnEmpty:!0,lockFraction:.9}}}var Fe=[{base:[-.029,.003,-.089],len:[.044,.026,.023],r:[.0092,.0083,.0076]},{base:[-.009,.004,-.092],len:[.048,.029,.024],r:[.0094,.0085,.0078]},{base:[.011,.003,-.089],len:[.045,.028,.023],r:[.009,.0082,.0075]},{base:[.029,.001,-.08],len:[.036,.02,.021],r:[.008,.0073,.0068]}],Ae={base:[-.03,-.006,-.022],len:[.044,.032,.027],r:[.0115,.01,.009]},ur=[[-.016,.003,-.03],[-.004,.004,-.032],[.008,.003,-.03],[.018,.001,-.028]],he={z0:-.012,z1:-.08,w0:.028,w1:.041,t0:.013,t1:.0105,cup:.003},mr=[[-.07,.026,.009],[-.035,.029,.015],[0,.029,.0185],[.04,.031,.023],[.1,.036,.03],[.18,.044,.04],[.24,.042,.039],[.3,.038,.036]],Dn=[{curl:[.18,.22,.12],spread:.12},{curl:[.2,.25,.12],spread:.03},{curl:[.22,.27,.14],spread:-.06},{curl:[.25,.3,.15],spread:-.14}],Vn={dir:[-.45,-.33,-.83],bend:[.2,.15]},$={root:0,finger:(n,e)=>1+n*3+e,thumb:n=>13+n,foreA:16,foreB:17,count:18};function Ce(n,e,t=D.create()){let a=u.normalize(u.create(),u.set(u.create(),-n[0],-n[1],-n[2])),r=u.set(u.create(),e[0],e[1],e[2]),s=u.normalize(u.create(),u.scaleAndAdd(u.create(),r,a,-u.dot(r,a))),i=u.cross(u.create(),s,a),o=F.create();return o[0]=i[0],o[1]=i[1],o[2]=i[2],o[4]=s[0],o[5]=s[1],o[6]=s[2],o[8]=a[0],o[9]=a[1],o[10]=a[2],F.getRotation(t,o)}function Mt(n,e,t,a){let r=a??Array.from({length:$.count},()=>({p:u.create(),q:D.create()}));u.set(r[0].p,0,0,0),D.identity(r[0].q);let s=u.create(),i=D.create();Fe.forEach((l,m)=>{let h=n[m],b=u.set(u.create(),l.base[0]*t,l.base[1],l.base[2]),v=D.fromEuler(D.create(),0,(h.spread??0)*t,0);for(let p=0;p<3;p++){D.multiply(v,v,D.fromEuler(i,-h.curl[p],0,0));let M=r[$.finger(m,p)];u.copy(M.p,b),D.copy(M.q,v),u.add(b,b,u.transformQuat(s,[0,0,-l.len[p]],v))}});let o=u.normalize(u.create(),u.set(u.create(),e.dir[0]*t,e.dir[1],e.dir[2])),c=Ce(o,[0,1,0]),d=u.set(u.create(),Ae.base[0]*t,Ae.base[1],Ae.base[2]);for(let l=0;l<3;l++){l>0&&D.multiply(c,c,D.fromEuler(i,-e.bend[l-1],0,0));let m=r[$.thumb(l)];u.copy(m.p,d),D.copy(m.q,c),u.add(d,d,u.transformQuat(s,[0,0,-Ae.len[l]],c))}return r}var Fn=0,Gn=1,On=2,Ti=3,Nn=4,Un=20,hr=class{kind=[];k=[];prm=[];bmin=[];bmax=[];clipZ=1/0;n=0;push(e,t,a,r,s){this.kind.push(e),this.k.push(t);for(let i=0;i<Un;i++)this.prm.push(a[i]??0);this.bmin.push(...r),this.bmax.push(...s),this.n++}roundCone(e,t,a,r,s){let i=[t[0]-e[0],t[1]-e[1],t[2]-e[2]],o=i[0]*i[0]+i[1]*i[1]+i[2]*i[2],c=a-r,d=o-c*c,l=1/o,m=Math.max(a,r);this.push(Fn,s,[e[0],e[1],e[2],t[0],t[1],t[2],a,r,i[0],i[1],i[2],o,c,d,l],[Math.min(e[0],t[0])-m,Math.min(e[1],t[1])-m,Math.min(e[2],t[2])-m],[Math.max(e[0],t[0])+m,Math.max(e[1],t[1])+m,Math.max(e[2],t[2])+m])}sphere(e,t,a){this.push(Nn,a,[e[0],e[1],e[2],t],[e[0]-t,e[1]-t,e[2]-t],[e[0]+t,e[1]+t,e[2]+t])}ellipsoid(e,t,a,r=[0,0,-1],s=[0,1,0]){let i=Ce(r,s),o=F.fromQuat(F.create(),i),c=Math.max(...t);this.push(Gn,a,[e[0],e[1],e[2],t[0],t[1],t[2],o[0],o[1],o[2],o[4],o[5],o[6],o[8],o[9],o[10]],[e[0]-c,e[1]-c,e[2]-c],[e[0]+c,e[1]+c,e[2]+c])}palm(e){let t=he,a=Math.max(t.w0,t.w1),r=Math.max(t.t0,t.t1)+t.cup;this.push(On,e,[],[-a,-r,t.z1-.01],[a,r,t.z0+.01])}forearm(e){let t=mr;this.push(Ti,e,[],[-.05,-.045,t[0][0]-.01],[.05,.045,t[t.length-1][0]+.01])}bounds(){let e=u.set(u.create(),1/0,1/0,1/0),t=u.set(u.create(),-1/0,-1/0,-1/0);for(let a=0;a<this.n;a++)for(let r=0;r<3;r++)e[r]=Math.min(e[r],this.bmin[a*3+r]),t[r]=Math.max(t[r],this.bmax[a*3+r]);return t[2]=Math.min(t[2],this.clipZ),{min:e,max:t}}bk={o:[0,0,0],size:.02,nx:0,ny:0,nz:0,start:new Int32Array(0),list:new Int32Array(0),margin:0};finalize(e){let{min:t,max:a}=this.bounds(),r=this.bk;r.margin=e,r.o=[t[0]-.005,t[1]-.005,t[2]-.005],r.nx=Math.ceil((a[0]-r.o[0]+.01)/r.size),r.ny=Math.ceil((a[1]-r.o[1]+.01)/r.size),r.nz=Math.ceil((a[2]-r.o[2]+.01)/r.size);let s=Array.from({length:r.nx*r.ny*r.nz},()=>[]);for(let o=0;o<this.n;o++){let c=e+this.k[o],d=[0,1,2].map(m=>Math.max(0,Math.floor((this.bmin[o*3+m]-c-r.o[m])/r.size))),l=[0,1,2].map(m=>Math.min([r.nx,r.ny,r.nz][m]-1,Math.floor((this.bmax[o*3+m]+c-r.o[m])/r.size)));for(let m=d[0];m<=l[0];m++)for(let h=d[1];h<=l[1];h++)for(let b=d[2];b<=l[2];b++)s[(m*r.ny+h)*r.nz+b].push(o)}r.start=new Int32Array(s.length+1);let i=0;s.forEach((o,c)=>{r.start[c]=i,i+=o.length}),r.start[s.length]=i,r.list=new Int32Array(i),s.forEach((o,c)=>r.list.set(o,r.start[c]))}evals=0;eval(e,t,a){this.evals++;let r=1e9,s=this.prm,i=this.bmin,o=this.bmax,c=this.bk,d=0,l=this.n,m=!1;if(c.nx>0){let h=Math.floor((e-c.o[0])/c.size),b=Math.floor((t-c.o[1])/c.size),v=Math.floor((a-c.o[2])/c.size);if(h<0||b<0||v<0||h>=c.nx||b>=c.ny||v>=c.nz)d=l=0,r=c.margin;else{let p=(h*c.ny+b)*c.nz+v;d=c.start[p],l=c.start[p+1],m=!0}}for(let h=d;h<l;h++){let b=m?c.list[h]:h,v=this.k[b],p=b*3,M=Math.max(i[p]-e,0,e-o[p]),y=Math.max(i[p+1]-t,0,t-o[p+1]),x=Math.max(i[p+2]-a,0,a-o[p+2]);if(M*M+y*y+x*x>=(r+v)*(r+v))continue;let w=b*Un,g;switch(this.kind[b]){case Fn:{let f=e-s[w],A=t-s[w+1],P=a-s[w+2],S=s[w+8],T=s[w+9],j=s[w+10],z=s[w+11],R=s[w+12],I=s[w+13],L=s[w+14],E=s[w+6],N=s[w+7],O=f*S+A*T+P*j,C=O-z,U=f*z-S*O,q=A*z-T*O,V=P*z-j*O,K=U*U+q*q+V*V,B=O*O*z,J=C*C*z,Q=(R<0?-1:1)*R*R*K;(C<0?-1:1)*I*J>Q?g=Math.sqrt(K+J)*L-N:(O<0?-1:1)*I*B<Q?g=Math.sqrt(K+B)*L-E:g=(Math.sqrt(K*I*L)+O*R)*L-E;break}case Gn:{let f=e-s[w],A=t-s[w+1],P=a-s[w+2],S=s[w+6]*f+s[w+7]*A+s[w+8]*P,T=s[w+9]*f+s[w+10]*A+s[w+11]*P,j=s[w+12]*f+s[w+13]*A+s[w+14]*P,z=s[w+3],R=s[w+4],I=s[w+5],L=S/z,E=T/R,N=j/I,O=Math.sqrt(L*L+E*E+N*N),C=Math.sqrt(L/z*(L/z)+E/R*(E/R)+N/I*(N/I));g=C>1e-12?O*(O-1)/C:-Math.min(z,R,I);break}case Nn:{let f=e-s[w],A=t-s[w+1],P=a-s[w+2];g=Math.sqrt(f*f+A*A+P*P)-s[w+3];break}case On:{let f=he,A=Math.min(1,Math.max(0,(f.z0-a)/(f.z0-f.z1))),P=A*A*(3-2*A),S=f.w0+(f.w1-f.w0)*P,T=f.t0+(f.t1-f.t0)*A,j=e/S,z=t+f.cup*j*j,R=Math.abs(e)-(S-T),I=Math.abs(z),L=Math.max(R,0),E=Math.max(I,0),N=Math.sqrt(L*L+E*E)-T+Math.min(Math.max(R,I-T),0),O=(f.z0+f.z1)/2,C=(f.z0-f.z1)/2,U=Math.abs(a-O)-C,q=Math.max(N,0),V=Math.max(U,0);g=Math.sqrt(q*q+V*V)+Math.min(Math.max(N,U),0);break}default:{let f=Math.min(Ga-1,Math.max(0,Math.round((a-Hn)/qn))),A=Wn[f],P=Kn[f],S=Math.sqrt(e*e+t*t),T;if(S<1e-9)T=-Math.min(A,P);else{let L=e/(S*A),E=t/(S*P);T=S-1/Math.sqrt(L*L+E*E)}let z=mr[0][0]-a,R=Math.max(T,0),I=Math.max(z,0);g=Math.sqrt(R*R+I*I)+Math.min(Math.max(T,z),0);break}}let k=Math.max(v-Math.abs(r-g),0)/v;r=Math.min(r,g)-k*k*v*.25}return m&&r>c.margin&&(r=c.margin),this.clipZ<1/0&&(r=Math.max(r,a-this.clipZ)),r}grad(e,t,a,r,s=4e-4){r[0]=this.eval(e+s,t,a)-this.eval(e-s,t,a),r[1]=this.eval(e,t+s,a)-this.eval(e,t-s,a),r[2]=this.eval(e,t,a+s)-this.eval(e,t,a-s);let i=Math.hypot(r[0],r[1],r[2])||1;return r[0]/=i,r[1]/=i,r[2]/=i,r}evalGrad(e,t,a,r,s=3e-4){let i=this.eval(e,t,a);r[0]=this.eval(e+s,t,a)-i,r[1]=this.eval(e,t+s,a)-i,r[2]=this.eval(e,t,a+s)-i;let o=Math.sqrt(r[0]*r[0]+r[1]*r[1]+r[2]*r[2])||1;return r[0]/=o,r[1]/=o,r[2]/=o,i}},Hn=-.25,qn=5e-4,Ga=1200,Wn=new Float32Array(Ga),Kn=new Float32Array(Ga);for(let n=0;n<Ga;n++){let[e,t]=_n(Hn+n*qn);Wn[n]=e,Kn[n]=t}function _n(n){let e=mr;if(n<=e[0][0])return[e[0][1],e[0][2]];for(let t=0;t<e.length-1;t++){let a=e[t],r=e[t+1];if(n<=r[0]){let s=(n-a[0])/(r[0]-a[0]),i=s*s*(3-2*s);return[a[1]+(r[1]-a[1])*i,a[2]+(r[2]-a[2])*i]}}return[e[e.length-1][1],e[e.length-1][2]]}function Jn(n){let e=n.len[2],t=n.r[2],a=t*.72,r=Math.atan2(t-a,e-a),s=.56;return{centre:[0,t+(a-t)*Math.min(1,e*s/(e-a))-.0016,-e*s],radii:[t*.58,.0014,e*.3],tilt:r,r:t,L:e}}function Ri(n,e){let t=new hr;t.clipZ=e;let a=(h,b)=>u.transformQuat(u.create(),h,b),r=(h,b,v=1)=>u.set(u.create(),h[0]+b[0]*v,h[1]+b[1]*v,h[2]+b[2]*v),s=(h,b)=>u.set(u.create(),(h[0]+b[0])/2,(h[1]+b[1])/2,(h[2]+b[2])/2);t.forearm(.016),t.palm(.009),Fe.forEach((h,b)=>{let v=n[$.finger(b,0)];t.roundCone(ur[b],r(v.p,a([0,0,1],v.q),.003),.007,.009,.008)});let i=n[$.thumb(0)],o=a([0,0,-1],i.q),c=r(i.p,o,Ae.len[0]),d=n[$.finger(0,0)];t.ellipsoid(r(r(i.p,o,.024),[.005,-.008,-.002]),[.019,.01,.031],.012,o,[0,1,0]);{let h=r(d.p,[0,-.002,.014]),b=u.normalize(u.create(),u.sub(u.create(),h,c)),v=u.distance(h,c)/2,p=u.cross(u.create(),o,b);t.ellipsoid(r(s(c,h),[0,-.002,.004]),[v+.004,.004,.014],.009,o,p)}t.ellipsoid([.026,-.007,-.048],[.012,.0095,.034],.012,[.1,0,-1]);let l=u.normalize(u.create(),u.sub(u.create(),n[$.finger(3,0)].p,d.p));t.ellipsoid([0,-.0075,-.079],[.016,.0065,.036],.01,l),t.sphere([.026,.006,.012],.006,.01),Fe.forEach((h,b)=>{let v=n[$.finger(b,0)],p=ur[b][0]*1.2,M=.0125-he.cup*(p/.033)**2;t.roundCone([p,M-5e-4,-.038],r(v.p,[0,h.r[0]*.9,.01]),.0016,.0019,.007)});let m=(h,b,v)=>{for(let p=0;p<3;p++){let M=n[b(p)],y=a([0,0,-1],M.q),x=a([0,1,0],M.q),w=h.r[p];if(p<2){let g=r(M.p,y,h.len[p]);t.roundCone(M.p,g,w*.95,h.r[p+1]*.95,p===0?v:.005),t.ellipsoid(r(M.p,y,h.len[p]*.5),[w*1,w*.8,h.len[p]*.46],.004,y,x),t.ellipsoid(r(r(M.p,y,h.len[p]*.5),x,-w*.3),[w*.86,w*.8,h.len[p]*.38],.004,y,x),t.sphere(r(g,x,5e-4),h.r[p+1]*1.03,.008)}else{let g=w*.72;t.roundCone(M.p,r(r(M.p,y,h.len[p]-g),x,-w*.12),w*.97,g,.005),t.ellipsoid(r(r(M.p,y,h.len[p]*.5),x,-w*.25),[w*.92,w*.9,h.len[p]*.42],.004,y,x);let k=Jn(h),f=D.multiply(D.create(),M.q,D.fromEuler(D.create(),k.tilt,0,0));t.ellipsoid(u.add(u.create(),M.p,a(k.centre,M.q)),k.radii,.0015,a([0,0,-1],f),a([0,1,0],f))}p===0&&t.sphere(r(M.p,x,.0015),w*1.1,.007)}};Fe.forEach((h,b)=>m(h,v=>$.finger(b,v),.0065)),m(Ae,h=>$.thumb(h),.012);for(let h=0;h<3;h++){let b=n[$.finger(h,0)],v=n[$.finger(h+1,0)],p=a([0,0,-1],b.q),M=a([0,0,-1],v.q),y=r(b.p,p,.006),x=r(v.p,M,.006),w=u.normalize(u.create(),u.add(u.create(),p,M));t.ellipsoid(r(s(y,x),[0,-.0015,0]),[u.distance(y,x)/2+.002,.0055,.007],.008,w,[0,1,0])}return t}function ji(n,e){let{min:t,max:a}=n.bounds(),r=t[0]-e,s=t[1]-e,i=t[2]-e,o=Math.ceil((a[0]-t[0])/e)+3,c=Math.ceil((a[1]-t[1])/e)+3,d=Math.ceil((a[2]-t[2])/e)+3,l=new Float32Array(o*c*d),m=(L,E,N)=>(L*c+E)*d+N,h=2,b=h*e*Math.sqrt(3)*1.05+e,v=Math.ceil((o-1)/h),p=Math.ceil((c-1)/h),M=Math.ceil((d-1)/h),y=new Float32Array((v+1)*(p+1)*(M+1)),x=(L,E,N)=>(L*(p+1)+E)*(M+1)+N;for(let L=0;L<=v;L++)for(let E=0;E<=p;E++)for(let N=0;N<=M;N++)y[x(L,E,N)]=n.eval(r+Math.min(L*h,o-1)*e,s+Math.min(E*h,c-1)*e,i+Math.min(N*h,d-1)*e);let w=new Float32Array(8);for(let L=0;L<v;L++)for(let E=0;E<p;E++)for(let N=0;N<M;N++){let O=!1;for(let X=0;X<8;X++)w[X]=y[x(L+(X&1),E+(X>>1&1),N+(X>>2))],Math.abs(w[X])<b&&(O=!0);let C=L*h,U=E*h,q=N*h,V=Math.min(C+h,o-1),K=Math.min(U+h,c-1),B=Math.min(q+h,d-1),J=V===o-1?V:V-1,Q=K===c-1?K:K-1,Y=B===d-1?B:B-1;for(let X=C;X<=J;X++)for(let Z=U;Z<=Q;Z++){let ne=r+X*e,oe=s+Z*e,pe=(X*c+Z)*d;if(O)for(let we=q;we<=Y;we++)l[pe+we]=n.eval(ne,oe,i+we*e);else{let we=(X-C)/(V-C||1),Ie=(Z-U)/(K-U||1),$e=w[0]+(w[1]-w[0])*we,ke=w[2]+(w[3]-w[2])*we,Xe=w[4]+(w[5]-w[4])*we,At=w[6]+(w[7]-w[6])*we,ot=$e+(ke-$e)*Ie,Ve=Xe+(At-Xe)*Ie;for(let ct=q;ct<=Y;ct++)l[pe+ct]=ot+(Ve-ot)*((ct-q)/(B-q||1))}}}let g=o-1,k=c-1,f=d-1,A=new Int32Array(g*k*f).fill(-1),P=[],S=0,T=[[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]],j=new Float32Array(8);for(let L=0;L<g;L++)for(let E=0;E<k;E++)for(let N=0;N<f;N++){let O=0;for(let K=0;K<8;K++){let B=l[m(L+(K&1),E+(K>>1&1),N+(K>>2))];j[K]=B,B<=0&&(O|=1<<K)}if(O===0||O===255)continue;let C=0,U=0,q=0,V=0;for(let[K,B]of T){let J=O>>K&1,Q=O>>B&1;if(J===Q)continue;let Y=j[K],X=j[B],Z=Y/(Y-X);C+=(K&1)+((B&1)-(K&1))*Z,U+=(K>>1&1)+((B>>1&1)-(K>>1&1))*Z,q+=(K>>2)+((B>>2)-(K>>2))*Z,V++}P.push(r+(L+C/V)*e,s+(E+U/V)*e,i+(N+q/V)*e),A[(L*k+E)*f+N]=S++}let z=[],R=(L,E,N)=>A[(L*k+E)*f+N],I=(L,E,N,O,C)=>{L<0||E<0||N<0||O<0||(C?z.push(L,O,N,L,N,E):z.push(L,E,N,L,N,O))};for(let L=0;L<o;L++)for(let E=0;E<c;E++)for(let N=0;N<d;N++){let O=l[m(L,E,N)]<=0;if(L<g&&E>0&&N>0&&E<k&&N<f){let C=l[m(L+1,E,N)]<=0;O!==C&&I(R(L,E-1,N-1),R(L,E,N-1),R(L,E,N),R(L,E-1,N),O)}if(E<k&&L>0&&N>0&&L<g&&N<f){let C=l[m(L,E+1,N)]<=0;O!==C&&I(R(L-1,E,N-1),R(L,E,N-1),R(L,E,N),R(L-1,E,N),!O)}if(N<f&&L>0&&E>0&&L<g&&E<k){let C=l[m(L,E,N+1)]<=0;O!==C&&I(R(L-1,E-1,N),R(L,E-1,N),R(L,E,N),R(L-1,E,N),O)}}return{pos:Float32Array.from(P),tris:Uint32Array.from(z)}}function zi(n,e,t,a){let r=e.pos.length/3,s=e.pos,i=u.create(),o=(m,h)=>{for(let b=0;b<h;b++){let v=s[m*3],p=s[m*3+1],M=s[m*3+2],y=n.evalGrad(v,p,M,i),x=Math.max(-.0015,Math.min(.0015,y));s[m*3]-=i[0]*x,s[m*3+1]-=i[1]*x,s[m*3+2]-=i[2]*x}};for(let m=0;m<r;m++)o(m,1);let c=Array.from({length:r},()=>[]),d=e.tris;for(let m=0;m<d.length;m+=3){let h=d[m],b=d[m+1],v=d[m+2];c[h].includes(b)||c[h].push(b),c[h].includes(v)||c[h].push(v),c[b].includes(h)||c[b].push(h),c[b].includes(v)||c[b].push(v),c[v].includes(h)||c[v].push(h),c[v].includes(b)||c[v].push(b)}let l=new Float32Array(s.length);for(let m=0;m<t;m++){for(let h=0;h<r;h++){let b=c[h];if(!b.length){l[h*3]=s[h*3],l[h*3+1]=s[h*3+1],l[h*3+2]=s[h*3+2];continue}let v=0,p=0,M=0;for(let w of b)v+=s[w*3],p+=s[w*3+1],M+=s[w*3+2];v=v/b.length-s[h*3],p=p/b.length-s[h*3+1],M=M/b.length-s[h*3+2];let y=n.evalGrad(s[h*3],s[h*3+1],s[h*3+2],i),x=v*i[0]+p*i[1]+M*i[2]+Math.max(-.0015,Math.min(.0015,y));l[h*3]=s[h*3]+.6*v-i[0]*x,l[h*3+1]=s[h*3+1]+.6*p-i[1]*x,l[h*3+2]=s[h*3+2]+.6*M-i[2]*x}s.set(l)}for(let m=0;m<r;m++)n.grad(s[m*3],s[m*3+1],s[m*3+2],i),a[m*3]=i[0],a[m*3+1]=i[1],a[m*3+2]=i[2];for(let m=0;m<d.length;m+=3){let h=d[m]*3,b=d[m+1]*3,v=d[m+2]*3,p=s[b]-s[h],M=s[b+1]-s[h+1],y=s[b+2]-s[h+2],x=s[v]-s[h],w=s[v+1]-s[h+1],g=s[v+2]-s[h+2],k=M*g-y*w,f=y*x-p*g,A=p*w-M*x,P=a[h]+a[b]+a[v],S=a[h+1]+a[b+1]+a[v+1],T=a[h+2]+a[b+2]+a[v+2];if(k*P+f*S+A*T<0){let j=d[m+1];d[m+1]=d[m+2],d[m+2]=j}}}var Fa={membershipPower:7,fingerGates:[.008,.005,.0045],thumbGates:[.024,.0065,.005],wristGate:.012};function Ii(n,e,t){let a=t[0]-e[0],r=t[1]-e[1],s=t[2]-e[2],i=n[0]-e[0],o=n[1]-e[1],c=n[2]-e[2],d=a*a+r*r+s*s,l=d>0?Math.min(1,Math.max(0,(i*a+o*r+c*s)/d)):0;return Math.hypot(i-a*l,o-r*l,c-s*l)}var Li=(n,e,t)=>{let a=Math.min(1,Math.max(0,(t-n)/(e-n)));return a*a*(3-2*a)};function Ei(n,e){let t=(i,o)=>u.transformQuat(u.create(),i,o),a=[],r=(i,o,c,d)=>{let l={bones:[],segs:[],gates:[],island:d},m=null;for(let h=0;h<3;h++){let b=n[o(h)],v=t([0,0,-1],b.q);l.bones.push(o(h)),l.segs.push({a:u.clone(b.p),b:u.scaleAndAdd(u.create(),b.p,v,i.len[h]),r:i.r[h]});let p=m?u.normalize(u.create(),u.add(u.create(),m,v)):u.clone(v);l.gates.push({p:h===0?u.scaleAndAdd(u.create(),b.p,v,c[h]*.5):u.clone(b.p),axis:p,h:c[h]}),m=v}a.push(l)};Fe.forEach((i,o)=>r(i,c=>$.finger(o,c),Fa.fingerGates,1+o)),r(Ae,i=>$.thumb(i),Fa.thumbGates,5),a.push({bones:[$.foreA,$.foreB],segs:[{a:u.create(0,0,-.02),b:u.create(0,0,e),r:.03}],gates:[{p:u.create(0,0,.006),axis:u.create(0,0,1),h:Fa.wristGate},{p:u.create(0,0,.03),axis:u.create(0,0,1),h:0,linearTo:e}],island:0});let s={bones:[],segs:[],gates:[],island:0};return Fe.forEach((i,o)=>s.segs.push({a:u.clone(ur[o]),b:u.clone(n[$.finger(o,0)].p),r:.0095})),s.segs.push({a:u.create(0,0,-.035),b:u.create(0,0,-.005),r:.02}),a.push(s),a}function Fi(n,e,t,a){let r=0;for(let s=0;s<e.length;s++){let i=e[s],o=1/0;for(let d of i.segs)o=Math.min(o,Ii(n,d.a,d.b)/d.r);let c=Math.pow(o+.05,-Fa.membershipPower);a[s]=c,r+=c}t.fill(0);for(let s=0;s<e.length;s++){let i=e[s],o=a[s]/r;if(a[s]=o,o<1e-5)continue;let c=1,d=1;for(let l=0;l<i.bones.length;l++){let m=i.gates[l],h=(n[0]-m.p[0])*m.axis[0]+(n[1]-m.p[1])*m.axis[1]+(n[2]-m.p[2])*m.axis[2],b=m.linearTo!==void 0?Math.min(1,Math.max(0,h/(m.linearTo-m.p[2]))):Li(-m.h,m.h,h);l===0&&(d=1-b),l>0&&(t[i.bones[l-1]]+=o*c*(1-b)),c*=b}i.bones.length&&(t[i.bones[i.bones.length-1]]+=o*c),t[$.root]+=o*(i.bones.length?d:1)}}function Cn(n,e,t){let r=t/24,s=0;for(let i=0;i<24;i++){let o=(i+.5)*r;s+=Math.hypot(n*Math.sin(o),e*Math.cos(o))}return s*r}function Gi(n){let e=[];e.push({uv(a){let[r,s]=_n(a[2]),i=Math.atan2(a[1]/s,-a[0]/r),o=Cn(r,s,Math.PI*2);return[Cn(r,s,i),a[2],o]}});let t=(a,r)=>{let s=[0,1,2].map(d=>{let l=n[r(d)];return{p:l.p,q:D.invert(D.create(),l.q),len:a.len[d]}}),i=(a.r[0]+a.r[1]+a.r[2])/3,o=Math.PI*2*i,c=u.create();return{uv(d){let l=1/0,m=0,h=0,b=0;for(let v=0;v<3;v++){let p=s[v];u.transformQuat(c,u.set(c,d[0]-p.p[0],d[1]-p.p[1],d[2]-p.p[2]),p.q);let M=Math.min(0,Math.max(-p.len,c[2])),y=Math.hypot(c[0],c[1],c[2]-M);y<l&&(l=y,m=Math.atan2(c[1],-c[0])*i,h=b-c[2]),b+=p.len}return[m,h,o]}}};return Fe.forEach((a,r)=>e.push(t(a,s=>$.finger(r,s)))),e.push(t(Ae,a=>$.thumb(a))),e}function fr(n,e){let t=Mt(Dn,Vn,n),a=[];for(let r=0;r<$.count;r++){let s=F.create();r===$.foreA||(r===$.foreB?F.fromTranslation(s,[0,0,e]):F.fromRotationTranslation(s,t[r].q,t[r].p)),a.push(F.invert(F.create(),s))}return a}var Bn=new Map;function Xn(n={}){let e=n.cell??.0022,t=n.forearmLength??.27,a=n.skinnedForearm??.12,r=n.smoothIterations??2,s=JSON.stringify([e,t,a,r]),i=Bn.get(s);if(i)return i;let o=performance.now(),c=Mt(Dn,Vn,1),d=Ri(c,a);d.finalize(e*10);let l=ji(d,e),m=performance.now(),h=l.pos.length/3,b=new Float32Array(h*3);zi(d,l,r,b);let v=performance.now(),{min:p,max:M}=d.bounds(),y=Math.ceil((M[0]-p[0])/e+3)*Math.ceil((M[1]-p[1])/e+3)*Math.ceil((M[2]-p[2])/e+3),x=Ei(c,t),w=Gi(c),g=new Uint16Array(h*4),k=new Float32Array(h*4),f=new Uint8Array(h),A=new Float64Array($.count),P=new Float64Array(x.length),S=u.create();for(let B=0;B<h;B++){u.set(S,l.pos[B*3],l.pos[B*3+1],l.pos[B*3+2]),Fi(S,x,A,P);let J=0;for(let Y=1;Y<P.length;Y++)P[Y]>P[J]&&(J=Y);f[B]=x[J].island;let Q=0;for(let Y=0;Y<4;Y++){let X=-1,Z=1e-7;for(let ne=0;ne<$.count;ne++)A[ne]>Z&&(Z=A[ne],X=ne);if(X<0){g[B*4+Y]=0,k[B*4+Y]=0;continue}g[B*4+Y]=X,k[B*4+Y]=Z,Q+=Z,A[X]=0}for(let Y=0;Y<4;Y++)k[B*4+Y]/=Q||1}let T=[],j=[],z=[],R=[],I=[],L=[],E=new Map,N=new Map,O=(B,J)=>{let Q=B*8+J,Y=N.get(Q);return Y||(Y=w[J].uv(l.pos.subarray(B*3,B*3+3)),N.set(Q,Y)),Y},C=(B,J,Q,Y,X)=>{let Z=(B*8+J)*2+(X?1:0),ne=E.get(Z);if(ne===void 0){ne=T.length/3,E.set(Z,ne),T.push(l.pos[B*3],l.pos[B*3+1],l.pos[B*3+2]),j.push(b[B*3],b[B*3+1],b[B*3+2]),z.push(Q,Y);for(let oe=0;oe<4;oe++)R.push(g[B*4+oe]),I.push(k[B*4+oe])}return ne},U=l.tris;for(let B=0;B<U.length;B+=3){let J=U[B],Q=U[B+1],Y=U[B+2],X=f[J],Z=f[Q],ne=f[Y],oe=X===Z||X===ne?X:Z===ne?Z:X,pe=O(J,oe),we=O(Q,oe),Ie=O(Y,oe),$e=pe[2],ke=[pe[0],we[0],Ie[0]],Xe=[!1,!1,!1],At=Math.min(ke[0],ke[1],ke[2]);if(Math.max(ke[0],ke[1],ke[2])-At>$e/2)for(let Ve=0;Ve<3;Ve++)ke[Ve]-At<=$e/2&&(ke[Ve]+=$e,Xe[Ve]=!0);L.push(C(J,oe,ke[0],pe[1],Xe[0]),C(Q,oe,ke[1],we[1],Xe[1]),C(Y,oe,ke[2],Ie[1],Xe[2]))}let q=new de(T,j,z,L);q.joints=Uint16Array.from(R),q.weights=Float32Array.from(I),q.computeTangents();let V=Oi(c),K={geometry:q,nails:V,bindInverse:fr(1,t),bindFrames:c,forearmLength:t,stats:{vertices:q.vertexCount,triangles:q.triangleCount,cell:e,ms:performance.now()-o,gridSamples:y,phases:{grid:m-o,relax:v-m,skin:performance.now()-v},sdfEvals:d.evals}};return Bn.set(s,K),K}function Oi(n){let e=[],t=[],a=[],r=(i,o)=>{let c=Jn(i),d=n[o],l=Sr(1,20,12).scale(c.radii[0]*.95,c.radii[1]*.9,c.radii[2]*.95).rotateX(c.tilt).translate(c.centre[0],c.centre[1]+5e-4,c.centre[2]);l.transform(F.fromRotationTranslation(F.create(),d.q,d.p)),l.scaleUVs(.004);for(let m=0;m<l.vertexCount;m++)t.push(o,0,0,0),a.push(1,0,0,0);e.push(l)};Fe.forEach((i,o)=>r(i,$.finger(o,2))),r(Ae,$.thumb(2));let s=de.merge(e);return s.joints=Uint16Array.from(t),s.weights=Float32Array.from(a),s.computeTangents()}function _t(n){let e=n.clone();for(let t=0;t<e.positions.length;t+=3)e.positions[t]=-e.positions[t],e.normals[t]=-e.normals[t];return e.flipWinding(),e.tangents=null,e.computeTangents()}var Yn=.1,Ni=.12,Na=class{constructor(e,t={}){this.renderer=e;this.options={skin:t.skin??"bare",skinColor:t.skinColor??[.56,.36,.27],gloveColor:t.gloveColor??[.035,.033,.03],palmColor:t.palmColor??[.06,.05,.04],sleeveColor:t.sleeveColor??[.075,.08,.065],shoulderRight:t.shoulderRight??[.2,-.31,.1],shoulderLeft:t.shoulderLeft??[-.2,-.31,.1],forearmLength:t.forearmLength??.27,upperArmLength:t.upperArmLength??.31,viewmodel:t.viewmodel??!0,meshCell:t.meshCell??Math.min(.0035,Math.max(.0016,.0033/je.detail))};let a=e.synth,r=Math.min(je.textureSize,2048),s=this.options.skin==="bare",i=s?a.material("skin",{size:r,tileMeters:.05,color:this.options.skinColor,seed:71},{name:"skin",specular:.35,normalScale:.85}):a.material("glove",{size:r,tileMeters:.04,color:this.options.gloveColor,seed:61},{name:"glove-knit",specular:.3,normalScale:.9}),o=a.material("glove",{size:1024,tileMeters:.05,color:this.options.palmColor,extra:1,seed:64},{name:"glove-leather",specular:.4}),c=a.material("skin",{size:512,tileMeters:.02,color:this.options.skinColor,extra:1,seed:72},{name:"nail",specular:.6,normalScale:.5}),d=a.material("webbing",{size:r,tileMeters:.06,color:this.options.sleeveColor,seed:63},{name:"sleeve"}),l=e.dev,m=(x,w,g)=>{let k=new ge(new me(l,x,{label:g}),w);return k.viewmodel=this.options.viewmodel,k.castShadow=!this.options.viewmodel,this.objects.push(k),k},h=this.options.forearmLength,b=Xn({cell:this.options.meshCell,forearmLength:h,skinnedForearm:Ni});this.meshStats=b.stats,this.sleeveLength=h-Yn+.03;let v=Bi(this.sleeveLength),p=tt(.046,.054,1,ee(20)).rotateX(Math.PI/2).translate(0,0,-.5).scale(1,.88,1),M=Ui(),y=Ci();for(let x of[1,-1]){let w=x===1?b.geometry:_t(b.geometry),g=x===1?b.nails:_t(b.nails),k=new Float32Array($.count*16);for(let S=0;S<$.count;S++)F.identity(k.subarray(S*16,S*16+16));let f=m(w,i,`hand-${x}`),A=m(g,c,`nails-${x}`);f.joints=k,A.joints=k,A.visible=s;let P=[];s||(P.push(m(x===1?M:_t(M),o,`cuff-${x}`)),P.push(m(x===1?y:_t(y),o,`knuckles-${x}`))),this.sides.push({side:x,hand:f,nails:A,joints:k,trim:P,sleeve:m(v,d,`sleeve-${x}`),upper:m(p,d,`upper-${x}`),bindInv:x===1?b.bindInverse:fr(-1,h),frames:Array.from({length:$.count},()=>({p:u.create(),q:D.create()}))})}}objects=[];options;visible=!0;meshStats;sides=[];sleeveLength;tmp=F.create();tmp2=F.create();addTo(e){for(let t of this.objects)e.add(t);return this}setVisible(e){this.visible=e;for(let t of this.objects)t.visible=e;if(e&&this.options.skin!=="bare")for(let t of this.sides)t.nails.visible=!1}update(e,t,a,r={}){if(!this.visible)return;let s=t.right,i=t.indexPressed&&(r.trigger??0)>0?Qn(s.fingers[0],t.indexPressed,r.trigger??0):s.fingers[0],o={...s,fingers:[i,s.fingers[1],s.fingers[2],s.fingers[3]]};this.poseHand(this.sides[0],e,o,a,this.options.shoulderRight);let c=t.left??null;r.leftOverride&&c?c=pr(c,r.leftOverride,r.leftWeight??1):r.leftOverride&&(c=r.leftOverride);let d=this.sides[1],l=!!c;d.hand.visible=d.sleeve.visible=d.upper.visible=l;for(let m of d.trim)m.visible=l;d.nails.visible=l&&this.options.skin==="bare",c&&this.poseHand(d,e,c,a,this.options.shoulderLeft)}poseHand(e,t,a,r,s){let i=e.side,o=Ce(a.fingerDir,a.dorsal),c=F.fromRotationTranslation(F.create(),o,a.position),d=F.multiply(F.create(),t,c);for(let E of e.trim)E.setTransform(d);let l=Mt(a.fingers,a.thumb,i,e.frames),m=e.joints,h=this.tmp,b=this.tmp2;for(let E=0;E<$.foreA;E++)F.fromRotationTranslation(h,l[E].q,l[E].p),F.multiply(b,d,h),F.multiply(h,b,e.bindInv[E]),m.set(h,E*16);let v=u.transformMat4(u.create(),[0,0,0],d),p=F.getRotation(D.create(),d),M=u.normalize(u.create(),u.transformQuat(u.create(),[0,0,1],p)),y=u.transformQuat(u.create(),[0,1,0],p),x=this.options.forearmLength,w=this.options.upperArmLength,g,k;if(r){k=u.add(u.create(),u.set(u.create(),r.position[0],r.position[1],r.position[2]),u.transformQuat(u.create(),s,r.rotation));let E=(w+x)*.995;u.distance(k,v)>E&&(k=u.scaleAndAdd(u.create(),v,u.normalize(u.create(),u.sub(u.create(),k,v)),E));let O=u.transformQuat(u.create(),[i*.7,-1,.15],r.rotation);g=Di(k,v,w,x,O,M)}else g=u.scaleAndAdd(u.create(),v,M,x),k=u.scaleAndAdd(u.create(),g,M,w);let f=u.sub(u.create(),g,v),A=u.length(f),P=u.scale(u.create(),f,1/Math.max(A,1e-6)),S=u.negate(u.create(),P),T=u.sub(u.create(),k,g),j=u.scaleAndAdd(u.create(),T,P,-u.dot(T,P)),z=u.normalize(u.create(),u.scaleAndAdd(u.create(),y,j,-1/w*1.4));F.fromRotationTranslation(h,Ce(S,y),v),m.set(h,$.foreA*16),F.fromRotationTranslation(b,Ce(S,z),g),F.multiply(h,b,e.bindInv[$.foreB]),m.set(h,$.foreB*16);let R=(E,N,O,C,U)=>{let q=u.sub(u.create(),O,N),V=u.length(q),K=u.scale(u.create(),q,1/Math.max(V,1e-6)),B=F.fromRotationTranslation(this.tmp,Ce(K,C),N),J=V/U;B[8]*=J,B[9]*=J,B[10]*=J,E.setTransform(B)},I=u.normalize(u.create(),u.lerp(u.create(),y,z,.4));R(e.sleeve,u.scaleAndAdd(u.create(),v,P,Yn*(A/x)),u.scaleAndAdd(u.create(),g,P,.03),I,this.sleeveLength);let L=u.normalize(u.create(),T);R(e.upper,u.scaleAndAdd(u.create(),g,L,-.02),u.scaleAndAdd(u.create(),k,L,.4),z,1)}};function Ui(){let n=Pe([[.0295,-.006],[.0315,-.004],[.0325,0],[.0335,.014],[.0345,.03],[.0335,.038],[.031,.04],[.0295,.038]],ee(26)).rotateX(-Math.PI/2).scale(1,.66,1),e=ce(.062,.0032,.018,.001).translate(.004,.0255,.021),t=ce(.016,.0036,.018,.0012).translate(.041,.0245,.021);return de.merge([n,e,t]).computeTangents()}function Ci(){let n=ce(.066,.006,.03,.0028,4).translate(0,.0165,-.07);{let e=n.positions;for(let t=0;t<e.length;t+=3){let a=e[t]/.033;e[t+1]-=.0032*a*a}}return n.computeNormals().computeTangents()}function Bi(n){let e=[[.039,.007],[.041,0],[.0445,.003],[.047,.009],[.0475,.017],[.046,.026],[.044,.034],[.044,n*.45],[.0465,n*.8],[.048,n],[.04,n+.004],[0,n+.004]];return Pe(e,ee(22)).rotateX(-Math.PI/2).scale(1,.88,1)}function Di(n,e,t,a,r,s){let i=u.sub(u.create(),e,n),o=u.length(i);if(o<1e-5)return u.scaleAndAdd(u.create(),e,s,a);let c=u.scale(u.create(),i,1/o);o=Math.min(o,(t+a)*.9995);let d=(t*t-a*a+o*o)/(2*o),l=Math.sqrt(Math.max(0,t*t-d*d)),m=u.scaleAndAdd(u.create(),r,c,-u.dot(r,c)),h=u.length(m)>1e-6?u.normalize(m,m):u.normalize(u.create(),u.cross(u.create(),c,u.create(0,1,0))),b=u.scaleAndAdd(u.create(),n,c,d);return u.scaleAndAdd(b,b,h,l)}function Qn(n,e,t){return{curl:[n.curl[0]+(e.curl[0]-n.curl[0])*t,n.curl[1]+(e.curl[1]-n.curl[1])*t,n.curl[2]+(e.curl[2]-n.curl[2])*t],spread:(n.spread??0)+((e.spread??0)-(n.spread??0))*t}}function Oa(n,e,t){return[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t,n[2]+(e[2]-n[2])*t]}function pr(n,e,t){return{position:Oa(n.position,e.position,t),fingerDir:Oa(n.fingerDir,e.fingerDir,t),dorsal:Oa(n.dorsal,e.dorsal,t),fingers:[0,1,2,3].map(a=>Qn(n.fingers[a],e.fingers[a],t)),thumb:{dir:Oa(n.thumb.dir,e.thumb.dir,t),bend:[n.thumb.bend[0]+(e.thumb.bend[0]-n.thumb.bend[0])*t,n.thumb.bend[1]+(e.thumb.bend[1]-n.thumb.bend[1])*t]}}}function gr(n){let e=[],t=[],a=u.create();for(let h of n.parts){let b=h.object.mesh.source;if(!b)continue;let v=e.length/3,p=b.positions.length/3;for(let M=0;M<p;M++)u.transformMat4(a,[b.positions[M*3],b.positions[M*3+1],b.positions[M*3+2]],h.local),e.push(a[0],a[1],a[2]);for(let M=0;M<b.indices.length;M++)t.push(v+b.indices[M])}if(!t.length)return null;let r=new Float32Array(e),s=new Uint32Array(t),i=s.length/3,o=new Float32Array(i*3),c=u.create(1/0,1/0,1/0);for(let h=0;h<r.length;h+=3)c[0]=Math.min(c[0],r[h]),c[1]=Math.min(c[1],r[h+1]),c[2]=Math.min(c[2],r[h+2]);let d=.012,l=new Map,m=(h,b,v)=>(h&1023)<<20|(b&1023)<<10|v&1023;for(let h=0;h<i;h++){let b=s[h*3]*3,v=s[h*3+1]*3,p=s[h*3+2]*3,M=u.create(r[v]-r[b],r[v+1]-r[b+1],r[v+2]-r[b+2]),y=u.create(r[p]-r[b],r[p+1]-r[b+1],r[p+2]-r[b+2]),x=u.cross(u.create(),M,y),w=u.length(x)||1;o[h*3]=x[0]/w,o[h*3+1]=x[1]/w,o[h*3+2]=x[2]/w;let g=[1/0,1/0,1/0],k=[-1/0,-1/0,-1/0];for(let P of[b,v,p])for(let S=0;S<3;S++)g[S]=Math.min(g[S],r[P+S]),k[S]=Math.max(k[S],r[P+S]);let f=g.map((P,S)=>Math.floor((P-c[S])/d)),A=k.map((P,S)=>Math.floor((P-c[S])/d));for(let P=f[0];P<=A[0];P++)for(let S=f[1];S<=A[1];S++)for(let T=f[2];T<=A[2];T++){let j=m(P,S,T),z=l.get(j);z||l.set(j,z=[]),z.push(h)}}return{pos:r,tri:s,nrm:o,grid:l,cell:d,min:c}}function Vi(n,e,t,a,r){let s=u.sub(u.create(),t,e),i=u.sub(u.create(),a,e),o=u.sub(u.create(),n,e),c=u.dot(s,o),d=u.dot(i,o);if(c<=0&&d<=0)return u.copy(r,e);let l=u.sub(u.create(),n,t),m=u.dot(s,l),h=u.dot(i,l);if(m>=0&&h<=m)return u.copy(r,t);let b=c*h-m*d;if(b<=0&&c>=0&&m<=0){let f=c/(c-m);return u.scaleAndAdd(r,e,s,f)}let v=u.sub(u.create(),n,a),p=u.dot(s,v),M=u.dot(i,v);if(M>=0&&p<=M)return u.copy(r,a);let y=p*d-c*M;if(y<=0&&d>=0&&M<=0){let f=d/(d-M);return u.scaleAndAdd(r,e,i,f)}let x=m*M-p*h;if(x<=0&&h-m>=0&&p-M>=0){let f=(h-m)/(h-m+(p-M));return u.sub(r,a,t),u.scaleAndAdd(r,t,r,f)}let w=1/(x+y+b),g=y*w,k=b*w;return u.scaleAndAdd(r,e,s,g),u.scaleAndAdd(r,r,i,k)}function Jt(n,e,t){let a=Math.floor((e[0]-n.min[0])/n.cell),r=Math.floor((e[1]-n.min[1])/n.cell),s=Math.floor((e[2]-n.min[2])/n.cell),i=Math.ceil(t/n.cell),o=1/0,c=-1,d=u.create(),l=u.create(),m=u.create(),h=u.create(),b=(g,k,f)=>(g&1023)<<20|(k&1023)<<10|f&1023,v=new Set;for(let g=0;g<=i;g++){for(let k=a-g;k<=a+g;k++)for(let f=r-g;f<=r+g;f++)for(let A=s-g;A<=s+g;A++){if(Math.max(Math.abs(k-a),Math.abs(f-r),Math.abs(A-s))!==g)continue;let P=n.grid.get(b(k,f,A));if(P)for(let S of P){if(v.has(S))continue;v.add(S);let T=n.tri[S*3]*3,j=n.tri[S*3+1]*3,z=n.tri[S*3+2]*3;u.set(l,n.pos[T],n.pos[T+1],n.pos[T+2]),u.set(m,n.pos[j],n.pos[j+1],n.pos[j+2]),u.set(h,n.pos[z],n.pos[z+1],n.pos[z+2]),Vi(e,l,m,h,d);let R=u.distance(e,d);R<o&&(o=R,c=S)}}if(c>=0&&o<g*n.cell)break}if(c<0)return t;let p=n.tri[c*3]*3,M=e[0]-n.pos[p],y=e[1]-n.pos[p+1],x=e[2]-n.pos[p+2];return M*n.nrm[c*3]+y*n.nrm[c*3+1]+x*n.nrm[c*3+2]<0?-o:o}var Hi=[1.65,1.95,1.25],qi=[1,1.3];function Ca(n){return F.fromRotationTranslation(F.create(),Ce(n.fingerDir,n.dorsal),n.position)}function Ua(n,e,t,a,r,s,i,o,c=5){let l=Mt(t,a,r)[s],m=u.transformQuat(u.create(),[0,0,-1],l.q),h=1/0,b=u.create(),v=u.create();for(let p=0;p<=c;p++){u.scaleAndAdd(b,l.p,m,i*(.3+.7*(p/c))),u.transformMat4(v,b,e);let M=Jt(n,v,.06)-o;M<h&&(h=M)}return h}function Zn(n,e,t,a){if(n(t)>=a)return t;if(n(e)<a)return e;for(let r=0;r<14;r++){let s=(e+t)/2;n(s)>=a?e=s:t=s}return e}function Wi(n,e,t,a={}){let r=a.clearance??8e-4,s=a.maxCurl??Hi,i=a.maxThumbBend??qi,o={...n,position:[...n.position],fingers:n.fingers.map(b=>({...b,curl:[...b.curl]})),thumb:{dir:[...n.thumb.dir],bend:[...n.thumb.bend]}},c={changed:0,palmPush:0,fingers:[]},d=Ca(o),l=a.lockIndex??!1,m=b=>!(o.fingers[b].lock||b===0&&l),h=o.fingers.map((b,v)=>m(v)?{...b,curl:[0,0,0]}:b);if(a.fixPalm!==!1){let b=u.normalize(u.create(),u.set(u.create(),n.dorsal[0],n.dorsal[1],n.dorsal[2])),v=u.normalize(u.create(),u.set(u.create(),n.fingerDir[0],n.fingerDir[1],n.fingerDir[2])),p=[...o.position],M=u.create(),y=()=>{let w=1/0;for(let g=0;g<=3;g++)for(let k=-1;k<=1;k++){let f=he.z0+(he.z1-he.z0)*(g/3),A=he.t0+(he.t1-he.t0)*(g/3),P=(he.w0+(he.w1-he.w0)*(g/3))*.8;u.transformMat4(M,[k*P*t,-A,f],d),w=Math.min(w,Jt(e,M,.05))}return o.fingers.forEach((g,k)=>{m(k)&&(w=Math.min(w,Ua(e,d,h,o.thumb,t,$.finger(k,0),Fe[k].len[0],Fe[k].r[0])))}),Math.max(0,-w)},x={score:y()*1e3,a:0,b:0};if(x.score>0){for(let w=0;w<=16;w+=2)for(let g=-16;g<=16;g+=2){if(w===0&&g===0)continue;for(let f=0;f<3;f++)o.position[f]=p[f]+b[f]*w*.001+v[f]*g*.001;d=Ca(o);let k=y()*1e3+.12*Math.hypot(w,g);k<x.score&&(x={score:k,a:w,b:g})}for(let w=0;w<3;w++)o.position[w]=p[w]+b[w]*x.a*.001+v[w]*x.b*.001;d=Ca(o),c.palmPush=Math.hypot(x.a,x.b)*.001,c.offset=[x.a*.001,x.b*.001]}}o.fingers.forEach((b,v)=>{if(!m(v))return;let p=[...b.curl],M=Fe[v];for(let y=0;y<3;y++){let x=w=>{let g=o.fingers.map((f,A)=>A===v?{...f,curl:f.curl.map((P,S)=>S===y?w:S>y?0:P)}:f),k=1/0;for(let f=y;f<3;f++)k=Math.min(k,Ua(e,d,g,o.thumb,t,$.finger(v,f),M.len[f],M.r[f]));return k};b.curl[y]=Zn(x,0,Math.min(s[y],p[y]+.4),r)}p.some((y,x)=>Math.abs(y-b.curl[x])>.001)&&(c.changed++,c.fingers.push({finger:v,from:p,to:[...b.curl]}))});{let b=[...o.thumb.bend],v=[...o.thumb.dir],p=M=>Ua(e,d,o.fingers,{dir:M,bend:[0,0]},t,$.thumb(0),Ae.len[0],Ae.r[0]);if(p(v)<0){let M={pen:-p(v)*1e3,ang:0};for(let y=5;y<=60;y+=5)for(let x of[1,-1]){let w=D.setAxisAngle(D.create(),[0,0,1],x*y*Math.PI/180),g=u.transformQuat(u.create(),v,w),k=[g[0],g[1],g[2]],f=Math.max(0,-p(k))*1e3+y*.03;f<M.pen&&(M={pen:f,ang:x*y})}if(M.ang){let y=D.setAxisAngle(D.create(),[0,0,1],M.ang*Math.PI/180),x=u.transformQuat(u.create(),v,y);o.thumb.dir=[x[0],x[1],x[2]],c.thumbTurnDeg=M.ang}}for(let M=0;M<2;M++){let y=x=>{let w={dir:o.thumb.dir,bend:o.thumb.bend.map((k,f)=>f===M?x:f>M?0:k)},g=1/0;for(let k=M+1;k<3;k++)g=Math.min(g,Ua(e,d,o.fingers,w,t,$.thumb(k),Ae.len[k],Ae.r[k]));return g};o.thumb.bend[M]=Zn(y,0,Math.min(i[M],b[M]+.4),r)}b.some((M,y)=>Math.abs(M-o.thumb.bend[y])>.001)&&(c.changed++,c.fingers.push({finger:4,from:b,to:[...o.thumb.bend]}))}return{pose:o,report:c}}function $n(n,e,t={}){let a=gr(e);if(!a)return{grips:n,reports:{}};let r={},s=(o,c,d,l)=>{if(!c)return c;let m=Wi(c,a,d,{...t,lockIndex:l});return r[o]=m.report,m.pose},i={...n,right:s("right",n.right,1,!1),left:s("left",n.left,-1,!1),leftOnMagazine:s("leftOnMagazine",n.leftOnMagazine,-1,!1)};if(n.indexPressed){let o=s("indexPressed",{...i.right,fingers:[n.indexPressed,i.right.fingers[1],i.right.fingers[2],i.right.fingers[3]]},1,!1);i.indexPressed=o.fingers[0]}for(let o of Object.keys(n)){if(o==="right"||o==="left"||o==="leftOnMagazine"||o==="indexPressed")continue;let c=n[o];c&&typeof c=="object"&&"fingers"in c&&(i[o]=s(o,c,-1,!1))}return{grips:i,reports:r}}function es(n,e,t=.1){let a=gr(n);return a?Jt(a,u.create(e[0],e[1],e[2]),t):t}function ts(n,e,t){let a=gr(e);if(!a)return null;let r=Ca(n),s=Mt(n.fingers,n.thumb,t),i={},o=u.create(),c=u.create(),d=(b,v,p,M)=>{let y=s[v],x=u.transformQuat(u.create(),[0,0,-1],y.q),w=[];for(let g=0;g<=5;g++)u.scaleAndAdd(o,y.p,x,p*(g+.5)/6),u.transformMat4(c,o,r),w.push(Math.round((Jt(a,c,.06)-M)*1e4)/10);i[b]=w};Fe.forEach((b,v)=>{for(let p=0;p<3;p++)d(`f${v}${p}`,$.finger(v,p),b.len[p],b.r[p])});for(let b=0;b<3;b++)d(`t${b}`,$.thumb(b),Ae.len[b],Ae.r[b]);let l=[];for(let b=0;b<=3;b++)for(let v=-1;v<=1;v++){let p=he.z0+(he.z1-he.z0)*(b/3),M=he.t0+(he.t1-he.t0)*(b/3),y=(he.w0+(he.w1-he.w0)*(b/3))*.8;u.transformMat4(c,[v*y*t,-M,p],r),l.push(Math.round(Jt(a,c,.05)*1e4)/10)}i.palm=l;let m=u.transformMat4(u.create(),[0,0,0],r),h=u.transformMat4(u.create(),s[$.finger(1,0)].p,r);for(let b=0;b<3;b++){let v=s[$.finger(0,b)],p=u.transformQuat(u.create(),[0,0,-1],v.q),M=[];for(let y=0;y<=2;y++)u.scaleAndAdd(o,v.p,p,Fe[0].len[b]*(.3+.7*(y/2))),u.transformMat4(c,o,r),M.push(...Array.from(c).map(x=>Math.round(x*1e4)/1e4));i[`f0${b}_pos`]=M}return i.wristW=Array.from(m).map(b=>Math.round(b*1e4)/1e4),i.middleKnuckleW=Array.from(h).map(b=>Math.round(b*1e4)/1e4),i}var as=["Index","Middle","Ring","Pinky"],rs=n=>n.replace(/^.*[:|]/,"").replace(/^mixamorig\d*_?/i,""),Ba=class n{objects=[];asset;inst;skin;restLocal;restWorld;parent;order;sides;keepSet;jointData;rigScale=1;visible=!0;opts;constructor(e,t,a={}){this.inst=t,this.asset=t.asset,this.opts={shoulderRight:a.shoulderRight??[.19,-.3,.1],shoulderLeft:a.shoulderLeft??[-.19,-.3,.1],keep:a.keep??[],viewmodel:a.viewmodel??!0};let r=this.asset;if(!r.skins.length)throw new Error("SkinnedArms: the model has no skin");this.skin={joints:r.skins[0].joints,ibm:r.skins[0].inverseBindMatrices},this.parent=r.nodes.map(l=>l.parent),this.restLocal=r.nodes.map(l=>({t:u.create(...l.translation),r:D.fromValues(...l.rotation),s:u.create(...l.scale)})),this.restWorld=cr(r),this.order=[];let s=l=>{this.order.push(l);for(let m of r.nodes[l].children)s(m)};r.nodes.forEach((l,m)=>{l.parent<0&&s(m)});let i=l=>r.nodes.findIndex(m=>rs(m.name)===l),o=l=>{let m=i(l);if(m<0)throw new Error(`SkinnedArms: bone "${l}" not found (Mixamo naming expected)`);return m},c=l=>u.create(this.restWorld[l][12],this.restWorld[l][13],this.restWorld[l][14]);this.sides=["Right","Left"].map((l,m)=>{let h=m===0?1:-1,b=o(`${l}Arm`),v=o(`${l}ForeArm`),p=o(`${l}Hand`),M=as.map(T=>[1,2,3].map(j=>i(`${l}Hand${T}${j}`))),y=[1,2,3].map(T=>i(`${l}HandThumb${T}`)),x=c(p),w=M[1][0]>=0?c(M[1][0]):u.add(u.create(),x,u.sub(u.create(),x,c(v))),g=u.normalize(u.create(),u.sub(u.create(),w,x)),k=M[0][0]>=0&&M[3][0]>=0?u.normalize(u.create(),u.sub(u.create(),c(M[0][0]),c(M[3][0]))):u.create(0,0,1),f=u.normalize(u.create(),u.cross(u.create(),k,g));y[0]>=0&&u.dot(u.sub(u.create(),c(y[0]),x),f)>0&&u.scale(f,f,-1);let A={s:h,shoulder:i(`${l}Shoulder`),arm:b,fore:v,hand:p,fingers:M,thumb:y,armLen:u.distance(c(b),c(v)),foreLen:u.distance(c(v),x),restFinger:g,restDorsal:f,restHandQ:F.getRotation(D.create(),this.restWorld[p]),flexLocal:new Map},P=u.scale(u.create(),f,-1),S=u.normalize(u.create(),u.cross(u.create(),g,P));for(let T of[...M.flat(),y[1],y[2]]){if(T<0)continue;let j=F.getRotation(D.create(),this.restWorld[T]),z=D.invert(D.create(),j);A.flexLocal.set(T,u.normalize(u.create(),u.transformQuat(u.create(),S,z)))}return A}),this.rigScale=Math.hypot(this.restWorld[this.sides[0].arm][0],this.restWorld[this.sides[0].arm][1],this.restWorld[this.sides[0].arm][2]),this.keepSet=new Set;let d=/^(Right|Left)(Shoulder|Arm|ForeArm|Hand.*)$/;r.nodes.forEach((l,m)=>{let h=rs(l.name);(d.test(h)||this.opts.keep.includes(h))&&this.keepSet.add(m)}),this.jointData=new Float32Array(this.skin.joints.length*16);for(let l of t.drawables){if(!l.skinned)continue;let m=new ge(l.mesh,l.material);m.viewmodel=this.opts.viewmodel,m.castShadow=!this.opts.viewmodel,m.joints=this.jointData,this.objects.push(m)}}static async fromAsset(e,t,a={}){return new n(e,za(e,t),a)}addTo(e){for(let t of this.objects)e.add(t);return this}setVisible(e){this.visible=e;for(let t of this.objects)t.visible=e}update(e,t,a,r={}){if(!this.visible||!a)return;let s=this.asset.nodes.length,i=this.restLocal.map(z=>({t:u.clone(z.t),r:D.copy(D.create(),z.r),s:u.clone(z.s)})),o=u.transformQuat(u.create(),[0,0,-1],a.rotation),c=Math.atan2(-o[0],-o[2]),d=D.fromEuler(D.create(),0,c,0),l=this.restWorld[this.sides[0].arm],m=this.restWorld[this.sides[1].arm],h=u.create((l[12]+m[12])/2,(l[13]+m[13])/2,(l[14]+m[14])/2),b=u.create((this.opts.shoulderRight[0]+this.opts.shoulderLeft[0])/2,(this.opts.shoulderRight[1]+this.opts.shoulderLeft[1])/2,(this.opts.shoulderRight[2]+this.opts.shoulderLeft[2])/2),v=u.add(u.create(),u.create(a.position[0],a.position[1],a.position[2]),u.transformQuat(u.create(),b,a.rotation)),p=D.multiply(D.create(),d,D.fromEuler(D.create(),0,Math.PI,0)),M=F.fromRotationTranslation(F.create(),p,v);F.translate(M,M,[-h[0],-h[1],-h[2]]);let y=new Array(s),x=new Array(s),w=(z=0)=>{for(let R=z;R<this.order.length;R++){let I=this.order[R],L=F.fromRotationTranslationScale(F.create(),i[I].r,i[I].t,i[I].s),E=this.parent[I];y[I]=E>=0?F.multiply(F.create(),y[E],L):F.multiply(F.create(),M,L),x[I]=F.getRotation(D.create(),y[I])}};w();let g=z=>u.create(y[z][12],y[z][13],y[z][14]),k=(z,R)=>{let I=this.parent[z],L=I>=0?x[I]:F.getRotation(D.create(),M);D.multiply(i[z].r,D.invert(D.create(),L),R)},f=(z,R,I)=>{let L=u.normalize(u.create(),u.sub(u.create(),g(R),g(z))),E=u.normalize(u.create(),u.sub(u.create(),I,g(z))),N=D.rotationTo(D.create(),L,E);k(z,D.multiply(D.create(),N,x[z]))},A=t.right,P=t.indexPressed&&(r.trigger??0)>0?Ki(A.fingers[0],t.indexPressed,r.trigger??0):A.fingers[0],S=t.left??null;r.leftOverride&&S?S=pr(S,r.leftOverride,r.leftWeight??1):r.leftOverride&&(S=r.leftOverride);let T=[{...A,fingers:[P,A.fingers[1],A.fingers[2],A.fingers[3]]},S];this.sides.forEach((z,R)=>{let I=T[R];if(!I)return;let L=D.multiply(D.create(),F.getRotation(D.create(),e),Ce(I.fingerDir,I.dorsal)),E=u.transformMat4(u.create(),I.position,e),N=g(z.arm),O=z.armLen*this.rigScaleAt(z.arm,y),C=z.foreLen*this.rigScaleAt(z.arm,y),U=(O+C)*.995,q=u.distance(N,E),V=q>U?u.scaleAndAdd(u.create(),E,u.normalize(u.create(),u.sub(u.create(),N,E)),U):N;if(z.shoulder>=0&&q>U){let Z=this.parent[z.shoulder],ne=Z>=0?Math.hypot(y[Z][0],y[Z][1],y[Z][2]):1,oe=u.transformQuat(u.create(),u.sub(u.create(),V,N),D.invert(D.create(),x[Z]));i[z.shoulder].t=u.scaleAndAdd(i[z.shoulder].t,i[z.shoulder].t,oe,1/Math.max(ne,1e-9)),w()}let K=u.transformQuat(u.create(),[z.s*.7,-1,.15],a.rotation),B=_i(g(z.arm),E,O,C,K);f(z.arm,z.fore,B),w(),f(z.fore,z.hand,E),w();let J=Ce(z.restFinger,z.restDorsal),Q=D.multiply(D.create(),F.getRotation(D.create(),M),J),Y=D.multiply(D.create(),F.getRotation(D.create(),M),z.restHandQ),X=D.multiply(D.create(),L,D.invert(D.create(),Q));k(z.hand,D.multiply(D.create(),X,Y)),as.forEach((Z,ne)=>{let oe=I.fingers[ne];z.fingers[ne].forEach((pe,we)=>{if(pe<0)return;let Ie=z.flexLocal.get(pe);Ie&&(i[pe].r=D.multiply(D.create(),this.restLocal[pe].r,D.setAxisAngle(D.create(),Ie,oe.curl[we])))})});for(let Z=1;Z<3;Z++){let ne=z.thumb[Z],oe=ne>=0?z.flexLocal.get(ne):void 0;oe&&(i[ne].r=D.multiply(D.create(),this.restLocal[ne].r,D.setAxisAngle(D.create(),oe,I.thumb.bend[Z-1]*.8)))}w()});let j=F.fromRotationTranslationScale(F.create(),D.create(),u.scaleAndAdd(u.create(),v,o,-.25),[1e-4,1e-4,1e-4]);this.skin.joints.forEach((z,R)=>{let I=this.skin.ibm.subarray(R*16,R*16+16),L=this.keepSet.has(z)?F.multiply(F.create(),y[z],I):j;this.jointData.set(L,R*16)})}rigScaleAt(e,t){let a=t[e];return Math.hypot(a[0],a[1],a[2])/Math.max(this.rigScale,1e-9)*this.rigScale/Math.max(Math.hypot(this.restWorld[e][0],this.restWorld[e][1],this.restWorld[e][2]),1e-9)}};function Ki(n,e,t){return{curl:[n.curl[0]+(e.curl[0]-n.curl[0])*t,n.curl[1]+(e.curl[1]-n.curl[1])*t,n.curl[2]+(e.curl[2]-n.curl[2])*t],spread:n.spread}}function _i(n,e,t,a,r){let s=u.sub(u.create(),e,n),i=u.length(s),o=u.scale(u.create(),s,1/Math.max(i,1e-6));i=Math.min(i,(t+a)*.9995);let c=(t*t-a*a+i*i)/(2*i),d=Math.sqrt(Math.max(0,t*t-c*c)),l=u.scaleAndAdd(u.create(),r,o,-u.dot(r,o));u.normalize(l,l);let m=u.scaleAndAdd(u.create(),n,o,c);return u.scaleAndAdd(m,m,l,d)}var Ji=(function(){var n="b9H79Tebbbe;veC9Geueu9Geub9Gbb9Gsuuuuuuuuuuuu99uueu9Gvuuuuub9Gruuuuuuub9Gouuuuuue999Gvuuuuueu9Gzuuuuuuuuuuu99uuuub9Gquuuuuuu99uueu9GPuuuuuuuuuuu99uueu9Gquuuuuuuu99ueu9Gruuuuuu99eu9Gwuuuuuu99ueu9Giuuue999GDuuuuuuuuueu9Gkuuuuuuuu99uub9Gluuuueu9Gluuuub9Giuuueui3EdilvorlwDiqkrxmPszdHObAAbeAlve9Weiiviebeoweuecj:Gdkr:Sdmo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bbz9TW79O9V9Wt9F79P9T9W29P9M95bw8E9TW79O9V9Wt9F79P9T9W29P9M959x9Pt9OcttV9P9I91tW7bD8A9TW79O9V9Wt9F79P9T9W29P9M959x9Pt9O9v9W9K9HtWbqQ9TW79O9V9Wt9F79P9T9W29P9M959t29V9W9W95bkX9TW79O9V9Wt9F79P9T9W29P9M959qV919UWbmQ9TW79O9V9Wt9F79P9T9W29P9M959q9V9P9Ut7bPX9TW79O9V9Wt9F79P9T9W29P9M959t9J9H2WbsP9TW79O9V9Wt9FVW9TW79Obza9TW79O9V9Wt9F9V9Wt9P9T9P96W9wWVtW94SWt9J9O9sW9T9H9WbA59TW79O9V9Wt9F9NW9UWV9HtW9q9V79Pt9P9V9U9sW9T9H9WbCl79IV9RbXDwebcekdKYq:p:1dElbzOk:Q:tekYue99iuQ99eui99Due99xue9:w998Jjjjjbcj;sb9Rgs8Kjjjjbcbhzasc:Cefcbc;Kbz:xjjjb8AdnabaeSmbabaeadcdtz:wjjjb8AkdnamcdGTmbalcrfci4cbyd;y:L:cjbHjjjjbbhHasc:Cefasyd;8egecdtfaHBdbasaecefBd;8ecbhlcbhednadTmbabheadhOinaHaeydbci4fcb86bbaeclfheaOcufgOmbkcbhlabheadhOinaHaeydbgAci4fgCaCRbbgCceaAcrGgAtV86bbaCcu7aA4ceGalfhlaeclfheaOcufgOmbkcualcdtalcFFFFi0Ehekaecbyd;y:L:cjbHjjjjbbhzasc:Cefasyd;8egecdtfazBdbasaecefBd;8ealcd4alfhOcehHinaHgecethHaeaO6mbkcbhXcuaecdtgOaecFFFFi0Ecbyd;y:L:cjbHjjjjbbhHasc:Cefasyd;8egAcdtfaHBdbasaAcefBd;8eaHcFeaOz:xjjjbhQdnadTmbaecufhLcbhKindndnaQabaKcdtfgYydbgAc:v;t;h;Ev2aLGgOcdtfgCydbgHcuSmbceheinazaHcdtfydbaASmdaOaefhHaecefheaQaHaLGgOcdtfgCydbgHcu9hmbkkazaXcdtfaABdbaCaXBdbaXhHaXcefhXkaYaHBdbaKcefgKad9hmbkkaQcbyd;C:L:cjbH:bjjjbbasasyd;8ecufBd;8ekcbh8AcualcefgecdtaecFFFFi0Ecbyd;y:L:cjbHjjjjbbhKasc:Cefasyd;8egecdtfaKBdbasaKBdNeasaecefBd;8ecuadcitadcFFFFe0Ecbyd;y:L:cjbHjjjjbbhEasc:Cefasyd;8egecdtfaEBdbasaEBd:yeasaecefBd;8eascNefabadalcbz:cjjjbcualcdtgealcFFFFi0Eg3cbyd;y:L:cjbHjjjjbbhHasc:Cefasyd;8egOcdtfaHBdbasaOcefBd;8ea3cbyd;y:L:cjbHjjjjbbhXasc:Cefasyd;8egOcdtfaXBdbasaOcefBd;8eaHaXaialavazasc:Cefz:djjjbalcbyd;y:L:cjbHjjjjbbh5asc:Cefasyd;8egOcdtfa5BdbasaOcefBd;8ea3cbyd;y:L:cjbHjjjjbbhOasc:Cefasyd;8egAcdtfaOBdbasaAcefBd;8ea3cbyd;y:L:cjbHjjjjbbhAasc:Cefasyd;8egCcdtfaABdbasaCcefBd;8eaOcFeaez:xjjjbh8EaAcFeaez:xjjjbh8FdnalTmbindnaKa8AgAcefg8AcdtfydbgCaKaAcdtgefydbgOSmbaCaO9RhYaEaOcitfhaa8Faefhha8EaefhLcbhCindndnaaaCcitfydbgQaA9hmbaLaABdbahaABdbxekdnaKaQcdtggfgeclfydbgOaeydbgeSmbaOae9RhOaEaecitfheinaeydbaASmdaecwfheaOcufgOmbkka8FagfgeaAaQaeydbcuSEBdbaLaQaAaLydbcuSEBdbkaCcefgCaY9hmbkka8Aal9hmbkaHhOaXhAa8EhQa8FhCcbheindndnaeaOydbgL9hmbdnaeaAydbgL9hmbaQydbhLdnaCydbgYcu9hmbaLcu9hmba5aefcb86bbxikdnaYcuSmbaLcuSmbaeaYSmbaHaYcdtfydbaHaLcdtfydb9hmba5aefcd86bbxika5aefhadnaeaYSmbaeaLSmbaace86bbxikaacv86bbxdkdnaeaXaLcdtgYfydb9hmbdnaCydbgacuSmbaeaaSmbaQydbggcuSmbaeagSmba8FaYfydbghcuSmbahaLSmba8EaYfydbgYcuSmbaYaLSmbaHaacdtfydbgLaHaYcdtfydb9hmbaLaHagcdtfydbgYSmbaYaHahcdtfydb9hmba5aefcd86bbxika5aefcv86bbxdka5aefcv86bbxeka5aefa5aLfRbb86bbkaOclfhOaAclfhAaQclfhQaCclfhCalaecefge9hmbkdnamcaGTmbcbh8Jindndna5a8Jfg8KRbbg8Lc9:fPlbeebekdndndnaHa8Jcdtfydbgea8J9hmbcbhYcbh8MaqTmednazTmbcbh8Ma8JheinaqazaecdtgefydbfRbbce4a8MVceGh8MaXaefydbgea8J9hmbxikkcbh8Ma8JheinaqaefRbbce4a8MVceGh8MaXaecdtfydbgea8J9hmbxdkka5aefRbbhexeka8JheindnaKaecdtg8AfgeclfydbgOaeydbgeSmbaOae9RhgaEaecitfhhaHa8AfhacbhLinahaLcitfydbgQhednindnaKaecdtgCfgeclfydbgOaeydbgeSmbaOae9RhOaEaecitfheaaydbhAdninaHaeydbcdtfydbaASmeaecwfheaOcufgOTmdxbkkcbhexdkaXaCfydbgeaQ9hmbkcehekaYaeVhYaLcefgLag9hmbkkaXa8Afydbgea8J9hmbka8LclciaYceGEa8MEheka8Kae86bbka8Jcefg8Jal9hmbkkdnaqTmbdndnazTmbazheaHhOalhAindnaqaeydbfRbbceGTmba5aOydbfcv86bbkaeclfheaOclfhOaAcufgAmbxdkkaqheaHhOalhAindnaeRbbceGTmba5aOydbfcv86bbkaecefheaOclfhOaAcufgAmbkkaHhealhAa5hOindna5aeydbfRbbcv9hmbaOcv86bbkaeclfheaOcefhOaAcufgAmbkkamceGTmba5healhOindndnaeRbbcufPlbeebekaecv86bbkaecefheaOcufgOmbkkcbh8Ncualcx2alc;v:Q;v:Qe0Ecbyd;y:L:cjbHjjjjbbh8Kasc:Cefasyd;8egecdtfa8KBdbasaecefBd;8eascbBd:qeas9cb83i1ea8Kaialavazasc1efz:ejjjbhydndnaDmbcbh8PcbhaxekcbhaawhecbhOindnaeIdbJbbbb9ETmbasaacdtfaOBdbaacefhakaeclfheaDaOcefgO9hmbkcuaaal2gecdtaecFFFFi0Ecbyd;y:L:cjbHjjjjbbh8Pasc:Cefasyd;8egecdtfa8PBdbasaecefBd;8ealTmbdnaambcbhaxekarcd4hgdnazTmbaacdthhcbhLa8PhYinaoazaLcdtfydbag2cdtfhQasheaYhOaahAinaOaQaeydbcdtgCfIdbawaCfIdbNUdbaeclfheaOclfhOaAcufgAmbkaYahfhYaLcefgLal9hmbxdkkaacdthhcbhLa8PhYinaoaLag2cdtfhQasheaYhOaahAinaOaQaeydbcdtgCfIdbawaCfIdbNUdbaeclfheaOclfhOaAcufgAmbkaYahfhYaLcefgLal9hmbkkcualc8S2gOalc;D;O;f8U0EgCcbyd;y:L:cjbHjjjjbbheasc:Cefasyd;8egAcdtfaeBdbasaAcefBd;8eaecbaOz:xjjjbhIcbh8RcbhgdnaaTmbcbh8NaCcbyd;y:L:cjbHjjjjbbhgasc:Cefasyd;8egecdtfagBdbasaecefBd;8eagcbaOz:xjjjb8Acuaaal2gecltgOaecFFFFb0Ecbyd;y:L:cjbHjjjjbbh8Rasc:Cefasyd;8egecdtfa8RBdbasaecefBd;8ea8RcbaOz:xjjjb8AamcjjjjdGTmbcualcltgealcFFFFb0Ecbyd;y:L:cjbHjjjjbbh8Nasc:Cefasyd;8egOcdtfa8NBdbasaOcefBd;8ea8Ncbaez:xjjjb8AkdnadTmbcbhQabhOina8KaOclfydbgLcx2fgeIdba8KaOydbgYcx2fgAIdbg8S:tgRa8KaOcwfydbghcx2fgCIdlaAIdlg8U:tg8VNaeIdla8U:tg8WaCIdba8S:tg8XN:tg8Ya8YNa8WaCIdwaAIdwg8Z:tg80NaeIdwa8Z:tg8Wa8VN:tg81a81Na8Wa8XNaRa80N:tg80a80NMMg8V:rhBa8Yh8Xa80h8Wa81hRdna8VJbbbb9EgATmba8YaB:vh8Xa80aB:vh8Wa81aB:vhRkaIaHaYcdtfydbgCc8S2fgeaRaB:rg8VaRNNg83aeIdbMUdbaea8Wa8Va8WNgUNg85aeIdlMUdlaea8Xa8Va8XNg86Ng87aeIdwMUdwaeaRaUNgUaeIdxMUdxaea86aRNg88aeIdzMUdzaea8Wa86Ng89aeIdCMUdCaeaRa8Va8Xa8ZNaRa8SNa8Ua8WNMM:mg8:Ng86NgRaeIdKMUdKaea8Wa86Ng8WaeId3MUd3aea8Xa86Ng8XaeIdaMUdaaea86a8:Ng86aeId8KMUd8Kaea8VaeIdyMUdyaIaHaLcdtfydbgLc8S2fgea83aeIdbMUdbaea85aeIdlMUdlaea87aeIdwMUdwaeaUaeIdxMUdxaea88aeIdzMUdzaea89aeIdCMUdCaeaRaeIdKMUdKaea8WaeId3MUd3aea8XaeIdaMUdaaea86aeId8KMUd8Kaea8VaeIdyMUdyaIaHahcdtfydbgYc8S2fgea83aeIdbMUdbaea85aeIdlMUdlaea87aeIdwMUdwaeaUaeIdxMUdxaea88aeIdzMUdzaea89aeIdCMUdCaeaRaeIdKMUdKaea8WaeId3MUd3aea8XaeIdaMUdaaea86aeId8KMUd8Kaea8VaeIdyMUdydna8NTmbdnaATmba8YaB:vh8Ya80aB:vh80a81aB:vh81ka8NaCcltfgeaBJbbbZNgRa80Ng8VaeIdlMUdlaeaRa8YNg8WaeIdwMUdwaeaRa81Ng8XaeIdbMUdbaeaRa8S:ma81Na8Ua80N:ta8Za8YN:tNgRaeIdxMUdxa8NaLcltfgea8VaeIdlMUdlaea8WaeIdwMUdwaea8XaeIdbMUdbaeaRaeIdxMUdxa8NaYcltfgea8VaeIdlMUdlaea8WaeIdwMUdwaea8XaeIdbMUdbaeaRaeIdxMUdxkaOcxfhOaQcifgQad6mbkkdnalTmbJq;x8J88J;n;m;m89J:v:;;w8ZamczGEamc;abGEh80cbhOaHhCazhQaIhea8KhAindnaOaCydb9hmbaOhLdnazTmbaQydbhLka80hRdnaqTmbJbbjZa80aqaLfRbbclGEhRkaecxfgLaLIdbJbbbbMUdbaeczfgLaLIdbJbbbbMUdbaecCfgLaLIdbJbbbbMUdbaeaRaecyfgLIdbg8YNgRaeIdbMUdbaeclfgYaRaYIdbMUdbaecwfgYaRaYIdbMUdbaecKfgYaYIdbaAIdbg8WaRN:tUdbaAcwfIdbh8Vaec3fgYaYIdbaRaAclfIdbg8XN:tUdbaecafgYaYIdbaRa8VN:tUdbaec8KfgYIdbh81aLa8YaRMUdbaYa81aRa8Va8VNa8Wa8WNa8Xa8XNMMNMUdbkaCclfhCaQclfhQaec8SfheaAcxfhAalaOcefgO9hmbkkdnadTmbcbh8AabhLinaba8AcdtfhYcbheindna5aLaefydbgCfRbbgOTmba5aYaec:G:G:cjbfydbcdtfydbgQfRbbcFeGgATmbdnaOclSghmbaOci6mbaAclSmbaAcd0mekdnaOcd0mba8EaCcdtfydbaQ9hmekdnaAcd0mba8FaQcdtfydbaC9hmekdndnahmbaAcl9hmekaOciSmeaAciSmekJbbbZJbbbZJbbacaAcdSEaOcdSEhUdna8KaYaec:K:G:cjbfydbcdtfydbcx2fgOIdwa8KaCcx2fgAIdwg86:tg8Sa8KaQcx2fghIdwa86:tg8Xa8XNahIdbaAIdbg8U:tg80a80NahIdlaAIdlg8Z:tg8Va8VNMMg81Na8Xa8Sa8XNaOIdba8U:tg83a80Na8VaOIdla8Z:tg85NMMg8WN:tg8Ya8YNa83a81Na80a8WN:tgRaRNa85a81Na8Va8WN:tg8Wa8WNMMgBJbbbb9ETmba8YaB:rgB:vh8Ya8WaB:vh8WaRaB:vhRkaUa81:rNgBa8Ya86NaRa8UNa8Za8WNMM:mg81Ng87a81Nh88a80a85Na8Va83N:tg81a81Na8Va8SNa8Xa85N:tg8Va8VNa8Xa83Na80a8SN:tg8Xa8XNMMg83:rh80a8Ya87Nh85a8Wa87Nh89aRa87Nh87a8WaBa8YNg8SNh8:a8SaRNhZaRaBa8WNgnNhca8Ya8SNh8Ya8WanNh8WaRaBaRNNh8Sdna83Jbbbb9ETmba81a80:vh81a8Xa80:vh8Xa8Va80:vh8VkaIaHaCcdtfydbc8S2fgOaOIdba8Sa8VaUa80:rNgRa8VNNMg80MUdbaOa8Wa8XaRa8XNg8SNMg83aOIdlMUdlaOa8Ya81aRa81Ng8WNMg8YaOIdwMUdwaOaca8Va8SNMg8SaOIdxMUdxaOaZa8Wa8VNMgUaOIdzMUdzaOa8:a8Xa8WNMg8WaOIdCMUdCaOa87a8VaRa81a86Na8Va8UNa8Za8XNMMg86:mNgRNMg8VaOIdKMUdKaOa89a8XaRNMg8XaOId3MUd3aOa85a81aRNMg81aOIdaMUdaaOa88a86aRN:tgRaOId8KMUd8KaOaBaOIdyMUdyaIaHaQcdtfydbc8S2fgOa80aOIdbMUdbaOa83aOIdlMUdlaOa8YaOIdwMUdwaOa8SaOIdxMUdxaOaUaOIdzMUdzaOa8WaOIdCMUdCaOa8VaOIdKMUdKaOa8XaOId3MUd3aOa81aOIdaMUdaaOaRaOId8KMUd8KaOaBaOIdyMUdykaeclfgecx9hmbkaLcxfhLa8Acifg8Aad6mbkkdnamcjeGTmbalTmbcbh9cindnaKa9cgecdtgOfydbghaKaecefg9ccdtfydbg8M9pmba8Kaecx2fhDaIaHaOfydbgCc8S2fh8AindnaHaEahcitfgeydbgLcdtfydbg8JaC0mbaeydlh8LcuhAaLheindnaKaecdtgYfgeclfydbgOaeydbgeSmbaOae9RhOaEaecitfheindnaHaeydbcdtfydbaC9hmbaAcu9hhQaLhAaQmbaeclfydbhAkaecwfheaOcufgOmbkkaXaYfydbgeaL9hmbkaAaLSmbaAcuSmba8KaLcx2fgeIdbaDIdbg81:tgRa8Ka8Lcx2fgOIdlaDIdlg80:tg8XNaeIdla80:tg8VaOIdba81:tg8YN:tg86a8KaAcx2fgAIdba81:tg8Za8VNaAIdla80:tg83aRN:tg8SNa8VaOIdwaDIdwgB:tg8UNaeIdwaB:tg8Wa8XN:tg85a83a8WNaAIdwaB:tg87a8VN:tgUNa8Wa8YNaRa8UN:tg88a87aRNa8Za8WN:tg89NMMa86a86Na85a85Na88a88NMM:rJ:A:z9z:;Na8Sa8SNaUaUNa89a89NMM:rN9Gmbdna8Ua8Wa8WNaRaRNa8Va8VNMMg8SNa8Wa8Ua8WNa8YaRNa8Va8XNMMg86N:tg8Ua8UNa8Ya8SNaRa86N:tg8Ya8YNa8Xa8SNa8Va86N:tg86a86NMMg8XJbbbb9ETmba8Ua8X:rg8X:vh8Ua86a8X:vh86a8Ya8X:vh8Yka8S:rg8Xa8UaBNa8Ya81Na80a86NMM:mgUNg85aUNhUa8Ua85Nh88a86a85Nh89a8Ya85Nh8:a86a8Xa8UNg85NhZa85a8YNhna8Ya8Xa86NgcNhJa8Ua85Nh8Ua86acNh86a8Ya8Xa8YNNh85dna87a8SNa8Wa87a8WNa8ZaRNa8Va83NMMg8YN:tg8Wa8WNa8Za8SNaRa8YN:tgRaRNa83a8SNa8Va8YN:tg8Va8VNMMg8YJbbbb9ETmba8Wa8Y:rg8Y:vh8Wa8Va8Y:vh8VaRa8Y:vhRka8Aa8AIdba85aRa8XaRNNMg8SMUdba8Aa86a8Va8Xa8VNg8ZNMg86a8AIdlMUdla8Aa8Ua8Wa8Xa8WNg8YNMg8Ua8AIdwMUdwa8AaJaRa8ZNMg8Za8AIdxMUdxa8Aana8YaRNMg83a8AIdzMUdza8AaZa8Va8YNMg85a8AIdCMUdCa8Aa8:aRa8Xa8WaBNaRa81Na80a8VNMMg81:mNg8YNMgRa8AIdKMUdKa8Aa89a8Va8YNMg8Va8AId3MUd3a8Aa88a8Wa8YNMg8Wa8AIdaMUdaa8AaUa81a8YN:tg8Ya8AId8KMUd8Ka8Aa8Xa8XMg8Xa8AIdyMUdyaIa8Jc8S2fgea8SaeIdbMUdbaea86aeIdlMUdlaea8UaeIdwMUdwaea8ZaeIdxMUdxaea83aeIdzMUdzaea85aeIdCMUdCaeaRaeIdKMUdKaea8VaeId3MUd3aea8WaeIdaMUdaaea8YaeId8KMUd8Kaea8XaeIdyMUdykahcefgha8M9hmbkka9cal9hmbkkdnadTmbaaTmbcbhYinJbbbbh80a8KabaYcdtfgeclfydbgLcx2fgOIdwa8Kaeydbghcx2fgAIdwg8Z:tg8Va8VNaOIdbaAIdbg83:tg8Wa8WNaOIdlaAIdlg85:tg8Xa8XNMMg8Sa8Kaecwfydbg8Acx2fgeIdwa8Z:tg8YNa8Va8YNa8WaeIdba83:tg81Na8XaeIdla85:tgBNMMgRa8VN:tJbbbbJbbjZa8Sa8Ya8YNa81a81NaBaBNMMg8UNaRaRN:tg86:va86Jbbbb9BEg86Nh88a8Ua8VNaRa8YN:ta86Nh89a8SaBNaRa8XN:ta86Nh8:a8Ua8XNaRaBN:ta86NhZa8Sa81NaRa8WN:ta86Nhna8Ua8WNaRa81N:ta86Nhca8WaBNa8Xa81N:tgRaRNa8Xa8YNa8VaBN:tgRaRNa8Va81Na8Wa8YN:tgRaRNMM:rJbbbZNhRa8Pahaa2g8JcdtfhOa8Pa8Aaa2g8McdtfhAa8PaLaa2gDcdtfhCa8Z:mhJa85:mh9ea83:mhTascjdfheaahQJbbbbhBJbbbbh86Jbbbbh8SJbbbbh8UJbbbbh8ZJbbbbh83Jbbbbh85Jbbbbh87JbbbbhUinaecwfaRa89aCIdbaOIdbg8Y:tg8XNa88aAIdba8Y:tg81NMg8VNUdbaeclfaRaZa8XNa8:a81NMg8WNUdbaeaRaca8XNana81NMg8XNUdbaecxfaRaJa8VNa9ea8WNa8YaTa8XNMMMg8YNUdbaRa8Va8WNNa8ZMh8ZaRa8Va8XNNa8UMh8UaRa8Wa8XNNa8SMh8SaRa8Ya8YNNaUMhUaRa8Va8YNNa87Mh87aRa8Wa8YNNa85Mh85aRa8Xa8YNNa83Mh83aRa8Va8VNNa86Mh86aRa8Wa8WNNaBMhBaRa8Xa8XNNa80Mh80aOclfhOaCclfhCaAclfhAaeczfheaQcufgQmbkagahc8S2fgea80aeIdbMUdbaeaBaeIdlMUdlaea86aeIdwMUdwaea8SaeIdxMUdxaea8UaeIdzMUdzaea8ZaeIdCMUdCaea83aeIdKMUdKaea85aeId3MUd3aea87aeIdaMUdaaeaUaeId8KMUd8KaeaRaeIdyMUdyagaLc8S2fgea80aeIdbMUdbaeaBaeIdlMUdlaea86aeIdwMUdwaea8SaeIdxMUdxaea8UaeIdzMUdzaea8ZaeIdCMUdCaea83aeIdKMUdKaea85aeId3MUd3aea87aeIdaMUdaaeaUaeId8KMUd8KaeaRaeIdyMUdyaga8Ac8S2fgea80aeIdbMUdbaeaBaeIdlMUdlaea86aeIdwMUdwaea8SaeIdxMUdxaea8UaeIdzMUdzaea8ZaeIdCMUdCaea83aeIdKMUdKaea85aeId3MUd3aea87aeIdaMUdaaeaUaeId8KMUd8KaeaRaeIdyMUdya8Ra8JcltfhLcbhOaahCinaLaOfgeascjdfaOfgAIdbaeIdbMUdbaeclfgQaAclfIdbaQIdbMUdbaecwfgQaAcwfIdbaQIdbMUdbaecxfgeaAcxfIdbaeIdbMUdbaOczfhOaCcufgCmbka8RaDcltfhLcbhOaahCinaLaOfgeascjdfaOfgAIdbaeIdbMUdbaeclfgQaAclfIdbaQIdbMUdbaecwfgQaAcwfIdbaQIdbMUdbaecxfgeaAcxfIdbaeIdbMUdbaOczfhOaCcufgCmbka8Ra8McltfhLcbhOaahCinaLaOfgeascjdfaOfgAIdbaeIdbMUdbaeclfgQaAclfIdbaQIdbMUdbaecwfgQaAcwfIdbaQIdbMUdbaecxfgeaAcxfIdbaeIdbMUdbaOczfhOaCcufgCmbkaYcifgYad6mbkkcbhAdndnamcwGgSmbJbbbbh86cbh9hcbh9icbh6xekcbh9ha3cbyd;y:L:cjbHjjjjbbh6asc:Cefasyd;8egecdtfa6BdbasaecefBd;8ecua6alabadaHz:fjjjbgCcltaCcjjjjiGEcbyd;y:L:cjbHjjjjbbh9iasc:Cefasyd;8egecdtfa9iBdbasaecefBd;8ea9iaCa6a8Kalz:gjjjbJFFuuh86aCTmba9iheaChOinaeIdbgRa86a86aR9EEh86aeclfheaOcufgOmbkaCh9hkdnalTmbaKclfheaKydbhCa5hOalhQcbhAincbaeydbgLaC9RaORbbcpeGEaAfhAaOcefhOaeclfheaLhCaQcufgQmbkaAce4hAkcuadaA9Rcifg9kcx2a9kc;v:Q;v:Qe0Ecbyd;y:L:cjbHjjjjbbh0asc:Cefasyd;8egecdtfa0BdbasaecefBd;8ecua9kcdta9kcFFFFi0Ecbyd;y:L:cjbHjjjjbbh9masc:Cefasyd;8egecdtfa9mBdbasaecefBd;8ea3cbyd;y:L:cjbHjjjjbbh9nasc:Cefasyd;8egecdtfa9nBdbasaecefBd;8ealcbyd;y:L:cjbHjjjjbbh9oasc:Cefasyd;8egecdtfa9oBdbasaecefBd;8eaxaxNayJbbjZamclGEg9pa9pN:vh87JbbbbhUdnadak9nmbdna9kci6mbamcjdGh9qaaclth9ra0cwfh9sJbbbbh85JbbbbhUinascNefabadalaHz:cjjjbabh8Acbh3cbh9tinaba9tcdtfh8McbheindnaHa8AaefydbgAcdtghfydbgCaHa8Maec:W:G:cjbfydbcdtfydbgOcdtg8JfydbgQSmba5aOfRbbgYco2a5aAfRbbgLfRb;a:G:cjbg8LaLco2aYfgDRb;a:G:cjbg9cVcFeGTmbdnaQaC9nmbaDRb;W:G:cjbcFeGmekdnaLcufcFeGce0mbaYTmba8EahfydbaO9hmekdnaLTmbaYcufcFeGce0mba8Fa8JfydbaA9hmeka0a3cx2fgCaOaAa9ccFeGgQEBdlaCaAaOaQEBdbaCaQa8LGcb9hBdwa3cefh3kaeclfgecx9hmbkdna9tcifg9tad9pmba8Acxfh8Aa3cifa9k9nmekka3TmdcbhDinaIaHa0aDcx2fghydbgLcdtgCfydbg8Jc8S2fgeIdwa8KahydlgYcx2fgOIdwg8WNaeIdzaOIdbg8XNaeIdaMgRaRMMa8WNaeIdlaOIdlg8YNaeIdCa8WNaeId3MgRaRMMa8YNaeIdba8XNaeIdxa8YNaeIdKMgRaRMMa8XNaeId8KMMM:lhRJbbbbJbbjZaeIdyg8V:va8VJbbbb9BEh8Vdndnahydwg8MmbJFFuuhBxekJbbbbJbbjZaIaHaYcdtfydbc8S2fgeIdyg81:va81Jbbbb9BEaeIdwa8KaLcx2fgOIdwg81NaeIdzaOIdbg80NaeIdaMgBaBMMa81NaeIdlaOIdlgBNaeIdCa81NaeId3Mg81a81MMaBNaeIdba80NaeIdxaBNaeIdKMg81a81MMa80NaeId8KMMM:lNhBka8VaRNh80dnaaTmbagaLc8S2fgAIdwa8WNaAIdza8XNaAIdaMgRaRMMa8WNaAIdla8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8PaYaa2gQcdtfhOa8RaLaa2g8AcltfheaAIdyh81aahAinaOIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaOclfhOaeczfheaAcufgAmbkaR:lgRa81aRa819DEaRa9qEh8Sdndna8MmbJbbbbhRxekagaYc8S2fgAIdwa8KaLcx2fgeIdwg8WNaAIdzaeIdbg8XNaAIdaMgRaRMMa8WNaAIdlaeIdlg8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8Pa8AcdtfhOa8RaQcltfheaAIdyh81aahAinaOIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaOclfhOaeczfheaAcufgAmbkaR:lgRa81aRa819DEaRa9qEhRka80a8SMh80aBaRMhBdndndna5aLfRbbc9:fPibeedkdna8Fa8Ea8EaCfydbaYSEaXaCfydbgQcdtfydbgCcu9hmbaXaYcdtfydbhCkagaQc8S2fgAIdwa8KaCcx2fgeIdwg8WNaAIdzaeIdbg8XNaAIdaMgRaRMMa8WNaAIdlaeIdlg8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8PaCaa2g8AcdtfhOa8RaQaa2g8JcltfheaAIdyh81aahAinaOIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaOclfhOaeczfheaAcufgAmbkaR:lgRa81aRa819DEaRa9qEh8Sdndna8MmbJbbbbhRxekagaCc8S2fgAIdwa8KaQcx2fgeIdwg8WNaAIdzaeIdbg8XNaAIdaMgRaRMMa8WNaAIdlaeIdlg8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8Pa8JcdtfhOa8Ra8AcltfheaAIdyh81aahAinaOIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaOclfhOaeczfheaAcufgAmbkaR:lgRa81aRa819DEaRa9qEhRka80a8SMh80aBaRMhBxdkaXaCfydbgCaLSmbaHaYcdtfydbh8Aindndna8EaCcdtgQfydbgecuSmbaHaecdtfydba8ASmekdna8FaQfydbgecuSmbaHaecdtfydba8ASmekaYhekagaCc8S2fgAIdwa8Kaecx2fgOIdwg8WNaAIdzaOIdbg8XNaAIdaMgRaRMMa8WNaAIdlaOIdlg8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8Paeaa2cdtfhOa8RaCaa2cltfheaAIdyh81aahAinaOIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaOclfhOaeczfheaAcufgAmbka80aR:lgRa81aRa819DEaRa9qEMh80aXaQfydbgCaL9hmbkkdna5aYfRbbgeciSmbaecl9hmeka8MTmbaXaYcdtfydbgCaYSmbindndna8EaCcdtgQfydbgecuSmbaHaecdtfydba8JSmekdna8FaQfydbgecuSmbaHaecdtfydba8JSmekaLhekagaCc8S2fgAIdwa8Kaecx2fgOIdwg8WNaAIdzaOIdbg8XNaAIdaMgRaRMMa8WNaAIdlaOIdlg8YNaAIdCa8WNaAId3MgRaRMMa8YNaAIdba8XNaAIdxa8YNaAIdKMgRaRMMa8XNaAId8KMMMhRa8Paeaa2cdtfhOa8RaCaa2cltfheaAIdyh81aahAinaOIdbg8Va8Va81NaecxfIdba8WaecwfIdbNa8XaeIdbNa8YaeclfIdbNMMMg8Va8VM:tNaRMhRaOclfhOaeczfheaAcufgAmbkaBaR:lgRa81aRa819DEaRa9qEMhBaXaQfydbgCaY9hmbkkahaBa80aBa809DgeEUdwahaLaYaea8Mcb9hGgeEBdlahaYaLaeEBdbaDcefgDa39hmbkascjdfcbcj;qbz:xjjjb8Aa9shea3hOinascjdfaeydbcA4cF8FGgAcFAaAcFA6EcdtfgAaAydbcefBdbaecxfheaOcufgOmbkcbhecbhOinascjdfaefgAydbhCaAaOBdbaCaOfhOaeclfgecj;qb9hmbkcbhea9shOinascjdfaOydbcA4cF8FGgAcFAaAcFA6EcdtfgAaAydbgAcefBdba9maAcdtfaeBdbaOcxfhOa3aecefge9hmbkadak9RgAci9Uh9udnalTmbcbhea9nhOinaOaeBdbaOclfhOalaecefge9hmbkkcbh9va9ocbalz:xjjjbh9caAcO9Uh9wa9uce4h9tcbh8Lcbh8Mdnina0a9ma8Mcdtfydbcx2fg8JIdwgRa879Emea8La9u9pmeJFFuuh8Vdna9ta39pmba0a9ma9tcdtfydbcx2fIdwJbb;aZNh8VkdnaRa8V9ETmbaRaU9ETmba8La9w0mdkdna9caHa8JydlgDcdtg9xfg8AydbgAfg9yRbba9caHa8Jydbghcdtg9zfydbgefg9ARbbVmba5ahfRbbh9BdndnaKaecdtfgOclfydbgCaOydbgOSmbaCaO9RhCa8KaAcx2fhLa8Kaecx2fhYaEaOcitfheindna9naeydbcdtfydbgOaASmba9naeclfydbcdtfydbgQaASmbaOaQSmba8KaQcx2fgQIdba8KaOcx2fgOIdbg8W:tgRaYIdlaOIdlg8X:tg80NaQIdla8X:tg8VaYIdba8W:tgBN:tg8YaRaLIdla8X:tg8SNa8VaLIdba8W:tg8UN:tg8XNa8VaYIdwaOIdwg81:tg8ZNaQIdwa81:tg8Wa80N:tg80a8VaLIdwa81:tg83Na8Wa8SN:tg8VNa8WaBNaRa8ZN:tg81a8Wa8UNaRa83N:tgRNMMa8Ya8YNa80a80Na81a81NMMa8Xa8XNa8Va8VNaRaRNMMN:rJbbj8:N9FmikaecwfheaCcufgCmbkkdndna9Bc99fcFeGce0mba9na9zfaDBdbaXa9zfydbgeahSmeina8AydbhAdndna8EaecdtgOfydbgecuSmbaHaecdtfydbaASmekdna8FaOfydbgecuSmbaHaecdtfydbaASmekaDheka9naOfaeBdbaXaOfydbgeah9hmbxdkkdndna9BcFeGcdSmbaDhexekdna8Fa8Ea8Ea9zfydbaDSEaXa9zfydbghcdtfydbgecu9hmbaXa9xfydbheka9na9zfaDBdbka9nahcdtfaeBdbka9Ace86bba9yce86bba8JIdwgRaUaUaR9DEhUa9vcefh9vcecda9BcFeGceSEa8Lfh8Lxeka9tcefh9tka8Mcefg8Ma39hmbkka9vTmddnalTmbcbhLcbhhindna9nahcdtgefydbgAahSmbaHaAcdtfydbh8AdnahaHaefydb9hg8JmbaIa8Ac8S2fgeaIahc8S2fgOIdbaeIdbMUdbaeaOIdlaeIdlMUdlaeaOIdwaeIdwMUdwaeaOIdxaeIdxMUdxaeaOIdzaeIdzMUdzaeaOIdCaeIdCMUdCaeaOIdKaeIdKMUdKaeaOId3aeId3MUd3aeaOIdaaeIdaMUdaaeaOId8KaeId8KMUd8KaeaOIdyaeIdyMUdya8NTmba8Na8Acltfgea8NahcltfgOIdbaeIdbMUdbaeaOIdlaeIdlMUdlaeaOIdwaeIdwMUdwaeaOIdxaeIdxMUdxkaaTmbagaAc8S2fgeagahc8S2g8MfgOIdbaeIdbMUdbaeaOIdlaeIdlMUdlaeaOIdwaeIdwMUdwaeaOIdxaeIdxMUdxaeaOIdzaeIdzMUdzaeaOIdCaeIdCMUdCaeaOIdKaeIdKMUdKaeaOId3aeId3MUd3aeaOIdaaeIdaMUdaaeaOId8KaeId8KMUd8KaeaOIdyaeIdyMUdya9raA2hYa8RhOaahCinaOaYfgeaOaLfgAIdbaeIdbMUdbaeclfgQaAclfIdbaQIdbMUdbaecwfgQaAcwfIdbaQIdbMUdbaecxfgeaAcxfIdbaeIdbMUdbaOczfhOaCcufgCmbka8JmbJbbbbJbbjZaIa8MfgeIdygR:vaRJbbbb9BEaeIdwa8Ka8Acx2fgOIdwgRNaeIdzaOIdbg8VNaeIdaMg8Wa8WMMaRNaeIdlaOIdlg8WNaeIdCaRNaeId3MgRaRMMa8WNaeIdba8VNaeIdxa8WNaeIdKMgRaRMMa8VNaeId8KMMM:lNgRa85a85aR9DEh85kaLa9rfhLahcefghal9hmbkcbhOa8EheindnaeydbgAcuSmbdnaOa9naAcdtgCfydbgA9hmbcuhAa8EaCfydbgCcuSmba9naCcdtfydbhAkaeaABdbkaeclfhealaOcefgO9hmbkcbhOa8FheindnaeydbgAcuSmbdnaOa9naAcdtgCfydbgA9hmbcuhAa8FaCfydbgCcuSmba9naCcdtfydbhAkaeaABdbkaeclfhealaOcefgO9hmbkka85aUaaEh85cbhOabhecbhAindnaHa9naeydbcdtfydbgLcdtfydbgCaHa9naeclfydbcdtfydbgYcdtfydbgQSmbaCaHa9naecwfydbcdtfydbg8AcdtfydbghSmbaQahSmbabaOcdtfgCaLBdbaCcwfa8ABdbaCclfaYBdbaOcifhOkaecxfheaAcifgAad6mbkdndnaSmbaOhdxekdnaOak0mbaOhdxekdna86a859FmbaOhdxekJFFuuh86cbhdabhecbhAindna9ia6aeydbgCcdtfydbcdtfIdbgRa859ETmbaeclf8Pdbh9CabadcdtfgQaCBdbaQclfa9C83dbaRa86a86aR9EEh86adcifhdkaecxfheaAcifgAaO6mbkkadak0mbxdkkascNefabadalaHz:cjjjbkdndnadak0mbadhYxekdnaSmbadhYxekdna86a879FmbadhYxekcehQina86Jbb;aZNgRa87aRa879DEh8WJbbbbhRdna9hTmba9ihea9hhOinaeIdbg8VaRa8Va8W9FEaRa8VaR9EEhRaeclfheaOcufgOmbkkJFFuuh86cbhYabhecbhOindna9ia6aeydbgAcdtfydbcdtfIdbg8Va8W9ETmbaeclf8Pdbh9CabaYcdtfgCaABdbaCclfa9C83dba8Va86a86a8V9EEh86aYcifhYkaecxfheaOcifgOad6mbkdnaQaYad9hVceGmbadhYxdkaRaUaUaR9DEhUaYak9nmecbhQaYhda86a879FmbkkdnamcjjjjdGTmba9ocbalz:xjjjbh8AdnaYTmbabheaYhOina8AaeydbgAfce86bba8AaHaAcdtfydbfce86bbaeclfheaOcufgOmbkkascNefabaYalaHz:cjjjbdndnalTmbcbhCindna8AaCfRbbTmbdna5aCfRbbPlbeebekdnaHaCcdtgLfydbgeaCSmba8KaCcx2fgOa8Kaecx2fgeydwBdwaOae8Pdb83dbxekaIaCc8S2fgQIdygnanJL:3;rUNgRMh87aQIdwgxaRMh8SaQIdlg9DaRMh8UaQIdbg9EaRMh81aQIdag9FaRa8KaCcx2fg8JIdwg88N:th8ZaQId3g9GaRa8JIdlg89N:th83aQIdKg9Ha8JIdbg8:aRN:th80JbbbbhZaQIdCg9IJbbbbMh85aQIdzg9JJbbbbMhBaQIdxg9KJbbbbMh86dndnaaTmbaChAinJbbbba87agaAc8S2fgOIdygR:vaRJbbbb9BEhRa8RaAaa2cltfheaOIdaa87Na8ZMh8ZaOId3a87Na83Mh83aOIdKa87Na80Mh80aOIdCa87Na85Mh85aOIdza87NaBMhBaOIdxa87Na86Mh86aOIdwa87Na8SMh8SaOIdla87Na8UMh8UaOIdba87Na81Mh81aahOina8ZaecwfIdbg8VaecxfIdbg8YNaRN:th8Za83aeclfIdbg8Wa8YNaRN:th83a85a8Wa8VNaRN:th85a81aeIdbg8Xa8XNaRN:th81a80a8Xa8YNaRN:th80aBa8Xa8VNaRN:thBa86a8Xa8WNaRN:th86a8Sa8Va8VNaRN:th8Sa8Ua8Wa8WNaRN:th8UaeczfheaOcufgOmbkaXaAcdtfydbgAaC9hmbka8NTmba8NaCcltfgeIdxhTaeIdwhcaeIdlhJaeIdbhRxekJbbbbhTJbbbbhcJbbbbhJJbbbbhRkaBa81:vg8Wa80Na8Z:ta85aBa86a81:vg8VN:tg8Za8Ua86a8VN:tg8Y:vg8Xa8Va80Na83:tg8UN:th83acaRa8WN:taJaRa8VN:tg86a8XN:tg85a8SaBa8WN:ta8Za8XN:tgB:vg8S:mh8Za86a8Y:vgc:mhJdnJbbbbaRaRa81:vg9eN:ta86acN:ta85a8SN:tg86:la87J:983:g81NgR9ETmba8Za83NaJa8UNa9ea80NaT:tMMa86:vhZka81:laR9ETmba8Y:laR9ETmbaB:laR9ETmba9e:maZNa8W:ma8ZaZNa83aB:vMgBNa8V:maJaZNa8X:maBNa8Ua8Y:vMMg85Na80:ma81:vMMMh87aKaLfgeclfydbgOaeydbge9RhhaEaecitfhLJbbbbhRdnaOaeSg8MmbJbbbbhRaLheahhAina8Kaeclfydbcx2fgOIdwa88:tg8Va8VNaOIdba8::tg8Va8VNaOIdla89:tg8Va8VNMMg8Va8Kaeydbcx2fgOIdwa88:tg8Wa8WNaOIdba8::tg8Wa8WNaOIdla89:tg8Wa8WNMMg8WaRaRa8W9DEgRaRa8V9DEhRaecwfheaAcufgAmbkaR:rgRaRNhRkaBa88:tg8Va8VNa87a8::tg8Va8VNa85a89:tg8Va8VNMMaR9EmbaQId8KhZdna8Mmbina8KaLclfydbcx2fgeIdba8KaLydbcx2fgOIdbg8W:tgRa89aOIdlg8X:tg80NaeIdla8X:tg8Va8:a8W:tg86N:tg8YaRa85a8X:tg8SNa8Va87a8W:tg8UN:tg8XNa8Va88aOIdwg81:tg8ZNaeIdwa81:tg8Wa80N:tg80a8VaBa81:tg83Na8Wa8SN:tg8VNa8Wa86NaRa8ZN:tg81a8Wa8UNaRa83N:tgRNMMa8Ya8YNa80a80Na81a81NMMa8Xa8XNa8Va8VNaRaRNMMN:rJbbj8:N9FmdaLcwfhLahcufghmbkkJbbbbJbbjZan:vanJbbbb9BEgRaxaBNa9Ja87Na9FMg8Va8VMMaBNa9Da85Na9IaBNa9GMg8Va8VMMa85Na9Ea87Na9Ka85Na9HMg8Va8VMMa87NaZMMM:lNaRaxa88Na9Ja8:Na9FMg8Va8VMMa88Na9Da89Na9Ia88Na9GMg8Va8VMMa89Na9Ea8:Na9Ka89Na9HMg8Va8VMMa8:NaZMMM:lNJbb;aZNJ:983:g81M9Emba8JaBUdwa8Ja85Udla8Ja87UdbkaCcefgCal9hmbkdnaambcbhaxdkcbhQindna8AaQfRbbTmbaHaQcdtgefydbaQ9hmba5aQfhhaXaefh8Ja8KaQcx2fhAa8PaQaa2cdtfh8McbhEincuhCdnahRbbc99fcFeGce0mbaQhCa8JydbgeaQSmba8PaEcdtgOfhLa8MaOfIdbhRaQhCinaChOcuhCdnaLaeaa2cdtfIdbaR9CmbaOcuSmbaOhCagaec8S2fIdyagaOc8S2fIdy9ETmbaehCkaXaecdtfydbgeaQ9hmbkka8PaEcdtfhLa8RaEcltfhKaQheinaLaeaa2cdtfJbbbbJbbjZagaeaCaCcuSEgOc8S2fIdygR:vaRJbbbb9BEaKaOaa2cltfgOIdwaAIdwNaOIdbaAIdbNaOIdlaAIdlNMMaOIdxMNUdbaXaecdtfydbgeaQ9hmbkaEcefgEaa9hmbkkaQcefgQal9hmbxdkkaambcbhakaiavaoarawaaala8Ka8Pazasayasc1efa5a8Aaqz:hjjjbkdnamcjjjjlGTmbazmbaYTmbabhecbhLina5aeydbgAfRbbc3thQaecwfgXydbhHcjjjj94hCdna8EaAcdtgEfydbaeclfgKydbgOSmbcjjjj94cba8FaOcdtfydbaASEhCkaeaQaCVaAVBdba5aOfRbbc3thacjjjj94hCcjjjj94hQdna8EaOcdtfydbaHSmbcjjjj94cba8FaHcdtfydbaOSEhQkaKaaaQVaOVBdba5aHfRbbc3thOdna8EaHcdtfydbaASmbcjjjj94cba8FaEfydbaHSEhCkaXaOaCVaHVBdbaecxfheaLcifgLaY6mbkkdnazTmbaYTmbaYheinabazabydbcdtfydbBdbabclfhbaecufgembkkdnaPTmbaPa9paU:rNUdbkdnasyd;8egHTmbaHcdtasc:Ceffc98fheinaeydbcbyd;C:L:cjbH:bjjjbbaec98fheaHcufgHmbkkascj;sbf8KjjjjbaYk;Yieouabydlhvabydbclfcbaicdtz:xjjjbhoadci9UhrdnadTmbdnalTmbaehwadhDinaoalawydbcdtfydbcdtfgqaqydbcefBdbawclfhwaDcufgDmbxdkkaehwadhDinaoawydbcdtfgqaqydbcefBdbawclfhwaDcufgDmbkkdnaiTmbcbhDaohwinawydbhqawaDBdbawclfhwaqaDfhDaicufgimbkkdnadci6mbinaecwfydbhwaeclfydbhDaeydbhidnalTmbalawcdtfydbhwalaDcdtfydbhDalaicdtfydbhikavaoaicdtfgqydbcitfaDBdbavaqydbcitfawBdlaqaqydbcefBdbavaoaDcdtfgqydbcitfawBdbavaqydbcitfaiBdlaqaqydbcefBdbavaoawcdtfgwydbcitfaiBdbavawydbcitfaDBdlawawydbcefBdbaecxfhearcufgrmbkkabydbcbBdbk:todDue99aicd4aifhrcehwinawgDcethwaDar6mbkcuaDcdtgraDcFFFFi0Ecbyd;y:L:cjbHjjjjbbhwaoaoyd9GgqcefBd9GaoaqcdtfawBdbawcFearz:xjjjbhkdnaiTmbalcd4hlaDcufhxcbhminamhDdnavTmbavamcdtfydbhDkcbadaDal2cdtfgDydlgwawcjjjj94SEgwcH4aw7c:F:b:DD2cbaDydbgwawcjjjj94SEgwcH4aw7c;D;O:B8J27cbaDydwgDaDcjjjj94SEgDcH4aD7c:3F;N8N27axGhwamcdthPdndndnavTmbakawcdtfgrydbgDcuSmeadavaPfydbal2cdtfgsIdbhzcehqinaqhrdnadavaDcdtfydbal2cdtfgqIdbaz9CmbaqIdlasIdl9CmbaqIdwasIdw9BmlkarcefhqakawarfaxGgwcdtfgrydbgDcu9hmbxdkkakawcdtfgrydbgDcuSmbadamal2cdtfgsIdbhzcehqinaqhrdnadaDal2cdtfgqIdbaz9CmbaqIdlasIdl9CmbaqIdwasIdw9BmikarcefhqakawarfaxGgwcdtfgrydbgDcu9hmbkkaramBdbamhDkabaPfaDBdbamcefgmai9hmbkkakcbyd;C:L:cjbH:bjjjbbaoaoyd9GcufBd9GdnaeTmbaiTmbcbhDaehwinawaDBdbawclfhwaiaDcefgD9hmbkcbhDaehwindnaDabydbgrSmbawaearcdtfgrydbBdbaraDBdbkabclfhbawclfhwaiaDcefgD9hmbkkk;:odvuv998Jjjjjbca9Rgocbyd1:G:cjbBdKaocb8Pdj:G:cjb83izaocbydN:G:cjbBdwaocb8Pd:m:G:cjb83ibdnadTmbaicd4hrdnabmbdnalTmbcbhwinaealawcdtfydbar2cdtfhDcbhiinaoczfaifgqaDaifIdbgkaqIdbgxaxak9EEUdbaoaifgqakaqIdbgxaxak9DEUdbaiclfgicx9hmbkawcefgwad9hmbxikkarcdthwcbhDincbhiinaoczfaifgqaeaifIdbgkaqIdbgxaxak9EEUdbaoaifgqakaqIdbgxaxak9DEUdbaiclfgicx9hmbkaeawfheaDcefgDad9hmbxdkkdnalTmbcbhwinabawcx2fgiaealawcdtfydbar2cdtfgDIdbUdbaiaDIdlUdlaiaDIdwUdwcbhiinaoczfaifgqaDaifIdbgkaqIdbgxaxak9EEUdbaoaifgqakaqIdbgxaxak9DEUdbaiclfgicx9hmbkawcefgwad9hmbxdkkarcdthlcbhwaehDinabawcx2fgiaeawar2cdtfgqIdbUdbaiaqIdlUdlaiaqIdwUdwcbhiinaoczfaifgqaDaifIdbgkaqIdbgxaxak9EEUdbaoaifgqakaqIdbgxaxak9DEUdbaiclfgicx9hmbkaDalfhDawcefgwad9hmbkkJbbbbaoIdbaoIdzgx:tgkakJbbbb9DEgkaoIdlaoIdCgm:tgPaPak9DEgkaoIdwaoIdKgP:tgsasak9DEhsdnabTmbadTmbJbbbbJbbjZas:vasJbbbb9BEhkinabakabIdbax:tNUdbabclfgoakaoIdbam:tNUdbabcwfgoakaoIdbaP:tNUdbabcxfhbadcufgdmbkkdnavTmbavaPUdwavamUdlavaxUdbkask:WlewudnaeTmbcbhvabhoinaoavBdbaoclfhoaeavcefgv9hmbkkdnaiTmbcbhrinadarcdtfhwcbhDinalawaDcdtgvyd:G:G:cjbcdtfydbcdtfydbhodnalawavfydbcdtfydbgqabaqcdtfgkydbgvSmbinakabavgqcdtfgxydbgvBdbaxhkaqav9hmbkkdnaoabaocdtfgkydbgvSmbinakabavgocdtfgxydbgvBdbaxhkaoav9hmbkkdnaqaoSmbabaqaoaqao0Ecdtfaqaoaqao6EBdbkaDcefgDci9hmbkarcifgrai6mbkkdnaembcbskcbhxindnalaxcdtgvfydbax9hmbaxhodnaxabavfgDydbgvSmbaDhqinaqabavgocdtfgkydbgvBdbakhqaoav9hmbkkaDaoBdbkaxcefgxae9hmbkcbhkabhvcbhoindndnaoalydbgq9hmbdnaoavydbgq9hmbavakBdbakcefhkxdkavabaqcdtfydbBdbxekavabaqcdtfydbBdbkalclfhlavclfhvaeaocefgo9hmbkakk;jiilud99euabcbaecltz:xjjjbhvdnalTmbadhoaihralhwinarcwfIdbhDarclfIdbhqavaoydbcltfgkarIdbakIdbMUdbakaqakIdlMUdlakaDakIdwMUdwakakIdxJbbjZMUdxaoclfhoarcxfhrawcufgwmbkkdnaeTmbavhkaehrinakcxfgoIdbhDaocbBdbakakIdbJbbbbJbbjZaD:vaDJbbbb9BEgDNUdbakclfgoaDaoIdbNUdbakcwfgoaDaoIdbNUdbakczfhkarcufgrmbkkdnalTmbinavadydbcltfgkaicwfIdbakIdw:tgDaDNaiIdbakIdb:tgDaDNaiclfIdbakIdl:tgDaDNMMgDakIdxgqaqaD9DEUdxadclfhdaicxfhialcufglmbkkdnaeTmbavcxfhkinabakIdbUdbakczfhkabclfhbaecufgembkkk:moerudnaoTmbaecd4hzdnavTmbaicd4hHavcdthOcbhAindnaPaAfRbbTmbaAhednaDTmbaDaAcdtfydbhekdnasTmbasaefRbbceGmekdnamaAfRbbcvSmbabaeaz2cdtfgiaraAcx2fgCIdbakNaxIdbMUdbaiaCIdlakNaxIdlMUdlaiaCIdwakNaxIdwMUdwkadaeaH2cdtfhXaqheawhiavhCinaXaeydbcdtgQfaiIdbalaQfIdb:vUdbaeclfheaiclfhiaCcufgCmbkkawaOfhwaAcefgAao9hmbxdkkdnasmbcbheaDhiindnaPaefRbbTmbaehCdnaDTmbaiydbhCkamaefRbbcvSmbabaCaz2cdtfgCarIdbakNaxIdbMUdbaCarclfIdbakNaxIdlMUdlaCarcwfIdbakNaxIdwMUdwkaiclfhiarcxfhraoaecefge9hmbxdkkdnaDTmbindnaPRbbTmbasaDydbgefRbbceGmbamRbbcvSmbabaeaz2cdtfgearIdbakNaxIdbMUdbaearclfIdbakNaxIdlMUdlaearcwfIdbakNaxIdwMUdwkaPcefhPaDclfhDamcefhmarcxfhraocufgombxdkkazcdthicbheindnaPaefRbbTmbasaefRbbceGmbamaefRbbcvSmbabarIdbakNaxIdbMUdbabclfarclfIdbakNaxIdlMUdbabcwfarcwfIdbakNaxIdwMUdbkarcxfhrabaifhbaoaecefge9hmbkkk8MbabaeadaialavcbcbcbcbcbaoarawaDz:bjjjbk8MbabaeadaialavaoarawaDaqakaxamaPz:bjjjbkRbababaeadaialavaoarawaDaqakaxcjjjjdVamz:bjjjbk:vgoque99due99duq998Jjjjjbc;Wb9Rgq8Kjjjjbcbhkaqcxfcbc;Kbz:xjjjb8Aaqcualcx2alc;v:Q;v:Qe0Ecbyd;y:L:cjbHjjjjbbgxBdxaqceBd2axaialavcbcbz:ejjjb8AaqcualcdtalcFFFFi0Egmcbyd;y:L:cjbHjjjjbbgiBdzaqcdBd2dndnJFF959eJbbjZawJbbjZawJbbjZ9DE:vawJ9VO:d869DEgw:lJbbb9p9DTmbaw:OhPxekcjjjj94hPkadci9Uhsarco9UhzdndnaombaPcd9imekdnalTmbaPcuf:YhwdnaoTmbcbhvaihHaxhOindndnaoavfRbbceGTmbavcjjjjlVhAxekdndnaOclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhAxekcjjjj94hAkaAcqthAdndnaOcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaAaXVhAdndnaOIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaAaXcCtVhAkaHaABdbaHclfhHaOcxfhOalavcefgv9hmbxdkkaxhvaihOalhHindndnavIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhAxekcjjjj94hAkaAcCthAdndnavclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaXcqtaAVhAdndnavcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaOaAaXVBdbavcxfhvaOclfhOaHcufgHmbkkadTmbcbhkaehvcbhOinakaiavclfydbcdtfydbgHaiavcwfydbcdtfydbgA9haiavydbcdtfydbgXaH9haXaA9hGGfhkavcxfhvaOcifgOad6mbkkarci9UhQdndnaz:Z:rJbbbZMgw:lJbbb9p9DTmbaw:Ohvxekcjjjj94hvkaQ:ZhLcbhKc:bwhzdninakaQ9pmeazaP9Rcd9imeavazcufgOavaO9iEaPcefavaP9kEhYdnalTmbaYcuf:YhwdnaoTmbcbhOaihHaxhvindndnaoaOfRbbceGTmbaOcjjjjlVhAxekdndnavclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhAxekcjjjj94hAkaAcqthAdndnavcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaAaXVhAdndnavIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaAaXcCtVhAkaHaABdbaHclfhHavcxfhvalaOcefgO9hmbxdkkaxhvaihOalhHindndnavIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhAxekcjjjj94hAkaAcCthAdndnavclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaXcqtaAVhAdndnavcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaOaAaXVBdbavcxfhvaOclfhOaHcufgHmbkkcbhOdnadTmbaehvcbhHinaOaiavclfydbcdtfydbgAaiavcwfydbcdtfydbgX9haiavydbcdtfydbgraA9haraX9hGGfhOavcxfhvaHcifgHad6mbkkdnas:ZgCaL:taY:Ygwaz:Y:tg8ANak:ZgEaO:Zg3:tNaEaL:tawaP:Y:tg5Na3aC:tNMg8EJbbbb9BmbaCaE:ta5a8Aa3aL:tNNNa8E:vawMhwkdndnaOaQ0mbaOhkaYhPxekaOhsaYhzkdndnaKcl0mbdnawJbbbZMgw:lJbbb9p9DTmbaw:Ohvxdkcjjjj94hvxekaPazfcd9ThvkaKcefgKcs9hmbkkdndndnakmbJbbjZhwcbhOcdhvaDmexdkalcd4alfhHcehOinaOgvcethOavaH6mbkaqcuavcdtavcFFFFi0Ecbyd;y:L:cjbHjjjjbbgYBdCaqciBd2aqamcbyd;y:L:cjbHjjjjbbgzBdKaqclBd2dnalTmbaPcuf:YhwdnaoTmbcbhOaihAaxhHindndnaoaOfRbbceGTmbaOcjjjjlVhXxekdndnaHclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaXcqthXdndnaHcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:Ohrxekcjjjj94hrkaXarVhXdndnaHIdbawNJbbbZMgC:lJbbb9p9DTmbaC:Ohrxekcjjjj94hrkaXarcCtVhXkaAaXBdbaAclfhAaHcxfhHalaOcefgO9hmbxdkkaxhOaihHalhAindndnaOIdbawNJbbbZMgC:lJbbb9p9DTmbaC:OhXxekcjjjj94hXkaXcCthXdndnaOclfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:Ohrxekcjjjj94hrkarcqtaXVhXdndnaOcwfIdbawNJbbbZMgC:lJbbb9p9DTmbaC:Ohrxekcjjjj94hrkaHaXarVBdbaOcxfhOaHclfhHaAcufgAmbkkaqcuaYavazaialz:mjjjbgXc8S2gvaXc;D;O;f8U0Ecbyd;y:L:cjbHjjjjbbgiBd3aqcvBd2aicbavz:xjjjbhOdnadTmbcbhraehiinaxaiclfydbgocx2fgvIdbaxaiydbgPcx2fgHIdbg3:tgCaxaicwfydbgYcx2fgAIdlaHIdlg8A:tgwNavIdla8A:tgEaAIdba3:tg8EN:tgLaLNaEaAIdwaHIdwg5:tg8FNavIdwa5:tgEawN:tgwawNaEa8ENaCa8FN:tgCaCNMMg8E:rhEJbbnnJbbjZazaPcdtfydbgvazaocdtfydbgASavazaYcdtfydbgoSGgHEh8Fdna8EJbbbb9ETmbaLaE:vhLaCaE:vhCawaE:vhwkaOavc8S2fgvavIdbawa8FaE:rNgEawNNg8FMUdbavaCaEaCNgaNghavIdlMUdlavaLaEaLNg8ENggavIdwMUdwavawaaNgaavIdxMUdxava8EawNg8JavIdzMUdzavaCa8ENg8EavIdCMUdCavawaEaLa5Nawa3Na8AaCNMM:mg8ANg3NgwavIdKMUdKavaCa3NgCavId3MUd3avaLa3NgLavIdaMUdaava3a8ANg3avId8KMUd8KavaEavIdyMUdydnaHmbaOaAc8S2fgva8FavIdbMUdbavahavIdlMUdlavagavIdwMUdwavaaavIdxMUdxava8JavIdzMUdzava8EavIdCMUdCavawavIdKMUdKavaCavId3MUd3avaLavIdaMUdaava3avId8KMUd8KavaEavIdyMUdyaOaoc8S2fgva8FavIdbMUdbavahavIdlMUdlavagavIdwMUdwavaaavIdxMUdxava8JavIdzMUdzava8EavIdCMUdCavawavIdKMUdKavaCavId3MUd3avaLavIdaMUdaava3avId8KMUd8KavaEavIdyMUdykaicxfhiarcifgrad6mbkkcbhAaqcuaXcdtgvaXcFFFFi0Egicbyd;y:L:cjbHjjjjbbgHBdaaqcoBd2aqaicbyd;y:L:cjbHjjjjbbgiBd8KaqcrBd2aHcFeavz:xjjjbhPdnalTmbazhHinJbbbbJbbjZaOaHydbgrc8S2fgvIdygw:vawJbbbb9BEavIdwaxcwfIdbgwNavIdzaxIdbgCNavIdaMgLaLMMawNavIdlaxclfIdbgLNavIdCawNavId3MgwawMMaLNavIdbaCNavIdxaLNavIdKMgwawMMaCNavId8KMMM:lNhwdndnaParcdtgvfgrydbcuSmbaiavfIdbaw9ETmekaraABdbaiavfawUdbkaHclfhHaxcxfhxalaAcefgA9hmbkkdndnaXmbJbbbbhwxekJbbbbhwinaiIdbgCawawaC9DEhwaiclfhiaXcufgXmbkaw:rhwkakcd4akfhOcehiinaigvcethiavaO6mbkcbhOaqcuavcdtgiavcFFFFi0Ecbyd;y:L:cjbHjjjjbbgHBdyaHcFeaiz:xjjjbhXdnadTmbavcufhrcbhkcbhxindnazaeaxcdtfgvydbcdtfydbgiazavclfydbcdtfydbgOSmbaiazavcwfydbcdtfydbgvSmbaOavSmbaPavcdtfydbhAdndnaPaOcdtfydbgvaPaicdtfydbgi9pmbavaA9pmbaAhlaihoavhAxekdnaAai9pmbaAav9pmbaihlavhoxekavhlaAhoaihAkabakcx2fgvaABdbavcwfaoBdbavclfalBdbdnaXaoc:3F;N8N2alc:F:b:DD27aAc;D;O:B8J27arGgOcdtfgvydbgicuSmbcehHinaHhvdnabaicx2fgiydbaA9hmbaiydlal9hmbaiydwaoSmikavcefhHaXaOavfarGgOcdtfgvydbgicu9hmbkkavakBdbakcefhkkaxcifgxad6mbkakci2hOkcwhvaDTmekaDawUdbkavcdthvaqcxfc98fhiinaiavfydbcbyd;C:L:cjbH:bjjjbbavc98fgvmbkaqc;Wbf8KjjjjbaOk:0iewuabcFeaecdtz:xjjjbhbdnalmbcbskaecufhvdndnaiTmbcbhocbhrindndndnabaiarcdtgwfydbgDcm4aD7c:v;t;h;Ev2gecs4ae7avGgqcdtfgkydbgxcuSmbceheinaiaxcdtgxfydbaDSmdaqaefhxaecefheabaxavGgqcdtfgkydbgxcu9hmbkkakarBdbaoheaocefhoxekadaxfydbhekadawfaeBdbarcefgral9hmbxdkkcbhocbhDindnabaDcm4aD7c:v;t;h;Ev2gecs4ae7avGgqcdtfgkydbgxcuSmbaxaDSmbceheinabaqaefavGgqcdtfgkydbgxcuSmeaecefheaxaD9hmbkkdndnaxcu9hmbakaDBdbaoheaocefhoxekadaxcdtfydbhekadaDcdtfaeBdbaDcefgDal9hmbkkaok:3ldrue9:8Jjjjjbc;Wb9Rgr8Kjjjjbcbhwarcxfcbc;Kbz:xjjjb8AdnabaeSmbabaeadcdtz:wjjjb8AkarcualcdtalcFFFFi0EgDcbyd;y:L:cjbHjjjjbbgqBdxarceBd2aqcbaialavcbarcxfz:djjjbcualcx2alc;v:Q;v:Qe0Ecbyd;y:L:cjbHjjjjbbhkarcxfaryd2gxcdtfakBdbaraxcefgmBd2akaialavcbcbz:ejjjb8AarcxfamcdtfaDcbyd;y:L:cjbHjjjjbbgiBdbaraxcdfgvBd2arcxfavcdtfcuaialaeadaqz:fjjjbgecltaecjjjjiGEcbyd;y:L:cjbHjjjjbbgqBdbaqaeaiakalz:gjjjbaxcifhkdnadTmbaoaoNhocbhwabhlcbheindnaqaialydbgvcdtfydbcdtfIdbao9ETmbalclf8PdbhPabawcdtfgDavBdbaDclfaP83dbawcifhwkalcxfhlaecifgead6mbkkdnakTmbaxcdtarcxffcwfhlinalydbcbyd;C:L:cjbH:bjjjbbalc98fhlakcufgkmbkkarc;Wbf8Kjjjjbawk;lOoDud99oue99vuv998Jjjjjbc;Wb9Rgw8KjjjjbdndnarmbcbhDxekawcxfcbc;Kbz:xjjjb8Aawcuadcx2adc;v:Q;v:Qe0Ecbyd;y:L:cjbHjjjjbbgqBdxawceBd2aqaeadaicbcbz:ejjjb8AawcuadcdtadcFFFFi0Egkcbyd;y:L:cjbHjjjjbbgxBdzawcdBd2adcd4adfhecehiinaigmcethiamae6mbkcbhPawcuamcdtgsamcFFFFi0Ecbyd;y:L:cjbHjjjjbbgzBdCawciBd2dndnar:ZgH:rJbbbZMgO:lJbbb9p9DTmbaO:Ohixekcjjjj94hikamcufhAc:bwhCcbhXadhQcbhLinaiaCcufgeaiae9iEaPcefaiaP9kEhDdndnadTmbaDcuf:YhOaqhiaxheadhKindndnaiIdbaONJbbbZMgY:lJbbb9p9DTmbaY:Oh8Axekcjjjj94h8Aka8AcCth8AdndnaiclfIdbaONJbbbZMgY:lJbbb9p9DTmbaY:OhExekcjjjj94hEkaEcqta8AVh8AdndnaicwfIdbaONJbbbZMgY:lJbbb9p9DTmbaY:OhExekcjjjj94hEkaea8AaEVBdbaicxfhiaeclfheaKcufgKmbkazcFeasz:xjjjbh3cbh5cbh8Eindna3axa8Ecdtfydbg8Acm4a8A7c:v;t;h;Ev2gics4ai7aAGgKcdtfgEydbgecuSmbaea8ASmbcehiina3aKaifaAGgKcdtfgEydbgecuSmeaicefhiaea8A9hmbkkaEa8ABdba5aecuSfh5a8Ecefg8Ead9hmbxdkkazcFeasz:xjjjb8Acbh5kdnaQ:ZgYaH:taD:YgOaC:Y:tg8FNaX:Zgaa5:Zgh:tNaaaH:taOaP:Y:tggNahaY:tNMg8JJbbbb9BmbaYaa:taga8FahaH:tNNNa8J:vaOMhOkaPaDa5ar0geEhPaXa5aeEhXdna5arSmbaDaCaeEgCaP9Rcd9imbdndnaLcl0mbdnaOJbbbZMgO:lJbbb9p9DTmbaO:Ohixdkcjjjj94hixekaPaCfcd9Thika5aQaeEhQaLcefgLcs9hmekkdndnaXmbcihicbhDxekawakcbyd;y:L:cjbHjjjjbbg8ABdKawclBd2aPcuf:YhYdnadTmbaqhiaxheadhKindndnaiIdbaYNJbbbZMgO:lJbbb9p9DTmbaO:OhExekcjjjj94hEkaEcCthEdndnaiclfIdbaYNJbbbZMgO:lJbbb9p9DTmbaO:Oh3xekcjjjj94h3ka3cqtaEVhEdndnaicwfIdbaYNJbbbZMgO:lJbbb9p9DTmbaO:Oh3xekcjjjj94h3kaeaEa3VBdbaicxfhiaeclfheaKcufgKmbkkawcuazama8Aaxadz:mjjjbgDc32giaDc;j:KM;jb0Ecbyd;y:L:cjbHjjjjbbgeBd3awcvBd2aecbaiz:xjjjbh3avcd4hxdnadTmbdnalTmbaxcdth8Ea8AhEaqhealhKadhAina3aEydbc32fgiaeIdbaiIdbMUdbaiaeclfIdbaiIdlMUdlaiaecwfIdbaiIdwMUdwaiaKIdbaiIdxMUdxaiaKclfIdbaiIdzMUdzaiaKcwfIdbaiIdCMUdCaiaiIdKJbbjZMUdKaEclfhEaecxfheaKa8EfhKaAcufgAmbxdkka8AhKaqheadhEina3aKydbc32fgiaeIdbaiIdbMUdbaiaeclfIdbaiIdlMUdlaiaecwfIdbaiIdwMUdwaiaiIdxJbbbbMUdxaiaiIdzJbbbbMUdzaiaiIdCJbbbbMUdCaiaiIdKJbbjZMUdKaKclfhKaecxfheaEcufgEmbkkdnaDTmba3hiaDheinaiaiIdbJbbbbJbbjZaicKfIdbgO:vaOJbbbb9BEgONUdbaiclfgKaOaKIdbNUdbaicwfgKaOaKIdbNUdbaicxfgKaOaKIdbNUdbaiczfgKaOaKIdbNUdbaicCfgKaOaKIdbNUdbaic3fhiaecufgembkkcbhEawcuaDcdtgCaDcFFFFi0Egicbyd;y:L:cjbHjjjjbbgeBdaawcoBd2awaicbyd;y:L:cjbHjjjjbbg8EBd8KaecFeaCz:xjjjbh5dnadTmbaoJbbjZJbbjZaY:vaPceSENgOaONhYaxcdthxalheinaYaecN:H:cjbalEgKIdwa3a8AydbgAc32fgiIdC:tgOaONaKIdbaiIdx:tgOaONaKIdlaiIdz:tgOaONMMNaqcwfIdbaiIdw:tgOaONaqIdbaiIdb:tgOaONaqclfIdbaiIdl:tgOaONMMMhOdndna5aAcdtgifgKydbcuSmba8EaifIdbaO9ETmekaKaEBdba8EaifaOUdbka8Aclfh8AaqcxfhqaeaxfheadaEcefgE9hmbkkaba5aCz:wjjjb8Acrhikaicdthiawcxfc98fheinaeaifydbcbyd;C:L:cjbH:bjjjbbaic98fgimbkkawc;Wbf8KjjjjbaDk:Pdidui99ducbhi8Jjjjjbca9Rglcbyd1:G:cjbBdKalcb8Pdj:G:cjb83izalcbydN:G:cjbBdwalcb8Pd:m:G:cjb83ibdndnaembJbbjFhvJbbjFhoJbbjFhrxekadcd4cdthwincbhdinalczfadfgDabadfIdbgvaDIdbgoaoav9EEUdbaladfgDavaDIdbgoaoav9DEUdbadclfgdcx9hmbkabawfhbaicefgiae9hmbkalIdwalIdK:thralIdlalIdC:thoalIdbalIdz:thvkJbbbbavavJbbbb9DEgvaoaoav9DEgvararav9DEk:H8Modui99lud99Aus998Jjjjjbcji9RgD8KjjjjbcbhqaDcxfcbc;Kbz:xjjjb8AaDcbBdwaD9cb83ibaDcbyd;i:L:cjbBd1eaDcb8Pd;a:L:cjb83ijeaDcbyd;u:L:cjbBd94aDcb8Pd;m:L:cjb83i9WdndnavmbJbbjFhkJbbjFhxJbbjFhmxekaocd4cdthPalhsincbhzinaDcjefazfgHasazfIdbgkaHIdbgxaxak9EEUdbaDc;WbfazfgHakaHIdbgxaxak9DEUdbazclfgzcx9hmbkasaPfhsaqcefgqav9hmbkaDId94aDId1e:thmaDIdtaDId:ee:thxaDId9WaDIdje:thkkJbbbbhOdnar:YgAJq;x8J88MaA:vJbbbbakakJbbbb9DEgkaxaxak9DEgkamamak9DENgxJbbbb9Bmbarc9:f:Yax:vhOkaDcCfhCaDcxfcxfhXcbhzinaDazfaDcjefazfIdbgkaxaDc;WbfazfIdbak:t:tJbbb:;NMUdbazclfgzcx9hmbkcbhQaDarar2gLar2gzcbyd;y:L:cjbHjjjjbbgHBdxaDceBd2aHcbazz:xjjjbgKcbcbadaialaoaraOaDawz:rjjjbcdhYaDcuaLcdtaLcFFFFi0Eg8Acbyd;y:L:cjbHjjjjbbgEBdzaDcdBd2aDcjefcbarz:xjjjb8Acbh3dnaLTmbdnarcb9kmbaKhzaEhHaLhsincbh3aHcbcuazaDcjefarz:AjjjbEBdbazarfhzaHclfhHascufgsmbxdkkaKhPcbh3cbhvindndnaKavar2faDcjefarz:AjjjbTmbcbhHaPhzarhsinazaHazRbbgqfgHcbaqE86bbazcefhzascufgsmbkaEavcdtfa3BdbaHa3fh3xekaEavcdtfcuBdbkaParfhPavcefgvaL9hmbkkdnabTmbaDcua3cotgza3cFFF8F0Ecbyd;y:L:cjbHjjjjbbgQBdCcihYaDciBd2aQcbazz:xjjjb8AaXhCkdnawceGmbaCa8Acbyd;y:L:cjbHjjjjbbg5BdbaDaYcefgzBd2aDcxfazcdtfaLcbyd;y:L:cjbHjjjjbbgzBdbaDaYcdfgYBd2azcbaLz:xjjjbh8EarcufhXdnarci9imbarc9:fhCararcef2aKfcefh8Aceh8Fina8Far2hPa8AhvcehqindnaEaqaPfcdtfydbcuSmbavhzaChHinazazRbbgscuasE86bbazcefhzaHcufgHmbkkavarfhvaqcefgqaX9hmbka8AaLfh8Aa8Fcefg8FaX9hmbkkarce9imbcbh8Acbhqcbhvina8EaqfhscbhzindnasazfgHRbbmbaHce86bba5a8AcdtfaqazfBdba8Acefh8Akarazcefgz9hmbkaqarfhqavcefgvar9hmbka8ATmbaKcefhaaKc9:fhharc9:fhgarci9ih8Jina8Ea5a8Acufg8Acdtfydbgvfcb86bbavar2hPdna8JmbaEavcdtfydbcuSmbaKaPfhHaghqindnaHcefgzRbbgscFe9hmbaHRbbmbcbhskazas86bbazhHaqcufgqmbkaharavcef2fhzaXhsindnazRbbgHcFe9hmbazcefRbbmbcbhHkazaH86bbazcufhzascufgsce9kmbkkaaaPfh8Kavavar9Ug8Lar29Rh8FcbhCindnaCceScuaCEa8Ffgzce9imbazaX9ombcuaCciSaCcdSEa8LfgHce9imbaHaX9ombaEaHar2azfg8McdtfydbcuSmba8Jmbaaa8Mar2fhzcbhqa8KhsaghvinazazRbbgHcbaHaHcFeSEasRbbEgP86bbascefhsazcefhzaPaH7aqVhqavcufgvmbkaqcFeGTmba8Ea8MfgzRbbmbazce86bba5a8Acdtfa8MBdba8Acefh8AkaCcefgCcl9hmbka8AmbkkdnaQTmbaKaEaQadaialaoaraOaDawz:rjjjba3TmbJbbjZaO:vhkawcjjjjlGhPdnawcdGTmbJbbnnaOaON:vh8NakJbbbZNhyaQhzinazczfgsIdbg8PazcCfIdbgx:vhmazcxfgqIdbgIax:vhAazcwfgvIdbg8Rax:vh8SakazydbgHcFrG:ZNhRakaHcq4cFrG:ZNh8UakaHcC4cFrG:ZNh8VdnaxJ:p;c;188Ng8WazcKfIdbMg8X:laxJ:983:g81Ngx9ETmba8Wazc3fIdbMazc8KfIdbg8Ya8Ya8X:vg8YN:tg8Z:lax9ETmba8WazcafIdbMazcyfIdbg8Wa8Wa8X:vg80N:tazc8SfIdba8Wa8YN:tg8Wa8Wa8Z:vg8WN:tg81:lax9ETmba8PJ:p;c;188NazcUfIdb:ta80a8RJ:p;c;188Nazc8WfIdb:tg8PN:ta8WaIJ:p;c;188Nazc80fIdb:ta8Ya8PN:tgIN:ta81:vgxam:tg8Ra8RNa8Pa8X:va8YaIa8Z:va8WaxN:tg8XN:ta80axN:tg8Wa8S:tg8Ya8YNa8XaA:tg8Ya8YNMMa8N9DTmbaxaRaxaR9EEgxakaRMgmaxam9DEhma8Xa8Ua8Xa8U9EEgxaka8UMgAaxaA9DEhAa8Wa8Va8Wa8V9EEgxaka8VMg8Saxa8S9DEh8SkdnaPTmbayaRMhmaya8UMhAaya8VMh8SkasamUdbaqaAUdbava8SUdbazc;abfhza3cufg3mbxdkkdnaPTmbakJbbbZNhxaQhzinazczfaxakazydbgHcFrG:ZNMUdbazcxfaxakaHcq4cFrG:ZNMUdbazcwfaxakaHcC4cFrG:ZNMUdbazc;abfhza3cufg3mbxdkkaQcCfhzinazc98fgHaHIdbazIdbgk:vUdbazc94fgHaHIdbak:vUdbazctfgHaHIdbak:vUdbazc;abfhza3cufg3mbkkcbhsdndnarcd9imbarcufh3aEarcdtfhadnabmbaKcefg8Mararcefgz2fh8JaKazfhba8MaLfh8Ecbhscbh8Kina8Kar2h8La8Mheabh8Aa8Eh8Fa8Jh5cbhXindnaEaXa8LfgqcdtgzfgHclfydbaHydbGaaazfgzydbGazclfydbGcuSmbclcbaKaqar2fgzarfRbbEazRbbcb9hVczcbazaLfgzRbbEVc;abcbazarfRbbEVhPaehza8AhHa8Fhqa5hva3hQindnaPclcbaHRbbEazRbbcb9hVczcbaqRbbEVc;abcbavRbbEVgPcetVgCTmbaCcFeSmbasaCRb;W;p:cjbfhskazcefhzaHcefhHaqcefhqavcefhvaQcufgQmbkkaearfhea8Aarfh8Aa8Farfh8Fa5arfh5aXcefgXa39hmbka8MaLfh8MabaLfhba8EaLfh8Ea8JaLfh8Ja8Kcefg8Ka39hmbxdkkJbbjZaO:vgkakJk;x8J88NNh8RawcdGh8EaDIdwhkaDIdlhxaDIdbhmcbhscbhPinaPar2h8KcbhvindnaEava8KfgqcdtgzfgHclfydbaHydbGaaazfgzydbGazclfydbGcuSmbcbh8AclcbaKaqar2fgYarfRbbEaYRbbcb9hVczcbaYaLfg8JRbbEVc;abcba8JarfRbbEVh8Lindna8LclcbaYa8Ag8Mcefg8AfgzarfRbbEazRbbcb9hVczcba8Ja8AfgzRbbEVc;abcbazarfRbbEVg8LcetVgCTmbaCcFeSmbcbhqdndndnaCRb;W;n:cjbcufPdebdka8ETmeaCcC2gz8Ve;W:L:cjbcltaz8Ve;Y:L:cjbcsGVh8FaKa8Mfh5cxhzaDcjefhHinaHaQaEa8Faz4gqce4ceGavfaqcd4ceGaPfar2fgXcdtfydbcotfa5aqceGfaXar2fRbbcotfcnfBdbaHclfhHazc98fgzc989hmbkaDydjegzIdyaDyd:megHIdyMaDyd:eegqIdyaDyd1egXIdyMMg8XaqIdwaXIdwMJbbbZNgANazIdUaHIdUMaqIdUaXIdUMMg8WMg8Sa8SMazIdaaHIdaMaqIdaaXIdaMMg8YaqIdzaXIdzMJbbbZNg8SNMa8SNazId8SaHId8SMaqId8SaXId8SMMgRa8SNazId80aHId80MaqId80aXId80MMg8UMg8Sa8SMazId3aHId3MaqId3aXId3MMg8VaqIdxaXIdxMJbbbZNg8SNMa8SNazId8KaHId8KMaqId8KaXId8KMMg8Za8SNazId8WaHId8WMaqId8WaXId8WMMg80Mg8Sa8SMazIdKaHIdKMaqIdKaXIdKMMgyaANMaANazId88aHId88MaqId88aXId88MMg8PMMM:lgIa8RazIdCaHIdCMaqIdCaXIdCMMN9Ea8XazIdwaHIdwMJbbbZNgANa8WMg8Sa8SMa8YazIdzaHIdzMJbbbZNg8SNMa8SNaRa8SNa8UMg8Sa8SMa8VazIdxaHIdxMJbbbZNg8SNMa8SNa8Za8SNa80Mg8Sa8SMayaANMaANa8PMMM:laIJ;d;1UZN9DGhqxekaKa8Mfh8FcbhzcrhHindnaCaz4ceGTmba8FazceGfazce4ceGavfazcd4aPfar2fgqar2fRbbgXcFeSmbaQaEaqcdtfydbcotfaXcotfc9efRbbaH4ceGTmbcbhqxdkaHcufhHcehqazcefgzcw9hmbkkaCcC2aqcq2fgH8Ve;W:L:cjbgzTmbaHc;Y:L:cjbfhqaKa8MfhCabasc8K2fhHindnasae9pmbaHaQaEazcD4ceGavfazcq4ceGaPfar2fgXcdtfydbcotfaCazcw4ceGfaXar2fRbbcotfgXc9ifIdbamMUdbaHclfaXc9mfIdbaxMUdbaHcwfaXc9qfIdbakMUdbaHcxfamaQaEazcv4ceGavfazco4ceGaPfar2fgXcdtfydbcotfaCazcl4ceGfaXar2fRbbcotfgXc9ifIdbMUdbaHczfaxaXc9mfIdbMUdbaHcCfakaXc9qfIdbMUdbaHcKfamaQaEazce4ceGavfazcd4ceGaPfar2fgXcdtfydbcotfaCazceGfaXar2fRbbcotfgzc9ifIdbMUdbaHc3faxazc9mfIdbMUdbaHcafakazc9qfIdbMUdbkaHc8KfhHascefhsaq8Vebhzaqcdfhqazmbkka8Aa39hmbkkavcefgva39hmbkaPcefgPa39hmbkaDyd2gYTmekaYcdtaDcxffc98fhzinazydbcbyd;C:L:cjbH:bjjjbbazc98fhzaYcufgYmbkkaDcjif8Kjjjjbask;Kxmiue99due99euz99eui99eud99dud99oudnalTmbaocd4hkaqcdGhxarc99fhqarcethmawawMhPcbhsindndnawavaiascdtfgoclfydbak2cdtfgzIdwgHavaoydbak2cdtfgOIdwgA:tgCaCNazIdbgXaOIdbgQ:tgLaLNazIdlgKaOIdlgY:tg8Aa8ANMMgEavaocwfydbak2cdtfgoIdwg3aA:tg5a5NaoIdbg8EaQ:tg8Fa8FNaoIdlgaaY:tghahNMMggaEag9EEgEa3aH:tgHaHNa8EaX:tgHaHNaaaK:tgHaHNMMgHaEaH9EE:rNgHaHMgH:lJbbb9p9DTmbaH:Ohoxekcjjjj94hokdnaLahNa8Aa8FN:tgHaHNa8Aa5NaCahN:tgXaXNaCa8FNaLa5N:tgKaKNMMg3Jbbbb9BmbJbbjZhEdnaoceaoce9kEgoamaoam9iEg8Jcd9imbJbbjZa8J:Z:vhEkarcb9imbaAaDIdw:th8KaYaDIdl:th8LaQaDIdb:th8Ma8Jcba8Jcb9kEh8NdnadTmbaHJbbjZa3:rgA:vgQNg3aAa8Jcefa8Jcdf2:Y:vgANh8EaKaQNgKaANhyaXaQNgXaXaANNh8PcbhIina8Jcba8Jcb9kEcefh8RaEaI:ZNgQaCNa8KMhgaQa8ANa8LMh8SaQaLNa8MMhRcbhzindndnaPaEaz:ZNgQahNa8SMgYNgH:lJbbb9p9DTmbaH:OhOxekcjjjj94hOkaOce91goaqaoaq6Eh8UdndnaPaQa5NagMgHNga:lJbbb9p9DTmbaa:Oh8Vxekcjjjj94h8Vka8Ua8Vce91goaqaoaq6Eg8Wcefar2fcefgoar2h8XdndnaPaQa8FNaRMgQNga:lJbbb9p9DTmbaa:Oh8Yxekcjjjj94h8Ykadaeaocdtfydbcotfaba8Yce91goaqaoaq6Eg8Zfa8XfcefRbbcotfgocnfa8Ucqta8ZcCtVa8WVBdbaoc9efg8Ua8URbbcea8YceGaOcetcdGVa8VcdtclGVtV86bbaoc9ifgOaQaANaOIdbMUdbaoc9mfgOaYaANaOIdbMUdbaoc9qfgOaHaANaOIdbMUdbaoc9ufgOaAaOIdbMUdbdnaxTmbaoc9yfgOa8PaOIdbMUdbaoc9CfgOaKayNaOIdbMUdbaoc9GfgOa3a8ENaOIdbMUdbaoc9KfgOaXayNaOIdbMUdbaoc9OfgOaXa8ENaOIdbMUdbaoc2fgOaKa8ENaOIdbMUdbaoc9WfgOaXaAa3aHNaXaQNaKaYNMMgY:mNgQNaOIdbMUdbaoctfgOaKaQNaOIdbMUdbaoc94fgOa3aQNaOIdbMUdbaoc98fgoaoIdbaYaQN:tUdbka8Razcefgz9hmbka8Jcufh8JaIa8NShoaIcefhIaoTmbxdkkcbh8Vina8Jcba8Jcb9kEcefh8UaEa8V:ZNgAaCNa8KMhYaAa8ANa8LMhHaAaLNa8MMhXcbhoindndnaPaEao:ZNgAahNaHMNgQ:lJbbb9p9DTmbaQ:Ohzxekcjjjj94hzkazce91gzaqazaq6EhzdndnaPaAa5NaYMNgQ:lJbbb9p9DTmbaQ:OhOxekcjjjj94hOkazaOce91gOaqaOaq6Ecefar2fcefar2hzdndnaPaAa8FNaXMNgA:lJbbb9p9DTmbaA:OhOxekcjjjj94hOkabaOce91gOaqaOaq6Efazfcefce86bba8Uaocefgo9hmbka8Jcufh8Ja8Va8NShoa8Vcefh8VaoTmbkkascifgsal6mbkkk:Nvezu8Jjjjjbcjd9Rgb8Kjjjjbcbheabcbcjdz:xjjjbhdc:W:H:cjbhbinabRbbgicC2glabcqf8Veb87e;4:L:cjbalabcdfgv8Peb83e;W:L:cjbaiabcefRbb86b;W;n:cjbadaifce86bbalavabcxfceaetc:F:d;avGEgi8Peb83e;6:L:cjbalai8Vew87e:c:M:cjbabcQfhbaecefgecK9hmbkcbhoinc;Y:L:cjbhrcbhvindnadavfgwRbbce9hmbavcC2c;W:L:cjbfhDcbhbcehqavc;W;n:cjbfhkinabcitc:G:H:cjbfhlcbhbcbheinaeavab4ceGalabfRbbtVheabcefgbcw9hmbkdnadaecFeGgxfgmRbbmbaxcC2c;W:L:cjbfhPcbhbcehsindnaDabcq2gif8VebgbTmbaraifheaPaifhiinaialabcl4csGfRbbcltalabcw4csGfRbbcwtValabcsGfRbbV87ebaicdfhiae8VebhbaecdfheabmbkkcehbasceGhecbhsaembkamce86bbaxakRbb86b;W;n:cjbkcehbaqceGhlcbhqalmbkawcd86bbkarcCfhravcefgvcjd9hmbkaocefgoci9hmbkcbhic;W:L:cjbhvincuhlavhbinalcefhlab8Vebheabcdfhbaembkaial86b;W;p:cjbavcCfhvaicefgicjd9hmbkadcjdf8Kjjjjbk9DeeuabcFeaicdtz:xjjjbhlcbhbdnadTmbindnalaeydbcdtfgiydbcu9hmbaiabBdbabcefhbkaeclfheadcufgdmbkkabk;Bidqui998Jjjjjbc;Wb9Rgl8Kjjjjbalcxfcbc;Kbz:xjjjb8Aadcd4adfhvcehoinaogrcethoarav6mbkalcuarcdtgoarcFFFFi0Ecbyd;y:L:cjbHjjjjbbgvBdxavcFeaoz:xjjjbhwdnadTmbaicd4hDarcufhqcbhkindndnawcbaeakaD2cdtfgrydlgiaicjjjj94SEgocH4ao7c:F:b:DD2cbarydbgxaxcjjjj94SEgocH4ao7c;D;O:B8J27cbarydwgmamcjjjj94SEgrcH4ar7c:3F;N8N27aqGgvcdtfgrydbgocuSmbam::hPai::hsax::hzcehiinaihrdnaeaoaD2cdtfgiIdbaz9CmbaiIdlas9CmbaiIdwaP9BmikarcefhiawavarfaqGgvcdtfgrydbgocu9hmbkkarakBdbakhokabakcdtfaoBdbakcefgkad9hmbkkalydxcbyd;C:L:cjbH:bjjjbbalc;Wbf8Kjjjjbk9teiucbcbyd;G:L:cjbgeabcifc98GfgbBd;G:L:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabk9teiucbcbyd;G:L:cjbgeabcrfc94GfgbBd;G:L:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikTeeucbabcbyd;G:L:cjbge9Rcifc98GaefgbBd;G:L:cjbdnabZbcztge9nmbabae9RcFFifcz4nb8Akk6eiucbhidnadTmbdninabRbbglaeRbbgv9hmeaecefheabcefhbadcufgdmbxdkkalav9Rhikaikk;0vdbcj:Gdk;yvFFuuFFuuFFuuFFuFFFuFFFuFbbbbbbbbebbbdbbbbbbbebbbebbbdbbbbbbbbbbbeeeeeebebbeebbebbebbbeeebbbbebbbbbbbbbbbbbbbbbbbeeeeeeebebbbeeebbeebbbbbebbbbbebebbbbbbbbbbbbbbbdiorbelvlbodveribbbbbbbbbbbbbbbbbbbbbbebbbbbbbbbbbbbbbbbbbbbibbbbbbbbbbbbbbbbbbbbbobbbbbbbbbbbbbbbbbbbbbrbaebbbbbbbbbbbbbbbbbbsd8We8YbbbbbbbhiaebbbbbbQe8Ke9cebbbbbbbbbbbbbbbbLb8KebbbbbbbbbbbbbbbbbbKbbbbbbbbbbbbbbbbbbbbbYeJbilbbbbbbbbbbbbbbbbEe80e8WlbbbbbbzlAbbbbbbb5eJdnibbbbbbai8Kbbbbbbb8Ee9ce8Ylcibbbb8Yebbbbbbbb8FdOlAdbbbbbb80e8Ylbbbbbb88eTi8KiJv8Jlbbbbbbbbbbbb89e9td8Kv9qibbbbndlvaibbbbZd8Li8KvbbbbbbJdTibbbbbb9Pe81b9GvoiBvbbbbbbbbbbbb9Re9JbvoWibbbbvibbbbbbbb9VeWi9Gvbbbbbb8WvBbbbbbbb9:b9ceBvbbbbbbbbbbbbbbbbubWibbbbbbbbbbbbbbbbbb;Wd9hvSrbbbbbbWl9NvbbbbbbFbbbbbbbbbbbbbbbbbbbbbFFuuFFuuFFuuFFuFFFuFFFuFbc;y:Ldkxebbbdbbb;W:Obb",e=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var t,a=WebAssembly.instantiate(r(n),{}).then(function(g){t=g.instance,t.exports.__wasm_call_ctors()});function r(g){for(var k=new Uint8Array(g.length),f=0;f<g.length;++f){var A=g.charCodeAt(f);k[f]=A>96?A-97:A>64?A-39:A+4}for(var P=0,f=0;f<g.length;++f)k[P++]=k[f]<60?e[k[f]]:(k[f]-60)*64+k[++f];return k.buffer.slice(0,P)}function s(g){if(!g)throw new Error("Assertion failed")}function i(g){return new Uint8Array(g.buffer,g.byteOffset,g.byteLength)}function o(g,k,f,A){var P=t.exports.sbrk,S=P(f*4),T=P(f*A*4),j=new Uint8Array(t.exports.memory.buffer);j.set(i(k),T),g(S,T,f,A*4),j=new Uint8Array(t.exports.memory.buffer);var z=new Uint32Array(f);return new Uint8Array(z.buffer).set(j.subarray(S,S+f*4)),P(S-P(0)),z}function c(g,k,f){var A=t.exports.sbrk,P=A(k.length*4),S=A(f*4),T=new Uint8Array(t.exports.memory.buffer),j=i(k);T.set(j,P);var z=g(S,P,k.length,f);T=new Uint8Array(t.exports.memory.buffer);var R=new Uint32Array(f);new Uint8Array(R.buffer).set(T.subarray(S,S+f*4)),A(P-A(0));for(var I=0;I<k.length;++I)k[I]=R[k[I]];return[R,z]}function d(g){for(var k=0,f=0;f<g.length;++f){var A=g[f];k=k<A?A:k}return k}function l(g,k,f,A,P,S,T,j,z){var R=t.exports.sbrk,I=R(4),L=R(f*4),E=R(P*S),N=R(f*4),O=new Uint8Array(t.exports.memory.buffer);O.set(i(A),E),O.set(i(k),N);var C=g(L,N,f,E,P,S,T,j,z,I);O=new Uint8Array(t.exports.memory.buffer);var U=new Uint32Array(C);i(U).set(O.subarray(L,L+C*4));var q=new Float32Array(1);return i(q).set(O.subarray(I,I+4)),R(I-R(0)),[U,q[0]]}function m(g,k,f,A,P,S,T,j,z,R,I,L,E){var N=t.exports.sbrk,O=N(4),C=N(f*4),U=N(P*S),q=N(P*j),V=N(z.length*4),K=N(f*4),B=R?N(P):0,J=new Uint8Array(t.exports.memory.buffer);J.set(i(A),U),J.set(i(T),q),J.set(i(z),V),J.set(i(k),K),R&&J.set(i(R),B);var Q=g(C,K,f,U,P,S,q,j,V,z.length,B,I,L,E,O);J=new Uint8Array(t.exports.memory.buffer);var Y=new Uint32Array(Q);i(Y).set(J.subarray(C,C+Q*4));var X=new Float32Array(1);return i(X).set(J.subarray(O,O+4)),N(O-N(0)),[Y,X[0]]}function h(g,k,f,A,P,S,T,j,z,R,I,L,E){var N=t.exports.sbrk,O=N(4),C=N(P*S),U=N(P*j),q=N(z.length*4),V=N(f*4),K=R?N(P):0,B=new Uint8Array(t.exports.memory.buffer);B.set(i(A),C),B.set(i(T),U),B.set(i(z),q),B.set(i(k),V),R&&B.set(i(R),K);var J=g(V,f,C,P,S,U,j,q,z.length,K,I,L,E,O);B=new Uint8Array(t.exports.memory.buffer),i(k).set(B.subarray(V,V+J*4)),i(A).set(B.subarray(C,C+P*S)),i(T).set(B.subarray(U,U+P*j));var Q=new Float32Array(1);return i(Q).set(B.subarray(O,O+4)),N(O-N(0)),[J,Q[0]]}function b(g,k,f,A){var P=t.exports.sbrk,S=P(f*A),T=new Uint8Array(t.exports.memory.buffer);T.set(i(k),S);var j=g(S,f,A);return P(S-P(0)),j}function v(g,k,f,A,P,S,T,j){var z=t.exports.sbrk,R=z(j*4),I=z(f*A),L=P?z(f*S):0,E=new Uint8Array(t.exports.memory.buffer);E.set(i(k),I),P&&E.set(i(P),L);var N=g(R,I,f,A,L,S,T,j);E=new Uint8Array(t.exports.memory.buffer);var O=new Uint32Array(N);return i(O).set(E.subarray(R,R+N*4)),z(R-z(0)),O}function p(g,k,f,A,P,S,T,j,z){var R=t.exports.sbrk,I=R(4),L=R(f*4),E=R(P*S),N=R(f*4),O=T?R(P):0,C=new Uint8Array(t.exports.memory.buffer);C.set(i(A),E),C.set(i(k),N),T&&C.set(i(T),O);var U=g(L,N,f,E,P,S,O,j,z,I);C=new Uint8Array(t.exports.memory.buffer);var q=new Uint32Array(U);i(q).set(C.subarray(L,L+U*4));var V=new Float32Array(1);return i(V).set(C.subarray(I,I+4)),R(I-R(0)),[q,V[0]]}function M(g,k,f,A,P,S,T){var j=t.exports.sbrk,z=j(f*4),R=j(P*S),I=j(f*4),L=new Uint8Array(t.exports.memory.buffer);L.set(i(A),R),L.set(i(k),I);var E=g(z,I,f,R,P,S,T);L=new Uint8Array(t.exports.memory.buffer);var N=new Uint32Array(E);return i(N).set(L.subarray(z,z+E*4)),j(z-j(0)),N}function y(g,k,f,A,P,S){var T=t.exports.sbrk,j=T(f.byteLength),z=T(k.byteLength),R=new Uint8Array(t.exports.memory.buffer);R.set(i(f),j),R.set(i(k),z);var I=f.byteLength/A,L=g(0,0,z,k.length,j,I,A,P,S),E=T(L*9*4),N=g(E,L,z,k.length,j,I,A,P,S);s(N<=L),R=new Uint8Array(t.exports.memory.buffer);var O=new Float32Array(N*9);return i(O).set(R.subarray(E,E+O.byteLength)),T(j-T(0)),O}var x={LockBorder:1,Sparse:2,ErrorAbsolute:4,Prune:8,Regularize:16,Permissive:32,RegularizeLight:64,PreserveFolds:128,ErrorClamped:256,_InternalDebug:1<<30},w={Shell:1,Solve:2,Thicken:0,_InternalDebug:1<<30};return{ready:a,supported:!0,compactMesh:function(g){s(g instanceof Uint32Array||g instanceof Int32Array||g instanceof Uint16Array||g instanceof Int16Array),s(g.length%3==0);var k=g.BYTES_PER_ELEMENT==4?g:new Uint32Array(g),f=c(t.exports.meshopt_optimizeVertexFetchRemap,k,d(g)+1);if(g!==k)for(var A=0;A<k.length;++A)g[A]=k[A];return f},generatePositionRemap:function(g,k){return s(g instanceof Float32Array),s(g.length%k==0),s(k>=3),o(t.exports.meshopt_generatePositionRemap,g,g.length/k,k)},simplify:function(g,k,f,A,P,S){s(g instanceof Uint32Array||g instanceof Int32Array||g instanceof Uint16Array||g instanceof Int16Array),s(g.length%3==0),s(k instanceof Float32Array),s(k.length%f==0),s(f>=3),s(A>=0&&A<=g.length),s(A%3==0),s(P>=0);for(var T=0,j=0;j<(S?S.length:0);++j)s(S[j]in x),T|=x[S[j]];var z=g.BYTES_PER_ELEMENT==4?g:new Uint32Array(g),R=l(t.exports.meshopt_simplify,z,g.length,k,k.length/f,f*4,A,P,T);return R[0]=g instanceof Uint32Array?R[0]:new g.constructor(R[0]),R},simplifyWithAttributes:function(g,k,f,A,P,S,T,j,z,R){s(g instanceof Uint32Array||g instanceof Int32Array||g instanceof Uint16Array||g instanceof Int16Array),s(g.length%3==0),s(k instanceof Float32Array),s(k.length%f==0),s(f>=3),s(A instanceof Float32Array),s(A.length==P*(k.length/f)),s(P>=0),s(T==null||T instanceof Uint8Array),s(T==null||T.length==k.length/f),s(j>=0&&j<=g.length),s(j%3==0),s(z>=0),s(Array.isArray(S)),s(P>=S.length),s(S.length<=32);for(var I=0;I<S.length;++I)s(S[I]>=0);for(var L=0,I=0;I<(R?R.length:0);++I)s(R[I]in x),L|=x[R[I]];var E=g.BYTES_PER_ELEMENT==4?g:new Uint32Array(g),N=m(t.exports.meshopt_simplifyWithAttributes,E,g.length,k,k.length/f,f*4,A,P*4,new Float32Array(S),T,j,z,L);return N[0]=g instanceof Uint32Array?N[0]:new g.constructor(N[0]),N},simplifyWithUpdate:function(g,k,f,A,P,S,T,j,z,R){s(g instanceof Uint32Array||g instanceof Int32Array||g instanceof Uint16Array||g instanceof Int16Array),s(g.length%3==0),s(k instanceof Float32Array),s(k.length%f==0),s(f>=3),s(A instanceof Float32Array),s(A.length==P*(k.length/f)),s(P>=0),s(T==null||T instanceof Uint8Array),s(T==null||T.length==k.length/f),s(j>=0&&j<=g.length),s(j%3==0),s(z>=0),s(Array.isArray(S)),s(P>=S.length),s(S.length<=32);for(var I=0;I<S.length;++I)s(S[I]>=0);for(var L=0,I=0;I<(R?R.length:0);++I)s(R[I]in x),L|=x[R[I]];var E=g.BYTES_PER_ELEMENT==4?g:new Uint32Array(g),N=h(t.exports.meshopt_simplifyWithUpdate,E,g.length,k,k.length/f,f*4,A,P*4,new Float32Array(S),T,j,z,L);if(g!==E)for(var I=0;I<N[0];++I)g[I]=E[I];return N},getScale:function(g,k){return s(g instanceof Float32Array),s(g.length%k==0),s(k>=3),b(t.exports.meshopt_simplifyScale,g,g.length/k,k*4)},simplifyPoints:function(g,k,f,A,P,S){return s(g instanceof Float32Array),s(g.length%k==0),s(k>=3),s(f>=0&&f<=g.length/k),A?(s(A instanceof Float32Array),s(A.length%P==0),s(P>=3),s(g.length/k==A.length/P),v(t.exports.meshopt_simplifyPoints,g,g.length/k,k*4,A,P*4,S||0,f)):v(t.exports.meshopt_simplifyPoints,g,g.length/k,k*4,void 0,0,0,f)},simplifySloppy:function(g,k,f,A,P,S){s(g instanceof Uint32Array||g instanceof Int32Array||g instanceof Uint16Array||g instanceof Int16Array),s(g.length%3==0),s(k instanceof Float32Array),s(k.length%f==0),s(f>=3),s(A==null||A instanceof Uint8Array),s(A==null||A.length==k.length/f),s(P>=0&&P<=g.length),s(P%3==0),s(S>=0);var T=g.BYTES_PER_ELEMENT==4?g:new Uint32Array(g),j=p(t.exports.meshopt_simplifySloppy,T,g.length,k,k.length/f,f*4,A,P,S);return j[0]=g instanceof Uint32Array?j[0]:new g.constructor(j[0]),j},simplifyPrune:function(g,k,f,A){s(g instanceof Uint32Array||g instanceof Int32Array||g instanceof Uint16Array||g instanceof Int16Array),s(g.length%3==0),s(k instanceof Float32Array),s(k.length%f==0),s(f>=3),s(A>=0);var P=g.BYTES_PER_ELEMENT==4?g:new Uint32Array(g),S=M(t.exports.meshopt_simplifyPrune,P,g.length,k,k.length/f,f*4,A);return S=g instanceof Uint32Array?S:new g.constructor(S),S},remesh:function(g,k,f,A,P){s(g instanceof Uint32Array||g instanceof Int32Array||g instanceof Uint16Array||g instanceof Int16Array),s(g.length%3==0),s(k instanceof Float32Array),s(k.length%f==0),s(f>=3),s(A>=4&&A<=256);for(var S=0,T=0;T<(P?P.length:0);++T)s(P[T]in w),S|=w[P[T]];var j=g.BYTES_PER_ELEMENT==4?g:new Uint32Array(g);return y(t.exports.meshopt_remesh,j,k,f*4,A,S)}}})();var Xt=class n{constructor(e,t,a){this.renderer=e;this.baseUrl=t;this.manifest=a}models=new Map;materials=new Map;static async load(e,t="../../assets/"){let a=t.endsWith("/")?t:t+"/",r={version:1,textures:{},models:{}};try{let s=await fetch(a+"manifest.json",{cache:"no-cache"});s.ok&&(r={textures:{},models:{},...await s.json()})}catch{}return new n(e,a,r)}get empty(){return!Object.keys(this.manifest.textures).length&&!Object.keys(this.manifest.models).length}hasModel(e){return e in this.manifest.models}hasTexture(e){return e in this.manifest.textures}modelSlots(e){return Object.keys(this.manifest.models).filter(t=>t.startsWith(e))}model(e,t=!0){let a=this.models.get(e);if(!a){let r=this.manifest.models[e];a=r?xn(this.baseUrl+r.file).then(s=>za(this.renderer,s,{keepSource:t})).catch(s=>(console.warn(`[oAxis] model ${e} failed to load`,s),null)):Promise.resolve(null),this.models.set(e,a)}return a}modelEntry(e){return this.manifest.models[e]}texture(e,t={}){let a=this.materials.get(e);if(!a){let r=this.manifest.textures[e];a=r?this.buildMaterial(e,r,t).catch(s=>(console.warn(`[oAxis] texture ${e} failed`,s),null)):Promise.resolve(null),this.materials.set(e,a)}return a}async buildMaterial(e,t,a){let r=this.renderer.textures,s=(l,m,h=!1)=>r.fromURL(this.baseUrl+l,{srgb:m,normalMap:h}),[i,o,c]=await Promise.all([s(t.diff,!0),t.nor?s(t.nor,!1,!0):null,t.arm?s(t.arm,!1):null]),d=1/(t.tileMeters??2);return new ue({name:a.name??e,baseColorMap:i,normalMap:o,ormMap:c,baseColor:[1,1,1,1],metallic:c?1:0,roughness:a.roughness??1,occlusionStrength:c?1:0,uvScale:[d,d],worldUV:a.worldUV??!1,edgeWear:a.edgeWear??0})}credits(){let e=[];for(let[t,a]of Object.entries(this.manifest.textures))e.push({...a,slot:t});for(let[t,a]of Object.entries(this.manifest.models))e.push({...a,slot:t});return e}};var Be=new URLSearchParams(location.search),Ge=(n,e)=>Be.has(n)?Number(Be.get(n)):e,Lt=document.getElementById("view"),Qt=document.getElementById("status"),ns=Be.get("offscreen")==="1";Be.get("tex")&&(je.textureSize=Ge("tex",2048));var ie=await Ta.create({canvas:Lt,baseUrl:"../../",title:"oAxis viewer",offscreen:ns});Tn(ie.tuning);var It={frames:0,errors:[],done:!1};window.__test=It;ie.renderer.dev.onError=n=>{It.errors.push(n),console.error(n)};var ss=ie.renderer.sky.settings;ss.sunElevation=Ge("sun",32);ss.sunAzimuth=Ge("az",130);var Xi=ie.renderer.settings;Xi.exposure.compensation=Ge("ev",.3);var Yi=ie.renderer.synth.material("concrete",{size:1024,tileMeters:1,seed:3,dirt:.2},{name:"table"}),Qi=new ge(new me(ie.renderer.dev,fe(1.6,.04,1).computeTangents()),Yi,F.fromTranslation(F.create(),[0,-.02,0]));ie.scene.add(Qi);Qt.textContent="Building models\u2026";var ze={pistol:jn(ie.renderer),carbine:En(ie.renderer)},is={};if(Be.get("fit")!=="0"){for(let[n,e]of Object.entries(ze))if(e.grips){let t=$n(e.grips,e.model);e.grips=t.grips,is[n]=t.reports}}window.__fit=is;window.__builds=ze;window.__clear=(n,e,t)=>{let a=t?ze[n].grips:n==="pistol"?lr:dr;return ts(a[e],ze[n].model,e==="right"?1:-1)};window.__sd=(n,e)=>es(ze[n].model,e);var it=Be.get("model")in ze?Be.get("model"):"pistol",Zi=n=>{let e=0;for(let t of n.parts){let a=t.object.mesh.bounds;a&&(e=Math.min(e,a.min[1]))}return F.fromRotationTranslation(F.create(),D.create(),[0,-e+.001,0])},ht={slide:Ge("slide",0),mag:Ge("mag",0),trigger:Ge("trigger",0)},yr=Be.get("hands")==="1"?new Na(ie.renderer,{viewmodel:!1,skin:Be.get("glove")==="1"?"glove":"bare"}).addTo(ie.scene):null;if(Be.get("rig")==="1"){let e=await(await Xt.load(ie.renderer,"../../assets/")).model("arms",!1);e?yr=new Ba(ie.renderer,e,{viewmodel:!1}).addTo(ie.scene):Qt.textContent='no "arms" slot in assets/manifest.json'}function vr(n){for(let e of Object.values(ze))for(let t of e.model.parts)ie.scene.remove(t.object);it=n;for(let e of ze[n].model.parts)ie.scene.add(e.object)}vr(it);var Da=Be.get("asset");if(Da){Qt.textContent=`Loading ${Da}\u2026`;let e=await(await Xt.load(ie.renderer,"../../assets/")).model(Da,!1);if(e){for(let i of Object.values(ze))for(let o of i.model.parts)ie.scene.remove(o.object);let t=e.bounds,a=Math.max(t.max[0]-t.min[0],t.max[1]-t.min[1],t.max[2]-t.min[2]),r=Ge("assetScale",.3/a),s=F.fromRotationTranslationScale(F.create(),D.fromEuler(D.create(),0,Ge("assetYaw",0)*Ye,0),[-(t.min[0]+t.max[0])/2*r,-t.min[1]*r+.001,-(t.min[2]+t.max[2])/2*r],[r,r,r]);kn(ie.scene,e,s),ze.pistol.model.parts.length=0,ze.carbine.model.parts.length=0}else Qt.textContent=`asset ${Da} not found in assets/manifest.json`}var Va=Ge("yaw",35)*Ye,Yt=Ge("pitch",12)*Ye,kt=Ge("dist",it==="pistol"?.38:1.1);ie.camera.fovY=Ge("fov",30)*Ye;ie.camera.near=.01;var xr=!1;Lt.addEventListener("pointerdown",n=>{xr=!0,Lt.setPointerCapture(n.pointerId)});Lt.addEventListener("pointerup",()=>{xr=!1});Lt.addEventListener("pointermove",n=>{xr&&(Va-=n.movementX*.005,Yt=Math.max(-1.4,Math.min(1.4,Yt+n.movementY*.005)))});Lt.addEventListener("wheel",n=>{kt=Math.max(.08,Math.min(5,kt*Math.exp(n.deltaY*.001))),n.preventDefault()},{passive:!1});window.addEventListener("keydown",n=>{if(n.code==="Digit1"&&(vr("carbine"),kt=1.1),n.code==="Digit2"&&(vr("pistol"),kt=.38),n.code==="KeyG"){let e=ze[it],t=Mn(e.model.parts.map((r,s)=>({name:`${it}-${r.bolt?"slide":r.magazine?"magazine":r.trigger?"trigger":"part"}-${s}`,object:r.object}))),a=document.createElement("a");a.href=URL.createObjectURL(new Blob([t],{type:"model/gltf-binary"})),a.download=`${it}.glb`,a.click()}n.code==="Space"&&(ht.slide=ht.slide>0?0:ze.pistol.spec.action?.travelM??.03)});ie.onUpdate.push(()=>{let n=ze[it].model,e=Zi(n),t=u.create(0,.06,it==="pistol"?0:-.1),a=Math.cos(Yt);ie.camera.position.set([t[0]+Math.sin(Va)*a*kt,t[1]+Math.sin(Yt)*kt,t[2]+Math.cos(Va)*a*kt]),D.fromEuler(ie.camera.rotation,-Yt,Va,0);let r=n.magAxis;for(let s of n.parts){let i=s.object.transform;s.bolt?F.translate(i,e,[0,0,ht.slide]):s.magazine&&r?F.translate(i,e,[r[0]*ht.mag,r[1]*ht.mag,r[2]*ht.mag]):s.trigger?F.translate(i,e,[0,0,(n.triggerTravelM??0)*ht.trigger]):F.copy(i,e)}if(yr){let s=ze[it],i=null;if(Be.get("eye")==="1"){let o=u.transformMat4(u.create(),[n.rearSight[0],n.rearSight[1],n.rearSight[2]+s.spec.eyeRelief],e);i={position:o,rotation:D.create()},Be.get("pov")==="1"&&(ie.camera.position.set(o),D.identity(ie.camera.rotation))}s.grips&&yr.update(e,s.grips,i,{trigger:ht.trigger})}It.frames=ie.frame});Qt.textContent="";if(ns){let n=Ge("frames",12);ie.onUpdate.push(()=>{ie.frame>=n&&!It.done&&(It.done=!0,ie.stop(),ie.renderer.readback().then(({width:e,height:t,data:a})=>{let r=document.createElement("canvas");r.width=e,r.height=t,r.style.cssText="position:fixed;inset:0;width:100%;height:100%;z-index:5",r.getContext("2d").putImageData(new ImageData(new Uint8ClampedArray(a.buffer),e,t),0,0),document.body.appendChild(r),It.captured=!0}))})}ie.start();
//# sourceMappingURL=main.js.map
