$(document).ready(function() {
  // listingContainer holds all of our posts
  var listingContainer = $(".listing-container");
  var postcitySelect = $("#city");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);
  postcitySelect.on("change", handlecityChange);
  var posts;

  // This function grabs posts from the database and updates the view
  function getPosts(city) {
    var cityString = city || "";
    if (cityString) {
      cityString = "/city/" + cityString;
    }
    $.get("/api/posts" + cityString, function(data) {
      console.log("Posts", data);
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + id
    })
      .then(function() {
        getPosts(postcitySelect.val());
      });
  }

  // Getting the initial list of posts
  getPosts();
  // InitializeRows handles appending all of our constructed post HTML inside
  // listingContainer
  function initializeRows() {
    listingContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    listingContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");
    var newPostlistingagent = $("<h5>");
    var newPostfinalprice = $("<h5>");
    var newPostDate = $("<small>");
    newPostDate.css({
      float: "right",
      "font-weight": "100",
      "font-color": "black",
     
    });
    var newPostcity = $("<h2>");
    newPostcity.text(post.city);
    newPostcity.css({
      float: "right",
      "font-weight": "100",
     
       "padding-":"25px"
    });
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostBody = $("<p>");
    newPostlistingagent.text(" Listing Agent Name: " + post.listingagent );
    newPostfinalprice.text("Price($): " + post.finalprice);
    newPostBody.text(post.propertydetail);
    var formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    newPostDate.text(formattedDate);
    newPostlistingagent.append(newPostDate);
    newPostCardHeading.append(deleteBtn);
    newPostCardHeading.append(editBtn);
    newPostCardHeading.append(newPostlistingagent);
    newPostCardHeading.append(newPostfinalprice);
    newPostCardHeading.append(newPostcity);
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", post);
    return newPostCard;
  }

  // This function figures out which post we want to delete and then calls
  // deletePost
  function handlePostDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    deletePost(currentPost.id);
  }

  // This function figures out which post we want to edit and takes it to the
  // Appropriate url
  function handlePostEdit() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    window.location.href = "/soldhouse?post_id=" + currentPost.id;
  }

  // This function displays a message when there are no posts
  function displayEmpty() {
    listingContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No posts yet for this city, navigate <a href='/soldhouse'>SoldHouse</a> in order to list your house");
    listingContainer.append(messageH2);
  }

  // This function handles reloading new posts when the city changes
  function handlecityChange() {
    var newPostcity = $(this).val();
    getPosts(newPostcity);
  }

});
