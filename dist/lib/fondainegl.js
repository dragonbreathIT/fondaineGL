var ee=Math.PI/180,rs=180/Math.PI,is=1e-6,Qe=(a,e,t)=>a<e?e:a>t?t:a,Yr=a=>Qe(a,0,1),Qr=(a,e,t)=>a+(e-a)*t,ss=(a,e,t)=>{let r=Yr((t-a)/(e-a));return r*r*(3-2*r)},re=(a,e,t,r)=>t<=0?e:Qr(e,a,Math.pow(2,-r/t)),m={create(a=0,e=0,t=0){let r=new Float32Array(3);return r[0]=a,r[1]=e,r[2]=t,r},clone(a){return m.create(a[0],a[1],a[2])},set(a,e,t,r){return a[0]=e,a[1]=t,a[2]=r,a},copy(a,e){return a[0]=e[0],a[1]=e[1],a[2]=e[2],a},add(a,e,t){return a[0]=e[0]+t[0],a[1]=e[1]+t[1],a[2]=e[2]+t[2],a},sub(a,e,t){return a[0]=e[0]-t[0],a[1]=e[1]-t[1],a[2]=e[2]-t[2],a},mul(a,e,t){return a[0]=e[0]*t[0],a[1]=e[1]*t[1],a[2]=e[2]*t[2],a},scale(a,e,t){return a[0]=e[0]*t,a[1]=e[1]*t,a[2]=e[2]*t,a},scaleAndAdd(a,e,t,r){return a[0]=e[0]+t[0]*r,a[1]=e[1]+t[1]*r,a[2]=e[2]+t[2]*r,a},dot(a,e){return a[0]*e[0]+a[1]*e[1]+a[2]*e[2]},cross(a,e,t){let r=e[0],i=e[1],s=e[2],n=t[0],o=t[1],l=t[2];return a[0]=i*l-s*o,a[1]=s*n-r*l,a[2]=r*o-i*n,a},length(a){return Math.hypot(a[0],a[1],a[2])},lengthSq(a){return a[0]*a[0]+a[1]*a[1]+a[2]*a[2]},distance(a,e){return Math.hypot(a[0]-e[0],a[1]-e[1],a[2]-e[2])},normalize(a,e){let t=Math.hypot(e[0],e[1],e[2]),r=t>0?1/t:0;return a[0]=e[0]*r,a[1]=e[1]*r,a[2]=e[2]*r,a},negate(a,e){return a[0]=-e[0],a[1]=-e[1],a[2]=-e[2],a},lerp(a,e,t,r){return a[0]=e[0]+(t[0]-e[0])*r,a[1]=e[1]+(t[1]-e[1])*r,a[2]=e[2]+(t[2]-e[2])*r,a},min(a,e,t){return a[0]=Math.min(e[0],t[0]),a[1]=Math.min(e[1],t[1]),a[2]=Math.min(e[2],t[2]),a},max(a,e,t){return a[0]=Math.max(e[0],t[0]),a[1]=Math.max(e[1],t[1]),a[2]=Math.max(e[2],t[2]),a},transformMat4(a,e,t){let r=e[0],i=e[1],s=e[2],n=t[3]*r+t[7]*i+t[11]*s+t[15];return n=n||1,a[0]=(t[0]*r+t[4]*i+t[8]*s+t[12])/n,a[1]=(t[1]*r+t[5]*i+t[9]*s+t[13])/n,a[2]=(t[2]*r+t[6]*i+t[10]*s+t[14])/n,a},transformDirMat4(a,e,t){let r=e[0],i=e[1],s=e[2];return a[0]=t[0]*r+t[4]*i+t[8]*s,a[1]=t[1]*r+t[5]*i+t[9]*s,a[2]=t[2]*r+t[6]*i+t[10]*s,a},transformQuat(a,e,t){let r=t[0],i=t[1],s=t[2],n=t[3],o=e[0],l=e[1],c=e[2],u=i*c-s*l,h=s*o-r*c,p=r*l-i*o,d=i*p-s*h,f=s*u-r*p,b=r*h-i*u,v=n*2;return u*=v,h*=v,p*=v,d*=2,f*=2,b*=2,a[0]=o+u+d,a[1]=l+h+f,a[2]=c+p+b,a}},ns={create(a=0,e=0,t=0,r=0){let i=new Float32Array(4);return i[0]=a,i[1]=e,i[2]=t,i[3]=r,i},transformMat4(a,e,t){let r=e[0],i=e[1],s=e[2],n=e[3];return a[0]=t[0]*r+t[4]*i+t[8]*s+t[12]*n,a[1]=t[1]*r+t[5]*i+t[9]*s+t[13]*n,a[2]=t[2]*r+t[6]*i+t[10]*s+t[14]*n,a[3]=t[3]*r+t[7]*i+t[11]*s+t[15]*n,a}},B={create(){let a=new Float32Array(4);return a[3]=1,a},fromValues(a,e,t,r){let i=new Float32Array(4);return i[0]=a,i[1]=e,i[2]=t,i[3]=r,i},identity(a){return a[0]=0,a[1]=0,a[2]=0,a[3]=1,a},copy(a,e){return a[0]=e[0],a[1]=e[1],a[2]=e[2],a[3]=e[3],a},setAxisAngle(a,e,t){let r=t*.5,i=Math.sin(r);return a[0]=i*e[0],a[1]=i*e[1],a[2]=i*e[2],a[3]=Math.cos(r),a},multiply(a,e,t){let r=e[0],i=e[1],s=e[2],n=e[3],o=t[0],l=t[1],c=t[2],u=t[3];return a[0]=r*u+n*o+i*c-s*l,a[1]=i*u+n*l+s*o-r*c,a[2]=s*u+n*c+r*l-i*o,a[3]=n*u-r*o-i*l-s*c,a},rotateX(a,e,t){let r=t*.5,i=Math.sin(r),s=Math.cos(r),n=e[0],o=e[1],l=e[2],c=e[3];return a[0]=n*s+c*i,a[1]=o*s+l*i,a[2]=l*s-o*i,a[3]=c*s-n*i,a},rotateY(a,e,t){let r=t*.5,i=Math.sin(r),s=Math.cos(r),n=e[0],o=e[1],l=e[2],c=e[3];return a[0]=n*s-l*i,a[1]=o*s+c*i,a[2]=l*s+n*i,a[3]=c*s-o*i,a},rotateZ(a,e,t){let r=t*.5,i=Math.sin(r),s=Math.cos(r),n=e[0],o=e[1],l=e[2],c=e[3];return a[0]=n*s+o*i,a[1]=o*s-n*i,a[2]=l*s+c*i,a[3]=c*s-l*i,a},fromEuler(a,e,t,r){return B.identity(a),B.rotateY(a,a,t),B.rotateX(a,a,e),B.rotateZ(a,a,r),a},normalize(a,e){let t=Math.hypot(e[0],e[1],e[2],e[3]),r=t>0?1/t:0;return a[0]=e[0]*r,a[1]=e[1]*r,a[2]=e[2]*r,a[3]=e[3]*r,a},conjugate(a,e){return a[0]=-e[0],a[1]=-e[1],a[2]=-e[2],a[3]=e[3],a},invert(a,e){let t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2]+e[3]*e[3],r=t?1/t:0;return a[0]=-e[0]*r,a[1]=-e[1]*r,a[2]=-e[2]*r,a[3]=e[3]*r,a},dot(a,e){return a[0]*e[0]+a[1]*e[1]+a[2]*e[2]+a[3]*e[3]},slerp(a,e,t,r){let i=e[0],s=e[1],n=e[2],o=e[3],l=t[0],c=t[1],u=t[2],h=t[3],p=i*l+s*c+n*u+o*h;p<0&&(p=-p,l=-l,c=-c,u=-u,h=-h);let d,f;if(1-p>1e-6){let b=Math.acos(p),v=Math.sin(b);d=Math.sin((1-r)*b)/v,f=Math.sin(r*b)/v}else d=1-r,f=r;return a[0]=d*i+f*l,a[1]=d*s+f*c,a[2]=d*n+f*u,a[3]=d*o+f*h,a},rotationTo(a,e,t){let r=m.dot(e,t);if(r<-.999999){let s=m.create();return m.cross(s,m.create(1,0,0),e),m.length(s)<1e-6&&m.cross(s,m.create(0,1,0),e),m.normalize(s,s),B.setAxisAngle(a,s,Math.PI)}if(r>.999999)return B.identity(a);let i=m.cross(m.create(),e,t);return a[0]=i[0],a[1]=i[1],a[2]=i[2],a[3]=1+r,B.normalize(a,a)},lookRotation(a,e,t){let r=M.create(),i=m.normalize(m.create(),m.negate(m.create(),e)),s=m.normalize(m.create(),m.cross(m.create(),t,i)),n=m.cross(m.create(),i,s);return r[0]=s[0],r[1]=s[1],r[2]=s[2],r[4]=n[0],r[5]=n[1],r[6]=n[2],r[8]=i[0],r[9]=i[1],r[10]=i[2],M.getRotation(a,r)}},M={create(){let a=new Float32Array(16);return a[0]=a[5]=a[10]=a[15]=1,a},clone(a){return new Float32Array(a)},copy(a,e){for(let t=0;t<16;t++)a[t]=e[t];return a},identity(a){return a.fill(0),a[0]=a[5]=a[10]=a[15]=1,a},multiply(a,e,t){let r=e[0],i=e[1],s=e[2],n=e[3],o=e[4],l=e[5],c=e[6],u=e[7],h=e[8],p=e[9],d=e[10],f=e[11],b=e[12],v=e[13],g=e[14],x=e[15];for(let w=0;w<4;w++){let P=t[w*4],S=t[w*4+1],k=t[w*4+2],T=t[w*4+3];a[w*4]=P*r+S*o+k*h+T*b,a[w*4+1]=P*i+S*l+k*p+T*v,a[w*4+2]=P*s+S*c+k*d+T*g,a[w*4+3]=P*n+S*u+k*f+T*x}return a},invert(a,e){let t=e[0],r=e[1],i=e[2],s=e[3],n=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],p=e[10],d=e[11],f=e[12],b=e[13],v=e[14],g=e[15],x=t*o-r*n,w=t*l-i*n,P=t*c-s*n,S=r*l-i*o,k=r*c-s*o,T=i*c-s*l,G=u*b-h*f,U=u*v-p*f,R=u*g-d*f,L=h*v-p*b,C=h*g-d*b,_=p*g-d*v,A=x*_-w*C+P*L+S*R-k*U+T*G;return A?(A=1/A,a[0]=(o*_-l*C+c*L)*A,a[1]=(i*C-r*_-s*L)*A,a[2]=(b*T-v*k+g*S)*A,a[3]=(p*k-h*T-d*S)*A,a[4]=(l*R-n*_-c*U)*A,a[5]=(t*_-i*R+s*U)*A,a[6]=(v*P-f*T-g*w)*A,a[7]=(u*T-p*P+d*w)*A,a[8]=(n*C-o*R+c*G)*A,a[9]=(r*R-t*C-s*G)*A,a[10]=(f*k-b*P+g*x)*A,a[11]=(h*P-u*k-d*x)*A,a[12]=(o*U-n*L-l*G)*A,a[13]=(t*L-r*U+i*G)*A,a[14]=(b*w-f*S-v*x)*A,a[15]=(u*S-h*w+p*x)*A,a):null},transpose(a,e){if(a===e){let t=e[1],r=e[2],i=e[3],s=e[6],n=e[7],o=e[11];return a[1]=e[4],a[2]=e[8],a[3]=e[12],a[4]=t,a[6]=e[9],a[7]=e[13],a[8]=r,a[9]=s,a[11]=e[14],a[12]=i,a[13]=n,a[14]=o,a}for(let t=0;t<4;t++)for(let r=0;r<4;r++)a[r*4+t]=e[t*4+r];return a},fromRotationTranslationScale(a,e,t,r){let i=e[0],s=e[1],n=e[2],o=e[3],l=i+i,c=s+s,u=n+n,h=i*l,p=i*c,d=i*u,f=s*c,b=s*u,v=n*u,g=o*l,x=o*c,w=o*u,P=r[0],S=r[1],k=r[2];return a[0]=(1-(f+v))*P,a[1]=(p+w)*P,a[2]=(d-x)*P,a[3]=0,a[4]=(p-w)*S,a[5]=(1-(h+v))*S,a[6]=(b+g)*S,a[7]=0,a[8]=(d+x)*k,a[9]=(b-g)*k,a[10]=(1-(h+f))*k,a[11]=0,a[12]=t[0],a[13]=t[1],a[14]=t[2],a[15]=1,a},fromRotationTranslation(a,e,t){return M.fromRotationTranslationScale(a,e,t,er)},translate(a,e,t){let r=t[0],i=t[1],s=t[2];if(a!==e)for(let n=0;n<12;n++)a[n]=e[n];return a[12]=e[0]*r+e[4]*i+e[8]*s+e[12],a[13]=e[1]*r+e[5]*i+e[9]*s+e[13],a[14]=e[2]*r+e[6]*i+e[10]*s+e[14],a[15]=e[3]*r+e[7]*i+e[11]*s+e[15],a},fromTranslation(a,e){return M.identity(a),a[12]=e[0],a[13]=e[1],a[14]=e[2],a},fromScaling(a,e){return M.identity(a),a[0]=e[0],a[5]=e[1],a[10]=e[2],a},fromQuat(a,e){return M.fromRotationTranslationScale(a,e,Zr,er)},getTranslation(a,e){return a[0]=e[12],a[1]=e[13],a[2]=e[14],a},getScaling(a,e){return a[0]=Math.hypot(e[0],e[1],e[2]),a[1]=Math.hypot(e[4],e[5],e[6]),a[2]=Math.hypot(e[8],e[9],e[10]),a},getRotation(a,e){let t=Math.hypot(e[0],e[1],e[2])||1,r=Math.hypot(e[4],e[5],e[6])||1,i=Math.hypot(e[8],e[9],e[10])||1,s=e[0]/t,n=e[1]/t,o=e[2]/t,l=e[4]/r,c=e[5]/r,u=e[6]/r,h=e[8]/i,p=e[9]/i,d=e[10]/i,f=s+c+d;if(f>0){let b=Math.sqrt(f+1)*2;a[3]=.25*b,a[0]=(u-p)/b,a[1]=(h-o)/b,a[2]=(n-l)/b}else if(s>c&&s>d){let b=Math.sqrt(1+s-c-d)*2;a[3]=(u-p)/b,a[0]=.25*b,a[1]=(n+l)/b,a[2]=(h+o)/b}else if(c>d){let b=Math.sqrt(1+c-s-d)*2;a[3]=(h-o)/b,a[0]=(n+l)/b,a[1]=.25*b,a[2]=(u+p)/b}else{let b=Math.sqrt(1+d-s-c)*2;a[3]=(n-l)/b,a[0]=(h+o)/b,a[1]=(u+p)/b,a[2]=.25*b}return a},lookAt(a,e,t,r){let i=e[0]-t[0],s=e[1]-t[1],n=e[2]-t[2],o=Math.hypot(i,s,n)||1;i/=o,s/=o,n/=o;let l=r[1]*n-r[2]*s,c=r[2]*i-r[0]*n,u=r[0]*s-r[1]*i;o=Math.hypot(l,c,u)||1,l/=o,c/=o,u/=o;let h=s*u-n*c,p=n*l-i*u,d=i*c-s*l;return a[0]=l,a[1]=h,a[2]=i,a[3]=0,a[4]=c,a[5]=p,a[6]=s,a[7]=0,a[8]=u,a[9]=d,a[10]=n,a[11]=0,a[12]=-(l*e[0]+c*e[1]+u*e[2]),a[13]=-(h*e[0]+p*e[1]+d*e[2]),a[14]=-(i*e[0]+s*e[1]+n*e[2]),a[15]=1,a},perspectiveReversedInfinite(a,e,t,r,i=0,s=0){let n=1/Math.tan(e/2);return a.fill(0),a[0]=n/t,a[5]=n,a[8]=-i,a[9]=-s,a[11]=-1,a[14]=r,a},perspectiveZO(a,e,t,r,i){let s=1/Math.tan(e/2);a.fill(0),a[0]=s/t,a[5]=s,a[11]=-1;let n=1/(r-i);return a[10]=i*n,a[14]=i*r*n,a},orthoZO(a,e,t,r,i,s,n){let o=1/(e-t),l=1/(r-i),c=1/(s-n);return a.fill(0),a[0]=-2*o,a[5]=-2*l,a[10]=c,a[15]=1,a[12]=(e+t)*o,a[13]=(i+r)*l,a[14]=s*c,a},normalMatrix12(a,e,t=0){let r=e[0],i=e[1],s=e[2],n=e[4],o=e[5],l=e[6],c=e[8],u=e[9],h=e[10],p=h*o-l*u,d=-h*n+l*c,f=u*n-o*c,b=r*p+i*d+s*f;b=b?1/b:0;let v=p*b,g=(-h*i+s*u)*b,x=(l*i-s*o)*b,w=d*b,P=(h*r-s*c)*b,S=(-l*r+s*n)*b,k=f*b,T=(-u*r+i*c)*b,G=(o*r-i*n)*b;return a[t+0]=v,a[t+1]=w,a[t+2]=k,a[t+3]=0,a[t+4]=g,a[t+5]=P,a[t+6]=T,a[t+7]=0,a[t+8]=x,a[t+9]=S,a[t+10]=G,a[t+11]=0,a}},er=new Float32Array([1,1,1]),Zr=new Float32Array([0,0,0]),se={create(){return{min:m.create(1/0,1/0,1/0),max:m.create(-1/0,-1/0,-1/0)}},fromPositions(a){let e=se.create();for(let t=0;t<a.length;t+=3){let r=a[t],i=a[t+1],s=a[t+2];r<e.min[0]&&(e.min[0]=r),i<e.min[1]&&(e.min[1]=i),s<e.min[2]&&(e.min[2]=s),r>e.max[0]&&(e.max[0]=r),i>e.max[1]&&(e.max[1]=i),s>e.max[2]&&(e.max[2]=s)}return e},transform(a,e,t){for(let r=0;r<3;r++){let i=t[12+r],s=t[12+r];for(let n=0;n<3;n++){let o=t[n*4+r],l=o*e.min[n],c=o*e.max[n];l<c?(i+=l,s+=c):(i+=c,s+=l)}a.min[r]=i,a.max[r]=s}return a}};function Lt(a,e=new Float32Array(20)){let t=l=>[a[l],a[4+l],a[8+l],a[12+l]],r=t(0),i=t(1),s=t(2),n=t(3),o=[[n[0]+r[0],n[1]+r[1],n[2]+r[2],n[3]+r[3]],[n[0]-r[0],n[1]-r[1],n[2]-r[2],n[3]-r[3]],[n[0]+i[0],n[1]+i[1],n[2]+i[2],n[3]+i[3]],[n[0]-i[0],n[1]-i[1],n[2]-i[2],n[3]-i[3]],[n[0]-s[0],n[1]-s[1],n[2]-s[2],n[3]-s[3]]];for(let l=0;l<5;l++){let c=Math.hypot(o[l][0],o[l][1],o[l][2])||1;for(let u=0;u<4;u++)e[l*4+u]=o[l][u]/c}return e}function Bt(a,e){for(let t=0;t<5;t++){let r=a[t*4],i=a[t*4+1],s=a[t*4+2],n=a[t*4+3],o=r>=0?e.max[0]:e.min[0],l=i>=0?e.max[1]:e.min[1],c=s>=0?e.max[2]:e.min[2];if(r*o+i*l+s*c+n<0)return!1}return!0}function pe(a=2654435769){let e=a>>>0,t=()=>{e=e+1831565813>>>0;let r=e;return r=Math.imul(r^r>>>15,r|1),r^=r+Math.imul(r^r>>>7,r|61),((r^r>>>14)>>>0)/4294967296};return{next:t,range:(r,i)=>r+(i-r)*t(),gauss:()=>{let r=Math.max(t(),1e-12),i=t();return Math.sqrt(-2*Math.log(r))*Math.cos(2*Math.PI*i)},sign:()=>t()<.5?-1:1}}function Ct(a,e){let t=1,r=0,i=a;for(;i>0;)t/=e,r+=t*(i%e),i=Math.floor(i/e);return r}var Ze=class a{adapter;device;context;canvas;presentationFormat;features;onError=e=>console.error("[fondaineGL]",e);offscreen;constructor(e,t,r,i){this.adapter=e,this.device=t,this.canvas=r,this.offscreen=i,this.presentationFormat=i?"rgba8unorm":navigator.gpu.getPreferredCanvasFormat();let s=i?null:r.getContext("webgpu");if(!i&&!s)throw new Error("fondaineGL: could not get a WebGPU canvas context");this.context=s,i||this.context.configure({device:t,format:this.presentationFormat,alphaMode:"opaque"}),this.features=new Set([...t.features]),t.addEventListener("uncapturederror",n=>this.onError(n.error.message)),t.lost.then(n=>this.onError(`device lost (${n.reason}): ${n.message}`))}static async create(e){if(!("gpu"in navigator))throw new Error("fondaineGL requires WebGPU (Chrome/Edge 113+, Safari 26+, Firefox 141+).");let t=await navigator.gpu.requestAdapter({powerPreference:e.powerPreference??"high-performance"});if(!t)throw new Error("fondaineGL: no WebGPU adapter available");let i=["float32-filterable","rg11b10ufloat-renderable","texture-compression-bc","texture-compression-astc","texture-compression-etc2",...e.optionalFeatures??[]].filter(o=>t.features.has(o)),s=t.limits,n=await t.requestDevice({requiredFeatures:i,requiredLimits:{maxTextureDimension2D:s.maxTextureDimension2D,maxTextureArrayLayers:s.maxTextureArrayLayers,maxStorageBufferBindingSize:s.maxStorageBufferBindingSize,maxBufferSize:s.maxBufferSize,maxComputeWorkgroupStorageSize:s.maxComputeWorkgroupStorageSize,maxComputeInvocationsPerWorkgroup:s.maxComputeInvocationsPerWorkgroup,maxStorageTexturesPerShaderStage:s.maxStorageTexturesPerShaderStage,maxSampledTexturesPerShaderStage:s.maxSampledTexturesPerShaderStage,maxColorAttachmentBytesPerSample:s.maxColorAttachmentBytesPerSample}});return new a(t,n,e.canvas,!!e.offscreen)}get floatFilterable(){return this.features.has("float32-filterable")}createBuffer(e,t,r,i){let s=Math.max(16,Math.ceil(e/16)*16),n=this.device.createBuffer({size:s,usage:t|GPUBufferUsage.COPY_DST,label:r});return i&&this.device.queue.writeBuffer(n,0,i.buffer,i.byteOffset,i.byteLength),n}createTexture(e){return this.device.createTexture(e)}shader(e,t){let r=this.device.createShaderModule({code:e,label:t});return r.getCompilationInfo?.().then(i=>{for(let s of i.messages){if(s.type!=="error")continue;let o=e.split(`
`).slice(Math.max(0,s.lineNum-3),s.lineNum+1).join(`
`);this.onError(`WGSL error in ${t??"shader"} @${s.lineNum}:${s.linePos}: ${s.message}
${o}`)}}),r}},Je=class{f32;u32;buffer;constructor(e){this.buffer=new ArrayBuffer(Math.ceil(e/16)*16),this.f32=new Float32Array(this.buffer),this.u32=new Uint32Array(this.buffer)}mat4(e,t){this.f32.set(t,e/4)}vec4(e,t,r=0,i=0,s=0){let n=e/4;this.f32[n]=t,this.f32[n+1]=r,this.f32[n+2]=i,this.f32[n+3]=s}uvec4(e,t,r=0,i=0,s=0){let n=e/4;this.u32[n]=t,this.u32[n+1]=r,this.u32[n+2]=i,this.u32[n+3]=s}f(e,t){this.f32[e/4]=t}},os=20,ls=12;function oe(a,e=a){return Math.floor(Math.log2(Math.max(a,e)))+1}function Rt(a){return a<=.04045?a/12.92:Math.pow((a+.055)/1.055,2.4)}function us(a){return a<=.0031308?a*12.92:1.055*Math.pow(a,1/2.4)-.055}function ms(a){let e=a.replace("#",""),t=parseInt(e.slice(0,2),16)/255,r=parseInt(e.slice(2,4),16)/255,i=parseInt(e.slice(4,6),16)/255;return[Rt(t),Rt(r),Rt(i)]}function _t(a){let e=Math.min(25e3,Math.max(1667,a)),t;e<=4e3?t=-266123900/e**3-234358.9/e**2+877.6956/e+.17991:t=-3025846900/e**3+21070379e-1/e**2+222.6347/e+.24039;let r;e<=2222?r=-1.1063814*t**3-1.3481102*t**2+2.18555832*t-.20219683:e<=4e3?r=-.9549476*t**3-1.37418593*t**2+2.09137015*t-.16748867:r=3.081758*t**3-5.8733867*t**2+3.75112997*t-.37001483;let i=1,s=t/r*i,n=(1-t-r)/r*i,o=3.2404542*s-1.5371385*i-.4985314*n,l=-.969266*s+1.8760108*i+.041556*n,c=.0556434*s-.2040259*i+1.0572252*n;o=Math.max(o,0),l=Math.max(l,0),c=Math.max(c,0);let u=Math.max(o,l,c)||1;return[o/u,l/u,c/u]}function tr(a){let e=_t(a),t=.2126*e[0]+.7152*e[1]+.0722*e[2];return[e[0]/t,e[1]/t,e[2]/t]}function rr(a,e,t){return Math.log2(a*a/e*(100/t))}function ds(a){return 1/(1.2*Math.pow(2,a))}function ir(a){return a/(4*Math.PI)}var De=class a{positions;normals;uvs;tangents=null;indices;joints=null;weights=null;constructor(e,t,r,i){this.positions=Float32Array.from(e),this.normals=Float32Array.from(t),this.uvs=Float32Array.from(r),this.indices=Uint32Array.from(i)}get vertexCount(){return this.positions.length/3}get triangleCount(){return this.indices.length/3}clone(){let e=new a(this.positions,this.normals,this.uvs,this.indices);return this.tangents&&(e.tangents=Float32Array.from(this.tangents)),this.joints&&(e.joints=Uint16Array.from(this.joints)),this.weights&&(e.weights=Float32Array.from(this.weights)),e}bounds(){return se.fromPositions(this.positions)}transform(e){let t=m.create(),r=m.create(),i=M.invert(M.create(),e);M.transpose(i,i);for(let n=0;n<this.positions.length;n+=3)m.transformMat4(t,this.positions.subarray(n,n+3),e),this.positions.set(t,n),m.transformDirMat4(r,this.normals.subarray(n,n+3),i),m.normalize(r,r),this.normals.set(r,n);if(this.tangents){let n=m.create();for(let o=0;o<this.tangents.length;o+=4)m.transformDirMat4(n,this.tangents.subarray(o,o+3),e),m.normalize(n,n),this.tangents.set(n,o)}return e[0]*(e[5]*e[10]-e[6]*e[9])-e[4]*(e[1]*e[10]-e[2]*e[9])+e[8]*(e[1]*e[6]-e[2]*e[5])<0&&this.flipWinding(),this}translate(e,t,r){return this.transform(M.fromTranslation(M.create(),[e,t,r]))}rotateX(e){let t=M.create();return t[5]=Math.cos(e),t[6]=Math.sin(e),t[9]=-Math.sin(e),t[10]=Math.cos(e),this.transform(t)}rotateY(e){let t=M.create();return t[0]=Math.cos(e),t[2]=-Math.sin(e),t[8]=Math.sin(e),t[10]=Math.cos(e),this.transform(t)}rotateZ(e){let t=M.create();return t[0]=Math.cos(e),t[1]=Math.sin(e),t[4]=-Math.sin(e),t[5]=Math.cos(e),this.transform(t)}scale(e,t=e,r=e){return this.transform(M.fromScaling(M.create(),[e,t,r]))}flipWinding(){let e=this.indices;for(let t=0;t<e.length;t+=3){let r=e[t+1];e[t+1]=e[t+2],e[t+2]=r}return this}scaleUVs(e,t=e){for(let r=0;r<this.uvs.length;r+=2)this.uvs[r]*=e,this.uvs[r+1]*=t;return this}displace(e){for(let t=0;t<this.positions.length;t+=3){let r=e([this.positions[t],this.positions[t+1],this.positions[t+2]]);this.positions[t]=r[0],this.positions[t+1]=r[1],this.positions[t+2]=r[2]}return this.computeNormals()}computeNormals(){let e=new Float32Array(this.positions.length),t=this.positions,r=this.indices;for(let i=0;i<r.length;i+=3){let s=r[i]*3,n=r[i+1]*3,o=r[i+2]*3,l=t[n]-t[s],c=t[n+1]-t[s+1],u=t[n+2]-t[s+2],h=t[o]-t[s],p=t[o+1]-t[s+1],d=t[o+2]-t[s+2],f=c*d-u*p,b=u*h-l*d,v=l*p-c*h;for(let g of[s,n,o])e[g]+=f,e[g+1]+=b,e[g+2]+=v}for(let i=0;i<e.length;i+=3){let s=Math.hypot(e[i],e[i+1],e[i+2])||1;e[i]/=s,e[i+1]/=s,e[i+2]/=s}return this.normals=e,this}computeTangents(){return this.tangents=Et(this.positions,this.normals,this.uvs,this.indices),this}toFlat(){let e=this.indices,t=new Float32Array(e.length*3),r=new Float32Array(e.length*2);for(let s=0;s<e.length;s++)t.set(this.positions.subarray(e[s]*3,e[s]*3+3),s*3),r.set(this.uvs.subarray(e[s]*2,e[s]*2+2),s*2);return new a(t,new Float32Array(t.length),r,Array.from({length:e.length},(s,n)=>n)).computeNormals()}static merge(e){let t=0,r=0;for(let d of e)t+=d.vertexCount,r+=d.indices.length;let i=new Float32Array(t*3),s=new Float32Array(t*3),n=new Float32Array(t*2),o=new Uint32Array(r),c=e.some(d=>d.tangents)?new Float32Array(t*4):null,u=0,h=0;for(let d of e){i.set(d.positions,u*3),s.set(d.normals,u*3),n.set(d.uvs,u*2),c&&d.tangents&&c.set(d.tangents,u*4);for(let f=0;f<d.indices.length;f++)o[h+f]=d.indices[f]+u;u+=d.vertexCount,h+=d.indices.length}let p=new a(i,s,n,o);return p.tangents=c,p}};function Et(a,e,t,r){let i=a.length/3,s=new Float32Array(i*3),n=new Float32Array(i*3);for(let l=0;l<r.length;l+=3){let c=r[l],u=r[l+1],h=r[l+2],p=a[u*3]-a[c*3],d=a[u*3+1]-a[c*3+1],f=a[u*3+2]-a[c*3+2],b=a[h*3]-a[c*3],v=a[h*3+1]-a[c*3+1],g=a[h*3+2]-a[c*3+2],x=t[u*2]-t[c*2],w=t[u*2+1]-t[c*2+1],P=t[h*2]-t[c*2],S=t[h*2+1]-t[c*2+1],k=x*S-P*w;if(Math.abs(k)<1e-12)continue;let T=1/k,G=(S*p-w*b)*T,U=(S*d-w*v)*T,R=(S*f-w*g)*T,L=(x*b-P*p)*T,C=(x*v-P*d)*T,_=(x*g-P*f)*T;for(let A of[c,u,h])s[A*3]+=G,s[A*3+1]+=U,s[A*3+2]+=R,n[A*3]+=L,n[A*3+1]+=C,n[A*3+2]+=_}let o=new Float32Array(i*4);for(let l=0;l<i;l++){let c=e[l*3],u=e[l*3+1],h=e[l*3+2],p=s[l*3],d=s[l*3+1],f=s[l*3+2],b=c*p+u*d+h*f;p-=c*b,d-=u*b,f-=h*b;let v=Math.hypot(p,d,f);if(v<1e-8){let S=Math.abs(c)<.9?1:0,k=S?0:1;p=k*h-0*u,d=0*c-S*h,f=S*u-k*c,v=Math.hypot(p,d,f)||1}p/=v,d/=v,f/=v;let g=u*f-h*d,x=h*p-c*f,w=c*d-u*p,P=g*n[l*3]+x*n[l*3+1]+w*n[l*3+2]<0?-1:1;o[l*4]=p,o[l*4+1]=d,o[l*4+2]=f,o[l*4+3]=P}return o}var le=class{pos=[];nrm=[];uv=[];ix=[];v(e,t,r,i,s,n,o,l){return this.pos.push(e,t,r),this.nrm.push(i,s,n),this.uv.push(o,l),this.pos.length/3-1}tri(e,t,r){this.ix.push(e,t,r)}quad(e,t,r,i){this.ix.push(e,t,r,e,r,i)}build(){return new De(this.pos,this.nrm,this.uv,this.ix)}};function Jr(a,e,t,r=1){let i=new le,s=a/2,n=e/2,o=t/2,l=[[[1,0,0],[0,0,-1],[0,1,0],t,e],[[-1,0,0],[0,0,1],[0,1,0],t,e],[[0,1,0],[1,0,0],[0,0,-1],a,t],[[0,-1,0],[1,0,0],[0,0,1],a,t],[[0,0,1],[1,0,0],[0,1,0],a,e],[[0,0,-1],[-1,0,0],[0,1,0],a,e]],c=[s,n,o];for(let[u,h,p,d,f]of l){let b=i.pos.length/3;for(let v=0;v<=r;v++)for(let g=0;g<=r;g++){let x=(g/r-.5)*d,w=(v/r-.5)*f,P=u[0]*c[0]+h[0]*x+p[0]*w,S=u[1]*c[1]+h[1]*x+p[1]*w,k=u[2]*c[2]+h[2]*x+p[2]*w;i.v(P,S,k,u[0],u[1],u[2],x+d/2,w+f/2)}for(let v=0;v<r;v++)for(let g=0;g<r;g++){let x=b+v*(r+1)+g;i.quad(x,x+1,x+r+2,x+r+1)}}return i.build()}function gs(a,e,t,r,i=3){let s=Math.min(r,a/2,e/2,t/2)*.999,n=Jr(a,e,t,1),o=[a/2-s,e/2-s,t/2-s],l=new le,c=[[[1,0,0],[0,0,-1],[0,1,0]],[[-1,0,0],[0,0,1],[0,1,0]],[[0,1,0],[1,0,0],[0,0,-1]],[[0,-1,0],[1,0,0],[0,0,1]],[[0,0,1],[1,0,0],[0,1,0]],[[0,0,-1],[-1,0,0],[0,1,0]]],u=[a/2,e/2,t/2],h=p=>p[0]!==0?0:p[1]!==0?1:2;for(let[p,d,f]of c){let b=h(d),v=h(f),g=h(p),x=T=>{let G=[],U=u[T],R=o[T];for(let L=0;L<=i;L++)G.push(-U+L/i*(U-R));R>1e-6&&G.push(R);for(let L=1;L<=i;L++)G.push(R+L/i*(U-R));return G},w=x(b),P=x(v),S=l.pos.length/3;for(let T=0;T<P.length;T++)for(let G=0;G<w.length;G++){let U=[0,0,0];U[g]=p[g]*u[g],U[b]=w[G]*Math.sign(d[b]),U[v]=P[T]*Math.sign(f[v]);let R=[Math.max(-o[0],Math.min(o[0],U[0])),Math.max(-o[1],Math.min(o[1],U[1])),Math.max(-o[2],Math.min(o[2],U[2]))],L=U[0]-R[0],C=U[1]-R[1],_=U[2]-R[2],A=Math.hypot(L,C,_)||1;L/=A,C/=A,_/=A;let I=[R[0]+L*s,R[1]+C*s,R[2]+_*s];l.v(I[0],I[1],I[2],L,C,_,w[G]+u[b],P[T]+u[v])}let k=w.length;for(let T=0;T<P.length-1;T++)for(let G=0;G<k-1;G++){let U=S+T*k+G;l.quad(U,U+1,U+k+1,U+k)}}return l.build()}function vs(a,e,t,r=24,i={}){let s=new le,n=i.heightSegments??1,o=i.thetaStart??0,l=i.thetaLength??Math.PI*2,c=(e-a)/t,u=Math.max(a,e);for(let p=0;p<=n;p++){let d=p/n,f=e+(a-e)*d,b=-t/2+d*t;for(let v=0;v<=r;v++){let g=o+v/r*l,x=Math.sin(g),w=Math.cos(g),P=Math.hypot(1,c);s.v(f*x,b,f*w,x/P,c/P,w/P,v/r*l*u,b+t/2)}}for(let p=0;p<n;p++)for(let d=0;d<r;d++){let f=p*(r+1)+d;s.quad(f,f+1,f+r+2,f+r+1)}let h=p=>{let d=p?a:e;if(d<=0)return;let f=p?t/2:-t/2,b=p?1:-1,v=s.v(0,f,0,0,b,0,0,0),g=s.pos.length/3;for(let x=0;x<=r;x++){let w=o+x/r*l;s.v(d*Math.sin(w),f,d*Math.cos(w),0,b,0,d*Math.sin(w),d*Math.cos(w))}for(let x=0;x<r;x++)p?s.tri(v,g+x,g+x+1):s.tri(v,g+x+1,g+x)};return i.capTop!==!1&&h(!0),i.capBottom!==!1&&h(!1),s.build()}function ei(a,e=32,t=35){let r=new le,i=[],s=0;for(let l=0;l<a.length;l++){let[c,u]=a[l];l>0&&(s+=Math.hypot(c-a[l-1][0],u-a[l-1][1]));let h=a[Math.max(0,l-1)],p=a[Math.min(a.length-1,l+1)],d=l>0?[c-h[0],u-h[1]]:null,f=l<a.length-1?[p[0]-c,p[1]-u]:null,b=v=>{let g=Math.hypot(v[0],v[1])||1;return[v[1]/g,-v[0]/g]};if(d&&f){let v=Math.atan2(d[1],d[0]),g=Math.atan2(f[1],f[0]),x=Math.abs(v-g);if(x>Math.PI&&(x=2*Math.PI-x),x>t*Math.PI/180){let S=b(d),k=b(f);i.push({r:c,y:u,nr:S[0],ny:S[1],s}),i.push({r:c,y:u,nr:k[0],ny:k[1],s});continue}let w=[d[0]/(Math.hypot(d[0],d[1])||1)+f[0]/(Math.hypot(f[0],f[1])||1),d[1]/(Math.hypot(d[0],d[1])||1)+f[1]/(Math.hypot(f[0],f[1])||1)],P=b(w);i.push({r:c,y:u,nr:P[0],ny:P[1],s})}else{let v=b(d??f);i.push({r:c,y:u,nr:v[0],ny:v[1],s})}}let n=Math.max(...a.map(l=>l[0]),1e-4),o=e+1;for(let l of i)for(let c=0;c<=e;c++){let u=c/e*Math.PI*2,h=Math.sin(u),p=Math.cos(u);r.v(l.r*h,l.y,l.r*p,l.nr*h,l.ny,l.nr*p,c/e*Math.PI*2*n,l.s)}for(let l=0;l<i.length-1;l++)if(!(i[l].r===i[l+1].r&&i[l].y===i[l+1].y))for(let c=0;c<e;c++){let u=l*o+c;r.quad(u,u+1,u+o+1,u+o)}return r.build()}function xs(a,e=24,t=16){let r=new le;for(let i=0;i<=t;i++){let s=i/t,n=s*Math.PI;for(let o=0;o<=e;o++){let l=o/e,c=l*Math.PI*2,u=-Math.cos(c)*Math.sin(n),h=Math.cos(n),p=Math.sin(c)*Math.sin(n);r.v(u*a,h*a,p*a,u,h,p,l*Math.PI*2*a,s*Math.PI*a)}}for(let i=0;i<t;i++)for(let s=0;s<e;s++){let n=i*(e+1)+s;i!==0&&r.tri(n,n+e+1,n+1),i!==t-1&&r.tri(n+1,n+e+1,n+e+2)}return r.build()}function ys(a,e,t=1,r=1){let i=new le;for(let s=0;s<=r;s++)for(let n=0;n<=t;n++){let o=(n/t-.5)*a,l=(s/r-.5)*e;i.v(o,0,l,0,1,0,o+a/2,l+e/2)}for(let s=0;s<r;s++)for(let n=0;n<t;n++){let o=s*(t+1)+n;i.quad(o,o+t+1,o+t+2,o+1)}return i.build()}function ws(a,e,t=16,r=24){let i=new le;for(let s=0;s<=t;s++)for(let n=0;n<=r;n++){let o=n/r*Math.PI*2,l=s/t*Math.PI*2,c=a*Math.cos(o),u=a*Math.sin(o),h=(a+e*Math.cos(l))*Math.cos(o),p=(a+e*Math.cos(l))*Math.sin(o),d=e*Math.sin(l),f=h-c,b=p-u,v=d,g=Math.hypot(f,b,v)||1;i.v(h,p,d,f/g,b/g,v/g,o*a,l*e)}for(let s=1;s<=t;s++)for(let n=1;n<=r;n++){let o=(r+1)*s+n-1,l=(r+1)*(s-1)+n-1,c=(r+1)*(s-1)+n,u=(r+1)*s+n;i.tri(o,l,u),i.tri(l,c,u)}return i.build()}function Ms(a,e,t=16,r=6){let i=[],s=Math.max(e/2-a,0);for(let n=0;n<=r;n++){let o=-Math.PI/2+n/r*(Math.PI/2);i.push([Math.cos(o)*a,-s+Math.sin(o)*a])}for(let n=0;n<=r;n++){let o=n/r*(Math.PI/2);i.push([Math.cos(o)*a,s+Math.sin(o)*a])}return i[0][0]=0,i[i.length-1][0]=0,ei(i,t,80)}function Ps(a,e,t=8){let r=new le,i=a.length,s=[0,1,0],n=0;for(let o=0;o<i;o++){let l=a[o],c=a[Math.min(i-1,o+1)],u=a[Math.max(0,o-1)],h=[c[0]-u[0],c[1]-u[1],c[2]-u[2]],p=Math.hypot(h[0],h[1],h[2])||1;h=h.map(g=>g/p);let d=s[0]*h[0]+s[1]*h[1]+s[2]*h[2],f=[s[0]-h[0]*d,s[1]-h[1]*d,s[2]-h[2]*d],b=Math.hypot(f[0],f[1],f[2]);b<1e-5&&(f=Math.abs(h[0])<.9?[1,0,0]:[0,0,1],b=1),f=f.map(g=>g/b);let v=[h[1]*f[2]-h[2]*f[1],h[2]*f[0]-h[0]*f[2],h[0]*f[1]-h[1]*f[0]];s=f,o>0&&(n+=Math.hypot(l[0]-a[o-1][0],l[1]-a[o-1][1],l[2]-a[o-1][2]));for(let g=0;g<=t;g++){let x=g/t*Math.PI*2,w=Math.cos(x),P=Math.sin(x),S=f[0]*w+v[0]*P,k=f[1]*w+v[1]*P,T=f[2]*w+v[2]*P;r.v(l[0]+S*e,l[1]+k*e,l[2]+T*e,S,k,T,g/t*Math.PI*2*e,n)}}for(let o=0;o<i-1;o++)for(let l=0;l<t;l++){let c=o*(t+1)+l;r.quad(c,c+1,c+t+2,c+t+1)}return r.build()}function ke(a){let e=0;for(let t=0,r=a.length-1;t<a.length;r=t++)e+=(a[r][0]-a[t][0])*(a[r][1]+a[t][1]);return e/2}function ti(a){let e=a.length;if(e<3)return[];let t=Array.from({length:e},(o,l)=>l);ke(a)<0&&t.reverse();let r=[],i=(o,l,c)=>(l[0]-o[0])*(c[1]-o[1])-(l[1]-o[1])*(c[0]-o[0]),s=(o,l,c,u)=>i(l,c,o)>=0&&i(c,u,o)>=0&&i(u,l,o)>=0,n=0;for(;t.length>3&&n++<1e4;){let o=!1;for(let l=0;l<t.length;l++){let c=t[(l+t.length-1)%t.length],u=t[l],h=t[(l+1)%t.length],p=a[c],d=a[u],f=a[h];if(i(p,d,f)<=1e-12)continue;let b=!0;for(let v of t){if(v===c||v===u||v===h)continue;let g=a[v];if(!(g[0]===p[0]&&g[1]===p[1]||g[0]===d[0]&&g[1]===d[1]||g[0]===f[0]&&g[1]===f[1])&&s(g,p,d,f)){b=!1;break}}if(b){r.push(c,u,h),t.splice(l,1),o=!0;break}}if(!o){for(let l=1;l<t.length-1;l++)r.push(t[0],t[l],t[l+1]);return r}}return t.length===3&&r.push(t[0],t[1],t[2]),r}function ri(a,e){let t=ke(a)<0?[...a].reverse():[...a],r=e.map(i=>ke(i)>0?[...i].reverse():[...i]).sort((i,s)=>Math.max(...s.map(n=>n[0]))-Math.max(...i.map(n=>n[0])));for(let i of r){let s=0;for(let u=1;u<i.length;u++)i[u][0]>i[s][0]&&(s=u);let n=i[s],o=-1,l=1/0;for(let u=0;u<t.length;u++){let h=t[u];if(h[0]<n[0])continue;let p=Math.hypot(h[0]-n[0],h[1]-n[1]);p<l&&(l=p,o=u)}o<0&&(o=0);let c=[...i.slice(s),...i.slice(0,s+1)];t=[...t.slice(0,o+1),...c,t[o],...t.slice(o+1)]}return t}function Vt(a,e){let r=ke(a)>0?1:-1;return a.map((i,s)=>{let n=a[(s+a.length-1)%a.length],o=a[(s+1)%a.length],l=[i[0]-n[0],i[1]-n[1]],c=[o[0]-i[0],o[1]-i[1]],u=Math.hypot(l[0],l[1])||1,h=Math.hypot(c[0],c[1])||1,p=[-l[1]/u*r,l[0]/u*r],d=[-c[1]/h*r,c[0]/h*r],f=p[0]+d[0],b=p[1]+d[1],v=Math.hypot(f,b)||1;f/=v,b/=v;let g=Math.max(.35,f*p[0]+b*p[1]);return[i[0]+f*e/g,i[1]+b*e/g]})}function Ss(a,e,t={}){let r=new le,i=Math.min(t.bevel??0,e*.45),s=i>0?Math.max(1,t.bevelSegments??2):0,n=ke(a)>0?a:[...a].reverse(),o=(t.holes??[]).map(b=>ke(b)<0?b:[...b].reverse()),l=[n,...o],c=[],u=e/2;if(s>0){for(let b=0;b<=s;b++){let v=b/s*(Math.PI/2);c.push({off:i*(1-Math.sin(v)),z:-u+i*(1-Math.cos(v)),nz:-Math.cos(v),nxy:Math.sin(v)})}for(let b=0;b<=s;b++){let v=b/s*(Math.PI/2);c.push({off:i*(1-Math.cos(v)),z:u-i+i*Math.sin(v),nz:Math.sin(v),nxy:Math.cos(v)})}}else c.push({off:0,z:-u,nz:0,nxy:1},{off:0,z:u,nz:0,nxy:1});for(let b of l){let v=b!==n,g=c.map(w=>w.off>0?Vt(b,v?-w.off:w.off):b),x=0;for(let w=0;w<b.length;w++){let P=b[w],S=b[(w+1)%b.length],k=Math.hypot(S[0]-P[0],S[1]-P[1]),T=S[0]-P[0],G=S[1]-P[1],U=Math.hypot(T,G)||1;T/=U,G/=U;let R=G,L=-T,C=r.pos.length/3;for(let _=0;_<c.length;_++){let A=c[_],I=g[_],X=I[w],Y=I[(w+1)%I.length],J=[R*A.nxy,L*A.nxy,A.nz];r.v(X[0],X[1],A.z,J[0],J[1],J[2],x,A.z+u),r.v(Y[0],Y[1],A.z,J[0],J[1],J[2],x+k,A.z+u)}for(let _=0;_<c.length-1;_++){let A=C+_*2;r.quad(A,A+1,A+3,A+2)}x+=k}}let h=s>0?Vt(n,i):n,p=o.map(b=>s>0?Vt(b,-i):b),d=p.length?ri(h,p):h,f=ti(d);for(let[b,v]of[[-u,-1],[u,1]]){let g=r.pos.length/3;for(let x of d)r.v(x[0],x[1],b,0,0,v,x[0],x[1]);for(let x=0;x<f.length;x+=3)v>0?r.tri(g+f[x],g+f[x+1],g+f[x+2]):r.tri(g+f[x],g+f[x+2],g+f[x+1])}return r.build()}function ks(a,e,t,r=24){return Array.from({length:r},(i,s)=>[a+Math.cos(s/r*Math.PI*2)*t,e+Math.sin(s/r*Math.PI*2)*t])}function Ts(a,e,t,r,i,s=4){let n=[],o=[[t-i,e+i,-Math.PI/2],[t-i,r-i,0],[a+i,r-i,Math.PI/2],[a+i,e+i,Math.PI]];for(let[l,c,u]of o)for(let h=0;h<=s;h++){let p=u+h/s*(Math.PI/2);n.push([l+Math.cos(p)*i,c+Math.sin(p)*i])}return n}var sr=48,et=24,Dt={arrayStride:sr,attributes:[{shaderLocation:0,offset:0,format:"float32x3"},{shaderLocation:1,offset:12,format:"float32x3"},{shaderLocation:2,offset:24,format:"float32x4"},{shaderLocation:3,offset:40,format:"float32x2"}]},nr={arrayStride:et,attributes:[{shaderLocation:4,offset:0,format:"uint16x4"},{shaderLocation:5,offset:8,format:"float32x4"}]},Oe=class{vertexBuffer;indexBuffer;skinBuffer;indexCount;vertexCount;bounds;skinned;source;label;constructor(e,t,r={}){let i=t,s=i.positions.length/3,n=i.uvs??new Float32Array(s*2),o=i.tangents??Et(i.positions,i.normals,n,i.indices),l=new Float32Array(s*(sr/4));for(let c=0;c<s;c++){let u=c*12;l[u]=i.positions[c*3],l[u+1]=i.positions[c*3+1],l[u+2]=i.positions[c*3+2],l[u+3]=i.normals[c*3],l[u+4]=i.normals[c*3+1],l[u+5]=i.normals[c*3+2],l[u+6]=o[c*4],l[u+7]=o[c*4+1],l[u+8]=o[c*4+2],l[u+9]=o[c*4+3],l[u+10]=n[c*2],l[u+11]=n[c*2+1]}if(this.label=r.label??"mesh",this.vertexBuffer=e.createBuffer(l.byteLength,GPUBufferUsage.VERTEX,`${this.label}.vb`,l),this.indexBuffer=e.createBuffer(i.indices.byteLength,GPUBufferUsage.INDEX,`${this.label}.ib`,i.indices),this.indexCount=i.indices.length,this.vertexCount=s,this.bounds=se.fromPositions(i.positions),this.skinned=!!(i.joints&&i.weights),this.skinned){let c=new ArrayBuffer(s*et),u=new Uint16Array(c),h=new Float32Array(c);for(let p=0;p<s;p++){for(let d=0;d<4;d++)u[p*et/2+d]=i.joints[p*4+d];for(let d=0;d<4;d++)h[(p*et+8)/4+d]=i.weights[p*4+d]}this.skinBuffer=e.createBuffer(c.byteLength,GPUBufferUsage.VERTEX,`${this.label}.skin`,new Uint8Array(c))}else this.skinBuffer=null;this.source=r.keepSource?i:null}destroy(){this.vertexBuffer.destroy(),this.indexBuffer.destroy(),this.skinBuffer?.destroy()}};function Bs(){return se.create()}var ii=`
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
`,Ot=class{constructor(e){this.dev=e;this.sampler=e.device.createSampler({minFilter:"linear",magFilter:"linear"}),this.module=e.shader(ii,"mipgen")}pipelines=new Map;sampler;module;pipeline(e,t){let r=`${e}:${t}`,i=this.pipelines.get(r);return i||(i=this.dev.device.createRenderPipeline({layout:"auto",vertex:{module:this.module,entryPoint:"vs"},fragment:{module:this.module,entryPoint:t==="normal"?"fsNormal":"fs",targets:[{format:e}]},primitive:{topology:"triangle-list"}}),this.pipelines.set(r,i)),i}generate(e,t="color",r){let i=r??this.dev.device.createCommandEncoder({label:"mipgen"}),s=this.pipeline(e.format,t),n=e.depthOrArrayLayers;for(let o=0;o<n;o++)for(let l=1;l<e.mipLevelCount;l++){let c=this.dev.device.createBindGroup({layout:s.getBindGroupLayout(0),entries:[{binding:0,resource:e.createView({dimension:"2d",baseMipLevel:l-1,mipLevelCount:1,baseArrayLayer:o,arrayLayerCount:1})},{binding:1,resource:this.sampler}]}),u=i.beginRenderPass({colorAttachments:[{view:e.createView({dimension:"2d",baseMipLevel:l,mipLevelCount:1,baseArrayLayer:o,arrayLayerCount:1}),loadOp:"clear",storeOp:"store",clearValue:[0,0,0,0]}]});u.setPipeline(s),u.setBindGroup(0,c),u.draw(3),u.end()}r||this.dev.device.queue.submit([i.finish()])}},tt=class{constructor(e){this.dev=e;this.mipgen=new Ot(e),this.white=this.solid([255,255,255,255],"rgba8unorm-srgb","white"),this.black=this.solid([0,0,0,255],"rgba8unorm-srgb","black"),this.flatNormal=this.solid([128,128,255,255],"rgba8unorm","flatNormal"),this.defaultOrm=this.solid([255,255,255,255],"rgba8unorm","orm"),this.white3d=e.device.createTexture({size:[1,1,1],dimension:"3d",format:"r16float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),e.device.queue.writeTexture({texture:this.white3d},new Uint16Array([15360]),{bytesPerRow:2},[1,1,1])}mipgen;white;black;flatNormal;defaultOrm;white3d;samplers=new Map;solid(e,t,r){let i=this.dev.device.createTexture({size:[1,1],format:t,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:r});return this.dev.device.queue.writeTexture({texture:i},new Uint8Array(e),{bytesPerRow:4},[1,1]),i}fromImage(e,t={}){let r=t.srgb?"rgba8unorm-srgb":"rgba8unorm",i=t.mips!==!1?oe(e.width,e.height):1,s=this.dev.device.createTexture({size:[e.width,e.height],format:r,mipLevelCount:i,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT,label:t.label});return this.dev.device.queue.copyExternalImageToTexture({source:e},{texture:s},[e.width,e.height]),i>1&&this.mipgen.generate(s,t.normalMap?"normal":"color"),s}fromRGBA8(e,t,r,i={}){let s=i.srgb?"rgba8unorm-srgb":"rgba8unorm",n=i.mips!==!1?oe(t,r):1,o=this.dev.device.createTexture({size:[t,r],format:s,mipLevelCount:n,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT,label:i.label});return this.dev.device.queue.writeTexture({texture:o},e,{bytesPerRow:t*4},[t,r]),n>1&&this.mipgen.generate(o,i.normalMap?"normal":"color"),o}async fromURL(e,t={}){let r=await(await fetch(e)).blob(),i=await createImageBitmap(r,{colorSpaceConversion:"none",premultiplyAlpha:"none"});return this.fromImage(i,{label:e,...t})}sampler(e={}){let t=e.address??"repeat",r=e.addressV??t,i=e.filter??"linear",s=e.anisotropy??16,n=`${t}|${r}|${i}|${s}`,o=this.samplers.get(n);return o||(o=this.dev.device.createSampler({addressModeU:t,addressModeV:r,addressModeW:t,magFilter:i,minFilter:i,mipmapFilter:i,maxAnisotropy:i==="linear"?s:1}),this.samplers.set(n,o)),o}};var ar=128,xe={ALPHA_MASK:1,UNLIT:2,WORLD_UV:4,FOLIAGE:8,WIND:16,TERRAIN:32},si=0,Te=class{id=++si;name;baseColor;emissive;emissiveLuminance;metallic;roughness;normalScale;occlusionStrength;specular;edgeWear;edgeWearRadius;uvScale;uvOffset;uvRotation;alphaMode;alphaCutoff;doubleSided;unlit;worldUV;foliage;wind;terrain;layerTextures;layerScale;blendSharpness;blendNoise;baseColorMap;normalMap;ormMap;emissiveMap;sampler;buffer=null;bindGroup=null;dirtyUniform=!0;dirtyBinding=!0;constructor(e={}){this.name=e.name??`material${this.id}`,this.baseColor=e.baseColor??[.8,.8,.8,1],this.emissive=e.emissive??[0,0,0],this.emissiveLuminance=e.emissiveLuminance??0,this.metallic=e.metallic??0,this.roughness=e.roughness??.6,this.normalScale=e.normalScale??1,this.occlusionStrength=e.occlusionStrength??1,this.specular=e.specular??.5,this.edgeWear=e.edgeWear??0,this.edgeWearRadius=e.edgeWearRadius??.003,this.uvScale=e.uvScale??[1,1],this.uvOffset=e.uvOffset??[0,0],this.uvRotation=e.uvRotation??0,this.alphaMode=e.alphaMode??"opaque",this.alphaCutoff=e.alphaCutoff??.5,this.doubleSided=e.doubleSided??!1,this.unlit=e.unlit??!1,this.worldUV=e.worldUV??!1,this.foliage=e.foliage??!1,this.wind=e.wind??!1,this.terrain=e.terrain??!1,this.layerTextures=e.layerTextures??null,this.layerScale=e.layerScale??[1,1,1],this.blendSharpness=e.blendSharpness??.75,this.blendNoise=e.blendNoise??[1.7,.22],this.baseColorMap=e.baseColorMap??null,this.normalMap=e.normalMap??null,this.ormMap=e.ormMap??null,this.emissiveMap=e.emissiveMap??null,this.sampler=e.sampler??null}markDirty(){this.dirtyUniform=!0}markBindingsDirty(){this.dirtyBinding=!0,this.dirtyUniform=!0}get flags(){let e=0;return this.alphaMode==="mask"&&(e|=xe.ALPHA_MASK),this.unlit&&(e|=xe.UNLIT),this.worldUV&&(e|=xe.WORLD_UV),this.foliage&&(e|=xe.FOLIAGE),this.wind&&(e|=xe.WIND),this.terrain&&(e|=xe.TERRAIN|xe.WORLD_UV),e}get variantKey(){return`${this.alphaMode}|${this.doubleSided?2:1}|${this.terrain?"T":"S"}`}getBindGroup(e,t,r){if(this.buffer||(this.buffer=e.createBuffer(ar,GPUBufferUsage.UNIFORM,`${this.name}.ub`)),this.dirtyUniform){let i=new Float32Array(ar/4);i.set(this.baseColor,0),i.set(this.emissive,4),i[7]=this.emissiveLuminance,i[8]=this.metallic,i[9]=this.roughness,i[10]=this.normalScale,i[11]=this.occlusionStrength,i[12]=this.uvScale[0],i[13]=this.uvScale[1],i[14]=this.uvOffset[0],i[15]=this.uvOffset[1],i[16]=this.alphaCutoff,i[17]=this.specular,i[18]=this.uvRotation,i[19]=this.flags,i[20]=this.edgeWear,i[21]=this.edgeWearRadius,i[24]=this.layerScale[0],i[25]=this.layerScale[1],i[26]=this.layerScale[2],i[27]=this.blendSharpness,i[28]=this.blendNoise[0],i[29]=this.blendNoise[1],e.device.queue.writeBuffer(this.buffer,0,i),this.dirtyUniform=!1}if(this.dirtyBinding||!this.bindGroup){if(this.terrain){if(!this.layerTextures)throw new Error(`material ${this.name}: terrain materials need layerTextures`);let i=this.layerTextures,s=n=>n.createView({dimension:"2d-array"});return this.bindGroup=e.device.createBindGroup({layout:r,label:this.name,entries:[{binding:0,resource:{buffer:this.buffer}},{binding:1,resource:this.sampler??t.sampler()},{binding:2,resource:s(i.albedo)},{binding:3,resource:s(i.normal)},{binding:4,resource:s(i.orm)},{binding:5,resource:(this.emissiveMap??t.white).createView()}]}),this.dirtyBinding=!1,this.bindGroup}this.bindGroup=e.device.createBindGroup({layout:r,label:this.name,entries:[{binding:0,resource:{buffer:this.buffer}},{binding:1,resource:this.sampler??t.sampler()},{binding:2,resource:(this.baseColorMap??t.white).createView()},{binding:3,resource:(this.normalMap??t.flatNormal).createView()},{binding:4,resource:(this.ormMap??t.defaultOrm).createView()},{binding:5,resource:(this.emissiveMap??t.white).createView()}]}),this.dirtyBinding=!1}return this.bindGroup}};function rt(a=!1){let e=a?"texture_2d_array<f32>":"texture_2d<f32>",t=a?", layer":"";return`
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
const MATERIAL_IS_TERRAIN: bool = ${a?"true":"false"};
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
`}var Es=rt(!1);var ni={concrete:0,wood:1,anodized:2,parkerized:3,polymer:4,paintedSteel:5,ground:6,gravel:7,brass:8,paperTarget:9,rubber:10,webbing:11,cardboard:12,bareSteel:13,grass:14,nitride:15,machined:16,skin:17,glove:18},ai=`
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
`,oi={concrete:{tileMeters:2,color:[.42,.41,.39],color2:[0,0,0],wear:.3,dirt:.5,roughness:-1,bumpMm:1.2,extra:0},wood:{tileMeters:1,color:[.52,.34,.18],color2:[.32,.19,.09],wear:.4,dirt:.2,roughness:-1,bumpMm:.6,extra:0},anodized:{tileMeters:.25,color:[.035,.036,.038],color2:[0,0,0],wear:.25,dirt:0,roughness:.42,bumpMm:.02,extra:0},parkerized:{tileMeters:.25,color:[.055,.058,.056],color2:[0,0,0],wear:.2,dirt:0,roughness:-1,bumpMm:.03,extra:0},polymer:{tileMeters:.2,color:[.03,.03,.032],color2:[0,0,0],wear:0,dirt:.2,roughness:.62,bumpMm:.15,extra:0},paintedSteel:{tileMeters:.5,color:[.8,.8,.78],color2:[0,0,0],wear:.35,dirt:0,roughness:-1,bumpMm:.3,extra:0},ground:{tileMeters:4,color:[.24,.18,.12],color2:[.09,.11,.04],wear:0,dirt:0,roughness:-1,bumpMm:8,extra:0},gravel:{tileMeters:1.5,color:[.52,.5,.46],color2:[.3,.29,.28],wear:0,dirt:0,roughness:-1,bumpMm:9,extra:.5},brass:{tileMeters:.05,color:[.95,.73,.38],color2:[0,0,0],wear:.2,dirt:0,roughness:-1,bumpMm:.01,extra:0},paperTarget:{tileMeters:.45,color:[.75,.05,.03],color2:[0,0,0],wear:0,dirt:0,roughness:-1,bumpMm:.05,extra:0},rubber:{tileMeters:.1,color:[.025,.025,.025],color2:[0,0,0],wear:0,dirt:0,roughness:-1,bumpMm:.4,extra:1},webbing:{tileMeters:.05,color:[.12,.13,.1],color2:[0,0,0],wear:0,dirt:0,roughness:-1,bumpMm:.25,extra:0},cardboard:{tileMeters:.6,color:[.55,.4,.25],color2:[0,0,0],wear:0,dirt:.3,roughness:-1,bumpMm:.2,extra:0},bareSteel:{tileMeters:.5,color:[0,0,0],color2:[0,0,0],wear:.3,dirt:0,roughness:-1,bumpMm:.2,extra:0},grass:{tileMeters:1.5,color:[.055,.085,.022],color2:[.2,.17,.085],wear:0,dirt:0,roughness:-1,bumpMm:10,extra:0},nitride:{tileMeters:.12,color:[.028,.029,.032],color2:[0,0,0],wear:.2,dirt:0,roughness:-1,bumpMm:.015,extra:0},machined:{tileMeters:.06,color:[.62,.62,.63],color2:[0,0,0],wear:.15,dirt:0,roughness:-1,bumpMm:.01,extra:1},skin:{tileMeters:.05,color:[.56,.33,.24],color2:[0,0,0],wear:0,dirt:0,roughness:-1,bumpMm:.12,extra:0},glove:{tileMeters:.04,color:[.045,.043,.04],color2:[0,0,0],wear:.35,dirt:.1,roughness:-1,bumpMm:.12,extra:0}},it=class{constructor(e,t){this.dev=e;this.tex=t;this.pipeline=e.device.createComputePipeline({layout:"auto",compute:{module:e.shader(ai,"material-synth"),entryPoint:"main"}})}pipeline;cache=new Map;generate(e,t={}){let i={...oi[e],...t,size:t.size??1024,seed:t.seed??1},s=JSON.stringify([e,i]),n=this.cache.get(s);if(n)return n;let o=this.dev.device,l=i.size,c=R=>o.createTexture({size:[l,l],format:"rgba8unorm",usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.COPY_SRC,label:R}),u=c(`${e}.albedo.tmp`),h=c(`${e}.normal.tmp`),p=c(`${e}.orm.tmp`),d=new ArrayBuffer(64),f=new Uint32Array(d),b=new Float32Array(d);f[0]=ni[e],f[1]=i.seed>>>0,f[2]=l,b.set([...i.color,i.wear],4),b.set([...i.color2,i.dirt],8),b.set([i.tileMeters,i.roughness,i.bumpMm,i.extra],12);let v=this.dev.createBuffer(64,GPUBufferUsage.UNIFORM,"synth.params",new Uint8Array(d)),g=o.createBindGroup({layout:this.pipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:v}},{binding:1,resource:u.createView()},{binding:2,resource:h.createView()},{binding:3,resource:p.createView()}]}),x=oe(l),w=(R,L)=>o.createTexture({size:[l,l],format:L,mipLevelCount:x,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT,label:R}),P=w(`${e}.albedo`,"rgba8unorm-srgb"),S=w(`${e}.normal`,"rgba8unorm"),k=w(`${e}.orm`,"rgba8unorm"),T=o.createCommandEncoder({label:`synth ${e}`}),G=T.beginComputePass();G.setPipeline(this.pipeline),G.setBindGroup(0,g),G.dispatchWorkgroups(Math.ceil(l/8),Math.ceil(l/8)),G.end(),T.copyTextureToTexture({texture:u},{texture:P},[l,l]),T.copyTextureToTexture({texture:h},{texture:S},[l,l]),T.copyTextureToTexture({texture:p},{texture:k},[l,l]),this.tex.mipgen.generate(P,"color",T),this.tex.mipgen.generate(S,"normal",T),this.tex.mipgen.generate(k,"color",T),o.queue.submit([T.finish()]),o.queue.onSubmittedWorkDone().then(()=>{u.destroy(),h.destroy(),p.destroy(),v.destroy()});let U={albedo:P,normal:S,orm:k,tileMeters:i.tileMeters};return this.cache.set(s,U),U}material(e,t={},r={}){let i=this.generate(e,t),s=1/i.tileMeters;return new Te({name:r.name??e,baseColorMap:i.albedo,normalMap:i.normal,ormMap:i.orm,baseColor:[1,1,1,1],roughness:1,metallic:1,uvScale:[s,s],...r})}};function fe(a,e,t=0){let r=(f,b)=>{let v=Math.sin(f*127.1+b*311.7+t*74.7)*43758.5453;return v-Math.floor(v)},i=Math.floor(a),s=Math.floor(e),n=a-i,o=e-s,l=n*n*(3-2*n),c=o*o*(3-2*o),u=r(i,s),h=r(i+1,s),p=r(i,s+1),d=r(i+1,s+1);return(u+(h-u)*l+(p-u)*c+(u-h-p+d)*l*c)*2-1}function Ft(a,e,t=3,r=0){let i=0,s=.5,n=1,o=0;for(let l=0;l<t;l++)i+=s*fe(a*n+l*17.3,e*n-l*9.1,r+l),o+=s,s*=.5,n*=2.1;return i/o}var ze=a=>{let e=a<0?0:a>1?1:a;return e*e*(3-2*e)};function or(a,e,t){return e<=t?ze((a-e)/Math.max(t-e,1e-6)):1-ze((a-t)/Math.max(e-t,1e-6))}function $s(a){let[e,t]=a.from,[r,i]=a.to,s=r-e,n=i-t,o=Math.hypot(s,n)||1,l=s/o,c=n/o,u=a.erosion??.6,h=Math.max(.01,a.toe??1.5),p=a.seed??1,d=.05+.05*u;return(f,b)=>{let v=f-e,g=b-t,x=Math.max(0,Math.min(o,v*l+g*c)),w=e+l*x,P=t+c*x,S=Math.hypot(f-w,b-P),k=a.baseWidth/2*(1+.18*u*fe(x*.11+3.3,.5,p));if(S>k+h)return 0;let T=Math.min(k*.8,a.crestWidth/2*(1+.25*u*fe(x*.21,1.5,p+1))),G=a.height*(1+.05*u*fe(x*.17+9.1,2.5,p+2));if(S>=k){let C=(S-k)/h;return G*d*(1-C)*(1-C)}let U=(k-S)/Math.max(k-T,.001),R=ze(U),L=G*(d+(1-d)*R);if(u>0&&U<1){let C=Math.sin(Math.PI*Math.min(U,1)),_=fe(x*.45+5,S*.6,p+3)*.07,A=1-Math.abs(fe(x*.9+2.2,.3,p+4)),I=Math.max(0,A-.72)/.28*.12*ze((U-.1)/.5);L*=1+u*(_*C-I*C)}return L}}function Ks(a){let e=a.erosion??.5,t=a.seed??7;return(r,i)=>{let s=r-a.center[0],n=i-a.center[1],o=Math.atan2(n,s),l=a.radius*(1+.15*e*fe(Math.cos(o)*2.3+5,Math.sin(o)*2.3+5,t)),c=Math.hypot(s,n)/l;if(c>=1)return 0;let u=ze(1-c);return a.height*u*(1+.08*e*fe(s*.7,n*.7,t+1)*Math.sin(Math.PI*c))}}function Xs(...a){return(e,t)=>{let r=-1/0;for(let i of a){let s=i(e,t);s>r&&(r=s)}return r}}function Ys(...a){return(e,t)=>{let r=0;for(let i of a)r+=i(e,t);return r}}function Qs(a,e,t,r,i=1,s=.5,n=3){return(o,l)=>{let c=Math.max(a-o,o-e,t-l,l-r),u=s*i*Ft(o*.6+2.1,l*.6-4.4,2,n);return 1-ze((c+u)/i+.5)}}function lr(a,e,t,r,i,s,n){t=Math.max(a,Math.min(e,t)),r=Math.max(t,Math.min(e,r));let o=[],l=Math.max(1,Math.round((r-t)/i));for(let p=0;p<=l;p++)o.push(t+(r-t)*p/l);let c=(p,d)=>{let f=[],b=Math.sign(d-p),v=p,g=i;for(;b*(d-v)>g*1.5;)g=Math.min(g*s,n),v+=b*g,f.push(v);return Math.abs(d-p)>1e-9&&f.push(d),f},u=c(t,a).reverse(),h=c(r,e);return Float64Array.from([...u,...o,...h])}var cr=class{geometry;material=null;layerIndices;stats;options;xs;zs;constructor(e,t){if(!e.layers.length||e.layers.length>3)throw new Error("Terrain: 1 to 3 layers");this.options=e;let r=performance.now(),[i,s]=e.size,[n,o]=e.center??[0,0],l=n-i/2,c=n+i/2,u=o-s/2,h=o+s/2,p=e.detail??{minX:l,maxX:c,minZ:u,maxZ:h},d=e.growth??1.22,f=e.maxSpacing??24;this.xs=lr(l,c,p.minX,p.maxX,e.resolution,d,f),this.zs=lr(u,h,p.minZ,p.maxZ,e.resolution,d,f);let b=this.xs,v=this.zs,g=b.length,x=v.length,w=g*x,P=new Float32Array(w*3),S=new Float32Array(w*3),k=new Float32Array(w*2),T=new Float32Array(w*4),G=e.heightFn,U=new Float32Array(w*3),R=[0,0,0],L=new Float64Array(w);for(let D=0;D<x;D++)for(let j=0;j<g;j++)L[D*g+j]=G(b[j],v[D]);for(let D=0;D<x;D++){let j=v[D],$=Math.max(0,D-1),Z=Math.min(x-1,D+1);for(let F=0;F<g;F++){let W=b[F],H=D*g+F,ue=Math.max(0,F-1),Le=Math.min(g-1,F+1),Be=L[H],ae=-(L[D*g+Le]-L[D*g+ue])/(b[Le]-b[ue]),ie=1,he=-(L[Z*g+F]-L[$*g+F])/(v[Z]-v[$]),me=Math.hypot(ae,ie,he);ae/=me,ie/=me,he/=me,P[H*3]=W,P[H*3+1]=Be,P[H*3+2]=j,S[H*3]=ae,S[H*3+1]=ie,S[H*3+2]=he;let Ce=1-ae*ae,Re=-ie*ae,_e=-he*ae,Ve=Math.hypot(Ce,Re,_e)||1;T[H*4]=Ce/Ve,T[H*4+1]=Re/Ve,T[H*4+2]=_e/Ve,T[H*4+3]=1;let Pe=Math.acos(Math.min(1,ie))*(180/Math.PI);this.evalWeights(W,j,Be,Pe,R),U[H*3]=R[0],U[H*3+1]=R[1],U[H*3+2]=R[2],k[H*2]=R[1],k[H*2+1]=R[2]}}let C=(g-1)*(x-1),_=new Uint32Array(C*6),A=e.layers.map(()=>[]),I=0,X=(D,j,$)=>{let Z=0,F=-1;for(let W=0;W<e.layers.length;W++){let H=U[D*3+W]+U[j*3+W]+U[$*3+W];H>F&&(F=H,Z=W)}return Z},Y=(D,j,$)=>{_[I++]=D,_[I++]=j,_[I++]=$,A[X(D,j,$)].push(D,j,$)};for(let D=0;D<x-1;D++)for(let j=0;j<g-1;j++){let $=D*g+j,Z=$+1,F=$+g+1,W=$+g,H=Math.abs(P[$*3+1]-P[F*3+1]),ue=Math.abs(P[Z*3+1]-P[W*3+1]);H<=ue?(Y($,F,Z),Y($,W,F)):(Y($,W,Z),Y(Z,W,F))}let J=new De(P,S,k,_);J.tangents=T,this.geometry=J,this.layerIndices=A.map(D=>Uint32Array.from(D));let te=performance.now()-r;if(this.stats={vertices:w,triangles:C*2,buildMs:te,textureSize:0,columns:g,rows:x},!t)return;let N=ci(t,e.layers,e.textureSize);this.stats.textureSize=N.size;let V=D=>D.uvScale[0],ce=e.layers;this.material=new Te({name:e.name??"terrain",terrain:!0,layerTextures:N.textures,layerScale:[V(ce[0].material),V(ce[Math.min(1,ce.length-1)].material),V(ce[Math.min(2,ce.length-1)].material)],blendSharpness:e.blendSharpness??.75,blendNoise:e.blendNoise??[1.7,.22],baseColor:[1,1,1,1],roughness:1,metallic:1,occlusionStrength:1})}weights(e,t,r=[0,0,0]){let i=this.options.heightFn(e,t),s=.25,n=(this.options.heightFn(e+s,t)-i)/s,o=(this.options.heightFn(e,t+s)-i)/s,l=Math.atan(Math.hypot(n,o))*(180/Math.PI);return this.evalWeights(e,t,i,l,r)}evalWeights(e,t,r,i,s){let n=this.options.layers,[o,l]=this.options.weightNoise??[2.5,.35],c=this.options.seed??11,u=0,h=0;for(let d=0;d<3;d++){let f=n[d];if(!f){s[d]=0;continue}let b=f.mask?f.mask(e,t):1;b>0&&f.slope&&(b*=or(i,f.slope[1],f.slope[0])),b>0&&f.height&&(b*=or(r,f.height[1],f.height[0])),b=Math.max(0,b),s[d]=b,u+=b,b>h&&(h=b)}if(u<=1e-6)return s[0]=1,s[1]=0,s[2]=0,s;for(let d=0;d<3;d++)s[d]/=u;let p=Math.max(0,Math.min(1,2*(1-h/u)));if(p>0&&l>0&&n.length>1){let d=Ft(e/o,t/o,2,c),f=Ft(e/(o*.47)+7.7,t/(o*.47)-2.3,2,c+5),b=l*p;s[0]+=(-d-.5*f)*b,s[1]+=(d-.5*f)*b,s[2]+=n.length>2?f*b:0;let v=0;for(let g=0;g<3;g++)s[g]=Math.max(0,s[g]),v+=s[g];for(let g=0;g<3;g++)s[g]/=v||1}return s}height(e,t){return this.options.heightFn(e,t)}normal(e,t,r=[0,1,0]){let s=this.options.heightFn,n=s(e,t),o=-(s(e+.25,t)-n)/.25,l=-(s(e,t+.25)-n)/.25,c=Math.hypot(o,1,l);return o/=c,l/=c,r[0]=o,r[1]=1/c,r[2]=l,r}addToPhysics(e){return this.layerIndices.map((t,r)=>t.length?e.addStaticMesh(this.geometry.positions,t,this.options.layers[r].surface??0):-1)}},li=`
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
`,ur=new WeakMap;function ci(a,e,t){let r=a.dev,i=r.device,s=a.textures,n=0;for(let g of e)for(let x of[g.material.baseColorMap,g.material.normalMap,g.material.ormMap])x&&(n=Math.max(n,x.width));n=Math.min(t??2048,Math.max(n,4));let o=Math.floor(Math.log2(n))+1,l=ur.get(r);l||(l=new Map,ur.set(r,l));let c=r.shader(li,"terrain-blit"),u=i.createSampler({minFilter:"linear",magFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}),h=g=>{let x=l.get(g);return x||(x=i.createRenderPipeline({label:`terrain-blit ${g}`,layout:"auto",vertex:{module:c,entryPoint:"vs"},fragment:{module:c,entryPoint:"fs",targets:[{format:g}]},primitive:{topology:"triangle-list"}}),l.set(g,x)),x},p=i.createCommandEncoder({label:"terrain layers"}),d=(g,x,w,P,S)=>{let k=i.createTexture({size:[n,n,3],format:w,mipLevelCount:o,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_DST,label:S}),T=h(w);for(let G=0;G<3;G++){let U=g(e[Math.min(G,e.length-1)].material)??x,R=Math.max(0,Math.min(U.mipLevelCount-1,Math.floor(Math.log2(Math.max(1,U.width/n))))),L=i.createBindGroup({layout:T.getBindGroupLayout(0),entries:[{binding:0,resource:U.createView({dimension:"2d",baseMipLevel:R,mipLevelCount:1,baseArrayLayer:0,arrayLayerCount:1})},{binding:1,resource:u}]}),C=p.beginRenderPass({colorAttachments:[{view:k.createView({dimension:"2d",baseMipLevel:0,mipLevelCount:1,baseArrayLayer:G,arrayLayerCount:1}),loadOp:"clear",storeOp:"store",clearValue:[0,0,0,1]}]});C.setPipeline(T),C.setBindGroup(0,L),C.draw(3),C.end()}return s.mipgen.generate(k,P,p),k},f=d(g=>g.baseColorMap,s.white,"rgba8unorm-srgb","color","terrain.albedo"),b=d(g=>g.normalMap,s.flatNormal,"rgba8unorm","normal","terrain.normal"),v=d(g=>g.ormMap,s.solid([255,255,0,255],"rgba8unorm","terrain.orm.default"),"rgba8unorm","color","terrain.orm");return i.queue.submit([p.finish()]),{textures:{albedo:f,normal:b,orm:v},size:n}}var ui={enabled:!0,mode:"volumetric",quality:"auto",coverage:.45,type:.55,density:32,altitude:1500,thickness:1900,featureScale:7e3,shapeScale:5200,detailScale:520,windFactor:2.5,windVeer:25,shadowStrength:1,ambient:1,multiScatter:1.6,albedo:.97},mi={low:{dome:256,steps:40,lightSteps:3,updateDiv:2,shadow:192,shadowSteps:8,baseNoise:64,detailNoise:32},medium:{dome:384,steps:64,lightSteps:5,updateDiv:4,shadow:384,shadowSteps:16,baseNoise:128,detailNoise:32},high:{dome:640,steps:96,lightSteps:6,updateDiv:4,shadow:512,shadowSteps:24,baseNoise:128,detailNoise:32}},It=64,Fe=512,Ie=48e3,mr=3600,st=1.2,nt=128;function di(a){let e=a.info,t=`${e?.vendor??""} ${e?.architecture??""} ${e?.device??""} ${e?.description??""}`.toLowerCase();return/swiftshader|lavapipe|llvmpipe|software/.test(t)||!!a.isFallbackAdapter}var ot=`
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
`,hi=ot+`
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
`,pi=ot+`
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
`,fi=ot+`
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
`,dr=ot+`
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
`,bi=dr+`
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
`,gi=dr+`
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
`,vi=`
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
`,at=class{settings={...ui};dome;shadow;resourceVersion=0;domeRadius=st;dev;tex;skyCube;preset;presetName="";baseNoise;detailNoise;weather;domeWork;ubuf;blobBuf;weatherU;compU;pipeBase;pipeDetail;pipeWeather;pipeDome;pipeShadow;pipeComposite;bgDome=null;bgShadow=null;bgWeather;sampRepeat;sampClamp;blobs=[];blobId=1;blobsDirty=!0;weatherKey="";domeKey="";frame=0;sinceComposite=1e9;drift=[0,0];lastCam=[0,100,0];software;u=new Float32Array(48);constructor(e,t,r){this.dev=e,this.tex=t,this.skyCube=r,this.software=di(e.adapter);let i=e.device,s=(h,p)=>i.createComputePipeline({label:p,layout:"auto",compute:{module:e.shader(h,p),entryPoint:"main"}});this.pipeBase=s(hi,"clouds.noise.base"),this.pipeDetail=s(pi,"clouds.noise.detail"),this.pipeWeather=s(fi,"clouds.weather");let n=GPUShaderStage.COMPUTE,o=[{binding:0,visibility:n,buffer:{type:"uniform"}},{binding:1,visibility:n,texture:{viewDimension:"3d"}},{binding:2,visibility:n,texture:{viewDimension:"3d"}},{binding:3,visibility:n,texture:{}},{binding:4,visibility:n,sampler:{}},{binding:5,visibility:n,texture:{viewDimension:"cube"}},{binding:6,visibility:n,sampler:{}}],l=i.createBindGroupLayout({label:"clouds.dome",entries:[...o,{binding:7,visibility:n,storageTexture:{format:"rgba16float",access:"write-only"}},{binding:8,visibility:n,texture:{}}]}),c=i.createBindGroupLayout({label:"clouds.shadow",entries:[...o,{binding:7,visibility:n,storageTexture:{format:"rgba8unorm",access:"write-only"}}]}),u=(h,p,d)=>i.createComputePipeline({label:p,layout:i.createPipelineLayout({bindGroupLayouts:[d]}),compute:{module:e.shader(h,p),entryPoint:"main"}});this.pipeDome=u(bi,"clouds.dome",l),this.pipeShadow=u(gi,"clouds.shadow",c),this.pipeComposite=s(vi,"clouds.composite"),this.ubuf=e.createBuffer(192,GPUBufferUsage.UNIFORM,"clouds.u"),this.weatherU=e.createBuffer(32,GPUBufferUsage.UNIFORM,"clouds.weather.u"),this.compU=e.createBuffer(16,GPUBufferUsage.UNIFORM,"clouds.composite.u"),this.blobBuf=e.createBuffer(It*32,GPUBufferUsage.STORAGE,"clouds.blobs"),this.sampRepeat=i.createSampler({magFilter:"linear",minFilter:"linear",addressModeU:"repeat",addressModeV:"repeat",addressModeW:"repeat"}),this.sampClamp=i.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",addressModeW:"clamp-to-edge"}),this.weather=i.createTexture({size:[Fe,Fe],format:"rgba8unorm",usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING,label:"clouds.weather"}),this.bgWeather=i.createBindGroup({layout:this.pipeWeather.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.weatherU}},{binding:1,resource:{buffer:this.blobBuf}},{binding:2,resource:this.weather.createView()}]}),this.ensureResources()}get qualityPreset(){let e=this.settings.quality;return e!=="auto"?e:this.software?"low":"high"}get driftXZ(){return[this.drift[0],this.drift[1]]}addCloud(e){let t={id:this.blobId++,x:e.position[0]+this.drift[0],z:e.position[e.position.length>=3?2:1]+this.drift[1],size:e.size??900,density:e.density??1,mode:e.mode??this.settings.mode,type:e.type??this.settings.type};this.blobs.length>=It&&this.blobs.shift(),this.blobs.push(t),this.blobsDirty=!0;let r=this;return{id:t.id,set(i){i.position&&(t.x=i.position[0]+r.drift[0],t.z=i.position[i.position.length>=3?2:1]+r.drift[1]),i.size!==void 0&&(t.size=i.size),i.density!==void 0&&(t.density=i.density),i.mode&&(t.mode=i.mode),i.type!==void 0&&(t.type=i.type),r.blobsDirty=!0},remove(){let i=r.blobs.indexOf(t);i>=0&&(r.blobs.splice(i,1),r.blobsDirty=!0)}}}clearClouds(){this.blobs.length=0,this.blobsDirty=!0}get cloudCount(){return this.blobs.length}ensureResources(){let e=this.qualityPreset;if(e===this.presetName)return;this.presetName=e;let t=this.preset=mi[e],r=this.dev.device;this.baseNoise?.destroy(),this.detailNoise?.destroy(),this.dome?.destroy(),this.domeWork?.destroy(),this.shadow?.destroy();let i=(n,o)=>r.createTexture({size:[n,n,n],dimension:"3d",format:"rgba8unorm",usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING,label:o});this.baseNoise=i(t.baseNoise,"clouds.noise.base"),this.detailNoise=i(t.detailNoise,"clouds.noise.detail"),this.dome=r.createTexture({size:[t.dome,t.dome],format:"rgba16float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:"clouds.dome"}),this.domeWork=r.createTexture({size:[t.dome,t.dome],format:"rgba16float",usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.COPY_SRC,label:"clouds.dome.work"}),this.shadow=r.createTexture({size:[t.shadow,t.shadow],format:"rgba8unorm",usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING,label:"clouds.shadow"}),this.generateNoise();let s=(n,o)=>r.createBindGroup({layout:n.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.ubuf}},{binding:1,resource:this.baseNoise.createView()},{binding:2,resource:this.detailNoise.createView()},{binding:3,resource:this.weather.createView()},{binding:4,resource:this.sampRepeat},{binding:5,resource:this.skyCube.createView({dimension:"cube"})},{binding:6,resource:this.sampClamp},...o]});this.bgDome=s(this.pipeDome,[{binding:7,resource:this.domeWork.createView()},{binding:8,resource:this.dome.createView()}]),this.bgShadow=s(this.pipeShadow,[{binding:7,resource:this.shadow.createView()}]),this.domeKey="",this.resourceVersion++}generateNoise(){let e=this.dev.device,t=this.preset,r=e.createCommandEncoder({label:"clouds.noise"}),i=r.beginComputePass(),s=(n,o,l,c,u)=>{let h=this.dev.createBuffer(16,GPUBufferUsage.UNIFORM,u,new Float32Array([l,c,0,0]));i.setPipeline(n),i.setBindGroup(0,e.createBindGroup({layout:n.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:h}},{binding:1,resource:o.createView()}]}));let p=Math.ceil(l/4);i.dispatchWorkgroups(p,p,p)};s(this.pipeBase,this.baseNoise,t.baseNoise,t.baseNoise/128,"clouds.noise.base.u"),s(this.pipeDetail,this.detailNoise,t.detailNoise,1,"clouds.noise.detail.u"),i.end(),e.queue.submit([r.finish()])}updateWeather(e){let t=this.settings,r=`${t.coverage}|${t.type}|${t.featureScale}|${t.mode}|${this.blobs.length}`;if(!this.blobsDirty&&r===this.weatherKey)return!1;this.weatherKey=r,this.blobsDirty=!1;let i=this.dev.device,s=new Float32Array(It*8);this.blobs.forEach((o,l)=>s.set([o.x,o.z,o.size,o.density,o.mode==="flat"?1:0,o.type,0,0],l*8)),i.queue.writeBuffer(this.blobBuf,0,s),i.queue.writeBuffer(this.weatherU,0,new Float32Array([t.coverage,t.type,t.featureScale,t.mode==="flat"?1:0,Fe,Ie,this.blobs.length,7]));let n=e.beginComputePass({label:"clouds.weather"});return n.setPipeline(this.pipeWeather),n.setBindGroup(0,this.bgWeather),n.dispatchWorkgroups(Math.ceil(Fe/8),Math.ceil(Fe/8)),n.end(),!0}frameParams(){let e=this.settings,[t,r]=this.shadowCentre(this.lastCam,this.lastSun),i=1-.55*e.coverage*Math.min(1,e.density/25);return[t,r,1/(2*mr),e.enabled?1:0,i,e.altitude,e.shadowStrength,st]}lastSun=[0,1,0];shadowCentre(e,t){let r=Math.max(t[1],.05),i=(this.settings.altitude-e[1])/r;return[e[0]+t[0]*i,e[2]+t[2]*i]}update(e,t){let r=this.settings;this.ensureResources();let i=this.preset,s=this.dev.device;this.lastCam=[t.camPos[0],t.camPos[1],t.camPos[2]],this.lastSun=[t.sunDir[0],t.sunDir[1],t.sunDir[2]],this.drift[0]+=t.windAloft[0]*t.dt,this.drift[1]+=t.windAloft[1]*t.dt;for(let P=0;P<2;P++)this.drift[P]=(this.drift[P]%Ie+Ie)%Ie;let n=this.updateWeather(e),o=JSON.stringify([r.enabled,r.mode,r.density,r.altitude,r.thickness,r.shapeScale,r.detailScale,r.shadowStrength,r.ambient,r.multiScatter,r.albedo,t.skyKey,t.rayleigh,t.turbidity])+(n?`|${this.frame}`:""),l=o!==this.domeKey;this.domeKey=o;let c=l?1:i.updateDiv,u=this.frame%(c*c),[h,p]=c===1?[0,0]:c===2?xi[u]:yi[u],[d,f]=this.shadowCentre(t.camPos,t.sunDir),b=this.u,v=r.altitude+r.thickness*.5;b.set([t.camPos[0],t.camPos[1],t.camPos[2],this.frame/60],0),b.set([t.sunDir[0],t.sunDir[1],t.sunDir[2],1],4),b.set([t.sunRGB[0],t.sunRGB[1],t.sunRGB[2],r.albedo],8),b.set([r.altitude,r.thickness,r.shapeScale*(i.baseNoise/128),r.detailScale],12),b.set([r.density/1e3,1,r.type,r.mode==="flat"?1:0],16),b.set([this.drift[0],this.drift[1],this.drift[0]*1.25+this.frame*.15,this.drift[1]*1.25+this.frame*.07],20),b.set([1/Ie,v,r.shapeScale*.5,r.density*r.thickness*.5/1e3*.12],24),b.set([i.dome,st,l?1:.55,this.frame],28),b.set([i.steps,i.lightSteps,6e4,c],32),b.set([t.rayleigh,t.turbidity,r.multiScatter,r.ambient],36),b.set([d,f,1/(2*mr),i.shadowSteps],40),b.set([h,p,i.shadow,r.enabled?1:0],44),s.queue.writeBuffer(this.ubuf,0,b);let g=e.beginComputePass({label:"clouds"});g.setPipeline(this.pipeDome),g.setBindGroup(0,this.bgDome);let x=Math.ceil(i.dome/c/8);g.dispatchWorkgroups(x,x),g.setPipeline(this.pipeShadow),g.setBindGroup(0,this.bgShadow),g.dispatchWorkgroups(Math.ceil(i.shadow/8),Math.ceil(i.shadow/8)),g.end(),e.copyTextureToTexture({texture:this.domeWork},{texture:this.dome},[i.dome,i.dome]),this.frame++,this.sinceComposite++;let w=l||this.sinceComposite>300;return w&&(this.sinceComposite=0),w}compositeEnv(e,t){let r=this.dev.device;r.queue.writeBuffer(this.compU,0,new Float32Array([nt,st,0,0]));let i=e.beginComputePass({label:"clouds.composite"});i.setPipeline(this.pipeComposite),i.setBindGroup(0,r.createBindGroup({layout:this.pipeComposite.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.compU}},{binding:1,resource:this.skyCube.createView({dimension:"cube"})},{binding:2,resource:this.dome.createView()},{binding:3,resource:this.sampClamp},{binding:4,resource:t.createView({dimension:"2d-array",baseMipLevel:0,mipLevelCount:1})}]})),i.dispatchWorkgroups(Math.ceil(nt/8),Math.ceil(nt/8),6),i.end()}},Js=nt,xi=[[0,0],[1,1],[1,0],[0,1]],yi=[[0,0],[2,2],[2,0],[0,2],[1,1],[3,3],[3,1],[1,3],[1,0],[3,2],[3,0],[1,2],[0,1],[2,3],[2,1],[0,3]];var wi={sunElevation:38,sunAzimuth:130,sunIlluminance:128e3,sunAngularDiameter:.53,turbidity:1,rayleigh:1,ozone:1,mieG:.8,groundAlbedo:.18,altitude:100,multiScatter:1.25},lt=636e4,Mi=646e4,Pi=[5802e-9,13558e-9,331e-7];var Si=44e-7,ki=[65e-8,1881e-9,85e-9],Ti=8e3,zi=1200;function pr(a){let e=a.sunElevation*Math.PI/180,t=a.sunAzimuth*Math.PI/180;return[Math.cos(e)*Math.sin(t),Math.sin(e),-Math.cos(e)*Math.cos(t)]}function Gi(a,e,t,r){let i=a*e,s=a*a-r*r,n=i*i-s;return n<0?-1:-i+Math.sqrt(n)}function hr(a){let e=pr(a),t=lt+a.altitude;if((()=>{let u=t*e[1],h=t*t-lt*lt,p=u*u-h;if(p<0)return-1;let d=-u-Math.sqrt(p);return d>0?d:-1})()>0)return[0,0,0];let i=Gi(t,e[1],0,Mi),s=64,n=i/s,o=0,l=0,c=0;for(let u=0;u<s;u++){let h=(u+.5)*n,p=e[0]*h,d=t+e[1]*h,f=e[2]*h,b=Math.hypot(p,d,f)-lt;o+=Math.exp(-b/Ti)*n,l+=Math.exp(-b/zi)*n,c+=Math.max(0,1-Math.abs(b-25e3)/15e3)*n}return[0,1,2].map(u=>Math.exp(-(Pi[u]*a.rayleigh*o+Si*a.turbidity*l+ki[u]*a.ozone*c)))}var Ai=`
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
`,ct=class{constructor(e,t,r=128){this.dev=e;this.tex=t;this.size=r,this.pipeline=e.device.createComputePipeline({layout:"auto",compute:{module:e.shader(Ai,"sky"),entryPoint:"main"}}),this.ubuf=e.createBuffer(64,GPUBufferUsage.UNIFORM,"sky.u");let i=s=>({size:[r,r,6],format:"rgba16float",mipLevelCount:oe(r),usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.RENDER_ATTACHMENT,label:s});this.cube=e.device.createTexture(i("sky.cube")),this.envCube=e.device.createTexture(i("sky.env")),this.bg=e.device.createBindGroup({layout:this.pipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.ubuf}},{binding:1,resource:this.cube.createView({dimension:"2d-array",baseMipLevel:0,mipLevelCount:1})}]}),this.clouds=new at(e,t,this.cube)}settings={...wi};cube;envCube;clouds;size;pipeline;ubuf;bg;version=0;envVersion=0;lastKey="";lastView={camPos:[0,100,0],dt:0};get sunDir(){return pr(this.settings)}sunIlluminanceRGB(){let e=hr(this.settings),t=this.settings.sunIlluminance;return[e[0]*t,e[1]*t,e[2]*t]}sunIlluminanceAt(e){let t=hr({...this.settings,altitude:e}),r=this.settings.sunIlluminance;return[t[0]*r,t[1]*r,t[2]*r]}addCloud(e){return this.clouds.addCloud(e)}get atmosphereKey(){let e=this.settings;return[e.sunElevation,e.sunAzimuth,e.sunIlluminance,e.turbidity,e.rayleigh,e.ozone,e.mieG,e.altitude].join("|")}update(e,t){t&&(this.lastView=t);let r=this.lastView,i=e??this.dev.device.createCommandEncoder({label:"sky"}),s=JSON.stringify(this.settings),n=!1;s!==this.lastKey&&(this.lastKey=s,this.bakeAtmosphere(i),n=!0);let o=this.settings,l=this.clouds.settings,c=this.clouds.update(i,{camPos:r.camPos,dt:r.dt,sunDir:this.sunDir,sunRGB:this.sunIlluminanceAt(l.altitude+l.thickness*.5),rayleigh:o.rayleigh,turbidity:o.turbidity,skyKey:this.atmosphereKey,windAloft:r.windAloft??[0,0]}),u=!1;return(n||c||this.envVersion===0)&&(this.clouds.compositeEnv(i,this.envCube),this.tex.mipgen.generate(this.envCube,"color",i),this.envVersion++,u=!0),e||this.dev.device.queue.submit([i.finish()]),u}bakeAtmosphere(e){let t=this.settings,r=this.sunDir,i=this.sunIlluminanceRGB(),s=Math.max(0,r[1]),n=.12*t.sunIlluminance*Math.max(.02,Math.sin(Math.max(r[1],.02)))*(.8+.2*t.turbidity),o=[i[0]*s+n*.85,i[1]*s+n*.95,i[2]*s+n*1.15],l=new Float32Array([r[0],r[1],r[2],t.sunIlluminance,t.rayleigh,t.turbidity,t.ozone,t.mieG,t.groundAlbedo,t.altitude,t.multiScatter,this.size,o[0],o[1],o[2],0]);this.dev.device.queue.writeBuffer(this.ubuf,0,l);let c=e.beginComputePass({label:"sky bake"});c.setPipeline(this.pipeline),c.setBindGroup(0,this.bg),c.dispatchWorkgroups(Math.ceil(this.size/8),Math.ceil(this.size/8),6),c.end(),this.tex.mipgen.generate(this.cube,"color",e),this.version++}};var Ui={speed:1.7,direction:111,gustiness:.35,gustFrequency:.12,turbulence:.25,foliageBend:.045,aloftFactor:2.5,aloftVeer:25};function Ne(a,e){let t=Math.floor(a),r=a-t,i=l=>{let c=Math.sin((l+e*131.7)*12.9898)*43758.5453;return(c-Math.floor(c))*2-1},s=r*r*r*(r*(r*6-15)+10),n=i(t)*r,o=i(t+1)*(r-1);return(n+(o-n)*s)*2}function fr(a,e){return(Ne(a,e)*.5+Ne(a*2.13+7.7,e+1)*.3+Ne(a*4.7+3.1,e+2)*.2)/.78}var ut=class{settings={...Ui};vector=m.create();direction=m.create(0,0,-1);gustFactor=1;onGust=[];onSettingsChanged=null;time=0;lastKey="";inGust=!1;constructor(e={}){Object.assign(this.settings,e),this.update(0)}get speed(){return m.length(this.vector)}set(e){let{direction:t,...r}=e;if(Object.assign(this.settings,r),typeof t=="number")this.settings.direction=t;else if(t){let i=t[0],s=t.length>=3?t[2]:t[1];this.settings.direction=Math.atan2(i,-s)*180/Math.PI,e.speed===void 0&&(this.settings.speed=Math.hypot(i,s))}return this.update(0),this}gust(e){let t=this.settings,r=fr(e*t.gustFrequency,3),i=Math.pow(Math.max(0,r-.15)/.85,1.6);return Math.max(.15,1+t.gustiness*(.45*r+1.25*i))}heading(e){let t=this.settings;return t.direction+t.gustiness*22*fr(e*t.gustFrequency*.6+50,11)}aloft(e,t=m.create()){let r=this.settings,i=Math.min(1,Math.max(0,e)/1500)**.4,s=r.speed*(1+(r.aloftFactor-1)*i),n=(r.direction+r.aloftVeer*i)*Math.PI/180;return m.set(t,Math.sin(n)*s,0,-Math.cos(n)*s)}update(e){this.time+=e;let t=this.settings,r=this.time,i=this.gust(r),s=this.heading(r)*Math.PI/180,n=t.speed*i,o=t.turbulence*t.speed*.18,l=Ne(r*3.1,21)*o,c=Ne(r*2.7+9,22)*o;m.set(this.direction,Math.sin(s),0,-Math.cos(s)),m.set(this.vector,this.direction[0]*n+l,0,this.direction[2]*n+c),this.gustFactor=i;let u=Math.min(1,Math.max(0,(i-1)/Math.max(.001,1.7*t.gustiness)));if(!this.inGust&&u>.3){this.inGust=!0;for(let p of this.onGust)p(u,this.vector)}else this.inGust&&u<.12&&(this.inGust=!1);let h=`${t.speed}|${t.gustiness}|${t.gustFrequency}|${t.turbulence}`;h!==this.lastKey&&(this.lastKey=h,this.onSettingsChanged?.(t))}};var Nt=`
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
`,Li=Nt+`
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
`,Bi=Nt+`
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
`,Ci=Nt+`
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
`,mt=class{constructor(e,t=128,r=96){this.dev=e;this.size=t;let i=e.device;this.mips=Math.min(oe(t),6),this.specular=i.createTexture({size:[t,t,6],format:"rgba16float",mipLevelCount:this.mips,usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING,label:"ibl.specular"}),this.sh=e.createBuffer(144,GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC,"ibl.sh"),this.brdfLut=i.createTexture({size:[128,128],format:"rgba16float",usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING,label:"brdf.lut"}),this.sampler=i.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"linear"}),this.prefilter=i.createComputePipeline({layout:"auto",compute:{module:e.shader(Li,"ibl-prefilter"),entryPoint:"main"}}),this.shPipe=i.createComputePipeline({layout:"auto",compute:{module:e.shader(Bi,"ibl-sh"),entryPoint:"main"}});for(let l=0;l<this.mips;l++){let c=l/(this.mips-1),u=Math.max(1,t>>l);this.uniforms.push(e.createBuffer(16,GPUBufferUsage.UNIFORM,`ibl.u${l}`,new Float32Array([c,u,t,l===0?1:r])))}let s=i.createComputePipeline({layout:"auto",compute:{module:e.shader(Ci,"dfg"),entryPoint:"main"}}),n=i.createCommandEncoder({label:"dfg"}),o=n.beginComputePass();o.setPipeline(s),o.setBindGroup(0,i.createBindGroup({layout:s.getBindGroupLayout(0),entries:[{binding:0,resource:this.brdfLut.createView()}]})),o.dispatchWorkgroups(16,16),o.end(),i.queue.submit([n.finish()])}specular;sh;brdfLut;mips;prefilter;shPipe;sampler;uniforms=[];update(e,t){let r=this.dev.device,i=e.createView({dimension:"cube"}),s=t.beginComputePass({label:"ibl"});s.setPipeline(this.prefilter);for(let n=0;n<this.mips;n++){let o=Math.max(1,this.size>>n);s.setBindGroup(0,r.createBindGroup({layout:this.prefilter.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniforms[n]}},{binding:1,resource:i},{binding:2,resource:this.sampler},{binding:3,resource:this.specular.createView({dimension:"2d-array",baseMipLevel:n,mipLevelCount:1})}]})),s.dispatchWorkgroups(Math.ceil(o/8),Math.ceil(o/8),6)}s.setPipeline(this.shPipe),s.setBindGroup(0,r.createBindGroup({layout:this.shPipe.getBindGroupLayout(0),entries:[{binding:0,resource:i},{binding:1,resource:this.sampler},{binding:2,resource:{buffer:this.sh}}]})),s.dispatchWorkgroups(1),s.end()}};var br={enabled:!0,cascades:4,resolution:2048,distance:160,splitLambda:.82,casterExtent:120,constantBias:8e-5,slopeBias:1.6,normalBias:1.4,maxPenumbraTexels:14,blockerSamples:12,pcfSamples:20,blendFraction:.12},je=m.create();function gr(a,e,t,r){let i=Math.max(1,Math.min(4,r.cascades)),s=Math.max(a.near,.05),n=r.distance,o=[];for(let g=1;g<=i;g++){let x=g/i,w=s*Math.pow(n/s,x),P=s+(n-s)*x;o.push(r.splitLambda*w+(1-r.splitLambda)*P)}let l=Math.tan(a.fovY/2),c=l*e,u={viewProj:[],splits:o,texelWorld:[],depthRange:[]},h=a.forward(),p=a.up(),d=a.right(),f=m.normalize(m.create(),t),b=Math.abs(f[1])>.99?m.create(0,0,1):m.create(0,1,0),v=s;for(let g=0;g<i;g++){let x=v,w=o[g];v=w;let P=c*c+l*l,S=.5*(x+w)*(1+P);S=Math.min(S,w);let k=Math.hypot(S-x,x*Math.sqrt(P)),T=Math.hypot(w-S,w*Math.sqrt(P)),G=Math.max(k,T)*1.02,U=m.scaleAndAdd(m.create(),a.position,h,S),R=r.resolution,L=2*G/R,C=M.lookAt(M.create(),f,[0,0,0],b);m.transformMat4(je,U,C);let _=Math.round(je[0]/L)*L,A=Math.round(je[1]/L)*L,I=-je[2]-G-r.casterExtent,X=-je[2]+G,Y=X-I,J=M.orthoZO(M.create(),_-G,_+G,A-G,A+G,I,X),te=M.multiply(M.create(),J,C);u.viewProj.push(te),u.texelWorld.push(L),u.depthRange.push(Y)}return u}var Ri=0,ye=class{id=++Ri;mesh;material;transform=M.create();prevTransform=M.create();visible=!0;castShadow=!0;viewmodel=!1;joints=null;_skin=null;instances=null;instanceCount=0;instancesDirty=!1;_inst=null;instBounds=null;worldBounds=se.create();first=!0;userData=null;constructor(e,t,r){this.mesh=e,this.material=t,r&&(M.copy(this.transform,r),M.copy(this.prevTransform,r))}setTransform(e){M.copy(this.transform,e)}setInstances(e,t=e.length/16){this.instances=e,this.instanceCount=t,this.instancesDirty=!0;let r=se.create(),i=se.create();for(let s=0;s<t;s++){se.transform(i,this.mesh.bounds,e.subarray(s*16,s*16+16));for(let n=0;n<3;n++)r.min[n]=Math.min(r.min[n],i.min[n]),r.max[n]=Math.max(r.max[n],i.max[n])}this.instBounds=r}_endFrame(){M.copy(this.prevTransform,this.transform),this.first=!1}_beginFrame(){this.first&&M.copy(this.prevTransform,this.transform),se.transform(this.worldBounds,this.instances&&this.instBounds?this.instBounds:this.mesh.bounds,this.transform)}resetHistory(){this.first=!0}},dt=class a{position=m.create();color=[1,1,1];intensity=100;range=20;radius=.02;spotOuter=0;spotInner=0;direction=m.create(0,-1,0);enabled=!0;static fromLumens(e,t=6500){let r=new a;return r.intensity=ir(e),r.color=tr(t),r}},ht=class{position=m.create(0,1.7,0);rotation=B.create();fovY=70*ee;viewmodelFovY=55*ee;near=.04;aperture=8;shutter=1/250;iso=100;view=M.create();world=M.create();updateMatrices(){M.fromRotationTranslation(this.world,this.rotation,this.position),M.invert(this.view,this.world)}forward(e=m.create()){return m.transformQuat(e,[0,0,-1],this.rotation)}up(e=m.create()){return m.transformQuat(e,[0,1,0],this.rotation)}right(e=m.create()){return m.transformQuat(e,[1,0,0],this.rotation)}setFocalLength(e,t=24){this.fovY=2*Math.atan(t/(2*e))}},pt=class{objects=new Set;lights=new Set;add(e){return this.objects.add(e),e}remove(e){this.objects.delete(e)}addLight(e){return this.lights.add(e),e}removeLight(e){this.lights.delete(e)}};var we=`
const PI: f32 = 3.14159265359;
const INV_PI: f32 = 0.31830988618;
const HALF_MAX: f32 = 60000.0;
`,Me=`
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
`,be=`
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
`,We=`
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
`,ft=`
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
`,He=`
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
`,bt=`
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
`,vr=`
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
`;var jt=(i=>(i[i.Smoke=0]="Smoke",i[i.Flash=1]="Flash",i[i.Spark=2]="Spark",i[i.Dust=3]="Dust",i))(jt||{}),_i=we+Me+be+We+He+`
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
`;function Vi(a){let t=new Uint8Array(a*a*4*4),r=pe(1234),i=new Float32Array(4096).map(()=>r.next()),s=(o,l)=>{let c=Math.floor(o),u=Math.floor(l),h=o-c,p=l-u,d=(v,g)=>i[(g&63)*64+(v&63)],f=h*h*(3-2*h),b=p*p*(3-2*p);return(d(c,u)*(1-f)+d(c+1,u)*f)*(1-b)+(d(c,u+1)*(1-f)+d(c+1,u+1)*f)*b},n=(o,l)=>{let c=0,u=.5,h=1;for(let p=0;p<5;p++)c+=u*s(o*h,l*h),u*=.5,h*=2;return c};for(let o=0;o<4;o++)for(let l=0;l<a;l++)for(let c=0;c<a;c++){let u=(c+.5)/a*2-1,h=(l+.5)/a*2-1,p=Math.hypot(u,h),d=0,f=255;if(o===0){let v=n(u*2.2+5,h*2.2+3);d=Math.max(0,Math.min(1,(1-p*p)*1.2))*Math.max(0,Math.min(1,v*1.8-.25)),f=Math.round(200+55*v)}else if(o===1){let v=Math.atan2(h,u),g=Math.pow(Math.abs(Math.cos(v*2.5)),6)*.6+Math.pow(Math.abs(Math.cos(v*4+.6)),10)*.4,x=n(u*4+11,h*4+7),w=.25+.75*g*(.6+.6*x);d=Math.max(0,1-p/w)**1.5+Math.max(0,1-p/.25)**2,d=Math.min(1,d),f=255}else if(o===2)d=Math.exp(-(h*h)*40)*Math.max(0,1-Math.abs(u)),f=255;else{let v=n(u*5+21,h*5+13);d=Math.max(0,1-p)**1.4*Math.max(0,v*1.6-.35),f=Math.round(180+75*v)}let b=((o*a+l)*a+c)*4;t[b]=f,t[b+1]=f,t[b+2]=f,t[b+3]=Math.round(Math.max(0,Math.min(1,d))*255)}return t}var gt=class{constructor(e){this.dev=e;this.instanceBuffer=e.createBuffer(this.capacity*64,GPUBufferUsage.VERTEX,"particles.inst");let t=128;this.atlas=e.device.createTexture({size:[t,t,4],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:"particle.atlas"}),e.device.queue.writeTexture({texture:this.atlas},Vi(t),{bytesPerRow:t*4,rowsPerImage:t},[t,t,4]),this.sampler=e.device.createSampler({magFilter:"linear",minFilter:"linear"})}particles=[];maxParticles=4096;wind=m.create(1.5,0,.5);instanceBuffer;capacity=1024;data=new Float32Array(1024*16);atlas;sampler;pipeline=null;bg=null;bgDepth=null;random=pe(77);count=0;get random01(){return this.random.next()}spawn(e){this.particles.length>=this.maxParticles&&this.particles.shift(),this.particles.push({kind:e.kind,pos:Float32Array.from(e.position),vel:Float32Array.from(e.velocity??[0,0,0]),life:e.life,size0:e.size0,size1:e.size1,color:e.color??[1,1,1],alpha0:e.alpha0??1,alpha1:e.alpha1??0,luminance:e.luminance??0,rotation:e.rotation??this.random.next()*Math.PI*2,spin:e.spin??0,drag:e.drag??0,gravity:e.gravity??0,buoyancy:e.buoyancy??0,stretch:e.stretch??0,layer:e.layer??(e.kind===2?2:e.kind),fadeIn:e.fadeIn??.05,age:0,fresh:!0})}update(e){let t=this.particles,r=0;for(let i=0;i<t.length;i++){let s=t[i];if(s.fresh){s.fresh=!1,t[r++]=s;continue}if(s.age+=e,s.age>=s.life)continue;let n=s.kind===0||s.kind===3?1:0;for(let o=0;o<3;o++){let l=s.vel[o]-this.wind[o]*n;s.vel[o]-=l*Math.min(1,s.drag*e)}s.vel[1]+=(s.buoyancy-s.gravity)*e,s.pos[0]+=s.vel[0]*e,s.pos[1]+=s.vel[1]*e,s.pos[2]+=s.vel[2]*e,s.rotation+=s.spin*e,t[r++]=s}t.length=r}upload(e){let t=this.particles,r=t.length;r>this.capacity&&(this.capacity=Math.ceil(r*1.5),this.instanceBuffer.destroy(),this.instanceBuffer=this.dev.createBuffer(this.capacity*64,GPUBufferUsage.VERTEX,"particles.inst"),this.data=new Float32Array(this.capacity*16));let i=n=>(n.pos[0]-e[0])**2+(n.pos[1]-e[1])**2+(n.pos[2]-e[2])**2;t.sort((n,o)=>i(o)-i(n));let s=this.data;for(let n=0;n<r;n++){let o=t[n],l=n*16,c=o.age/o.life,u=Math.min(1,c/Math.max(o.fadeIn,.001)),h=o.size0+(o.size1-o.size0)*Math.sqrt(c),p=(o.alpha0+(o.alpha1-o.alpha0)*c)*u;s[l]=o.pos[0],s[l+1]=o.pos[1],s[l+2]=o.pos[2],s[l+3]=h,s[l+4]=o.color[0],s[l+5]=o.color[1],s[l+6]=o.color[2],s[l+7]=p,s[l+8]=o.rotation,s[l+9]=o.kind,s[l+10]=o.luminance*(1-c)*(1-c),s[l+11]=o.stretch,s[l+12]=o.vel[0],s[l+13]=o.vel[1],s[l+14]=o.vel[2],s[l+15]=o.layer}return r&&this.dev.device.queue.writeBuffer(this.instanceBuffer,0,s,0,r*16),this.count=r,r}createPipeline(e,t){let r=this.dev.device,i=this.dev.shader(_i,"particles"),s=r.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d-array"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"depth"}}]});return this.pipeline=r.createRenderPipeline({label:"particles",layout:r.createPipelineLayout({bindGroupLayouts:[e,s]}),vertex:{module:i,entryPoint:"vs",buffers:[{arrayStride:64,stepMode:"instance",attributes:[{shaderLocation:0,offset:0,format:"float32x4"},{shaderLocation:1,offset:16,format:"float32x4"},{shaderLocation:2,offset:32,format:"float32x4"},{shaderLocation:3,offset:48,format:"float32x4"}]}]},fragment:{module:i,entryPoint:"fs",targets:[{format:t,blend:{color:{srcFactor:"one",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"triangle-strip"},depthStencil:{format:"depth32float",depthWriteEnabled:!1,depthCompare:"greater-equal"}}),this.bg=null,s}draw(e,t){!this.pipeline||this.count===0||((!this.bg||this.bgDepth!==t)&&(this.bg=this.dev.device.createBindGroup({layout:this.pipeline.getBindGroupLayout(1),entries:[{binding:0,resource:this.atlas.createView({dimension:"2d-array"})},{binding:1,resource:this.sampler},{binding:2,resource:t.createView()}]}),this.bgDepth=t),e.setPipeline(this.pipeline),e.setBindGroup(1,this.bg),e.setVertexBuffer(0,this.instanceBuffer),e.draw(4,this.count))}},Wt=(n=>(n[n.MetalHit=0]="MetalHit",n[n.WoodHole=1]="WoodHole",n[n.ConcreteChip=2]="ConcreteChip",n[n.PaperHole=3]="PaperHole",n[n.LeadSplash=4]="LeadSplash",n[n.DirtMark=5]="DirtMark",n))(Wt||{}),Ei=we+Me+be+We+ft+He+`
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
`;function Di(a){let t=new Uint8Array(a*a*4*6),r=new Uint8Array(a*a*4*6),i=pe(99),s=Array.from({length:64},()=>i.next());for(let n=0;n<6;n++){let o=new Float32Array(a*a);for(let c=0;c<a;c++)for(let u=0;u<a;u++){let h=(u+.5)/a*2-1,p=(c+.5)/a*2-1,d=Math.hypot(h,p),f=Math.atan2(p,h),b=1+.18*(s[Math.floor((f+Math.PI)/(2*Math.PI)*63)]-.5)*2,v=[0,0,0],g=0,x=0,w=.6;switch(n){case 0:{let S=d<.14*b,k=d<.32*b,T=d<.62*b;S?(v=[.16,.16,.17],g=1,x=-.6,w=.55):k?(v=[.78,.79,.8],g=1,x=-.15+.15*Math.cos(d*30),w=.22):T&&(v=[.22,.21,.2],g=Math.min(1,(.62*b-d)*12),x=-.05,w=.5);break}case 1:{let S=d<.12*b,k=Math.abs(Math.sin(f*7+s[3]*6))>.6&&d<.45*b;S?(v=[.02,.015,.01],g=1,x=-1,w=.95):k?(v=[.75,.6,.42],g=Math.min(1,(.45*b-d)*6),x=.2,w=.75):d<.25*b&&(v=[.3,.2,.12],g=.8,x=-.2,w=.8);break}case 2:{d<.3*b?(v=[.62,.61,.58],g=1,x=-.8*(1-d/(.3*b)),w=.95):d<.75&&(v=[.58,.57,.54],g=Math.max(0,.6*(1-(d-.3)/.45)),x=0,w=.95);break}case 3:{d<.2?(v=[.01,.01,.01],g=1,x=-1,w=1):d<.27&&(v=[.25,.25,.26],g=.85,x=0,w=.8);break}case 4:{let S=Math.pow(Math.abs(Math.cos(f*9+s[7]*5)),4);d<.18?(v=[.55,.55,.57],g=1,x=.2,w=.35):d<(.3+.6*S)*b&&(v=[.5,.5,.52],g=Math.max(0,1-d)*.9,x=.05,w=.4);break}default:d<.7*b&&(v=[.12,.09,.06],g=Math.max(0,1-d/(.7*b))*.9,x=-.3*(1-d),w=1)}o[c*a+u]=x;let P=((n*a+c)*a+u)*4;t[P]=Math.round(Math.pow(v[0],1/2.2)*255),t[P+1]=Math.round(Math.pow(v[1],1/2.2)*255),t[P+2]=Math.round(Math.pow(v[2],1/2.2)*255),t[P+3]=Math.round(Math.max(0,Math.min(1,g))*255),r[P+3]=Math.round(w*255)}let l=6;for(let c=0;c<a;c++)for(let u=0;u<a;u++){let h=o[c*a+Math.min(a-1,u+1)]-o[c*a+Math.max(0,u-1)],p=o[Math.min(a-1,c+1)*a+u]-o[Math.max(0,c-1)*a+u],d=-h*l,f=p*l,b=1,v=Math.hypot(d,f,b);d/=v,f/=v,b/=v;let g=((n*a+c)*a+u)*4;r[g]=Math.round((d*.5+.5)*255),r[g+1]=Math.round((f*.5+.5)*255),r[g+2]=Math.round((b*.5+.5)*255)}}return{albedo:t,normal:r,layers:6}}var vt=class{constructor(e){this.dev=e;this.buffer=e.createBuffer(this.capacity*80,GPUBufferUsage.VERTEX,"decals.inst");let t=128,r=Di(t),i=(s,n,o)=>{let l=e.device.createTexture({size:[t,t,r.layers],format:s,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:o});return e.device.queue.writeTexture({texture:l},n,{bytesPerRow:t*4,rowsPerImage:t},[t,t,r.layers]),l};this.albedo=i("rgba8unorm-srgb",r.albedo,"decal.albedo"),this.normal=i("rgba8unorm",r.normal,"decal.normal"),this.sampler=e.device.createSampler({magFilter:"linear",minFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"})}decals=[];maxDecals=512;buffer;capacity=512;data=new Float32Array(512*20);albedo;normal;sampler;pipeline=null;bg=null;count=0;tmp=M.create();add(e,t,r,i,s=null,n=[1,1,1],o=Math.random()*Math.PI*2){let l=m.normalize(m.create(),m.clone(r)),c=Math.abs(l[1])>.95?m.create(1,0,0):m.create(0,1,0),u=m.normalize(m.create(),m.cross(m.create(),c,l)),h=m.cross(m.create(),l,u),p=Math.cos(o),d=Math.sin(o),f=m.create(u[0]*p+h[0]*d,u[1]*p+h[1]*d,u[2]*p+h[2]*d),b=m.cross(m.create(),l,f),v=.0015,g=M.create();g[0]=f[0]*i,g[1]=f[1]*i,g[2]=f[2]*i,g[4]=b[0]*i,g[5]=b[1]*i,g[6]=b[2]*i,g[8]=l[0],g[9]=l[1],g[10]=l[2],g[12]=t[0]+l[0]*v,g[13]=t[1]+l[1]*v,g[14]=t[2]+l[2]*v;let x=g;if(s){let w=M.invert(M.create(),s.transform);x=M.multiply(M.create(),w,g)}this.decals.length>=this.maxDecals&&this.decals.shift(),this.decals.push({local:x,parent:s,kind:e,tint:n,age:0})}clear(){this.decals.length=0}upload(){let e=this.decals.length;e>this.capacity&&(this.capacity=Math.ceil(e*1.5),this.buffer.destroy(),this.buffer=this.dev.createBuffer(this.capacity*80,GPUBufferUsage.VERTEX,"decals.inst"),this.data=new Float32Array(this.capacity*20));for(let t=0;t<e;t++){let r=this.decals[t],i=r.parent?M.multiply(this.tmp,r.parent.transform,r.local):r.local;this.data.set(i,t*20),this.data[t*20+16]=r.kind,this.data[t*20+17]=r.tint[0],this.data[t*20+18]=r.tint[1],this.data[t*20+19]=r.tint[2]}return e&&this.dev.device.queue.writeBuffer(this.buffer,0,this.data,0,e*20),this.count=e,e}createPipeline(e,t){let r=this.dev.device,i=this.dev.shader(Ei,"decals"),s=r.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d-array"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d-array"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,sampler:{}}]});this.pipeline=r.createRenderPipeline({label:"decals",layout:r.createPipelineLayout({bindGroupLayouts:[e,s]}),vertex:{module:i,entryPoint:"vs",buffers:[{arrayStride:80,stepMode:"instance",attributes:[0,1,2,3,4].map(n=>({shaderLocation:n,offset:n*16,format:"float32x4"}))}]},fragment:{module:i,entryPoint:"fs",targets:[{format:t,blend:{color:{srcFactor:"one",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"triangle-strip"},depthStencil:{format:"depth32float",depthWriteEnabled:!1,depthCompare:"greater-equal",depthBias:2,depthBiasSlopeScale:2}}),this.bg=r.createBindGroup({layout:s,entries:[{binding:0,resource:this.albedo.createView({dimension:"2d-array"})},{binding:1,resource:this.normal.createView({dimension:"2d-array"})},{binding:2,resource:this.sampler}]})}draw(e){!this.pipeline||!this.bg||this.count===0||(e.setPipeline(this.pipeline),e.setBindGroup(1,this.bg),e.setVertexBuffer(0,this.buffer),e.draw(4,this.count))}};var ge=256,xr=`
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
`,Oi=`
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
`;function Ht(a=!1){return we+Me+be+We+ft+He+vr+bt+xr+rt(a)+Oi+`
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
`}var yr=Ht(!1);function qt(a=!1){return xr+rt(a)+`
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
`}var wr=qt(!1);var Mr=`
struct FOut { @builtin(position) pos: vec4f, @location(0) uv: vec2f };
@vertex fn vsFull(@builtin(vertex_index) i: u32) -> FOut {
  let p = vec2f(f32((i << 1u) & 2u), f32(i & 2u));
  var o: FOut;
  o.pos = vec4f(p * 2.0 - 1.0, 0.0, 1.0);
  o.uv = vec2f(p.x, 1.0 - p.y);
  return o;
}
`,Pr=we+Me+be+bt+Mr+`
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
`,Sr=`
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
`,kr=`
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
`,Tr=`
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
`,zr=`
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
`,Gr=`
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
`,Ar=`
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
`,Ur=`
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
`,Lr=`
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
`,Br=be+Mr+`
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
`;var Cr=`
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
`;var Rr=`
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
`,_r=Rr+`
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
`,Vr=Rr+`
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
`;function Ii(){return{renderScale:1,maxDevicePixelRatio:2,taa:{enabled:!0,feedbackMin:.82,feedbackMax:.94,velocityWeight:.06,jitterSamples:16},exposure:{mode:"auto",ev100:14,compensation:0,minEv100:-2,maxEv100:17,speedUp:2.2,speedDown:1.4,lowPercent:.45,highPercent:.96,centerWeight:.6},bloom:{enabled:!0,intensity:.035,radius:1,clamp:6e4},gtao:{enabled:!0,radius:.9,falloff:.4,power:1.25,strength:1,slices:2,steps:6,blur:!0},motionBlur:{enabled:!0,shutterAngle:180,maxPixels:48,samples:10},dof:{enabled:!0,apertureMm:3.2,autoFocus:!0,focusDistance:10,focusSpeed:6,maxBlurPx:14,overrideDistance:.6,overrideWeight:0,minFocus:.12,quality:1},lens:{distortion:0,distortion2:0,chromaticAberration:.15,naturalVignette:.6,vignette:.12,vignetteRoundness:.6,sharpen:.25,fillZoom:1},sensor:{enabled:!0,readNoise:.0025,shotNoise:.0018,isoCoupled:!0,gain:1},grade:{tonemapper:"agx",contrast:1.04,saturation:1.02,temperature:0,tint:0,lift:0,gamma:1,gain:1,exposureBias:0,dither:1},fog:{density:35e-5,heightFalloff:.045,baseHeight:0,startDistance:15,inscatter:1,mieG:.72},ibl:{intensity:1,specularOcclusion:1,occludedAmbient:.15,groundBounce:.6,viewmodelFill:1.7},gi:{enabled:!0,intensity:1},shadows:{...br},viewmodelDepthSqueeze:.5,debugView:0}}var Ni={agx:0,aces:1,neutral:2,none:3};function Dr(a){let e=new Float32Array(1),t=new Uint32Array(e.buffer);e[0]=a;let r=t[0],i=r>>>16&32768,s=(r>>>23&255)-127+15,n=r&8388607;return s<=0?s<-10?i:(n=(n|8388608)>>1-s,i|n>>13):s>=31?i|31744:i|s<<10|n>>13}var xt=class a{dev;device;settings;textures;synth;sky;wind=new ut;ibl;particles;decals;stats={drawCalls:0,triangles:0,objects:0,culled:0,frameMs:0,gpuInfo:""};frameLayout;objectLayout;materialLayout;terrainMaterialLayout;terrainMeshModule=null;terrainShadowModule=null;shadowLayout;frameBuf;lightBuf;exposureBuf;histBuf;objBuf;objCapacity=0;objData=new Float32Array(0);cascadeBuf;dummyJoints;staticObjectBG;frameBG=null;frameBGKey="";shadowMap;shadowRes=0;shadowCount=0;skyVis;skyVisParams={min:[0,0,0],cell:1,size:[1,1,1],enabled:!1};probes=[];probeParams={min:[0,0,0],cell:1,size:[1,1,1],enabled:!1};targets=null;linearClamp;shadowSampler;meshModule;shadowModule;pipelines=new Map;skyPipe;gtaoPipe;aoBlurPipe;taaPipe;mbPipe;dofFocusPipe;dofGatherPipe;dofState;bloomDownPipe;bloomUpPipe;histPipe;exposurePipe;compositePipe;debugPipe;postUniforms=new Map;frameIndex=0;prevViewProj=M.create();prevVmViewProj=M.create();historyValid=!1;time=0;lastSkyVersion=-1;fw=new Je(1344);constructor(e){this.dev=e,this.device=e.device;let t=this.device;this.settings=Ii(),this.textures=new tt(e),this.synth=new it(e,this.textures),this.sky=new ct(e,this.textures,128),this.ibl=new mt(e,128),this.particles=new gt(e),this.decals=new vt(e);let r=GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT;this.frameLayout=t.createBindGroupLayout({label:"frame",entries:[{binding:0,visibility:r,buffer:{type:"uniform"}},{binding:1,visibility:r,buffer:{type:"read-only-storage"}},{binding:2,visibility:r,buffer:{type:"read-only-storage"}},{binding:3,visibility:r,buffer:{type:"read-only-storage"}},{binding:4,visibility:r,texture:{viewDimension:"cube"}},{binding:5,visibility:r,texture:{}},{binding:6,visibility:r,texture:{sampleType:"depth",viewDimension:"2d-array"}},{binding:7,visibility:r,sampler:{type:"comparison"}},{binding:8,visibility:r,sampler:{}},{binding:9,visibility:r,texture:{sampleType:"unfilterable-float"}},{binding:10,visibility:r,texture:{viewDimension:"3d"}},{binding:11,visibility:r,texture:{viewDimension:"cube"}},{binding:12,visibility:r,texture:{viewDimension:"3d"}},{binding:13,visibility:r,texture:{viewDimension:"3d"}},{binding:14,visibility:r,texture:{viewDimension:"3d"}},{binding:15,visibility:r,texture:{}},{binding:16,visibility:r,texture:{}}]}),this.objectLayout=t.createBindGroupLayout({label:"object",entries:[{binding:0,visibility:r,buffer:{type:"uniform",hasDynamicOffset:!0,minBindingSize:ge}},{binding:1,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}},{binding:2,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}}]}),this.materialLayout=t.createBindGroupLayout({label:"material",entries:[{binding:0,visibility:r,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:3,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:4,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:5,visibility:GPUShaderStage.FRAGMENT,texture:{}}]}),this.terrainMaterialLayout=t.createBindGroupLayout({label:"material-terrain",entries:[{binding:0,visibility:r,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d-array"}},{binding:3,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d-array"}},{binding:4,visibility:GPUShaderStage.FRAGMENT,texture:{viewDimension:"2d-array"}},{binding:5,visibility:GPUShaderStage.FRAGMENT,texture:{}}]}),this.shadowLayout=t.createBindGroupLayout({label:"shadow",entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform",hasDynamicOffset:!0,minBindingSize:64}}]}),this.frameBuf=e.createBuffer(1344,GPUBufferUsage.UNIFORM,"frame"),this.lightBuf=e.createBuffer(4096,GPUBufferUsage.STORAGE,"lights"),this.exposureBuf=e.createBuffer(16,GPUBufferUsage.STORAGE,"exposure",new Float32Array([1/(1.2*2**14),14,14,1/(1.2*2**14)])),this.histBuf=e.createBuffer(256*4,GPUBufferUsage.STORAGE,"histogram"),this.cascadeBuf=e.createBuffer(256*4,GPUBufferUsage.UNIFORM,"cascades"),this.dummyJoints=e.createBuffer(64,GPUBufferUsage.STORAGE,"dummyJoints",M.create()),this.objBuf=this.ensureObjectCapacity(256),this.linearClamp=t.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",addressModeW:"clamp-to-edge"}),this.shadowSampler=t.createSampler({compare:"less",magFilter:"linear",minFilter:"linear"}),this.skyVis=this.textures.white3d,this.probes=[this.textures.white3d,this.textures.white3d,this.textures.white3d],this.createShadowMap(),this.meshModule=e.shader(yr,"mesh"),this.shadowModule=e.shader(wr,"shadow");let i="rgba16float",s=e.shader(Pr,"skypass");this.skyPipe=t.createRenderPipeline({label:"sky",layout:t.createPipelineLayout({bindGroupLayouts:[this.frameLayout]}),vertex:{module:s,entryPoint:"vsFull"},fragment:{module:s,entryPoint:"fsSky",targets:[{format:i}]},depthStencil:{format:"depth32float",depthWriteEnabled:!1,depthCompare:"greater-equal"}});let n=(l,c)=>t.createComputePipeline({label:c,layout:"auto",compute:{module:e.shader(l,c),entryPoint:"main"}});this.gtaoPipe=n(Sr,"gtao"),this.aoBlurPipe=n(kr,"aoblur"),this.taaPipe=n(Tr,"taa"),this.mbPipe=n(zr,"motionblur"),this.dofFocusPipe=n(_r,"dof-focus"),this.dofGatherPipe=n(Vr,"dof-gather"),this.dofState=e.createBuffer(16,GPUBufferUsage.STORAGE,"dof.state",new Float32Array([0,0,0,0])),this.bloomDownPipe=n(Gr,"bloomdown"),this.bloomUpPipe=n(Ar,"bloomup"),this.histPipe=n(Ur,"histogram"),this.exposurePipe=n(Lr,"exposure"),this.debugPipe=n(Cr,"debug");let o=e.shader(Br,"composite");this.compositePipe=t.createRenderPipeline({label:"composite",layout:"auto",vertex:{module:o,entryPoint:"vsFull"},fragment:{module:o,entryPoint:"fsComposite",targets:[{format:e.presentationFormat}]}}),this.particles.createPipeline(this.frameLayout,i),this.decals.createPipeline(this.frameLayout,i),this.staticObjectBG=this.makeObjectBG(this.dummyJoints,this.dummyJoints)}static async create(e,t={}){let r=await Ze.create({canvas:e,powerPreference:t.powerPreference,offscreen:t.offscreen});return new a(r)}get materialBindGroupLayout(){return this.materialLayout}materialLayoutFor(e){return e.terrain?this.terrainMaterialLayout:this.materialLayout}ensureObjectCapacity(e){if(e<=this.objCapacity)return this.objBuf;let t=Math.max(e,Math.ceil(this.objCapacity*1.5),256);this.objBuf?.destroy?.(),this.objBuf=this.dev.createBuffer(t*ge,GPUBufferUsage.UNIFORM,"objects"),this.objData=new Float32Array(t*ge/4),this.objCapacity=t,this.dummyJoints&&(this.staticObjectBG=this.makeObjectBG(this.dummyJoints,this.dummyJoints));for(let r of this.skinnedObjects)r._skin&&(r._skin.bg=null);return this.objBuf}skinnedObjects=new Set;makeObjectBG(e,t){return this.device.createBindGroup({layout:this.objectLayout,entries:[{binding:0,resource:{buffer:this.objBuf,size:ge}},{binding:1,resource:{buffer:e}},{binding:2,resource:{buffer:t}}]})}createShadowMap(){let e=this.settings.shadows,t=Math.max(256,Math.min(8192,e.resolution|0)),r=Math.max(1,Math.min(4,e.cascades|0));this.shadowMap&&t===this.shadowRes&&r===this.shadowCount||(this.shadowMap?.destroy(),this.shadowMap=this.device.createTexture({size:[t,t,4],format:"depth32float",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING,label:"shadowmap"}),this.shadowRes=t,this.shadowCount=r,this.frameBG=null)}setSkyVisibility(e,t,r,i,s,n){let o=new Uint16Array(e.length);for(let c=0;c<e.length;c++)o[c]=Dr(e[c]);let l=this.device.createTexture({size:[t,r,i],dimension:"3d",format:"r16float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:"skyvis"});this.device.queue.writeTexture({texture:l},o,{bytesPerRow:t*2,rowsPerImage:r},[t,r,i]),this.skyVis!==this.textures.white3d&&this.skyVis.destroy(),this.skyVis=l,this.skyVisParams={min:[...s],cell:n,size:[t,r,i],enabled:!0},this.frameBG=null}setProbeVolume(e,t,r,i,s,n){let o=t*r*i;for(let l=0;l<3;l++){let c=new Uint16Array(o*4);for(let h=0;h<o;h++)for(let p=0;p<4;p++)c[h*4+p]=Dr(e[h*12+l*4+p]);let u=this.device.createTexture({size:[t,r,i],dimension:"3d",format:"rgba16float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:`gi.probes.${"rgb"[l]}`});this.device.queue.writeTexture({texture:u},c,{bytesPerRow:t*8,rowsPerImage:r},[t,r,i]),this.probes[l]!==this.textures.white3d&&this.probes[l].destroy(),this.probes[l]=u}this.probeParams={min:[s[0],s[1],s[2]],cell:n,size:[t,r,i],enabled:!0},this.frameBG=null}async readSkySH(){let e=this.device,t=e.createCommandEncoder({label:"sky-sh-readback"});this.sky.update(t),this.sky.envVersion!==this.lastSkyVersion&&(this.ibl.update(this.sky.envCube,t),this.lastSkyVersion=this.sky.envVersion);let r=e.createBuffer({size:144,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST,label:"sh-readback"});t.copyBufferToBuffer(this.ibl.sh,0,r,0,144),e.queue.submit([t.finish()]),await r.mapAsync(GPUMapMode.READ);let i=new Float32Array(r.getMappedRange().slice(0));r.unmap(),r.destroy();let s=new Float32Array(27);for(let n=0;n<9;n++)for(let o=0;o<3;o++)s[n*3+o]=i[n*4+o];return s}makeTargets(e,t){let r=this.device,i=(u,h,p,d=[e,t])=>r.createTexture({label:u,size:d,format:h,usage:p}),s=GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING,n=GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING,o=[],l=[],c=Math.min(6,oe(e,t)-2);for(let u=0;u<c;u++){let h=Math.max(1,e>>u+1),p=Math.max(1,t>>u+1);o.push(i(`bloom.down${u}`,"rgba16float",n,[h,p])),l.push(i(`bloom.up${u}`,"rgba16float",n,[h,p]))}return{w:e,h:t,depth:i("depth","depth32float",s),normal:i("normal","rgba16float",s),velocity:i("velocity","rg16float",s),hdr:i("hdr","rgba16float",s),aoRaw:i("ao.raw","r32float",n),ao:i("ao","r32float",n),history:[i("taa.a","rgba16float",n),i("taa.b","rgba16float",n)],mb:i("motionblur","rgba16float",n),dof:i("dof","rgba16float",n),debug:i("debug","rgba16float",n),bloomDown:o,bloomUp:l}}destroyTargets(e){for(let t of[e.depth,e.normal,e.velocity,e.hdr,e.aoRaw,e.ao,e.history[0],e.history[1],e.mb,e.dof,e.debug,...e.bloomDown,...e.bloomUp])t.destroy()}uniform(e,t){let r=this.postUniforms.get(e);return r||(r=this.dev.createBuffer(Math.max(16,t.byteLength),GPUBufferUsage.UNIFORM,e),this.postUniforms.set(e,r)),this.device.queue.writeBuffer(r,0,t.buffer,t.byteOffset,t.byteLength),r}getFrameBG(e){let t=`${e.w}x${e.h}|${this.sky.clouds.resourceVersion}`;return this.frameBG&&this.frameBGKey===t?this.frameBG:(this.frameBG=this.device.createBindGroup({layout:this.frameLayout,label:"frame",entries:[{binding:0,resource:{buffer:this.frameBuf}},{binding:1,resource:{buffer:this.lightBuf}},{binding:2,resource:{buffer:this.ibl.sh}},{binding:3,resource:{buffer:this.exposureBuf}},{binding:4,resource:this.ibl.specular.createView({dimension:"cube"})},{binding:5,resource:this.ibl.brdfLut.createView()},{binding:6,resource:this.shadowMap.createView({dimension:"2d-array"})},{binding:7,resource:this.shadowSampler},{binding:8,resource:this.linearClamp},{binding:9,resource:e.ao.createView()},{binding:10,resource:this.skyVis.createView()},{binding:11,resource:this.sky.cube.createView({dimension:"cube"})},{binding:12,resource:this.probes[0].createView()},{binding:13,resource:this.probes[1].createView()},{binding:14,resource:this.probes[2].createView()},{binding:15,resource:this.sky.clouds.shadow.createView()},{binding:16,resource:this.sky.clouds.dome.createView()}]}),this.frameBGKey=t,this.frameBG)}getPipelines(e,t){let r=`${e?1:0}|${t.variantKey}`,i=this.pipelines.get(r);if(i)return i;let s=this.device,n=this.materialLayoutFor(t),o=this.meshModule,l=this.shadowModule;t.terrain&&(this.terrainMeshModule??=this.dev.shader(Ht(!0),"mesh-terrain"),this.terrainShadowModule??=this.dev.shader(qt(!0),"shadow-terrain"),o=this.terrainMeshModule,l=this.terrainShadowModule);let c=s.createPipelineLayout({bindGroupLayouts:[this.frameLayout,this.objectLayout,n]}),u=e?[Dt,nr]:[Dt],h={module:o,entryPoint:e?"vsSkinned":"vsStatic",buffers:u},p=t.doubleSided?"none":"back",d=s.createRenderPipeline({label:`prepass ${r}`,layout:c,vertex:h,fragment:{module:o,entryPoint:"fsPrepass",targets:[{format:"rgba16float"},{format:"rg16float"}]},primitive:{topology:"triangle-list",cullMode:p},depthStencil:{format:"depth32float",depthWriteEnabled:!0,depthCompare:"greater"}}),f=s.createRenderPipeline({label:`main ${r}`,layout:c,vertex:h,fragment:{module:o,entryPoint:"fsMain",targets:[{format:"rgba16float"}]},primitive:{topology:"triangle-list",cullMode:p},depthStencil:{format:"depth32float",depthWriteEnabled:!1,depthCompare:"equal"}}),b=s.createRenderPipeline({label:`transparent ${r}`,layout:c,vertex:h,fragment:{module:o,entryPoint:"fsTransparent",targets:[{format:"rgba16float",blend:{color:{srcFactor:"one",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"triangle-list",cullMode:p},depthStencil:{format:"depth32float",depthWriteEnabled:!1,depthCompare:"greater"}}),v=this.settings.shadows,g=s.createRenderPipeline({label:`shadow ${r}`,layout:s.createPipelineLayout({bindGroupLayouts:[this.shadowLayout,this.objectLayout,n]}),vertex:{module:l,entryPoint:e?"vsShadowSkinned":"vsShadow",buffers:u},fragment:t.alphaMode==="mask"?{module:l,entryPoint:"fsShadowMask",targets:[]}:void 0,primitive:{topology:"triangle-list",cullMode:"none"},depthStencil:{format:"depth32float",depthWriteEnabled:!0,depthCompare:"less",depthBias:1,depthBiasSlopeScale:v.slopeBias,depthBiasClamp:.01}});return i={prepass:d,main:f,transparent:b,shadow:g},this.pipelines.set(r,i),i}render(e,t,r){let i=performance.now(),s=this.settings,n=this.device,o=this.dev.canvas,l=Math.min(globalThis.devicePixelRatio??1,s.maxDevicePixelRatio),c=Math.max(1,Math.floor((o.clientWidth||o.width)*l)),u=Math.max(1,Math.floor((o.clientHeight||o.height)*l));(o.width!==c||o.height!==u)&&(o.width=c,o.height=u);let h=Math.max(16,Math.round(c*s.renderScale)),p=Math.max(16,Math.round(u*s.renderScale));(!this.targets||this.targets.w!==h||this.targets.h!==p)&&(this.targets&&this.destroyTargets(this.targets),this.targets=this.makeTargets(h,p),this.frameBG=null,this.historyValid=!1);let d=this.targets;this.createShadowMap(),this.time+=r;let f=n.createCommandEncoder({label:"frame"});this.wind.update(r),this.particles.wind.set(this.wind.vector);let b=this.wind.aloft(this.sky.clouds.settings.altitude);this.sky.update(f,{camPos:t.position,dt:r,windAloft:[b[0],b[2]]}),this.sky.envVersion!==this.lastSkyVersion&&(this.ibl.update(this.sky.envCube,f),this.lastSkyVersion=this.sky.envVersion),t.updateMatrices();let v=h/p,g=s.taa.enabled?Math.max(1,s.taa.jitterSamples):1,x=this.frameIndex%g+1,w=s.taa.enabled?(Ct(x,2)-.5)*2/h:0,P=s.taa.enabled?(Ct(x,3)-.5)*2/p:0,S=M.perspectiveReversedInfinite(M.create(),t.fovY,v,t.near,w,P),k=M.perspectiveReversedInfinite(M.create(),t.fovY,v,t.near),T=M.perspectiveReversedInfinite(M.create(),t.viewmodelFovY,v,t.near*.25,w,P),G=M.perspectiveReversedInfinite(M.create(),t.viewmodelFovY,v,t.near*.25),U=M.multiply(M.create(),S,t.view),R=M.multiply(M.create(),k,t.view),L=M.multiply(M.create(),T,t.view),C=M.multiply(M.create(),G,t.view);this.historyValid||(M.copy(this.prevViewProj,R),M.copy(this.prevVmViewProj,C));let _=M.invert(M.create(),S),A=M.invert(M.create(),U),I=M.invert(M.create(),R),X=this.sky.sunDir,Y=this.sky.sunIlluminanceRGB(),J=this.sky.settings.sunAngularDiameter*Math.PI/360,te=s.shadows,N=te.enabled?gr(t,v,m.clone(X),te):null,V=this.fw;V.mat4(0,U),V.mat4(64,R),V.mat4(128,this.prevViewProj),V.mat4(192,L),V.mat4(256,C),V.mat4(320,this.prevVmViewProj),V.mat4(384,t.view),V.mat4(448,t.world),V.mat4(512,_),V.mat4(576,A),V.mat4(640,S),V.vec4(704,t.position[0],t.position[1],t.position[2],t.near),V.vec4(720,X[0],X[1],X[2],Math.cos(J)),V.vec4(736,Y[0],Y[1],Y[2],1),V.vec4(752,h,p,1/h,1/p),V.vec4(768,w,P,0,0);let ce=.06*this.sky.settings.sunIlluminance/Math.PI*Math.max(.05,Math.sin(Math.max(.03,X[1])))*s.fog.inscatter;if(V.vec4(784,s.fog.density,s.fog.heightFalloff,s.fog.baseHeight,s.fog.startDistance),V.vec4(800,ce*.62,ce*.75,ce,s.fog.mieG),V.vec4(816,this.time,r,this.frameIndex,s.ibl.intensity),V.vec4(832,N?N.viewProj.length:0,te.maxPenumbraTexels,Math.tan(J),te.blendFraction),N){V.vec4(848,N.splits[0]??1e9,N.splits[1]??1e9,N.splits[2]??1e9,N.splits[3]??1e9);for(let y=0;y<4;y++)V.mat4(864+y*64,N.viewProj[y]??M.create());V.vec4(1120,N.texelWorld[0]??1,N.texelWorld[1]??1,N.texelWorld[2]??1,N.texelWorld[3]??1),V.vec4(1216,N.depthRange[0]??1,N.depthRange[1]??1,N.depthRange[2]??1,N.depthRange[3]??1)}let D=this.skyVisParams;V.vec4(1136,D.min[0],D.min[1],D.min[2],D.cell),V.vec4(1152,D.size[0],D.size[1],D.size[2],D.enabled?1:0);let j=new Float32Array(1024),$=0;for(let y of e.lights){if(!y.enabled||$>=64||y.intensity<=0)continue;let z=$*16;j.set([y.position[0],y.position[1],y.position[2],y.range],z),j.set([y.color[0]*y.intensity,y.color[1]*y.intensity,y.color[2]*y.intensity,0],z+4);let E=y.spotOuter>0,O=m.normalize(m.create(),y.direction);j.set([O[0],O[1],O[2],Math.cos(y.spotOuter*Math.PI/180)],z+8),j.set([Math.cos(Math.min(y.spotInner,y.spotOuter)*Math.PI/180),y.radius,E?1:0,0],z+12),$++}n.queue.writeBuffer(this.lightBuf,0,j,0,Math.max(16,$*16)),V.vec4(1168,$,s.ibl.specularOcclusion,s.gtao.enabled?s.gtao.strength:0,te.normalBias),V.vec4(1184,this.ibl.mips-1,1,this.sky.settings.groundAlbedo,s.debugView),V.vec4(1200,s.viewmodelDepthSqueeze,0,0,0),V.vec4(1232,te.constantBias,te.slopeBias,Math.min(16,te.blockerSamples),Math.min(32,te.pcfSamples)),V.vec4(1248,s.ibl.occludedAmbient,s.ibl.groundBounce,s.ibl.viewmodelFill,0);let Z=this.wind;V.vec4(1264,Z.vector[0],Z.vector[2],Z.settings.foliageBend,Z.settings.turbulence);let F=this.sky.clouds.frameParams();V.vec4(1312,F[0],F[1],F[2],F[3]),V.vec4(1328,F[4],F[5],F[6],F[7]);let W=this.probeParams;V.vec4(1280,W.min[0],W.min[1],W.min[2],W.cell),V.vec4(1296,W.size[0],W.size[1],W.size[2],W.enabled&&s.gi.enabled?s.gi.intensity:0),n.queue.writeBuffer(this.frameBuf,0,V.buffer);let H=Lt(U),ue=[],Le=[],Be=0,ae=[...e.objects];this.ensureObjectCapacity(ae.length+1);let ie=this.objData,he=new Map,me=0,Ce=new Float32Array(12);for(let y of ae){if(!y.visible)continue;y._beginFrame();let z=me*ge/4;if(ie.set(y.transform,z),ie.set(y.prevTransform,z+16),M.normalMatrix12(Ce,y.transform),ie.set(Ce,z+32),ie[z+44]=(y.viewmodel?1:0)+(y.instances?4:0),ie[z+45]=y.id,he.set(y,me++),y.joints&&y.mesh.skinned&&this.updateSkin(y),y.instances&&(this.updateInstances(y),y.instanceCount===0)){me--,he.delete(y);continue}y.castShadow&&!y.viewmodel&&Le.push(y),y.viewmodel||Bt(H,y.worldBounds)?ue.push(y):Be++}me&&n.queue.writeBuffer(this.objBuf,0,ie,0,me*ge/4),this.stats.objects=ue.length,this.stats.culled=Be;let Re=0,_e=0,Ve=y=>y._skin?this.skinBG(y):y._inst?this.instBG(y):this.staticObjectBG,Pe=(y,z)=>{y.setBindGroup(1,Ve(z),[he.get(z)*ge]),y.setBindGroup(2,z.material.getBindGroup(this.dev,this.textures,this.materialLayoutFor(z.material))),y.setVertexBuffer(0,z.mesh.vertexBuffer),z.mesh.skinBuffer&&z._skin&&y.setVertexBuffer(1,z.mesh.skinBuffer),y.setIndexBuffer(z.mesh.indexBuffer,"uint32");let E=z.instances?z.instanceCount:1;y.drawIndexed(z.mesh.indexCount,E),Re++,_e+=z.mesh.indexCount/3*E};if(N){let y=new Float32Array(256);for(let E=0;E<N.viewProj.length;E++)y.set(N.viewProj[E],E*64);n.queue.writeBuffer(this.cascadeBuf,0,y);let z=n.createBindGroup({layout:this.shadowLayout,entries:[{binding:0,resource:{buffer:this.cascadeBuf,size:64}}]});for(let E=0;E<N.viewProj.length;E++){let O=f.beginRenderPass({label:`shadow ${E}`,colorAttachments:[],depthStencilAttachment:{view:this.shadowMap.createView({dimension:"2d",baseArrayLayer:E,arrayLayerCount:1}),depthLoadOp:"clear",depthStoreOp:"store",depthClearValue:1}});O.setBindGroup(0,z,[E*256]);let q=Lt(N.viewProj[E]);for(let K of Le)K.material.alphaMode!=="blend"&&Bt(q,K.worldBounds)&&(O.setPipeline(this.getPipelines(!!K._skin,K.material).shadow),Pe(O,K));O.end()}}let At=this.getFrameBG(d),Ut=ue.filter(y=>y.material.alphaMode!=="blend"),Qt=ue.filter(y=>y.material.alphaMode==="blend");Ut.sort((y,z)=>Number(z.viewmodel)-Number(y.viewmodel)||y.material.id-z.material.id);let Zt=t.position;Qt.sort((y,z)=>m.distance(M.getTranslation(m.create(),z.transform),Zt)-m.distance(M.getTranslation(m.create(),y.transform),Zt));{let y=f.beginRenderPass({label:"prepass",colorAttachments:[{view:d.normal.createView(),loadOp:"clear",storeOp:"store",clearValue:[0,1,0,1]},{view:d.velocity.createView(),loadOp:"clear",storeOp:"store",clearValue:[0,0,0,0]}],depthStencilAttachment:{view:d.depth.createView(),depthLoadOp:"clear",depthStoreOp:"store",depthClearValue:0}});y.setBindGroup(0,At);for(let z of Ut)y.setPipeline(this.getPipelines(!!z._skin,z.material).prepass),Pe(y,z);y.end()}if(s.gtao.enabled){let y=s.gtao,z=new Float32Array(44);z.set(_,0),z.set(t.view,16),z.set([h,p,1/h,1/p],32),z.set([y.radius,y.falloff,y.power,this.frameIndex],36),z.set([k[0],k[5],y.steps,y.slices],40);let E=f.beginComputePass({label:"gtao"});E.setPipeline(this.gtaoPipe),E.setBindGroup(0,n.createBindGroup({layout:this.gtaoPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("gtao",z)}},{binding:1,resource:d.depth.createView()},{binding:2,resource:d.normal.createView()},{binding:3,resource:(y.blur?d.aoRaw:d.ao).createView()}]})),E.dispatchWorkgroups(Math.ceil(h/8),Math.ceil(p/8)),y.blur&&(E.setPipeline(this.aoBlurPipe),E.setBindGroup(0,n.createBindGroup({layout:this.aoBlurPipe.getBindGroupLayout(0),entries:[{binding:0,resource:d.aoRaw.createView()},{binding:1,resource:d.depth.createView()},{binding:2,resource:d.ao.createView()}]})),E.dispatchWorkgroups(Math.ceil(h/8),Math.ceil(p/8))),E.end()}this.decals.upload(),this.particles.update(r),this.particles.upload(t.position);{let y=f.beginRenderPass({label:"main",colorAttachments:[{view:d.hdr.createView(),loadOp:"clear",storeOp:"store",clearValue:[0,0,0,1]}],depthStencilAttachment:{view:d.depth.createView(),depthReadOnly:!0}});y.setBindGroup(0,At);for(let z of Ut)y.setPipeline(this.getPipelines(!!z._skin,z.material).main),Pe(y,z);y.setPipeline(this.skyPipe),y.draw(3),this.decals.draw(y),y.setBindGroup(0,At);for(let z of Qt)y.setPipeline(this.getPipelines(!!z._skin,z.material).transparent),Pe(y,z);this.particles.draw(y,d.depth),y.end()}let Xr=d.history[this.frameIndex&1],Jt=d.history[this.frameIndex+1&1],Xe=d.hdr;if(s.taa.enabled){let y=new Float32Array(44);y.set(I,0),y.set(this.prevViewProj,16),y.set([h,p,1/h,1/p],32),y.set([s.taa.feedbackMin,s.taa.feedbackMax,s.taa.velocityWeight,this.historyValid?0:1],36),y.set([w*.5,-P*.5,0,0],40);let z=f.beginComputePass({label:"taa"});z.setPipeline(this.taaPipe),z.setBindGroup(0,n.createBindGroup({layout:this.taaPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("taa",y)}},{binding:1,resource:d.hdr.createView()},{binding:2,resource:Xr.createView()},{binding:3,resource:d.velocity.createView()},{binding:4,resource:d.depth.createView()},{binding:5,resource:this.linearClamp},{binding:6,resource:Jt.createView()},{binding:7,resource:{buffer:this.exposureBuf}}]})),z.dispatchWorkgroups(Math.ceil(h/8),Math.ceil(p/8)),z.end(),Xe=Jt}if(s.dof.enabled&&s.debugView===0){let y=s.dof,z=p/(2*Math.tan(t.fovY/2)),E=p/(2*Math.tan(t.viewmodelFovY/2)),O=new Float32Array([h,p,1/h,1/p,y.apertureMm/1e3,z,E,y.maxBlurPx*(p/1080),t.near,t.near*.25,s.viewmodelDepthSqueeze,1,y.focusDistance,y.autoFocus?1:0,y.overrideDistance,y.overrideWeight,Math.min(r,.1),y.focusSpeed,y.minFocus,1.6/Math.max(.25,y.quality)]),q=this.uniform("dof",O),K=f.beginComputePass({label:"dof"});K.setPipeline(this.dofFocusPipe),K.setBindGroup(0,n.createBindGroup({layout:this.dofFocusPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:q}},{binding:1,resource:d.depth.createView()},{binding:2,resource:{buffer:this.dofState}}]})),K.dispatchWorkgroups(1),K.setPipeline(this.dofGatherPipe),K.setBindGroup(0,n.createBindGroup({layout:this.dofGatherPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:q}},{binding:1,resource:Xe.createView()},{binding:2,resource:d.depth.createView()},{binding:3,resource:{buffer:this.dofState}},{binding:4,resource:d.dof.createView()}]})),K.dispatchWorkgroups(Math.ceil(h/8),Math.ceil(p/8)),K.end(),Xe=d.dof}{let y=s.motionBlur,z=y.shutterAngle/360,E=new Float32Array([h,p,1/h,1/p,z,y.maxPixels,y.samples,y.enabled?1:0]),O=f.beginComputePass({label:"motionblur"});O.setPipeline(this.mbPipe),O.setBindGroup(0,n.createBindGroup({layout:this.mbPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("mb",E)}},{binding:1,resource:Xe.createView()},{binding:2,resource:d.velocity.createView()},{binding:3,resource:d.depth.createView()},{binding:4,resource:this.linearClamp},{binding:5,resource:d.mb.createView()}]})),O.dispatchWorkgroups(Math.ceil(h/8),Math.ceil(p/8)),O.end()}let Ee=d.mb;{let y=s.exposure,z=-10,E=40,O=y.ev100;y.mode==="camera"&&(O=rr(t.aperture,t.shutter,t.iso));let q=f.beginComputePass({label:"exposure"});q.setPipeline(this.histPipe),q.setBindGroup(0,n.createBindGroup({layout:this.histPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("hist",new Float32Array([h,p,1/h,1/p,z,E,y.centerWeight,0]))}},{binding:1,resource:Ee.createView()},{binding:2,resource:{buffer:this.histBuf}},{binding:3,resource:{buffer:this.exposureBuf}}]})),q.dispatchWorkgroups(Math.ceil(h/32),Math.ceil(p/32)),q.setPipeline(this.exposurePipe),q.setBindGroup(0,n.createBindGroup({layout:this.exposurePipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("expo",new Float32Array([y.mode==="auto"?0:1,O,y.compensation,Math.min(r,.1),y.minEv100,y.maxEv100,y.speedUp,y.speedDown,y.lowPercent,y.highPercent,z,E]))}},{binding:1,resource:{buffer:this.histBuf}},{binding:2,resource:{buffer:this.exposureBuf}}]})),q.dispatchWorkgroups(1),q.end()}let Se=s.bloom;if(Se.enabled&&d.bloomDown.length>1){let y=f.beginComputePass({label:"bloom"});y.setPipeline(this.bloomDownPipe);let z=Ee;for(let O=0;O<d.bloomDown.length;O++){let q=d.bloomDown[O];y.setBindGroup(0,n.createBindGroup({layout:this.bloomDownPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform(`bd${O}`,new Float32Array([1/z.width,1/z.height,0,0,O===0?1:0,Se.clamp,0,0]))}},{binding:1,resource:z.createView()},{binding:2,resource:this.linearClamp},{binding:3,resource:q.createView()}]})),y.dispatchWorkgroups(Math.ceil(q.width/8),Math.ceil(q.height/8)),z=q}y.setPipeline(this.bloomUpPipe);let E=d.bloomDown.length;for(let O=E-2;O>=0;O--){let q=O===E-2?d.bloomDown[E-1]:d.bloomUp[O+1],K=d.bloomUp[O];y.setBindGroup(0,n.createBindGroup({layout:this.bloomUpPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform(`bu${O}`,new Float32Array([1/q.width,1/q.height,0,0,Se.radius,0,0,0]))}},{binding:1,resource:q.createView()},{binding:2,resource:d.bloomDown[O].createView()},{binding:3,resource:this.linearClamp},{binding:4,resource:K.createView()}]})),y.dispatchWorkgroups(Math.ceil(K.width/8),Math.ceil(K.height/8))}y.end()}if(s.debugView>0){let y=f.beginComputePass({label:"debug"});y.setPipeline(this.debugPipe),y.setBindGroup(0,n.createBindGroup({layout:this.debugPipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("dbg",new Float32Array([s.debugView,t.near,h,p]))}},{binding:1,resource:d.normal.createView()},{binding:2,resource:d.ao.createView()},{binding:3,resource:d.velocity.createView()},{binding:4,resource:d.depth.createView()},{binding:5,resource:Ee.createView()},{binding:6,resource:{buffer:this.exposureBuf}},{binding:7,resource:d.debug.createView()}]})),y.dispatchWorkgroups(Math.ceil(h/8),Math.ceil(p/8)),y.end()}{let y=s.lens,z=s.grade,E=s.sensor,O=E.isoCoupled?Math.pow(Math.max(t.iso,50)/100,.25):1,q=new Float32Array([c,u,1/c,1/u,y.distortion,y.distortion2,y.chromaticAberration,y.fillZoom,y.naturalVignette,y.vignette,y.vignetteRoundness,t.fovY,Se.enabled?Se.intensity:0,0,0,0,E.readNoise,E.shotNoise,E.enabled?O*E.gain:0,this.frameIndex%1024,z.contrast,z.saturation,z.temperature,z.tint,z.lift,z.gamma,z.gain,Ni[z.tonemapper],y.sharpen,z.dither,s.debugView,z.exposureBias]),K=Se.enabled&&d.bloomUp.length>1?d.bloomUp[0]:Ee,Ye=f.beginRenderPass({label:"composite",colorAttachments:[{view:this.outputView(c,u),loadOp:"clear",storeOp:"store",clearValue:[0,0,0,1]}]});Ye.setPipeline(this.compositePipe),Ye.setBindGroup(0,n.createBindGroup({layout:this.compositePipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform("composite",q)}},{binding:1,resource:Ee.createView()},{binding:2,resource:K.createView()},{binding:3,resource:this.linearClamp},{binding:5,resource:d.debug.createView()}]})),Ye.draw(3),Ye.end()}n.queue.submit([f.finish()]),M.copy(this.prevViewProj,R),M.copy(this.prevVmViewProj,C);for(let y of ae)y.visible&&y._endFrame();for(let y of this.skinnedObjects)this.rotateSkin(y);this.historyValid=!0,this.frameIndex++,this.stats.drawCalls=Re,this.stats.triangles=_e,this.stats.frameMs=performance.now()-i}offscreenOut=null;outputView(e,t){return this.dev.offscreen?((!this.offscreenOut||this.offscreenOut.width!==e||this.offscreenOut.height!==t)&&(this.offscreenOut?.destroy(),this.offscreenOut=this.device.createTexture({size:[e,t],format:"rgba8unorm",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC,label:"offscreen.out"})),this.offscreenOut.createView()):this.dev.context.getCurrentTexture().createView()}async readback(){let e=this.offscreenOut;if(!e)throw new Error("readback requires Renderer.create(canvas, { offscreen: true })");let t=Math.ceil(e.width*4/256)*256,r=this.device.createBuffer({size:t*e.height,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),i=this.device.createCommandEncoder();i.copyTextureToBuffer({texture:e},{buffer:r,bytesPerRow:t},[e.width,e.height]),this.device.queue.submit([i.finish()]),await r.mapAsync(GPUMapMode.READ);let s=new Uint8Array(r.getMappedRange()),n=new Uint8Array(e.width*e.height*4);for(let o=0;o<e.height;o++)n.set(s.subarray(o*t,o*t+e.width*4),o*e.width*4);return r.unmap(),r.destroy(),{width:e.width,height:e.height,data:n}}resetHistory(){this.historyValid=!1}updateSkin(e){let t=e.joints,r=t.length/16;if(!e._skin||e._skin.count!==r){let i=Math.max(64,t.byteLength);e._skin?.cur.destroy(),e._skin?.prev.destroy();let s=this.dev.createBuffer(i,GPUBufferUsage.STORAGE,"joints"),n=this.dev.createBuffer(i,GPUBufferUsage.STORAGE,"joints.prev",t);e._skin={cur:s,prev:n,bg:null,count:r},this.skinnedObjects.add(e)}this.device.queue.writeBuffer(e._skin.cur,0,t)}updateInstances(e){let t=e.instances,r=Math.max(64,e.instanceCount*64);if(!e._inst||e._inst.cap<r){e._inst?.buf.destroy();let i=Math.max(r,(e._inst?.cap??0)*2);e._inst={buf:this.dev.createBuffer(i,GPUBufferUsage.STORAGE,"instances"),bg:null,cap:i},e.instancesDirty=!0}e.instancesDirty&&e.instanceCount>0&&(this.device.queue.writeBuffer(e._inst.buf,0,t,0,e.instanceCount*16),e.instancesDirty=!1)}instBG(e){let t=e._inst;return t.bg||(t.bg=this.makeObjectBG(t.buf,t.buf)),t.bg}skinBG(e){let t=e._skin;return t.bg||(t.bg=this.makeObjectBG(t.cur,t.prev)),t.bg}rotateSkin(e){!e._skin||!e.joints||this.device.queue.writeBuffer(e._skin.prev,0,e.joints)}};var ji=1;function Ge(a){return{id:ji++,name:a}}var yt=class{nextEntity=1;alive=new Set;stores=new Map;names=new Map;onDespawn=[];onRemove=new Map;spawn(e){let t=this.nextEntity++;return this.alive.add(t),e&&this.names.set(t,e),t}despawn(e){if(this.alive.has(e)){for(let t of this.onDespawn)t(e);for(let[t,r]of this.stores)if(r.has(e)){let i=r.get(e);r.delete(e);for(let s of this.onRemove.get(t)??[])s(e,i)}this.alive.delete(e),this.names.delete(e)}}isAlive(e){return this.alive.has(e)}nameOf(e){return this.names.get(e)??`entity#${e}`}get entityCount(){return this.alive.size}add(e,t,r){let i=this.stores.get(t.id);return i||(i=new Map,this.stores.set(t.id,i)),i.set(e,r),r}get(e,t){return this.stores.get(t.id)?.get(e)}require(e,t){let r=this.get(e,t);if(r===void 0)throw new Error(`${this.nameOf(e)} has no ${t.name}`);return r}has(e,t){return this.stores.get(t.id)?.has(e)??!1}remove(e,t){let r=this.stores.get(t.id);if(!r?.has(e))return;let i=r.get(e);r.delete(e);for(let s of this.onRemove.get(t.id)??[])s(e,i)}onRemoved(e,t){let r=this.onRemove.get(e.id)??[];r.push(t),this.onRemove.set(e.id,r)}*query(...e){let t=e.map(i=>this.stores.get(i.id));if(t.some(i=>!i))return;let r=0;for(let i=1;i<t.length;i++)t[i].size<t[r].size&&(r=i);for(let i of[...t[r].keys()]){let s=[i],n=!0;for(let o of t){if(!o.has(i)){n=!1;break}s.push(o.get(i))}n&&(yield s)}}entities(){return this.alive.values()}};var wt=class{position=m.create();rotation=B.create();scale=m.create(1,1,1);parent=null;local=M.create();world=M.create();version=0;worldVersion=-1;parentVersion=-1;constructor(e,t,r){e&&m.copy(this.position,e),t&&B.copy(this.rotation,t),r&&m.copy(this.scale,r)}touch(){this.version++}setPosition(e,t,r){return m.set(this.position,e,t,r),this.version++,this}setRotation(e){return B.copy(this.rotation,e),this.version++,this}setEuler(e,t,r=0){return B.fromEuler(this.rotation,e,t,r),this.version++,this}get stamp(){return this.version+(this.parent?this.parent.stamp*31:0)}getWorld(){let e=this.parent?this.parent.stamp:0;return(this.worldVersion!==this.version||this.parentVersion!==e)&&(M.fromRotationTranslationScale(this.local,this.rotation,this.position,this.scale),this.parent?M.multiply(this.world,this.parent.getWorld(),this.local):M.copy(this.world,this.local),this.worldVersion=this.version,this.parentVersion=e),this.world}worldPosition(e=m.create()){return M.getTranslation(e,this.getWorld())}worldRotation(e=B.create()){return M.getRotation(e,this.getWorld())}forward(e=m.create()){let t=this.getWorld();return m.normalize(e,m.set(e,-t[8],-t[9],-t[10]))}right(e=m.create()){let t=this.getWorld();return m.normalize(e,m.set(e,t[0],t[1],t[2]))}up(e=m.create()){let t=this.getWorld();return m.normalize(e,m.set(e,t[4],t[5],t[6]))}transformPoint(e,t=m.create()){return m.transformMat4(t,e,this.getWorld())}},Ae=Ge("Transform");var Ue=class{engine;entity;enabled=!0;_started=!1;get transform(){return this.engine.world.require(this.entity,Ae)}get time(){return this.engine.time}get input(){return this.engine.input}get physics(){return this.engine.physics}get audio(){return this.engine.audio}get renderer(){return this.engine.renderer}getComponent(e){return this.engine.world.get(this.entity,e)}addComponent(e,t){return this.engine.world.add(this.entity,e,t)}tune(e,t){this.engine.tuning.number(t.group??this.constructor.name,this,e,t)}},qe=Ge("Scripts");var Mt=class{down=new Set;pressed=new Set;released=new Set;mouseDown=new Set;mousePressed=new Set;mouseReleased=new Set;padPrev=[];mouseDX=0;mouseDY=0;wheel=0;sensitivity=.075;invertY=!1;bindings=new Map;locked=!1;gamepad=null;padLookSpeed=160;deadzone=.12;target;constructor(e){this.target=e,addEventListener("keydown",t=>{t.repeat||(this.down.add(t.code),this.pressed.add(t.code),this.locked&&["Tab","Space","KeyF","Backquote"].includes(t.code)&&t.preventDefault())}),addEventListener("keyup",t=>{this.down.delete(t.code),this.released.add(t.code)}),addEventListener("blur",()=>{this.down.clear(),this.mouseDown.clear()}),e.addEventListener("mousedown",t=>{this.mouseDown.add(t.button),this.mousePressed.add(t.button)}),addEventListener("mouseup",t=>{this.mouseDown.delete(t.button),this.mouseReleased.add(t.button)}),addEventListener("mousemove",t=>{this.locked&&(this.mouseDX+=t.movementX,this.mouseDY+=t.movementY)}),addEventListener("wheel",t=>{this.wheel+=Math.sign(t.deltaY)},{passive:!0}),e.addEventListener("contextmenu",t=>t.preventDefault()),document.addEventListener("pointerlockchange",()=>{this.locked=document.pointerLockElement===this.target}),this.defaultBindings()}async lock(){try{await this.target.requestPointerLock.call(this.target,{unadjustedMovement:!0})}catch{try{await this.target.requestPointerLock()}catch{}}}unlock(){document.exitPointerLock()}defaultBindings(){let e=(t,r)=>this.bindings.set(t,r);e("forward",{keys:["KeyW"]}),e("back",{keys:["KeyS"]}),e("left",{keys:["KeyA"]}),e("right",{keys:["KeyD"]}),e("sprint",{keys:["ShiftLeft"],gamepadButtons:[10]}),e("crouch",{keys:["KeyC","ControlLeft"],gamepadButtons:[1]}),e("jump",{keys:["Space"],gamepadButtons:[0]}),e("fire",{mouse:[0],gamepadButtons:[7]}),e("aim",{mouse:[2],gamepadButtons:[6]}),e("reload",{keys:["KeyR"],gamepadButtons:[2]}),e("fireMode",{keys:["KeyX"],gamepadButtons:[12]}),e("leanLeft",{keys:["KeyQ"],gamepadButtons:[4]}),e("leanRight",{keys:["KeyE"],gamepadButtons:[5]}),e("earpro",{keys:["KeyV"]}),e("camera",{keys:["KeyH"]}),e("tuning",{keys:["F1","Backquote"]}),e("holdBreath",{keys:["AltLeft"],gamepadButtons:[11]})}padButton(e){return!!this.gamepad?.buttons[e]?.pressed}action(e){let t=this.bindings.get(e);return t?(t.keys?.some(r=>this.down.has(r))??!1)||(t.mouse?.some(r=>this.mouseDown.has(r))??!1)||(t.gamepadButtons?.some(r=>this.padButton(r))??!1):!1}actionPressed(e){let t=this.bindings.get(e);return t?(t.keys?.some(r=>this.pressed.has(r))??!1)||(t.mouse?.some(r=>this.mousePressed.has(r))??!1)||(t.gamepadButtons?.some(r=>this.padButton(r)&&!this.padPrev[r])??!1):!1}actionReleased(e){let t=this.bindings.get(e);return t?(t.keys?.some(r=>this.released.has(r))??!1)||(t.mouse?.some(r=>this.mouseReleased.has(r))??!1):!1}key(e){return this.down.has(e)}keyPressed(e){return this.pressed.has(e)}moveAxis(){let e=(this.action("right")?1:0)-(this.action("left")?1:0),t=(this.action("forward")?1:0)-(this.action("back")?1:0);if(this.gamepad){let i=this.gamepad.axes[0]??0,s=this.gamepad.axes[1]??0;Math.hypot(i,s)>this.deadzone&&(e+=i,t-=s)}let r=Math.hypot(e,t);return r>1&&(e/=r,t/=r),{x:e,y:t}}lookDelta(e){let t=this.sensitivity*Math.PI/180,r=-this.mouseDX*t,i=-this.mouseDY*t*(this.invertY?-1:1);if(this.gamepad){let s=this.gamepad.axes[2]??0,n=this.gamepad.axes[3]??0,o=this.padLookSpeed*Math.PI/180*e;Math.abs(s)>this.deadzone&&(r-=Math.sign(s)*(Math.abs(s)-this.deadzone)/(1-this.deadzone)*o),Math.abs(n)>this.deadzone&&(i-=Math.sign(n)*(Math.abs(n)-this.deadzone)/(1-this.deadzone)*o)}return{yaw:r,pitch:i}}rumble(e,t,r){this.gamepad?.vibrationActuator?.playEffect?.("dual-rumble",{duration:r,strongMagnitude:Math.min(1,e),weakMagnitude:Math.min(1,t)})}poll(){let e=navigator.getGamepads?.()??[];this.gamepad=e.find(t=>t&&t.connected)??null}endFrame(){this.pressed.clear(),this.released.clear(),this.mousePressed.clear(),this.mouseReleased.clear(),this.mouseDX=0,this.mouseDY=0,this.wheel=0,this.gamepad&&(this.padPrev=this.gamepad.buttons.map(e=>e.pressed))}};var de={gl:"fondaineGL",vorp:"vorp",oaxis:"oAxis"},Pt=class a{hub;storageKey;module;constructor(e="fondaine.tuning",t=de.gl,r){this.storageKey=e,this.module=t,this.hub=r??{params:[],listeners:[]}}get params(){return this.hub.params}scope(e){return new a(this.storageKey,e,this.hub)}get modules(){return[...new Set(this.hub.params.map(e=>e.module))]}k(e,t){return`${this.module}:${e}.${t}`}number(e,t,r,i){return this.hub.params.push({module:this.module,group:e,key:this.k(e,r),label:i.label??r,kind:"number",min:i.min,max:i.max,step:i.step??(i.max-i.min)/200,unit:i.unit,help:i.help,get:()=>t[r],set:s=>{t[r]=Number(s),i.onChange?.(Number(s)),this.emit()}}),this}bool(e,t,r,i={}){return this.hub.params.push({module:this.module,group:e,key:this.k(e,r),label:i.label??r,kind:"bool",help:i.help,get:()=>t[r],set:s=>{t[r]=!!s,i.onChange?.(!!s),this.emit()}}),this}choice(e,t,r,i,s={}){return this.hub.params.push({module:this.module,group:e,key:this.k(e,r),label:s.label??r,kind:"enum",options:i,help:s.help,get:()=>t[r],set:n=>{t[r]=String(n),s.onChange?.(String(n)),this.emit()}}),this}arrayValue(e,t,r,i){return this.hub.params.push({module:this.module,group:e,key:this.k(e,i.key),label:i.label,kind:"number",min:i.min,max:i.max,step:i.step??(i.max-i.min)/200,unit:i.unit,help:i.help,get:()=>t[r],set:s=>{t[r]=Number(s),i.onChange?.(),this.emit()}}),this}groups(e=this.module){return[...new Set(this.hub.params.filter(t=>t.module===e).map(t=>t.group))]}unregister(e,t=this.module){for(let r=this.hub.params.length-1;r>=0;r--)this.hub.params[r].module===t&&this.hub.params[r].group===e&&this.hub.params.splice(r,1)}onChange(e){this.hub.listeners.push(e)}emit(){for(let e of this.hub.listeners)e()}snapshot(e=this.module){let t={};for(let r of this.hub.params)(e==="*"||r.module===e)&&(t[r.key]=r.get());return t}apply(e){for(let t of this.hub.params)t.key in e&&t.set(e[t.key])}save(e="default",t=this.module){try{localStorage.setItem(`${this.storageKey}.${t}.${e}`,JSON.stringify(this.snapshot(t)))}catch{}}load(e="default",t=this.module){try{let r=localStorage.getItem(`${this.storageKey}.${t}.${e}`);return r?(this.apply(JSON.parse(r)),!0):!1}catch{return!1}}exportJSON(e=this.module){return JSON.stringify(this.snapshot(e),null,2)}};var Wi=`
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
`,St=class{constructor(e,t="fondaine"){this.tuning=e;if(!document.getElementById("fdui-css")){let s=document.createElement("style");s.id="fdui-css",s.textContent=Wi,document.head.appendChild(s)}this.root=document.createElement("div"),this.root.className="fdui",this.root.style.display="none",this.root.innerHTML=`<header><span class="logo">/f</span><b>${t}</b><span style="margin-left:auto;color:#6f747d">F1 to close</span></header>`,this.statsEl=document.createElement("div"),this.statsEl.className="stats",this.mods=document.createElement("div"),this.mods.className="mods",this.tabs=document.createElement("div"),this.tabs.className="tabs",this.body=document.createElement("div"),this.body.className="body";let r=document.createElement("footer"),i=(s,n)=>{let o=document.createElement("button");o.textContent=s,o.onclick=n,r.appendChild(o)};i("Save",()=>e.save("default",this.module)),i("Load",()=>{e.load("default",this.module),this.refresh()}),i("Export JSON",()=>{let s=new Blob([e.exportJSON(this.module)],{type:"application/json"}),n=document.createElement("a");n.href=URL.createObjectURL(s),n.download=`${this.module}-tuning.json`,n.click()}),i("Import JSON",()=>{let s=document.createElement("input");s.type="file",s.accept=".json",s.onchange=async()=>{let n=s.files?.[0];n&&(e.apply(JSON.parse(await n.text())),this.refresh())},s.click()}),this.root.append(this.statsEl,this.mods,this.tabs,this.body,r),document.body.appendChild(this.root);for(let s of["keydown","mousedown","wheel"])this.root.addEventListener(s,n=>n.stopPropagation())}root;body;statsEl;tabs;mods;module="";group="";inputs=new Map;visible=!1;statsText=()=>"";toggle(e=!this.visible){this.visible=e,this.root.style.display=e?"flex":"none",e&&this.rebuild()}rebuild(){let e=this.tuning.modules;(!this.module||!e.includes(this.module))&&(this.module=e[0]??""),this.mods.innerHTML="";for(let r of e){let i=document.createElement("button");i.textContent=r,r===this.module&&(i.className="on"),i.onclick=()=>{this.module=r,this.group="",this.rebuild()},this.mods.appendChild(i)}let t=this.tuning.groups(this.module);(!this.group||!t.includes(this.group))&&(this.group=t[0]??""),this.tabs.innerHTML="";for(let r of t){let i=document.createElement("button");i.textContent=r,r===this.group&&(i.className="on"),i.onclick=()=>{this.group=r,this.rebuild()},this.tabs.appendChild(i)}this.body.innerHTML="",this.inputs.clear();for(let r of this.tuning.params.filter(i=>i.module===this.module&&i.group===this.group))this.body.appendChild(this.row(r))}row(e){let t=document.createElement("div");t.className="row";let r=document.createElement("label");if(r.textContent=e.unit?`${e.label} (${e.unit})`:e.label,r.title=e.help??e.key,t.appendChild(r),e.kind==="number"){let i=document.createElement("input");i.type="range",i.min=String(e.min),i.max=String(e.max),i.step=String(e.step??.01);let s=document.createElement("input");s.type="number",s.step=String(e.step??.01);let n=()=>{let o=Number(e.get());i.value=String(o),s.value=String(+o.toPrecision(5))};i.oninput=()=>{e.set(Number(i.value)),s.value=String(+Number(i.value).toPrecision(5))},s.onchange=()=>{e.set(Number(s.value)),i.value=s.value},n(),this.inputs.set(e.key,n),t.append(i,s)}else if(e.kind==="bool"){let i=document.createElement("input");i.type="checkbox",i.checked=!!e.get(),i.onchange=()=>e.set(i.checked),this.inputs.set(e.key,()=>{i.checked=!!e.get()}),t.append(i,document.createElement("span"))}else{let i=document.createElement("select");for(let s of e.options??[]){let n=document.createElement("option");n.value=s,n.textContent=s,i.appendChild(n)}i.value=String(e.get()),i.onchange=()=>e.set(i.value),this.inputs.set(e.key,()=>{i.value=String(e.get())}),t.append(i,document.createElement("span"))}if(e.help){let i=document.createElement("div");i.className="help",i.textContent=e.help,t.appendChild(i)}return t}refresh(){for(let e of this.inputs.values())e()}update(){this.visible&&(this.statsEl.textContent=this.statsText())}};var Yt=(r=>(r[r.Sphere=0]="Sphere",r[r.Box=1]="Box",r[r.Capsule=2]="Capsule",r))(Yt||{}),Kt=class{constructor(e,t,r,i){this.p=e;this.id=t;this.radius=r;this.height=i}setPosition(e,t,r){this.p.ex.fp_character_set_position(this.id,e,t,r)}move(e,t,r){let i=this.p.ex.fp_character_move(this.id,e,t,r),s=this.p.result(8);return{position:m.create(s[0],s[1],s[2]),grounded:(i&1)!==0,ceiling:(i&2)!==0,wall:(i&4)!==0,groundNormal:m.create(s[3],s[4],s[5]),groundMaterial:s[6]}}setHeight(e){let t=this.p.ex.fp_character_set_height(this.id,e)===1;return t&&(this.height=e),t}remove(){this.p.ex.fp_character_remove(this.id)}},Xt=class{constructor(e,t){this.p=e;this.id=t}setTransform(e,t=[0,0,0,1]){this.p.ex.fp_body_set_transform(this.id,e[0],e[1],e[2],t[0],t[1],t[2],t[3])}setVelocity(e,t=[0,0,0]){this.p.ex.fp_body_set_velocity(this.id,e[0],e[1],e[2],t[0],t[1],t[2])}applyImpulse(e,t){this.p.ex.fp_body_apply_impulse(this.id,e[0],e[1],e[2],t[0],t[1],t[2])}remove(){this.p.ex.fp_body_remove(this.id)}state(){return this.p.bodyState(this.id)}get alive(){return this.state()[0]>.5}},kt=class a{ex;stride=15;onProjectileHit=[];onContact=[];constructor(e){this.ex=e,this.stride=e.fp_body_stride?.()??15}static async load(e){let t=await(await fetch(e)).arrayBuffer();return a.fromBytes(t)}static async fromBytes(e){let t=await WebAssembly.compile(e),r={};for(let s of WebAssembly.Module.imports(t))r[s.module]??={},r[s.module][s.name]=s.kind==="function"?()=>0:void 0;let i=await WebAssembly.instantiate(t,r);return new a(i.exports)}f32(e,t){return new Float32Array(this.ex.memory.buffer,e,t)}result(e){return this.f32(this.ex.fp_result_ptr(),e)}withF32(e,t){let r=e.length*4,i=this.ex.fp_alloc(r);this.f32(i,e.length).set(e);try{return t(i)}finally{this.ex.fp_free(i,r)}}setMaterial(e,t){this.ex.fp_set_material(e,t.friction??.6,t.restitution??.2,t.ricochetAngleDeg??0,t.ricochetEnergyKeep??.3)}reset(){this.ex.fp_world_reset()}staticMeshes=[];addStaticMesh(e,t,r){this.staticMeshes.push({positions:Float32Array.from(e),indices:Uint32Array.from(t),material:r});let i=e.length/3,s=t.length,n=i*12,o=s*4,l=this.ex.fp_alloc(n),c=this.ex.fp_alloc(o);this.f32(l,e.length).set(e),new Uint32Array(this.ex.memory.buffer,c,s).set(t);let u=this.ex.fp_add_static_mesh(l,i,c,s,r);return this.ex.fp_free(l,n),this.ex.fp_free(c,o),u}addGeometry(e,t,r){let i=e.positions,s=new Float32Array(i.length),n=m.create();for(let o=0;o<i.length;o+=3)m.transformMat4(n,i.subarray(o,o+3),t),s.set(n,o);return this.addStaticMesh(s,e.indices,r)}build(){this.ex.fp_build()}raycast(e,t,r,i=!0){if(!this.ex.fp_raycast(e[0],e[1],e[2],t[0],t[1],t[2],r,i?1:0))return null;let n=this.result(10);return{t:n[0],point:m.create(n[1],n[2],n[3]),normal:m.create(n[4],n[5],n[6]),material:n[7],triangle:n[8],body:n[9]}}raycastBatch(e,t){let r=e.length/6,i=this.ex.fp_alloc(r*4),s=this.withF32(e,n=>(this.ex.fp_raycast_batch(n,r,t,i),this.f32(i,r).slice()));return this.ex.fp_free(i,r*4),s}bakeSkyVisibility(e,t,r,i,s,n=48,o=60){let l=r*i*s,c=this.ex.fp_alloc(l*4);this.ex.fp_bake_sky_visibility(e[0],e[1],e[2],t,r,i,s,n,o,c);let u=this.f32(c,l).slice();return this.ex.fp_free(c,l*4),u}bakeGI(e){let t=e.nx*e.ny*e.nz,r=t*12*4,i=108,s=Math.max(4,e.albedo.length*4),n=this.ex.fp_alloc(r),o=this.ex.fp_alloc(i),l=this.ex.fp_alloc(s);this.f32(o,27).set(Array.from(e.skySH).slice(0,27)),this.f32(l,e.albedo.length).set(e.albedo);let c=this.ex.fp_bake_gi(e.min[0],e.min[1],e.min[2],e.cell,e.nx,e.ny,e.nz,e.rays??192,e.passes??3,e.sunDir[0],e.sunDir[1],e.sunDir[2],e.sunRGB[0],e.sunRGB[1],e.sunRGB[2],o,l,Math.floor(e.albedo.length/3),e.maxDist??400,n),u=this.f32(n,t*12).slice();return this.ex.fp_free(n,r),this.ex.fp_free(o,i),this.ex.fp_free(l,s),{data:u,filled:c}}giPositions(e,t,r,i,s){let n=e.nx*e.ny*e.nz,o=this.ex.fp_alloc(n*12),l=this.ex.fp_alloc(Math.max(4,n));this.ex.fp_gi_positions(e.min[0],e.min[1],e.min[2],e.cell,e.nx,e.ny,e.nz,e.rays,t,r,o,l);let c=t*e.nx*e.ny,u=Math.min(e.nz,r)*e.nx*e.ny;i.set(this.f32(o+c*12,(u-c)*3),c*3),s.set(new Uint8Array(this.ex.memory.buffer,l+c,u-c),c),this.ex.fp_free(o,n*12),this.ex.fp_free(l,Math.max(4,n))}giPass(e,t,r,i,s,n,o,l){let c=e.nx*e.ny*e.nz,u={pos:c*12,valid:Math.max(4,c),prev:c*48,out:c*48,sh:108,al:Math.max(4,e.albedo.length*4)},h=this.ex.fp_alloc(u.pos),p=this.ex.fp_alloc(u.valid),d=this.ex.fp_alloc(u.out),f=this.ex.fp_alloc(u.sh),b=this.ex.fp_alloc(u.al),v=s?this.ex.fp_alloc(u.prev):0;this.f32(h,c*3).set(r),new Uint8Array(this.ex.memory.buffer,p,c).set(i),s&&this.f32(v,c*12).set(s),this.f32(f,27).set(Array.from(e.skySH).slice(0,27)),this.f32(b,e.albedo.length).set(e.albedo),this.ex.fp_gi_pass(e.min[0],e.min[1],e.min[2],e.cell,e.nx,e.ny,e.nz,e.rays,t,e.sunDir[0],e.sunDir[1],e.sunDir[2],e.sunRGB[0],e.sunRGB[1],e.sunRGB[2],f,b,Math.floor(e.albedo.length/3),e.maxDist??400,h,p,v,n,o,d);let g=n*e.nx*e.ny,x=Math.min(e.nz,o)*e.nx*e.ny;l.set(this.f32(d+g*48,(x-g)*12),g*12),this.ex.fp_free(h,u.pos),this.ex.fp_free(p,u.valid),this.ex.fp_free(d,u.out),this.ex.fp_free(f,u.sh),this.ex.fp_free(b,u.al),s&&this.ex.fp_free(v,u.prev)}createCharacter(e,t,r=.35,i=50){return new Kt(this,this.ex.fp_character_create(e,t,r,i),e,t)}createBody(e,t,r,i){return new Xt(this,this.ex.fp_body_create(e,t[0],t[1],t[2],r,i))}bodyState(e){let t=this.ex.fp_bodies_ptr();return this.f32(t+e*this.stride*4,this.stride)}setGravity(e,t,r){this.ex.fp_set_gravity(e,t,r)}setAtmosphere(e,t,r,i){this.ex.fp_set_atmosphere(e,t,r,i[0],i[1],i[2])}spawnProjectile(e,t,r){return this.ex.fp_projectile_spawn(e[0],e[1],e[2],t[0],t[1],t[2],r.bcG7,r.massKg,r.diameterM,r.maxTime??6,r.userId??0)}projectiles(){let e=this.ex.fp_projectile_count();if(!e)return[];let t=this.f32(this.ex.fp_projectiles_ptr(),e*8),r=[];for(let i=0;i<e;i++){let s=i*8;r.push({id:t[s],userId:t[s+1],position:m.create(t[s+2],t[s+3],t[s+4]),velocity:m.create(t[s+5],t[s+6],t[s+7])})}return r}step(e){this.ex.fp_step(e);let t=this.ex.fp_projectile_hit_count();if(t&&this.onProjectileHit.length){let i=this.f32(this.ex.fp_projectile_hits_ptr(),t*16).slice();for(let s=0;s<t;s++){let n=s*16,o={userId:i[n],point:m.create(i[n+1],i[n+2],i[n+3]),normal:m.create(i[n+4],i[n+5],i[n+6]),velocity:m.create(i[n+7],i[n+8],i[n+9]),material:i[n+10],distance:i[n+11],timeOfFlight:i[n+12],body:i[n+13],ricochet:i[n+14]>.5,projectileId:i[n+15]};for(let l of this.onProjectileHit)l(o)}}let r=this.ex.fp_contact_count();if(r&&this.onContact.length){let i=this.f32(this.ex.fp_contacts_ptr(),r*10).slice();for(let s=0;s<r;s++){let n=s*10,o={body:i[n],point:m.create(i[n+1],i[n+2],i[n+3]),normal:m.create(i[n+4],i[n+5],i[n+6]),impulse:i[n+7],speed:i[n+8],otherMaterial:i[n+9]};for(let l of this.onContact)l(o)}}}};import{Vorp as Hi,whithamNWave as qi,speedOfSound as $i,BUS as Or}from"./vorp.js";var Tt=class{constructor(e,t){this.physics=e;this.urls=t}vorp=null;settings={reflections:!0,probeRays:14,probeDistance:45,occlusion:!0,occlusionDb:-14,occlusionLowpassHz:1100,cracks:!0,windAmbience:!0,ambienceBeds:!0};surfaces=new Map;listener={position:m.create(),forward:m.create(0,0,-1),up:m.create(0,1,0)};zone=null;zoneOrigin=m.create();pending=[];creating=null;crackDone=new Set;prevProj=new Map;tempC=18;async start(){if(this.vorp)return await this.vorp.resume(),this.vorp;this.creating||(this.creating=Hi.create({wasmUrl:this.urls.wasm,workletUrl:this.urls.worklet}).then(t=>{this.vorp=t,this.zone&&t.setZone(this.zone),t.setAtmosphere(this.tempC,.55);for(let r of this.pending)r();return this.pending=[],t}));let e=await this.creating;return await e.resume(),e}whenReady(e){this.vorp?e():this.pending.push(e)}sounds=new Set;beds=[];async loadSoundAssets(e,t){let r,i=t;if(typeof e=="string"){i??=e.slice(0,e.lastIndexOf("/")+1);try{let l=await fetch(e,{cache:"no-cache"});if(!l.ok)return[];r=await l.json()}catch{return[]}}else r=e;i??="";let s=Object.entries(r.sounds??{});if(!s.length)return[];let n=new Map;await Promise.all(s.map(async([l,c])=>{try{let u=await fetch(i+c.file);u.ok?n.set(l,await u.arrayBuffer()):console.warn(`[audio] recorded sound "${l}": ${i+c.file} \u2192 ${u.status}`)}catch(u){console.warn(`[audio] recorded sound "${l}" not fetched`,u)}}));let o={sounds:Object.fromEntries(s.filter(([l])=>n.has(l)))};return this.whenReady(()=>{this.vorp.loadSamples(o,i,n).then(l=>{for(let c of l)this.sounds.add(c);this.startBeds()})}),[...n.keys()]}startBeds(){let e=this.vorp;if(!e||!this.settings.ambienceBeds||this.beds.length)return;let t=e.loopSample("amb.birds",52);t&&this.beds.push(t);let r=e.loopSample("amb.wind",48);r&&this.beds.push(r)}setZone(e){this.zone=e,this.vorp?.setZone(e),this.lastWind&&this.setWind(...this.lastWind)}lastWind=null;setWind(e,t,r){if(this.lastWind=[e,t,r],!this.settings.windAmbience)return;let i=e<.05?0:28+26*Math.log10(1+e),s=450+60*e;this.whenReady(()=>this.vorp?.setAmbience({windSpl:i,windGust:t,windGustRate:r,windToneHz:s}))}surface(e){return this.surfaces.get(e)??{reflection:.8,lowpassHz:6e3}}update(e){e.forward(this.listener.forward),e.up(this.listener.up),m.copy(this.listener.position,e.position);let t=this.vorp;t&&(t.setListener(this.listener.position,this.listener.forward,this.listener.up),this.settings.cracks&&this.physics&&this.trackCracks(t),t.flush())}computeTaps(e,t,r=0){let i=this.physics,s=this.listener.position,n=[],o=m.clone(e),l=t?m.normalize(m.create(),m.clone(t)):null,c=h=>{if(!l||r<=0)return 1;let p=m.dot(l,h);return Math.pow(10,-r*(1-p)*.5/20)},u=(h,p,d,f)=>{let b=m.sub(m.create(),s,h),v=m.length(b);if(v<.2)return;let g=m.dot(b,d);if(Math.abs(g)<1e-5)return;let x=m.dot(m.sub(m.create(),p,h),d)/g;if(x<=0||x>=1)return;let w=m.scaleAndAdd(m.create(),h,b,x),P=m.normalize(m.create(),m.sub(m.create(),w,o)),S=m.normalize(m.create(),m.sub(m.create(),w,s)),k=this.surface(f),T=k.reflection*c(P)/v;n.push({path:v,gain:T,lowpassHz:k.lowpassHz,dir:S,energy:T*T})};if(i&&this.settings.reflections){let h=i.raycast(o,[0,-1,0],50,!1);h&&u(m.scaleAndAdd(m.create(),o,h.normal,-2*m.dot(m.sub(m.create(),o,h.point),h.normal)),h.point,h.normal,h.material);let p=this.settings.probeRays;for(let d=0;d<p;d++){let f=2.399963*d,b=d===p-1?1:d/(p-1)*.9-.25,v=Math.sqrt(Math.max(0,1-b*b)),g=m.create(Math.cos(f)*v,b,Math.sin(f)*v),x=i.raycast(s,g,this.settings.probeDistance,!1);if(!x||x.t<.3)continue;let w=x.normal,P=m.dot(m.sub(m.create(),o,x.point),w);if(P<=0)continue;let S=m.scaleAndAdd(m.create(),o,w,-2*P);u(S,x.point,w,x.material)}}for(let h of this.zone?.farReflectors??[]){let p=h.azimuth*Math.PI/180,d=m.create(this.zoneOrigin[0]+Math.sin(p)*h.distance,o[1],this.zoneOrigin[2]-Math.cos(p)*h.distance),f=m.distance(o,d)+m.distance(d,s),b=m.normalize(m.create(),m.sub(m.create(),d,o)),v=m.normalize(m.create(),m.sub(m.create(),d,s)),g=h.reflectivity*c(b)/f;n.push({path:f,gain:g,lowpassHz:h.lowpassHz,dir:v,energy:g*g})}return n.sort((h,p)=>p.energy-h.energy),n.slice(0,10)}occlusionOf(e){if(!this.physics||!this.settings.occlusion)return null;let t=m.sub(m.create(),this.listener.position,m.clone(e)),r=m.length(t);if(r<.3)return null;m.scale(t,t,1/r);let i=m.scaleAndAdd(m.create(),m.clone(e),t,.05);return this.physics.raycast(i,t,r-.15,!1)?{db:this.settings.occlusionDb,lowpass:this.settings.occlusionLowpassHz}:null}finish(e,t,r,i){e.setTaps(this.computeTaps(t,r,i));let s=this.occlusionOf(t);s&&e.setOcclusion(s.db,s.lowpass)}gunshot(e,t,r,i,s={}){let n=this.vorp;if(!n)return null;let o=n.gunshot(e,t,r,i,s),l=this.computeTaps(t,r,e.params.directivityDb??9),c=this.occlusionOf(t);for(let u of o.samples.includes(o.blast)?o.samples:[o.blast,...o.samples])u.setTaps(l),c&&u.setOcclusion(c.db,c.lowpass);return o.action&&i&&o.action.setTaps(this.computeTaps(i,null,0).slice(0,4)),o}impact(e,t,r=0){let i=this.vorp;if(!i)return null;let s=i.impact(e,t,r);return this.finish(s,t,null,0),s}modal(e,t,r,i=1,s={}){let n=this.vorp;if(!n)return null;let o=n.modal(e,t,r,i,s);return this.finish(o,r,null,0),o}mech(e,t,r={}){let i=this.vorp;if(!i)return null;let s=i.mech(e,t,r);return this.finish(s.noise,t,null,0),s.ring&&this.finish(s.ring,t,null,0),s}breath(e,t={}){let r=this.vorp;return r?r.breath(e,t):null}footstep(e,t,r){let i=this.vorp;if(!i)return null;let s={bus:Or.ENV,reverbSendDb:i.zoneSendDb};return(r?i.sampleAt(`step.${r}`,t,e.levelSpl??70,s):null)??i.noise(e,t,s)}projectileInfo=new Map;trackCracks(e){let t=this.physics,r=this.listener.position,i=$i(this.tempC),s=t.projectiles(),n=new Set;for(let o of s){n.add(o.id);let l=this.prevProj.get(o.id);if(this.prevProj.set(o.id,m.clone(o.position)),!l||this.crackDone.has(o.id))continue;let c=m.length(o.velocity);if(c<=i*1.01)continue;let u=m.sub(m.create(),o.position,l),h=m.lengthSq(u);if(h<1e-8)continue;let p=m.dot(m.sub(m.create(),r,l),u)/h;if(p<0||p>1)continue;let d=m.scaleAndAdd(m.create(),l,u,p),f=m.distance(d,r);if(f>60||f<.02)continue;let b=m.distance(d,l),v=this.projectileInfo.get(o.userId)??{diameter:.0057,length:.023},g=qi({mach:c/i,diameter:v.diameter,length:v.length,missDistance:f,c:i}),x=m.normalize(m.create(),u),w=i/c,P=m.scaleAndAdd(m.create(),d,x,-f*Math.sqrt(1-w*w)/Math.max(w,.001));e.crack(g.peakPa,g.duration,P,{bus:Or.WEAPONS}).setTaps(this.computeTaps(P,null,0)),this.crackDone.add(o.id)}for(let o of[...this.prevProj.keys()])n.has(o)||(this.prevProj.delete(o),this.crackDone.delete(o))}};import{AMBIENCE_PARAMS as Ki,HEARING_PARAMS as Xi,MASTER_PARAMS as Yi,REVERB_PARAMS as Qi,OP as zt}from"./vorp.js";function Fr(a,e){let t=a.scope(de.gl),r=e.settings,i=e.sky.settings;t.number("Sky",i,"sunElevation",{label:"Sun elevation",min:-10,max:90,step:.1,unit:"\xB0"}).number("Sky",i,"sunAzimuth",{label:"Sun azimuth",min:0,max:360,step:.5,unit:"\xB0"}).number("Sky",i,"sunIlluminance",{label:"Solar illuminance (TOA)",min:1e3,max:14e4,step:100,unit:"lux",help:"Extraterrestrial sun illuminance \u2248 128 000 lux. Everything else is derived from this."}).number("Sky",i,"sunAngularDiameter",{label:"Sun angular diameter",min:.1,max:5,step:.01,unit:"\xB0",help:"Real sun: 0.53\xB0. Sets penumbra width of all sun shadows (PCSS) and sun specular size."}).number("Sky",i,"turbidity",{label:"Aerosol (haze)",min:0,max:10,step:.05,help:"Mie density. Hazy/humid days \u2248 2\u20134."}).number("Sky",i,"rayleigh",{label:"Rayleigh density",min:0,max:4,step:.01}).number("Sky",i,"ozone",{label:"Ozone",min:0,max:4,step:.01}).number("Sky",i,"mieG",{label:"Mie anisotropy",min:0,max:.99,step:.01}).number("Sky",i,"groundAlbedo",{label:"Ground albedo (env)",min:0,max:1,step:.01}).number("Sky",i,"multiScatter",{label:"Multiple scattering",min:.5,max:2.5,step:.01}).number("Sky",r.ibl,"intensity",{label:"IBL intensity",min:0,max:3,step:.01,help:"Keep at 1 for physical correctness."}).number("Sky",r.ibl,"specularOcclusion",{label:"Specular occlusion",min:0,max:1,step:.01}).number("Sky",r.ibl,"occludedAmbient",{label:"Bounce fill (occluded sky)",min:0,max:1,step:.01,help:"Fraction of sky ambient still arriving from occluded sky directions. \u22480.1\u20130.2."}).number("Sky",r.ibl,"viewmodelFill",{label:"Viewmodel ambient fill",min:.5,max:3,step:.05,help:"Ambient multiplier on the first-person weapon and hands only (1 = physical). Dark gear in roof shadow needs \u22481.5\u20132 to read like it does to an adapted eye."}).number("Sky",r.ibl,"groundBounce",{label:"Sun ground bounce",min:0,max:2,step:.01,help:"One-bounce sunlight (sun lux \xD7 ground albedo / \u03C0) received where the sky is blocked \u2014 lights pavilion/porch interiors. No real-time GI: \u22480.4\u20130.8 on sunny days."}),t.bool("Global illumination",r.gi,"enabled",{label:"Baked GI probes",help:"Path-traced at load: sky occlusion + multi-bounce sun/sky light. Replaces the analytic fill inside the probe volume."}).number("Global illumination",r.gi,"intensity",{label:"GI intensity",min:0,max:3,step:.01,help:"Keep at 1 for physical correctness."});let s=e.wind.settings;t.number("Wind",s,"speed",{label:"Wind speed",min:0,max:25,step:.1,unit:"m/s",help:"Mean surface wind. Drives foliage, smoke/dust drift, cloud drift (\xD7 wind aloft) and the ambience bed."}).number("Wind",s,"direction",{label:"Direction (blowing to)",min:0,max:360,step:1,unit:"\xB0",help:"0 = north (\u2212Z), 90 = east (+X); same compass as the sun azimuth."}).number("Wind",s,"gustiness",{label:"Gustiness",min:0,max:1,step:.01,help:"Gust peaks reach \u2248 speed \xD7 (1 + 1.7 \xD7 gustiness)."}).number("Wind",s,"gustFrequency",{label:"Gust rate",min:.02,max:.6,step:.01,unit:"Hz"}).number("Wind",s,"turbulence",{label:"Turbulence (flutter)",min:0,max:1,step:.01}).number("Wind",s,"foliageBend",{label:"Foliage bend",min:0,max:.2,step:.001,unit:"m per m/s",help:"Tip displacement of a 1 m blade per m/s of wind."}).number("Wind",s,"aloftFactor",{label:"Wind aloft \xD7",min:1,max:6,step:.05,help:"Cloud-level wind relative to the surface wind."}).number("Wind",s,"aloftVeer",{label:"Veer aloft",min:-90,max:90,step:1,unit:"\xB0"});let n=e.sky.clouds.settings;t.bool("Clouds",n,"enabled",{label:"Clouds"}).choice("Clouds",n,"mode",["volumetric","flat"],{label:"Mode",help:"volumetric = ray-marched 3D clouds; flat = cheap 2D deck. Individual clouds (sky.addCloud) can pick either."}).choice("Clouds",n,"quality",["auto","low","medium","high"],{label:"Quality",help:"Dome resolution and march steps. auto = high on a GPU, low on software WebGPU (headless captures)."}).number("Clouds",n,"coverage",{label:"Coverage",min:0,max:1,step:.01,help:"Fraction of sky covered (scattered \u2248 0.3\u20130.5, broken \u2248 0.6\u20130.85, overcast 1)."}).number("Clouds",n,"type",{label:"Cloud type",min:0,max:1,step:.01,help:"0 flat stratus / stratocumulus \u2026 1 towering cumulus."}).number("Clouds",n,"density",{label:"Extinction",min:2,max:120,step:.5,unit:"1/km",help:"Optical density of a fully dense cloud. Cumulus \u2248 20\u201380."}).number("Clouds",n,"altitude",{label:"Base altitude",min:300,max:6e3,step:10,unit:"m",help:"Cumulus base \u2248 1\u20132 km."}).number("Clouds",n,"thickness",{label:"Layer thickness",min:200,max:5e3,step:10,unit:"m"}).number("Clouds",n,"featureScale",{label:"System size",min:1e3,max:2e4,step:100,unit:"m",help:"Size of cloud systems and the gaps between them."}).number("Clouds",n,"shapeScale",{label:"Shape scale",min:1e3,max:15e3,step:100,unit:"m"}).number("Clouds",n,"detailScale",{label:"Detail scale",min:100,max:2e3,step:10,unit:"m"}).number("Clouds",n,"windFactor",{label:"Drift (\xD7 wind aloft)",min:0,max:6,step:.05,help:"Cloud drift speed relative to the Wind system's wind aloft."}).number("Clouds",n,"shadowStrength",{label:"Cloud shadows",min:0,max:1,step:.01,help:"How much a thick cloud dims direct sunlight on the ground (1 = physical)."}).number("Clouds",n,"ambient",{label:"Ambient light",min:0,max:3,step:.01,help:"Sky/ground light scattered by the clouds (1 \u2248 physical)."}).number("Clouds",n,"multiScatter",{label:"Multiple scattering",min:.2,max:4,step:.01,help:"Sunlight energy boost standing in for higher scattering orders."}).number("Clouds",n,"albedo",{label:"Droplet albedo",min:.5,max:1,step:.005}),t.choice("Exposure",r.exposure,"mode",["auto","manual","camera"],{label:"Mode",help:"auto = eye/camera metering; manual = EV100; camera = aperture/shutter/ISO of the Camera."}).number("Exposure",r.exposure,"ev100",{label:"Manual EV100",min:-6,max:20,step:.1,help:"Sunny 16 \u2248 15, overcast \u2248 12, indoor \u2248 7, night \u2248 0."}).number("Exposure",r.exposure,"compensation",{label:"Compensation",min:-5,max:5,step:.05,unit:"EV"}).number("Exposure",r.exposure,"minEv100",{label:"Min EV100",min:-10,max:20,step:.1}).number("Exposure",r.exposure,"maxEv100",{label:"Max EV100",min:-10,max:22,step:.1}).number("Exposure",r.exposure,"speedUp",{label:"Adapt to bright",min:.05,max:20,step:.05,unit:"EV/s"}).number("Exposure",r.exposure,"speedDown",{label:"Adapt to dark",min:.05,max:20,step:.05,unit:"EV/s"}).number("Exposure",r.exposure,"lowPercent",{label:"Metering low %",min:0,max:.99,step:.01}).number("Exposure",r.exposure,"highPercent",{label:"Metering high %",min:.01,max:1,step:.01}).number("Exposure",r.exposure,"centerWeight",{label:"Centre weighting",min:0,max:1,step:.01}),t.choice("Tone & colour",r.grade,"tonemapper",["agx","aces","neutral","none"],{label:"Tonemapper"}).number("Tone & colour",r.grade,"exposureBias",{label:"Exposure bias",min:-4,max:4,step:.05,unit:"EV"}).number("Tone & colour",r.grade,"contrast",{label:"Contrast",min:.5,max:1.6,step:.01}).number("Tone & colour",r.grade,"saturation",{label:"Saturation",min:0,max:2,step:.01}).number("Tone & colour",r.grade,"temperature",{label:"White balance temp",min:-1,max:1,step:.01}).number("Tone & colour",r.grade,"tint",{label:"White balance tint",min:-1,max:1,step:.01}).number("Tone & colour",r.grade,"lift",{label:"Lift",min:-.2,max:.2,step:.001}).number("Tone & colour",r.grade,"gamma",{label:"Gamma",min:.5,max:2,step:.01}).number("Tone & colour",r.grade,"gain",{label:"Gain",min:.5,max:2,step:.01}).number("Tone & colour",r.grade,"dither",{label:"Dither",min:0,max:2,step:.01}),t.number("Lens & sensor",r.lens,"distortion",{label:"Barrel distortion k1",min:-.6,max:.6,step:.005,help:"Negative = barrel (wide/bodycam lenses), positive = pincushion."}).number("Lens & sensor",r.lens,"distortion2",{label:"Distortion k2",min:-.5,max:.5,step:.005}).number("Lens & sensor",r.lens,"fillZoom",{label:"Distortion fill zoom",min:.5,max:2,step:.005}).number("Lens & sensor",r.lens,"chromaticAberration",{label:"Chromatic aberration",min:0,max:3,step:.01}).number("Lens & sensor",r.lens,"naturalVignette",{label:"Natural vignetting (cos\u2074)",min:0,max:1,step:.01}).number("Lens & sensor",r.lens,"vignette",{label:"Artistic vignette",min:0,max:1,step:.01}).number("Lens & sensor",r.lens,"vignetteRoundness",{label:"Vignette roundness",min:0,max:1,step:.01}).number("Lens & sensor",r.lens,"sharpen",{label:"Sharpening",min:0,max:1,step:.01}).bool("Lens & sensor",r.sensor,"enabled",{label:"Sensor noise"}).number("Lens & sensor",r.sensor,"readNoise",{label:"Read noise",min:0,max:.05,step:1e-4}).number("Lens & sensor",r.sensor,"shotNoise",{label:"Photon shot noise",min:0,max:.05,step:1e-4}).number("Lens & sensor",r.sensor,"gain",{label:"Sensor gain",min:0,max:8,step:.01}).bool("Lens & sensor",r.sensor,"isoCoupled",{label:"Noise follows camera ISO"}).bool("Lens & sensor",r.motionBlur,"enabled",{label:"Motion blur"}).number("Lens & sensor",r.motionBlur,"shutterAngle",{label:"Shutter angle",min:0,max:360,step:1,unit:"\xB0",help:"180\xB0 = film look; bodycams shoot ~ 90\u2013180\xB0."}).number("Lens & sensor",r.motionBlur,"maxPixels",{label:"Max blur",min:4,max:128,step:1,unit:"px"}).number("Lens & sensor",r.motionBlur,"samples",{label:"Blur samples",min:4,max:32,step:1}).bool("Lens & sensor",r.dof,"enabled",{label:"Depth of field"}).number("Lens & sensor",r.dof,"apertureMm",{label:"Aperture / pupil",min:0,max:30,step:.1,unit:"mm",help:"Human pupil \u2248 3 mm in daylight (iron sights: target goes soft), 6\u20137 mm at night. Camera: focal length \xF7 f-number. Bodycams \u2248 1 mm (everything sharp)."}).bool("Lens & sensor",r.dof,"autoFocus",{label:"Auto focus (accommodation)"}).number("Lens & sensor",r.dof,"focusDistance",{label:"Manual focus",min:.1,max:500,step:.1,unit:"m"}).number("Lens & sensor",r.dof,"focusSpeed",{label:"Refocus speed",min:.5,max:30,step:.1,unit:"1/s",help:"Eye accommodation \u2248 4\u20138/s."}).number("Lens & sensor",r.dof,"maxBlurPx",{label:"Max blur radius",min:2,max:40,step:1,unit:"px@1080p"}).number("Lens & sensor",r.dof,"quality",{label:"DOF quality",min:.25,max:3,step:.05}).bool("Lens & sensor",r.bloom,"enabled",{label:"Bloom (lens scatter)"}).number("Lens & sensor",r.bloom,"intensity",{label:"Bloom amount",min:0,max:.3,step:.001,help:"Fraction of light scattered by the lens (physical \u2248 0.02\u20130.05)."}).number("Lens & sensor",r.bloom,"radius",{label:"Bloom radius",min:.5,max:3,step:.01});let o=r.shadows;t.bool("Shadows",o,"enabled",{label:"Sun shadows"}).number("Shadows",o,"cascades",{label:"Cascades",min:1,max:4,step:1}).number("Shadows",o,"resolution",{label:"Resolution",min:512,max:8192,step:512,unit:"px"}).number("Shadows",o,"distance",{label:"Distance",min:10,max:600,step:1,unit:"m"}).number("Shadows",o,"splitLambda",{label:"Split lambda",min:0,max:1,step:.01}).number("Shadows",o,"constantBias",{label:"Depth bias",min:0,max:.002,step:1e-5}).number("Shadows",o,"slopeBias",{label:"Slope bias",min:0,max:8,step:.05}).number("Shadows",o,"normalBias",{label:"Normal bias",min:0,max:6,step:.05,unit:"texels"}).number("Shadows",o,"maxPenumbraTexels",{label:"Max penumbra",min:1,max:48,step:1,unit:"texels"}).number("Shadows",o,"blockerSamples",{label:"PCSS blocker taps",min:1,max:16,step:1}).number("Shadows",o,"pcfSamples",{label:"PCF taps",min:1,max:32,step:1}).number("Shadows",o,"blendFraction",{label:"Cascade blend",min:0,max:.5,step:.01}),t.bool("AO & AA",r.gtao,"enabled",{label:"GTAO"}).number("AO & AA",r.gtao,"radius",{label:"AO radius",min:.05,max:4,step:.01,unit:"m"}).number("AO & AA",r.gtao,"falloff",{label:"AO falloff",min:.05,max:1,step:.01}).number("AO & AA",r.gtao,"power",{label:"AO power",min:.5,max:4,step:.01}).number("AO & AA",r.gtao,"strength",{label:"AO strength",min:0,max:1,step:.01}).number("AO & AA",r.gtao,"slices",{label:"AO slices",min:1,max:8,step:1}).number("AO & AA",r.gtao,"steps",{label:"AO steps",min:2,max:16,step:1}).bool("AO & AA",r.taa,"enabled",{label:"TAA"}).number("AO & AA",r.taa,"feedbackMin",{label:"TAA feedback (moving)",min:0,max:.99,step:.005}).number("AO & AA",r.taa,"feedbackMax",{label:"TAA feedback (still)",min:0,max:.99,step:.005}).number("AO & AA",r,"renderScale",{label:"Render scale",min:.25,max:1.5,step:.05}).number("AO & AA",r,"debugView",{label:"Debug view",min:0,max:9,step:1,help:"1 normals, 2 AO, 3 velocity, 4 depth, 5 luminance (cd/m\xB2 false colour), 6 HDR, 7 sky visibility, 8 ambient diffuse, 9 direct only"}),t.number("Atmosphere",r.fog,"density",{label:"Fog density",min:0,max:.02,step:1e-5,unit:"1/m"}).number("Atmosphere",r.fog,"heightFalloff",{label:"Height falloff",min:.001,max:1,step:.001,unit:"1/m"}).number("Atmosphere",r.fog,"baseHeight",{label:"Base height",min:-50,max:200,step:.5,unit:"m"}).number("Atmosphere",r.fog,"startDistance",{label:"Start distance",min:0,max:200,step:.5,unit:"m"}).number("Atmosphere",r.fog,"inscatter",{label:"Inscatter",min:0,max:4,step:.01}).number("Atmosphere",r.fog,"mieG",{label:"Sun glow anisotropy",min:0,max:.99,step:.01})}function Ir(a,e){let t=a.scope(de.vorp),r=(i,s,n,o)=>{s.forEach((l,c)=>t.arrayValue(i,n,c,{key:l.key,label:l.label,min:l.min,max:l.max,step:l.step,unit:l.unit,help:l.help,onChange:()=>e.cmd(o,n)}))};r("Hearing",Xi,e.params.hearing,zt.HEARING),r("Master",Yi,e.params.master,zt.MASTER),r("Reverb",Qi,e.params.reverb,zt.REVERB),r("Ambience",Ki,e.params.ambience,zt.AMBIENCE)}var $e=class a{constructor(e,t,r,i){this.physics=e;this.workerUrl=t;this.wasmUrl=r;let s=typeof navigator<"u"&&navigator.hardwareConcurrency||4;this.threads=Math.max(1,Math.min(i??s-1,12))}workers=[];ready=null;job=0;pending=new Map;threads;meshCount=-1;busy=!1;static supported(){return typeof Worker<"u"}init(){let e=this.physics.staticMeshes;return this.ready&&this.meshCount===e.length?this.ready:(this.dispose(),this.meshCount=e.length,this.ready=Promise.all(Array.from({length:this.threads},()=>new Promise((t,r)=>{let i=new Worker(this.workerUrl,{type:"module",name:"fondaine-gi"});i.onmessage=s=>{let n=s.data;if(n.type==="ready"){t();return}if(n.type==="error"){r(new Error(n.message));for(let l of this.pending.values())l.reject(new Error(n.message));this.pending.clear();return}let o=this.pending.get(n.job);o&&(this.pending.delete(n.job),o.resolve(n))},i.onerror=s=>{r(s),this.failAll(new Error("GI worker crashed: "+(s.message??s)))},i.postMessage({type:"init",wasm:this.wasmUrl,meshes:e}),this.workers.push(i),setTimeout(()=>r(new Error("GI worker did not start within 30 s")),3e4)}))).then(()=>{}).catch(t=>{throw this.dispose(),this.ready=null,t}),this.ready)}call(e,t,r=[]){let i=++this.job;return new Promise((s,n)=>{let o=setTimeout(()=>{this.pending.delete(i)&&n(new Error(`GI worker job timed out after ${a.jobTimeoutMs/1e3} s`))},a.jobTimeoutMs);this.pending.set(i,{resolve:l=>{clearTimeout(o),s(l)},reject:l=>{clearTimeout(o),n(l)}}),e.postMessage({...t,job:i},r)})}static jobTimeoutMs=18e4;failAll(e){for(let t of this.pending.values())t.reject(e);this.pending.clear()}async runSlabs(e,t,r,i){let s=Math.max(1,Math.ceil(e/(this.threads*4))),n=[];for(let c=0;c<e;c+=s)n.push([c,Math.min(e,c+s)]);let o=n.length,l=0;await Promise.all(this.workers.map(async c=>{for(;n.length;){let[u,h]=n.shift();r(await this.call(c,t(u,h))),i?.(++l/o)}}))}async bake(e,t,r){let i=performance.now();this.busy=!0;try{await this.init();let{nx:s,ny:n,nz:o}=e,l=s*n*o,c=s*n,u=new Float32Array(l*3),h=new Uint8Array(l);await this.runSlabs(o,(f,b)=>({type:"pos",grid:e,z0:f,z1:b}),f=>{u.set(f.pos,f.z0*c*3),h.set(f.valid,f.z0*c)},f=>r?.(f*.05,"placing probes"));for(let f of this.workers)f.postMessage({type:"probes",pos:u,valid:h});let p=null;for(let f=0;f<t;f++){let b=new Float32Array(l*12),v=p;await this.runSlabs(o,(g,x)=>({type:"pass",grid:e,pass:f,prev:v,z0:g,z1:x}),g=>b.set(g.data,g.z0*c*12),g=>r?.(.05+.95*((f+g)/t),`bounce ${f+1} of ${t}`)),Zi(b,h,s,n,o),p=b}let d=0;for(let f=0;f<l;f++)h[f]||d++;return{data:p,filled:d,ms:performance.now()-i,threads:this.threads}}finally{this.busy=!1}}dispose(){for(let e of this.workers)e.terminate();this.workers=[],this.ready=null,this.pending.clear()}};function Zi(a,e,t,r,i){let s=Uint8Array.from(e);for(let n=0;n<4;n++){let o=!1,l=Uint8Array.from(s),c=a.slice();for(let u=0;u<i;u++)for(let h=0;h<r;h++)for(let p=0;p<t;p++){let d=(u*r+h)*t+p;if(l[d])continue;let f=new Float32Array(12),b=0;for(let v=-1;v<=1;v++)for(let g=-1;g<=1;g++)for(let x=-1;x<=1;x++){let w=p+x,P=h+g,S=u+v;if(w<0||P<0||S<0||w>=t||P>=r||S>=i)continue;let k=(S*r+P)*t+w;if(l[k]){for(let T=0;T<12;T++)f[T]+=c[k*12+T];b++}}if(b){for(let v=0;v<12;v++)a[d*12+v]=f[v]/b;s[d]=1,o=!0}}if(!o)break}}var Gt=Ge("MeshRenderer"),Nr=class a{renderer;scene=new pt;camera=new ht;world=new yt;physics;audio;input;tuning=new Pt;devui;canvas;time=0;fixedDt;maxFrameTime=.1;timeScale=1;paused=!1;frame=0;fps=0;acc=0;last=0;running=!1;fpsAcc=0;fpsFrames=0;onUpdate=[];onFixed=[];onLate=[];giBaker;autoRebakeGI=!0;giLast=null;giChangeT=0;constructor(e,t,r){this.canvas=e.canvas,this.renderer=t,this.physics=r,this.fixedDt=1/(e.fixedHz??120);let i=e.baseUrl??"/";this.audio=new Tt(r,{wasm:e.vorpWasm??`${i}wasm/vorp_dsp.wasm`,worklet:e.vorpWorklet??`${i}vorp/vorp-worklet.js`}),this.input=new Mt(e.canvas);let s=n=>new URL(n,typeof location<"u"?location.href:"http://localhost/").href;this.giBaker=$e.supported()&&e.giThreads!==0?new $e(r,s(e.giWorker??`${i}fondaine/gi-worker.js`),s(e.physicsWasm??`${i}wasm/fondaine_physics.wasm`),e.giThreads):null,this.devui=new St(this.tuning,e.title??"fondaine"),this.world.onRemoved(Gt,(n,o)=>this.scene.remove(o.object)),this.world.onRemoved(qe,(n,o)=>{for(let l of o)l.onDestroy?.()}),Fr(this.tuning,this.renderer),this.renderer.wind.onSettingsChanged=n=>this.audio.setWind(n.speed,n.gustiness,n.gustFrequency),this.audio.setWind(this.renderer.wind.settings.speed,this.renderer.wind.settings.gustiness,this.renderer.wind.settings.gustFrequency),this.devui.statsText=()=>{let n=this.renderer.stats,o=this.audio.vorp?.meters;return`${this.fps.toFixed(0)} fps  ${n.frameMs.toFixed(2)} ms cpu  ${n.drawCalls} draws  ${(n.triangles/1e3).toFixed(0)}k tris
`+(o?`audio: ${o.voices} voices  eardrum ${o.earSpl.toFixed(0)} dB SPL  TTS ${o.tts.toFixed(1)} dB  dsp ${(o.cpu*100).toFixed(1)}%`:"audio: click to start")}}get sky(){return this.renderer.sky}get wind(){return this.renderer.wind}cloud(e){return this.renderer.sky.addCloud(e)}static async create(e){let t=e.baseUrl??"/",[r,i]=await Promise.all([xt.create(e.canvas,{offscreen:e.offscreen}),kt.load(e.physicsWasm??`${t}wasm/fondaine_physics.wasm`)]);return new a(e,r,i)}async startAudio(){let e=await this.audio.start();return this.tuning.params.some(t=>t.module===de.vorp)||Ir(this.tuning,e),e}async bakeGlobalIllumination(e){let t=e.cell??.5,r=Math.max(1,Math.ceil((e.max[0]-e.min[0])/t)),i=Math.max(1,Math.ceil((e.max[1]-e.min[1])/t)),s=Math.max(1,Math.ceil((e.max[2]-e.min[2])/t)),n=e.rays??256,o=e.passes??3,l=r*i*s,c=await this.giGrid({min:[e.min[0],e.min[1],e.min[2]],cell:t,nx:r,ny:i,nz:s,rays:n,albedo:Array.from(e.albedo)});e.onStatus?.(`Path tracing global illumination \xB7 ${l.toLocaleString()} probes`);let u=await this.runGIBake(c,o,(h,p)=>e.onStatus?.(`Path tracing global illumination \xB7 ${p} \xB7 ${Math.round(h*100)}%`));return console.info(`[fondaineGL] GI bake: ${r}\xD7${i}\xD7${s} probes, ${n} rays, ${o} passes, ${u.filled} filled, ${(u.ms/1e3).toFixed(1)} s on ${u.threads} thread(s)`),{probes:l,ms:u.ms,filled:u.filled}}async giGrid(e){let t=Array.from(await this.renderer.readSkySH());return{...e,sunDir:[...this.renderer.sky.sunDir],sunRGB:[...this.renderer.sky.sunIlluminanceRGB()],skySH:t}}skyKey(){let e=this.renderer.sky.settings;return[e.sunElevation,e.sunAzimuth,e.sunIlluminance,e.turbidity,e.rayleigh,e.ozone,e.groundAlbedo].map(t=>Number(t).toFixed(2)).join("|")}async runGIBake(e,t,r){let i;if(this.giBaker)try{i=await this.giBaker.bake(e,t,r)}catch(s){console.warn("[fondaineGL] worker GI bake failed, using the main thread",s),i=this.bakeGISync(e,t)}else i=this.bakeGISync(e,t);return this.renderer.setProbeVolume(i.data,e.nx,e.ny,e.nz,e.min,e.cell),this.giLast={grid:e,passes:t,key:this.skyKey()},i}bakeGISync(e,t){let r=performance.now(),{data:i,filled:s}=this.physics.bakeGI({...e,passes:t});return{data:i,filled:s,ms:performance.now()-r,threads:1}}watchGI(e){if(!this.autoRebakeGI||!this.giLast||!this.giBaker||this.giBaker.busy)return;if(this.skyKey()===this.giLast.key){this.giChangeT=0;return}if(this.giChangeT+=e,this.giChangeT<.6)return;this.giChangeT=0;let t=this.giLast;this.giLast={...t,key:this.skyKey()},this.giGrid({min:t.grid.min,cell:t.grid.cell,nx:t.grid.nx,ny:t.grid.ny,nz:t.grid.nz,rays:Math.min(t.grid.rays,128),albedo:t.grid.albedo}).then(r=>this.runGIBake(r,t.passes)).then(r=>console.info(`[fondaineGL] GI re-baked for the new sun in ${(r.ms/1e3).toFixed(1)} s`)).catch(r=>console.warn("[fondaineGL] GI re-bake failed",r))}createEntity(e,t,r){let i=this.world.spawn(e);return this.world.add(i,Ae,new wt(t,r)),i}transform(e){return this.world.require(e,Ae)}addMesh(e,t,r,i={}){let s=t instanceof Oe?t:new Oe(this.renderer.dev,t),n=new ye(s,r);return n.castShadow=i.castShadow??!0,n.viewmodel=i.viewmodel??!1,n.userData=e,this.scene.add(n),this.world.add(e,Gt,{object:n,offset:i.offset??null}),this.syncObject(e),n.resetHistory(),n}addScript(e,t){return t.engine=this,t.entity=e,(this.world.get(e,qe)??this.world.add(e,qe,[])).push(t),t}destroy(e){this.world.despawn(e)}tmp=M.create();syncObject(e){let t=this.world.get(e,Gt),r=this.world.get(e,Ae);!t||!r||(t.offset?t.object.setTransform(M.multiply(this.tmp,r.getWorld(),t.offset)):t.object.setTransform(r.getWorld()))}start(){if(this.running)return;this.running=!0,this.last=performance.now();let e=t=>{if(!this.running)return;let r=Math.max(0,Math.min((t-this.last)/1e3,this.maxFrameTime));this.last=t,this.step(r),requestAnimationFrame(e)};requestAnimationFrame(e)}stop(){this.running=!1}step(e){e=Math.max(0,e);let t=this.paused?0:e*this.timeScale;this.input.poll(),this.input.actionPressed("tuning")&&(this.devui.toggle(),this.devui.visible&&this.input.unlock());let r=[...this.world.query(qe)];for(let[,s]of r)for(let n of s)n.enabled&&!n._started&&(n._started=!0,n.onStart?.());this.acc+=t;let i=0;for(;this.acc>=this.fixedDt&&i<12;){for(let[,s]of r)for(let n of s)n.enabled&&n.onFixedUpdate?.(this.fixedDt);for(let s of this.onFixed)s(this.fixedDt);this.physics.step(this.fixedDt),this.acc-=this.fixedDt,this.time+=this.fixedDt,i++}i>=12&&(this.acc=0);for(let[,s]of r)for(let n of s)n.enabled&&n.onUpdate?.(t);for(let s of this.onUpdate)s(t);for(let[,s]of r)for(let n of s)n.enabled&&n.onLateUpdate?.(t);for(let s of this.onLate)s(t);for(let[s]of this.world.query(Gt))this.syncObject(s);this.watchGI(e),this.audio.update(this.camera),this.renderer.render(this.scene,this.camera,Math.max(e,1e-4)),this.devui.update(),this.input.endFrame(),this.frame++,this.fpsAcc+=e,this.fpsFrames++,this.fpsAcc>.5&&(this.fps=this.fpsFrames/this.fpsAcc,this.fpsAcc=0,this.fpsFrames=0)}};var Q={DEFAULT:0,CONCRETE:1,DIRT:2,GRAVEL:3,WOOD:4,STEEL:5,STEEL_TARGET:6,PAPER:7,CARDBOARD:8,GRASS:9,BRASS:10,POLYMER:11},ne=(a,e,t)=>({id:a,name:e,friction:.6,restitution:.2,ricochetAngleDeg:0,ricochetEnergyKeep:.3,reflection:.8,reflectionLowpassHz:6e3,impactSound:"dirt",footstepSound:"dirt",decal:null,decalSize:.03,debris:"dust",debrisColor:[.4,.35,.28],hard:!1,albedo:[.25,.25,.25],...t}),Ke=[ne(Q.DEFAULT,"default",{}),ne(Q.CONCRETE,"concrete",{friction:.75,restitution:.35,ricochetAngleDeg:12,ricochetEnergyKeep:.25,reflection:.97,reflectionLowpassHz:9e3,impactSound:"concrete",footstepSound:"concrete",decal:2,decalSize:.05,debris:"dust",debrisColor:[.62,.61,.58],hard:!0,albedo:[.36,.35,.33]}),ne(Q.DIRT,"dirt",{friction:.8,restitution:.1,reflection:.65,reflectionLowpassHz:2500,impactSound:"dirt",footstepSound:"dirt",decal:5,decalSize:.12,debris:"dust",debrisColor:[.35,.28,.2],albedo:[.2,.15,.1]}),ne(Q.GRAVEL,"gravel",{friction:.85,restitution:.15,ricochetAngleDeg:8,reflection:.75,reflectionLowpassHz:4e3,impactSound:"gravel",footstepSound:"gravel",decal:null,debris:"dust",debrisColor:[.5,.48,.45],hard:!0,albedo:[.3,.29,.27]}),ne(Q.WOOD,"wood",{friction:.55,restitution:.3,reflection:.85,reflectionLowpassHz:5e3,impactSound:"wood",footstepSound:"wood",decal:1,decalSize:.035,debris:"splinters",debrisColor:[.6,.48,.32],hard:!0,albedo:[.42,.3,.17]}),ne(Q.STEEL,"steel",{friction:.45,restitution:.4,ricochetAngleDeg:25,ricochetEnergyKeep:.4,reflection:.98,reflectionLowpassHz:12e3,impactSound:"concrete",footstepSound:"concrete",decal:0,decalSize:.04,debris:"sparks",debrisColor:[1,.7,.35],hard:!0,albedo:[.3,.3,.3]}),ne(Q.STEEL_TARGET,"steel target",{friction:.45,restitution:.4,ricochetAngleDeg:0,reflection:.98,reflectionLowpassHz:12e3,impactSound:"concrete",decal:4,decalSize:.07,debris:"sparks",debrisColor:[1,.7,.35],hard:!0,albedo:[.55,.45,.38]}),ne(Q.PAPER,"paper",{reflection:.3,reflectionLowpassHz:2e3,impactSound:"paper",decal:3,decalSize:.012,debris:"none",albedo:[.7,.68,.62]}),ne(Q.CARDBOARD,"cardboard",{reflection:.4,reflectionLowpassHz:2500,impactSound:"cardboard",decal:3,decalSize:.014,debris:"none",albedo:[.45,.33,.2]}),ne(Q.GRASS,"grass",{friction:.7,reflection:.5,reflectionLowpassHz:1800,impactSound:"dirt",footstepSound:"grass",decal:5,decalSize:.1,debris:"dust",debrisColor:[.3,.3,.18],albedo:[.07,.11,.035]}),ne(Q.BRASS,"brass",{friction:.35,restitution:.45,hard:!0,impactSound:"concrete",debris:"none",albedo:[.5,.38,.2]}),ne(Q.POLYMER,"polymer",{friction:.6,restitution:.3,hard:!0,impactSound:"wood",debris:"none",albedo:[.04,.04,.04]})];function To(){let a=Math.max(...Ke.map(t=>t.id))+1,e=new Float32Array(Math.max(a,16)*3).fill(.25);for(let t of Ke)e.set(t.albedo,t.id*3);return e}function ve(a){return Ke[Math.round(a)]??Ke[0]}function zo(a,e){for(let t of Ke)a.setMaterial(t.id,{friction:t.friction,restitution:t.restitution,ricochetAngleDeg:t.ricochetAngleDeg,ricochetEnergyKeep:t.ricochetEnergyKeep}),e.surfaces.set(t.id,{reflection:t.reflection,lowpassHz:t.reflectionLowpassHz})}import{FOOTSTEPS as Co}from"./vorp.js";var jr=class extends Ue{radius=.28;standHeight=1.78;crouchHeight=1.15;eyeFromTop=.11;walkSpeed=1.55;sprintSpeed=5.2;crouchSpeed=.85;adsSpeedFactor=.65;groundAccel=9;airAccel=1.2;brake=11;jumpSpeed=3;gravity=9.81;stride=.72;bobVertical=.022;bobLateral=.012;bobRoll=.6;landingDip=.05;leanAngle=13;leanOffset=.32;leanSpeed=7;pitchLimit=87;rig="eyes";bodycamOffset=m.create(.08,-.34,.12);bodycamTilt=-6;bodycamSway=1;yaw=0;pitch=0;velocity=m.create();feet=m.create();grounded=!1;crouched=!1;sprinting=!1;sprintBlend=0;aiming=!1;moving=0;lean=0;crouchBlend=0;height=1.78;bobPhase=0;lastStepSign=1;landT=0;fallSpeed=0;character;groundMaterial=0;bodySway=m.create();extraPitch=0;extraYaw=0;viewPunch={p:0,y:0,r:0,vp:0,vy:0,vr:0};punchOmega=32;punchDamping=.55;punch(e,t=0,r=0){this.viewPunch.vp+=e,this.viewPunch.vy+=t,this.viewPunch.vr+=r}eyePos=m.create();eyeRot=B.create();onFootstep=null;onStart(){this.character=this.physics.createCharacter(this.radius,this.standHeight,.4,48);let e=this.transform.position;m.copy(this.feet,e),this.character.setPosition(e[0],e[1],e[2]),this.height=this.standHeight,this.tune("walkSpeed",{group:"Player",min:.5,max:3,unit:"m/s",help:"Brisk walk with a rifle \u2248 1.4\u20131.7 m/s."}),this.tune("sprintSpeed",{group:"Player",min:2,max:9,unit:"m/s"}),this.tune("crouchSpeed",{group:"Player",min:.3,max:2,unit:"m/s"}),this.tune("groundAccel",{group:"Player",min:1,max:40,unit:"m/s\xB2"}),this.tune("jumpSpeed",{group:"Player",min:0,max:6,unit:"m/s"}),this.tune("stride",{group:"Player",min:.4,max:1.2,unit:"m"}),this.tune("bobVertical",{group:"Player",min:0,max:.08,unit:"m"}),this.tune("bobLateral",{group:"Player",min:0,max:.05,unit:"m"}),this.tune("bobRoll",{group:"Player",min:0,max:3,unit:"\xB0"}),this.tune("leanAngle",{group:"Player",min:0,max:30,unit:"\xB0"}),this.tune("bodycamTilt",{group:"Player",min:-30,max:10,unit:"\xB0"}),this.tune("bodycamSway",{group:"Player",min:0,max:3})}teleport(e,t,r,i=this.yaw){m.set(this.feet,e,t,r),this.character.setPosition(e,t,r),m.set(this.velocity,0,0,0),this.yaw=i}onUpdate(e){let t=this.input;if(t.locked||t.gamepad){let i=t.lookDelta(e);this.yaw+=i.yaw,this.pitch=Qe(this.pitch+i.pitch,-this.pitchLimit*ee,this.pitchLimit*ee),this.bodySway[0]=re(this.bodySway[0],i.yaw/Math.max(e,.001)*.02,.08,e)}this.yaw+=this.extraYaw,this.pitch=Qe(this.pitch+this.extraPitch,-this.pitchLimit*ee,this.pitchLimit*ee),this.extraYaw=0,this.extraPitch=0,t.actionPressed("camera")&&(this.rig=this.rig==="eyes"?"bodycam":"eyes");let r=(t.action("leanRight")?1:0)-(t.action("leanLeft")?1:0);this.lean=re(this.lean,r,1/this.leanSpeed,e),this.updateCamera(e)}onFixedUpdate(e){let t=this.input,r=t.moveAxis();t.actionPressed("crouch")&&(this.crouched?this.character.setHeight(this.standHeight)&&(this.crouched=!1):(this.character.setHeight(this.crouchHeight),this.crouched=!0)),this.sprinting=t.action("sprint")&&r.y>.3&&!this.crouched&&!this.aiming,this.sprintBlend=re(this.sprintBlend,this.sprinting?1:0,.09,e);let i=this.crouched?this.crouchSpeed:this.sprinting?this.sprintSpeed:this.walkSpeed;this.aiming&&(i*=this.adsSpeedFactor);let s=Math.sin(this.yaw),n=Math.cos(this.yaw),o=(r.x*n-r.y*s)*i,l=(-r.x*s-r.y*n)*i,c=this.grounded?this.groundAccel:this.airAccel,u=this.velocity,h=o-u[0],p=l-u[2],d=Math.hypot(h,p),f=(r.x||r.y?c:this.grounded?this.brake*Math.max(.5,Math.hypot(u[0],u[2])):0)*e;if(d>1e-6){let P=Math.min(1,f/d);u[0]+=h*P,u[2]+=p*P}this.grounded&&t.actionPressed("jump")&&!this.crouched&&(u[1]=this.jumpSpeed,this.grounded=!1),u[1]-=this.gravity*e;let b=this.character.move(u[0]*e,u[1]*e,u[2]*e),v=this.grounded,g=(b.position[0]-this.feet[0])/e,x=(b.position[2]-this.feet[2])/e;u[0]=g,u[2]=x,b.grounded&&u[1]<0&&(this.fallSpeed=-u[1],u[1]=0),b.ceiling&&u[1]>0&&(u[1]=0),this.grounded=b.grounded,!v&&this.grounded&&(this.landT=Math.min(1,this.fallSpeed/6),this.onFootstep?.(ve(b.groundMaterial).footstepSound,b.position,1+this.landT*2)),m.copy(this.feet,b.position),this.groundMaterial=b.groundMaterial,this.transform.setPosition(b.position[0],b.position[1],b.position[2]);let w=Math.hypot(u[0],u[2]);if(this.moving=re(this.moving,Math.min(1,w/this.walkSpeed),.15,e),this.grounded&&w>.2){let P=this.stride*(1+.35*Math.max(0,w-this.walkSpeed)/this.walkSpeed);this.bobPhase+=w/P*Math.PI*e;let S=Math.sign(Math.sin(this.bobPhase));if(S!==this.lastStepSign){this.lastStepSign=S;let k=this.crouched?.5:1+.6*this.sprintBlend;this.onFootstep?.(ve(this.groundMaterial).footstepSound,this.feet,k)}}}updateCamera(e){let t=this.engine.camera;this.crouchBlend=re(this.crouchBlend,this.crouched?1:0,.09,e),this.height=this.standHeight+(this.crouchHeight-this.standHeight)*this.crouchBlend,this.landT=re(this.landT,0,.12,e);let r=this.bobPhase,i=this.moving*(1+.8*this.sprintBlend)*(this.aiming?.35:1),s=-Math.abs(Math.sin(r))*this.bobVertical*i-this.landT*this.landingDip,n=Math.cos(r)*this.bobLateral*i,o=Math.cos(r)*this.bobRoll*ee*i-this.lean*this.leanAngle*ee;{let d=this.viewPunch,f=this.punchOmega*this.punchOmega,b=2*this.punchDamping*this.punchOmega,v=Math.max(1,Math.ceil(e/.002)),g=e/v;for(let x=0;x<v;x++)d.vp+=(-f*d.p-b*d.vp)*g,d.p+=d.vp*g,d.vy+=(-f*d.y-b*d.vy)*g,d.y+=d.vy*g,d.vr+=(-f*d.r-b*d.vr)*g,d.r+=d.vr*g}B.fromEuler(this.eyeRot,this.pitch+this.viewPunch.p,this.yaw+this.viewPunch.y,o+this.viewPunch.r);let l=m.transformQuat(m.create(),[1,0,0],this.eyeRot),c=m.create(0,1,0),u=this.height-this.eyeFromTop;m.set(this.eyePos,this.feet[0],this.feet[1]+u+s,this.feet[2]);let h=this.lean*this.leanOffset,p=m.normalize(m.create(),m.set(m.create(),Math.cos(this.yaw),0,-Math.sin(this.yaw)));if(m.scaleAndAdd(this.eyePos,this.eyePos,p,h+n),this.eyePos[1]-=Math.abs(this.lean)*.05,this.rig==="bodycam"){let d=this.pitch*.25+this.bodycamTilt*ee,f=B.fromEuler(B.create(),d,this.yaw-this.bodySway[0]*this.bodycamSway,o*1.5),b=m.transformQuat(m.create(),this.bodycamOffset,B.fromEuler(B.create(),0,this.yaw,0));m.add(t.position,this.eyePos,b),B.copy(t.rotation,f)}else m.copy(t.position,this.eyePos),B.copy(t.rotation,this.eyeRot)}get speed(){return Math.hypot(this.velocity[0],this.velocity[2])}};import{casingModes as Ji,receiverModes as Wr,IMPACTS as es}from"./vorp.js";var Qo={"5.56x45 M855":{name:"5.56\xD745mm M855 62gr",bulletMassKg:.004018,diameterM:.0057,lengthM:.0233,bcG7:.151,muzzleVelocity:948,referenceBarrelM:.508,velocityPerBarrelM:380,powderMassKg:.00168,gasVelocityFactor:1.7,casing:{lengthM:.0448,diameterM:.0095,massKg:.0063}},"5.56x45 Mk262":{name:"5.56\xD745mm Mk262 77gr",bulletMassKg:.00499,diameterM:.0057,lengthM:.0254,bcG7:.186,muzzleVelocity:850,referenceBarrelM:.457,velocityPerBarrelM:340,powderMassKg:.00162,gasVelocityFactor:1.7,casing:{lengthM:.0448,diameterM:.0095,massKg:.0063}},"7.62x51 M118LR":{name:"7.62\xD751mm M118LR 175gr",bulletMassKg:.01134,diameterM:.00782,lengthM:.0315,bcG7:.243,muzzleVelocity:790,referenceBarrelM:.559,velocityPerBarrelM:230,powderMassKg:.00272,gasVelocityFactor:1.6,casing:{lengthM:.0512,diameterM:.0119,massKg:.0123}},"9x19 124gr":{name:"9\xD719mm 124gr FMJ",bulletMassKg:.00803,diameterM:.00901,lengthM:.0155,bcG7:.072,muzzleVelocity:360,referenceBarrelM:.102,velocityPerBarrelM:300,powderMassKg:36e-5,gasVelocityFactor:1.3,casing:{lengthM:.019,diameterM:.0099,massKg:.0037}}},Hr=class extends Ue{constructor(t,r,i){super();this.spec=t;this.model=r;this.controller=i;this.rounds=t.magazineCapacity,this.mode=t.fireModes.find(n=>n!=="safe")??t.fireModes[0],this.selectorAngle=r.selector?.angles[this.mode]??0,this.flashLight=new dt,this.flashLight.enabled=!1;let s=t.caliber;this.muzzleVelocity=s.muzzleVelocity+(t.barrelLengthM-s.referenceBarrelM)*s.velocityPerBarrelM}rounds;chambered=!0;mode;ads=0;rootWorld=M.create();shotsFired=0;maxCasings=80;effectsEnabled=!0;onShot=null;triggerOverride=null;adsOverride=null;holstered=!1;maxDroppedMags=8;anim={slide:0,magOffset:0,magVisible:!0,trigger:0,lockedOpen:!1,equip:1,charge:0};reloadPhase=null;phaseT=0;magAnim={ejectSpeed:1.2,insertDistance:.14,vestDistance:.42,seatFraction:.72,fumbleChance:.25,fumbleExtra:.38,cameraDipDeg:7};fumbling=!1;rot={x:0,y:0,vx:0,vy:0};kick={z:0,vz:0,rx:0,vrx:0,rz:0,vrz:0};heat=0;wander=0;selectorAngle=0;switchT=1;back={z:0,v:0};cooldown=0;triggerHeld=!1;reloadT=-1;sway={x:0,y:0,vx:0,vy:0};breathPhase=Math.random()*10;holdBreathT=0;lastShotTime=-10;flashLight;flashLife=0;casings=[];casingByBody=new Map;rand=pe(4242);zeroAngle=0;muzzleVelocity;slideT=1e9;releaseT=-1;releaseFrom=0;rackPull=-1;rackRelease=!1;reloadNeedsCharge=!1;rackT=-1;rackSoundDone=0;sprintBlend=0;equipT=1e9;droppedMags=[];magByBody=new Map;magDropped=!1;get recoilImpulse(){let t=this.spec.caliber;return t.bulletMassKg*this.muzzleVelocity+t.powderMassKg*this.muzzleVelocity*t.gasVelocityFactor}get freeRecoilEnergy(){let t=this.recoilImpulse/this.spec.massKg;return .5*this.spec.massKg*t*t}get velocity(){return this.muzzleVelocity}onStart(){this.engine.scene.addLight(this.flashLight);for(let c of this.model.parts)c.object.viewmodel=!0,c.object.castShadow=!1,this.engine.scene.add(c.object);this.computeZero(),this.physics.onContact.push(c=>this.onCasingContact(c.body,c.speed,c.otherMaterial,c.point));let t=`Weapon: ${this.spec.name}`,r=this.spec.recoil,i=this.engine.tuning.scope(de.gl);i.number(t,this.spec,"massKg",{label:"Weapon mass",min:.5,max:12,step:.01,unit:"kg"}),i.number(t,this.spec,"barrelLengthM",{label:"Barrel length",min:.08,max:.8,step:.001,unit:"m",onChange:()=>{let c=this.spec.caliber;this.muzzleVelocity=c.muzzleVelocity+(this.spec.barrelLengthM-c.referenceBarrelM)*c.velocityPerBarrelM,this.computeZero()}}),i.number(t,this.spec,"rpm",{label:"Rate of fire",min:60,max:1200,step:1,unit:"rpm"}),i.number(t,this.spec,"zeroM",{label:"Zero distance",min:10,max:500,step:1,unit:"m",onChange:()=>this.computeZero()}),i.number(t,this.spec,"accuracyMoa",{label:"Mechanical accuracy",min:0,max:8,step:.05,unit:"MOA"}),i.number(t,r,"boreAboveShoulderM",{label:"Bore over shoulder",min:0,max:.12,step:.001,unit:"m"}),i.number(t,r,"inertia",{label:"Gun+arms inertia",min:.05,max:1,step:.005,unit:"kg\xB7m\xB2"}),i.number(t,r,"shoulderMassKg",{label:"Shoulder coupled mass",min:1,max:40,step:.5,unit:"kg"}),i.number(t,r,"holdOmega",{label:"Hold stiffness \u03C9",min:2,max:40,step:.1,unit:"rad/s"}),i.number(t,r,"holdDamping",{label:"Hold damping \u03B6",min:.1,max:2,step:.01}),i.number(t,r,"horizontalRatio",{label:"Horizontal recoil",min:0,max:1,step:.01}),i.number(t,r,"viewCouplingAds",{label:"View coupling (ADS)",min:0,max:1,step:.01}),i.number(t,r,"viewCouplingHip",{label:"View coupling (hip)",min:0,max:1,step:.01}),i.number(t,r,"residualRise",{label:"Unrecovered rise",min:0,max:1,step:.01}),r.kick===void 0&&(r.kick=1),r.cameraPunch===void 0&&(r.cameraPunch=1),r.autoClimb===void 0&&(r.autoClimb=1),i.number(t,r,"kick",{label:"In-hands kick",min:0,max:3,step:.01,help:"Visual snap of the weapon per shot (scaled by free-recoil energy)."}),i.number(t,r,"cameraPunch",{label:"Camera punch",min:0,max:3,step:.01,help:"View shake per shot that springs back."}),i.number(t,r,"autoClimb",{label:"Sustained-fire climb",min:0,max:3,step:.01,help:"How fast control degrades in long full-auto strings."}),i.number(t,this.spec.flash,"luminance",{label:"Flash luminance",min:0,max:5e6,step:1e3,unit:"cd/m\xB2"}),i.number(t,this.spec.flash,"lightCandela",{label:"Flash light",min:0,max:2e5,step:100,unit:"cd"}),i.number(t,this.spec.flash,"kelvin",{label:"Flash temperature",min:1200,max:4e3,step:10,unit:"K"}),i.number(t,this.spec.flash,"smoke",{label:"Smoke",min:0,max:3,step:.01});let s=this.engine.tuning.scope(de.oaxis),n=`Viewmodel: ${this.spec.name}`;if(s.number(n,this.spec,"eyeRelief",{label:"Eye relief (ADS)",min:.03,max:.8,step:.001,unit:"m",help:"Rifle cheek weld \u2248 0.07\u20130.09 m; pistol at arms length \u2248 0.5\u20130.65 m."}).number(n,this.spec,"adsTime",{label:"ADS time",min:.05,max:1,step:.01,unit:"s"}).number(n,this.spec.hipOffset,"0",{label:"Hip offset x",min:-.3,max:.3,step:.001,unit:"m"}).number(n,this.spec.hipOffset,"1",{label:"Hip offset y",min:-.4,max:.1,step:.001,unit:"m"}).number(n,this.spec.hipOffset,"2",{label:"Hip offset z",min:-.8,max:-.1,step:.001,unit:"m"}),this.spec.drawTime!==void 0&&s.number(n,this.spec,"drawTime",{label:"Draw time",min:.1,max:2,step:.01,unit:"s"}),this.spec.action){let c=this.spec.action;s.number(n,c,"travelM",{label:"Slide/bolt travel",min:0,max:.12,step:5e-4,unit:"m"}).number(n,c,"backMs",{label:"Recoil stroke",min:1,max:40,step:.5,unit:"ms",help:"Real pistols \u2248 4\u20137 ms rearward, 7\u201310 ms return."}).number(n,c,"returnMs",{label:"Return stroke",min:1,max:60,step:.5,unit:"ms"}).bool(n,c,"lockOpenOnEmpty",{label:"Lock open on empty"})}let o=this.spec.reload;o.charge===void 0&&(o.charge=.6),this.spec.reloadPose??=this.spec.action&&this.spec.eyeRelief>.3?{lift:.16,back:.08,pitch:.8,yaw:.2,roll:.45,chargeRoll:.3}:{lift:.06,back:.06,pitch:.3,yaw:.38,roll:.7,chargeRoll:.15};let l=this.spec.reloadPose;s.number(n,l,"lift",{label:"Reload pose: lift",min:-.1,max:.2,step:.001,unit:"m"}).number(n,l,"back",{label:"Reload pose: pull back",min:0,max:.25,step:.001,unit:"m"}).number(n,l,"pitch",{label:"Reload pose: muzzle up",min:-.5,max:1,step:.01,unit:"rad"}).number(n,l,"yaw",{label:"Reload pose: yaw",min:-1,max:1,step:.01,unit:"rad"}).number(n,l,"roll",{label:"Reload pose: roll",min:-1.2,max:1.2,step:.01,unit:"rad"}).number(n,l,"chargeRoll",{label:"Rack: extra roll",min:-1,max:1,step:.01,unit:"rad"}),s.number(n,o,"magOut",{label:"Reload: mag out",min:.05,max:3,step:.01,unit:"s"}).number(n,o,"magIn",{label:"Reload: mag in",min:.05,max:3,step:.01,unit:"s"}).number(n,o,"boltRelease",{label:"Reload: release",min:.05,max:2,step:.01,unit:"s"}).number(n,o,"charge",{label:"Reload: rack",min:.2,max:2,step:.01,unit:"s",help:"Racking the slide / charging handle after an empty reload."}).number(n,this.magAnim,"ejectSpeed",{label:"Mag eject speed",min:0,max:5,step:.05,unit:"m/s"}).number(n,this.magAnim,"vestDistance",{label:"Reload: vest distance",min:.15,max:.8,step:.01,unit:"m",help:"How far below the magwell the fresh magazine starts (the pouch on the chest)."}).number(n,this.magAnim,"fumbleChance",{label:"Reload: fumble chance",min:0,max:1,step:.05,help:"Odds that the magazine catches the magwell lip and needs a second push."}).number(n,this.magAnim,"cameraDipDeg",{label:"Reload: camera dip",min:0,max:10,step:.1,unit:"\xB0",help:"The eyes glance down at the magwell during the reload."})}get reloadTime(){return this.reloadT}get racking(){return this.reloadPhase==="charge"||this.rackT>=0}get rackProgress(){return this.reloadPhase==="charge"?this.phaseT:this.rackT>=0?Math.min(1,this.rackT/(this.spec.reload.charge??.6)):-1}get rackDisplacement(){return this.model.charge?this.anim.charge:this.anim.slide}get chargeGrip(){if(this.model.charge)return this.model.charge.grip;let t=this.model.rearSight;return m.create(t[0],t[1]-.005,t[2]-.014)}get chargeTravel(){return this.model.charge?.travelM??this.spec.action?.travelM??0}get chargePullDir(){return this.model.charge?.pullDir??m.create(0,0,1)}reload(){return this.holstered||this.reloadT>=0||this.anim.equip<1||this.rounds>=this.spec.magazineCapacity?!1:(this.startReload(),!0)}rack(){return this.holstered||this.reloadT>=0||this.rackT>=0||!this.spec.action?!1:(this.rackT=0,this.rackSoundDone=0,!0)}scrubReload(t){this.reloadT>=0&&(this.reloadT=Math.max(0,t))}reloadPlan(){let t=this.spec.reload,r=[],i=0,s=(n,o)=>{r.push({phase:n,start:i,end:i+o}),i+=o};return s("magOut",t.magOut),s("magIn",t.magIn+(this.fumbling?this.magAnim.fumbleExtra:0)),this.reloadNeedsCharge?this.anim.lockedOpen&&(this.model.charge?.release??"slingshot")==="boltRelease"||!this.spec.action?s("release",t.boltRelease):s("charge",t.charge??.6):s("settle",t.boltRelease),r}reloadTotal(){let t=this.reloadPlan();return t[t.length-1].end}holster(){this.holstered=!0,this.renderer.settings.dof.overrideWeight=0,this.reloadT=-1,this.reloadPhase=null,this.rackT=-1,this.rackPull=-1,this.ads=0,this.flashLight.enabled=!1;for(let t of this.model.parts)t.object.visible=!1}draw(t=!1){this.holstered=!1,this.equipT=t?1e9:0,this.anim.equip=t?1:0;for(let i of this.model.parts)i.object.visible=!0;if(t)return;let r=this.local(this.model.ejectionPort);this.audio.whenReady(()=>this.audio.vorp?.noise({levelSpl:58,attackMs:30,decayMs:220,hpHz:300,lpHz:3500,thumpDb:-30},r))}computeZero(){let t=this.spec,r=this.muzzleVelocity,i=9.81,s=9e-4*r/Math.max(t.caliber.bcG7,.05)*.12,n=Math.max(r-s*t.zeroM*.5,r*.6),o=t.zeroM/n,l=.5*i*o*o;this.zeroAngle=Math.atan((t.sightHeightM+l)/t.zeroM)}local(t,r=m.create()){return m.transformMat4(r,t,this.rootWorld)}onUpdate(t){if(this.updateDroppedMags(),this.holstered){this.updateCasings();return}let r=this.spec,i=this.input,s=this.controller;this.equipT+=t;let n=r.drawTime??.5;this.anim.equip=Math.min(1,this.equipT/n);let o=this.reloadT<0&&this.rackT<0&&this.anim.equip>=1;this.flashLife>0&&(this.flashLife-=t,this.flashLife<=0&&(this.flashLight.enabled=!1));let l=this.adsOverride!==null?this.adsOverride>.5:i.action("aim")&&!s.sprinting;this.ads=re(this.ads,l?1:0,r.adsTime/4,t),this.sprintBlend=re(this.sprintBlend,s.sprinting&&this.reloadT<0&&this.rackT<0?1:0,s.sprinting?.09:.07,t),s.aiming=this.ads>.5;let c=this.renderer.settings.dof;c.overrideDistance=r.eyeRelief+m.distance(this.model.frontSight,this.model.rearSight),c.overrideWeight=this.ads*this.ads*(3-2*this.ads),i.actionPressed("fireMode")&&r.fireModes.length>1&&o&&this.cycleMode(),this.switchT=Math.min(1,this.switchT+t/.28);let u=this.model.selector?.angles[this.mode]??0;this.selectorAngle=re(this.selectorAngle,u,.035,t),i.actionPressed("reload")&&o&&this.rounds<r.magazineCapacity&&this.startReload(),this.reloadT>=0&&this.updateReload(t),this.rackT>=0&&this.updateRack(t),this.cooldown-=t;let h=this.triggerOverride!==null?this.triggerOverride:i.action("fire")&&(i.locked||!!i.gamepad),p=h&&!this.triggerHeld;if(this.triggerHeld=h,this.anim.trigger=re(this.anim.trigger,h&&o?1:0,.012,t),o&&h&&(this.mode==="auto"||p))for(;this.cooldown<=0&&(this.mode==="auto"||p);){if(this.mode==="safe"){p&&this.safeClick();break}if(this.chambered?this.fire():p&&!this.anim.lockedOpen&&this.dryFire(),this.cooldown+=60/r.rpm,this.mode!=="auto"||!this.chambered)break}this.cooldown<0&&(this.cooldown=0);let d=r.recoil,f=d.holdOmega*d.holdOmega,b=2*d.holdDamping*d.holdOmega,v=Math.max(1,Math.ceil(t/.002)),g=t/v,x=d.viewCouplingHip+(d.viewCouplingAds-d.viewCouplingHip)*this.ads,w=this.rot.x,P=this.rot.y;for(let L=0;L<v;L++){this.rot.vx+=(-f*this.rot.x-b*this.rot.vx)*g,this.rot.x+=this.rot.vx*g,this.rot.vy+=(-f*this.rot.y-b*this.rot.vy)*g,this.rot.y+=this.rot.vy*g;let C=900,_=2*.8*30;this.back.v+=(-C*this.back.z-_*this.back.v)*g,this.back.z+=this.back.v*g;let A=this.kick,I=46,X=I*I,Y=2*.42*I;A.vz+=(-X*A.z-Y*A.vz)*g,A.z+=A.vz*g,A.vrx+=(-X*A.rx-Y*A.vrx)*g,A.rx+=A.vrx*g,A.vrz+=(-X*A.rz-Y*A.vrz)*g,A.rz+=A.vrz*g}this.heat=Math.max(0,this.heat-t*3.5),this.wander*=Math.exp(-t*2),s.extraPitch+=(this.rot.x-w)*x,s.extraYaw+=(this.rot.y-P)*x,w=this.rot.x,P=this.rot.y;let S=i.locked?i.lookDelta(t):{yaw:0,pitch:0},k=140,T=2*.75*Math.sqrt(k);this.sway.vx-=S.pitch*4.5*(1-.6*this.ads),this.sway.vy-=S.yaw*4.5*(1-.6*this.ads);for(let L=0;L<v;L++)this.sway.vx+=(-k*this.sway.x-T*this.sway.vx)*g,this.sway.x+=this.sway.vx*g,this.sway.vy+=(-k*this.sway.y-T*this.sway.vy)*g,this.sway.y+=this.sway.vy*g;i.action("holdBreath")&&this.ads>.5?this.holdBreathT=Math.min(this.holdBreathT+t,6):this.holdBreathT=Math.max(0,this.holdBreathT-t*.5);let G=(.0016+.004*s.moving+.01*this.sprintBlend)*(this.holdBreathT>0&&this.holdBreathT<4?.15:1)*(1-.4*this.ads);this.breathPhase+=t*(.25+.35*s.moving)*Math.PI*2;let U=Math.sin(this.breathPhase)*G,R=Math.sin(this.breathPhase*.5+1.3)*G*.6;this.updateAction(t),this.updatePose(U,R),this.updateCasings()}updateAction(t){let r=this.spec.action,i=this.anim;if(this.slideT+=t,r){let s=r.backMs/1e3,n=r.returnMs/1e3,o=8e-4,l=r.travelM*(r.lockFraction??.92),c=u=>(u=Math.min(1,Math.max(0,u)),u*u*(3-2*u));if(this.releaseT>=0){this.releaseT+=t;let u=this.releaseT/n;i.slide=this.releaseFrom*(1-c(u)**.7),u>=1&&(this.releaseT=-1,i.slide=0)}else this.rackPull>=0?i.slide=Math.max(this.rackPull,i.lockedOpen?l:0):this.slideT<s?i.slide=r.travelM*Math.sin(this.slideT/s*Math.PI/2):this.slideT<s+o?i.slide=r.travelM:i.lockedOpen?i.slide=Math.max(l,r.travelM-(r.travelM-l)*c((this.slideT-s-o)/.003)):i.slide=r.travelM*(1-c((this.slideT-s-o)/n))}if(i.charge=this.rackPull>=0||this.rackRelease?i.slide:0,this.rackRelease&&i.slide<=0&&(this.rackRelease=!1),i.magOffset=0,i.magVisible=!0,this.reloadT>=0&&this.model.magAxis){let s=this.spec.reload,n=this.reloadT,o=s.magIn+(this.fumbling?this.magAnim.fumbleExtra:0);if(n<s.magOut)i.magVisible=!this.magDropped,i.magOffset=0;else if(n<s.magOut+o){let l=(n-s.magOut)/o,c=this.magAnim.seatFraction,u=this.magAnim.vestDistance,h=p=>(p=Math.min(1,Math.max(0,p)),p*p*(3-2*p));if(this.fumbling){let p=c*.6,d=c*.78;if(l<p)i.magOffset=u-(u-.035)*h(l/p);else if(l<d){let f=(l-p)/(d-p);i.magOffset=.035+.04*Math.sin(Math.PI*Math.min(1,f*1.15))}else i.magOffset=.07*(1-h((l-d)/(c-d)));l>=c&&(i.magOffset=0)}else{let p=h(l/c);i.magOffset=u*(1-p)}}}}updatePose(t,r){let i=this.spec,s=this.engine.camera,n=this.controller,o=n.eyeRot,l=n.eyePos,c=Math.sin(Math.PI*this.switchT)*(1-this.switchT*.3),u=B.fromEuler(B.create(),this.sway.x+t+this.rot.x+this.kick.rx-.02*c,this.sway.y+r+this.rot.y,this.sway.y*.6+this.kick.rz+.12*c),h=this.sprintBlend*this.sprintBlend*(3-2*this.sprintBlend),p=B.fromEuler(B.create(),-.35,.55,.25),d=this.reloadPose(),f=B.multiply(B.create(),o,u);B.multiply(f,f,B.slerp(B.create(),B.create(),p,h)),B.multiply(f,f,d.q);let b=1-this.anim.equip;b>0&&B.multiply(f,f,B.fromEuler(B.create(),-1.1*b*b,.25*b,.5*b*b));let v=m.transformQuat(m.create(),i.hipOffset,o);m.add(v,v,l);let g=m.transformQuat(m.create(),[0,0,-1],o),x=m.transformQuat(m.create(),this.model.rearSight,f),w=m.scaleAndAdd(m.create(),l,g,i.eyeRelief);m.sub(w,w,x);let P=this.ads*this.ads*(3-2*this.ads),S=m.lerp(m.create(),v,w,P),k=m.transformQuat(m.create(),[-.02*h,d.lift-this.equipDrop()-.01*c-.05*h,this.back.z+this.kick.z+d.back+.06*h],f);m.add(S,S,k);let T=Math.sin(this.engine.time*7)*.003*n.moving*(1-P)*(1+1.5*h);S[1]+=T,M.fromRotationTranslation(this.rootWorld,f,S);let G=this.anim,U=this.model.magAxis,R=(this.model.triggerTravelM??0)*G.trigger;for(let L of this.model.parts){let C=L.object.transform;if(L.bolt&&G.slide!==0?M.translate(C,this.rootWorld,[0,0,G.slide]):L.charge&&G.charge!==0?M.translate(C,this.rootWorld,[0,0,G.charge]):L.magazine&&U&&G.magOffset!==0?M.translate(C,this.rootWorld,[U[0]*G.magOffset,U[1]*G.magOffset,U[2]*G.magOffset]):L.trigger&&R!==0?M.translate(C,this.rootWorld,[0,0,R]):(!L.bolt||G.slide===0)&&(!L.charge||G.charge===0)&&M.copy(C,this.rootWorld),L.selector&&this.model.selector){let _=this.model.selector,A=B.setAxisAngle(B.create(),_.axis,this.selectorAngle),I=M.fromRotationTranslation(M.create(),A,[0,0,0]);M.translate(C,C,_.pivot),M.multiply(C,C,I),M.translate(C,C,[-_.pivot[0],-_.pivot[1],-_.pivot[2]])}M.multiply(C,C,L.local),L.magazine&&(L.object.visible=G.magVisible&&(!L.round||this.rounds>0))}}equipDrop(){let t=1-this.anim.equip;return .28*t*t*(3-2*t)}reloadPose(){let t=this.spec.reloadPose,r=o=>(o=Math.min(1,Math.max(0,o)),o*o*(3-2*o)),i=0,s=0;if(this.reloadT>=0){let o=this.reloadTotal();i=r(this.reloadT/.28)*r((o-this.reloadT)/.32),(this.reloadPhase==="charge"||this.reloadPhase==="release")&&(s=Math.sin(Math.PI*Math.min(1,this.phaseT))*i)}else if(this.rackT>=0){let o=this.spec.reload.charge??.6;i=r(this.rackT/.2)*r((o-this.rackT)/.25)*.6,s=Math.sin(Math.PI*Math.min(1,this.rackT/o))}return i===0?{q:B.create(),lift:0,back:0}:{q:B.fromEuler(B.create(),t.pitch*i,t.yaw*i,t.roll*i+t.chargeRoll*s),lift:t.lift*i,back:t.back*i}}updateRack(t){let r=this.spec.reload.charge??.6;this.rackT+=t,this.rackCycle(this.rackT/r,this.rackT-t<0),this.rackT>=r&&(this.rackT=-1,this.rackPull=-1)}rackCycle(t,r){let i=this.chargeTravel,s=o=>(o=Math.min(1,Math.max(0,o)),o*o*(3-2*o)),n=this.local(this.model.ejectionPort);if(r&&(this.rackSoundDone=0),t<.3){this.rackPull=-1;return}if(t<.55){let o=s((t-.3)/.25);this.rackPull=i*(.08+.92*o),this.rackSoundDone<1&&(this.rackSoundDone=1,this.audio.mech(this.model.charge?"chargingHandle":"slideRack",n)),o>.97&&this.rackSoundDone<2&&(this.rackSoundDone=2,this.audio.mech("slideStop",n),this.chambered&&(this.ejectCasing(),this.chambered=!1));return}this.rackSoundDone<3&&(this.rackSoundDone=3,this.rackPull=-1,this.releaseFrom=Math.max(this.anim.slide,i),this.releaseT=0,this.anim.lockedOpen=!1,this.rackRelease=!0,this.audio.mech("slideHome",n),this.rounds>0&&!this.chambered&&(this.rounds--,this.chambered=!0))}startReload(){this.reloadT=0,this.reloadNeedsCharge=!this.chambered,this.reloadPhase="magOut",this.phaseT=0,this.rackSoundDone=0,this.magDropped=!1,this.fumbling=this.rand.next()<this.magAnim.fumbleChance,this.reloadEvents=0}reloadEvents=0;dipCur=0;get releaseAt(){return Math.min(.12,this.spec.reload.magOut*.3)}updateReload(t){let r=this.spec.reload,i=this.reloadT;this.reloadT+=t;let s=this.local(this.model.ejectionPort),n=f=>i<f&&this.reloadT>=f,o=this.reloadPlan(),l=o.find(f=>this.reloadT<f.end)??o[o.length-1],c=this.reloadPhase;this.reloadPhase=l.phase,this.phaseT=Math.min(1,Math.max(0,(this.reloadT-l.start)/Math.max(1e-6,l.end-l.start))),n(this.releaseAt)&&this.model.magBox&&(this.audio.mech("magRelease",s),this.dropMagazine(),this.audio.mech("magOut",s,{delayMs:40}));let u=r.magIn+(this.fumbling?this.magAnim.fumbleExtra:0),h=r.magOut+u*this.magAnim.seatFraction;if(this.fumbling&&n(r.magOut+r.magIn*this.magAnim.seatFraction*.92)&&(this.audio.modal(Wr(.8),[{timeMs:0,amp:.45,contactMs:.16,noiseDb:-6}],s,.7),this.audio.whenReady(()=>this.audio.vorp?.noise({levelSpl:62,attackMs:2,decayMs:40,hpHz:300,lpHz:3e3,thumpDb:-10},s))),n(h)&&(this.audio.mech("magSeat",s),this.rounds=this.spec.magazineCapacity),l.phase==="release"?this.phaseT>=.5&&this.anim.lockedOpen&&(this.anim.lockedOpen=!1,this.releaseFrom=this.anim.slide,this.releaseT=0,this.audio.mech("boltCatch",s),this.audio.mech("slideHome",s,{delayMs:25}),this.rounds>0&&(this.rounds--,this.chambered=!0)):l.phase==="charge"&&this.rackCycle(this.phaseT,c!=="charge"),this.reloadT>=l.end&&l===o[o.length-1]){!this.chambered&&this.rounds>0&&(this.rounds--,this.chambered=!0),this.anim.lockedOpen=!1,this.reloadT=-1,this.reloadPhase=null,this.rackPull=-1;let f=this.controller.eyePos;this.audio.breath([f[0],f[1]-.1,f[2]],{delayMs:120})}let p=this.reloadT>=0&&(l.phase==="magOut"||l.phase==="magIn")?this.magAnim.cameraDipDeg*ee*(l.phase==="magOut"?Math.min(1,this.phaseT*2.5):1):0,d=re(this.dipCur,p,.12,t);this.controller.extraPitch-=d-this.dipCur,this.dipCur=d}cycleMode(){let t=this.spec.fireModes;this.mode=t[(t.indexOf(this.mode)+1)%t.length],this.switchT=0;let r=this.model.selector?m.transformMat4(m.create(),this.model.selector.pivot,this.rootWorld):this.local(this.model.ejectionPort);this.audio.mech("selector",r),this.input.rumble(.15,.05,25)}safeClick(){this.audio.modal(Wr(.8),[{timeMs:0,amp:.15,contactMs:.08,noiseDb:-14}],this.local(this.model.ejectionPort),.35)}dryFire(){this.audio.mech("dryFire",this.local(this.model.ejectionPort))}fire(){let t=this.spec,r=t.caliber,i=this.local(this.model.muzzle),s=this.local(this.model.rearSight),n=this.local(this.model.frontSight),o=m.normalize(m.create(),m.sub(m.create(),n,s)),l=m.normalize(m.create(),m.set(m.create(),this.rootWorld[0],this.rootWorld[1],this.rootWorld[2])),c=m.cross(m.create(),l,o),u=t.accuracyMoa/60*ee,h=this.rand.gauss()*u*.5,p=this.rand.gauss()*u*.5,d=m.normalize(m.create(),m.set(m.create(),o[0]+c[0]*(this.zeroAngle+p)+l[0]*h,o[1]+c[1]*(this.zeroAngle+p)+l[1]*h,o[2]+c[2]*(this.zeroAngle+p)+l[2]*h)),f=this.muzzleVelocity*(1+this.rand.gauss()*.004),b=m.scale(m.create(),d,f);m.add(b,b,this.controller.velocity);let v=m.scaleAndAdd(m.create(),i,d,-.05);this.physics.spawnProjectile(v,b,{bcG7:r.bcG7,massKg:r.bulletMassKg,diameterM:r.diameterM,maxTime:6,userId:1}),this.audio.projectileInfo.set(1,{diameter:r.diameterM,length:r.lengthM});let g={};t.suppressed&&(g.suppress=1,g.firstPopDb=this.engine.time-this.lastShotTime>4?4:0),this.mode==="auto"&&(g.auto=1),this.effectsEnabled&&this.audio.gunshot(t.audio,i,d,this.local(this.model.ejectionPort),g);let x=this.recoilImpulse,w=t.recoil,P=x/(t.massKg+w.shoulderMassKg);this.back.v+=P;let S=x*w.boreAboveShoulderM/w.inertia,k=w.autoClimb??1;this.heat=Math.min(12,this.heat+1),this.wander=Math.max(-1.5,Math.min(1.5,this.wander+this.rand.gauss()*.45));let T=1+this.heat*.07*k;this.rot.vx+=S*(.85+.3*this.rand.next())*T,this.rot.vy+=S*w.horizontalRatio*(this.wander*.55+this.rand.gauss()*.5)*T,this.controller.extraPitch+=S/w.holdOmega*w.residualRise*(1+this.heat*.05*k);let G=(w.kick??1)*Math.min(2.5,Math.sqrt(this.freeRecoilEnergy/5));this.kick.vz+=.9*G,this.kick.vrx+=(2.2+this.rand.next()*.8)*G*(w.boreAboveShoulderM/.035),this.kick.vrz+=this.rand.gauss()*1.1*G;let U=(w.cameraPunch??1)*G;this.controller.punch(.9*U,this.rand.gauss()*.25*U,this.rand.gauss()*.55*U),this.input.rumble(Math.min(1,.6+.3*G),Math.min(1,.4+.3*G),70),this.effectsEnabled&&this.muzzleEffects(i,d),this.ejectCasing(),this.lastShotTime=this.engine.time,this.shotsFired++,this.rounds>0?(this.rounds--,this.chambered=!0):this.chambered=!1,this.slideT=0,this.releaseT=-1,!this.chambered&&this.spec.action?.lockOpenOnEmpty&&(this.anim.lockedOpen=!0),this.onShot?.(i,d)}muzzleEffects(t,r){let i=this.spec.flash,s=this.renderer.particles,n=_t(i.kelvin),o=.8+.4*this.rand.next();if(!this.spec.suppressed){if(s.spawn({kind:1,position:m.scaleAndAdd(m.create(),t,r,i.sizeM*.35),life:.022,size0:i.sizeM*o,size1:i.sizeM*o*1.15,color:n,alpha0:1,alpha1:1,luminance:i.luminance,rotation:this.rand.next()*6.28}),s.spawn({kind:1,position:m.scaleAndAdd(m.create(),t,r,i.sizeM*1.1),life:.018,size0:i.sizeM*.6*o,size1:i.sizeM*.7,color:n,alpha0:.8,alpha1:.6,luminance:i.luminance*.4}),i.sidePorts)for(let u of[-1,1]){let h=m.set(m.create(),this.rootWorld[0]*u,this.rootWorld[1]*u,this.rootWorld[2]*u);s.spawn({kind:1,position:m.scaleAndAdd(m.create(),t,h,.03),life:.015,size0:i.sizeM*.35,size1:i.sizeM*.45,color:n,alpha0:.7,alpha1:.4,luminance:i.luminance*.5})}this.flashLight.enabled=i.lightCandela>0,this.flashLight.position.set(m.scaleAndAdd(m.create(),t,r,.15)),this.flashLight.color=n,this.flashLight.intensity=i.lightCandela*o,this.flashLight.range=18,this.flashLight.radius=.05,this.flashLife=.017}let l=Math.round(3*i.smoke);for(let u=0;u<l;u++){let h=m.scale(m.create(),r,2+this.rand.next()*4);h[1]+=.3+this.rand.next()*.3,s.spawn({kind:0,position:m.scaleAndAdd(m.create(),t,r,.05+u*.08),velocity:h,life:1.6+this.rand.next()*1.4,size0:.04,size1:.45+this.rand.next()*.3,color:[.78,.77,.75],alpha0:.22,alpha1:0,drag:2.8,buoyancy:.25,spin:this.rand.range(-.6,.6),fadeIn:.02})}let c=this.local(this.model.ejectionPort);s.spawn({kind:0,position:c,velocity:[this.rootWorld[0]*.8,.3,this.rootWorld[2]*.8],life:.9,size0:.02,size1:.14,color:[.8,.8,.78],alpha0:.15,alpha1:0,drag:3,buoyancy:.2})}ejectCasing(){let t=this.spec.caliber.casing,r=this.spec.ejection,i=this.local(this.model.ejectionPort),s=this.physics.createBody(2,[t.diameterM/2,Math.max(.001,t.lengthM/2-t.diameterM/2),0],t.massKg,Q.BRASS),n=M.getRotation(B.create(),this.rootWorld),o=B.rotateX(B.create(),n,Math.PI/2);s.setTransform(i,o);let l=(d,f,b)=>m.transformQuat(m.create(),[d,f,b],n),c=l(r.speed*(.9+.2*this.rand.next()),r.up*(.8+.4*this.rand.next()),r.back*(.8+.4*this.rand.next()));m.add(c,c,this.controller.velocity);let u=l(this.rand.gauss()*r.spinRad*.3,r.spinRad*(.7+.6*this.rand.next()),this.rand.gauss()*r.spinRad*.3);s.setVelocity(c,u);let h=new ye(this.model.casingMesh,this.model.casingMaterial);h.castShadow=!0,this.engine.scene.add(h);let p={body:s,obj:h,born:this.engine.time,lastSound:-1,settled:!1};for(this.casings.push(p),this.casingByBody.set(s.id,p);this.casings.length>this.maxCasings;)this.removeCasing(this.casings[0])}dropMagazine(){let t=this.model.magBox,r=this.model.magAxis??m.create(0,-1,0),i=this.model.parts.filter(h=>h.magazine&&(!h.round||this.rounds>0));if(!i.length)return;let s=.08+.0118*this.rounds*(this.spec.caliber.bulletMassKg/.008*.5+.5),n=this.physics.createBody(1,[t.half[0],t.half[1],t.half[2]],s,Q.POLYMER),o=M.getRotation(B.create(),this.rootWorld);n.setTransform(this.local(t.center),o);let l=m.transformQuat(m.create(),[r[0]*this.magAnim.ejectSpeed,r[1]*this.magAnim.ejectSpeed,r[2]*this.magAnim.ejectSpeed],o);m.add(l,l,this.controller.velocity),n.setVelocity(l,[this.rand.gauss()*1.5,this.rand.gauss()*.5,this.rand.gauss()*2]);let c=i.map(h=>{let p=new ye(h.object.mesh,h.object.material);return p.castShadow=!0,this.engine.scene.add(p),p}),u={body:n,objs:c,lastSound:-1};for(this.droppedMags.push(u),this.magByBody.set(n.id,u),this.magDropped=!0;this.droppedMags.length>this.maxDroppedMags;){let h=this.droppedMags.shift();h.body.remove();for(let p of h.objs)this.engine.scene.remove(p);this.magByBody.delete(h.body.id)}this.updateDroppedMags()}tm=M.create();updateDroppedMags(){if(!this.droppedMags.length)return;let t=this.model.magBox.center;for(let r of this.droppedMags){let i=r.body.state();if(!(i[0]<.5)){this.tq[0]=i[4],this.tq[1]=i[5],this.tq[2]=i[6],this.tq[3]=i[7],M.fromRotationTranslation(this.tm,this.tq,[i[1],i[2],i[3]]),M.translate(this.tm,this.tm,[-t[0],-t[1],-t[2]]);for(let s of r.objs)M.copy(s.transform,this.tm)}}}removeCasing(t){t.body.remove(),this.engine.scene.remove(t.obj),this.casingByBody.delete(t.body.id),this.casings.splice(this.casings.indexOf(t),1)}tq=B.create();updateCasings(){for(let t of this.casings){let r=t.body.state();r[0]<.5||(this.tq[0]=r[4],this.tq[1]=r[5],this.tq[2]=r[6],this.tq[3]=r[7],M.fromRotationTranslation(t.obj.transform,this.tq,[r[1],r[2],r[3]]),t.settled=r[14]>.5)}}onCasingContact(t,r,i,s){let n=this.magByBody.get(t);if(n){if(r<.3||this.engine.time-n.lastSound<.06)return;n.lastSound=this.engine.time,Math.min(1.5,r/2.5)>.35&&this.audio.mech(ve(i).hard?"magDropConcrete":"magDropDirt",s);return}let o=this.casingByBody.get(t);if(!o||r<.35)return;let l=this.engine.time;if(l-o.lastSound<.05)return;o.lastSound=l;let c=ve(i),u=Math.min(1.5,r/3);if(c.hard){let h=this.spec.caliber.casing;this.audio.modal(Ji(h.lengthM,h.diameterM),[{timeMs:0,amp:u,contactMs:.03+.05*(1-u),noiseDb:-12}],s,.05+.08*u)}else this.audio.whenReady(()=>this.audio.vorp?.noise({...es.dirt,levelSpl:52+14*u,decayMs:40,thumpDb:-6,grainsPerS:200},s))}};function Zo(a,e,t,r={}){let i=e/2,s=a;if(r.straight){let l=i*.955;return t([[0,-s/2],[i*.99,-s/2],[i*.99,-s/2+.0011],[i*.82,-s/2+.0015],[i*.82,-s/2+.0026],[i*.985,-s/2+.0032],[l,s/2],[l*.9,s/2],[l*.9,s/2-.002]],18)}let n=i*.68,o=[[0,-s/2],[i*.98,-s/2],[i*.98,-s/2+.0012],[i*.86,-s/2+.0016],[i*.86,-s/2+.0028],[i,-s/2+.0034],[i*.97,s/2-s*.22],[n,s/2-s*.13],[n,s/2],[n*.85,s/2]];return t(o,16)}import{plateModes as ts}from"./vorp.js";var qr=class{constructor(e,t,r,i,s){this.spec=e;this.yaw=r;this.plate=i;this.pivot=m.clone(t),this.mass=7850*e.width*e.height*e.thickness,this.L=e.hangLength+e.height/2,this.inertia=this.mass*(this.L*this.L+(e.height*e.height+e.thickness*e.thickness)/12),this.twistInertia=this.mass*e.width*e.width/12,this.body=s.createBody(1,[e.width/2,e.height/2,e.thickness/2],5e3,Q.STEEL_TARGET),this.sync()}angle=0;omega=0;twist=0;twistOmega=0;mass;pivot;body;hits=0;inertia;twistInertia;L;matrix(e=M.create()){let t=B.create();B.rotateY(t,t,this.yaw+this.twist),B.rotateX(t,t,-this.angle);let r=m.transformQuat(m.create(),[0,-this.L,0],t);return M.fromRotationTranslation(e,t,m.add(m.create(),this.pivot,r))}sync(){let e=this.matrix();this.plate.setTransform(e);let t=M.getRotation(B.create(),e);this.body.setTransform([e[12],e[13],e[14]],t),this.body.setVelocity([0,0,0],[0,0,0])}step(e){let r=Math.sqrt(this.mass*9.81*this.L/this.inertia),i=2*this.spec.damping*r,s=4,n=e/s;for(let o=0;o<s;o++){let l=-(this.mass*9.81*this.L*Math.sin(this.angle))/this.inertia-i*this.omega;this.omega+=l*n,this.angle+=this.omega*n,this.twistOmega+=(-6*this.twist-2*.15*Math.sqrt(6)*this.twistOmega)*n,this.twist+=this.twistOmega*n}this.sync()}hit(e,t){let r=this.matrix(),i=M.invert(M.create(),r),s=m.transformMat4(m.create(),t,i),n=s[0]/this.spec.width+.5,o=.5-s[1]/this.spec.height,l=m.normalize(m.create(),m.set(m.create(),r[0],r[1],r[2])),c=m.sub(m.create(),t,this.pivot),u=m.cross(m.create(),c,e);this.omega-=m.dot(u,l)/this.inertia;let h=m.create(0,1,0);return this.twistOmega+=m.dot(u,h)/this.twistInertia*.5,this.hits++,{u:Math.min(1,Math.max(0,n)),v:Math.min(1,Math.max(0,o))}}},$r=class{constructor(e,t,r){this.object=e;this.width=t;this.height=r}hits=0},Kr=class{constructor(e,t=.004){this.engine=e;this.bulletMass=t;e.physics.onProjectileHit.push(r=>this.onProjectileHit(r)),e.onFixed.push(r=>{for(let i of this.steel.values())i.step(r);this.checkPaper()})}steel=new Map;paper=[];rand=pe(9001);lastProj=new Map;steelMomentumTransfer=1.3;onHit=null;addSteel(e){this.steel.set(e.body.id,e)}addPaper(e){this.paper.push(e)}get renderer(){return this.engine.renderer}onProjectileHit(e){let t=e.body>=0?this.steel.get(e.body):void 0,r=m.length(e.velocity),i=.5*this.bulletMass*r*r;if(t){this.hitSteel(t,e,r);return}let s=ve(e.material);this.onHit?.(e,s.name);let n=this.renderer;s.decal!==null&&!e.ricochet&&n.decals.add(s.decal,e.point,e.normal,s.decalSize*(.8+.4*this.rand.next())),e.ricochet&&n.decals.add(4,e.point,e.normal,.02);let o=e.normal,l=m.normalize(m.create(),m.scaleAndAdd(m.create(),e.velocity,o,-2*m.dot(e.velocity,o)));if(s.debris==="dust"||s.debris==="splinters"){let u=s.debris==="dust"?5:3;for(let h=0;h<u;h++){let p=m.scale(m.create(),m.normalize(m.create(),m.set(m.create(),o[0]+this.rand.range(-.6,.6),o[1]+this.rand.range(0,.8),o[2]+this.rand.range(-.6,.6))),.8+this.rand.next()*2.5);n.particles.spawn({kind:3,position:e.point,velocity:p,life:.8+this.rand.next()*1.4,size0:.04,size1:.35+this.rand.next()*.3,color:s.debrisColor,alpha0:.55,alpha1:0,drag:3.5,gravity:.6})}for(let h=0;h<6;h++){let p=m.scale(m.create(),m.normalize(m.create(),m.set(m.create(),o[0]+this.rand.range(-.5,.5),o[1]+this.rand.range(.2,1),o[2]+this.rand.range(-.5,.5))),2+this.rand.next()*4);n.particles.spawn({kind:3,position:e.point,velocity:p,life:.5+this.rand.next()*.4,size0:.012,size1:.01,color:[s.debrisColor[0]*.5,s.debrisColor[1]*.5,s.debrisColor[2]*.5],alpha0:.9,alpha1:.6,gravity:9.81,drag:.4})}}else s.debris==="sparks"&&this.sparks(e.point,l,o,10);let c=10*Math.log10(Math.max(i,1)/1500);this.engine.audio.impact(s.impactSound,e.point,c)}sparks(e,t,r,i){for(let s=0;s<i;s++){let n=m.normalize(m.create(),m.set(m.create(),t[0]+r[0]*.5+this.rand.range(-.7,.7),t[1]+r[1]*.5+this.rand.range(-.4,.7),t[2]+r[2]*.5+this.rand.range(-.7,.7)));m.scale(n,n,4+this.rand.next()*10),this.renderer.particles.spawn({kind:2,position:e,velocity:n,life:.08+this.rand.next()*.25,size0:.0035,size1:.002,color:[1,.62,.28],alpha0:1,alpha1:.3,luminance:6e4,gravity:9.81,drag:1.2,stretch:.012})}this.renderer.particles.spawn({kind:1,position:e,life:.02,size0:.05,size1:.07,color:[1,.8,.55],alpha0:1,alpha1:1,luminance:15e4})}hitSteel(e,t,r){let i=m.normalize(m.create(),t.velocity),s=m.scale(m.create(),i,this.bulletMass*r*this.steelMomentumTransfer),{u:n,v:o}=e.hit(s,t.point);this.renderer.decals.add(4,t.point,t.normal,.06+this.rand.next()*.04,e.plate);let l=m.normalize(m.create(),m.scaleAndAdd(m.create(),i,t.normal,-2*m.dot(i,t.normal)));this.sparks(t.point,l,t.normal,14),this.renderer.particles.spawn({kind:3,position:t.point,velocity:[t.normal[0],t.normal[1]+.3,t.normal[2]],life:.6,size0:.05,size1:.3,color:[.55,.55,.55],alpha0:.35,alpha1:0,drag:4});let c=e.spec,u=ts({width:c.width,height:c.height,thickness:c.thickness,hitU:n,hitV:o,t60Fundamental:c.ringT60,level:30}),h=Math.min(2,(r/800)**2*1.2);this.engine.audio.modal(u,[{timeMs:0,amp:h,contactMs:.02,noiseDb:-14}],t.point,1,{bus:1}),this.onHit?.(t,"steel target")}checkPaper(){if(!this.paper.length){this.lastProj.clear();return}let e=this.engine.physics.projectiles(),t=new Set;for(let r of e){t.add(r.id);let i=this.lastProj.get(r.id);if(this.lastProj.set(r.id,m.clone(r.position)),!!i)for(let s of this.paper){let n=s.object.transform,o=m.create(n[12],n[13],n[14]),l=m.normalize(m.create(),m.set(m.create(),n[8],n[9],n[10])),c=m.dot(m.sub(m.create(),i,o),l),u=m.dot(m.sub(m.create(),r.position,o),l);if(c*u>0)continue;let h=c/(c-u),p=m.lerp(m.create(),i,r.position,h),d=M.invert(M.create(),n),f=m.transformMat4(m.create(),p,d);Math.abs(f[0])>s.width/2||Math.abs(f[1])>s.height/2||(s.hits++,this.renderer.decals.add(3,m.scaleAndAdd(m.create(),p,l,.001),l,.014,s.object),this.renderer.decals.add(3,m.scaleAndAdd(m.create(),p,l,-.004),m.negate(m.create(),l),.02,s.object),this.engine.audio.impact("paper",p,0))}}for(let r of[...this.lastProj.keys()])t.has(r)||this.lastProj.delete(r)}};export{Tt as AudioSystem,Ue as Behaviour,Xt as Body,Yt as BodyShape,Qo as CALIBERS,Js as CLOUD_ENV_CUBE_SIZE,ht as Camera,Kt as Character,at as Clouds,ee as DEG2RAD,Wt as DecalKind,vt as DecalSystem,St as DevUI,is as EPSILON,Nr as Engine,Ze as FGLDevice,Co as FOOTSTEPS,jr as FPSController,Hr as Firearm,$e as GIBaker,De as Geometry,mt as IBL,Kr as ImpactSystem,Mt as Input,xe as MATERIAL_FLAGS,ar as MATERIAL_UNIFORM_BYTES,de as MODULES,Te as Material,it as MaterialSynth,Oe as Mesh,Gt as MeshRendererC,Ot as MipGenerator,$r as PaperTarget,jt as ParticleKind,gt as ParticleSystem,kt as PhysicsWorld,dt as PointLight,rs as RAD2DEG,ye as RenderObject,xt as Renderer,nr as SKIN_LAYOUT,et as SKIN_STRIDE,Q as SURFACE,Ke as SURFACES,pt as Scene,qe as ScriptsC,ct as Sky,qr as SteelTarget,os as TEX_USAGE_RT,ls as TEX_USAGE_STORAGE,cr as Terrain,tt as TextureCache,wt as Transform,Ae as TransformC,Pt as Tuning,Je as UniformWriter,Dt as VERTEX_LAYOUT,sr as VERTEX_STRIDE,Es as WGSL_MATERIAL,ut as Wind,yt as World,se as aabb,Bt as aabbInFrustum,$s as berm,Jr as box,ci as buildLayerTextures,Ms as capsule,Zo as casingGeometry,ks as circle2,Qe as clamp,gr as computeCascades,Et as computeTangents,vs as cylinder,re as damp,ui as defaultClouds,Ii as defaultRenderSettings,br as defaultShadows,wi as defaultSky,Ui as defaultWind,Ge as defineComponent,Bs as emptyBounds,rr as ev100FromCamera,ds as exposureFromEv100,Lt as extractFrustumPlanes,Ss as extrude,Zi as fillInvalid,Ct as halton,Xs as heightMax,or as heightRule,Ys as heightSum,ms as hexToLinear,_t as kelvinToLinear,tr as kelvinToLinearY1,ei as lathe,Qr as lerp,us as linearToSrgb,ir as lumensToCandela,M as mat4,oe as mipCount,Ks as mound,ys as plane,B as quat,Qs as regionMask,Ir as registerAudioTuning,Fr as registerRenderTuning,zo as registerSurfaces,pe as rng,Ts as roundRect2,gs as roundedBox,Yr as saturate,ss as smoothstep,xs as sphere,Rt as srgbToLinear,pr as sunDirection,hr as sunTransmittance,To as surfaceAlbedoTable,ve as surfaceOf,Ft as terrainFbm,fe as terrainNoise,ws as torus,ti as triangulate,Ps as tube,m as vec3,ns as vec4,rt as wgslMaterial};
//# sourceMappingURL=fondainegl.js.map
