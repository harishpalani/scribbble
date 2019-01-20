class CommentsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :destroy]

  def create
    @shot = Shot.find(params[:shot_id])
    @comment = @shot.comments.create(comment_params)

    # Associate each comment with the user who wrote it (a.k.a the current user)
    @comment.user_id = current_user.id if current_user
    @comment.save!

    # Redirect to the shot after saving the comment
    redirect_to shot_path(@shot)
  end

  def destroy
    @shot = Shot.find(params[:shot_id])
    @comment = @shot.comments.find(params[:id])

    # Delete comment and redirect to the shot
    @comment.destroy
    redirect_to shot_path(@shot)
  end

  def comment_params
    params.require(:comment).permit(:name, :response)
  end
end