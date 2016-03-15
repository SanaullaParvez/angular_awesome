<a class="isSidebarOpen" href ng-click="isSidebarOpen = !isSidebarOpen"><span ng-class="{'glyphicon glyphicon-menu-down':isSidebarOpen,'glyphicon glyphicon-menu-up':!isSidebarOpen}" aria-hidden="true"></span></a>
<div ng-show="isSidebarOpen" class="col-sm-3 col-md-2 sidebar">
    <ul class="nav nav-sidebar">
        <li ng-class="{ active: isActive('/student')}"><a ui-sref= "student" >{{ 'STUDENT' | translate }}</a></li>
        <li ng-class="{ active: isActive('/student_admission')}"><a ui-sref= "student_admission" >{{ 'STUDENT_ADMISSION' | translate }}</a></li>
        <li ng-class="{ active: isActive('/teacher')}"><a ui-sref= "teacher" >{{ 'TEACHER' | translate }}</a></li>
        <li ng-class="{ active: isActive('/teacher_admission')}"><a ui-sref= "teacher_admission" >{{ 'TEACHER_ADMISSION' | translate }}</a></li>
        <li ng-class="{ active: isActive('/donor')}"><a ui-sref= "donor" >{{ 'DONOR' | translate }}</a></li>
        <li ng-class="{ active: isActive('/donor_admission')}"><a ui-sref= "donor_admission" >{{ 'DONOR_ADMISSION' | translate }}</a></li>
        <li ng-class="{ active: isActive('/creditor')}"><a ui-sref= "creditor" >{{ 'CREDITOR' | translate }}</a></li>
        <li ng-class="{ active: isActive('/creditor_admission')}"><a ui-sref= "creditor_admission" >{{ 'CREDITOR_ADMISSION' | translate }}</a></li>
    </ul>
</div>