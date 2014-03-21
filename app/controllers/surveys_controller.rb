class SurveysController < ApplicationController
  include Roar::Rails::ControllerAdditions

  respond_to :json

  expose(:survey, attributes: :survey_params)

  def create
    if survey.save
      render json: survey, status: 201
    else
      render json: { errors: survey.errors }, status: 400
    end
  end

  def update
    if answer_incrementer.save
      render json: {}, status: 200
    else
      render json: {}, status: 400
    end
  end

  def show
    respond_with survey
  end

  private

  def answer_incrementer
    AnswerIncrementer.new(survey_params[:answers_attributes], request.remote_ip)
  end

  def survey_params
    params.require(:survey).permit([
      :question,
      :permissive_voting,
      answers_attributes: [
        :id,
        :answer_text,
        :selected
      ]
    ])
  end
end
