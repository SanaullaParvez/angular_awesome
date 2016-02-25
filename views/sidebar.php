<a class="isSidebarOpen" href ng-click="isSidebarOpen = !isSidebarOpen"><span ng-class="{'glyphicon glyphicon-menu-down':isSidebarOpen,'glyphicon glyphicon-menu-up':!isSidebarOpen}" aria-hidden="true"></span></a>
<div ng-show="isSidebarOpen" class="col-sm-3 col-md-2 sidebar">
    <ul class="nav nav-sidebar">
        <li ng-class="{ active: isActive('/student')}"><a ui-sref= "student" >{{ 'STUDENT' | translate }}</a></li>
        <li ng-class="{ active: isActive('/student_admission')}"><a ui-sref= "student_admission" >{{ 'STUDENT_ADMISSION' | translate }}</a></li>
        <li ng-class="{ active: isActive('/teacher')}"><a ui-sref= "teacher" >{{ 'TEACHER' | translate }}</a></li>
        <li ng-class="{ active: isActive('/donor')}"><a ui-sref= "donor" >{{ 'DONOR' | translate }}</a></li>
    </ul>
</div>