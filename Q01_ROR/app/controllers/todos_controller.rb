class TodosController < ApplicationController
	def show
		@todo = Todo.find(params[:id])
		render json: @todo
	end

	def new
		@todo = Todo.new
	end

	def create
		if @todo = Todo.create({ingave_datum: params[:ingavedatum], 
			eind_datum: params[:einddatum], prioriteit: params[:prioriteit], 
			beschrijving: params[:beschrijving], status: params[:status]})
			redirect_to(action: "show", id: @todo.id)
		end
	end

	def filter
		@todos = Todo.where(prioriteit: params[:filter])
		render json: @todos
	end

	private
	def cr_par
		@result = Todo.new()
	end
end
