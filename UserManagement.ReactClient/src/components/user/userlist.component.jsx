import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import $ from "jquery";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import "datatables.net-bs4";
import { deleteUser, fetchUsers, userAction } from "../../store/user.slice";
import { UserService } from "../../services/user.service";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const userService = new UserService();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(userAction.resetStatus());
  }, [dispatch]);

  //const data = useSelector((state) => state.users.userList);
  const { status, userListObj } = useSelector((state) => state.users);

  const tableRef = useRef();

  const initParams = {
    Draw: 0,
    Skip: 0,
    PageSize: 10,
    SearchValue: "",
    SortBy: "",
    SortDirection: "",
  };

  useEffect(() => {
    if (
      status === null ||
      (status !== null && status.indexOf("succeeded") >= 0)
    ) {
      const table = $(tableRef.current).DataTable({
        pagingType: "full_numbers",
        pageLength: 10,
        serverSide: true,
        processing: true,
        ajax: (dataTablesParameters, callback) => {
          let params = {
            Draw: dataTablesParameters.draw,
            Skip:
              dataTablesParameters.start == null
                ? 0
                : dataTablesParameters.start,
            PageSize: dataTablesParameters.length,
            SearchValue: dataTablesParameters.search.value,
            SortBy: dataTablesParameters.order[0].name,
            SortDirection: dataTablesParameters.order[0].dir,
          };
          //const page = Math.ceil(data.start / data.length) + 1;
          dispatch(fetchUsers({ params, userService }))
            .unwrap()
            .then((resp) => {
              dispatch(userAction.updateUserList(resp));
              callback({
                draw: resp.draw,
                recordsTotal: resp.recordsTotal,
                recordsFiltered: resp.recordsFiltered,
                data: resp.data,
              });
            });
        },
        columns: getDynamicColumns(),
      });

      return () => {
        table.destroy(true);
      };
    }
  }, []); //data, dispatch, pageSize, status, total
  // const handleClick = (e) => {
  //   console.log("Edit clicked");
  // };
  useEffect(() => {
    if (status == "succeededDelete") {
      //navigate("/userlist");
      //window.location.reload();
      $("#dataTable").DataTable().ajax.reload();
    }
  }, [status]);
  $("#dataTable").on("click", ".edit-btn", function () {
    const id = $(this).data("id");
    navigate("/edituser/" + id);

    // const newName = prompt('Enter new name:');
    // if (newName) {
    //   dispatch(editItem({ id, name: newName }));
    // }
  });

  $("#dataTable").on("click", ".delete-btn", function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    const id = $(this).data("id");
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteUser({ id, userService }));
    }
  });

  function getDynamicColumns() {
    var Name = "Name";
    var UserName = "User Name";
    var Email = "Email";
    var Action = "Action";
    var Edit = "Edit";
    var Delete = "Delete";
    var cols = [
      { data: "name", name: "name", title: Name },
      { data: "username", name: "username", title: UserName },
      { data: "email", name: "email", title: Email },
      {
        title: Action,
        data: "",
        defaultContent: "", // Required for columns without a data source
        render: (data, type, row) => {
          return `
              <button class="btn btn-primary btn-sm edit-btn"  data-operation='edit'  data-id="${row.id}">${Edit}</button>
              <button class="btn btn-danger btn-sm delete-btn" data-operation='delete' data-id="${row.id}">${Delete}</button>
            `;
        },
        orderable: false,
      },
    ];
    // if(this.userRole !== 'Admin')
    // {
    //    cols.pop();
    // }
    return cols;
  }

  //     ngAfterViewInit() {
  //       $(document).on('click', '.edit', (event) => {
  //         const id = $(event.currentTarget).data('id');
  //         this.router.navigate(['edituser',id]);
  //       });
  //       $(document).on('click', '.delete', (event) => {
  //         const id = $(event.currentTarget).data('id');
  //         if(window.confirm('Are sure you want to delete this item ?')){
  //           this.deleteUser(id);
  //          }
  //       });
  //     }

  //  deleteUser(id:string){
  //     this.delUserSubscription = this.userService.deleteUser(id).subscribe(
  //       (res) => {this.router.navigate(['userlist'])},
  //       (error) => { console.log(error) }
  //     );
  //  }

  return (
    <>
      <div className="container mt-4">
        <Link to="/adduser" className="btn btn-primary mb-3">
          Add New User
        </Link>
        <table
          id="dataTable"
          className="table table-striped table-bordered"
          ref={tableRef}
        ></table>
      </div>
    </>
  );
}
