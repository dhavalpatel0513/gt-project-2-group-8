$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?post_id=23)
  var url = window.location.search;
  var postId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In localhost:8080/soldhouse?post_id=1, postId is 1
  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId);
  }

  // Getting jQuery references to the post propertydetail, listingagent, form, and city select
  var propertydetailInput = $("#propertydetail");
  var listingagentInput = $("#listingagent");
  var finalpriceInput = $("#finalprice");
  var soldhouseForm = $("#soldhouse");
  var postcitySelect = $("#city");
  // Giving the postcitySelect a default value
  postcitySelect.val("atlanta");
  // Adding an event listener for when the form is submitted
  $(soldhouseForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a propertydetail or a listingagent
    if (!listingagentInput.val().trim() || !propertydetailInput.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newPost = {
      listingagent: listingagentInput.val().trim(),
      finalprice: finalpriceInput.val().trim(),
      propertydetail: propertydetailInput.val().trim(),
      city: postcitySelect.val()
    };

    console.log(newPost);

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newPost.id = postId;
      updatePost(newPost);
    }
    else {
      submitPost(newPost);
    }
  });

  // Submits a new post and brings user to listing page upon completion
  function submitPost(Post) {
    $.post("/api/posts/", Post, function() {
      window.location.href = "/listing";
    });
  }

  // Gets post data for a post if we're editing
  function getPostData(id) {
    $.get("/api/posts/" + id, function(data) {
      if (data) {
        // If this post exists, prefill our soldhouse forms with its data
        listingagentInput.val(data.listingagent);
        finalpriceInput.val(data.finalprice);
        propertydetailInput.val(data.propertydetail);
        postcitySelect.val(data.city);
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // Update a given post, bring user to the listing page when done
  function updatePost(post) {
    $.ajax({
      method: "PUT",
      url: "/api/posts",
      data: post
    })
      .then(function() {
        window.location.href = "/listing";
      });
  }
});
