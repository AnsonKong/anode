<!-- LinkModal -->
<div class="modal fade" id="myLinkModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <!-- head -->
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">添加链接</h5>
        <button type="button" class="close" style="cursor: pointer;" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <!-- body -->
      <div class="modal-body justify-content-center">
        <form>
          <div class="form-group">
            <label for="modalTitle">标题</label>
            <input type="text" class="form-control" id="modalTitle" placeholder="Title">
          </div>
          <div class="form-group">
            <label for="modalLink">链接</label>
            <input type="text" class="form-control" id="modalLink" placeholder="Link">
          </div>
        </form>
      </div>
      <!-- footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" style="cursor: pointer;" onclick="saveLink();">确定</button>
      </div>
    </div>
  </div>
</div>