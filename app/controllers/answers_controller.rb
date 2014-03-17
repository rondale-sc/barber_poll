class AnswersController < ApplicationController
  respond_to :json

  def index
    respond_with Answer.where(survey_id: params[:survey_id])
  end
end
