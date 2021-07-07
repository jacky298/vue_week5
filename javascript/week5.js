import detailModal from './detailModal.js'

//  Vue.config.devtools = true;

const url = 'https://vue3-course-api.hexschool.io';
const apiPath = 'jacky298';

const app = Vue.createApp({
  data(){
    return{
      //all products
      products:[],
      //product
      product:{},
      //loading
      loadingStatus:{
        loadingStatus:''
      },
      //form structure
      form:{
        user:{
          name:'',
          email:'',
          tel:'',
          address:'',
        },
        message:'',
      },
      //cart
      cartList:{}

    }
  },
  methods:{
      getProductList(){
        const api=`${url}/api/${apiPath}/products`;
        axios.get(api).then(res=>{
            if(res.data.success)
            {
              const {products} = res.data;
              this.products = products;
              // console.log(this.products);
            }else{
              alert(res.data.success);
            }
          })
          .catch(err=>console.log(err))
      },
      getProduct(item){
        this.loadingStatus.loadingStatus = item.id;
        const api=`${url}/api/${apiPath}/product/${item.id}`
        axios.get(api).then(res=>{
          console.log(res.data);
          if(res.data.success)
          {
            const {product} = res.data;
            this.product = product;
            this.loadingStatus.loadingStatus = '';
            this.$refs.detailModal.openModal();
          }
        })
        .catch(err=>console.log(err))
      },
      addCart(id,qty=1){
        this.loadingStatus.loadingStatus = id;
        //define the cart structure
        const cart = {
          product_id: id,
          qty,

        };
        const api=`${url}/api/${apiPath}/cart`; 
        axios.post(api,{data: cart}).then(res=>{
          console.log(res.data);
          if(res.data.success)
          {
            this.loadingStatus.loadingStatus = '';
            this.getCart();
            this.$refs.detailModal.hideModal();
          }
        })
        .catch(err=>console.log(err))
      },
      getCart(){
        const api=`${url}/api/${apiPath}/cart`
        axios.get(api).then(res=>{
          console.log(res.data);
          if(res.data.success)
          {
            this.cartList = res.data.data;
            
          }
        })
        .catch(err=>console.log(err))
      },
      updateCart(item){
        const api=`${url}/api/${apiPath}/cart/${item.id}`;
        const cart = {
          product_id: item.product.id,
          qty: item.qty,

        };
        console.log(cart,api);
        axios.put(api,{data:cart}).then(res=>{
          console.log(res.data);
          if(res.data.success)
          {
            this.getCart();
          }
        })
        .catch(err=>console.log(err))
      },
      delProductInCart(id){
        this.loadingStatus.loadingStatus = id;
        const api=`${url}/api/${apiPath}/cart/${id}`;
        
        axios.delete(api).then(res=>{
          if(res.data.success)
          {
            this.getCart();
            this.loadingStatus.loadingStatus = '';
          }else{
            alert(res.data.message);
          }
        })
        .catch(err=>console.log(err))
      },
      delAll(){
        const api=`${url}/api/${apiPath}/carts`;
        
        axios.delete(api).then(res=>{
          if(res.data.success)
          {
            this.getCart();
            
          }else{
            alert(res.data.message);
          }
          
        })
        .catch(err=>console.log(err))
      },
      onSubmit(){
        const api=`${url}/api/${apiPath}/order`;
        console.log(this.form);
        axios.post(api,{data:this.form}).then(res=>{
          if(res.data.success)
          {
            alert(res.data.message);
            this.$refs.form.resetForm();
            this.getCart();
          }else{
            alert(res.data.message);
          }
          
        })
        .catch(err=>console.log(err))
      }

  },
  mounted(){
    this.getProductList();
    this.getCart();
  },
});

VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');

// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true, // 調整為輸入字元立即進行驗證
});


Object.keys(VeeValidateRules).forEach(rule => {
  if (rule !== 'default') {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});

  app.component('detailModal',detailModal);
  app.component('VForm', VeeValidate.Form);
  app.component('VField', VeeValidate.Field);
  app.component('ErrorMessage', VeeValidate.ErrorMessage);
  app.mount('#app');