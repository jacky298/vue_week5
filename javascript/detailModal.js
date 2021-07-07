export default {
  data(){
    return{
      modal:'',
      qty:1,
      url : 'https://vue3-course-api.hexschool.io',
      apiPath : 'jacky298',
      tempProduct:{}
    }
  },
  props:['product'],
  watch:{
    product(){
      this.tempProduct = this.product;
    }
  },
  // template:`<div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
  // aria-hidden="true" ref="modal">
  //   <div class="modal-dialog modal-xl" role="document">
  //     <div class="modal-content border-0">
  //       <div class="modal-header bg-dark text-white">
  //         <h5 class="modal-title" id="exampleModalLabel">
  //           <span>{{tempProduct.title}} </span>
  //         </h5>
  //         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  //       </div>
  //       <div class="modal-body">
  //         <div class="row">
  //           <div class="col-sm-6">
  //             <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
  //           </div>
  //           <div class="col-sm-6">
  //             <span class="badge bg-primary rounded-pill">{{tempProduct.category}}</span>
  //             <p>商品描述：{{tempProduct.description}}</p>
  //             <p>商品內容：{{tempProduct.content}}</p>
  //             <del class="h6">原價 {{tempProduct.origin_price}} 元</del>
  //             <div class="h5">現在只要 {{tempProduct.price}} 元</div>
  //             <div>
  //               <div class="input-group">
  //                 <input type="number" class="form-control" min="1" v-model.number="qty">
  //                 <button type="button" class="btn btn-primary">加入購物車</button>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>`,
  template:'#productDetail',
  methods:{
    openModal(){
      this.modal.show();
    },
    hideModal(){
      this.modal.hide();
    },
  },
  mounted(){
    this.modal = new bootstrap.Modal(this.$refs.modal,{
      keyboard: false,
      backdrop: 'static'
    });
  }
}
