<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
    <h1 class="page-header">{{welcome}}</h1>
    <div class="row placeholders">
        <div class="col-xs-6 col-sm-3 placeholder">
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">
            <h4>Label</h4>
            <span class="text-muted">Something else</span>
        </div>
        <div class="col-xs-6 col-sm-3 placeholder">
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">
            <h4>Label</h4>
            <span class="text-muted">Something else</span>
        </div>
        <div class="col-xs-6 col-sm-3 placeholder">
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">
            <h4>Label</h4>
            <span class="text-muted">Something else</span>
        </div>
        <div class="col-xs-6 col-sm-3 placeholder">
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">
            <h4>Label</h4>
            <span class="text-muted">Something else</span>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-10">
            <h2 class="sub-header">Section title</h2>
        </div>
        <div class="col-sm-2">
            <button ng-disabled="visibleForm" type="button" class="btn btn-primary right-h2" data-ng-click="visibleForm=true">Add New</button>
        </div>
    </div>
    <div class="table-responsive">
        <table class="table table-striped">
            <thead>
            <tr>
                <th data-ng-repeat="key in deposit_key">{{key}}</th>
            </tr>
            </thead>
            <tbody>
            <tr data-ng-repeat="deposit in deposits">
                <td data-ng-repeat="val in deposit">{{val}}</td>
                <td></td>
            </tr>
            <tr ng-show="visibleForm">
                <td>{{deposits.length+1}}</td>
                <form ng-submit="onSubmit()"
                      novalidate="novalidate"
                      ng-hide="submitted">
                        <td><input type="text" class="form-control" ng-model="formModel.name" id="name" required="required"></td>
                        <td><input type="date" class="form-control" ng-model="formModel.date" id="date" required="required"></td>
                        <td><input type="number" class="form-control" ng-model="formModel.amount"
                               min="18" max="64" id="amount" required="required"></td>
                        <td><button class="btn btn-primary" ladda="submitting" data-style="expand-right" type="submit">
                            <span ng-show="submitting">Saving</span>
                            <span ng-show="!submitting">Save</span>
                        </button></td>
                </form>
            </tr>
            </tbody>
        </table>
    </div>
</div>