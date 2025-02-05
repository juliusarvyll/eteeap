<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('work_experiences', function (Blueprint $table) {
            $table->id();
            $table->string('applicant_id');
            $table->foreign('applicant_id')->references('applicant_id')->on('personal_infos')->onDelete('cascade');
            $table->string('designation');
            $table->integer('dateFrom')->nullable();
            $table->integer('dateTo')->nullable();
            $table->string('companyName');
            $table->text('companyAddress');
            $table->string('employmentStatus');
            $table->string('supervisorName');
            $table->text('reasonForLeaving');
            $table->text('responsibilities');
            $table->string('documents')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('work_experiences');
    }
}; 